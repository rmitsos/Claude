"use client";

import { useEffect, useState } from "react";

// Stays hidden until the reader is deep enough to need it — a control
// pinned over the wire permanently is exactly the distraction this site
// avoids, and on a short page (quiet day, broken feed) it would never be
// worth its space.
const SHOW_AFTER_SCREENS = 2;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * SHOW_AFTER_SCREENS);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-20 rounded-full border border-gray-300 bg-white/90 px-3 py-2 text-sm text-gray-600 shadow-sm backdrop-blur-sm transition-opacity hover:text-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 dark:border-gray-700 dark:bg-gray-900/90 dark:text-gray-300 dark:hover:text-white ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      ↑ Top
    </button>
  );
}
