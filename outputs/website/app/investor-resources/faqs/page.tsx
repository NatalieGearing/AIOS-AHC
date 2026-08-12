import type { ReactNode } from "react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQs",
  description:
    "Frequently asked questions for property investors, from Affordable House Corp — getting started, land & planning, construction & costs, returns & finance, and after handover.",
});

interface FaqItem {
  question: string;
  answer: string;
  answerNode?: ReactNode;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

const CATEGORIES: FaqCategory[] = [
  {
    title: "Getting Started",
    items: [
      {
        question: "How do I get started with an investor dwelling project?",
        answer:
          "The first step is a free discovery call with our team. We'll discuss your budget, land (if you have a plot already), and investment goals. From there we run a feasibility study to determine which dwelling type — rooming house or prefab house — will deliver the strongest return for your specific situation.",
      },
      {
        question: "Do I need to already own land, or can you help me find a site?",
        answer:
          "Both options work. If you already own a suitable block, we can assess it immediately. If not, we have a network of buyers agents and site sourcers who can identify development-ready sites that suit your target dwelling type and budget. We also have our own in-house land bank that is available to purchase from.",
      },
      {
        question: "What is the minimum budget to get started?",
        answer:
          "It varies by dwelling type and location. Rooming house builds typically start from $500K–$1.2M all-in (land + build), depending on size and site conditions. We'll give you a clear costing and plans to suit your requirements.",
      },
      {
        question: "Can I build in a company or trust structure?",
        answer:
          "Yes. Many of our clients build through a company, trust, or SMSF. We work with your accountant or financial advisor to ensure the development is structured correctly from day one. This can have significant tax and asset protection benefits.",
      },
    ],
  },
  {
    title: "Land & Planning",
    items: [
      {
        question: "I already have land, but need help with subdividing — can you help with this?",
        answer:
          "Yes — subdividing your existing land is one of our core services. We manage the entire subdivision process for you: feasibility and due diligence, the development application to council, the civil works needed to service each new lot (roads, stormwater, sewer, power and water), and the final survey and titling. Once your new titles are registered, we can build directly on the resulting lots using any of our house designs, including rooming accommodation and pre-fab houses. Read more about our subdivision process.",
        answerNode: (
          <>
            Yes — subdividing your existing land is one of our core services.
            We manage the entire subdivision process for you: feasibility and
            due diligence, the development application to council, the civil
            works needed to service each new lot (roads, stormwater, sewer,
            power and water), and the final survey and titling. Once your new
            titles are registered, we can build directly on the resulting
            lots using any of our house designs, including rooming
            accommodation and pre-fab houses. Read more about{" "}
            <Link
              href="/house-designs/land-subdivisions"
              className="font-medium text-brand-orange hover:underline"
            >
              our subdivision process
            </Link>
            .
          </>
        ),
      },
      {
        question: "How long does planning approval take?",
        answer:
          "Approval timelines vary by council and dwelling type. Rooming houses typically take 3–6 months for a development approval. We manage the entire process — documentation, council liaison, and any Planning and Environment Court appeals if needed.",
      },
      {
        question: "Will my property need a planning permit or just a building permit?",
        answer:
          "Most rooming house projects require both a development approval (planning permit) and a building approval (building permit). We assess this in the feasibility stage and will be able to give you the full list of permit requirements.",
      },
      {
        question: "What zoning do I need for a rooming house development?",
        answer:
          "Rooming accommodation is assessed under Queensland's planning schemes as a distinct use class, generally permitted across most low-to-medium density residential zones subject to development approval. Zoning categories and requirements vary by local council area — we assess your site's specific zoning and any overlays as part of the feasibility study.",
      },
    ],
  },
  {
    title: "Construction & Costs",
    items: [
      {
        question: "Is the build price fixed, or can costs change during the build?",
        answer:
          "We build on a fixed-price contract. Once your design is finalised and the permit is issued, your build price is locked in. We manage all subcontractors and material costs — there are no surprise variations unless you request design changes mid-build.",
      },
      {
        question: "How long does construction take?",
        answer:
          "Build timelines depend on dwelling type and complexity. Rooming houses typically take 8–12 months until completion, which includes everything from land acquisition, to development approvals and building approvals, through to construction and handover.",
      },
      {
        question: "Can I visit the site during construction?",
        answer:
          "Yes. We schedule regular site inspections at key milestones and you'll receive photo updates throughout the build. Our project managers are available throughout the construction period to answer questions.",
      },
    ],
  },
  {
    title: "Returns & Finance",
    items: [
      {
        question: "What rental yield can I expect?",
        answer:
          "Yields vary by dwelling type and location. Rooming houses typically achieve 8–10% gross yield. Our feasibility calculator can provide an indicative projection for your specific project.",
        answerNode: (
          <>
            Yields vary by dwelling type and location. Rooming houses
            typically achieve 8–10% gross yield. Our{" "}
            <Link
              href="/investor-resources/feasibility-calculator"
              className="font-medium text-brand-orange hover:underline"
            >
              feasibility calculator
            </Link>{" "}
            can provide an indicative projection for your specific project.
          </>
        ),
      },
      {
        question: "How do you calculate the rental yield figures?",
        answer:
          "Gross yield is calculated as annual rental income divided by total project cost (land + build + holding costs). We benchmark room rates against comparable properties in the target suburb using current rental market data.",
      },
      {
        question: "Can I use a standard home loan for an investor dwelling project?",
        answer:
          "Rooming houses and similar developments often require a commercial construction loan and may need a specialist lender depending on the number of rooms and your structure. We can introduce you to experienced brokers, and our borrowing calculator can give you an indicative sense of your borrowing power.",
        answerNode: (
          <>
            Rooming houses and similar developments often require a
            commercial construction loan and may need a specialist lender
            depending on the number of rooms and your structure. We can
            introduce you to experienced brokers, and our{" "}
            <Link
              href="/borrowing-calculator"
              className="font-medium text-brand-orange hover:underline"
            >
              borrowing calculator
            </Link>{" "}
            can give you an indicative sense of your borrowing power.
          </>
        ),
      },
    ],
  },
  {
    title: "After Handover",
    items: [
      {
        question: "Do you help with tenancy and property management after handover?",
        answer:
          "We can connect you with specialist rooming house property managers at handover. We don't manage properties ourselves, but we have trusted partners who specialise in high-yield investor dwellings and maximise occupancy.",
        answerNode: (
          <>
            We can connect you with specialist rooming house property
            managers at handover. We don&apos;t manage properties ourselves,
            but we have{" "}
            <Link
              href="/investor-resources/our-partner-network"
              className="font-medium text-brand-orange hover:underline"
            >
              trusted partners
            </Link>{" "}
            who specialise in high-yield investor dwellings and maximise
            occupancy.
          </>
        ),
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CATEGORIES.flatMap((category) =>
    category.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }))
  ),
};

export default function FaqsPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
          Investor Resources
        </span>
        <h1 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-brand-gray">
          Answers to the questions investors ask us most often, from getting
          started through to build timelines, finance, and returns.
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-6 pb-20">
        {CATEGORIES.map((category) => (
          <div key={category.title} className="mb-14 last:mb-0">
            <h2 className="font-serif text-2xl font-bold text-brand-navy">
              {category.title}
            </h2>
            <div className="mt-6 flex flex-col gap-8">
              {category.items.map((item) => (
                <div key={item.question}>
                  <h3 className="font-semibold text-brand-navy">
                    {item.question}
                  </h3>
                  <p className="mt-2 leading-7 text-brand-gray">
                    {item.answerNode ?? item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-brand-gray-light bg-brand-cream py-16 text-center">
        <h2 className="font-serif text-2xl font-bold text-brand-navy">
          Still have questions?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-brand-gray">
          Speak with our team for guidance specific to your site and goals.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-orange/90"
          >
            Speak to an Expert
          </Link>
          <Link
            href="/"
            className="rounded-md border border-brand-gray-light px-6 py-3 text-sm font-semibold text-brand-navy hover:border-brand-orange"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
