import "./globals.css";

export const metadata = {
  title: "FX signals",
  description: "Daily FX position signals. Places no trades.",
  // Belt and braces alongside robots.js and the access gate in proxy.js.
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
