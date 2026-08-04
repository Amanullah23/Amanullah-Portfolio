"use client";

const AlertTriangleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#F87171"
    strokeWidth="2.2"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      onClick={onCancel}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(3px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "360px",
          background: "var(--bg)",
          border: "1px solid var(--card-border)",
          borderRadius: "20px",
          padding: "22px 22px 20px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              flexShrink: 0,
              borderRadius: "10px",
              background: "rgba(248,113,113,0.12)",
              border: "1px solid rgba(248,113,113,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AlertTriangleIcon />
          </div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            {title}
          </h3>
        </div>

        <p
          style={{
            fontSize: "13.5px",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            margin: "0 0 22px",
          }}
        >
          {message}
        </p>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "13.5px",
              fontWeight: 500,
              color: "var(--text-primary)",
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "9999px",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "13.5px",
              fontWeight: 600,
              color: "white",
              background: "#DC2626",
              border: "none",
              borderRadius: "9999px",
              cursor: "pointer",
              boxShadow: "0 0 14px rgba(220,38,38,0.3)",
              transition: "all 0.15s ease",
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
