// A note, not a lead — one thread, added ad hoc within week 31 because it
// couldn't wait for a new week's lead. Sourced from live web search rather
// than the ingest feed list, at the publisher's request: this story broke
// after week 31's lead was written and isn't covered by any configured
// feed. WebFetch to the primary Greek sources returned 403 from this
// environment (the same block that has affected every external fetch
// attempt all session), so sourcing here is via search snippets and each
// outlet's own reporting rather than a full read of the original pages —
// flagged, not hidden.
//
// The one fact this piece turns on, stated by the Fire Service's own
// spokesperson, not inferred: the fire did not start from the wind
// turbines, but from the private electrical connection network built to
// tie them into the grid. Publishing "wind turbines caused the fire" would
// have been both inaccurate and exactly the online narrative the Fire
// Service and the wind-energy association (ELTAEN) were both, separately,
// pushing back on as this was written.
//
// The arson charge is "possible intent" (ενδεχόμενος δόλος) against the
// engineer who signed the design and the contractor who built the
// connection network — not premeditated arson, and not a finding against
// the wind-farm owner (sought, not arrested). Deliberately kept precise:
// this concerns two named professions in an open criminal case, and
// overstating the charge would be the same category of error as
// misnaming the cause.
//
// The curtailment-fines story is real and separately sourced, but the
// piece explicitly declines to assert it is a response to the fire —
// the policy was already in development in spring 2026 for grid-capacity
// reasons, months before Viotia. Two facts placed together, not one
// argument built from them. This is the house rule on motive: named
// structure and dated timelines, no imputed cause without evidence.
//
// This is live, developing news (a fire still active as of the sources
// gathered) — casualty and damage figures are hedged accordingly and may
// be revised as the response continues.

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

const el = {
  title: "Το καλώδιο, όχι η ανεμογεννήτρια",
  standfirst:
    "Η πυρκαγιά που έκαψε τη Βοιωτία και την Αττική αποδίδεται σε δίκτυο σύνδεσης ανεμογεννητριών με το δίκτυο — όχι στις ίδιες τις ανεμογεννήτριες. Την ίδια περίοδο, το κράτος οριστικοποιεί πρόστιμα για ΑΠΕ που αγνοούν εντολές περικοπής. Διαφορετικές ιστορίες, ίδιο σημείο τριβής: η σύνδεση με το δίκτυο.",
  Body: function BodyEl() {
    return (
      <>
        <p>
          Η πυρκαγιά που ξέσπασε την Παρασκευή 31 Ιουλίου κοντά στον Άγιο
          Βασίλειο Βοιωτίας εξαπλώθηκε ταχύτατα στην Αττική εν μέσω ανέμων
          που έφτασαν τα 12 μποφόρ, κατέκαψε δεκάδες σπίτια γύρω από το
          Πόρτο Γερμενό και οδήγησε σε εκκενώσεις που συνεχίζονταν ακόμη τις
          επόμενες ημέρες, με νέο μέτωπο και στην Κεφαλονιά. Δύο μέλη
          πληρώματος από τα δύο πυροσβεστικά ελικόπτερα που συγκρούστηκαν
          κατά την επιχείρηση σκοτώθηκαν.
        </p>

        <p>
          Ο εκπρόσωπος της Πυροσβεστικής, Βασίλης Βαθρακογιάννης,
          ξεκαθάρισε δημόσια ότι το σημείο εκκίνησης δεν ήταν οι ίδιες οι
          ανεμογεννήτριες, αλλά η γραμμή μεταφοράς — το ιδιωτικό δίκτυο που
          συνδέει το αιολικό πάρκο με το κεντρικό δίκτυο.{" "}
          <A href="https://www.tanea.gr/2026/08/02/epikairotita/vathrakogiannis-gia-ti-fotia-stin-attikovoiotia-simeio-enarksis-i-grammi-metaforas-ilektrikis-energeias-kai-oxi-oi-anemogennitries/">
            Το είπε ο ίδιος, ρητά.
          </A>{" "}
          Συνελήφθησαν δύο άτομα: ο ηλεκτρολόγος μηχανικός που είχε
          υπογράψει τη μελέτη και επίβλεψη του δικτύου σύνδεσης, και ο
          εργολάβος που το κατασκεύασε.{" "}
          <A href="https://www.tovima.gr/2026/08/02/society/apo-spinthires-se-anemogennitria-i-pyrkagia-sti-voiotia-dyo-syllipseis/">
            Σχηματίστηκε δικογραφία για εμπρησμό με ενδεχόμενο δόλο, σε
            βαθμό κακουργήματος
          </A>{" "}
          — όχι για προμελετημένο εμπρησμό. Αναζητείται και ο ιδιοκτήτης
          της εταιρείας του αιολικού πάρκου, χωρίς μέχρι στιγμής να έχει
          εντοπιστεί.
        </p>

        <p>
          Η διάκριση ανάμεσα στην ανεμογεννήτρια και το δίκτυο σύνδεσής της
          δεν είναι τεχνική λεπτομέρεια, είναι όλη η είδηση. Στο διαδίκτυο
          κυκλοφόρησε γρήγορα η αφήγηση «οι ανεμογεννήτριες προκαλούν
          πυρκαγιές» — μια κατηγορία εναντίον μιας τεχνολογίας. Αυτό που
          κατέγραψε η έρευνα είναι κάτι στενότερο: ένα συγκεκριμένο έργο
          σύνδεσης, με συγκεκριμένους υπεύθυνους μελέτης και κατασκευής, υπό
          ποινική διερεύνηση. Αν η αιτία επιβεβαιωθεί ότι είναι η ποιότητα
          ενός έργου σύνδεσης, η απάντηση είναι έλεγχος μελέτης, επίβλεψης
          και αδειοδότησης τέτοιων δικτύων — όχι αμφισβήτηση της αιολικής
          τεχνολογίας καθαυτής.
        </p>

        <p>
          Χωρίς καμία σχέση με την έρευνα της Βοιωτίας — τα πρόστιμα
          συζητούνται από την άνοιξη, μήνες πριν από τη φωτιά — το ΥΠΕΝ
          οριστικοποιεί{" "}
          <A href="https://www.tovima.com/climate/greece-prepares-heavy-fines-for-renewable-energy-producers-that-ignore-curtailment-orders/">
            αυστηρά πρόστιμα για παραγωγούς ΑΠΕ που αγνοούν εντολές
            περικοπής
          </A>{" "}
          από τον ΑΔΜΗΕ και τον ΔΕΔΔΗΕ. Η περικοπή αναμένεται να φτάσει το
          12% της παραγωγής ΑΠΕ φέτος, από 7,5% πέρυσι —{" "}
          <A href="https://www.pv-magazine.com/2026/03/04/greek-pv-producers-fret-3-5-twh-of-curtailments-in-2026/">
            αύξηση περίπου 75% σε όγκο
          </A>{" "}
          — επειδή η χωρητικότητα του δικτύου δεν μεγάλωσε με τον ρυθμό που
          μεγάλωσε η εγκατεστημένη ισχύς.
        </p>

        <p>
          Δεν έχουμε καμία ένδειξη ότι οι δύο ιστορίες συνδέονται, και δεν
          τις παρουσιάζουμε ως αιτία και αποτέλεσμα. Μοιράζονται όμως κάτι
          που αξίζει να ονομαστεί: και οι δύο αφορούν, όχι το πόση ισχύς ΑΠΕ
          χτίζεται, αλλά το πώς συνδέεται — φυσικά, στην πρώτη περίπτωση·
          διοικητικά, στη δεύτερη — με ένα δίκτυο που δεν σχεδιάστηκε για
          τον όγκο που καλείται τώρα να απορροφήσει.
        </p>

        <p>
          Το ερώτημα κάτω από τους τίτλους και των δύο ειδήσεων δεν είναι
          πόσες ανεμογεννήτριες ή φωτοβολταϊκά πρέπει να χτιστούν. Είναι
          ποιος υπογράφει τη μελέτη σύνδεσης, ποιος επιβλέπει την
          κατασκευή, και ποιος πληρώνει όταν το δίκτυο δεν αντέχει τον όγκο.
        </p>
      </>
    );
  },
};

/* ------------------------------- English -------------------------------- */

const en = {
  title: "The cable, not the turbine",
  standfirst:
    "The fire that burned through Viotia and Attica is being attributed to a wind farm's own grid-connection network — not the turbines. In the same stretch, the state is finalising fines for renewable producers who ignore curtailment orders. Different stories, the same point of friction: the connection to the grid.",
  Body: function BodyEn() {
    return (
      <>
        <p>
          The fire that broke out on Friday, 31 July near Agios Vasileios in
          Viotia spread rapidly into Attica amid gale-force winds gusting to
          12 Beaufort, destroyed dozens of homes around Porto Germeno, and
          forced evacuations that were still under way days later, with a
          separate fire front on Kefalonia. Two crew members from one of two
          firefighting helicopters that collided during the response were
          killed.
        </p>

        <p>
          The Fire Service&rsquo;s spokesperson, Vasilis Vathrakogiannis,
          stated publicly that the point of origin was not the turbines
          themselves but the transmission line — the private network
          connecting the wind farm to the central grid.{" "}
          <A href="https://www.tanea.gr/2026/08/02/epikairotita/vathrakogiannis-gia-ti-fotia-stin-attikovoiotia-simeio-enarksis-i-grammi-metaforas-ilektrikis-energeias-kai-oxi-oi-anemogennitries/">
            He said so explicitly.
          </A>{" "}
          Two people have been arrested: the electrical engineer who signed
          off on the design and supervision of the connection network, and
          the contractor who built it.{" "}
          <A href="https://www.tovima.gr/2026/08/02/society/apo-spinthires-se-anemogennitria-i-pyrkagia-sti-voiotia-dyo-syllipseis/">
            A case file has been opened for arson with possible intent, at
            felony level
          </A>{" "}
          — not premeditated arson. The owner of the wind-farm company is
          also being sought, and has not yet been located.
        </p>

        <p>
          The distinction between the turbine and its connection network
          isn&rsquo;t a technicality — it is the whole story. Online, the
          narrative that spread fast was &ldquo;wind turbines cause
          fires&rdquo; — an accusation against a technology. What the
          investigation actually found is narrower: one specific connection
          project, with named individuals responsible for its design and
          construction, under criminal investigation. If the cause is
          confirmed to be the quality of that one connection project, the
          answer is oversight of the design, supervision and licensing of
          such connection networks — not a challenge to wind technology
          itself.
        </p>

        <p>
          Unrelated to the Viotia investigation — the fines have been under
          discussion since spring, months before the fire — the energy
          ministry is finalising{" "}
          <A href="https://www.tovima.com/climate/greece-prepares-heavy-fines-for-renewable-energy-producers-that-ignore-curtailment-orders/">
            heavy fines for renewable producers who ignore curtailment
            orders
          </A>{" "}
          from ΑΔΜΗΕ and ΔΕΔΔΗΕ. Curtailment is expected to reach 12% of
          renewable output this year, up from 7.5% last year —{" "}
          <A href="https://www.pv-magazine.com/2026/03/04/greek-pv-producers-fret-3-5-twh-of-curtailments-in-2026/">
            roughly a 75% increase in volume
          </A>{" "}
          — because grid capacity hasn&rsquo;t grown at the pace installed
          renewable capacity has.
        </p>

        <p>
          We have no indication the two stories are connected, and we are
          not presenting them as cause and effect. But they share something
          worth naming: both are about not how much renewable capacity gets
          built, but how it connects — physically, in the first case;
          administratively, in the second — to a network that wasn&rsquo;t
          designed for the volume it&rsquo;s now being asked to carry.
        </p>

        <p>
          The question under both headlines isn&rsquo;t how many turbines or
          solar parks should be built. It is who signs off on the
          connection design, who supervises the construction, and who pays
          when the network can&rsquo;t carry the load.
        </p>
      </>
    );
  },
};

export const note = {
  slug: "kalodio-oxi-anemogennitria",
  published: "2026-08-03T14:00:00+03:00",
  el,
  en,
};
