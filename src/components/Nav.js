import Link from "next/link";
import { CATEGORIES } from "@/lib/feeds";

export default function Nav() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-3xl mx-auto px-4 py-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <Link href="/" className="text-xl font-bold tracking-tight">
          GR Wire
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {Object.entries(CATEGORIES).map(([slug, label]) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-gray-50"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
