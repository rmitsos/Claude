import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared renderer for every Open Graph card on the site. One file so the cards
// stay a family: a link to an editorial and a link to /energy should look like
// they came from the same place, which is the entire point of having them.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Lifted from the Terminal theme in globals.css rather than re-invented. The
// card is the first thing a reader sees of the site, so it should not be the
// only thing that looks nothing like it. These are hard-coded because Satori
// resolves no CSS variables — it never sees the stylesheet.
const GROUND = "#0c1015";
const INK = "#e7ebf0";
const INK_2 = "#a8b2bd";
const MUTED = "#6f7b88";
const RULE = "#232c36";

// The masthead band colour is the default; category pages take their own
// accent so a shared link carries the same colour coding as the site.
export const ACCENTS = {
  default: "#c9873c",
  finance: "#4fb098",
  telco: "#6e9be0",
  energy: "#d2954b",
};

// Satori has no font fallback: a glyph the font lacks renders as a box. The
// default font shipped with @vercel/og is Geist, which has no Greek subset at
// all, so a Greek headline would come out as a row of empty rectangles. Inter
// covers Greek; see assets/fonts/README.md for why these files are subset.
let fontsPromise;

function loadFonts() {
  fontsPromise ||= Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Inter-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Inter-Bold.ttf")),
  ]).then(([regular, bold]) => [
    { name: "Inter", data: regular, weight: 400, style: "normal" },
    { name: "Inter", data: bold, weight: 700, style: "normal" },
  ]);
  return fontsPromise;
}

// Satori will happily set a 200-character headline in 76px and let it run off
// the bottom edge, so the size is chosen from the length rather than fixed.
// Greek runs roughly 15% longer than English for the same sentence, which is
// why the thresholds sit lower than they would on an English-only site.
function headlineSize(text) {
  if (text.length <= 34) return 78;
  if (text.length <= 62) return 64;
  if (text.length <= 96) return 52;
  return 44;
}

// Greek drops the tonos when a word is set in capitals — ΚΑΤΗΓΟΡΙΑ, never
// ΚΑΤΗΓΟΡΊΑ. JavaScript's toUpperCase does not know this and carries the accent
// straight through, which to a Greek reader looks like a spelling mistake in
// the first thing they see of the site. The dialytika is a different mark and
// stays: ΠΡΟΫΠΟΛΟΓΙΣΜΟΣ keeps its diaeresis, so U+0308 is deliberately absent
// from the range stripped here.
function caps(text) {
  return text
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300\u0301\u0342\u0345]/g, "")
    .normalize("NFC");
}

// Cutting mid-word looks like a bug; cutting at a space looks deliberate.
function clamp(text, limit) {
  if (!text || text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const space = cut.lastIndexOf(" ");
  return `${(space > limit * 0.6 ? cut.slice(0, space) : cut).trimEnd()}…`;
}

/**
 * Renders a card. Every field except `title` is optional, and the layout holds
 * together without any of them — a card with a missing standfirst should look
 * composed, not like something failed to load.
 *
 * @param {object} card
 * @param {string} card.title     The line that does the work.
 * @param {string} [card.kicker]  Small caps, top right — section or date.
 * @param {string} [card.standfirst] One or two supporting lines.
 * @param {string} [card.footnote]   Small, bottom right.
 * @param {string} [card.accent]     Hex from ACCENTS.
 */
export async function ogCard({ title, kicker, standfirst, footnote, accent = ACCENTS.default }) {
  const headline = clamp(title, 120);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: GROUND,
          fontFamily: "Inter",
        }}
      >
        {/* The one saturated element, mirroring the masthead band. */}
        <div style={{ display: "flex", height: 12, backgroundColor: accent }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
            padding: "56px 72px 48px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 7,
                color: accent,
              }}
            >
              GR WIRE
            </div>
            {kicker ? (
              <div
                style={{
                  display: "flex",
                  fontSize: 21,
                  letterSpacing: 3,
                  color: MUTED,
                }}
              >
                {caps(kicker)}
              </div>
            ) : null}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: headlineSize(headline),
                fontWeight: 700,
                lineHeight: 1.16,
                letterSpacing: -0.8,
                color: INK,
              }}
            >
              {headline}
            </div>
            {standfirst ? (
              <div
                style={{
                  display: "flex",
                  marginTop: 26,
                  fontSize: 27,
                  lineHeight: 1.45,
                  color: INK_2,
                }}
              >
                {clamp(standfirst, 150)}
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: `1px solid ${RULE}`,
              paddingTop: 26,
              fontSize: 22,
              color: MUTED,
            }}
          >
            <div style={{ display: "flex" }}>grwire.com</div>
            {footnote ? <div style={{ display: "flex" }}>{footnote}</div> : null}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await loadFonts() }
  );
}
