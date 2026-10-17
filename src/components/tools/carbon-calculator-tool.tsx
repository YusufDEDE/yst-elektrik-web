"use client";

import { ToolLayout } from "@/components/tools/tool-layout";
import { ToolStatCard } from "@/components/tools/tool-stat-card";
import { toolInputFocusHandlers, toolInputStyle, toolLabelStyle } from "@/lib/tools/tool-ui";
import { Leaf } from "lucide-react";
import { useState } from "react";

const USAGE_PRESETS = [
  { value: "konut", label: "Konut", monthlyKwh: 250 },
  { value: "isyeri", label: "Küçük İşyeri (< 5 kişi)", monthlyKwh: 600 },
  { value: "ofis", label: "Ofis (5–50 kişi)", monthlyKwh: 2500 },
  { value: "sanayi", label: "Sanayi / Tesis", monthlyKwh: 12000 },
  { value: "ozel", label: "Özel Giriş", monthlyKwh: 0 },
] as const;

const ENERGY_MIX = [
  { value: "grid", label: "Yalnızca Şebeke", factor: 0.427 },
  { value: "mixed30", label: "Şebeke + %30 GES", factor: 0.2989 },
  { value: "mixed50", label: "Şebeke + %50 GES", factor: 0.2135 },
  { value: "mixed80", label: "Şebeke + %80 GES", factor: 0.0854 },
  { value: "renewables", label: "%100 Yenilenebilir", factor: 0 },
] as const;

function scoreRing(pct: number, color: string) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const dash = c * Math.min(pct / 100, 1);
  return (
    <svg width={140} height={140} viewBox="0 0 140 140">
      <circle cx={70} cy={70} r={r} fill="none" stroke="var(--border-card)" strokeWidth={10} />
      <circle
        cx={70}
        cy={70}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={10}
        strokeDasharray={`${dash} ${c}`}
        strokeLinecap="round"
        transform="rotate(-90 70 70)"
      />
      <text x={70} y={76} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--text-primary)">
        {pct}%
      </text>
    </svg>
  );
}

type CarbonResult = {
  annualCo2: number;
  savedCo2: number;
  trees: number;
  sc: { pct: number; label: string; color: string };
};

function carbonScore(annualCo2: number): CarbonResult["sc"] {
  if (annualCo2 === 0) return { pct: 100, label: "Mükemmel", color: "#10b981" };
  if (annualCo2 < 500) return { pct: 85, label: "İyi", color: "#22c55e" };
  if (annualCo2 < 2000) return { pct: 60, label: "Orta", color: "#eab308" };
  if (annualCo2 < 8000) return { pct: 35, label: "Yüksek", color: "#f97316" };
  return { pct: 15, label: "Kritik", color: "#ef4444" };
}

export function CarbonCalculatorTool() {
  const [usage, setUsage] = useState<(typeof USAGE_PRESETS)[number]["value"]>("konut");
  const [customKwh, setCustomKwh] = useState("");
  const [mix, setMix] = useState<(typeof ENERGY_MIX)[number]["value"]>("grid");
  const [result, setResult] = useState<CarbonResult | null>(null);
  const focus = toolInputFocusHandlers("#22c55e", "rgba(34,197,94,0.1)");

  function calculate() {
    const preset = USAGE_PRESETS.find((p) => p.value === usage);
    const monthly = usage === "ozel" ? parseFloat(customKwh) || 0 : (preset?.monthlyKwh ?? 0);
    const mixRow = ENERGY_MIX.find((m) => m.value === mix)!;
    const annualKwh = 12 * monthly;
    const annualCo2 = annualKwh * mixRow.factor;
    const savedCo2 = Math.max(0.427 * annualKwh - annualCo2, 0);
    setResult({
      annualCo2,
      savedCo2,
      trees: Math.max(savedCo2 / 21.77, 0),
      sc: carbonScore(annualCo2),
    });
  }

  return (
    <ToolLayout
      title="Karbon Ayak İzi Hesaplayıcı"
      description="Enerji tüketiminizi ve kaynak karmanızı seçin. Yıllık CO₂ salımınızı, GES ile kazanacağınız tasarrufu ve eşdeğer ağaç sayısını görün."
    >
      <div className="glass-card" style={{ borderRadius: "1.5rem", padding: "2rem", marginBottom: "1.5rem" }}>
        <div className="tools-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div>
            <label style={toolLabelStyle}>Tüketim Profili</label>
            <select
              value={usage}
              onChange={(e) => setUsage(e.target.value as (typeof USAGE_PRESETS)[number]["value"])}
              style={{ ...toolInputStyle, cursor: "pointer" }}
              {...focus}
            >
              {USAGE_PRESETS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={toolLabelStyle}>Enerji Kaynağı Karması</label>
            <select
              value={mix}
              onChange={(e) => setMix(e.target.value as (typeof ENERGY_MIX)[number]["value"])}
              style={{ ...toolInputStyle, cursor: "pointer" }}
              {...focus}
            >
              {ENERGY_MIX.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          {usage === "ozel" ? (
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={toolLabelStyle}>Aylık Tüketim (kWh)</label>
              <input
                type="number"
                value={customKwh}
                onChange={(e) => setCustomKwh(e.target.value)}
                style={toolInputStyle}
                {...focus}
              />
            </div>
          ) : null}
        </div>
        <button
          type="button"
          className="btn-primary-custom"
          style={{ marginTop: "1.5rem", width: "100%", justifyContent: "center", background: "#22c55e" }}
          onClick={calculate}
        >
          <Leaf size={16} />
          Hesapla
        </button>
      </div>
      {result ? (
        <div style={{ animation: "fadeInUp 0.35s ease" }}>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ textAlign: "center" }}>
              {scoreRing(result.sc.pct, result.sc.color)}
              <p style={{ margin: "0.5rem 0 0", fontWeight: 700, color: result.sc.color }}>{result.sc.label}</p>
            </div>
          </div>
          <div
            className="tools-grid-2"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
          >
            <ToolStatCard label="Yıllık CO₂" value={result.annualCo2.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} unit="kg" />
            <ToolStatCard label="GES ile Tasarruf Potansiyeli" value={result.savedCo2.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} unit="kg" highlight />
            <ToolStatCard label="Eşdeğer Ağaç" value={Math.round(result.trees).toLocaleString("tr-TR")} unit="adet" />
          </div>
        </div>
      ) : null}
    </ToolLayout>
  );
}
