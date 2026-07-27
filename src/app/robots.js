import { SITE } from "@/lib/site";

const baseUrl = SITE.domain ? `https://${SITE.domain}` : null;

// Driven by SITE.allowIndexing so going live is one flag rather than
// remembering to edit a file nobody looks at. While it is false every
// crawler is refused outright and no sitemap is advertised — pointing at a
// sitemap while disallowing everything sends contradictory instructions.
export default function robots() {
  if (!SITE.allowIndexing) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Endpoints, not pages: crawling them wastes budget and puts JSON in
      // search results. /api/ingest additionally does real work per request.
      disallow: ["/api/"],
    },
    ...(baseUrl ? { sitemap: `${baseUrl}/sitemap.xml`, host: baseUrl } : {}),
  };
}
