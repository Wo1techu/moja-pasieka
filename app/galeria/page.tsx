import type { Metadata } from "next";
import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { GALLERY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Galeria — z życia pasieki",
  description: "Łąki, ule i ludzie, którzy stoją za każdym słoikiem miodu MELLIS.",
};

export default function GalleryPage() {
  return (
    <div>
      <section style={{ background: "var(--cream-deep)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: "64px 32px 56px", textAlign: "center" }}>
          <div className="eyebrow">Galeria</div>
          <h1 className="serif-xl" style={{ fontSize: "clamp(40px,5.5vw,76px)", marginTop: 14 }}>
            Z życia pasieki
          </h1>
          <p style={{ color: "var(--ink-soft)", fontSize: 17, maxWidth: 520, margin: "18px auto 0" }}>
            Łąki, ule i ludzie, którzy stoją za każdym słoikiem. Tu wkrótce pojawią się prawdziwe zdjęcia.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridAutoRows: "230px", gap: 18 }}
            className="gallery-grid"
          >
            {GALLERY.map((g, i) => (
              <Placeholder
                key={i}
                label={g.label}
                className="reveal"
                style={{
                  gridRow: g.tall ? "span 2" : "span 1",
                  borderRadius: "var(--radius-lg)",
                  transitionDelay: `${i * 50}ms`,
                }}
              />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link className="btn btn-primary" href="/sklep">
              Spróbuj naszego miodu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
