import Link from "next/link";
import { CATEGORIES, SUBCATEGORIZED } from "@/lib/feeds";
import { getTodayCounts } from "@/lib/articles";

const DOT = {
  finance: "bg-fin",
  telco: "bg-tel",
  energy: "bg-enr",
};

function Heading({ children }) {
  return (
    <h2 className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted">
      {children}
    </h2>
  );
}

export default async function Rail() {
  const counts = await getTodayCounts();
  const totalTech = Object.values(counts).reduce((n, c) => n + c.technology, 0);

  return (
    <aside className="flex flex-col gap-7 border-rule px-4 py-5 lg:border-l">
      <section>
        <Heading>Last 24 hours</Heading>
        <ul className="flex flex-col gap-1.5">
          {Object.entries(CATEGORIES).map(([slug, label]) => (
            <li key={slug}>
              <Link
                href={`/${slug}`}
                className="flex items-baseline justify-between gap-2 text-sm text-ink-2 hover:text-ink"
              >
                <span className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${DOT[slug]}`} />
                  {label}
                </span>
                <span className="font-mono text-xs tabular-nums text-muted">
                  {counts[slug]?.total ?? 0}
                </span>
              </Link>
              {SUBCATEGORIZED.includes(slug) && counts[slug]?.technology > 0 && (
                <Link
                  href={`/${slug}/technology`}
                  className="ml-3.5 flex items-baseline justify-between gap-2 text-xs text-muted hover:text-tech"
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
        <p className="text-xs leading-relaxed text-muted">
          {totalTech} of the last 24 hours&rsquo; stories are about building or operating
          infrastructure rather than markets and policy.
        </p>
        <Link
          href="/weekly"
          className="mt-2 inline-block text-xs font-medium text-band hover:underline"
        >
          This week&rsquo;s connections →
        </Link>
      </section>
    </aside>
  );
}
