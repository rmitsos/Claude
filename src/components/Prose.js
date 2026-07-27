import { SITE_DETAILS_COMPLETE, LAST_UPDATED } from "@/lib/site";
import { locale } from "@/lib/i18n";

const COPY = {
  el: {
    updated: "Τελευταία ενημέρωση",
    warnTitle: "Δεν είναι έτοιμο για δημοσίευση.",
    warnBody:
      "Το όνομα του εκδότη και η διεύθυνση επικοινωνίας στο src/lib/site.js δεν έχουν οριστεί ακόμη. Και τα δύο απαιτούνται από τον νόμο πριν ο ιστότοπος δοθεί σε δημόσιο domain.",
  },
  en: {
    updated: "Last updated",
    warnTitle: "Not ready to publish.",
    warnBody:
      "The publisher name and contact address in src/lib/site.js are still unset. Both are legally required before this site is served from a public domain.",
  },
};

// Shared shell for the legal pages: a single readable column, since these are
// read top-to-bottom rather than scanned like the wire.
export default function Prose({ lang = "el", title, intro, children }) {
  const c = COPY[lang] || COPY.el;
  const updated = new Intl.DateTimeFormat(locale(lang), {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Athens",
  }).format(new Date(LAST_UPDATED));

  return (
    <article lang={lang} className="mx-auto w-full max-w-[68ch] px-4 py-8">
      <h1 className="font-serif text-3xl font-bold tracking-tight">{title}</h1>
      {intro && (
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{intro}</p>
      )}
      <p className="mt-2 font-mono text-xs text-muted">
        {c.updated} {updated}
      </p>

      {!SITE_DETAILS_COMPLETE && (
        <p className="mt-6 border-l-2 border-band bg-tint px-4 py-3 text-sm text-ink-2">
          <strong className="text-ink">{c.warnTitle}</strong> {c.warnBody}
        </p>
      )}

      <div className="longform mt-8 flex flex-col gap-5 text-[0.95rem] text-ink-2">
        {children}
      </div>
    </article>
  );
}

export function H2({ children }) {
  return (
    <h2 className="mt-4 font-serif text-xl font-bold tracking-tight text-ink">
      {children}
    </h2>
  );
}

export function Ul({ children }) {
  return <ul className="flex list-disc flex-col gap-1.5 pl-5">{children}</ul>;
}
