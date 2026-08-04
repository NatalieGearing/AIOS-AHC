"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import {
  HOUSES,
  EXTRA_CATS,
  EXTRAS,
  PACKAGES,
  SITE_COST,
  AUD,
} from "@/lib/estimator-data";
import {
  EXTERNAL_SELECTIONS,
  INTERNAL_SELECTIONS,
  type ColourSelection,
} from "@/lib/colours";

type Colour = ColourSelection & { custom?: boolean };

const EXTERIOR_COLOURS: Colour[] = [
  ...EXTERNAL_SELECTIONS,
  {
    name: "Custom Colours",
    image: "",
    tagline: "Your palette, your way.",
    description: "Work with your design consultant on a fully bespoke exterior palette.",
    palette: ["#B8782A", "#C8B89A", "#6B5C45", "#1C1A17"],
    custom: true,
  },
];

const INTERIOR_COLOURS: Colour[] = [
  ...INTERNAL_SELECTIONS,
  {
    name: "Custom Colours",
    image: "",
    tagline: "Your palette, your way.",
    description: "Work with your design consultant on a fully bespoke interior palette.",
    palette: ["#C8A878", "#8B6F47", "#4A3A30", "#1A1A1A"],
    custom: true,
  },
];

type QuoteForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
};

export default function BuildCostEstimator() {
  const [houseId, setHouseId] = useState<string | null>(null);
  const [extraIds, setExtraIds] = useState<string[]>([]);
  const [pkgId, setPkgId] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState<string>(EXTRA_CATS[0]);
  const [extColourId, setExtColourId] = useState<string | null>(null);
  const [intColourId, setIntColourId] = useState<string | null>(null);
  const [modalId, setModalId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; key: number } | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState<QuoteForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [quoteErr, setQuoteErr] = useState<string | null>(null);
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);

  const house = HOUSES.find((h) => h.id === houseId) || null;
  const pkg = PACKAGES.find((p) => p.id === pkgId) || null;
  const extras = EXTRAS.filter((e) => extraIds.includes(e.id));
  const extColour = EXTERIOR_COLOURS.find((c) => c.name === extColourId) || null;
  const intColour = INTERIOR_COLOURS.find((c) => c.name === intColourId) || null;
  const modalHouse = HOUSES.find((h) => h.id === modalId) || null;

  const visibleExtras = EXTRAS.filter((e) => e.cat === activeCat);

  const extrasCost = extras.reduce((s, e) => s + e.price, 0);
  const pkgCost = pkg?.price ?? 0;
  const baseCost = house?.price ?? 0;
  const total = useMemo(
    () => (house ? baseCost + extrasCost + pkgCost + SITE_COST : 0),
    [house, baseCost, extrasCost, pkgCost],
  );

  const showToast = (msg: string) => setToast({ msg, key: Date.now() });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const selectHouse = (id: string) => {
    setHouseId(id);
    const h = HOUSES.find((x) => x.id === id);
    if (h) showToast(`${h.name} added to your build`);
    scrollToSection("step-packages");
  };

  const toggleExtra = (id: string) => {
    setExtraIds((prev) => {
      if (prev.includes(id)) {
        showToast("Removed from your build");
        return prev.filter((x) => x !== id);
      }
      const e = EXTRAS.find((x) => x.id === id);
      if (e) showToast(`${e.name} added`);
      return [...prev, id];
    });
  };

  const selectPackage = (id: string) => {
    setPkgId(id);
    const p = PACKAGES.find((x) => x.id === id);
    if (p) showToast(`${p.name} selected`);
    scrollToSection("step-extras");
  };

  const selectExtColour = (name: string) => {
    setExtColourId(name);
    showToast(`${name} exterior selected`);
    scrollToSection("interior-scheme");
  };

  const selectIntColour = (name: string) => {
    setIntColourId(name);
    showToast(`${name} interior selected`);
    scrollToSection("step-summary");
  };

  const cartCount =
    (house ? 1 : 0) + extras.length + (pkg ? 1 : 0) + (extColour ? 1 : 0) + (intColour ? 1 : 0);

  const buildSummaryLines = (): string[] => {
    if (!house) return [];
    const lines: string[] = [];
    lines.push("AFFORDABLE HOUSE CORP — BUILD COST ESTIMATE");
    lines.push("QBCC 15445963 | Brisbane, Queensland");
    lines.push("Generated: " + new Date().toLocaleString("en-AU"));
    lines.push("=".repeat(52));
    lines.push("");
    lines.push("BASE DESIGN");
    lines.push(`  ${house.name} (${house.series}) — ${house.beds} · ${house.area}m²`);
    lines.push(`  ${AUD(house.price)}`);
    lines.push("");
    lines.push("EXTRAS & UPGRADES");
    if (extras.length) extras.forEach((e) => lines.push(`  + ${e.name} — ${AUD(e.price)}`));
    else lines.push("  (none selected)");
    lines.push("");
    lines.push("TURNKEY PACKAGE");
    lines.push(
      pkg ? `  ${pkg.name} — ${pkg.price === 0 ? "Included" : "+" + AUD(pkg.price)}` : "  (none selected)",
    );
    lines.push("");
    lines.push("COLOUR SELECTIONS");
    lines.push(`  Exterior: ${extColour ? extColour.name : "(none selected)"}`);
    lines.push(`  Interior: ${intColour ? intColour.name : "(none selected)"}`);
    lines.push("");
    lines.push(`SITE & APPROVALS (EST.) — ${AUD(SITE_COST)}`);
    lines.push("=".repeat(52));
    lines.push(`ESTIMATED TOTAL: ${AUD(total)}`);
    lines.push("");
    lines.push("Estimate only. Excludes land & stamp duty. Formal quote provided by your consultant.");
    return lines;
  };

  const requestQuote = () => {
    if (!house) {
      showToast("Please select a base design first");
      return;
    }
    setQuoteErr(null);
    setQuoteSent(false);
    setQuoteOpen(true);
  };

  const buildSummaryDoc = async (opts?: { includeContact?: boolean; title?: string }) => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const marginX = 48;
    let y = 56;

    const line = (
      text: string,
      o?: { size?: number; bold?: boolean; color?: [number, number, number]; gap?: number },
    ) => {
      const size = o?.size ?? 10;
      doc.setFontSize(size);
      doc.setFont("helvetica", o?.bold ? "bold" : "normal");
      const [r, g, b] = o?.color ?? [40, 36, 30];
      doc.setTextColor(r, g, b);
      const wrapped = doc.splitTextToSize(text, pageW - marginX * 2) as string[];
      wrapped.forEach((w) => {
        if (y > doc.internal.pageSize.getHeight() - 60) {
          doc.addPage();
          y = 56;
        }
        doc.text(w, marginX, y);
        y += size + (o?.gap ?? 4);
      });
    };
    const rule = () => {
      doc.setDrawColor(4, 17, 70);
      doc.setLineWidth(1);
      doc.line(marginX, y, pageW - marginX, y);
      y += 14;
    };

    const loadImage = (url: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const im = new window.Image();
        im.crossOrigin = "anonymous";
        im.onload = () => resolve(im);
        im.onerror = reject;
        im.src = url;
      });

    line("Affordable House Corp", { size: 20, bold: true, color: [4, 17, 70] });
    line(opts?.title ?? "Your Build Summary", { size: 12, color: [249, 125, 27] });
    line("QBCC 15445963  ·  Brisbane, Queensland", { size: 9, color: [103, 103, 106] });
    line("Generated: " + new Date().toLocaleString("en-AU"), { size: 9, color: [103, 103, 106], gap: 10 });

    try {
      const im = await loadImage(house!.image);
      const maxW = pageW - marginX * 2;
      const ratio = im.naturalHeight / im.naturalWidth || 0.66;
      let w = maxW;
      let h = w * ratio;
      const maxH = 240;
      if (h > maxH) {
        h = maxH;
        w = h / ratio;
      }
      const x = marginX + (maxW - w) / 2;
      if (y + h > doc.internal.pageSize.getHeight() - 60) {
        doc.addPage();
        y = 56;
      }
      doc.addImage(im, "PNG", x, y, w, h);
      y += h + 14;
    } catch {
      // Skip the image if it fails to load; the rest of the summary still renders.
    }

    rule();

    if (opts?.includeContact) {
      line("Contact Details", { size: 13, bold: true, color: [4, 17, 70], gap: 8 });
      line(`Name: ${quoteForm.name}`);
      line(`Email: ${quoteForm.email}`);
      line(`Phone: ${quoteForm.phone || "Not provided"}`);
      line(`Project / land address: ${quoteForm.address || "Not provided"}`);
      line(`Notes: ${quoteForm.notes || "—"}`, { gap: 10 });
      rule();
    }

    line("Your Build Summary", { size: 13, bold: true, color: [4, 17, 70], gap: 8 });
    line(`Base design: ${house!.name} (${house!.series}) — ${house!.beds} · ${house!.area}m²`);
    line(`Base price: ${AUD(baseCost)}`, { gap: 10 });

    line("Extras & upgrades", { size: 11, bold: true });
    if (extras.length) extras.forEach((e) => line(`+ ${e.name} — ${AUD(e.price)}`));
    else line("(none selected)");
    line("", { gap: 0 });

    line("Turnkey package", { size: 11, bold: true });
    line(pkg ? `${pkg.name} — ${pkg.price === 0 ? "Included" : "+" + AUD(pkg.price)}` : "(none selected)");
    line("", { gap: 0 });

    line("Colour selections", { size: 11, bold: true });
    line(`Exterior: ${extColour ? extColour.name : "(none selected)"}`);
    line(`Interior: ${intColour ? intColour.name : "(none selected)"}`, { gap: 10 });

    line(`Site & approvals (est.): ${AUD(SITE_COST)}`);
    y += 6;
    rule();
    line(`Estimated Total: ${AUD(total)}`, { size: 15, bold: true, color: [249, 125, 27], gap: 12 });

    line(
      "Estimate only. Excludes land, stamp duty & landscaping. A formal quote will be provided by your AHC consultant.",
      { size: 8, color: [103, 103, 106] },
    );

    return doc;
  };

  const submitQuote = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!house) return;
    if (!quoteForm.name.trim() || !quoteForm.email.trim()) {
      setQuoteErr("Please enter your name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quoteForm.email.trim())) {
      setQuoteErr("Please enter a valid email address.");
      return;
    }
    setQuoteErr(null);
    setQuoteSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quoteForm.name.trim(),
          email: quoteForm.email.trim(),
          phone: quoteForm.phone.trim() || null,
          propertyType: house.series,
          message:
            `Formal quote request from the Build Cost Estimator.\n\n` +
            `Project / land address: ${quoteForm.address.trim() || "Not provided"}\n` +
            `Notes: ${quoteForm.notes.trim() || "None"}\n\n` +
            buildSummaryLines().join("\n"),
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setQuoteSent(true);
      showToast("Quote request sent! A consultant will be in touch shortly.");
    } catch {
      setQuoteErr("Something went wrong sending your request. Please try again.");
    } finally {
      setQuoteSubmitting(false);
    }
  };

  const exportEstimate = async () => {
    if (!house) return;
    try {
      const doc = await buildSummaryDoc({ title: "Your Build Summary" });
      doc.save("AHC-build-summary.pdf");
    } catch {
      showToast("Could not generate the PDF. Please try again.");
    }
  };

  return (
    <div>
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          {/* STEP 1 — DESIGN */}
          <Section num={1} title="Choose your home design" sub="Select a base design to start your build. Click any design to view full details.">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {HOUSES.map((h) => {
                const selected = houseId === h.id;
                return (
                  <div
                    key={h.id}
                    onClick={() => setModalId(h.id)}
                    className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
                      selected ? "border-brand-orange ring-4 ring-brand-orange/15" : "border-transparent"
                    }`}
                  >
                    {selected && (
                      <span className="absolute right-3 top-3 z-10 rounded-full bg-brand-orange px-3 py-1 text-xs font-semibold text-white">
                        Selected
                      </span>
                    )}
                    <div className="relative h-44 w-full bg-brand-gray-light">
                      <Image src={h.image} alt={h.name} fill sizes="400px" className="object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="font-serif text-lg font-bold text-brand-navy">{h.name}</div>
                      <div className="mb-3 text-xs text-brand-gray">
                        {h.series}
                        {h.tag ? (
                          <>
                            {" · "}
                            <em className="text-brand-orange not-italic">{h.tag}</em>
                          </>
                        ) : null}
                      </div>
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-brand-gray-light px-2.5 py-1 text-xs text-brand-navy">
                          {h.area}m²
                        </span>
                        <span className="rounded-full bg-brand-gray-light px-2.5 py-1 text-xs text-brand-navy">
                          {h.rooms}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-[11px] text-brand-gray">From</div>
                          <div className="text-xl font-bold text-brand-navy">{AUD(h.price)}</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`mt-3 w-full rounded-md border py-2 text-sm font-semibold transition-colors ${
                          selected
                            ? "border-brand-orange bg-brand-orange text-white"
                            : "border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                        }`}
                      >
                        {selected ? "Selected" : "View & Select"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* STEP 2 — PACKAGES */}
          <Section num={2} id="step-packages" title="Turnkey inclusion package" sub="Our all-in packages take the guesswork out — every finish, fixture and fitting handled.">
            <div className="grid gap-6 sm:grid-cols-3">
              {PACKAGES.map((p) => {
                const selected = pkgId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => selectPackage(p.id)}
                    className={`relative cursor-pointer rounded-xl border-2 p-6 transition-colors ${
                      selected
                        ? "border-brand-orange bg-brand-orange/5"
                        : "border-brand-gray-light bg-white hover:border-brand-gray"
                    }`}
                  >
                    {p.popular && (
                      <span className="absolute right-4 top-4 rounded-full bg-brand-orange px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                        Most Popular
                      </span>
                    )}
                    <div className="mb-3 text-3xl">{p.icon}</div>
                    <div className="font-serif text-xl font-bold text-brand-navy">{p.name}</div>
                    <p className="mt-1.5 text-sm leading-relaxed text-brand-gray">{p.description}</p>
                    <ul className="mt-4 space-y-1.5">
                      {p.includes.map((i) => (
                        <li key={i} className="flex gap-2 text-xs text-brand-navy/80">
                          <span className="text-brand-orange">✓</span>
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-[11px] text-brand-gray">Package price</div>
                    <div className="text-xl font-bold text-brand-navy">
                      {p.price === 0 ? "Included" : "+" + AUD(p.price)}
                    </div>
                    <button
                      type="button"
                      className={`mt-4 w-full rounded-md border py-2.5 text-sm font-semibold transition-colors ${
                        selected
                          ? "border-brand-orange bg-brand-orange text-white"
                          : "border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                      }`}
                    >
                      {selected ? "Selected" : "Select Package"}
                    </button>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* STEP 3 — EXTRAS */}
          <Section num={3} id="step-extras" title="Optional extras & upgrades" sub="Add to your home — everything is priced transparently. Remove any time.">
            <div className="mb-6 flex flex-wrap gap-2">
              {EXTRA_CATS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setActiveCat(c)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    c === activeCat
                      ? "border-brand-navy bg-brand-navy text-white"
                      : "border-brand-gray-light text-brand-gray hover:border-brand-gray"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visibleExtras.map((e) => {
                const inCart = extraIds.includes(e.id);
                return (
                  <div
                    key={e.id}
                    onClick={() => toggleExtra(e.id)}
                    className={`relative cursor-pointer rounded-xl border-2 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                      inCart ? "border-brand-orange" : "border-transparent"
                    }`}
                  >
                    {inCart && (
                      <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-orange text-xs font-bold text-white">
                        ✓
                      </span>
                    )}
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-brand-cream text-xl">
                      {e.icon}
                    </div>
                    <div className="text-sm font-semibold text-brand-navy">{e.name}</div>
                    <div className="mt-1 text-xs leading-relaxed text-brand-gray">{e.description}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-base font-semibold text-brand-orange">+{AUD(e.price)}</div>
                      <button
                        type="button"
                        className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                          inCart
                            ? "border-brand-orange bg-brand-orange text-white"
                            : "border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                        }`}
                      >
                        {inCart ? "Added" : "+ Add"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* STEP 4 — COLOURS */}
          <Section num={4} title="Colour selections" sub="Choose a curated exterior and interior scheme — or go bespoke with custom colours tailored to your vision.">
            <h3 className="mb-4 ml-11 font-serif text-lg text-brand-navy">Exterior scheme</h3>
            <div className="mb-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {EXTERIOR_COLOURS.map((c) => (
                <ColourCard
                  key={c.name}
                  colour={c}
                  selected={extColourId === c.name}
                  onSelect={() => selectExtColour(c.name)}
                />
              ))}
            </div>

            <h3 id="interior-scheme" className="mb-4 ml-11 scroll-mt-24 font-serif text-lg text-brand-navy">
              Interior scheme
            </h3>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {INTERIOR_COLOURS.map((c) => (
                <ColourCard
                  key={c.name}
                  colour={c}
                  selected={intColourId === c.name}
                  onSelect={() => selectIntColour(c.name)}
                />
              ))}
            </div>
          </Section>

          {/* STEP 5 — SUMMARY */}
          <Section num={5} id="step-summary" title="Your build summary" sub="A transparent breakdown of everything in your build.">
            <div className="overflow-x-auto rounded-xl border border-brand-gray-light bg-white">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-brand-gray-light text-left text-xs uppercase tracking-wide text-brand-gray">
                    <th className="px-4 py-3 font-semibold">Item</th>
                    <th className="px-4 py-3 font-semibold">Details</th>
                    <th className="px-4 py-3 text-right font-semibold">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {!house ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-10 text-center text-brand-gray">
                        Select a home design to begin your build summary.
                      </td>
                    </tr>
                  ) : (
                    <>
                      <tr className="border-b border-brand-gray-light">
                        <td className="px-4 py-3 text-brand-navy">Base build — {house.name}</td>
                        <td className="px-4 py-3 text-brand-gray">
                          {house.area}m² · {house.beds}
                        </td>
                        <td className="px-4 py-3 text-right text-brand-navy">{AUD(house.price)}</td>
                      </tr>
                      {extras.map((e) => (
                        <tr key={e.id} className="border-b border-brand-gray-light">
                          <td className="px-4 py-3 text-brand-navy">{e.name}</td>
                          <td className="px-4 py-3 text-brand-gray">{e.description}</td>
                          <td className="px-4 py-3 text-right text-brand-navy">+{AUD(e.price)}</td>
                        </tr>
                      ))}
                      {pkg && (
                        <tr className="border-b border-brand-gray-light">
                          <td className="px-4 py-3 text-brand-navy">Turnkey — {pkg.name}</td>
                          <td className="px-4 py-3 text-brand-gray">{pkg.includes.slice(0, 2).join(", ")}…</td>
                          <td className="px-4 py-3 text-right text-brand-navy">
                            {pkg.price === 0 ? "Included" : "+" + AUD(pkg.price)}
                          </td>
                        </tr>
                      )}
                      {extColour && (
                        <tr className="border-b border-brand-gray-light">
                          <td className="px-4 py-3 text-brand-navy">Exterior colour — {extColour.name}</td>
                          <td className="px-4 py-3 text-brand-gray">{extColour.tagline}</td>
                          <td className="px-4 py-3 text-right text-brand-navy">Included</td>
                        </tr>
                      )}
                      {intColour && (
                        <tr className="border-b border-brand-gray-light">
                          <td className="px-4 py-3 text-brand-navy">Interior colour — {intColour.name}</td>
                          <td className="px-4 py-3 text-brand-gray">{intColour.tagline}</td>
                          <td className="px-4 py-3 text-right text-brand-navy">Included</td>
                        </tr>
                      )}
                      <tr className="border-b border-brand-gray-light">
                        <td className="px-4 py-3 text-brand-navy">Site costs (est.)</td>
                        <td className="px-4 py-3 text-brand-gray">Site works, connections, approvals</td>
                        <td className="px-4 py-3 text-right text-brand-navy">+{AUD(SITE_COST)}</td>
                      </tr>
                      <tr className="bg-brand-orange/10 font-semibold">
                        <td className="px-4 py-3 text-brand-navy">Total estimated build</td>
                        <td className="px-4 py-3 text-brand-gray">Indicative only — excludes land</td>
                        <td className="px-4 py-3 text-right text-brand-orange">{AUD(total)}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </Section>
        </div>

        {/* CART — starts level with the house cards, sticks with the page as you scroll through every step */}
        <div className="sticky top-24 overflow-hidden rounded-2xl bg-white shadow-lg lg:mt-[86px]">
          <div className="bg-brand-navy px-6 py-5 text-white">
            <h3 className="font-serif text-lg">Your Build Cart</h3>
            <p className="mt-1 text-xs text-white/60">
              {house
                ? house.name + (extras.length ? ` + ${extras.length} extra${extras.length > 1 ? "s" : ""}` : "")
                : "Nothing selected yet"}
              {cartCount > 0 ? ` · ${cartCount} item${cartCount > 1 ? "s" : ""}` : ""}
            </p>
          </div>
          <div className="max-h-[calc(100vh-360px)] overflow-y-auto px-6 py-5">
            {!house ? (
              <div className="py-10 text-center text-sm leading-relaxed text-brand-gray">
                <div className="mb-3 text-4xl">🏠</div>
                Start by selecting a
                <br />
                home design above
              </div>
            ) : (
              <>
                <CartSectionTitle>Base Design</CartSectionTitle>
                <CartItem
                  emoji="🏠"
                  name={house.name}
                  price={AUD(house.price)}
                  onRemove={() => setHouseId(null)}
                />

                {extras.length > 0 && (
                  <>
                    <CartSectionTitle>Extras &amp; Upgrades</CartSectionTitle>
                    {extras.map((e) => (
                      <CartItem
                        key={e.id}
                        emoji={e.icon}
                        name={e.name}
                        price={"+" + AUD(e.price)}
                        onRemove={() => toggleExtra(e.id)}
                      />
                    ))}
                  </>
                )}

                {pkg && (
                  <>
                    <CartSectionTitle>Turnkey Package</CartSectionTitle>
                    <CartItem
                      emoji={pkg.icon}
                      name={pkg.name}
                      price={pkg.price === 0 ? "Included" : "+" + AUD(pkg.price)}
                      onRemove={() => setPkgId(null)}
                    />
                  </>
                )}

                {(extColour || intColour) && (
                  <>
                    <CartSectionTitle>Colour Selections</CartSectionTitle>
                    {extColour && (
                      <CartItem
                        emoji="🎨"
                        name={"Exterior — " + extColour.name}
                        price="Included"
                        onRemove={() => setExtColourId(null)}
                      />
                    )}
                    {intColour && (
                      <CartItem
                        emoji="🛋️"
                        name={"Interior — " + intColour.name}
                        price="Included"
                        onRemove={() => setIntColourId(null)}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
          {house && (
            <div className="border-t border-brand-gray-light px-6 py-5">
              <CartLine label="Base build" value={AUD(baseCost)} />
              <CartLine label="Extras & upgrades" value={extrasCost > 0 ? AUD(extrasCost) : "—"} />
              <CartLine label="Turnkey package" value={pkg ? (pkgCost === 0 ? "Included" : AUD(pkgCost)) : "—"} />
              <CartLine label="Site & approvals est." value={AUD(SITE_COST)} />
              <div className="mt-3 flex items-center justify-between border-t-2 border-brand-navy pt-3 text-lg font-semibold text-brand-navy">
                <span>Total estimate</span>
                <span className="text-brand-orange">{AUD(total)}</span>
              </div>
              <button
                type="button"
                onClick={requestQuote}
                className="mt-4 w-full rounded-md bg-brand-orange py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90"
              >
                Request a formal quote →
              </button>
              <button
                type="button"
                onClick={exportEstimate}
                className="mt-2.5 w-full rounded-md border border-brand-navy py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
              >
                ⬇ Export estimate
              </button>
              <p className="mt-3 text-center text-[11px] leading-relaxed text-brand-gray">
                Estimate only. Excludes land, stamp duty &amp; landscaping. Formal quote provided by your
                consultant.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* HOUSE MODAL */}
      {modalHouse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/75 p-6"
          onClick={() => setModalId(null)}
        >
          <div
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(ev) => ev.stopPropagation()}
          >
            <div className="relative h-72 w-full bg-brand-gray-light">
              <Image src={modalHouse.image} alt={modalHouse.name} fill sizes="700px" className="object-cover" />
            </div>
            <div className="p-8">
              <div className="font-serif text-2xl font-bold text-brand-navy">{modalHouse.name}</div>
              <div className="mt-1.5 mb-5 text-sm text-brand-gray">
                {modalHouse.series} · {modalHouse.area}m²
                {modalHouse.tag ? ` · ${modalHouse.tag}` : ""}
              </div>
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-brand-gray-light px-4 py-1.5 text-sm text-brand-navy">
                  {modalHouse.area} m²
                </span>
                <span className="rounded-full bg-brand-gray-light px-4 py-1.5 text-sm text-brand-navy">
                  {modalHouse.rooms}
                </span>
                <span className="rounded-full bg-brand-gray-light px-4 py-1.5 text-sm text-brand-navy">
                  {modalHouse.series}
                </span>
              </div>
              <p className="mb-6 text-sm leading-loose text-brand-navy/80">{modalHouse.description}</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalId(null)}
                  className="flex-none rounded-md border border-brand-gray-light px-5 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gray"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    selectHouse(modalHouse.id);
                    setModalId(null);
                  }}
                  className="flex-1 rounded-md bg-brand-orange py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90"
                >
                  {houseId === modalHouse.id ? "Already Selected" : `Select This Design — ${AUD(modalHouse.price)}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUOTE MODAL */}
      {quoteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/75 p-6"
          onClick={() => !quoteSubmitting && setQuoteOpen(false)}
        >
          <div
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"
            onClick={(ev) => ev.stopPropagation()}
          >
            {quoteSent ? (
              <div className="py-6 text-center">
                <div className="mb-3 text-4xl">✓</div>
                <div className="font-serif text-xl font-bold text-brand-navy">Quote request sent</div>
                <p className="mt-2 text-sm text-brand-gray">
                  Thanks — a consultant will be in touch shortly with your formal quote.
                </p>
                <button
                  type="button"
                  onClick={() => setQuoteOpen(false)}
                  className="mt-6 rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-white hover:bg-brand-orange/90"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="font-serif text-xl font-bold text-brand-navy">Request a formal quote</div>
                <p className="mt-2 text-sm text-brand-gray">
                  Share your details and we&apos;ll pass your build summary to our team. A consultant will
                  prepare your formal quote and be in touch shortly.
                </p>
                <form className="mt-6 space-y-4" onSubmit={submitQuote}>
                  <Field label="Full name *">
                    <input
                      type="text"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Jane Smith"
                      required
                      className="w-full rounded-md border border-brand-gray-light px-3 py-2 text-brand-navy focus:border-brand-orange focus:outline-none"
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Email *">
                      <input
                        type="email"
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="jane@example.com"
                        required
                        className="w-full rounded-md border border-brand-gray-light px-3 py-2 text-brand-navy focus:border-brand-orange focus:outline-none"
                      />
                    </Field>
                    <Field label="Phone">
                      <input
                        type="tel"
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="0400 000 000"
                        className="w-full rounded-md border border-brand-gray-light px-3 py-2 text-brand-navy focus:border-brand-orange focus:outline-none"
                      />
                    </Field>
                  </div>
                  <Field label="Project / land address">
                    <input
                      type="text"
                      value={quoteForm.address}
                      onChange={(e) => setQuoteForm((f) => ({ ...f, address: e.target.value }))}
                      placeholder="Suburb or block address (optional)"
                      className="w-full rounded-md border border-brand-gray-light px-3 py-2 text-brand-navy focus:border-brand-orange focus:outline-none"
                    />
                  </Field>
                  <Field label="Notes">
                    <textarea
                      rows={3}
                      value={quoteForm.notes}
                      onChange={(e) => setQuoteForm((f) => ({ ...f, notes: e.target.value }))}
                      placeholder="Anything else we should know? (optional)"
                      className="w-full rounded-md border border-brand-gray-light px-3 py-2 text-brand-navy focus:border-brand-orange focus:outline-none"
                    />
                  </Field>
                  {quoteErr && <p className="text-sm text-red-600">{quoteErr}</p>}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setQuoteOpen(false)}
                      disabled={quoteSubmitting}
                      className="flex-none rounded-md border border-brand-gray-light px-5 py-3 text-sm font-semibold text-brand-navy disabled:opacity-60"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={quoteSubmitting}
                      className="flex-1 rounded-md bg-brand-orange py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange/90 disabled:opacity-60"
                    >
                      {quoteSubmitting ? "Sending…" : "Send quote request →"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* TOAST */}
      <div className="fixed bottom-8 left-1/2 z-[999] -translate-x-1/2" aria-live="polite" role="status">
        {toast && (
          <div
            key={toast.key}
            className="animate-fade-in-up rounded-full bg-brand-navy px-6 py-3 text-sm text-white shadow-lg"
          >
            {toast.msg}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({ num, title, sub }: { num: number; title: string; sub: string }) {
  return (
    <>
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
          {num}
        </div>
        <h2 className="font-serif text-2xl font-bold text-brand-navy">{title}</h2>
      </div>
      <p className="mb-6 ml-11 text-sm text-brand-gray">{sub}</p>
    </>
  );
}

function Section({
  num,
  title,
  sub,
  id,
  children,
}: {
  num: number;
  title: string;
  sub: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="mb-14 scroll-mt-24">
      <SectionHeader num={num} title={title} sub={sub} />
      {children}
    </div>
  );
}

function ColourCard({
  colour,
  selected,
  onSelect,
}: {
  colour: Colour;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      role="radio"
      aria-checked={selected}
      aria-label={`${colour.name} colour scheme`}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`relative cursor-pointer overflow-hidden rounded-xl border bg-white transition-all hover:-translate-y-1 hover:shadow-lg ${
        selected ? "border-brand-orange ring-2 ring-brand-orange" : "border-brand-gray-light"
      }`}
    >
      {selected && (
        <div className="absolute right-2.5 top-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-brand-orange text-xs font-bold text-white shadow">
          ✓
        </div>
      )}
      {colour.image ? (
        <div className="relative aspect-[4/3] bg-brand-gray-light">
          <Image src={colour.image} alt={colour.name} fill sizes="300px" className="object-cover" />
        </div>
      ) : (
        <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-brand-navy">
          <div className="flex gap-2">
            {colour.palette.map((p, i) => (
              <span key={i} className="h-7 w-7 rounded-full border-2 border-white/50" style={{ background: p }} />
            ))}
          </div>
          <span className="text-[11px] uppercase tracking-widest text-white">Bespoke</span>
        </div>
      )}
      <div className="p-4">
        <div className="font-serif text-base text-brand-navy">{colour.name}</div>
        <div className="mb-3 text-xs text-brand-gray">{colour.tagline}</div>
        <div className="flex gap-1.5">
          {colour.palette.map((p, i) => (
            <span key={i} className="h-4 w-4 rounded-full border border-brand-gray-light" style={{ background: p }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CartSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 mt-4 border-b border-brand-gray-light pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-brand-gray first:mt-0">
      {children}
    </div>
  );
}

function CartItem({
  emoji,
  name,
  price,
  onRemove,
}: {
  emoji: string;
  name: string;
  price: string;
  onRemove: () => void;
}) {
  return (
    <div className="mb-3 flex items-start gap-3 border-b border-brand-gray-light pb-3 last:border-b-0">
      <div className="flex-none text-xl">{emoji}</div>
      <div className="flex-1">
        <div className="text-sm font-medium text-brand-navy">{name}</div>
        <div className="text-sm text-brand-orange">{price}</div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${name}`}
        className="flex-none text-lg text-brand-gray transition-colors hover:text-red-600"
      >
        ×
      </button>
    </div>
  );
}

function CartLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2 flex justify-between text-sm text-brand-gray">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-brand-navy">{label}</span>
      {children}
    </label>
  );
}
