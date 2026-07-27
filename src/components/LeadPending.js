import Link from "next/link";
import { t } from "@/lib/i18n";

/**
 * Shown when the newest week has notes but no lead yet. Notes are published ad
 * hoc and the lead is weekly, so this window is normal rather than a failure —
 * but leaving the top of the page blank would read as one. Says what is
 * missing and hands the reader the piece that is still standing.
 */
export default function LeadPending({ lang, week }) {
  const version = week.lead[lang] || week.lead.el;

  return (
    <div className="border-b border-rule bg-tint px-4 py-5">
      <div className="mx-auto max-w-[68ch]">
        <p className="text-sm text-ink-2">{t(lang, "weekly.noLead")}</p>
        <Link
          href={`/weekly/${week.meta.week}`}
          className="mt-2 flex flex-wrap items-baseline gap-x-2"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-band">
            {t(lang, "weekly.readPrevious")}
          </span>
          <span lang={lang} className="font-serif text-[0.95rem] text-ink underline hover:no-underline">
            {version.title}
          </span>
        </Link>
      </div>
    </div>
  );
}
