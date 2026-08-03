const stats = [
  { label: "Total Projects", value: "8" },
  { label: "Blog Posts", value: "5" },
  { label: "Experience Entries", value: "6" },
  { label: "Site Status", value: "Live" },
];

export default function AdminOverview() {
  return (
    <div>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "var(--text-primary)",
          margin: "0 0 6px",
        }}
      >
        Dashboard Overview
      </h1>
      <p
        style={{
          fontSize: "14px",
          color: "var(--text-secondary)",
          margin: "0 0 32px",
        }}
      >
        Manage your portfolio content from here.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "14px",
              padding: "20px",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
                margin: "0 0 8px",
              }}
            >
              {s.label}
            </p>
            <p
              style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
