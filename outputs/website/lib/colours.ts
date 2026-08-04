export interface ColourSelection {
  name: string;
  image: string;
  tagline: string;
  description: string;
  palette: string[];
}

export const EXTERNAL_SELECTIONS: ColourSelection[] = [
  {
    name: "Coastal",
    image: "/images/colour-ext-coastal.png",
    tagline: "Breezy. Bright. Beachside.",
    description:
      "White weatherboard, soft sandy trims, and breezy gables. A relaxed seaside palette built for Queensland's warm climate and laid-back lifestyle.",
    palette: ["#F5F1EA", "#E8DCC4", "#A8C5D9", "#3F5A6C"],
  },
  {
    name: "Hamptons",
    image: "/images/colour-ext-hamptons.png",
    tagline: "Classic. Elegant. Timeless.",
    description:
      "Crisp whites paired with charcoal shingles and navy accents. A formal, symmetrical look that brings East-coast refinement to suburban Brisbane.",
    palette: ["#FFFFFF", "#E5E5E5", "#4A4A4A", "#1B2A41"],
  },
  {
    name: "Modern",
    image: "/images/colour-ext-modern.png",
    tagline: "Bold. Architectural. Clean.",
    description:
      "Dark charcoal render with crisp white accents and uninterrupted glazing. A striking statement façade for the contemporary investor.",
    palette: ["#1F1F1F", "#3A3A3A", "#D9D9D9", "#FFFFFF"],
  },
  {
    name: "Scandi",
    image: "/images/colour-ext-scandi.png",
    tagline: "Pure. Natural. Minimal.",
    description:
      "Soft white brick, natural timber battens, and slim black window frames. A Nordic-inspired exterior built on clean lines and honest materials.",
    palette: ["#FAF8F5", "#D8C8B0", "#7B6A55", "#1A1A1A"],
  },
  {
    name: "Classic",
    image: "/images/colour-ext-classic.png",
    tagline: "Timeless. Elegant. Refined.",
    description:
      "Creamy white render, a charcoal tiled roof, and traditional gabled proportions. An enduring, heritage-inspired façade that never dates and appeals to every tenant.",
    palette: ["#F2EDE3", "#C9BBA4", "#6E6257", "#37332E"],
  },
  {
    name: "Contemporary",
    image: "/images/colour-ext-contemporary.png",
    tagline: "Warm. Sophisticated. Layered.",
    description:
      "Mixed materials of warm timber, soft grey render, and feature stone. A timeless, layered façade that ages beautifully and appeals to all tenants.",
    palette: ["#E8DFD2", "#A89684", "#5C5048", "#2C2823"],
  },
];

export const INTERNAL_SELECTIONS: ColourSelection[] = [
  {
    name: "Coastal",
    image: "/images/colour-int-coastal.png",
    tagline: "Light. Airy. Effortless.",
    description:
      "White panelled walls, light oak floors, woven rattan, and soft blue linens. Interiors that feel like a permanent holiday.",
    palette: ["#FFFFFF", "#F0E6D2", "#C3D7E2", "#6B8E9F"],
  },
  {
    name: "Hamptons",
    image: "/images/colour-int-hamptons.png",
    tagline: "Refined. Layered. Polished.",
    description:
      "Wainscoting, polished oak floors, marble accents and navy-and-white textiles. A timeless interior palette tenants instantly fall for.",
    palette: ["#FFFFFF", "#E8E4DA", "#7E8B9C", "#1B2A41"],
  },
  {
    name: "Modern",
    image: "/images/colour-int-modern.png",
    tagline: "Sleek. Bold. Architectural.",
    description:
      "Polished concrete floors, charcoal upholstery, blackened steel and dramatic pendant lighting. Minimalism delivered with serious presence.",
    palette: ["#FFFFFF", "#C9C9C9", "#3A3A3A", "#0A0A0A"],
  },
  {
    name: "Scandi",
    image: "/images/colour-int-scandi.png",
    tagline: "Calm. Bright. Functional.",
    description:
      "Pale blonde timbers, soft greys, natural wool, and pared-back styling. A clean, hygge-inspired interior that photographs beautifully.",
    palette: ["#FAFAFA", "#EDE4D3", "#B8A993", "#3D3A36"],
  },
  {
    name: "Urban",
    image: "/images/colour-int-urban.png",
    tagline: "Moody. Textured. Atmospheric.",
    description:
      "Exposed brick, polished concrete, dark leather, and Edison-bulb lighting. A bold industrial aesthetic with character that lasts.",
    palette: ["#1A1A1A", "#4A3A30", "#8B6F47", "#C8A878"],
  },
  {
    name: "Contemporary",
    image: "/images/colour-int-contemporary.png",
    tagline: "Warm. Tactile. Timeless.",
    description:
      "Warm taupe walls, wide oak floors, boucle upholstery, brass and marble. Layered textures designed to feel premium today and in ten years.",
    palette: ["#F2EAD8", "#C9B79A", "#7A6753", "#2E2823"],
  },
];
