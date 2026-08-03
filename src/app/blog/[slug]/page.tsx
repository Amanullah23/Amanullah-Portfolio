import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlugServer } from "@/lib/supabase/blog-server";

const ArrowLeftIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlugServer(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Header />

      <article
        style={{
          padding: "160px 24px 120px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(5,150,105,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              marginBottom: "32px",
            }}
          >
            <ArrowLeftIcon /> Back to Blog
          </Link>

          <span
            style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 600,
              color: "#34D399",
              background: "rgba(5,150,105,0.12)",
              border: "1px solid rgba(5,150,105,0.3)",
              borderRadius: "9999px",
              padding: "4px 12px",
              letterSpacing: "0.5px",
              marginBottom: "20px",
            }}
          >
            {post.category}
          </span>

          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-1px",
              lineHeight: 1.2,
              margin: "0 0 16px",
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              marginBottom: "40px",
            }}
          >
            {post.date}
          </p>

          <div
            style={{
              height: "1px",
              background: "var(--card-border)",
              marginBottom: "40px",
            }}
          />

          <div
            style={{
              fontSize: "16px",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
            }}
          >
            {post.content}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
