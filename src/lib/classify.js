// Classifies an article into 0+ of our three topics based on keyword
// matches in its title/description — not by which feed it came from.
// Source feeds (e.g. Capital.gr's "Οικονομία") are broad and mix in
// unrelated news (world affairs, sports, wildfires); this keeps the site
// focused on what it's actually about. Articles matching nothing are
// dropped rather than shown.
//
// Keyword lists are bilingual (Greek + English) since international trade
// press covering engineering/technology topics (fiber builds, battery
// storage, substations) reports in English even though the site's core
// audience is the Greek market.

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

// Keyword stems (accent-stripped, lowercase) — substring match against
// normalized text. Stems are kept long enough to avoid colliding with
// unrelated words (e.g. a bare "εκτ" would match inside "ηλεκτρικής").
const TOPIC_KEYWORDS = {
  finance: [
    "χρηματιστηρι", "τραπεζ", "μετοχ", "επιτοκι", "πληθωρισμ",
    "προυπολογισμ", "φορολογ", "επενδυσ", "δημοσιονομικ",
    "ασφαλιστικο συστημα", "ασφαλιστικες εισφορες", "ασφαλιστικη μεταρρυθμιση",
    "ασφαλιστικες εταιρειες", "ασφαλιστικο ταμειο",
    "ταμειο", "κεντρικη τραπεζα", "κερδη εταιρ", "τζιρο",
    "ισολογισμ", "ρευστοτητ", "κεφαλαιαγορ", "χρεος",
    // Bond forms only — never the bare stem "ομολογ", which is also the root
    // of ομολογώ/ομολόγησε (to confess). A crime report where the suspect
    // "confessed" would otherwise classify as Finance; verified against real
    // wire copy before narrowing this.
    "ομολογο", "ομολογα", "ομολογιακ", "ομολογιουχ",
    "stock exchange", "bond yield", "interest rate", "inflation",
    "earnings", "ipo", "acquisition", "merger", "financial close",
    "funding round", "valuation",
  ],
  telco: [
    "τηλεπικοινωνι", "τηλεφωνι", "κοσμοτε", "cosmote", "οτε ", "vodafone",
    "nova ", "wind hellas", "5g", "6g", "οπτικων ινων", "οπτικη ινα",
    "ιντερνετ", "ευρυζωνικ", "eett", "εεττ", "δικτυο κινητης", "δορυφορικ",
    "starlink", "τηλεπικοινωνιακ", "υποθαλασσιο καλωδιο",
    "broadband", "fibre", "fiber", "ftth", "subsea cable", "submarine cable",
    "spectrum auction", "mobile network", "telecom", "telco", "gigabit",
    "data centre", "data center",
  ],
  energy: [
    "ενεργει", "ρευμα", "ηλεκτρικ", "δεη ", "δεδδηε", "αδμηε",
    "φυσικο αερι", "δεσφα", "ανανεωσιμ", "φωτοβολταικ", "αιολικ",
    "πετρελαι", "καυσιμ", "lng", "ρυπων", "ρυθμιστικη αρχη ενεργειας",
    "δικτυο διανομης", "υποσταθμ", "διασυνδεσ", "αποθηκευση ενεργειας",
    "grid", "renewable", "solar", "wind farm", "battery", "bess",
    // "energy storage" as its own phrase, not just "battery"/"bess": trade
    // press (Energy Storage News in particular) routinely writes "energy
    // storage strategy" without the word battery anywhere in the summary.
    // Without this, such a piece could clear only the Telco "data centre"
    // keyword (common in AI-power-demand framing) and never tag as Energy
    // at all — an energy story filed under Telco alone.
    "energy storage",
    "photovoltaic", "substation", "transmission line", "interconnector",
    "power plant", "electricity", "natural gas", "hydrogen",
  ],
};

// Keywords a plain substring list cannot express safely, because a Greek
// compound can embed an unrelated shorter word as its literal tail:
// "διαμέρισμα" (apartment) contains "μέρισμα" (dividend) outright. A
// negative lookbehind for the "δια" prefix keeps the dividend sense (bare
// "Μέρισμα 0,045 ευρώ" and "μερίσματος") while excluding "διαμέρισμα" and
// its plural "διαμερίσματα" — both common in real-estate coverage.
const TOPIC_PATTERNS = {
  finance: [/(?<!δια)μερισμα/u],
};

// Signals that a story is about building, deploying or operating physical
// infrastructure — as opposed to markets, policy or corporate news about
// the same sector. Used to split Telco and Energy into News / Technology.
const TECHNOLOGY_KEYWORDS = [
  // Greek
  "υποσταθμ", "οπτικων ινων", "οπτικη ινα", "εγκαταστασ", "κατασκευ",
  "μπαταρι", "αποθηκευση ενεργειας", "διασυνδεσ", "γραμμη μεταφορας",
  "εξοπλισμ", "τεχνολογι", "ψηφιοποιησ", "αναβαθμιση δικτυου",
  "φωτοβολταικο παρκο", "αιολικο παρκο", "μοναδα παραγωγης",
  "δοκιμαστικη λειτουργια", "ηλεκτροδοτησ", "καλωδιακ",
  // English
  "substation", "transmission line", "interconnector", "subsea cable",
  "submarine cable", "battery storage", "bess", "energy storage",
  "grid modernisation", "grid modernization", "smart meter", "smart grid",
  "rollout", "roll-out", "deployment", "commissioning", "commissioned",
  "installation", "installed", "construction", "broke ground",
  "network equipment", "ftth", "fibre build", "fiber build",
  "retrofit", "pilot project", "prototype", "engineering",
];

// Capacity and throughput figures ("100MW", "200 MWh", "400kV", "10 Gbps")
// are among the strongest technology signals, but need word boundaries —
// a bare "mw" substring would match plenty of unrelated words.
const UNIT_PATTERN =
  /\b\d+(?:[.,]\d+)?\s?(?:mw|mwh|gw|gwh|kw|kwh|kv|kva|mva|gbps|tbps|mbps)\b/i;

export function classify(item) {
  const text = normalize(`${item.title || ""} ${item.description || ""}`);
  return Object.keys(TOPIC_KEYWORDS).filter((category) => {
    const byKeyword = TOPIC_KEYWORDS[category].some((kw) => text.includes(normalize(kw)));
    const byPattern = (TOPIC_PATTERNS[category] || []).some((re) => re.test(text));
    return byKeyword || byPattern;
  });
}

// Whether an article belongs in a Technology sub-section rather than News.
export function isTechnology(item) {
  const raw = `${item.title || ""} ${item.description || ""}`;
  if (UNIT_PATTERN.test(raw)) return true;
  const text = normalize(raw);
  return TECHNOLOGY_KEYWORDS.some((kw) => text.includes(normalize(kw)));
}
