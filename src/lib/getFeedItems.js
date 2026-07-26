import Parser from "rss-parser";
import { FEEDS } from "./feeds";

const parser = new Parser();
const REVALIDATE_SECONDS = 1800;

async function fetchFeed(feed) {
  const res = await fetch(feed.url, {
    next: { revalidate: REVALIDATE_SECONDS },
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
    pubDate: item.pubDate ? new Date(item.pubDate) : null,
    source: feed.name,
  }));
}

// Fetches every feed for a category, drops any that fail, and returns
// items sorted newest-first. Never throws — a bad feed just yields fewer items.
export async function getCategoryItems(category) {
  const feeds = FEEDS.filter((f) => f.categories.includes(category));
  const results = await Promise.allSettled(feeds.map(fetchFeed));

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[feeds] ${feeds[i].name} failed:`, r.reason?.message || r.reason);
    }
  });

  const items = results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value);

  items.sort((a, b) => (b.pubDate?.getTime() || 0) - (a.pubDate?.getTime() || 0));
  return items;
}

export async function getAllCategorizedItems() {
  const categories = Object.keys(
    FEEDS.reduce((acc, f) => {
      f.categories.forEach((c) => (acc[c] = true));
      return acc;
    }, {})
  );

  const entries = await Promise.all(
    categories.map(async (category) => [category, await getCategoryItems(category)])
  );

  return Object.fromEntries(entries);
}
