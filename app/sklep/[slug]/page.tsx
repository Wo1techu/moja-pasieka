import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, SIZES, getProduct } from "@/lib/data";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Nie znaleziono produktu" };
  return {
    title: product.name,
    description: `${product.tagline}. ${product.short}`,
    openGraph: {
      title: `${product.name} · MELLIS`,
      description: product.tagline,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  // Dane strukturalne (Schema.org / JSON-LD) — SEO (Specyfikacja, sekcja 10)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short,
    brand: { "@type": "Brand", name: "MELLIS" },
    category: "Miód",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "PLN",
      lowPrice: (SIZES[0].priceGrosze / 100).toFixed(2),
      highPrice: (SIZES[SIZES.length - 1].priceGrosze / 100).toFixed(2),
      offerCount: SIZES.length,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} />

      <section className="section" style={{ background: "var(--cream-deep)" }}>
        <div className="wrap">
          <h2 className="serif-md reveal" style={{ marginBottom: 32 }}>
            Może Ci również zasmakować
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 26 }} className="prod-grid">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 50} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
