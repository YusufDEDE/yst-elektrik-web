import { ServiceDetailPage } from "@/components/pages/service-detail-page";
import { serviceSlugs, type ServiceSlug } from "@/lib/site-config";
import { notFound } from "next/navigation";

export async function ServiceDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!serviceSlugs.includes(slug as ServiceSlug)) notFound();
  return <ServiceDetailPage slug={slug as ServiceSlug} />;
}

export function ServiceDetailRouteFallback() {
  return <div className="site-content-top" style={{ minHeight: "40vh", background: "var(--bg-page)" }} aria-busy />;
}
