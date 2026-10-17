"use client";

import { ServicePageLayout } from "@/components/services/service-page-layout";
import { servicePageConfig } from "@/lib/services/service-page-config";
import type { ServiceSlug } from "@/lib/site-config";

export function ServiceDetailPage({ slug }: { slug: ServiceSlug }) {
  const visual = servicePageConfig[slug];
  return <ServicePageLayout visual={visual} />;
}
