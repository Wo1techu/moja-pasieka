/* Słoik miodu rysowany w CSS — premium product visual.
   Przeniesiony 1:1 z prototypu (components.jsx). */

import type { Product } from "@/lib/types";

/** Rozjaśnij/przyciemnij kolor hex o podany procent (-ciemniej / +jaśniej). */
export function shade(hex: string, pct: number): string {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255;
  let g = (n >> 8) & 255;
  let b = n & 255;
  const f = pct / 100;
  r = Math.round(r + (f < 0 ? r : 255 - r) * f);
  g = Math.round(g + (f < 0 ? g : 255 - g) * f);
  b = Math.round(b + (f < 0 ? b : 255 - b) * f);
  return `rgb(${r},${g},${b})`;
}

export function Jar({
  product,
  w = 132,
  label = true,
}: {
  product: Product;
  w?: number;
  label?: boolean;
}) {
  const c = product.color;
  const h = w * 1.5;
  return (
    <div
      style={{
        width: w,
        height: h,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        filter: "drop-shadow(0 14px 22px rgba(42,32,20,.18))",
      }}
    >
      {/* lid */}
      <div
        style={{
          width: w * 0.62,
          height: h * 0.11,
          background: "linear-gradient(180deg,#3a2c1a,#2a2014)",
          borderRadius: `${w * 0.05}px ${w * 0.05}px 3px 3px`,
          position: "relative",
          zIndex: 3,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -2,
            height: h * 0.028,
            background: "#241a0f",
            borderRadius: 2,
          }}
        />
      </div>
      {/* neck */}
      <div
        style={{
          width: w * 0.7,
          height: h * 0.05,
          background: "linear-gradient(90deg,rgba(255,255,255,.25),rgba(255,255,255,.04))",
          backgroundColor: c,
          marginTop: 2,
          borderRadius: "3px 3px 0 0",
          zIndex: 1,
        }}
      />
      {/* body */}
      <div
        style={{
          width: w,
          height: h * 0.78,
          borderRadius: `${w * 0.16}px ${w * 0.16}px ${w * 0.1}px ${w * 0.1}px`,
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(180deg, ${c} 0%, ${shade(c, -14)} 100%)`,
        }}
      >
        {/* glass highlight */}
        <div
          style={{
            position: "absolute",
            top: "6%",
            left: "12%",
            width: "18%",
            height: "80%",
            borderRadius: "40%",
            background: "linear-gradient(180deg,rgba(255,255,255,.45),rgba(255,255,255,0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "6%",
            right: "9%",
            width: "8%",
            height: "60%",
            borderRadius: "40%",
            background: "linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,0))",
          }}
        />
        {/* label */}
        {label && (
          <div
            style={{
              position: "absolute",
              left: "11%",
              right: "11%",
              top: "30%",
              bottom: "12%",
              background: "var(--paper)",
              borderRadius: 3,
              boxShadow: "0 2px 6px rgba(0,0,0,.12)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: w * 0.03,
              border: "1px solid rgba(168,99,26,.2)",
              padding: 6,
              textAlign: "center",
            }}
          >
            <span
              style={{
                width: w * 0.11,
                height: w * 0.12,
                background: c,
                clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--serif)",
                fontWeight: 600,
                fontSize: w * 0.115,
                letterSpacing: ".14em",
                color: "var(--ink)",
                lineHeight: 1,
              }}
            >
              MELLIS
            </span>
            <span
              style={{
                fontFamily: "var(--sans)",
                fontWeight: 500,
                fontSize: w * 0.07,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                lineHeight: 1.2,
              }}
            >
              {product.name.replace("Miód ", "")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
