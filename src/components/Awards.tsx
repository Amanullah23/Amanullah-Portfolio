"use client";

import { motion } from "framer-motion";

const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  },
});

const AwardIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#059669"
    strokeWidth="2"
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5" />
  </svg>
);

const awards = [
  {
    title: "First Position — High School Graduation",
    org: "Shahid Balkhi High School, Ghazni",
    detail: "Top score of 310, first position across all classes",
  },
  {
    title: "WiDS Upper Bavaria Python Certificate",
    org: "FemsTech",
    detail: "Data science and Python programming",
  },
  {
    title: "ACKU Laravel Certificate",
    org: "Afghanistan Center at Kabul University",
    detail: "PHP / Laravel web development",
  },
  {
    title: "BoCS Certificate",
    org: "Kabul University",
    detail: "Basics of Computer Science",
  },
  {
    title: "Real Star Educational Society Certification",
    org: "Kabul",
    detail: "Professional English & technical training",
  },
  {
    title: "Member, Global Entrepreneurs and Leaders Academy (GELA)",
    org: "Cohort 12",
    detail: "Leadership and entrepreneurship development program",
  },
  {
    title: "Member, Python Software Foundation (PSF)",
    org: "PSF",
    detail: "Contributing member of the global Python community",
  },
];

export default function Awards() {
  return (
    <section
      id="awards"
      style={{
        position: "relative",
        padding: "120px 24px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "0%",
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
          maxWidth: "900px",
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
            Recognition
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
            Awards & Achievements
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
            Certifications, memberships, and milestones along the way.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              variants={fadeUp(i + 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  flexShrink: 0,
                  borderRadius: "10px",
                  background: "rgba(5,150,105,0.1)",
                  border: "1px solid rgba(5,150,105,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AwardIcon />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "14.5px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    margin: "0 0 4px",
                    lineHeight: 1.4,
                  }}
                >
                  {award.title}
                </h3>
                <p
                  style={{
                    fontSize: "12.5px",
                    color: "#34D399",
                    margin: "0 0 4px",
                  }}
                >
                  {award.org}
                </p>
                <p
                  style={{
                    fontSize: "12.5px",
                    color: "var(--text-secondary)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {award.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
