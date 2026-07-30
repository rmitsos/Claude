import { NextResponse } from "next/server";
import { isAuthorized } from "@/lib/auth";
import { sql, ensureSchema } from "@/lib/db";

export const dynamic = "force-dynamic";

const SECTIONS = ["energy", "telecom", "finance"];
const SOURCES = ["publisher", "public", "rumour", "inferred"];

// Edges added from the dashboard's relation map. Kept separate from
// .claude/skills/greek-market/relations.md — that file is hand-maintained
// and read by me in conversation, not written at runtime (see
// scripts/sync-relations.mjs). These rows render on the graph immediately,
// tagged as not yet folded into the skill file, until a future session
// reconciles them and marks reconciled = true.

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!sql) return NextResponse.json({ ok: true, relations: [] });

  await ensureSchema();
  const rows = await sql`
    SELECT id, created_at, section, subject, relation, detail, object, source, why, reconciled
    FROM relations ORDER BY created_at DESC
  `;
  return NextResponse.json({ ok: true, relations: rows });
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!sql) {
    return NextResponse.json({ ok: false, error: "No database configured" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const section = body?.section;
  const subject = body?.subject?.trim();
  const relation = body?.relation?.trim();
  const object = body?.object?.trim();
  const source = body?.source;
  const detail = body?.detail?.trim() || null;
  const why = body?.why?.trim() || null;

  if (!SECTIONS.includes(section)) {
    return NextResponse.json({ ok: false, error: "section must be energy, telecom or finance" }, { status: 400 });
  }
  if (!SOURCES.includes(source)) {
    return NextResponse.json({ ok: false, error: "source must be publisher, public, rumour or inferred" }, { status: 400 });
  }
  if (!subject || !relation || !object) {
    return NextResponse.json({ ok: false, error: "subject, relation and object are required" }, { status: 400 });
  }

  await ensureSchema();
  const rows = await sql`
    INSERT INTO relations (section, subject, relation, detail, object, source, why)
    VALUES (${section}, ${subject}, ${relation}, ${detail}, ${object}, ${source}, ${why})
    RETURNING id, created_at, section, subject, relation, detail, object, source, why, reconciled
  `;
  return NextResponse.json({ ok: true, relation: rows[0] });
}
