import Image from "next/image";
import BuildCostEstimator from "@/components/BuildCostEstimator";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Build Calculator",
  description:
    "Get an indicative estimate for your investment property build — rooming accommodation or pre-fab.",
});

export default function CalculatorPage() {
  return (
    <div>
      <div className="relative flex min-h-[600px] items-center overflow-hidden">
        <Image
          src="/images/calculator-hero.png"
          alt="Modern investment property townhouses"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/55 to-brand-orange/10" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12 text-white">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-white/70">
            Design Studio
          </span>
          <h1 className="max-w-3xl font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Build Calculator
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white">
            Choose your design, personalise every detail, and see your build
            cost in real time. This is a starting point for planning, not a
            formal quote — reach out for exact figures.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20">
        <BuildCostEstimator />
      </div>
    </div>
  );
}
