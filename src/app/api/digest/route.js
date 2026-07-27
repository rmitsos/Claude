import { NextResponse } from "next/server";
import { CATEGORIES } from "@/lib/feeds";
import { ENTITY_BY_ID } from "@/lib/entities";
import {
  searchArticles,
  getArchiveStart,
  getWeeklyTotals,
  getWeeklyVolume,
  getEntityTrends,
  getCooccurrences,
  PERIODS,
} from "@/lib/articles";

// Raw material for writing an editorial: the period's articles with their
// summaries, preceded by the same counts the weekly page shows. Built to be
// read by a person (or pasted into a model) rather than rendered, so the
// default response is plain text — ?format=json for the structured version.
//
// This is the input the automated review generator will consume later, so
// the shape is deliberately the whole picture, not a pre-filtered selection:
// deciding what matters is the editorial job, not this endpoint's.

const SUMMARY_CHARS = 260;
const DEFAULT_LIMIT = 150;

const athens = (opts) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Athens", ...opts });

const stampFmt = athens({
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const dayFmt = athens({ day: "numeric", month: "long", year: "numeric" });

function label(id) {
  return ENTITY_BY_ID[id]?.label || id;
}

function clip(text) {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  if (!clean) return "";
  return clean.length > SUMMARY_CHARS ? `${clean.slice(0, SUMMARY_CHARS)}…` : clean;
}

function renderText({ period, items, totals, volume, trends, pairs, archive }) {
  const lines = [];
  const periodLabel = PERIODS[period].label;

  lines.push(`GR WIRE DIGEST — ${periodLabel.toLowerCase()}`);
  lines.push(`Generated ${stampFmt.format(new Date())} Europe/Athens`);
  if (archive) {
    lines.push(
      `Collecting since ${dayFmt.format(archive.started)} · ${archive.total} articles stored`
    );
  }
  lines.push("");

  lines.push("== OVERVIEW (last 7 days) ==");
  lines.push(`Articles: ${totals.thisWeek} (previous 7 days: ${totals.lastWeek})`);
  lines.push(`On building & operating: ${totals.techWeek}`);
  lines.push(`Sources publishing: ${totals.sources}`);
  lines.push("");
  for (const [slug, name] of Object.entries(CATEGORIES)) {
    const v = volume.find((x) => x.category === slug) || { thisWeek: 0, lastWeek: 0 };
    lines.push(`  ${name.padEnd(24)} ${String(v.thisWeek).padStart(4)}  (prev ${v.lastWeek})`);
  }
  lines.push("");

  const rising = trends.filter((t) => t.thisWeek > t.lastWeek).slice(0, 12);
  if (rising.length) {
    lines.push("== SUBJECTS GAINING GROUND (last 7 days) ==");
    for (const t of rising) {
      lines.push(`  ${label(t.entity).padEnd(28)} ${t.lastWeek} -> ${t.thisWeek}`);
    }
    lines.push("");
  }

  if (pairs.length) {
    lines.push("== SUBJECTS APPEARING TOGETHER (last 7 days) ==");
    lines.push("   (co-occurrence only — these shared an article, nothing more)");
    for (const p of pairs) {
      lines.push(
        `  ${label(p.left)} + ${label(p.right)} — ${p.shared} ${p.shared === 1 ? "story" : "stories"}`
      );
    }
    lines.push("");
  }

  lines.push(`== ARTICLES (${items.length}) ==`);

  for (const [slug, name] of Object.entries(CATEGORIES)) {
    const inCategory = items.filter((i) => i.categories.includes(slug));
    if (!inCategory.length) continue;

    lines.push("");
    lines.push(`--- ${name.toUpperCase()} (${inCategory.length}) ---`);
    for (const item of inCategory) {
      const stamp = item.pubDate ? stampFmt.format(item.pubDate) : "undated";
      const tags = item.entities.map(label).join(", ");
      lines.push("");
      lines.push(
        `[${stamp}] ${item.source}${item.technology ? " · TECH" : ""}${tags ? ` · ${tags}` : ""}`
      );
      lines.push(item.title);
      const summary = clip(item.summary);
      if (summary) lines.push(`  ${summary}`);
      lines.push(`  ${item.link}`);
    }
  }

  const missing = items.filter((i) => !clip(i.summary)).length;
  if (missing) {
    lines.push("");
    lines.push(
      `NOTE: ${missing} of ${items.length} articles have no summary — summaries are ` +
        `only stored from the ingest that introduced them, so older rows lack one.`
    );
  }

  return lines.join("\n");
}

export async function GET(request) {
  const url = new URL(request.url);
  const period = PERIODS[url.searchParams.get("period")] ? url.searchParams.get("period") : "7d";
  const format = url.searchParams.get("format");
  const limit = Math.min(Number(url.searchParams.get("limit")) || DEFAULT_LIMIT, 400);

  const [all, totals, volume, trends, pairs, archive] = await Promise.all([
    searchArticles({ period }),
    getWeeklyTotals(),
    getWeeklyVolume(),
    getEntityTrends(),
    getCooccurrences(),
    getArchiveStart(),
  ]);

  const items = all.slice(0, limit);

  if (format === "json") {
    return NextResponse.json({ period, totals, volume, trends, pairs, archive, items });
  }

  return new Response(renderText({ period, items, totals, volume, trends, pairs, archive }), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
