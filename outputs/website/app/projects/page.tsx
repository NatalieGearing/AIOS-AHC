import Image from "next/image";
import Link from "next/link";
import { Bath, Bed, Maximize2, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import ProjectsFilter from "@/components/ProjectsFilter";
import { DESIGN_LIBRARY } from "@/lib/design-library";
import { PROJECT_LISTINGS } from "@/lib/project-listings";

const FEATURED_IDS = [1, 2, 15];
const FEATURED_DESIGNS = FEATURED_IDS.map((id) =>
  DESIGN_LIBRARY.find((d) => d.id === id)
).filter((d): d is NonNullable<typeof d> => Boolean(d));

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "A showcase of Affordable House Corp's completed and in-progress investment property projects.",
});

export default function ProjectsPage() {
  return (
    <div>
      <div className="relative flex min-h-[600px] items-center overflow-hidden">
        <Image
          src="/images/colour-studio/grand210-coastal.png"
          alt="Completed Affordable House Corp rooming accommodation project"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/55 to-brand-orange/10" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center text-white">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            Our Work
          </span>
          <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
            Projects
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-white/85">
            We&apos;re building out a showcase of our completed and in-progress
            rooming accommodation, pre-fab and land subdivision projects. This
            page is coming soon.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pt-14 text-center">
        <ProjectsFilter />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_DESIGNS.map((design) => {
            const listing = PROJECT_LISTINGS.find(
              (l) => l.designSlug === design.slug
            );

            const card = (
              <>
                <div className="relative h-52 overflow-hidden bg-[#ece6e1]">
                  <Image
                    src={design.image}
                    alt={`${listing?.title ?? design.title} — exterior`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[#111c49] text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded">
                    {design.stories === "single" ? "Single Storey" : "Two Storey"}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#ab8742] mb-1.5">
                    {design.type.replace(/-/g, " ")}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-[#111c49] leading-snug mb-4">
                    {listing?.title ?? design.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-[#64656c] border-t border-[#111c49]/10 pt-4 tabular-nums">
                    <span className="flex shrink-0 items-center gap-1 whitespace-nowrap">
                      <Bed className="h-4 w-4 text-[#ab8742] shrink-0" aria-hidden="true" />
                      {design.beds} rooms
                    </span>
                    {design.baths ? (
                      <span className="flex shrink-0 items-center gap-1 whitespace-nowrap">
                        <Bath className="h-4 w-4 text-[#ab8742] shrink-0" aria-hidden="true" />
                        {design.baths}
                      </span>
                    ) : null}
                    <span className="flex shrink-0 items-center gap-1 whitespace-nowrap">
                      <Maximize2 className="h-4 w-4 text-[#ab8742] shrink-0" aria-hidden="true" />
                      {design.area} m²
                    </span>
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="border-t border-[#111c49]/10 pt-4">
                      {design.slug ? (
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111c49] group-hover:text-[#ab8742] transition-colors">
                          View design
                          <ArrowRight
                            className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : listing ? (
                        <span className="text-sm font-bold text-[#111c49]">
                          {listing.price}
                        </span>
                      ) : (
                        <span className="text-sm text-[#64656c]">Plans available on request</span>
                      )}
                    </div>
                  </div>
                </div>
              </>
            );

            const shell =
              "group flex flex-col rounded-xl border border-[#111c49]/10 bg-white overflow-hidden transition-all duration-300 hover:shadow-[0_12px_32px_-12px_rgba(17,28,73,0.28)] hover:border-[#ab8742]/40 motion-safe:hover:-translate-y-1";

            const href = listing
              ? null
              : design.slug
                ? `/house-designs/${design.slug}`
                : null;

            return href ? (
              <Link
                key={design.id}
                href={href}
                className={`${shell} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ab8742] focus-visible:ring-offset-2`}
              >
                {card}
              </Link>
            ) : (
              <div key={design.id} className={shell}>
                {card}
              </div>
            );
          })}
        </div>
      </div>

      <section className="border border-brand-gray-light bg-brand-gray-light py-10 text-center sm:py-12">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-serif text-2xl font-bold text-brand-navy sm:text-3xl">
            Start Your Project
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-gray">
            Ready to build a high-yield investor dwelling? Talk to our team
            about your site and goals.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-brand-navy px-6 py-3 text-xs font-bold uppercase tracking-wide text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
            >
              Speak to an Expert
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
