export interface ServiceItem {
  title: string;
  slug: string;
  image: string;
  description: string;
  flagship?: boolean;
  /** Whether a dedicated /house-designs/{slug} detail page exists to link to. */
  hasDetailPage?: boolean;
  /** Label for a secondary "View X Designs" button linking to /house-designs/{slug}/designs. */
  designsLabel?: string;
}

export const SERVICES: ServiceItem[] = [
  {
    title: "Rooming Accommodation",
    slug: "rooming-accommodation",
    image: "/images/service-rooming.png",
    description:
      "Purpose-built, high-yield rooming accommodation. Affordable House Corp is the market leader in this space, offering significantly higher rental returns than many traditional residential builds.",
    flagship: true,
    hasDetailPage: true,
    designsLabel: "View Rooming House Designs",
  },
  {
    title: "Co-Living Developments",
    slug: "co-living-developments",
    image: "/images/service-coliving.png",
    description:
      "Premium, architecturally designed homes with private rooms alongside shared communal areas — fostering community while ensuring privacy and comfort.",
    hasDetailPage: true,
    designsLabel: "View Co-Living Designs",
  },
  {
    title: "Dual Occupancy",
    slug: "dual-occupancy",
    image: "/images/service-duplex.png",
    description:
      "Two dwellings on a single block, engineered to maximise returns from your land while meeting all local planning requirements.",
    hasDetailPage: true,
    designsLabel: "View Dual Occupancy Designs",
  },
  {
    title: "Boutique Townhouses",
    slug: "boutique-townhouses",
    image: "/images/service-townhouse.png",
    description:
      "From boutique three-lot developments to larger multi-stage complexes, balancing cost-efficiency with high-end aesthetic appeal.",
    hasDetailPage: true,
    designsLabel: "View Boutique Townhouse Designs",
  },
  {
    title: "Pre-fab Houses",
    slug: "pre-fab-houses",
    image: "/images/service-prefab.png",
    description:
      "Faster, more predictable builds using pre-fabricated construction methods, without compromising on quality or finish.",
    hasDetailPage: true,
    designsLabel: "View Pre-fab House Designs",
  },
  {
    title: "Land Subdivisions",
    slug: "land-subdivisions",
    image: "/images/service-subdivision.png",
    description:
      "End-to-end subdivision management — from feasibility and planning through to titling — unlocking the full potential of a site.",
    hasDetailPage: true,
  },
];

export interface Stat {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

export const STATS: Stat[] = [
  { end: 2100, suffix: "+", label: "Projects Delivered" },
  { end: 945, prefix: "$", suffix: "M+", label: "Total Project Value" },
  { end: 8.2, suffix: "%", decimals: 1, label: "Average Gross Yield" },
  { end: 99, suffix: "%", label: "On-Time Completion" },
];

export interface Review {
  name: string;
  location: string;
  text: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Michael T.",
    location: "Acacia Ridge",
    text: "From the first site meeting to handover, the whole build was faster than I ever expected. Affordable House Corp kept to their schedule and my rooming house was tenanted within weeks of completion. As an investor, every day counts, and they understood that completely.",
  },
  {
    name: "Sarah K.",
    location: "Manly QLD",
    text: "The quality of the finish was exactly what I asked for. The fixtures, the joinery, the attention to detail — it feels like a premium home, not a standard rental. My property manager has had no maintenance issues at all, which tells you everything about how well it was built.",
  },
  {
    name: "David L.",
    location: "Boondall QLD",
    text: "What I valued most was the peace of mind. Building from interstate is nerve-wracking, but knowing AHC handled the council compliance, certifications and all the paperwork meant I could relax. A genuinely trusted builder who did exactly what they said they would.",
  },
  {
    name: "Jessica M.",
    location: "Acacia Ridge QLD",
    text: "This is our third build with AHC and we wouldn't go anywhere else. The team is consistent, the communication is clear, and the returns speak for themselves. When you find a builder who delivers every single time, you stick with them.",
  },
  {
    name: "Andrew P.",
    location: "Zillmere",
    text: "I was sceptical about the yields they quoted, but the numbers stacked up exactly as promised. The build was on time, on budget, and the cashflow has been outstanding. Affordable House Corp clearly know the investment space far better than any other builder I spoke to.",
  },
  {
    name: "Emma R.",
    location: "Tingalpa",
    text: "After our first dual-occupancy build went so smoothly, we immediately signed up for a second. The professionalism and honesty throughout the process gave us total confidence. We'll absolutely keep building with AHC for years to come.",
  },
];

export interface Supplier {
  name: string;
  image?: string;
}

export const SUPPLIERS: Supplier[] = [
  { name: "Laminex", image: "/images/logo-laminex.jpg" },
  { name: "Wattyl", image: "/images/logo-wattyl.png" },
  { name: "Corinthian Doors", image: "/images/logo-corinthian.png" },
  { name: "Colorbond", image: "/images/logo-colorbond.png" },
  { name: "Beaumont Tiles", image: "/images/logo-beaumont.png" },
  { name: "Clipsal", image: "/images/logo-clipsal.png" },
  { name: "James Hardie", image: "/images/logo-jameshardie.png" },
  { name: "Austral Bricks", image: "/images/logo-australbricks.png" },
  { name: "Boral", image: "/images/logo-boral.png" },
];

export interface Listing {
  slug: string;
  title: string;
  location: string;
  image: string;
  propertyType: string;
  status: "Available" | "Under Offer" | "Sold";
  guidePrice: string;
  estYield: string;
  beds: number;
  baths: number;
}

// Placeholder listings — swap these for the current real estate listings
// (address, price, yield, beds/baths, photos) once supplied.
export const LISTINGS: Listing[] = [
  {
    slug: "acacia-ridge-rooming-house",
    title: "Acacia Ridge Rooming House",
    location: "Acacia Ridge, QLD",
    image: "/images/service-rooming.png",
    propertyType: "Rooming Accommodation",
    status: "Available",
    guidePrice: "$950,000",
    estYield: "8.5%",
    beds: 8,
    baths: 8,
  },
  {
    slug: "zillmere-co-living-residence",
    title: "Zillmere Co-Living Residence",
    location: "Zillmere, QLD",
    image: "/images/service-coliving.png",
    propertyType: "Co-Living",
    status: "Available",
    guidePrice: "$850,000",
    estYield: "7.9%",
    beds: 6,
    baths: 3,
  },
  {
    slug: "boondall-duplex-investment",
    title: "Boondall Duplex Investment",
    location: "Boondall, QLD",
    image: "/images/service-duplex.png",
    propertyType: "Duplex",
    status: "Available",
    guidePrice: "$1,250,000",
    estYield: "6.8%",
    beds: 6,
    baths: 4,
  },
  {
    slug: "tingalpa-townhouse-development",
    title: "Tingalpa Townhouse Development",
    location: "Tingalpa, QLD",
    image: "/images/service-townhouse.png",
    propertyType: "Townhouse",
    status: "Available",
    guidePrice: "$780,000",
    estYield: "5.9%",
    beds: 4,
    baths: 3,
  },
];

export const CONTACT = {
  phone: "07 3396 6500",
  phoneHref: "tel:0733966500",
  email: "sales@ahcbrisbane.com.au",
  addressLines: ["807 New Cleveland Rd", "Gumdale, Queensland 4154", "Australia"],
  hours: [
    { label: "Monday - Friday", value: "8:30am - 5:30pm" },
    { label: "Saturday", value: "By Appointment" },
    { label: "Sunday", value: "Closed" },
  ],
};
