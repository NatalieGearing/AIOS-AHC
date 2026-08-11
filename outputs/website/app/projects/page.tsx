import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "A showcase of Affordable House Corp's completed and in-progress investment property projects.",
});

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
        Our Work
      </span>
      <h1 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
        Projects
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-brand-gray">
        We&apos;re building out a showcase of our completed and in-progress
        rooming accommodation, pre-fab and land subdivision projects. This
        page is coming soon.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/contact"
          className="rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-orange/90"
        >
          Speak to an Expert
        </Link>
        <Link
          href="/"
          className="rounded-md border border-brand-gray-light px-6 py-3 text-sm font-semibold text-brand-navy hover:border-brand-orange"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
