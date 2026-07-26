import Parser from "rss-parser";
import { FEEDS, CATEGORIES } from "./feeds";
import { classify } from "./classify";

const parser = new Parser({
  customFields: {
    item: [["media:thumbnail", "mediaThumbnail"]],
  },
});
const REVALIDATE_SECONDS = 1800;

function extractImage(item) {
  const mt = item.mediaThumbnail;
  if (mt?.$?.url) return mt.$.url;
  if (typeof mt === "string") return mt;
  if (item.enclosure?.url) return item.enclosure.url;
  return null;
}

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
    description: item.contentSnippet || "",
    pubDate: item.pubDate ? new Date(item.pubDate) : null,
    source: feed.name,
    image: extractImage(item),
  }));
}

// Fetches every configured feed, classifies each article by content, and
// returns a { [category]: items[] } map. An article can appear under more
// than one category if it genuinely matches both; articles matching none
// of our topics are dropped. A single bad feed never breaks the others.
export async function getAllCategorizedItems() {
  const results = await Promise.allSettled(FEEDS.map(fetchFeed));

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[feeds] ${FEEDS[i].name} failed:`, r.reason?.message || r.reason);
    }
  });

  const allItems = results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value);

  const byCategory = Object.fromEntries(Object.keys(CATEGORIES).map((c) => [c, []]));

  for (const item of allItems) {
    for (const category of classify(item)) {
      byCategory[category]?.push(item);
    }
  }

  for (const category of Object.keys(byCategory)) {
    byCategory[category].sort(
      (a, b) => (b.pubDate?.getTime() || 0) - (a.pubDate?.getTime() || 0)
    );
  }

  return byCategory;
}

export async function getCategoryItems(category) {
  const all = await getAllCategorizedItems();
  return all[category] || [];
}
