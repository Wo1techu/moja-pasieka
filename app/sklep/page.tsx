import type { Metadata } from "next";
import { ShopListing } from "@/components/shop/ShopListing";

export const metadata: Metadata = {
  title: "Sklep — nasze miody",
  description:
    "Sześć odmian miodu z jednej rodzinnej pasieki. Każda dostępna w trzech wielkościach słoika — od 250 do 900 gramów.",
};

export default function ShopPage() {
  const year = new Date().getFullYear();
  return (
    <div>
      <section style={{ background: "var(--cream-deep)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: "64px 32px 56px", textAlign: "center" }}>
          <div className="eyebrow">Sklep · zbiory {year}</div>
          <h1 className="serif-xl" style={{ fontSize: "clamp(40px,5.5vw,76px)", marginTop: 14 }}>
            Nasze miody
          </h1>
          <p style={{ color: "var(--ink-soft)", fontSize: 17, maxWidth: 540, margin: "18px auto 0" }}>
            Sześć odmian z jednej pasieki. Każda dostępna w trzech wielkościach słoika — od 250 do 900 gramów.
          </p>
        </div>
      </section>
      <ShopListing />
    </div>
  );
}
