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
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import Shell from "@/components/Shell";
import Editorial from "@/components/Editorial";
import { getLatestEditorial } from "@/content/editorials";

// Week-over-week figures need a full prior week to compare against. Before
// that exists, every subject reads as surging simply because the database was
// empty — accurate arithmetic, false impression. Comparisons stay hidden
// until the archive is old enough to support them.
const COMPARISON_MIN_DAYS = 14;

const BAR = { finance: "bg-fin", telco: "bg-tel", energy: "bg-enr" };

export const metadata = {
  title: "Αυτή την εβδομάδα — GR Wire",
  description:
    "Τι κινήθηκε αυτή την εβδομάδα στην ελληνική οικονομία και στις υποδομές τηλεπικοινωνιών και ενέργειας.",
};

function label(entityId) {
  return ENTITY_BY_ID[entityId]?.label || entityId;
}

function Delta({ now, before, lang }) {
  if (before === 0 && now === 0) return null;
  if (before === 0) {
    return <span className="font-mono text-xs text-fin">{t(lang, "weekly.new")}</span>;
  }
  const pct = Math.round(((now - before) / before) * 100);
  if (pct === 0) {
    return <span className="font-mono text-xs text-muted">±0%</span>;
  }
  const up = pct > 0;
  return (
    <span className={`font-mono text-xs tabular-nums ${up ? "text-fin" : "text-muted"}`}>
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
  const lang = await getLang();
  const [totals, volume, trends, pairs, archive] = await Promise.all([
    getWeeklyTotals(),
    getWeeklyVolume(),
    getEntityTrends(),
    getCooccurrences(),
    getArchiveStart(),
  ]);

  const latest = getLatestEditorial();
  const archiveDays = archive ? (Date.now() - archive.started.getTime()) / 86400000 : 0;
  const canCompare = archiveDays >= COMPARISON_MIN_DAYS;

  const hasData = totals.thisWeek > 0;
  const volumeByCategory = Object.fromEntries(volume.map((v) => [v.category, v]));
  const rising = trends.filter((x) => x.thisWeek > x.lastWeek).slice(0, 8);
  const topThemes = trends.slice(0, 12);

  return (
    <Shell lang={lang} active="weekly">
      {latest && <Editorial meta={latest.meta} el={latest.el} en={latest.en} />}

      <div className="flex flex-col gap-9 px-4 pb-10 pt-7">
        <div>
          <h2 className="font-serif text-xl font-bold tracking-tight">
            {t(lang, "weekly.numbers")}
          </h2>
          <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-ink-2">
            {t(lang, "weekly.intro")}
            {!canCompare && t(lang, "weekly.noCompare")}
          </p>
        </div>

        {!hasData && (
          <p className="border border-dashed border-rule px-4 py-10 text-center text-sm text-muted">
            {t(lang, "weekly.notEnough")}
          </p>
        )}

        {hasData && (
          <>
            <section>
              <SectionHeading
                note={t(lang, canCompare ? "weekly.volumeNoteCompare" : "weekly.volumeNote")}
              >
                {t(lang, "weekly.volume")}
              </SectionHeading>

              <div className="flex flex-wrap gap-x-10 gap-y-4">
                <div>
                  <div className="font-mono text-2xl tabular-nums">{totals.thisWeek}</div>
                  <div className="flex items-baseline gap-2 text-xs text-muted">
                    {t(lang, "weekly.articles")}
                    {canCompare && (
                      <Delta now={totals.thisWeek} before={totals.lastWeek} lang={lang} />
                    )}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-2xl tabular-nums">{totals.techWeek}</div>
                  <div className="text-xs text-muted">{t(lang, "weekly.onBuilding")}</div>
                </div>
                <div>
                  <div className="font-mono text-2xl tabular-nums">{totals.sources}</div>
                  <div className="text-xs text-muted">{t(lang, "weekly.sources")}</div>
                </div>
              </div>

              <ul className="mt-5 flex flex-col gap-2">
                {Object.keys(CATEGORIES).map((slug) => {
                  const v = volumeByCategory[slug] || { thisWeek: 0, lastWeek: 0 };
                  const max = Math.max(...volume.map((x) => x.thisWeek), 1);
                  return (
                    <li key={slug} className="flex items-center gap-3">
                      <Link href={`/${slug}`} className="w-44 shrink-0 text-sm hover:underline">
                        {t(lang, `cat.${slug}`)}
                      </Link>
                      <div className="h-2 flex-1 overflow-hidden rounded-sm bg-rule/40">
                        <div
                          className={`h-full rounded-sm ${BAR[slug]}`}
                          style={{ width: `${(v.thisWeek / max) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right font-mono text-xs tabular-nums text-muted">
                        {v.thisWeek}
                      </span>
                      {canCompare && (
                        <span className="w-14 text-right">
                          <Delta now={v.thisWeek} before={v.lastWeek} lang={lang} />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>

            {canCompare && rising.length > 0 && (
              <section>
                <SectionHeading note={t(lang, "weekly.risingNote")}>
                  {t(lang, "weekly.rising")}
                </SectionHeading>
                <ul className="flex flex-col divide-y divide-rule/60">
                  {rising.map((x) => (
                    <li key={x.entity} className="flex items-baseline gap-3 py-2">
                      <Link href={`/topic/${x.entity}`} className="flex-1 text-sm hover:underline">
                        {label(x.entity)}
                      </Link>
                      <span className="font-mono text-xs tabular-nums text-muted">
                        {x.lastWeek} → {x.thisWeek}
                      </span>
                      <span className="w-14 text-right">
                        <Delta now={x.thisWeek} before={x.lastWeek} lang={lang} />
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {pairs.length > 0 && (
              <section>
                <SectionHeading note={t(lang, "weekly.connectionsNote")}>
                  {t(lang, "weekly.connections")}
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
                        {p.shared}{" "}
                        {t(lang, p.shared === 1 ? "weekly.storyOne" : "weekly.storyMany")}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {topThemes.length > 0 && (
              <section>
                <SectionHeading note={t(lang, "weekly.aboutNote")}>
                  {t(lang, "weekly.about")}
                </SectionHeading>
                <div className="flex flex-wrap gap-2">
                  {topThemes.map((x) => (
                    <Link
                      key={x.entity}
                      href={`/topic/${x.entity}`}
                      className="flex items-baseline gap-1.5 rounded-sm border border-rule px-2.5 py-1 text-sm hover:border-band"
                    >
                      {label(x.entity)}
                      <span className="font-mono text-xs tabular-nums text-muted">
                        {x.thisWeek}
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
