import Link from "next/link";
import { CATEGORIES } from "@/lib/feeds";
import { getAllCategorizedItems } from "@/lib/getFeedItems";
import ArticleList from "@/components/ArticleList";

export const revalidate = 1800;

export default async function HomePage() {
  const itemsByCategory = await getAllCategorizedItems();

  return (
    <div className="space-y-10">
      {Object.entries(CATEGORIES).map(([slug, label]) => (
        <section key={slug}>
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-lg font-semibold">{label}</h2>
            <Link
              href={`/${slug}`}
              className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
            >
              View all
            </Link>
          </div>
          <ArticleList
            items={(itemsByCategory[slug] || []).slice(0, 5)}
            emptyMessage="No verified feed sources yet for this category — check back soon."
          />
        </section>
      ))}
    </div>
  );
}
