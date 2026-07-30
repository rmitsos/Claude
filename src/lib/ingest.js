import { sql, ensureSchema } from "./db";
import { fetchAllClassifiedItems } from "./fetchAndClassify";
import { dedupeKey } from "./dedupe";

const UPSERT_CONCURRENCY = 20;
const BACKFILL_BATCH = 500;

async function upsertItem(item) {
  await sql`
    INSERT INTO articles (link, title, source, categories, image, pub_date, technology, entities, summary, lang, dedupe_key)
    VALUES (${item.link}, ${item.title}, ${item.source}, ${item.categories}, ${item.image}, ${item.pubDate}, ${item.technology}, ${item.entities}, ${item.description || null}, ${item.lang}, ${item.dedupeKey})
    ON CONFLICT (link) DO UPDATE SET
      title = EXCLUDED.title,
      source = EXCLUDED.source,
      categories = EXCLUDED.categories,
      image = EXCLUDED.image,
      pub_date = EXCLUDED.pub_date,
      technology = EXCLUDED.technology,
      entities = EXCLUDED.entities,
      summary = EXCLUDED.summary,
      lang = EXCLUDED.lang,
      dedupe_key = EXCLUDED.dedupe_key
  `;
}

// Rows written before dedupe_key existed have none, so nothing can be matched
// against them. Filled in batches across successive ingests rather than in one
// pass: the whole ingest shares a 60s ceiling, and a table that grows for a
// year would eventually not fit in it.
async function backfillKeys() {
  const rows = await sql`
    SELECT id, link, title, source, pub_date FROM articles
    WHERE dedupe_key IS NULL LIMIT ${BACKFILL_BATCH}
  `;
  if (!rows.length) return 0;

  const ids = [];
  const keys = [];
  for (const row of rows) {
    const key = dedupeKey({
      link: row.link,
      title: row.title,
      source: row.source,
      pubDate: row.pub_date,
    });
    // A row with no derivable key would be re-selected on every ingest
    // forever. Mark it with a sentinel so it is not reconsidered, and one
    // that matches nothing so it is never merged into another story.
    ids.push(row.id);
    keys.push(key || `none:${row.id}`);
  }

  await sql`
    UPDATE articles SET dedupe_key = data.key
    FROM (SELECT unnest(${ids}::int[]) AS id, unnest(${keys}::text[]) AS key) AS data
    WHERE articles.id = data.id
  `;
  return rows.length;
}

// Keeps the row we saw first and deletes the later copies. First-seen rather
// than freshest on purpose: a story's place in a chronological wire should be
// when it broke, not when the publisher rewrote its headline — otherwise a
// re-slug quietly promotes an old story back to the top of the page.
async function removeDuplicates() {
  const rows = await sql`
    DELETE FROM articles a
    USING articles b
    WHERE a.dedupe_key IS NOT NULL
      AND a.dedupe_key NOT LIKE 'none:%'
      AND a.dedupe_key = b.dedupe_key
      AND (a.first_seen > b.first_seen
           OR (a.first_seen = b.first_seen AND a.id > b.id))
    RETURNING a.id
  `;
  return rows.length;
}

/**
 * Groups a fetch by story rather than by URL. Both slugs of a re-published
 * article usually arrive in the same fetch, so this catches most duplicates
 * before they are ever written.
 *
 * The earlier publication wins, matching what removeDuplicates does to rows
 * that got through on an earlier run — the two have to agree, or a story
 * would be deleted and reinserted on alternate ingests.
 *
 * Exported for testing: this is the part with actual logic in it, and it is
 * pure, so it can be checked without a database.
 */
export function selectByStory(items) {
  const byStory = new Map();
  const unkeyed = [];
  for (const item of items) {
    item.dedupeKey = dedupeKey(item);
    if (!item.dedupeKey) {
      unkeyed.push(item);
      continue;
    }
    const existing = byStory.get(item.dedupeKey);
    if (!existing || new Date(item.pubDate) < new Date(existing.pubDate)) {
      byStory.set(item.dedupeKey, item);
    }
  }
  return { byStory, unkeyed };
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

  const backfilled = await backfillKeys();
  const removed = await removeDuplicates();

  const { items: allItems, feedStatus } = await fetchAllClassifiedItems();

  // Dedupe by link — the same story can appear in more than one feed.
  const byLink = new Map();
  for (const item of allItems) {
    if (item.link && item.categories.length > 0) byLink.set(item.link, item);
  }

  const { byStory, unkeyed } = selectByStory([...byLink.values()]);

  // Anything whose story we already hold under a different URL is skipped
  // outright: inserting it would recreate the duplicate that removeDuplicates
  // had just deleted, and the two would fight on every ingest.
  const keys = [...byStory.keys()];
  const held = new Map();
  if (keys.length) {
    const rows = await sql`
      SELECT dedupe_key, link FROM articles WHERE dedupe_key = ANY(${keys}::text[])
    `;
    for (const row of rows) held.set(row.dedupe_key, row.link);
  }

  let skipped = 0;
  const items = [...unkeyed];
  for (const item of byStory.values()) {
    const heldLink = held.get(item.dedupeKey);
    if (heldLink && heldLink !== item.link) {
      skipped++;
      continue;
    }
    items.push(item);
  }

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

  const result = {
    ok: true,
    relevant: items.length,
    upserted,
    failed,
    duplicatesSkipped: skipped,
    duplicatesRemoved: removed,
    keysBackfilled: backfilled,
    feeds: feedStatus,
  };

  // Logged from this one place so cron, the traffic-triggered background
  // refresh, and a manual "Scan now" from the dashboard all get a history
  // row with no duplicated logic at the call sites.
  await sql`INSERT INTO ingest_log (result) VALUES (${JSON.stringify(result)})`;

  return result;
}

// Most recent ingest runs, newest first — what the dashboard's health page
// shows instead of re-running a scan just to see the last one's outcome.
export async function getIngestHistory(limit = 10) {
  if (!sql) return [];
  const rows = await sql`
    SELECT ran_at, result FROM ingest_log ORDER BY ran_at DESC LIMIT ${limit}
  `;
  return rows.map((r) => ({ ranAt: r.ran_at, ...r.result }));
}
