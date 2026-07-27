import { ogCard, size, contentType } from "@/lib/og";
import { WEEKS, getWeek, weekNotes } from "@/content/editorials";

// The card that matters most. A week link posted to LinkedIn is the main way
// anyone arrives here who did not already know the site, and this is what they
// see before deciding whether to click.
//
// Greek, matching generateMetadata on the page: the readership is the Greek
// market, and a card cannot ask which language the reader chose — it is a PNG
// baked at build time, long before anyone requests it.

export const alt = "GR Wire — εβδομαδιαίο σχόλιο";
export { size, contentType };

export function generateStaticParams() {
  return WEEKS.map((w) => ({ week: w.meta.week }));
}

export default async function Image({ params }) {
  const { week: id } = await params;
  const week = getWeek(id);

  // A week can be shared before its lead is written. Falling back to the site
  // name would waste the card entirely, so the newest note stands in — it is
  // the most recent thing we actually said that week.
  if (!week?.lead) {
    const newest = weekNotes(week)[0];
    if (!newest) return ogCard({ kicker: "Εβδομαδιαίο", title: "GR Wire" });
    return ogCard({
      kicker: "Σημείωση",
      title: newest.el.title,
      standfirst: newest.el.standfirst,
      footnote: week.meta.weekOf.el,
    });
  }

  return ogCard({
    kicker: "Εβδομαδιαίο σχόλιο",
    title: week.lead.el.title,
    standfirst: week.lead.el.standfirst,
    footnote: week.meta.weekOf.el,
  });
}
