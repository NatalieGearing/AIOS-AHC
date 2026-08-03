import { FeasibilityCalculator } from "@/components/feasibility/FeasibilityCalculator";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Rooming House Feasibility Calculator",
  description:
    "Model total development cost, finance, rental yield, cash flow, valuation and long-term returns for a rooming house development, conversion or acquisition.",
});

export default function InvestmentCalculatorPage() {
  return <FeasibilityCalculator />;
}
