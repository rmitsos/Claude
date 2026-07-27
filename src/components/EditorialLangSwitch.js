"use client";

import { useEffect, useState } from "react";

// Both language versions are rendered on the server and swapped here, which
// keeps the page statically cached and makes switching instant. The choice is
// mirrored into the URL so an English version can still be shared with someone
// who does not read Greek — without it, "here's this week's piece" would
// always open in Greek for them.
export default function EditorialLangSwitch({ el, en, defaultLang = "el" }) {
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (requested === "en" || requested === "el") setLang(requested);
  }, []);

  function choose(next) {
    setLang(next);
    const url = new URL(window.location.href);
    if (next === defaultLang) url.searchParams.delete("lang");
    else url.searchParams.set("lang", next);
    window.history.replaceState({}, "", url);
  }

  return (
    <div className="border-b border-rule bg-tint">
      <div className="mx-auto flex max-w-[68ch] justify-end px-4 pt-4">
        <div
          className="flex overflow-hidden rounded-sm border border-rule"
          role="group"
          aria-label="Editorial language"
        >
          {[
            { code: "el", label: "ΕΛ", full: "Ελληνικά" },
            { code: "en", label: "EN", full: "English" },
          ].map(({ code, label, full }) => (
            <button
              key={code}
              type="button"
              onClick={() => choose(code)}
              aria-pressed={lang === code}
              title={full}
              className={`px-2.5 py-1 font-mono text-[11px] tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-band ${
                lang === code
                  ? "bg-band text-band-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {lang === "el" ? el : en}
    </div>
  );
}
