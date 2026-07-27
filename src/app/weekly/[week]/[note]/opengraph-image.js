import { ogCard, size, contentType } from "@/lib/og";
import { WEEKS, getNote } from "@/content/editorials";

// Notes get their own card with their own eyebrow. Sharing a note under the
// week's card would promise the week's argument and deliver a piece on one
// thread — the reader would be right to feel misled.

export const alt = "GR Wire — σημείωση";
export { size, contentType };

export function generateStaticParams() {
  return WEEKS.flatMap((w) =>
    w.notes.map((n) => ({ week: w.meta.week, note: n.slug }))
  );
}

export default async function Image({ params }) {
  const { week, note: slug } = await params;
  const found = getNote(week, slug);

  if (!found) {
    return ogCard({ kicker: "Σημείωση", title: "GR Wire" });
  }

  return ogCard({
    kicker: "Σημείωση",
    title: found.note.el.title,
    standfirst: found.note.el.standfirst,
    footnote: found.week.meta.weekOf.el,
  });
}
