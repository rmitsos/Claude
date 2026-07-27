import Link from "next/link";
import { notFound } from "next/navigation";
import { WEEKS, getWeek, weekNotes } from "@/content/editorials";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import Shell from "@/components/Shell";
import Editorial from "@/components/Editorial";
import NoteList from "@/components/NoteList";

// The permanent address of a week: its lead piece plus whatever notes were
// filed against it. /weekly moves to the newest week every time one opens,
// which is exactly what a shared link must not do — this is the URL to post.
export function generateStaticParams() {
  return WEEKS.map((w) => ({ week: w.meta.week }));
}

export async function generateMetadata({ params }) {
  const { week: id } = await params;
  const week = getWeek(id);
  if (!week) return {};
  // Before the lead is written the newest note is what the page is about, and
  // a share of it should say so rather than inheriting the generic site title.
  const piece = week.lead?.el || weekNotes(week)[0]?.el;
  if (!piece) return {};
  return { title: `${piece.title} — GR Wire`, description: piece.standfirst };
}

export default async function WeekPage({ params }) {
  const { week: id } = await params;
  const week = getWeek(id);
  if (!week) notFound();

  const lang = await getLang();
  const notes = weekNotes(week);

  return (
    <Shell lang={lang} active="weekly">
      {week.lead && (
        <Editorial meta={week.meta} el={week.lead.el} en={week.lead.en} />
      )}

      <NoteList
        lang={lang}
        week={week.meta.week}
        notes={notes}
        heading={t(lang, "weekly.notes")}
        note={t(lang, "weekly.notesNote")}
      />

      <p className="px-4 py-5 text-sm text-muted">
        <Link href="/weekly" className="underline hover:no-underline">
          {t(lang, "weekly.latestLink")}
        </Link>
      </p>
    </Shell>
  );
}
