import Link from "next/link";
import { locale } from "@/lib/i18n";

// Notes arrive at any point in the week, so each row carries its own date.
// Without it a reader has no way to tell Monday's note from Friday's, and the
// list stops looking like something that is still being added to.
function formatDate(iso, lang) {
  return new Intl.DateTimeFormat(locale(lang), {
    timeZone: "Europe/Athens",
    day: "numeric",
    month: "short",
  }).format(new Date(iso));
}

/**
 * The week's notes, newest first. Renders nothing at all when there are none —
 * most weeks will have only a lead, and a heading standing over an empty box
 * reads as a section that failed to load rather than one that is simply empty.
 */
export default function NoteList({ lang, week, notes, heading, note: description }) {
  if (!notes.length) return null;

  return (
    <section className="border-t border-rule px-4 py-6">
      <div className="mx-auto max-w-[68ch]">
        <h2 className="font-serif text-lg font-bold tracking-tight">{heading}</h2>
        <p className="mt-0.5 text-xs text-muted">{description}</p>

        <ul className="mt-4 flex flex-col">
          {notes.map((n) => {
            const version = n[lang] || n.el;
            return (
              <li key={n.slug} className="border-t border-rule first:border-t-0">
                <Link
                  href={`/weekly/${week}/${n.slug}`}
                  className="-mx-2 flex flex-col gap-1 rounded-sm px-2 py-3 hover:bg-hover"
                >
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    {formatDate(n.published, lang)}
                  </span>
                  <span
                    lang={lang}
                    className="font-serif text-[1.05rem] leading-snug text-ink"
                  >
                    {version.title}
                  </span>
                  {version.standfirst && (
                    <span lang={lang} className="text-sm leading-snug text-ink-2">
                      {version.standfirst}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
