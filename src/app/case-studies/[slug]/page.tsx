import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCaseStudyBySlugServer } from "@/lib/supabase/case-studies-server";

const LIVE_LINKS: Record<string, string> = {
  "karjo-afghan-job-aggregator": "https://karjo.vercel.app",
  "karobar-home-services-marketplace": "https://getkarobar.vercel.app",
};

const ExternalLinkIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <path d="M15 3h6v6M10 14L21 3" />
  </svg>
);

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

function Block({ label, content }: { label: string; content: string }) {
  return (
    <div style={{ marginBottom: "36px" }}>
      <h2
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "#34D399",
          textTransform: "uppercase",
          letterSpacing: "1px",
          margin: "0 0 10px",
        }}
      >
        {label}
      </h2>
      <p
        style={{
          fontSize: "16px",
          color: "var(--text-secondary)",
          lineHeight: 1.8,
          margin: 0,
          whiteSpace: "pre-wrap",
        }}
      >
        {content}
      </p>
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlugServer(slug);

  if (!cs) {
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
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
          <Link
            href="/case-studies"
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
            <ArrowLeftIcon /> Back to Case Studies
          </Link>

          <p
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              marginBottom: "12px",
            }}
          >
            {cs.date}
          </p>

          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-1px",
              lineHeight: 1.2,
              margin: "0 0 20px",
            }}
          >
            {cs.title}
          </h1>

          <p
            style={{
              fontSize: "17px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              margin: "0 0 32px",
            }}
          >
            {cs.summary}
          </p>

          {cs.image_url && (
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: "16px",
                overflow: "hidden",
                marginBottom: "40px",
                border: "1px solid var(--card-border)",
              }}
            >
              <Image
                src={cs.image_url}
                alt={cs.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}

          <Block label="Problem" content={cs.problem} />
          <Block label="Solution" content={cs.solution} />
          <Block label="Technology" content={cs.technology} />
          <Block label="Result" content={cs.result} />
          {LIVE_LINKS[cs.slug] && (
            <div
              style={{
                marginTop: "48px",
                padding: "28px",
                textAlign: "center",
                background: "var(--card-bg)",
                border: "1px solid rgba(5,150,105,0.3)",
                borderRadius: "18px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  margin: "0 0 16px",
                }}
              >
                For more info about this case study, visit the website and learn
                more.
              </p>
              <Link
                href={LIVE_LINKS[cs.slug]}
                target="_blank"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#059669",
                  color: "white",
                  fontSize: "14.5px",
                  fontWeight: 600,
                  padding: "12px 28px",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  boxShadow: "0 0 20px rgba(5,150,105,0.4)",
                  transition: "all 0.2s ease",
                }}
              >
                Visit {cs.title.split(" — ")[0]} <ExternalLinkIcon />
              </Link>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}
