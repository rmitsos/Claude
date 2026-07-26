import { sql } from "./db";
import { CATEGORIES } from "./feeds";

const MAX_AGE_DAYS = 14;
const LIMIT_PER_CATEGORY = 80;

function rowToItem(row) {
  return {
    title: row.title,
    link: row.link,
    source: row.source,
    image: row.image,
    categories: row.categories || [],
    technology: row.technology,
    pubDate: row.pub_date ? new Date(row.pub_date) : null,
  };
}

// Every read goes through here: the database is optional (local builds have
// no DATABASE_URL) and can fail transiently, and neither should be able to
// take a page down — an empty section is always better than a failed build.
async function safeQuery(label, run) {
  if (!sql) return [];
  try {
    return await run();
  } catch (err) {
    console.error(`[articles] ${label} failed:`, err?.message || err);
    return [];
  }
}

// `sub` is "news", "technology", or null for everything in the category.
export async function getCategoryItems(category, sub = null) {
  const rows = await safeQuery(`read ${category}/${sub ?? "all"}`, () => {
    if (sub === "technology") {
      return sql`
        SELECT * FROM articles
        WHERE ${category} = ANY(categories) AND technology = true
          AND pub_date > now() - (${MAX_AGE_DAYS}::text || ' days')::interval
        ORDER BY pub_date DESC LIMIT ${LIMIT_PER_CATEGORY}
      `;
    }
    if (sub === "news") {
      return sql`
        SELECT * FROM articles
        WHERE ${category} = ANY(categories) AND technology = false
          AND pub_date > now() - (${MAX_AGE_DAYS}::text || ' days')::interval
        ORDER BY pub_date DESC LIMIT ${LIMIT_PER_CATEGORY}
      `;
    }
    return sql`
      SELECT * FROM articles
      WHERE ${category} = ANY(categories)
        AND pub_date > now() - (${MAX_AGE_DAYS}::text || ' days')::interval
      ORDER BY pub_date DESC LIMIT ${LIMIT_PER_CATEGORY}
    `;
  });
  return rows.map(rowToItem);
}

// The combined wire: every article, newest first, regardless of category.
export async function getWireItems(limit = 120) {
  const rows = await safeQuery("read wire", () => sql`
    SELECT * FROM articles
    WHERE pub_date > now() - (${MAX_AGE_DAYS}::text || ' days')::interval
    ORDER BY pub_date DESC LIMIT ${limit}
  `);
  return rows.map(rowToItem);
}

// Per-category counts for the last 24h, for the rail's tally.
export async function getTodayCounts() {
  const rows = await safeQuery("read counts", () => sql`
    SELECT
      unnest(categories) AS category,
      count(*) AS total,
      count(*) FILTER (WHERE technology) AS technology
    FROM articles
    WHERE pub_date > now() - interval '24 hours'
    GROUP BY 1
  `);

  const counts = Object.fromEntries(
    Object.keys(CATEGORIES).map((c) => [c, { total: 0, technology: 0 }])
  );
  for (const row of rows) {
    if (counts[row.category]) {
      counts[row.category] = {
        total: Number(row.total),
        technology: Number(row.technology),
      };
    }
  }
  return counts;
}

// The rail's single image. Prefers a recent article that actually has one —
// most engineering sources supply none, so this can legitimately be null.
export async function getLeadStory() {
  const rows = await safeQuery("read lead", () => sql`
    SELECT * FROM articles
    WHERE image IS NOT NULL
      AND pub_date > now() - interval '48 hours'
    ORDER BY pub_date DESC LIMIT 1
  `);
  return rows.length ? rowToItem(rows[0]) : null;
}
