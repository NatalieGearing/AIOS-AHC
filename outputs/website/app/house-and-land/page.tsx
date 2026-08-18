import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { CONTACT, LISTINGS } from "@/lib/content";
import HouseAndLandGrid from "@/components/HouseAndLandGrid";

export const metadata = buildMetadata({
  title: "House & Land",
  description:
    "Ready-built rooming accommodation house and land opportunities from Affordable House Corp across Brisbane and South East Queensland.",
});

const INCLUDED = [
  "Purpose-designed private rooms",
  "Shared living and resident facilities",
  "Durable fixtures, finishes and services",
  "Builder-led final inspection and handover",
];

const PROCESS = [
  {
    number: "01",
    title: "Choose an Opportunity",
    description: "Review the release, location and completion stage with our property team.",
  },
  {
    number: "02",
    title: "Complete Due Diligence",
    description: "Receive the property pack and involve your finance, legal and tax advisers.",
  },
  {
    number: "03",
    title: "Secure the Property",
    description: "Agree commercial terms and complete the required contract process.",
  },
  {
    number: "04",
    title: "Inspect and Hand Over",
    description: "Complete your final inspection, receive documentation and prepare for operation.",
  },
];

function mailto(subject: string) {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;
}

export default function HouseAndLandPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative flex min-h-[600px] items-center overflow-hidden">
        <Image
          src="/images/house-and-land-hero-2.png"
          alt="Modern Affordable House Corp home with a For Sale sign on the front lawn"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/55 to-brand-orange/10" />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-between gap-10 px-6 py-12 text-white lg:flex-row lg:items-end">
          <div>
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
              House &amp; Land Opportunities
            </span>
            <h1 className="max-w-2xl font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              Ready-built rooming accommodation.
              <br />
              <span className="italic text-brand-orange">Ready to perform.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Explore completed and near-complete rooming accommodation
              opportunities across Brisbane and South East Queensland.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#opportunities"
                className="ml-[249px] rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-orange/90"
              >
                View Current Opportunities ↓
              </a>
            </div>
          </div>
          <div className="shrink-0 border-t border-white pt-6 lg:absolute lg:right-6 lg:top-[364px] lg:w-52">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white">
              Current Release
            </p>
            <p className="mt-2 font-serif text-4xl font-bold text-brand-orange">
              {LISTINGS.length}
            </p>
            <p className="mt-1 text-sm leading-6 text-white">opportunities available now</p>
          </div>
        </div>
      </div>

      {/* Opportunities intro */}
      <section id="opportunities" className="scroll-mt-24 bg-white pb-14 pt-10 sm:pt-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
                Current Opportunities
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
                Completed Homes.
                <br />
                <span className="text-brand-orange">Investment Ready.</span>
              </h2>
            </div>
            <div>
              <p className="mt-8 leading-7 text-brand-gray">
                Each AHC package brings land, specialist rooming accommodation
                design and construction together through one accountable team.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-brand-gray">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities finder */}
      <section className="bg-white pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <HouseAndLandGrid />
        </div>
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-24 bg-[#f7f5f3] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
                A Clear Path to Purchase
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
                From shortlist to <span className="text-brand-orange">handover.</span>
              </h2>
            </div>
            <p className="leading-7 text-brand-gray">
              Our team keeps the process practical, transparent and easy to
              follow — while your independent advisers help you assess the
              opportunity.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step) => (
              <div key={step.number}>
                <span className="font-serif text-3xl font-bold text-brand-orange">
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-brand-gray">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <a
              href={mailto("Book a property inspection")}
              className="inline-block rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-orange/90"
            >
              Book a Property Viewing
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-brand-cream py-20 sm:py-24">
        <Image
          src="/images/house-and-land-cta-bg-3.png"
          alt=""
          fill
          className="object-cover object-left"
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 text-left md:grid-cols-2 md:gap-16 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Ready Built Opportunities
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
              Your next property.
              <br />
              <span className="italic text-brand-orange">Ready when you are.</span>
            </h2>
          </div>
          <div>
            <p className="text-brand-gray">
              Request our current releases or arrange a conversation
              <br />
              with our friendly team.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={mailto("Send me the current ready-built release")}
                className="rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-orange/90"
              >
                Send Me the Current Releases
              </a>
              <a
                href={CONTACT.phoneHref}
                className="text-sm font-semibold text-brand-navy underline hover:text-brand-orange"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
