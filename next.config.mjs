/** @type {import('next').NextConfig} */

// Repo jest serwowane z podścieżki /moja-pasieka na github.io.
// W buildzie CI ustawiamy NEXT_PUBLIC_BASE_PATH=/moja-pasieka; lokalnie (dev)
// zmienna jest pusta → aplikacja działa z korzenia (http://localhost:3000).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,

  // Eksport statyczny → katalog out/ (GitHub Pages, hosting bez serwera Node).
  output: "export",
  basePath,
  // Statyczny hosting lubi foldery z index.html — działa odświeżanie podstron.
  trailingSlash: true,
  // Brak serwera optymalizacji obrazów przy eksporcie statycznym.
  images: { unoptimized: true },

  // Przypnij korzeń projektu do tego katalogu. Bez tego Next mógłby wykryć
  // przypadkowy package-lock.json w katalogu nadrzędnym jako korzeń workspace
  // (psuje to śledzenie plików przy buildzie / deployu).
  turbopack: {
    root: import.meta.dirname,
  },
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
