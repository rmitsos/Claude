import { NextResponse } from "next/server";
import { runIngest } from "@/lib/ingest";

export const maxDuration = 60;

// Triggered by Vercel Cron (see vercel.json) on a schedule. If CRON_SECRET
// is set, requires it as a Bearer token — Vercel sends this automatically
// for scheduled invocations. Without CRON_SECRET set, the endpoint is open,
// which is fine for initial setup (visit it once in a browser to populate
// the database immediately instead of waiting for the first scheduled run).
export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const result = await runIngest();
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
