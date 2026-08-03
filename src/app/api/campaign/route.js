import { NextResponse } from "next/server";
import { getWeek, getNote, weekNotes } from "@/content/editorials";
import { sweep as sweepW31 } from "@/content/editorials/2026-w31";
import { buildEmail, buildNoteEmail } from "@/lib/emailHtml";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const API = "https://connect.mailerlite.com/api";

const GROUPS = {
  el: process.env.MAILERLITE_GROUP_EL,
  en: process.env.MAILERLITE_GROUP_EN,
};

// Sweeps live in their week's content file. One entry per week rather than a
// directory scan, for the same reason the editorial index is manual: sending
// a letter should be a decision, not a side effect of a file existing.
const SWEEPS = { "2026-w31": sweepW31 };

// MailerLite requires a language on a campaign and its ids are account-scoped,
// so they are looked up rather than guessed. English is the fallback because
// the field is required and a wrong language affects nothing a reader sees —
// unlike guessing the id and having the whole call rejected.
async function resolveLanguageId(key, lang) {
  try {
    const res = await fetch(`${API}/campaigns/languages`, {
      headers: { Authorization: `Bearer ${key}`, Accept: "application/json" },
    });
    if (!res.ok) return null;
    const body = await res.json();
    const rows = body?.data || [];
    const want = lang === "el" ? ["greek", "el"] : ["english", "en"];
    const hit =
      rows.find((r) =>
        want.includes(String(r.shortcode || "").toLowerCase())
      ) ||
      rows.find((r) => want.includes(String(r.name || "").toLowerCase())) ||
      rows.find((r) => String(r.name || "").toLowerCase().includes("english"));
    return hit?.id ?? null;
  } catch (err) {
    console.error("[campaign] languages lookup failed:", err?.message || err);
    return null;
  }
}

function authorised(request) {
  const secret = process.env.CAMPAIGN_SECRET || process.env.CRON_SECRET;
  if (!secret) return null;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

/**
 * Renders the letter without touching MailerLite, so it can be read before a
 * draft exists. The expensive mistakes in an email are in the HTML, not in the
 * API call — and this is the only way to see the HTML while it is still free
 * to change.
 *
 * GET /api/campaign?week=2026-w31&lang=el                    (whole week)
 * GET /api/campaign?week=2026-w31&note=some-slug&lang=el      (one note alone)
 * with Authorization: Bearer …
 */
export async function GET(request) {
  const ok = authorised(request);
  if (ok === null) {
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }
  if (!ok) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const params = new URL(request.url).searchParams;
  const id = params.get("week");
  const noteSlug = params.get("note");
  const lang = params.get("lang") === "en" ? "en" : "el";

  if (noteSlug) {
    const found = id ? getNote(id, noteSlug) : null;
    if (!found) {
      return NextResponse.json({ ok: false, error: "unknown week or note" }, { status: 404 });
    }
    const letter = await buildNoteEmail({ week: found.week, note: found.note, lang });
    if (!letter) {
      return NextResponse.json({ ok: false, error: "no edition" }, { status: 404 });
    }
    return new Response(letter.html, {
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const week = id ? getWeek(id) : null;
  if (!week?.lead) {
    return NextResponse.json({ ok: false, error: "unknown week or no lead" }, { status: 404 });
  }

  const letter = await buildEmail({
    week,
    sweep: SWEEPS[id],
    notes: weekNotes(week),
    lang,
  });
  if (!letter) {
    return NextResponse.json({ ok: false, error: "no edition" }, { status: 404 });
  }

  return new Response(letter.html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

/**
 * Creates one MailerLite draft per edition for a given week.
 *
 * Draft, never send. Email has no undo: a malformed letter delivered to the
 * whole list cannot be recalled, and this integration has already produced
 * three failures that looked like success from the outside. Assembling the
 * campaign is the tedious part and it is fully automated; pressing Send stays
 * a human act performed after looking at the thing.
 *
 * POST /api/campaign?week=2026-w31                     (whole week)
 * POST /api/campaign?week=2026-w31&note=some-slug        (one note alone)
 * with Authorization: Bearer CAMPAIGN_SECRET
 */
export async function POST(request) {
  const ok = authorised(request);
  if (ok === null) {
    console.error("[campaign] no CAMPAIGN_SECRET or CRON_SECRET set");
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }
  if (!ok) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const key = process.env.MAILERLITE_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "no api key" }, { status: 503 });
  }

  const params = new URL(request.url).searchParams;
  const id = params.get("week");
  const noteSlug = params.get("note");

  let week;
  let note = null;
  if (noteSlug) {
    const found = id ? getNote(id, noteSlug) : null;
    if (!found) {
      return NextResponse.json({ ok: false, error: "unknown week or note" }, { status: 404 });
    }
    week = found.week;
    note = found.note;
  } else {
    week = id ? getWeek(id) : null;
    if (!week) {
      return NextResponse.json({ ok: false, error: "unknown week" }, { status: 404 });
    }
    if (!week.lead) {
      return NextResponse.json(
        { ok: false, error: "week has no lead — nothing to send" },
        { status: 400 }
      );
    }
  }

  const notes = note ? [] : weekNotes(week);
  const results = [];

  for (const lang of ["el", "en"]) {
    const groupId = /^\d+$/.test((GROUPS[lang] || "").trim())
      ? GROUPS[lang].trim()
      : null;
    if (!groupId) {
      results.push({ lang, ok: false, error: `MAILERLITE_GROUP_${lang.toUpperCase()} invalid` });
      continue;
    }

    const letter = note
      ? await buildNoteEmail({ week, note, lang })
      : await buildEmail({ week, sweep: SWEEPS[id], notes, lang });
    if (!letter) {
      results.push({ lang, ok: false, error: "no edition in this language" });
      continue;
    }

    const languageId = await resolveLanguageId(key, lang);

    // Same unquoted-id problem as the subscribe route: MailerLite ids are
    // ~18 digits, past where JavaScript integers stay exact, so the value is
    // substituted into the serialised JSON rather than passed through Number.
    const payload = JSON.stringify({
      name: `${week.meta.week} · ${lang.toUpperCase()} · ${letter.subject}`,
      type: "regular",
      ...(languageId ? { language_id: languageId } : {}),
      emails: [
        {
          subject: letter.subject,
          from_name: SITE.name,
          from: SITE.contactEmail,
          content: letter.html,
        },
      ],
      groups: ["__GROUP_ID__"],
    }).replace('"__GROUP_ID__"', groupId);

    try {
      const res = await fetch(`${API}/campaigns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: payload,
      });
      const text = await res.text();
      if (!res.ok) {
        // The whole upstream body, not a summary. Every failure in this
        // integration so far has been diagnosable only from MailerLite's own
        // message, and truncating it cost an hour.
        console.error(`[campaign] ${lang} ${res.status}: ${text.slice(0, 800)}`);
        results.push({ lang, ok: false, status: res.status, detail: text.slice(0, 800) });
        continue;
      }
      let campaignId = null;
      try {
        campaignId = JSON.parse(text)?.data?.id ?? null;
      } catch {
        /* a 2xx we cannot parse is still a success worth reporting */
      }
      console.log(`[campaign] ${lang} draft created${campaignId ? ` (${campaignId})` : ""}`);
      results.push({ lang, ok: true, campaignId });
    } catch (err) {
      console.error(`[campaign] ${lang} request failed:`, err?.message || err);
      results.push({ lang, ok: false, error: "request failed" });
    }
  }

  return NextResponse.json({
    ok: results.every((r) => r.ok),
    week: week.meta.week,
    note: "Drafts only. Review and send from MailerLite.",
    results,
  });
}
