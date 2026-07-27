import { sql, ensureSchema } from "./db";
import { fetchAllClassifiedItems } from "./fetchAndClassify";

const UPSERT_CONCURRENCY = 20;

async function upsertItem(item) {
  await sql`
    INSERT INTO articles (link, title, source, categories, image, pub_date, technology, entities, summary)
    VALUES (${item.link}, ${item.title}, ${item.source}, ${item.categories}, ${item.image}, ${item.pubDate}, ${item.technology}, ${item.entities}, ${item.description || null})
    ON CONFLICT (link) DO UPDATE SET
      title = EXCLUDED.title,
      source = EXCLUDED.source,
      categories = EXCLUDED.categories,
      image = EXCLUDED.image,
      pub_date = EXCLUDED.pub_date,
      technology = EXCLUDED.technology,
      entities = EXCLUDED.entities,
      summary = EXCLUDED.summary
  `;
}

// Fetches all feeds, classifies each article, and upserts the ones that
// matched at least one topic into the articles table. Existing rows (by
// link) get their title/categories/image refreshed but keep first_seen.
//
// Upserts run in bounded-concurrency batches rather than one at a time:
// with a dozen-plus feeds this is hundreds of rows, and doing them
// sequentially would exceed the serverless function timeout.
export async function runIngest() {
  if (!sql) {
    return { ok: false, reason: "No database configured (DATABASE_URL missing)" };
  }

  await ensureSchema();

  const { items: allItems, feedStatus } = await fetchAllClassifiedItems();

  // Dedupe by link — the same story can appear in more than one feed.
  const byLink = new Map();
  for (const item of allItems) {
    if (item.link && item.categories.length > 0) byLink.set(item.link, item);
  }
  const items = [...byLink.values()];

  let upserted = 0;
  let failed = 0;
  for (let i = 0; i < items.length; i += UPSERT_CONCURRENCY) {
    const batch = items.slice(i, i + UPSERT_CONCURRENCY);
    const results = await Promise.allSettled(batch.map(upsertItem));
    for (const r of results) {
      if (r.status === "fulfilled") upserted++;
      else {
        failed++;
        console.error("[ingest] upsert failed:", r.reason?.message || r.reason);
      }
    }
  }

  return { ok: true, relevant: items.length, upserted, failed, feeds: feedStatus };
}
