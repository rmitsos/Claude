import { ogCard, size, contentType } from "@/lib/og";
import { ENTITIES, ENTITY_BY_ID } from "@/lib/entities";

// One card per tracked entity. These are the links most likely to be shared
// into a group that cares about one company or one theme, and a card naming
// ΑΔΜΗΕ reads very differently from the generic site card.

export const alt = "GR Wire";
export { size, contentType };

export function generateStaticParams() {
  return ENTITIES.map((entity) => ({ id: entity.id }));
}

export default async function Image({ params }) {
  const { id } = await params;
  const entity = ENTITY_BY_ID[id];

  if (!entity) {
    return ogCard({ title: "GR Wire" });
  }

  return ogCard({
    kicker: "Θέμα",
    title: entity.label,
    standfirst:
      entity.kind === "org"
        ? "Κάθε τίτλος που αναφέρει τον οργανισμό, από όλες τις πηγές."
        : "Κάθε τίτλος γύρω από το θέμα, από όλες τις πηγές.",
  });
}
