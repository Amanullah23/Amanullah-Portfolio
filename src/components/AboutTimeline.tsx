"use client";

import { motion } from "framer-motion";
import type { ExperienceEntry } from "@/lib/supabase/experience-client";

const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  },
});

export default function AboutTimeline({
  entries,
}: {
  entries: ExperienceEntry[];
}) {
  if (entries.length === 0) {
    return (
      <p
        style={{
          textAlign: "center",
          color: "var(--text-secondary)",
          fontSize: "14px",
        }}
      >
        Experience entries will appear here once added.
      </p>
    );
  }

  return (
    <div id="experience" style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: "19px",
          top: "8px",
          bottom: "8px",
          width: "2px",
          background:
            "linear-gradient(to bottom, rgba(5,150,105,0.6), var(--card-border))",
        }}
      />

      {entries.map((item, i) => (
        <motion.div
          key={item.id}
          variants={fadeUp(i + 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            position: "relative",
            display: "flex",
            gap: "24px",
            marginBottom: i === entries.length - 1 ? 0 : "36px",
          }}
        >
          <div
            style={{
              flexShrink: 0,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background:
                item.type === "education"
                  ? "var(--card-bg)"
                  : "rgba(5,150,105,0.15)",
              border:
                item.type === "education"
                  ? "2px solid var(--card-border)"
                  : "2px solid rgba(5,150,105,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background:
                  item.type === "education"
                    ? "var(--text-secondary)"
                    : "#34D399",
              }}
            />
          </div>

          <div
            style={{
              flex: 1,
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "16px",
              padding: "20px 24px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#34D399",
                letterSpacing: "0.5px",
              }}
            >
              {item.period}
            </span>
            <h3
              style={{
                fontSize: "17px",
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: "6px 0 2px",
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                margin: "0 0 10px",
              }}
            >
              {item.company}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
