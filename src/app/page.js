import Link from "next/link";
import { CATEGORIES } from "@/lib/feeds";
import { getAllCategorizedItems } from "@/lib/articles";
import ArticleList from "@/components/ArticleList";

export const revalidate = 300;

export default async function HomePage() {
  const itemsByCategory = await getAllCategorizedItems();

  return (
    <div className="space-y-12">
      {Object.entries(CATEGORIES).map(([slug, label]) => (
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
            items={(itemsByCategory[slug] || []).slice(0, 6)}
            category={slug}
            emptyMessage="No articles yet — the ingestion job may not have run yet."
          />
        </section>
      ))}
    </div>
  );
}
