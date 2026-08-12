"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { socialLinks } from "@/lib/social-links";

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#F43F5E">
    <path d="M12 21s-6.5-4.35-9.5-8.5C.7 9.7 1.3 6 4.5 4.5 7 3.3 9.5 4.3 12 7c2.5-2.7 5-3.7 7.5-2.5C22.7 6 23.3 9.7 21.5 12.5 18.5 16.65 12 21 12 21z" />
  </svg>
);

const CommentIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--text-secondary)"
    strokeWidth="2"
  >
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </svg>
);

const RepostIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--text-secondary)"
    strokeWidth="2"
  >
    <path d="M17 1l4 4-4 4" />
    <path d="M3 11V9a4 4 0 014-4h14" />
    <path d="M7 23l-4-4 4-4" />
    <path d="M21 13v2a4 4 0 01-4 4H3" />
  </svg>
);

const ThreadsIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068v-.037c.024-3.557.924-6.447 2.67-8.578C6.07 1.18 8.81.014 12.354 0h.049c2.738.017 5.064.82 6.912 2.385 1.74 1.474 2.875 3.553 3.376 6.178l-2.368.44c-.392-2.112-1.263-3.729-2.591-4.808-1.286-1.044-3.02-1.58-5.147-1.593h-.04c-2.72.017-4.876.906-6.41 2.644C4.6 6.985 3.845 9.406 3.824 12.035v.034c.017 2.636.741 5.022 2.1 6.898 1.369 1.891 3.488 2.862 6.3 2.884h.006c2.546-.018 4.457-.706 5.683-2.045.988-1.082 1.49-2.605 1.491-4.524v-.012c-.002-.856-.123-1.617-.36-2.265a4.23 4.23 0 00-.394-.807c-.438 2.162-1.457 3.637-3.032 4.389-1.017.484-2.232.686-3.618.601-1.163-.071-2.21-.41-3.007-1.01-.874-.66-1.386-1.618-1.437-2.7-.048-1.02.316-1.962 1.025-2.651.762-.742 1.898-1.166 3.193-1.194 1.046-.022 2.016.163 2.886.549-.057-.434-.16-.821-.31-1.153-.34-.757-.952-1.16-1.873-1.228-.716-.053-1.362.118-1.92.508l-1.272-1.896c.9-.604 1.99-.906 3.248-.906h.073c2.616.036 4.212 1.522 4.672 4.307.12.72.178 1.5.172 2.315v.012c-.002 2.538-.727 4.573-2.154 6.052-1.46 1.513-3.596 2.296-6.347 2.32z" />
  </svg>
);

const POST_URL = "https://www.threads.net/@amanullah_yawari"; // TODO: replace with the exact post link once available

export default function ThreadsQuote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: "560px", margin: "0 auto" }}
    >
      <Link
        href={POST_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block" }}
      >
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "18px",
            padding: "22px",
            transition: "border-color 0.2s ease",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  position: "relative",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  border: "1px solid var(--card-border)",
                }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Amanullah Yawari"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  amanullah_yawari
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "var(--text-muted)",
                      marginLeft: "6px",
                    }}
                  >
                    2d
                  </span>
                </p>
              </div>
            </div>
            <span style={{ color: "var(--text-secondary)" }}>
              <ThreadsIcon size={17} />
            </span>
          </div>

          {/* Body */}
          <p
            style={{
              fontSize: "15.5px",
              color: "var(--text-primary)",
              lineHeight: 1.6,
              margin: "0 0 16px",
            }}
          >
            AI isn&apos;t replacing developers. Developers who know how to use
            AI are becoming faster. 🚀💻
          </p>

          {/* Footer stats */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "var(--text-secondary)",
              }}
            >
              <HeartIcon /> 6
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "var(--text-secondary)",
              }}
            >
              <CommentIcon /> 2
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "var(--text-secondary)",
              }}
            >
              <RepostIcon />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
