import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-gray-50">
        <Nav />
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-200 dark:border-gray-800 py-6">
          <p className="max-w-5xl mx-auto px-4 text-xs text-gray-500 dark:text-gray-400">
            GR Wire aggregates headlines from Greek news sources with links back
            to the original publisher. See{" "}
            <a
              href="https://github.com/rmitsos/Claude/blob/main/sources/greek-news-sources.md"
              className="underline"
            >
              sources
            </a>
            .
          </p>
        </footer>
      </body>
    </html>
  );
}
