import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Process",
  description:
    "Affordable House Corp's turnkey process — feasibility testing, land acquisition, construction, and final sale, all managed under one roof.",
});

const STEPS = [
  {
    number: "01",
    title: "Feasibility Testing",
    description:
      "We assess the numbers before you commit — site potential, likely returns, and whether a project stacks up as an investment.",
  },
  {
    number: "02",
    title: "Land Acquisition",
    description:
      "We help identify and secure the right site for your project, backed by 30 years of market knowledge.",
  },
  {
    number: "03",
    title: "Construction",
    description:
      "Our team delivers the build to completion, whether that's rooming accommodation, dual occupancy, a subdivision, or a pre-fab home.",
  },
  {
    number: "04",
    title: "Final Sale",
    description:
      "We support the process through to sale, giving investors a single point of accountability from concept to completion.",
  },
];

export default function ProcessPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
        Our Turnkey Process
      </h1>
      <p className="mt-6 text-lg leading-8 text-brand-gray">
        Most builders hand you a finished shell and leave the rest to you.
        Affordable House Corp manages the entire pipeline, so you have one
        partner accountable for the whole journey — not four separate
        contractors to coordinate.
      </p>

      <ol className="mt-14 space-y-10">
        {STEPS.map((step) => (
          <li key={step.number} className="flex gap-6">
            <span className="text-3xl font-bold text-brand-orange">
              {step.number}
            </span>
            <div>
              <h2 className="text-xl font-semibold text-brand-navy">
                {step.title}
              </h2>
              <p className="mt-2 text-brand-gray">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-16 rounded-xl bg-brand-cream p-8 text-center">
        <h2 className="text-xl font-bold text-brand-navy">
          Ready to start the conversation?
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-orange/90"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
}
