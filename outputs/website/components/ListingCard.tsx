import Image from "next/image";
import type { Listing } from "@/lib/content";

const STATUS_STYLES: Record<string, string> = {
  Available: "bg-green-100 text-green-700",
  "Under Offer": "bg-amber-100 text-amber-700",
  Sold: "bg-brand-gray-light text-brand-gray",
};

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-gray-light bg-white shadow-sm">
      <div className="relative h-48">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-navy">
            {listing.propertyType}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${STATUS_STYLES[listing.status]}`}
          >
            {listing.status}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/80 to-transparent p-3 pt-8">
          <h3 className="font-serif text-base font-bold leading-tight text-white">
            {listing.title}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-white/80">
            <svg aria-hidden viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18s6-5.686 6-10A6 6 0 0 0 4 8c0 4.314 6 10 6 10Zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>
            {listing.location}
          </p>
        </div>
      </div>

      <div className="bg-brand-cream p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-brand-gray">
              Guide Price
            </p>
            <p className="font-serif text-lg font-bold text-brand-navy">
              {listing.guidePrice}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wide text-brand-gray">
              Est. Yield
            </p>
            <p className="flex items-center gap-1 font-serif text-lg font-bold text-brand-orange">
              {listing.estYield}
              <svg aria-hidden viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M12 7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V9.414l-4.293 4.293a1 1 0 0 1-1.414 0L8 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414l5-5a1 1 0 0 1 1.414 0L10 11.586 13.586 8H12a1 1 0 0 1-1-1Z" />
              </svg>
            </p>
          </div>
        </div>

        <div className="mt-3 flex gap-4 border-t border-brand-gray/20 pt-3 text-xs font-medium text-brand-gray">
          <span className="flex items-center gap-1.5">
            <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
              <path d="M2 11a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3h-1v-1H3v1H2v-3Zm2-1a1 1 0 0 0-1 1v1h2v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2h2a2 2 0 0 1 2-2v-1a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v1Zm2 0a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1Z" />
            </svg>
            {listing.beds} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
              <path d="M3 10V4a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2 1 1 0 1 0 2 0V3a1 1 0 1 1 2 0v7h6a1 1 0 1 1 0 2h-1v1a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-1H2a1 1 0 1 1 0-2h1Z" />
            </svg>
            {listing.baths} Baths
          </span>
        </div>
      </div>
    </div>
  );
}
