// Publishers republish. The same story arrives twice from one source with a
// rewritten headline and a fresh slug — Capital.gr ran "Βουτιά έως και 7% το
// πετρέλαιο" and "Πετρέλαιο: Βουτιά άνω του 6%" within two hours, both under
// article id 4007274. Left alone that inflates every count on the weekly page
// and shows a reader the same story twice in the wire.
//
// Two rules, both deliberately conservative. Fuzzy title similarity is *not*
// used: "Χρηματιστήριο: ισχυρή άνοδος" and "Χρηματιστήριο: ισχυρή πτώση"
// differ by one word and mean opposite things, and a wrong merge silently
// deletes a story nobody will ever know was missing.

// Only within one publisher. Naftemporiki, OT.gr and Capital.gr each running
// the CXMT listing are three articles by three newsrooms, and collapsing them
// would break the attribution the whole site rests on.
function normaliseTitle(title) {
  return (title || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Greek tonos, dialytika, Latin accents
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

// A path segment that is nothing but digits, five or more of them. Capital.gr
// /agores/4007274/slug, Naftemporiki /finance/economy/2143177/slug and
// B2Green /77419/slug all carry one; it survives the publisher re-slugging the
// story, which is exactly the case being caught.
//
// Five is the floor because four-digit segments are years — OT.gr and PV
// Magazine both put /2026/07/27/ in the path, and treating a year as an
// article id would merge everything published on the same day.
//
// "All digits" rather than "contains digits" keeps a slug like
// admie-50749-mva-substation from being read as an id.
function articleId(link) {
  try {
    const url = new URL(link);
    for (const segment of url.pathname.split("/")) {
      if (/^\d{5,}$/.test(segment)) return `${url.hostname}#${segment}`;
    }
  } catch {
    // Malformed URL: fall through to the title rule rather than throwing.
  }
  return null;
}

/**
 * A stable identity for a story, so the same article filed twice under
 * different URLs resolves to one row.
 *
 * Returns null when there is nothing trustworthy to key on, which means the
 * row is never deduplicated — the safe direction to fail in.
 */
export function dedupeKey({ link, title, source, pubDate }) {
  const byId = articleId(link);
  if (byId) return `id:${byId}`;

  const normalised = normaliseTitle(title);
  if (!normalised || !source) return null;

  // The day is part of the key because some titles legitimately repeat:
  // Naftemporiki publishes «Πρωτοσέλιδα εφημερίδων» every morning. Same
  // source, same headline, different story — and without the date they would
  // collapse into a single row and the column would vanish from the archive.
  const day = pubDate ? new Date(pubDate).toISOString().slice(0, 10) : "nodate";
  return `t:${source}#${day}#${normalised}`;
}
