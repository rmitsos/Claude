import { SITE } from "./site";

// Turns a week into the HTML of a letter. The pieces are React components
// written for the site, so they are rendered to static markup and then
// re-styled: Tailwind class names mean nothing in an inbox, and every mail
// client that matters still wants inline styles.

const BASE = `https://${SITE.domain}`;

// Deliberately plain. A letter that renders identically in Outlook, Gmail and
// Apple Mail is worth more to this readership than one that looks designed in
// two of them and broken in the third.
const S = {
  body: "margin:0;padding:0;background:#f4f2ee;",
  wrap: "max-width:640px;margin:0 auto;padding:24px 20px 40px;font-family:Georgia,'Times New Roman',serif;color:#14171a;background:#ffffff;",
  band: "font-family:'Courier New',monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a85d1b;margin:0 0 4px;",
  h1: "font-size:26px;line-height:1.2;margin:0 0 8px;font-weight:bold;",
  standfirst: "font-size:17px;line-height:1.45;color:#4a5158;margin:0 0 16px;",
  byline: "font-family:'Courier New',monospace;font-size:11px;color:#838a90;border-top:1px solid #e6e3dd;border-bottom:1px solid #e6e3dd;padding:8px 0;margin:0 0 20px;",
  section: "font-family:'Courier New',monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a85d1b;margin:28px 0 6px;",
  sectionNote: "font-size:13px;color:#838a90;margin:0 0 12px;",
  h2: "font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#4a5158;margin:18px 0 6px;font-family:'Courier New',monospace;",
  p: "font-size:16px;line-height:1.6;margin:0 0 14px;",
  li: "font-size:16px;line-height:1.55;margin:0 0 10px;",
  a: "color:#14171a;text-decoration:underline;",
  rule: "border:0;border-top:1px solid #e6e3dd;margin:28px 0;",
  footer: "font-size:12px;line-height:1.5;color:#838a90;margin:0 0 8px;",
};

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// The sweep's markup is two constructs and no more: **bold** and [text](url).
// A full markdown parser would be a dependency and a surface; the content is
// written by one person who knows the two rules.
function inline(text) {
  return escapeHtml(text)
    .replace(
      /\[([^\]]+)\]\(([^)\s]+)\)/g,
      (_, label, href) => `<a href="${href}" style="${S.a}">${label}</a>`
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

// The pieces carry Tailwind classes for the site. In an inbox those are dead
// weight at best, so they are stripped and replaced with inline styles by tag.
function styleForEmail(html) {
  return html
    .replace(/\sclass(Name)?="[^"]*"/g, "")
    .replace(/<p>/g, `<p style="${S.p}">`)
    .replace(/<h2>/g, `<h2 style="${S.h2}">`)
    .replace(/<li>/g, `<li style="${S.li}">`)
    .replace(/<ul>/g, `<ul style="margin:0 0 14px;padding-left:20px;">`)
    .replace(/<a /g, `<a style="${S.a}" `);
}

// Imported at call time rather than at the top of the file: Next refuses a
// static import of react-dom/server outside a render, and rightly — it is a
// server-only escape hatch. Here it is exactly that, used once per campaign
// to turn a piece written for the page into a piece an inbox can display.
async function renderBody(version) {
  const { renderToStaticMarkup } = await import("react-dom/server");
  const Body = version.Body;
  return styleForEmail(renderToStaticMarkup(<Body />));
}

function renderSweep(groups, heading, note) {
  if (!groups?.length) return "";
  const blocks = groups
    .map(
      (g) =>
        `<h2 style="${S.h2}">${escapeHtml(g.heading)}</h2>` +
        `<ul style="margin:0 0 14px;padding-left:20px;">` +
        g.lines.map((l) => `<li style="${S.li}">${inline(l)}</li>`).join("") +
        `</ul>`
    )
    .join("");
  return (
    `<div style="${S.section}">${escapeHtml(heading)}</div>` +
    `<p style="${S.sectionNote}">${escapeHtml(note)}</p>` +
    blocks +
    `<hr style="${S.rule}">`
  );
}

const COPY = {
  el: {
    sweep: "Η εβδομάδα με μια ματιά",
    sweepNote: "Τι κινήθηκε, σε μία γραμμή το καθένα.",
    lead: "Αυτό που αλλάζει την εικόνα",
    leadNote:
      "Ένα θέμα που αλλάζει τη δομή της αγοράς, όχι απλώς την επικαιρότητα.",
    notes: "Σημειώσεις",
    by: "Από",
    readOnline: "Διαβάστε το στο grwire.com",
    what: "Λαμβάνετε αυτό το μήνυμα επειδή εγγραφήκατε στο εβδομαδιαίο κείμενο του GR Wire.",
  },
  en: {
    sweep: "The week at a glance",
    sweepNote: "What moved, one line each.",
    lead: "What changes the picture",
    leadNote:
      "One subject that shifts the structure of the market, not just the news cycle.",
    notes: "Notes",
    by: "By",
    readOnline: "Read it on grwire.com",
    what: "You are receiving this because you subscribed to the GR Wire weekly.",
  },
};

/**
 * Assembles the letter: the sweep, then the lead in full, then any notes.
 * Returns null when the week has no lead — there is nothing to send.
 */
export async function buildEmail({ week, sweep, notes = [], lang }) {
  const version = week.lead?.[lang];
  if (!version) return null;

  const c = COPY[lang] || COPY.el;
  const url = `${BASE}/weekly/${week.meta.week}`;
  const date = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "el-GR", {
    timeZone: "Europe/Athens",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(week.meta.published));

  const notesHtml = notes.length
    ? `<div style="${S.section}">${escapeHtml(c.notes)}</div>` +
      `<ul style="margin:0 0 14px;padding-left:20px;">` +
      notes
        .map((n) => {
          const v = n[lang] || n.el;
          return `<li style="${S.li}"><a href="${url}/${n.slug}" style="${S.a}">${escapeHtml(v.title)}</a></li>`;
        })
        .join("") +
      `</ul>`
    : "";

  const html =
    `<!doctype html><html lang="${lang}"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<title>${escapeHtml(version.title)}</title></head>` +
    `<body style="${S.body}"><div style="${S.wrap}">` +
    `<div style="${S.band}">GR Wire · Connecting the dots</div>` +
    renderSweep(sweep?.[lang], c.sweep, c.sweepNote) +
    `<div style="${S.section}">${escapeHtml(c.lead)}</div>` +
    `<p style="${S.sectionNote}">${escapeHtml(c.leadNote)}</p>` +
    `<h1 style="${S.h1}">${escapeHtml(version.title)}</h1>` +
    (version.standfirst
      ? `<p style="${S.standfirst}">${escapeHtml(version.standfirst)}</p>`
      : "") +
    `<div style="${S.byline}">${escapeHtml(c.by)} ${escapeHtml(week.meta.author)} · ${escapeHtml(date)}</div>` +
    (await renderBody(version)) +
    (notesHtml ? `<hr style="${S.rule}">${notesHtml}` : "") +
    `<hr style="${S.rule}">` +
    `<p style="${S.footer}"><a href="${url}" style="${S.a}">${escapeHtml(c.readOnline)}</a></p>` +
    `<p style="${S.footer}">${escapeHtml(c.what)}<br>` +
    `<a href="{$unsubscribe}" style="${S.a}">${lang === "en" ? "Unsubscribe" : "Διαγραφή"}</a></p>` +
    `</div></body></html>`;

  return { subject: version.title, html };
}
