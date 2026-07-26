// Small ambient data strip for the top of the site: Athens weather and a
// couple of FX rates. Both come from free, key-less public APIs. Each is
// fetched independently and failures return null so a dead API just hides
// that widget instead of breaking the page.

const REVALIDATE_SECONDS = 900;

const WEATHER_CODES = {
  0: "Clear",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Heavy showers",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm",
};

export async function getAthensWeather() {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=37.9838&longitude=23.7275&current=temperature_2m,weather_code&timezone=Europe%2FAthens",
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const temp = data?.current?.temperature_2m;
    if (typeof temp !== "number") throw new Error("no temperature in response");
    return {
      temp: Math.round(temp),
      label: WEATHER_CODES[data.current.weather_code] || "",
    };
  } catch (err) {
    console.error("[marketData] weather failed:", err.message);
    return null;
  }
}

export async function getFxRates() {
  try {
    const res = await fetch("https://api.frankfurter.app/latest?from=EUR&to=USD,GBP", {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data?.rates?.USD) throw new Error("no rates in response");
    return { usd: data.rates.USD, gbp: data.rates.GBP };
  } catch (err) {
    console.error("[marketData] fx failed:", err.message);
    return null;
  }
}
