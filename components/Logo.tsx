/* Logo / wordmark MELLIS — czysty komponent prezentacyjny. */

export function Logo({
  size = 26,
  mark = true,
  light = false,
}: {
  size?: number;
  mark?: boolean;
  light?: boolean;
}) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.42 }}>
      {mark && (
        <span style={{ position: "relative", width: size * 0.92, height: size * 0.92, flex: "none" }}>
          <span
            style={{
              position: "absolute",
              inset: 0,
              background: light ? "var(--honey-glow)" : "var(--honey)",
              clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
            }}
          />
          <span
            style={{
              position: "absolute",
              inset: "24%",
              background: light ? "var(--ink)" : "var(--cream)",
              clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
            }}
          />
        </span>
      )}
      <span
        style={{
          fontFamily: "var(--serif)",
          fontWeight: 600,
          fontSize: size,
          letterSpacing: ".14em",
          lineHeight: 1,
          color: light ? "var(--cream)" : "var(--ink)",
          textTransform: "uppercase",
          paddingLeft: ".05em",
        }}
      >
        Mellis
      </span>
    </span>
  );
}
