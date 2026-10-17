import { BrandProductListPage } from "@/components/pages/brand-product-list-page";
import { Suspense } from "react";

export default function DemofireProductsPage() {
  return (
    <Suspense fallback={null}>
      <BrandProductListPage brand="demofire" />
    </Suspense>
  );
}
