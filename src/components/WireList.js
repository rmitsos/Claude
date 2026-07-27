import { CATEGORIES } from "@/lib/feeds";
import { t, locale } from "@/lib/i18n";

const CATEGORY_STYLE = {
  finance: "text-fin",
  telco: "text-tel",
  energy: "text-enr",
};

function makeFormatters(lang) {
  const opts = { timeZone: "Europe/Athens" };
  return {
    time: new Intl.DateTimeFormat(locale(lang), { ...opts, hour: "2-digit", minute: "2-digit", hour12: false }),
    dayKey: new Intl.DateTimeFormat("en-GB", { ...opts, year: "numeric", month: "2-digit", day: "2-digit" }),
    dayLabel: new Intl.DateTimeFormat(locale(lang), { ...opts, weekday: "long", day: "numeric", month: "long" }),
  };
}

// Items arrive newest-first, so one pass preserves that ordering.
function groupByDay(items, fmt, lang) {
  const todayKey = fmt.dayKey.format(new Date());
  const yesterdayKey = fmt.dayKey.format(new Date(Date.now() - 86400000));
  const groups = [];

  for (const item of items) {
    if (!item.pubDate) continue;
    const key = fmt.dayKey.format(item.pubDate);
    const last = groups[groups.length - 1];
    if (last && last.key === key) {
      last.items.push(item);
      continue;
    }
    const written = fmt.dayLabel.format(item.pubDate);
    let label = written;
    if (key === todayKey) label = `${t(lang, "day.today")} · ${written}`;
    else if (key === yesterdayKey) label = `${t(lang, "day.yesterday")} · ${written}`;
    groups.push({ key, label, items: [item] });
  }
  return groups;
}

function Row({ item, showCategory, fmt, lang }) {
  const category = Object.keys(CATEGORIES).find((c) => item.categories?.includes(c));

  return (
    <li className="grid grid-cols-[3.25rem_1fr] gap-x-3 border-b border-rule/60 px-4 py-2.5 last:border-b-0 hover:bg-hover sm:grid-cols-[3.25rem_5.5rem_1fr]">
      <time className="pt-0.5 font-mono text-xs tabular-nums text-muted">
        {fmt.time.format(item.pubDate)}
      </time>

      {showCategory ? (
        <span
          className={`hidden pt-0.5 font-mono text-[11px] uppercase tracking-wider sm:block ${
            CATEGORY_STYLE[category] || "text-muted"
          }`}
        >
          {category ? t(lang, `cat.${category}.short`) : ""}
        </span>
      ) : (
        <span className="hidden sm:block" />
      )}

      <div>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          lang={item.lang}
          className="font-serif text-[0.95rem] leading-snug text-ink hover:underline"
        >
          {item.title}
        </a>
        {item.technology && (
          <span className="ml-1.5 inline-block rounded-sm border border-tech/60 px-1 align-[1px] font-mono text-[10px] uppercase tracking-wide text-tech">
            {t(lang, "tag.tech")}
          </span>
        )}
        <span className="ml-1.5 font-mono text-[11px] text-muted">{item.source}</span>
      </div>
    </li>
  );
}

export default function WireList({ lang = "el", items, showCategory = true, emptyMessage }) {
  if (!items || items.length === 0) {
    return (
      <p className="border border-dashed border-rule px-4 py-10 text-center text-sm text-muted">
        {emptyMessage || t(lang, "list.empty")}
      </p>
    );
  }

  const fmt = makeFormatters(lang);

  return (
    <div>
      {groupByDay(items, fmt, lang).map((group) => (
        <section key={group.key}>
          <h2 className="sticky top-0 z-[5] flex items-center gap-3 border-b border-rule/60 bg-ground/95 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted backdrop-blur-sm">
            {group.label}
            <span className="h-px flex-1 bg-rule" />
          </h2>
          <ul>
            {group.items.map((item, i) => (
              <Row
                key={`${item.link}-${i}`}
                item={item}
                showCategory={showCategory}
                fmt={fmt}
                lang={lang}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
