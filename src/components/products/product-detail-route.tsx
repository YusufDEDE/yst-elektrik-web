import { ProductDetailPage } from "@/components/pages/product-detail-page";
import { categoryIdForListSlug, findProductId } from "@/lib/products/catalog";
import type { ProductBrand } from "@/lib/products/types";
import { notFound, redirect } from "next/navigation";

export async function ProductDetailRoute({
  brand,
  params,
}: {
  brand: ProductBrand;
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = await params;

  const categoryId = categoryIdForListSlug(brand, slug);
  if (categoryId) {
    redirect(`/products/${brand}?category=${encodeURIComponent(categoryId)}`);
  }

  const productId = findProductId(brand, slug);
  if (!productId) notFound();

  return <ProductDetailPage brand={brand} productId={productId} />;
}

export function ProductDetailRouteFallback() {
  return (
    <div
      className="site-content-top product-page-chrome"
      style={{ minHeight: "50vh", background: "var(--bg-page)", padding: "0 1rem 2rem" }}
      aria-busy
      aria-label="Yükleniyor"
    />
  );
}
