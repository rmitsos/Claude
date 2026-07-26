// Feed sources for GR Wire, seeded from sources/greek-news-sources.md.
// Feeds are fetched without trusting their own broad category (e.g.
// Capital.gr's "Οικονομία" mixes in world news, wildfires, sports) —
// each article is classified by content instead, see classify.js.

export const CATEGORIES = {
  finance: "Finance",
  telco: "Telco Infrastructure",
  energy: "Energy Infrastructure",
};

export const FEEDS = [
  { name: "Naftemporiki", url: "https://www.naftemporiki.gr/feed/" },
  { name: "Capital.gr (Αγορές)", url: "https://www.capital.gr/api/tags/agores/" },
  { name: "Capital.gr (Οικονομία)", url: "https://www.capital.gr/api/tags/oikonomia/" },
  // energypress.gr returns HTTP 403 to Vercel regardless of path tried
  // (/rss and /index.php/rss both blocked) — their firewall appears to
  // reject cloud/datacenter IPs outright. Not fixable by changing the URL.
];
