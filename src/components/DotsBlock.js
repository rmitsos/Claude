import Link from "next/link";
import { t, locale } from "@/lib/i18n";
import { getLatestLead, allPieces } from "@/content/editorials";

// The front page's one non-aggregated surface. Everything else on this page is
// someone else's headline; this is the only thing GR Wire wrote, and it is the
// only thing here a reader cannot get from a feed reader.
//
// The byline does the work an explicit "we wrote this" label used to do. A
// named byline is how journalism has distinguished original writing from wire
// copy for two centuries, and it reads as confidence rather than disclaimer.
//
// Hard cap of three: one featured piece and at most two more. It does not grow
// as more is published, because four editorial rows above the wire would turn
// the top of a news page into a contents page.
const MAX_SECONDARY = 2;

function formatDate(iso, lang, opts = {}) {
  return new Intl.DateTimeFormat(locale(lang), {
    timeZone: "Europe/Athens",
    day: "numeric",
    month: opts.long ? "long" : "short",
    ...(opts.long ? { year: "numeric" } : {}),
  }).format(new Date(iso));
}

export default function DotsBlock({ lang }) {
  const pieces = allPieces();
  if (!pieces.length) return null;

  // The lead holds the top slot even when a note is newer: it is the week's
  // argument and the notes hang off it. Only when no lead exists anywhere —
  // the opening days of a week, before it is written — does a note lead.
  const leadWeek = getLatestLead();
  const featured = leadWeek
    ? pieces.find((p) => p.kind === "lead" && p.href.endsWith(leadWeek.meta.week))
    : pieces[0];
  if (!featured) return null;

  const secondary = pieces
    .filter((p) => p.href !== featured.href)
    .slice(0, MAX_SECONDARY);

  const version = featured[lang] || featured.el;

  return (
    <section className="border-b border-rule bg-tint px-4 py-6">
      <div className="mx-auto max-w-[68ch]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-band">
            {t(lang, "dots.label")}
          </h2>
          <Link
            href="/weekly"
            className="font-mono text-[11px] text-muted underline hover:no-underline"
          >
            {t(lang, "dots.more")} →
          </Link>
        </div>
        <p className="mt-1 text-xs text-muted">{t(lang, "dots.note")}</p>

        <Link href={featured.href} className="group mt-4 block">
          <h3
            lang={lang}
            className="font-serif text-xl font-bold leading-tight tracking-tight text-ink group-hover:underline sm:text-2xl"
          >
            {version.title}
          </h3>
          {version.standfirst && (
            <p lang={lang} className="mt-1.5 font-serif text-[1.05rem] leading-snug text-ink-2">
              {version.standfirst}
            </p>
          )}
          <p className="mt-2 font-mono text-[11px] text-muted">
            {featured.meta.author} · {formatDate(featured.published, lang, { long: true })}
          </p>
        </Link>

        {secondary.length > 0 && (
          <ul className="mt-4 flex flex-col border-t border-rule">
            {secondary.map((piece) => {
              const v = piece[lang] || piece.el;
              return (
                <li key={piece.href} className="border-b border-rule">
                  <Link
                    href={piece.href}
                    className="-mx-2 flex flex-wrap items-baseline gap-x-2.5 px-2 py-2 hover:bg-hover"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                      {formatDate(piece.published, lang)}
                    </span>
                    <span lang={lang} className="font-serif text-[0.95rem] text-ink">
                      {v.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
