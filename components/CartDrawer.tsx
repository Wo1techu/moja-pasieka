"use client";

/* Wysuwany koszyk. Port z prototypu (pages-store.jsx CartDrawer),
   stan z kontekstu useCart, nawigacja przez next/router. */

import { useRouter } from "next/navigation";
import { Jar } from "./Jar";
import { useCart } from "@/lib/cart";
import { formatPLN } from "@/lib/money";
import { FREE_SHIPPING_THRESHOLD_GROSZE } from "@/lib/data";

export function CartDrawer() {
  const router = useRouter();
  const { lines, subtotalGrosze, setQty, removeItem, cartOpen, closeCart, cartCount } = useCart();

  const goTo = (href: string) => {
    closeCart();
    router.push(href);
  };

  return (
    <>
      <div
        onClick={closeCart}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(42,32,20,.4)",
          zIndex: 90,
          opacity: cartOpen ? 1 : 0,
          pointerEvents: cartOpen ? "auto" : "none",
          transition: "opacity .3s",
        }}
      />
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(440px, 92vw)",
          background: "var(--cream)",
          zIndex: 91,
          boxShadow: "var(--shadow-lg)",
          transform: cartOpen ? "none" : "translateX(100%)",
          transition: "transform .34s cubic-bezier(.2,.7,.3,1)",
          display: "flex",
          flexDirection: "column",
        }}
        aria-hidden={!cartOpen}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "22px 26px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <h3 style={{ fontFamily: "var(--serif)", fontSize: 26 }}>
            Koszyk{" "}
            {cartCount > 0 && (
              <span style={{ color: "var(--ink-faint)", fontSize: 18 }}>· {cartCount}</span>
            )}
          </h3>
          <button onClick={closeCart} aria-label="Zamknij" style={{ padding: 6, color: "var(--ink-soft)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 40,
              textAlign: "center",
              gap: 18,
            }}
          >
            <span className="hex" style={{ width: 30, height: 34, opacity: 0.4 }} />
            <p style={{ color: "var(--ink-faint)", fontSize: 16 }}>Twój koszyk jest pusty.</p>
            <button className="btn btn-primary btn-sm" onClick={() => goTo("/sklep")}>
              Wybierz miód
            </button>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: "8px 26px" }}>
              {lines.map((it) => (
                <div
                  key={it.key}
                  style={{ display: "flex", gap: 14, padding: "20px 0", borderBottom: "1px solid var(--line-soft)" }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 78,
                      background: "var(--cream-deep)",
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "none",
                    }}
                  >
                    <Jar product={it.product} w={40} label={false} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <div style={{ fontFamily: "var(--serif)", fontSize: 18 }}>
                        {it.product.name.replace("Miód ", "")}
                      </div>
                      <button
                        onClick={() => removeItem(it.key)}
                        style={{ color: "var(--ink-faint)", fontSize: 12 }}
                        aria-label="Usuń"
                      >
                        ✕
                      </button>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--ink-faint)" }}>
                      {it.size.label} · {it.size.weight}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid var(--line)",
                          borderRadius: "var(--radius)",
                        }}
                      >
                        <button
                          onClick={() => setQty(it.key, it.qty - 1)}
                          style={{ padding: "4px 11px", color: "var(--ink-soft)" }}
                          aria-label="Mniej"
                        >
                          −
                        </button>
                        <span style={{ minWidth: 22, textAlign: "center", fontSize: 14, fontWeight: 600 }}>
                          {it.qty}
                        </span>
                        <button
                          onClick={() => setQty(it.key, it.qty + 1)}
                          style={{ padding: "4px 11px", color: "var(--ink-soft)" }}
                          aria-label="Więcej"
                        >
                          +
                        </button>
                      </div>
                      <span className="price-tag" style={{ fontSize: 15 }}>
                        {formatPLN(it.lineTotalGrosze)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid var(--line)", padding: 26 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                  fontSize: 14,
                  color: "var(--ink-soft)",
                }}
              >
                <span>Wartość produktów</span>
                <span className="price-tag">{formatPLN(subtotalGrosze)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 16,
                  fontSize: 13,
                  color: "var(--ink-faint)",
                }}
              >
                <span>Dostawa</span>
                <span>
                  {subtotalGrosze >= FREE_SHIPPING_THRESHOLD_GROSZE
                    ? "gratis"
                    : "liczona w kroku dostawy"}
                </span>
              </div>
              <button className="btn btn-primary btn-block" onClick={() => goTo("/zamowienie")}>
                Przejdź do kasy
              </button>
              <button
                className="btn btn-ghost btn-block btn-sm"
                style={{ marginTop: 10 }}
                onClick={() => goTo("/sklep")}
              >
                Kontynuuj zakupy
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
