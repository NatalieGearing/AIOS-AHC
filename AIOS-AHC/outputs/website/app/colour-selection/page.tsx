import ColourCollections from "@/components/ColourCollections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Colour Selections",
  description:
    "Six curated design collections for your Affordable House Corp investment property — choose your home, pick a collection, and see the complete exterior, kitchen and interior schedule.",
});

export default function ColourSelectionPage() {
  return <ColourCollections />;
}
