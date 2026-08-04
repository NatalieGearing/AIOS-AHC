import { buildMetadata } from "@/lib/seo";
import GrandTwoTenDetail from "@/components/GrandTwoTenDetail";

export const metadata = buildMetadata({
  title: "Grand 210 Design — Rooming Accommodation",
  description:
    "The Grand 210 Design: a single-storey, modern Hamptons-style rooming accommodation home with five self-contained bedrooms across 210m², built for strong rental yield.",
});

export default function GrandTwoTenPage() {
  return <GrandTwoTenDetail />;
}
