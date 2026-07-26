import { sql } from "./db";
import { CATEGORIES } from "./feeds";

const MAX_AGE_DAYS = 14;
const LIMIT_PER_CATEGORY = 60;

function rowToItem(row) {
  return {
    title: row.title,
    link: row.link,
    source: row.source,
    image: row.image,
    pubDate: row.pub_date ? new Date(row.pub_date) : null,
  };
}

// Reads classified articles from the database (populated by the ingestion
// job, see src/lib/ingest.js) rather than fetching feeds live on every page
// render. Never throws: with no database configured, an un-created schema
// (fresh deploy, before the first ingest), or a transient connection
// failure, this returns an empty list so the page renders empty instead of
// failing the build.
export async function getCategoryItems(category) {
  if (!sql) return [];
  try {
    const rows = await sql`
      SELECT * FROM articles
      WHERE ${category} = ANY(categories)
        AND pub_date > now() - (${MAX_AGE_DAYS}::text || ' days')::interval
      ORDER BY pub_date DESC
      LIMIT ${LIMIT_PER_CATEGORY}
    `;
    return rows.map(rowToItem);
  } catch (err) {
    console.error(`[articles] read failed for ${category}:`, err?.message || err);
    return [];
  }
}

export async function getAllCategorizedItems() {
  const entries = await Promise.all(
    Object.keys(CATEGORIES).map(async (category) => [category, await getCategoryItems(category)])
  );
  return Object.fromEntries(entries);
}
