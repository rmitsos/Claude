import Link from "next/link";
import { SITE } from "@/lib/site";
import Nav from "@/components/Nav";
import Prose, { H2, Ul } from "@/components/Prose";

export const metadata = {
  title: "Terms — GR Wire",
  description: "Terms of use for GR Wire, including copyright and removal requests.",
};

export default function TermsPage() {
  const contact = SITE.contactEmail;

  return (
    <>
      <Nav />
      <Prose
        title="Terms of use"
        intro="GR Wire is a news aggregator. It indexes headlines from public feeds and links back to the organisations that reported them."
      >
        <H2>What this site is</H2>
        <p>
          GR Wire collects headlines from publicly available news feeds covering
          Greek finance, telecommunications infrastructure and energy
          infrastructure, sorts them by time, and links each one to its source.
          It does not employ reporters and produces no journalism of its own.
        </p>

        <H2>Copyright</H2>
        <p>
          Every article indexed here belongs to the organisation that published
          it. That copyright is theirs and is not affected by appearing on this
          site.
        </p>
        <p>What GR Wire shows for each article is deliberately limited to:</p>
        <Ul>
          <li>the headline as published</li>
          <li>the name of the publication</li>
          <li>the publication time</li>
          <li>a link to the original article</li>
          <li>
            for the five leading stories, the publisher&rsquo;s own preview image,
            loaded from their servers rather than copied
          </li>
        </Ul>
        <p>
          Article text is not reproduced, and readers are always sent to the
          publisher to read the piece.
        </p>

        <H2>Publishers: removal requests</H2>
        <p>
          If you publish one of the sources indexed here and want your material
          removed, or your feed excluded entirely, ask and it will be done —
          promptly and without argument.
        </p>
        <p>
          {contact ? (
            <>
              Write to{" "}
              <a href={`mailto:${contact}`} className="underline">
                {contact}
              </a>{" "}
              identifying the publication and what you want removed.
            </>
          ) : (
            <em>A contact address has not been configured yet — see src/lib/site.js.</em>
          )}
        </p>

        <H2>Accuracy</H2>
        <p>
          Headlines are reproduced automatically as published. GR Wire does not
          verify, correct or endorse them, and cannot vouch for their accuracy —
          judge each story by its source, and read the original before relying on
          it.
        </p>
        <p>
          Articles are sorted into categories, and marked as technology or news,
          by automated keyword matching. That process is imperfect: stories are
          sometimes filed under the wrong heading or missed altogether.
        </p>
        <p>
          The <Link href="/weekly" className="underline">weekly page</Link>{" "}
          reports counts taken from the articles collected here. Those counts
          describe this site&rsquo;s own coverage, not the Greek market as a whole,
          and where it shows subjects appearing together it means exactly that —
          co-occurrence, not a demonstrated relationship between them.
        </p>

        <H2>Nothing here is advice</H2>
        <p>
          GR Wire covers financial and infrastructure topics but provides no
          investment, financial, legal or professional advice of any kind. Do not
          make decisions on the basis of an aggregated headline.
        </p>

        <H2>Links to other sites</H2>
        <p>
          Outbound links are provided for reference. The organisations behind
          them are independent of GR Wire, and we are not responsible for their
          content, availability or practices.
        </p>

        <H2>Availability</H2>
        <p>
          The site is provided as-is, with no guarantee that it will be available,
          current or complete. Feeds break, sources block automated access, and
          coverage gaps happen.
        </p>

        <p className="border-t border-rule pt-5 text-sm text-muted">
          These terms describe how the site actually operates rather than
          restating standard boilerplate. They are not legal advice. See also{" "}
          <Link href="/privacy" className="underline">privacy</Link> and{" "}
          <Link href="/about" className="underline">about</Link>.
        </p>
      </Prose>
    </>
  );
}
