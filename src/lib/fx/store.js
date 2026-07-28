// Storage for daily signal snapshots.
//
// Serverless functions keep no filesystem between invocations, so "what did
// we hold yesterday" has to live in the database. That is not just
// bookkeeping: the whole point of watching this for a few months is having an
// honest record of what the rule said *at the time*, written before the
// outcome was known. Rows are never updated after the fact except by a re-run
// of the same day, which is how a paper-trading record stays evidence rather
// than a story told afterwards.

import { sql } from "@/lib/db";

let schemaPromise = null;

export function ensureFxSchema() {
  if (!sql) return Promise.resolve();
  if (!schemaPromise) {
    schemaPromise = createSchema().catch((err) => {
      schemaPromise = null; // allow a retry after a transient failure
      throw err;
    });
  }
  return schemaPromise;
}

async function createSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS fx_signals (
      id SERIAL PRIMARY KEY,
      asof DATE NOT NULL,
      pair TEXT NOT NULL,
      strategy TEXT NOT NULL,
      price DOUBLE PRECISION NOT NULL,
      upper_channel DOUBLE PRECISION,
      lower_channel DOUBLE PRECISION,
      vol DOUBLE PRECISION,
      raw_signal DOUBLE PRECISION NOT NULL DEFAULT 0,
      signal DOUBLE PRECISION NOT NULL DEFAULT 0,
      target DOUBLE PRECISION NOT NULL DEFAULT 0,
      previous_target DOUBLE PRECISION NOT NULL DEFAULT 0,
      bars_held INTEGER NOT NULL DEFAULT 0,
      reason TEXT,
      stale_days INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  // One row per pair per day per strategy. Re-running the cron on the same
  // day corrects that day rather than appending a second opinion.
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS fx_signals_unique
      ON fx_signals (asof, pair, strategy)
  `;
  await sql`CREATE INDEX IF NOT EXISTS fx_signals_asof_idx ON fx_signals (asof DESC)`;
}

export async function saveSignals(rows) {
  if (!sql || rows.length === 0) return 0;
  await ensureFxSchema();

  let written = 0;
  for (const r of rows) {
    await sql`
      INSERT INTO fx_signals (
        asof, pair, strategy, price, upper_channel, lower_channel, vol,
        raw_signal, signal, target, previous_target, bars_held, reason, stale_days
      ) VALUES (
        ${r.asof}, ${r.pair}, ${r.strategy}, ${r.price}, ${r.upper}, ${r.lower}, ${r.vol},
        ${r.rawSignal}, ${r.signal}, ${r.target}, ${r.previousTarget}, ${r.barsHeld},
        ${r.reason}, ${r.staleDays}
      )
      ON CONFLICT (asof, pair, strategy) DO UPDATE SET
        price = EXCLUDED.price,
        upper_channel = EXCLUDED.upper_channel,
        lower_channel = EXCLUDED.lower_channel,
        vol = EXCLUDED.vol,
        raw_signal = EXCLUDED.raw_signal,
        signal = EXCLUDED.signal,
        target = EXCLUDED.target,
        previous_target = EXCLUDED.previous_target,
        bars_held = EXCLUDED.bars_held,
        reason = EXCLUDED.reason,
        stale_days = EXCLUDED.stale_days
    `;
    written += 1;
  }
  return written;
}

/** The most recent row per pair — what the rule wants right now. */
export async function getLatestSignals(strategy) {
  if (!sql) return [];
  await ensureFxSchema();
  return sql`
    SELECT DISTINCT ON (pair) *
    FROM fx_signals
    WHERE strategy = ${strategy}
    ORDER BY pair, asof DESC
  `;
}

/** Recent position changes — the trade log, newest first. */
export async function getRecentChanges(strategy, limit = 20) {
  if (!sql) return [];
  await ensureFxSchema();
  return sql`
    SELECT * FROM fx_signals
    WHERE strategy = ${strategy} AND target IS DISTINCT FROM previous_target
    ORDER BY asof DESC, pair
    LIMIT ${limit}
  `;
}
