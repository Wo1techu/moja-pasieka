import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap" style={{ padding: "120px 32px", textAlign: "center" }}>
      <span className="hex" style={{ width: 34, height: 38, opacity: 0.5, margin: "0 auto" }} />
      <div className="eyebrow" style={{ marginTop: 24 }}>
        Błąd 404
      </div>
      <h1 className="serif-lg" style={{ marginTop: 12 }}>
        Nie znaleźliśmy tej strony
      </h1>
      <p style={{ color: "var(--ink-soft)", fontSize: 17, maxWidth: 440, margin: "16px auto 0" }}>
        Strona mogła zostać przeniesiona albo nigdy nie istniała. Zajrzyj do sklepu po nasz miód.
      </p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 30, flexWrap: "wrap" }}>
        <Link className="btn btn-primary" href="/sklep">
          Do sklepu
        </Link>
        <Link className="btn btn-ghost" href="/">
          Strona główna
        </Link>
      </div>
    </div>
  );
}
