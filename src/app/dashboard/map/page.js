"use client";

import { useMemo, useState, Suspense, use } from "react";
import { useDashboardToken } from "../layout";
import { RELATION_SECTIONS } from "@/lib/relationsData";

const SECTION_COLOR = { energy: "var(--enr)", telecom: "var(--tel)", finance: "var(--fin)" };
const SIZE = 560;
const CENTER = SIZE / 2;
const RADIUS = SIZE / 2 - 90;

const field =
  "border border-rule bg-surface px-3 py-2 text-sm text-ink focus:border-band focus:outline-none";
const button =
  "border border-band bg-band px-4 py-2 text-sm font-semibold text-band-ink hover:opacity-90 disabled:opacity-50";

// Never rejects — see src/app/dashboard/page.js for why.
async function fetchRelations(token) {
  return fetch("/api/dashboard/relations", { headers: { Authorization: `Bearer ${token}` } })
    .then((r) => (r.ok ? r.json() : { ok: false, relations: [] }))
    .then((body) => body.relations || [])
    .catch(() => []);
}

function layoutNodes(names) {
  const positions = new Map();
  names.forEach((name, i) => {
    const angle = (i / names.length) * 2 * Math.PI - Math.PI / 2;
    positions.set(name, {
      x: CENTER + RADIUS * Math.cos(angle),
      y: CENTER + RADIUS * Math.sin(angle),
    });
  });
  return positions;
}

function SectionGraph({ id, label, staticEdges, dynamicEdges, onSelect, selectedKey }) {
  const edges = useMemo(() => [...staticEdges, ...dynamicEdges], [staticEdges, dynamicEdges]);
  const names = useMemo(() => {
    const set = new Set();
    edges.forEach((e) => {
      set.add(e.subject);
      set.add(e.object);
    });
    return [...set];
  }, [edges]);

  const positions = useMemo(() => layoutNodes(names), [names]);
  const color = SECTION_COLOR[id] || "var(--muted)";

  if (!names.length) {
    return (
      <div>
        <h3 className="font-serif text-lg font-bold">{label}</h3>
        <p className="mt-2 text-sm text-muted">No relations recorded yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-serif text-lg font-bold">{label}</h3>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mt-2 w-full max-w-xl">
        {edges.map((e, i) => {
          const a = positions.get(e.subject);
          const b = positions.get(e.object);
          if (!a || !b) return null;
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const key = `${e.subject}--${e.relation}-->${e.object}-${i}`;
          const active = key === selectedKey;
          return (
            <g key={key} className="cursor-pointer" onClick={() => onSelect({ key, edge: e })}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={active ? color : "var(--rule)"}
                strokeWidth={active ? 2 : 1}
                strokeDasharray={e.pending ? "4 3" : undefined}
              />
              <rect x={mx - 3} y={my - 3} width={6} height={6} fill={color} opacity={active ? 1 : 0.4} />
            </g>
          );
        })}
        {names.map((name) => {
          const p = positions.get(name);
          return (
            <g key={name} className="cursor-pointer" onClick={() => onSelect({ key: null, node: name })}>
              <circle cx={p.x} cy={p.y} r={5} fill={color} />
              <text
                x={p.x}
                y={p.y}
                dx={p.x > CENTER ? 8 : -8}
                dy={4}
                fontSize={10}
                textAnchor={p.x > CENTER ? "start" : "end"}
                fill="var(--ink-2)"
              >
                {name.length > 26 ? `${name.slice(0, 25)}…` : name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function MapContent({ token, refreshKey, onChanged }) {
  // refreshKey isn't read inside the fetch — it's a deliberate cache-buster
  // so adding a relation forces a refetch.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const promise = useMemo(() => fetchRelations(token), [token, refreshKey]);
  const relations = use(promise);

  const [selection, setSelection] = useState(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    section: "energy",
    subject: "",
    relation: "",
    detail: "",
    object: "",
    source: "publisher",
    why: "",
  });

  async function addRelation(e) {
    e.preventDefault();
    if (!form.subject.trim() || !form.relation.trim() || !form.object.trim()) return;
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/dashboard/relations", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = await res.json();
      if (!res.ok || !body.ok) {
        setStatus(`Failed — ${body.error || res.status}`);
      } else {
        setStatus("Added — shown dashed until folded into relations.md.");
        setForm({ ...form, subject: "", relation: "", detail: "", object: "", why: "" });
        onChanged();
      }
    } catch (err) {
      setStatus(`Failed — ${err?.message || err}`);
    }
    setSaving(false);
  }

  const dynamicBySection = (id) =>
    relations.filter((r) => r.section === id).map((r) => ({ ...r, pending: !r.reconciled }));

  const detail = selection?.edge;
  const node = selection?.node;
  const nodeEdges = node
    ? [...RELATION_SECTIONS.flatMap((s) => s.entries.flatMap((e) => e.edges)), ...relations].filter(
        (e) => e.subject === node || e.object === node
      )
    : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_18rem]">
      <div className="flex flex-col gap-10">
        <p className="text-sm text-muted">
          Solid lines come from the hand-maintained market-relations knowledge base. Dashed
          lines are edges you&apos;ve added here, not yet folded into that file.
        </p>
        {RELATION_SECTIONS.map((section) => (
          <SectionGraph
            key={section.id}
            id={section.id}
            label={section.label}
            staticEdges={section.entries.flatMap((e) => e.edges)}
            dynamicEdges={dynamicBySection(section.id)}
            onSelect={setSelection}
            selectedKey={selection?.key}
          />
        ))}
      </div>

      <aside className="flex flex-col gap-6">
        <div>
          <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-muted">
            Detail
          </h3>
          {detail ? (
            <div className="mt-2 text-sm">
              <p>
                <strong>{detail.subject}</strong> --{detail.relation}
                {detail.detail ? `:${detail.detail}` : ""}--&gt; <strong>{detail.object}</strong>
              </p>
              {detail.heading && <p className="mt-1 text-xs text-muted">From: {detail.heading}</p>}
              {detail.source && <p className="mt-1 text-xs text-muted">Source: {detail.source}</p>}
              {detail.why && <p className="mt-2 text-ink-2">{detail.why}</p>}
            </div>
          ) : node ? (
            <div className="mt-2 text-sm">
              <p className="font-semibold">{node}</p>
              <ul className="mt-2 flex flex-col gap-2">
                {nodeEdges.map((e, i) => (
                  <li key={i} className="text-xs text-muted">
                    {e.subject} --{e.relation}
                    {e.detail ? `:${e.detail}` : ""}--&gt; {e.object}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-2 text-xs text-muted">Click a node or edge to see its detail.</p>
          )}
        </div>

        <form onSubmit={addRelation} className="flex flex-col gap-2 border-t border-rule pt-4">
          <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-muted">
            Add relation
          </h3>
          <select
            value={form.section}
            onChange={(e) => setForm({ ...form, section: e.target.value })}
            className={field}
          >
            <option value="energy">Energy</option>
            <option value="telecom">Telecom</option>
            <option value="finance">Finance</option>
          </select>
          <input
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={field}
          />
          <div className="flex gap-2">
            <input
              placeholder="relation"
              value={form.relation}
              onChange={(e) => setForm({ ...form, relation: e.target.value })}
              className={`${field} flex-1`}
            />
            <input
              placeholder="detail (optional)"
              value={form.detail}
              onChange={(e) => setForm({ ...form, detail: e.target.value })}
              className={`${field} flex-1`}
            />
          </div>
          <input
            placeholder="Object"
            value={form.object}
            onChange={(e) => setForm({ ...form, object: e.target.value })}
            className={field}
          />
          <select
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            className={field}
          >
            <option value="publisher">publisher</option>
            <option value="public">public</option>
            <option value="rumour">rumour</option>
            <option value="inferred">inferred</option>
          </select>
          <textarea
            placeholder="Why it matters (optional)"
            value={form.why}
            onChange={(e) => setForm({ ...form, why: e.target.value })}
            rows={2}
            className={field}
          />
          <button type="submit" disabled={saving} className={button}>
            {saving ? "Adding…" : "Add"}
          </button>
          {status && <p className="text-xs text-muted">{status}</p>}
        </form>
      </aside>
    </div>
  );
}

export default function RelationMapPage() {
  const token = useDashboardToken();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
      <MapContent token={token} refreshKey={refreshKey} onChanged={() => setRefreshKey((n) => n + 1)} />
    </Suspense>
  );
}
