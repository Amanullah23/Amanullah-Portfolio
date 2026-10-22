import Link from "next/link";
import { getProjectsServer } from "@/lib/supabase/projects-server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllProjectsClient from "@/components/AllProjectsClient";

export const metadata = {
  title: "All Projects — Amanullah Yawari",
  description:
    "The full collection of products I've founded and client projects I've delivered — web and mobile, end to end.",
};

const ArrowLeftIcon = ({ size = 13 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export default async function AllProjectsPage() {
  const projects = await getProjectsServer();
  const founderCount = projects.filter((p) => p.featured).length;

  return (
    <>
      <Header />

      <main style={{ paddingTop: "128px", paddingBottom: "100px" }}>
        <section
          style={{
            position: "relative",
            padding: "0 24px 56px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-10%",
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
              maxWidth: "1080px",
              margin: "0 auto",
            }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13.5px",
                fontWeight: 500,
                color: "var(--text-secondary)",
                textDecoration: "none",
                marginBottom: "32px",
                transition: "color 0.18s ease",
              }}
            >
              <ArrowLeftIcon size={13} />
              Back to Home
            </Link>

            <div style={{ textAlign: "center" }}>
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
                Portfolio
              </span>
              <h1
                style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-1.5px",
                  margin: "0 0 16px",
                }}
              >
                All Projects
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  maxWidth: "560px",
                  margin: "0 auto 28px",
                }}
              >
                Every product I&apos;ve founded and client project I&apos;ve
                delivered — search or filter to find what you&apos;re looking
                for.
              </p>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                  borderRadius: "9999px",
                  padding: "8px 18px",
                }}
              >
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                  {projects.length}
                </span>
                Total Projects
                <span style={{ opacity: 0.4 }}>·</span>
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                  {founderCount}
                </span>
                Founder Projects
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "0 24px" }}>
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <AllProjectsClient projects={projects} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
