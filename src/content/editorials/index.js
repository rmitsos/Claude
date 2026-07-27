import { meta as meta2026W30, el as el2026W30, en as en2026W30 } from "./2026-w30";

// Newest first. Adding an editorial means writing the module and adding one
// line here — deliberately manual, because publishing should be a decision
// rather than a side effect of a file appearing in a directory.
export const EDITORIALS = [{ meta: meta2026W30, el: el2026W30, en: en2026W30 }];

export const EDITORIAL_LANGS = ["el", "en"];
export const DEFAULT_EDITORIAL_LANG = "el";

export function getLatestEditorial() {
  return EDITORIALS[0] || null;
}

export function getEditorial(slug) {
  return EDITORIALS.find((e) => e.meta.slug === slug) || null;
}
