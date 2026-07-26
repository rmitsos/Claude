import { neon } from "@neondatabase/serverless";

// Neon's Vercel integration sets DATABASE_URL; older Vercel Postgres setups
// used POSTGRES_URL. Support both. If neither is set (e.g. a local build
// without the DB connected), `sql` is null and callers fall back gracefully
// instead of crashing.
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

export const sql = connectionString ? neon(connectionString) : null;

// Memoised per serverless instance: the statements are all IF NOT EXISTS,
// but they'd otherwise run on every request that touches the database.
let schemaPromise = null;

export function ensureSchema() {
  if (!sql) return Promise.resolve();
  if (!schemaPromise) {
    schemaPromise = createSchema().catch((err) => {
      schemaPromise = null; // let a later call retry after a transient failure
      throw err;
    });
  }
  return schemaPromise;
}

async function createSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      link TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      source TEXT NOT NULL,
      categories TEXT[] NOT NULL DEFAULT '{}',
      image TEXT,
      pub_date TIMESTAMPTZ,
      first_seen TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  // Added after the table already existed in production, so it has to be a
  // migration rather than part of the CREATE above. Existing rows default
  // to false and get their real value on the next ingest.
  await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS technology BOOLEAN NOT NULL DEFAULT false`;
  await sql`CREATE INDEX IF NOT EXISTS articles_pub_date_idx ON articles (pub_date DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS articles_categories_idx ON articles USING GIN (categories)`;
  await sql`
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value TIMESTAMPTZ NOT NULL
    )
  `;
}

// Atomically claims the right to run an ingest, returning true only if at
// least `minIntervalMinutes` have passed since the last claim. The INSERT
// ... ON CONFLICT DO UPDATE ... WHERE runs as a single statement, so when
// several concurrent requests race, exactly one gets a row back and the
// rest are told to skip — without this, every visitor could kick off their
// own ingest at once.
export async function claimIngestSlot(minIntervalMinutes) {
  if (!sql) return false;
  await ensureSchema(); // the meta table may not exist yet on a fresh database
  const rows = await sql`
    INSERT INTO meta (key, value)
    VALUES ('last_ingest', now())
    ON CONFLICT (key) DO UPDATE SET value = now()
    WHERE meta.value < now() - (${String(minIntervalMinutes)} || ' minutes')::interval
    RETURNING key
  `;
  return rows.length > 0;
}
