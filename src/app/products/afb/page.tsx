import { BrandProductListPage } from "@/components/pages/brand-product-list-page";
import { Suspense } from "react";

export default function AfbProductsPage() {
  return (
    <Suspense fallback={null}>
      <BrandProductListPage brand="afb" />
    </Suspense>
  );
}
