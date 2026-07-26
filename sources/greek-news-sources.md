# Greek News Sources — Finance / Telco Infrastructure / Energy Infrastructure

Curated source list for manual daily curation (Step 1) and later as seed data
for the automated RSS aggregator (Step 2+).

**Confidence key** on RSS feed URLs:
- `[confirmed-ish]` — strong evidence the feed is live (indexed as valid feed content)
- `[likely, unverified]` — standard path guess (e.g. `/feed`), not directly confirmed
- `[not found]` — no feed located; use the homepage / press page manually

Feeds marked unverified should be checked in a browser (visit the URL, or look
for the RSS icon / `<link rel="alternate" type="application/rss+xml">` in the
page source) before wiring into any automation.

---

## Finance

| Source | URL | RSS | Notes |
|---|---|---|---|
| Naftemporiki | https://www.naftemporiki.gr/ | https://www.naftemporiki.gr/feed/ `[confirmed-ish]` | Leading Greek financial daily since 1924 |
| Capital.gr | https://www.capital.gr/ | https://www.capital.gr/feed `[likely, unverified]` | Business/markets portal, real-time quotes |
| Insider.gr | https://www.insider.gr/ | https://www.insider.gr/feed `[not found]` | Economy/markets, tax & sustainability angle |
| Kathimerini (GR) / eKathimerini (EN) | https://www.kathimerini.gr/ / https://www.ekathimerini.com/ | `[likely, unverified]` | Greece's paper of record; English edition is the standard source for international readers |
| BankingNews.gr | https://www.bankingnews.gr/ | https://www.bankingnews.gr/feed `[not found]` | Specialist banking/financial-sector news |
| Euro2day | https://www.euro2day.gr/ | RSS index page: https://www.euro2day.gr/ListRSS.aspx `[confirmed-ish page]` | Markets/ATHEX-focused |
| newmoney.gr | https://www.newmoney.gr/ | `[not found]` | High-traffic business/investment news |
| PowerGame.gr | https://www.powergame.gr/ | `[not found]` | Business portal; also has an energy vertical (see below) |
| Liberal.gr | https://www.liberal.gr/ | `[not found]` | Economy/politics commentary and analysis |
| Athens Stock Exchange (ATHEX/Euronext Athens) | https://www.athexgroup.gr/ | https://www.athexgroup.gr/rss-feeds/ `[confirmed-ish page, per-channel]` | Official listed-company disclosures & announcements |
| Hellenic Capital Market Commission | http://www.hcmc.gr/ | `[not found]` | Securities regulator, official announcements |
| Bank of Greece | https://www.bankofgreece.gr/ | https://www.bankofgreece.gr/en/useful-links/rss `[confirmed-ish page]` | Central bank — monetary policy, financial stability |

## Telco Infrastructure

| Source | URL | RSS | Notes |
|---|---|---|---|
| EETT (telecom & post regulator) | https://www.eett.gr/en/ | `[not found]` | Official regulator — spectrum, market reviews, decisions. Press: /en/media-publications/press-releases-announcements/ |
| OTE Group / Cosmote press center | https://www.cosmote.gr/cs/otegroup/en/press_center.html | `[not found]` | Incumbent operator, fiber/5G investment news |
| Vodafone Greece | https://www.vodafone.com/news/newsroom (filter Greece) | `[not found]` | Fiber/5G expansion, spectrum, PPC fiber JV |
| Nova (ex-Wind Hellas) | https://www.nova.gr/ | `[not found]` | Fixed/pay-TV operator, fiber rollout |
| PPC / DEI Fiber | https://www.dei.gr/en/ppc-group/press-office/ | `[not found]` | **Cross-category**: national utility building FTTH network — tag both Telco and Energy |
| ADSLgr.com | https://www.adslgr.com/ | `[not found]` | Independent broadband/telecom community site, followed by industry insiders |
| OnOff.gr telecom blog | https://www.onoff.gr/blog/en/telecom/ | `[not found]` | FTTH coverage maps, gigabit rollout tracking |
| TeleGeography (Greece coverage) | https://www.telegeography.com/ | `[not found]` | International trade press, English-language, not Greece-based |

Note: dedicated Greek telecom trade press is thin. Regulator (EETT) and operator
press rooms are the primary sources; worth a manual RSS check directly on
eett.gr and cosmote.gr.

## Energy Infrastructure

| Source | URL | RSS | Notes |
|---|---|---|---|
| energypress.gr | https://energypress.gr/ | https://energypress.gr/rss `[confirmed-ish]` | Leading Greek energy trade portal |
| energypress.eu | https://energypress.eu/ | https://energypress.eu/feed `[not found]` | English-language sister edition |
| Balkan Green Energy News (Greece) | https://balkangreenenergynews.com/country/greece/ | https://balkangreenenergynews.com/feed `[not found]` | Regional English-language energy-transition press, strong Greece coverage |
| Energia.gr | https://www.energia.gr/ | `[not found]` | Long-standing Greek energy/environment portal |
| ADMIE / IPTO (transmission grid operator) | https://www.admie.gr/en | `[not found]` | Official grid operator — interconnections, grid investment |
| DESFA (gas transmission operator) | https://www.desfa.gr/en/press-center/press-releases/ | `[not found]` | Official gas infra operator — IGB interconnector, LNG terminals |
| HEDNO / DEDDIE (distribution grid operator) | https://www.deddie.gr/en/hedno-2/ | `[not found]` | Distribution grid — smart meters, investment plans |
| RAAEY (energy regulator, ex-RAE) | https://www.raaey.gr/ | `[not found]` | Official energy regulator — binding market decisions |
| PPC Group press office | https://www.dei.gr/en/ppc-group/press-office/ | `[not found]` | Dominant generator/supplier, largest listed utility |
| PowerGame.gr — Energygame section | https://www.powergame.gr/category/energygame/ | `[not found]` | Cross-listed with Finance |

## Cross-category sources

- **PPC / DEI Fiber** — spans Telco and Energy (electricity utility building fiber infrastructure)
- **PowerGame.gr** — spans Finance and Energy (Energygame vertical)
- **Naftemporiki / Capital.gr** — occasionally run deep-dives on telecom/energy M&A and capital raises

## Engineering / technology-installation sources (added later)

Researched for deeper coverage of fiber builds, battery storage, substations,
grid modernization and infrastructure engineering — Greek and international.
**All URLs below are unverified best guesses** (the dev sandbox blocks
outbound requests). `/api/ingest` reports per-feed status in production —
use it to confirm which resolve and prune the rest.

### Greek trade / engineering press

| Source | URL | Guessed RSS | Notes |
|---|---|---|---|
| Ypodomes | https://ypodomes.com/ | `/feed/` | Dedicated Greek infrastructure/projects trade site |
| B2Green | https://news.b2green.gr/ | `/feed/` | Green-tech trade: PV, wind, storage, efficiency |
| Ecopress | https://ecopress.gr/ | `/feed/` | Technical/environmental journalism, covers FTTH + grid |
| ICTplus | https://www.ictplus.gr/ | `/feed/` | Greek ICT/telecom trade portal |
| OT.gr (Οικονομικός Ταχυδρόμος) | https://www.ot.gr/ | `/feed/` | Business daily w/ energy + fiber sections |
| WorldEnergyNews | https://www.worldenergynews.gr/ | `/feed/` | Greek energy sector; backup for blocked energypress.gr |
| Energia.gr | https://www.energia.gr/ | RSS index: `/article/5/rss-feeds` | Feeds page exists; per-category URLs not identified |

### International engineering trade press

| Source | URL | Guessed RSS | Notes |
|---|---|---|---|
| Energy Storage News | https://www.energy-storage.news/ | `/feed/` | Dedicated battery storage / BESS coverage |
| T&D World | https://www.tdworld.com/ | `/rss.xml` | Transmission & distribution, substations, grid tech |
| Capacity Media | https://www.capacitymedia.com/ | `/index.rss` | Wholesale carriers, subsea cables |
| Light Reading | https://www.lightreading.com/ | `/rss_simple.asp` | Comms network engineering, 5G/6G, fiber |
| Balkan Green Energy News | https://balkangreenenergynews.com/ | `/feed/` | SE Europe renewables/grid, strong Greece coverage |
| PV Magazine | https://www.pv-magazine.com/ | `/feed/` | Solar industry engineering |
| Submarine Telecoms Forum | https://subtelforum.com/ | not found | Subsea cable industry trade press |
| ISE Magazine | https://www.isemag.com/ | not found | Telecom installation/engineering |
| Fierce Network | https://www.fiercetelecom.com/ | RSS index: `/fiercetelecomcom/rss-feeds` | Feeds page exists; exact URLs not identified |

## Next steps

1. Manually verify unconfirmed RSS URLs in a browser before automating against them
2. For sources with no feed, plan to check manually or revisit once regulators/operators are confirmed to have (or lack) a feed
3. Once the manual curation phase (Substack) validates interest, this table becomes the seed list for the automated aggregator's feed config
