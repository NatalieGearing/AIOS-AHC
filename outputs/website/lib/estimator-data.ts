/**
 * PLACEHOLDER build cost estimator data.
 *
 * House designs, package/extra pricing, and images below are illustrative
 * only, reusing existing site photography and rough figures. Replace with
 * real model names, specs and pricing from the business before this page
 * goes live (see plans/2026-07-13-affordable-house-corp-website.md).
 */

export interface EstimatorHouse {
  id: string;
  name: string;
  series: string;
  rooms: string;
  area: number;
  beds: string;
  price: number;
  image: string;
  description: string;
  tag: string | null;
}

export const HOUSES: EstimatorHouse[] = [
  {
    id: "soho-2",
    name: "SOHO 2",
    series: "Pre-fab House",
    rooms: "2 Rooms",
    beds: "2 Rooms · 1 Bath",
    area: 32,
    price: 128000,
    image: "/images/service-prefab.png",
    description:
      "A two-storey relocatable tiny house on wheels — the perfect granny flat, weekender or compact rental. Smartly designed to live far larger than its footprint.",
    tag: "Most compact",
  },
  {
    id: "ellen-210",
    name: "Ellen 210",
    series: "Rooming Accommodation",
    rooms: "5 Rooms",
    beds: "5 Rooms · 5 Bath",
    area: 210,
    price: 545000,
    image: "/images/service-rooming.png",
    description:
      "A single-storey Hamptons rooming home with five self-contained, high-yield bedrooms. Designed for premium tenant appeal and strong, diversified rental income.",
    tag: "Best seller",
  },
  {
    id: "banksia-6",
    name: "Banksia 6",
    series: "Rooming Accommodation",
    rooms: "6 Rooms",
    beds: "6 Rooms · 6 Bath",
    area: 340,
    price: 720000,
    image: "/images/service-rooming.png",
    description:
      "A six-bedroom rooming design built for maximum rental yield and tenant appeal, with six fully self-contained suites and generous shared amenity.",
    tag: "Top yield",
  },
];

export interface EstimatorExtra {
  id: string;
  cat: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export const EXTRA_CATS = [
  "Exterior",
  "Interior",
  "Cabinetry",
  "Bathroom & Plumbing",
  "Electrical",
  "Security & Tech",
  "Compliance & Project Management",
] as const;

export const EXTRAS: EstimatorExtra[] = [
  { id: "pool", cat: "Exterior", name: "In-Ground Swimming Pool", description: "Concrete in-ground pool with paved surrounds and fencing.", price: 45000, icon: "🏊" },
  { id: "alfresco", cat: "Exterior", name: "Outdoor Alfresco & Deck", description: "Covered alfresco with ceiling fans and timber entertaining deck.", price: 16000, icon: "🌿" },
  { id: "landscaping", cat: "Exterior", name: "Landscaping & Fencing", description: "Turf, native gardens, paths and full perimeter fencing.", price: 18000, icon: "🌳" },
  { id: "driveway", cat: "Exterior", name: "Driveway & Concreting", description: "Exposed-aggregate driveway, paths and external concreting.", price: 9500, icon: "🛣️" },
  { id: "solar", cat: "Electrical", name: "Solar + Battery System", description: "6.6kW solar array with battery-ready inverter to slash running costs.", price: 14500, icon: "☀️" },
  { id: "ducted-ac", cat: "Electrical", name: "Ducted Air Conditioning", description: "Zoned ducted reverse-cycle climate control throughout the home.", price: 11000, icon: "❄️" },
  { id: "stone", cat: "Cabinetry", name: "Stone Benchtop Upgrade", description: "Upgrade to 40mm engineered stone benchtops in kitchen & baths.", price: 8500, icon: "🪨" },
  { id: "furniture", cat: "Interior", name: "Furniture & Styling Pack", description: "Full furniture, soft furnishings and professional styling.", price: 22000, icon: "🛋️" },
  { id: "security", cat: "Security & Tech", name: "Security Camera System", description: "Multi-camera CCTV system with app monitoring and night vision.", price: 6500, icon: "📹" },
  { id: "hw-dual", cat: "Bathroom & Plumbing", name: "Dual Element Hot Water Unit", description: "Electric dual-element storage hot water system for fast recovery and reliable supply.", price: 1850, icon: "🚿" },
  { id: "hw-instant", cat: "Bathroom & Plumbing", name: "21kW Electric Instant Hot Water Unit", description: "Continuous-flow electric instant hot water with endless supply and space-saving design.", price: 2400, icon: "🔥" },
  { id: "toilet-btw", cat: "Bathroom & Plumbing", name: "Back to Wall Toilet", description: "Sleek back-to-wall toilet suite with concealed trap and soft-close seat.", price: 650, icon: "🚽" },
  { id: "accessible-bath", cat: "Bathroom & Plumbing", name: "Accessible Bathroom Care Kit", description: "Grab rails, fold-down seat and accessible fittings for safe, age-friendly bathing.", price: 1250, icon: "♿" },
  { id: "survey-pegs", cat: "Compliance & Project Management", name: "Identification Survey Pegs", description: "Licensed surveyor identification survey and boundary peg placement before build.", price: 1500, icon: "📐" },
  { id: "flood-report", cat: "Compliance & Project Management", name: "Flood Engineer Report", description: "Certified flood study and engineering report for flood-affected building sites.", price: 2800, icon: "📊" },
  { id: "fire-cert", cat: "Compliance & Project Management", name: "Fire Engineer Emergency Escape Certification", description: "Fire engineering assessment and emergency escape compliance certification.", price: 3500, icon: "🧯" },
  { id: "over-sewer", cat: "Compliance & Project Management", name: "Building Over Sewer", description: "Build-over-sewer assessment, engineering and authority approvals for construction near sewer lines.", price: 2200, icon: "🚧" },
  { id: "boundary-relax", cat: "Compliance & Project Management", name: "Boundary Relaxation Approval", description: "Town planning application and approval for boundary setback relaxation.", price: 1900, icon: "📋" },
];

export interface EstimatorPackage {
  id: string;
  name: string;
  icon: string;
  description: string;
  includes: string[];
  price: number;
  popular: boolean;
}

export const PACKAGES: EstimatorPackage[] = [
  {
    id: "essentials",
    name: "Essentials Turnkey",
    icon: "🏠",
    description: "Move-in ready and smartly priced — everything you need to lease from day one.",
    includes: [
      "Quality laminate kitchen with stainless appliances",
      "Durable vinyl plank flooring throughout",
      "Standard tapware, lighting & window furnishings",
      "Split-system air conditioning to living area",
      "Fully painted, cleaned & handover ready",
    ],
    price: 0,
    popular: false,
  },
  {
    id: "premium",
    name: "Premium Turnkey",
    icon: "⭐",
    description: "Our most popular package — elevated finishes that lease faster and command higher rents.",
    includes: [
      "Stone benchtops & soft-close cabinetry",
      "Engineered timber flooring to living zones",
      "Designer pendant & feature lighting",
      "Upgraded tapware, mirrors & tiling",
      "Premium blinds and quality floor coverings",
    ],
    price: 38000,
    popular: true,
  },
  {
    id: "luxury",
    name: "Luxury Turnkey",
    icon: "💎",
    description: "Top-tier inclusions and premium appeal — ready for the furniture truck and top of the market.",
    includes: [
      "Waterfall stone island & butler's pantry",
      "European appliances & integrated fridge",
      "Herringbone timber floors & high ceilings",
      "Full designer lighting & smart-home wiring",
      "Professional styling & premium fixtures",
    ],
    price: 72000,
    popular: false,
  },
];

export const SITE_COST = 32000;

export const AUD = (n: number) => "$" + Math.round(n).toLocaleString("en-AU");
