import Link from "next/link";
import { CATEGORIES } from "@/lib/feeds";

const DOT = {
  finance: "bg-emerald-500",
  telco: "bg-violet-500",
  energy: "bg-amber-500",
};

export default function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-8 gap-y-2 px-4 py-4">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          GR<span className="text-emerald-500">Wire</span>
        </Link>
        <nav className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {Object.entries(CATEGORIES).map(([slug, label]) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="flex items-center gap-1.5 font-medium text-gray-600 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${DOT[slug]}`} />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
