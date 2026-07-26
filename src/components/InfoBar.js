import { getAthensWeather, getFxRates } from "@/lib/marketData";

function Stat({ label, value }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
        {label}
      </span>
      <span className="text-sm font-semibold tabular-nums">{value}</span>
    </div>
  );
}

export default async function InfoBar() {
  const [weather, fx] = await Promise.all([getAthensWeather(), getFxRates()]);

  if (!weather && !fx) return null;

  const today = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Europe/Athens",
  }).format(new Date());

  return (
    <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-1 px-4 py-2">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Athens · {today}
        </span>
        {weather && (
          <Stat
            label="Weather"
            value={`${weather.temp}°C${weather.label ? ` · ${weather.label}` : ""}`}
          />
        )}
        {fx && <Stat label="EUR/USD" value={fx.usd.toFixed(4)} />}
        {fx?.gbp && <Stat label="EUR/GBP" value={fx.gbp.toFixed(4)} />}
      </div>
    </div>
  );
}
