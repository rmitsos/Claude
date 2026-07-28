#!/usr/bin/env python3
"""
Trend following across a diversified universe -- the version with evidence.

    python3 check_universe.py

The FX-only test (check_strategy.py) found nothing, which is not a surprise
in hindsight: currencies are the weakest of the four asset classes in the
academic work on trend, and we tested them at the fastest horizon.

This tests the configuration that literature actually supports:

  - 12-month momentum (252 trading days), which is the canonical signal in
    Moskowitz, Ooi & Pedersen (2012)
  - no holding-period cap, so winners are allowed to run
  - roughly 22 instruments across commodities, stock indices, bonds and
    currencies -- all four classes, all available on OANDA as CFDs
  - each position sized to equal risk, so a quiet bond and a wild natural
    gas contract contribute the same amount of volatility

THE POINT OF DIVERSIFICATION: single-instrument trend is nearly untradeable
noise. The documented edge comes from holding many weakly-correlated trends
at once, so the losers cancel and the winners accumulate. Testing one pair
at a time, as we did before, is close to the worst way to look for it.

PRE-SPECIFIED, NOT SEARCHED: the lookback is 252 days because that is the
published one, chosen before seeing any of these results. A 126-day variant
is reported alongside it purely as a robustness check. Trying lookbacks
until one looks good is how backtests get fooled, and the multiple-testing
hurdle printed at the end is there to keep that honest.

It places no trades and connects to no broker.
"""

import argparse
import json
import math
import random
import statistics
import sys
import urllib.parse
import urllib.request
from collections import defaultdict
from datetime import datetime, timezone

sys.path.insert(0, str(__import__("pathlib").Path(__file__).resolve().parent))

# Reuse the arithmetic that is already covered by the parity tests rather
# than writing a fourth copy of it.
from check_strategy import (  # noqa: E402
    TRADING_DAYS, Tee, evaluate, portfolio_series, returns_of, score,
)
import check_strategy  # noqa: E402

LOOKBACK = 252          # 12 months -- the published signal
SECONDARY = 126         # 6 months -- robustness check only
VOL_TARGET = 0.10
VOL_WINDOW = 60         # slower signal deserves a slower risk estimate
MAX_LEVERAGE = 1.0
REBALANCE_BAND = 0.25
WARMUP = LOOKBACK + VOL_WINDOW + 20

# Cost per trade in basis points. Indices and commodities are wider than FX
# majors, so the sweep runs further out than the FX test did.
COST_LEVELS = [0.0, 2.0, 5.0, 15.0]

# Yahoo tickers standing in for OANDA's CFDs. Futures (=F) for commodities
# because the commodity ETFs decay badly in contango and would understate
# any trend; index levels for equities; futures for bonds.
UNIVERSE = [
    ("Gold",         "GC=F",     "metals"),
    ("Silver",       "SI=F",     "metals"),
    ("Copper",       "HG=F",     "metals"),
    ("WTI crude",    "CL=F",     "energy"),
    ("Brent crude",  "BZ=F",     "energy"),
    ("Natural gas",  "NG=F",     "energy"),
    ("Corn",         "ZC=F",     "agriculture"),
    ("Wheat",        "ZW=F",     "agriculture"),
    ("Soybeans",     "ZS=F",     "agriculture"),
    ("Sugar",        "SB=F",     "agriculture"),
    ("S&P 500",      "^GSPC",    "equity index"),
    ("Nasdaq 100",   "^NDX",     "equity index"),
    ("DAX",          "^GDAXI",   "equity index"),
    ("FTSE 100",     "^FTSE",    "equity index"),
    ("Nikkei 225",   "^N225",    "equity index"),
    ("ASX 200",      "^AXJO",    "equity index"),
    ("US 10y note",  "ZN=F",     "bonds"),
    ("US 30y bond",  "ZB=F",     "bonds"),
    ("EURUSD",       "EURUSD=X", "currencies"),
    ("GBPUSD",       "GBPUSD=X", "currencies"),
    ("USDJPY",       "USDJPY=X", "currencies"),
    ("AUDUSD",       "AUDUSD=X", "currencies"),
]


def fetch_ticker(ticker):
    """Daily closes from Yahoo's chart endpoint for any instrument."""
    quoted = urllib.parse.quote(ticker, safe="")
    url = (f"https://query1.finance.yahoo.com/v8/finance/chart/{quoted}"
           "?range=25y&interval=1d")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        payload = json.loads(resp.read().decode("utf-8"))

    results = (payload.get("chart") or {}).get("result")
    if not results:
        raise RuntimeError("no data in response")
    stamps = results[0].get("timestamp") or []
    quotes = ((results[0].get("indicators") or {}).get("quote") or [{}])[0]
    values = quotes.get("close") or []

    dates, closes = [], []
    for stamp, close in zip(stamps, values):
        if close is None or close <= 0:
            continue
        dates.append(datetime.fromtimestamp(stamp, timezone.utc).strftime("%Y-%m-%d"))
        closes.append(float(close))
    if len(closes) < WARMUP + TRADING_DAYS:
        raise RuntimeError(f"only {len(closes)} days of history")
    return dates, closes


def tsm(closes, lookback):
    """Sign of the return over the last `lookback` days. Long if up, short if down."""
    signal = [0.0] * len(closes)
    for i in range(lookback, len(closes)):
        change = closes[i] / closes[i - lookback] - 1.0
        signal[i] = 1.0 if change > 0 else (-1.0 if change < 0 else 0.0)
    return signal


def targets_for(closes, signal):
    """Risk-sized positions, using the shared, parity-tested sizing code."""
    check_strategy.VOL_TARGET = VOL_TARGET
    check_strategy.VOL_WINDOW = VOL_WINDOW
    check_strategy.MAX_LEVERAGE = MAX_LEVERAGE
    check_strategy.REBALANCE_BAND = REBALANCE_BAND
    return check_strategy.build_targets(closes, signal)


def coin_flip(closes, flip_every, seed):
    rng = random.Random(seed)
    signal, current, held = [], 0.0, 0
    for _ in closes:
        if held <= 0:
            current = rng.choice([-1.0, 1.0])
            held = max(1, flip_every)
        held -= 1
        signal.append(current)
    return signal


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--out", default="universe_check_output.txt")
    args = ap.parse_args()

    check_strategy.WARMUP = WARMUP
    say = Tee(args.out)

    say("=" * 74)
    say("  TREND FOLLOWING ACROSS ASSET CLASSES -- the version with evidence")
    say("=" * 74)
    say()
    say(f"Signal: {LOOKBACK}-day (12 month) momentum, no holding cap,")
    say(f"        each position sized to {VOL_TARGET:.0%} volatility.")
    say()
    say("Downloading ~25 years of daily prices...")

    data, failed = {}, []
    for name, ticker, klass in UNIVERSE:
        try:
            dates, closes = fetch_ticker(ticker)
            data[name] = (dates, closes, klass)
        except Exception as exc:  # noqa: BLE001
            failed.append(name)
            say(f"  {name:<14} FAILED: {exc}")
    say(f"  {len(data)} of {len(UNIVERSE)} instruments loaded.")
    if not data:
        say("Nothing downloaded; cannot draw any conclusion.")
        return 1
    say()

    # ---- signals -------------------------------------------------------
    targets, flips, spans = {}, {}, []
    for name, (_, closes, _) in data.items():
        signal = tsm(closes, LOOKBACK)
        targets[name] = targets_for(closes, signal)
        spans.extend(check_strategy.holding_periods(targets[name]))

    typical = round(statistics.fmean(spans)) if spans else LOOKBACK
    for i, (name, (_, closes, _)) in enumerate(data.items()):
        flips[name] = targets_for(closes, coin_flip(closes, typical, seed=7000 + i))

    say(f"Average holding period: {typical} days (~{typical / 21:.1f} months).")
    say("Trends are held until they turn, which is why this is slow.")
    say()

    # ---- by asset class ------------------------------------------------
    say("-" * 74)
    say("BY ASSET CLASS (2 bp cost)")
    say("-" * 74)
    say(f"{'class':<16}{'instruments':>13}{'strategy':>11}{'coin flip':>12}{'return/yr':>12}")

    classes = defaultdict(dict)
    for name, (dates, closes, klass) in data.items():
        classes[klass][name] = (dates, closes, klass)

    for klass in ["metals", "energy", "agriculture", "equity index", "bonds", "currencies"]:
        members = classes.get(klass)
        if not members:
            continue
        sub = {n: (d, c) for n, (d, c, _) in members.items()}
        s = score([r for _, r in portfolio_series(sub, targets, 2.0)])
        f = score([r for _, r in portfolio_series(sub, flips, 2.0)])
        if not s or not f:
            continue
        say(f"{klass:<16}{len(members):>13}{s['sharpe']:>11.2f}"
            f"{f['sharpe']:>12.2f}{s['cagr']:>11.1%}")

    # ---- everything together -------------------------------------------
    everything = {n: (d, c) for n, (d, c, _) in data.items()}

    say()
    say("-" * 74)
    say("ALL INSTRUMENTS TOGETHER, AT DIFFERENT COST LEVELS")
    say("-" * 74)
    say(f"{'cost':<24}{'strategy':>11}{'coin flip':>12}{'return/yr':>12}{'worst fall':>12}")

    by_cost, daily_by_cost = {}, {}
    for cost in COST_LEVELS:
        combined = portfolio_series(everything, targets, cost)
        flipped = portfolio_series(everything, flips, cost)
        s = score([r for _, r in combined])
        f = score([r for _, r in flipped])
        if not s or not f:
            continue
        by_cost[cost] = (s, f)
        daily_by_cost[cost] = combined
        label = "free (impossible)" if cost == 0 else f"{cost:g} bp per trade"
        say(f"{label:<24}{s['sharpe']:>11.2f}{f['sharpe']:>12.2f}"
            f"{s['cagr']:>11.1%}{s['drawdown']:>12.1%}")

    # ---- year by year ---------------------------------------------------
    say()
    say("-" * 74)
    say("YEAR BY YEAR (everything, 2 bp cost)")
    say("-" * 74)

    by_year = defaultdict(list)
    for day, ret in daily_by_cost.get(2.0, []):
        by_year[day[:4]].append(ret)

    yearly = {}
    for year, rets in by_year.items():
        total = 1.0
        for x in rets:
            total *= (1.0 + x)
        yearly[year] = total - 1.0

    biggest = max((abs(v) for v in yearly.values()), default=0.0) or 1.0
    good = 0
    for year in sorted(yearly):
        pnl = yearly[year]
        good += pnl > 0
        bar = "#" * max(1, round(abs(pnl) / biggest * 26))
        say(f"  {year}  {pnl:>7.1%}  {'' if pnl >= 0 else '-'}{bar}")
    if yearly:
        say()
        say(f"  Profitable in {good} of {len(yearly)} years.")

    # ---- robustness ------------------------------------------------------
    say()
    say("-" * 74)
    say(f"ROBUSTNESS: the same test with a {SECONDARY}-day lookback")
    say("-" * 74)
    alt = {}
    for name, (_, closes, _) in data.items():
        alt[name] = targets_for(closes, tsm(closes, SECONDARY))
    alt_score = score([r for _, r in portfolio_series(everything, alt, 2.0)])
    if alt_score:
        say(f"  Sharpe {alt_score['sharpe']:.2f}, return {alt_score['cagr']:.1%}/yr.")
        say("  A real effect should survive a change of this size. If the two")
        say("  lookbacks disagree wildly, neither is trustworthy.")

    # ---- verdict ---------------------------------------------------------
    say()
    say("=" * 74)
    say("  WHAT THIS MEANS")
    say("=" * 74)
    say()

    realistic = by_cost.get(2.0)
    if not realistic:
        say("Not enough data to conclude.")
        return 1
    strat, flip = realistic
    edge = strat["sharpe"] - flip["sharpe"]

    if strat["sharpe"] >= 0.4 and strat["t"] >= 2.0 and edge >= 0.3:
        say("PROMISING. Beat the coin flip clearly, and unlikely to be luck.")
        say("This has earned the next test -- not an account.")
    elif strat["sharpe"] >= 0.2 and edge >= 0.15:
        say("WEAK BUT REAL-ISH. A hint of an edge, too small to be confident")
        say("about, and easily eaten by costs or a bad broker.")
    else:
        say("NO EDGE FOUND. Same answer as the FX test. Worth taking seriously")
        say("as a final answer rather than a reason to try a fifth variation.")

    say()
    say(f"  Strategy Sharpe:  {strat['sharpe']:.2f}")
    say(f"  Coin flip Sharpe: {flip['sharpe']:.2f}")
    say(f"  Is it luck?       t = {strat['t']:.1f}  (needs > 2)")
    say(f"  Worst fall:       {strat['drawdown']:.1%}")
    say()
    say("  Configurations tried across both tests: 3. The bar for the best of")
    say("  three is |t| above about 2.1, not 2.0 -- barely moved, because we")
    say("  deliberately did not go fishing.")

    say()
    say("  NOT MODELLED, AND IT MATTERS: OANDA charges overnight financing on")
    say("  CFD positions. On a strategy holding for months this is the single")
    say("  biggest threat to the result above -- it can run to several percent")
    say("  a year on the notional, against an expected return of a similar")
    say("  size. Get the real financing rates before believing any of this.")

    if failed:
        say()
        say(f"  Could not download: {', '.join(failed)}.")

    say()
    say("-" * 74)
    say(f"Saved to {args.out}")
    say("-" * 74)
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print("\nStopped.")
        sys.exit(1)
