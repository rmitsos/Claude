import { connection } from "next/server";
import { STRATEGY, DISPLAY_EQUITY } from "@/lib/fx/config";
import { getLatestSignals, getRecentChanges } from "@/lib/fx/store";
import { STALE_AFTER_DAYS } from "@/lib/fx/signals";

// Access is enforced in proxy.js before this ever renders; robots.js and the
// layout's metadata keep it out of search regardless.

function decimals(pair) {
  return pair.includes("JPY") ? 3 : 5;
}

function fmtPrice(value, pair) {
  return Number(value).toFixed(decimals(pair));
}

function pipsBetween(a, b, pair) {
  const pip = pair.includes("JPY") ? 0.01 : 0.0001;
  return Math.round((a - b) / pip);
}

function pct(value, digits = 2) {
  if (!Number.isFinite(value)) return "—";
  return `${value >= 0 ? "+" : ""}${(value * 100).toFixed(digits)}%`;
}

function State({ target }) {
  if (target > 0) {
    return <span className="font-mono text-sm font-bold text-fin">LONG {target.toFixed(2)}</span>;
  }
  if (target < 0) {
    return <span className="font-mono text-sm font-bold text-enr">SHORT {Math.abs(target).toFixed(2)}</span>;
  }
  return <span className="font-mono text-sm font-bold text-muted">FLAT</span>;
}

// Where the price sits inside its own breakout channel. This is the whole
// strategy in one picture: touch the top edge and it goes long, the bottom
// edge and it goes short, anywhere between and it does nothing.
function Channel({ price, upper, lower, pairCode }) {
  if (!Number.isFinite(upper) || !Number.isFinite(lower) || upper <= lower) {
    return <p className="text-xs text-muted">Channel not yet formed.</p>;
  }
  const span = upper - lower;
  const raw = ((price - lower) / span) * 100;
  const at = Math.max(0, Math.min(100, raw));
  const breaking = raw > 100 || raw < 0;

  return (
    <div>
      <div className="relative h-6">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-rule" />
        <div className="absolute left-0 top-1/2 h-3 w-px -translate-y-1/2 bg-muted" />
        <div className="absolute right-0 top-1/2 h-3 w-px -translate-y-1/2 bg-muted" />
        <div
          className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
            breaking ? "bg-fin" : "bg-ink"
          }`}
          style={{ left: `${at}%` }}
        />
      </div>
      <div className="flex justify-between font-mono text-xs text-muted tabular-nums">
        <span>{fmtPrice(lower, pairCode)}</span>
        <span className="text-ink-2">{fmtPrice(price, pairCode)}</span>
        <span>{fmtPrice(upper, pairCode)}</span>
      </div>
    </div>
  );
}

function Row({ s }) {
  const target = Number(s.target);
  const previous = Number(s.previous_target);
  const price = Number(s.price);
  const upper = s.upper_channel === null ? NaN : Number(s.upper_channel);
  const lower = s.lower_channel === null ? NaN : Number(s.lower_channel);
  const changed = target !== previous;
  const stale = s.stale_days > STALE_AFTER_DAYS;

  return (
    <article className="border-b border-rule px-4 py-4">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <h2 className="font-mono text-base font-bold tracking-tight">{s.pair}</h2>
          <span className="font-mono text-sm text-ink-2 tabular-nums">
            {fmtPrice(price, s.pair)}
          </span>
          {stale && (
            <span className="font-mono text-xs text-enr">stale {s.stale_days}d</span>
          )}
        </div>
        <State target={target} />
      </header>

      <p className="mb-3 text-sm text-ink-2">{s.reason}</p>

      <Channel price={price} upper={upper} lower={lower} pairCode={s.pair} />

      <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-xs sm:grid-cols-4">
        <div>
          <dt className="text-muted">Breaks long above</dt>
          <dd className="tabular-nums">
            {Number.isFinite(upper) ? (
              <>
                {fmtPrice(upper, s.pair)}{" "}
                <span className="text-muted">
                  ({pipsBetween(upper, price, s.pair)}p, {pct(upper / price - 1)})
                </span>
              </>
            ) : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Breaks short below</dt>
          <dd className="tabular-nums">
            {Number.isFinite(lower) ? (
              <>
                {fmtPrice(lower, s.pair)}{" "}
                <span className="text-muted">
                  ({pipsBetween(lower, price, s.pair)}p, {pct(lower / price - 1)})
                </span>
              </>
            ) : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Held</dt>
          <dd className="tabular-nums">
            {s.bars_held > 0
              ? `${s.bars_held} of ${STRATEGY.maxHold} bars`
              : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Realized vol</dt>
          <dd className="tabular-nums">
            {s.vol === null ? "—" : pct(Number(s.vol), 1).replace("+", "")}
          </dd>
        </div>
      </dl>

      {changed && (
        <p className="mt-3 border-l-2 border-fin pl-3 font-mono text-xs">
          Change today: {previous.toFixed(2)} → {target.toFixed(2)} ={" "}
          <strong>
            {target > previous ? "BUY" : "SELL"}{" "}
            {Math.abs((target - previous) * DISPLAY_EQUITY).toLocaleString("en-GB", {
              maximumFractionDigits: 0,
            })}
          </strong>{" "}
          notional per {DISPLAY_EQUITY.toLocaleString("en-GB")} of account
        </p>
      )}
    </article>
  );
}

export default async function FxPage() {
  // Stop prerendering. Without this Next serves a copy of the page frozen at
  // build time — which for a page whose entire job is to show today's signal
  // is worse than showing nothing, because stale positions look current.
  await connection();

  const [signals, changes] = await Promise.all([
    getLatestSignals(STRATEGY.strategy),
    getRecentChanges(STRATEGY.strategy, 15),
  ]);

  // Postgres DATE comes back as a string from some drivers and a Date from
  // others; normalise before sorting so this doesn't depend on which.
  const asof = signals.length
    ? signals.map((s) => new Date(s.asof).toISOString().slice(0, 10)).sort().at(-1)
    : null;
  const todaysChanges = signals.filter((s) => Number(s.target) !== Number(s.previous_target));

  return (
    <div className="mx-auto w-full max-w-3xl px-0 py-6">
      <header className="border-b border-rule px-4 pb-4">
        <h1 className="font-serif text-2xl font-bold tracking-tight">FX signals</h1>
        <p className="mt-1 font-mono text-xs text-muted">
          {STRATEGY.lookback}-bar {STRATEGY.strategy} · max hold {STRATEGY.maxHold} bars ·
          vol target {(STRATEGY.volTarget * 100).toFixed(0)}% · max leverage{" "}
          {STRATEGY.maxLeverage.toFixed(1)}x
          {asof ? ` · data to ${new Date(asof).toISOString().slice(0, 10)}` : ""}
        </p>
      </header>

      <div className="border-b border-rule bg-tint px-4 py-3 text-xs text-ink-2">
        <strong className="text-ink">This is a paper record, not advice.</strong> No
        order is placed by anything here and no broker is connected. The rule
        generating these signals has <strong>not</strong> been shown to have an
        edge — it has only been tested on synthetic data, because the research
        environment could not reach a price feed. Watch it, compare it against
        what you would have done, and decide after a few months whether it
        deserves money. See <code className="font-mono">forex/DEPLOYMENT.md</code>{" "}
        for the gates it still has to pass.
      </div>

      {signals.length === 0 ? (
        <div className="px-4 py-10 text-sm text-ink-2">
          <p className="mb-2">No signals stored yet.</p>
          <p className="text-muted">
            Visit <code className="font-mono">/api/signals</code> once to run the first
            update, or wait for tonight&apos;s cron. Pages read from the database
            rather than fetching prices on render, so nothing appears here until
            an update has run.
          </p>
        </div>
      ) : (
        <>
          <section className="border-b border-rule px-4 py-3">
            <h2 className="mb-1 font-mono text-xs uppercase tracking-wide text-muted">
              Today
            </h2>
            {todaysChanges.length === 0 ? (
              <p className="text-sm text-ink-2">
                No changes. Hold what you have.{" "}
                <span className="text-muted">
                  This is the normal output most days — the strategy is flat or
                  waiting roughly seven days in ten. That is the design, not a
                  fault.
                </span>
              </p>
            ) : (
              <ul className="space-y-1 font-mono text-sm">
                {todaysChanges.map((s) => (
                  <li key={s.pair}>
                    <strong className={Number(s.target) > Number(s.previous_target) ? "text-fin" : "text-enr"}>
                      {Number(s.target) > Number(s.previous_target) ? "BUY " : "SELL"}
                    </strong>{" "}
                    {s.pair} → {Number(s.target).toFixed(2)}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {signals.map((s) => (
            <Row key={s.pair} s={s} />
          ))}
        </>
      )}

      {changes.length > 0 && (
        <section className="px-4 py-5">
          <h2 className="mb-2 font-mono text-xs uppercase tracking-wide text-muted">
            Position changes, newest first
          </h2>
          <ul className="space-y-1 font-mono text-xs tabular-nums">
            {changes.map((c) => (
              <li key={c.id} className="flex gap-3 text-ink-2">
                <span className="text-muted">
                  {new Date(c.asof).toISOString().slice(0, 10)}
                </span>
                <span className="w-16">{c.pair}</span>
                <span>
                  {Number(c.previous_target).toFixed(2)} →{" "}
                  {Number(c.target).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">
            Written the day the rule said it, before the outcome was known. That
            is what makes this a record rather than a story told afterwards.
          </p>
        </section>
      )}
    </div>
  );
}
