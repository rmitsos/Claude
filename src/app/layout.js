import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InfoBar from "@/components/InfoBar";
import BackToTop from "@/components/BackToTop";
import { themeInitScript } from "@/components/ThemeToggle";
import { scheduleRefreshIfStale } from "@/lib/refresh";
import { getLang } from "@/lib/lang";
import { t, locale } from "@/lib/i18n";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "greek"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "GR Wire — Οικονομία, Τηλεπικοινωνίες & Ενέργεια",
  description:
    "Ελληνική οικονομία, υποδομές τηλεπικοινωνιών και ενέργειας — σε μία ροή.",
};

// Allow the background ingest kicked off by scheduleRefreshIfStale enough
// time to fetch every feed; Hobby's ceiling is 60s.
export const maxDuration = 60;

export default async function RootLayout({ children }) {
  scheduleRefreshIfStale();
  const lang = await getLang();

  const bandDate = new Intl.DateTimeFormat(locale(lang), {
    timeZone: "Europe/Athens",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());

  return (
    <html
      lang={lang}
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-ground text-ink">
        {/* Masthead band: the one place saturated colour sits, so the body can
            stay quiet without the page feeling unbranded. */}
        <div className="bg-band text-band-ink">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-1 font-mono text-[10px] uppercase tracking-[0.17em]">
            <span>GR Wire</span>
            <span>{bandDate}</span>
          </div>
        </div>

        <InfoBar lang={lang} />
        {children}

        <footer className="border-t border-rule py-5">
          <div className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-5 gap-y-2 px-4 text-xs text-muted">
            <span>{t(lang, "footer.note")}</span>
            <nav className="flex gap-x-4">
              <Link href="/about" className="underline hover:no-underline">
                {t(lang, "footer.about")}
              </Link>
              <Link href="/privacy" className="underline hover:no-underline">
                {t(lang, "footer.privacy")}
              </Link>
              <Link href="/terms" className="underline hover:no-underline">
                {t(lang, "footer.terms")}
              </Link>
            </nav>
          </div>
        </footer>
        <BackToTop lang={lang} />
      </body>
    </html>
  );
}
