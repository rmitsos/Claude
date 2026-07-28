"use client";

import { useState } from "react";
import Link from "next/link";
import { t } from "@/lib/i18n";

/**
 * Never an overlay, never a popup — but it does belong on the front page.
 * "No interruption" rules out anything standing between the reader and the
 * news; a static block at the top of the editorial zone is not that, and most
 * visitors never navigate deeper than the front page, so a form only on the
 * piece pages would be seen by almost nobody.
 *
 * `compact` is the front-page shape: one line and the input, no body copy and
 * no language choice, because the dots block above it already gives the reason
 * and the reader's site language is a safe default. The full version, with the
 * promise spelled out and the edition chosen explicitly, goes at the foot of
 * the pieces where there is room for it.
 */
export default function Subscribe({ lang, compact = false }) {
  const [email, setEmail] = useState("");
  const [choice, setChoice] = useState(lang);
  const [state, setState] = useState("idle"); // idle | sending | done | error

  async function submit(event) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang: choice }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  // The success message deliberately says to go and confirm. Double opt-in
  // means nothing arrives until they do, and a reader who thinks they are
  // subscribed and never hears from us is worse than one who never signed up.
  if (state === "done") {
    return (
      <section className={`border-rule bg-tint px-4 ${compact ? "border-b py-4" : "border-t py-6"}`}>
        <div className="mx-auto max-w-[68ch]">
          <p className="font-serif text-lg text-ink">{t(lang, "mail.thanks")}</p>
          <p className="mt-1 text-sm text-ink-2">{t(lang, "mail.confirm")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`border-rule bg-tint px-4 ${compact ? "border-b py-4" : "border-t py-6"}`}>
      <div className="mx-auto max-w-[68ch]">
        <h2
          className={
            compact
              ? "font-serif text-[1.05rem] font-bold tracking-tight text-ink"
              : "font-serif text-lg font-bold tracking-tight text-ink"
          }
        >
          {t(lang, compact ? "mail.headingShort" : "mail.heading")}
        </h2>
        {!compact && (
          <p className="mt-1 text-sm leading-relaxed text-ink-2">{t(lang, "mail.body")}</p>
        )}

        <form onSubmit={submit} className={`flex flex-col gap-3 ${compact ? "mt-2.5" : "mt-4"}`}>
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="subscribe-email" className="sr-only">
              {t(lang, "mail.emailLabel")}
            </label>
            <input
              id="subscribe-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t(lang, "mail.placeholder")}
              className="min-w-0 flex-1 border border-rule bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-band focus:outline-none"
            />
            <button
              type="submit"
              disabled={state === "sending"}
              className="border border-band bg-band px-4 py-2 text-sm font-semibold text-band-ink hover:opacity-90 disabled:opacity-60"
            >
              {t(lang, state === "sending" ? "mail.sending" : "mail.action")}
            </button>
          </div>

          {/* Which written version to send. The site can offer a toggle; an
              email has to be one language or the other. Compact inherits the
              language the reader is already browsing in. */}
          {!compact && <fieldset className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <legend className="sr-only">{t(lang, "mail.langLabel")}</legend>
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
              {t(lang, "mail.langLabel")}
            </span>
            {[
              ["el", "Ελληνικά"],
              ["en", "English"],
            ].map(([value, label]) => (
              <label key={value} className="flex items-center gap-1.5 text-sm text-ink-2">
                <input
                  type="radio"
                  name="edition"
                  value={value}
                  checked={choice === value}
                  onChange={() => setChoice(value)}
                  className="accent-[var(--band)]"
                />
                {label}
              </label>
            ))}
          </fieldset>}

          {state === "error" && (
            <p className="text-sm text-ink-2">{t(lang, "mail.error")}</p>
          )}

          <p className="text-xs text-muted">
            {t(lang, compact ? "mail.legalShort" : "mail.legal")}{" "}
            <Link href="/privacy" className="underline hover:no-underline">
              {t(lang, "footer.privacy")}
            </Link>
            .
          </p>
        </form>
      </div>
    </section>
  );
}
