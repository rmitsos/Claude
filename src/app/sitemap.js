import { SITE } from "@/lib/site";
import { CATEGORIES, SUBCATEGORIES, SUBCATEGORIZED } from "@/lib/feeds";
import { ENTITIES } from "@/lib/entities";
import { allPieces } from "@/content/editorials";

const baseUrl = SITE.domain ? `https://${SITE.domain}` : "http://localhost:3000";

// Listed by hand rather than crawled, so the sitemap says what we actually
// want found. Note what is absent: /search, whose useful URLs are query
// strings that would multiply into hundreds of near-identical pages, and
// /api/*, which is not for readers at all.
export default function sitemap() {
  const now = new Date();

  const entries = [
    { url: "/", changeFrequency: "hourly", priority: 1 },
    { url: "/weekly", changeFrequency: "weekly", priority: 0.9 },
    { url: "/about", changeFrequency: "monthly", priority: 0.5 },
    { url: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { url: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  for (const slug of Object.keys(CATEGORIES)) {
    entries.push({ url: `/${slug}`, changeFrequency: "hourly", priority: 0.8 });
    if (SUBCATEGORIZED.includes(slug)) {
      for (const sub of Object.keys(SUBCATEGORIES)) {
        entries.push({
          url: `/${slug}/${sub}`,
          changeFrequency: "daily",
          priority: 0.7,
        });
      }
    }
  }

  for (const entity of ENTITIES) {
    entries.push({
      url: `/topic/${entity.id}`,
      changeFrequency: "daily",
      priority: 0.6,
    });
  }

  // Written pieces carry their real publication date; everything else is a
  // live view whose "last modified" is simply now. A week's page keeps
  // changing while notes are still being filed against it, so it is not
  // "never" the way an individual note is.
  for (const piece of allPieces()) {
    entries.push({
      url: piece.href,
      lastModified: new Date(piece.published),
      changeFrequency: piece.kind === "lead" ? "weekly" : "never",
      priority: piece.kind === "lead" ? 0.7 : 0.6,
    });
  }

  return entries.map((entry) => ({
    ...entry,
    url: `${baseUrl}${entry.url === "/" ? "" : entry.url}`,
    lastModified: entry.lastModified || now,
  }));
}
