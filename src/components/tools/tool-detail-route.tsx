import { ToolDetailPage } from "@/components/pages/tool-detail-page";
import { toolSlugs, type ToolSlug } from "@/lib/site-config";
import { notFound } from "next/navigation";

export async function ToolDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!toolSlugs.includes(slug as ToolSlug)) notFound();
  return <ToolDetailPage slug={slug as ToolSlug} />;
}

export function ToolDetailRouteFallback() {
  return <div className="site-content-top" style={{ minHeight: "40vh", background: "var(--bg-page)" }} aria-busy />;
}
