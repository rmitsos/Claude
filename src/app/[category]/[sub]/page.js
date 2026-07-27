import { notFound } from "next/navigation";
import { CATEGORIES, SUBCATEGORIES, SUBCATEGORIZED } from "@/lib/feeds";
import { getCategoryItems } from "@/lib/articles";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import Shell from "@/components/Shell";
import WireList from "@/components/WireList";

export function generateStaticParams() {
  return SUBCATEGORIZED.flatMap((category) =>
    Object.keys(SUBCATEGORIES).map((sub) => ({ category, sub }))
  );
}

export async function generateMetadata({ params }) {
  const { category, sub } = await params;
  if (!CATEGORIES[category] || !SUBCATEGORIES[sub]) return {};
  const lang = await getLang();
  return { title: `${t(lang, `cat.${category}`)} · ${t(lang, `sub.${sub}`)} — GR Wire` };
}

export default async function SubcategoryPage({ params }) {
  const { category, sub } = await params;
  if (!CATEGORIES[category] || !SUBCATEGORIES[sub] || !SUBCATEGORIZED.includes(category)) {
    notFound();
  }

  const lang = await getLang();
  const items = await getCategoryItems(category, sub);

  return (
    <Shell
      lang={lang}
      active={category}
      activeSub={sub}
      heading={`${t(lang, `cat.${category}`)} · ${t(lang, `sub.${sub}`)}`}
    >
      <p className="px-4 pb-3 text-sm text-muted">
        {t(lang, sub === "technology" ? "cat.technologyNote" : "cat.newsNote")}
      </p>
      <WireList
        lang={lang}
        items={items}
        showCategory={false}
        emptyMessage={t(lang, "cat.empty")}
      />
    </Shell>
  );
}
