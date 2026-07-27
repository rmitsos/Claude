import { notFound } from "next/navigation";
import { CATEGORIES, SUBCATEGORIES, SUBCATEGORIZED } from "@/lib/feeds";
import { getCategoryItems } from "@/lib/articles";
import Shell from "@/components/Shell";
import WireList from "@/components/WireList";

export const revalidate = 300;

export function generateStaticParams() {
  return SUBCATEGORIZED.flatMap((category) =>
    Object.keys(SUBCATEGORIES).map((sub) => ({ category, sub }))
  );
}

export async function generateMetadata({ params }) {
  const { category, sub } = await params;
  const label = CATEGORIES[category];
  const subLabel = SUBCATEGORIES[sub];
  if (!label || !subLabel) return {};
  return {
    title: `${label} · ${subLabel} — GR Wire`,
    description:
      sub === "technology"
        ? `${label}: installations, equipment and engineering projects.`
        : `${label}: markets, policy and corporate news.`,
  };
}

export default async function SubcategoryPage({ params }) {
  const { category, sub } = await params;
  const label = CATEGORIES[category];
  const subLabel = SUBCATEGORIES[sub];
  if (!label || !subLabel || !SUBCATEGORIZED.includes(category)) notFound();

  const items = await getCategoryItems(category, sub);

  return (
    <Shell active={category} activeSub={sub} heading={`${label} · ${subLabel}`}>
      <p className="px-4 pb-3 text-sm text-muted">
        {sub === "technology"
          ? "Installations, equipment and engineering projects."
          : "Markets, policy and corporate news."}
      </p>
      <WireList
        items={items}
        showCategory={false}
        emptyMessage={
          sub === "technology"
            ? "No engineering stories in this category yet."
            : "No news stories in this category yet."
        }
      />
    </Shell>
  );
}
