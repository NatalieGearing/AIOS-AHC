import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize2, MapPin } from "lucide-react";
import type { Listing } from "@/lib/content";
import { PROJECT_LISTINGS } from "@/lib/project-listings";

export default function ListingCard({ listing }: { listing: Listing }) {
  const hasProjectPage = PROJECT_LISTINGS.some((p) => p.slug === listing.slug);
  const shell =
    "group flex flex-col overflow-hidden rounded-xl border border-brand-navy/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-[0_12px_32px_-12px_rgba(17,28,73,0.28)]";

  const content = (
    <>
      <div className="relative h-52 overflow-hidden bg-brand-cream">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-orange">
          {listing.propertyType}
        </p>
        <h3 className="mb-1 font-serif text-lg font-bold leading-snug text-brand-navy">
          {listing.title}
        </h3>
        <p className="mb-4 flex items-center gap-1 text-xs text-brand-gray">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-orange" aria-hidden="true" />
          {listing.location}
        </p>

        <div className="flex items-center justify-center gap-4 border-t border-brand-navy/10 pt-4 text-sm tabular-nums text-brand-gray">
          <span className="flex shrink-0 items-center gap-1 whitespace-nowrap">
            <Bed className="h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />
            {listing.beds} rooms
          </span>
          <span className="flex shrink-0 items-center gap-1 whitespace-nowrap">
            <Bath className="h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />
            {listing.baths}
          </span>
          {typeof listing.area === "number" && (
            <span className="flex shrink-0 items-center gap-1 whitespace-nowrap">
              <Maximize2 className="h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />
              {listing.area} m²
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-brand-navy/10 pt-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-brand-gray">
              Fixed Price
            </p>
            <span className="text-sm font-bold text-brand-navy">{listing.guidePrice}</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wide text-brand-gray">
              Est. Yield
            </p>
            <span className="text-sm font-bold text-brand-orange">{listing.estYield}</span>
          </div>
        </div>
      </div>
    </>
  );

  if (hasProjectPage) {
    return (
      <Link href={`/projects/${listing.slug}`} className={shell}>
        {content}
      </Link>
    );
  }

  return <div className={shell}>{content}</div>;
}
