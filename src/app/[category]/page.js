import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/feeds";
import { getCategoryItems } from "@/lib/getFeedItems";
import ArticleList from "@/components/ArticleList";

export const revalidate = 1800;

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const label = CATEGORIES[category];
  if (!label) return {};
  return {
    title: `${label} — GR Wire`,
    description: `Latest ${label} news from Greek sources.`,
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const label = CATEGORIES[category];
  if (!label) notFound();

  const items = await getCategoryItems(category);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">{label}</h1>
      <ArticleList
        items={items}
        category={category}
        emptyMessage="No verified feed sources yet for this category — check back soon."
      />
    </div>
  );
}
