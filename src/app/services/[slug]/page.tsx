import { ServiceDetailRoute, ServiceDetailRouteFallback } from "@/components/services/service-detail-route";
import { serviceSlugs } from "@/lib/site-config";
import { Suspense } from "react";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<ServiceDetailRouteFallback />}>
      <ServiceDetailRoute params={params} />
    </Suspense>
  );
}
