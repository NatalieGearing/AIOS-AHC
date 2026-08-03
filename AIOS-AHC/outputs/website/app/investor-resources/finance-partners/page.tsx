import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Finance Partners",
  description:
    "Trusted finance and lending partners for Affordable House Corp investors.",
});

export default function FinancePartnersPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
        Investor Resources
      </span>
      <h1 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
        Our Finance Partners
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-brand-gray">
        We&apos;re finalising our panel of trusted finance and lending
        partners to help investors structure their next build. This page is
        coming soon.
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
