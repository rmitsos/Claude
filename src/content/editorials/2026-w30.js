// Two written versions, not a translation of one. The argument is what
// matters in a piece like this, and argument is the first thing machine
// translation flattens — "ο ΦΠΑ της ακρίβειας" carries a whole idea in Greek
// that English needs a gloss to reach at all.
//
// Greek is the default: the readership is the Greek market.

export const meta = {
  slug: "2026-w30",
  published: "2026-07-27T12:00:00+03:00",
  weekOf: { el: "21–27 Ιουλίου 2026", en: "21–27 July 2026" },
  author: "GR Wire",
};

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

/* ------------------------------- Ελληνικά ------------------------------- */

export const el = {
  title: "Η εβδομάδα που το πετρέλαιο έγραψε τον προϋπολογισμό",
  standfirst:
    "Η διαδρομή του Brent, και το πλεόνασμα ΦΠΑ που χρηματοδοτεί την επιδότηση του ντίζελ.",
  Body: function BodyEl() {
    return (
      <>
        <p>
          Το πετρέλαιο έκανε πλήρη κύκλο αυτή την εβδομάδα. Το Brent{" "}
          <A href="https://www.capital.gr/agores/4006817/rali-7-gia-to-petrelaio-xeperase-ta-101-dolaria/">
            ξεπέρασε τα 101 δολάρια την Πέμπτη
          </A>
          , με άνοδο άνω του 30% μέσα στον μήνα, και{" "}
          <A href="https://www.capital.gr/agores/4007231/boutia-eos-kai-7-to-petrelaio-meta-tin-anastoli-ton-epitheseon-ipa-iran/">
            υποχώρησε έως και 7%
          </A>{" "}
          μέχρι το πρωί της Δευτέρας, στα περίπου 87,5 δολάρια, μετά την αναστολή
          των επιθέσεων μεταξύ Ουάσιγκτον και Τεχεράνης. Ανάμεσα στα δύο αυτά
          σημεία, η κυβέρνηση δέσμευσε 30 εκατ. ευρώ για{" "}
          <A href="https://news.b2green.gr/77411/">
            νέα επιδότηση στο πετρέλαιο κίνησης
          </A>{" "}
          — 10 λεπτά ανά λίτρο για τον Αύγουστο, πάνω από την υφιστάμενη έκπτωση
          των 5 λεπτών.
        </p>

        <p>Το ενδιαφέρον είναι από πού προήλθαν τα χρήματα.</p>

        <p>
          Τα στοιχεία του εξαμήνου που δημοσιεύθηκαν τη Δευτέρα δείχνουν{" "}
          <A href="https://www.capital.gr/oikonomia/4007265/proupologismos-protogenes-pleonasma-4-49-dis-euro-sto-examino-uperbasi-fpa-kai-forou-eisodimatos/">
            πρωτογενές πλεόνασμα 4,49 δισ. ευρώ
          </A>
          , με καθαρά έσοδα 36,012 δισ. ευρώ — 1,079 δισ. πάνω από τον στόχο. Τα
          φορολογικά έσοδα υπερέβησαν τον στόχο κατά 584 εκατ. ευρώ, και η
          μεγαλύτερη επιμέρους συνεισφορά ήρθε από τον ΦΠΑ: 573 εκατ. πάνω από
          τον στόχο, στα 14,577 δισ. ευρώ. Ο Οικονομικός Ταχυδρόμος το ονόμασε
          χωρίς περιστροφές:{" "}
          <A href="https://www.ot.gr/2026/07/27/oikonomia/proypologismos-o-fpa-tis-akriveias-gemise-ta-kratika-tameia-to-a%ce%84eksamino/">
            <em>ο ΦΠΑ της ακρίβειας</em>
          </A>
          .
        </p>

        <p>
          Το κράτος δηλαδή εισέπραξε ένα πλεόνασμα που γέννησε ο πληθωρισμός και
          δαπανά ένα μέρος του για να θωρακίσει τους οδηγούς από τον ίδιο
          πληθωρισμό. Δεν πρόκειται για κριτική· αυτός είναι αναμφισβήτητα ο
          λόγος ύπαρξης του δημοσιονομικού χώρου. Αξίζει όμως να ειπωθεί καθαρά,
          γιατί καθιστά την επιδότηση συνάρτηση του επιπέδου των τιμών και όχι
          πολιτική ανεξάρτητη από αυτό. Αν το Brent σταθεροποιηθεί κοντά στα 87
          αντί για τα 101 δολάρια, το πλεόνασμα συρρικνώνεται μαζί με την ανάγκη
          που χρηματοδοτούσε.
        </p>

        <h2>Η δομική ιστορία είναι το αέριο, όχι το ντίζελ</h2>

        <p>
          Η Ευρώπη μπαίνει στη χειμερινή περίοδο με τα υπόγεια αποθέματα φυσικού
          αερίου στο{" "}
          <A href="https://news.b2green.gr/77419/">
            55% — το χαμηλότερο επίπεδο για την εποχή από το 2021
          </A>{" "}
          — και διαρθρωτικά πιο εξαρτημένη από το LNG.
        </p>

        <p>
          Η Ελλάδα χτίζει δυναμικότητα ακριβώς μέσα σε αυτό το κενό. Ο ΔΕΣΦΑ
          προσδιόρισε την{" "}
          <A href="https://news.b2green.gr/77405/">
            εξαγωγική του ικανότητα για το 2027 στα 9 bcm
          </A>{" "}
          και εγκαινίασε τον αγωγό Δυτικής Μακεδονίας. Τα δύο γεγονότα ανήκουν
          στην ίδια πρόταση: μια ήπειρος με ελλιπή αποθέματα, και μια χώρα που
          τοποθετείται ως η νοτιοανατολική της πύλη.
        </p>

        <p>
          Στο εσωτερικό, οι εργασίες στα δίκτυα συνεχίζονται, χωρίς λάμψη και
          εντός χρονοδιαγράμματος. Ο διαγωνισμός ΑΔΜΗΕ–ΔΕΔΔΗΕ για το νέο ΚΥΤ
          Ρουφ —{" "}
          <A href="https://ypodomes.com/ekpneei-o-diagonismos-gia-to-neo-kentro-yperypsilis-tasis-kyt-royf/">
            68,25 εκατ. ευρώ, με δύο παρατάσεις
          </A>{" "}
          — ολοκληρώνεται επιτέλους. Ο ΔΕΔΔΗΕ δημοσίευσε το{" "}
          <A href="https://news.b2green.gr/77390/">
            χρονοδιάγραμμα για τους έξυπνους μετρητές έως το 2030
          </A>{" "}
          και{" "}
          <A href="https://news.b2green.gr/77406/">
            σχέδιο για να τερματίσει την καθυστέρηση δύο έως τριών ετών στην
            εκκαθάριση
          </A>
          , που δημιουργεί αναδρομικές χρεώσεις στους προμηθευτές. Η ΔΕΗ
          αναβαθμίστηκε από τη Fitch και{" "}
          <A href="https://www.ictplus.gr/omilos-dei-epekteinetai-stin-agora-tis-oungarias-me-nea-erga-ape/">
            μπήκε στην ουγγρική αγορά
          </A>{" "}
          με φωτοβολταϊκό πάρκο 57,5 MW.
        </p>

        <h2>Δύο ιστορίες αλλού, καμία με ελληνική συμμετοχή</h2>

        <p>
          <strong>Η αποθήκευση συγκεντρώνεται.</strong> Η Brookfield{" "}
          <A href="https://www.energy-storage.news/brookfield-buys-bess-developer-aypa-power-from-blackstone/">
            εξαγόρασε την Aypa Power από την Blackstone
          </A>{" "}
          με enterprise value περίπου 7 δισ. δολαρίων. Η R.Power{" "}
          <A href="https://www.energy-storage.news/poland-r-power-enlists-epcs-for-2-2gwh-of-bess-edf-and-eurus-eiffel-and-ergy-co-invest-in-projects/">
            ανέθεσε EPC για 2,2 GWh στην Πολωνία
          </A>
          . Η Alpiq ανακοίνωσε{" "}
          <A href="https://www.energy-storage.news/alpiq-follows-harmony-energy-acquisition-with-1-2gwh-project-announcement/">
            1,2 GWh στην Ελβετία
          </A>
          . Η CATL τοποθετεί{" "}
          <A href="https://www.energy-storage.news/sodium-ion-bess-catl-in-2gwh-eastern-europe-collaboration-ess-inc-signs-loi-for-500mwh-of-us-deployments/">
            μπαταρίες νατρίου-ιόντων στην Ανατολική Ευρώπη σε κλίμακα 2 GWh
          </A>
          .
        </p>

        <p>
          <strong>Τα data centers επανατιμολογούνται.</strong> Nvidia και OpenAI
          συζητούν{" "}
          <A href="https://www.ot.gr/2026/07/27/texnologia/texniti-noimosyni/nvidia-se-synomilies-me-tin-openai-gia-kataskeyi-data-center-500-dis-dol/">
            έργο 500 δισ. δολαρίων
          </A>
          . Η{" "}
          <A href="https://capacityglobal.com/news/metas-12bn-el-paso-bond-exposes-ai-debt-repricing/">
            χρηματοδότηση 12 δισ. της Meta στο Ελ Πάσο τιμολογείται πάνω από 7%
          </A>
          . Το κροατικό Pantheon AI{" "}
          <A href="https://balkangreenenergynews.com/croatian-pantheon-ai-data-center-clears-major-grid-hurdle/">
            πήρε την έγκριση σύνδεσης με το δίκτυο
          </A>
          .
        </p>

        <p>
          Οι δύο ιστορίες συγκλίνουν. Το Energy Storage News δημοσίευσε αυτή την
          εβδομάδα ανάλυση για{" "}
          <A href="https://www.energy-storage.news/ai-data-centres-battery-dilemma-when-mission-critical-uptime-meets-thermal-runaway-risk/">
            το πρόβλημα των μπαταριών μέσα στα data centers τεχνητής νοημοσύνης
          </A>
          , εκεί όπου η απαίτηση για μηδενική διακοπή λειτουργίας συναντά τον
          κίνδυνο θερμικής διαφυγής. Τα data centers έπαψαν να είναι θέμα
          τηλεπικοινωνιών και έγιναν θέμα δικτύου.
        </p>

        <hr />

        <p>
          <em>
            Μια διευκρίνιση που έχει σημασία: τα παραπάνω είναι όσα κατέγραψαν οι
            πηγές του GR Wire, όχι απογραφή της ελληνικής αγοράς. Η εγχώρια
            ενεργειακή μας κάλυψη έχει ένα γνωστό κενό — το energypress.gr, το
            βασικό ελληνικό ενεργειακό μέσο, μπλοκάρει την αυτοματοποιημένη
            πρόσβαση. Η απουσία ελληνικών έργων αποθήκευσης παραπάνω αποτελεί
            ένδειξη για τις ροές μας, όχι απόδειξη για την Ελλάδα.
          </em>
        </p>
      </>
    );
  },
};

/* -------------------------------- English ------------------------------- */

export const en = {
  title: "The week oil wrote the budget",
  standfirst:
    "Brent's round trip, and the VAT windfall quietly funding the diesel subsidy.",
  Body: function BodyEn() {
    return (
      <>
        <p>
          Oil made a full round trip this week. Brent{" "}
          <A href="https://www.capital.gr/agores/4006817/rali-7-gia-to-petrelaio-xeperase-ta-101-dolaria/">
            cleared $101 on Thursday
          </A>
          , up more than 30% on the month, then{" "}
          <A href="https://www.capital.gr/agores/4007231/boutia-eos-kai-7-to-petrelaio-meta-tin-anastoli-ton-epitheseon-ipa-iran/">
            fell as much as 7%
          </A>{" "}
          by Monday morning to around $87.50 after Washington and Tehran paused
          strikes. Between those two points, the Greek government committed €30
          million to a{" "}
          <A href="https://news.b2green.gr/77411/">new diesel subsidy</A> — 10
          cents a litre through August, on top of the existing five-cent
          discount.
        </p>

        <p>The interesting part is where the money came from.</p>

        <p>
          Half-year budget figures published Monday show a{" "}
          <A href="https://www.capital.gr/oikonomia/4007265/proupologismos-protogenes-pleonasma-4-49-dis-euro-sto-examino-uperbasi-fpa-kai-forou-eisodimatos/">
            primary surplus of €4.49bn
          </A>
          , with net revenue of €36.012bn — €1.079bn above target. Tax revenue
          beat by €584m, and the largest single contributor was VAT, €573m over
          at €14.577bn. OT.gr named it without euphemism:{" "}
          <A href="https://www.ot.gr/2026/07/27/oikonomia/proypologismos-o-fpa-tis-akriveias-gemise-ta-kratika-tameia-to-a%ce%84eksamino/">
            <em lang="el">ο ΦΠΑ της ακρίβειας</em>
          </A>{" "}
          — the VAT of high prices.
        </p>

        <p>
          So the state collected an inflation windfall and is spending part of it
          insulating drivers from the same inflation. That isn&rsquo;t a
          criticism; it is arguably what fiscal space is for. But it is worth
          stating plainly, because it makes the subsidy a function of the price
          level rather than a policy independent of it. If Brent settles near $87
          instead of $101, the windfall contracts alongside the need it was
          funding.
        </p>

        <h2>The structural story is gas, not diesel</h2>

        <p>
          Europe enters the heating season with underground gas storage at{" "}
          <A href="https://news.b2green.gr/77419/">
            55% — the lowest for the date since 2021
          </A>
          , and structurally more LNG-dependent than before.
        </p>

        <p>
          Greece is building capacity into exactly that gap. ΔΕΣΦΑ put its{" "}
          <A href="https://news.b2green.gr/77405/">
            2027 export capability at 9 bcm
          </A>{" "}
          this week and inaugurated the West Macedonia pipeline. Those two facts
          belong in the same sentence: a continent short of stored gas, and a
          country positioning as its southeastern entry point.
        </p>

        <p>
          Domestically the grid work continues, unglamorous and on schedule. The
          ΑΔΜΗΕ–ΔΕΔΔΗΕ tender for the new Rouf ultra-high-voltage centre —{" "}
          <A href="https://ypodomes.com/ekpneei-o-diagonismos-gia-to-neo-kentro-yperypsilis-tasis-kyt-royf/">
            €68.25m, twice extended
          </A>{" "}
          — is finally closing. ΔΕΔΔΗΕ published its{" "}
          <A href="https://news.b2green.gr/77390/">
            smart-meter timetable to 2030
          </A>{" "}
          and a{" "}
          <A href="https://news.b2green.gr/77406/">
            plan to end the two-to-three-year settlement lag
          </A>{" "}
          generating retroactive charges for suppliers. ΔΕΗ was upgraded by Fitch
          and{" "}
          <A href="https://www.ictplus.gr/omilos-dei-epekteinetai-stin-agora-tis-oungarias-me-nea-erga-ape/">
            entered Hungary
          </A>{" "}
          with a 57.5MW solar park.
        </p>

        <h2>Two threads elsewhere, neither with a Greek entry</h2>

        <p>
          <strong>Storage consolidated.</strong> Brookfield{" "}
          <A href="https://www.energy-storage.news/brookfield-buys-bess-developer-aypa-power-from-blackstone/">
            bought Aypa Power from Blackstone
          </A>{" "}
          at roughly $7bn enterprise value. R.Power{" "}
          <A href="https://www.energy-storage.news/poland-r-power-enlists-epcs-for-2-2gwh-of-bess-edf-and-eurus-eiffel-and-ergy-co-invest-in-projects/">
            lined up EPCs for 2.2GWh in Poland
          </A>
          . Alpiq announced{" "}
          <A href="https://www.energy-storage.news/alpiq-follows-harmony-energy-acquisition-with-1-2gwh-project-announcement/">
            1.2GWh in Switzerland
          </A>
          . CATL is placing{" "}
          <A href="https://www.energy-storage.news/sodium-ion-bess-catl-in-2gwh-eastern-europe-collaboration-ess-inc-signs-loi-for-500mwh-of-us-deployments/">
            sodium-ion into Eastern Europe at 2GWh scale
          </A>
          .
        </p>

        <p>
          <strong>Data centres repriced.</strong> Nvidia and OpenAI are
          discussing a{" "}
          <A href="https://www.ot.gr/2026/07/27/texnologia/texniti-noimosyni/nvidia-se-synomilies-me-tin-openai-gia-kataskeyi-data-center-500-dis-dol/">
            $500bn build
          </A>
          . Meta&rsquo;s{" "}
          <A href="https://capacityglobal.com/news/metas-12bn-el-paso-bond-exposes-ai-debt-repricing/">
            $12bn El Paso financing is clearing above 7%
          </A>
          . Croatia&rsquo;s Pantheon AI project{" "}
          <A href="https://balkangreenenergynews.com/croatian-pantheon-ai-data-center-clears-major-grid-hurdle/">
            cleared its grid-connection hurdle
          </A>
          .
        </p>

        <p>
          The two are merging. Energy Storage News ran a piece this week on{" "}
          <A href="https://www.energy-storage.news/ai-data-centres-battery-dilemma-when-mission-critical-uptime-meets-thermal-runaway-risk/">
            the battery problem inside AI data centres
          </A>
          , where zero-tolerance uptime meets thermal runaway risk. Data centres
          have stopped being a telecom story and become a grid story.
        </p>

        <hr />

        <p>
          <em>
            One caveat that matters: this is what GR Wire&rsquo;s sources
            reported, not a census of the Greek market. Our domestic energy
            coverage has a known hole — energypress.gr, the main Greek energy
            trade publication, blocks automated access. The absence of Greek
            storage projects above is evidence about our feeds, not proof about
            Greece.
          </em>
        </p>
      </>
    );
  },
};
