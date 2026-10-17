"use client";

import { RenderTool } from "@/components/tools/render-tool";
import type { ToolSlug } from "@/lib/site-config";

export function ToolDetailPage({ slug }: { slug: ToolSlug }) {
  return <RenderTool slug={slug} />;
}
