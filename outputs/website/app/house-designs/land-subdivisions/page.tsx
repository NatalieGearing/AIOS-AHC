import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Land Subdivisions",
  description:
    "What is a land subdivision? Affordable House Corp manages the full subdivision process — feasibility, planning, civil works and titling — to unlock the full potential of your site.",
});

const FAQS = [
  {
    question: "What is a land subdivision?",
    answer:
      "A land subdivision (formally a lot reconfiguration) is the process of splitting one title into two or more separate, individually titled lots. It's how a single larger block becomes several smaller ones that can each be built on, held or sold independently.",
  },
  {
    question: "How does the subdivision process work?",
    answer:
      "Broadly: a feasibility and due diligence assessment of the site, a development application to council to reconfigure the lot, civil engineering works to service each new lot (roads, stormwater, sewer, power and water), and finally survey and registration of the new titles. We manage every stage of this end-to-end.",
  },
  {
    question: "Do I need council approval to subdivide land?",
    answer:
      "Yes — reconfiguring a lot requires a development application and approval from the relevant local council before new titles can be created, and often referral to other authorities depending on the site (roads, water, environment). Requirements vary by council and by the site itself, which is why a proper feasibility assessment comes first.",
  },
  {
    question: "Can I subdivide land and then build on it?",
    answer:
      "Yes — subdivision and construction are often run as one connected project. Once new titles are created, we can build directly on the resulting lots using any of our house designs, including rooming accommodation and pre-fab houses.",
  },
];

export default function LandSubdivisionsPage() {
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
      <div className="relative min-h-[600px]">
        <Image
          src="/images/service-subdivision.png"
          alt="Land subdivision"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/55 to-brand-orange/10" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6 py-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Investment Services
            </p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Land Subdivisions
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-lg leading-8 text-brand-gray">
          Affordable House Corp manages land subdivisions end-to-end —
          feasibility and due diligence, town planning, civil works and
          titling — unlocking the full development potential of a site
          before a single house is built.
        </p>

        <h2 className="mt-12 font-serif text-2xl font-bold text-brand-navy">
          What Is a Land Subdivision?
        </h2>
        <p className="mt-4 leading-7 text-brand-gray">
          A land subdivision — technically a reconfiguration of a lot — is
          the process of splitting one title into two or more separate,
          individually titled lots. Instead of one larger block, you end up
          with several smaller ones, each able to be built on, held or sold
          independently. For investors, subdivision is often the fastest way
          to unlock additional value from a site you already own, without
          having to buy more land.
        </p>

        <h2 className="mt-12 font-serif text-2xl font-bold text-brand-navy">
          Our Subdivision Process
        </h2>
        <p className="mt-4 leading-7 text-brand-gray">
          Every subdivision starts with feasibility — confirming a site can
          actually support the lot yield you&apos;re after before any money
          is committed. From there we manage the development application to
          council, the civil engineering works needed to service each new
          lot (roads, stormwater, sewer, power and water), and the final
          survey and titling that brings the new lots into existence.
        </p>
        <p className="mt-4 leading-7 text-brand-gray">
          As with all our projects, subdivision work runs through our{" "}
          <Link href="/our-process" className="font-medium text-brand-orange hover:underline">
            turnkey process
          </Link>{" "}
          — and once titles are registered, we can build directly on the
          resulting lots across any of our{" "}
          <Link href="/house-designs" className="font-medium text-brand-orange hover:underline">
            house designs
          </Link>
          .
        </p>

        <h2 className="mt-12 font-serif text-2xl font-bold text-brand-navy">
          Why Subdivide With Affordable House Corp
        </h2>
        <p className="mt-4 leading-7 text-brand-gray">
          Thirty years of building investment properties has meant thirty
          years of subdividing and reconfiguring the sites underneath them.
          We know what a council will and won&apos;t approve, what civil
          works actually cost, and how to sequence a subdivision so it feeds
          straight into a build — rather than treating the two as separate
          projects run by separate teams.
        </p>

        <h2 className="mt-12 font-serif text-2xl font-bold text-brand-navy">
          Land Subdivision FAQs
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
            Think your site has subdivision potential?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-orange/90"
            >
              Enquire Now
            </Link>
            <Link
              href="/house-designs"
              className="rounded-md border border-brand-gray-light px-6 py-3 text-sm font-semibold text-brand-navy hover:border-brand-orange"
            >
              View House Designs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
