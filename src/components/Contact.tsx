"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { socialLinks } from "@/lib/social-links";

const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  },
});

const MailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#34D399"
    strokeWidth="2"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#34D399"
    strokeWidth="2"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const WhatsappIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#34D399">
    <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C10.1 9 9.7 8 9.5 7.5c-.2-.5-.3-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-1 .9-1 2.3s1 2.7 1.1 2.9c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.3 8.3 0 0 1 3.7 12c0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.7 8.3-8.3 8.3z" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#34D399"
    strokeWidth="2"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const contactItems = [
  {
    icon: <MailIcon />,
    label: "Email",
    value: "an20kx@gmail.com",
    href: "mailto:an20kx@gmail.com",
  },
  {
    icon: <PhoneIcon />,
    label: "Phone",
    value: "+93 787 484 323",
    href: "tel:+93787484323",
  },
  {
    icon: <WhatsappIcon />,
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: socialLinks.whatsapp,
  },
  {
    icon: <MapPinIcon />,
    label: "Location",
    value: "Kabul, Afghanistan",
    href: undefined,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        padding: "120px 24px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(5,150,105,0.12) 0%, transparent 70%)",
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
          textAlign: "center",
        }}
      >
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
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
            Contact
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
            Let's Work Together
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "500px",
              margin: "0 auto 48px",
            }}
          >
            Open to freelance projects and remote roles. Reach out through any
            of the channels below.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          {contactItems.map((item, i) => {
            const content = (
              <div
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                  borderRadius: "16px",
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  height: "100%",
                  transition: "all 0.2s ease",
                }}
              >
                {item.icon}
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: "13.5px",
                    color: "var(--text-primary)",
                    fontWeight: 500,
                    wordBreak: "break-word",
                  }}
                >
                  {item.value}
                </span>
              </div>
            );

            return (
              <motion.div
                key={item.label}
                variants={fadeUp(i + 1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    style={{
                      textDecoration: "none",
                      display: "block",
                      height: "100%",
                    }}
                  >
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          variants={fadeUp(5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Link
            href="mailto:an20kx@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#059669",
              color: "white",
              fontSize: "15px",
              fontWeight: 600,
              padding: "14px 32px",
              borderRadius: "9999px",
              textDecoration: "none",
              boxShadow: "0 0 24px rgba(5,150,105,0.45)",
              transition: "all 0.2s ease",
            }}
          >
            Send Me an Email
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
