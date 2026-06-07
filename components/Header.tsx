"use client";

/* Nagłówek z nawigacją i koszykiem. Port z prototypu (components.jsx),
   nawigacja przez next/link, stan koszyka z kontekstu. */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart";

const NAV: Array<[string, string]> = [
  ["/sklep", "Sklep"],
  ["/o-nas", "O nas"],
  ["/galeria", "Galeria"],
  ["/dziennik", "Dziennik"],
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // zamknij menu mobilne przy zmianie trasy
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(250,245,234,.86)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "all .3s ease",
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 76,
        }}
      >
        <Link href="/" aria-label="MELLIS — strona główna">
          <Logo size={24} />
        </Link>
        <nav style={{ display: "flex", gap: 4, alignItems: "center" }} className="nav-desktop">
          {NAV.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: 13.5,
                fontWeight: 500,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                padding: "9px 16px",
                color: isActive(href) ? "var(--honey-deep)" : "var(--ink-soft)",
                borderBottom: isActive(href)
                  ? "1.5px solid var(--honey)"
                  : "1.5px solid transparent",
                transition: "color .18s",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={openCart}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 8px",
              color: "var(--ink)",
            }}
            aria-label="Koszyk"
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 7h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7z" />
              <path d="M8.5 7V6a3.5 3.5 0 0 1 7 0v1" />
            </svg>
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  right: -2,
                  minWidth: 17,
                  height: 17,
                  padding: "0 4px",
                  borderRadius: 10,
                  background: "var(--honey)",
                  color: "#fff",
                  fontSize: 10.5,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="nav-burger"
            onClick={() => setOpen(!open)}
            style={{ display: "none", padding: 8, color: "var(--ink)" }}
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div style={{ borderTop: "1px solid var(--line)", background: "var(--cream)" }}>
          {NAV.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "15px 20px",
                fontSize: 15,
                fontWeight: 500,
                borderBottom: "1px solid var(--line-soft)",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
