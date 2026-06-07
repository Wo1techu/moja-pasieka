"use client";

/* Szczegóły produktu: wybór wielkości słoika, ilość, dodanie do koszyka.
   Port z prototypu (pages-store.jsx Product). */

import { useState } from "react";
import Link from "next/link";
import { Jar } from "@/components/Jar";
import { Stars } from "@/components/Stars";
import { SIZES } from "@/lib/data";
import { formatPLN } from "@/lib/money";
import { useCart } from "@/lib/cart";
import type { Product, Size } from "@/lib/types";

type MetaIcon = "leaf" | "truck" | "pin";

function Meta({ icon, text }: { icon: MetaIcon; text: string }) {
  const paths: Record<MetaIcon, React.ReactNode> = {
    leaf: <path d="M5 19c0-7 6-12 14-12 0 8-6 13-14 12zM5 19c2-3 5-5 8-6" />,
    truck: (
      <g>
        <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
        <circle cx="7" cy="17" r="1.6" />
        <circle cx="17.5" cy="17" r="1.6" />
      </g>
    ),
    pin: (
      <g>
        <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.4" />
      </g>
    ),
  };
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--honey-deep)"
        strokeWidth="1.5"
        style={{ flex: "none", marginTop: 1 }}
      >
        {paths[icon]}
      </svg>
      <span style={{ fontSize: 14, color: "var(--ink-soft)" }}>{text}</span>
    </div>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart, openCart } = useCart();
  const [size, setSize] = useState<Size>(SIZES[1]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const doAdd = () => {
    addToCart(product.id, size.id, qty);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <div className="wrap" style={{ paddingTop: 28 }}>
        <div style={{ fontSize: 13, color: "var(--ink-faint)", display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link href="/">Start</Link>
          <span>/</span>
          <Link href="/sklep">Sklep</Link>
          <span>/</span>
          <span style={{ color: "var(--ink-soft)" }}>{product.name}</span>
        </div>
      </div>
      <section style={{ padding: "32px 0 80px" }}>
        <div
          className="wrap pdp-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}
        >
          {/* visual */}
          <div
            className="pdp-visual"
            style={{
              position: "sticky",
              top: 100,
              background: "var(--cream-deep)",
              borderRadius: "var(--radius-lg)",
              padding: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 480,
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 280,
                height: 280,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${product.color}33, transparent 70%)`,
              }}
            />
            <div style={{ position: "relative", transform: "scale(1.1)" }}>
              <Jar product={product} w={210} />
            </div>
          </div>

          {/* details */}
          <div>
            {product.bestseller && (
              <div className="chip" style={{ marginBottom: 16 }}>
                Bestseller
              </div>
            )}
            <h1 className="serif-lg" style={{ fontSize: "clamp(36px,4vw,52px)" }}>
              {product.name}
            </h1>
            <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 22, color: "var(--honey-deep)", marginTop: 8 }}>
              {product.tagline}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
              <Stars n={5} size={15} />
              <span style={{ fontSize: 13.5, color: "var(--ink-faint)" }}>Zbiór: {product.season}</span>
            </div>
            <p style={{ fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.7, marginTop: 22, maxWidth: 480 }}>
              {product.short}
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
              {product.notes.map((n, i) => (
                <span
                  key={i}
                  className="chip"
                  style={{ background: "transparent", border: "1px solid var(--line)", color: "var(--ink-soft)" }}
                >
                  {n}
                </span>
              ))}
            </div>

            <div className="rule" style={{ margin: "32px 0" }} />

            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "var(--ink-soft)",
                marginBottom: 12,
              }}
            >
              Wielkość słoika
            </div>
            <div className="pdp-sizes" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s)}
                  style={{
                    border: "1px solid",
                    borderColor: size.id === s.id ? "var(--honey)" : "var(--line)",
                    background: size.id === s.id ? "var(--amber-wash)" : "var(--paper)",
                    borderRadius: "var(--radius)",
                    padding: "14px 12px",
                    textAlign: "center",
                    transition: "all .16s",
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 14.5, color: "var(--ink)" }}>{s.label}</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-faint)", margin: "3px 0 6px" }}>{s.weight}</div>
                  <div className="price-tag" style={{ fontSize: 16, color: "var(--honey-deep)" }}>
                    {formatPLN(s.priceGrosze)}
                  </div>
                </button>
              ))}
            </div>

            <div className="pdp-actions" style={{ display: "flex", gap: 12, marginTop: 24, alignItems: "stretch" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius)",
                  background: "var(--paper)",
                }}
              >
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{ padding: "0 16px", fontSize: 20, color: "var(--ink-soft)", height: "100%" }}
                  aria-label="Mniej"
                >
                  −
                </button>
                <span style={{ minWidth: 34, textAlign: "center", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  style={{ padding: "0 16px", fontSize: 20, color: "var(--ink-soft)", height: "100%" }}
                  aria-label="Więcej"
                >
                  +
                </button>
              </div>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={doAdd}>
                {added ? "✓ Dodano do koszyka" : `Do koszyka · ${formatPLN(size.priceGrosze * qty)}`}
              </button>
            </div>

            <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 12 }}>
              <Meta icon="leaf" text="Niepasteryzowany, wirowany na zimno — pełnia enzymów i pyłków." />
              <Meta icon="truck" text="Wysyłka 1–2 dni roboczych. Darmowa dostawa od 150 zł." />
              <Meta icon="pin" text="Możliwy bezpłatny odbiór osobisty z pasieki." />
            </div>
            <div
              style={{
                marginTop: 26,
                padding: 18,
                background: "var(--amber-wash)",
                borderRadius: "var(--radius)",
                display: "flex",
                gap: 14,
                alignItems: "center",
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 40,
                  background: product.color,
                  clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
                  flex: "none",
                }}
              />
              <div>
                <div style={{ fontWeight: 500, fontSize: 14.5 }}>Najlepiej smakuje z:</div>
                <div style={{ fontSize: 14, color: "var(--ink-soft)" }}>{product.pairing}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
