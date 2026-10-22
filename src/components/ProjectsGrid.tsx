import type { AdminProject } from "@/lib/supabase/projects-client";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsGrid({
  projects,
}: {
  projects: AdminProject[];
}) {
  if (projects.length === 0) {
    return (
      <p
        style={{
          textAlign: "center",
          color: "var(--text-secondary)",
          fontSize: "14px",
        }}
      >
        Projects will appear here once added.
      </p>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
      }}
    >
      {projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} />
      ))}
    </div>
  );
}
