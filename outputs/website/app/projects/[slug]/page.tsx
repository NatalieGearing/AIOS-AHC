import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Bath, Bed, Building2, CheckCircle2, MapPin, Maximize2, Ruler } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PROJECT_LISTINGS } from "@/lib/project-listings";
import EnquiryForm from "@/components/EnquiryForm";

const STATUS_STYLES: Record<string, string> = {
  Available: "bg-green-100 text-green-700",
  "Under Offer": "bg-amber-100 text-amber-700",
  Sold: "bg-brand-gray-light text-brand-gray",
};

export function generateStaticParams() {
  return PROJECT_LISTINGS.map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = PROJECT_LISTINGS.find((l) => l.slug === slug);

  if (!listing) {
    return buildMetadata({
      title: "Listing not found",
      description: "This property listing could not be found.",
    });
  }

  return buildMetadata({
    title: listing.title,
    description: listing.description,
  });
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = PROJECT_LISTINGS.find((l) => l.slug === slug);

  if (!listing) {
    notFound();
  }

  return (
    <div>
      <div className="relative flex min-h-[420px] items-end overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/45 to-stone-950/10" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-navy">
              {listing.propertyType}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                STATUS_STYLES[listing.status] ?? "bg-white/20 text-white"
              }`}
            >
              {listing.status}
            </span>
          </div>
          <h1 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl">
            {listing.title}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-white/85">
            <MapPin className="size-4" aria-hidden="true" />
            {listing.suburb}
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1fr_360px] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-brand-gray-light bg-brand-cream p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-brand-gray">
                Asking Price
              </p>
              <p className="mt-1 font-serif text-3xl font-bold text-brand-navy">
                {listing.price}
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-brand-gray">
                  Beds
                </p>
                <p className="mt-1 flex items-center gap-1.5 font-serif text-xl font-bold text-brand-navy">
                  <Bed className="size-4 text-brand-orange" aria-hidden="true" />
                  {listing.beds}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-brand-gray">
                  Baths
                </p>
                <p className="mt-1 flex items-center gap-1.5 font-serif text-xl font-bold text-brand-navy">
                  <Bath className="size-4 text-brand-orange" aria-hidden="true" />
                  {listing.baths}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-brand-gray">
                  Floor Area
                </p>
                <p className="mt-1 flex items-center gap-1.5 font-serif text-xl font-bold text-brand-navy">
                  <Maximize2 className="size-4 text-brand-orange" aria-hidden="true" />
                  {listing.area} m²
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-serif text-2xl font-bold text-brand-navy">
              About the Investment
            </h2>
            <p className="mt-3 leading-relaxed text-brand-gray">
              {listing.description}
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-serif text-2xl font-bold text-brand-navy">
              Property Features
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {listing.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-lg bg-brand-cream px-4 py-3 text-sm font-medium text-brand-navy"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-brand-orange" aria-hidden="true" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 border-t border-brand-gray-light pt-8 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-cream text-brand-navy">
                <Building2 className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-serif font-bold text-brand-navy">Turnkey Delivery</p>
                <p className="mt-1 text-sm text-brand-gray">
                  Delivered fully finished and ready for tenants — built and
                  project-managed end-to-end by Affordable House Corp.
                </p>
              </div>
            </div>

            {listing.designSlug ? (
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-cream text-brand-navy">
                  <Ruler className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-serif font-bold text-brand-navy">Design</p>
                  <p className="mt-1 text-sm text-brand-gray">
                    Built on our{" "}
                    <Link
                      href={`/house-designs/${listing.designSlug}`}
                      className="font-semibold text-brand-orange hover:underline"
                    >
                      {listing.designLabel ?? "source"} floor plan
                    </Link>{" "}
                    — view full specifications.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-brand-gray-light bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-brand-navy">
              Register Interest
            </h2>
            <p className="mt-2 text-sm text-brand-gray">
              Enquire now to receive the full investment prospectus, floor
              plans and financial breakdown.
            </p>
            <div className="mt-5">
              <EnquiryForm />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
