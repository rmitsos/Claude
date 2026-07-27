import { meta as meta2026W30, el as el2026W30, en as en2026W30 } from "./2026-w30";
import { note as noteW30Pagio } from "./notes/2026-w30-pagio-diktyo-ina";

// A week, not a piece. The lead is the argument of the week and there is at
// most one; notes are shorter pieces on a single thread, published whenever
// there is something to say rather than on a schedule. A week may have a lead
// and no notes, notes and no lead yet, or both.
//
// Newest first. Adding anything means writing the module and editing this
// list — deliberately manual, because publishing should be a decision rather
// than a side effect of a file appearing in a directory.
export const WEEKS = [
  {
    meta: meta2026W30,
    lead: { el: el2026W30, en: en2026W30 },
    notes: [noteW30Pagio],
  },
];

export const EDITORIAL_LANGS = ["el", "en"];
export const DEFAULT_EDITORIAL_LANG = "el";

export function getWeek(id) {
  return WEEKS.find((w) => w.meta.week === id) || null;
}

export function getNote(weekId, noteSlug) {
  const week = getWeek(weekId);
  if (!week) return null;
  const note = week.notes.find((n) => n.slug === noteSlug);
  return note ? { week, note } : null;
}

// The newest week entry, whatever state it is in. This is what /weekly shows.
export function getLatestWeek() {
  return WEEKS[0] || null;
}

// The newest week that actually has a lead. Notes arrive ad hoc, so a week can
// exist for days before its lead is written — and in that window the previous
// lead is still the standing argument rather than something to hide.
export function getLatestLead() {
  return WEEKS.find((w) => w.lead) || null;
}

// Notes are shown newest first within their week. The content file lists them
// in whatever order they were written, which is not necessarily the order a
// reader should meet them in.
export function weekNotes(week) {
  return [...(week?.notes || [])].sort(
    (a, b) => new Date(b.published) - new Date(a.published)
  );
}

// Every piece on the site, lead and note alike, newest first. Used by the
// homepage pointer and the sitemap — both of which care about what has been
// written, not about how it is filed.
export function allPieces() {
  const pieces = [];
  for (const week of WEEKS) {
    if (week.lead) {
      pieces.push({
        kind: "lead",
        href: `/weekly/${week.meta.week}`,
        published: week.meta.published,
        meta: week.meta,
        el: week.lead.el,
        en: week.lead.en,
      });
    }
    for (const note of week.notes) {
      pieces.push({
        kind: "note",
        href: `/weekly/${week.meta.week}/${note.slug}`,
        published: note.published,
        meta: week.meta,
        el: note.el,
        en: note.en,
      });
    }
  }
  return pieces.sort((a, b) => new Date(b.published) - new Date(a.published));
}

export function getLatestPiece() {
  return allPieces()[0] || null;
}
