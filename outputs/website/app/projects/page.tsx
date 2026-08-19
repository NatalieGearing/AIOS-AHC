import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/content";
import ProjectsFilter from "@/components/ProjectsFilter";

export const metadata = buildMetadata({
  title: "Completed Projects",
  description:
    "A curated view of residential projects shaped by practical site knowledge, specialist design thinking and thirty years of delivery across South East Queensland.",
});

const CAPABILITIES = [
  { number: "01", label: "Rooming Accommodation" },
  { number: "02", label: "Dual Occupancy" },
  { number: "03", label: "Prefabricated Homes" },
  { number: "04", label: "Land Subdivisions" },
];

function mailto(subject: string) {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;
}

export default function ProjectsPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative flex min-h-[600px] items-end overflow-hidden">
        <Image
          src="/images/projects-hero.png"
          alt="A collection of completed Affordable House Corp residential projects across South East Queensland"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/55 to-brand-orange/10" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-wrap items-end justify-between gap-8 px-6 py-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
              Completed Project Portfolio
            </span>
            <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Built Outcomes.
              <br />
              <span className="italic text-brand-orange">Real-World Capability.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              A curated view of residential projects shaped by practical site
              knowledge, specialist design thinking and thirty years of
              delivery across South East Queensland.
            </p>
            <a
              href="#project-gallery"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-orange/90"
            >
              Explore the Gallery
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              Portfolio
            </p>
            <p className="mt-1 font-serif text-lg font-bold text-white">
              Rooming · Dual Living · Prefabricated
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
              Selected Work
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
              Practical Property.
              <br />
              <span className="italic text-[#ab8742]">Considered Delivery.</span>
            </h2>
          </div>
          <p className="max-w-md text-brand-gray">
            Every site asks different questions. Our work brings planning,
            resident needs, buildability and long-term operation together in
            one resolved outcome.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section id="project-gallery" className="scroll-mt-24 border-t border-brand-gray-light bg-brand-cream/40 py-16">
        <div className="mx-auto max-w-[1600px] px-3">
          <ProjectsFilter />
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative overflow-hidden bg-brand-navy py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            A Focused Residential Capability
          </p>
          <h2 className="mt-3 max-w-2xl font-serif text-3xl font-bold sm:text-4xl">
            Different Formats.
            <br />
            <span className="italic text-brand-orange">One Accountable Team.</span>
          </h2>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((item) => (
              <li
                key={item.number}
                className="rounded-xl border border-white/15 bg-white/5 p-5"
              >
                <span className="text-sm font-bold text-brand-orange">
                  {item.number}
                </span>
                <p className="mt-2 font-serif text-lg font-bold">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-brand-gray-light py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            Planning Something Similar?
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-brand-navy sm:text-3xl">
            Bring Us the Site.
            <br />
            <span className="italic">We&apos;ll Help Test What&apos;s Possible.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-gray">
            Talk with our Brisbane team about the opportunity, constraints
            and most useful next step.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={mailto("Discuss a new residential project")}
              className="inline-flex items-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-orange/90"
            >
              Start a Conversation
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
