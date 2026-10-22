import Link from "next/link";
import { getProjectsServer } from "@/lib/supabase/projects-server";
import ProjectsGrid from "@/components/ProjectsGrid";

const ArrowIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export default async function Projects() {
  const projects = await getProjectsServer();
  const featured = projects.slice(0, 6);

  return (
    <section
      id="projects"
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
          maxWidth: "1080px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
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
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-1px",
              margin: "0 0 16px",
            }}
          >
            Featured Projects
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            A mix of products I&apos;ve founded and built myself, and client
            work delivered end to end.
          </p>
        </div>

        <ProjectsGrid projects={featured} />

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14.5px",
              fontWeight: 600,
              color: "#fff",
              background: "#059669",
              borderRadius: "9999px",
              padding: "13px 28px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            View All Projects
            <ArrowIcon size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
