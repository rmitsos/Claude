import Link from "next/link";
import { CATEGORIES } from "@/lib/feeds";
import { ENTITY_BY_ID } from "@/lib/entities";
import {
  getWeeklyTotals,
  getWeeklyVolume,
  getEntityTrends,
  getCooccurrences,
} from "@/lib/articles";
import Shell from "@/components/Shell";

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
    return <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">new</span>;
  }
  const pct = Math.round(((now - before) / before) * 100);
  if (pct === 0) {
    return <span className="font-mono text-xs text-gray-400 dark:text-gray-500">±0%</span>;
  }
  const up = pct > 0;
  return (
    <span
      className={`font-mono text-xs tabular-nums ${
        up ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500 dark:text-gray-500"
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
      {note && <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{note}</p>}
    </div>
  );
}

export default async function WeeklyPage() {
  const [totals, volume, trends, pairs] = await Promise.all([
    getWeeklyTotals(),
    getWeeklyVolume(),
    getEntityTrends(),
    getCooccurrences(),
  ]);

  const hasData = totals.thisWeek > 0;
  const volumeByCategory = Object.fromEntries(volume.map((v) => [v.category, v]));
  const rising = trends.filter((t) => t.thisWeek > t.lastWeek).slice(0, 8);
  const topThemes = trends.slice(0, 12);

  return (
    <Shell active="weekly" heading="This week">
      <div className="flex flex-col gap-9 px-4 pb-10 pt-2">
        <p className="max-w-[62ch] text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          Every figure here is counted from the articles GR Wire has stored — nothing is
          inferred or written for you. Follow any link to read the stories behind a number.
        </p>

        {!hasData && (
          <p className="border border-dashed border-gray-300 px-4 py-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
            Not enough articles yet. This page fills in once a week of coverage is stored.
          </p>
        )}

        {hasData && (
          <>
            {/* ---- volume ---- */}
            <section>
              <SectionHeading note="Last 7 days against the 7 before.">
                Volume
              </SectionHeading>

              <div className="flex flex-wrap gap-x-10 gap-y-4">
                <div>
                  <div className="font-mono text-2xl tabular-nums">{totals.thisWeek}</div>
                  <div className="flex items-baseline gap-2 text-xs text-gray-500 dark:text-gray-400">
                    articles <Delta now={totals.thisWeek} before={totals.lastWeek} />
                  </div>
                </div>
                <div>
                  <div className="font-mono text-2xl tabular-nums">{totals.techWeek}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    on building &amp; operating
                  </div>
                </div>
                <div>
                  <div className="font-mono text-2xl tabular-nums">{totals.sources}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">sources publishing</div>
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
                      <div className="h-2 flex-1 overflow-hidden rounded-sm bg-gray-100 dark:bg-gray-800">
                        <div
                          className="h-full rounded-sm bg-gray-400 dark:bg-gray-600"
                          style={{ width: `${(v.thisWeek / max) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right font-mono text-xs tabular-nums text-gray-500">
                        {v.thisWeek}
                      </span>
                      <span className="w-14 text-right">
                        <Delta now={v.thisWeek} before={v.lastWeek} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* ---- rising ---- */}
            {rising.length > 0 && (
              <section>
                <SectionHeading note="Subjects mentioned more often than last week.">
                  Gaining ground
                </SectionHeading>
                <ul className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800/70">
                  {rising.map((t) => (
                    <li key={t.entity} className="flex items-baseline gap-3 py-2">
                      <Link
                        href={`/topic/${t.entity}`}
                        className="flex-1 text-sm hover:underline"
                      >
                        {label(t.entity)}
                      </Link>
                      <span className="font-mono text-xs tabular-nums text-gray-500 dark:text-gray-400">
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
                <ul className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800/70">
                  {pairs.map((p) => (
                    <li key={`${p.left}-${p.right}`} className="flex items-baseline gap-3 py-2">
                      <Link
                        href={`/topic/${p.left}`}
                        className="text-sm font-medium hover:underline"
                      >
                        {label(p.left)}
                      </Link>
                      <span className="text-gray-300 dark:text-gray-600">+</span>
                      <Link
                        href={`/topic/${p.right}`}
                        className="flex-1 text-sm font-medium hover:underline"
                      >
                        {label(p.right)}
                      </Link>
                      <span className="font-mono text-xs tabular-nums text-gray-500 dark:text-gray-400">
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
                      className="flex items-baseline gap-1.5 rounded-sm border border-gray-200 px-2.5 py-1 text-sm hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
                    >
                      {label(t.entity)}
                      <span className="font-mono text-xs tabular-nums text-gray-400 dark:text-gray-500">
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
