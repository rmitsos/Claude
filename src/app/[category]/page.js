import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/feeds";
import { getCategoryItems } from "@/lib/articles";
import Shell from "@/components/Shell";
import WireList from "@/components/WireList";

export const revalidate = 300;

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const label = CATEGORIES[category];
  if (!label) return {};
  return {
    title: `${label} — GR Wire`,
    description: `Latest ${label} news from Greek and international sources.`,
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const label = CATEGORIES[category];
  if (!label) notFound();

  const items = await getCategoryItems(category);

  return (
    <Shell active={category} heading={label}>
      <WireList
        items={items}
        showCategory={false}
        emptyMessage="Nothing in this category yet."
      />
    </Shell>
  );
}
