import { neon } from "@neondatabase/serverless";

// Neon's Vercel integration sets DATABASE_URL; older Vercel Postgres setups
// used POSTGRES_URL. Support both. If neither is set (e.g. a local build
// without the DB connected), `sql` is null and callers fall back gracefully
// instead of crashing.
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

export const sql = connectionString ? neon(connectionString) : null;

export async function ensureSchema() {
  if (!sql) return;
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
  await sql`CREATE INDEX IF NOT EXISTS articles_pub_date_idx ON articles (pub_date DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS articles_categories_idx ON articles USING GIN (categories)`;
}
