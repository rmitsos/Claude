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
    // Greek
    "χρηματιστηρι", "τραπεζ", "μετοχ", "ομολογ", "επιτοκι", "πληθωρισμ",
    "προυπολογισμ", "φορολογ", "επενδυσ", "δημοσιονομικ", "ασφαλιστικ",
    "ταμειο", "κεντρικη τραπεζα", "μερισμ", "κερδη εταιρ", "τζιρο",
    "ισολογισμ", "ρευστοτητ", "κεφαλαιαγορ", "χρεος",
    // English
    "stock exchange", "stock market", "interest rate", "inflation",
    "central bank", "budget deficit", "earnings report", "ipo ",
    "bond yield", "credit rating", "gdp growth", "market cap",
  ],
  telco: [
    // Greek
    "τηλεπικοινωνι", "τηλεφωνι", "κοσμοτε", "cosmote", "οτε ", "vodafone",
    "nova ", "wind hellas", "οπτικων ινων", "οπτικη ινα", "ιντερνετ",
    "ευρυζωνικ", "eett", "εεττ", "δικτυο κινητης", "δορυφορικ", "starlink",
    "τηλεπικοινωνιακ",
    // English / engineering
    "5g", "6g", "broadband", "fiber", "fibre", "ftth", "fttp",
    "submarine cable", "subsea cable", "data center", "data centre",
    "telecom operator", "network operator", "spectrum auction",
    "internet exchange", "satellite internet", "network rollout",
  ],
  energy: [
    // Greek
    "ενεργει", "ρευμα", "ηλεκτρικ", "δεη ", "δεδδηε", "αδμηε",
    "φυσικο αερι", "δεσφα", "ανανεωσιμ", "φωτοβολταικ", "αιολικ",
    "πετρελαι", "καυσιμ", "ρυπων", "ρυθμιστικη αρχη ενεργειας",
    "δικτυο διανομης", "υποσταθμ",
    // English / engineering
    "battery storage", "energy storage", "bess ", "substation",
    "transmission line", "interconnector", "smart grid", "grid upgrade",
    "solar farm", "solar plant", "wind farm", "offshore wind",
    "renewable energy", "photovoltaic", "power plant", "lng terminal",
    "grid modernization", "grid modernisation", "electric grid",
  ],
};

export function classify(item) {
  const text = normalize(`${item.title || ""} ${item.description || ""}`);
  return Object.entries(TOPIC_KEYWORDS)
    .filter(([, keywords]) => keywords.some((kw) => text.includes(normalize(kw))))
    .map(([category]) => category);
}
