import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { CONTACT, SERVICES } from "@/lib/content";
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
      "Beyond construction, we have a trusted partner network across property management, surveying, town planning, project management, and furniture & styling we can connect you with.",
  },
];

const HERO_STATS = [
  { end: 30, label: "Years in Brisbane" },
  { end: 100, prefix: "$", suffix: "m+", label: "Annual turnover" },
  { end: 50, label: "Team members" },
];

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
          <div className="mx-auto w-full max-w-6xl px-6 py-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              About Affordable House Corp
            </p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Built for investment.
              <br />
              Backed by <span className="text-brand-orange">experience.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white">
              For 30 years, we&apos;ve delivered turnkey investment properties
              for clients across Brisbane and South East Queensland—from
              feasibility and land acquisition to construction and
              completion.
            </p>
            <a
              href="#story"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-orange/10 px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-orange/20"
            >
              Discover Our Story
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
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
              className="w-full max-w-[368px] lg:h-[115px] lg:w-auto lg:max-w-none"
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
        <div className="mx-auto grid max-w-[90rem] gap-10 px-8 md:grid-cols-4">
          <div className="md:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Three Decades, One Clear Focus
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
              Property that
              <br />
              works <span className="italic text-brand-orange">harder.</span>
            </h2>
          </div>
          <p className="text-justify leading-7 text-brand-gray">
            Affordable House Corp is a Brisbane-based residential builder
            specialising in investment-focused housing. Over three decades
            we&apos;ve grown from a local builder into a 50-person team
            delivering{" "}
            <Link
              href="/house-designs/rooming-accommodation"
              className="text-brand-gray hover:underline"
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
          <p className="text-justify leading-7 text-brand-gray">
            Based in Gumdale, our team brings three decades of
            on-the-ground understanding of Brisbane and South East
            Queensland sites, planning conditions, and investor demand. We
            work across Brisbane and selected growth corridors throughout
            the region.
          </p>
        </div>
      </section>

      {/* Deep expertise */}
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <Image
          src="/images/expertise-section-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Brisbane&apos;s Rooming Accommodation Specialists
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
              Deep expertise in high-yield
              <br />
              <span className="text-brand-orange">property.</span>
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
        className="scroll-mt-24 bg-white py-10 sm:py-14"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              One Team, The Full Journey
            </p>
            <div className="mt-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              <h2 className="font-serif text-3xl font-bold text-brand-navy sm:text-4xl lg:col-span-2">
                From feasibility to finished{" "}
                <span className="text-brand-orange">property.</span>
              </h2>
              <p className="text-justify leading-7 text-brand-gray lg:col-start-3 lg:col-span-2">
                Most builders begin at construction. We start earlier — testing
                the opportunity and coordinating every moving part so investors
                have one accountable team, and one clear line of sight, from
                concept to completion.
              </p>
            </div>
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
                <p className="mt-2 text-justify text-sm leading-6 text-brand-gray">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-brand-cream py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Why AHC
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
              Experience is more than{" "}
              <span className="text-brand-orange">a number.</span>
            </h2>
          </div>
          <ol className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Local knowledge */}
      <section className="relative mx-auto max-w-[1899px] overflow-hidden aspect-[1899/493]">
        <Image
          src="/images/local-knowledge-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative flex h-full items-center">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 md:ml-auto md:mr-0 md:max-w-[49.5rem]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
                Local Knowledge, Applied
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
                Bring us the site
                <br />
                or bring us the <span className="italic text-brand-orange">idea.</span>
              </h2>
            </div>
            <div>
              <p className="text-justify leading-7 text-brand-gray">
                We work with private investors, developers and property
                professionals seeking well-considered residential projects
                across Brisbane and South East Queensland.
              </p>
              <p className="mt-4 text-justify leading-7 text-brand-gray">
                Some clients come to us with an existing site. Others involve
                us before purchasing land. Either way, the first step is the
                same: understand the opportunity, identify the constraints and
                agree on the most useful way forward.
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
        </div>
      </section>

      {/* Final CTA */}
      <section className="border border-brand-gray-light bg-brand-gray-light py-20 text-center sm:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
            Ready to start the conversation?
          </h2>
          <h3 className="mt-3 font-serif text-[36px] font-bold text-brand-navy sm:text-[45px]">
            Bring us the opportunity.
            <br />
            <span className="font-serif italic font-semibold" style={{ letterSpacing: "0.98px" }}>We&apos;ll help test <span className="text-brand-orange">what&apos;s possible.</span></span>
          </h3>
          <p className="mt-4 text-brand-gray">
            Tell us about your site or investment plans. Our team will
            arrange an initial conversation and recommend the most useful
            next step.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-brand-navy px-6 py-3 text-xs font-bold uppercase tracking-wide text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
            >
              Enquire Now
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L12.586 11H4a1 1 0 1 1 0-2h8.586l-2.293-2.293a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
              </svg>
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
