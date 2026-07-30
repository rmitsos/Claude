import { NextResponse } from "next/server";
import { isAuthorized } from "@/lib/auth";
import { sql, ensureSchema } from "@/lib/db";

export const dynamic = "force-dynamic";

// Editorial briefs are a curation step, not a draft: which articles the
// publisher thinks belong in the next "connecting the dots" piece, and why.
// The actual writing still happens in a session, starting from this instead
// of the raw digest — see the dashboard plan for why this stops short of
// auto-drafting text.

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!sql) return NextResponse.json({ ok: true, briefs: [] });

  await ensureSchema();
  const rows = await sql`
    SELECT id, created_at, links, note, status FROM editorial_briefs
    ORDER BY created_at DESC LIMIT 50
  `;
  return NextResponse.json({ ok: true, briefs: rows });
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!sql) {
    return NextResponse.json({ ok: false, error: "No database configured" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const links = Array.isArray(body?.links) ? body.links.filter(Boolean) : [];
  if (!links.length) {
    return NextResponse.json({ ok: false, error: "Select at least one article" }, { status: 400 });
  }
  const note = typeof body?.note === "string" ? body.note.trim() || null : null;

  await ensureSchema();
  const rows = await sql`
    INSERT INTO editorial_briefs (links, note) VALUES (${links}, ${note})
    RETURNING id, created_at, links, note, status
  `;
  return NextResponse.json({ ok: true, brief: rows[0] });
}

export async function PATCH(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!sql) {
    return NextResponse.json({ ok: false, error: "No database configured" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const id = Number(body?.id);
  const status = body?.status;
  if (!id || !["queued", "used", "archived"].includes(status)) {
    return NextResponse.json({ ok: false, error: "id and a valid status are required" }, { status: 400 });
  }

  await sql`UPDATE editorial_briefs SET status = ${status} WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
