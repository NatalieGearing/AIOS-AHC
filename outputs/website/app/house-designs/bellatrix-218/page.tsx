import { buildMetadata } from "@/lib/seo";
import BellatrixDetail from "@/components/BellatrixDetail";

export const metadata = buildMetadata({
  title: "Bellatrix 218 — Rooming Accommodation",
  description:
    "Bellatrix 218: a 5-bedroom, single-storey rooming accommodation design across 218m² by Affordable House Corp.",
});

export default function Bellatrix218Page() {
  return <BellatrixDetail />;
}
