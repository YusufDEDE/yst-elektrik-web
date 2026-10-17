import type { ToolSlug } from "@/lib/site-config";

const toolKeys: Record<ToolSlug, string> = {
  "solar-calculator": "nav.tool.ges",
  "bill-savings": "nav.tool.bill",
  "fire-system-selector": "nav.tool.fire",
  "bess-calculator": "nav.tool.bess",
  "quick-quote": "nav.tool.quote",
  "carbon-calculator": "nav.tool.carbon",
  "electricity-prices": "nav.tool.eprice",
};

export function getToolTitle(t: (key: string) => string, slug: ToolSlug): string {
  return t(toolKeys[slug]);
}
