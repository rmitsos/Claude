"use client";

import { useMemo, useState, Suspense, use } from "react";
import { useDashboardToken } from "./layout";
import { CATEGORIES } from "@/lib/feeds";

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Athens",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const button =
  "border border-band bg-band px-4 py-2 text-sm font-semibold text-band-ink hover:opacity-90 disabled:opacity-50";

// Never rejects, so `use()` only ever suspends or resolves — a failed fetch
// is a value to render ({ ok: false }), not an exception for Suspense to
// catch. Matches the safeQuery pattern already used in lib/articles.js.
async function fetchHealth(token) {
  try {
    const res = await fetch("/api/dashboard/health", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    return await res.json();
  } catch (err) {
    return { ok: false, error: err?.message || String(err) };
  }
}

function FeedRow({ feed }) {
  const ok = feed.ok;
  return (
    <tr className="border-b border-rule last:border-0">
      <td className="py-1.5 pr-3">{feed.name}</td>
      <td className={`py-1.5 pr-3 font-mono text-xs ${ok ? "text-enr" : "text-fin"}`}>
        {ok ? "ok" : "error"}
      </td>
      <td className="py-1.5 pr-3 font-mono text-xs text-muted">
        {ok ? `${feed.relevant}/${feed.fetched}` : feed.error}
      </td>
    </tr>
  );
}

function HealthContent({ token, refreshKey, onScanned }) {
  // refreshKey isn't read inside the fetch — it's a deliberate cache-buster
  // so bumping it after a scan forces a refetch.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const promise = useMemo(() => fetchHealth(token), [token, refreshKey]);
  const data = use(promise);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState("");

  async function scanNow() {
    setScanning(true);
    setScanResult("");
    try {
      const res = await fetch("/api/dashboard/scan", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await res.json();
      setScanResult(
        `${body.ok ? "Done" : "Failed"} — ${body.relevant ?? 0} relevant, ${
          body.upserted ?? 0
        } upserted, ${body.failed ?? 0} failed`
      );
      onScanned();
    } catch (err) {
      setScanResult(`Failed — ${err?.message || err}`);
    }
    setScanning(false);
  }

  if (!data.ok) return <p className="text-sm text-fin">Failed to load — {data.error}</p>;

  const { latest, history, volume, archive } = data;

  return (
    <div className="flex flex-col gap-8">
      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold">Feed health</h2>
          <button type="button" onClick={scanNow} disabled={scanning} className={button}>
            {scanning ? "Scanning…" : "Scan now"}
          </button>
        </div>
        {scanResult && <p className="mt-2 text-xs text-muted">{scanResult}</p>}

        {latest ? (
          <>
            <p className="mt-3 text-xs text-muted">
              Last run {dateFmt.format(new Date(latest.ranAt))} Europe/Athens ·{" "}
              {latest.relevant} relevant · {latest.upserted} upserted ·{" "}
              {latest.duplicatesSkipped} duplicates skipped
              {latest.failed ? ` · ${latest.failed} write failures` : ""}
            </p>
            <table className="mt-3 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-rule text-[11px] uppercase tracking-widest text-muted">
                  <th className="pb-1.5 font-normal">Feed</th>
                  <th className="pb-1.5 font-normal">Status</th>
                  <th className="pb-1.5 font-normal">Relevant / fetched</th>
                </tr>
              </thead>
              <tbody>
                {latest.feeds.map((feed) => (
                  <FeedRow key={feed.name} feed={feed} />
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="mt-3 text-sm text-muted">No scan recorded yet — run one above.</p>
        )}
      </section>

      {history?.length > 1 && (
        <section>
          <h2 className="font-serif text-lg font-bold">Recent scans</h2>
          <table className="mt-3 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-rule text-[11px] uppercase tracking-widest text-muted">
                <th className="pb-1.5 font-normal">When</th>
                <th className="pb-1.5 font-normal">Relevant</th>
                <th className="pb-1.5 font-normal">Failing feeds</th>
              </tr>
            </thead>
            <tbody>
              {history.map((run, i) => (
                <tr key={i} className="border-b border-rule text-xs last:border-0">
                  <td className="py-1.5 pr-3 font-mono text-muted">
                    {dateFmt.format(new Date(run.ranAt))}
                  </td>
                  <td className="py-1.5 pr-3">{run.relevant}</td>
                  <td className="py-1.5 pr-3 text-fin">
                    {run.feeds.filter((f) => !f.ok).map((f) => f.name).join(", ") || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section>
        <h2 className="font-serif text-lg font-bold">Archive</h2>
        {archive ? (
          <p className="mt-2 text-sm text-muted">
            {archive.total} articles stored since {dateFmt.format(new Date(archive.started))}
          </p>
        ) : (
          <p className="mt-2 text-sm text-muted">No articles stored yet.</p>
        )}
        <div className="mt-3 flex flex-col gap-1 text-sm">
          {Object.entries(CATEGORIES).map(([slug, name]) => {
            const v = volume.find((x) => x.category === slug) || { thisWeek: 0, lastWeek: 0 };
            return (
              <div key={slug} className="flex justify-between border-b border-rule py-1">
                <span>{name}</span>
                <span className="font-mono text-xs text-muted">
                  {v.thisWeek} this week (prev {v.lastWeek})
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default function DashboardHealthPage() {
  const token = useDashboardToken();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
      <HealthContent
        token={token}
        refreshKey={refreshKey}
        onScanned={() => setRefreshKey((n) => n + 1)}
      />
    </Suspense>
  );
}
