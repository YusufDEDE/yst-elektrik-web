"use client";

import { ProductBreadcrumbs } from "@/components/products/product-breadcrumbs";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductImage } from "@/components/products/product-image";
import {
  brandAccent,
  brandBreadcrumbLabels,
  brandLabels,
  getCategory,
  getProductById,
  getRelatedProducts,
  getSubcategoryForProduct,
} from "@/lib/products/catalog";
import type { ProductBrand } from "@/lib/products/types";
import { localized } from "@/lib/products/localized";
import { useLang } from "@/providers/lang-provider";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, FileText, X } from "lucide-react";
import { useEffect, useState } from "react";

function tr(lang: "tr" | "en" | "de", tr: string, en: string, de: string) {
  return lang === "en" ? en : lang === "de" ? de : tr;
}

export function ProductDetailPage({ brand, productId }: { brand: ProductBrand; productId: string }) {
  const { lang } = useLang();
  const [catalogOpen, setCatalogOpen] = useState(false);
  const product = getProductById(brand, productId);

  useEffect(() => {
    if (!catalogOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCatalogOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [catalogOpen]);

  if (!product) return null;

  const category = getCategory(brand, product.categoryId);
  const subcategory = getSubcategoryForProduct(brand, product);
  const accent = brandAccent[brand];
  const related = getRelatedProducts(brand, product, 4);
  const images =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : product.image
        ? [product.image]
        : [];

  const features = product.features?.[lang] ?? product.features?.tr ?? product.features?.en ?? [];
  const specs = product.specs ? Object.entries(product.specs).filter(([, v]) => v) : [];
  const title = localized(product.title, lang);
  const categoryLabel = category ? localized(category.name, lang) : undefined;
  const subcategoryLabel = subcategory ? localized(subcategory.name, lang) : undefined;
  const shortBrand = brandBreadcrumbLabels[brand];

  const backLabel = tr(
    lang,
    `Tüm ${shortBrand} Ürünleri`,
    `All ${shortBrand} Products`,
    `Alle ${shortBrand}-Produkte`,
  );

  const featuresBlock =
    features.length > 0 ? (
      <div
        style={{
          marginBottom: "2rem",
          background: "var(--bg-card)",
          padding: "2rem",
          borderRadius: "1.5rem",
          border: "1px solid var(--border-card)",
        }}
      >
        <h3
          style={{
            margin: "0 0 1.5rem",
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "var(--text-primary)",
          }}
        >
          {tr(lang, "Öne Çıkan Özellikler", "Key Features", "Hauptmerkmale")}
        </h3>
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.875rem",
          }}
        >
          {features.map((f) => (
            <li
              key={f}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                fontSize: "1rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              <CheckCircle2 size={20} color={accent} style={{ flexShrink: 0, marginTop: "0.125rem" }} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  const specsBlock =
    specs.length > 0 ? (
      <div
        style={{
          marginBottom: "2.5rem",
          background: "var(--bg-card)",
          padding: "2rem",
          borderRadius: "1.5rem",
          border: "1px solid var(--border-card)",
        }}
      >
        <h3
          style={{
            margin: "0 0 1.5rem",
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "var(--text-primary)",
          }}
        >
          {tr(lang, "Teknik Özellikler", "Technical Specifications", "Technische Daten")}
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
          {specs.map(([k, v], index) => (
            <div
              key={k}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(140px, 1fr) 2fr",
                gap: "1rem",
                padding: "0.875rem 0",
                borderBottom: index < specs.length - 1 ? "1px solid var(--border-card)" : "none",
              }}
            >
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-primary)" }}>{k}</span>
              <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    ) : null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)" }}>
      <main style={{ paddingTop: "var(--product-main-offset)" }}>
        <section
          className="product-page-chrome"
          style={{
            padding: "1.5rem 1rem",
            borderBottom: "1px solid var(--border-card)",
            background: "var(--bg-card)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <ProductBreadcrumbs
              lang={lang}
              brand={brand}
              categoryId={product.categoryId}
              categoryName={categoryLabel}
              subcategoryName={subcategoryLabel}
              productTitle={title}
            />
            <Link
              href={`/products/${brand}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "99px",
                background: "var(--bg-page)",
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
                border: "1px solid var(--border-card)",
                transition: "all 0.2s",
              }}
            >
              <ArrowLeft size={16} />
              {backLabel}
            </Link>
          </div>
        </section>

        <section style={{ padding: "4rem 1rem" }}>
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: "4rem",
              alignItems: "start",
            }}
          >
            <ProductGallery
              images={images}
              alt={title}
              accentColor={accent}
              noImageLabel={tr(lang, "Görsel Yok", "No Image", "Kein Bild")}
            />

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "inline-flex",
                  padding: "0.375rem 1rem",
                  borderRadius: "99px",
                  background: `${accent}15`,
                  color: accent,
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                  alignSelf: "flex-start",
                }}
              >
                {categoryLabel ??
                  tr(
                    lang,
                    `${brandLabels[brand].tr} Ürünü`,
                    `${brandLabels[brand].en} Product`,
                    `${brandLabels[brand].de}-Produkt`,
                  )}
              </div>
              <h1
                style={{
                  margin: "0 0 1rem",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  color: "var(--text-primary)",
                }}
              >
                {title}
              </h1>
              <p
                style={{
                  margin: "0 0 2rem",
                  fontSize: "1.125rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                {localized(product.longDescription ?? product.description, lang)}
              </p>
              {featuresBlock}
              {specsBlock}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "auto" }}>
                <Link href="/contact" className="btn-primary-custom">
                  {tr(lang, "Teklif Al", "Request quote", "Angebot anfragen")}
                  <ArrowRight size={16} />
                </Link>
                {product.catalogUrl ? (
                  <button
                    type="button"
                    className="btn-outline-custom"
                    onClick={() => setCatalogOpen(true)}
                    style={{ cursor: "pointer", fontFamily: "inherit" }}
                  >
                    <FileText size={14} />
                    {tr(lang, "Katalog", "Catalog", "Katalog")}
                  </button>
                ) : null}
                {product.sfaUrl?.startsWith("http") ? (
                  <a
                    href={product.sfaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-custom"
                  >
                    {tr(lang, "Üretici Sayfası", "Manufacturer page", "Herstellerseite")}
                    <ExternalLink size={14} />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </main>

      {catalogOpen && product.catalogUrl ? (
        <div
          role="presentation"
          onClick={() => setCatalogOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 20000,
            background: "rgba(0,0,0,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            role="dialog"
            aria-modal
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(90vw, 1100px)",
              height: "min(90vh, 800px)",
              background: "var(--bg-card)",
              borderRadius: "1.5rem",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
              border: "1px solid var(--border-card)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.5rem",
                borderBottom: "1px solid var(--border-card)",
                background: "var(--bg-page)",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <FileText size={20} color="#2563eb" />
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  {title} — {tr(lang, "Katalog", "Catalog", "Katalog")}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <a
                  href={product.catalogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-custom"
                  style={{ padding: "0.45rem 0.9rem", fontSize: "0.8125rem" }}
                >
                  {tr(lang, "Katalogu Aç", "Open catalog", "Katalog öffnen")}
                  <ExternalLink size={14} />
                </a>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setCatalogOpen(false)}
                  style={{
                    background: "var(--bg-section-alt)",
                    border: "1px solid var(--border-card)",
                    borderRadius: "0.5rem",
                    padding: "0.35rem",
                    cursor: "pointer",
                    color: "var(--text-secondary)",
                    display: "flex",
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <iframe
              title={`${title} catalog`}
              src={product.catalogUrl}
              style={{ flex: 1, width: "100%", border: "none", background: "#fff" }}
            />
          </div>
        </div>
      ) : null}

      {related.length > 0 ? (
        <section style={{ padding: "4rem 1rem 5rem", borderTop: "1px solid var(--border-card)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2
              style={{
                margin: "0 0 2.5rem",
                fontSize: "1.75rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                textAlign: "center",
              }}
            >
              {tr(lang, "İlginizi Çekebilecek Diğer Ürünler", "Related Products", "Ähnliche Produkte")}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "2rem",
              }}
            >
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${brand}/${p.id}`}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-card)",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = accent;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-card)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "4/3",
                      background: "#fff",
                      borderRadius: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <ProductImage
                      src={p.image}
                      alt={localized(p.title, lang)}
                      style={{ maxWidth: "85%", maxHeight: "85%", objectFit: "contain" }}
                    />
                  </div>
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.4 }}>
                    {localized(p.title, lang)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
