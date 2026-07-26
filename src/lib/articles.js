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
// cron job, see src/lib/ingest.js) rather than fetching feeds live on every
// page render. If no database is configured, returns empty results instead
// of throwing, so local builds without DATABASE_URL still succeed.
export async function getCategoryItems(category) {
  if (!sql) return [];
  const rows = await sql`
    SELECT * FROM articles
    WHERE ${category} = ANY(categories)
      AND pub_date > now() - (${MAX_AGE_DAYS}::text || ' days')::interval
    ORDER BY pub_date DESC
    LIMIT ${LIMIT_PER_CATEGORY}
  `;
  return rows.map(rowToItem);
}

export async function getAllCategorizedItems() {
  const entries = await Promise.all(
    Object.keys(CATEGORIES).map(async (category) => [category, await getCategoryItems(category)])
  );
  return Object.fromEntries(entries);
}
