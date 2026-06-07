"use client";

/* Filtry + siatka produktów. Port z prototypu (pages-store.jsx Shop). */

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/data";

type FilterId = "all" | "best" | "light" | "strong";

const FILTERS: Array<[FilterId, string]> = [
  ["all", "Wszystkie"],
  ["best", "Bestsellery"],
  ["light", "Łagodne"],
  ["strong", "Wyraziste"],
];

const LIGHT_IDS = ["rzepakowy", "akacjowy", "wielokwiatowy"];

export function ShopListing() {
  const [filter, setFilter] = useState<FilterId>("all");

  const list = PRODUCTS.filter((p) =>
    filter === "all"
      ? true
      : filter === "best"
        ? p.bestseller
        : filter === "light"
          ? LIGHT_IDS.includes(p.id)
          : !LIGHT_IDS.includes(p.id),
  );

  return (
    <section className="section">
      <div className="wrap">
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 44, flexWrap: "wrap" }}>
          {FILTERS.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              style={{
                padding: "9px 20px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: ".04em",
                border: "1px solid",
                borderColor: filter === id ? "var(--honey)" : "var(--line)",
                background: filter === id ? "var(--honey)" : "transparent",
                color: filter === id ? "#fff" : "var(--ink-soft)",
                transition: "all .18s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 26 }} className="prod-grid">
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 50} />
          ))}
        </div>
      </div>
    </section>
  );
}
