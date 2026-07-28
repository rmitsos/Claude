"""Performance statistics for a strategy return series.

All functions take a series of *periodic* net returns (already after costs)
and are agnostic about the bar size, which is supplied as `periods_per_year`.

A note on Sharpe: these are excess-of-zero, not excess-of-cash. For a spot FX
backtest that is the honest convention, because the spot price series already
excludes the interest-rate differential. See `engine.Config.carry_annual` if
you want to model rollover/swap explicitly.
"""

from __future__ import annotations

import numpy as np
import pandas as pd

TRADING_DAYS = 252


def annualized_return(returns: pd.Series, periods_per_year: int = TRADING_DAYS) -> float:
    """Geometric (compounded) annual growth rate."""
    r = returns.dropna()
    if len(r) == 0:
        return float("nan")
    growth = float((1.0 + r).prod())
    if growth <= 0.0:
        return -1.0  # account wiped out
    return growth ** (periods_per_year / len(r)) - 1.0


def annualized_vol(returns: pd.Series, periods_per_year: int = TRADING_DAYS) -> float:
    r = returns.dropna()
    if len(r) < 2:
        return float("nan")
    return float(r.std(ddof=1) * np.sqrt(periods_per_year))


def sharpe(returns: pd.Series, periods_per_year: int = TRADING_DAYS) -> float:
    """Arithmetic mean over standard deviation, annualized.

    The inherited script divided the *geometric* CAGR by volatility, which
    systematically understates Sharpe by roughly half the variance. This is
    the standard definition.
    """
    r = returns.dropna()
    if len(r) < 2:
        return float("nan")
    sd = float(r.std(ddof=1))
    if sd == 0.0 or not np.isfinite(sd):
        return float("nan")
    return float(r.mean() / sd * np.sqrt(periods_per_year))


def t_statistic(returns: pd.Series) -> float:
    """t-stat of the mean return against zero.

    Rule of thumb before believing anything: |t| < 2 is noise. And because you
    will inevitably try more than one configuration, the bar rises with the
    number of variants tested -- see `deflated_hurdle`.
    """
    r = returns.dropna()
    if len(r) < 2:
        return float("nan")
    sd = float(r.std(ddof=1))
    if sd == 0.0 or not np.isfinite(sd):
        return float("nan")
    return float(r.mean() / sd * np.sqrt(len(r)))


def deflated_hurdle(n_trials: int) -> float:
    """Approximate t-stat you need once you have tried `n_trials` variants.

    The expected maximum of n independent standard normals grows like
    sqrt(2*ln(n)), so the bar rises with the size of the search. Testing 20
    parameter combinations and keeping the best one means the winner needs a
    t-stat near 2.4, not 2.0.

    Floored at 2.0: a small search does not *lower* the burden of proof, it
    just fails to raise it.
    """
    n = max(int(n_trials), 1)
    return float(max(2.0, np.sqrt(2.0 * np.log(n))))


def max_drawdown(returns: pd.Series) -> float:
    """Worst peak-to-trough decline of the compounded equity curve. Negative."""
    r = returns.dropna()
    if len(r) == 0:
        return float("nan")
    equity = (1.0 + r).cumprod()
    return float((equity / equity.cummax() - 1.0).min())


def calmar(returns: pd.Series, periods_per_year: int = TRADING_DAYS) -> float:
    mdd = max_drawdown(returns)
    if not np.isfinite(mdd) or mdd == 0.0:
        return float("nan")
    return annualized_return(returns, periods_per_year) / abs(mdd)


def hit_rate(returns: pd.Series) -> float:
    """Fraction of non-flat bars that made money."""
    r = returns.dropna()
    active = r[r != 0.0]
    if len(active) == 0:
        return float("nan")
    return float((active > 0).mean())


def time_in_market(positions: pd.Series) -> float:
    p = positions.dropna()
    if len(p) == 0:
        return float("nan")
    return float((p != 0).mean())


def annual_turnover(positions: pd.Series, periods_per_year: int = TRADING_DAYS) -> float:
    """Units of notional traded per year, at the strategy's average exposure."""
    p = positions.dropna()
    if len(p) < 2:
        return float("nan")
    return float(p.diff().abs().sum() / len(p) * periods_per_year)


def summary(
    returns: pd.Series,
    positions: pd.Series | None = None,
    periods_per_year: int = TRADING_DAYS,
) -> dict:
    out = {
        "CAGR": annualized_return(returns, periods_per_year),
        "Vol": annualized_vol(returns, periods_per_year),
        "Sharpe": sharpe(returns, periods_per_year),
        "t_stat": t_statistic(returns),
        "MaxDD": max_drawdown(returns),
        "Calmar": calmar(returns, periods_per_year),
        "HitRate": hit_rate(returns),
        "Bars": int(returns.dropna().shape[0]),
    }
    if positions is not None:
        out["TimeInMkt"] = time_in_market(positions)
        out["Turnover"] = annual_turnover(positions, periods_per_year)
    return out
