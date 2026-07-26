import { after } from "next/server";
import { claimIngestSlot } from "./db";
import { runIngest } from "./ingest";

// Vercel's Hobby plan caps cron jobs at once per day, which is far too
// slow for a news site. So the daily cron is just a floor — the real
// refresh cadence comes from traffic: after a page finishes rendering,
// if the last ingest was long enough ago, we run one in the background.
// This never blocks the response (see `after`), and claimIngestSlot makes
// the check atomic so concurrent visitors don't all trigger it at once.
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
