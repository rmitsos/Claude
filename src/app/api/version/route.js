import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Deployments on this project have repeatedly gone out on one branch and not
// the other, which is impossible to diagnose by looking at a page — "it looks
// old" and "it is old" are indistinguishable from the outside. Open this on
// any device to see exactly which commit that device is talking to.
export async function GET() {
  const sha = process.env.VERCEL_GIT_COMMIT_SHA || null;

  return NextResponse.json(
    {
      commit: sha ? sha.slice(0, 7) : "local",
      fullCommit: sha,
      branch: process.env.VERCEL_GIT_COMMIT_REF || "local",
      message: process.env.VERCEL_GIT_COMMIT_MESSAGE || null,
      environment: process.env.VERCEL_ENV || "development",
      host: process.env.VERCEL_URL || null,
      servedAt: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
