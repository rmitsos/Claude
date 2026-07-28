import Link from "next/link";
import { notFound } from "next/navigation";
import { WEEKS, getNote } from "@/content/editorials";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import Shell from "@/components/Shell";
import Editorial from "@/components/Editorial";
import Subscribe from "@/components/Subscribe";

// Notes nest under the week they belong to, which is what the URL says:
// /weekly/2026-w30/<note>. A note is a shorter piece on one thread, so it is
// filed against a week rather than replacing it.
export function generateStaticParams() {
  return WEEKS.flatMap((w) =>
    w.notes.map((n) => ({ week: w.meta.week, note: n.slug }))
  );
}

export async function generateMetadata({ params }) {
  const { week, note: slug } = await params;
  const found = getNote(week, slug);
  if (!found) return {};
  return {
    title: `${found.note.el.title} — GR Wire`,
    description: found.note.el.standfirst,
  };
}

export default async function NotePage({ params }) {
  const { week, note: slug } = await params;
  const found = getNote(week, slug);
  if (!found) notFound();

  const lang = await getLang();

  return (
    <Shell lang={lang} active="weekly">
      <Editorial
        meta={found.week.meta}
        el={found.note.el}
        en={found.note.en}
        variant="note"
        published={found.note.published}
      />
      <Subscribe lang={lang} />

      <p className="px-4 py-5 text-sm text-muted">
        <Link
          href={`/weekly/${found.week.meta.week}`}
          className="underline hover:no-underline"
        >
          {t(lang, "weekly.backToWeek")}
        </Link>
      </p>
    </Shell>
  );
}
