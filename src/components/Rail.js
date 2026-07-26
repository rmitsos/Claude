import Link from "next/link";
import { CATEGORIES, SUBCATEGORIZED } from "@/lib/feeds";
import { getTodayCounts, getLeadStory } from "@/lib/articles";

const DOT = {
  finance: "bg-emerald-500",
  telco: "bg-blue-500",
  energy: "bg-amber-500",
};

function Heading({ children }) {
  return (
    <h2 className="mb-2 font-mono text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
      {children}
    </h2>
  );
}

export default async function Rail() {
  const [counts, lead] = await Promise.all([getTodayCounts(), getLeadStory()]);
  const totalTech = Object.values(counts).reduce((n, c) => n + c.technology, 0);

  return (
    <aside className="flex flex-col gap-7 border-gray-200 px-4 py-5 lg:border-l dark:border-gray-800">
      {lead && (
        <section>
          <Heading>Lead story</Heading>
          <a href={lead.link} target="_blank" rel="noopener noreferrer" className="group block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lead.image}
              alt=""
              loading="lazy"
              className="mb-2 aspect-[16/10] w-full rounded-sm object-cover"
            />
            <span className="font-serif text-[0.9rem] leading-snug group-hover:underline">
              {lead.title}
            </span>
            <span className="mt-1 block font-mono text-[11px] text-gray-400 dark:text-gray-500">
              {lead.source}
            </span>
          </a>
        </section>
      )}

      <section>
        <Heading>Last 24 hours</Heading>
        <ul className="flex flex-col gap-1.5">
          {Object.entries(CATEGORIES).map(([slug, label]) => (
            <li key={slug}>
              <Link
                href={`/${slug}`}
                className="flex items-baseline justify-between gap-2 text-sm text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${DOT[slug]}`} />
                  {label}
                </span>
                <span className="font-mono text-xs tabular-nums text-gray-400 dark:text-gray-500">
                  {counts[slug]?.total ?? 0}
                </span>
              </Link>
              {SUBCATEGORIZED.includes(slug) && counts[slug]?.technology > 0 && (
                <Link
                  href={`/${slug}/technology`}
                  className="ml-3.5 flex items-baseline justify-between gap-2 text-xs text-gray-500 hover:text-violet-700 dark:text-gray-500 dark:hover:text-violet-400"
                >
                  <span>of which Technology</span>
                  <span className="font-mono tabular-nums">{counts[slug].technology}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Heading>Coverage</Heading>
        <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          {totalTech} of the last 24 hours&rsquo; stories are about building or operating
          infrastructure rather than markets and policy.
        </p>
      </section>
    </aside>
  );
}
