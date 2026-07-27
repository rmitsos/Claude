import Link from "next/link";
import { SITE } from "@/lib/site";
import Nav from "@/components/Nav";
import { getLang } from "@/lib/lang";
import Prose, { H2, Ul } from "@/components/Prose";

export const metadata = {
  title: "Privacy — GR Wire",
  description: "What GR Wire collects, what it doesn't, and who else your browser talks to.",
};

export default async function PrivacyPage() {
  const contact = SITE.contactEmail;
  const lang = await getLang();

  return (
    <>
      <Nav lang={lang} />
      <Prose
        title="Privacy"
        intro="GR Wire has no accounts, no sign-up, no advertising and no analytics. This page describes what that means in practice, including the parts that aren't obvious."
      >
        <H2>What we collect directly</H2>
        <p>
          Nothing. There are no accounts, no forms, no newsletter sign-up and no
          tracking scripts. We do not build a profile of you and have no way to
          identify you.
        </p>

        <H2>Cookies and local storage</H2>
        <p>
          Two things are stored in your browser, and only once you choose them.
          Both hold a single word. Neither identifies you, and neither is used
          for tracking, analytics or advertising.
        </p>
        <Ul>
          <li>
            <code className="font-mono text-[0.85em]">grwire-theme</code> —{" "}
            <em>dark</em> or <em>light</em>, kept in your browser&rsquo;s local
            storage when you use the theme switch. It is never sent to our
            servers.
          </li>
          <li>
            <code className="font-mono text-[0.85em]">grwire-lang</code> —{" "}
            <em>el</em> or <em>en</em>, set when you use the language switch.
            This one is a cookie rather than local storage because the interface
            text is built on the server, which has to know your choice before it
            can render the page. It is sent with requests to this site only.
          </li>
        </Ul>
        <p>
          Clearing your browser data removes both, and the site falls back to
          Greek and the dark theme.
        </p>
        <p>
          There is no consent banner because nothing here needs consent. Under
          the EU ePrivacy rules, consent is required for non-essential storage;
          a preference you set yourself, doing only what you asked it to do, is
          not that. A banner would be theatre rather than compliance.
        </p>
        <p>
          If analytics or advertising are ever added, that changes — this page
          will be updated and consent will be requested properly, before the
          change goes live rather than after.
        </p>

        <H2>What happens automatically</H2>
        <p>
          The site is hosted on Vercel. Like any web host, Vercel processes the
          technical data your browser sends with each request in order to serve
          the page and protect the service from abuse:
        </p>
        <Ul>
          <li>IP address</li>
          <li>Browser type and version (user agent)</li>
          <li>Page requested, date and time</li>
          <li>Referring page, if any</li>
        </Ul>
        <p>
          We rely on legitimate interest as the legal basis for this: a website
          cannot be operated or defended against attack without it. These logs
          are held by Vercel under their own retention policy and we do not
          export, enrich or analyse them.
        </p>

        <H2>Other servers your browser contacts</H2>
        <p>
          This is the part most privacy policies leave out, so to be explicit:
        </p>
        <Ul>
          <li>
            <strong>Publisher image servers.</strong> The five images in the
            leading-stories block are loaded directly from the news
            organisations that published them, not copied onto our servers.
            Your browser therefore requests those files from the publisher, and
            that publisher can see your IP address, browser and the fact that
            you came from GR Wire — exactly as if you had visited their site.
          </li>
          <li>
            <strong>Publishers you click through to.</strong> Every headline
            links out to its original source. Once you follow a link you are on
            that organisation&rsquo;s site, under their privacy policy, not ours.
          </li>
        </Ul>
        <p>
          Fonts are served from this site rather than fetched from a third party,
          so no request is made to any font provider.
        </p>

        <H2>The article database</H2>
        <p>
          GR Wire stores the headlines, publication times, source names and links
          it collects from public news feeds. That database contains published
          journalism only. It holds no information about readers.
        </p>

        <H2>Your rights</H2>
        <p>
          Under the GDPR you have the right of access, rectification, erasure,
          restriction, objection and data portability. In practice there is very
          little to exercise them against, since the only personal data involved
          is in host-level server logs.
        </p>
        <p>
          {contact ? (
            <>
              To make a request, contact{" "}
              <a href={`mailto:${contact}`} className="underline">
                {contact}
              </a>
              .
            </>
          ) : (
            <em>
              A contact address has not been configured yet — see
              src/lib/site.js.
            </em>
          )}{" "}
          You also have the right to complain to a supervisory authority. In{" "}
          {SITE.country} that is the Hellenic Data Protection Authority (
          <a href="https://www.dpa.gr/en" className="underline" rel="noopener noreferrer" target="_blank">
            dpa.gr
          </a>
          ).
        </p>

        <H2>Changes</H2>
        <p>
          If what the site does changes — analytics, a newsletter, advertising —
          this page will be updated before that change goes live, not after.
        </p>

        <p className="border-t border-rule pt-5 text-sm text-muted">
          Written to describe this site accurately rather than to cover every
          eventuality with boilerplate. It is not legal advice; if GR Wire starts
          carrying advertising or subscriptions, have a lawyer review it. See
          also the <Link href="/terms" className="underline">terms</Link> and{" "}
          <Link href="/about" className="underline">about</Link> pages.
        </p>
      </Prose>
    </>
  );
}
