import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { CONTACT, SERVICES, REVIEWS } from "@/lib/content";
import CountUp from "@/components/CountUp";

export const metadata = buildMetadata({
  title: {
    absolute: "About Affordable House Corp | Brisbane Property Builder",
  },
  description:
    "Affordable House Corp has built turnkey investment properties across Brisbane and South East Queensland for 30 years. See our story, process & track record.",
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
      "We help identify and secure the right site for your project, backed by 30 years of South East Queensland market knowledge.",
  },
  {
    number: "03",
    title: "Construction",
    description:
      "Our team delivers the build to completion, whether that's rooming accommodation, a land subdivision, or a pre-fab home.",
  },
  {
    number: "04",
    title: "Final Sale",
    description:
      "We support the process through to sale, giving investors a single point of accountability from concept to completion.",
  },
];

const WHY_US = [
  {
    number: "01",
    title: "Three Decades Local",
    description:
      "30 years of consistent delivery across Brisbane and South East Queensland.",
  },
  {
    number: "02",
    title: "Rooming Accommodation Specialists",
    description:
      "Market leader in the category, backed by deep, specific expertise.",
  },
  {
    number: "03",
    title: "One Accountable Team",
    description:
      "Feasibility, land acquisition, construction and sale, coordinated by one partner.",
  },
  {
    number: "04",
    title: "Scale & Stability",
    description:
      "A $100m+ operation with a 50-person team supporting every project.",
  },
  {
    number: "05",
    title: "Local Knowledge",
    description:
      "Based in Gumdale, with three decades of on-the-ground SEQ planning experience.",
  },
  {
    number: "06",
    title: "Full-Scope Service Provider",
    description:
      "Beyond construction, we're backed by a trusted partner network across property management, surveying, town planning, project management, and furniture and styling — happy to share contacts and make the introduction.",
  },
];

const HERO_STATS = [
  { end: 30, label: "Years in Brisbane" },
  { end: 100, prefix: "$", suffix: "m+", label: "Annual turnover" },
  { end: 50, label: "Team members" },
];

const testimonial = REVIEWS.find((r) => r.name === "David L.")!;

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Affordable House Corp",
  url: `${SITE_URL}/about`,
  mainEntity: {
    "@type": "HomeAndConstructionBusiness",
    name: SITE_NAME,
    description:
      "Turnkey investment property builder specialising in rooming accommodation, pre-fab houses, and land subdivisions across Brisbane and South East Queensland.",
    url: SITE_URL,
    telephone: `+61${CONTACT.phone.replace(/^0/, "").replace(/\s+/g, "")}`,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.addressLines[0],
      addressLocality: "Gumdale",
      addressRegion: "QLD",
      postalCode: "4154",
      addressCountry: "AU",
    },
    areaServed: {
      "@type": "State",
      name: "South East Queensland",
    },
    knowsAbout: [
      "Rooming Accommodation",
      "Land Subdivisions",
      "Pre-fab Houses",
    ],
  },
};

export default function AboutPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      {/* Hero */}
      <div className="relative min-h-[600px]">
        <Image
          src="/images/about-hero.png"
          alt="Architectural plans, a hard hat and a coffee on a site desk"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 to-brand-navy/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-4xl px-6 pb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              About Affordable House Corp
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">
              Built for investment.
              <br />
              Backed by <span className="text-brand-orange">experience.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white">
              For 30 years, we&apos;ve delivered turnkey investment properties
              for clients across Brisbane and South East Queensland—from
              feasibility and land acquisition to construction and
              completion.
            </p>
            <a
              href="#story"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-orange/90"
            >
              Discover Our Story
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <section className="bg-brand-cream lg:h-[138px]">
        <div className="grid lg:h-full lg:grid-cols-[minmax(325px,40%)_1fr]">
          <div className="relative flex items-center justify-center bg-brand-navy px-8 py-5 text-left lg:py-0 lg:[clip-path:polygon(0_0,100%_0,78%_100%,0_100%)]">
            <Image
              src="/images/quote-graphic-invest.png"
              alt="We don't follow the market – we built it. And we invest in it ourselves."
              width={800}
              height={231}
              className="w-full max-w-xs lg:h-[100px] lg:w-auto lg:max-w-none"
            />
          </div>

          <div className="flex items-center justify-end px-6 py-5 lg:py-0 lg:pl-12 lg:pr-[calc((100vw-1152px)/2+24px)]">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {HERO_STATS.map((stat, idx) => (
                <div key={stat.label} className="relative flex flex-col items-center justify-center text-center sm:px-4">
                  {idx > 0 && (
                    <span
                      aria-hidden
                      className="absolute -left-4 top-1/2 hidden h-1/2 w-px -translate-y-1/2 bg-brand-gray/20 sm:block"
                    />
                  )}
                  <CountUp
                    end={stat.end}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    className="font-sans text-[24px] font-normal text-brand-orange sm:text-[29px]"
                  />
                  <p className="mt-1 text-xs font-medium text-brand-gray">{stat.label}</p>
                </div>
              ))}
              <div className="relative flex flex-col items-center justify-center text-center sm:px-4">
                <span
                  aria-hidden
                  className="absolute -left-4 top-1/2 hidden h-1/2 w-px -translate-y-1/2 bg-brand-gray/20 sm:block"
                />
                <p className="font-sans text-[24px] font-normal text-brand-orange sm:text-[29px]">SEQ</p>
                <p className="mt-1 whitespace-nowrap text-xs font-medium text-brand-gray">Specialist Knowledge</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section id="story" className="scroll-mt-24 bg-white py-20 sm:py-28">
        <div className="grid gap-10 px-8 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Three Decades, One Clear Focus
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
              Property that works <span className="text-brand-orange">harder.</span>
            </h2>
          </div>
          <p className="text-justify leading-7 text-brand-gray">
            Affordable House Corp is a Brisbane-based residential builder
            specialising in investment-focused housing. Over three decades
            we&apos;ve grown from a local builder into a 50-person team
            delivering{" "}
            <Link
              href="/house-designs/rooming-accommodation"
              className="font-medium text-brand-orange hover:underline"
            >
              rooming accommodation
            </Link>{" "}
            and other turnkey projects across South East Queensland.
          </p>
          <p className="text-justify leading-7 text-brand-gray">
            Our purpose hasn&apos;t changed: bring together the site,
            design, planning and construction knowledge needed to create
            practical, high-yield investment properties — and give clients
            one accountable team from first feasibility check to final sale.
          </p>
        </div>
      </section>

      {/* Deep expertise */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          <div className="relative h-72 md:h-auto">
            <Image
              src="/images/ellen/exterior.png"
              alt="Ellen 210 rooming accommodation exterior"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 right-6 rounded-lg bg-brand-orange px-6 py-4 text-center text-brand-navy shadow-lg">
              <p className="font-serif text-2xl font-bold">30</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide">
                Years of Expertise
              </p>
            </div>
          </div>
          <div className="px-6 py-16 md:px-12 md:py-20">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Brisbane&apos;s Rooming Accommodation Specialists
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
              Deep expertise in{" "}
              <span className="text-brand-orange">high-yield living.</span>
            </h2>
            <p className="mt-5 leading-7 text-white/75">
              Rooming accommodation isn&apos;t an add-on service for us —
              it&apos;s a specialist capability built through years of
              navigating site, resident and buildability needs across
              Brisbane. Alongside this flagship offering, we deliver a
              focused range of investment formats:
            </p>
            <ul className="mt-6 space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                  <span className="text-sm font-medium text-white">
                    {service.title}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:underline"
            >
              Discuss the right build type
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Turnkey process */}
      <section
        id="process"
        className="scroll-mt-24 bg-white py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
                One Team, The Full Journey
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
                From feasibility to finished{" "}
                <span className="text-brand-orange">property.</span>
              </h2>
            </div>
            <p className="leading-7 text-brand-gray">
              Most builders begin at construction. We start earlier — testing
              the opportunity and coordinating every moving part so investors
              have one accountable team, and one clear line of sight, from
              concept to completion.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
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
        </div>
      </section>

      {/* Why us */}
      <section className="bg-brand-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Why AHC
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
              Experience is more than{" "}
              <span className="text-brand-orange">a number.</span>
            </h2>
          </div>
          <ol className="space-y-6">
            {WHY_US.map((item) => (
              <li key={item.number} className="flex gap-4">
                <span className="font-serif text-lg font-bold text-brand-orange">
                  {item.number}
                </span>
                <div>
                  <p className="font-semibold text-brand-navy">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-brand-gray">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-brand-navy">
        <div className="grid md:grid-cols-[1fr_2fr_1fr]">
          <div className="relative hidden h-64 md:block">
            <Image
              src="/images/ellen/kitchen.png"
              alt="Kitchen interior of an Affordable House Corp rooming home"
              fill
              className="object-cover"
            />
          </div>
          <div className="px-6 py-16 text-center text-white sm:px-12">
            <Quote className="mx-auto h-8 w-8 text-brand-orange" aria-hidden="true" />
            <p className="mx-auto mt-6 max-w-2xl font-serif text-xl leading-relaxed sm:text-2xl">
              {testimonial.text}
            </p>
            <p className="mt-6 text-sm font-semibold text-brand-orange">
              {testimonial.name}
              <span className="font-normal text-white/60"> — {testimonial.location}</span>
            </p>
          </div>
          <div className="relative hidden h-64 md:block">
            <Image
              src="/images/bellatrix-210/exterior.png"
              alt="Bellatrix 218 rooming accommodation exterior"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Local knowledge */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Local Knowledge, Applied
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
              Built in Brisbane.
              <br />
              Built for <span className="text-brand-orange">South East Queensland.</span>
            </h2>
          </div>
          <div>
            <p className="leading-7 text-brand-gray">
              Based in Gumdale, our team brings three decades of
              on-the-ground understanding of Brisbane and South East
              Queensland sites, planning conditions, and investor demand. We
              work across Brisbane and selected growth corridors throughout
              the region.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:underline"
            >
              Talk to our local team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-navy py-20 text-center text-white sm:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">
            Ready to start the{" "}
            <span className="text-brand-orange">conversation?</span>
          </h2>
          <p className="mt-4 text-white/75">
            Speak with our Brisbane team about your site, your build, or your
            next investment move.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-orange/90"
            >
              Enquire Now
            </Link>
            <a
              href={CONTACT.phoneHref}
              className="text-sm font-semibold text-white hover:text-brand-orange"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
