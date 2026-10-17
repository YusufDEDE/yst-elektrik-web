"use client";

import { ToolLayout } from "@/components/tools/tool-layout";
import { ToolResultRow } from "@/components/tools/tool-stat-card";
import { SOLAR_CITIES, toolInputFocusHandlers, toolInputStyle, toolLabelStyle } from "@/lib/tools/tool-ui";
import { Sun } from "lucide-react";
import { useState } from "react";

type SolarResult = {
  capacity: number;
  annualEnergy: number;
  annualRevenue: number;
  co2: number;
  trees: number;
  peakHours: number;
};

export function SolarCalculatorTool() {
  const [roofArea, setRoofArea] = useState("");
  const [city, setCity] = useState("izmir");
  const [tilt, setTilt] = useState("30");
  const [tariff, setTariff] = useState("4.2");
  const [result, setResult] = useState<SolarResult | null>(null);
  const focus = toolInputFocusHandlers();

  function calculate() {
    const area = parseFloat(roofArea);
    if (!area || area <= 0) return;
    const capacity = area / 6.5;
    const { peak } = SOLAR_CITIES[city] ?? SOLAR_CITIES.izmir;
    const annualEnergy = capacity * peak * (1 - 0.003 * Math.abs(parseInt(tilt, 10) - 30)) * 0.8;
    const annualRevenue = annualEnergy * parseFloat(tariff);
    const co2 = 0.427 * annualEnergy;
    setResult({
      capacity,
      annualEnergy,
      annualRevenue,
      co2,
      trees: co2 / 21.77,
      peakHours: peak,
    });
  }

  return (
    <ToolLayout
      title="Güneş Enerjisi Verim Hesaplayıcı"
      description="Çatı alanınızı, şehrinizi ve panel eğimini girerek yıllık enerji üretimini, geliri ve CO₂ tasarrufunu hesaplayın."
    >
      <div className="glass-card" style={{ borderRadius: "1.5rem", padding: "2rem", marginBottom: "1.5rem" }}>
        <div className="tools-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div>
            <label style={toolLabelStyle}>Kullanılabilir Çatı Alanı (m²)</label>
            <input
              type="number"
              placeholder="Örn: 65"
              value={roofArea}
              onChange={(e) => setRoofArea(e.target.value)}
              style={toolInputStyle}
              {...focus}
            />
          </div>
          <div>
            <label style={toolLabelStyle}>Şehir</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ ...toolInputStyle, cursor: "pointer" }}
              {...focus}
            >
              {Object.entries(SOLAR_CITIES).map(([key, c]) => (
                <option key={key} value={key}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={toolLabelStyle}>Panel Eğimi (°) — Önerilen: 30°</label>
            <input
              type="number"
              min={0}
              max={90}
              value={tilt}
              onChange={(e) => setTilt(e.target.value)}
              style={toolInputStyle}
              {...focus}
            />
          </div>
          <div>
            <label style={toolLabelStyle}>Elektrik Tarifesi (TL/kWh)</label>
            <input
              type="number"
              step="0.1"
              value={tariff}
              onChange={(e) => setTariff(e.target.value)}
              style={toolInputStyle}
              {...focus}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn-primary-custom"
          style={{ marginTop: "1.5rem", width: "100%", justifyContent: "center" }}
          onClick={calculate}
        >
          <Sun size={16} />
          Hesapla
        </button>
      </div>
      {result ? (
        <div style={{ animation: "fadeInUp 0.35s ease" }}>
          <div className="glass-card" style={{ borderRadius: "1.5rem", padding: "1.75rem", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: "0 0 1rem", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Hesaplama Sonuçları
            </h3>
            <ToolResultRow label="Sistem Gücü" value={`${result.capacity.toFixed(2)} kWp`} />
            <ToolResultRow label="Yıllık Üretim" value={`${result.annualEnergy.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} kWh`} />
            <ToolResultRow label="Yıllık Gelir (tahmini)" value={`${result.annualRevenue.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} TL`} />
            <ToolResultRow label="CO₂ Tasarrufu" value={`${result.co2.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} kg/yıl`} />
            <ToolResultRow label="Eşdeğer Ağaç" value={`${Math.round(result.trees)} adet`} />
            <ToolResultRow label="Bölgesel Güneşlenme" value={`${result.peakHours} kWh/kWp`} />
          </div>
        </div>
      ) : null}
    </ToolLayout>
  );
}
