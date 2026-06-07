import type { Metadata } from "next";
import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { JOURNAL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Dziennik — wiedza i przepisy",
  description: "O miodzie, pszczołach i sezonie pasiecznym — prosto od pszczelarza.",
};

export default function JournalPage() {
  return (
    <div>
      <section style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: "64px 32px 56px", textAlign: "center" }}>
          <div className="eyebrow">Dziennik pasieki</div>
          <h1 className="serif-xl" style={{ fontSize: "clamp(40px,5.5vw,76px)", marginTop: 14 }}>
            Wiedza i przepisy
          </h1>
          <p style={{ color: "var(--ink-soft)", fontSize: 17, maxWidth: 520, margin: "18px auto 0" }}>
            O miodzie, pszczołach i sezonie — prosto od pszczelarza.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }} className="jrn-grid">
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
                  {a.kicker} · {a.date}
                </div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 25, marginTop: 10, lineHeight: 1.2 }}>{a.title}</h3>
                <p style={{ color: "var(--ink-soft)", fontSize: 14.5, marginTop: 8 }}>{a.excerpt}</p>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 14,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--honey-deep)",
                    letterSpacing: ".04em",
                  }}
                >
                  Czytaj dalej →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
