import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "yearly", priority: 0.8 },
  { path: "/house-designs", changeFrequency: "monthly", priority: 0.9 },
  {
    path: "/house-designs/rooming-accommodation",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  { path: "/house-and-land", changeFrequency: "daily", priority: 0.9 },
  { path: "/calculator", changeFrequency: "monthly", priority: 0.8 },
  { path: "/borrowing-calculator", changeFrequency: "monthly", priority: 0.8 },
  { path: "/colour-selection", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
