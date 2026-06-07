/* Stopka. Port z prototypu — nawigacja przez next/link. */

import Link from "next/link";
import { Logo } from "./Logo";
import { COMPANY } from "@/lib/data";

function FootCol({
  title,
  links,
}: {
  title: string;
  links: Array<[string, string]>;
}) {
  return (
    <div>
      <h4
        style={{
          fontFamily: "var(--sans)",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "var(--ink-faint)",
          marginBottom: 16,
        }}
      >
        {title}
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: 14.5, color: "var(--ink-soft)" }}>
        {links.map(([href, label], i) => (
          <Link key={i} href={href} style={{ textAlign: "left" }}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  const C = COMPANY;
  return (
    <footer style={{ background: "var(--cream-deep)", borderTop: "1px solid var(--line)" }}>
      <div className="wrap" style={{ padding: "64px 32px 40px" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 40 }}
          className="foot-grid"
        >
          <div>
            <Logo size={26} />
            <p style={{ color: "var(--ink-soft)", marginTop: 18, maxWidth: 280, fontSize: 14.5 }}>
              Rodzinna pasieka 50 uli w okolicy Bolimowskiego Parku Krajobrazowego. Miód prosto z plastra od {C.estd} roku.
            </p>
            <div className="chip" style={{ marginTop: 18 }}>
              <span className="hex" style={{ width: 10, height: 11 }} /> 100% naturalny · niepasteryzowany
            </div>
          </div>
          <FootCol
            title="Sklep"
            links={[
              ["/sklep", "Wszystkie miody"],
              ["/sklep", "Bestsellery"],
              ["/o-nas", "Odbiór osobisty"],
            ]}
          />
          <FootCol
            title="Pasieka"
            links={[
              ["/o-nas", "O nas"],
              ["/galeria", "Galeria"],
              ["/dziennik", "Dziennik"],
            ]}
          />
          <div>
            <h4
              style={{
                fontFamily: "var(--sans)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                marginBottom: 16,
              }}
            >
              Kontakt
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14.5, color: "var(--ink-soft)" }}>
              <a href={`tel:${C.phone}`}>{C.phone}</a>
              <a href={`mailto:${C.email}`}>{C.email}</a>
              <span>{C.region}</span>
            </div>
          </div>
        </div>
        <div className="rule" style={{ margin: "40px 0 22px" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 13,
            color: "var(--ink-faint)",
          }}
        >
          <span>© {new Date().getFullYear()} MELLIS · Pasieka rodzinna</span>
          <span style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px" }}>
            {/* TODO: docelowo realne strony (treść do ustalenia z prawnikiem) */}
            <a href="#">Regulamin</a>
            <a href="#">Polityka prywatności</a>
            <a href="#">Dostawa i zwroty</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
