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
    entities: row.entities || [],
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

// The only images on the site. Picks the newest story with an image from
// each category first, then fills the rest by recency — otherwise a busy
// Finance day would supply all five and the lead block would misrepresent
// what the week actually covered.
export async function getLeadStories(limit = 5) {
  const rows = await safeQuery("read leads", () => sql`
    SELECT * FROM articles
    WHERE image IS NOT NULL
      AND pub_date > now() - interval '72 hours'
    ORDER BY pub_date DESC LIMIT 40
  `);

  const candidates = rows.map(rowToItem);
  const picked = [];
  const used = new Set();

  for (const category of Object.keys(CATEGORIES)) {
    const match = candidates.find(
      (item) => !used.has(item.link) && item.categories.includes(category)
    );
    if (match) {
      picked.push(match);
      used.add(match.link);
    }
  }

  for (const item of candidates) {
    if (picked.length >= limit) break;
    if (!used.has(item.link)) {
      picked.push(item);
      used.add(item.link);
    }
  }

  return picked
    .slice(0, limit)
    .sort((a, b) => (b.pubDate?.getTime() || 0) - (a.pubDate?.getTime() || 0));
}

// --- Search ----------------------------------------------------------

export const PERIODS = {
  "7d": { label: "Last 7 days", interval: "7 days" },
  "30d": { label: "Last 30 days", interval: "30 days" },
  "3m": { label: "Last 3 months", interval: "3 months" },
  "12m": { label: "Last 12 months", interval: "12 months" },
  all: { label: "Everything", interval: null },
};

export const DEFAULT_PERIOD = "30d";

export async function searchArticles({ tag = null, period = DEFAULT_PERIOD }) {
  const interval = PERIODS[period]?.interval ?? PERIODS[DEFAULT_PERIOD].interval;

  const rows = await safeQuery(`search ${tag ?? "any"}/${period}`, () => {
    if (tag && interval) {
      return sql`
        SELECT * FROM articles
        WHERE ${tag} = ANY(entities)
          AND pub_date > now() - (${interval})::interval
        ORDER BY pub_date DESC LIMIT 200
      `;
    }
    if (tag) {
      return sql`
        SELECT * FROM articles WHERE ${tag} = ANY(entities)
        ORDER BY pub_date DESC LIMIT 200
      `;
    }
    if (interval) {
      return sql`
        SELECT * FROM articles
        WHERE pub_date > now() - (${interval})::interval
        ORDER BY pub_date DESC LIMIT 200
      `;
    }
    return sql`SELECT * FROM articles ORDER BY pub_date DESC LIMIT 200`;
  });

  return rows.map(rowToItem);
}

// When collection actually began. Without this, "last 12 months: 6 results"
// reads as a quiet year rather than a young archive — the results are
// accurate and the impression is false.
export async function getArchiveStart() {
  const rows = await safeQuery("read archive start", () => sql`
    SELECT min(first_seen) AS started, count(*) AS total FROM articles
  `);
  const row = rows[0];
  if (!row?.started) return null;
  return { started: new Date(row.started), total: Number(row.total) };
}

export async function getEntityItems(entityId, days = 30) {
  const rows = await safeQuery(`read entity ${entityId}`, () => sql`
    SELECT * FROM articles
    WHERE ${entityId} = ANY(entities)
      AND pub_date > now() - (${String(days)} || ' days')::interval
    ORDER BY pub_date DESC LIMIT 100
  `);
  return rows.map(rowToItem);
}

// --- Weekly analysis -------------------------------------------------
// Everything below is counted from the stored articles. Nothing is
// inferred or generated: each figure traces back to rows you can open.

export async function getWeeklyVolume() {
  const rows = await safeQuery("read volume", () => sql`
    SELECT
      unnest(categories) AS category,
      count(*) FILTER (WHERE pub_date > now() - interval '7 days') AS this_week,
      count(*) FILTER (
        WHERE pub_date <= now() - interval '7 days'
          AND pub_date > now() - interval '14 days'
      ) AS last_week
    FROM articles
    WHERE pub_date > now() - interval '14 days'
    GROUP BY 1
  `);
  return rows.map((r) => ({
    category: r.category,
    thisWeek: Number(r.this_week),
    lastWeek: Number(r.last_week),
  }));
}

// Entity mention counts for the past week against the week before, so a
// theme that is genuinely accelerating is distinguishable from one that is
// simply always present.
export async function getEntityTrends() {
  const rows = await safeQuery("read entity trends", () => sql`
    SELECT
      unnest(entities) AS entity,
      count(*) FILTER (WHERE pub_date > now() - interval '7 days') AS this_week,
      count(*) FILTER (
        WHERE pub_date <= now() - interval '7 days'
          AND pub_date > now() - interval '14 days'
      ) AS last_week
    FROM articles
    WHERE pub_date > now() - interval '14 days'
    GROUP BY 1
    ORDER BY 2 DESC
  `);
  return rows
    .map((r) => ({
      entity: r.entity,
      thisWeek: Number(r.this_week),
      lastWeek: Number(r.last_week),
    }))
    .filter((r) => r.thisWeek > 0);
}

// Pairs of entities appearing in the same article. This is co-occurrence,
// not correlation — it says these subjects showed up together, which is
// worth a reader's attention, but the volumes here are far too small to
// support a statistical claim.
export async function getCooccurrences(minCount = 2) {
  const rows = await safeQuery("read co-occurrence", () => sql`
    SELECT a.entity AS left_entity, b.entity AS right_entity, count(*) AS shared
    FROM (
      SELECT link, unnest(entities) AS entity FROM articles
      WHERE pub_date > now() - interval '7 days'
    ) a
    JOIN (
      SELECT link, unnest(entities) AS entity FROM articles
      WHERE pub_date > now() - interval '7 days'
    ) b ON a.link = b.link AND a.entity < b.entity
    GROUP BY 1, 2
    HAVING count(*) >= ${minCount}
    ORDER BY 3 DESC
    LIMIT 12
  `);
  return rows.map((r) => ({
    left: r.left_entity,
    right: r.right_entity,
    shared: Number(r.shared),
  }));
}

// Articles mentioning both entities in a pair — the "read deeper" target
// behind every connection shown on the weekly page.
export async function getPairItems(left, right) {
  const rows = await safeQuery(`read pair ${left}+${right}`, () => sql`
    SELECT * FROM articles
    WHERE ${left} = ANY(entities) AND ${right} = ANY(entities)
      AND pub_date > now() - interval '7 days'
    ORDER BY pub_date DESC LIMIT 20
  `);
  return rows.map(rowToItem);
}

export async function getWeeklyTotals() {
  const rows = await safeQuery("read totals", () => sql`
    SELECT
      count(*) FILTER (WHERE pub_date > now() - interval '7 days') AS this_week,
      count(*) FILTER (
        WHERE pub_date <= now() - interval '7 days'
          AND pub_date > now() - interval '14 days'
      ) AS last_week,
      count(*) FILTER (WHERE pub_date > now() - interval '7 days' AND technology) AS tech_week,
      count(DISTINCT source) FILTER (WHERE pub_date > now() - interval '7 days') AS sources
    FROM articles
    WHERE pub_date > now() - interval '14 days'
  `);
  const r = rows[0] || {};
  return {
    thisWeek: Number(r.this_week || 0),
    lastWeek: Number(r.last_week || 0),
    techWeek: Number(r.tech_week || 0),
    sources: Number(r.sources || 0),
  };
}
