import { ProductDetailRoute, ProductDetailRouteFallback } from "@/components/products/product-detail-route";
import { listProductIds } from "@/lib/products/catalog";
import { Suspense } from "react";

export function generateStaticParams() {
  return listProductIds("afb").map((id) => ({ id }));
}

export default function AfbProductDetailPage({ params }: PageProps<"/products/afb/[id]">) {
  return (
    <Suspense fallback={<ProductDetailRouteFallback />}>
      <ProductDetailRoute brand="afb" params={params} />
    </Suspense>
  );
}
