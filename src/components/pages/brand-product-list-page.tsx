"use client";

import { ProductImage } from "@/components/products/product-image";
import { SafeImg } from "@/components/ui/safe-img";
import { brandListThemes } from "@/lib/products/brand-list-themes";
import {
  getCatalog,
  getCategory,
  getProductsByCategory,
} from "@/lib/products/catalog";
import { localized } from "@/lib/products/localized";
import type { ProductBrand } from "@/lib/products/types";
import { useLang } from "@/providers/lang-provider";
import { useTheme } from "@/providers/theme-provider";
import { ArrowLeft, ArrowRight, Filter, Grid3X3 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

function tr(lang: "tr" | "en" | "de", a: string, b: string, c: string) {
  return lang === "en" ? b : lang === "de" ? c : a;
}

function rgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function BrandProductListPage({ brand }: { brand: ProductBrand }) {
  const themeConfig = brandListThemes[brand];
  const { lang } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const searchParams = useSearchParams();
  const catalog = getCatalog(brand);
  const accent = themeConfig.accent;

  const categoryFromUrl = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(
    categoryFromUrl && categoryFromUrl !== "all" ? categoryFromUrl : "all",
  );

  useEffect(() => {
    setActiveCategory(
      categoryFromUrl && categoryFromUrl !== "all" ? categoryFromUrl : "all",
    );
  }, [categoryFromUrl]);

  const [hoverCard, setHoverCard] = useState<string | null>(null);
  const [hoverTab, setHoverTab] = useState<string | null>(null);
  const [backHover, setBackHover] = useState(false);

  const products = useMemo(() => {
    if (activeCategory === "all") return catalog.products;
    return getProductsByCategory(brand, activeCategory);
  }, [activeCategory, brand, catalog.products]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: catalog.products.length };
    for (const cat of catalog.categories) {
      map[cat.id] = getProductsByCategory(brand, cat.id).length;
    }
    return map;
  }, [brand, catalog.categories, catalog.products.length]);

  const categoryLabel = useCallback(
    (categoryId: string) => {
      if (categoryId === "all") {
        return tr(lang, "Tüm Ürünler", "All Products", "Alle Produkte");
      }
      const cat = getCategory(brand, categoryId);
      return cat ? localized(cat.name, lang) : categoryId;
    },
    [brand, lang],
  );

  const selectCategory = (id: string) => {
    setActiveCategory(id);
    const q = id === "all" ? "" : `?category=${encodeURIComponent(id)}`;
    router.replace(`/products/${brand}${q}`, { scroll: false });
  };

  const tabs = useMemo(
    () => [
      {
        id: "all",
        label: tr(lang, "Tüm Ürünler", "All Products", "Alle Produkte"),
      },
      ...catalog.categories.map((c) => ({
        id: c.id,
        label: localized(c.name, lang),
      })),
    ],
    [catalog.categories, lang],
  );

  const heroBg = isDark ? themeConfig.heroDark : themeConfig.heroLight;

  const logoNode =
    themeConfig.logoVariant === "pill" ? (
      <div
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          padding: "0.5rem 1.25rem",
          borderRadius: "1rem",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <SafeImg
          src={themeConfig.logoSrc}
          alt={themeConfig.logoAlt}
          useFallbackImage={false}
          style={{ height: 36, objectFit: "contain" }}
        />
      </div>
    ) : (
      <SafeImg
        src={themeConfig.logoSrc}
        alt={themeConfig.logoAlt}
        useFallbackImage={false}
        style={{
          height: 40,
          objectFit: "contain",
          flexShrink: 0,
          opacity: themeConfig.logoVariant === "elko" ? 0.95 : 0.85,
          ...(themeConfig.logoVariant === "elko"
            ? {
                background: "#fff",
                padding: "0.25rem 0.75rem",
                borderRadius: "0.5rem",
              }
            : {}),
        }}
      />
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-page)",
        color: "var(--text-primary)",
      }}
    >
      <section
        style={{
          padding: "calc(var(--product-main-offset) + 1rem) 1rem 3.5rem",
          background: heroBg,
          borderBottom: "1px solid var(--border-card)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: themeConfig.radial,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Link
            href="/products"
            onMouseEnter={() => setBackHover(true)}
            onMouseLeave={() => setBackHover(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: backHover ? themeConfig.backLinkHover : "var(--text-muted)",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 600,
              marginBottom: "1.5rem",
              transition: "color 0.2s",
            }}
          >
            <ArrowLeft size={16} />
            {tr(lang, "Markalara Dön", "Back to Brands", "Zurück zu Marken")}
          </Link>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: themeConfig.logoVariant === "pill" ? 280 : 0 }}>
              <h1
                style={{
                  margin: "0 0 0.5rem",
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  fontWeight: 900,
                  color: "#f8fafc",
                  letterSpacing: "-0.03em",
                }}
              >
                {localized(themeConfig.title, lang)}
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  color: "rgba(248,250,252,0.85)",
                  maxWidth: 640,
                  lineHeight: 1.6,
                }}
              >
                {localized(themeConfig.description, lang)}
              </p>
            </div>
            {logoNode}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "1.25rem 1rem",
          background: isDark ? "rgba(30,41,59,0.35)" : "#f8fafc",
          borderBottom: "1px solid var(--border-card)",
          position: "sticky",
          top: 64,
          zIndex: 10,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <Filter size={16} color="var(--text-muted)" />
            <span
              style={{
                fontSize: "0.8125rem",
                fontWeight: 700,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {tr(lang, "Kategoriler", "Categories", "Kategorien")}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              overflowX: "auto",
              paddingBottom: "0.25rem",
              scrollbarWidth: "none",
            }}
          >
            {tabs.map((tab) => {
              const selected = activeCategory === tab.id;
              const hovered = hoverTab === tab.id;
              const count = counts[tab.id] ?? 0;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => selectCategory(tab.id)}
                  onMouseEnter={() => setHoverTab(tab.id)}
                  onMouseLeave={() => setHoverTab(null)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 1.125rem",
                    borderRadius: "9999px",
                    border: selected
                      ? `1.5px solid ${accent}`
                      : `1.5px solid ${hovered ? rgba(accent, 0.4) : "var(--border-card)"}`,
                    background: selected
                      ? isDark
                        ? rgba(accent, 0.15)
                        : rgba(accent, 0.08)
                      : hovered
                        ? isDark
                          ? rgba(accent, 0.06)
                          : rgba(accent, 0.03)
                        : "var(--bg-card)",
                    color: selected ? accent : "var(--text-secondary)",
                    fontSize: "0.8125rem",
                    fontWeight: selected ? 700 : 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                    fontFamily: "inherit",
                  }}
                >
                  {tab.label}
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      padding: "0.125rem 0.5rem",
                      borderRadius: "9999px",
                      background: selected
                        ? rgba(accent, 0.2)
                        : isDark
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(0,0,0,0.05)",
                      color: selected ? accent : "var(--text-muted)",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: "2.5rem 1rem 5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {products.length === 0 ? (
            <div
              style={{
                padding: "5rem 2rem",
                textAlign: "center",
                background: "var(--bg-card)",
                borderRadius: "1.5rem",
                border: "1px dashed var(--border-card)",
              }}
            >
              <Grid3X3 size={48} color="var(--text-muted)" style={{ margin: "0 auto 1rem" }} />
              <p style={{ margin: 0, color: "var(--text-secondary)" }}>
                {tr(
                  lang,
                  "Bu kategoride ürün bulunamadı.",
                  "No products in this category.",
                  "Keine Produkte in dieser Kategorie.",
                )}
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "2rem",
              }}
            >
              {products.map((p) => {
                const hovered = hoverCard === p.id;
                return (
                  <Link
                    key={p.id}
                    href={`/products/${brand}/${p.id}`}
                    onMouseEnter={() => setHoverCard(p.id)}
                    onMouseLeave={() => setHoverCard(null)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      background: "var(--bg-card)",
                      border: `1px solid ${hovered ? accent : "var(--border-card)"}`,
                      borderRadius: "1rem",
                      overflow: "hidden",
                      textDecoration: "none",
                      transition: "all 0.25s ease",
                      boxShadow: hovered
                        ? isDark
                          ? `0 8px 32px ${rgba(accent, 0.12)}`
                          : `0 8px 32px ${rgba(accent, 0.1)}`
                        : isDark
                          ? "none"
                          : "0 2px 12px rgba(0,0,0,0.03)",
                      transform: hovered ? "translateY(-4px)" : "translateY(0)",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        position: "relative",
                        background: "#fff",
                        padding: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ProductImage
                        src={p.image}
                        alt={localized(p.title, lang)}
                        style={{
                          objectFit: "contain",
                          maxWidth: "100%",
                          maxHeight: "100%",
                          width: "auto",
                          height: "auto",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        padding: "1.25rem",
                        borderTop: "1px solid var(--border-card)",
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        gap: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignSelf: "flex-start",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "9999px",
                          background: rgba(accent, 0.08),
                          color: accent,
                          fontSize: "0.6875rem",
                          fontWeight: 700,
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                        }}
                      >
                        {categoryLabel(p.categoryId)}
                      </span>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "1.0625rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          lineHeight: 1.35,
                        }}
                      >
                        {localized(p.title, lang)}
                      </h3>
                      {p.description ? (
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.8125rem",
                            color: "var(--text-secondary)",
                            lineHeight: 1.55,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {localized(p.description, lang)}
                        </p>
                      ) : null}
                      <div
                        style={{
                          marginTop: "auto",
                          paddingTop: "0.75rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          color: hovered ? accent : "var(--text-muted)",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                        }}
                      >
                        {tr(lang, "Detayları İncele", "View Details", "Details ansehen")}
                        <ArrowRight
                          size={14}
                          style={{
                            transition: "transform 0.2s ease",
                            transform: hovered ? "translateX(3px)" : "translateX(0)",
                          }}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
