import { buildMetadata } from "@/lib/seo";
import ComingSoonPage from "@/components/ComingSoonPage";

export const metadata = buildMetadata({
  title: "Blunder 190 — Rooming Accommodation",
  description:
    "Blunder 190: a 5-bedroom rooming accommodation design across 190m², coming soon to the Affordable House Corp design library.",
});

export default function Blunder190Page() {
  return (
    <ComingSoonPage
      eyebrow="Home Design"
      title="Blunder 190"
      image="/images/service-rooming.png"
      description="A 5-bedroom, single-storey rooming accommodation design across 190m² — built for strong rental yield on a more compact footprint."
      note="We're finalising the full detail page for this design, including photography, floor plan and inclusions. Get in touch and our team can walk you through it right now."
    />
  );
}
