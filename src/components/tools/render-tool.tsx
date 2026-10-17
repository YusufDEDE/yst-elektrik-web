import { BessCalculatorTool } from "@/components/tools/bess-calculator-tool";
import { BillSavingsTool } from "@/components/tools/bill-savings-tool";
import { CarbonCalculatorTool } from "@/components/tools/carbon-calculator-tool";
import { ElectricityPricesTool } from "@/components/tools/electricity-prices-tool";
import { FireSystemSelectorTool } from "@/components/tools/fire-system-selector-tool";
import { QuickQuoteTool } from "@/components/tools/quick-quote-tool";
import { SolarCalculatorTool } from "@/components/tools/solar-calculator-tool";
import type { ToolSlug } from "@/lib/site-config";

export function RenderTool({ slug }: { slug: ToolSlug }) {
  switch (slug) {
    case "solar-calculator":
      return <SolarCalculatorTool />;
    case "bill-savings":
      return <BillSavingsTool />;
    case "bess-calculator":
      return <BessCalculatorTool />;
    case "carbon-calculator":
      return <CarbonCalculatorTool />;
    case "fire-system-selector":
      return <FireSystemSelectorTool />;
    case "quick-quote":
      return <QuickQuoteTool />;
    case "electricity-prices":
      return <ElectricityPricesTool />;
    default:
      return null;
  }
}
