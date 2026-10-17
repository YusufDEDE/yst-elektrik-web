export function ToolStatCard({
  label,
  value,
  unit,
  highlight,
}: {
  label: string;
  value: string;
  unit?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="glass-card"
      style={{
        borderRadius: "1rem",
        padding: "1.25rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        border: highlight ? "1px solid rgba(37,99,235,0.35)" : undefined,
      }}
    >
      <span
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
        <span
          style={{
            fontSize: "1.875rem",
            fontWeight: 800,
            color: highlight ? "#2563eb" : "#2563eb",
            letterSpacing: "-0.03em",
          }}
        >
          {value}
        </span>
        {unit ? (
          <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 600 }}>{unit}</span>
        ) : null}
      </div>
    </div>
  );
}

export function ToolResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 0",
        borderBottom: "1px solid var(--border-card)",
      }}
    >
      <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{label}</span>
      <span style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)" }}>{value}</span>
    </div>
  );
}
