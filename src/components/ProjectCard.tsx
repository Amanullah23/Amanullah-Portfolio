"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { AdminProject } from "@/lib/supabase/projects-client";
import { trackEvent } from "@/lib/track";

export const MOBILE_KEYWORDS = [
  "flutter",
  "react native",
  "swift",
  "kotlin",
  "android",
  "ios",
];

const AI_KEYWORDS = [
  "ai",
  "llm",
  "gpt",
  "openai",
  "groq",
  "claude",
  "tavily",
  "chatbot",
  "nlp",
  "machine learning",
  "artificial intelligence",
];

const SYSTEM_KEYWORDS = [
  "system",
  "management",
  "billing",
  "finance",
  "financial",
  "crm",
  "erp",
  "clinic",
  "pharmacy",
  "exchange",
  "inventory",
  "pos",
];

function matchesAny(haystack: string, keywords: string[]) {
  return keywords.some((kw) => new RegExp(`\\b${kw}\\b`, "i").test(haystack));
}

export function isMobile(project: AdminProject) {
  const tags = project.tags.toLowerCase();
  return MOBILE_KEYWORDS.some((kw) => tags.includes(kw));
}

export function isAI(project: AdminProject) {
  const haystack = `${project.title} ${project.description} ${project.tags}`;
  return matchesAny(haystack, AI_KEYWORDS);
}

export function isSystem(project: AdminProject) {
  const haystack = `${project.title} ${project.description} ${project.tags}`;
  return matchesAny(haystack, SYSTEM_KEYWORDS);
}

const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: Math.min(i, 8) * 0.06,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
});

const GitHubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const ExternalLinkIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <path d="M15 3h6v6M10 14L21 3" />
  </svg>
);

const SmartphoneIcon = ({ size = 13 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="12" y1="18" x2="12" y2="18.01" />
  </svg>
);

export default function ProjectCard({
  project: p,
  index,
}: {
  project: AdminProject;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp(index)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      style={{
        background: "var(--card-bg)",
        border: p.featured
          ? "1px solid rgba(5,150,105,0.3)"
          : "1px solid var(--card-border)",
        borderRadius: "18px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.25s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(5,150,105,0.4)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 12px 32px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.borderColor = p.featured
          ? "rgba(5,150,105,0.3)"
          : "var(--card-border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "14px",
          flexWrap: "wrap",
        }}
      >
        {isMobile(p) && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--text-secondary)",
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "9999px",
              padding: "4px 10px",
            }}
          >
            <SmartphoneIcon size={11} />
            Mobile
          </span>
        )}
        {p.featured && (
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
            }}
          >
            Founder
          </span>
        )}
        {p.role && !p.featured && (
          <span
            style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--text-secondary)",
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "9999px",
              padding: "4px 12px",
            }}
          >
            {p.role}
          </span>
        )}
      </div>

      <h3
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: "var(--text-primary)",
          margin: "0 0 10px",
        }}
      >
        {p.title}
      </h3>

      <p
        style={{
          fontSize: "14px",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          margin: "0 0 18px",
          flex: 1,
        }}
      >
        {p.description}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginBottom: "20px",
        }}
      >
        {p.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
          .map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "11px",
                color: "var(--text-secondary)",
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "9999px",
                padding: "4px 10px",
              }}
            >
              {tag}
            </span>
          ))}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        {p.github && (
          <Link
            href={p.github}
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              padding: "8px 14px",
              borderRadius: "9999px",
              border: "1px solid var(--card-border)",
              transition: "all 0.2s ease",
            }}
          >
            <GitHubIcon size={13} />
            Code
          </Link>
        )}
        {p.live && (
          <Link
            href={p.live}
            target="_blank"
            onClick={() => trackEvent("project_live_click")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#34D399",
              textDecoration: "none",
              padding: "8px 14px",
              borderRadius: "9999px",
              border: "1px solid rgba(5,150,105,0.3)",
              background: "rgba(5,150,105,0.08)",
              transition: "all 0.2s ease",
            }}
          >
            <ExternalLinkIcon size={13} />
            Live
          </Link>
        )}
      </div>
    </motion.div>
  );
}
