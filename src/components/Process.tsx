"use client";

import { motion } from "framer-motion";

const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  },
});

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#059669"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const LayoutIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#059669"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
  </svg>
);

const CodeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#059669"
    strokeWidth="2"
  >
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  </svg>
);

const CheckSquareIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#059669"
    strokeWidth="2"
  >
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </svg>
);

const RocketIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#059669"
    strokeWidth="2"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const HeadphonesIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#059669"
    strokeWidth="2"
  >
    <path d="M3 18v-6a9 9 0 0118 0v6" />
    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
  </svg>
);

const steps = [
  {
    icon: <SearchIcon />,
    title: "Discovery",
    description:
      "Understand the goal, users, and constraints — requirements, scope, and success criteria before any code is written.",
  },
  {
    icon: <LayoutIcon />,
    title: "Design & Planning",
    description:
      "Architecture, data model, and UI direction mapped out — choosing the right stack for the specific problem, not a default one.",
  },
  {
    icon: <CodeIcon />,
    title: "Development",
    description:
      "Iterative builds with regular check-ins — working in small, reviewable pieces rather than one large handoff at the end.",
  },
  {
    icon: <CheckSquareIcon />,
    title: "Testing & QA",
    description:
      "Manual and functional testing across devices and edge cases before anything ships — catching issues before users do.",
  },
  {
    icon: <RocketIcon />,
    title: "Deployment",
    description:
      "Production deploy with proper environment configuration, monitoring, and a rollback plan if something needs fixing fast.",
  },
  {
    icon: <HeadphonesIcon />,
    title: "Support & Iteration",
    description:
      "Post-launch support and iteration based on real usage — most of my own products keep evolving long after v1 ships.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
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
          right: "-10%",
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
            How I Work
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
            My Process
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
            From first conversation to a product running in production —
            here&apos;s how I approach every project, mine or a client&apos;s.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={fadeUp(i + 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "18px",
                padding: "26px",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "22px",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--card-border)",
                }}
              >
                0{i + 1}
              </span>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(5,150,105,0.1)",
                  border: "1px solid rgba(5,150,105,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                {step.icon}
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  margin: "0 0 8px",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "13.5px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
