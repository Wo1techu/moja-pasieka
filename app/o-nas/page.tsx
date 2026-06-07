import type { Metadata } from "next";
import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { FaqList } from "@/components/about/FaqList";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "O nas — rodzinna pasieka",
  description:
    "Od ponad piętnastu lat prowadzimy rodzinną pasiekę wśród łąk Bolimowskiego Parku Krajobrazowego. Bez pośpiechu, bez sztuczek — niepasteryzowany miód prosto z plastra.",
};

type ContactIcon = "phone" | "mail" | "pin";

function ContactRow({ icon, label, href }: { icon: ContactIcon; label: string; href?: string }) {
  const paths: Record<ContactIcon, React.ReactNode> = {
    phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
    mail: (
      <g>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </g>
    ),
    pin: (
      <g>
        <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.4" />
      </g>
    ),
  };
  const inner = (
    <span style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--cream)" }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--honey-glow)" strokeWidth="1.6">
        {paths[icon]}
      </svg>
      <span style={{ fontSize: 15.5 }}>{label}</span>
    </span>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}

export default function AboutPage() {
  const C = COMPANY;
  const years = new Date().getFullYear() - Number(C.estd);
  return (
    <div>
      <section style={{ background: "var(--ink)", color: "var(--cream)" }}>
        <div
          className="wrap story-grid"
          style={{ padding: "88px 32px 80px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56, alignItems: "center" }}
        >
          <div>
            <div className="eyebrow" style={{ color: "var(--honey-glow)" }}>
              Pasieka rodzinna · od {C.estd}
            </div>
            <h1 className="serif-xl" style={{ color: "var(--cream)", fontSize: "clamp(40px,5.5vw,82px)", marginTop: 16 }}>
              Pszczoły uczą cierpliwości
            </h1>
            <p style={{ fontSize: 18.5, color: "rgba(250,245,234,.74)", marginTop: 22, maxWidth: 480, lineHeight: 1.7 }}>
              Od ponad piętnastu lat prowadzimy pasiekę wśród łąk i lasów Bolimowskiego Parku Krajobrazowego. Bez pośpiechu, bez sztuczek — tak, jak robili to nasi dziadkowie.
            </p>
          </div>
          <Placeholder
            label="zdjęcie · pszczelarz w welonie przy ulu"
            dark
            style={{ aspectRatio: "4/5", borderRadius: "var(--radius-lg)" }}
          />
        </div>
      </section>

      <section className="section-sm" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="wrap stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, textAlign: "center" }}>
          {([
            [`${C.hives}`, "rodzin pszczelich"],
            [`${years}+`, "lat doświadczenia"],
            ["6", "odmian miodu"],
            ["0", "sztucznych dodatków"],
          ] as Array<[string, string]>).map(([n, l], i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="serif-lg" style={{ color: "var(--honey-deep)" }}>
                {n}
              </div>
              <div style={{ fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-faint)", marginTop: 6 }}>
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 56px" }}>
            <div className="eyebrow reveal">Jak pracujemy</div>
            <h2 className="serif-lg reveal" style={{ marginTop: 12 }}>
              Od kwiatu do słoika
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40 }} className="prod-grid">
            {([
              ["01", "Łąki bez chemii", "Ule stoją z dala od upraw przemysłowych — wśród dziko kwitnących łąk parku krajobrazowego."],
              ["02", "Wirowanie na zimno", "Miód odbieramy dojrzały i wirujemy bez podgrzewania, by zachować enzymy i pyłki."],
              ["03", "Pakowanie ręczne", "Każdy słoik napełniamy, etykietujemy i sprawdzamy własnoręcznie. Znamy historię każdej partii."],
            ] as Array<[string, string, string]>).map(([n, t, d], i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="serif-lg" style={{ color: "var(--line)", fontSize: 56 }}>
                  {n}
                </div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 26, marginTop: 8 }}>{t}</h3>
                <p style={{ color: "var(--ink-soft)", fontSize: 15.5, marginTop: 10, lineHeight: 1.7 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-deep)" }}>
        <div className="wrap-narrow" style={{ textAlign: "center" }}>
          <span className="hex reveal" style={{ width: 22, height: 25, margin: "0 auto 24px" }} />
          <p className="serif-lg reveal" style={{ fontWeight: 400, fontStyle: "italic", lineHeight: 1.35 }}>
            „Nie sprzedajemy miodu, który sami nie postawilibyśmy na własnym stole.”
          </p>
          <div className="reveal" style={{ marginTop: 22, fontSize: 14, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
            Rodzina · Pasieka MELLIS
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap story-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
          <div className="reveal">
            <div className="eyebrow">Pytania</div>
            <h2 className="serif-md" style={{ marginTop: 12, marginBottom: 22 }}>
              Najczęściej pytacie
            </h2>
            <FaqList />
          </div>
          <div className="reveal" style={{ background: "var(--ink)", color: "var(--cream)", borderRadius: "var(--radius-lg)", padding: 40 }}>
            <div className="eyebrow" style={{ color: "var(--honey-glow)" }}>
              Odbiór i kontakt
            </div>
            <h3 className="serif-md" style={{ color: "var(--cream)", marginTop: 12 }}>
              Zapraszamy do pasieki
            </h3>
            <p style={{ color: "rgba(250,245,234,.7)", marginTop: 14, lineHeight: 1.7 }}>
              Po wcześniejszym umówieniu można odebrać miód osobiście i zobaczyć, jak pracujemy. Zadzwoń lub napisz.
            </p>
            <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 14 }}>
              <ContactRow icon="phone" label={C.phone} href={`tel:${C.phone}`} />
              <ContactRow icon="mail" label={C.email} href={`mailto:${C.email}`} />
              <ContactRow icon="pin" label={C.region} />
            </div>
            <Link className="btn btn-primary" style={{ marginTop: 28 }} href="/sklep">
              Zamów miód online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
