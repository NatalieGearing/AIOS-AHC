import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { STATS } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Rooming Accommodation",
  description:
    "What is rooming accommodation? Australia's market leader in rooming accommodation construction explains this high-yield investment property type — and how we build it, turnkey, across Queensland.",
});

const FAQS = [
  {
    question: "What is rooming accommodation?",
    answer:
      "Rooming accommodation is a single dwelling built with multiple individually lockable bedrooms, each let to a different tenant on their own tenancy agreement, sharing communal spaces such as the kitchen, living area, laundry and bathrooms. It's also known as a rooming house or boarding house, and is a distinct, defined land use under Queensland planning schemes — separate from a standard single-tenancy house.",
  },
  {
    question: "Is rooming accommodation a good investment?",
    answer:
      "Rooming accommodation typically delivers stronger rental yield per square metre than a standard house or unit, because a single title and a single construction loan produce several independent rental incomes rather than one. Across our portfolio, Affordable House Corp's projects average an 8.2% gross yield — well above what most standard residential investment properties return.",
  },
  {
    question: "What approval is needed to build rooming accommodation in Queensland?",
    answer:
      "Rooming accommodation is assessed under Queensland's planning schemes as a distinct use class, with its own setback, parking, and amenity requirements. Councils have historically offered a streamlined accepted-development pathway for smaller rooming accommodation projects, though this is subject to change — our team tracks these requirements build to build so your approval pathway and program are set correctly from day one.",
  },
  {
    question: "How is rooming accommodation different from co-living or a duplex?",
    answer:
      "A duplex (dual occupancy) creates two separate dwellings, each independently tenanted as a whole. Rooming accommodation and co-living both let out individual rooms within one dwelling, but co-living is typically positioned as a premium, architecturally designed product with more generous shared spaces, while rooming accommodation is built for maximum yield efficiency. We build all three — see our full range of services on the House Designs page.",
  },
];

export default function RoomingAccommodationPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="relative h-72 sm:h-96">
        <Image
          src="/images/service-rooming.png"
          alt="Rooming accommodation"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 to-brand-navy/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-4xl px-6 pb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Flagship Service
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">
              Rooming Accommodation
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-lg leading-8 text-brand-gray">
        Affordable House Corp is the market leader in rooming accommodation
        construction. Over 30 years, we&apos;ve built deep expertise in
        delivering purpose-built rooming accommodation that maximises rental
        yield for property investors, while meeting the specific compliance
        and planning requirements this asset class demands.
      </p>

      <h2 className="mt-12 font-serif text-2xl font-bold text-brand-navy">
        What Is Rooming Accommodation?
      </h2>
      <p className="mt-4 leading-7 text-brand-gray">
        Rooming accommodation — sometimes called a rooming house or boarding
        house — is a single dwelling purpose-built with multiple individually
        lockable bedrooms. Each room is let to a different tenant on its own
        tenancy agreement, with everyone sharing communal facilities such as
        the kitchen, living areas, laundry and bathrooms. Rather than one
        property producing one rental income, a well-designed rooming
        accommodation build produces several independent incomes from a
        single title, a single construction loan, and a single block of land.
      </p>
      <p className="mt-4 leading-7 text-brand-gray">
        In Queensland, rooming accommodation is recognised as its own
        distinct land use under local planning schemes, with specific
        requirements around room numbers, parking, communal space and
        amenity — separate from the rules that apply to a standard house.
        That regulatory difference is exactly why so many investors choose to
        build with a specialist rather than a general residential builder.
      </p>

      <h2 className="mt-12 font-serif text-2xl font-bold text-brand-navy">
        Why Rooming Accommodation
      </h2>
      <p className="mt-4 leading-7 text-brand-gray">
        Rooming accommodation offers investors strong per-square-metre rental
        returns compared to standard residential builds, by housing multiple
        tenancies within a single, efficiently designed property. As the
        market leader in this space, we understand the design, compliance,
        and tenancy considerations that make a rooming accommodation project
        succeed — knowledge built over three decades of delivery.
      </p>

      <h2 className="mt-12 font-serif text-2xl font-bold text-brand-navy">
        Our Rooming Accommodation Specialism
      </h2>
      <p className="mt-4 leading-7 text-brand-gray">
        Thirty years in this market has taught us where rooming accommodation
        projects succeed and where they stall — council approvals, room
        layout efficiency, fire and safety compliance, and getting the
        finished product tenant-ready from day one. That specialist knowledge
        sits across our whole portfolio: {STATS[0].end.toLocaleString()}
        {STATS[0].suffix} projects delivered, {STATS[1].prefix}
        {STATS[1].end}
        {STATS[1].suffix} in total project value, an average gross yield of{" "}
        {STATS[2].end}
        {STATS[2].suffix}, and a {STATS[3].end}
        {STATS[3].suffix} on-time completion record.
      </p>
      <blockquote className="mt-6 border-l-4 border-brand-orange bg-brand-cream/60 py-4 pl-6 pr-4 italic text-brand-gray">
        &ldquo;From the first site meeting to handover, the whole build was
        faster than I ever expected. Affordable House Corp kept to their
        schedule and my rooming house was tenanted within weeks of
        completion.&rdquo;
        <footer className="mt-2 text-sm font-medium not-italic text-brand-navy">
          — Michael T., Acacia Ridge, QLD
        </footer>
      </blockquote>

      <h2 className="mt-12 font-serif text-2xl font-bold text-brand-navy">
        Turnkey From Start to Finish
      </h2>
      <p className="mt-4 leading-7 text-brand-gray">
        As with all our projects, rooming accommodation builds are managed
        end-to-end — feasibility testing, land acquisition, construction, and
        final sale — through our{" "}
        <Link href="/process" className="font-medium text-brand-orange hover:underline">
          turnkey process
        </Link>
        .
      </p>

      <h2 className="mt-12 font-serif text-2xl font-bold text-brand-navy">
        Rooming Accommodation FAQs
      </h2>
      <div className="mt-4 flex flex-col gap-6">
        {FAQS.map((faq) => (
          <div key={faq.question}>
            <h3 className="font-semibold text-brand-navy">{faq.question}</h3>
            <p className="mt-2 leading-7 text-brand-gray">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-xl bg-brand-cream p-8 text-center">
        <h2 className="text-xl font-bold text-brand-navy">
          Curious what a rooming accommodation build could look like for you?
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/calculator"
            className="rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-orange/90"
          >
            Try the Build Calculator
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-brand-gray-light px-6 py-3 text-sm font-semibold text-brand-navy hover:border-brand-orange"
          >
            Enquire Now
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
