"""Walk-forward backtest runner.

    python3 run_backtest.py --pairs stooq:eurusd stooq:usdjpy --strategies tsm donchian
    python3 run_backtest.py --pairs csv:mydata.csv --strategies tsm --cost-sweep 0 1 3 10
    python3 run_backtest.py --pairs synthetic:seed=1 --strategies all   # no network needed

Reports out-of-sample results only. The full-sample number is printed too,
but greyed out in your mind please: it is the number that made you like the
strategy in the first place, so it cannot also be the evidence for it.

This script places no trades and talks to no broker.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parent))

from fxlab import data, strategies
from fxlab.engine import Config, run, walk_forward
from fxlab.metrics import deflated_hurdle, summary


def _short(spec: str) -> str:
    return spec.split(":", 1)[-1].replace("=X", "").lower()


def evaluate(prices, strategy_name, cfg, train_years, test_years):
    """Walk-forward one strategy on one pair. Returns (stats dict, oos returns)."""
    fn = strategies.REGISTRY[strategy_name]
    table, oos = walk_forward(prices, fn, cfg, train_years=train_years, test_years=test_years)
    if oos.empty:
        return None, None
    stats = summary(oos["net"], oos["position"], cfg.periods_per_year)
    stats["Windows"] = len(table)
    stats["WorstWin"] = float(table["Sharpe"].min())
    return stats, oos["net"]


def main():
    p = argparse.ArgumentParser(description="Walk-forward FX backtest")
    p.add_argument("--pairs", nargs="+", default=["synthetic:seed=1"],
                   help="specs like stooq:eurusd, yf:EURUSD=X, csv:path.csv, synthetic:seed=1")
    p.add_argument("--strategies", nargs="+", default=["tsm"],
                   help=f"one or more of {sorted(strategies.REGISTRY)}, or 'all'")
    p.add_argument("--cost-bps", type=float, default=1.0, help="one-way cost per unit traded")
    p.add_argument("--cost-sweep", nargs="*", type=float, default=None,
                   help="repeat the run at several cost levels to find the break-even")
    p.add_argument("--vol-target", type=float, default=0.10)
    p.add_argument("--max-leverage", type=float, default=1.0)
    p.add_argument("--rebalance-band", type=float, default=0.0,
                   help="skip trades smaller than this fraction of notional (cuts resizing churn)")
    p.add_argument("--train-years", type=int, default=3)
    p.add_argument("--test-years", type=int, default=1)
    p.add_argument("--period", default="max", help="history length for yfinance specs")
    args = p.parse_args()

    names = sorted(strategies.REGISTRY) if args.strategies == ["all"] else args.strategies
    for n in names:
        if n not in strategies.REGISTRY:
            p.error(f"unknown strategy {n!r}; choose from {sorted(strategies.REGISTRY)}")

    series = {}
    for spec in args.pairs:
        try:
            series[_short(spec)] = data.load(spec, args.period)
        except Exception as exc:  # noqa: BLE001 -- one bad feed shouldn't kill the run
            print(f"  ! {spec}: {exc}", file=sys.stderr)
    if not series:
        sys.exit("No price data could be loaded.")

    for name, px in series.items():
        print(f"  {name}: {len(px)} bars, {px.index.min().date()} to {px.index.max().date()}")

    costs = args.cost_sweep if args.cost_sweep else [args.cost_bps]
    cols = ["CAGR", "Vol", "Sharpe", "t_stat", "MaxDD", "Calmar", "HitRate", "Turnover", "Windows", "WorstWin"]

    for cost in costs:
        cfg = Config(vol_target=args.vol_target, cost_bps=cost,
                     max_leverage=args.max_leverage, rebalance_band=args.rebalance_band)
        print(f"\n=== Out-of-sample, cost = {cost:g} bps one-way "
              f"({args.train_years}y train / {args.test_years}y test) ===")

        rows, oos_by_strategy = {}, {}
        for strat in names:
            per_pair = []
            for pair, px in series.items():
                stats, oos = evaluate(px, strat, cfg, args.train_years, args.test_years)
                if stats is None:
                    continue
                rows[(strat, pair)] = stats
                per_pair.append(oos.rename(pair))

            # Equal-weight portfolio. Single-pair FX momentum is mostly noise;
            # the published edge is a diversified one, so this is the line to read.
            if len(per_pair) > 1:
                book = pd.concat(per_pair, axis=1).fillna(0.0).mean(axis=1)
                rows[(strat, "PORTFOLIO")] = summary(book, periods_per_year=cfg.periods_per_year)
                oos_by_strategy[strat] = book

        if not rows:
            print("  not enough history for a walk-forward window")
            continue

        table = pd.DataFrame(rows).T[[c for c in cols if c in next(iter(rows.values()))]]
        table.index.names = ["strategy", "pair"]
        with pd.option_context("display.float_format", lambda v: f"{v:8.3f}", "display.width", 200):
            print(table.to_string())

    n_trials = len(names) * len(series) * len(costs)
    print(f"\n{n_trials} configurations evaluated. With that much searching, a winner needs")
    print(f"|t| above roughly {deflated_hurdle(n_trials):.1f} before it means anything, not 2.0.")
    print("Sharpe below ~0.4 out of sample is not a business. It is a hobby with variance.")


if __name__ == "__main__":
    main()
