import { after } from "next/server";
import { claimIngestSlot } from "./db";
import { runIngest } from "./ingest";

// Vercel Pro's cron (see vercel.json — every 30 minutes) is the primary
// refresh mechanism now; this traffic-triggered path is the backstop for
// the gaps between cron firings and for a burst of visits between them.
// After a page finishes rendering, if the last ingest was long enough ago,
// one runs in the background. This never blocks the response (see `after`),
// and claimIngestSlot makes the check atomic so concurrent visitors don't
// all trigger it at once, and so this and cron never race each other.
const MIN_INTERVAL_MINUTES = 30;

export function scheduleRefreshIfStale() {
  after(async () => {
    try {
      if (!(await claimIngestSlot(MIN_INTERVAL_MINUTES))) return;
      const result = await runIngest();
      console.log(
        `[refresh] ingest complete: ${result.upserted} upserted, ${result.failed ?? 0} failed`
      );
    } catch (err) {
      console.error("[refresh] ingest failed:", err?.message || err);
    }
  });
}
