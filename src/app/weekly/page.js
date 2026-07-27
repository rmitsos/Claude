import Link from "next/link";
import { CATEGORIES } from "@/lib/feeds";
import { ENTITY_BY_ID } from "@/lib/entities";
import {
  getWeeklyTotals,
  getWeeklyVolume,
  getEntityTrends,
  getCooccurrences,
  getArchiveStart,
} from "@/lib/articles";
import Shell from "@/components/Shell";
import Editorial from "@/components/Editorial";
import { getLatestEditorial } from "@/content/editorials";

// Week-over-week figures need a full prior week to compare against. Before
// that exists, every subject reads as surging simply because the database was
// empty — accurate arithmetic, false impression. Comparisons stay hidden
// until the archive is old enough to support them.
const COMPARISON_MIN_DAYS = 14;

export const revalidate = 900;

export const metadata = {
  title: "This week — GR Wire",
  description:
    "What moved this week across Greek finance, telecom and energy infrastructure.",
};

function label(entityId) {
  return ENTITY_BY_ID[entityId]?.label || entityId;
}

function Delta({ now, before }) {
  if (before === 0 && now === 0) return null;
  if (before === 0) {
    return <span className="font-mono text-xs text-fin">new</span>;
  }
  const pct = Math.round(((now - before) / before) * 100);
  if (pct === 0) {
    return <span className="font-mono text-xs text-muted">±0%</span>;
  }
  const up = pct > 0;
  return (
    <span
      className={`font-mono text-xs tabular-nums ${
 up ? "text-fin" : "text-muted"
 }`}
    >
      {up ? "+" : ""}
      {pct}%
    </span>
  );
}

function SectionHeading({ children, note }) {
  return (
    <div className="mb-3">
      <h2 className="font-serif text-lg font-bold tracking-tight">{children}</h2>
      {note && <p className="mt-0.5 text-xs text-muted">{note}</p>}
    </div>
  );
}

export default async function WeeklyPage() {
  const [totals, volume, trends, pairs, archive] = await Promise.all([
    getWeeklyTotals(),
    getWeeklyVolume(),
    getEntityTrends(),
    getCooccurrences(),
    getArchiveStart(),
  ]);

  const latest = getLatestEditorial();
  const archiveDays = archive
    ? (Date.now() - archive.started.getTime()) / 86400000
    : 0;
  const canCompare = archiveDays >= COMPARISON_MIN_DAYS;

  const hasData = totals.thisWeek > 0;
  const volumeByCategory = Object.fromEntries(volume.map((v) => [v.category, v]));
  const rising = trends.filter((t) => t.thisWeek > t.lastWeek).slice(0, 8);
  const topThemes = trends.slice(0, 12);

  return (
    <Shell active="weekly">
      {latest && <Editorial meta={latest.meta} el={latest.el} en={latest.en} />}

      <div className="flex flex-col gap-9 px-4 pb-10 pt-7">
        <div>
          <h2 className="font-serif text-xl font-bold tracking-tight">
            The numbers behind it
          </h2>
          <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-ink-2">
            Counted from the articles GR Wire has stored — nothing inferred. Follow any
            link to read the stories behind a number.
            {!canCompare && (
              <>
                {" "}
                Week-on-week comparisons are hidden until the archive is two weeks
                old; before then they would show growth that is only the database
                filling up.
              </>
            )}
          </p>
        </div>

        {!hasData && (
          <p className="border border-dashed border-rule px-4 py-10 text-center text-sm text-muted">
            Not enough articles yet. This page fills in once a week of coverage is stored.
          </p>
        )}

        {hasData && (
          <>
            {/* ---- volume ---- */}
            <section>
              <SectionHeading
                note={canCompare ? "Last 7 days against the 7 before." : "Last 7 days."}
              >
                Volume
              </SectionHeading>

              <div className="flex flex-wrap gap-x-10 gap-y-4">
                <div>
                  <div className="font-mono text-2xl tabular-nums">{totals.thisWeek}</div>
                  <div className="flex items-baseline gap-2 text-xs text-muted">
                    articles
                    {canCompare && (
                      <Delta now={totals.thisWeek} before={totals.lastWeek} />
                    )}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-2xl tabular-nums">{totals.techWeek}</div>
                  <div className="text-xs text-muted">
                    on building &amp; operating
                  </div>
                </div>
                <div>
                  <div className="font-mono text-2xl tabular-nums">{totals.sources}</div>
                  <div className="text-xs text-muted">sources publishing</div>
                </div>
              </div>

              <ul className="mt-5 flex flex-col gap-2">
                {Object.entries(CATEGORIES).map(([slug, name]) => {
                  const v = volumeByCategory[slug] || { thisWeek: 0, lastWeek: 0 };
                  const max = Math.max(...volume.map((x) => x.thisWeek), 1);
                  return (
                    <li key={slug} className="flex items-center gap-3">
                      <Link
                        href={`/${slug}`}
                        className="w-44 shrink-0 text-sm hover:underline"
                      >
                        {name}
                      </Link>
                      <div className="h-2 flex-1 overflow-hidden rounded-sm bg-rule/40">
                        <div
                          className="h-full rounded-sm bg-muted"
                          style={{ width: `${(v.thisWeek / max) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right font-mono text-xs tabular-nums text-muted">
                        {v.thisWeek}
                      </span>
                      {canCompare && (
                        <span className="w-14 text-right">
                          <Delta now={v.thisWeek} before={v.lastWeek} />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* ---- rising ---- */}
            {canCompare && rising.length > 0 && (
              <section>
                <SectionHeading note="Subjects mentioned more often than last week.">
                  Gaining ground
                </SectionHeading>
                <ul className="flex flex-col divide-y divide-rule/60">
                  {rising.map((t) => (
                    <li key={t.entity} className="flex items-baseline gap-3 py-2">
                      <Link
                        href={`/topic/${t.entity}`}
                        className="flex-1 text-sm hover:underline"
                      >
                        {label(t.entity)}
                      </Link>
                      <span className="font-mono text-xs tabular-nums text-muted">
                        {t.lastWeek} → {t.thisWeek}
                      </span>
                      <span className="w-14 text-right">
                        <Delta now={t.thisWeek} before={t.lastWeek} />
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* ---- connections ---- */}
            {pairs.length > 0 && (
              <section>
                <SectionHeading note="Subjects that turned up in the same articles this week. Co-occurrence, not causation — it points you at a thread worth pulling, nothing more.">
                  Connections
                </SectionHeading>
                <ul className="flex flex-col divide-y divide-rule/60">
                  {pairs.map((p) => (
                    <li key={`${p.left}-${p.right}`} className="flex items-baseline gap-3 py-2">
                      <Link
                        href={`/topic/${p.left}`}
                        className="text-sm font-medium hover:underline"
                      >
                        {label(p.left)}
                      </Link>
                      <span className="text-muted">+</span>
                      <Link
                        href={`/topic/${p.right}`}
                        className="flex-1 text-sm font-medium hover:underline"
                      >
                        {label(p.right)}
                      </Link>
                      <span className="font-mono text-xs tabular-nums text-muted">
                        {p.shared} {p.shared === 1 ? "story" : "stories"}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* ---- all themes ---- */}
            {topThemes.length > 0 && (
              <section>
                <SectionHeading note="Most-mentioned subjects this week. Follow any one for its full coverage.">
                  What the week was about
                </SectionHeading>
                <div className="flex flex-wrap gap-2">
                  {topThemes.map((t) => (
                    <Link
                      key={t.entity}
                      href={`/topic/${t.entity}`}
                      className="flex items-baseline gap-1.5 rounded-sm border border-rule px-2.5 py-1 text-sm hover:border-band"
                    >
                      {label(t.entity)}
                      <span className="font-mono text-xs tabular-nums text-muted">
                        {t.thisWeek}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </Shell>
  );
}
