"use client";

import { useEffect } from "react";

/** Auto-expands a <details id="..."> element when the URL hash points to it. */
export default function HashDetailsOpener() {
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const target = document.getElementById(hash);
      if (target instanceof HTMLDetailsElement) {
        target.open = true;
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return null;
}
