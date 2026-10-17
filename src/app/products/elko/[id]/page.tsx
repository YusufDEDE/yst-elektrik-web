import { ProductDetailRoute, ProductDetailRouteFallback } from "@/components/products/product-detail-route";
import { listProductIds } from "@/lib/products/catalog";
import { Suspense } from "react";

export function generateStaticParams() {
  return listProductIds("elko").map((id) => ({ id }));
}

export default function ElkoProductDetailPage({ params }: PageProps<"/products/elko/[id]">) {
  return (
    <Suspense fallback={<ProductDetailRouteFallback />}>
      <ProductDetailRoute brand="elko" params={params} />
    </Suspense>
  );
}
