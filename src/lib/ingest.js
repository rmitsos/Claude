import { sql, ensureSchema } from "./db";
import { fetchAllClassifiedItems } from "./fetchAndClassify";

// Fetches all feeds, classifies each article, and upserts the ones that
// matched at least one topic into the articles table. Existing rows (by
// link) get their title/categories/image refreshed but keep first_seen.
export async function runIngest() {
  if (!sql) {
    return { ok: false, reason: "No database configured (DATABASE_URL missing)" };
  }

  await ensureSchema();

  const { items: allItems, feedStatus } = await fetchAllClassifiedItems();
  const items = allItems.filter((i) => i.categories.length > 0);

  let upserted = 0;
  for (const item of items) {
    if (!item.link) continue;
    await sql`
      INSERT INTO articles (link, title, source, categories, image, pub_date)
      VALUES (${item.link}, ${item.title}, ${item.source}, ${item.categories}, ${item.image}, ${item.pubDate})
      ON CONFLICT (link) DO UPDATE SET
        title = EXCLUDED.title,
        source = EXCLUDED.source,
        categories = EXCLUDED.categories,
        image = EXCLUDED.image,
        pub_date = EXCLUDED.pub_date
    `;
    upserted++;
  }

  return { ok: true, relevant: items.length, upserted, feeds: feedStatus };
}
