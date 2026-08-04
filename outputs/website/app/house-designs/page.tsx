import { buildMetadata } from "@/lib/seo";
import DesignsLibrary from "@/components/DesignsLibrary";

export const metadata = buildMetadata({
  title: "House Designs",
  description:
    "Browse Affordable House Corp's full house design library across rooming accommodation and prefab houses — filter by property type, storeys and room count.",
});

export default function HouseDesignsPage() {
  return <DesignsLibrary />;
}
