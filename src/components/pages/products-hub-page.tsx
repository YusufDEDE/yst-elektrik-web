"use client";

import { PdfViewerModal } from "@/components/publications/pdf-viewer-modal";
import { brandHubProductHref, brandsHubEntries } from "@/lib/products/brands-hub";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import { useTheme } from "@/providers/theme-provider";
import { ArrowRight, FileText, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const YST_QUALITY_PDF = "/assets/pdf/yst_quality_assurance.pdf";

export function ProductsHubPage() {
  const { t } = useMirrorT();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [pdf, setPdf] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    if (!pdf) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPdf(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [pdf]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-page)" }}>
      <section
        style={{
          padding: "calc(var(--site-chrome-bottom) + 4rem) 1rem 4rem",
          background: isDark
            ? "linear-gradient(135deg, #0a0f1e 0%, #0f1d3a 25%, #162650 50%, #1a1f40 75%, #0d1225 100%)"
            : "linear-gradient(135deg, #0f2044 0%, #1a3a6e 20%, #1e50a0 45%, #2563eb 70%, #1a3a6e 100%)",
          borderBottom: "1px solid var(--border-card)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 20% 40%, rgba(59,130,246,0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(37,99,235,0.12) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -40,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(96,165,250,0.08)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "rgba(99,102,241,0.06)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1
            style={{
              margin: "0 0 1rem",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: "#f8fafc",
              letterSpacing: "-0.03em",
            }}
          >
            {t("brands.title")}
          </h1>
          <p
            style={{
              margin: "0 auto",
              fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
              color: "rgba(248,250,252,0.85)",
              maxWidth: 600,
              lineHeight: 1.6,
            }}
          >
            {t("brands.desc")}
          </p>
        </div>
      </section>

      <section style={{ padding: "4rem 1rem", flex: 1 }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {brandsHubEntries.map((entry) => (
            <div
              key={entry.id}
              id={entry.id}
              style={{
                flex: "1 1 300px",
                maxWidth: 340,
                padding: "2.5rem",
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                borderRadius: "1.5rem",
                boxShadow: isDark ? "none" : "0 4px 20px rgba(0,0,0,0.03)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 150,
                  height: 150,
                  background: entry.color,
                  opacity: isDark ? 0.05 : 0.03,
                  filter: "blur(40px)",
                  borderRadius: "50%",
                  transform: "translate(30%, -30%)",
                }}
              />
              <div
                style={{
                  height: 64,
                  padding: "0.5rem 1.5rem",
                  borderRadius: "1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "flex-start",
                }}
              >
                <Image
                  src={entry.logo}
                  alt={entry.name}
                  width={100}
                  height={40}
                  unoptimized
                  style={{ objectFit: "contain", maxHeight: "100%", maxWidth: "100%", width: "auto", height: "auto" }}
                />
              </div>
              <div>
                <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>
                  {entry.name}
                </h2>
                <p style={{ margin: 0, fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {t(entry.descKey)}
                </p>
              </div>
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid var(--border-card)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <Link
                  href={brandHubProductHref(entry)}
                  className="brand-hub-view-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.6rem 1.25rem",
                    background: "transparent",
                    border: "1px solid var(--border-card)",
                    borderRadius: "9999px",
                    color: "var(--text-primary)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--section-label-bg)";
                    e.currentTarget.style.borderColor = entry.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "var(--border-card)";
                  }}
                >
                  {t("brands.btn.view")}
                  <ArrowRight size={16} color={entry.color} />
                </Link>
                {entry.certificate ? (
                  <button
                    type="button"
                    onClick={() => setPdf({ url: entry.certificate!, title: t("brands.btn.cert") })}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.6rem 1.25rem",
                      background: "transparent",
                      border: "1px solid var(--border-card)",
                      borderRadius: "9999px",
                      color: "var(--text-primary)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--section-label-bg)";
                      e.currentTarget.style.borderColor = "#22c55e";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "var(--border-card)";
                    }}
                  >
                    <FileText size={16} color="#22c55e" />
                    {t("brands.btn.cert")}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPdf({ url: YST_QUALITY_PDF, title: t("brands.btn.quality") })}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.6rem 1.25rem",
                      background: "rgba(245, 158, 11, 0.1)",
                      border: "1px solid rgba(245, 158, 11, 0.2)",
                      borderRadius: "9999px",
                      color: "#f59e0b",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.2s",
                    }}
                  >
                    <Shield size={16} color="#f59e0b" />
                    {t("brands.btn.quality")}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {pdf ? <PdfViewerModal open title={pdf.title} src={pdf.url} onClose={() => setPdf(null)} /> : null}
    </div>
  );
}
