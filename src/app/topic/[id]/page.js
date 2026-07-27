import Link from "next/link";
import { notFound } from "next/navigation";
import { ENTITIES, ENTITY_BY_ID } from "@/lib/entities";
import { getEntityItems } from "@/lib/articles";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import Shell from "@/components/Shell";
import WireList from "@/components/WireList";

export function generateStaticParams() {
  return ENTITIES.map((entity) => ({ id: entity.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const entity = ENTITY_BY_ID[id];
  if (!entity) return {};
  return { title: `${entity.label} — GR Wire` };
}

export default async function TopicPage({ params }) {
  const { id } = await params;
  const entity = ENTITY_BY_ID[id];
  if (!entity) notFound();

  const lang = await getLang();
  const items = await getEntityItems(id);
  const noun = t(lang, items.length === 1 ? "search.story" : "search.stories");

  return (
    <Shell lang={lang} heading={entity.label}>
      <p className="px-4 pb-3 text-sm text-muted">
        {t(lang, "topic.count", { n: items.length, noun })} ·{" "}
        <Link href={`/search?tag=${id}&period=12m`} className="underline hover:no-underline">
          {t(lang, "topic.changePeriod")}
        </Link>{" "}
        ·{" "}
        <Link href="/weekly" className="underline hover:no-underline">
          {t(lang, "topic.thisWeek")}
        </Link>
      </p>
      <WireList lang={lang} items={items} emptyMessage={t(lang, "topic.empty")} />
    </Shell>
  );
}
