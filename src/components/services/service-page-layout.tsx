"use client";

import type { ServicePageVisual } from "@/lib/services/service-page-config";
import { siteConfig } from "@/lib/site-config";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Mail,
  Phone,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

function ServiceFaqRow({
  q,
  a,
  last,
  accentColor,
}: {
  q: string;
  a: string;
  last: boolean;
  accentColor: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: last ? "none" : "1px solid var(--border-card)" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 1.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "1rem",
          color: open ? accentColor : "var(--text-primary)",
          fontFamily: "inherit",
          fontSize: "0.9375rem",
          fontWeight: 600,
          transition: "color 0.2s",
        }}
      >
        {q}
        <span
          style={{
            flexShrink: 0,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: open ? accentColor : "var(--bg-section-alt)",
            border: `1px solid ${open ? accentColor : "var(--border-card)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            color: open ? "#fff" : "var(--text-muted)",
            lineHeight: 1,
          }}
        >
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? (
        <p
          style={{
            margin: 0,
            padding: "0 1.5rem 1.25rem",
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
            lineHeight: 1.75,
          }}
        >
          {a}
        </p>
      ) : null}
    </div>
  );
}

export function ServicePageLayout({ visual }: { visual: ServicePageVisual }) {
  const { t } = useMirrorT();
  const [qualityOpen, setQualityOpen] = useState(false);

  const key = visual.catalogKey;
  const Icon = visual.icon;
  const phoneHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;

  const benefits = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => t(`svc.${key}.benefits.${i}`)).filter(
        (text, i) => text && text !== `svc.${key}.benefits.${i}`,
      ),
    [t, key],
  );

  const features = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        title: t(`svc.${key}.features.${i}.title`),
        desc: t(`svc.${key}.features.${i}.desc`),
      })).filter((row, i) => row.title && row.title !== `svc.${key}.features.${i}.title`),
    [t, key],
  );

  const process = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        step: t(`svc.${key}.process.${i}.step`),
        title: t(`svc.${key}.process.${i}.title`),
        desc: t(`svc.${key}.process.${i}.desc`),
      })).filter((row, i) => row.title && row.title !== `svc.${key}.process.${i}.title`),
    [t, key],
  );

  const faqs = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        q: t(`svc.${key}.faqs.${i}.q`),
        a: t(`svc.${key}.faqs.${i}.a`),
      })).filter((row, i) => row.q && row.q !== `svc.${key}.faqs.${i}.q`),
    [t, key],
  );

  const badge = t(`svc.${key}.badge`);
  const badgeLabel = badge !== `svc.${key}.badge` ? badge : undefined;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)" }}>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: 480,
          display: "flex",
          alignItems: "flex-end",
          paddingTop: "calc(var(--site-chrome-bottom) + 3rem)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `url('${visual.heroImage}') center/cover no-repeat`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(2,6,23,0.35) 0%, rgba(2,6,23,0.82) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 1.5rem 4rem",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.875rem",
              background: `${visual.accentColor}22`,
              border: `1px solid ${visual.accentColor}44`,
              borderRadius: "9999px",
              marginBottom: "1.25rem",
            }}
          >
            <span style={{ color: visual.accentColor, display: "flex" }}>
              <Icon size={16} />
            </span>
            {badgeLabel ? (
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: visual.accentColor,
                  letterSpacing: "0.05em",
                }}
              >
                {badgeLabel}
              </span>
            ) : null}
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#f8fafc",
              margin: "0 0 1rem",
              maxWidth: 700,
            }}
          >
            {t(`svc.${key}.title`)}
          </h1>
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.8vw, 1.125rem)",
              color: "rgba(248,250,252,0.7)",
              maxWidth: 560,
              lineHeight: 1.75,
              margin: "0 0 2rem",
            }}
          >
            {t(`svc.${key}.subtitle`)}
          </p>
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.75rem",
                background: visual.accentColor,
                borderRadius: "9999px",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#fff",
                textDecoration: "none",
                boxShadow: `0 4px 20px ${visual.accentColor}55`,
              }}
            >
              {t("svc.get_quote")} <ArrowRight size={15} />
            </Link>
            <Link
              href={phoneHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.8rem 2rem",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "9999px",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#fff",
                textDecoration: "none",
                backdropFilter: "blur(10px)",
              }}
            >
              <Phone size={14} /> {t("svc.call_now")}
            </Link>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-page)", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          <div
            className="svc-intro-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.6fr",
              gap: "4rem",
              alignItems: "start",
            }}
          >
            <div className="svc-intro-left" style={{ top: "6.5rem" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "1rem",
                  background: visual.accentBg,
                  border: `1px solid ${visual.accentBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: visual.accentColor,
                  marginBottom: "1.5rem",
                }}
              >
                <Icon size={26} />
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  margin: "0 0 1rem",
                  lineHeight: 1.2,
                }}
              >
                {t("svc.details")}
              </h2>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  margin: "0 0 2rem",
                }}
              >
                {t(`svc.${key}.intro`)}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {benefits.map((text) => (
                  <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                    <CheckCircle2
                      size={16}
                      color={visual.accentColor}
                      style={{ flexShrink: 0, marginTop: 2 }}
                    />
                    <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "2rem" }}>
                <button
                  type="button"
                  onClick={() => setQualityOpen(true)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.625rem 1.25rem",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-card)",
                    borderRadius: "0.5rem",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  <FileText size={14} />
                  {t("svc.quality_docs")}
                </button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {features.map((feat, idx) => (
                <div
                  key={feat.title}
                  className="glass-card"
                  style={{
                    borderRadius: "1.25rem",
                    padding: "1.5rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "0.625rem",
                      flexShrink: 0,
                      background: visual.accentBg,
                      border: `1px solid ${visual.accentBorder}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.875rem",
                      fontWeight: 800,
                      color: visual.accentColor,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 0.375rem", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {feat.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-section-alt)", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-label" style={{ display: "inline-flex", marginBottom: "0.875rem" }}>
              {t("svc.process_label")}
            </span>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                margin: "0.75rem 0 0",
              }}
            >
              {t("svc.process_title")}
            </h2>
          </div>
          <div
            className="svc-process-grid"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${process.length}, 1fr)`,
              gap: "1rem",
            }}
          >
            {process.map((step) => (
              <div
                key={step.title}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                  borderRadius: "1.25rem",
                  padding: "1.5rem",
                  overflow: "hidden",
                }}
              >
                <p
                  style={{
                    margin: "0 0 0.75rem",
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    color: visual.accentColor,
                    opacity: 0.15,
                    lineHeight: 1,
                  }}
                >
                  {step.step}
                </p>
                <h3 style={{ margin: "0 0 0.5rem", fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  {step.title}
                </h3>
                <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {faqs.length > 0 ? (
        <section style={{ background: "var(--bg-page)", padding: "5rem 0" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                {t("faq.heading")}
              </h2>
            </div>
            <div
              style={{
                border: "1px solid var(--border-card)",
                borderRadius: "1rem",
                overflow: "hidden",
              }}
            >
              {faqs.map((faq, i) => (
                <ServiceFaqRow
                  key={faq.q}
                  q={faq.q}
                  a={faq.a}
                  last={i === faqs.length - 1}
                  accentColor={visual.accentColor}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section
        style={{
          background: `linear-gradient(135deg, #1e3a8a 0%, ${visual.accentColor} 100%)`,
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
            {t("svc.cta.title")}
          </h2>
          <p style={{ margin: "0 0 2rem", fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
            {t("svc.cta.subtitle")}
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
              }}
            >
              <Mail size={15} /> {t("svc.cta.contact")}
            </Link>
            <Link
              href="/tools/quick-quote"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.8rem 2rem",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.9375rem",
                borderRadius: "9999px",
                textDecoration: "none",
              }}
            >
              {t("svc.cta.quote")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {qualityOpen ? (
        <div
          role="presentation"
          onClick={() => setQualityOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              width: "100%",
              maxWidth: 820,
              height: "85vh",
              borderRadius: "1.25rem",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              animation: "modalIn 0.25s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.5rem",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <span style={{ fontWeight: 700, color: "#0f172a" }}>{t("svc.quality_docs_title")}</span>
              <button
                type="button"
                onClick={() => setQualityOpen(false)}
                aria-label="Kapat"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                  display: "flex",
                }}
              >
                <X size={20} />
              </button>
            </div>
            <iframe
              src="/assets/pdf/yst_quality_assurance.pdf"
              title={t("svc.quality_docs_title")}
              style={{ flex: 1, border: "none", width: "100%" }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
