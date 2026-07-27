import Link from "next/link";
import { H2, Ul } from "@/components/Prose";
import { FEEDS } from "@/lib/feeds";
import { SITE } from "@/lib/site";

export const el = {
  title: "Σχετικά με το GR Wire",
  intro: "Ελληνική οικονομία, υποδομές τηλεπικοινωνιών και ενέργειας — σε μία ροή.",
  Body: function AboutEl({ contact }) {
    return (
      <>
        <H2>Τι καλύπτει</H2>
        <p>
          Τρεις τομείς που αλληλεπικαλύπτονται περισσότερο απ&rsquo; ό,τι τους
          αντιμετωπίζει ο γενικός ελληνικός Τύπος:
        </p>
        <Ul>
          <li>
            <strong>Οικονομία</strong> — τράπεζες, αγορές, Χρηματιστήριο
            Αθηνών, μακροοικονομικά και ρυθμιστικά
          </li>
          <li>
            <strong>Υποδομές τηλεπικοινωνιών</strong> — πάροχοι, ανάπτυξη
            οπτικών ινών και FTTH, φάσμα, η ΕΕΤΤ
          </li>
          <li>
            <strong>Υποδομές ενέργειας</strong> — δίκτυο, ανανεώσιμες, αέριο,
            αποθήκευση, και οι διαχειριστές πίσω τους
          </li>
        </Ul>
        <p>
          Οι τηλεπικοινωνίες και η ενέργεια χωρίζονται η καθεμία σε{" "}
          <em>ειδήσεις</em> — αγορές, πολιτική, εταιρικές κινήσεις — και{" "}
          <em>τεχνολογία</em>, δηλαδή τι πραγματικά κατασκευάζεται και τίθεται σε
          λειτουργία. Υποσταθμοί, εγκαταστάσεις μπαταριών, δίκτυα οπτικών ινών
          και διασυνδέσεις έχουν δική τους όψη, επειδή το «ποιος ανακοίνωσε τι»
          και το «τι παραδόθηκε» είναι διαφορετικά ερωτήματα.
        </p>

        <H2>Πώς λειτουργεί</H2>
        <p>
          Το GR Wire διαβάζει δημόσιες ροές RSS από {FEEDS.length} ελληνικές και
          διεθνείς πηγές, αρκετές φορές την ημέρα. Κάθε είδηση ταξινομείται με
          βάση το τι πραγματεύεται και όχι με βάση την ενότητα από την οποία
          προήλθε — η ροή «Οικονομία» ενός μέσου περιέχει άφθονη διεθνή
          επικαιρότητα και πυρκαγιές μαζί με τα οικονομικά, και κρατείται μόνο το
          σχετικό υλικό.
        </p>
        <p>
          Η ταξινόμηση γίνεται με αυτόματη αντιστοίχιση λέξεων-κλειδιών στα
          ελληνικά και στα αγγλικά, συμπεριλαμβανομένων των μεγεθών ισχύος — ένας
          τίτλος που αναφέρει 100 MW ή 400 kV αφορά σχεδόν πάντοτε κάτι που
          κατασκευάζεται. Είναι χρήσιμος εμπειρικός κανόνας, όχι αλάνθαστος.
        </p>

        <H2>Από πού προέρχονται οι ειδήσεις</H2>
        <p>
          Όλα όσα καταγράφονται εδώ τα έχουν δημοσιεύσει άλλοι. Οι τρέχουσες
          πηγές περιλαμβάνουν:
        </p>
        <Ul>
          {FEEDS.map((feed) => (
            <li key={feed.url}>{feed.name}</li>
          ))}
        </Ul>
        <p>
          Η πλήρης λίστα, μαζί με τις πηγές που δοκιμάστηκαν και δεν μπόρεσαν να
          χρησιμοποιηθούν, τηρείται στο{" "}
          <a
            href="https://github.com/rmitsos/Claude/blob/main/sources/greek-news-sources.md"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            αποθετήριο
          </a>
          .
        </p>

        <H2>Τι δεν κάνει</H2>
        <p>
          Δεν αναπαράγει άρθρα. Παίρνετε τον τίτλο, το μέσο, την ώρα και έναν
          σύνδεσμο — και μετά διαβάζετε το κείμενο εκεί όπου δημοσιεύθηκε, ώστε ο
          εκδότης να λάβει την επίσκεψη. Το GR Wire δεν απασχολεί δημοσιογράφους
          και δεν γράφει ειδήσεις.
        </p>

        <H2>Η κάλυψη είναι άνιση, και το λέμε ανοιχτά</H2>
        <p>
          Η οικονομία και η ενέργεια καλύπτονται καλά. Οι τηλεπικοινωνίες
          λιγότερο, επειδή αρκετά εξειδικευμένα μέσα του κλάδου μπλοκάρουν
          εντελώς την αυτοματοποιημένη πρόσβαση. Αντί να παραγεμίσουμε την
          ενότητα, η{" "}
          <Link href="/weekly" className="underline">εβδομαδιαία σελίδα</Link>{" "}
          δείχνει τις πραγματικές μετρήσεις, ώστε να βλέπετε πού η κάλυψη είναι
          ισχυρή και πού όχι.
        </p>

        <H2>Επικοινωνία</H2>
        <p>
          Το GR Wire εκδίδεται από τον {SITE.publisher}. Δεν είναι εταιρεία ούτε
          δημοσιογραφικός οργανισμός — είναι ένα προσωπικό εγχείρημα.
        </p>
        <p>
          {contact ? (
            <>
              Διορθώσεις, προτάσεις πηγών και αιτήματα αφαίρεσης:{" "}
              <a href={`mailto:${contact}`} className="underline">
                {contact}
              </a>
              .
            </>
          ) : (
            <em>
              Δεν έχει οριστεί ακόμη διεύθυνση επικοινωνίας — δείτε
              src/lib/site.js.
            </em>
          )}
        </p>

        <p className="border-t border-rule pt-5 text-sm text-muted">
          Δείτε επίσης το{" "}
          <Link href="/privacy" className="underline">απόρρητο</Link> και τους{" "}
          <Link href="/terms" className="underline">όρους</Link>.
        </p>
      </>
    );
  },
};

export const en = {
  title: "About GR Wire",
  intro: "Greek finance, telecom & energy infrastructure — in one feed.",
  Body: function AboutEn({ contact }) {
    return (
      <>
        <H2>What it covers</H2>
        <p>
          Three beats that overlap more than the general Greek press treats them
          as doing:
        </p>
        <Ul>
          <li>
            <strong>Finance</strong> — banking, markets, ATHEX, macro and
            regulatory news
          </li>
          <li>
            <strong>Telecom infrastructure</strong> — operators, fibre and FTTH
            rollout, spectrum, the EETT regulator
          </li>
          <li>
            <strong>Energy infrastructure</strong> — the grid, renewables, gas,
            storage, and the operators behind them
          </li>
        </Ul>
        <p>
          Telecom and energy each split into <em>news</em> — markets, policy,
          corporate moves — and <em>technology</em>, meaning what is actually
          being built and switched on. Substations, battery installations, fibre
          builds and interconnectors get their own view because &ldquo;who
          announced what&rdquo; and &ldquo;what got commissioned&rdquo; are
          different questions.
        </p>

        <H2>How it works</H2>
        <p>
          GR Wire reads public RSS feeds from {FEEDS.length} Greek and
          international sources, several times a day. Each article is sorted by
          what it is about rather than which section of the newspaper it came
          from — a source&rsquo;s own &ldquo;Economy&rdquo; feed carries plenty
          of world news and wildfires alongside the finance, and only the
          relevant material is kept.
        </p>
        <p>
          The sorting is automated keyword matching across Greek and English,
          including capacity figures — a headline quoting 100MW or 400kV is
          almost always about something being built. It is a useful heuristic,
          not a perfect one.
        </p>

        <H2>Where the news comes from</H2>
        <p>
          Everything indexed here is reported by other people. Current sources
          include:
        </p>
        <Ul>
          {FEEDS.map((feed) => (
            <li key={feed.url}>{feed.name}</li>
          ))}
        </Ul>
        <p>
          The full list, including sources that were tried and could not be used,
          is kept in the{" "}
          <a
            href="https://github.com/rmitsos/Claude/blob/main/sources/greek-news-sources.md"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            repository
          </a>
          .
        </p>

        <H2>What it does not do</H2>
        <p>
          It does not reproduce articles. You get the headline, the publication,
          the time and a link — then you read the piece where it was published,
          and that publisher gets the visit. GR Wire employs no journalists and
          writes no stories.
        </p>

        <H2>Coverage is uneven, and says so</H2>
        <p>
          Finance and energy are well covered. Telecom is thinner, because
          several telecom trade publications block automated access outright.
          Rather than pad the section, the{" "}
          <Link href="/weekly" className="underline">weekly page</Link> shows the
          real counts so you can see where coverage is strong and where it is
          not.
        </p>

        <H2>Contact</H2>
        <p>
          GR Wire is published by {SITE.publisher}. It is not a company or a news
          organisation — it is a personal project.
        </p>
        <p>
          {contact ? (
            <>
              Corrections, source suggestions and removal requests:{" "}
              <a href={`mailto:${contact}`} className="underline">
                {contact}
              </a>
              .
            </>
          ) : (
            <em>
              A contact address has not been configured yet — see src/lib/site.js.
            </em>
          )}
        </p>

        <p className="border-t border-rule pt-5 text-sm text-muted">
          See also <Link href="/privacy" className="underline">privacy</Link> and{" "}
          <Link href="/terms" className="underline">terms</Link>.
        </p>
      </>
    );
  },
};
