import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SERVICES, STATS, REVIEWS, SUPPLIERS, LISTINGS } from "@/lib/content";
import CountUp from "@/components/CountUp";
import FadeIn from "@/components/FadeIn";
import ListingCard from "@/components/ListingCard";

export const metadata = buildMetadata({
  title: "Turnkey Investment Property Builders",
  description:
    "30 years building investment properties across Brisbane and South East Queensland. Market leader in rooming accommodation, plus pre-fab houses and land subdivisions — feasibility through to final sale.",
});

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[600px] items-center overflow-hidden bg-brand-navy text-white">
        <div className="absolute inset-0 z-0">
          <video
            src="/videos/hero-timelapse.mp4"
            poster="/images/hero-bg.png"
            width={1920}
            height={1080}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/55 to-brand-orange/10" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12">
          <h1 className="max-w-3xl font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Designed for Investors.
            <br />
            <span className="text-brand-orange">Built for Wealth.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white">
            We specialise in constructing high-yield rooming accommodation,
            pre-fab houses and land subdivisions — purpose-built for
            investors, from feasibility through to final sale.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/calculator"
              className="rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-orange/90"
            >
              Try the Build Calculator
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-brand-orange hover:text-brand-orange"
            >
              Speak to an Expert
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream lg:h-[138px]">
        <div className="grid lg:h-full lg:grid-cols-[minmax(325px,40%)_1fr]">
          <div className="relative flex items-center justify-center bg-brand-navy px-8 py-5 text-left lg:py-0 lg:[clip-path:polygon(0_0,100%_0,78%_100%,0_100%)]">
            <Image
              src="/images/quote-graphic.png"
              alt="We don't just build properties – We build future wealth."
              width={404}
              height={143}
              className="w-full max-w-xs"
            />
          </div>

          <div className="flex items-center justify-end px-6 py-5 lg:py-0 lg:pl-12 lg:pr-[calc((100vw-1152px)/2+24px)]">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {STATS.map((stat, idx) => (
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
                    decimals={stat.decimals}
                    className="font-sans text-[24px] font-normal text-brand-orange sm:text-[29px]"
                  />
                  <p className="mt-1 text-xs font-medium text-brand-gray">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <FadeIn>
          <h2 className="font-serif text-[32px] font-bold text-brand-navy">
            We Build High-Yield <span className="text-brand-orange">Investment Products</span>
          </h2>
          <div className="mt-3 grid gap-6 lg:grid-cols-3 lg:items-start">
            <p className="text-justify text-[14px] text-brand-gray lg:col-span-2">
              Affordable House Corp is a specialist investment property builder focussed
              on creating high-yield, low maintenance properties that generate strong
              rental returns and long-term capital growth. We work with investors to
              deliver premium, purpose-built solutions across Australia, built with
              quality, transparency and performance at the core of everything we do.
            </p>
            <Link
              href="/about"
              className="inline-block shrink-0 justify-self-center rounded-md border border-brand-orange bg-transparent px-6 py-3 text-sm font-semibold text-brand-orange transition-colors hover:bg-brand-orange hover:text-brand-navy"
            >
              Learn More About AHC
            </Link>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={service.hasDetailPage ? `/house-designs/${service.slug}` : "/house-designs"}
              className="group overflow-hidden rounded-2xl border border-brand-gray-light bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-brand-navy">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-navy py-10 text-white">
        <Image
          src="/images/watermark-a-white.png"
          alt=""
          aria-hidden="true"
          fill
          className="pointer-events-none select-none object-contain object-right opacity-5"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <h2 className="font-serif text-[32px] font-bold">
            Why Investors Choose <span className="text-brand-orange">Affordable House Corp</span>
          </h2>
          <div className="mt-4 flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <p className="max-w-2xl text-justify text-[14px] text-white/75">
              Building an investment property requires a different approach than
              building a family home — we understand the numbers, the compliance, and
              the design elements that drive maximum return on investment.
            </p>
            <Link
              href="/about#process"
              className="inline-block shrink-0 whitespace-nowrap text-sm font-semibold text-brand-orange hover:underline"
            >
              AHC Build Process &rarr;
            </Link>
          </div>

          <div className="relative mt-8 grid gap-8 text-left sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Turnkey Delivery",
                desc: "From land acquisition and approvals to construction and tenant readiness, we handle the entire development lifecycle.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                ),
              },
              {
                title: "Yield-Optimised Design",
                desc: "Every square metre is meticulously planned to maximise rental income without compromising tenant experience.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.94" />
                ),
              },
              {
                title: "Full Compliance",
                desc: "We navigate the complex zoning, fire, and accessibility regulations required for multi-tenant dwellings.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Z" />
                ),
              },
              {
                title: "Premium Standard Inclusions",
                desc: "Durable finishes that withstand tenant turnover while maintaining high-end aesthetic appeal.",
                icon: (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5h7.5v3a3.75 3.75 0 0 1-7.5 0v-3Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6H5.25a1.5 1.5 0 0 0 0 3h.19c.28 1.5 1.32 2.73 2.68 3.28M15.75 6h3a1.5 1.5 0 0 1 0 3h-.19c-.28 1.5-1.32 2.73-2.68 3.28M12 12.75v3m-2.25 3h4.5m-4.5 0v-1.5a2.25 2.25 0 0 1 2.25-2.25 2.25 2.25 0 0 1 2.25 2.25v1.5" />
                  </>
                ),
              },
              {
                title: "Ongoing Investor Support",
                desc: "We're here for the long term, offering guidance and support at every step.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                ),
              },
              {
                title: "Quality Construction",
                desc: "Built to last with trusted brands, materials and strict quality control.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.026.021M5.109 6.09 9.75 10.73" />
                ),
              },
            ].map((feature) => (
              <FadeIn key={feature.title} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    className="h-6 w-6 text-brand-orange"
                  >
                    {feature.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold">{feature.title}</h3>
                  <p className="mt-1 text-sm text-white/75">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-serif text-[32px] font-bold text-brand-navy">
              House &amp; Land Packages <span className="text-brand-orange">Currently Available</span>
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] text-brand-gray">
              Investment-ready house and land opportunities available right now.
            </p>
          </div>
          <Link
            href="/house-and-land"
            className="inline-block shrink-0 text-sm font-semibold text-brand-orange hover:underline"
          >
            View All House &amp; Land Packages &rarr;
          </Link>
        </div>

        {LISTINGS.length === 0 ? (
          <p className="mt-10 text-center text-brand-gray">
            No current listings — check back soon or{" "}
            <Link href="/contact" className="font-semibold text-brand-orange hover:underline">
              get in touch
            </Link>{" "}
            about upcoming opportunities.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LISTINGS.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-brand-gray-light bg-brand-cream py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-[32px] font-bold text-brand-navy">
              Built with <span className="text-brand-orange">Premium Brands</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[14px] text-brand-gray">
              Every Affordable House Corp project is built with Australia&apos;s most
              trusted building product brands — delivering quality tenants expect
              and durability investors demand.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
            {SUPPLIERS.map((supplier) => (
              <div
                key={supplier.name}
                className="flex h-20 items-center justify-center rounded-xl border border-brand-gray-light bg-white p-3 text-center"
              >
                {supplier.image ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={supplier.image}
                      alt={supplier.name}
                      fill
                      sizes="160px"
                      className="object-contain p-1 grayscale"
                    />
                  </div>
                ) : (
                  <span className="text-xs font-bold leading-tight text-brand-gray">
                    {supplier.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="font-serif text-[32px] font-bold text-brand-navy">
              Our Customer <span className="text-brand-orange">Reviews</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[14px] text-brand-gray">
              Investors across South East Queensland trust Affordable House Corp to
              deliver quality builds, on time and on budget — time and time again.
            </p>
          </div>
        </div>

        <div className="mt-12 overflow-hidden">
          <div className="flex w-max gap-6 animate-marquee-ltr">
            {[...REVIEWS, ...REVIEWS].map((review, idx) => (
              <div
                key={`${review.name}-${idx}`}
                className="flex w-[320px] shrink-0 flex-col rounded-2xl border border-brand-gray-light bg-brand-gray-light p-7 shadow-sm sm:w-[380px]"
              >
                <div className="flex gap-1 text-brand-orange" aria-hidden>
                  {"★★★★★"}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-gray">
                  {review.text}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-brand-gray-light pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy font-serif text-sm font-bold text-white">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">{review.name}</p>
                    <p className="text-xs text-brand-gray">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-navy py-7 text-white">
        <Image
          src="/images/cta-bg-townhouses.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <h2 className="font-serif text-[32px] font-bold text-white">
            Ready to explore your investment
            <br />
            <span className="text-brand-orange">property build?</span>
          </h2>
          <p className="mt-3 max-w-2xl text-justify text-[14px] text-white">
            Get an indicative estimate, check your feasibility, or reach out
            directly for a full quote.
          </p>

          <div className="relative mt-10 grid gap-10 lg:grid-cols-3 lg:gap-10">
            <div className="flex flex-col rounded-xl bg-[#1e2959] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
              <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-9 w-9 text-brand-orange">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5h6M9 10.5h.008v.008H9V10.5Zm0 3h.008v.008H9V13.5Zm0 3h.008v.008H9V16.5Zm3-6h.008v.008H12V10.5Zm0 3h.008v.008H12V13.5Zm0 3h.008v.008H12V16.5Zm3-6h.008v.008H15V10.5Zm0 3h.008v.008H15V13.5Zm0 3h.008v.008H15V16.5ZM6 3.75h12A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75Z" />
              </svg>
              <h3 className="mt-4 font-serif text-xl font-bold text-white">
                Get an Indicative Build Estimate
              </h3>
              <span className="mt-2 block h-0.5 w-10 bg-brand-orange" />
              <p className="mt-3 text-sm text-white/75">
                Receive an instant estimate based on your preferred investment
                strategy and project requirements.
              </p>
              <Link
                href="/calculator"
                className="mt-6 inline-flex items-center gap-2 self-start rounded-md bg-brand-orange px-6 py-3 text-xs font-bold uppercase tracking-wide text-brand-navy hover:bg-brand-orange/90 lg:mt-auto"
              >
                Get My Estimate
                <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L12.586 11H4a1 1 0 1 1 0-2h8.586l-2.293-2.293a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            <div className="flex flex-col rounded-xl bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
              <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-9 w-9 text-brand-navy">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
              <h3 className="mt-4 font-serif text-xl font-bold text-brand-navy">
                Request a Detailed Quote
              </h3>
              <span className="mt-2 block h-0.5 w-10 bg-brand-orange" />
              <p className="mt-3 text-sm text-brand-gray">
                Speak with our experienced team for a personalised consultation
                and comprehensive fixed-price proposal.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 self-start rounded-md border border-brand-navy px-6 py-3 text-xs font-bold uppercase tracking-wide text-brand-navy transition-colors hover:bg-brand-navy hover:text-white lg:mt-auto"
              >
                Request a Quote
                <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L12.586 11H4a1 1 0 1 1 0-2h8.586l-2.293-2.293a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            <div className="flex flex-col rounded-xl bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
              <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-9 w-9 text-brand-navy">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
              <h3 className="mt-4 font-serif text-xl font-bold text-brand-navy">
                Check Your Investment Feasibility
              </h3>
              <span className="mt-2 block h-0.5 w-10 bg-brand-orange" />
              <p className="mt-3 text-sm text-brand-gray">
                Model your borrowing power, cash flow and long-term returns
                before you commit to a build.
              </p>
              <Link
                href="/investor-resources/investment-calculator"
                className="mt-6 inline-flex items-center gap-2 self-start rounded-md border border-brand-navy px-6 py-3 text-xs font-bold uppercase tracking-wide text-brand-navy transition-colors hover:bg-brand-navy hover:text-white lg:mt-auto"
              >
                Check Feasibility
                <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L12.586 11H4a1 1 0 1 1 0-2h8.586l-2.293-2.293a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 sm:grid-cols-3 sm:divide-x sm:divide-brand-gray/20">
          {[
            {
              title: "No Obligation",
              desc: "No pressure, just honest advice.",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Z" />
              ),
            },
            {
              title: "Expert Advice",
              desc: "Tailored to your investment goals.",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              ),
            },
            {
              title: "Fast Response",
              desc: "We'll be in touch promptly.",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              ),
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 sm:px-6">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="h-8 w-8 shrink-0 text-brand-orange"
              >
                {item.icon}
              </svg>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-brand-navy">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-brand-gray">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
