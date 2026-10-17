"use client";

import {
  PublicationBadge,
  PublicationPageHero,
} from "@/components/publications/publication-page-hero";
import { PublicationViewerModal } from "@/components/publications/publication-viewer-modal";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import { useLang } from "@/providers/lang-provider";
import epdkCatalog from "@/lib/publications/epdk-catalog.json";
import type { EpdkTreeNode } from "@/lib/publications/types";
import { useTheme } from "@/providers/theme-provider";
import {
  Activity,
  ChevronDown,
  ExternalLink,
  FileText,
  Landmark,
  Search,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

const tree = epdkCatalog as EpdkTreeNode[];
const EPDK_SEARCH = "https://www.epdk.gov.tr/Arama?q=";

function tr(lang: "tr" | "en" | "de", a: string, b: string, c: string) {
  return lang === "en" ? b : lang === "de" ? c : a;
}

function nodeChildren(node: EpdkTreeNode): EpdkTreeNode[] {
  return [...(node.subGroups ?? []), ...(node.items ?? [])];
}

function subtreeMatches(node: EpdkTreeNode, q: string): boolean {
  const lower = q.toLowerCase();
  if (node.title.toLowerCase().includes(lower)) return true;
  if (node.items?.some((i) => i.title.toLowerCase().includes(lower))) return true;
  return node.subGroups?.some((n) => subtreeMatches(n, q)) ?? false;
}

function resolveHref(node: EpdkTreeNode): string {
  if (node.href) return node.href;
  return `${EPDK_SEARCH}${encodeURIComponent(node.title)}`;
}

function EpdkLeafButton({
  item,
  depth,
  isDark,
  onOpen,
}: {
  item: EpdkTreeNode;
  depth: number;
  isDark: boolean;
  onOpen: (href: string, title: string, external?: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(resolveHref(item), item.title, item.isExternal)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.625rem",
        padding: "0.625rem 1rem",
        paddingLeft: `${1 + 1.25 * depth}rem`,
        background: "transparent",
        border: "none",
        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"}`,
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        fontFamily: "inherit",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isDark ? "rgba(37,99,235,0.08)" : "rgba(37,99,235,0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <ExternalLink size={12} style={{ flexShrink: 0, color: isDark ? "#93c5fd" : "#2563eb" }} />
      <span
        style={{
          fontSize: "0.8rem",
          fontWeight: 500,
          color: isDark ? "#93c5fd" : "#2563eb",
          lineHeight: 1.4,
        }}
      >
        {item.title}
      </span>
    </button>
  );
}

function EpdkSubGroupRow({
  sg,
  depth,
  isDark,
  searchQuery,
  onOpen,
}: {
  sg: EpdkTreeNode;
  depth: number;
  isDark: boolean;
  searchQuery: string;
  onOpen: (href: string, title: string, external?: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const hasSubGroups = (sg.subGroups?.length ?? 0) > 0;
  const hasItems = (sg.items?.length ?? 0) > 0;
  const isLeaf = !hasSubGroups && !hasItems;

  const filteredItems =
    sg.items?.filter(
      (i) => !searchQuery || i.title.toLowerCase().includes(searchQuery.toLowerCase()),
    ) ?? [];
  const filteredSubGroups =
    sg.subGroups?.filter((g) => subtreeMatches(g, searchQuery)) ?? [];

  useEffect(() => {
    if (searchQuery) setOpen(true);
    else setOpen(false);
  }, [searchQuery]);

  if (
    searchQuery &&
    filteredItems.length === 0 &&
    filteredSubGroups.length === 0 &&
    !sg.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) {
    return null;
  }

  const expandable = hasSubGroups || hasItems;

  return (
    <div>
      <div
        role="presentation"
        onClick={() => {
          if (isLeaf) onOpen(resolveHref(sg), sg.title, sg.isExternal);
          else if (expandable) setOpen((v) => !v);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          padding: "0.6rem 1rem",
          paddingLeft: `${1 + 1.25 * depth}rem`,
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"}`,
          cursor: expandable || isLeaf ? "pointer" : "default",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => {
          if (!expandable && !isLeaf) return;
          e.currentTarget.style.background = isDark
            ? isLeaf
              ? "rgba(37,99,235,0.08)"
              : "rgba(255,255,255,0.03)"
            : isLeaf
              ? "rgba(37,99,235,0.05)"
              : "rgba(0,0,0,0.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        {hasSubGroups ? (
          <ChevronDown
            size={13}
            style={{
              flexShrink: 0,
              transform: open ? "rotate(0deg)" : "rotate(-90deg)",
              transition: "transform 0.2s",
              color: isDark ? "rgba(37,99,235,0.7)" : "#2563eb",
            }}
          />
        ) : isLeaf ? (
          <ExternalLink size={12} style={{ flexShrink: 0, color: isDark ? "#93c5fd" : "#2563eb" }} />
        ) : (
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: isDark ? "rgba(37,99,235,0.5)" : "rgba(37,99,235,0.4)",
              flexShrink: 0,
            }}
          />
        )}
        <p
          style={{
            margin: 0,
            fontSize: depth === 0 ? "0.8125rem" : "0.75rem",
            fontWeight: depth === 0 ? 600 : 500,
            color: isLeaf
              ? isDark
                ? "#93c5fd"
                : "#2563eb"
              : depth === 0
                ? "var(--text-primary)"
                : "var(--text-secondary)",
            flex: 1,
            lineHeight: 1.4,
          }}
        >
          {sg.title}
        </p>
        {hasSubGroups ? (
          <span
            style={{
              fontSize: "0.625rem",
              fontWeight: 700,
              color: isDark ? "rgba(37,99,235,0.6)" : "rgba(37,99,235,0.5)",
              background: isDark ? "rgba(37,99,235,0.1)" : "rgba(37,99,235,0.07)",
              padding: "0.1rem 0.35rem",
              borderRadius: "9999px",
              flexShrink: 0,
            }}
          >
            {(sg.subGroups?.length ?? 0) + (sg.items?.length ?? 0)}
          </span>
        ) : null}
      </div>
      {open && expandable ? (
        <>
          {filteredSubGroups.map((g) => (
            <EpdkSubGroupRow
              key={g.id}
              sg={g}
              depth={depth + 1}
              isDark={isDark}
              searchQuery={searchQuery}
              onOpen={onOpen}
            />
          ))}
          {filteredItems.map((item) => (
            <EpdkLeafButton key={item.id} item={item} depth={depth + 1} isDark={isDark} onOpen={onOpen} />
          ))}
        </>
      ) : null}
    </div>
  );
}

function EpdkTopCategory({
  cat,
  icon,
  isDark,
  searchQuery,
  onOpen,
  subLabel,
}: {
  cat: EpdkTreeNode;
  icon: ReactNode;
  isDark: boolean;
  searchQuery: string;
  onOpen: (href: string, title: string, external?: boolean) => void;
  subLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const groups = cat.subGroups ?? [];

  const visible =
    !searchQuery ||
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    groups.some((g) => subtreeMatches(g, searchQuery));

  useEffect(() => {
    if (searchQuery) setOpen(true);
    else setOpen(false);
  }, [searchQuery]);

  if (!visible) return null;

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
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-primary)" }}>{cat.title}</span>
          <p style={{ margin: "0.125rem 0 0", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            {groups.length} {subLabel}
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
          {groups.map((g) => (
            <EpdkSubGroupRow
              key={g.id}
              sg={g}
              depth={0}
              isDark={isDark}
              searchQuery={searchQuery}
              onOpen={onOpen}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

const sectionIcons: Record<string, ReactNode> = {
  piyasa: <Zap size={16} />,
  tarife: <Activity size={16} />,
  "2006-oncesi": <Landmark size={16} />,
};

export function EpdkDecisionsPage() {
  const { t } = useMirrorT();
  const { lang } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [viewer, setViewer] = useState<{ href: string; title: string } | null>(null);

  useEffect(() => setMounted(true), []);

  const subLabel = tr(lang, "alt kategori", "subcategories", "Unterkategorien");

  const noResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return false;
    return tree.every(
      (cat) =>
        !cat.title.toLowerCase().includes(q) &&
        !(cat.subGroups?.some((g) => subtreeMatches(g, q)) ?? false),
    );
  }, [query]);

  const openNode = (href: string, title: string, external?: boolean) => {
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    setViewer({ href, title });
  };

  if (!mounted) return null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", fontFamily: "var(--font-sans)" }}>
      {viewer ? (
        <PublicationViewerModal
          open
          href={viewer.href}
          title={viewer.title}
          onClose={() => setViewer(null)}
          badgeLabel="EPDK"
        />
      ) : null}

      <PublicationPageHero
        title={t("pub.epdk.title")}
        description={t("pub.epdk.desc")}
        topRight={
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
            <PublicationBadge label={t("pub.badge")} />
          </div>
        }
        disclaimer={
          <>
            <FileText size={15} color="#93c5fd" style={{ flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: "0.8125rem", color: "rgba(248,250,252,0.85)", lineHeight: 1.6 }}>
              {t("pub.epdk.disclaimer1")}
              <strong style={{ color: "#fff" }}>{t("pub.epdk.disclaimer2")}</strong>
              {t("pub.epdk.disclaimer3")}
            </p>
          </>
        }
      />

      <div style={{ background: "var(--bg-page)", minHeight: "50vh" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
          <div style={{ marginBottom: "1.75rem", position: "relative" }}>
            <Search
              size={15}
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("pub.epdk.search")}
              style={{
                width: "100%",
                padding: "0.75rem 1rem 0.75rem 2.75rem",
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                borderRadius: "0.75rem",
                fontSize: "0.875rem",
                color: "var(--text-primary)",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563eb";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border-card)";
              }}
            />
          </div>

          {tree.map((cat) => (
            <EpdkTopCategory
              key={cat.id}
              cat={cat}
              icon={sectionIcons[cat.id] ?? <FileText size={16} />}
              isDark={isDark}
              searchQuery={query.trim()}
              onOpen={openNode}
              subLabel={subLabel}
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
