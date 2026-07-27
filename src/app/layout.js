import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InfoBar from "@/components/InfoBar";
import { scheduleRefreshIfStale } from "@/lib/refresh";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "greek"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GR Wire — Greek Finance, Telco & Energy Infrastructure",
  description:
    "Greek finance, telecom infrastructure & energy infrastructure news, in one feed.",
};

// Allow the background ingest kicked off by scheduleRefreshIfStale enough
// time to fetch every feed; Hobby's ceiling is 60s.
export const maxDuration = 60;

export default function RootLayout({ children }) {
  scheduleRefreshIfStale();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-gray-50">
        <InfoBar />
        {children}
        <footer className="border-t border-gray-200 py-5 dark:border-gray-800">
          <div className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-5 gap-y-2 px-4 text-xs text-gray-500 dark:text-gray-400">
            <span>
              GR Wire links to the original publisher for every headline.
            </span>
            <nav className="flex gap-x-4">
              <Link href="/about" className="underline hover:no-underline">
                About
              </Link>
              <Link href="/privacy" className="underline hover:no-underline">
                Privacy
              </Link>
              <Link href="/terms" className="underline hover:no-underline">
                Terms
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
