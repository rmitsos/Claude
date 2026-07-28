import Link from "next/link";
import { t, locale } from "@/lib/i18n";

// The section index: every piece we have written, newest first, leads and
// notes together in one sequence.
//
// Flat rather than grouped by week. Chronology is the spine everywhere else on
// this site, and the kind label already carries the lead-versus-note
// distinction — nesting would buy structure the label gives for free, at the
// cost of the one ordering readers here are used to.
function formatDate(iso, lang) {
  return new Intl.DateTimeFormat(locale(lang), {
    timeZone: "Europe/Athens",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default function PieceList({ lang, pieces }) {
  if (!pieces.length) {
    return (
      <p className="border-b border-rule px-4 py-10 text-center text-sm text-muted">
        {t(lang, "dots.empty")}
      </p>
    );
  }

  return (
    <ul className="flex flex-col border-b border-rule">
      {pieces.map((piece) => {
        const version = piece[lang] || piece.el;
        return (
          <li key={piece.href} className="border-t border-rule first:border-t-0">
            <Link href={piece.href} className="group block px-4 py-5 hover:bg-hover">
              <div className="mx-auto max-w-[68ch]">
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  <span className="text-band">
                    {t(lang, piece.kind === "note" ? "weekly.note" : "dots.lead")}
                  </span>{" "}
                  · {formatDate(piece.published, lang)}
                </div>
                <h2
                  lang={lang}
                  className="mt-1.5 font-serif text-xl font-bold leading-tight tracking-tight text-ink group-hover:underline"
                >
                  {version.title}
                </h2>
                {version.standfirst && (
                  <p lang={lang} className="mt-1.5 leading-snug text-ink-2">
                    {version.standfirst}
                  </p>
                )}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
