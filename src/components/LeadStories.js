import { getLeadStories } from "@/lib/articles";
import { t, locale } from "@/lib/i18n";

function Meta({ item, fmt, lang }) {
  return (
    <span className="mt-1 block font-mono text-[11px] text-muted">
      {item.source}
      {item.pubDate && ` · ${fmt.format(item.pubDate)}`}
      {item.technology && <span className="ml-1.5 text-tech">{t(lang, "tag.tech")}</span>}
    </span>
  );
}

export default async function LeadStories({ lang = "el" }) {
  const stories = await getLeadStories(5);
  if (stories.length === 0) return null;

  const fmt = new Intl.DateTimeFormat(locale(lang), {
    timeZone: "Europe/Athens",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const [hero, ...rest] = stories;

  return (
    <section className="border-b border-rule px-4 pb-5 pt-5">
      <h2 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted">
        {t(lang, "lead.heading")}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <a href={hero.link} target="_blank" rel="noopener noreferrer" className="group block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero.image}
            alt=""
            className="mb-2 aspect-[16/9] w-full rounded-sm object-cover"
          />
          <h3 lang={hero.lang} className="font-serif text-lg leading-tight group-hover:underline">
            {hero.title}
          </h3>
          <Meta item={hero} fmt={fmt} lang={lang} />
        </a>

        <div className="flex flex-col gap-3">
          {rest.map((item) => (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[4.5rem_1fr] gap-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="aspect-square w-full rounded-sm object-cover"
              />
              <div className="min-w-0">
                <h3
                  lang={item.lang}
                  className="font-serif text-[0.9rem] leading-snug group-hover:underline"
                >
                  {item.title}
                </h3>
                <Meta item={item} fmt={fmt} lang={lang} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
