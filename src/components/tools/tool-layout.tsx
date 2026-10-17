"use client";

import { ToolBreadcrumbs } from "@/components/tools/tool-breadcrumbs";
import { ToolsNav } from "@/components/tools/tools-nav";
import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

type ToolLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function ToolLayout({ title, description, children }: ToolLayoutProps) {
  return (
    <section
      className="site-content-top"
      style={{
        minHeight: "calc(100vh - 5rem)",
        background: "var(--bg-page)",
        paddingTop: "calc(var(--site-chrome-bottom) + 2.5rem)",
        paddingBottom: "6rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="dot-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none" }}
      />
      <div style={{ position: "relative" }}>
        <ToolBreadcrumbs />
        <ToolsNav />
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h1
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "var(--text-primary)",
                margin: "0 0 0.625rem",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              {description}
            </p>
          </div>
          {children}
          <div
            style={{
              marginTop: "2.5rem",
              padding: "1rem 1.25rem",
              background: "rgba(234,179,8,0.07)",
              border: "1px solid rgba(234,179,8,0.25)",
              borderRadius: "0.875rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
            }}
          >
            <AlertTriangle size={16} color="#ca8a04" style={{ flexShrink: 0, marginTop: "2px" }} />
            <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
              <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>Uyarı: </strong>
              Bu araç tarafından üretilen sonuçlar yalnızca{" "}
              <strong style={{ fontWeight: 600 }}>ön bilgi ve tahmini analiz</strong> amacıyla sunulmaktadır.
              Gerçek veriler; saha koşulları, bölgesel tarife değişiklikleri, ekipman özellikleri ve fizibilite
              çalışması sonuçlarına göre önemli ölçüde farklılık gösterebilir. Yatırım kararı vermeden önce{" "}
              <strong style={{ fontWeight: 600 }}>uzman mühendis desteği</strong> ve resmi fizibilite raporu
              almanızı tavsiye ederiz.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
