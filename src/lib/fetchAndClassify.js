import Parser from "rss-parser";
import { FEEDS } from "./feeds";
import { classify } from "./classify";

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

async function fetchFeed(feed) {
  const res = await fetch(feed.url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
  });
  if (!res.ok) {
    throw new Error(`${feed.name}: HTTP ${res.status}`);
  }
  const xml = await res.text();
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
    .map((item) => ({ ...item, categories: classify(item) }));

  return { items, feedStatus };
}
