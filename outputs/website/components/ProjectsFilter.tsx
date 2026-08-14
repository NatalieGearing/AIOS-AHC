"use client";

import { useState } from "react";

const CATEGORIES = [
  "Rooming Accommodation",
  "Land Subdivisions",
  "Pre-Fab Houses",
  "Demolitions",
];

export default function ProjectsFilter() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveFilter(null)}
          aria-pressed={activeFilter === null}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
            activeFilter === null
              ? "border-brand-navy bg-brand-navy text-white"
              : "border-brand-gray-light bg-white text-brand-navy hover:border-brand-navy/40"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveFilter(category)}
            aria-pressed={activeFilter === category}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              activeFilter === category
                ? "border-brand-navy bg-brand-navy text-white"
                : "border-brand-gray-light bg-white text-brand-navy hover:border-brand-navy/40"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-dashed border-brand-gray-light bg-brand-cream/40 px-6 py-16 text-center">
        <p className="text-brand-gray">
          {activeFilter
            ? `${activeFilter} project profiles are coming soon — check back shortly.`
            : "We're building out a showcase of our completed and in-progress projects. This page is coming soon."}
        </p>
      </div>
    </div>
  );
}
