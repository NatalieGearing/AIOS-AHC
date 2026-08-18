import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, User } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Team",
  description:
    "Meet the team behind Affordable House Corp — 30 years building turnkey investment properties across South East Queensland.",
});

const TEAM_STATS = [
  { value: "3", label: "Senior Leaders" },
  { value: "3", label: "On-Site Supervisors" },
  { value: "50", label: "Construction Professionals" },
  { value: "1", label: "Collective Goal" },
];

const TEAM_MEMBERS = [
  { name: "Brennan Brook", title: "Director" },
  { name: "Troy Knight", title: "Construction Manager" },
  { name: "Jonathan Gearing", title: "Project Manager" },
  { name: "Richie Bennett", title: "Site Supervisor" },
  { name: "Josh Brown", title: "Site Supervisor" },
  { name: "Darren Caffery", title: "Site Supervisor" },
];

export default function OurTeamPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative min-h-[600px] flex items-center overflow-hidden">
        <Image
          src="/images/our-team-hero.png"
          alt="Affordable House Corp team members reviewing building plans on site"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/55 to-brand-orange/10" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            About Us
          </span>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our Team
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">
            Affordable House Corp is backed by a team of 50, built over 30
            years as the market leader in rooming accommodation
            construction.
          </p>
          <a
            href="#meet-the-team"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-orange/90"
          >
            Meet the Team
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Stats strip */}
      <section className="bg-brand-cream lg:h-[138px]">
        <div className="grid lg:h-full lg:grid-cols-[minmax(325px,40%)_1fr]">
          <div className="relative flex items-center justify-center bg-brand-navy px-8 py-5 text-left lg:py-0 lg:[clip-path:polygon(0_0,100%_0,78%_100%,0_100%)]">
            <Image
              src="/images/quote-graphic-team.png"
              alt="We build relationships as carefully as we build homes."
              width={760}
              height={138}
              className="h-[103.5px] w-auto max-w-full"
            />
          </div>

          <div className="flex items-center justify-end px-6 py-5 lg:py-0 lg:pl-12 lg:pr-[calc((100vw-1152px)/2+24px)]">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {TEAM_STATS.map((stat, idx) => (
                <div key={stat.label} className="relative flex flex-col items-center justify-center text-center sm:px-4">
                  {idx > 0 && (
                    <span
                      aria-hidden
                      className="absolute -left-4 top-1/2 hidden h-1/2 w-px -translate-y-1/2 bg-brand-gray/20 sm:block"
                    />
                  )}
                  <p className="font-sans text-[24px] font-normal text-brand-orange sm:text-[29px]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-brand-gray">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="meet-the-team" className="scroll-mt-24 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-6 text-left lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                The People Behind AHC
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-[#111c49] sm:text-4xl">
                Experienced People.
                <br />
                <span className="italic text-[#ab8742]">Specialist Expertise.</span>
              </h2>
            </div>
            <p className="max-w-md text-brand-gray">
              Our team brings together the disciplines needed to turn a
              property opportunity into a considered, buildable and
              operational home.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="overflow-hidden rounded-xl border border-brand-gray-light bg-white"
              >
                <div className="flex aspect-square items-center justify-center bg-brand-cream">
                  <User className="size-14 text-brand-gray/40" aria-hidden="true" />
                </div>
                <div className="h-1 bg-brand-gold-dark" />
                <div className="border-t border-brand-gray-light px-4 py-3 text-left">
                  <p className="font-serif text-[24px] font-bold text-brand-navy">
                    {member.name}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#66757c]">
                    {member.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="grid bg-[#ece6e1] lg:h-[500px] lg:grid-cols-2">
        <div className="relative h-64 lg:h-full">
          <Image
            src="/images/our-team-collaboration.png"
            alt="The Affordable House Corp team reviewing plans and material samples together"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            How We Work
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
            Closer Collaboration.
            <br />
            <span className="italic text-[var(--color-brand-orange)]">Better Outcomes.</span>
          </h2>
          <p className="mt-4 max-w-lg text-brand-gray">
            When development, design and construction work as separate
            functions, small issues become expensive ones. Our integrated
            team tests ideas together, resolves constraints earlier and
            keeps the original purpose of each project in view.
          </p>
          <Link
            href="/projects"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:underline"
          >
            View our projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="border border-brand-gray-light bg-brand-gray-light py-10 text-center sm:py-12">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-serif text-2xl font-bold text-[var(--color-brand-navy)] sm:text-3xl">
            Want to talk to someone directly?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-gray">
            Talk with our Brisbane team about a site, a ready-built property
            or the right next step for your project.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-brand-navy px-6 py-3 text-xs font-bold uppercase tracking-wide text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
            >
              Speak to Our Team
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L12.586 11H4a1 1 0 1 1 0-2h8.586l-2.293-2.293a1 1 0 0 1 0-1.414Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
