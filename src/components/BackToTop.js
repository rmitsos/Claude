"use client";

import { useEffect, useState } from "react";
import { t } from "@/lib/i18n";

// Stays hidden until the reader is deep enough to need it — a control
// pinned over the wire permanently is exactly the distraction this site
// avoids, and on a short page (quiet day, broken feed) it would never be
// worth its space.
const SHOW_AFTER_SCREENS = 2;

export default function BackToTop({ lang = "el" }) {
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
      aria-label={t(lang, "control.backToTop")}
      className={`fixed bottom-5 right-5 z-20 rounded-full border border-rule bg-surface/90 px-3 py-2 text-sm text-ink-2 shadow-sm backdrop-blur-sm transition-opacity hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-band ${
 visible ? "opacity-100" : "pointer-events-none opacity-0"
 }`}
    >
      {t(lang, "control.top")}
    </button>
  );
}
