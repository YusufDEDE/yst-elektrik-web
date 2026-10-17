"use client";

import { FaqAccordion } from "@/components/ui/faq-accordion";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  FileText,
  Leaf,
  ShieldCheck,
  Target,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="section-label">{children}</span>;
}

export function AboutPage() {
  const { t } = useMirrorT();
  const [sfaModalOpen, setSfaModalOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSfaModalOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const faqItems = useMemo(
    () =>
      [0, 1, 2, 3, 4].map((i) => ({
        q: t(`faq.${i}.question`),
        a: t(`faq.${i}.answer`),
      })),
    [t],
  );

  const stats = [
    { value: "2017", label: t("about.stats.year") },
    { value: "10+", label: t("about.stats.exp") },
    { value: "100+", label: t("about.stats.proj") },
    { value: "3", label: t("about.stats.partner") },
  ];

  const values = [
    {
      icon: <ShieldCheck size={24} color="#2563eb" />,
      title: t("about.values.trust.title"),
      desc: t("about.values.trust.desc"),
    },
    {
      icon: <Award size={24} color="#f59e0b" />,
      title: t("about.values.quality.title"),
      desc: t("about.values.quality.desc"),
    },
    {
      icon: <Leaf size={24} color="#10b981" />,
      title: t("about.values.sustain.title"),
      desc: t("about.values.sustain.desc"),
    },
    {
      icon: <Zap size={24} color="#8b5cf6" />,
      title: t("about.values.easy.title"),
      desc: t("about.values.easy.desc"),
    },
  ];

  const history = [
    {
      year: "2026",
      title: (
        <Link
          href="https://byst-energy.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          }}
        >
          {t("about.history.2026.title")}
        </Link>
      ),
      desc: t("about.history.2026.desc"),
      icon: "🌐",
    },
    {
      year: "2024",
      title: t("about.history.2024.title"),
      desc: t("about.history.2024.desc"),
      icon: "♻️",
    },
    {
      year: "2021",
      title: t("about.history.2021.title"),
      desc: t("about.history.2021.desc"),
      icon: "🌍",
    },
    {
      year: "2019",
      title: t("about.history.2019.title"),
      desc: t("about.history.2019.desc"),
      icon: "📈",
    },
    {
      year: "2017",
      title: t("about.history.2017.title"),
      desc: t("about.history.2017.desc"),
      icon: "🚀",
    },
  ];

  const sfaFeatures = [
    t("about.sfa.card.feat1"),
    t("about.sfa.card.feat2"),
    t("about.sfa.card.feat3"),
    t("about.sfa.card.feat4"),
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", paddingTop: "9rem" }}>
      <section
        style={{
          background: "var(--bg-page)",
          padding: "5rem 0 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="dot-grid"
          style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }}
        />
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", position: "relative" }}>
          <SectionLabel>{t("about.badge.corporate")}</SectionLabel>
          <div
            className="about-grid-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  color: "var(--text-primary)",
                  margin: "0.5rem 0 1.25rem",
                  maxWidth: 720,
                }}
              >
                {t("about.hero.title")}
              </h1>
              <p
                style={{
                  fontSize: "1.0625rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  maxWidth: 580,
                  margin: "0 0 2.5rem",
                }}
              >
                {t("about.hero.desc")}
              </p>
              <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                {stats.map((s) => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "2rem",
                        fontWeight: 800,
                        color: "#2563eb",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {s.value}
                    </p>
                    <p
                      style={{
                        margin: "0.2rem 0 0",
                        fontSize: "0.8125rem",
                        color: "var(--text-muted)",
                        fontWeight: 500,
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: "1.5rem",
                overflow: "hidden",
                border: "1px solid var(--border-card)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.1)",
                transform: "perspective(1000px) rotateY(-5deg)",
                transition: "transform 0.4s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "perspective(1000px) rotateY(0deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "perspective(1000px) rotateY(-5deg)";
              }}
            >
              <Image
                src="/assets/images/about/hero.jpg"
                alt="YST Elektrik About Hero"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-section-alt)", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          <div
            className="about-grid-2"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
          >
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                borderRadius: "1.5rem",
                padding: "2.5rem",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "1rem",
                  background: "rgba(37,99,235,0.1)",
                  border: "1px solid rgba(37,99,235,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}
              >
                <Target size={24} color="#2563eb" />
              </div>
              <h2
                style={{
                  margin: "0 0 1rem",
                  fontSize: "1.375rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                {t("about.mission.title")}
              </h2>
              <p style={{ margin: 0, fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                {t("about.mission.desc")}
              </p>
            </div>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                borderRadius: "1.5rem",
                padding: "2.5rem",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "1rem",
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}
              >
                <Zap size={24} color="#8b5cf6" />
              </div>
              <h2
                style={{
                  margin: "0 0 1rem",
                  fontSize: "1.375rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                {t("about.vision.title")}
              </h2>
              <p style={{ margin: 0, fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                {t("about.vision.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-page)", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <SectionLabel>{t("about.values.badge")}</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                margin: "0.75rem 0 0",
              }}
            >
              {t("about.values.title")}
            </h2>
          </div>
          <div
            className="about-grid-2"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}
          >
            {values.map((v) => (
              <div
                key={v.title}
                className="glass-card glass-card-hover"
                style={{ borderRadius: "1.25rem", padding: "2rem" }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "0.875rem",
                    background: "var(--bg-section-alt)",
                    border: "1px solid var(--border-card)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  {v.icon}
                </div>
                <h3 style={{ margin: "0 0 0.625rem", fontSize: "1.0625rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  {v.title}
                </h3>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.75 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-section-alt)", padding: "5rem 0" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionLabel>
              <Calendar size={12} /> {t("about.history.badge")}
            </SectionLabel>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                margin: "0.75rem 0 0",
              }}
            >
              {t("about.history.title")}
            </h2>
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 80,
                top: 0,
                bottom: 0,
                width: 2,
                background: "linear-gradient(to bottom, #2563eb, rgba(37,99,235,0.1))",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {history.map((item, idx) => (
                <div key={item.year} style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, width: 60, textAlign: "right" }}>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 800,
                        color: "#2563eb",
                        display: "block",
                        lineHeight: 1,
                      }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <div
                    style={{
                      flexShrink: 0,
                      width: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "var(--bg-page)",
                        border: "2px solid #2563eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.125rem",
                      }}
                    >
                      {item.icon}
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-card)",
                      borderRadius: "1rem",
                      padding: "1.5rem",
                    }}
                  >
                    <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {item.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" style={{ background: "var(--bg-page)", padding: "5rem 0" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <SectionLabel>{t("nav.corp.faq")}</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                margin: "0.75rem 0 0",
              }}
            >
              {t("faq.heading")}
            </h2>
          </div>
          <FaqAccordion items={faqItems} initialOpen={0} />
        </div>
      </section>

      <section id="sfa-yetki" style={{ background: "var(--bg-section-alt)", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          <div
            className="about-grid-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div>
              <SectionLabel>{t("about.sfa.badge")}</SectionLabel>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  margin: "0.75rem 0 1.25rem",
                }}
              >
                {t("about.sfa.title")}
              </h2>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
                {t("about.sfa.desc1")}
              </p>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.8, margin: "0 0 2rem" }}>
                {t("about.sfa.desc2")}
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn-primary-custom"
                  style={{ gap: "0.5rem" }}
                  onClick={() => setSfaModalOpen(true)}
                >
                  <FileText size={15} />
                  {t("about.sfa.btn.view")}
                </button>
                <Link href="/contact" className="btn-outline-custom" style={{ gap: "0.5rem" }}>
                  <ArrowRight size={14} />
                  {t("about.sfa.btn.contact")}
                </Link>
              </div>
            </div>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                borderRadius: "1.5rem",
                padding: "2.5rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "0 auto 1.5rem",
                  border: "3px solid rgba(37,99,235,0.2)",
                }}
              >
                <Image
                  src="/assets/images/logo/logo_yst_circle.png"
                  alt="YST Elektrik"
                  width={80}
                  height={80}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>
                {t("about.sfa.card.title")}
              </h3>
              <p style={{ margin: "0 0 2rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                {t("about.sfa.card.subtitle")}
              </p>
              {sfaFeatures.map((feat) => (
                <div
                  key={feat}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    background: "var(--bg-section-alt)",
                    borderRadius: "0.75rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <CheckCircle2 size={16} color="#10b981" />
                  <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 500 }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)",
          padding: "4rem 0",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <h2
            style={{
              margin: "0 0 1rem",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
            }}
          >
            {t("about.cta.title")}
          </h2>
          <p style={{ margin: "0 0 2rem", fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
            {t("about.cta.desc")}
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.8rem 2rem",
                background: "#fff",
                color: "#1d4ed8",
                fontWeight: 700,
                fontSize: "0.9375rem",
                borderRadius: "9999px",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
            >
              {t("about.cta.btn.contact")} <ArrowRight size={15} />
            </Link>
            <Link
              href="/tools/quick-quote"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.8rem 2rem",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.9375rem",
                borderRadius: "9999px",
                textDecoration: "none",
              }}
            >
              {t("about.cta.btn.quote")}
            </Link>
          </div>
        </div>
      </section>

      {sfaModalOpen ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          onClick={() => setSfaModalOpen(false)}
          role="presentation"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "1.25rem",
              width: "100%",
              maxWidth: 820,
              height: "85vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
              animation: "modalIn 0.25s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.5rem",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <FileText size={18} color="#60a5fa" />
                <span style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#f8fafc" }}>
                  {t("about.modal.sfa.title")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSfaModalOpen(false)}
                aria-label="Kapat"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "0.5rem",
                  padding: "0.375rem",
                  cursor: "pointer",
                  display: "flex",
                  color: "rgba(248,250,252,0.6)",
                }}
              >
                <X size={16} />
              </button>
            </div>
            <iframe
              src="/assets/pdf/sfa_authorization.pdf"
              title={t("about.modal.sfa.title")}
              style={{ flex: 1, border: "none", width: "100%", background: "#fff" }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
