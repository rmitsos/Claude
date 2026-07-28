import Link from "next/link";
import { H2, Ul } from "@/components/Prose";
import { SITE } from "@/lib/site";

// Written in each language rather than translated, for the same reason as the
// editorial: legal text has to be read and understood, and a rendered-from-
// English privacy policy reads like one. Greek is the primary version — it is
// the language of the readership and of the supervisory authority.

export const el = {
  title: "Απόρρητο",
  intro:
    "Το GR Wire δεν έχει λογαριασμούς, διαφημίσεις ούτε αναλυτικά εργαλεία στον ιστότοπο. Έχει ένα εβδομαδιαίο δελτίο, και τα μηνύματά του καταγράφουν αν τα ανοίγετε. Η σελίδα αυτή περιγράφει και τα δύο στην πράξη, μαζί με όσα δεν είναι προφανή.",
  Body: function PrivacyEl({ contact }) {
    return (
      <>
        <H2>Ποιος είναι υπεύθυνος επεξεργασίας</H2>
        <p>
          Ο ιστότοπος εκδίδεται από τον {SITE.publisher}, ιδιώτη με έδρα στην{" "}
          {SITE.country === "Greece" ? "Ελλάδα" : SITE.country}, ο οποίος είναι
          και ο υπεύθυνος επεξεργασίας για ό,τι περιγράφεται εδώ.
          {contact ? (
            <>
              {" "}
              Επικοινωνία:{" "}
              <a href={`mailto:${contact}`} className="underline">
                {contact}
              </a>
              .
            </>
          ) : null}
        </p>

        <H2>Τι συλλέγουμε άμεσα</H2>
        <p>
          Αν απλώς διαβάζετε: τίποτα. Δεν υπάρχουν λογαριασμοί, δεν υπάρχει
          εγγραφή για να δείτε το περιεχόμενο, και καμία σελίδα αυτού του
          ιστότοπου δεν φορτώνει σενάριο παρακολούθησης ή αναλυτικών εργαλείων.
          Δεν δημιουργούμε προφίλ αναγνωστών.
        </p>
        <p>
          Υπάρχει ένα και μόνο σημείο όπου δίνετε εσείς στοιχεία: η φόρμα
          εγγραφής στο εβδομαδιαίο δελτίο. Αν δεν εγγραφείτε, τα παρακάτω δεν
          σας αφορούν καθόλου.
        </p>

        <H2>Το εβδομαδιαίο δελτίο</H2>
        <p>
          Αν εγγραφείτε, αποθηκεύουμε τη <strong>διεύθυνση email</strong> σας,
          την <strong>έκδοση που επιλέξατε</strong> (ελληνικά ή αγγλικά) και την{" "}
          <strong>ημερομηνία εγγραφής</strong>. Δεν ζητάμε όνομα, εταιρεία ή
          οτιδήποτε άλλο.
        </p>
        <p>
          Νομική βάση είναι η <strong>συγκατάθεσή</strong> σας, την οποία δίνετε
          δύο φορές: μία συμπληρώνοντας τη φόρμα και μία ανοίγοντας τον σύνδεσμο
          επιβεβαίωσης που σας στέλνουμε. Χωρίς το δεύτερο βήμα δεν λαμβάνετε
          τίποτα — αυτό υπάρχει ώστε να μην μπορεί κανείς να εγγράψει τη
          διεύθυνση κάποιου άλλου.
        </p>
        <p>
          Τα δεδομένα της λίστας βρίσκονται στη <strong>MailerLite</strong>{" "}
          (UAB MailerLite, Λιθουανία), η οποία ενεργεί ως εκτελών την
          επεξεργασία για λογαριασμό μας εντός της Ευρωπαϊκής Ένωσης.
        </p>

        <H2>Τι καταγράφουμε στα email — και γιατί το λέμε ρητά</H2>
        <p>
          Αυτό είναι το ένα σημείο όπου το GR Wire κάνει κάτι που αλλού
          αποφεύγει, οπότε λέγεται καθαρά: τα μηνύματα του δελτίου{" "}
          <strong>καταγράφουν αν τα ανοίξατε και ποιους συνδέσμους πατήσατε</strong>.
          Τεχνικά αυτό γίνεται με μια μικρή εικόνα μέσα στο μήνυμα και με
          συνδέσμους που περνούν πρώτα από τη MailerLite.
        </p>
        <p>
          Το χρησιμοποιούμε για έναν λόγο: να ξέρουμε αν το δελτίο διαβάζεται.
          Δεν πουλάμε αυτά τα στοιχεία, δεν τα συνδυάζουμε με τίποτα άλλο και
          δεν τα χρησιμοποιούμε για διαφήμιση ή για προφίλ. Ισχύει{" "}
          <em>μόνο για τα email</em>· ο ιστότοπος δεν σας παρακολουθεί.
        </p>
        <p>
          Τα περισσότερα προγράμματα email σάς επιτρέπουν να μπλοκάρετε τις
          εικόνες, οπότε η καταγραφή ανοίγματος δεν λειτουργεί καθόλου. Δεν το
          θεωρούμε πρόβλημα.
        </p>

        <H2>Πόσο κρατάμε τα στοιχεία της εγγραφής</H2>
        <p>
          Όσο είστε εγγεγραμμένοι. Κάθε μήνυμα έχει σύνδεσμο διαγραφής με ένα
          κλικ· μετά τη διαγραφή τα στοιχεία σας αφαιρούνται οριστικά εντός 30
          ημερών. Διευθύνσεις που δεν επιβεβαιώθηκαν ποτέ διαγράφονται μετά από
          30 ημέρες. Μπορείτε επίσης να ζητήσετε διαγραφή στέλνοντας μήνυμα στη
          διεύθυνση επικοινωνίας.
        </p>

        <H2>Cookies και τοπική αποθήκευση</H2>
        <p>
          Δύο πράγματα αποθηκεύονται στο πρόγραμμα περιήγησής σας, και μόνο
          εφόσον τα επιλέξετε εσείς. Το καθένα κρατά μία λέξη. Κανένα δεν σας
          ταυτοποιεί και κανένα δεν χρησιμοποιείται για παρακολούθηση, στατιστικά
          ή διαφήμιση.
        </p>
        <Ul>
          <li>
            <code className="font-mono text-[0.85em]">grwire-theme</code> —{" "}
            <em>dark</em> ή <em>light</em>, αποθηκεύεται στην τοπική αποθήκευση
            του προγράμματος περιήγησης όταν χρησιμοποιήσετε τον διακόπτη
            θέματος. Δεν αποστέλλεται ποτέ στους διακομιστές μας.
          </li>
          <li>
            <code className="font-mono text-[0.85em]">grwire-lang</code> —{" "}
            <em>el</em> ή <em>en</em>, ορίζεται όταν χρησιμοποιήσετε τον διακόπτη
            γλώσσας. Αυτό είναι cookie και όχι τοπική αποθήκευση, επειδή τα
            κείμενα της διεπαφής παράγονται στον διακομιστή, ο οποίος πρέπει να
            γνωρίζει την επιλογή σας πριν συνθέσει τη σελίδα. Αποστέλλεται μόνο
            σε αιτήματα προς αυτόν τον ιστότοπο.
          </li>
        </Ul>
        <p>
          Η εκκαθάριση των δεδομένων του προγράμματος περιήγησης τα αφαιρεί και
          τα δύο, και ο ιστότοπος επιστρέφει στα ελληνικά και στο σκοτεινό θέμα.
        </p>
        <p>
          Δεν υπάρχει banner συγκατάθεσης επειδή τίποτα εδώ δεν απαιτεί
          συγκατάθεση. Σύμφωνα με τους ευρωπαϊκούς κανόνες ePrivacy, συγκατάθεση
          απαιτείται για μη απαραίτητη αποθήκευση· μια προτίμηση που ορίζετε
          εσείς, και η οποία κάνει ακριβώς αυτό που της ζητήσατε, δεν είναι
          τέτοια. Ένα banner θα ήταν προσχηματικό και όχι συμμόρφωση.
        </p>
        <p>
          Αν προστεθούν ποτέ αναλυτικά εργαλεία ή διαφήμιση, αυτό αλλάζει — η
          σελίδα θα ενημερωθεί και η συγκατάθεση θα ζητηθεί κανονικά, πριν τεθεί
          σε ισχύ η αλλαγή και όχι μετά.
        </p>

        <H2>Τι συμβαίνει αυτόματα</H2>
        <p>
          Ο ιστότοπος φιλοξενείται στη Vercel. Όπως κάθε πάροχος φιλοξενίας, η
          Vercel επεξεργάζεται τα τεχνικά δεδομένα που στέλνει το πρόγραμμα
          περιήγησής σας με κάθε αίτημα, ώστε να αποδοθεί η σελίδα και να
          προστατευθεί η υπηρεσία από κατάχρηση:
        </p>
        <Ul>
          <li>διεύθυνση IP</li>
          <li>τύπος και έκδοση προγράμματος περιήγησης (user agent)</li>
          <li>σελίδα που ζητήθηκε, ημερομηνία και ώρα</li>
          <li>σελίδα προέλευσης, εφόσον υπάρχει</li>
        </Ul>
        <p>
          Νομική βάση είναι το έννομο συμφέρον: ένας ιστότοπος δεν μπορεί να
          λειτουργήσει ούτε να προστατευθεί από επιθέσεις χωρίς αυτά. Τα αρχεία
          καταγραφής τηρούνται από τη Vercel με τη δική της πολιτική διατήρησης
          και εμείς δεν τα εξάγουμε, δεν τα εμπλουτίζουμε και δεν τα αναλύουμε.
        </p>

        <H2>Άλλοι διακομιστές με τους οποίους επικοινωνεί το πρόγραμμα περιήγησής σας</H2>
        <p>
          Αυτό είναι το σημείο που οι περισσότερες πολιτικές απορρήτου
          παραλείπουν, οπότε ρητά:
        </p>
        <Ul>
          <li>
            <strong>Διακομιστές εικόνων των εκδοτών.</strong> Οι πέντε εικόνες
            στο μπλοκ των κύριων ειδήσεων φορτώνονται απευθείας από τα μέσα που
            τις δημοσίευσαν και δεν αντιγράφονται στους διακομιστές μας. Το
            πρόγραμμα περιήγησής σας ζητά επομένως τα αρχεία από τον εκδότη, και
            ο εκδότης βλέπει τη διεύθυνση IP σας, το πρόγραμμα περιήγησης και το
            γεγονός ότι ήρθατε από το GR Wire — ακριβώς όπως αν είχατε
            επισκεφθεί τον ιστότοπό του.
          </li>
          <li>
            <strong>Εκδότες στους οποίους μεταβαίνετε.</strong> Κάθε τίτλος
            παραπέμπει στην αρχική πηγή. Μόλις ακολουθήσετε έναν σύνδεσμο
            βρίσκεστε στον ιστότοπο εκείνου του οργανισμού, υπό τη δική του
            πολιτική απορρήτου και όχι τη δική μας.
          </li>
        </Ul>
        <p>
          Οι γραμματοσειρές αποδίδονται από αυτόν τον ιστότοπο και δεν
          ανακτώνται από τρίτο πάροχο, οπότε δεν γίνεται κανένα αίτημα σε
          υπηρεσία γραμματοσειρών.
        </p>

        <H2>Η βάση δεδομένων των ειδήσεων</H2>
        <p>
          Το GR Wire αποθηκεύει τους τίτλους, τις ώρες δημοσίευσης, τα ονόματα
          των πηγών και τους συνδέσμους που συλλέγει από δημόσιες ροές ειδήσεων.
          Η βάση περιέχει αποκλειστικά δημοσιευμένη δημοσιογραφία. Δεν περιέχει
          καμία πληροφορία για τους αναγνώστες.
        </p>

        <H2>Τα δικαιώματά σας</H2>
        <p>
          Βάσει του ΓΚΠΔ έχετε δικαίωμα πρόσβασης, διόρθωσης, διαγραφής,
          περιορισμού, εναντίωσης και φορητότητας των δεδομένων. Στην πράξη
          υπάρχουν ελάχιστα για να τα ασκήσετε, καθώς τα μόνα προσωπικά δεδομένα
          που εμπλέκονται βρίσκονται στα αρχεία καταγραφής του παρόχου
          φιλοξενίας.
        </p>
        <p>
          {contact ? (
            <>
              Για οποιοδήποτε αίτημα, επικοινωνήστε στο{" "}
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
          )}{" "}
          Έχετε επίσης δικαίωμα καταγγελίας σε εποπτική αρχή. Στην Ελλάδα αυτή
          είναι η Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (
          <a
            href="https://www.dpa.gr/"
            className="underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            dpa.gr
          </a>
          ).
        </p>

        <H2>Αλλαγές</H2>
        <p>
          Αν αλλάξει αυτό που κάνει ο ιστότοπος — αναλυτικά εργαλεία,
          διαφήμιση, οτιδήποτε νέο συλλέγει στοιχεία — η σελίδα θα ενημερωθεί
          πριν τεθεί σε ισχύ η αλλαγή και όχι μετά. Έτσι έγινε και με το
          εβδομαδιαίο δελτίο.
        </p>

        <p className="border-t border-rule pt-5 text-sm text-muted">
          Γραμμένο για να περιγράψει με ακρίβεια αυτόν τον ιστότοπο και όχι για
          να καλύψει κάθε ενδεχόμενο με τυποποιημένο κείμενο. Δεν αποτελεί
          νομική συμβουλή· αν το GR Wire αρχίσει να φέρει διαφημίσεις ή
          συνδρομές, ζητήστε από δικηγόρο να το ελέγξει. Δείτε επίσης τους{" "}
          <Link href="/terms" className="underline">όρους</Link> και τη σελίδα{" "}
          <Link href="/about" className="underline">σχετικά</Link>.
        </p>
      </>
    );
  },
};

export const en = {
  title: "Privacy",
  intro:
    "GR Wire has no accounts, no advertising and no analytics on the site. It does have a weekly newsletter, and those messages record whether you open them. This page describes both in practice, including the parts that aren't obvious.",
  Body: function PrivacyEn({ contact }) {
    return (
      <>
        <H2>Who the data controller is</H2>
        <p>
          The site is published by {SITE.publisher}, an individual based in{" "}
          {SITE.country}, who is also the data controller for everything
          described here.
          {contact ? (
            <>
              {" "}
              Contact:{" "}
              <a href={`mailto:${contact}`} className="underline">
                {contact}
              </a>
              .
            </>
          ) : null}
        </p>

        <H2>What we collect directly</H2>
        <p>
          If you are only reading: nothing. There are no accounts, nothing is
          gated behind a sign-up, and no page on this site loads a tracking or
          analytics script. We do not build a profile of readers.
        </p>
        <p>
          There is exactly one place where you hand us anything: the form for
          the weekly newsletter. If you do not subscribe, none of what follows
          applies to you.
        </p>

        <H2>The weekly newsletter</H2>
        <p>
          If you subscribe we store your <strong>email address</strong>, the{" "}
          <strong>edition you chose</strong> (Greek or English) and the{" "}
          <strong>date you subscribed</strong>. We do not ask for a name, a
          company or anything else.
        </p>
        <p>
          The lawful basis is your <strong>consent</strong>, which you give
          twice: once by submitting the form and once by opening the
          confirmation link we send. Without the second step you receive
          nothing — that exists so nobody can subscribe somebody else&rsquo;s
          address.
        </p>
        <p>
          The list is held at <strong>MailerLite</strong> (UAB MailerLite,
          Lithuania), acting as our processor within the European Union.
        </p>

        <H2>What the emails record, and why we say so plainly</H2>
        <p>
          This is the one place where GR Wire does something it avoids
          everywhere else, so it is stated outright: newsletter messages{" "}
          <strong>record whether you opened them and which links you
          followed</strong>. Technically that is a small image inside the
          message and links that pass through MailerLite first.
        </p>
        <p>
          It is there for one reason: to know whether the newsletter is being
          read. We do not sell it, do not combine it with anything else, and do
          not use it for advertising or profiling. It applies{" "}
          <em>to the emails only</em> — the website does not watch you.
        </p>
        <p>
          Most email clients let you block images, which stops open tracking
          working at all. We do not regard that as a problem.
        </p>

        <H2>How long we keep subscription data</H2>
        <p>
          For as long as you are subscribed. Every message carries a one-click
          unsubscribe link; after you unsubscribe your details are deleted
          within 30 days. Addresses that are never confirmed are deleted after
          30 days. You can also ask us to delete them by writing to the contact
          address.
        </p>

        <H2>Cookies and local storage</H2>
        <p>
          Two things are stored in your browser, and only once you choose them.
          Both hold a single word. Neither identifies you, and neither is used
          for tracking, analytics or advertising.
        </p>
        <Ul>
          <li>
            <code className="font-mono text-[0.85em]">grwire-theme</code> —{" "}
            <em>dark</em> or <em>light</em>, kept in your browser&rsquo;s local
            storage when you use the theme switch. It is never sent to our
            servers.
          </li>
          <li>
            <code className="font-mono text-[0.85em]">grwire-lang</code> —{" "}
            <em>el</em> or <em>en</em>, set when you use the language switch.
            This one is a cookie rather than local storage because the interface
            text is built on the server, which has to know your choice before it
            can render the page. It is sent with requests to this site only.
          </li>
        </Ul>
        <p>
          Clearing your browser data removes both, and the site falls back to
          Greek and the dark theme.
        </p>
        <p>
          There is no consent banner because nothing here needs consent. Under
          the EU ePrivacy rules, consent is required for non-essential storage;
          a preference you set yourself, doing only what you asked it to do, is
          not that. A banner would be theatre rather than compliance.
        </p>
        <p>
          If analytics or advertising are ever added, that changes — this page
          will be updated and consent will be requested properly, before the
          change goes live rather than after.
        </p>

        <H2>What happens automatically</H2>
        <p>
          The site is hosted on Vercel. Like any web host, Vercel processes the
          technical data your browser sends with each request in order to serve
          the page and protect the service from abuse:
        </p>
        <Ul>
          <li>IP address</li>
          <li>Browser type and version (user agent)</li>
          <li>Page requested, date and time</li>
          <li>Referring page, if any</li>
        </Ul>
        <p>
          We rely on legitimate interest as the legal basis for this: a website
          cannot be operated or defended against attack without it. These logs
          are held by Vercel under their own retention policy and we do not
          export, enrich or analyse them.
        </p>

        <H2>Other servers your browser contacts</H2>
        <p>
          This is the part most privacy policies leave out, so to be explicit:
        </p>
        <Ul>
          <li>
            <strong>Publisher image servers.</strong> The five images in the
            leading-stories block are loaded directly from the news
            organisations that published them, not copied onto our servers. Your
            browser therefore requests those files from the publisher, and that
            publisher can see your IP address, browser and the fact that you came
            from GR Wire — exactly as if you had visited their site.
          </li>
          <li>
            <strong>Publishers you click through to.</strong> Every headline
            links out to its original source. Once you follow a link you are on
            that organisation&rsquo;s site, under their privacy policy, not ours.
          </li>
        </Ul>
        <p>
          Fonts are served from this site rather than fetched from a third party,
          so no request is made to any font provider.
        </p>

        <H2>The article database</H2>
        <p>
          GR Wire stores the headlines, publication times, source names and links
          it collects from public news feeds. That database contains published
          journalism only. It holds no information about readers.
        </p>

        <H2>Your rights</H2>
        <p>
          Under the GDPR you have the right of access, rectification, erasure,
          restriction, objection and data portability. In practice there is very
          little to exercise them against, since the only personal data involved
          is in host-level server logs.
        </p>
        <p>
          {contact ? (
            <>
              To make a request, contact{" "}
              <a href={`mailto:${contact}`} className="underline">
                {contact}
              </a>
              .
            </>
          ) : (
            <em>
              A contact address has not been configured yet — see src/lib/site.js.
            </em>
          )}{" "}
          You also have the right to complain to a supervisory authority. In{" "}
          {SITE.country} that is the Hellenic Data Protection Authority (
          <a
            href="https://www.dpa.gr/en"
            className="underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            dpa.gr
          </a>
          ).
        </p>

        <H2>Changes</H2>
        <p>
          If what the site does changes — analytics, advertising, anything new
          that collects something — this page will be updated before that change
          goes live, not after. That is how the newsletter was handled.
        </p>

        <p className="border-t border-rule pt-5 text-sm text-muted">
          Written to describe this site accurately rather than to cover every
          eventuality with boilerplate. It is not legal advice; if GR Wire starts
          carrying advertising or subscriptions, have a lawyer review it. See
          also the <Link href="/terms" className="underline">terms</Link> and{" "}
          <Link href="/about" className="underline">about</Link> pages.
        </p>
      </>
    );
  },
};
