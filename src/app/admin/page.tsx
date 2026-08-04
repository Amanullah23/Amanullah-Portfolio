const stats = [
  { label: "Total Projects", value: "5" },
  { label: "Blog Posts", value: "3" },
  { label: "Experience Entries", value: "7" },
  { label: "Site Status", value: "Live" },
];

export default function AdminOverview() {
  return (
    <div>
      <h1
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "var(--text-primary)",
          margin: "0 0 6px",
        }}
      >
        Dashboard Overview
      </h1>
      <p
        style={{
          fontSize: "13.5px",
          color: "var(--text-secondary)",
          margin: "0 0 28px",
        }}
      >
        Manage your portfolio content from here.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "12px",
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "14px",
              padding: "16px 18px",
            }}
          >
            <p
              style={{
                fontSize: "11.5px",
                color: "var(--text-secondary)",
                margin: "0 0 6px",
              }}
            >
              {s.label}
            </p>
            <p
              style={{
                fontSize: "22px",
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
