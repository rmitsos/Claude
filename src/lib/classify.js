// Classifies an article into 0+ of our three topics based on keyword
// matches in its title/description — not by which feed it came from.
// Source feeds (e.g. Capital.gr's "Οικονομία") are broad and mix in
// unrelated news (world affairs, sports, wildfires); this keeps the site
// focused on what it's actually about. Articles matching nothing are
// dropped rather than shown.

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
    "χρηματιστηρι", "τραπεζ", "μετοχ", "ομολογ", "επιτοκι", "πληθωρισμ",
    "προυπολογισμ", "φορολογ", "επενδυσ", "δημοσιονομικ", "ασφαλιστικ",
    "ταμειο", "κεντρικη τραπεζα", "μερισμ", "κερδη εταιρ", "τζιρο",
    "ισολογισμ", "ρευστοτητ", "κεφαλαιαγορ", "χρεος",
  ],
  telco: [
    "τηλεπικοινωνι", "τηλεφωνι", "κοσμοτε", "cosmote", "οτε ", "vodafone",
    "nova ", "wind hellas", "5g", "οπτικων ινων", "οπτικη ινα", "ιντερνετ",
    "ευρυζωνικ", "eett", "εεττ", "δικτυο κινητης", "δορυφορικ", "starlink",
    "τηλεπικοινωνιακ", "broadband", "fiber", "ftth",
  ],
  energy: [
    "ενεργει", "ρευμα", "ηλεκτρικ", "δεη ", "δεδδηε", "αδμηε",
    "φυσικο αερι", "δεσφα", "ανανεωσιμ", "φωτοβολταικ", "αιολικ",
    "πετρελαι", "καυσιμ", "lng", "ρυπων", "ρυθμιστικη αρχη ενεργειας",
    "δικτυο διανομης",
  ],
};

export function classify(item) {
  const text = normalize(`${item.title || ""} ${item.description || ""}`);
  return Object.entries(TOPIC_KEYWORDS)
    .filter(([, keywords]) => keywords.some((kw) => text.includes(normalize(kw))))
    .map(([category]) => category);
}
