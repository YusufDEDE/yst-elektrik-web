import { ProductDetailRoute, ProductDetailRouteFallback } from "@/components/products/product-detail-route";
import { listProductIds } from "@/lib/products/catalog";
import { Suspense } from "react";

export function generateStaticParams() {
  return listProductIds("sfa").map((id) => ({ id }));
}

export default function SfaProductDetailPage({ params }: PageProps<"/products/sfa/[id]">) {
  return (
    <Suspense fallback={<ProductDetailRouteFallback />}>
      <ProductDetailRoute brand="sfa" params={params} />
    </Suspense>
  );
}
