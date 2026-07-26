import Link from "next/link";
import { CATEGORIES } from "@/lib/feeds";
import { getAllCategorizedItems } from "@/lib/articles";
import ArticleList from "@/components/ArticleList";
import LeadStory from "@/components/LeadStory";

export const revalidate = 300;

// Picks the newest article across all categories as the lead story, so the
// top of the page reflects whatever is actually freshest rather than always
// favouring one section.
function pickLead(itemsByCategory) {
  let best = null;
  for (const [category, items] of Object.entries(itemsByCategory)) {
    const candidate = items[0];
    if (!candidate) continue;
    const time = candidate.pubDate?.getTime() || 0;
    if (!best || time > best.time) best = { item: candidate, category, time };
  }
  return best;
}

export default async function HomePage() {
  const itemsByCategory = await getAllCategorizedItems();
  const lead = pickLead(itemsByCategory);

  return (
    <div>
      {lead && (
        <LeadStory
          item={lead.item}
          category={lead.category}
          categoryLabel={CATEGORIES[lead.category]}
        />
      )}

      <div className="space-y-12">
        {Object.entries(CATEGORIES).map(([slug, label]) => {
          const items = (itemsByCategory[slug] || []).filter(
            (i) => i.link !== lead?.item.link
          );
          return (
            <section key={slug}>
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="text-xl font-bold tracking-tight">{label}</h2>
                <Link
                  href={`/${slug}`}
                  className="text-sm font-medium text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  View all →
                </Link>
              </div>
              <ArticleList
                items={items.slice(0, 6)}
                category={slug}
                emptyMessage="No articles yet — the ingestion job may not have run yet."
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}
