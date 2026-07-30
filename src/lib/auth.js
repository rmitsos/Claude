// Shared bearer-token check for internal tools (dashboard, campaign). Not a
// session system — a single shared secret, typed once into a form and kept
// in sessionStorage by the caller. Falls back through the same secrets
// api/campaign/route.js already uses, so a fresh deploy doesn't need a new
// env var configured before the dashboard works.
export function isAuthorized(request) {
  const secret =
    process.env.DASHBOARD_SECRET || process.env.CAMPAIGN_SECRET || process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}
