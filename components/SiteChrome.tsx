"use client";

/* Dolna część strony: newsletter (ukryty w kasie) + stopka.
   Odpowiada logice z prototypu (app.jsx: hideChrome dla checkoutu). */

import { usePathname } from "next/navigation";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";

export function SiteChrome() {
  const pathname = usePathname();
  const hideNewsletter = pathname.startsWith("/zamowienie");
  return (
    <>
      {!hideNewsletter && <Newsletter />}
      <Footer />
    </>
  );
}
