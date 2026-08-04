"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize2, ArrowLeft, ArrowRight, Check, X, Download, Play, ZoomIn, Calculator, Phone, Mail } from "lucide-react";
import { DESIGN_LIBRARY } from "@/lib/design-library";
import { CONTACT } from "@/lib/content";

const whyAhc = [
  {
    title: "Turnkey Delivery",
    desc: "From land acquisition and approvals to construction and tenant readiness, we handle the entire development lifecycle.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
    ),
  },
  {
    title: "Yield-Optimised Design",
    desc: "Every square metre is meticulously planned to maximise rental income without compromising tenant experience.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.94" />
    ),
  },
  {
    title: "Quality Construction",
    desc: "Built with trusted brands, materials and strict quality control. Durable finishes that withstand tenant turnover while maintaining high-end aesthetic appeal.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.026.021M5.109 6.09 9.75 10.73" />
    ),
  },
];

const otherFiveRoomDesigns = DESIGN_LIBRARY.filter(
  (d) => d.beds === 5 && d.type === "rooming-accommodation" && d.slug !== "grand-210"
);

const gallery = [
  { src: "/images/ellen/exterior.png", alt: "Grand 210 Design single-storey Hamptons-style front exterior", label: "Exterior" },
  { src: "/images/ellen/living.png", alt: "Hamptons-style open-plan living room", label: "Living Room" },
  { src: "/images/ellen/kitchen.png", alt: "Hamptons-style kitchen with stone island bench", label: "Kitchen" },
  { src: "/images/ellen/bedroom.png", alt: "Hamptons-style bedroom", label: "Bedroom" },
  { src: "/images/ellen/bathroom.png", alt: "Hamptons-style ensuite bathroom", label: "Bathroom" },
  { src: "/images/ellen/alfresco.png", alt: "Hamptons-style covered alfresco entertaining area", label: "Alfresco" },
];

const inclusions = [
  "5 generous, self-contained rooming bedrooms with built-in robes and split-system air-conditioning, each providing a single-level, open-plan living and dining area with high ceilings and abundant natural light",
  "Thoughtfully equipped kitchens with polytec laminated benches, overhead cupboards, ceramic tiled splashbacks & Omega Cooktop, Rangehood and Oven",
  "Individual fully tiled bathrooms with vanity units including mirrors, ceramic basins & toilet suites, chrome tapware and satin chrome shower screens",
  "Private outdoor patio areas for each tenant to enjoy their own outdoor space",
  "Energy-efficient LED lighting, solar panels and ceiling insulation throughout",
  "Premium floor coverings, vertical blinds, ceiling fans and security screens",
];

const designDetails = [
  { label: "Rooms", value: "5" },
  { label: "Bathrooms", value: "5" },
  { label: "Internal Area", value: "181.5 m²" },
  { label: "Patios/Alfresco Area", value: "28.5 m²" },
  { label: "Total Area", value: "210 m²" },
  { label: "Block Size Required", value: "400 m²" },
];

/* Hamptons exterior palette shown on this design's actual render. */
const hamptonsSwatches = ["#bdbebc", "#FFFFFF", "#495667", "#e3e7e2"];

const floorPlanImage = "/images/ellen/floorplan.png";
const floorPlanDownloadHref = "/images/ellen/floorplan-full.png";
const brochureHref = "/brochures/ellen-design-brochure.pdf";
const walkthroughSrc = "/videos/ellen-walkthrough.mp4";

export default function GrandTwoTenDetail() {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [floorPlanLightboxOpen, setFloorPlanLightboxOpen] = useState(false);
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);

  const anyModalOpen = lightboxOpen || floorPlanLightboxOpen || walkthroughOpen;

  useEffect(() => {
    if (!anyModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
        setFloorPlanLightboxOpen(false);
        setWalkthroughOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [anyModalOpen]);

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <Link
          href="/house-designs"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-gray hover:text-[#ab8742] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to House Designs
        </Link>

        <div className="mb-8">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#ab8742] mb-3 block">
            Home Design
          </span>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="inline-block">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-4 whitespace-nowrap">
                Grand 210 Design
              </h1>
              <div className="flex justify-between text-brand-navy">
                <span className="flex items-center gap-2 text-lg">
                  <Bed className="h-5 w-5 text-[#ab8742] shrink-0" aria-hidden="true" />
                  5 Rooms
                </span>
                <span className="flex items-center gap-2 text-lg">
                  <Bath className="h-5 w-5 text-[#ab8742] shrink-0" aria-hidden="true" />
                  5 Baths
                </span>
                <span className="flex items-center gap-2 text-lg">
                  <Maximize2 className="h-5 w-5 text-[#ab8742] shrink-0" aria-hidden="true" />
                  210 m²
                </span>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-[#ab8742] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#c9a35f]"
            >
              Enquire about the Grand 210 Design
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Main image + thumbnails */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mb-12">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="relative h-[300px] md:h-[480px] rounded-xl overflow-hidden bg-brand-cream group"
          >
            <Image
              src={gallery[activeImage].src}
              alt={gallery[activeImage].alt}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
            <span className="absolute bottom-4 right-4 bg-white/80 backdrop-blur text-brand-navy text-xs font-medium px-3 py-1.5 rounded-full">
              Click to enlarge
            </span>
          </button>
          <div>
            <div className="grid grid-cols-3 lg:grid-cols-2 gap-3">
            {gallery.map((img, i) => (
              <button
                type="button"
                key={img.src}
                onClick={() => setActiveImage(i)}
                aria-label={`Show ${img.label}`}
                className={`relative h-24 md:h-[152px] rounded-lg overflow-hidden bg-brand-cream transition-all ${
                  activeImage === i
                    ? "ring-2 ring-[#ab8742] ring-offset-2"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 15vw, 33vw"
                  className="object-cover"
                />
              </button>
            ))}
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------- Floor plan */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mb-16">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#ab8742] mb-6 block">
              Floor Plan
            </span>
            <button
              type="button"
              onClick={() => setFloorPlanLightboxOpen(true)}
              className="relative block h-[420px] w-full rounded-xl border border-brand-gray-light bg-white p-4"
            >
              <Image
                src={floorPlanImage}
                alt="Grand 210 Design floor plan"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-contain p-4"
              />
              <span className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-[#ab8742] text-white flex items-center justify-center shadow-md hover:bg-[#c9a35f] transition-colors">
                <ZoomIn className="h-5 w-5" aria-hidden="true" />
              </span>
            </button>
          </div>

          <div className="self-start">
            <span className="invisible text-xs font-bold tracking-[0.2em] uppercase mb-6 block" aria-hidden="true">
              Floor Plan
            </span>
            <div className="h-[420px] rounded-xl border border-brand-gray-light bg-white p-4 shadow-sm flex flex-col">
            <h3 className="font-serif text-xl font-bold text-brand-navy mb-2">Plans &amp; Walkthrough</h3>
            <p className="text-sm text-brand-gray mb-2">
              Explore the full floor plan and take an immersive 3D tour of the Grand 210 Design.
            </p>
            <dl className="space-y-1.5">
              {designDetails.map((d) => (
                <div key={d.label} className="flex items-center justify-between text-sm border-b border-brand-gray-light/70 pb-1.5">
                  <dt className="text-brand-gray">{d.label}</dt>
                  <dd className="font-bold text-brand-navy tabular-nums">{d.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto grid grid-cols-2 gap-1.5 pt-2">
              <a
                href={floorPlanDownloadHref}
                download="grand-210-floor-plan.png"
                className="flex items-center justify-center gap-1.5 w-full h-9 rounded-md bg-[#ab8742] text-white text-xs font-medium hover:bg-[#c9a35f] transition-colors"
              >
                <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Download Floor Plan
              </a>
              <a
                href={brochureHref}
                download="grand-210-brochure.pdf"
                className="flex items-center justify-center gap-1.5 w-full h-9 rounded-md border border-blue-600 bg-white text-brand-navy text-xs font-medium hover:bg-brand-cream transition-colors"
              >
                <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Download Brochure
              </a>
              <button
                type="button"
                onClick={() => setWalkthroughOpen(true)}
                className="flex items-center justify-center gap-1.5 w-full h-9 rounded-md bg-brand-navy text-white text-xs font-medium hover:bg-brand-navy/90 transition-colors"
              >
                <Play className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                3D Walkthrough
              </button>
              <Link
                href="/calculator"
                className="flex items-center justify-center gap-1.5 w-full h-9 rounded-md border border-[#ab8742] bg-white text-[#ab8742] text-xs font-medium hover:bg-brand-cream transition-colors"
              >
                <Calculator className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Build an Online Quote
              </Link>
            </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">About This Design</h2>
              <p className="text-brand-gray leading-relaxed text-lg text-justify">
                The Grand 210 Design is a stunning single-storey, modern Hamptons-style rooming
                accommodation home crafted for the savvy Queensland investor. Across a generous
                210 m², five spacious bedrooms — each a self-contained, lettable room — and five
                elegant bathrooms are arranged around a light-filled, open-plan living core that
                flows seamlessly to a covered alfresco. White weatherboard cladding, classic
                gabled rooflines and a welcoming front verandah give the home timeless
                coastal-Hamptons street appeal, while the easy single-level layout keeps living
                and maintenance simple for residents. A designer kitchen with a stone waterfall
                island anchors the home, and premium inclusions, energy-efficient features and a
                high-yield rooming configuration make it as comfortable to live in as it is
                rewarding to own. Purpose-built for tenant appeal and long-term performance, the
                Grand 210 Design balances refined Hamptons style with everyday practicality.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-brand-navy mb-4">Home Inclusions</h2>
              <ul className="space-y-3">
                {inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-brand-navy">
                    <span className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-[#ab8742]/10 text-[#ab8742] flex items-center justify-center">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-brand-gray leading-relaxed text-justify">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* --------------------------------------------- Customise CTA */}
        <section className="relative mt-16 w-full overflow-hidden rounded-xl">
          <Image
            src="/images/ellen/customise-section.png"
            alt="Customise the Grand 210 Design"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="relative px-6 py-10 md:px-10 md:py-12 lg:px-12">
            <div className="max-w-sm md:max-w-xl">
              <h2 className="font-serif text-[24px] font-bold whitespace-nowrap text-white md:text-[32px]">
                Customise the Grand 210 <span className="text-[#ab8742]">Design</span>
              </h2>
              <p className="mt-2 text-[13px] text-white/75 md:mt-3 md:text-[14px]">
                Explore our curated colour palettes or jump into the build
                calculator to price your own version of this design. Choose
                from six curated exterior and interior palettes — from
                classic Hamptons whites to our bold Modern charcoal — to
                make the Grand 210 Design your own.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="flex -space-x-2">
                  {hamptonsSwatches.map((hex) => (
                    <span
                      key={hex}
                      className="h-7 w-7 rounded-full border-2 border-brand-navy shadow-sm"
                      style={{ backgroundColor: hex }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-xs text-white/60">
                  Hamptons palette shown &mdash; 5 more palettes to explore
                </span>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-[100px] flex flex-col justify-center gap-3 md:right-[160px] lg:right-[190px]">
            <Link
              href="/colour-selection"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#ab8742] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c9a35f]"
            >
              Explore Colour Selections
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-navy/90"
            >
              Visit Build Calculator
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* --------------------------------------- Compare other designs */}
        {otherFiveRoomDesigns.length > 0 && (
          <div className="mt-16">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-[#ab8742]">
              Compare Designs
            </span>
            <h2 className="mb-2 font-serif text-3xl font-bold text-brand-navy">
              Other 5-Room Designs
            </h2>
            <p className="mb-8 max-w-2xl text-brand-gray">
              See how the Grand 210 Design compares to our other
              5-bedroom rooming accommodation layouts.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {otherFiveRoomDesigns.map((design) => (
                <Link
                  key={design.id}
                  href={`/house-designs/${design.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-brand-gray-light bg-white transition-all hover:-translate-y-1 hover:border-[#ab8742]/40 hover:shadow-lg"
                >
                  <div className="relative h-40 overflow-hidden bg-brand-cream">
                    <Image
                      src={design.image}
                      alt={`${design.title} exterior`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-navy backdrop-blur">
                      {design.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-lg font-bold text-brand-navy">{design.title}</h3>
                    <div className="mt-3 flex items-center gap-4 text-sm text-brand-gray">
                      <span className="flex items-center gap-1.5">
                        <Bed className="h-4 w-4 text-[#ab8742]" aria-hidden="true" />
                        {design.beds} rooms
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Maximize2 className="h-4 w-4 text-[#ab8742]" aria-hidden="true" />
                        {design.area} m²
                      </span>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-navy group-hover:text-[#ab8742]">
                      Compare design
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --------------------------------------------- Enquire CTA + why AHC */}
      <section className="bg-brand-cream py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 border-b border-brand-gray/20 pb-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-navy">
                Ready to invest in the Grand 210 Design?
              </h2>
              <p className="mt-2 max-w-xl text-sm text-brand-gray">
                Speak with our team today — no pressure, just honest advice
                on your next investment build.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[#ab8742] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#c9a35f]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-brand-navy px-6 py-3 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email Enquiry
              </a>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:divide-x sm:divide-brand-gray/20">
            {whyAhc.map((item) => (
              <div key={item.title} className="flex items-start gap-3 sm:px-6">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  className="h-8 w-8 shrink-0 text-[#ab8742]"
                >
                  {item.icon}
                </svg>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-brand-navy">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-brand-gray">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery lightbox */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={gallery[activeImage].alt}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element -- dynamic modal sizing, no stable container for next/image */}
            <img
              src={gallery[activeImage].src}
              alt={gallery[activeImage].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg bg-white"
            />
            <span className="text-white/80 text-sm font-medium tracking-wide uppercase">
              {gallery[activeImage].label}
            </span>
          </div>
        </div>
      )}

      {/* Floor plan lightbox */}
      {floorPlanLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Grand 210 Design floor plan"
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setFloorPlanLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setFloorPlanLightboxOpen(false)}
            className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex flex-col items-center gap-4 max-w-full" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element -- dynamic modal sizing, no stable container for next/image */}
            <img
              src={floorPlanImage}
              alt="Grand 210 Design floor plan"
              className="max-w-full max-h-[78vh] object-contain rounded-lg bg-white"
            />
            <a
              href={floorPlanDownloadHref}
              download="grand-210-floor-plan.png"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md bg-[#ab8742] text-white font-medium hover:bg-[#c9a35f] transition-colors"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Floor Plan
            </a>
          </div>
        </div>
      )}

      {/* Walkthrough modal */}
      {walkthroughOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Grand 210 Design 3D walkthrough"
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setWalkthroughOpen(false)}
        >
          <button
            type="button"
            onClick={() => setWalkthroughOpen(false)}
            className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption -- walkthrough footage has no dialogue/narration */}
          <video
            src={walkthroughSrc}
            controls
            autoPlay
            playsInline
            className="max-w-full max-h-[85vh] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
