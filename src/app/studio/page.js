"use client";

import { useState } from "react";

// A browser front-end for the campaign route, because the publisher has no
// terminal and an API that can only be driven by curl is an API they do not
// have. The token is typed in and kept in sessionStorage for the tab — never
// in the URL, never in the page source, gone when the tab closes.
//
// Not linked from anywhere and disallowed in robots.txt. It is not secret —
// everything it can do still requires the token — it is simply not for
// readers.

const WEEKS = ["2026-w31", "2026-w30"];

// Slugs of notes that can be sent standalone (bypassing that week's lead
// and sweep) rather than only as part of the whole week's letter. Kept
// manual, like WEEKS and the editorial index itself — a note showing up
// here is a decision, not a side effect of the file existing.
const NOTES = {
  "2026-w31": ["kalodio-oxi-anemogennitria"],
  "2026-w30": ["pagio-diktyo-ina"],
};

function useToken() {
  const [token, setToken] = useState(() =>
    typeof window === "undefined" ? "" : sessionStorage.getItem("grwire-token") || ""
  );
  return [
    token,
    (value) => {
      setToken(value);
      if (typeof window !== "undefined") sessionStorage.setItem("grwire-token", value);
    },
  ];
}

export default function StudioPage() {
  const [token, setToken] = useToken();
  const [week, setWeek] = useState(WEEKS[0]);
  const [noteSlug, setNoteSlug] = useState(""); // "" = whole week's letter
  const [lang, setLang] = useState("el");
  const [html, setHtml] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const auth = { Authorization: `Bearer ${token}` };
  const noteParam = noteSlug ? `&note=${noteSlug}` : "";

  async function preview() {
    setBusy(true);
    setStatus("");
    try {
      const res = await fetch(`/api/campaign?week=${week}${noteParam}&lang=${lang}`, {
        headers: auth,
      });
      if (!res.ok) {
        setHtml("");
        setStatus(`Preview failed — ${res.status}${res.status === 401 ? " (wrong token)" : ""}`);
      } else {
        setHtml(await res.text());
        setStatus("");
      }
    } catch (err) {
      setStatus(`Preview failed — ${err?.message || err}`);
    }
    setBusy(false);
  }

  // Two steps rather than one button, deliberately. Creating a draft is
  // reversible but not free — it appears in MailerLite and has to be deleted
  // by hand — so it should follow having actually looked at the letter.
  async function createDrafts() {
    const what = noteSlug ? "this note alone" : "the whole week's letter";
    if (!confirm(`Create MailerLite drafts for both editions of ${what}? They will not be sent.`))
      return;
    setBusy(true);
    setStatus("");
    try {
      const res = await fetch(`/api/campaign?week=${week}${noteParam}`, {
        method: "POST",
        headers: auth,
      });
      const body = await res.json();
      setStatus(JSON.stringify(body, null, 2));
    } catch (err) {
      setStatus(`Failed — ${err?.message || err}`);
    }
    setBusy(false);
  }

  const field =
    "border border-rule bg-surface px-3 py-2 text-sm text-ink focus:border-band focus:outline-none";
  const button =
    "border border-band bg-band px-4 py-2 text-sm font-semibold text-band-ink hover:opacity-90 disabled:opacity-50";
  const ghost =
    "border border-rule px-4 py-2 text-sm text-ink hover:bg-hover disabled:opacity-50";

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
      <h1 className="font-serif text-2xl font-bold tracking-tight">Campaign studio</h1>
      <p className="mt-1 text-sm text-muted">
        Preview the letter, then create MailerLite drafts. Nothing here sends anything.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Token
          </span>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="CAMPAIGN_SECRET"
            className={field}
          />
        </label>

        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Week
            </span>
            <select
              value={week}
              onChange={(e) => {
                setWeek(e.target.value);
                setNoteSlug(""); // a note slug from the old week won't exist on the new one
              }}
              className={field}
            >
              {WEEKS.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Send
            </span>
            <select value={noteSlug} onChange={(e) => setNoteSlug(e.target.value)} className={field}>
              <option value="">Whole week (lead + notes + sweep)</option>
              {(NOTES[week] || []).map((slug) => (
                <option key={slug} value={slug}>
                  Note only: {slug}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Edition
            </span>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className={field}>
              <option value="el">Ελληνικά</option>
              <option value="en">English</option>
            </select>
          </label>

          <button type="button" onClick={preview} disabled={busy || !token} className={ghost}>
            Preview
          </button>
          <button
            type="button"
            onClick={createDrafts}
            disabled={busy || !token || !html}
            className={button}
          >
            Create drafts
          </button>
        </div>

        {!html && (
          <p className="text-xs text-muted">
            Preview first — the draft button stays disabled until you have looked at the
            letter.
          </p>
        )}
      </div>

      {status && (
        <pre className="mt-5 overflow-x-auto border border-rule bg-surface p-3 text-xs text-ink-2">
          {status}
        </pre>
      )}

      {html && (
        <div className="mt-6">
          <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted">
            {week} · {lang}
          </div>
          {/* srcDoc rather than a URL so the preview cannot carry the token in
              an address bar, and sandboxed so a bad link cannot navigate the
              parent page. */}
          <iframe
            title="Letter preview"
            srcDoc={html}
            sandbox=""
            className="h-[70vh] w-full border border-rule bg-white"
          />
        </div>
      )}
    </main>
  );
}
