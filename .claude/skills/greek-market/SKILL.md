---
name: greek-market
description: Structural knowledge of the Greek energy, telecom and finance market — who owns whom, which regulator decides what, which companies share infrastructure, and which political relationships shape decisions. Load this before analysing a digest, writing or planning a weekly lead or note, judging whether two stories are actually one story, or answering any question about how Greek market actors relate to each other. Also load it when the user supplies new insider knowledge about the market, so it gets recorded in the right form rather than lost in the conversation. Covers ownership chains, regulatory boundaries, shared infrastructure, and the second-order effects that follow from them.
---

# Greek market structure

## Why this exists

GR Wire aggregates headlines. Anyone can do that. The one thing it does that
a feed reader cannot is notice when two headlines filed under different
categories are describing the same underlying fact — and that is only
possible if you know how the actors are connected.

The connections come from the publisher, who works in this market. They are
not inferable from the articles, and they are not reliably in the model's
training data. That makes `relations.md` the most valuable asset in the
repository, and keeping it accurate more important than keeping it large.

## Before writing anything

Read `relations.md` in full before analysing a digest or drafting a lead or
note. Then, for the stories in front of you:

1. **Resolve every named actor to its entry.** A story about ΔΕΔΔΗΕ is not
   only a story about ΔΕΔΔΗΕ.
2. **Check the ownership chain upward and downward.** A decision by a
   subsidiary can be a decision about its parent's revenue.
3. **Check for shared infrastructure.** The clearest cross-category
   connections on this site come from one physical asset serving two
   markets.
4. **Check who the regulator is, and whether it is independent of the
   parties.** "The regulator decided" and "the state decided" are different
   sentences and readers know the difference.
5. **Ask what follows for someone not named in the article.** That is
   usually where the editorial actually is.

## What may be stated, and how

There are three tiers, and conflating them is the fastest way to lose a
reader who knows this market better than we do.

**Structure — state it plainly.** Ownership, regulatory competence, who
operates which asset. "ΔΕΔΔΗΕ is majority-owned by ΔΕΗ" is a fact and needs
no hedge.

**Implication — state it, and show the step.** "The operator proposing the
reconciliation rules is majority-owned by the largest supplier those rules
apply to" is a conclusion the reader can check against the structure above
it. Give them the premise in the same paragraph so they can disagree with
the reasoning rather than having to trust it.

**Motive and prediction — do not assert.** "ΔΕΗ will get a favourable cap"
or "the government wants to protect ΔΕΗ" is speculation about intent, and
this site now carries a real publisher's real name. Where the forward look
is the point of the piece, write it as a question the structure raises, or
as a conditional with the condition named: *if the cap is set at X, the
effect falls on Y.* A named risk is analysis. An imputed motive is
something else, and it is the one thing here that could attract a lawyer.

## Adding knowledge

When the publisher supplies something new, add it to `relations.md`
immediately and in their words where the wording matters. Each entry
records:

- **What.** The relation itself, stated once and clearly.
- **Source.** `publisher` when it came from them, `public` when it is on the
  record, `inferred` when neither — and inferred entries may not be used as
  premises in published text without checking first.
- **Why it matters.** The cross-category consequence, in one line. An entry
  nobody can act on is filing, not knowledge.

Contradictions get flagged, never silently resolved. If the publisher says
something that conflicts with the public record, say so and ask — they are
usually right and the public record is usually stale, but the one time it
runs the other way is the time it ends up in print.

Confirm what was recorded. Knowledge given verbally and stored wrongly is
worse than knowledge not stored at all, because it will be used with
confidence.
