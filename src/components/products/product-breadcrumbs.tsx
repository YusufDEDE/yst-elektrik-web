"use client";

import { brandAccent, brandBreadcrumbLabels } from "@/lib/products/catalog";
import type { ProductBrand } from "@/lib/products/types";
import type { Lang } from "@/lib/i18n";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { href?: string; label: string; current?: boolean };

function CrumbLink({ href, label, hoverColor }: { href: string; label: string; hoverColor: string }) {
  return (
    <Link
      href={href}
      style={{
        color: "var(--text-muted)",
        textDecoration: "none",
        transition: "color 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = hoverColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--text-muted)";
      }}
    >
      {label}
    </Link>
  );
}

export function ProductBreadcrumbs({
  lang,
  brand,
  categoryName,
  categoryId,
  subcategoryName,
  productTitle,
}: {
  lang: Lang;
  brand: ProductBrand;
  categoryName?: string;
  categoryId?: string;
  subcategoryName?: string;
  productTitle: string;
}) {
  const hoverColor = brandAccent[brand];
  const home = lang === "en" ? "Home" : lang === "de" ? "Startseite" : "Anasayfa";
  const products = lang === "en" ? "Products" : lang === "de" ? "Produkte" : "Ürünler";

  const crumbs: Crumb[] = [
    { href: "/", label: home },
    { href: "/products", label: products },
    { href: `/products/${brand}`, label: brandBreadcrumbLabels[brand] },
  ];
  if (categoryName && categoryId) {
    crumbs.push({
      href: `/products/${brand}?category=${categoryId}`,
      label: categoryName,
    });
  }
  if (subcategoryName && categoryId) {
    crumbs.push({
      href: `/products/${brand}?category=${categoryId}`,
      label: subcategoryName,
    });
  }
  crumbs.push({ label: productTitle, current: true });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "0.875rem",
        color: "var(--text-muted)",
        fontWeight: 500,
        flexWrap: "wrap",
      }}
    >
      {crumbs.map((crumb, i) => (
        <span key={`${crumb.label}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          {i > 0 ? <ChevronRight size={14} /> : null}
          {crumb.current || !crumb.href ? (
            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{crumb.label}</span>
          ) : (
            <CrumbLink href={crumb.href} label={crumb.label} hoverColor={hoverColor} />
          )}
        </span>
      ))}
    </div>
  );
}
