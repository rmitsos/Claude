"use client";

import { useEffect, useMemo, useState } from "react";
import { useDashboardToken } from "../layout";
import { ENTITY_BY_ID } from "@/lib/entities";

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Athens",
  day: "2-digit",
  month: "short",
});

function label(id) {
  return ENTITY_BY_ID[id]?.label || id;
}

const field =
  "border border-rule bg-surface px-3 py-2 text-sm text-ink focus:border-band focus:outline-none";
const button =
  "border border-band bg-band px-4 py-2 text-sm font-semibold text-band-ink hover:opacity-90 disabled:opacity-50";
const ghost = "border border-rule px-2 py-1 text-xs text-ink hover:bg-hover";

export default function BriefsPage() {
  const token = useDashboardToken();
  const auth = { Authorization: `Bearer ${token}` };

  const [digest, setDigest] = useState(null);
  const [briefs, setBriefs] = useState([]);
  const [briefsError, setBriefsError] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [note, setNote] = useState("");
  const [filter, setFilter] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  // Same plain fetch-in-effect pattern as /studio and the health page —
  // see src/app/dashboard/page.js for why this replaced an earlier
  // use()+Suspense attempt.
  //
  // react-hooks/immutability flags loadAll() here as "accessed before
  // declared". The equivalent single-function case (loadRelations() in
  // src/app/dashboard/map/page.js) doesn't trigger it; several reshapes of
  // this one (inlining loadBriefs, reordering declarations) didn't clear it
  // either, so this looks like a false positive on this specific rule
  // rather than a real hazard — loadAll is a stable function declaration,
  // not a value that changes identity across renders.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function loadAll() {
    fetch("/api/digest?format=json&period=7d&limit=150")
      .then((res) => res.json())
      .then(setDigest)
      .catch(() => setDigest({ items: [], trends: [], pairs: [] }));
    await loadBriefs();
  }

  async function loadBriefs() {
    const res = await fetch("/api/dashboard/briefs", { headers: auth });
    if (res.ok) {
      setBriefs((await res.json()).briefs || []);
      setBriefsError("");
    } else {
      setBriefsError(`Failed to load briefs — ${res.status}${res.status === 401 ? " (wrong password)" : ""}`);
    }
  }

  const items = useMemo(() => {
    const all = digest?.items || [];
    if (!filter.trim()) return all;
    const q = filter.toLowerCase();
    return all.filter((i) => i.title.toLowerCase().includes(q));
  }, [digest, filter]);

  function toggle(link) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(link)) next.delete(link);
      else next.add(link);
      return next;
    });
  }

  async function saveBrief() {
    if (!selected.size) return;
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/dashboard/briefs", {
        method: "POST",
        headers: { ...auth, "Content-Type": "application/json" },
        body: JSON.stringify({ links: [...selected], note: note.trim() || null }),
      });
      const body = await res.json();
      if (!res.ok || !body.ok) {
        setStatus(`Failed — ${body.error || res.status}`);
      } else {
        setStatus("Brief saved.");
        setSelected(new Set());
        setNote("");
        await loadBriefs();
      }
    } catch (err) {
      setStatus(`Failed — ${err?.message || err}`);
    }
    setSaving(false);
  }

  async function setBriefStatus(id, newStatus) {
    await fetch("/api/dashboard/briefs", {
      method: "PATCH",
      headers: { ...auth, "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    await loadBriefs();
  }

  if (!digest) return <p className="text-sm text-muted">Loading…</p>;

  const rising = (digest.trends || []).filter((t) => t.thisWeek > t.lastWeek).slice(0, 8);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_16rem]">
      <div>
        <h2 className="font-serif text-lg font-bold">Pick articles for a new piece</h2>
        <p className="mt-1 text-sm text-muted">
          Select what belongs in the next &quot;connecting the dots&quot; piece and add a note
          on why — this saves a brief for a writing session, it does not publish anything.
        </p>

        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by title…"
          className={`${field} mt-4 w-full`}
        />

        <div className="mt-3 max-h-[28rem] overflow-y-auto border border-rule">
          {items.map((item) => (
            <label
              key={item.link}
              className="flex cursor-pointer items-start gap-2 border-b border-rule px-3 py-2 text-sm last:border-0 hover:bg-hover"
            >
              <input
                type="checkbox"
                checked={selected.has(item.link)}
                onChange={() => toggle(item.link)}
                className="mt-1"
              />
              <span>
                <span className="block">{item.title}</span>
                <span className="mt-0.5 block font-mono text-[11px] text-muted">
                  {item.source}
                  {item.entities?.length ? ` · ${item.entities.map(label).join(", ")}` : ""}
                </span>
              </span>
            </label>
          ))}
          {!items.length && <p className="p-3 text-sm text-muted">No articles match.</p>}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Why do these belong together? (optional)"
          rows={3}
          className={`${field} mt-3 w-full`}
        />

        <div className="mt-3 flex items-center gap-3">
          <button type="button" onClick={saveBrief} disabled={!selected.size || saving} className={button}>
            {saving ? "Saving…" : `Save brief (${selected.size} selected)`}
          </button>
          {status && <span className="text-xs text-muted">{status}</span>}
        </div>

        <h2 className="mt-8 font-serif text-lg font-bold">Queued briefs</h2>
        {briefsError && <p className="mt-2 text-sm text-fin">{briefsError}</p>}
        <div className="mt-3 flex flex-col gap-3">
          {briefs.map((brief) => (
            <div key={brief.id} className="border border-rule p-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  {dateFmt.format(new Date(brief.created_at))} · {brief.status} ·{" "}
                  {brief.links.length} articles
                </span>
                {brief.status === "queued" && (
                  <div className="flex gap-2">
                    <button type="button" className={ghost} onClick={() => setBriefStatus(brief.id, "used")}>
                      Mark used
                    </button>
                    <button type="button" className={ghost} onClick={() => setBriefStatus(brief.id, "archived")}>
                      Archive
                    </button>
                  </div>
                )}
              </div>
              {brief.note && <p className="mt-2 text-ink-2">{brief.note}</p>}
              <ul className="mt-2 flex flex-col gap-1">
                {brief.links.map((link) => (
                  <li key={link} className="truncate font-mono text-xs text-muted">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {!briefs.length && !briefsError && <p className="text-sm text-muted">Nothing queued yet.</p>}
        </div>
      </div>

      <aside>
        <h2 className="font-serif text-sm font-bold uppercase tracking-widest text-muted">
          Gaining ground
        </h2>
        <ul className="mt-2 flex flex-col gap-1 text-sm">
          {rising.map((t) => (
            <li key={t.entity} className="flex justify-between">
              <span>{label(t.entity)}</span>
              <span className="font-mono text-xs text-muted">
                {t.lastWeek}→{t.thisWeek}
              </span>
            </li>
          ))}
          {!rising.length && <li className="text-xs text-muted">Nothing rising yet.</li>}
        </ul>

        <h2 className="mt-6 font-serif text-sm font-bold uppercase tracking-widest text-muted">
          Appearing together
        </h2>
        <ul className="mt-2 flex flex-col gap-1 text-sm">
          {(digest.pairs || []).map((p, i) => (
            <li key={i}>
              {label(p.left)} + {label(p.right)}
              <span className="ml-1 font-mono text-xs text-muted">({p.shared})</span>
            </li>
          ))}
          {!digest.pairs?.length && <li className="text-xs text-muted">Nothing shared yet.</li>}
        </ul>
      </aside>
    </div>
  );
}
