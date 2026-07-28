// Daily FX closes from stooq.com — free, no API key, plain CSV.
//
// Treat this as what it is: a convenience feed, not your broker's prices.
// It is indicative daily data with occasional gaps and no guarantee of
// timeliness. Good enough to generate a signal you are watching rather than
// trading. Before real money is involved, this should be replaced by the
// broker's own series, so the prices deciding the signal are the prices you
// could actually deal at.

const STOOQ = "https://stooq.com/q/d/l/";

/**
 * Fetch daily closes for one symbol, oldest first.
 * Returns { dates: string[], closes: number[] }.
 */
export async function fetchDailyCloses(symbol, { signal } = {}) {
  const url = `${STOOQ}?s=${encodeURIComponent(symbol)}&i=d`;
  const res = await fetch(url, {
    signal,
    cache: "no-store",
    headers: { "User-Agent": "fxlab/1.0 (daily signal generator)" },
  });

  if (!res.ok) throw new Error(`stooq returned ${res.status} for ${symbol}`);

  const text = await res.text();
  const lines = text.trim().split("\n");
  const header = lines[0]?.toLowerCase() ?? "";
  if (!header.startsWith("date")) {
    // Stooq answers rate limiting with a plain-text body, not an error status,
    // so a 200 is not on its own evidence that we got data.
    throw new Error(`stooq returned no data for ${symbol}: ${text.slice(0, 120)}`);
  }

  const cols = header.split(",");
  const closeAt = cols.indexOf("close");
  if (closeAt === -1) throw new Error(`stooq CSV for ${symbol} has no Close column`);

  const dates = [];
  const closes = [];
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(",");
    const close = Number(parts[closeAt]);
    if (!parts[0] || !Number.isFinite(close) || close <= 0) continue;
    dates.push(parts[0]);
    closes.push(close);
  }

  if (closes.length === 0) throw new Error(`stooq CSV for ${symbol} had no usable rows`);
  return { dates, closes };
}

/** Calendar days between the last bar and now — the staleness check. */
export function ageInDays(lastDate, now = new Date()) {
  const last = new Date(`${lastDate}T00:00:00Z`);
  return Math.floor((now.getTime() - last.getTime()) / 86_400_000);
}
