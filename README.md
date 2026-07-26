# GR Wire

Greek finance, telecom & energy infrastructure — in one feed.

## What this is

A news portal aggregating Greek-market news across three verticals:
- **Finance** — banking, markets, ATHEX, macro/regulatory news
- **Telco Infrastructure** — operators, fiber/FTTH rollout, spectrum, regulator (EETT)
- **Energy Infrastructure** — grid, renewables, gas, regulator (RAAEY), operators (ADMIE, DESFA, HEDNO)

Built with Next.js. Feeds are pulled server-side from the RSS sources listed
in `sources/greek-news-sources.md`, grouped by category, and re-fetched on a
schedule (see `src/lib/feeds.js`).

## Status

Actively building the real product (skipped the manual-curation test phase).
Next milestone: deploy to Vercel, verify which feeds actually resolve in
production, attach a custom domain.

## Getting started (local dev)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Repo contents

- `sources/greek-news-sources.md` — categorized Greek news sources with RSS
  feed URLs (confidence-rated; some unverified — see file for details)
- `src/lib/feeds.js` — feed config consumed by the app (name, URL, category)
- `src/app/` — Next.js App Router pages
