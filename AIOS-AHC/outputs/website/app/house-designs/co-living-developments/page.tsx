import { buildMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/content";
import ComingSoonPage from "@/components/ComingSoonPage";

const service = SERVICES.find((s) => s.slug === "co-living-developments")!;

export const metadata = buildMetadata({
  title: service.title,
  description: service.description,
});

export default function CoLivingDevelopmentsPage() {
  return (
    <ComingSoonPage
      eyebrow="Our Designs"
      title={service.title}
      image={service.image}
      description={service.description}
      note={`We're finalising the full detail page for ${service.title.toLowerCase()}. Get in touch and our team can walk you through the options available right now.`}
    />
  );
}
