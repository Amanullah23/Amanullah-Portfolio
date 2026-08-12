"use client";

import { motion } from "framer-motion";

const CODE_LINES: { tokens: { text: string; color?: string }[] }[] = [
  {
    tokens: [
      { text: "// lib/supabase/experience-client.ts", color: "#6A9955" },
    ],
  },
  { tokens: [] },
  {
    tokens: [
      { text: "export async function ", color: "#C586C0" },
      { text: "getExperienceClient", color: "#DCDCAA" },
      { text: "() {", color: "#D4D4D4" },
    ],
  },
  {
    tokens: [
      { text: "  const ", color: "#569CD6" },
      { text: "supabase", color: "#9CDCFE" },
      { text: " = ", color: "#D4D4D4" },
      { text: "createClient", color: "#DCDCAA" },
      { text: "();", color: "#D4D4D4" },
    ],
  },
  {
    tokens: [
      { text: "  const ", color: "#569CD6" },
      { text: "{ data, error } ", color: "#9CDCFE" },
      { text: "= ", color: "#D4D4D4" },
      { text: "await ", color: "#C586C0" },
      { text: "supabase", color: "#9CDCFE" },
    ],
  },
  {
    tokens: [
      { text: "    .from(", color: "#D4D4D4" },
      { text: '"experience"', color: "#CE9178" },
      { text: ")", color: "#D4D4D4" },
    ],
  },
  {
    tokens: [
      { text: "    .select(", color: "#D4D4D4" },
      { text: '"*"', color: "#CE9178" },
      { text: ")", color: "#D4D4D4" },
    ],
  },
  {
    tokens: [
      { text: "    .order(", color: "#D4D4D4" },
      { text: '"sort_order"', color: "#CE9178" },
      { text: ", { ", color: "#D4D4D4" },
      { text: "ascending", color: "#9CDCFE" },
      { text: ": ", color: "#D4D4D4" },
      { text: "true", color: "#569CD6" },
      { text: " });", color: "#D4D4D4" },
    ],
  },
  { tokens: [] },
  {
    tokens: [
      { text: "  ", color: "#D4D4D4" },
      { text: "if ", color: "#C586C0" },
      { text: "(error) ", color: "#D4D4D4" },
      { text: "return ", color: "#C586C0" },
      { text: "[];", color: "#D4D4D4" },
    ],
  },
  {
    tokens: [
      { text: "  ", color: "#D4D4D4" },
      { text: "return ", color: "#C586C0" },
      { text: "data ", color: "#9CDCFE" },
      { text: "?? ", color: "#D4D4D4" },
      { text: "[];", color: "#D4D4D4" },
    ],
  },
  { tokens: [{ text: "}", color: "#D4D4D4" }] },
];

export default function CodeShowcase() {
  return (
    <section
      style={{
        position: "relative",
        padding: "100px 24px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
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
          maxWidth: "760px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "40px" }}
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
            Real Code
          </span>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 36px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-1px",
              margin: "0 0 14px",
            }}
          >
            Code I Actually Write
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "540px",
              margin: "0 auto",
            }}
          >
            Not a placeholder snippet — this is the real function powering the
            Experience section of this exact site, using Supabase with row-level
            security.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            background: "#1E1E1E",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 30px 70px rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 16px",
              background: "#2D2D2D",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#FF5F56",
              }}
            />
            <span
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#FFBD2E",
              }}
            />
            <span
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#27C93F",
              }}
            />
            <span
              style={{
                marginLeft: "8px",
                fontSize: "12.5px",
                color: "#9DA5B4",
                fontFamily: "monospace",
              }}
            >
              experience-client.ts
            </span>
          </div>

          {/* Code body */}
          <div
            style={{
              padding: "22px 24px",
              fontFamily: "'Menlo', 'Consolas', monospace",
              fontSize: "13px",
              lineHeight: 1.85,
              overflowX: "auto",
            }}
          >
            {CODE_LINES.map((line, i) => (
              <div key={i} style={{ whiteSpace: "pre" }}>
                {line.tokens.length === 0
                  ? "\u00A0"
                  : line.tokens.map((token, j) => (
                      <span key={j} style={{ color: token.color || "#D4D4D4" }}>
                        {token.text}
                      </span>
                    ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
