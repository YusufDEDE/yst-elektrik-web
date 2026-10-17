"use client";

import { useTheme } from "@/providers/theme-provider";
import { FileText, X } from "lucide-react";

type PdfViewerModalProps = {
  open: boolean;
  title: string;
  src: string;
  onClose: () => void;
};

export function PdfViewerModal({ open, title, src, onClose }: PdfViewerModalProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!open) return null;

  return (
    <div
      role="presentation"
      onClick={onClose}
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
        padding: "0.75rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: isDark ? "#0f172a" : "#fff",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
          borderRadius: "1.25rem",
          width: "min(95vw, 1200px)",
          height: "min(92vh, 880px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          animation: "footerModalIn 0.25s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.5rem",
            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
            flexShrink: 0,
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", minWidth: 0 }}>
            <FileText size={18} color="#22c55e" style={{ flexShrink: 0 }} />
            <span
              style={{
                fontWeight: 700,
                fontSize: "0.9375rem",
                color: isDark ? "#f1f5f9" : "#0f172a",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: isDark ? "#94a3b8" : "#64748b",
              display: "flex",
              flexShrink: 0,
            }}
          >
            <X size={20} />
          </button>
        </div>
        <iframe
          src={`${src}#toolbar=1&navpanes=0`}
          title={title}
          style={{ flex: 1, border: "none", width: "100%", minHeight: 0, display: "block" }}
        />
      </div>
    </div>
  );
}
