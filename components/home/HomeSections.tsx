/* ============================================================
   MELLIS — sekcje strony głównej
   Port z prototypu (pages-home.jsx). Wariant hero: edytorialny.
   Nawigacja przez next/link. Komponenty prezentacyjne (Jar/Stars/
   Placeholder) są współdzielone; ProductCard jest kliencki.
   ============================================================ */

import Link from "next/link";
import { Jar } from "@/components/Jar";
import { Stars } from "@/components/Stars";
import { Placeholder } from "@/components/Placeholder";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, REVIEWS, JOURNAL, COMPANY } from "@/lib/data";

const CO = COMPANY;
const yearsTradition = new Date().getFullYear() - Number(CO.estd);

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="serif-md" style={{ color: "var(--honey-deep)", lineHeight: 1 }}>
        {n}
      </div>
      <div
        style={{
          fontSize: 12.5,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "var(--ink-faint)",
          marginTop: 6,
        }}
      >
        {l}
      </div>
    </div>
  );
}

export function HeroEditorial() {
  const feat = PRODUCTS.filter((p) => p.bestseller).slice(0, 3);
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div
        className="wrap hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr .95fr",
          gap: 40,
          alignItems: "center",
          minHeight: "calc(100vh - 76px)",
          padding: "40px 32px 60px",
        }}
      >
        <div className="hero-copy">
          <div className="chip" style={{ marginBottom: 26 }}>
            <span className="hex" style={{ width: 10, height: 11 }} /> Pasieka rodzinna · od {CO.estd}
          </div>
          <h1 className="serif-xl" style={{ maxWidth: 640 }}>
            Miód prosto
            <br />
            z plastra,
            <br />
            <em style={{ fontStyle: "italic", color: "var(--honey-deep)" }}>nie z półki.</em>
          </h1>
          <p style={{ fontSize: 18, color: "var(--ink-soft)", maxWidth: 440, marginTop: 26, lineHeight: 1.65 }}>
            Pięćdziesiąt uli wśród łąk Bolimowskiego Parku Krajobrazowego. Niepasteryzowany, wirowany na zimno, z tym samym smakiem od pokoleń.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
            <Link className="btn btn-primary" href="/sklep">
              Do sklepu
            </Link>
            <Link className="btn btn-ghost" href="/o-nas">
              Poznaj pasiekę
            </Link>
          </div>
          <div style={{ display: "flex", gap: 30, marginTop: 46, flexWrap: "wrap" }}>
            <Stat n="50" l="uli w pasiece" />
            <Stat n={`${yearsTradition}+`} l="lat tradycji" />
            <Stat n="6" l="odmian miodu" />
          </div>
        </div>
        <div
          style={{
            position: "relative",
            height: "100%",
            minHeight: 460,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "78%",
              height: "82%",
              background: "var(--amber-wash)",
              borderRadius: 200,
              filter: "blur(2px)",
            }}
          />
          <div className="hero-jars" style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 18, paddingBottom: 10 }}>
            <Jar product={feat[0]} w={120} />
            <Jar product={feat[1]} w={158} />
            <Jar product={feat[2]} w={120} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ValuesStrip() {
  const items: Array<[string, string]> = [
    ["Niepasteryzowany", "Nigdy nie podgrzewamy powyżej temperatury ula."],
    ["Wirowany na zimno", "Pełnia enzymów, pyłków i aromatu w każdym słoiku."],
    ["Prosto od pszczelarza", "Bez pośredników. Pakujemy własnoręcznie."],
    ["Odbiór z pasieki", "Zapraszamy po miód osobiście — i na rozmowę."],
  ];
  return (
    <section className="section-sm" style={{ borderBottom: "1px solid var(--line)" }}>
      <div className="wrap values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28 }}>
        {items.map(([t, d], i) => (
          <div key={i} className="reveal" style={{ transitionDelay: `${i * 70}ms` }}>
            <span className="hex" style={{ width: 14, height: 16 }} />
            <h4 style={{ fontFamily: "var(--serif)", fontSize: 22, marginTop: 14 }}>{t}</h4>
            <p style={{ color: "var(--ink-soft)", fontSize: 14.5, marginTop: 8 }}>{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Bestsellers() {
  return (
    <section className="section">
      <div className="wrap">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 44,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div className="eyebrow reveal">Najczęściej wybierane</div>
            <h2 className="serif-lg reveal" style={{ marginTop: 12 }}>
              Bestsellery z pasieki
            </h2>
          </div>
          <Link className="btn btn-ghost btn-sm reveal" href="/sklep">
            Zobacz wszystkie →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }} className="prod-grid">
          {PRODUCTS.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function StoryTeaser() {
  return (
    <section className="section" style={{ background: "var(--cream-deep)" }}>
      <div
        className="wrap story-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 56, alignItems: "center" }}
      >
        <Placeholder
          label="zdjęcie · pszczelarz przy ulu, rodzina"
          className="reveal"
          style={{ aspectRatio: "4/5", borderRadius: "var(--radius-lg)" }}
        />
        <div className="reveal">
          <div className="eyebrow">Nasza historia</div>
          <h2 className="serif-lg" style={{ marginTop: 14, maxWidth: 460 }}>
            Rodzinna pasieka, która nie idzie na skróty
          </h2>
          <p style={{ color: "var(--ink-soft)", fontSize: 16.5, marginTop: 20, lineHeight: 1.7, maxWidth: 460 }}>
            Zaczęło się od kilku uli i pasji. Dziś prowadzimy 50 rodzin pszczelich wśród łąk i lasów Bolimowskiego Parku Krajobrazowego — w tym samym miejscu, tymi samymi metodami, z tym samym szacunkiem do pszczół.
          </p>
          <p style={{ color: "var(--ink-soft)", fontSize: 16.5, marginTop: 16, lineHeight: 1.7, maxWidth: 460 }}>
            Każdy słoik wirujemy, odstajemy i zamykamy własnymi rękami. Bez pasteryzacji, bez pośredników, bez kompromisów.
          </p>
          <Link className="btn btn-dark" style={{ marginTop: 30 }} href="/o-nas">
            Poznaj pasiekę
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <section className="section">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="eyebrow reveal">Opinie</div>
          <h2 className="serif-lg reveal" style={{ marginTop: 12 }}>
            Co mówią nasi klienci
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22 }} className="rev-grid">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-lg)",
                padding: 26,
                transitionDelay: `${i * 60}ms`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stars n={r.rating} />
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 19,
                  lineHeight: 1.45,
                  marginTop: 16,
                  color: "var(--ink)",
                  flex: 1,
                }}
              >
                „{r.text}”
              </p>
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--line-soft)" }}>
                <div style={{ fontWeight: 500, fontSize: 14.5 }}>{r.name}</div>
                <div style={{ fontSize: 13, color: "var(--ink-faint)" }}>
                  {r.city} · {r.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JournalTeaser() {
  return (
    <section className="section" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="wrap">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 40,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div className="eyebrow reveal">Dziennik pasieki</div>
            <h2 className="serif-lg reveal" style={{ marginTop: 12 }}>
              Wiedza prosto z ula
            </h2>
          </div>
          <Link className="btn btn-ghost btn-sm reveal" href="/dziennik">
            Wszystkie wpisy →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="jrn-grid">
          {JOURNAL.map((a, i) => (
            <Link
              key={a.id}
              href={`/dziennik/${a.id}`}
              className="reveal"
              style={{ textAlign: "left", transitionDelay: `${i * 60}ms` }}
            >
              <Placeholder
                label={`zdjęcie · ${a.kicker.toLowerCase()}`}
                style={{ aspectRatio: "3/2", borderRadius: "var(--radius-lg)", marginBottom: 16 }}
              />
              <div className="eyebrow muted" style={{ fontSize: 10.5 }}>
                {a.kicker} · {a.read}
              </div>
              <h4 style={{ fontFamily: "var(--serif)", fontSize: 23, marginTop: 10, lineHeight: 1.2 }}>{a.title}</h4>
              <p style={{ color: "var(--ink-soft)", fontSize: 14.5, marginTop: 8 }}>{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
