// Feed sources for GR Wire, seeded from sources/greek-news-sources.md.
// Only feeds marked confirmed-ish or likely-unverified there are included —
// entries marked "not found" are left out until a real feed URL is located.
// Fetching is defensive (see getFeedItems.js): a dead/wrong URL here just
// disappears from the site instead of breaking the page.

export const CATEGORIES = {
  finance: "Finance",
  telco: "Telco Infrastructure",
  energy: "Energy Infrastructure",
};

export const FEEDS = [
  {
    name: "Naftemporiki",
    url: "https://www.naftemporiki.gr/feed/",
    categories: ["finance"],
  },
  {
    name: "Capital.gr (Αγορές)",
    url: "https://www.capital.gr/api/tags/agores/",
    categories: ["finance"],
  },
  {
    name: "Capital.gr (Οικονομία)",
    url: "https://www.capital.gr/api/tags/oikonomia/",
    categories: ["finance"],
  },
  {
    name: "energypress.gr",
    url: "https://energypress.gr/index.php/rss",
    categories: ["energy"],
  },
];
