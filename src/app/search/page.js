import { ENTITY_BY_ID } from "@/lib/entities";
import {
  searchArticles,
  getArchiveStart,
  PERIODS,
  DEFAULT_PERIOD,
} from "@/lib/articles";
import Shell from "@/components/Shell";
import WireList from "@/components/WireList";
import SearchControls from "@/components/SearchControls";

export const metadata = {
  title: "Search — GR Wire",
  description: "Filter Greek finance, telecom and energy coverage by subject and period.",
};

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Athens",
});

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const tag = ENTITY_BY_ID[params?.tag] ? params.tag : null;
  const period = PERIODS[params?.period] ? params.period : DEFAULT_PERIOD;

  const [items, archive] = await Promise.all([
    searchArticles({ tag, period }),
    getArchiveStart(),
  ]);

  const subject = tag ? ENTITY_BY_ID[tag].label : "Everything";
  const periodLabel = PERIODS[period].label.toLowerCase();

  return (
    <Shell active="search" heading="Search">
      <div className="px-4 pb-2 pt-1">
        <SearchControls tag={tag} period={period} />

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 pb-1 pt-4">
          <p className="text-sm text-ink-2">
            <strong className="font-semibold">{items.length}</strong>{" "}
            {items.length === 1 ? "story" : "stories"} · {subject} · {periodLabel}
          </p>
          {archive && (
            <p className="text-sm text-muted">
              GR Wire has been collecting since {dateFmt.format(archive.started)}.
            </p>
          )}
        </div>

        {items.length === 0 && (
          <p className="mt-4 border border-dashed border-rule px-4 py-10 text-center text-sm text-muted">
            Nothing matches {subject.toLowerCase()} in this period.
            {period !== "all" && " Try a longer period."}
          </p>
        )}
      </div>

      {items.length > 0 && <WireList items={items} />}
    </Shell>
  );
}
