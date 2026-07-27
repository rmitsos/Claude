"use client";

import { useRouter } from "next/navigation";
import { LANG_COOKIE, t } from "@/lib/i18n";

// Writes the cookie and asks the server to re-render. The strings live on the
// server, so a client-only swap would leave the page half-translated until
// the next navigation.
export default function LanguageToggle({ lang }) {
  const router = useRouter();

  function choose(next) {
    if (next === lang) return;
    // A year is long enough that a returning reader keeps their choice, and
    // Lax keeps it from riding along on cross-site requests.
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <div
      className="flex overflow-hidden rounded-sm border border-rule"
      role="group"
      aria-label={t(lang, "control.language")}
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
          lang={code}
          className={`px-2 py-1 font-mono text-[11px] tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-band ${
            lang === code ? "bg-band text-band-ink" : "text-muted hover:text-ink"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
