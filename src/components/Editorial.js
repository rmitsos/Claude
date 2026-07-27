import EditorialLangSwitch from "./EditorialLangSwitch";
import { DEFAULT_EDITORIAL_LANG } from "@/content/editorials";

const BYLINE = {
  el: { by: "Από", written: "Δικό μας κείμενο, όχι αναδημοσίευση", week: "Αυτή την εβδομάδα" },
  en: { by: "By", written: "Written by us, not aggregated", week: "This week" },
};

function formatDate(iso, lang) {
  return new Intl.DateTimeFormat(lang === "el" ? "el-GR" : "en-GB", {
    timeZone: "Europe/Athens",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

// Everything else on the site is someone else's headline under someone else's
// byline. This is the one place GR Wire writes in its own voice, so it sits on
// its own surface and says so explicitly — a reader should never be unsure
// whether they are reading us or a publisher we link to.
function Version({ lang, meta, version, headingLevel }) {
  const Heading = headingLevel;
  const t = BYLINE[lang];

  return (
    <article lang={lang} className="px-4 pb-7 pt-3">
      <div className="mx-auto max-w-[68ch]">
        <div className="font-mono text-[11px] uppercase tracking-widest text-band">
          {t.week} · {meta.weekOf[lang]}
        </div>

        <Heading className="mt-2 font-serif text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
          {version.title}
        </Heading>

        {version.standfirst && (
          <p className="mt-2 font-serif text-lg leading-snug text-ink-2">
            {version.standfirst}
          </p>
        )}

        <div className="mt-3 border-y border-rule py-1.5 font-mono text-[11px] text-muted">
          {t.by} {meta.author} · {formatDate(meta.published, lang)} ·{" "}
          <span className="text-ink-2">{t.written}</span>
        </div>

        <div className="longform editorial mt-5 flex flex-col gap-4 text-[0.97rem] text-ink-2">
          <version.Body />
        </div>
      </div>
    </article>
  );
}

export default function Editorial({ meta, el, en, headingLevel = "h1" }) {
  return (
    <EditorialLangSwitch
      defaultLang={DEFAULT_EDITORIAL_LANG}
      el={<Version lang="el" meta={meta} version={el} headingLevel={headingLevel} />}
      en={<Version lang="en" meta={meta} version={en} headingLevel={headingLevel} />}
    />
  );
}
