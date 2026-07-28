// Publisher details used by the legal pages. Fill these in before pointing
// a real domain at the site: GDPR requires a named controller and a working
// contact route, and the pages say plainly when a value is still unset
// rather than quietly rendering a blank.

export const SITE = {
  name: "GR Wire",
  tagline: "Greek finance, telecom & energy infrastructure — in one feed.",

  // The person or company legally responsible for the site.
  publisher: "Dimitris Roussos",

  // Where privacy requests and corrections go. A working address is a legal
  // requirement once the site is public, not a nicety.
  contactEmail: "contact@grwire.com",

  // Country of establishment — determines which supervisory authority
  // handles complaints. Greece's is the HDPA (dpa.gr).
  country: "Greece",

  // Registered 27 July 2026. Canonical and Open Graph URLs resolve against
  // this, so they only become correct once the domain is attached to the
  // Vercel project as well as bought.
  domain: "grwire.com",

  // Search engines are kept out until the site is genuinely ready to be
  // found. A first impression in search results is slow and awkward to
  // correct, so this stays false while the legal pages still carry the
  // "not ready to publish" warning and the archive is only days old.
  // Flip to true when going live; robots.txt and the sitemap follow it.
  allowIndexing: true,
};

// ISO so it can be formatted in whichever language the reader chose.
export const LAST_UPDATED = "2026-07-28";

// True only when every value a legal page needs has been supplied.
export const SITE_DETAILS_COMPLETE = Boolean(
  SITE.publisher && SITE.contactEmail
);
