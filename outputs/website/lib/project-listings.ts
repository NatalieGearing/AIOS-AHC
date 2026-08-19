export interface ProjectListing {
  slug: string;
  title: string;
  suburb: string;
  price: string;
  beds: number;
  baths: number;
  area: number;
  stories?: "single" | "two";
  propertyType: string;
  status: "Available" | "Under Offer" | "Sold";
  image: string;
  designSlug?: string;
  designLabel?: string;
  description: string;
  features: string[];
}

export const PROJECT_LISTINGS: ProjectListing[] = [
  {
    slug: "101-ducie-st-darra",
    title: "101 Ducie St, Darra",
    suburb: "Darra, QLD",
    price: "$950,000",
    beds: 5,
    baths: 5,
    area: 210,
    stories: "two",
    propertyType: "Rooming Accommodation",
    status: "Available",
    image: "/images/101-ducie-st-darra/front.webp",
    designSlug: "grand-210",
    designLabel: "Grand 210",
    description:
      "A 5-bedroom, 5-bathroom rooming accommodation build based on our Grand 210 design. This two-storey home delivers 210m² of purpose-built floor area, designed for investors seeking a turnkey rooming house development.",
    features: [
      "5 bedrooms",
      "5 bathrooms",
      "210m² floor area",
      "Two storey",
      "Rooming accommodation design",
      "Based on the Grand 210 floor plan",
    ],
  },
];
