---
name: proposal-review
description: Pressure-test a proposed feature, layout, or interaction from the reader's point of view before any of it gets built, then hand back a refined, buildable version. Use this whenever the user's message begins with the word "proposal" — that is the agreed signal — and also whenever they float a UI, content, or navigation change and want a view on whether it will read clearly, including phrasings like "what do you think about adding", "should we show", "is it better to", or "would it confuse people if". Covers clarity, interruption, misreading risk, empty and failure states, placement, and whether the interface is implying capability that does not exist.
---

# Proposal review

## The working agreement

The user owns the product. They bring proposals; this skill's job is to
pressure-test each one from the reader's side, then hand back something
buildable — not to veto, and not to redesign it into a different idea.

Their stated goal, in their words: *clear information, no blocking, no
distraction, no misunderstanding.* Every judgement here traces back to one
of those four.

The order matters: **refine, then build.** Give the assessment first and
wait. The point of the signal word is that the user wants a considered view
before code exists, because reversing a shipped decision is expensive and
reversing a paragraph is free.

## The method

**1. Restate the proposal as a reader goal.**
Not "add a filter bar" but "the reader wants to see only storage stories
without losing their place in the wire." If the goal can't be stated
plainly, that ambiguity is the first thing to raise — a feature nobody can
describe the purpose of will not read clearly either.

**2. Work through the lenses below.** Only report the ones that actually
bite. A review listing six categories with "no issues" under four of them
is noise.

**3. Give a refined version, concretely.** "Put it in the rail" beats
"consider placement." The user should be able to say "yes, build that"
without a second round of clarification.

**4. Name what you would drop, and why.** Dropping is the most valuable
thing a review does, and the hardest for the person who had the idea. Be
specific about what the reader gains from the absence.

**5. State a recommendation.** Not a menu of equal options. If there's a
genuine fork, present at most two and say which one you'd pick.

## The lenses

**Scan cost.** This is a wire: people scan it, they don't read it. Anything
added to a repeating row is paid for on every row, forever. A badge on 200
headlines costs 200 units of attention to save one lookup. Ask what the
reader stops seeing because this is now in the way.

**Interruption.** Does it stand between the reader and what they came for?
Modals, gates, consent walls, expanding overlays, autoplaying anything.
Interruption is only justified when the reader cannot proceed safely
without it — which on a news site is almost never.

**Misreading risk.** Could a reasonable person read this and take away
something untrue? Numbers are the usual culprit: a count next to a label
implies completeness, a percentage implies a denominator, an arrow implies
a trend. If the data doesn't support the implication, the label is wrong
even when the number is right.

**Implied capability.** Does the interface promise something the system
can't do? A search box that only matches titles, a "live" badge on
half-hourly data, a consent banner with no cookies behind it. This is the
sharpest failure mode on this project because it's invisible in review and
obvious to a reader who tries it. When in doubt, describe the thing
accurately in the label rather than aspirationally.

**Empty and broken states.** Ask what it looks like with zero items, one
item, and a failed data source — not the happy path. Coverage here is
genuinely uneven and feeds do break, so any surface that only looks right
when full is a surface that will look broken most days. The honest empty
state ("no engineering stories yet") beats a hidden section, because
hiding makes the reader think the site is smaller than it is.

**Placement versus frequency.** Permanent chrome is for what's needed
constantly; rarely-needed things belong where they're looked for, not where
they're always visible. Every nav item taxes every other nav item's
findability.

**Escape.** If it changes what the reader sees — a filter, a sort, a view
toggle — can they tell it's on, and get back out in one move? Silent state
that persists across pages is a classic source of "the site is broken."

**Reversibility of the decision itself.** Cheap and reversible (a label, a
sort order) deserves a light review; expensive and sticky (a new top-level
section, a data model change, anything that becomes a URL people bookmark)
deserves a hard one. Calibrate the scrutiny to the cost of being wrong.

## Say yes when it's right

Some proposals need no refinement. Say so plainly and move to building —
manufacturing an objection to look rigorous wastes the user's time and
trains them to discount the reviews that matter. "This is right as
proposed, here's what I'd build" is a complete and useful answer.

Equally, if a proposal is good but one detail is wrong, fix the detail and
approve the rest. Don't escalate a small correction into a redesign.

## Output shape

Keep it short enough to read in one pass. Prose, not a form.

- **What the reader gets** — the proposal restated as a reader goal, one or
  two sentences
- **What I'd change** — the concerns that actually bite, each with the
  reason underneath it
- **What I'd build** — the refined version, concrete enough to act on
- **Recommendation** — one line, and any genuine open question for the user

Skip any heading with nothing real under it.

## Standing commitments on this project

These were decided deliberately. A proposal that cuts against one isn't
automatically wrong, but say so explicitly rather than quietly reversing it,
so the user can make the trade knowingly.

- **Chronology is the spine.** Newest-first in a single column is the
  product. Grids and multi-column layouts break the ordering — that's why
  the card grid was replaced.
- **Images are capped at five**, in the lead block only. They're hotlinked
  from publishers, so they break, and most engineering sources supply none.
- **Counts describe this site's coverage**, never the Greek market. The
  weekly page says co-occurrence, not correlation, on purpose.
- **No consent theatre.** No cookies are set; if that changes, real consent
  is required, not a decorative banner.
- **Attribution is non-negotiable.** Headline, source, time, outbound link.
  Never reproduce article text.
- **Coverage gaps are shown, not hidden.** Telco is thin; the interface
  admits it.

## Worked example

**Proposal:** "Add a 'trending' badge to headlines that are getting a lot
of coverage."

**What the reader gets:** a signal that a story is being widely reported,
so they can tell a significant development from a one-off mention.

**What I'd change.** Two things bite here. First, misreading risk: with a
dozen feeds, "trending" would mean "several of our sources ran it," which
readers will take as "this is big in Greece" — a claim the data can't
support, and the sources overlap heavily so it mostly detects wire copy.
Second, scan cost: a badge in the wire is paid on every row, and it would
fire most often on general Finance stories, which are already the densest
part of the list.

**What I'd build:** keep the signal, move it and rename it. On the weekly
page, a "covered by N sources" line on the connections list — same
information, stated literally, where the reader is already in an analytical
frame rather than scanning. In the wire, nothing changes.

**Recommendation:** build the weekly version, skip the badge. If you want
something in the wire itself, the honest version is a source count on
hover, not a word like "trending" that implies a measurement we don't have.
