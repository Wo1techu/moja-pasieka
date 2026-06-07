/* Ocena w gwiazdkach — czysty komponent prezentacyjny. */

export function Stars({ n = 5, size = 13 }: { n?: number; size?: number }) {
  return (
    <span
      style={{ display: "inline-flex", gap: 2, color: "var(--honey)" }}
      aria-label={`${n} z 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < n ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.8 6.1 20.8l1.3-6.6L2.5 9.6l6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}
