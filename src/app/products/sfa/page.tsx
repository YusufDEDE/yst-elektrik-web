import { BrandProductListPage } from "@/components/pages/brand-product-list-page";
import { Suspense } from "react";

export default function SfaProductsPage() {
  return (
    <Suspense fallback={null}>
      <BrandProductListPage brand="sfa" />
    </Suspense>
  );
}
