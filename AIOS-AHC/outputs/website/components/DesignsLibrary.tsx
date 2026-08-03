"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize2, Search, X, ArrowRight, SlidersHorizontal, LandPlot } from "lucide-react";
import {
  DESIGN_LIBRARY,
  PROPERTY_TYPE_OPTIONS,
  STORY_OPTIONS,
  ROOM_OPTIONS,
  SORT_OPTIONS,
  minPlotSize,
} from "@/lib/design-library";

export default function DesignsLibrary() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [storyFilter, setStoryFilter] = useState("");
  const [roomFilter, setRoomFilter] = useState("");
  const [sort, setSort] = useState("rooms-desc");

  const stats = useMemo(() => {
    const areas = DESIGN_LIBRARY.map((d) => d.area);
    const beds = DESIGN_LIBRARY.map((d) => d.beds);
    return {
      count: DESIGN_LIBRARY.length,
      types: new Set(DESIGN_LIBRARY.map((d) => d.type)).size,
      areaMin: Math.min(...areas),
      areaMax: Math.max(...areas),
      bedMin: Math.min(...beds),
      bedMax: Math.max(...beds),
    };
  }, []);

  const filtered = useMemo(() => {
    const room = ROOM_OPTIONS.find((r) => r.value === roomFilter) ?? ROOM_OPTIONS[0];
    const q = query.trim().toLowerCase();

    const list = DESIGN_LIBRARY.filter((d) => {
      if (typeFilter && d.type !== typeFilter) return false;
      if (storyFilter && d.stories !== storyFilter) return false;
      if (d.beds < room.min || d.beds > room.max) return false;
      if (q && !d.title.toLowerCase().includes(q) && !d.type.includes(q)) return false;
      return true;
    });

    const sorted = [...list];
    switch (sort) {
      case "plot-asc":
        sorted.sort((a, b) => minPlotSize(a) - minPlotSize(b));
        break;
      case "area-desc":
        sorted.sort((a, b) => b.area - a.area);
        break;
      case "area-asc":
        sorted.sort((a, b) => a.area - b.area);
        break;
      case "az":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        sorted.sort((a, b) => b.beds - a.beds);
    }
    return sorted;
  }, [query, typeFilter, storyFilter, roomFilter, sort]);

  const activeFilters = [
    query && { label: `"${query}"`, clear: () => setQuery("") },
    typeFilter && {
      label: PROPERTY_TYPE_OPTIONS.find((o) => o.value === typeFilter)?.label ?? "",
      clear: () => setTypeFilter(""),
    },
    storyFilter && {
      label: STORY_OPTIONS.find((o) => o.value === storyFilter)?.label ?? "",
      clear: () => setStoryFilter(""),
    },
    roomFilter && {
      label: ROOM_OPTIONS.find((o) => o.value === roomFilter)?.label ?? "",
      clear: () => setRoomFilter(""),
    },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  const clearAll = () => {
    setQuery("");
    setTypeFilter("");
    setStoryFilter("");
    setRoomFilter("");
  };

  const selectClass =
    "h-11 w-full pl-3 pr-8 rounded-md border border-[#111c49]/15 bg-white text-sm text-[#111c49] " +
    "focus:outline-none focus:ring-2 focus:ring-[#ab8742]/40 focus:border-[#ab8742] transition-colors";

  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative py-24 md:py-32 bg-[#111c49] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/designs-hero.png"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111c49] via-[#111c49]/85 to-[#111c49]/40" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] uppercase text-[#c9a35f] mb-5">
              <span className="h-px w-8 bg-[#c9a35f]" aria-hidden="true" />
              House design library
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1.08]">
              Designed for Lifestyle.
              <br />
              Built for <span className="text-[#ab8742]">Returns</span>.
            </h1>
            <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
              Filter by property type, footprint and room count to find the design that fits your site.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/15 border border-white/15 rounded-lg overflow-hidden max-w-3xl">
            {[
              { k: "Designs", v: String(stats.count) },
              { k: "Property types", v: String(stats.types) },
              { k: "Footprint", v: `${stats.areaMin}–${stats.areaMax} m²` },
              { k: "Rooms", v: `${stats.bedMin}–${stats.bedMax}` },
            ].map((s) => (
              <div key={s.k} className="bg-[#111c49] px-5 py-4">
                <dt className="text-[10px] font-semibold tracking-[0.16em] uppercase text-white/50">
                  {s.k}
                </dt>
                <dd className="mt-1 text-2xl font-serif font-bold text-white tabular-nums">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------ Filter rail */}
      <div className="sticky top-0 z-30 bg-[#ece6e1]/95 backdrop-blur border-b border-[#111c49]/10">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64656c] pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search designs"
                aria-label="Search designs by name"
                className="h-11 w-full pl-9 pr-3 rounded-md border border-[#111c49]/15 bg-white text-sm text-[#111c49] placeholder:text-[#64656c] focus:outline-none focus:ring-2 focus:ring-[#ab8742]/40 focus:border-[#ab8742] transition-colors"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              aria-label="Filter by property type"
              className={selectClass}
            >
              {PROPERTY_TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <select
              value={storyFilter}
              onChange={(e) => setStoryFilter(e.target.value)}
              aria-label="Filter by number of storeys"
              className={selectClass}
            >
              {STORY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <select
              value={roomFilter}
              onChange={(e) => setRoomFilter(e.target.value)}
              aria-label="Filter by room count"
              className={selectClass}
            >
              {ROOM_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort designs"
              className={selectClass}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  Sort: {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 text-[#64656c]">
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              <span aria-live="polite" className="tabular-nums">
                Showing <strong className="text-[#111c49] font-semibold">{filtered.length}</strong> of{" "}
                {DESIGN_LIBRARY.length} designs
              </span>
            </span>

            {activeFilters.map((f) => (
              <button
                key={f.label}
                onClick={f.clear}
                className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#111c49]/15 pl-3 pr-2 py-1 text-xs font-medium text-[#111c49] hover:border-[#ab8742] hover:text-[#ab8742] focus:outline-none focus:ring-2 focus:ring-[#ab8742]/40 transition-colors"
              >
                {f.label}
                <X className="h-3 w-3" aria-hidden="true" />
                <span className="sr-only">Remove filter</span>
              </button>
            ))}

            {activeFilters.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs font-semibold text-[#ab8742] hover:underline focus:outline-none focus:ring-2 focus:ring-[#ab8742]/40 rounded px-1"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ Grid */}
      <div className="bg-[#f7f5f3]">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filtered.map((design) => {
                const plot = minPlotSize(design);

                const card = (
                  <>
                    <div className="relative h-52 overflow-hidden bg-[#ece6e1]">
                      <Image
                        src={design.image}
                        alt={`${design.title} — exterior`}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
                        {design.title}
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
                        <span className="flex shrink-0 items-center gap-1 whitespace-nowrap">
                          <LandPlot className="h-4 w-4 text-[#ab8742] shrink-0" aria-hidden="true" />
                          {plot.toLocaleString()} m² plot
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

                return design.slug ? (
                  <Link
                    key={design.id}
                    href={`/house-designs/${design.slug}`}
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
          ) : (
            <div className="text-center py-24 bg-white rounded-xl border border-dashed border-[#111c49]/20">
              <Search className="h-10 w-10 text-[#64656c] mx-auto mb-4 opacity-40" aria-hidden="true" />
              <h3 className="text-xl font-serif font-bold text-[#111c49] mb-2">
                No designs match these filters
              </h3>
              <p className="text-[#64656c] max-w-md mx-auto">
                Widen the room count, or clear the property type to see the full library.
              </p>
              <button
                onClick={clearAll}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ab8742] hover:underline focus:outline-none focus:ring-2 focus:ring-[#ab8742]/40 rounded px-1"
              >
                Clear all filters
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- CTA */}
      <section className="bg-[#111c49] text-white">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] uppercase text-[#c9a35f] mb-5">
              <span className="h-px w-8 bg-[#c9a35f]" aria-hidden="true" />
              Custom plans
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">
              Nothing here fits the block?
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl">
              Send us the address and the lot dimensions. We&rsquo;ll come back with a compliant design for
              that site and what it costs to build.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#ab8742] hover:bg-[#c9a35f] text-[#111c49] font-bold text-sm tracking-wide px-7 py-4 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a35f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111c49]"
            >
              Request a site assessment
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
