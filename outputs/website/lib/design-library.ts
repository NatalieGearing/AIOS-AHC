export interface DesignLibraryEntry {
  id: number;
  title: string;
  type: "rooming-accommodation" | "prefab";
  stories: "single" | "two";
  beds: number;
  baths?: number;
  area: number;
  image: string;
  tag: string;
  slug?: string;
}

export const DESIGN_LIBRARY: DesignLibraryEntry[] = [
  {
    id: 4,
    title: "Stringybark 12",
    type: "rooming-accommodation",
    stories: "two",
    beds: 12,
    area: 640,
    image: "/images/news-ra-fitout.png",
    tag: "Premium",
  },
  {
    id: 15,
    title: "SOHO 2",
    type: "prefab",
    stories: "two",
    beds: 2,
    baths: 1,
    area: 32,
    image: "/images/soho2/exterior.png",
    tag: "Prefab",
  },
  {
    id: 2,
    title: "Bellatrix 218",
    type: "rooming-accommodation",
    stories: "single",
    beds: 5,
    baths: 5,
    area: 218,
    image: "/images/bellatrix-210/exterior.png",
    tag: "Popular",
    slug: "bellatrix-218",
  },
  {
    id: 3,
    title: "Tallowwood 10",
    type: "rooming-accommodation",
    stories: "two",
    beds: 10,
    area: 560,
    image: "/images/news-ra-density.png",
    tag: "Best Yield",
  },
  {
    id: 1,
    title: "Grand 210",
    type: "rooming-accommodation",
    stories: "single",
    beds: 5,
    baths: 5,
    area: 210,
    image: "/images/ellen/exterior.png",
    tag: "Rooming Accom",
    slug: "grand-210",
  },
  {
    id: 11,
    title: "Wattle Rooming 9",
    type: "rooming-accommodation",
    stories: "two",
    beds: 9,
    area: 510,
    image: "/images/news-ra-kitchen.png",
    tag: "High Yield",
  },
  {
    id: 13,
    title: "Acacia Prefab 3",
    type: "prefab",
    stories: "single",
    beds: 3,
    area: 180,
    image: "/images/service-prefab.png",
    tag: "Prefab",
  },
  {
    id: 14,
    title: "Grevillea Prefab 4",
    type: "prefab",
    stories: "two",
    beds: 4,
    area: 240,
    image: "/images/news-prefab.png",
    tag: "Prefab",
  },
  {
    id: 16,
    title: "Blunder 190",
    type: "rooming-accommodation",
    stories: "single",
    beds: 5,
    baths: 5,
    area: 190,
    image: "/images/service-rooming.png",
    tag: "Coming Soon",
    slug: "blunder-190",
  },
  {
    id: 17,
    title: "Alice 235",
    type: "rooming-accommodation",
    stories: "single",
    beds: 5,
    baths: 5,
    area: 235,
    image: "/images/service-rooming.png",
    tag: "Coming Soon",
    slug: "alice-235",
  },
  {
    id: 18,
    title: "Ellen 210",
    type: "rooming-accommodation",
    stories: "single",
    beds: 5,
    baths: 5,
    area: 210,
    image: "/images/service-rooming.png",
    tag: "Coming Soon",
    slug: "ellen-210",
  },
  {
    id: 19,
    title: "Bellatrix",
    type: "rooming-accommodation",
    stories: "single",
    beds: 5,
    baths: 5,
    area: 218,
    image: "/images/service-rooming.png",
    tag: "Coming Soon",
    slug: "bellatrix-218",
  },
];

export const PROPERTY_TYPE_OPTIONS = [
  { value: "", label: "All property types" },
  { value: "rooming-accommodation", label: "Rooming Accommodation" },
  { value: "prefab", label: "Prefab Houses" },
];

export const STORY_OPTIONS = [
  { value: "", label: "All storeys" },
  { value: "single", label: "Single storey" },
  { value: "two", label: "Two storey" },
];

export const ROOM_OPTIONS = [
  { value: "", label: "Any room count", min: 0, max: 99 },
  { value: "2-4", label: "2 – 4 rooms", min: 2, max: 4 },
  { value: "5-6", label: "5 – 6 rooms", min: 5, max: 6 },
  { value: "7-9", label: "7 – 9 rooms", min: 7, max: 9 },
  { value: "10+", label: "10+ rooms", min: 10, max: 99 },
];

export const SORT_OPTIONS = [
  { value: "rooms-desc", label: "Most rooms" },
  { value: "plot-asc", label: "Smallest plot required" },
  { value: "area-desc", label: "Largest footprint" },
  { value: "area-asc", label: "Smallest footprint" },
  { value: "az", label: "Name (A–Z)" },
];

/* Council-standard maximum site coverage: a home's total floor area
   can't exceed 50% of the plot it sits on, so the minimum plot size
   a buyer needs is simply the floor area divided by that cap. */
const MAX_SITE_COVERAGE = 0.5;

export const minPlotSize = (d: { area: number }) => Math.ceil(d.area / MAX_SITE_COVERAGE);
