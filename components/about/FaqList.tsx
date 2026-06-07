"use client";

/* Akordeon FAQ. Port z prototypu (pages-content.jsx FAQList). */

import { useState } from "react";
import { FAQ } from "@/lib/data";

export function FaqList() {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQ.map((f, i) => (
        <div key={i} style={{ borderBottom: "1px solid var(--line)" }}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              textAlign: "left",
              padding: "18px 0",
              gap: 16,
            }}
            aria-expanded={open === i}
          >
            <span style={{ fontFamily: "var(--serif)", fontSize: 20 }}>{f.q}</span>
            <span
              style={{
                fontSize: 22,
                color: "var(--honey)",
                transition: "transform .2s",
                transform: open === i ? "rotate(45deg)" : "none",
                flex: "none",
              }}
            >
              +
            </span>
          </button>
          <div style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height .3s ease" }}>
            <p style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.65, paddingBottom: 18 }}>{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
