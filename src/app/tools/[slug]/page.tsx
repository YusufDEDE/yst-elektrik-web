import { ToolDetailRoute, ToolDetailRouteFallback } from "@/components/tools/tool-detail-route";
import { toolSlugs } from "@/lib/site-config";
import { Suspense } from "react";

export function generateStaticParams() {
  return toolSlugs.map((slug) => ({ slug }));
}

export default function ToolPage({ params }: PageProps<"/tools/[slug]">) {
  return (
    <Suspense fallback={<ToolDetailRouteFallback />}>
      <ToolDetailRoute params={params} />
    </Suspense>
  );
}
