import { ENTITY_BY_ID } from "@/lib/entities";
import { searchArticles, getArchiveStart, PERIODS, DEFAULT_PERIOD } from "@/lib/articles";
import { getLang } from "@/lib/lang";
import { t, locale } from "@/lib/i18n";
import Shell from "@/components/Shell";
import WireList from "@/components/WireList";
import SearchControls from "@/components/SearchControls";

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const lang = await getLang();
  const tag = ENTITY_BY_ID[params?.tag] ? params.tag : null;
  const period = PERIODS[params?.period] ? params.period : DEFAULT_PERIOD;

  const [items, archive] = await Promise.all([
    searchArticles({ tag, period }),
    getArchiveStart(),
  ]);

  const dateFmt = new Intl.DateTimeFormat(locale(lang), {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Athens",
  });

  const subject = tag ? ENTITY_BY_ID[tag].label : t(lang, "search.everything");
  const noun = t(lang, items.length === 1 ? "search.story" : "search.stories");

  return (
    <Shell lang={lang} active="search" heading={t(lang, "search.title")}>
      <div className="px-4 pb-2 pt-1">
        <SearchControls lang={lang} tag={tag} period={period} />

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 pb-1 pt-4">
          <p className="text-sm text-ink-2">
            {t(lang, "search.results", {
              n: items.length,
              noun,
              subject,
              period: t(lang, `period.${period}`).toLowerCase(),
            })}
          </p>
          {archive && (
            <p className="text-sm text-muted">
              {t(lang, "search.archiveSince", { date: dateFmt.format(archive.started) })}
            </p>
          )}
        </div>

        {items.length === 0 && (
          <p className="mt-4 border border-dashed border-rule px-4 py-10 text-center text-sm text-muted">
            {t(lang, "search.empty", { subject })}
            {period !== "all" && t(lang, "search.tryLonger")}
          </p>
        )}
      </div>

      {items.length > 0 && <WireList lang={lang} items={items} />}
    </Shell>
  );
}
