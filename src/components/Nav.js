import Link from "next/link";
import { CATEGORIES, SUBCATEGORIES, SUBCATEGORIZED } from "@/lib/feeds";
import ThemeToggle from "@/components/ThemeToggle";

const DOT = {
  finance: "bg-fin",
  telco: "bg-tel",
  energy: "bg-enr",
};

export default function Nav({ active, activeSub }) {
  return (
    <header className="sticky top-0 z-10 border-b border-rule bg-surface/90 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 py-3">
          <Link href="/" className="font-serif text-xl font-bold tracking-tight">
            GR<span className="text-band">Wire</span>
          </Link>

          <nav className="flex flex-wrap items-baseline gap-x-5 gap-y-1 text-sm">
            <Link
              href="/"
              className={
                active === undefined
                  ? "font-semibold text-ink"
                  : "text-ink-2 hover:text-ink"
              }
            >
              Wire
            </Link>
            {Object.entries(CATEGORIES).map(([slug, label]) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className={`flex items-center gap-1.5 ${
 active === slug
 ? "font-semibold text-ink"
 : "text-ink-2 hover:text-ink"
 }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${DOT[slug]}`} />
                {label}
              </Link>
            ))}
            <Link
              href="/search"
              className={
                active === "search"
                  ? "font-semibold text-ink"
                  : "text-ink-2 hover:text-ink"
              }
            >
              Search
            </Link>
            <Link
              href="/weekly"
              className={
                active === "weekly"
                  ? "font-semibold text-ink"
                  : "text-ink-2 hover:text-ink"
              }
            >
              This week
            </Link>
          </nav>

          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        {/* Sub-navigation appears only inside a category that has one, so the
            top level stays uncluttered for readers who don't need the split. */}
        {active && SUBCATEGORIZED.includes(active) && (
          <div className="flex gap-5 pb-2 pl-0 text-[13px]">
            <Link
              href={`/${active}`}
              className={
                !activeSub
                  ? "font-semibold text-ink"
                  : "text-muted hover:text-ink"
              }
            >
              All
            </Link>
            {Object.entries(SUBCATEGORIES).map(([slug, label]) => (
              <Link
                key={slug}
                href={`/${active}/${slug}`}
                className={
                  activeSub === slug
                    ? "font-semibold text-ink"
                    : "text-muted hover:text-ink"
                }
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
