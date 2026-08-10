"use client";

import { useState, useEffect } from "react";
import {
  getAnalyticsSummary,
  AnalyticsSummary,
} from "@/lib/supabase/analytics-client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "14px",
        padding: "18px 20px",
      }}
    >
      <p
        style={{
          fontSize: "11.5px",
          color: "var(--text-secondary)",
          margin: "0 0 6px",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "var(--text-primary)",
          margin: 0,
        }}
      >
        {value}
      </p>
    </div>
  );
}

function BreakdownList({
  title,
  items,
}: {
  title: string;
  items: { label: string; count: number }[];
}) {
  const max = items[0]?.count || 1;
  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "16px",
        padding: "20px",
      }}
    >
      <h3
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "var(--text-primary)",
          margin: "0 0 16px",
        }}
      >
        {title}
      </h3>
      {items.length === 0 ? (
        <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
          No data yet.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {items.map((item) => (
            <div key={item.label}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "12.5px",
                    color: "var(--text-secondary)",
                    wordBreak: "break-word",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    flexShrink: 0,
                    marginLeft: "8px",
                  }}
                >
                  {item.count}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "5px",
                  background: "var(--card-border)",
                  borderRadius: "9999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${(item.count / max) * 100}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #059669, #34D399)",
                    borderRadius: "9999px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalyticsSummary().then((summary) => {
      setData(summary);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
        Loading analytics...
      </p>
    );
  }

  const chartData = data.dailyTrend.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

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
        Analytics
      </h1>
      <p
        style={{
          fontSize: "13.5px",
          color: "var(--text-secondary)",
          margin: "0 0 24px",
        }}
      >
        Anonymous visitor stats — no personal data is collected, ever.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <StatCard label="Total Views" value={data.total} />
        <StatCard label="Unique Visitors" value={data.uniqueVisitors} />
        <StatCard label="Last 7 Days" value={data.last7Days} />
        <StatCard label="Last 30 Days" value={data.last30Days} />
      </div>

      {/* Trend chart */}
      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: "0 0 16px",
          }}
        >
          Views — Last 14 Days
        </h3>
        <div style={{ width: "100%", height: "220px" }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--card-border)"
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "var(--text-secondary)" }}
                axisLine={{ stroke: "var(--card-border)" }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: "var(--text-secondary)" }}
                axisLine={{ stroke: "var(--card-border)" }}
                tickLine={false}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--bg)",
                  border: "1px solid var(--card-border)",
                  borderRadius: "10px",
                  fontSize: "12.5px",
                  color: "var(--text-primary)",
                }}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#059669"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#34D399" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px",
        }}
      >
        <BreakdownList
          title="Top Pages"
          items={data.topPages.map((p) => ({ label: p.path, count: p.count }))}
        />
        <BreakdownList
          title="Top Referrers"
          items={data.topReferrers.map((r) => ({
            label: r.referrer,
            count: r.count,
          }))}
        />
        <BreakdownList
          title="Top Countries"
          items={data.topCountries.map((c) => ({
            label: c.country,
            count: c.count,
          }))}
        />
        <BreakdownList
          title="Devices"
          items={data.deviceBreakdown.map((d) => ({
            label: d.device,
            count: d.count,
          }))}
        />
      </div>
    </div>
  );
}
