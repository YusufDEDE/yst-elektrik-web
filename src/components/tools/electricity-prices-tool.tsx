"use client";

import { ToolLayout } from "@/components/tools/tool-layout";
import { ToolStatCard } from "@/components/tools/tool-stat-card";
import { ELECTRICITY_BASE_HOURLY } from "@/lib/tools/tool-ui";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type HourPoint = { hour: string; price: number };

function loadMockPrices(): HourPoint[] {
  return ELECTRICITY_BASE_HOURLY.map((base, t) => ({
    hour: `${String(t).padStart(2, "0")}:00`,
    price: base + Math.round((Math.random() - 0.5) * 40),
  }));
}

export function ElectricityPricesTool() {
  const [points, setPoints] = useState<HourPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);
  const [updatedAt, setUpdatedAt] = useState("");

  const refresh = useCallback(() => {
    setLoading(true);
    window.setTimeout(() => {
      setPoints(loadMockPrices());
      setDemo(true);
      setUpdatedAt(new Date().toLocaleTimeString("tr-TR"));
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(refresh, 0);
    return () => clearTimeout(t);
  }, [refresh]);

  const stats = useMemo(() => {
    if (!points.length) return null;
    const prices = points.map((p) => p.price);
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    const max = Math.max(...prices);
    const min = Math.min(...prices);
    const current = points[new Date().getHours()]?.price ?? prices[0];
    return { avg, max, min, current };
  }, [points]);

  const chartMax = stats?.max ?? 1;

  return (
    <ToolLayout
      title="Saatlik Elektrik Fiyat Takibi"
      description="Türkiye elektrik piyasasındaki günlük saatlik spot fiyatları takip edin. BESS yatırımınızın arbitraj değerini görün."
    >
      {demo && !loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            padding: "0.875rem 1.125rem",
            background: "rgba(234,179,8,0.08)",
            border: "1px solid rgba(234,179,8,0.25)",
            borderRadius: "0.875rem",
            marginBottom: "1.25rem",
          }}
        >
          <AlertTriangle size={18} color="#ca8a04" style={{ flexShrink: 0, marginTop: "2px" }} />
          <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Gösterilen veriler demo amaçlı simüle edilmiş saatlik PTF örnekleridir. Canlı EPİAŞ entegrasyonu prod ortamında
            güncellenir.
          </p>
        </div>
      ) : null}

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button type="button" className="btn-outline-custom" onClick={refresh} disabled={loading}>
          <RefreshCw
            size={14}
            style={loading ? { animation: "spin 0.8s linear infinite" } : undefined}
          />
          {loading ? "Yükleniyor…" : "Yenile"}
        </button>
      </div>

      {stats ? (
        <div
          className="tools-grid-2"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "1.25rem" }}
        >
          <ToolStatCard label="Güncel Saat" value={stats.current.toLocaleString("tr-TR")} unit="TL/MWh" highlight />
          <ToolStatCard label="Günlük Ortalama" value={Math.round(stats.avg).toLocaleString("tr-TR")} unit="TL/MWh" />
          <ToolStatCard label="En Düşük" value={stats.min.toLocaleString("tr-TR")} unit="TL/MWh" />
          <ToolStatCard label="En Yüksek" value={stats.max.toLocaleString("tr-TR")} unit="TL/MWh" />
        </div>
      ) : null}

      {points.length ? (
        <div className="glass-card" style={{ borderRadius: "1.5rem", padding: "1.5rem", animation: "fadeInUp 0.35s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", alignItems: "baseline" }}>
            <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700 }}>24 Saatlik Profil</h3>
            {updatedAt ? (
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Son güncelleme: {updatedAt}</span>
            ) : null}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "180px" }}>
            {points.map((p) => {
              const h = Math.max(8, (p.price / chartMax) * 160);
              const isNow = p.hour.startsWith(String(new Date().getHours()).padStart(2, "0"));
              return (
                <div
                  key={p.hour}
                  title={`${p.hour}: ${p.price} TL/MWh`}
                  style={{
                    flex: 1,
                    height: h,
                    borderRadius: "4px 4px 0 0",
                    background: isNow ? "#2563eb" : "rgba(37,99,235,0.45)",
                    transition: "height 0.3s ease",
                  }}
                />
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", fontSize: "0.65rem", color: "var(--text-muted)" }}>
            <span>00:00</span>
            <span>12:00</span>
            <span>23:00</span>
          </div>
        </div>
      ) : null}
    </ToolLayout>
  );
}
