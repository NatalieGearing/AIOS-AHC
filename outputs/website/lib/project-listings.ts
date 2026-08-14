export interface ProjectListing {
  slug: string;
  title: string;
  suburb: string;
  price: string;
  beds: number;
  baths: number;
  area: number;
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
    slug: "1-coke-st-camp-hill",
    title: "1 Coke St, Camp Hill",
    suburb: "Camp Hill, QLD",
    price: "$950,000",
    beds: 5,
    baths: 5,
    area: 210,
    propertyType: "Rooming Accommodation",
    status: "Available",
    image: "/images/ellen/exterior.png",
    designSlug: "grand-210",
    designLabel: "Grand 210",
    description:
      "A 5-bedroom, 5-bathroom rooming accommodation build based on our Grand 210 design. This single-storey home delivers 210m² of purpose-built floor area, designed for investors seeking a turnkey rooming house development.",
    features: [
      "5 bedrooms",
      "5 bathrooms",
      "210m² floor area",
      "Single storey",
      "Rooming accommodation design",
      "Based on the Grand 210 floor plan",
    ],
  },
];
