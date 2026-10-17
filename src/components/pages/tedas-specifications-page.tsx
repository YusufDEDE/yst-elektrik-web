"use client";

import {
  PublicationBadge,
  PublicationPageHero,
} from "@/components/publications/publication-page-hero";
import { PublicationViewerModal } from "@/components/publications/publication-viewer-modal";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import { fileUrlMeta } from "@/lib/publications/file-url-meta";
import tedasCatalog from "@/lib/publications/tedas-catalog.json";
import type { TedasCategory, TedasSpecItem } from "@/lib/publications/types";
import { useTheme } from "@/providers/theme-provider";
import {
  BookOpen,
  Building2,
  ChevronDown,
  ExternalLink,
  FileText,
  Search,
  Target,
  Wallet,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

const categories = tedasCatalog as TedasCategory[];
const TEDAS_SARTNAMELER_URL =
  "https://www.tedas.gov.tr/A/1/sartnameler/RoutePage/63c658e3d27de36b22f9cef6";

const categoryIcons: Record<string, ReactNode> = {
  strateji: <Target size={16} />,
  mali: <Wallet size={16} />,
  yatirimlar: <Building2 size={16} />,
  varlik: <BookOpen size={16} />,
};

function noteColor(note: string) {
  if (note.includes("yürürlükten kaldırılacak") || note.includes("yürürlükten kalkacak")) {
    return "#ef4444";
  }
  if (note.includes("zorunludur") || note.includes("zorunlu")) return "#f59e0b";
  return "#6b7280";
}

function itemMatches(item: TedasSpecItem, q: string): boolean {
  const lower = q.toLowerCase();
  if (item.title.toLowerCase().includes(lower) || item.code.toLowerCase().includes(lower)) {
    return true;
  }
  return item.children?.some((c) => itemMatches(c, q)) ?? false;
}

function filterItems(items: TedasSpecItem[], q: string): TedasSpecItem[] {
  if (!q) return items;
  const lower = q.toLowerCase();
  return items
    .map((item) => {
      if (item.children?.length) {
        const children = filterItems(item.children, q);
        if (children.length) return { ...item, children };
        if (item.title.toLowerCase().includes(lower) || item.code.toLowerCase().includes(lower)) {
          return item;
        }
        return null;
      }
      return item.title.toLowerCase().includes(lower) || item.code.toLowerCase().includes(lower)
        ? item
        : null;
    })
    .filter(Boolean) as TedasSpecItem[];
}

function TedasSpecRow({
  item,
  isDark,
  depth,
  searchQuery,
  onOpen,
}: {
  item: TedasSpecItem;
  isDark: boolean;
  depth: number;
  searchQuery: string;
  onOpen: (url: string, title: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = (item.children?.length ?? 0) > 0;
  const meta = fileUrlMeta(item.url);
  const hasUrl = item.url !== "#";

  useEffect(() => {
    if (
      searchQuery &&
      item.children?.some(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.code.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    ) {
      setOpen(true);
    }
  }, [searchQuery, item.children]);

  const nc = item.note ? noteColor(item.note) : undefined;

  return (
    <>
      <div
        role="presentation"
        onClick={() => {
          if (hasChildren) setOpen((v) => !v);
          else if (hasUrl) onOpen(item.url, item.title);
        }}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          padding: "0.75rem 1rem",
          paddingLeft: `${1 + 1.5 * depth}rem`,
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"}`,
          cursor: hasChildren || hasUrl ? "pointer" : "default",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        <div
          style={{
            flexShrink: 0,
            minWidth: depth === 0 ? "3.5rem" : "3rem",
            padding: "0.2rem 0.5rem",
            background: isDark ? "rgba(37,99,235,0.15)" : "rgba(37,99,235,0.08)",
            border: `1px solid ${isDark ? "rgba(37,99,235,0.3)" : "rgba(37,99,235,0.2)"}`,
            borderRadius: "0.375rem",
            fontSize: "0.6875rem",
            fontWeight: 700,
            color: "#2563eb",
            textAlign: "center",
            fontFamily: "monospace",
            marginTop: "0.1rem",
          }}
        >
          {item.code}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: hasUrl && !hasChildren ? (isDark ? "#93c5fd" : "#2563eb") : "var(--text-primary)",
              lineHeight: 1.5,
            }}
          >
            {item.title}
          </p>
          {item.note ? (
            <p style={{ margin: "0.25rem 0 0", fontSize: "0.6875rem", color: nc, fontWeight: 500, lineHeight: 1.4 }}>
              ⚠ {item.note}
            </p>
          ) : null}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", flexShrink: 0 }}>
          {hasChildren ? (
            <div
              style={{
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
              }}
            >
              <ChevronDown
                size={13}
                style={{
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                  color: "var(--text-muted)",
                }}
              />
            </div>
          ) : null}
          {hasUrl ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpen(item.url, item.title);
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.25rem 0.625rem",
                background: `${meta.color}18`,
                border: `1px solid ${meta.color}33`,
                borderRadius: "0.375rem",
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: meta.color,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "inherit",
              }}
            >
              <ExternalLink size={10} />
              {meta.ext}
            </button>
          ) : null}
        </div>
      </div>
      {hasChildren && open ? (
        <div
          style={{
            borderLeft: `2px solid ${isDark ? "rgba(37,99,235,0.2)" : "rgba(37,99,235,0.15)"}`,
            marginLeft: `${1 + 1.5 * depth + 1}rem`,
          }}
        >
          {item.children!.map((child) => (
            <TedasSpecRow
              key={child.id}
              item={child}
              isDark={isDark}
              depth={depth + 1}
              searchQuery={searchQuery}
              onOpen={onOpen}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}

function TedasCategoryPanel({
  category,
  isDark,
  searchQuery,
  onOpen,
  title,
  specCountLabel,
}: {
  category: TedasCategory;
  isDark: boolean;
  searchQuery: string;
  onOpen: (url: string, title: string) => void;
  title: string;
  specCountLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const items = useMemo(
    () => (searchQuery ? filterItems(category.items, searchQuery) : category.items),
    [category.items, searchQuery],
  );

  useEffect(() => {
    if (searchQuery) setOpen(true);
  }, [searchQuery]);

  if (searchQuery && items.length === 0) return null;

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        borderRadius: "1rem",
        overflow: "hidden",
        marginBottom: "1rem",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "1rem 1.25rem",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          borderBottom: open ? "1px solid var(--border-card)" : "none",
          fontFamily: "inherit",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isDark ? "rgba(37,99,235,0.15)" : "rgba(37,99,235,0.08)",
            border: `1px solid ${isDark ? "rgba(37,99,235,0.3)" : "rgba(37,99,235,0.2)"}`,
            borderRadius: "0.5rem",
            color: "#2563eb",
            flexShrink: 0,
          }}
        >
          {categoryIcons[category.id] ?? <FileText size={16} />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                color: "#2563eb",
                background: isDark ? "rgba(37,99,235,0.12)" : "rgba(37,99,235,0.07)",
                padding: "0.15rem 0.4rem",
                borderRadius: "0.25rem",
                fontFamily: "monospace",
              }}
            >
              {category.code}
            </span>
            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-primary)" }}>{title}</span>
          </div>
          <p style={{ margin: "0.125rem 0 0", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            {items.length} {specCountLabel}
          </p>
        </div>
        <ChevronDown
          size={16}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            color: "var(--text-muted)",
            flexShrink: 0,
          }}
        />
      </button>
      {open ? (
        <div>
          {items.map((item) => (
            <TedasSpecRow
              key={item.id}
              item={item}
              isDark={isDark}
              depth={0}
              searchQuery={searchQuery}
              onOpen={onOpen}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function TedasSpecificationsPage() {
  const { t } = useMirrorT();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [viewer, setViewer] = useState<{ title: string; url: string } | null>(null);

  useEffect(() => setMounted(true), []);

  const totalSpecs = useMemo(() => categories.reduce((n, c) => n + c.items.length, 0), []);

  const categoryTitle = (id: string, fallback: string) => {
    const key = `pub.tedas.cat.${id}`;
    const v = t(key);
    return v && v !== key ? v : fallback;
  };

  if (!mounted) return null;

  const noResults =
    query.trim() &&
    categories.every((cat) => !cat.items.some((item) => itemMatches(item, query.trim())));

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", fontFamily: "var(--font-sans)" }}>
      {viewer ? (
        <PublicationViewerModal
          open
          href={viewer.url}
          title={viewer.title}
          onClose={() => setViewer(null)}
        />
      ) : null}

      <PublicationPageHero
        title={t("pub.tedas.title")}
        description={t("pub.tedas.desc")}
        topRight={
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
            <PublicationBadge label={t("pub.badge")} />
            <a
              href={TEDAS_SARTNAMELER_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.35rem 0.875rem",
                background: "transparent",
                border: "1px solid rgba(147,197,253,0.3)",
                borderRadius: "9999px",
                color: "#93c5fd",
                fontSize: "0.7rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <ExternalLink size={12} />
              {t("pub.tedas.btn")}
            </a>
          </div>
        }
        disclaimer={
          <>
            <FileText size={15} color="#93c5fd" style={{ flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: "0.8125rem", color: "rgba(248,250,252,0.85)", lineHeight: 1.6 }}>
              {t("pub.tedas.disclaimer1")}
              <strong style={{ color: "#fff" }}>{t("pub.tedas.disclaimer2")}</strong>
              {t("pub.tedas.disclaimer3")}
            </p>
          </>
        }
      />

      <div style={{ background: "var(--bg-page)", minHeight: "50vh" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {[
              { label: t("pub.tedas.stats.total"), value: `${totalSpecs}+` },
              { label: t("pub.tedas.stats.dept"), value: String(categories.length) },
              {
                label: t("pub.tedas.stats.source"),
                value: "TEDAŞ",
                url: TEDAS_SARTNAMELER_URL,
              },
            ].map((stat) =>
              stat.url ? (
                <a
                  key={stat.label}
                  href={stat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    minWidth: 140,
                    padding: "1rem 1.25rem",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-card)",
                    borderRadius: "0.75rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    boxShadow: isDark ? "none" : "0 2px 8px rgba(0,0,0,0.04)",
                    textDecoration: "none",
                    position: "relative",
                  }}
                >
                  <ExternalLink
                    size={16}
                    style={{ position: "absolute", top: "1rem", right: "1rem", color: "var(--text-muted)" }}
                  />
                  <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>
                    {stat.value}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                    {stat.label}
                  </p>
                </a>
              ) : (
                <div
                  key={stat.label}
                  style={{
                    flex: 1,
                    minWidth: 140,
                    padding: "1rem 1.25rem",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-card)",
                    borderRadius: "0.75rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    boxShadow: isDark ? "none" : "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>
                    {stat.value}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                    {stat.label}
                  </p>
                </div>
              ),
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.625rem 1rem",
              background: "var(--bg-card)",
              border: "1px solid var(--border-card)",
              borderRadius: "0.75rem",
              marginBottom: "1.5rem",
              boxShadow: isDark ? "none" : "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("pub.tedas.search")}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "0.875rem",
                color: "var(--text-primary)",
                fontFamily: "inherit",
              }}
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  fontSize: "1rem",
                  lineHeight: 1,
                  padding: "0.1rem",
                }}
              >
                ×
              </button>
            ) : null}
          </div>

          {categories.map((cat) => (
            <TedasCategoryPanel
              key={cat.id}
              category={cat}
              isDark={isDark}
              searchQuery={query.trim()}
              onOpen={(url, title) => setViewer({ url, title })}
              title={categoryTitle(cat.id, cat.title)}
              specCountLabel={t("pub.tedas.spec_count")}
            />
          ))}

          {noResults ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                {t("pub.no_result1")}
                <strong>{query}</strong>
                {t("pub.no_result2")}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
