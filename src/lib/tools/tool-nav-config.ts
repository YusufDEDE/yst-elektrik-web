import type { ToolSlug } from "@/lib/site-config";

/** Prod ToolsNav + sağ rail sırası (e35310112ab2c4ea.js). */
export const TOOL_NAV_ORDER: ToolSlug[] = [
  "bill-savings",
  "solar-calculator",
  "fire-system-selector",
  "bess-calculator",
  "quick-quote",
  "carbon-calculator",
  "electricity-prices",
];

export function toolNavShortKey(slug: ToolSlug): string {
  return `tool.nav.short.${slug}`;
}
