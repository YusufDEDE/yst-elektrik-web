"use client";

import { fileUrlMeta, isAbsoluteHttpUrl } from "@/lib/publications/file-url-meta";
import { publicationNeedsProxy, publicationViewerSrc } from "@/lib/publications/proxy-url";
import { useTheme } from "@/providers/theme-provider";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { useEffect, useState } from "react";

type PublicationViewerModalProps = {
  open: boolean;
  href: string;
  title: string;
  onClose: () => void;
  /** EPDK badge in header instead of file type */
  badgeLabel?: string;
};

export function PublicationViewerModal({
  open,
  href,
  title,
  onClose,
  badgeLabel,
}: PublicationViewerModalProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const meta = fileUrlMeta(href);
  const isRemote = isAbsoluteHttpUrl(href);
  const isPdf = meta.ext === "PDF";
  const proxiedPdf = isPdf && publicationNeedsProxy(href);
  const showPdfLoader = isPdf && (!isRemote || proxiedPdf);
  const iframeSrc = publicationViewerSrc(href);

  const [loading, setLoading] = useState(showPdfLoader);
  const [loadFailed, setLoadFailed] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    setLoadFailed(false);
    setLoading(showPdfLoader);
    setRetryKey(0);
  }, [open, href, showPdfLoader]);

  useEffect(() => {
    if (!open || !showPdfLoader || !loading) return;
    const timer = window.setTimeout(() => {
      setLoading(false);
      setLoadFailed(true);
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [open, showPdfLoader, loading, retryKey]);

  if (!open) return null;

  const badge = badgeLabel ?? meta.ext;
  const badgeColor = badgeLabel ? "#2563eb" : meta.color;

  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.75rem",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(95vw, 1200px)",
          height: "min(92vh, 880px)",
          background: isDark ? "#0f172a" : "#fff",
          borderRadius: "1.25rem",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.875rem 1.25rem",
            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              padding: "0.25rem 0.5rem",
              background: `${badgeColor}20`,
              border: `1px solid ${badgeColor}40`,
              borderRadius: "0.375rem",
              fontSize: "0.625rem",
              fontWeight: 800,
              color: badgeColor,
              fontFamily: "monospace",
              flexShrink: 0,
            }}
          >
            {badge}
          </div>
          <p
            style={{
              margin: 0,
              flex: 1,
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: isDark ? "#f1f5f9" : "#1e293b",
              lineHeight: 1.4,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Yeni sekmede aç"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "0.5rem",
              background: isDark ? "rgba(37,99,235,0.15)" : "rgba(37,99,235,0.08)",
              border: `1px solid ${isDark ? "rgba(37,99,235,0.3)" : "rgba(37,99,235,0.2)"}`,
              color: "#2563eb",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <ExternalLink size={14} />
          </a>
          {!badgeLabel ? (
            <a
              href={href}
              download
              onClick={(e) => e.stopPropagation()}
              title="İndir"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: "0.5rem",
                background: isDark ? "rgba(37,99,235,0.15)" : "rgba(37,99,235,0.08)",
                border: `1px solid ${isDark ? "rgba(37,99,235,0.3)" : "rgba(37,99,235,0.2)"}`,
                color: "#2563eb",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <Download size={14} />
            </a>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="modal-close-btn"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "0.5rem",
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
              border: "none",
              cursor: "pointer",
              color: isDark ? "#94a3b8" : "#64748b",
              flexShrink: 0,
            }}
          >
            <X size={15} />
          </button>
        </div>
        <div style={{ flex: 1, overflow: "hidden", minHeight: 0, position: "relative" }}>
          {showPdfLoader && loading && !loadFailed ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                background: isDark ? "#0f172a" : "#fff",
                zIndex: 2,
              }}
            >
              <div className="publication-viewer-spinner" />
              <p
                style={{
                  margin: 0,
                  fontSize: "0.8125rem",
                  color: isDark ? "#94a3b8" : "#64748b",
                  fontWeight: 500,
                }}
              >
                Dosya yükleniyor…
              </p>
            </div>
          ) : null}
          {loadFailed ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 320,
                gap: "1rem",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `${meta.color}15`,
                  border: `1px solid ${meta.color}30`,
                  borderRadius: "1rem",
                }}
              >
                <FileText size={28} color={meta.color} />
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.875rem",
                  color: isDark ? "#94a3b8" : "#64748b",
                  textAlign: "center",
                }}
              >
                Bu dosya tarayıcıda önizlenemiyor veya yüklenemedi.
              </p>
              <button
                type="button"
                onClick={() => {
                  setLoadFailed(false);
                  setLoading(true);
                  setRetryKey((k) => k + 1);
                }}
                style={{
                  padding: "0.625rem 1.25rem",
                  background: "#2563eb",
                  border: "none",
                  borderRadius: "0.75rem",
                  color: "#fff",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Tekrar dene
              </button>
            </div>
          ) : (
            <iframe
              key={retryKey}
              src={iframeSrc}
              title={title}
              onLoad={() => {
                if (showPdfLoader) setLoading(false);
              }}
              style={{
                width: "100%",
                height: "100%",
                minHeight: 0,
                border: "none",
                display: "block",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
