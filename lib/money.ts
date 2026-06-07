/* ============================================================
   MELLIS — operacje na kwotach
   Wszystkie kwoty trzymamy jako liczby całkowite w GROSZACH,
   aby uniknąć błędów zaokrągleń liczb zmiennoprzecinkowych
   (patrz Specyfikacja techniczna, sekcja „Model danych").
   ============================================================ */

/**
 * Formatuje kwotę w groszach na czytelny napis, np. 3000 -> "30 zł",
 * 4550 -> "45,50 zł". Pełne złote bez części groszowej.
 */
export function formatPLN(grosze: number): string {
  const zl = grosze / 100;
  const hasFraction = grosze % 100 !== 0;
  const formatted = zl.toLocaleString("pl-PL", {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2,
  });
  return `${formatted} zł`;
}
