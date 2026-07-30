import Parser from "rss-parser";
import { FEEDS } from "./feeds";
import { classify, isTechnology } from "./classify";
import { extractEntities } from "./entities";
import { detectLanguage } from "./language";

const parser = new Parser({
  customFields: {
    item: [["media:thumbnail", "mediaThumbnail"]],
  },
});

function extractImage(item) {
  const mt = item.mediaThumbnail;
  if (mt?.$?.url) return mt.$.url;
  if (typeof mt === "string") return mt;
  if (item.enclosure?.url) return item.enclosure.url;
  return null;
}

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

// Retries once on a network-level failure ("fetch failed"), which we see
// intermittently on otherwise-healthy feeds and which costs a whole feed's
// articles for that run. Deliberately does not retry HTTP status errors or
// parse errors — those are configuration problems that won't fix themselves.
async function fetchFeed(feed) {
  try {
    return await fetchFeedOnce(feed);
  } catch (err) {
    if (err instanceof TypeError) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return fetchFeedOnce(feed);
    }
    throw err;
  }
}

function fetchFeedOnce(feed) {
  if (feed.type === "wp-json") return fetchWpJsonOnce(feed);
  if (feed.type === "news-sitemap") return fetchNewsSitemapOnce(feed);
  return fetchRssOnce(feed);
}

async function fetchRssOnce(feed) {
  const res = await fetch(feed.url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
  });
  if (!res.ok) {
    throw new Error(`${feed.name}: HTTP ${res.status}`);
  }
  const xml = await res.text();

  // A wrong feed path usually returns the site's HTML page, which the XML
  // parser reports as a cryptic "Attribute without value". Say what it is.
  if (/^\s*(<!doctype html|<html)/i.test(xml)) {
    throw new Error(`${feed.name}: served HTML, not a feed — wrong URL?`);
  }

  const parsed = await parser.parseString(xml);
  return (parsed.items || []).map((item) => ({
    title: item.title || "(untitled)",
    link: item.link,
    description: item.contentSnippet || "",
    pubDate: item.pubDate ? new Date(item.pubDate) : null,
    source: feed.name,
    image: extractImage(item),
  }));
}

// WordPress's own REST API (enabled by default unless a site's admin turns
// it off) — a legitimate, intended endpoint, not scraping. Preferable to a
// site's RSS feed where both exist: no item-count cap, full content instead
// of a truncated excerpt, and structured JSON instead of hand-parsed HTML.
function decodeEntities(str) {
  return (str || "")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}

function stripHtml(html) {
  return decodeEntities((html || "").replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

async function fetchWpJsonOnce(feed) {
  const res = await fetch(feed.url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`${feed.name}: HTTP ${res.status}`);
  }
  const posts = await res.json();
  if (!Array.isArray(posts)) {
    throw new Error(`${feed.name}: response was not a JSON array — is the REST API enabled?`);
  }
  return posts.map((post) => ({
    title: stripHtml(post.title?.rendered) || "(untitled)",
    link: post.link,
    description: stripHtml(post.excerpt?.rendered || ""),
    pubDate: post.date_gmt ? new Date(`${post.date_gmt}Z`) : null,
    source: feed.name,
    image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
  }));
}

// Google News Sitemap protocol (https://www.google.com/schemas/sitemap-news/0.9) —
// many publishers maintain one specifically so crawlers see everything
// recent, which often reaches further back than a site's own RSS. It only
// carries a title, not a summary, so classify() sees less text per article
// than from RSS/wp-json — a real tradeoff, not free coverage. Parsed with a
// regex rather than a full XML parser: the format's structure is simple and
// fixed, and this avoids adding a dependency for one feed type.
async function fetchNewsSitemapOnce(feed) {
  const res = await fetch(feed.url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/xml, text/xml, */*" },
  });
  if (!res.ok) {
    throw new Error(`${feed.name}: HTTP ${res.status}`);
  }
  const xml = await res.text();
  if (/^\s*(<!doctype html|<html)/i.test(xml)) {
    throw new Error(`${feed.name}: served HTML, not a sitemap — wrong URL?`);
  }

  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
  return blocks
    .map((block) => {
      const loc = block.match(/<loc>([\s\S]*?)<\/loc>/)?.[1]?.trim();
      const title = block.match(/<news:title>([\s\S]*?)<\/news:title>/)?.[1];
      const pub = block.match(/<news:publication_date>([\s\S]*?)<\/news:publication_date>/)?.[1];
      return {
        title: title ? decodeEntities(title) : null,
        link: loc,
        description: "",
        pubDate: pub ? new Date(pub) : null,
        source: feed.name,
        image: null,
      };
    })
    .filter((item) => item.link && item.title);
}

// Fetches every configured feed and classifies each article by content.
// Returns { items, feedStatus } — items are tagged with the categories they
// matched (possibly more than one, possibly none; callers should drop
// unmatched items), and feedStatus reports per-feed success/failure so
// /api/ingest can surface which configured feeds actually work. A single
// bad feed never breaks the others. Used by the ingestion job, not by pages
// directly — pages read from the database (see src/lib/articles.js).
export async function fetchAllClassifiedItems() {
  const results = await Promise.allSettled(FEEDS.map(fetchFeed));

  const feedStatus = results.map((r, i) => {
    if (r.status === "fulfilled") {
      const kept = r.value.filter((item) => classify(item).length > 0).length;
      return { name: FEEDS[i].name, ok: true, fetched: r.value.length, relevant: kept };
    }
    const error = r.reason?.message || String(r.reason);
    console.error(`[feeds] ${FEEDS[i].name} failed:`, error);
    return { name: FEEDS[i].name, ok: false, error };
  });

  const items = results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value)
    .map((item) => ({
      ...item,
      categories: classify(item),
      technology: isTechnology(item),
      entities: extractEntities(item),
      lang: detectLanguage(`${item.title} ${item.description}`),
    }));

  return { items, feedStatus };
}
