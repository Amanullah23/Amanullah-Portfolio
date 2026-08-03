"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  },
});

const GitHubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);

const WhatsappIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C10.1 9 9.7 8 9.5 7.5c-.2-.5-.3-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-1 .9-1 2.3s1 2.7 1.1 2.9c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.3 8.3 0 0 1 3.7 12c0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.7 8.3-8.3 8.3z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#059669"
    strokeWidth="2.5"
  >
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#059669"
    strokeWidth="2"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#059669"
    strokeWidth="2"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
  </svg>
);

const CodeIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#059669"
    strokeWidth="2"
  >
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  </svg>
);

const badges = [
  { icon: <MapPinIcon />, label: "Kabul, Afghanistan" },
  { icon: <BriefcaseIcon />, label: "7+ Years Experience" },
  { icon: <CodeIcon />, label: "Builder & Founder" },
  { icon: <CheckIcon />, label: "Open to remote work" },
];

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "140px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(5,150,105,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate="show"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(5,150,105,0.12)",
            border: "1px solid rgba(5,150,105,0.3)",
            borderRadius: "9999px",
            padding: "6px 16px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "7px",
              height: "7px",
              background: "#059669",
              borderRadius: "50%",
              boxShadow: "0 0 8px rgba(5,150,105,0.8)",
            }}
          />
          <span style={{ fontSize: "13px", color: "#34D399", fontWeight: 500 }}>
            Open to freelance & remote work
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp(1)}
          initial="hidden"
          animate="show"
          style={{
            fontSize: "clamp(38px, 6vw, 60px)",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.13,
            letterSpacing: "-1.5px",
            margin: "0 0 20px",
          }}
        >
          Hi, I'm <span style={{ color: "#059669" }}>Amanullah Yawari</span>
        </motion.h1>

        <motion.p
          variants={fadeUp(2)}
          initial="hidden"
          animate="show"
          style={{
            fontSize: "18px",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            margin: "0 auto 40px",
            maxWidth: "560px",
          }}
        >
          Senior Full Stack Developer & Founder. I lead a software development
          team as Technical Manager at Quika, and independently design, build,
          and ship my own products — from marketplaces to travel platforms — end
          to end.
        </motion.p>

        <motion.div
          variants={fadeUp(3)}
          initial="hidden"
          animate="show"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="#projects"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#059669",
              color: "white",
              fontSize: "15px",
              fontWeight: 600,
              padding: "14px 28px",
              borderRadius: "9999px",
              textDecoration: "none",
              boxShadow: "0 0 24px rgba(5,150,105,0.45)",
              transition: "all 0.2s ease",
            }}
          >
            View My Work
          </Link>

          <Link
            href="/resume.pdf"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              color: "var(--text-primary)",
              fontSize: "15px",
              fontWeight: 500,
              padding: "14px 28px",
              borderRadius: "9999px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            Download Resume
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp(4)}
          initial="hidden"
          animate="show"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "48px",
          }}
        >
          {badges.map((b) => (
            <div
              key={b.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "9999px",
                padding: "6px 14px",
              }}
            >
              {b.icon}
              <span
                style={{ fontSize: "12px", color: "var(--text-secondary)" }}
              >
                {b.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp(5)}
          initial="hidden"
          animate="show"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {[
            {
              icon: <GitHubIcon size={17} />,
              href: "https://github.com/Amanullah23",
            },
            { icon: <LinkedinIcon size={17} />, href: "#" },
            {
              icon: <WhatsappIcon size={17} />,
              href: "https://wa.me/93787484323",
            },
          ].map((s, idx) => (
            <Link
              key={idx}
              href={s.href}
              target="_blank"
              style={{
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "9999px",
                color: "var(--text-secondary)",
                transition: "all 0.2s ease",
              }}
            >
              {s.icon}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
