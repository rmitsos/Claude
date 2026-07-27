import Link from "next/link";
import { getWireItems } from "@/lib/articles";
import { getLatestPiece } from "@/content/editorials";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import Shell from "@/components/Shell";
import LeadStories from "@/components/LeadStories";
import WireList from "@/components/WireList";

export default async function HomePage() {
  const lang = await getLang();
  const items = await getWireItems();
  // Whatever we published most recently, lead or note. Always pointing at the
  // lead would mean a note filed on Thursday got no surface on the busiest
  // page of the site, which defeats the point of being able to publish one.
  const latest = getLatestPiece();
  const edition = latest?.[lang] || latest?.el;

  return (
    <Shell lang={lang}>
      {/* One line, not a card: the wire's job is the wire, but nobody finds
          the editorial unless something here points at it. It stays one line
          however much we publish — four lines here and the top of the wire
          becomes an editorial index. */}
      {latest && (
        <Link
          href={latest.href}
          className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-b border-rule bg-tint px-4 py-2.5 hover:bg-hover"
        >
          {/* The label names which kind of piece it is, so a reader who
              clicks a note is not expecting the week's argument. */}
          <span className="font-mono text-[11px] uppercase tracking-widest text-band">
            {t(lang, latest.kind === "note" ? "weekly.note" : "nav.weekly")}
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
