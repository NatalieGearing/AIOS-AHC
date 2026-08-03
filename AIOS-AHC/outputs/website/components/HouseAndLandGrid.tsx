"use client";

import { useMemo, useState } from "react";
import { LISTINGS } from "@/lib/content";
import ListingCard from "@/components/ListingCard";

export default function HouseAndLandGrid() {
  const [propertyType, setPropertyType] = useState("All Property Types");
  const [status, setStatus] = useState("All Statuses");

  const propertyTypes = useMemo(
    () => ["All Property Types", ...Array.from(new Set(LISTINGS.map((l) => l.propertyType)))],
    []
  );
  const statuses = useMemo(
    () => ["All Statuses", ...Array.from(new Set(LISTINGS.map((l) => l.status)))],
    []
  );

  const filtered = LISTINGS.filter(
    (listing) =>
      (propertyType === "All Property Types" || listing.propertyType === propertyType) &&
      (status === "All Statuses" || listing.status === status)
  );

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-xl border border-brand-gray-light bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-brand-navy">
          <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
            <path d="M2.5 4A1.5 1.5 0 0 1 4 2.5h12A1.5 1.5 0 0 1 17.5 4v1.086a1.5 1.5 0 0 1-.44 1.06l-5.06 5.061v4.293a1.5 1.5 0 0 1-.671 1.249l-2 1.333A1.5 1.5 0 0 1 7 16.667V11.207L1.94 6.146A1.5 1.5 0 0 1 1.5 5.086V4Z" />
          </svg>
          Filter House &amp; Land
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="rounded-md border border-brand-gray-light px-3 py-2 text-sm font-medium text-brand-navy focus:border-brand-orange focus:outline-none"
          >
            {propertyTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-md border border-brand-gray-light px-3 py-2 text-sm font-medium text-brand-navy focus:border-brand-orange focus:outline-none"
          >
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 text-center text-brand-gray">
          No current listings match those filters — check back soon or{" "}
          <a href="/contact" className="font-semibold text-brand-orange hover:underline">
            get in touch
          </a>{" "}
          about upcoming opportunities.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
