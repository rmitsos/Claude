import Link from "next/link";
import { getWireItems } from "@/lib/articles";
import { getLatestEditorial } from "@/content/editorials";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import Shell from "@/components/Shell";
import LeadStories from "@/components/LeadStories";
import WireList from "@/components/WireList";

export default async function HomePage() {
  const lang = await getLang();
  const items = await getWireItems();
  const latest = getLatestEditorial();
  const edition = latest?.[lang] || latest?.el;

  return (
    <Shell lang={lang}>
      {/* One line, not a card: the wire's job is the wire, but nobody finds
          the editorial unless something here points at it. */}
      {latest && (
        <Link
          href="/weekly"
          className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-b border-rule bg-tint px-4 py-2.5 hover:bg-hover"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-band">
            {t(lang, "nav.weekly")}
          </span>
          <span lang={lang} className="font-serif text-[0.95rem] text-ink">
            {edition.title}
          </span>
          <span className="text-sm text-muted">→</span>
        </Link>
      )}

      <LeadStories lang={lang} />
      <WireList lang={lang} items={items} emptyMessage={t(lang, "wire.empty")} />
    </Shell>
  );
}
