// Greek is the site's own language: the readership is the Greek market, and
// most of what it indexes is Greek. English exists because roughly a third of
// the sources publish in it and because the editorial has an English edition
// worth sharing — not because the interface is neutral between the two.

export const LANGS = ["el", "en"];
export const DEFAULT_LANG = "el";
export const LANG_COOKIE = "grwire-lang";

const STRINGS = {
  el: {
    // chrome
    "nav.wire": "Ροή",
    "nav.search": "Αναζήτηση",
    "nav.weekly": "Connecting the dots",
    "nav.all": "Όλα",
    "cat.finance": "Οικονομία",
    "cat.telco": "Υποδομές Τηλεπικοινωνιών",
    "cat.energy": "Υποδομές Ενέργειας",
    "cat.finance.short": "Οικονομία",
    "cat.telco.short": "Τηλεπικ.",
    "cat.energy.short": "Ενέργεια",
    "sub.news": "Ειδήσεις",
    "sub.technology": "Τεχνολογία",
    "tag.tech": "Τεχν.",

    // info bar
    "info.athens": "Αθήνα",
    "info.weather": "Καιρός",

    // days
    "day.today": "Σήμερα",
    "day.yesterday": "Χθες",

    // lead block
    "lead.heading": "Κύριες ειδήσεις",

    // rail
    "rail.last24": "Τελευταίες 24 ώρες",
    "rail.ofWhichTech": "εκ των οποίων Τεχνολογία",
    "rail.coverage": "Κάλυψη",
    "rail.coverageNote":
      "{n} από τις ειδήσεις του τελευταίου 24ώρου αφορούν κατασκευή και λειτουργία υποδομών, όχι αγορές και πολιτική.",
    "rail.weeklyLink": "Οι συνδέσεις της εβδομάδας →",

    // search
    "search.title": "Αναζήτηση",
    "search.subject": "Θέμα",
    "search.period": "Περίοδος",
    "search.apply": "Εφαρμογή",
    "search.clear": "Καθαρισμός",
    "search.everything": "Όλα",
    "search.orgs": "Οργανισμοί",
    "search.themes": "Θεματικές",
    "search.results": "{n} {noun} · {subject} · {period}",
    "search.story": "είδηση",
    "search.stories": "ειδήσεις",
    "search.archiveSince": "Το GR Wire συλλέγει από {date}.",
    "search.empty": "Δεν βρέθηκε τίποτα για «{subject}» σε αυτή την περίοδο.",
    "search.tryLonger": " Δοκιμάστε μεγαλύτερη περίοδο.",
    "period.7d": "Τελευταίες 7 ημέρες",
    "period.30d": "Τελευταίες 30 ημέρες",
    "period.3m": "Τελευταίοι 3 μήνες",
    "period.12m": "Τελευταίοι 12 μήνες",
    "period.all": "Όλα",

    // weekly
    "weekly.numbers": "Τα νούμερα πίσω από το κείμενο",
    "weekly.intro":
      "Μετρημένα από τις ειδήσεις που έχει συλλέξει το GR Wire — τίποτα δεν συνάγεται. Ακολουθήστε οποιονδήποτε σύνδεσμο για τις ειδήσεις πίσω από κάθε αριθμό.",
    "weekly.noCompare":
      " Οι συγκρίσεις με την προηγούμενη εβδομάδα δεν εμφανίζονται μέχρι το αρχείο να συμπληρώσει δύο εβδομάδες· νωρίτερα θα έδειχναν αύξηση που είναι απλώς η βάση δεδομένων που γεμίζει.",
    "weekly.volume": "Όγκος",
    "weekly.volumeNoteCompare": "Τελευταίες 7 ημέρες σε σχέση με τις 7 προηγούμενες.",
    "weekly.volumeNote": "Τελευταίες 7 ημέρες.",
    "weekly.articles": "ειδήσεις",
    "weekly.onBuilding": "για κατασκευή και λειτουργία",
    "weekly.sources": "πηγές που δημοσίευσαν",
    "weekly.rising": "Σε άνοδο",
    "weekly.risingNote": "Θέματα με περισσότερες αναφορές από την προηγούμενη εβδομάδα.",
    "weekly.connections": "Συνδέσεις",
    "weekly.connectionsNote":
      "Θέματα που εμφανίστηκαν στις ίδιες ειδήσεις αυτή την εβδομάδα. Συνεμφάνιση, όχι αιτιότητα — δείχνει ένα νήμα που αξίζει να τραβήξετε, τίποτα παραπάνω.",
    "weekly.about": "Τι απασχόλησε την εβδομάδα",
    "weekly.aboutNote":
      "Τα θέματα με τις περισσότερες αναφορές. Ακολουθήστε οποιοδήποτε για την πλήρη κάλυψη.",
    "weekly.notEnough":
      "Δεν υπάρχουν ακόμη αρκετές ειδήσεις. Η σελίδα συμπληρώνεται μόλις αποθηκευτεί μία εβδομάδα κάλυψης.",
    "weekly.storyOne": "είδηση",
    "weekly.storyMany": "ειδήσεις",
    "weekly.new": "νέο",
    "weekly.latestLink": "Όλα τα κείμενα",
    "weekly.note": "Σημείωση",
    "weekly.notes": "Σημειώσεις",
    "weekly.notesNote":
      "Σύντομα κείμενα σε ένα θέμα, όποτε υπάρχει κάτι να ειπωθεί.",
    "weekly.backToWeek": "Όλη η εβδομάδα",
    "dots.label": "Connecting the dots",
    "dots.note": "Ανάλυση GR Wire — πώς συνδέονται οι ειδήσεις μεταξύ τους.",
    "dots.more": "Όλα τα κείμενα",
    "dots.lead": "Εβδομαδιαίο",
    "dots.empty": "Δεν έχει δημοσιευτεί κείμενο ακόμη.",
    "dots.heading": "Connecting the dots",

    // topic
    "topic.count": "{n} {noun} τις τελευταίες 30 ημέρες",
    "topic.changePeriod": "αλλαγή περιόδου",
    "topic.thisWeek": "αυτή την εβδομάδα",
    "topic.empty": "Δεν έχει συλλεχθεί τίποτα για αυτό το θέμα ακόμη.",

    // category pages
    "cat.technologyNote": "Εγκαταστάσεις, εξοπλισμός και έργα μηχανικής.",
    "cat.newsNote": "Αγορές, πολιτική και εταιρικά νέα.",
    "cat.empty": "Δεν υπάρχει ακόμη τίποτα σε αυτή την κατηγορία.",
    "wire.empty": "Καμία είδηση ακόμη — ίσως δεν έχει τρέξει η συλλογή.",
    "list.empty": "Τίποτα εδώ ακόμη.",

    // footer + controls
    "footer.note":
      "Το GR Wire παραπέμπει στον αρχικό εκδότη για κάθε τίτλο.",
    "footer.about": "Σχετικά",
    "footer.privacy": "Απόρρητο",
    "footer.terms": "Όροι",
    "control.top": "↑ Αρχή",
    "control.backToTop": "Επιστροφή στην αρχή",
    "control.light": "☀ Φωτεινό",
    "control.dark": "☾ Σκοτεινό",
    "control.switchTheme": "Αλλαγή σε {theme} θέμα",
    "control.themeLight": "φωτεινό",
    "control.themeDark": "σκοτεινό",
    "control.language": "Γλώσσα",
  },

  en: {
    "nav.wire": "Wire",
    "nav.search": "Search",
    "nav.weekly": "Connecting the dots",
    "nav.all": "All",
    "cat.finance": "Finance",
    "cat.telco": "Telco Infrastructure",
    "cat.energy": "Energy Infrastructure",
    "cat.finance.short": "Finance",
    "cat.telco.short": "Telco",
    "cat.energy.short": "Energy",
    "sub.news": "News",
    "sub.technology": "Technology",
    "tag.tech": "Tech",

    "info.athens": "Athens",
    "info.weather": "Weather",

    "day.today": "Today",
    "day.yesterday": "Yesterday",

    "lead.heading": "Leading stories",

    "rail.last24": "Last 24 hours",
    "rail.ofWhichTech": "of which Technology",
    "rail.coverage": "Coverage",
    "rail.coverageNote":
      "{n} of the last 24 hours’ stories are about building or operating infrastructure rather than markets and policy.",
    "rail.weeklyLink": "This week’s connections →",

    "search.title": "Search",
    "search.subject": "Subject",
    "search.period": "Period",
    "search.apply": "Apply",
    "search.clear": "Clear",
    "search.everything": "Everything",
    "search.orgs": "Organisations",
    "search.themes": "Themes",
    "search.results": "{n} {noun} · {subject} · {period}",
    "search.story": "story",
    "search.stories": "stories",
    "search.archiveSince": "GR Wire has been collecting since {date}.",
    "search.empty": "Nothing matches “{subject}” in this period.",
    "search.tryLonger": " Try a longer period.",
    "period.7d": "Last 7 days",
    "period.30d": "Last 30 days",
    "period.3m": "Last 3 months",
    "period.12m": "Last 12 months",
    "period.all": "Everything",

    "weekly.numbers": "The numbers behind it",
    "weekly.intro":
      "Counted from the articles GR Wire has stored — nothing inferred. Follow any link to read the stories behind a number.",
    "weekly.noCompare":
      " Week-on-week comparisons are hidden until the archive is two weeks old; before then they would show growth that is only the database filling up.",
    "weekly.volume": "Volume",
    "weekly.volumeNoteCompare": "Last 7 days against the 7 before.",
    "weekly.volumeNote": "Last 7 days.",
    "weekly.articles": "articles",
    "weekly.onBuilding": "on building & operating",
    "weekly.sources": "sources publishing",
    "weekly.rising": "Gaining ground",
    "weekly.risingNote": "Subjects mentioned more often than last week.",
    "weekly.connections": "Connections",
    "weekly.connectionsNote":
      "Subjects that turned up in the same articles this week. Co-occurrence, not causation — it points you at a thread worth pulling, nothing more.",
    "weekly.about": "What the week was about",
    "weekly.aboutNote":
      "Most-mentioned subjects this week. Follow any one for its full coverage.",
    "weekly.notEnough":
      "Not enough articles yet. This page fills in once a week of coverage is stored.",
    "weekly.storyOne": "story",
    "weekly.storyMany": "stories",
    "weekly.new": "new",
    "weekly.latestLink": "All pieces",
    "weekly.note": "Note",
    "weekly.notes": "Notes",
    "weekly.notesNote": "Short pieces on a single thread, whenever there is one.",
    "weekly.backToWeek": "The whole week",
    "dots.label": "Connecting the dots",
    "dots.note": "GR Wire analysis — how the stories fit together.",
    "dots.more": "All pieces",
    "dots.lead": "Weekly",
    "dots.empty": "Nothing published yet.",
    "dots.heading": "Connecting the dots",

    "topic.count": "{n} {noun} in the last 30 days",
    "topic.changePeriod": "change period",
    "topic.thisWeek": "this week",
    "topic.empty": "Nothing collected on this subject yet.",

    "cat.technologyNote": "Installations, equipment and engineering projects.",
    "cat.newsNote": "Markets, policy and corporate news.",
    "cat.empty": "Nothing in this category yet.",
    "wire.empty": "No articles yet — the ingestion job may not have run.",
    "list.empty": "Nothing here yet.",

    "footer.note": "GR Wire links to the original publisher for every headline.",
    "footer.about": "About",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "control.top": "↑ Top",
    "control.backToTop": "Back to top",
    "control.light": "☀ Light",
    "control.dark": "☾ Dark",
    "control.switchTheme": "Switch to {theme} theme",
    "control.themeLight": "light",
    "control.themeDark": "dark",
    "control.language": "Language",
  },
};

// Missing keys fall back to the default language rather than rendering the
// raw key — a half-translated interface should degrade to Greek, not to
// "weekly.volume" staring at the reader.
export function t(lang, key, vars) {
  const table = STRINGS[lang] || STRINGS[DEFAULT_LANG];
  let out = table[key] ?? STRINGS[DEFAULT_LANG][key] ?? key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      out = out.replaceAll(`{${name}}`, String(value));
    }
  }
  return out;
}

export function locale(lang) {
  return lang === "en" ? "en-GB" : "el-GR";
}
