"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChevronDownIcon = ({ open }: { open: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    style={{
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s ease",
    }}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const faqs = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "Full-stack web and mobile applications — marketplaces, booking systems, dashboards, and business tools. I work across the entire stack from database design to UI, and I'm equally comfortable building a new product from scratch or improving an existing one.",
  },
  {
    question: "Do you work with clients outside Afghanistan?",
    answer:
      "Yes — I regularly work remotely with international clients. Time zone overlap is rarely an issue since I keep async communication clear with detailed updates and documentation.",
  },
  {
    question: "What's your tech stack?",
    answer:
      "Next.js, React, TypeScript, and Tailwind CSS on the front end; Node.js, PHP/Laravel, and Python on the back end; PostgreSQL and Supabase for data and auth; Flutter for mobile apps. I choose the stack based on the project's actual needs, not habit.",
  },
  {
    question: "How do you handle project timelines and communication?",
    answer:
      "I break work into small, reviewable milestones rather than one big handoff at the end, with regular check-ins so you always know where things stand. Clear scope and expectations are set before development starts.",
  },
  {
    question: "Can you also help with server/network infrastructure?",
    answer:
      "Yes — alongside development, I have hands-on experience with VSAT satellite internet systems, Mikrotik routing, Nano Station and TP-Link deployments, and I'm CCNA certified. This is useful for clients who need both software and the infrastructure it runs on.",
  },
  {
    question: "Are you available for full-time roles, or only freelance?",
    answer:
      "Both. I'm open to full-time or contract roles as a senior developer or technical lead, as well as freelance/project-based work through Upwork, Fiverr, or direct engagement.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
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
          maxWidth: "760px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
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
            FAQ
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
            Frequently Asked Questions
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            Common questions from clients and hiring teams.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                style={{
                  background: "var(--card-bg)",
                  border: isOpen
                    ? "1px solid rgba(5,150,105,0.3)"
                    : "1px solid var(--card-border)",
                  borderRadius: "14px",
                  overflow: "hidden",
                  transition: "border-color 0.2s ease",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    padding: "18px 20px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14.5px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    style={{
                      color: isOpen ? "#34D399" : "var(--text-secondary)",
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDownIcon open={isOpen} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          fontSize: "13.5px",
                          color: "var(--text-secondary)",
                          lineHeight: 1.7,
                          margin: 0,
                          padding: "0 20px 20px",
                        }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
