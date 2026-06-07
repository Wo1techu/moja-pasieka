"use client";

/* Reveal-on-scroll — odpowiednik useReveal() z prototypu.
   Mountowany raz w layoucie; przy każdej zmianie trasy ponownie
   obserwuje elementy z klasą .reveal i dodaje .in po wejściu w widok. */

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)"),
    );
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => io.observe(el));

    // bezpiecznik: gdyby IntersectionObserver nie zadziałał, pokaż treść
    const fallback = window.setTimeout(() => {
      els.forEach((el) => el.classList.add("in"));
    }, 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [pathname]);

  return null;
}
