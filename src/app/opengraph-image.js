import { ogCard, size, contentType } from "@/lib/og";

// The site-wide default. Nested segments inherit this unless they define their
// own opengraph-image, so /about, /privacy, /terms and /search are covered by
// this one file rather than each needing a card of its own.

export const alt = "GR Wire — Οικονομία, Τηλεπικοινωνίες & Ενέργεια";
export { size, contentType };

export default function Image() {
  return ogCard({
    kicker: "Ελληνική αγορά",
    title: "Οικονομία, Τηλεπικοινωνίες & Ενέργεια",
    standfirst:
      "Τίτλοι από ελληνικές και διεθνείς πηγές, ταξινομημένοι χρονολογικά, με σύνδεσμο στην πηγή.",
  });
}
