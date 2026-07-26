# GR Wire

Greek finance, telecom & energy infrastructure — in one feed.

## What this is

A news portal curating Greek-market news across three verticals:
- **Finance** — banking, markets, ATHEX, macro/regulatory news
- **Telco Infrastructure** — operators, fiber/FTTH rollout, spectrum, regulator (EETT)
- **Energy Infrastructure** — grid, renewables, gas, regulator (RAAEY), operators (ADMIE, DESFA, HEDNO)

## Status

**Phase 1 — manual curation test (current)**
Validating audience interest via manual daily curation on Substack before
building any custom technology. See `sources/greek-news-sources.md` for the
curated list of Greek news sources per category, used for daily picks.

**Phase 2 — planned**
If Phase 1 validates interest: build an automated Next.js aggregator pulling
the RSS feeds documented in `sources/greek-news-sources.md`, deployed on
Vercel, then attach a custom domain.

## Repo contents

- `sources/greek-news-sources.md` — categorized Greek news sources with RSS
  feed URLs (confidence-rated; some unverified, see file for details)
