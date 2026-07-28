// Signal math, ported from the Python research kit in `forex/fxlab`.
//
// This is a deliberate second implementation of code that already exists,
// which is normally a mistake — two copies drift, and the copy that drifts is
// the one placing trades. It is here because the research kit needs pandas
// and the serverless function needs to be small and cold-start fast.
//
// The drift is held shut by `forex/tests/test_parity.py`, which runs the same
// prices through both implementations and asserts the targets match to 1e-12.
// If you change anything in this file, that test must still pass, or the
// signals on the site are no longer the ones that were validated.
//
// Conventions match the Python exactly, including the NaN edges:
//   - returns[0] is NaN (no prior close)
//   - a rolling window of n is NaN until n observations exist
//   - the *signal* at bar t uses only data up to and including bar t
//   - the execution lag is NOT applied here; a signal for today is a
//     decision to act at today's close.

const TRADING_DAYS = 252;

export const DEFAULTS = {
  strategy: "donchian",
  lookback: 20,
  maxHold: 10,
  volTarget: 0.1,
  volWindow: 20,
  maxLeverage: 1.0,
  rebalanceBand: 0.25,
};

/** Bar-over-bar simple returns. Index 0 is NaN, matching pandas pct_change(). */
export function pctChange(values, periods = 1) {
  const out = new Array(values.length).fill(NaN);
  for (let i = periods; i < values.length; i++) {
    const prev = values[i - periods];
    if (Number.isFinite(prev) && prev !== 0 && Number.isFinite(values[i])) {
      out[i] = values[i] / prev - 1;
    }
  }
  return out;
}

/** Sample standard deviation (ddof=1) over a trailing window, annualized. */
export function realizedVol(returns, window, periodsPerYear = TRADING_DAYS) {
  const out = new Array(returns.length).fill(NaN);
  for (let i = 0; i < returns.length; i++) {
    if (i < window) continue; // returns[0] is NaN, so a full window starts at i=window
    const slice = returns.slice(i - window + 1, i + 1);
    if (slice.some((v) => !Number.isFinite(v))) continue;
    const mean = slice.reduce((a, b) => a + b, 0) / slice.length;
    const variance =
      slice.reduce((a, b) => a + (b - mean) ** 2, 0) / (slice.length - 1);
    out[i] = Math.sqrt(variance) * Math.sqrt(periodsPerYear);
  }
  return out;
}

/**
 * Channel breakout. Long on a new `lookback`-bar high, short on a new low,
 * and hold the last position in between — that last part is what makes it a
 * trend follower rather than a string of one-bar bets.
 *
 * The channel is built from bars strictly *before* the current one, so a bar
 * that sets a new high can trigger on itself.
 */
export function donchian(closes, lookback) {
  const upper = new Array(closes.length).fill(NaN);
  const lower = new Array(closes.length).fill(NaN);
  const signal = new Array(closes.length).fill(0);

  let last = NaN;
  for (let i = 0; i < closes.length; i++) {
    if (i >= lookback) {
      const prior = closes.slice(i - lookback, i);
      upper[i] = Math.max(...prior);
      lower[i] = Math.min(...prior);
      if (closes[i] > upper[i]) last = 1;
      else if (closes[i] < lower[i]) last = -1;
    }
    signal[i] = Number.isFinite(last) ? last : 0;
  }
  return { signal, upper, lower };
}

/** Time-series momentum: sign of the return over the last `lookback` bars. */
export function tsm(closes, lookback) {
  const change = pctChange(closes, lookback);
  const signal = change.map((v) => (Number.isFinite(v) ? Math.sign(v) : 0));
  return { signal, upper: new Array(closes.length).fill(NaN), lower: new Array(closes.length).fill(NaN) };
}

/**
 * Force flat after `maxBars` bars in the same direction, and stay flat until
 * the underlying rule actually changes its mind. Re-entering on the next bar
 * would make the cap a no-op that only pays spread.
 *
 * Also returns how long each position has been held, which the page needs in
 * order to show when a forced exit is coming.
 */
export function withMaxHold(signal, maxBars) {
  const capped = new Array(signal.length).fill(0);
  const barsHeld = new Array(signal.length).fill(0);

  let current = 0;
  let lastOpinion = null;
  let held = 0;

  for (let i = 0; i < signal.length; i++) {
    const opinion = signal[i];
    if (opinion !== lastOpinion) {
      lastOpinion = opinion;
      current = opinion;
      held = 0;
    }
    if (current !== 0) {
      held += 1;
      if (maxBars > 0 && held > maxBars) current = 0;
    }
    capped[i] = current;
    barsHeld[i] = current === 0 ? 0 : held;
  }
  return { signal: capped, barsHeld };
}

/** Position scale targeting constant volatility, known at the close of bar t. */
export function volatilitySizer(vol, { volTarget, maxLeverage }) {
  return vol.map((v) => {
    if (!Number.isFinite(v) || v === 0) return 0;
    return Math.min(volTarget / v, maxLeverage);
  });
}

/** Hold the current position until the target drifts more than `band` away. */
export function applyRebalanceBand(target, band) {
  if (!(band > 0)) return target.slice();
  const held = new Array(target.length).fill(0);
  let current = 0;
  for (let i = 0; i < target.length; i++) {
    const want = Number.isFinite(target[i]) ? target[i] : 0;
    if (Math.abs(want - current) > band) current = want;
    held[i] = current;
  }
  return held;
}

/**
 * Run a full strategy over a close series.
 *
 * Returns per-bar arrays rather than just the final value, because the page
 * exists to show the reasoning, not only the conclusion — and because a
 * single number is impossible to check against the Python.
 */
export function runStrategy(closes, options = {}) {
  const cfg = { ...DEFAULTS, ...options };
  const base =
    cfg.strategy === "tsm"
      ? tsm(closes, cfg.lookback)
      : donchian(closes, cfg.lookback);

  const { signal: capped, barsHeld } = withMaxHold(base.signal, cfg.maxHold);
  const returns = pctChange(closes);
  const vol = realizedVol(returns, cfg.volWindow);
  const scale = volatilitySizer(vol, cfg);

  const raw = capped.map((s, i) =>
    Math.max(-cfg.maxLeverage, Math.min(cfg.maxLeverage, s * scale[i]))
  );
  const target = applyRebalanceBand(raw, cfg.rebalanceBand);

  return {
    config: cfg,
    closes,
    returns,
    upper: base.upper,
    lower: base.lower,
    rawSignal: base.signal,
    signal: capped,
    barsHeld,
    vol,
    scale,
    target,
  };
}

/**
 * Everything needed to explain today's decision in words.
 *
 * `distanceToLong`/`distanceToShort` answer the question you actually have
 * when looking at a flat position: how far is it from doing something?
 */
export function explain(result, index = result.closes.length - 1) {
  const i = index;
  const cfg = result.config;
  const price = result.closes[i];
  const upper = result.upper[i];
  const lower = result.lower[i];
  const target = result.target[i];
  const prev = i > 0 ? result.target[i - 1] : 0;

  const held = result.barsHeld[i];
  const capFires = cfg.maxHold > 0 && result.signal[i] !== 0;

  return {
    price,
    upper,
    lower,
    vol: result.vol[i],
    scale: result.scale[i],
    rawSignal: result.rawSignal[i],
    signal: result.signal[i],
    target,
    previousTarget: prev,
    delta: target - prev,
    barsHeld: held,
    barsToForcedExit: capFires ? Math.max(0, cfg.maxHold - held + 1) : null,
    distanceToLong: Number.isFinite(upper) ? upper / price - 1 : null,
    distanceToShort: Number.isFinite(lower) ? lower / price - 1 : null,
    reason: describe(result, i),
  };
}

function describe(result, i) {
  const cfg = result.config;
  const target = result.target[i];
  const prev = i > 0 ? result.target[i - 1] : 0;
  const signal = result.signal[i];
  const raw = result.rawSignal[i];
  const held = result.barsHeld[i];

  if (target !== prev) {
    if (target === 0 && raw !== 0 && signal === 0) {
      return `Forced flat: held ${cfg.maxHold} bars, the maximum. Staying out until the ${cfg.strategy} rule changes direction.`;
    }
    if (target === 0) return "Rule went flat.";
    const dir = target > 0 ? "long" : "short";
    const level = target > 0 ? result.upper[i] : result.lower[i];
    if (cfg.strategy === "donchian" && Number.isFinite(level)) {
      return `Went ${dir}: close broke the ${cfg.lookback}-bar ${target > 0 ? "high" : "low"} of ${level.toFixed(5)}.`;
    }
    return `Went ${dir} on the ${cfg.strategy} rule.`;
  }

  if (target === 0) {
    if (raw !== 0 && signal === 0) return "Flat — the max-hold cap is still in force.";
    return "Flat — no breakout. Waiting.";
  }
  return `Holding ${target > 0 ? "long" : "short"}, bar ${held} of ${cfg.maxHold}.`;
}
