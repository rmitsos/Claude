import Link from "next/link";
import { CATEGORIES, SUBCATEGORIES, SUBCATEGORIZED } from "@/lib/feeds";
import { t } from "@/lib/i18n";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";

const DOT = {
  finance: "bg-fin",
  telco: "bg-tel",
  energy: "bg-enr",
};

function linkClass(isActive) {
  return isActive
    ? "font-semibold text-ink"
    : "text-ink-2 hover:text-ink";
}

export default function Nav({ lang, active, activeSub }) {
  return (
    <header className="sticky top-0 z-10 border-b border-rule bg-surface/90 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 py-3">
          <Link href="/" className="font-serif text-xl font-bold tracking-tight">
            GR<span className="text-band">Wire</span>
          </Link>

          <nav className="flex flex-wrap items-baseline gap-x-5 gap-y-1 text-sm">
            <Link href="/" className={linkClass(active === undefined)}>
              {t(lang, "nav.wire")}
            </Link>
            {Object.keys(CATEGORIES).map((slug) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className={`flex items-center gap-1.5 ${linkClass(active === slug)}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${DOT[slug]}`} />
                {t(lang, `cat.${slug}`)}
              </Link>
            ))}
            <Link href="/search" className={linkClass(active === "search")}>
              {t(lang, "nav.search")}
            </Link>
            <Link href="/weekly" className={linkClass(active === "weekly")}>
              {t(lang, "nav.weekly")}
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <LanguageToggle lang={lang} />
            <ThemeToggle lang={lang} />
          </div>
        </div>

        {/* Sub-navigation appears only inside a category that has one, so the
            top level stays uncluttered for readers who don't need the split. */}
        {active && SUBCATEGORIZED.includes(active) && (
          <div className="flex gap-5 pb-2 text-[13px]">
            <Link href={`/${active}`} className={linkClass(!activeSub)}>
              {t(lang, "nav.all")}
            </Link>
            {Object.keys(SUBCATEGORIES).map((slug) => (
              <Link
                key={slug}
                href={`/${active}/${slug}`}
                className={linkClass(activeSub === slug)}
              >
                {t(lang, `sub.${slug}`)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
