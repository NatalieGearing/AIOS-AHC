import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Our Process",
  description:
    "How Affordable House Corp takes investors from land to handover — feasibility, approvals, engineering, demolition, design and construction, all coordinated by one team.",
});

const START_OPTIONS = [
  {
    title: "You bring the land",
    description:
      "Already have a site? We start with a feasibility study to test what's achievable on your lot size — yield, layout and likely return — before any design work begins.",
  },
  {
    title: "We help you find it",
    description:
      "Need a site? We can source suitable land on your behalf — reviewing what's currently available on the market and supporting you through the buying process — or offer a site from our own landbank.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Feasibility",
    description:
      "We test what's achievable on your site — or the site we help you find — before you commit to a design, so every project stacks up as an investment from day one.",
  },
  {
    number: "02",
    title: "Development Applications & Subdivisions",
    description:
      "We manage Development Applications and Land Subdivisions with council, unlocking the full potential of your site ahead of construction.",
  },
  {
    number: "03",
    title: "Construction Plans & Building Approvals",
    description:
      "Our team drafts the construction plans needed to secure Building Approval, backed by soil tests and engineering checks to confirm footing requirements.",
  },
  {
    number: "04",
    title: "Demolition",
    description:
      "Where an existing dwelling needs to come down, our in-house demolition team and equipment manage the process — no third-party contractors to coordinate.",
  },
  {
    number: "05",
    title: "Design & Drafting",
    description:
      "Our in-house design and drafting team produces every drawing, keeping design intent and buildability aligned from the first sketch.",
  },
  {
    number: "06",
    title: "Construction & Handover",
    description:
      "We project manage the entire build — from inception through to final handover — giving investors one accountable team and one clear line of sight the whole way through.",
  },
];

const PHASES = [
  { label: "Before you build", phase: "Feasibility" },
  { label: "Getting development-ready", phase: "Approvals" },
  { label: "On site", phase: "Construction" },
  { label: "Ready to perform", phase: "Handover" },
];

export default function OurProcessPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative min-h-[600px]">
        <Image
          src="/images/our-process-hero.png"
          alt="Affordable House Corp turnkey process"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/55 to-brand-orange/10" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6 py-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              How We Work
            </p>
            <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Your land, or ours to find.
              <br />
              One accountable <span className="text-brand-orange">process.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/75">
              From first feasibility check to final handover, Affordable House
              Corp guides investors through every stage of a turnkey build —
              coordinated by one team, from concept to completion.
            </p>
          </div>
        </div>
      </div>

      {/* Two ways to start */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Where It Begins
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
              Two ways to <span className="text-brand-orange">start.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {START_OPTIONS.map((option) => (
              <div key={option.title}>
                <h3 className="font-serif text-xl font-bold text-brand-navy">
                  {option.title}
                </h3>
                <p className="mt-3 leading-7 text-brand-gray">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The full journey */}
      <section className="bg-brand-cream py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              One Team, The Full Journey
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
              From land to <span className="text-brand-orange">handover.</span>
            </h2>
          </div>
          <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.number}>
                <span className="font-serif text-3xl font-bold text-brand-orange">
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-2 leading-6 text-brand-gray">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Phase strip */}
      <section className="bg-brand-navy py-10 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
          {PHASES.map((item) => (
            <div key={item.phase}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
                {item.label}
              </p>
              <p className="mt-2 font-serif text-2xl font-bold text-brand-orange">
                {item.phase}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border border-brand-gray-light bg-brand-gray-light py-20 text-center sm:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
            Ready when you are
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
            Bring the site, or bring{" "}
            <span className="text-brand-orange">the idea.</span>
          </h2>
          <p className="mt-4 text-brand-gray">
            Tell us about your land or investment plans and our team will
            walk you through what a turnkey build with AHC looks like, start
            to finish.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-brand-navy px-6 py-3 text-xs font-bold uppercase tracking-wide text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
            >
              Enquire Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={CONTACT.phoneHref}
              className="text-sm font-semibold text-brand-navy hover:text-brand-orange"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
