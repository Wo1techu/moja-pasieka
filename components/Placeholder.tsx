/* Placeholder zdjęć (paski + etykieta) — do podmiany na prawdziwe zdjęcia. */

import type { CSSProperties } from "react";

export function Placeholder({
  label,
  className = "",
  dark = false,
  style = {},
}: {
  label: string;
  className?: string;
  dark?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div className={`ph ${dark ? "ph-dark" : ""} ${className}`} style={style}>
      <span className="ph-label">{label}</span>
    </div>
  );
}
