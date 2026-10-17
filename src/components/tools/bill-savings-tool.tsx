"use client";

import { ToolLayout } from "@/components/tools/tool-layout";
import { ToolStatCard } from "@/components/tools/tool-stat-card";
import { BILL_CITY_PEAK, BILL_TARIFFS, toolInputFocusHandlers, toolInputStyle, toolLabelStyle } from "@/lib/tools/tool-ui";
import Link from "next/link";
import { Share2, Zap } from "lucide-react";
import { useState } from "react";

type BillResult = {
  annualSaving: number;
  monthlySaving: number;
  payback: number;
  annualProduction: number;
  co2Saved: number;
};

export function BillSavingsTool() {
  const [monthlyBill, setMonthlyBill] = useState("");
  const [tariffType, setTariffType] = useState<keyof typeof BILL_TARIFFS>("konut");
  const [city, setCity] = useState("izmir");
  const [panelCount, setPanelCount] = useState("");
  const [result, setResult] = useState<BillResult | null>(null);
  const focus = toolInputFocusHandlers();

  function calculate() {
    const bill = parseFloat(monthlyBill);
    const panels = parseFloat(panelCount) || 10;
    if (!bill || bill <= 0) return;
    const rate = BILL_TARIFFS[tariffType].rate;
    const annualProduction = 0.4 * panels * (BILL_CITY_PEAK[city] ?? 1700) * 0.8;
    const annualSaving = Math.min(annualProduction, (bill / rate) * 12);
    const co2Saved = 0.427 * annualSaving;
    setResult({
      annualSaving,
      monthlySaving: annualSaving / 12,
      payback: annualSaving > 0 ? (8000 * panels) / annualSaving : 0,
      annualProduction,
      co2Saved,
    });
  }

  function share() {
    if (!result) return;
    const text = `YST Fatura Tasarruf Simülatörü
Aylık tasarruf: ${result.monthlySaving.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} TL
Yıllık tasarruf: ${result.annualSaving.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} TL
https://yst.com.tr`;
    if (navigator.share) {
      void navigator.share({ title: "YST Fatura Tasarrufu", text });
    } else {
      void navigator.clipboard.writeText(text);
      alert("Sonuç panoya kopyalandı!");
    }
  }

  return (
    <ToolLayout
      title="Elektrik Faturası Tasarruf Simülatörü"
      description="Aylık faturanızı girin, güneş enerjisi sistemi kurarsanız ne kadar tasarruf edeceğinizi, amortisman sürenizi ve CO₂ tasarrufunuzu görün."
    >
      <div className="glass-card" style={{ borderRadius: "1.5rem", padding: "2rem", marginBottom: "1.5rem" }}>
        <div className="tools-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div>
            <label style={toolLabelStyle}>Aylık Ortalama Fatura (TL)</label>
            <input
              type="number"
              placeholder="Örn: 2500"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(e.target.value)}
              style={toolInputStyle}
              {...focus}
            />
          </div>
          <div>
            <label style={toolLabelStyle}>Panel Sayısı (400 Wp)</label>
            <input
              type="number"
              placeholder="Örn: 10"
              value={panelCount}
              onChange={(e) => setPanelCount(e.target.value)}
              style={toolInputStyle}
              {...focus}
            />
          </div>
          <div>
            <label style={toolLabelStyle}>Tarife Türü</label>
            <select
              value={tariffType}
              onChange={(e) => setTariffType(e.target.value as keyof typeof BILL_TARIFFS)}
              style={{ ...toolInputStyle, cursor: "pointer" }}
              {...focus}
            >
              {Object.entries(BILL_TARIFFS).map(([key, t]) => (
                <option key={key} value={key}>
                  {t.name} — {t.rate} TL/kWh
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={toolLabelStyle}>Şehir</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ ...toolInputStyle, cursor: "pointer" }}
              {...focus}
            >
              {Object.keys(BILL_CITY_PEAK).map((key) => (
                <option key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="button"
          className="btn-primary-custom"
          style={{ marginTop: "1.5rem", width: "100%", justifyContent: "center", gap: "0.5rem" }}
          onClick={calculate}
        >
          <Zap size={16} />
          Tasarrufu Hesapla
        </button>
      </div>
      {result ? (
        <div style={{ animation: "fadeInUp 0.35s ease" }}>
          <div
            className="tools-grid-2"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "1rem" }}
          >
            <ToolStatCard label="Aylık Tasarruf" value={result.monthlySaving.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} unit="TL" />
            <ToolStatCard label="Yıllık Tasarruf" value={result.annualSaving.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} unit="TL" highlight />
            <ToolStatCard label="Geri Ödeme" value={result.payback.toFixed(1)} unit="yıl" />
            <ToolStatCard label="CO₂ Azaltımı" value={result.co2Saved.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} unit="kg/yıl" />
          </div>
          <button type="button" className="btn-outline-custom" onClick={share} style={{ width: "100%", justifyContent: "center", marginBottom: "1rem" }}>
            <Share2 size={14} />
            Paylaş
          </button>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.6 }}>
            * Bu hesaplama EPDK 2025 tarifelerine ve TEİAŞ verilerine dayanmaktadır. Gerçek değerler kurulum koşullarına göre
            farklılık gösterebilir. Kesin fiyat teklifi için{" "}
            <Link href="/contact" style={{ color: "#2563eb", textDecoration: "none" }}>
              bizimle iletişime geçin
            </Link>
            .
          </p>
        </div>
      ) : null}
    </ToolLayout>
  );
}
