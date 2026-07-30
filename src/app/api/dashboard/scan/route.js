import { NextResponse } from "next/server";
import { isAuthorized } from "@/lib/auth";
import { runIngest } from "@/lib/ingest";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// "Scan now" on the dashboard — the same runIngest() cron and the
// traffic-triggered background refresh already call, just invoked directly
// so the result comes back synchronously instead of waiting for traffic.
export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const result = await runIngest();
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
