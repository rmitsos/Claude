// Week 31's lead. Continues the week 30 note rather than repeating it: that
// piece ended on ΔΕΗ being upgraded for a strategy; this one is what the
// strategy looks like seven days later.
//
// The structural facts come from .claude/skills/greek-market/relations.md —
// ΔΕΗ's 51% of ΔΕΔΔΗΕ, ΡΑΑΕΥ's independence. Macquarie's 49% is deliberately
// absent again, on the publisher's judgement.
//
// The line this piece walks: a regulated return in Greece is one input to the
// cost of capital of a group that invests abroad. That is what a listed
// integrated utility *is*, and saying so is analysis. Saying Greek consumers
// are funding Hungarian solar would be an accusation, and it is not made here
// in any form.

function A({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ink underline decoration-band/50 underline-offset-2 hover:decoration-band"
    >
      {children}
    </a>
  );
}

export const meta = {
  week: "2026-w31",
  published: "2026-07-28T19:00:00+03:00",
  weekOf: { el: "28 Ιουλίου – 3 Αυγούστου 2026", en: "28 July – 3 August 2026" },
  author: "GR Wire",
};

/* ------------------------------- Ελληνικά ------------------------------- */

export const el = {
  title: "Ένα φωτοβολταϊκό στην Ουγγαρία και ένα πλαφόν στην Αθήνα",
  standfirst:
    "Η ΔΕΗ μπήκε στην ουγγρική αγορά την εβδομάδα που η χονδρεμπορική έδειξε αυξήσεις για τον Αύγουστο. Το ερώτημα δεν είναι ποιος πληρώνει τι — είναι ποιον ρυθμίζει σήμερα η ΡΑΑΕΥ.",
  Body: function BodyEl() {
    return (
      <>
        <p>
          Η ΔΕΗ{" "}
          <A href="https://balkangreenenergynews.com/greek-ppc-group-expands-into-hungarian-renewables-market/">
            μπήκε στην ουγγρική αγορά ανανεώσιμων
          </A>
          , αγοράζοντας από τη Greenvolt ένα επιδοτούμενο φωτοβολταϊκό πάρκο
          57,5 MW, με δικαίωμα προαίρεσης και για αποθήκευση. Την ίδια εβδομάδα,
          η χονδρεμπορική αγορά{" "}
          <A href="https://www.capital.gr/oikonomia/4007647/auxiseis-sta-timologia-reumatos-tou-augoustou-deixnei-i-xondremporiki-apo-ti-tha-exartithei-mia-kratiki-epidotisi/">
            έδειξε αυξήσεις στα τιμολόγια ρεύματος του Αυγούστου
          </A>
          , και ο υπουργός Ενέργειας δήλωσε ότι{" "}
          <A href="https://news.b2green.gr/77486/">
            «η αναταραχή στις διεθνείς αγορές δεν επιτρέπει σταθερότητα στις
            τιμές»
          </A>
          .
        </p>

        <p>
          Χωριστά, είναι μια είδηση επέκτασης και μια είδηση κόστους. Μαζί,
          αφορούν την ίδια εταιρεία και τον ίδιο ισολογισμό.
        </p>

        <p>
          Την προηγούμενη εβδομάδα γράψαμε ότι η Fitch{" "}
          <A href="https://ypodomes.com/anavathmisi-tis-dei-apo-tin-fitch-i-stratigiki-gia-to-2030-epitachynei-ti-metamorfosi-tis-dei-se-mia-megalyteri-pio-diaforopoiimeni-kai-olokliromeni-etaireia-koinis-ofeleias/">
            αναβάθμισε τη ΔΕΗ
          </A>{" "}
          όχι για το πελατολόγιό της αλλά για τη στρατηγική του 2030 —
          ανανεώσιμες και δίκτυα. Η Ουγγαρία είναι αυτή ακριβώς η στρατηγική,
          επτά ημέρες αργότερα, σε ορατή μορφή. Δεν είναι έκπληξη· είναι
          επιβεβαίωση.
        </p>

        <p>
          Και εδώ χρειάζεται να ειπωθεί κάτι που η λέξη «ΔΕΗ» κρύβει. Δεν είναι
          πια μια εθνική επιχείρηση ηλεκτρισμού. Είναι ένας εισηγμένος όμιλος
          που κατέχει το 51% του ΔΕΔΔΗΕ, δηλαδή του διαχειριστή του δικτύου
          διανομής· είναι ο μεγαλύτερος προμηθευτής της ελληνικής λιανικής·
          αναπτύσσει οπτικές ίνες πάνω στους στύλους του ίδιου δικτύου· και από
          αυτή την εβδομάδα έχει παραγωγή και εκτός Ελλάδας.
        </p>

        <p>
          Η ΡΑΑΕΥ{" "}
          <A href="https://www.capital.gr/oikonomia/4007287/st-papastaurou-to-plafon-sto-pagio-tou-reumatos-einai-apo-ta-metra-pou-suzita-i-raaeu/">
            εξετάζει πλαφόν στο πάγιο του ρεύματος
          </A>
          . Ένα ρυθμιζόμενο έσοδο καθορίζει τι αποδίδει μια δραστηριότητα
          δικτύου. Σε έναν εισηγμένο όμιλο, όμως, το κεφάλαιο δεν έχει διαβατήριο
          — αυτό ακριβώς σημαίνει «όμιλος». Άρα η αρχή που ορίζει μια ελληνική
          ρυθμιζόμενη απόδοση ορίζει, μεταξύ άλλων, ένα από τα στοιχεία του
          κόστους κεφαλαίου μιας εταιρείας της οποίας το επόμενο περιουσιακό
          στοιχείο μπορεί να μην είναι ελληνικό.
        </p>

        <p>
          Αυτό δεν είναι μομφή, και δεν λέμε ότι ο Έλληνας καταναλωτής πληρώνει
          ουγγρικά φωτοβολταϊκά. Έτσι λειτουργεί κάθε καθετοποιημένος εισηγμένος
          όμιλος ενέργειας στην Ευρώπη, και η επέκταση είναι θεμιτή επιχειρηματική
          επιλογή που ο ίδιος ο οίκος αξιολόγησης επιβράβευσε. Το ερώτημα είναι
          διαφορετικό και αξίζει να τεθεί ρητά: η ρυθμιστική συζήτηση στην Αθήνα
          αφορά ακόμη μια εθνική επιχείρηση κοινής ωφέλειας, ή έναν περιφερειακό
          όμιλο που τυχαίνει να ελέγχει το ελληνικό δίκτυο;
        </p>

        <p>
          Το φόντο εξηγεί τη βιασύνη. Τα φωτοβολταϊκά έφτασαν φέτος το καλοκαίρι{" "}
          <A href="https://news.b2green.gr/77457/">
            σε ιστορικό ρεκόρ 25% της ηλεκτροπαραγωγής στην ΕΕ
          </A>
          , ξεπερνώντας για πρώτη φορά την πυρηνική και το φυσικό αέριο. Η ΔΕΗ
          αγοράζει μέσα σε αυτή την καμπύλη, και έχει κάθε λόγο να το κάνει
          γρήγορα. Το ζήτημα δεν είναι αν πρέπει — είναι αν το πλαίσιο που
          τιμολογεί το ελληνικό της δίκτυο σχεδιάστηκε για μια εταιρεία που
          κάνει και τα δύο.
        </p>
      </>
    );
  },
};

/* ------------------------------- English -------------------------------- */

export const en = {
  title: "A solar park in Hungary, a price cap in Athens",
  standfirst:
    "ΔΕΗ entered the Hungarian market in the week wholesale prices pointed to higher August tariffs. The question is not who pays for what — it is who ΡΑΑΕΥ is now regulating.",
  Body: function BodyEn() {
    return (
      <>
        <p>
          ΔΕΗ{" "}
          <A href="https://balkangreenenergynews.com/greek-ppc-group-expands-into-hungarian-renewables-market/">
            entered the Hungarian renewables market
          </A>
          , buying a subsidised 57.5 MW solar park from Greenvolt with an option
          on storage. In the same week, the wholesale market{" "}
          <A href="https://www.capital.gr/oikonomia/4007647/auxiseis-sta-timologia-reumatos-tou-augoustou-deixnei-i-xondremporiki-apo-ti-tha-exartithei-mia-kratiki-epidotisi/">
            pointed to higher electricity tariffs in August
          </A>
          , and the energy minister said{" "}
          <A href="https://news.b2green.gr/77486/">
            turbulence in international markets does not allow price stability
          </A>
          .
        </p>

        <p>
          Separately, an expansion story and a cost-of-living story. Together,
          the same company and the same balance sheet.
        </p>

        <p>
          Last week we wrote that Fitch{" "}
          <A href="https://ypodomes.com/anavathmisi-tis-dei-apo-tin-fitch-i-stratigiki-gia-to-2030-epitachynei-ti-metamorfosi-tis-dei-se-mia-megalyteri-pio-diaforopoiimeni-kai-olokliromeni-etaireia-koinis-ofeleias/">
            upgraded ΔΕΗ
          </A>{" "}
          not for its customer book but for its 2030 strategy — renewables and
          networks. Hungary is that strategy, seven days later, made visible.
          Not a surprise; a confirmation.
        </p>

        <p>
          Which requires saying something the word &ldquo;ΔΕΗ&rdquo; conceals.
          It is no longer a national electricity company. It is a listed group
          that owns 51% of ΔΕΔΔΗΕ, the distribution network operator; the
          largest supplier in the Greek retail market; a builder of fibre along
          that same network&rsquo;s poles; and, as of this week, an owner of
          generation outside Greece.
        </p>

        <p>
          ΡΑΑΕΥ is{" "}
          <A href="https://www.capital.gr/oikonomia/4007287/st-papastaurou-to-plafon-sto-pagio-tou-reumatos-einai-apo-ta-metra-pou-suzita-i-raaeu/">
            weighing a cap on the standing charge
          </A>
          . A regulated revenue sets what a network business earns. But capital
          inside a listed group carries no passport — that is what a group
          means. So the authority setting a Greek regulated return is setting
          one input to the cost of capital of a company whose next asset may not
          be Greek.
        </p>

        <p>
          This is not an accusation, and we are not saying Greek consumers are
          funding Hungarian solar. It is how every vertically integrated listed
          utility in Europe works, and the expansion is a legitimate commercial
          choice that a rating agency has just rewarded. The question is a
          different one, and worth putting plainly: is the regulatory
          conversation in Athens still about a national utility, or about a
          regional group that happens to control the Greek network?
        </p>

        <p>
          The backdrop explains the hurry. Solar reached{" "}
          <A href="https://news.b2green.gr/77457/">
            a record 25% of EU electricity generation
          </A>{" "}
          this summer, passing nuclear and gas for the first time. ΔΕΗ is buying
          into that curve and has every reason to move fast. The issue is not
          whether it should — it is whether the framework that prices its Greek
          network was designed for a company that does both.
        </p>
      </>
    );
  },
};

/* --------------------------------- Sweep -------------------------------- */

// The "at a glance" section, and the one part of a letter that has no home on
// the site: the wire already shows these stories, and repeating them as prose
// would be the aggregation twice over. It lives here so the campaign can be
// assembled from the same file as the lead rather than pasted together by
// hand every week.
//
// Inline markup is deliberately tiny — **bold** and [text](url) — so a week's
// copy stays legible as text. See lib/emailHtml.js for the parser.
export const sweep = {
  el: [
    {
      heading: "Οικονομία",
      lines: [
        "Ο όμιλος **AKTOR** ολοκλήρωσε άντληση 950 εκατ. ευρώ — 650 εκατ. από ΑΜΚ και [ομολογιακό 300 εκατ. με υπερκάλυψη 1,8 φορές και επιτόκιο 7,87%](https://www.naftemporiki.gr/business/2143497/aktor-yperkalypsi-18-fores-toy-omologoy-300-ekat-eyro/) — για επενδυτικό πλάνο 3 δισ.",
        "Η πιστωτική επέκταση στην Ελλάδα [επιταχύνεται ενώ οι ευρωπαϊκές τράπεζες πατούν φρένο](https://www.ot.gr/2026/07/28/diethni/eyropaikes-trapezes-patoun-freno-sta-nea-daneia-i-elliniki-eksairesi/) — την ίδια εβδομάδα που το διαθέσιμο εισόδημα των νοικοκυριών [υποχώρησε 2,5%](https://www.ot.gr/2026/07/27/oikonomia/diathesimo-eisodima-voutia-se-apotamieysi-kai-ependyseis-sta-ellinika-noikokyria-sto-a%CE%84-trimino-2026/).",
      ],
    },
    {
      heading: "Τηλεπικοινωνίες",
      lines: [
        "**Vodafone Ελλάδας**: [έσοδα υπηρεσιών 248 εκατ., +12,2%](https://www.naftemporiki.gr/business/2143498/vodafone-elladas-enischymena-esoda-kata-122/), με ώθηση κυρίως από τον δημόσιο τομέα.",
        "Ο **ΟΤΕ** φέρεται να αναλαμβάνει [μεγάλο έργο data centers του ΝΑΤΟ στην Ευρώπη](https://www.ictplus.gr/ote-pros-analipsi-megalou-ergou-data-centers-tou-nato-stin-evropi/) — δημοσίευμα βασισμένο σε πληροφορίες, χωρίς επιβεβαίωση.",
      ],
    },
    {
      heading: "Ενέργεια",
      lines: [
        "Ο **ΔΕΣΦΑ** προκήρυξε [διαγωνισμό 8,6 εκατ. για τις μελέτες του H2DRIA](https://news.b2green.gr/77482/), του αγωγού υδρογόνου του 1 δισ. προς τη ΝΑ και Κεντρική Ευρώπη.",
        "Η **ΔΕΗ** μπήκε στην ουγγρική αγορά, [αγοράζοντας φωτοβολταϊκό 57,5 MW από τη Greenvolt](https://balkangreenenergynews.com/greek-ppc-group-expands-into-hungarian-renewables-market/) — ενώ η χονδρεμπορική [δείχνει αυξήσεις στα τιμολόγια ρεύματος του Αυγούστου](https://www.capital.gr/oikonomia/4007647/auxiseis-sta-timologia-reumatos-tou-augoustou-deixnei-i-xondremporiki-apo-ti-tha-exartithei-mia-kratiki-epidotisi/).",
      ],
    },
  ],
  en: [
    {
      heading: "Finance",
      lines: [
        "**AKTOR** completed a €950m raise — €650m in equity plus a [€300m bond, 1.8× covered at 7.87%](https://www.naftemporiki.gr/business/2143497/aktor-yperkalypsi-18-fores-toy-omologoy-300-ekat-eyro/) — funding a €3bn investment plan.",
        "Greek credit expansion is [accelerating while European banks pull back](https://www.ot.gr/2026/07/28/diethni/eyropaikes-trapezes-patoun-freno-sta-nea-daneia-i-elliniki-eksairesi/), in the same week household disposable income [fell 2.5%](https://www.ot.gr/2026/07/27/oikonomia/diathesimo-eisodima-voutia-se-apotamieysi-kai-ependyseis-sta-ellinika-noikokyria-sto-a%CE%84-trimino-2026/).",
      ],
    },
    {
      heading: "Telecoms",
      lines: [
        "**Vodafone Greece**: [service revenue €248m, up 12.2%](https://www.naftemporiki.gr/english/2143591/vodafone-greece-reports-12-2-rise-in-q1-service-revenue/), driven largely by public sector demand.",
        "**ΟΤΕ** is reported to be taking on a [major NATO data centre project in Europe](https://www.ictplus.gr/ote-pros-analipsi-megalou-ergou-data-centers-tou-nato-stin-evropi/) — sourced reporting, not confirmed.",
      ],
    },
    {
      heading: "Energy",
      lines: [
        "**ΔΕΣΦΑ** tendered [€8.6m of technical studies for H2DRIA](https://news.b2green.gr/77482/), the €1bn hydrogen backbone toward south-eastern and central Europe.",
        "**ΔΕΗ** entered Hungary, [buying a 57.5 MW solar park from Greenvolt](https://balkangreenenergynews.com/greek-ppc-group-expands-into-hungarian-renewables-market/) — while wholesale prices [point to higher August electricity tariffs](https://www.capital.gr/oikonomia/4007647/auxiseis-sta-timologia-reumatos-tou-augoustou-deixnei-i-xondremporiki-apo-ti-tha-exartithei-mia-kratiki-epidotisi/).",
      ],
    },
  ],
};
