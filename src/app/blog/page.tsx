import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getBlogPostsServer } from "@/lib/supabase/blog-server";

export default async function BlogIndexPage() {
  const posts = await getBlogPostsServer();

  return (
    <main>
      <Header />

      <section
        style={{
          padding: "160px 24px 100px",
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
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#34D399",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Blog
            </span>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-1px",
                margin: "0 0 16px",
              }}
            >
              Writing & Notes
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              Engineering notes, career lessons, and tutorials from building
              products end to end.
            </p>
          </div>

          {posts.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "var(--text-secondary)",
                fontSize: "14px",
              }}
            >
              No posts yet — check back soon.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    style={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--card-border)",
                      borderRadius: "18px",
                      padding: "26px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "14px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#34D399",
                          background: "rgba(5,150,105,0.12)",
                          border: "1px solid rgba(5,150,105,0.3)",
                          borderRadius: "9999px",
                          padding: "4px 10px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {post.category}
                      </span>
                      <span
                        style={{ fontSize: "12px", color: "var(--text-muted)" }}
                      >
                        {post.date}
                      </span>
                    </div>

                    <h2
                      style={{
                        fontSize: "17px",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        lineHeight: 1.4,
                        margin: "0 0 10px",
                      }}
                    >
                      {post.title}
                    </h2>

                    <p
                      style={{
                        fontSize: "13.5px",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        margin: "0 0 18px",
                        flex: 1,
                      }}
                    >
                      {post.excerpt}
                    </p>

                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#34D399",
                      }}
                    >
                      Read more
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
