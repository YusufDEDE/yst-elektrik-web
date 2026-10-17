import type { ProductBrand, ProductCatalog, ProductCategory, ProductRecord } from "@/lib/products/types";
import sfaData from "@/lib/products/sfa-catalog.json";
import demofireData from "@/lib/products/demofire-catalog.json";
import afbData from "@/lib/products/afb-catalog.json";
import elkoData from "@/lib/products/elko-catalog.json";

const catalogs: Record<ProductBrand, ProductCatalog> = {
  sfa: sfaData as unknown as ProductCatalog,
  demofire: demofireData as unknown as ProductCatalog,
  afb: afbData as unknown as ProductCatalog,
  elko: elkoData as unknown as ProductCatalog,
};

export function getCatalog(brand: ProductBrand): ProductCatalog {
  return catalogs[brand];
}

export function getProductsByCategory(brand: ProductBrand, categoryId: string): ProductRecord[] {
  return getCatalog(brand).products.filter((p) => p.categoryId === categoryId);
}

export function getProductById(brand: ProductBrand, id: string): ProductRecord | undefined {
  return getCatalog(brand).products.find((p) => p.id === id);
}

/** URL slug → canonical product id (exact match, then case-insensitive). */
export function findProductId(brand: ProductBrand, slug: string): string | undefined {
  const id = decodeURIComponent(slug);
  if (getProductById(brand, id)) return id;
  const lower = id.toLowerCase();
  return getCatalog(brand).products.find((p) => p.id.toLowerCase() === lower)?.id;
}

/**
 * If slug is a category or subcategory id, returns the list-page category id to filter by.
 */
export function categoryIdForListSlug(brand: ProductBrand, slug: string): string | undefined {
  const id = decodeURIComponent(slug);
  if (getCategory(brand, id)) return id;
  for (const cat of getCatalog(brand).categories) {
    if (cat.subcategories?.some((s) => s.id === id)) return cat.id;
  }
  return undefined;
}

export function getCategory(brand: ProductBrand, categoryId: string): ProductCategory | undefined {
  return getCatalog(brand).categories.find((c) => c.id === categoryId);
}

export function getSubcategoryForProduct(brand: ProductBrand, product: ProductRecord) {
  if (!product.subcategoryId) return undefined;
  const cat = getCategory(brand, product.categoryId);
  return cat?.subcategories?.find((s) => s.id === product.subcategoryId);
}

export function listProductIds(brand: ProductBrand): string[] {
  return getCatalog(brand).products.map((p) => p.id);
}

export function getRelatedProducts(
  brand: ProductBrand,
  product: ProductRecord,
  limit = 4,
): ProductRecord[] {
  return getCatalog(brand)
    .products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, limit);
}

export const brandAccent: Record<ProductBrand, string> = {
  sfa: "#22c55e",
  demofire: "#ef4444",
  afb: "#f97316",
  elko: "#22c55e",
};

export const productBrands: ProductBrand[] = ["sfa", "demofire", "afb", "elko"];

export const brandLabels: Record<ProductBrand, { tr: string; en: string; de: string }> = {
  sfa: { tr: "SFA Elektrik", en: "SFA Electric", de: "SFA Elektrik" },
  demofire: { tr: "Demofire", en: "Demofire", de: "Demofire" },
  afb: { tr: "AFB Enerji", en: "AFB Energy", de: "AFB Enerji" },
  elko: { tr: "Elko", en: "Elko", de: "Elko" },
};

/** Breadcrumb kısa marka etiketi (prod /products/sfa/[id]) */
export const brandBreadcrumbLabels: Record<ProductBrand, string> = {
  sfa: "SFA",
  demofire: "Demofire",
  afb: "AFB",
  elko: "Elko",
};
