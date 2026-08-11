import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  Building2,
  ChevronDown,
  ClipboardList,
  FileEdit,
  Flame,
  Scale,
  ShieldCheck,
  Umbrella,
  Wrench,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import ComplianceOverview, { type OverviewCard } from "@/components/ComplianceOverview";

export const metadata = buildMetadata({
  title: "Compliance Centre",
  description:
    "Class 1b rooming accommodation compliance in Queensland — planning approval, residential-service accreditation, tenancy law, fire safety and minimum housing standards explained.",
});

type TagKind = "always" | "threshold" | "council" | "recommended";

const TAG_META: Record<TagKind, { label: string; className: string }> = {
  always: {
    label: "Required — every operation",
    className: "border-brand-navy/30 bg-brand-navy/5 text-brand-navy",
  },
  threshold: {
    label: "Threshold-triggered",
    className: "border-brand-orange/40 bg-brand-orange/10 text-brand-orange",
  },
  council: {
    label: "Council or property-specific",
    className: "border-brand-gray/30 bg-brand-gray-light text-brand-gray",
  },
  recommended: {
    label: "Recommended practice",
    className: "border-brand-gold-dark/40 bg-brand-gold-dark/10 text-brand-gold-dark",
  },
};

function Tag({ kind }: { kind: TagKind }) {
  const meta = TAG_META[kind];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}

interface SourceLink {
  label: string;
  href: string;
}

interface ContentBlock {
  heading: string;
  tags: TagKind[];
  paragraphs?: string[];
  bullets?: string[];
  sources?: SourceLink[];
}

interface Section {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  intro?: string;
  introSources?: SourceLink[];
  blocks: ContentBlock[];
}

const SECTIONS: Section[] = [
  {
    id: "building-occupancy",
    title: "Building and occupancy",
    subtitle: "Class 1b building classification and occupancy thresholds.",
    badge: "Confirm scope",
    blocks: [
      {
        heading: "What a Class 1b approval covers",
        tags: ["always"],
        paragraphs: [
          "A Class 1b building approval is a construction-classification and building-standard approval — it addresses how the building itself is designed and built for small-scale rooming accommodation / boarding-house use. On its own, it does not confirm the planning use is permitted, or that residential-service accreditation, tenancy-law and fire-safety obligations are met. Each of those is assessed separately, under the sections below.",
        ],
      },
      {
        heading: "Occupancy thresholds that change what applies",
        tags: ["threshold", "council"],
        bullets: [
          "Up to five bedrooms / five occupants may qualify for Queensland's limited small-scale planning pathway — see Planning and property approval.",
          "Six or more residents may bring the building into Queensland's budget-accommodation fire-safety regime — see Fire & Electrical Safety.",
        ],
      },
    ],
  },
  {
    id: "planning",
    title: "Planning and property approval",
    subtitle: "Permitted use, council approval, overlays and approval conditions.",
    badge: "Every property",
    blocks: [
      {
        heading: "Planning approval and material change of use",
        tags: ["always", "council"],
        paragraphs: [
          "Confirm that “rooming accommodation” is permitted under the relevant council planning scheme, including any material change of use approval, overlays, parking, waste, landscaping, amenity and occupancy conditions.",
          "A “material change of use” is council's term for starting, changing or intensifying how a property is used — moving a property to rooming accommodation is treated as a new use, even where no building work is planned. Councils assess this against the zoning intent of their own planning scheme, so an identical proposal can be straightforward on one lot and need a full development application on the one next door. In practice, that assessment usually looks at:",
        ],
        bullets: [
          "Overlays — flood, bushfire, heritage or character overlays can add conditions or rule the use out on a particular site.",
          "Parking and access — rooming accommodation is typically assessed on a per-room or per-bedroom rate, not a per-dwelling rate.",
          "Waste — bin storage, collection access and servicing for a higher-occupancy dwelling.",
          "Landscaping and amenity — screening, private open space and the impact on neighbouring properties.",
          "Occupancy conditions — the approval itself can cap the number of bedrooms or residents permitted.",
        ],
      },
      {
        heading: "Queensland's limited small-scale pathway",
        tags: ["threshold", "council"],
        paragraphs: [
          "Queensland currently provides a limited pathway for small-scale rooming accommodation — generally no more than five bedrooms and five occupants — in certain lower-density residential zones, provided prescribed requirements are met. Those provisions currently run until 2 December 2026. Larger or non-compliant proposals may require council approval.",
        ],
        sources: [
          {
            label: "Queensland Government — Changes to regulation of rooming accommodation",
            href: "https://www.planning.qld.gov.au/planning-issues-and-interests/changes-to-regulation-of-rooming-accommodation-dwellings-houses-and-zone-purpose-statements",
          },
        ],
      },
    ],
  },
  {
    id: "fire-safety",
    title: "Fire & Electrical Safety",
    subtitle: "Detection, evacuation, equipment, training and records.",
    badge: "Safety critical",
    blocks: [
      {
        heading: "Beyond domestic smoke alarms",
        tags: ["always", "council"],
        paragraphs: [
          "This extends beyond simply installing domestic smoke alarms. Depending on the building, occupancy and approval history, requirements can include:",
        ],
        bullets: [
          "Interconnected photoelectric smoke alarms",
          "Fire detection, extinguishers, hose reels or other installations",
          "Emergency lighting and exit signage",
          "Clear evacuation routes",
          "Evacuation diagrams and procedures",
          "Resident and staff instruction",
          "Evacuation drills",
          "Inspection and maintenance records",
          "A current fire safety management plan",
          "Occupancy limits",
        ],
      },
      {
        heading: "Records to keep",
        tags: ["always"],
        paragraphs: [
          "Fire safety, accreditation, tenancy and electrical/gas records should be kept current and available for inspection — including inspection and maintenance records, evacuation drill records, condition reports and accreditation renewal documentation referenced throughout this page.",
        ],
      },
    ],
  },
  {
    id: "housing-standards",
    title: "Minimum housing standards",
    subtitle: "Security, sanitation, maintenance and resident amenity.",
    badge: "Ongoing",
    intro:
      "All residential rental properties in Queensland must meet minimum housing standards when the tenant moves in and for the duration of the tenancy. It aims to make sure all rental properties are safe, secure and functional.",
    introSources: [
      { label: "RTA — Minimum housing standards", href: "https://www.rta.qld.gov.au/during-a-tenancy/minimum-housing-standards" },
      {
        label: "Residential Tenancies and Rooming Accommodation Act 2008 (Qld)",
        href: "/documents/residential-tenancies-and-rooming-accommodation-act-2008.pdf",
      },
    ],
    blocks: [
      {
        heading: "What the standards cover",
        tags: ["always", "council"],
        bullets: [
          "Structural soundness and weatherproofing",
          "Locks, windows and resident security",
          "Plumbing, drainage and hot water",
          "Kitchens, bathrooms, toilets and laundry facilities",
          "Ventilation, lighting and privacy",
          "Mould, damp, pests and sanitation",
          "Waste-storage arrangements",
          "Maximum occupancy and bedroom capacity",
          "Safe furniture, fixtures and supplied appliances",
          "Ongoing inspection, repair and maintenance records",
        ],
      },
      {
        heading: "Where these requirements come from",
        tags: ["council"],
        paragraphs: [
          "These requirements can arise from tenancy law, QDC MP 5.7, building approvals, public-health legislation and council conditions.",
        ],
      },
    ],
  },
  {
    id: "insurance",
    title: "Insurance requirements",
    subtitle: "Public liability cover, typical limits and what it doesn't include.",
    badge: "Recommended",
    blocks: [
      {
        heading: "Public liability insurance",
        tags: ["recommended", "council"],
        paragraphs: [
          "Public liability insurance isn't legally mandated for boarding house / rooming accommodation operators in Australia, but it's considered essential — it protects against claims from residents or third parties who are injured, or whose property is damaged, due to negligence on the property. Most landlords and lenders also require proof of cover as a condition of tenancy or financing.",
        ],
        bullets: [
          "Slips and falls in shared bathrooms, kitchens or common areas",
          "Injury from faulty furniture, appliances or wiring in shared facilities",
          "Property damage caused to a resident's or visitor's belongings",
        ],
      },
      {
        heading: "How much cover",
        tags: ["recommended"],
        paragraphs: [
          "Most boarding houses carry between $5 million and $20 million in public liability cover, with the right level depending on the number of residents, property value and facilities available. It's worth reviewing cover annually as the property or occupancy changes.",
        ],
      },
      {
        heading: "What it doesn't cover",
        tags: ["recommended"],
        paragraphs: [
          "Public liability insurance doesn't cover injuries to employees — that's handled separately under Workers' Compensation insurance. If subcontractors are engaged on the property, check whether their own insurance is in place or extend cover to include their work.",
        ],
        sources: [
          {
            label: "InsureMyLiability — Boarding House Public Liability Insurance",
            href: "https://www.insuremyliability.com.au/compare/boarding-house",
          },
        ],
      },
    ],
  },
  {
    id: "tenancy",
    title: "Tenancy management",
    subtitle: "Applications, agreements, rent, bonds, entry and termination.",
    badge: "Every agreement",
    blocks: [
      {
        heading: "Obligations under the Residential Tenancies and Rooming Accommodation Act 2008",
        tags: ["always"],
        paragraphs: [
          "The Residential Tenancies and Rooming Accommodation Act 2008 creates a separate set of operational obligations, including:",
        ],
        bullets: [
          "Using the prescribed rental application process and Form R22",
          "Providing a written Rooming Accommodation Agreement, Form R18",
          "Issuing lawful house rules",
          "Bond lodgement and rent-payment requirements",
          "Rent increases and utility charges",
          "Condition reports",
          "Entry notices and resident privacy",
          "Repairs, maintenance and minimum housing standards",
          "Quiet enjoyment and security",
          "Lawful notices, dispute processes and termination",
        ],
      },
      {
        heading: "Standards apply for the life of the agreement",
        tags: ["always"],
        paragraphs: [
          "The property must meet minimum housing standards throughout the agreement, not just when the resident moves in.",
        ],
        sources: [
          { label: "RTA — Rooming accommodation", href: "https://www.rta.qld.gov.au/rooming-accommodation" },
          {
            label: "RTA — Minimum housing standards fact sheet (rooming accommodation)",
            href: "https://www.rta.qld.gov.au/forms-resources/factsheets/minimum-housing-standards-fact-sheet-rooming-accommodation",
          },
        ],
      },
    ],
  },
  {
    id: "resident-rights",
    title: "Resident rights and privacy",
    subtitle: "Fair treatment and sensible handling of applications and information.",
    badge: "Ongoing",
    intro:
      "These items are drawn from the Tenancy management section above and from residential-service accreditation obligations, grouped here because they concern resident rights specifically.",
    blocks: [
      {
        heading: "From tenancy law",
        tags: ["always"],
        bullets: ["Entry notices and resident privacy", "Quiet enjoyment and security", "Lawful notices, dispute processes and termination"],
      },
      {
        heading: "From residential-service accreditation (Level 1)",
        tags: ["threshold"],
        bullets: ["Privacy", "Resident agreements", "Abuse and neglect prevention", "Complaints handling", "Security"],
      },
    ],
  },
  {
    id: "operations",
    title: "Operations, staff and records",
    subtitle: "Licensed work, servicing, certificates and safe equipment.",
    badge: "Ongoing",
    blocks: [
      {
        heading: "Staffing and business management",
        tags: ["threshold"],
        paragraphs: ["Covered under Level 1 accreditation for registered residential services."],
      },
      {
        heading: "Electrical, gas and appliance safety",
        tags: ["always", "council"],
        bullets: [
          "Licensed electrical and gas work",
          "Safety-switch and installation maintenance",
          "Testing of supplied appliances where required by the operating context",
          "Gas appliance servicing and ventilation",
          "Managing damaged leads, power boards and resident appliances",
          "Certificates and maintenance records",
          "Solar, battery, lift or other plant maintenance where applicable",
        ],
        paragraphs: ["Businesses operating the accommodation can have duties under Queensland electrical-safety and work-health-and-safety laws."],
        sources: [{ label: "WorkSafe Queensland — Electrical safety laws", href: "https://www.worksafe.qld.gov.au/laws-and-compliance/electrical-safety-laws" }],
      },
      {
        heading: "Records to keep",
        tags: ["always"],
        paragraphs: [
          "Fire safety, accreditation, tenancy and electrical/gas records should be kept current and available for inspection — including inspection and maintenance records, evacuation drill records, condition reports and accreditation renewal documentation referenced throughout this page.",
        ],
      },
    ],
  },
  {
    id: "templates",
    title: "Templates, checklists and renewal calendar",
    subtitle: "A compliance register for forms, certificates and key dates.",
    badge: "Recommended",
    intro:
      "The documents and renewal dates below are referenced throughout this page. Keeping a simple register of each, with renewal dates, is good risk-management practice — speak to our team if you'd like help setting one up.",
    blocks: [
      {
        heading: "Forms and documents to track",
        tags: ["recommended"],
        bullets: [
          "Form R22 — rental application (see Tenancy management)",
          "Form R18 — Rooming Accommodation Agreement (see Tenancy management)",
          "Condition reports (see Tenancy management and Minimum housing standards)",
          "QDC MP 5.7 Building Compliance Notice — required for accreditation renewal (see Building and occupancy)",
          "Fire safety management plan and evacuation diagrams (see Fire & Electrical Safety)",
          "Evacuation drill and inspection/maintenance records (see Fire & Electrical Safety)",
          "Residential-service accreditation renewal, Levels 1–3 as applicable",
          "Electrical and gas safety certificates and maintenance records (see Operations, staff and records)",
        ],
      },
    ],
  },
];

const OVERVIEW_CARDS: OverviewCard[] = [
  {
    href: "#building-occupancy",
    icon: <ShieldCheck className="size-4.5" />,
    eyebrow: "Foundation only",
    title: "Class 1b compliance",
    description: "A building approval alone doesn't authorise the planning use or meet accreditation, tenancy and fire-safety obligations.",
    highlight: true,
    panel: {
      paragraph:
        "A Class 1b approval confirms the building itself — it doesn't confirm the planning use, accreditation, tenancy or fire-safety obligations are met.",
      checklist: [
        "Treat Class 1b approval as a starting point, not full compliance.",
        "Check occupancy thresholds — 5 rooms, and 6+ residents, change what applies.",
        "Confirm a current QDC MP 5.7 Building Compliance Notice is on file.",
      ],
      footer: "Ask which approvals and notices are current, and which are still outstanding.",
    },
  },
  {
    href: "#planning",
    icon: <Building2 className="size-4.5" />,
    eyebrow: "Before opening",
    title: "Planning & approvals",
    description: "Permitted use, building approval, occupancy limits and council conditions.",
    highlight: false,
    panel: {
      paragraph:
        "Your manager can operate the property, but the approved use and occupancy remain fundamental ownership risks.",
      checklist: [
        "Verify rooming accommodation is a permitted or approved use.",
        "Keep copies of development, building and plumbing approvals.",
        "Ensure advertised occupancy does not exceed approved limits.",
      ],
      footer: "Ask your property manager to report any council notice, complaint or proposed change of use immediately.",
    },
  },
  {
    href: "#fire-safety",
    icon: <Flame className="size-4.5" />,
    eyebrow: "Safety critical",
    title: "Fire & Electrical Safety",
    description: "Smoke alarms, evacuation plans, equipment servicing and drill records.",
    highlight: false,
    panel: {
      paragraph: "Fire safety obligations scale with the building and occupancy — a single smoke alarm check is rarely the full picture.",
      checklist: [
        "Confirm interconnected photoelectric alarms are installed and tested.",
        "Keep a current fire safety management plan and evacuation diagrams.",
        "Check whether six or more residents trigger the budget-accommodation regime.",
      ],
      footer: "Ask for evidence of the most recent evacuation drill and equipment inspection.",
    },
  },
  {
    href: "#housing-standards",
    icon: <Wrench className="size-4.5" />,
    eyebrow: "Ongoing",
    title: "Property standards",
    description: "Security, repairs, sanitation, mould, utilities and minimum housing standards.",
    highlight: false,
    panel: {
      paragraph: "Minimum housing standards apply for the life of the agreement, not just at move-in.",
      checklist: [
        "Check structural, plumbing and weatherproofing condition.",
        "Confirm bedroom capacity doesn't exceed maximum occupancy.",
        "Review the inspection and maintenance record for the property.",
      ],
      footer: "Ask when the property was last inspected against minimum housing standards.",
    },
  },
  {
    href: "#insurance",
    icon: <Umbrella className="size-4.5" />,
    eyebrow: "Not mandated, but…",
    title: "Insurance",
    description: "Public liability cover most landlords and lenders require, even though it isn't legally mandated.",
    highlight: false,
    panel: {
      paragraph:
        "Public liability insurance isn't legally required, but most landlords and lenders treat it as a condition of tenancy or financing — and it protects you against real, common claims.",
      checklist: [
        "Confirm public liability cover of at least $5–20 million is in place.",
        "Check what's excluded — employee injuries need separate Workers' Compensation cover.",
        "Review cover annually as resident numbers or facilities change.",
      ],
      footer: "Ask your broker whether your current cover reflects the property's actual occupancy and facilities.",
    },
  },
  {
    href: "#tenancy",
    icon: <FileEdit className="size-4.5" />,
    eyebrow: "Managed daily",
    title: "Tenancy management",
    description: "Agreements, bonds, house rules, entry, rent and lawful termination.",
    highlight: false,
    panel: {
      paragraph: "Every resident agreement runs on the Residential Tenancies and Rooming Accommodation Act 2008 — not a standard lease.",
      checklist: [
        "Confirm Form R22 applications and Form R18 agreements are used correctly.",
        "Check bond lodgement, rent and condition-report processes.",
        "Ensure notices and terminations follow the lawful process.",
      ],
      footer: "Ask your manager for a copy of the current house rules and a recent condition report.",
    },
  },
  {
    href: "#resident-rights",
    icon: <Scale className="size-4.5" />,
    eyebrow: "Shared duty",
    title: "Resident rights & privacy",
    description: "Fair treatment and sensible handling of applications and resident information.",
    highlight: false,
    panel: {
      paragraph:
        "Residents are entitled to privacy, quiet enjoyment and fair handling of their information — regardless of how informally the arrangement runs.",
      checklist: [
        "Confirm entry notices and privacy practices are followed.",
        "Check complaints and disputes are handled lawfully.",
        "Ensure resident agreements address abuse and neglect prevention.",
      ],
      footer: "Ask how resident complaints are currently logged and resolved.",
    },
  },
  {
    href: "#templates",
    icon: <ClipboardList className="size-4.5" />,
    eyebrow: "Evidence",
    title: "Records & renewals",
    description: "A clear compliance register for certificates, inspections and key dates.",
    highlight: false,
    panel: {
      paragraph: "Fire, tenancy, accreditation and electrical/gas records should be current and easy to produce on request.",
      checklist: [
        "Keep a register of key forms — R22, R18 and condition reports.",
        "Track accreditation and Building Compliance Notice renewal dates.",
        "Keep electrical and gas safety certificates up to date.",
      ],
      footer: "Ask your manager for the current compliance register and next renewal date.",
    },
  },
];

function SourceList({ sources }: { sources: SourceLink[] }) {
  return (
    <p className="mt-3 text-xs leading-relaxed text-brand-gray">
      Source{sources.length > 1 ? "s" : ""}:{" "}
      {sources.map((s, i) => (
        <span key={s.href}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">
            {s.label}
          </a>
          {i < sources.length - 1 ? " · " : ""}
        </span>
      ))}
    </p>
  );
}

export default function ComplianceCentrePage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative min-h-[600px]">
        <Image src="/images/compliance-centre-hero.png" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/55 to-brand-orange/10" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6 py-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Investor Resources
            </p>
            <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Compliance Made Clearer
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white">
              Rooming accommodation in Queensland sits at the intersection of several separate
              approval and compliance regimes — planning, building classification, residential-service
              accreditation, tenancy law, fire safety and public health. This page brings the key
              obligations together in one place, organised by topic.
            </p>
            <a
              href="#compliance-areas"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-orange/90"
            >
              Explore Compliance Areas
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section id="compliance-areas" className="scroll-mt-24 border-b border-brand-gray-light bg-brand-cream py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <ComplianceOverview cards={OVERVIEW_CARDS} />
        </div>
      </section>

      {/* Sections */}
      <div className="mx-auto flex max-w-[84rem] flex-col gap-3 px-6 py-14">
        {SECTIONS.map((section, i) => (
          <details
            key={section.id}
            id={section.id}
            className="group scroll-mt-24 overflow-hidden rounded-2xl border border-brand-navy bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 p-5 marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-gray-light text-sm font-bold text-brand-navy">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-bold capitalize text-brand-navy sm:text-lg">{section.title}</h2>
                <p className="mt-0.5 text-sm text-brand-gray">{section.subtitle}</p>
              </div>
              <span className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-wide text-brand-gray sm:inline-block">
                {section.badge}
              </span>
              <ChevronDown className="size-5 shrink-0 text-brand-gray transition-transform group-open:rotate-180" />
            </summary>

            <div className="border-t border-brand-gray-light px-5 pb-6 pt-5">
              {section.intro ? <p className="text-sm leading-relaxed text-brand-gray">{section.intro}</p> : null}
              {section.introSources ? <SourceList sources={section.introSources} /> : null}

              <div className={section.intro ? "mt-6 flex flex-col gap-8" : "flex flex-col gap-8"}>
                {section.blocks.map((block) => (
                  <div key={block.heading}>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold capitalize text-brand-navy">{block.heading}</h3>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {block.tags.map((t) => (
                        <Tag key={t} kind={t} />
                      ))}
                    </div>
                    {block.paragraphs?.map((p) => (
                      <p key={p} className="mt-3 leading-7 text-brand-gray">
                        {p}
                      </p>
                    ))}
                    {block.bullets ? (
                      <ul className="mt-3 flex flex-col gap-1.5">
                        {block.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 leading-7 text-brand-gray">
                            <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-brand-orange" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {block.sources ? <SourceList sources={block.sources} /> : null}
                  </div>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>

      {/* Disclaimer + CTA */}
      <section className="border-t border-brand-gray-light bg-brand-cream py-16">
        <div className="mx-auto grid max-w-4xl gap-10 px-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Confirm before relying on this
            </p>
            <h2 className="mt-3 font-serif text-2xl font-bold capitalize text-brand-navy sm:text-3xl">
              Every project is property-specific.
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-orange/90"
              >
                Speak to an Expert
              </Link>
              <Link
                href="/"
                className="rounded-md border border-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-orange/10"
              >
                Back to Home
              </Link>
            </div>
          </div>
          <p className="text-justify text-sm leading-7 text-brand-gray">
            This page is general information, current at the time of publication, and summarises
            publicly available Queensland government and Residential Tenancies Authority guidance
            linked throughout. It is not planning, legal, accounting or building-certification advice.
            Confirm current requirements for your specific property, resident numbers, services offered
            and local government area with your town planner, building certifier, quantity surveyor and
            solicitor before relying on them.
          </p>
        </div>
      </section>
    </div>
  );
}
