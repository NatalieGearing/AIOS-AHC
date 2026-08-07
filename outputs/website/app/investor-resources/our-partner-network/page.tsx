import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/content";
import CountUp from "@/components/CountUp";

export const metadata = buildMetadata({
  title: "Our Partner Network",
  description:
    "Meet the trusted specialists Affordable House Corp recommends to clients before, during and after construction.",
});

const SPECIALISTS = [
  {
    number: "01",
    mark: "GSP",
    logo: "/images/partners/gateway.webp",
    website: "https://gsp-land.com.au/",
    stage: "Feasibility & approvals",
    category: "Surveying & Town Planning",
    name: "Gateway Survey and Planning",
    description:
      "Licensed surveyors and town planners delivering accurate land surveys, contour plans and development approvals to get your project off the ground.",
  },
  {
    number: "02",
    mark: "TS",
    logo: "/images/partners/terri-scheer.webp",
    website: "https://www.terrischeer.com.au/",
    stage: "Protection & risk",
    category: "Insurance",
    name: "Terri Scheer",
    description:
      "Specialist insurance brokers providing tailored construction, landlord and investment property cover to protect your assets at every stage.",
  },
  {
    number: "03",
    mark: "BMT",
    logo: "/images/partners/bmt.png",
    website: "https://www.bmtqs.com.au/",
    stage: "Quantity Surveying",
    category: "Quantity Surveying",
    name: "BMT Quantity Surveyors",
    description:
      "Australia's leading tax depreciation specialists, helping property investors access comprehensive, ATO-compliant depreciation schedules.",
  },
  {
    number: "04",
    mark: "YSH",
    logo: "/images/partners/ysh.png",
    website: "https://ysh.com.au/",
    stage: "Leasing & operations",
    category: "Property Management",
    name: "YSH Property Management",
    description:
      "Experienced property managers specialising in rooming accommodation and co-living, supporting tenant placement, day-to-day operations and compliance.",
  },
  {
    number: "05",
    mark: "QPSR",
    logo: "/images/partners/qpsr.png",
    website: "https://www.qpsr.com.au/",
    stage: "Leasing & operations",
    category: "Property Management",
    name: "QPSR Property Management",
    description:
      "Dedicated specialists in rooming house and shared-living management, focused on occupancy, resident experience and professional asset management.",
  },
  {
    number: "06",
    mark: "F&H",
    logo: "/images/partners/fox-and-hound.png",
    website: "https://www.foxandhoundlandscaping.com.au",
    stage: "Landscaping",
    category: "Landscaping & Construction",
    name: "Fox & Hound Landscaping",
    description:
      "Specialists in landscaping and construction landscaping, including retaining walls, drainage and site works that finish a project off and protect the land it sits on.",
  },
  {
    number: "07",
    mark: "MRF",
    logo: "/images/partners/middle-road-furniture.png",
    website: "https://middleroadfurniture.com.au/",
    stage: "Fit-out & launch",
    category: "Furniture Packages",
    name: "Middle Road Furniture",
    description:
      "A quality furniture supplier providing turnkey furniture packages designed for rental appeal, everyday durability and efficient property setup.",
  },
];

const JOURNEY = [
  { label: "From first assessment", stage: "Plan" },
  { label: "Through the build", stage: "Protect" },
  { label: "At handover", stage: "Prepare" },
  { label: "For the long term", stage: "Manage" },
];

function introMailto(partnerName: string) {
  const subject = encodeURIComponent(`Partner Network Introduction – ${partnerName}`);
  return `mailto:${CONTACT.email}?subject=${subject}`;
}

export default function OurPartnerNetworkPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[600px] overflow-hidden bg-brand-navy text-white">
        <div className="absolute -right-24 -top-24 h-[430px] w-[430px] rounded-full border border-white/10" />
        <div className="mx-auto flex min-h-[600px] max-w-6xl flex-col justify-center gap-10 px-6 py-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Our Partner Network
            </p>
            <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              Trusted specialists.
              <br />
              One connected <span className="text-brand-orange">journey.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/75">
              Property projects call for more than a great builder. We work
              with — and confidently recommend — a network of experienced
              specialists who can support our clients before, during and
              after construction.
            </p>
          </div>
          <div className="shrink-0 border-t border-white/25 pt-6 lg:w-48">
            <CountUp end={7} className="font-serif text-6xl font-bold text-brand-orange" />
            <p className="mt-3 max-w-[12rem] text-sm leading-6 text-white/60">
              specialist partners across the property lifecycle
            </p>
          </div>
        </div>
      </section>

      {/* Why our network matters */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Why our network matters
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
              The right expertise
              <br />
              at the <span className="text-brand-orange">right stage</span>
            </h2>
          </div>
          <p className="leading-7 text-brand-gray">
            Over 30 years in Brisbane, we&apos;ve learned that successful
            projects depend on trusted advice and capable delivery at every
            step. Our network brings together specialists whose services
            complement our own.
          </p>
          <p className="leading-7 text-brand-gray">
            When a client needs help beyond our building scope, we can put
            them in touch with the right people — making the next step
            clearer and the whole journey more connected.
          </p>
        </div>
      </section>

      {/* Specialists grid */}
      <section id="partners" className="bg-brand-cream py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Recommended specialists
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
              Companies we&apos;re proud to{" "}
              <span className="text-brand-orange">work with.</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SPECIALISTS.map((partner) => (
              <div
                key={partner.mark}
                className="flex flex-col rounded-2xl border border-brand-gray-light bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-orange">{partner.number}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-gray">
                    {partner.stage}
                  </span>
                </div>

                {partner.logo ? (
                  <div className="relative mt-8 flex h-14 w-32 items-center justify-start">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                ) : (
                  <div className="relative mt-8 flex h-14 w-14 items-center justify-center bg-brand-navy text-sm font-bold text-white">
                    {partner.mark}
                    <span className="absolute -bottom-2 -right-2 h-3.5 w-3.5 bg-brand-orange" />
                  </div>
                )}

                <h3 className="mt-6 font-serif text-xl font-bold text-brand-navy">
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-orange"
                  >
                    {partner.name}
                  </a>
                </h3>
                <p className="mt-3 text-sm leading-6 text-brand-gray">
                  {partner.description}
                </p>

                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 self-start border-b border-brand-orange pb-1 text-xs font-bold text-brand-navy hover:text-brand-orange"
                >
                  Request an introduction
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey strip */}
      <section className="bg-brand-navy py-10 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
          {JOURNEY.map((step) => (
            <div key={step.stage}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
                {step.label}
              </p>
              <p className="mt-2 font-serif text-2xl font-bold text-brand-orange">
                {step.stage}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border border-brand-gray-light bg-brand-gray-light py-20 text-center sm:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
            Need a specialist?
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
            We&apos;ll make the right{" "}
            <span className="text-brand-orange">introduction.</span>
          </h2>
          <p className="mt-4 text-brand-gray">
            Tell us what your project needs and our team can connect you with
            a suitable member of the AHC Partner Network.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={introMailto("General Enquiry")}
              className="rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-orange/90"
            >
              Request an Introduction
            </a>
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
