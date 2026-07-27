"use client";

import { useEffect, useState } from "react";

export const THEME_KEY = "grwire-theme";

// Runs in <head> before the first paint. Without it, a reader who chose Paper
// would see a flash of Terminal on every navigation — the choice is stored in
// the browser, so nothing on the server knows about it in time.
export const themeInitScript = `
try {
  var t = localStorage.getItem('${THEME_KEY}');
  document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : 'dark');
} catch (e) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
`;

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  // The attribute is already correct by now (set by the script above); this
  // only syncs React's copy so the label matches what the reader is seeing.
  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "dark");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private browsing can refuse storage. The switch still works for this
      // page view; it just won't be remembered, which beats failing outright.
    }
  }

  const goingTo = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${goingTo} theme`}
      title={`Switch to ${goingTo} theme`}
      className="rounded-sm border border-rule px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-band hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-band"
    >
      {theme === "dark" ? "☀ Light" : "☾ Dark"}
    </button>
  );
}
