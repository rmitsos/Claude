import { NextResponse } from "next/server";
import { LANGS, DEFAULT_LANG } from "@/lib/i18n";

export const dynamic = "force-dynamic";

// Posted to from our own form rather than embedding MailerLite's. Their embed
// loads third-party JavaScript into the page, and the site's whole privacy
// position is that no script on grwire.com watches the reader. The API key
// stays server-side; the browser only ever talks to this route.
const API = "https://connect.mailerlite.com/api/subscribers";

// Two groups so the weekly can go out in the language the reader chose. The
// site has a toggle; an email cannot.
const GROUPS = {
  el: process.env.MAILERLITE_GROUP_EL,
  en: process.env.MAILERLITE_GROUP_EN,
};

// Deliberately loose. Strict address validation rejects real mailboxes, and
// the confirmation email is the real check — an address that cannot receive
// mail never confirms and never gets sent anything.
const LOOKS_LIKE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request) {
  const key = process.env.MAILERLITE_API_KEY;
  if (!key) {
    console.error("[subscribe] MAILERLITE_API_KEY is not set");
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const email = String(body?.email || "").trim().toLowerCase();
  const lang = LANGS.includes(body?.lang) ? body.lang : DEFAULT_LANG;

  if (!LOOKS_LIKE_EMAIL.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // MailerLite rejects a quoted group id — "The groups.0 field must be a
  // number" — but its ids are around 18 digits, past the 2^53 ceiling where
  // JavaScript numbers stop being exact. Number("165364745857171594") comes
  // back as a different integer, so it would be sent as a *valid* id
  // belonging to nobody, and the request would succeed while subscribing into
  // a group that does not exist.
  //
  // So the id goes into the JSON as raw digits, unquoted, without ever
  // becoming a Number. Only digits are allowed through, which is also what
  // makes the substitution safe.
  //
  // A missing or malformed group id is a hard failure, not something to
  // proceed without. Campaigns are sent to groups, so an ungrouped subscriber
  // is one who confirmed, waited, and will never receive anything — and the
  // dashboard shows an empty group while the form reports success. Better to
  // refuse the signup and show the reader an error we can see.
  const group = (GROUPS[lang] || "").trim();
  const groupId = /^\d+$/.test(group) ? group : null;
  if (!groupId) {
    console.error(
      `[subscribe] MAILERLITE_GROUP_${lang.toUpperCase()} is ${group ? `not numeric: "${group}"` : "not set"}`
    );
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  const payload = JSON.stringify({
    email,
    // "unconfirmed" is what makes MailerLite send its confirmation email.
    // Without double opt-in, anyone could subscribe an address they do not
    // own — and the first that person hears of it is unsolicited mail from
    // a named publisher.
    status: "unconfirmed",
    groups: ["__GROUP_ID__"],
    // No custom fields. An earlier version sent `fields: { language }`, which
    // MailerLite rejects unless a custom field of that name already exists —
    // and it was redundant anyway, because the group a subscriber lands in is
    // what decides which edition they are sent.
  }).replace('"__GROUP_ID__"', groupId);

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: payload,
    });

    // 422 is a validation failure — a malformed group id, an unknown custom
    // field. It is *not* how an existing address is reported: this endpoint
    // upserts, so re-submitting an address already on the list succeeds and
    // updates its groups. Verified in production, against an earlier comment
    // here that claimed otherwise.
    //
    // It is still logged rather than returned, because a 422 has twice meant
    // the form was quietly subscribing nobody while showing a thank-you.
    if (res.status === 422) {
      const detail = await res.text();
      console.warn(`[subscribe] MailerLite 422 (check groups):`, detail.slice(0, 300));
    } else if (!res.ok) {
      const detail = await res.text();
      console.error(`[subscribe] MailerLite ${res.status}:`, detail.slice(0, 300));
      return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
    } else {
      // No address logged: the point of the list is that we hold as little as
      // possible, and a log line is a copy of it in a second system.
      console.log(`[subscribe] accepted (${lang}) into group ${groupId}`);
    }
  } catch (err) {
    console.error("[subscribe] request failed:", err?.message || err);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }

  // Always the same answer, whether the address was new or already on the
  // list. Distinguishing the two would turn this form into a way for anyone
  // to test whether a given person reads GR Wire — which stays true now that
  // we know the endpoint upserts rather than rejecting a repeat.
  return NextResponse.json({ ok: true });
}
