import { ProductDetailRoute, ProductDetailRouteFallback } from "@/components/products/product-detail-route";
import { listProductIds } from "@/lib/products/catalog";
import { Suspense } from "react";

export function generateStaticParams() {
  return listProductIds("demofire").map((id) => ({ id }));
}

export default function DemofireProductDetailPage({ params }: PageProps<"/products/demofire/[id]">) {
  return (
    <Suspense fallback={<ProductDetailRouteFallback />}>
      <ProductDetailRoute brand="demofire" params={params} />
    </Suspense>
  );
}
