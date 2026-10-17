"use client";

import { ToolLayout } from "@/components/tools/tool-layout";
import { ToolStatCard } from "@/components/tools/tool-stat-card";
import { toolInputFocusHandlers, toolInputStyle, toolLabelStyle } from "@/lib/tools/tool-ui";
import { Zap } from "lucide-react";
import { useState } from "react";

type BessResult = {
  rawCapacity: number;
  nominalCapacity: number;
  inverterPower: number;
  batteryCount: number;
  approxCost: number;
  annualCycles: number;
};

export function BessCalculatorTool() {
  const [dailyKwh, setDailyKwh] = useState("");
  const [outageHours, setOutageHours] = useState("4");
  const [autonomyPct, setAutonomyPct] = useState("75");
  const [dodPct, setDodPct] = useState("80");
  const [result, setResult] = useState<BessResult | null>(null);
  const focus = toolInputFocusHandlers("#8b5cf6", "rgba(139,92,246,0.1)");

  function calculate() {
    const daily = parseFloat(dailyKwh);
    const hours = parseFloat(outageHours);
    const autonomy = parseFloat(autonomyPct) / 100;
    const dod = parseFloat(dodPct) / 100;
    if (!daily || daily <= 0 || !hours) return;
    const rawCapacity = (daily / 24) * hours * autonomy;
    const nominalCapacity = rawCapacity / (0.95 * dod);
    const inverterPower = (daily / 24) * 1.25;
    const batteryCount = Math.ceil(nominalCapacity / 4.8);
    setResult({
      rawCapacity,
      nominalCapacity,
      inverterPower,
      batteryCount,
      approxCost: 20000 * batteryCount + 4000 * inverterPower,
      annualCycles: 365,
    });
  }

  return (
    <ToolLayout
      title="Batarya Boyutlandırma Hesaplayıcı"
      description="Günlük tüketiminizi, şebeke kesinti süresini ve istediğiniz özerklik seviyesini girerek ihtiyacınız olan batarya kapasitesini ve inverter gücünü hesaplayın."
    >
      <div className="glass-card" style={{ borderRadius: "1.5rem", padding: "2rem", marginBottom: "1.5rem" }}>
        <div className="tools-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div>
            <label style={toolLabelStyle}>Günlük Tüketim (kWh)</label>
            <input
              type="number"
              placeholder="Örn: 30"
              value={dailyKwh}
              onChange={(e) => setDailyKwh(e.target.value)}
              style={toolInputStyle}
              {...focus}
            />
          </div>
          <div>
            <label style={toolLabelStyle}>Kesinti Süresi (saat)</label>
            <input
              type="number"
              min={0.5}
              step={0.5}
              value={outageHours}
              onChange={(e) => setOutageHours(e.target.value)}
              style={toolInputStyle}
              {...focus}
            />
          </div>
          <div>
            <label style={toolLabelStyle}>Özerklik Seviyesi (%)</label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input
                type="range"
                min={25}
                max={100}
                step={25}
                value={autonomyPct}
                onChange={(e) => setAutonomyPct(e.target.value)}
                style={{ flex: 1, accentColor: "#8b5cf6" }}
              />
              <span style={{ fontSize: "0.9375rem", fontWeight: 700, minWidth: "40px" }}>%{autonomyPct}</span>
            </div>
          </div>
          <div>
            <label style={toolLabelStyle}>Deşarj Derinliği — DoD (%)</label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input
                type="range"
                min={50}
                max={90}
                step={10}
                value={dodPct}
                onChange={(e) => setDodPct(e.target.value)}
                style={{ flex: 1, accentColor: "#8b5cf6" }}
              />
              <span style={{ fontSize: "0.9375rem", fontWeight: 700, minWidth: "40px" }}>%{dodPct}</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn-primary-custom"
          style={{ marginTop: "1.5rem", width: "100%", justifyContent: "center", background: "#8b5cf6" }}
          onClick={calculate}
        >
          <Zap size={16} />
          Hesapla
        </button>
      </div>
      {result ? (
        <div style={{ animation: "fadeInUp 0.35s ease" }}>
          <div
            className="tools-grid-2"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}
          >
            <ToolStatCard label="Gerekli Ham Kapasite" value={result.rawCapacity.toFixed(2)} unit="kWh" />
            <ToolStatCard label="Nominal Batarya Kapasitesi" value={result.nominalCapacity.toFixed(2)} unit="kWh" highlight />
            <ToolStatCard label="Minimum İnverter Gücü" value={result.inverterPower.toFixed(2)} unit="kW" />
            <ToolStatCard label="Modül Adedi (4.8 kWh)" value={String(result.batteryCount)} unit="adet" />
            <ToolStatCard
              label="Yaklaşık Yatırım"
              value={result.approxCost.toLocaleString("tr-TR", { maximumFractionDigits: 0 })}
              unit="TL"
            />
            <ToolStatCard label="Tahmini Döngü" value={String(result.annualCycles)} unit="/yıl" />
          </div>
        </div>
      ) : null}
    </ToolLayout>
  );
}
