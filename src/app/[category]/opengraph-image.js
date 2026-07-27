import { ogCard, size, contentType, ACCENTS } from "@/lib/og";
import { CATEGORIES } from "@/lib/feeds";
import { t } from "@/lib/i18n";

// Category cards carry the section's own accent, so a link to /energy is
// recognisably the same colour as the section it points at. Covers the
// /[category]/[sub] pages too, which inherit this rather than defining a
// near-identical card of their own.

export const alt = "GR Wire";
export { size, contentType };

// Card copy, kept here rather than in i18n: these lines are only ever rendered
// into a Greek PNG and never appear in the interface, so putting them in the
// string tables would imply a language switch that cannot happen.
const BLURB = {
  finance: "Αγορές, τράπεζες, πολιτική και εταιρικά νέα από ελληνικές πηγές.",
  telco: "Δίκτυα, οπτικές ίνες, κέντρα δεδομένων και ρυθμιστικές εξελίξεις.",
  energy: "Δίκτυα μεταφοράς, ΑΠΕ, αποθήκευση και έργα υποδομής.",
};

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export default async function Image({ params }) {
  const { category } = await params;

  return ogCard({
    kicker: "Κατηγορία",
    title: t("el", `cat.${category}`),
    standfirst: BLURB[category],
    accent: ACCENTS[category] || ACCENTS.default,
  });
}
