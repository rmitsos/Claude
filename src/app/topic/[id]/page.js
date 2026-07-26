import Link from "next/link";
import { notFound } from "next/navigation";
import { ENTITIES, ENTITY_BY_ID } from "@/lib/entities";
import { getEntityItems } from "@/lib/articles";
import Shell from "@/components/Shell";
import WireList from "@/components/WireList";

export const revalidate = 900;

export function generateStaticParams() {
  return ENTITIES.map((entity) => ({ id: entity.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const entity = ENTITY_BY_ID[id];
  if (!entity) return {};
  return {
    title: `${entity.label} — GR Wire`,
    description: `Everything GR Wire has collected on ${entity.label}.`,
  };
}

export default async function TopicPage({ params }) {
  const { id } = await params;
  const entity = ENTITY_BY_ID[id];
  if (!entity) notFound();

  const items = await getEntityItems(id);

  return (
    <Shell heading={entity.label}>
      <p className="px-4 pb-3 text-sm text-gray-500 dark:text-gray-400">
        {items.length} {items.length === 1 ? "story" : "stories"} in the last 30 days ·{" "}
        <Link href="/weekly" className="underline hover:no-underline">
          back to this week
        </Link>
      </p>
      <WireList
        items={items}
        emptyMessage="Nothing collected on this subject yet."
      />
    </Shell>
  );
}
