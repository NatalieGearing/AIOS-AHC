import { buildMetadata } from "@/lib/seo";
import ComingSoonPage from "@/components/ComingSoonPage";

export const metadata = buildMetadata({
  title: "Alice 235 — Rooming Accommodation",
  description:
    "Alice 235: a 5-bedroom rooming accommodation design across 235m², coming soon to the Affordable House Corp design library.",
});

export default function Alice235Page() {
  return (
    <ComingSoonPage
      eyebrow="Home Design"
      title="Alice 235"
      image="/images/service-rooming.png"
      description="A 5-bedroom, single-storey rooming accommodation design across a generous 235m² — our largest footprint in the 5-room range."
      note="We're finalising the full detail page for this design, including photography, floor plan and inclusions. Get in touch and our team can walk you through it right now."
    />
  );
}
