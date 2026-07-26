# GR Wire

Greek finance, telecom & energy infrastructure — in one feed.

## What this is

A news portal aggregating Greek-market news across three verticals:
- **Finance** — banking, markets, ATHEX, macro/regulatory news
- **Telco Infrastructure** — operators, fiber/FTTH rollout, spectrum, regulator (EETT)
- **Energy Infrastructure** — grid, renewables, gas, regulator (RAAEY), operators (ADMIE, DESFA, HEDNO)

## Architecture

- **Ingestion** (`src/lib/fetchAndClassify.js`, `src/lib/ingest.js`): fetches
  configured RSS feeds (`src/lib/feeds.js`), classifies each article by
  content — not by which feed/section it came from (see `src/lib/classify.js`)
  — and upserts matching articles into Postgres (Neon, via Vercel Storage).
- **Refresh cadence**: Vercel's Hobby plan caps cron at once per day, so the
  daily cron (`vercel.json` → `/api/ingest`) is only a floor. The real
  cadence is traffic-driven: `src/lib/refresh.js` uses `after()` to run an
  ingest in the background once a page has rendered, at most every 30
  minutes. `claimIngestSlot` in `db.js` makes that check atomic so
  concurrent visitors can't each trigger their own ingest.
- **Website** (`src/app/`, `src/lib/articles.js`): reads articles straight
  from the database — no live feed-fetching on page render, so the site
  stays fast and doesn't hammer source sites on every request.

Environment variable needed: `DATABASE_URL` (or `POSTGRES_URL`) — set
automatically when a Neon database is connected to the Vercel project.
Optional: `CRON_SECRET` to lock down `/api/ingest` to Vercel's own cron
requests (without it, the endpoint is open, which is fine for manually
triggering the first ingest before the schedule kicks in).

## Status

Live at Vercel with real Greek news flowing for Finance; Telco
Infrastructure and Energy Infrastructure are still thin on working sources
(see `sources/greek-news-sources.md` for what's confirmed vs. blocked).
Next: attach a custom domain, find more working sources.

## Getting started (local dev)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without `DATABASE_URL`
set locally, pages render with empty results rather than crashing.

## Repo contents

- `sources/greek-news-sources.md` — categorized Greek news sources with RSS
  feed URLs (confidence-rated; some confirmed blocked — see file for details)
- `src/lib/feeds.js` — feed URLs to fetch
- `src/lib/classify.js` — keyword-based topic classifier
- `src/lib/fetchAndClassify.js` — fetches + classifies (used by ingestion only)
- `src/lib/ingest.js` / `src/app/api/ingest/route.js` — the cron-triggered job
- `src/lib/articles.js` — DB reads used by pages
- `src/app/` — Next.js App Router pages
