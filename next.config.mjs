/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Przypnij korzeń projektu do tego katalogu. Bez tego Next mógłby wykryć
  // przypadkowy package-lock.json w katalogu nadrzędnym jako korzeń workspace
  // (psuje to śledzenie plików przy buildzie / deployu).
  turbopack: {
    root: import.meta.dirname,
  },
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
