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
Status below is from a **real production ingest** (187 articles, 11 of 15
feeds working). "Relevant" = articles that passed topic classification.

### Working

| Source | Feed URL | Fetched | Relevant | Notes |
|---|---|---|---|---|
| Capital.gr (Αγορές) | `/api/tags/agores/` | 99 | 64 | Markets — biggest single contributor |
| Energy Storage News | `/feed/` | 50 | 42 | Battery/BESS — best relevance ratio of any feed |
| Capital.gr (Οικονομία) | `/api/tags/oikonomia/` | 99 | 37 | Economy |
| OT.gr | `/feed/` | 35 | 14 | Business daily, energy + fiber sections |
| T&D World | `/rss.xml` | 25 | 7 | Substations, transmission & distribution |
| Naftemporiki | `/feed/` | 30 | 5 | Financial daily |
| Ypodomes | `/feed/` | 10 | 5 | Greek infrastructure/projects trade |
| B2Green | `/feed/` | 10 | 5 | PV, wind, storage, efficiency |
| Capacity Media | `/rss` | 10 | 4 | Wholesale carriers, subsea cables |
| ICTplus | `/feed/` | 21 | 3 | Greek ICT/telecom trade portal |
| PV Magazine | `/feed/` | 10 | 3 | Solar engineering |
| Balkan Green Energy News | `/feed/` | 8 | 2 | SE Europe renewables/grid |

### Confirmed unusable

403 means the site blocks cloud/datacenter IPs — a different path will not
help. The others had the wrong path tried.

| Source | Attempted | Result |
|---|---|---|
| energypress.gr | `/rss`, `/index.php/rss` | HTTP 403 |
| Ecopress | `/feed/` | HTTP 403 |
| Light Reading | `/rss_simple.asp` | HTTP 403 |
| Telecoms.com | `/feed` | HTTP 403 |
| WorldEnergyNews | `/feed/`, `/rss` | HTML, then not valid RSS 1 or 2 |

### Untried candidates

Energia.gr (RSS index at `/article/5/rss-feeds`, per-category URLs not
identified), Fierce Network (RSS index at `/fiercetelecomcom/rss-feeds`),
Submarine Telecoms Forum, ISE Magazine.

## Known gap: Telco Infrastructure

Still the thinnest category. ICTplus (3) and Capacity Media (4) are the
only telecom-focused feeds working; Light Reading and Telecoms.com both
block us. Energy and Finance are well covered by comparison.

Worth trying next, ideally checked in a browser first (that approach found
Capital.gr's working tag-based API when guessing had failed): Greek
operator newsrooms (OTE/Cosmote, Nova), the EETT regulator, Fierce
Network's RSS index at `/fiercetelecomcom/rss-feeds`, Submarine Telecoms
Forum, ISE Magazine.

## Next steps

1. Find more working telco sources — the thinnest category by far
2. Energia.gr has an RSS index at `/article/5/rss-feeds`; per-category
   URLs were never identified
