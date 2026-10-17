"use client";

import { getToolTitle } from "@/lib/tool-labels";
import { toolSlugs, type ToolSlug } from "@/lib/site-config";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function CrumbLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        color: "var(--text-muted)",
        textDecoration: "none",
        transition: "color 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#2563eb";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--text-muted)";
      }}
    >
      {label}
    </Link>
  );
}

export function ToolBreadcrumbs() {
  const pathname = usePathname();
  const { t } = useMirrorT();

  const slug = pathname?.startsWith("/tools/")
    ? (pathname.slice("/tools/".length).split("/")[0] as ToolSlug)
    : null;

  if (!slug || !toolSlugs.includes(slug)) return null;

  const currentLabel = getToolTitle(t, slug);

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        maxWidth: "860px",
        margin: "0 auto 1rem",
        padding: "0 1.5rem",
      }}
    >
      <ol
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
          margin: 0,
          padding: 0,
          listStyle: "none",
          fontSize: "0.875rem",
          fontWeight: 500,
          color: "var(--text-muted)",
          lineHeight: 1.4,
        }}
      >
        <li style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <CrumbLink href="/" label={t("nav.home")} />
        </li>
        <li style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <ChevronRight size={14} style={{ flexShrink: 0, opacity: 0.65 }} aria-hidden />
          <span style={{ color: "var(--text-muted)" }}>{t("nav.tools")}</span>
        </li>
        <li style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <ChevronRight size={14} style={{ flexShrink: 0, opacity: 0.65 }} aria-hidden />
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{currentLabel}</span>
        </li>
      </ol>
    </nav>
  );
}
