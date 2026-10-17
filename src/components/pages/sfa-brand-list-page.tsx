"use client";

import { BrandProductListPage } from "@/components/pages/brand-product-list-page";

/** @deprecated Use BrandProductListPage with brand="sfa" */
export function SfaBrandListPage() {
  return <BrandProductListPage brand="sfa" />;
}
