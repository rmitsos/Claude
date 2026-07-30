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

export const SUBCATEGORIES = {
  news: "News",
  technology: "Technology",
};

// Only Telco and Energy split into News / Technology — those are the beats
// where "who announced what" and "what actually got built" are genuinely
// different reads. Finance stays whole.
export const SUBCATEGORIZED = ["telco", "energy"];

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
  { name: "Capacity Media", url: "https://www.capacitymedia.com/rss" },
  { name: "Balkan Green Energy News", url: "https://balkangreenenergynews.com/feed/" },
  { name: "PV Magazine", url: "https://www.pv-magazine.com/feed/" },

  // --- Telecom trade press, added to enrich the thinnest beat (verified via
  // a real production ingest) ---
  { name: "FierceTelecom", url: "https://www.fierce-network.com/rss.xml" },
  { name: "RCR Wireless News", url: "https://www.rcrwireless.com/feed" },
  { name: "DataCenterDynamics", url: "https://www.datacenterdynamics.com/en/rss/" },
  { name: "Mobile World Live", url: "https://www.mobileworldlive.com/feed" },

  // --- WordPress REST API comparison for existing Greek trade sources
  // (unverified — same reachability caveat as everywhere else in this file).
  // A wp-json feed reads the sites' own intended API, not their RSS: no
  // item-count cap and full content instead of a short excerpt. Running
  // alongside the matching RSS entry above for now, since both resolve to
  // the same article links and the DB upsert is keyed on link — no
  // duplicates either way. Once confirmed via /api/ingest, drop the RSS
  // entry above and keep only whichever one actually gets more/better data. ---
  { name: "Ypodomes (WP API)", type: "wp-json", url: "https://ypodomes.com/wp-json/wp/v2/posts?per_page=30&_embed" },
  { name: "B2Green (WP API)", type: "wp-json", url: "https://news.b2green.gr/wp-json/wp/v2/posts?per_page=30&_embed" },
  { name: "ICTplus (WP API)", type: "wp-json", url: "https://www.ictplus.gr/wp-json/wp/v2/posts?per_page=30&_embed" },

  // --- New candidate sources for Southeast Europe energy/finance trade
  // press, a beat the current list barely touches. Found via search, not
  // confirmed reachable from this sandbox — URLs are best-effort (Renewables
  // Now and Euro2day's paths are a guess at their convention, not seen
  // directly). Check /api/ingest; prune whatever 403s or 404s. ---
  { name: "SeeNews", url: "https://seenews.com/feed" },
  { name: "Renewables Now", url: "https://renewablesnow.com/feed/" },
  { name: "Euro2day", url: "https://www.euro2day.gr/rss" },

  // --- Confirmed unusable, do not re-add without a genuinely new URL ---
  // Sites returning 403 block cloud/datacenter IPs; a different path will
  // not help. Sites serving HTML/non-RSS had the wrong path tried.
  // energypress.gr      — 403 on /rss and /index.php/rss
  // Ecopress            — 403 on /feed/
  // Light Reading       — 403 on /rss_simple.asp
  // Telecoms.com        — 403 on /feed
  // WorldEnergyNews     — /feed/ served HTML; /rss not valid RSS 1 or 2
  // Developing Telecoms — 404 on /feed
  // TelecomTV           — 404 on /rss/
];
