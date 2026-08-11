import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Finding a Property Manager",
  description:
    "How to choose a property manager for rooming accommodation in Queensland — what a specialist does, what to check before you appoint, and red flags to avoid.",
});

const DUTIES = [
  {
    n: "01",
    title: "Room-by-room leasing",
    body: "Marketing individual rooms on share-living platforms, screening compatible residents, and re-letting fast — because every vacant room is lost yield.",
  },
  {
    n: "02",
    title: "Rent collection & arrears",
    body: "Five or six separate rent streams per dwelling, tracked and enforced individually, with per-room arrears follow-up under RTRA timeframes.",
  },
  {
    n: "03",
    title: "RTRA compliance",
    body: "Form R18 rooming accommodation agreements, individual bonds lodged with the RTA, room condition reports, house rules and minimum housing standards.",
  },
  {
    n: "04",
    title: "Resident management",
    body: "Shared-living dynamics need active management — onboarding, house-rule enforcement, and resolving disputes before they cause turnover.",
  },
  {
    n: "05",
    title: "Common areas & consumables",
    body: "Scheduled cleaning of kitchens, living areas and bathrooms, restocking consumables, and keeping utilities, internet and services running.",
  },
  {
    n: "06",
    title: "Reporting & financials",
    body: "Per-room income statements, occupancy and arrears reporting, and expense tracking so you can see actual yield against projection.",
  },
];

const STAKES = [
  { stat: "8.2%", label: "avg gross yield our clients' projects target — earned room by room" },
  { stat: "1 room", label: "vacant in a 6-room house cuts gross income by ~17%" },
  { stat: "R18", label: "the agreement your manager must run — not a general tenancy form" },
];

const CHECKLIST = [
  {
    n: "1",
    title: "A real rooming accommodation portfolio",
    body: "Ask how many rooming houses they manage today — not whether they'd be “happy to take it on”.",
  },
  {
    n: "2",
    title: "Per-room accounting and reporting",
    body: "Statements should show income, arrears and vacancy for each room, not one blended figure.",
  },
  {
    n: "3",
    title: "Correct QLD compliance process",
    body: "R18 agreements, individual RTA bond lodgement, room condition reports and documented house rules.",
  },
  {
    n: "4",
    title: "A common-area service regime",
    body: "A written schedule for cleaning, consumables, gardens and utilities — and who pays for what.",
  },
  {
    n: "5",
    title: "Room-by-room vacancy marketing",
    body: "Listings on share-accommodation platforms plus a waiting pool, with typical days-to-relet they can prove.",
  },
  {
    n: "6",
    title: "Transparent, complete fee schedule",
    body: "Management percentage, letting fee per room, inspection and admin charges — all in writing up front.",
  },
  {
    n: "7",
    title: "Licensing and insurance",
    body: "A current QLD real estate licence and professional indemnity cover appropriate to rooming accommodation.",
  },
  {
    n: "8",
    title: "References from rooming house owners",
    body: "Speak to two or three current clients with comparable properties — not general landlord references.",
  },
];

const RED_FLAGS = [
  {
    title: "“Yours would be our first”",
    body: "Rooming accommodation is a poor place for an agency to learn. Compliance mistakes land on you as the owner.",
  },
  {
    title: "General tenancy paperwork",
    body: "If they propose a standard tenancy agreement instead of Form R18 agreements per room, they don't know the asset class.",
  },
  {
    title: "No common-area plan",
    body: "Nobody owning cleaning, consumables and utilities is how shared houses deteriorate and residents leave.",
  },
  {
    title: "Vague on vacancy numbers",
    body: "A specialist can tell you their portfolio's occupancy and average days-to-relet. Evasiveness means they don't track it.",
  },
];

const QUESTIONS = [
  "How many rooming accommodation properties do you currently manage, and where?",
  "What is your portfolio's current occupancy and average days to re-let a room?",
  "Walk me through your process when a new resident moves in — agreements, bond, condition report.",
  "How do you handle a resident breaching house rules or falling into arrears?",
  "What does your common-area cleaning and consumables schedule look like, and what does it cost?",
  "Can you show me a sample monthly statement for a rooming house you manage?",
];

const FEES = [
  {
    item: "Management fee",
    note: "Charged on rent collected. Rooming houses sit above standard-rental rates for the extra workload.",
    typical: "10–15% + GST",
  },
  {
    item: "Letting fee",
    note: "Per room, on each new agreement. High turnover makes this the fee to scrutinise.",
    typical: "1 week's room rent",
  },
  {
    item: "Common-area services",
    note: "Cleaning, consumables, gardens — either bundled into the management fee or itemised at cost.",
    typical: "Included or at cost",
  },
  {
    item: "Inspections & admin",
    note: "Routine inspections, annual statements, tribunal attendance. Confirm what's inside the base fee.",
    typical: "Varies — get it in writing",
  },
];

const COMPLIANCE_PACK = [
  "Planning and building approvals",
  "Registration and accreditation evidence",
  "Fire plan, servicing and drill summary",
  "Insurance certificates and key exclusions",
  "Maintenance and serious-incident reporting",
  "Renewal calendar with responsible person",
  "Manager policies for complaints and privacy",
  "Complete record handover on termination",
];

const FAQS = [
  {
    q: "Can my regular residential agent manage a rooming house?",
    a: "Legally yes, but few are equipped for it. Rooming accommodation runs on separate agreements per room, its own bond and condition-report process, house rules, and continuous common-area upkeep. Agencies built around single-tenancy houses typically under-service all four — ask any candidate how many rooming houses they currently manage before assuming they can.",
  },
  {
    q: "What agreements and bonds apply in Queensland?",
    a: "Each resident signs a rooming accommodation agreement (Form R18) under the Residential Tenancies and Rooming Accommodation Act 2008 — not a general tenancy agreement. Each room's bond is lodged individually with the RTA, and each room gets its own condition report. Your manager should handle all of this as standard.",
  },
  {
    q: "Who handles utilities, internet and consumables?",
    a: "In most rooming houses the owner supplies electricity, water, internet and shared consumables, with the cost built into room rents. A good manager budgets these, arranges accounts and cleaning schedules, and reports the spend in your monthly statement so you can see true net yield.",
  },
  {
    q: "What occupancy should I expect a good manager to hold?",
    a: "Well-located, well-run rooming houses in South East Queensland routinely hold 90%+ occupancy. The differentiator is re-letting speed: a specialist lists rooms on room-by-room platforms and has a waiting pool, turning a vacancy around in days rather than weeks.",
  },
];

export default function FindingAPropertyManagerPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative min-h-[600px]">
        <Image
          src="/images/property-manager-hero.png"
          alt="Property manager reviewing a rooming house"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/55 to-brand-orange/10" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-end justify-between gap-10 px-6 py-12">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
                Investor Resources
              </p>
              <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
                A good property manager protects more than just
                <br />
                <span className="italic text-brand-orange">Rental Income</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/85">
                A rooming house is not a set-and-forget asset. One dwelling, five or six
                tenancies, and a specific compliance regime under Queensland&apos;s RTRA Act —
                the manager you appoint determines whether your yield holds up. Here&apos;s what
                a specialist firm does, and how to choose one.
              </p>
            </div>
            <div className="shrink-0 border-t border-white/25 pt-6">
              <p className="font-serif text-5xl font-bold text-brand-orange">5–6</p>
              <p className="mt-3 max-w-[12rem] text-sm leading-6 text-white/60">
                independent tenancies to manage in a single rooming accommodation dwelling
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What a PM does */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">The role</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
            What a specialist property manager does <span className="italic text-brand-orange">for you.</span>
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DUTIES.map((d) => (
              <div key={d.n} className="rounded-2xl border border-brand-gray-light bg-white p-6">
                <span className="text-xs font-bold text-brand-orange">{d.n}</span>
                <h3 className="mt-3 font-serif text-xl font-bold text-brand-navy">{d.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-gray">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why RA is different */}
      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">Not a standard rental</p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">
              Why rooming accommodation is <span className="italic text-brand-orange">different.</span>
            </h2>
          </div>
          <p className="leading-7 text-brand-gray">
            Rooming accommodation is governed by its own chapter of Queensland&apos;s{" "}
            <em>Residential Tenancies and Rooming Accommodation Act 2008</em>. Each room is let on
            a separate rooming accommodation agreement (Form R18) — not a general tenancy
            agreement — with its own bond lodged with the RTA, its own condition report, and
            enforceable house rules across the shared spaces.
          </p>
          <p className="leading-7 text-brand-gray">
            That means five or six concurrent agreements per dwelling, more frequent tenant
            turnover, common areas that must be cleaned, consumables restocked, and shared-living
            dynamics actively managed. A general residential agency running single-tenancy
            templates is rarely set up for any of it.
          </p>
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">The stakes</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
                Why choosing the right firm <span className="italic text-brand-orange">matters.</span>
              </h2>
              <p className="mt-5 leading-7 text-brand-gray">
                The high gross yield of a rooming house is earned room by room. A manager who is
                slow to fill a vacancy, soft on arrears, or careless with R18 compliance erodes
                the very advantage you built the property for — and compliance failures under the
                RTRA Act sit with you, the owner, as much as the agent.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {STAKES.map((s) => (
                <div key={s.stat} className="max-w-[9rem] border-t-2 border-brand-orange pt-4">
                  <p className="font-serif text-3xl font-bold text-brand-navy">{s.stat}</p>
                  <p className="mt-2 text-xs leading-5 text-brand-gray">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="bg-brand-gray-light py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">Due diligence</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
            What to check before you <span className="italic text-brand-orange">appoint.</span>
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {CHECKLIST.map((c) => (
              <div key={c.n} className="flex items-start gap-4 rounded-xl bg-white p-5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white">
                  {c.n}
                </span>
                <div>
                  <p className="text-sm font-semibold text-brand-navy">{c.title}</p>
                  <p className="mt-1 text-sm leading-6 text-brand-gray">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Red flags */}
      <section className="bg-brand-navy py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">Walk away when</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
            Red flags to <span className="text-brand-orange">avoid.</span>
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {RED_FLAGS.map((r) => (
              <div key={r.title} className="border-t border-white/25 pt-5">
                <p className="font-semibold text-white">{r.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/65">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions + Fees */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">The interview</p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-brand-navy sm:text-3xl">
              Questions to ask a prospective <span className="italic text-brand-orange">manager.</span>
            </h2>
            <ol className="mt-6 flex list-decimal flex-col gap-3.5 pl-5 text-sm leading-6 text-brand-gray">
              {QUESTIONS.map((q) => (
                <li key={q} className="pl-1.5">
                  {q}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">Fees</p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-brand-navy sm:text-3xl">
              What you&apos;ll pay — and what&apos;s <span className="italic text-brand-orange">included.</span>
            </h2>
            <div className="mt-6 flex flex-col">
              {FEES.map((f) => (
                <div key={f.item} className="flex items-baseline justify-between gap-6 border-b border-brand-gray-light py-3.5">
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">{f.item}</p>
                    <p className="mt-1 text-xs leading-5 text-brand-gray">{f.note}</p>
                  </div>
                  <span className="shrink-0 text-sm font-bold whitespace-nowrap text-brand-orange">{f.typical}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 border-l-4 border-brand-orange bg-brand-cream/60 px-4.5 py-3.5 text-sm italic leading-6 text-brand-gray">
              Compare firms on net yield after all fees — not the headline management percentage.
              A cheap rate with per-room letting fees on high turnover can cost more than a dearer
              all-inclusive one.
            </p>
          </div>
        </div>
      </section>

      {/* Owner controls */}
      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
            Practical owner controls
          </p>
          <h2 className="mt-3 max-w-2xl font-serif text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">
            What an investor should ask the manager <span className="text-brand-orange">to provide.</span>
          </h2>
          <div className="mt-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-brand-navy p-8 text-white">
              <h3 className="font-serif text-xl font-bold">Your owner-level compliance pack</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                This gives you meaningful oversight without duplicating the manager&apos;s resident
                files or daily operational records.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {COMPLIANCE_PACK.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-orange" />
                    <span className="text-sm leading-5">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-brand-gray-light bg-white p-8">
              <h3 className="font-serif text-xl font-bold text-brand-navy">Put responsibility in writing</h3>
              <p className="mt-3.5 leading-7 text-brand-gray">
                The management agreement should allocate applications, accreditation, inspections,
                emergency plans, servicing, recordkeeping and regulator contact.
              </p>
              <p className="mt-3.5 leading-7 text-brand-gray">
                It should also define urgent repair authority, owner response times, reporting
                frequency, breach escalation and access to compliance evidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">FAQ</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
            Common <span className="text-brand-orange">questions.</span>
          </h2>
          <div className="mt-8 flex flex-col gap-3">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group rounded-xl bg-brand-gray-light">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-brand-navy marker:hidden [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="shrink-0 text-xl font-normal text-brand-orange transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-7 text-brand-gray">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Partner note */}
      <section className="bg-brand-navy py-9">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6">
          <div className="max-w-2xl">
            <p className="font-serif text-xl font-bold text-white">
              We can introduce you to specialist managers.
            </p>
            <p className="mt-2 text-sm leading-6 text-white/65">
              The AHC Partner Network includes property management firms that specialise in
              rooming accommodation and co-living — vetted across hundreds of our clients&apos;
              projects.
            </p>
          </div>
          <Link
            href="/investor-resources/our-partner-network"
            className="shrink-0 whitespace-nowrap border-b border-brand-orange pb-1 text-xs font-bold text-white hover:text-brand-orange"
          >
            Our Partner Network &rarr;
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-brand-gray-light py-16 text-center sm:py-20">
        <div className="mx-auto max-w-xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
            Talk to the specialists
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
            Get the management side right from <span className="italic text-brand-orange">day one.</span>
          </h2>
          <p className="mt-4 leading-7 text-brand-gray">
            After 30 years and 2,100+ projects, we know which managers keep rooming houses full,
            compliant and performing. Call or email and we&apos;ll point you in the right
            direction.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={CONTACT.phoneHref}
              className="rounded-md bg-brand-orange px-7 py-3.5 text-sm font-bold text-brand-navy hover:bg-brand-gold-dark"
            >
              Call {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="rounded-md border border-brand-gray-light px-7 py-3.5 text-sm font-semibold text-brand-navy hover:border-brand-orange hover:text-brand-orange"
            >
              {CONTACT.email}
            </a>
          </div>
          <p className="mt-5 text-xs text-brand-gray">
            {CONTACT.hours[0].label}: {CONTACT.hours[0].value} · {CONTACT.hours[1].label}: {CONTACT.hours[1].value}
          </p>
        </div>
      </section>
    </div>
  );
}
