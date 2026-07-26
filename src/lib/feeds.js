// Feed sources for GR Wire, seeded from sources/greek-news-sources.md.
// Feeds are fetched without trusting their own broad category (e.g.
// Capital.gr's "Οικονομία" mixes in world news, wildfires, sports) —
// each article is classified by content instead, see classify.js.
//
// Status below reflects a real production ingest. /api/ingest reports
// per-feed ok/error plus fetched and relevant counts — re-check it after
// changing anything here, and prune whatever stops resolving.

export const CATEGORIES = {
  finance: "Finance",
  telco: "Telco Infrastructure",
  energy: "Energy Infrastructure",
};

export const FEEDS = [
  // --- Greek general/business (verified working) ---
  { name: "Naftemporiki", url: "https://www.naftemporiki.gr/feed/" },
  { name: "Capital.gr (Αγορές)", url: "https://www.capital.gr/api/tags/agores/" },
  { name: "Capital.gr (Οικονομία)", url: "https://www.capital.gr/api/tags/oikonomia/" },
  { name: "OT.gr", url: "https://www.ot.gr/feed/" },

  // --- Greek trade / engineering (verified working) ---
  { name: "Ypodomes", url: "https://ypodomes.com/feed/" },
  { name: "B2Green", url: "https://news.b2green.gr/feed/" },
  { name: "ICTplus", url: "https://www.ictplus.gr/feed/" },

  // --- International engineering trade press (verified working) ---
  { name: "Energy Storage News", url: "https://www.energy-storage.news/feed/" },
  { name: "T&D World", url: "https://www.tdworld.com/rss.xml" },
  { name: "Balkan Green Energy News", url: "https://balkangreenenergynews.com/feed/" },
  { name: "PV Magazine", url: "https://www.pv-magazine.com/feed/" },

  // --- Telco candidates (UNVERIFIED) ---
  // Telco is our thinnest category: the two telco-heavy international
  // sources both failed (Light Reading 403, Capacity Media served HTML),
  // leaving ICTplus as the only dedicated telecom feed. Trying alternates.
  { name: "Telecoms.com", url: "https://www.telecoms.com/feed" },
  { name: "Capacity Media (alt)", url: "https://www.capacitymedia.com/rss" },
  { name: "WorldEnergyNews (alt)", url: "https://www.worldenergynews.gr/rss" },

  // --- Confirmed unusable, do not re-add without a new URL ---
  // energypress.gr    — HTTP 403 on /rss and /index.php/rss (blocks cloud IPs)
  // Ecopress          — HTTP 403 on /feed/
  // Light Reading     — HTTP 403 on /rss_simple.asp
  // Capacity Media    — /index.rss served HTML, not XML (parse error)
  // WorldEnergyNews   — /feed/ served HTML, not XML (parse error)
];
