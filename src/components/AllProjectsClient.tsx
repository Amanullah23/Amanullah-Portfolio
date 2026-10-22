"use client";

import { useState, useMemo } from "react";
import type { AdminProject } from "@/lib/supabase/projects-client";
import ProjectCard, {
  isMobile,
  isAI,
  isSystem,
} from "@/components/ProjectCard";

type Filter = "all" | "web" | "mobile" | "ai" | "system";
const PAGE_SIZE = 9;

export default function AllProjectsClient({
  projects,
}: {
  projects: AdminProject[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let list = projects;
    if (filter === "mobile") list = list.filter(isMobile);
    if (filter === "web") list = list.filter((p) => !isMobile(p));
    if (filter === "ai") list = list.filter(isAI);
    if (filter === "system") list = list.filter(isSystem);

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.toLowerCase().includes(q),
      );
    }
    return list;
  }, [projects, filter, query]);

  const shown = filtered.slice(0, visible);

  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: "All Projects" },
    { key: "web", label: "Web" },
    { key: "mobile", label: "Mobile" },
    { key: "ai", label: "AI" },
    { key: "system", label: "System" },
  ];

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
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setFilter(tab.key);
                setVisible(PAGE_SIZE);
              }}
              style={{
                padding: "8px 18px",
                fontSize: "13.5px",
                fontWeight: 500,
                borderRadius: "9999px",
                border:
                  filter === tab.key
                    ? "1px solid rgba(5,150,105,0.4)"
                    : "1px solid var(--card-border)",
                background:
                  filter === tab.key
                    ? "rgba(5,150,105,0.12)"
                    : "var(--card-bg)",
                color: filter === tab.key ? "#34D399" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisible(PAGE_SIZE);
          }}
          placeholder="Search projects…"
          style={{
            flex: "1 1 220px",
            maxWidth: "280px",
            fontSize: "13.5px",
            color: "var(--text-primary)",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "9999px",
            padding: "9px 18px",
            outline: "none",
          }}
        />
      </div>

      <p
        style={{
          fontSize: "13px",
          color: "var(--text-secondary)",
          marginBottom: "24px",
        }}
      >
        Showing {shown.length} of {filtered.length} project
        {filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            fontSize: "14px",
            padding: "40px 0",
          }}
        >
          No projects match your search.
        </p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {shown.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i % PAGE_SIZE} />
            ))}
          </div>

          {visible < filtered.length && (
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                  borderRadius: "9999px",
                  padding: "12px 28px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Load More Projects
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
