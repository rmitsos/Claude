# Greek market relations

Structural knowledge supplied by the publisher, who works in this market.
Grows over time. See SKILL.md for how entries are used and what may be
stated in published text.

Each entry carries a **source**: `publisher` (told to us directly),
`public` (on the record and verifiable), `rumour` (heard but unconfirmed —
use it to decide where to look, never as a premise in print), or `inferred`
(none of the above).

Each entry also carries **edges** in a fixed one-line form:

    A --relation[:detail]--> B

That line exists so the map the publisher wants can be generated from this
file rather than rebuilt by hand from prose. Keep the arrow syntax exact and
the entity names identical everywhere, including the Greek — `ΔΕΗ` is always
`ΔΕΗ`, never "PPC" in one entry and "ΔΕΗ" in another, or the graph will show
two companies where there is one.

---

## Energy

### ΔΕΗ / PPC

**What.** The former state electricity utility — Δημόσια Επιχείρηση
Ηλεκτρισμού, Public Power Corporation in English. Still the largest
electricity supplier in Greece. Now a listed company operating well beyond
generation and supply.
**Source.** publisher (identity, English name), public (listing, market
position)
**Edges.** `ΔΕΗ --is--> former state utility` · `ΔΕΗ --supplies--> Greek electricity retail market`
**Why it matters.** "The ex-public company" is not a historical footnote —
it explains why decisions that read as regulatory are also political, and
why a story about ΔΕΗ's balance sheet is also a story about household
bills.

### ΔΕΗ controls ΔΕΔΔΗΕ — 51%, with Macquarie at 49%

**What.** ΔΕΔΔΗΕ / HEDNO is the sole electricity **distribution** network
operator in Greece — roughly 7.6m customers over about 242,000 km of lines,
interconnectors and substations. ΔΕΗ holds **51%**. **Macquarie Asset
Management holds 49%**, bought through Spear WTE Investments (Macquarie
Infrastructure and Real Assets) and completed in 2022: €1.32bn cash plus a
pro-rata share of net debt, around €2.1bn enterprise value. The
shareholders' agreement gives Macquarie **4 seats on an 11-member board**.
**Source.** publisher (the control relation), public (the percentages, the
transaction and the board split — PPC Group announcement, Macquarie
announcement, contemporaneous Greek coverage)
**Edges.** `ΔΕΗ --owns:51%--> ΔΕΔΔΗΕ` · `Macquarie Asset Management --owns:49%--> ΔΕΔΔΗΕ` · `Macquarie Asset Management --board-seats:4of11--> ΔΕΔΔΗΕ` · `ΔΕΔΔΗΕ --operates--> electricity distribution network`
**Why it matters.** The most load-bearing relation on the site so far, and
the 49% is not a footnote — it changes the reading in both directions.

- The operator that proposes distribution and metering rules is controlled
  by the largest supplier those rules apply to. A ΔΕΔΔΗΕ announcement about
  tariffs, reconciliation or retroactive charges is never a neutral
  technical matter.
- But ΔΕΗ does not have it to itself. An infrastructure fund holding 49%
  and four board seats has its own view on regulated revenue, and that view
  is about the return on a network asset rather than about retail market
  share. Anything that caps a regulated revenue stream lands on that
  investor as well as on ΔΕΗ.

**Note.** deddie.gr returns 403 to cloud IP ranges, like energypress.gr and
Ecopress. It cannot be fetched from this environment; use public reporting
or ask the publisher.

### ΑΔΜΗΕ / IPTO

**What.** The electricity **transmission** system operator — the
high-voltage network, distinct from ΔΕΔΔΗΕ's distribution network.
**State Grid Corporation of China holds 24%.** Its subsidiary Ariadne
Interconnection, the vehicle for the Crete–Attica link, sold **20% to State
Grid International Development** in November 2024.
**Source.** public
**Edges.** `State Grid Corporation of China --owns:24%--> ΑΔΜΗΕ` · `State Grid International Development --owns:20%--> Ariadne Interconnection` · `ΑΔΜΗΕ --owns--> Ariadne Interconnection` · `ΑΔΜΗΕ --operates--> electricity transmission network`
**To confirm.** The rest of the cap table — the listed holding company and
the state's stake — and whether ΔΕΗ retains any interest post-unbundling.
Do not state those in published text until confirmed.
**Why it matters.** Transmission and distribution are routinely conflated
in coverage and are different businesses with different owners. When ΑΔΜΗΕ
and ΔΕΔΔΗΕ tender jointly — as on the Rouf super-high-voltage centre — that
is two balance sheets, not one. And a Chinese state utility holding a
quarter of the transmission operator makes grid decisions geopolitical in a
way distribution decisions are not.

### ΔΕΗ operates telecom infrastructure through FiberGrid

**What.** ΔΕΗ has a telecoms infrastructure subsidiary, ΔΕΗ FiberGrid,
whose network is built **mostly aerially, on the existing electricity
grid**. Public reporting describes a hybrid build: underground runs to the
street cabinets, then aerial to the home over **ΔΕΔΔΗΕ's existing
network** — and calls it the second-largest fibre network in Greece, with
coverage targets running to 2028.
**Source.** publisher (the relation and the aerial method), public (the
hybrid description, the ranking and the targets)
**Edges.** `ΔΕΗ --owns--> ΔΕΗ FiberGrid` · `ΔΕΗ FiberGrid --deploys-on--> ΔΕΔΔΗΕ distribution network` · `ΔΕΗ FiberGrid --competes-with--> ΟΤΕ` · `ΔΕΗ FiberGrid --competes-with--> Vodafone` · `ΔΕΗ FiberGrid --competes-with--> Nova`
**Verify before publishing.** Homes-passed and target figures move quarterly
and came here from search summaries rather than from primary sources. Use
the structural claim freely; check any number against a filing first.
**Why it matters.** This breaks the site's own category structure, and in a
useful way. GR Wire files Telco and Energy as separate beats; in Greece the
same physical asset serves both. Consequences that follow directly:

- Electricity distribution investment is also telecom capacity investment.
  A grid upgrade story is a fibre story that no telecom publication will
  report as one.
- Anything affecting ΔΕΗ's network capex — a tariff cap, a credit rating,
  a regulatory decision — has a second-order effect on fibre rollout.
- Aerial deployment on distribution poles means ΔΕΔΔΗΕ's asset base is the
  physical substrate of a competing telecom network. Access terms to those
  poles are a competition question, not just an engineering one.
- ΔΕΗ is therefore a competitor to ΟΤΕ/Cosmote, Vodafone and Nova in a
  market it entered from the energy side. Stories about those operators'
  infrastructure may have a ΔΕΗ dimension that goes unnamed.

### ΡΑΑΕΥ / RAAEY

**What.** Ρυθμιστική Αρχή Αποβλήτων, Ενέργειας και Υδάτων — the independent
regulatory authority for waste, energy and water. Successor to ΡΑΕ with a
widened remit.
**Source.** public
**Edges.** `ΡΑΑΕΥ --regulates--> ΔΕΗ` · `ΡΑΑΕΥ --regulates--> ΔΕΔΔΗΕ` · `ΡΑΑΕΥ --regulates--> ΑΔΜΗΕ` · `ΡΑΑΕΥ --independent-of--> Ministry of Energy`
**Why it matters.** Independence is the point. When ΡΑΑΕΥ weighs a measure
and a minister comments on it, those are two different actors and the
distinction is worth preserving in the text — the minister is describing,
not deciding.

---

## Telecom

*Thin. The site's telecom sourcing is thin too, which compounds. Anything
the publisher can add here has outsized value — particularly ownership of
the fibre wholesale layer and who has access to whose ducts and poles.*

---

## Finance

*Empty so far.*

---

## How to extend this file

Add under the relevant heading, in the same shape: **What / Source / Edges /
Why it matters**, plus **Open question**, **To confirm** or **Verify before
publishing** where something is not settled. Keep "why it matters" concrete — the test is whether it would
change how a specific headline is read.
