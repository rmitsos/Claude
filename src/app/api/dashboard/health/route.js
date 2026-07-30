import { NextResponse } from "next/server";
import { isAuthorized } from "@/lib/auth";
import { getIngestHistory } from "@/lib/ingest";
import { getWeeklyVolume, getArchiveStart } from "@/lib/articles";

export const dynamic = "force-dynamic";

// Everything the dashboard's health tab shows: the most recent scans (each
// with per-feed ok/error, so a feed that started 403ing shows up here
// without anyone needing to trigger and read a fresh /api/ingest by hand),
// plus the same archive/volume figures already computed for /api/digest.
export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const [history, volume, archive] = await Promise.all([
    getIngestHistory(10),
    getWeeklyVolume(),
    getArchiveStart(),
  ]);

  return NextResponse.json({ ok: true, latest: history[0] || null, history, volume, archive });
}
