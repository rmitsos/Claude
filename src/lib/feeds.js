// Feed sources for GR Wire, seeded from sources/greek-news-sources.md.
// Feeds are fetched without trusting their own broad category (e.g.
// Capital.gr's "Οικονομία" mixes in world news, wildfires, sports) —
// each article is classified by content instead, see classify.js.
//
// Feeds marked UNVERIFIED are best-guess URLs that could not be checked
// from the dev sandbox (outbound egress is blocked there). Visit
// /api/ingest in production — it reports per-feed status — and prune the
// ones that fail rather than leaving dead entries here.

export const CATEGORIES = {
  finance: "Finance",
  telco: "Telco Infrastructure",
  energy: "Energy Infrastructure",
};

export const FEEDS = [
  // --- Verified working in production ---
  { name: "Naftemporiki", url: "https://www.naftemporiki.gr/feed/" },
  { name: "Capital.gr (Αγορές)", url: "https://www.capital.gr/api/tags/agores/" },
  { name: "Capital.gr (Οικονομία)", url: "https://www.capital.gr/api/tags/oikonomia/" },

  // --- Greek trade / engineering press (UNVERIFIED) ---
  { name: "Ypodomes", url: "https://ypodomes.com/feed/" },
  { name: "B2Green", url: "https://news.b2green.gr/feed/" },
  { name: "Ecopress", url: "https://ecopress.gr/feed/" },
  { name: "ICTplus", url: "https://www.ictplus.gr/feed/" },
  { name: "OT.gr", url: "https://www.ot.gr/feed/" },
  { name: "WorldEnergyNews", url: "https://www.worldenergynews.gr/feed/" },

  // --- International engineering / infrastructure trade press (UNVERIFIED) ---
  { name: "Energy Storage News", url: "https://www.energy-storage.news/feed/" },
  { name: "T&D World", url: "https://www.tdworld.com/rss.xml" },
  { name: "Capacity Media", url: "https://www.capacitymedia.com/index.rss" },
  { name: "Light Reading", url: "https://www.lightreading.com/rss_simple.asp" },
  { name: "Balkan Green Energy News", url: "https://balkangreenenergynews.com/feed/" },
  { name: "PV Magazine", url: "https://www.pv-magazine.com/feed/" },

  // energypress.gr returns HTTP 403 to Vercel regardless of path tried
  // (/rss and /index.php/rss both blocked) — their firewall appears to
  // reject cloud/datacenter IPs outright. Not fixable by changing the URL.
];
