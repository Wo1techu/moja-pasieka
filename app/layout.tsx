import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { SiteChrome } from "@/components/SiteChrome";
import { RevealManager } from "@/components/Reveal";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "MELLIS — Pasieka rodzinna · Miód prosto z plastra",
    template: "%s · MELLIS",
  },
  description:
    "Niepasteryzowany miód z 50 rodzinnych uli w okolicy Bolimowskiego Parku Krajobrazowego. Sześć odmian, trzy wielkości słoika. Wysyłka i odbiór osobisty.",
  keywords: ["miód", "pasieka", "miód naturalny", "MELLIS", "miód z pasieki", "niepasteryzowany"],
  openGraph: {
    title: "MELLIS — Pasieka rodzinna",
    description: "Miód prosto z plastra, nie z półki. Sześć odmian z jednej pasieki.",
    type: "website",
    locale: "pl_PL",
    siteName: "MELLIS",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <SiteChrome />
          <CartDrawer />
          <RevealManager />
        </CartProvider>
      </body>
    </html>
  );
}
