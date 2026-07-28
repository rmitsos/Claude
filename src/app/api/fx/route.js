import { NextResponse } from "next/server";
import { runSignalUpdate } from "@/lib/fx/signals";
import { FX_ENABLED } from "@/lib/fx/config";

export const maxDuration = 60;

// Triggered by Vercel Cron (see vercel.json), once per weekday evening. Same
// CRON_SECRET convention as /api/ingest: when the secret is set, only Vercel's
// scheduler can call this; without it the endpoint is open, which is fine
// while you are still setting it up and want to trigger a run by hand.
//
// This computes and stores signals. It places no orders and holds no broker
// credentials — there is nothing here that can move money.
export async function GET(request) {
  if (!FX_ENABLED) {
    return NextResponse.json(
      { ok: false, error: "FX signals are disabled. Set FX_ENABLED=1 to turn them on." },
      { status: 404 }
    );
  }

  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const result = await runSignalUpdate();
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
