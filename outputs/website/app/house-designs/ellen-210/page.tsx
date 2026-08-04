import { buildMetadata } from "@/lib/seo";
import ComingSoonPage from "@/components/ComingSoonPage";

export const metadata = buildMetadata({
  title: "Ellen 210 — Rooming Accommodation",
  description:
    "Ellen 210: a 5-bedroom rooming accommodation design across 210m², coming soon to the Affordable House Corp design library.",
});

export default function Ellen210Page() {
  return (
    <ComingSoonPage
      eyebrow="Home Design"
      title="Ellen 210"
      image="/images/service-rooming.png"
      description="A 5-bedroom, single-storey rooming accommodation design across 210m² — a companion layout to the Grand 210 Design."
      note="We're finalising the full detail page for this design, including photography, floor plan and inclusions. Get in touch and our team can walk you through it right now."
    />
  );
}
