// A curated entity list rather than generic named-entity recognition:
// the domain is narrow and the vocabulary is bilingual, so a hand-built
// list of the organisations and themes that actually matter here is far
// more precise than a general-purpose extractor would be on this volume.

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

// Greek has no \b support in JS regex (\w is ASCII-only), so short patterns
// use explicit non-letter lookarounds to avoid matching inside longer words
// — "δεη" must not match inside "δεητικος", "ote" not inside "note".
function boundedMatch(text, pattern) {
  const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, "u").test(text);
}

function matches(text, pattern) {
  const p = normalize(pattern);
  return p.length <= 5 ? boundedMatch(text, p) : text.includes(p);
}

export const ENTITIES = [
  // --- Energy: operators and utilities ---
  { id: "admie", label: "ΑΔΜΗΕ / IPTO", kind: "org", patterns: ["αδμηε", "admie", "ipto"] },
  { id: "deddie", label: "ΔΕΔΔΗΕ / HEDNO", kind: "org", patterns: ["δεδδηε", "deddie", "hedno"] },
  { id: "ppc", label: "ΔΕΗ / PPC", kind: "org", patterns: ["δεη", "ppc", "public power"] },
  { id: "desfa", label: "ΔΕΣΦΑ / DESFA", kind: "org", patterns: ["δεσφα", "desfa"] },
  { id: "raaey", label: "ΡΑΑΕΥ / RAAEY", kind: "org", patterns: ["ρααευ", "raaey", "ρυθμιστικη αρχη ενεργειας"] },
  { id: "terna", label: "ΤΕΡΝΑ / GEK TERNA", kind: "org", patterns: ["τερνα", "terna"] },
  { id: "metlen", label: "Metlen / Μυτιληναίος", kind: "org", patterns: ["metlen", "μυτιληναιος", "mytilineos"] },
  { id: "helleniq", label: "HELLENiQ / ΕΛΠΕ", kind: "org", patterns: ["helleniq", "ελπε", "ελληνικα πετρελαια"] },
  { id: "motoroil", label: "Motor Oil", kind: "org", patterns: ["motor oil", "μοτορ οιλ"] },

  // --- Telco: operators and regulator ---
  { id: "ote", label: "ΟΤΕ / Cosmote", kind: "org", patterns: ["cosmote", "κοσμοτε", "οτε", "ote group"] },
  { id: "vodafone", label: "Vodafone", kind: "org", patterns: ["vodafone", "βοντafone"] },
  { id: "nova", label: "Nova", kind: "org", patterns: ["nova", "wind hellas"] },
  { id: "eett", label: "ΕΕΤΤ / EETT", kind: "org", patterns: ["εεττ", "eett"] },

  // --- Finance ---
  { id: "athex", label: "Χρηματιστήριο Αθηνών", kind: "org", patterns: ["χρηματιστηριο αθηνων", "athex", "γενικος δεικτης"] },
  { id: "bog", label: "Τράπεζα της Ελλάδος", kind: "org", patterns: ["τραπεζα της ελλαδος", "bank of greece"] },
  { id: "ecb", label: "ΕΚΤ / ECB", kind: "org", patterns: ["ευρωπαικη κεντρικη τραπεζα", "ecb"] },
  { id: "alpha", label: "Alpha Bank", kind: "org", patterns: ["alpha bank", "alpha υπηρεσιες"] },
  { id: "eurobank", label: "Eurobank", kind: "org", patterns: ["eurobank"] },
  { id: "nbg", label: "Εθνική Τράπεζα", kind: "org", patterns: ["εθνικη τραπεζα", "national bank of greece"] },
  { id: "piraeus", label: "Τράπεζα Πειραιώς", kind: "org", patterns: ["πειραιως", "piraeus bank"] },

  // --- Themes: what the story is physically about ---
  { id: "storage", label: "Battery storage", kind: "theme", patterns: ["αποθηκευση ενεργειας", "μπαταρι", "battery", "bess", "energy storage"] },
  { id: "substation", label: "Substations & grid", kind: "theme", patterns: ["υποσταθμ", "substation", "γραμμη μεταφορας", "transmission line", "smart grid", "smart meter"] },
  { id: "interconnection", label: "Interconnections", kind: "theme", patterns: ["διασυνδεσ", "interconnector", "interconnection"] },
  { id: "fiber", label: "Fibre & FTTH", kind: "theme", patterns: ["οπτικων ινων", "οπτικη ινα", "fibre", "fiber", "ftth", "ευρυζωνικ", "broadband"] },
  { id: "mobile5g", label: "5G & mobile", kind: "theme", patterns: ["5g", "6g", "φασματος", "spectrum", "δικτυο κινητης", "mobile network"] },
  { id: "subsea", label: "Subsea cable", kind: "theme", patterns: ["υποθαλασσιο καλωδιο", "subsea cable", "submarine cable"] },
  { id: "solar", label: "Solar", kind: "theme", patterns: ["φωτοβολταικ", "solar", "photovoltaic"] },
  { id: "wind", label: "Wind", kind: "theme", patterns: ["αιολικ", "wind farm", "offshore wind"] },
  { id: "lng", label: "LNG & gas", kind: "theme", patterns: ["lng", "φυσικο αερι", "natural gas"] },
  { id: "hydrogen", label: "Hydrogen", kind: "theme", patterns: ["υδρογον", "hydrogen"] },
  { id: "datacenter", label: "Data centres", kind: "theme", patterns: ["data centre", "data center", "κεντρο δεδομενων"] },
  { id: "tariffs", label: "Energy prices & tariffs", kind: "theme", patterns: ["τιμολογι", "τιμες ρευματος", "electricity price", "energy price"] },
];

export const ENTITY_BY_ID = Object.fromEntries(ENTITIES.map((e) => [e.id, e]));

export function extractEntities(item) {
  const text = normalize(`${item.title || ""} ${item.description || ""}`);
  return ENTITIES.filter((entity) =>
    entity.patterns.some((pattern) => matches(text, pattern))
  ).map((entity) => entity.id);
}
