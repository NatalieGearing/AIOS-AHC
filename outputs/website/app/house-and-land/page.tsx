import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import HouseAndLandGrid from "@/components/HouseAndLandGrid";

export const metadata = buildMetadata({
  title: "House & Land",
  description:
    "Current house and land investment opportunities from Affordable House Corp — rooming accommodation and pre-fab listings across South East Queensland.",
});

export default function HouseAndLandPage() {
  return (
    <div>
      <div className="relative flex min-h-[600px] items-end overflow-hidden">
        <Image
          src="/images/house-and-land-hero.png"
          alt="Modern Affordable House Corp home with double garage"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-14 text-white">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            Investment Opportunities
          </span>
          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
            House &amp; Land Packages
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white">
            Current investment-ready house and land opportunities, built and
            managed end-to-end by Affordable House Corp.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-20">
        <HouseAndLandGrid />
      </div>
    </div>
  );
}
