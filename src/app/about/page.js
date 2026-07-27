import Link from "next/link";
import { SITE } from "@/lib/site";
import { FEEDS } from "@/lib/feeds";
import Nav from "@/components/Nav";
import Prose, { H2, Ul } from "@/components/Prose";

export const metadata = {
  title: "About — GR Wire",
  description: "What GR Wire covers, where it gets its news, and how it decides what goes where.",
};

export default function AboutPage() {
  const contact = SITE.contactEmail;

  return (
    <>
      <Nav />
      <Prose title="About GR Wire" intro={SITE.tagline}>
        <H2>What it covers</H2>
        <p>
          Three beats that overlap more than the general Greek press treats them
          as doing:
        </p>
        <Ul>
          <li>
            <strong>Finance</strong> — banking, markets, ATHEX, macro and
            regulatory news
          </li>
          <li>
            <strong>Telecom infrastructure</strong> — operators, fibre and FTTH
            rollout, spectrum, the EETT regulator
          </li>
          <li>
            <strong>Energy infrastructure</strong> — the grid, renewables, gas,
            storage, and the operators behind them
          </li>
        </Ul>
        <p>
          Telecom and energy each split into <em>news</em> — markets, policy,
          corporate moves — and <em>technology</em>, meaning what is actually
          being built and switched on. Substations, battery installations, fibre
          builds and interconnectors get their own view because &ldquo;who
          announced what&rdquo; and &ldquo;what got commissioned&rdquo; are different
          questions.
        </p>

        <H2>How it works</H2>
        <p>
          GR Wire reads public RSS feeds from {FEEDS.length} Greek and
          international sources, several times a day. Each article is sorted by
          what it is about rather than which section of the newspaper it came
          from — a source&rsquo;s own &ldquo;Economy&rdquo; feed carries plenty of
          world news and wildfires alongside the finance, and only the relevant
          material is kept.
        </p>
        <p>
          The sorting is automated keyword matching across Greek and English,
          including capacity figures — a headline quoting 100MW or 400kV is
          almost always about something being built. It is a useful heuristic,
          not a perfect one.
        </p>

        <H2>Where the news comes from</H2>
        <p>
          Everything indexed here is reported by other people. Current sources
          include:
        </p>
        <Ul>
          {FEEDS.map((feed) => (
            <li key={feed.url}>{feed.name}</li>
          ))}
        </Ul>
        <p>
          The full list, including sources that were tried and could not be used,
          is kept in the{" "}
          <a
            href="https://github.com/rmitsos/Claude/blob/main/sources/greek-news-sources.md"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            repository
          </a>
          .
        </p>

        <H2>What it does not do</H2>
        <p>
          It does not reproduce articles. You get the headline, the publication,
          the time and a link — then you read the piece where it was published,
          and that publisher gets the visit. GR Wire employs no journalists and
          writes no stories.
        </p>

        <H2>Coverage is uneven, on purpose stated plainly</H2>
        <p>
          Finance and energy are well covered. Telecom is thinner, because
          several telecom trade publications block automated access outright.
          Rather than pad the section, the{" "}
          <Link href="/weekly" className="underline">weekly page</Link> shows the
          real counts so you can see where coverage is strong and where it is
          not.
        </p>

        <H2>Contact</H2>
        <p>
          {contact ? (
            <>
              Corrections, source suggestions and removal requests:{" "}
              <a href={`mailto:${contact}`} className="underline">
                {contact}
              </a>
              .
            </>
          ) : (
            <em>A contact address has not been configured yet — see src/lib/site.js.</em>
          )}
        </p>

        <p className="border-t border-gray-200 pt-5 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
          See also <Link href="/privacy" className="underline">privacy</Link> and{" "}
          <Link href="/terms" className="underline">terms</Link>.
        </p>
      </Prose>
    </>
  );
}
