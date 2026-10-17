"use client";

import { getToolTitle } from "@/lib/tool-labels";
import { TOOL_NAV_ORDER, toolNavShortKey } from "@/lib/tools/tool-nav-config";
import type { ToolSlug } from "@/lib/site-config";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import {
  Battery,
  Calculator,
  FileText,
  Flame,
  Leaf,
  TrendingDown,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const TOOL_ICONS: Record<ToolSlug, ReactNode> = {
  "bill-savings": <TrendingDown size={16} />,
  "solar-calculator": <Zap size={16} />,
  "fire-system-selector": <Flame size={16} />,
  "bess-calculator": <Battery size={16} />,
  "quick-quote": <FileText size={16} />,
  "carbon-calculator": <Leaf size={16} />,
  "electricity-prices": <Calculator size={16} />,
};

export function ToolsNav() {
  const pathname = usePathname();
  const { t } = useMirrorT();

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto 2.5rem", padding: "0 1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
        <span
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {t("tools.nav.heading")}
        </span>
        <div style={{ flex: 1, height: "1px", background: "var(--border-card)" }} />
      </div>
      <div
        className="tools-nav-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5rem" }}
      >
        {TOOL_NAV_ORDER.map((slug) => {
          const href = `/tools/${slug}` as const;
          const active = pathname === href;
          const label = getToolTitle(t, slug);
          const short = t(toolNavShortKey(slug));

          return (
            <Link
              key={slug}
              href={href}
              title={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.625rem 0.375rem",
                borderRadius: "0.875rem",
                textDecoration: "none",
                border: `1px solid ${active ? "#2563eb" : "var(--border-card)"}`,
                background: active ? "rgba(37,99,235,0.1)" : "var(--bg-card)",
                color: active ? "#2563eb" : "var(--text-secondary)",
                transition: "all 0.18s ease",
                position: "relative",
                overflow: "hidden",
                boxShadow: active
                  ? "0 0 0 1px rgba(37,99,235,0.3), 0 2px 8px rgba(37,99,235,0.12)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (active) return;
                const el = e.currentTarget;
                el.style.borderColor = "rgba(37,99,235,0.4)";
                el.style.background = "var(--bg-card-hover)";
                el.style.color = "#2563eb";
              }}
              onMouseLeave={(e) => {
                if (active) return;
                const el = e.currentTarget;
                el.style.borderColor = "var(--border-card)";
                el.style.background = "var(--bg-card)";
                el.style.color = "var(--text-secondary)";
              }}
            >
              {active ? (
                <span
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#2563eb",
                  }}
                />
              ) : null}
              <span style={{ lineHeight: 1 }}>{TOOL_ICONS[slug]}</span>
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: active ? 700 : 500,
                  textAlign: "center",
                  lineHeight: 1.3,
                  letterSpacing: "0.01em",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {short}
              </span>
            </Link>
          );
        })}
      </div>
      <style>{`
        @media (max-width: 600px) {
          .tools-nav-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (max-width: 360px) {
          .tools-nav-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
