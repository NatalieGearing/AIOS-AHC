"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { DESIGN_LIBRARY } from "@/lib/design-library";
import { CONTACT } from "@/lib/content";

const ACCENT = "#ab8742";
const ACCENT_ON_DARK = "rgb(216,196,157)"; // ACCENT lifted toward white for use on dark backgrounds

const C = {
  surfmist: "#d6d6ca", dune: "#aca497", monument: "#404241", doverWhite: "#eceae1", pearl: "#f6f6f2",
  lexicon: "#f1f0eb", signature: "#646b75", tranquil: "#d6d8d5", rainmaker: "#5a6a75", timelessGrey: "#8b8880",
  omniGrey: "#b7b6b2", omniWhite: "#e4e3de", omniBeige: "#c9c0b2", omniCharcoal: "#55565a",
  carrara: "#f0efea", classicWhite: "#f6f6f2", whiteSheen: "#f4f3ef", cremaLini: "#e5dbc9",
  ink: "#2b2f36", snowFabrini: "#eef0ee", stoneGrey: "#a9a6a0", primeOak: "#c9a87c", barrington: "#e8e6e0",
  voyageWhite: "#f7f7f4", voyageIce: "#dfe2e2", handles: "#8f9094",
  blackbutt: "#9e6f45", oat: "#d8be97", kahlua: "#9a6f4e", royalBlackbutt: "#cda478",
  greyPebble: "#a8a49c", cloudStipple: "#c3bfb6", urbanGrey: "#8d8b88", cloud: "#e8e6e0",
};

// Real material photos, keyed by the hex they replace, for swatches shown at larger sizes.
const SWATCH_TEXTURES: Record<string, string> = {
  [C.blackbutt]: "/images/colour-studio/tex-blackbutt.png",
  [C.royalBlackbutt]: "/images/colour-studio/tex-blackbutt.png",
  [C.oat]: "/images/colour-studio/tex-oat.png",
};

type Row = { label: string; name: string; hex: string };

function kitchenRows(bench: string, benchHex: string, cab: string, cabHex: string, splash: string, splashHex: string, extra?: Row[]): Row[] {
  return [
    { label: "Laminate benchtops", name: bench, hex: benchHex },
    ...(extra ?? []),
    { label: "Laminate cupboards", name: cab, hex: cabHex },
    { label: "Tile splashback", name: splash + " 100x300", hex: splashHex },
    { label: "Cabinet handles", name: "Metal profile & finger pulls", hex: C.handles },
  ];
}

function interiorRows(floor: string, floorHex: string, carpet: string, carpetHex: string, wet: string, wetHex: string, robes?: string): Row[] {
  return [
    { label: "Living, hallway & kitchen", name: floor, hex: floorHex },
    { label: "Bedrooms & *upper floor", name: carpet, hex: carpetHex },
    { label: "Wet area floor tile", name: wet, hex: wetHex },
    { label: "Laundry, vanity & shower walls", name: "White Gloss 200x300", hex: C.voyageWhite },
    { label: "Internal wall paint", name: "Dulux Lexicon Half", hex: C.lexicon },
    { label: "Blinds & robe doors", name: robes ?? "Vertical Blinds Cloud · ½ mirror", hex: C.cloud },
  ];
}

interface Scheme {
  id: string;
  name: string;
  tag: string;
  tagline: string;
  desc: string;
  palette: string[];
  image: string;
  exterior: Row[];
  kitchen: Row[];
  interiors: Row[];
}

const SCHEMES: Scheme[] = [
  {
    id: "classic", name: "Classic", tag: "Most popular", tagline: "Warm · Balanced · Enduring",
    desc: "A calm neutral exterior with Monument detailing, crisp white cabinetry and warm Blackbutt flooring.",
    palette: ["#d6d6ca", "#aca497", "#404241", "#f5f4f0", "#9e6f45"],
    image: "/images/colour-studio/grand210-classic.png",
    exterior: [
      { label: "Main cladding", name: "Colorbond Surfmist", hex: C.surfmist },
      { label: "Feature cladding", name: "Colorbond Dune", hex: C.dune },
      { label: "Roof & soffits", name: "Colorbond Surfmist", hex: C.surfmist },
      { label: "Fascia, gutter & frames", name: "Colorbond Monument", hex: C.monument },
      { label: "Front door", name: "Colorbond Surfmist", hex: C.surfmist },
      { label: "*Garage, posts & balustrade", name: "Colorbond Monument", hex: C.monument },
      { label: "Outdoor patio / *balcony", name: "Omniform Grey Textured", hex: C.omniGrey },
    ],
    kitchen: kitchenRows("Polytec Carrara", C.carrara, "Polytec Classic White Matt", C.classicWhite, "Voyage White Gloss", C.voyageWhite),
    interiors: interiorRows("Luxo Hybrid Coastal Blackbutt", C.blackbutt, "Classic City 755 Grey Pebble", C.greyPebble, "Omniform 450x450 Grey Matt", C.omniGrey),
  },
  {
    id: "timeless", name: "Timeless", tag: "Warm neutral", tagline: "Soft · Understated · Refined",
    desc: "Layered warm greys and Surfmist detailing create a composed backdrop for Stone Grey cabinetry and Royal Blackbutt.",
    palette: ["#8b8880", "#d6d6ca", "#f0efea", "#a9a6a0", "#cda478"],
    image: "/images/colour-studio/grand210-timeless.png",
    exterior: [
      { label: "Main cladding", name: "Dulux Timeless Grey", hex: C.timelessGrey },
      { label: "*Feature cladding", name: "Colorbond Surfmist", hex: C.surfmist },
      { label: "Roof", name: "Colorbond Surfmist", hex: C.surfmist },
      { label: "Fascia, gutter & soffits", name: "Colorbond Surfmist", hex: C.surfmist },
      { label: "Front door", name: "Colorbond Surfmist", hex: C.surfmist },
      { label: "Window frames", name: "Pearl White Gloss", hex: C.pearl },
      { label: "*Garage door (slimline) & balustrade", name: "Colorbond Surfmist", hex: C.surfmist },
      { label: "Outdoor patio / *balcony", name: "Omniform Grey Textured", hex: C.omniGrey },
    ],
    kitchen: kitchenRows("Polytec Snow Fabrini Matt", C.snowFabrini, "Polytec Stone Grey Sheen", C.stoneGrey, "Voyage White Gloss", C.voyageWhite),
    interiors: interiorRows("Luxo Hybrid Royal Blackbutt", C.royalBlackbutt, "Classic City 755 Grey Pebble", C.greyPebble, "Omniform 450x450 Grey Matt", C.omniGrey),
  },
  {
    id: "coastal", name: "Coastal", tag: "Light & airy", tagline: "Fresh · Relaxed · Bright",
    desc: "Blue-grey cladding, Dover White trims and light timber tones create an easy Queensland coastal feel.",
    palette: ["#646b75", "#f1f0eb", "#f6f6f2", "#c3bfb6", "#d8be97"],
    image: "/images/colour-studio/grand210-coastal.png",
    exterior: [
      { label: "Main cladding", name: "Dulux Signature", hex: C.signature },
      { label: "Trim colour", name: "Dulux Lexicon Half", hex: C.lexicon },
      { label: "Roof", name: "Colorbond Dover White", hex: C.doverWhite },
      { label: "Fascia, gutter & soffits", name: "Colorbond Dover White", hex: C.doverWhite },
      { label: "Window frames", name: "Pearl White Gloss", hex: C.pearl },
      { label: "Front door", name: "Colorbond Dover White", hex: C.doverWhite },
      { label: "*Garage, posts & balustrade", name: "Colorbond Dover White", hex: C.doverWhite },
      { label: "Outdoor patio / *balcony", name: "Omniform Grey Textured", hex: C.omniGrey },
    ],
    kitchen: kitchenRows("Polytec Carrara", C.carrara, "Polytec Classic White Matt (lower)", C.classicWhite, "Voyage White Gloss", C.voyageWhite, [
      { label: "Overhead cabinets", name: "Polytec Crema Lini Matt", hex: C.cremaLini },
    ]),
    interiors: interiorRows("Luxo Hybrid Oat", C.oat, "Classic City 750 Cloud Stipple", C.cloudStipple, "Omniform 450x450 Grey Matt", C.omniGrey),
  },
  {
    id: "oslo", name: "Oslo", tag: "Contemporary", tagline: "Bold · Natural · Architectural",
    desc: "Monument roof and detailing give the exterior depth, balanced by Prime Oak cabinetry and Kahlua Latte flooring.",
    palette: ["#3a393a", "#404241", "#b4ae9e", "#c9a87c", "#9a6f4e"],
    image: "/images/colour-studio/grand210-oslo.png",
    exterior: [
      { label: "Main cladding", name: "Colorbond Surfmist", hex: C.surfmist },
      { label: "Roof & soffits", name: "Colorbond Monument", hex: C.monument },
      { label: "Fascia & gutter", name: "Colorbond Monument", hex: C.monument },
      { label: "Window frames", name: "Colorbond Monument", hex: C.monument },
      { label: "Front door", name: "Colorbond Monument", hex: C.monument },
      { label: "*Garage, posts & balustrade", name: "Colorbond Monument", hex: C.monument },
      { label: "Outdoor patio / *balcony", name: "Omniform 450x450 Charcoal Textured", hex: C.omniCharcoal },
    ],
    kitchen: kitchenRows("Polytec Barrington Marble Matt", C.barrington, "Polytec Prime Oak Matt (base)", C.primeOak, "Voyage White Gloss", C.voyageWhite, [
      { label: "*Overhead cupboards", name: "Polytec Classic White Matt", hex: C.classicWhite },
    ]),
    interiors: interiorRows("Luxo Hybrid Kahlua Latte", C.kahlua, "Classic City 760 Urban Grey", C.urbanGrey, "Omniform 450x450 Charcoal", C.omniCharcoal, "Vertical Blinds Cloud · Vinyl Glacier, black frames"),
  },
  {
    id: "hamptons", name: "Hamptons", tag: "Designer", tagline: "Elegant · Soft · Coastal",
    desc: "Tranquil Retreat cladding, Dover White trims and a Rainmaker entry deliver a fresh Hamptons character.",
    palette: ["#d6d8d5", "#f1f0eb", "#5a6a75", "#f6f6f2", "#d8be97"],
    image: "/images/colour-studio/grand210-hamptons.png",
    exterior: [
      { label: "Main cladding", name: "Dulux Tranquil Retreat", hex: C.tranquil },
      { label: "Front door trim & soffits", name: "Dulux Lexicon Half", hex: C.lexicon },
      { label: "Roof, fascia & gutter", name: "Colorbond Dover White", hex: C.doverWhite },
      { label: "Front door", name: "Dulux Rainmaker", hex: C.rainmaker },
      { label: "Window frames & balustrade", name: "Pearl White Gloss", hex: C.pearl },
      { label: "*Garage door (slimline) & posts", name: "Colorbond Dover White", hex: C.doverWhite },
      { label: "Outdoor patio / *balcony", name: "Omniform Grey Textured", hex: C.omniGrey },
    ],
    kitchen: kitchenRows("Polytec Carrara", C.carrara, "Polytec Classic White Matt", C.classicWhite, "Voyage Ice Grey Gloss", C.voyageIce),
    interiors: interiorRows("Luxo Hybrid Oat", C.oat, "Classic City 750 Cloud Stipple", C.cloudStipple, "Omniform 450x450 White Matt", C.omniWhite),
  },
  {
    id: "modern", name: "Modern", tag: "High contrast", tagline: "Clean · Confident · Graphic",
    desc: "Monument accents sharpen a Lexicon Half exterior, with Ink Fabrini benchtops and warm Blackbutt flooring inside.",
    palette: ["#404241", "#f1f0eb", "#d6d6ca", "#c9c0b2", "#9e6f45"],
    image: "/images/colour-studio/facade-grand210.png",
    exterior: [
      { label: "Main wall colour", name: "Dulux Lexicon Half", hex: C.lexicon },
      { label: "Feature wall colour", name: "Colorbond Monument", hex: C.monument },
      { label: "Roof", name: "Colorbond Surfmist", hex: C.surfmist },
      { label: "Soffits", name: "Dulux Lexicon Half", hex: C.lexicon },
      { label: "Fascia, gutter & frames", name: "Colorbond Monument", hex: C.monument },
      { label: "Front door & trim", name: "Colorbond Monument", hex: C.monument },
      { label: "*Garage (slimline), posts & balustrade", name: "Colorbond Monument", hex: C.monument },
      { label: "Outdoor patio / *balcony", name: "Omniform Beige Textured", hex: C.omniBeige },
    ],
    kitchen: kitchenRows("Polytec Ink Fabrini Matt", C.ink, "Polytec Classic White Sheen Matt", C.whiteSheen, "Voyage White Gloss", C.voyageWhite),
    interiors: interiorRows("Luxo Hybrid Coastal Blackbutt", C.blackbutt, "Classic City 760 Urban Grey", C.urbanGrey, "Omniform 450x450 Beige Matt", C.omniBeige),
  },
];

const AREAS = [
  { key: "exterior" as const, n: "01", label: "Exterior", eyebrow: "Street appeal", title: "Exterior palette" },
  { key: "kitchen" as const, n: "02", label: "Kitchen", eyebrow: "Heart of the home", title: "Kitchen palette" },
  { key: "interiors" as const, n: "03", label: "Interiors", eyebrow: "Flooring & finishes", title: "Interior finishes" },
];

const DESIGN_NAMES = Array.from(new Set(DESIGN_LIBRARY.map((d) => d.title)));
const STORY_OF: Record<string, "single" | "two"> = Object.fromEntries(
  DESIGN_LIBRARY.map((d) => [d.title, d.stories])
);
const LOW_COUNT = DESIGN_LIBRARY.filter((d) => d.stories === "single").length;
const HIGH_COUNT = DESIGN_LIBRARY.filter((d) => d.stories === "two").length;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 74, behavior: "smooth" });
}

export default function ColourCollections() {
  const [storySet, setStorySet] = useState<"single" | "two">("single");
  const [design, setDesign] = useState("Grand 210");
  const [schemeId, setSchemeId] = useState("classic");
  const [areaIndex, setAreaIndex] = useState(0);

  const scheme = SCHEMES.find((s) => s.id === schemeId) ?? SCHEMES[0];
  const area = AREAS[areaIndex];
  const rows = scheme[area.key];

  const visibleDesigns = DESIGN_NAMES.filter((name) => STORY_OF[name] === storySet);

  const mailBody = encodeURIComponent(
    `Hi AHC team,\n\nI'd like to lock in the following colour selection:\n\nHouse design: ${design}\nCollection: ${scheme.name}\n\nThanks,`
  );

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 76, background: "#ece6e1", color: "#111c49" }}>
      <style>{`
        @media (max-width: 1100px) {
          [data-r=hero], [data-r=board], [data-r=confirm] { grid-template-columns: minmax(0,1fr) !important; }
        }
        @media (max-width: 900px) {
          [data-r=grid] { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
          [data-r=hsum] { display: none !important; }
        }
        @media (max-width: 620px) {
          [data-r=grid] { grid-template-columns: minmax(0,1fr) !important; }
        }
      `}</style>

      {/* Poster hero */}
      <section id="poster" className="relative min-h-[600px] overflow-hidden">
        <Image src="/images/colour-studio/hero-showroom.png" alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/55 to-brand-orange/10" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6 py-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Designer colour collections
            </p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
              One complete look.
              <br />
              Every finish <span className="text-brand-orange">considered.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white">
              Choose your home, then select one professionally coordinated collection. Exterior, kitchen and interior finishes are already paired for a polished result.
            </p>
            <button
              type="button"
              onClick={() => scrollToId("collection-options")}
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-orange/90"
            >
              Explore the collections
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Step 1 — choose home + live preview */}
      <section id="top" data-r="hero" style={{ display: "grid", gridTemplateColumns: "minmax(0,0.85fr) minmax(0,1.4fr)", gap: 24, alignItems: "start", padding: "64px 40px 72px", maxWidth: 1560, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 26 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ display: "flex", alignItems: "center", gap: 12, margin: 0, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "#5b5d62" }}>
              <span style={{ padding: "4px 9px", background: "#111c49", color: "#ffffff", borderRadius: 3, fontWeight: 600 }}>01</span>
              Your home design
            </p>
            <h2 style={{ margin: 0, fontFamily: "var(--font-serif), serif", fontWeight: 700, fontSize: "clamp(28px,3vw,42px)", lineHeight: 1.05, letterSpacing: "-.015em" }}>
              Select your house type
            </h2>
          </div>

          <div style={{ width: "100%", background: "#ffffff", border: "1px solid rgba(17,28,73,.1)", borderRadius: 14, padding: 22, display: "flex", flexDirection: "column", gap: 18, boxShadow: "0 18px 40px -32px rgba(17,28,73,.5)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <strong style={{ fontSize: 14 }}>Choose your home</strong>
                <small style={{ fontSize: 12, color: "#5b5d62" }}>Low set and highset designs</small>
              </div>
              <span style={{ marginLeft: "auto", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#ab8742", border: "1px solid rgba(171,135,66,.35)", background: "rgba(171,135,66,.08)", borderRadius: 999, padding: "5px 11px", fontWeight: 600 }}>
                Complete
              </span>
            </div>

            <div role="radiogroup" aria-label="House type" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { id: "single" as const, label: "Low Set", count: LOW_COUNT, icon: "/images/colour-studio/icon-lowset.png" },
                { id: "two" as const, label: "Highset", count: HIGH_COUNT, icon: "/images/colour-studio/icon-highset.png" },
              ].map((t) => {
                const on = storySet === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => {
                      setStorySet(t.id);
                      const first = DESIGN_NAMES.find((n) => STORY_OF[n] === t.id);
                      if (first) setDesign(first);
                    }}
                    style={{
                      display: "flex", alignItems: "center", gap: 11, padding: "12px 13px", borderRadius: 11, textAlign: "left",
                      background: on ? "#f2e9d8" : "transparent", border: `1px solid ${on ? "#111c49" : "rgba(17,28,73,.18)"}`,
                    }}
                  >
                    <span style={{ flex: "none", width: 24, height: 24, position: "relative", display: "block", opacity: on ? 1 : 0.45 }}>
                      <Image src={t.icon} alt="" fill sizes="24px" style={{ objectFit: "contain" }} />
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <strong style={{ fontSize: 13, color: on ? "#111c49" : "#5b5d62" }}>{t.label}</strong>
                      <small style={{ fontSize: 11, color: "#5b5d62" }}>{t.count} designs</small>
                    </span>
                    <i style={{ marginLeft: "auto", width: 18, height: 18, borderRadius: 999, display: "grid", placeItems: "center", fontSize: 10, fontStyle: "normal", color: "#ffffff", background: on ? ACCENT : "transparent", border: `1px solid ${on ? "#111c49" : "rgba(17,28,73,.18)"}` }}>
                      {on ? "✓" : ""}
                    </i>
                  </button>
                );
              })}
            </div>

            <div role="radiogroup" aria-label="House design" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {visibleDesigns.map((name) => {
                const on = design === name;
                return (
                  <button
                    key={name}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => {
                      setDesign(name);
                      scrollToId("collection-options");
                    }}
                    style={{
                      padding: "9px 15px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, letterSpacing: ".01em",
                      background: on ? "#111c49" : "transparent", color: on ? "#ffffff" : "#5b5d62",
                      border: `1px solid ${on ? "#111c49" : "rgba(17,28,73,.18)"}`,
                    }}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", minHeight: 520, background: "#111c49", boxShadow: "0 40px 90px -60px rgba(17,28,73,.9)" }}>
          <Image aria-hidden src={scheme.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" style={{ objectFit: "cover", filter: "blur(26px) saturate(1.1)", opacity: 0.75 }} />
          <Image src={scheme.image} alt={`${scheme.name} exterior colour collection`} fill sizes="(min-width: 1024px) 50vw, 100vw" style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(17,28,73,.55) 0%,rgba(17,28,73,0) 34%,rgba(17,28,73,.82) 100%)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", padding: "18px 22px", fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.86)" }}>
            <span>02 · Select a collection</span>
            <span>Shown: Grand 210 display example</span>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, padding: "26px 24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, color: "#ffffff" }}>
              <small style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: ACCENT_ON_DARK }}>{scheme.tag}</small>
              <h2 style={{ margin: 0, fontFamily: "var(--font-serif), serif", fontWeight: 700, fontSize: 38, lineHeight: 1 }}>{scheme.name}</h2>
              <p style={{ margin: 0, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(255,255,255,.72)" }}>{scheme.tagline}</p>
            </div>
            <div aria-label="Collection colour palette" style={{ display: "flex", gap: 6, flex: "none" }}>
              {scheme.palette.map((c, i) => {
                const texture = SWATCH_TEXTURES[c];
                return (
                  <span key={i} style={{ position: "relative", width: 26, height: 44, borderRadius: 4, display: "block", overflow: "hidden", boxShadow: "0 0 0 1px rgba(255,255,255,.35)", background: texture ? undefined : c }}>
                    {texture && <Image src={texture} alt="" fill sizes="26px" style={{ objectFit: "cover" }} />}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 — choose collection */}
      <section id="collection-options" style={{ padding: "72px 40px", background: "#ffffff", borderBlock: "1px solid rgba(17,28,73,.1)" }}>
        <div style={{ maxWidth: 1560, margin: "0 auto", display: "flex", flexDirection: "column", gap: 34 }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,.72fr)", gap: 40, alignItems: "end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ display: "flex", alignItems: "center", gap: 12, margin: 0, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "#5b5d62" }}>
                <span style={{ padding: "4px 9px", background: "#111c49", color: "#ffffff", borderRadius: 3, fontWeight: 600 }}>02</span>
                Choose your collection
              </p>
              <h2 style={{ margin: 0, fontFamily: "var(--font-serif), serif", fontWeight: 700, fontSize: "clamp(30px,3.1vw,44px)", lineHeight: 1.05, letterSpacing: "-.015em" }}>
                Six complete design directions.
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: "#5b5d62" }}>
              Selecting a collection applies its complete schedule to your chosen home. Items marked with an asterisk apply where included in the selected house design.
            </p>
          </div>

          <div data-r="grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 20 }}>
            {SCHEMES.map((s) => {
              const on = s.id === schemeId;
              return (
                <article key={s.id} style={{ borderRadius: 15, overflow: "hidden", background: "#ffffff", border: `1px solid ${on ? ACCENT : "rgba(17,28,73,.1)"}`, boxShadow: on ? "0 26px 60px -40px rgba(17,28,73,.8)" : "none" }}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => { setSchemeId(s.id); setAreaIndex(0); scrollToId("package-details"); }}
                    style={{ all: "unset", cursor: "pointer", display: "block", width: "100%" }}
                  >
                    <span style={{ position: "relative", display: "block", aspectRatio: "16/10", overflow: "hidden", background: "#111c49" }}>
                      <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" style={{ objectFit: "cover" }} />
                      <span style={{ position: "absolute", top: 12, left: 12, padding: "5px 10px", borderRadius: 999, background: "rgba(17,28,73,.72)", color: "#ffffff", fontSize: 9.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>
                        {s.tag}
                      </span>
                      {on && (
                        <span style={{ position: "absolute", top: 12, right: 12, padding: "5px 11px", borderRadius: 999, background: ACCENT, color: "#fff", fontSize: 9.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>
                          ✓ Selected
                        </span>
                      )}
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: 12, padding: "18px 18px 20px" }}>
                      <span style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 14 }}>
                        <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                          <small style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#5b5d62" }}>{s.tagline}</small>
                          <strong style={{ fontFamily: "var(--font-serif), serif", fontWeight: 700, fontSize: 26, lineHeight: 1 }}>{s.name}</strong>
                        </span>
                        <span aria-hidden="true" style={{ display: "flex", gap: 3, flex: "none" }}>
                          {s.palette.map((c, i) => {
                            const texture = SWATCH_TEXTURES[c];
                            return (
                              <i key={i} style={{ position: "relative", width: 15, height: 15, borderRadius: 3, display: "block", overflow: "hidden", boxShadow: "inset 0 0 0 1px rgba(17,28,73,.14)", background: texture ? undefined : c }}>
                                {texture && <Image src={texture} alt="" fill sizes="15px" style={{ objectFit: "cover" }} />}
                              </i>
                            );
                          })}
                        </span>
                      </span>
                      <span style={{ fontSize: 13, lineHeight: 1.55, color: "#5b5d62" }}>{s.desc}</span>
                      <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, paddingTop: 12, borderTop: "1px solid rgba(17,28,73,.1)", fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: on ? ACCENT : "#5b5d62" }}>
                        {on ? "Current collection" : "Select collection"}
                        <i style={{ fontStyle: "normal" }}>→</i>
                      </span>
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Step 3 — room-by-room package */}
      <section id="package-details" style={{ padding: "72px 40px" }}>
        <div style={{ maxWidth: 1560, margin: "0 auto", display: "flex", flexDirection: "column", gap: 34 }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,.6fr)", gap: 40, alignItems: "end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ display: "flex", alignItems: "center", gap: 12, margin: 0, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "#5b5d62" }}>
                <span style={{ padding: "4px 9px", background: "#111c49", color: "#ffffff", borderRadius: 3, fontWeight: 600 }}>03</span>
                Explore your package
              </p>
              <h2 style={{ margin: 0, fontFamily: "var(--font-serif), serif", fontWeight: 700, fontSize: "clamp(30px,3.1vw,44px)", lineHeight: 1.05, letterSpacing: "-.015em" }}>
                The {scheme.name} <span style={{ color: "#111c49" }}>collection</span>
                <em style={{ display: "block", fontStyle: "italic", color: ACCENT }}>room by room.</em>
              </h2>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "16px 18px", borderRadius: 12, background: "rgba(17,28,73,.05)", border: "1px solid rgba(17,28,73,.16)" }}>
              <span aria-hidden="true" style={{ fontSize: 13, lineHeight: 1.3, color: ACCENT }}>◆</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <strong style={{ fontSize: 12.5 }}>Pre-set collection</strong>
                <small style={{ fontSize: 12, lineHeight: 1.5, color: "#5b5d62" }}>Every finish changes together when you select another collection.</small>
              </div>
            </div>
          </div>

          <div data-r="board" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(0,0.525fr)", gap: 28, alignItems: "stretch" }}>
            <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", minHeight: 460, background: "#111c49" }}>
              <Image src={scheme.image} alt={`${scheme.name} palette`} fill sizes="(min-width: 1024px) 45vw, 100vw" style={{ objectFit: "cover" }} />
              <span style={{ position: "absolute", bottom: 16, left: 16, padding: "8px 16px", borderRadius: 999, background: "rgba(255,255,255,.92)", fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" }}>
                {scheme.name}
              </span>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid rgba(17,28,73,.1)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
              <div role="tablist" aria-label="Package areas" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {AREAS.map((a, i) => {
                  const on = i === areaIndex;
                  return (
                    <button
                      key={a.key}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setAreaIndex(i)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 10px", borderRadius: 10, fontSize: 12.5, fontWeight: 600,
                        background: on ? "#111c49" : "transparent", color: on ? "#ffffff" : "#5b5d62", border: `1px solid ${on ? "#111c49" : "rgba(17,28,73,.16)"}`,
                      }}
                    >
                      <span style={{ fontSize: 10, letterSpacing: ".08em", opacity: 0.6 }}>{a.n}</span>
                      {a.label}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <small style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: ACCENT }}>{area.eyebrow}</small>
                <h3 style={{ margin: 0, fontFamily: "var(--font-serif), serif", fontWeight: 700, fontSize: 26, lineHeight: 1.1 }}>{area.title}</h3>
                <p style={{ margin: 0, fontSize: 12.5, color: "#5b5d62" }}>Included in the {scheme.name} collection for {design}.</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {rows.map((r) => (
                  <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 0", borderTop: "1px solid rgba(17,28,73,.09)" }}>
                    <span style={{ flex: "none", width: 34, height: 34, borderRadius: 7, display: "block", boxShadow: "inset 0 0 0 1px rgba(17,28,73,.16)", background: r.hex }} />
                    <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                      <small style={{ fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#5b5d62" }}>{r.label}</small>
                      <strong style={{ fontSize: 13.5, fontWeight: 600 }}>{r.name}</strong>
                    </span>
                    <span style={{ marginLeft: "auto", flex: "none", fontSize: 9.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#ab8742" }}>Included</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 12, paddingTop: 18, borderTop: "1px solid rgba(17,28,73,.1)" }}>
                <button
                  type="button"
                  onClick={() => scrollToId("confirm")}
                  style={{ background: "transparent", border: "1px solid #111c49", color: "#111c49", borderRadius: 999, padding: "11px 20px", fontSize: 11.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}
                >
                  View full schedule
                </button>
                <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    aria-label="Previous area"
                    onClick={() => setAreaIndex((i) => (i + AREAS.length - 1) % AREAS.length)}
                    style={{ width: 38, height: 38, borderRadius: 999, border: "1px solid rgba(17,28,73,.2)", background: "transparent", fontSize: 14 }}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label="Next area"
                    onClick={() => setAreaIndex((i) => (i + 1) % AREAS.length)}
                    style={{ width: 38, height: 38, borderRadius: 999, border: "1px solid rgba(17,28,73,.2)", background: "transparent", fontSize: 14 }}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 4 — confirm */}
      <section id="confirm" style={{ padding: "0 40px 72px" }}>
        <div data-r="confirm" style={{ maxWidth: 1560, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,.85fr)", gap: 0, borderRadius: 18, overflow: "hidden", background: "#111c49", color: "#ffffff" }}>
          <div style={{ padding: 44, display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ display: "flex", gap: 6 }}>
              {scheme.palette.map((c, i) => (
                <span key={i} style={{ width: 34, height: 34, borderRadius: 5, display: "block", boxShadow: "0 0 0 1px rgba(255,255,255,.3)", background: c }} />
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
              <p style={{ display: "flex", alignItems: "center", gap: 12, margin: 0, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.6)" }}>
                <span style={{ padding: "4px 9px", color: "#fff", borderRadius: 3, fontWeight: 600, background: ACCENT }}>04</span>
                Your complete selection
              </p>
              <h2 style={{ margin: 0, fontFamily: "var(--font-serif), serif", fontWeight: 700, fontSize: "clamp(28px,2.8vw,40px)", lineHeight: 1.08 }}>
                Happy with the {scheme.name} collection?
              </h2>
              <p style={{ margin: 0, maxWidth: "46ch", fontSize: 14.5, lineHeight: 1.6, color: "rgba(255,255,255,.7)" }}>
                Review the complete schedule for your {design}, or send your preferred collection to the AHC team.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, paddingTop: 6 }}>
                <button
                  type="button"
                  onClick={() => scrollToId("package-details")}
                  style={{ color: "#fff", border: "none", borderRadius: 999, padding: "14px 24px", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: ACCENT }}
                >
                  Review complete schedule
                </button>
                <a
                  href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Colour Selection — ${design} (${scheme.name})`)}&body=${mailBody}`}
                  style={{ display: "inline-flex", alignItems: "center", background: "#ffffff", color: "#111c49", border: "none", borderRadius: 999, padding: "14px 24px", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}
                >
                  Send selection to AHC
                </a>
              </div>
            </div>
          </div>
          <div style={{ position: "relative", minHeight: 380 }}>
            <Image src={scheme.image} alt={`${scheme.name} collection`} fill sizes="(min-width: 1024px) 42vw, 100vw" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: 32, alignItems: "center", padding: "28px 40px 44px", maxWidth: 1560, margin: "0 auto" }}>
        <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.6, color: "#5b5d62", maxWidth: "88ch" }}>
          Images may show upgrades not included in the contract price. Colours shown on screen are indicative only; confirm against physical samples and final contract documentation.
        </p>
        <a href="#poster" style={{ fontSize: 11.5, letterSpacing: ".06em" }}>Back to top ↑</a>
      </footer>

      {/* Sticky summary bar */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 25, display: "flex", alignItems: "center", gap: 16, padding: "12px 24px", background: "rgba(17,28,73,.94)", backdropFilter: "blur(12px)", color: "#ffffff" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <small style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.6)" }}>{design}</small>
          <strong style={{ fontSize: 13, fontWeight: 600 }}>{scheme.name} Collection</strong>
        </span>
        <button
          type="button"
          onClick={() => scrollToId("confirm")}
          style={{ marginLeft: "auto", color: "#fff", border: "none", borderRadius: 999, padding: "10px 20px", fontSize: 11.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: ACCENT }}
        >
          Review
        </button>
      </div>
    </div>
  );
}
