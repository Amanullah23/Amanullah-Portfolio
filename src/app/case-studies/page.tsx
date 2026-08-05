import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { getCaseStudiesServer } from "@/lib/supabase/case-studies-server";

export default async function CaseStudiesIndexPage() {
  const studies = await getCaseStudiesServer();

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
              Case Studies
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
              How I Build Products
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
              A closer look at the problems, decisions, and results behind
              projects I&apos;ve built.
            </p>
          </div>

          {studies.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "var(--text-secondary)",
                fontSize: "14px",
              }}
            >
              Case studies coming soon.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "24px",
              }}
            >
              {studies.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    style={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--card-border)",
                      borderRadius: "18px",
                      overflow: "hidden",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.25s ease",
                    }}
                  >
                    {cs.image_url && (
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "200px",
                        }}
                      >
                        <Image
                          src={cs.image_url}
                          alt={cs.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    )}
                    <div
                      style={{
                        padding: "24px",
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--text-muted)",
                          marginBottom: "10px",
                        }}
                      >
                        {cs.date}
                      </span>
                      <h2
                        style={{
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          margin: "0 0 10px",
                        }}
                      >
                        {cs.title}
                      </h2>
                      <p
                        style={{
                          fontSize: "13.5px",
                          color: "var(--text-secondary)",
                          lineHeight: 1.6,
                          margin: "0 0 16px",
                          flex: 1,
                        }}
                      >
                        {cs.summary}
                      </p>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "#34D399",
                        }}
                      >
                        Read case study →
                      </span>
                    </div>
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
