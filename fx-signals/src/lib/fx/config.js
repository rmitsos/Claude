// Which pairs to watch and how the rule is configured.
//
// Everything here is deliberately a constant rather than a database row.
// A strategy whose parameters can be edited while it runs is a strategy you
// can talk yourself into changing after a bad week, which is the failure mode
// this whole project exists to design around. Changing these means a commit,
// a diff, and a deploy.

export const PAIRS = [
  { code: "EURUSD", stooq: "eurusd", label: "Euro / US Dollar", pip: 0.0001 },
  { code: "GBPUSD", stooq: "gbpusd", label: "Sterling / US Dollar", pip: 0.0001 },
  { code: "USDJPY", stooq: "usdjpy", label: "US Dollar / Yen", pip: 0.01 },
  { code: "AUDUSD", stooq: "audusd", label: "Aussie / US Dollar", pip: 0.0001 },
  { code: "USDCHF", stooq: "usdchf", label: "US Dollar / Swiss Franc", pip: 0.0001 },
  { code: "USDCAD", stooq: "usdcad", label: "US Dollar / Canadian Dollar", pip: 0.0001 },
];

// Mirrors DEFAULTS in strategy.js. A 20-bar channel under a 10-bar cap holds
// for ~9.5 bars on average, which is the one-to-two week horizon we're after.
export const STRATEGY = {
  strategy: "donchian",
  lookback: 20,
  maxHold: 10,
  volTarget: 0.1,
  volWindow: 20,
  maxLeverage: 1.0,
  rebalanceBand: 0.25,
};

// Notional the percentages are expressed against, so the page can show sizes
// in money rather than fractions. It is a display setting only — nothing here
// places an order, so this number cannot lose you anything.
export const DISPLAY_EQUITY = Number(process.env.FX_DISPLAY_EQUITY || 10000);

// Daily bars needed before the first signal is trustworthy: the channel
// lookback, the volatility window, and headroom so early bars aren't decided
// by a half-formed window.
export const MIN_BARS = Math.max(STRATEGY.lookback, STRATEGY.volWindow) + 60;
