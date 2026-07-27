import Link from "next/link";
import { H2, Ul } from "@/components/Prose";

export const el = {
  title: "Όροι χρήσης",
  intro:
    "Το GR Wire είναι συλλέκτης ειδήσεων. Καταγράφει τίτλους από δημόσιες ροές και παραπέμπει στους οργανισμούς που τους δημοσίευσαν.",
  Body: function TermsEl({ contact }) {
    return (
      <>
        <H2>Τι είναι αυτός ο ιστότοπος</H2>
        <p>
          Το GR Wire συλλέγει τίτλους από δημόσια διαθέσιμες ροές ειδήσεων που
          καλύπτουν την ελληνική οικονομία και τις υποδομές τηλεπικοινωνιών και
          ενέργειας, τους ταξινομεί χρονολογικά και παραπέμπει τον καθένα στην
          πηγή του. Δεν απασχολεί δημοσιογράφους και δεν παράγει δική του
          ειδησεογραφία.
        </p>

        <H2>Πνευματικά δικαιώματα</H2>
        <p>
          Κάθε άρθρο που καταγράφεται εδώ ανήκει στον οργανισμό που το
          δημοσίευσε. Τα πνευματικά δικαιώματα είναι δικά του και δεν θίγονται
          από την εμφάνιση του τίτλου σε αυτόν τον ιστότοπο.
        </p>
        <p>Όσα εμφανίζει το GR Wire για κάθε άρθρο περιορίζονται σκόπιμα σε:</p>
        <Ul>
          <li>τον τίτλο όπως δημοσιεύθηκε</li>
          <li>το όνομα του μέσου</li>
          <li>την ώρα δημοσίευσης</li>
          <li>σύνδεσμο προς το αρχικό άρθρο</li>
          <li>
            για τις πέντε κύριες ειδήσεις, την εικόνα προεπισκόπησης του ίδιου
            του εκδότη, η οποία φορτώνεται από τους διακομιστές του και δεν
            αντιγράφεται
          </li>
        </Ul>
        <p>
          Το κείμενο των άρθρων δεν αναπαράγεται, και οι αναγνώστες
          κατευθύνονται πάντοτε στον εκδότη για να το διαβάσουν.
        </p>

        <H2>Εκδότες: αιτήματα αφαίρεσης</H2>
        <p>
          Αν εκδίδετε κάποια από τις πηγές που καταγράφονται εδώ και θέλετε να
          αφαιρεθεί το υλικό σας, ή να εξαιρεθεί εντελώς η ροή σας, ζητήστε το
          και θα γίνει — άμεσα και χωρίς αντιρρήσεις.
        </p>
        <p>
          {contact ? (
            <>
              Γράψτε στο{" "}
              <a href={`mailto:${contact}`} className="underline">
                {contact}
              </a>{" "}
              προσδιορίζοντας το μέσο και τι θέλετε να αφαιρεθεί.
            </>
          ) : (
            <em>
              Δεν έχει οριστεί ακόμη διεύθυνση επικοινωνίας — δείτε
              src/lib/site.js.
            </em>
          )}
        </p>

        <H2>Ακρίβεια</H2>
        <p>
          Οι τίτλοι αναπαράγονται αυτόματα όπως δημοσιεύθηκαν. Το GR Wire δεν
          τους επαληθεύει, δεν τους διορθώνει και δεν τους προσυπογράφει, ούτε
          μπορεί να εγγυηθεί την ακρίβειά τους — κρίνετε κάθε είδηση από την πηγή
          της και διαβάστε το πρωτότυπο πριν βασιστείτε σε αυτό.
        </p>
        <p>
          Η ταξινόμηση σε κατηγορίες, καθώς και ο χαρακτηρισμός ως τεχνολογία ή
          ειδήσεις, γίνεται με αυτόματη αντιστοίχιση λέξεων-κλειδιών. Η διαδικασία
          δεν είναι τέλεια: ειδήσεις ενίοτε κατατάσσονται σε λάθος κατηγορία ή
          δεν εντοπίζονται καθόλου.
        </p>
        <p>
          Η <Link href="/weekly" className="underline">εβδομαδιαία σελίδα</Link>{" "}
          παρουσιάζει μετρήσεις από τις ειδήσεις που έχουν συλλεχθεί εδώ. Οι
          μετρήσεις αυτές περιγράφουν την κάλυψη αυτού του ιστότοπου και όχι την
          ελληνική αγορά συνολικά· και όπου εμφανίζονται θέματα μαζί, αυτό
          σημαίνει ακριβώς αυτό — συνεμφάνιση, όχι αποδεδειγμένη σχέση μεταξύ
          τους.
        </p>

        <H2>Τίποτα εδώ δεν αποτελεί συμβουλή</H2>
        <p>
          Το GR Wire καλύπτει οικονομικά θέματα και θέματα υποδομών, αλλά δεν
          παρέχει επενδυτικές, χρηματοοικονομικές, νομικές ή άλλες επαγγελματικές
          συμβουλές οποιασδήποτε μορφής. Μην λαμβάνετε αποφάσεις με βάση έναν
          συγκεντρωμένο τίτλο.
        </p>

        <H2>Σύνδεσμοι προς άλλους ιστότοπους</H2>
        <p>
          Οι εξωτερικοί σύνδεσμοι παρέχονται για αναφορά. Οι οργανισμοί πίσω από
          αυτούς είναι ανεξάρτητοι από το GR Wire, και δεν ευθυνόμαστε για το
          περιεχόμενο, τη διαθεσιμότητα ή τις πρακτικές τους.
        </p>

        <H2>Διαθεσιμότητα</H2>
        <p>
          Ο ιστότοπος παρέχεται ως έχει, χωρίς εγγύηση ότι θα είναι διαθέσιμος,
          επίκαιρος ή πλήρης. Οι ροές χαλούν, οι πηγές μπλοκάρουν την
          αυτοματοποιημένη πρόσβαση, και κενά κάλυψης συμβαίνουν.
        </p>

        <p className="border-t border-rule pt-5 text-sm text-muted">
          Οι όροι αυτοί περιγράφουν πώς λειτουργεί πραγματικά ο ιστότοπος, αντί
          να επαναλαμβάνουν τυποποιημένο κείμενο. Δεν αποτελούν νομική συμβουλή.
          Δείτε επίσης το{" "}
          <Link href="/privacy" className="underline">απόρρητο</Link> και τη
          σελίδα <Link href="/about" className="underline">σχετικά</Link>.
        </p>
      </>
    );
  },
};

export const en = {
  title: "Terms of use",
  intro:
    "GR Wire is a news aggregator. It indexes headlines from public feeds and links back to the organisations that reported them.",
  Body: function TermsEn({ contact }) {
    return (
      <>
        <H2>What this site is</H2>
        <p>
          GR Wire collects headlines from publicly available news feeds covering
          Greek finance, telecommunications infrastructure and energy
          infrastructure, sorts them by time, and links each one to its source.
          It does not employ reporters and produces no journalism of its own.
        </p>

        <H2>Copyright</H2>
        <p>
          Every article indexed here belongs to the organisation that published
          it. That copyright is theirs and is not affected by appearing on this
          site.
        </p>
        <p>What GR Wire shows for each article is deliberately limited to:</p>
        <Ul>
          <li>the headline as published</li>
          <li>the name of the publication</li>
          <li>the publication time</li>
          <li>a link to the original article</li>
          <li>
            for the five leading stories, the publisher&rsquo;s own preview
            image, loaded from their servers rather than copied
          </li>
        </Ul>
        <p>
          Article text is not reproduced, and readers are always sent to the
          publisher to read the piece.
        </p>

        <H2>Publishers: removal requests</H2>
        <p>
          If you publish one of the sources indexed here and want your material
          removed, or your feed excluded entirely, ask and it will be done —
          promptly and without argument.
        </p>
        <p>
          {contact ? (
            <>
              Write to{" "}
              <a href={`mailto:${contact}`} className="underline">
                {contact}
              </a>{" "}
              identifying the publication and what you want removed.
            </>
          ) : (
            <em>
              A contact address has not been configured yet — see src/lib/site.js.
            </em>
          )}
        </p>

        <H2>Accuracy</H2>
        <p>
          Headlines are reproduced automatically as published. GR Wire does not
          verify, correct or endorse them, and cannot vouch for their accuracy —
          judge each story by its source, and read the original before relying on
          it.
        </p>
        <p>
          Articles are sorted into categories, and marked as technology or news,
          by automated keyword matching. That process is imperfect: stories are
          sometimes filed under the wrong heading or missed altogether.
        </p>
        <p>
          The <Link href="/weekly" className="underline">weekly page</Link>{" "}
          reports counts taken from the articles collected here. Those counts
          describe this site&rsquo;s own coverage, not the Greek market as a
          whole, and where it shows subjects appearing together it means exactly
          that — co-occurrence, not a demonstrated relationship between them.
        </p>

        <H2>Nothing here is advice</H2>
        <p>
          GR Wire covers financial and infrastructure topics but provides no
          investment, financial, legal or professional advice of any kind. Do not
          make decisions on the basis of an aggregated headline.
        </p>

        <H2>Links to other sites</H2>
        <p>
          Outbound links are provided for reference. The organisations behind
          them are independent of GR Wire, and we are not responsible for their
          content, availability or practices.
        </p>

        <H2>Availability</H2>
        <p>
          The site is provided as-is, with no guarantee that it will be
          available, current or complete. Feeds break, sources block automated
          access, and coverage gaps happen.
        </p>

        <p className="border-t border-rule pt-5 text-sm text-muted">
          These terms describe how the site actually operates rather than
          restating standard boilerplate. They are not legal advice. See also{" "}
          <Link href="/privacy" className="underline">privacy</Link> and{" "}
          <Link href="/about" className="underline">about</Link>.
        </p>
      </>
    );
  },
};
