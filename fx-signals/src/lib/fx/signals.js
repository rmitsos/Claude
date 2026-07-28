// Orchestration: prices in, explained signals out.

import { PAIRS, STRATEGY, MIN_BARS } from "./config";
import { fetchDailyCloses, ageInDays } from "./prices";
import { runStrategy, explain } from "./strategy";
import { saveSignals } from "./store";

const STALE_AFTER_DAYS = 5;

/**
 * Compute today's signal for every pair.
 *
 * One dead feed must not take the others down with it, so failures are
 * collected per pair rather than thrown. A partial answer with a visible gap
 * is more useful than no answer, as long as the gap is visible — which is why
 * `errors` is surfaced on the page rather than only logged.
 */
export async function computeSignals() {
  const rows = [];
  const errors = [];

  const settled = await Promise.allSettled(
    PAIRS.map(async (pair) => ({ pair, data: await fetchDailyCloses(pair.stooq) }))
  );

  for (let i = 0; i < settled.length; i++) {
    const outcome = settled[i];
    const pair = PAIRS[i];

    if (outcome.status === "rejected") {
      errors.push(`${pair.code}: ${outcome.reason?.message || outcome.reason}`);
      continue;
    }

    const { dates, closes } = outcome.value.data;
    if (closes.length < MIN_BARS) {
      errors.push(`${pair.code}: only ${closes.length} bars, need ${MIN_BARS}`);
      continue;
    }

    const result = runStrategy(closes, STRATEGY);
    const view = explain(result);
    const asof = dates[dates.length - 1];
    const staleDays = ageInDays(asof);

    rows.push({
      asof,
      pair: pair.code,
      label: pair.label,
      pip: pair.pip,
      strategy: STRATEGY.strategy,
      staleDays,
      ...view,
    });
  }

  return { rows, errors, strategy: STRATEGY };
}

/** Compute and persist. Called by the cron route. */
export async function runSignalUpdate() {
  const { rows, errors } = await computeSignals();

  const stale = rows.filter((r) => r.staleDays > STALE_AFTER_DAYS);
  for (const r of stale) {
    errors.push(`${r.pair}: data is ${r.staleDays} days old (last bar ${r.asof})`);
  }

  let written = 0;
  try {
    written = await saveSignals(rows);
  } catch (err) {
    errors.push(`database write failed: ${err?.message || err}`);
  }

  return {
    ok: rows.length > 0,
    computed: rows.length,
    written,
    changes: rows.filter((r) => r.target !== r.previousTarget).length,
    errors,
  };
}

export { STALE_AFTER_DAYS };
