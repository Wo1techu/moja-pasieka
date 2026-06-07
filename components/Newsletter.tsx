"use client";

/* Pasek newslettera. Port z prototypu — wysyła e-mail do /api/newsletter
   (na ten moment endpoint tylko waliduje i potwierdza; docelowo double opt-in). */

import { useState } from "react";

export function Newsletter() {
  const [v, setV] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!v.includes("@")) return;
    setBusy(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: v }),
      });
      setDone(true);
    } catch {
      // nawet przy błędzie sieci nie blokujemy UX prototypu
      setDone(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ background: "var(--ink)", color: "var(--cream)" }}>
      <div
        className="wrap section-sm news-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        <div>
          <div className="eyebrow" style={{ color: "var(--honey-glow)" }}>
            List z pasieki
          </div>
          <h2 className="serif-md" style={{ color: "var(--cream)", marginTop: 14, maxWidth: 460 }}>
            Pierwsi dowiecie się o nowych zbiorach
          </h2>
          <p style={{ color: "rgba(250,245,234,.62)", marginTop: 12, maxWidth: 420 }}>
            Kilka listów w roku — o sezonie, limitowanych miodach wrzosowych i przepisach. Bez spamu.
          </p>
        </div>
        {done ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--honey-glow)" }}>
            <div className="hex" style={{ width: 18, height: 20 }} />
            <span style={{ fontSize: 16 }}>Dziękujemy! Sprawdź skrzynkę.</span>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              value={v}
              onChange={(e) => setV(e.target.value)}
              type="email"
              required
              placeholder="Twój e-mail"
              style={{
                flex: "1 1 200px",
                minWidth: 0,
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(250,245,234,.22)",
                color: "var(--cream)",
                borderRadius: "var(--radius)",
                padding: "14px 16px",
                fontFamily: "var(--sans)",
                fontSize: 15,
              }}
            />
            <button className="btn btn-primary" type="submit" disabled={busy}>
              {busy ? "Zapisuję…" : "Zapisz się"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
