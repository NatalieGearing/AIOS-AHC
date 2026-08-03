import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "30 years building investment properties for Australian investors. Learn about Affordable House Corp's history, scale, and turnkey approach.",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
        About Affordable House Corp
      </h1>
      <p className="mt-6 text-lg leading-8 text-brand-gray">
        For 30 years, Affordable House Corp has built investment properties
        for property investors across Australia. Today we turn over more than
        $100 million annually, with a team of 50 people dedicated to
        delivering turnkey construction from start to finish.
      </p>

      <div className="mt-12 grid gap-10 sm:grid-cols-3">
        <div>
          <p className="text-3xl font-bold text-brand-navy">30 years</p>
          <p className="mt-1 text-sm text-brand-gray">In the market</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-brand-navy">$100m+</p>
          <p className="mt-1 text-sm text-brand-gray">Annual turnover</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-brand-navy">50</p>
          <p className="mt-1 text-sm text-brand-gray">Team members</p>
        </div>
      </div>

      <h2 className="mt-16 font-serif text-2xl font-bold text-brand-navy">
        Market Leaders in Rooming Accommodation
      </h2>
      <p className="mt-4 leading-7 text-brand-gray">
        We&apos;re the market leader in rooming accommodation construction —
        a specialty we&apos;ve built deep expertise in over three decades.
        Alongside this flagship offering, we deliver co-living developments,
        dual occupancy properties, boutique townhouses, land subdivisions,
        and pre-fabricated houses, giving investors a full range of options
        to suit their strategy.
      </p>

      <h2 className="mt-12 font-serif text-2xl font-bold text-brand-navy">
        A True Turnkey Service
      </h2>
      <p className="mt-4 leading-7 text-brand-gray">
        Most builders hand you a finished shell and leave the rest to you. We
        don&apos;t. Affordable House Corp manages the entire pipeline —
        feasibility testing, land acquisition, construction, and final sale —
        so investors have a single point of accountability from concept to
        completion. Read more about{" "}
        <a href="/process" className="font-medium text-brand-orange hover:underline">
          how our turnkey process works
        </a>
        .
      </p>

      <h2 className="mt-12 font-serif text-2xl font-bold text-brand-navy">
        Why Investors Choose Us
      </h2>
      <ul className="mt-4 space-y-3 text-brand-gray">
        <li>
          <span className="font-semibold text-brand-navy">Longevity: </span>
          30 years of consistent delivery in the investment property market.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Specialisation: </span>
          The market leader in rooming accommodation, backed by deep,
          specific expertise.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">End-to-end service: </span>
          One partner across feasibility, land acquisition, construction, and
          sale — most competitors don&apos;t cover the full pipeline.
        </li>
        <li>
          <span className="font-semibold text-brand-navy">Scale and stability: </span>
          A $100m+ operation with a 50-person team behind every project.
        </li>
      </ul>
    </div>
  );
}
