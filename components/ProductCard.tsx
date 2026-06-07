"use client";

/* Karta produktu na listach. Port z prototypu (pages-home.jsx). */

import { useState } from "react";
import Link from "next/link";
import { Jar } from "./Jar";
import { SIZES } from "@/lib/data";
import { formatPLN } from "@/lib/money";
import type { Product } from "@/lib/types";

const PRICE_FROM = `od ${formatPLN(SIZES[0].priceGrosze)}`;

export function ProductCard({
  product,
  delay = 0,
}: {
  product: Product;
  delay?: number;
}) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={`/sklep/${product.id}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="reveal"
      style={{
        background: "var(--paper)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-lg)",
        padding: "28px 22px 22px",
        textAlign: "left",
        transition: "all .25s ease",
        transitionDelay: `${delay}ms`,
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? "var(--shadow-md)" : "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "relative",
          height: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 18,
        }}
      >
        {product.bestseller && (
          <span
            className="chip"
            style={{ position: "absolute", top: 0, left: 0, fontSize: 10, padding: "4px 9px" }}
          >
            Bestseller
          </span>
        )}
        <div
          style={{
            transition: "transform .3s ease",
            transform: hov ? "translateY(-4px) rotate(-2deg)" : "none",
          }}
        >
          <Jar product={product} w={104} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
        <h4 style={{ fontFamily: "var(--serif)", fontSize: 22 }}>{product.name.replace("Miód ", "")}</h4>
        <span
          style={{
            width: 12,
            height: 13,
            background: product.color,
            clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
            flex: "none",
          }}
        />
      </div>
      <p style={{ color: "var(--ink-faint)", fontSize: 13.5, marginTop: 5 }}>{product.tagline}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          paddingTop: 14,
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <span className="price-tag" style={{ fontSize: 15 }}>
          {PRICE_FROM}
        </span>
        <span
          style={{
            fontSize: 12.5,
            color: hov ? "var(--honey-deep)" : "var(--ink-faint)",
            fontWeight: 500,
            letterSpacing: ".04em",
            transition: "color .2s",
          }}
        >
          Wybierz →
        </span>
      </div>
    </Link>
  );
}
