import { ogCard, size, contentType } from "@/lib/og";
import { EDITORIALS, getEditorial } from "@/content/editorials";

// The card that matters most. An editorial link posted to LinkedIn is the main
// way anyone arrives here who did not already know the site, and this is what
// they see before they decide whether to click.
//
// Greek, matching generateMetadata on the page: the readership is the Greek
// market, and a card cannot ask which language the reader chose — it is a PNG
// baked at build time, long before anyone requests it.

export const alt = "GR Wire — εβδομαδιαίο σχόλιο";
export { size, contentType };

export function generateStaticParams() {
  return EDITORIALS.map((e) => ({ slug: e.meta.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const entry = getEditorial(slug);

  if (!entry) {
    return ogCard({ kicker: "Εβδομαδιαίο", title: "GR Wire" });
  }

  return ogCard({
    kicker: "Εβδομαδιαίο σχόλιο",
    title: entry.el.title,
    standfirst: entry.el.standfirst,
    footnote: entry.meta.weekOf.el,
  });
}
