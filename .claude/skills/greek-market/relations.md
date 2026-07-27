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
- The 49% is a fact worth stating and an inference worth resisting. It is
  tempting to read Macquarie as a counterweight with divergent interests.
  **The publisher, who works in this market, has never seen or heard of
  Macquarie interfering in ΔΕΗ's conduct of ΔΕΔΔΗΕ**, and rates ΔΕΗ as the
  clearly dominant party. State the shareholding; do not build an argument
  on what the minority holder supposedly wants.

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
**Edges.** `State Grid Corporation of China --owns:24%--> ΑΔΜΗΕ` · `State Grid International Development --owns:20%--> Ariadne Interconnection` · `ΑΔΜΗΕ --owns--> Ariadne Interconnection` · `ΑΔΜΗΕ --owns:100%--> Grid Telecom` · `ΑΔΜΗΕ --operates--> electricity transmission network`
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
- ΔΕΗ entered telecom from the energy side, so stories about the other
  operators' infrastructure may have a ΔΕΗ dimension that goes unnamed.
  **But do not call it a competitor** — see the Fiber2All entry below.

### ΔΕΗ FiberGrid + Fiber2All — a 50-50 wholesale JV, at term-sheet stage

**What.** ΔΕΗ and Vodafone Ελλάδας have signed a **non-binding term sheet**
to merge **ΔΕΗ FiberGrid** (100% ΔΕΗ) and **Fiber2All** (100% Vodafone
Ελλάδας) into a **50-50 joint venture** providing **wholesale-only** FTTH
with declared market neutrality. Networks going in: FiberGrid at 1.88m
homes passed, 1.1m ready to connect; Vodafone's at over 550,000. Still to
come: due diligence, binding agreements, regulatory approval.
**Source.** publisher (that the tie-up exists and its commercial logic),
public (the term sheet, the 50-50 structure, the wholesale-only scope and
the network figures — joint ΔΕΗ/Vodafone announcement)
**Edges.** `ΔΕΗ FiberGrid --proposed-jv:50-50--> Fiber2All` · `Vodafone Ελλάδας --owns:100%--> Fiber2All` · `proposed JV --sells--> wholesale FTTH only`
**Why it matters.** This corrects an inference that was wrong and would have
been published. ΔΕΗ FiberGrid is **not** simply competing with Vodafone —
they are proposing to merge their fibre assets. Two consequences:

- The commercial logic the publisher describes: FiberGrid has enormous
  reach and few customers — an empty network — while Fiber2All has the
  opposite problem. The deal solves both ends at once. That asymmetry is
  the reason the JV makes sense and is worth stating in any piece about it.
- ΔΕΗ FiberGrid is currently **both** wholesale and retail: ΔΕΗ sells
  broadband to consumers over it. The proposed JV is wholesale-only and
  neutral, so the structure is mixed today and would not be afterwards.
  Never describe ΔΕΗ's fibre position in one word.

**To watch.** Term sheet is non-binding. Until binding agreements and
regulatory approval, write "proposed" and nothing stronger.

### Wholesale access — only the incumbent is obliged

**What.** The mandatory wholesale obligation falls on **the incumbent (ΟΤΕ)
alone**. No other operator carries it unless and until it is designated a
dominant carrier. ΔΕΗ FiberGrid's network is therefore **open** to other
operators as a commercial matter, not because it is compelled.
**Source.** publisher
**Edges.** `ΟΤΕ --obliged-to-offer--> wholesale access` · `ΔΕΗ FiberGrid --offers-commercially--> wholesale access`
**Why it matters.** "Forced to" and "chooses to" are different claims, and
only one of them is about the law. Never write that Greek fibre operators
are *required* to sell wholesale — that is true of the incumbent and false
of everyone else. Write that a network is open, or that it sells wholesale,
and leave compulsion out of it unless ΟΤΕ is the subject.

Also worth holding in mind: FiberGrid being open and FiberGrid being **used**
are not the same thing. The publisher describes it as an empty network short
of customers, which is the commercial logic behind the Fiber2All JV. Say
"open to" rather than "sold to" unless there is a specific customer to name.

### ΔΕΔΔΗΕ pole access — a safety bottleneck, not a tariff

**What.** Attaching fibre to ΔΕΔΔΗΕ's poles is not a regulated wholesale
product. The poles carry live power conductors, so anyone wanting to string
cable on them must pay ΔΕΔΔΗΕ for **design, feasibility studies and
engineering expertise** — the work that keeps the attachment from killing
someone. The constraint is physical: cable tension and clearances against
energised lines.
**Source.** publisher
**Edges.** `ΔΕΔΔΗΕ --controls-access-to--> distribution poles` · `third-party fibre operators --must-pay--> ΔΕΔΔΗΕ for design and engineering` · `ΔΕΗ FiberGrid --sister-company-of--> ΔΕΔΔΗΕ`
**Why it matters.** This is the answer to the question of whether the poles
are shared infrastructure, and it is more interesting than a yes or a no.
They are reachable, but through a gate whose keeper is a sister company of
the largest tenant. Both ΔΕΔΔΗΕ and ΔΕΗ FiberGrid sit under ΔΕΗ. A rival
fibreco pays ΔΕΗ's subsidiary for the engineering that lets it compete with
ΔΕΗ's other subsidiary. Nothing improper follows from that automatically —
the safety requirement is real and non-negotiable — but it is a structural
asymmetry, and no telecom regulator sets the price of it.

### ΕΕΤΤ, and the boundary that leaves the poles uncovered

**What.** ΕΕΤΤ is the telecom regulator. There **was** an attempt to
regulate access to ΟΤΕ's own pole and duct infrastructure, prompted by
state-subsidised rural fibre deployment. **ΕΕΤΤ never produced an
outcome.**
**Source.** publisher
**Edges.** `ΕΕΤΤ --regulates--> telecom market` · `ΡΑΑΕΥ --regulates--> ΔΕΔΔΗΕ` · `ΕΕΤΤ --attempted-and-abandoned--> regulation of ΟΤΕ physical infrastructure access`
**Why it matters.** Two different bottlenecks, neither with a telecom
regulator over it. ΟΤΕ's physical infrastructure was looked at and left
alone. ΔΕΔΔΗΕ's poles were never ΕΕΤΤ's to look at — ΔΕΔΔΗΕ is regulated by
ΡΑΑΕΥ, the *energy* authority, which has no remit over telecom competition
and no reason to price pole access with fibre rivalry in mind.

That gap is a story in itself, and a better one than the note that
prompted these questions: **the physical layer of Greek fibre competition
is governed by an energy regulator, or by nobody.**

**Blocked, and the publisher cannot unblock it.** Asked whether ΡΑΑΕΥ
prices pole attachment or whether it is left to ΔΕΔΔΗΕ commercially, the
publisher does not know. So this is a research question, not a question for
them — do not ask again. Where to look: ΡΑΑΕΥ decisions and published
tariffs, ΔΕΔΔΗΕ's charging code or price list for third-party attachments,
and any ΕΕΤΤ consultation that touched physical infrastructure access.
Until one of those produces an answer, the piece cannot distinguish "priced
by the wrong regulator" from "not priced by any regulator" — and those are
the two possible arguments, so it cannot be written at all.

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

### The fibercos

**What.** The Greek FTTH wholesale layer is consolidating into operator-
backed vehicles. **Fiber2All** is Vodafone Ελλάδας'. **UnitedFiber** is
Nova's. **ΔΕΗ FiberGrid** is ΔΕΗ's, strung on the electricity distribution
network. Separately and at a different layer, **Grid Telecom** is ΑΔΜΗΕ's,
on the transmission network.
**Source.** publisher
**Edges.** `Vodafone Ελλάδας --owns--> Fiber2All` · `Nova --owns--> UnitedFiber` · `ΔΕΗ --owns--> ΔΕΗ FiberGrid` · `ΑΔΜΗΕ --owns--> Grid Telecom`
**Why it matters.** "Fibre in Greece" is not one market. There is a
wholesale layer and a retail layer, and a backbone layer beneath both, and
the same groups sit on more than one — which is why a fibre story needs the
layer named before anything else in it can be read correctly.

**Two of the four fibercos are owned by electricity network operators.**
That is the single most distinctive feature of this market and the reason
GR Wire's Energy and Telco beats cannot be kept apart in analysis, whatever
the navigation says.

### Grid Telecom — ΑΔΜΗΕ's fibre arm, on the transmission network

**What.** **Grid Telecom** is a **100% subsidiary of ΑΔΜΗΕ**, tied to the
high-voltage transmission system: over **3,000 km** across mainland and
islands, plus subsea routes. It sells **dark fibre wholesale** to telecom
operators and describes itself as a leading wholesale carrier. It has an
MoU with **ESO EAD**, Bulgaria's transmission operator, to commercialise
fibre along the Greece–Bulgaria interconnectors, and a strategy to make
**Crete an international data gateway between Europe and the Middle East**.
**Source.** publisher (that ΑΔΜΗΕ owns a fibreco; that the build is
underground and subsea), public (name, ownership, scale, dark-fibre model,
ESO EAD MoU, Crete strategy)

**CONTRADICTION — unresolved, do not write about the physical build.**
The publisher says Grid Telecom is **underground and subsea, no aerial**.
Contemporaneous Greek coverage of the ESO EAD memorandum describes
commercialising "τις οπτικές ίνες που διατρέχουν τις **εναέριες**
ηλεκτρικές διασυνδέσεις Ελλάδας–Βουλγαρίας" — fibre running along the
*aerial* interconnectors, i.e. optical ground wire on overhead towers.
Both can be true if the domestic commercial network is buried and subsea
while the cross-border link rides existing OPGW, but that is a guess.

The distinction is not cosmetic, which is why it is flagged rather than
averaged out:

- **If underground and subsea**, Grid Telecom's advantage is *rights of
  way* — the corridors, easements and landing rights that come with being
  the transmission operator. It is a conventional carrier with an
  unconventional parent.
- **If it also monetises aerial OPGW**, then both electricity network
  operators sell fibre strung on live infrastructure, the safety-engineering
  gate that applies to ΔΕΔΔΗΕ's poles has a transmission-level counterpart,
  and "fibre on the grid" is a single structural story across both networks.

Ask the publisher to reconcile before either version is published.
**Edges.** `ΑΔΜΗΕ --owns:100%--> Grid Telecom` · `Grid Telecom --deploys-on--> electricity transmission network` · `Grid Telecom --sells--> dark fibre wholesale` · `Grid Telecom --mou-with--> ESO EAD` · `Grid Telecom --builds--> Crete international data gateway`
**Why it matters.** There are **two** grid-borne fibre businesses in Greece,
on two different electricity networks, under two different owners — and
conflating them would be an obvious error to anyone in the market.

| | ΔΕΗ FiberGrid | Grid Telecom |
|---|---|---|
| Electricity network | distribution (ΔΕΔΔΗΕ) | transmission (ΑΔΜΗΕ) |
| Parent | ΔΕΗ | ΑΔΜΗΕ |
| Build | aerial on poles, hybrid with underground to cabinets | underground and subsea per the publisher — see contradiction above |
| Layer | last mile, FTTH to the home | long-haul backbone, subsea, cross-border |
| Sells | wholesale **and** retail today | dark fibre wholesale |

They are **complementary layers, not competitors**. Backbone and last mile.
A piece that treats "fibre on the electricity grid" as one thing is wrong
about both.

**The chain worth holding, and handling carefully.** State Grid Corporation
of China holds 24% of ΑΔΜΗΕ; ΑΔΜΗΕ holds 100% of Grid Telecom; Grid Telecom
is building the Crete data gateway and commercialising cross-border fibre
with Bulgaria. Every link there is documented structure and may be stated.
What may **not** be stated is any claim about intent, influence or strategy
on anyone's part — that is exactly the motive-imputation the house rule
forbids, and the subject makes it more sensitive rather than less.

**Also.** This reopens the data centre thread that was set aside in week 30
for having no Greek angle. Crete as a Europe–Middle East data gateway, with
AI infrastructure demand as the backdrop, is that angle.

### ΟΤΕ and UnitedFiber — RUMOUR, NOT FOR PUBLICATION

**What.** Market talk that **ΟΤΕ will reach an agreement with UnitedFiber**
similar to the ΔΕΗ FiberGrid / Fiber2All tie-up.
**Source.** **rumour** — the publisher reports it as market talk, with no
confirmation and no announcement.
**Edges.** *(none recorded — an edge here would put an unconfirmed relation
into the map as though it were established)*
**Why it matters.** As a signal, it says the whole wholesale layer may be
consolidating into two or three neutral platforms rather than four
operator-owned ones, and that is worth watching for.

**Handling.** This does not go on the site, in any form, until it is
announced or independently confirmed — not as a hedge, not as "reportedly",
not as "sources suggest". It concerns a listed company and a possible
transaction, an unsourced claim about it is market-sensitive, and the site
has a named individual as publisher with no newsroom and no lawyer behind
it. Use it to decide what to watch for. Nothing else.

---

## Finance

*Empty so far.*

---

## How to extend this file

Add under the relevant heading, in the same shape: **What / Source / Edges /
Why it matters**, plus **Open question**, **To confirm** or **Verify before
publishing** where something is not settled. Keep "why it matters" concrete — the test is whether it would
change how a specific headline is read.
