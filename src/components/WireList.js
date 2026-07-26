import { CATEGORIES } from "@/lib/feeds";

const CATEGORY_STYLE = {
  finance: "text-emerald-700 dark:text-emerald-400",
  telco: "text-blue-700 dark:text-blue-400",
  energy: "text-amber-700 dark:text-amber-500",
};

const SHORT_LABEL = {
  finance: "Finance",
  telco: "Telco",
  energy: "Energy",
};

const athens = (opts) => new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Athens", ...opts });

const timeFmt = athens({ hour: "2-digit", minute: "2-digit", hour12: false });
const dayKeyFmt = athens({ year: "numeric", month: "2-digit", day: "2-digit" });
const dayLabelFmt = athens({ weekday: "long", day: "numeric", month: "long" });

function dayLabel(date) {
  const todayKey = dayKeyFmt.format(new Date());
  const key = dayKeyFmt.format(date);
  if (key === todayKey) return `Today · ${dayLabelFmt.format(date)}`;

  const yesterday = new Date(Date.now() - 86400000);
  if (key === dayKeyFmt.format(yesterday)) return `Yesterday · ${dayLabelFmt.format(date)}`;

  return dayLabelFmt.format(date);
}

// Groups consecutive items by Athens calendar day. Items arrive already
// sorted newest-first, so a single pass preserves that ordering.
function groupByDay(items) {
  const groups = [];
  for (const item of items) {
    if (!item.pubDate) continue;
    const key = dayKeyFmt.format(item.pubDate);
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.items.push(item);
    else groups.push({ key, label: dayLabel(item.pubDate), items: [item] });
  }
  return groups;
}

function Row({ item, showCategory }) {
  const category = Object.keys(CATEGORIES).find((c) => item.categories?.includes(c));

  return (
    <li className="grid grid-cols-[3.25rem_1fr] gap-x-3 border-b border-gray-100 px-4 py-2.5 last:border-b-0 hover:bg-gray-50 sm:grid-cols-[3.25rem_5.5rem_1fr] dark:border-gray-800/70 dark:hover:bg-gray-900/50">
      <time className="pt-0.5 font-mono text-xs tabular-nums text-gray-400 dark:text-gray-500">
        {timeFmt.format(item.pubDate)}
      </time>

      {showCategory ? (
        <span
          className={`hidden pt-0.5 font-mono text-[11px] uppercase tracking-wider sm:block ${
            CATEGORY_STYLE[category] || "text-gray-400"
          }`}
        >
          {SHORT_LABEL[category] || ""}
        </span>
      ) : (
        <span className="hidden sm:block" />
      )}

      <div>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif text-[0.95rem] leading-snug text-gray-900 hover:underline dark:text-gray-100"
        >
          {item.title}
        </a>
        {item.technology && (
          <span className="ml-1.5 inline-block rounded-sm border border-violet-500/60 px-1 align-[1px] font-mono text-[10px] uppercase tracking-wide text-violet-700 dark:text-violet-400">
            Tech
          </span>
        )}
        <span className="ml-1.5 font-mono text-[11px] text-gray-400 dark:text-gray-500">
          {item.source}
        </span>
      </div>
    </li>
  );
}

export default function WireList({ items, showCategory = true, emptyMessage }) {
  if (!items || items.length === 0) {
    return (
      <p className="border border-dashed border-gray-300 px-4 py-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        {emptyMessage || "Nothing here yet."}
      </p>
    );
  }

  return (
    <div>
      {groupByDay(items).map((group) => (
        <section key={group.key}>
          <h2 className="sticky top-0 z-[5] flex items-center gap-3 border-b border-gray-100 bg-gray-50/95 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-gray-500 backdrop-blur-sm dark:border-gray-800/70 dark:bg-gray-950/95 dark:text-gray-400">
            {group.label}
            <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
          </h2>
          <ul>
            {group.items.map((item, i) => (
              <Row key={`${item.link}-${i}`} item={item} showCategory={showCategory} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
