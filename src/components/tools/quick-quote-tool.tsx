"use client";

import { ToolLayout } from "@/components/tools/tool-layout";
import { siteConfig } from "@/lib/site-config";
import { toolInputFocusHandlers, toolInputStyle, toolLabelStyle } from "@/lib/tools/tool-ui";
import { ArrowLeft, ArrowRight, CheckCircle, Send } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";

const STEPS = [
  { id: "service", title: "Hizmet Seçimi" },
  { id: "details", title: "Proje Detayları" },
  { id: "contact", title: "İletişim Bilgileri" },
] as const;

const SERVICES = [
  { value: "ges", label: "Güneş Enerjisi (GES)", icon: "☀️" },
  { value: "bess", label: "Batarya / BESS Sistemi", icon: "🔋" },
  { value: "iot", label: "IoT Destekli Solar Panel", icon: "📡" },
  { value: "fire", label: "Yangın Söndürme Sistemi", icon: "🔥" },
  { value: "energy", label: "İleri Seviye Enerji Sistemleri", icon: "⚡" },
  { value: "other", label: "Diğer / Birden Fazla Hizmet", icon: "🔧" },
] as const;

const BUDGETS = [
  { value: "lt100", label: "100.000 TL altı" },
  { value: "100-500", label: "100.000 – 500.000 TL" },
  { value: "500-1m", label: "500.000 TL – 1 Milyon TL" },
  { value: "gt1m", label: "1 Milyon TL üzeri" },
  { value: "unknown", label: "Henüz bilmiyorum" },
] as const;

export function QuickQuoteTool() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [areaSize, setAreaSize] = useState("");
  const [budget, setBudget] = useState("");
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const focus = toolInputFocusHandlers("#10b981", "rgba(16,185,129,0.1)");

  function submit(e: FormEvent) {
    e.preventDefault();
    const serviceLabel = SERVICES.find((s) => s.value === service)?.label ?? service;
    const budgetLabel = BUDGETS.find((b) => b.value === budget)?.label ?? budget;
    const text = `Merhaba, YST Elektrik Teklif Formu üzerinden ulaşıyorum.

*Hizmet:* ${serviceLabel}
*Alan Büyüklüğü:* ${areaSize || "–"}
*Bütçe:* ${budgetLabel}
*Not:* ${note || "–"}

*İsim:* ${name}
*Telefon:* ${phone}
*E-posta:* ${email}`;
    const waPhone = siteConfig.phone.replace(/[^\d]/g, "");
    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <ToolLayout
        title="Yapılandırılmış Teklif Formu"
        description="3 adımda projenizi tanımlayın, size özel teklifimizi WhatsApp ve e-posta üzerinden anında iletelim."
      >
        <div
          className="glass-card"
          style={{ borderRadius: "1.5rem", padding: "3rem 2rem", textAlign: "center", animation: "fadeInUp 0.35s ease" }}
        >
          <CheckCircle size={56} color="#10b981" style={{ margin: "0 auto 1.25rem" }} />
          <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.375rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Talebiniz İletildi!
          </h3>
          <p style={{ margin: "0 0 1.75rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            WhatsApp üzerinden teklif talebiniz açıldı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
          </p>
          <Link href="/" className="btn-primary-custom">
            Ana Sayfaya Dön
          </Link>
        </div>
      </ToolLayout>
    );
  }

  return (
    <ToolLayout
      title="Yapılandırılmış Teklif Formu"
      description="3 adımda projenizi tanımlayın, size özel teklifimizi WhatsApp ve e-posta üzerinden anında iletelim."
    >
      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {STEPS.map((s, i) => (
          <span
            key={s.id}
            style={{
              fontSize: "0.75rem",
              fontWeight: i === step ? 700 : 500,
              padding: "0.35rem 0.75rem",
              borderRadius: "999px",
              background: i === step ? "rgba(16,185,129,0.12)" : "var(--bg-section-alt)",
              color: i === step ? "#10b981" : "var(--text-muted)",
              border: `1px solid ${i === step ? "rgba(16,185,129,0.35)" : "var(--border-card)"}`,
            }}
          >
            {i + 1}. {s.title}
          </span>
        ))}
      </div>
      <form onSubmit={submit}>
        <div className="glass-card" style={{ borderRadius: "1.5rem", padding: "2rem", marginBottom: "1.25rem" }}>
          {step === 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "0.75rem" }}>
              {SERVICES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setService(s.value)}
                  style={{
                    padding: "1rem",
                    borderRadius: "1rem",
                    border: `1px solid ${service === s.value ? "#10b981" : "var(--border-card)"}`,
                    background: service === s.value ? "rgba(16,185,129,0.08)" : "var(--bg-card)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.35rem" }}>{s.icon}</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)" }}>{s.label}</span>
                </button>
              ))}
            </div>
          ) : null}
          {step === 1 ? (
            <div className="tools-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={toolLabelStyle}>Alan / Kapasite Bilgisi</label>
                <input
                  type="text"
                  placeholder="Örn: 500 m² çatı, 50 kWp hedef"
                  value={areaSize}
                  onChange={(e) => setAreaSize(e.target.value)}
                  style={toolInputStyle}
                  {...focus}
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={toolLabelStyle}>Bütçe Aralığı</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  style={{ ...toolInputStyle, cursor: "pointer" }}
                  {...focus}
                >
                  <option value="">Seçin</option>
                  {BUDGETS.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={toolLabelStyle}>Ek Not</label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{ ...toolInputStyle, resize: "vertical" }}
                  {...focus}
                />
              </div>
            </div>
          ) : null}
          {step === 2 ? (
            <div className="tools-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div>
                <label style={toolLabelStyle}>Ad Soyad</label>
                <input required value={name} onChange={(e) => setName(e.target.value)} style={toolInputStyle} {...focus} />
              </div>
              <div>
                <label style={toolLabelStyle}>Telefon</label>
                <input required value={phone} onChange={(e) => setPhone(e.target.value)} style={toolInputStyle} {...focus} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={toolLabelStyle}>E-posta</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={toolInputStyle} {...focus} />
              </div>
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "space-between" }}>
          {step > 0 ? (
            <button type="button" className="btn-outline-custom" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft size={16} />
              Geri
            </button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              className="btn-primary-custom"
              disabled={step === 0 && !service}
              onClick={() => setStep((s) => s + 1)}
            >
              İleri
              <ArrowRight size={16} />
            </button>
          ) : (
            <button type="submit" className="btn-primary-custom" style={{ background: "#10b981" }}>
              <Send size={16} />
              WhatsApp ile Gönder
            </button>
          )}
        </div>
      </form>
    </ToolLayout>
  );
}
