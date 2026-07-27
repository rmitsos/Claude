import Link from "next/link";
import { getWireItems } from "@/lib/articles";
import { getLatestEditorial } from "@/content/editorials";
import Shell from "@/components/Shell";
import LeadStories from "@/components/LeadStories";
import WireList from "@/components/WireList";

export const revalidate = 300;

export default async function HomePage() {
  const items = await getWireItems();
  const latest = getLatestEditorial();

  return (
    <Shell>
      {/* One line, not a card: the wire's job is the wire, but nobody finds
          the editorial unless something here points at it. */}
      {latest && (
        <Link
          href="/weekly"
          className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-b border-rule bg-tint px-4 py-2.5 hover:bg-hover"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-band">
            Αυτή την εβδομάδα
          </span>
          <span lang="el" className="font-serif text-[0.95rem] text-ink">
            {latest.el.title}
          </span>
          <span className="text-sm text-muted">→</span>
        </Link>
      )}

      <LeadStories />
      <WireList
        items={items}
        emptyMessage="No articles yet — the ingestion job may not have run."
      />
    </Shell>
  );
}
