import type { Metadata } from "next";

export const SITE_NAME = "Affordable House Corp";
export const SITE_DESCRIPTION =
  "Brisbane's market-leading builder of turnkey investment properties — rooming accommodation, pre-fab houses, and land subdivisions. 30 years of experience, feasibility through to final sale.";

// Placeholder until a real domain is connected (see plan open question #4).
export const SITE_URL = "https://affordablehousecorp.example.com";

export function buildMetadata(overrides: Metadata): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    openGraph: {
      siteName: SITE_NAME,
      type: "website",
      locale: "en_AU",
    },
    ...overrides,
  };
}
