# fx-signals

A daily FX signal generator and the research kit that validates it.

**It places no trades, connects to no broker, and holds no credentials that
could move money.** It computes what a fixed rule wants to hold, stores that
every day, and shows you the reasoning.

## Start here: does it actually work?

```bash
python3 check_strategy.py
```

One file, nothing to install, no pandas and no pip. It downloads ~20 years of
daily FX prices, tests the rule, compares it against random coin flips at
matched turnover, sweeps the cost level to find where the edge dies, and
prints a plain-English verdict. Output is saved to
`strategy_check_output.txt`.

It is a third implementation of the same strategy, which is a hazard — so
`forex/tests/test_parity.py` checks it against the other two and requires
agreement to 1e-12.

## Status: unproven, and that matters

The rule generating these signals has **not** been shown to have an edge. It
has only ever been tested on synthetic price series, because the environment
it was built in could not reach a market data feed. Before this deserves real
money it has to clear the six gates in `forex/DEPLOYMENT.md` — the first of
which is simply "run it on ten years of real prices across six pairs and beat
a coin flip".

Treat the site as a paper record you are keeping in order to find out.

## The strategy

A 20-bar Donchian channel breakout, capped at a 10-bar holding period, sized
to a 10% annualised volatility target and never levered beyond account
notional. Average holding period lands around 9.5 bars — one to two weeks —
which is the horizon where FX transaction costs stop dominating (~0.3%/yr)
without pushing out to the multi-month holds that are hard to sit through.

It is flat roughly seven days in ten. That is the design, not a fault.

## Layout

```
src/lib/fx/strategy.js   the signal math, no dependencies
src/lib/fx/prices.js     daily closes from stooq
src/lib/fx/config.js     pairs and parameters — edited by commit, not at runtime
src/lib/fx/signals.js    orchestration
src/lib/fx/store.js      daily snapshots in Postgres
src/app/page.js          the page: shows the reasoning, not just the answer
src/app/api/signals/     the daily cron endpoint
src/proxy.js             access gate — nothing is served without the secret
                         (Next 16 renamed the middleware convention to proxy;
                         it must sit beside app/, so src/ and not the root)

forex/                   the Python research kit (backtests, walk-forward)
forex/README.md          why this strategy and not another one
forex/DEPLOYMENT.md      deployment, broker APIs, and the gates before live
```

## Moving this into its own repository

It is currently staged inside another repo and needs to become its own. From
the parent repo's root:

```bash
# 1. Create an EMPTY private repo on GitHub named fx-signals (no README,
#    no .gitignore — an initial commit just gets in the way).

# 2. Copy this directory out, initialise it, and push.
cp -r fx-signals ../fx-signals && cd ../fx-signals
git init -b main
git add -A && git commit -m "FX signal generator and research kit"
git remote add origin git@github.com:<you>/fx-signals.git
git push -u origin main
```

Then delete `fx-signals/` from the parent repo, along with its entries in
that repo's `.gitignore`, `.vercelignore` and `eslint.config.mjs`.

History is deliberately not preserved — the commits it would carry are
interleaved with an unrelated news site, so a clean first commit is more
honest than a filtered one that pretends this was always separate.

## Deploying to Vercel

1. Create a Vercel project from this repo.
2. Attach a Postgres database (Neon via Vercel Storage sets `DATABASE_URL`).
3. Set environment variables:
   - `FX_ACCESS_TOKEN` — a long random string. **Required.** Without it the
     site refuses every request rather than serving openly.
   - `CRON_SECRET` — optional; locks `/api/signals` to Vercel's scheduler.
   - `FX_DISPLAY_EQUITY` — optional; the notional sizes are shown against.
4. Deploy. `vercel.json` runs `/api/signals` daily at 23:00 UTC.
5. Visit `/api/signals` once by hand to populate the first day.
6. Open `https://<your-app>.vercel.app/?k=<FX_ACCESS_TOKEN>`. The token moves
   into an httpOnly cookie and drops out of the URL.

### Why the access gate exists

A private repo does **not** make a Vercel deployment private. The project gets
a public `*.vercel.app` URL, and anyone who learns it can read the page. This
page shows your open positions. So `proxy.js` refuses everything without the
shared secret, and fails *closed* if the secret is unset.

It is a shared secret, not an authentication system. If this ever holds broker
credentials, replace it with real auth first.

## Tests

```bash
npm test
```

Two suites, and both matter:

- `forex/tests/test_engine.py` — 11 correctness tests on the backtest engine.
  The important one rewrites the last 200 bars of price history and asserts no
  earlier P&L figure moves, which is how you catch lookahead.
- `forex/tests/test_parity.py` — the strategy exists twice, in pandas for
  research and in JavaScript for the site. Two copies of a trading rule is
  normally a mistake, because the copy that drifts is the one making
  decisions. This pushes identical prices through both and requires agreement
  to 1e-12. **Run it after changing either side.** If it fails, the signals on
  the site are no longer the ones that were validated, and the fix is the
  code, not the tolerance.

Running the research CLI needs `pandas` and `numpy`; the site itself needs
neither.

```bash
pip install pandas numpy --break-system-packages
python3 forex/run_backtest.py --pairs stooq:eurusd stooq:gbpusd \
  --strategies donchian random_walk --params donchian.lookback=20 \
  --max-hold 10 --cost-sweep 0 1 3 10
```

Read the `random_walk` row against the others. A rule that cannot beat coin
flips at matched turnover has demonstrated nothing.
