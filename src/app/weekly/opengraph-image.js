import { ogCard, size, contentType } from "@/lib/og";
import { getLatestLead } from "@/content/editorials";

// /weekly always shows the newest editorial, so its card does too. Rebuilt on
// every deploy, which is also when a new editorial lands — the two move
// together, so the card cannot advertise a piece that is no longer on the page.

export const alt = "GR Wire — εβδομαδιαίο σχόλιο";
export { size, contentType };

export default function Image() {
  const latest = getLatestLead();

  // Before the first editorial exists there is nothing to name, and a card
  // promising commentary that isn't there is worse than a plain one.
  if (!latest) {
    return ogCard({
      kicker: "Εβδομαδιαίο",
      title: "Το σχόλιο της εβδομάδας",
      standfirst: "Πώς συνδέονται οι ειδήσεις της εβδομάδας μεταξύ τους.",
    });
  }

  return ogCard({
    kicker: "Εβδομαδιαίο σχόλιο",
    title: latest.lead.el.title,
    standfirst: latest.lead.el.standfirst,
    footnote: latest.meta.weekOf.el,
  });
}
