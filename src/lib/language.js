// Greek and Latin use entirely separate alphabets, so counting script is a
// far more reliable signal here than the statistical detection a general
// language library would do — and it costs nothing at ingest time.
//
// Knowing an article's language matters for two reasons that have nothing to
// do with translating it: screen readers pronounce Greek with English
// phonetics unless told otherwise, and browsers only offer their own
// translation when the source language is declared. Both are the reader's
// business, not ours.

const GREEK = /[Ͱ-Ͽἀ-῿]/g;
const LATIN = /[A-Za-z]/g;

export function detectLanguage(text) {
  const sample = text || "";
  const greek = (sample.match(GREEK) || []).length;
  const latin = (sample.match(LATIN) || []).length;

  // Greek headlines routinely carry Latin fragments — company names, units,
  // "data center" — so a simple majority would misfile them. Any meaningful
  // Greek presence settles it.
  if (greek > 0 && greek * 3 >= latin) return "el";
  if (latin > 0) return "en";
  return "el";
}
