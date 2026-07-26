import Link from "next/link";
import { CATEGORIES, SUBCATEGORIES, SUBCATEGORIZED } from "@/lib/feeds";

const DOT = {
  finance: "bg-emerald-500",
  telco: "bg-blue-500",
  energy: "bg-amber-500",
};

export default function Nav({ active, activeSub }) {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/90">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-baseline gap-x-7 gap-y-2 py-3">
          <Link href="/" className="font-serif text-xl font-bold tracking-tight">
            GR<span className="text-amber-600 dark:text-amber-500">Wire</span>
          </Link>

          <nav className="flex flex-wrap items-baseline gap-x-5 gap-y-1 text-sm">
            <Link
              href="/"
              className={
                active === undefined
                  ? "font-semibold text-gray-950 dark:text-white"
                  : "text-gray-600 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
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
                    ? "font-semibold text-gray-950 dark:text-white"
                    : "text-gray-600 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${DOT[slug]}`} />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sub-navigation appears only inside a category that has one, so the
            top level stays uncluttered for readers who don't need the split. */}
        {active && SUBCATEGORIZED.includes(active) && (
          <div className="flex gap-5 pb-2 pl-0 text-[13px]">
            <Link
              href={`/${active}`}
              className={
                !activeSub
                  ? "font-semibold text-gray-950 dark:text-white"
                  : "text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
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
                    ? "font-semibold text-gray-950 dark:text-white"
                    : "text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
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
