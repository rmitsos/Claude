import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/feeds";
import { getCategoryItems } from "@/lib/articles";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import Shell from "@/components/Shell";
import WireList from "@/components/WireList";

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  if (!CATEGORIES[category]) return {};
  const lang = await getLang();
  return { title: `${t(lang, `cat.${category}`)} — GR Wire` };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  if (!CATEGORIES[category]) notFound();

  const lang = await getLang();
  const items = await getCategoryItems(category);

  return (
    <Shell lang={lang} active={category} heading={t(lang, `cat.${category}`)}>
      <WireList
        lang={lang}
        items={items}
        showCategory={false}
        emptyMessage={t(lang, "cat.empty")}
      />
    </Shell>
  );
}
