import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Placeholder } from "@/components/Placeholder";
import { JOURNAL, getJournalPost } from "@/lib/data";

export function generateStaticParams() {
  return JOURNAL.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return { title: "Nie znaleziono wpisu" };
  return { title: post.title, description: post.excerpt };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  return (
    <article className="wrap-narrow" style={{ padding: "48px 32px 96px" }}>
      <Link href="/dziennik" style={{ fontSize: 13, color: "var(--ink-faint)", marginBottom: 24, display: "inline-block" }}>
        ← Wszystkie wpisy
      </Link>
      <div className="eyebrow">
        {post.kicker} · {post.date} · {post.read} czytania
      </div>
      <h1 className="serif-lg" style={{ marginTop: 14 }}>
        {post.title}
      </h1>
      <Placeholder
        label={`zdjęcie · ${post.kicker.toLowerCase()}`}
        style={{ aspectRatio: "16/8", borderRadius: "var(--radius-lg)", margin: "32px 0" }}
      />
      <div style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.8 }}>
        <p style={{ marginBottom: 18 }}>{post.excerpt}</p>
        <p style={{ marginBottom: 18 }}>
          To miejsce na pełną treść wpisu. Docelowo podłączymy tu system zarządzania treścią (CMS), dzięki któremu samodzielnie dodacie kolejne artykuły, zdjęcia i przepisy — bez znajomości kodu.
        </p>
        <p style={{ marginBottom: 18 }}>
          Każdy wpis może mieć tytuł, kategorię, zdjęcie główne, czas czytania i dowolnie sformatowaną treść. Sekcja ta świetnie buduje zaufanie i pozycjonowanie sklepu w wyszukiwarce.
        </p>
        <div style={{ padding: 24, background: "var(--amber-wash)", borderRadius: "var(--radius-lg)", marginTop: 8 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Spodobał Ci się wpis?</div>
          <p style={{ color: "var(--ink-soft)", fontSize: 15, marginBottom: 16 }}>
            Zajrzyj do sklepu i wypróbuj miód, o którym piszemy.
          </p>
          <Link className="btn btn-primary btn-sm" href="/sklep">
            Do sklepu
          </Link>
        </div>
      </div>
    </article>
  );
}
