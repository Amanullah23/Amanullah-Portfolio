"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { posts } from "@/lib/blog-data";

const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  },
});

const ArrowIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Blog() {
  return (
    <section
      id="blog-preview"
      style={{
        position: "relative",
        padding: "120px 24px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(5,150,105,0.08) 0%, transparent 70%)",
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
        {/* Header */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
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
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-1px",
              margin: "0 0 16px",
            }}
          >
            Latest Writing
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(148,163,184,1)",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Placeholder intro: notes on things I build, lessons from managing
            technical teams, and the occasional tutorial.
          </p>
        </motion.div>

        {/* Post grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              variants={fadeUp(i + 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              <Link
                href={post.slug}
                style={{
                  textDecoration: "none",
                  display: "block",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "18px",
                    padding: "26px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(5,150,105,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.08)";
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
                      style={{ fontSize: "12px", color: "rgba(100,116,139,1)" }}
                    >
                      {post.date}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 600,
                      color: "white",
                      lineHeight: 1.4,
                      margin: "0 0 10px",
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "13.5px",
                      color: "rgba(148,163,184,1)",
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
                    Read more <ArrowIcon />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          variants={fadeUp(4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{ textAlign: "center" }}
        >
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              fontWeight: 500,
              color: "white",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "9999px",
              padding: "12px 24px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            View All Posts <ArrowIcon />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
