"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, Check, KeyRound } from "lucide-react";

export interface OverviewCard {
  href: string;
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  highlight: boolean;
  panel: {
    paragraph: string;
    checklist: string[];
    footer: string;
  };
}

export default function ComplianceOverview({ cards }: { cards: OverviewCard[] }) {
  const initial = cards.find((c) => c.highlight) ?? cards[0];
  const [activeHref, setActiveHref] = useState(initial.href);
  const active = cards.find((c) => c.href === activeHref) ?? initial;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((card) => {
          const isActive = card.href === activeHref;
          return (
            <button
              key={card.href}
              type="button"
              onClick={() => setActiveHref(card.href)}
              aria-pressed={isActive}
              className={`flex flex-col gap-3 rounded-2xl border p-5 text-left transition-colors ${
                isActive
                  ? "border-brand-navy/30 bg-brand-navy/5 hover:border-brand-navy/50"
                  : "border-brand-gray-light bg-white hover:border-brand-navy/30"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                    isActive ? "bg-white text-brand-navy" : "bg-brand-gray-light text-brand-navy"
                  }`}
                >
                  {card.icon}
                </span>
                <span
                  className={`text-[11px] font-semibold uppercase tracking-wide ${
                    isActive ? "text-brand-navy" : "text-brand-gray"
                  }`}
                >
                  {card.eyebrow}
                </span>
              </div>
              <div>
                <h3 className="font-bold capitalize text-brand-navy">{card.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-brand-gray">{card.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-brand-navy p-6 text-white lg:sticky lg:top-24 lg:self-start">
        <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full border border-white/10" />
        <div className="relative flex items-center gap-2 text-white/70">
          <KeyRound className="size-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">Investor essentials</span>
        </div>
        <h3 className="relative mt-3 text-2xl font-bold capitalize">{active.title}</h3>
        <p className="relative mt-3 text-sm leading-relaxed text-white/85">{active.panel.paragraph}</p>
        <ul className="relative mt-4 flex flex-col divide-y divide-white/15">
          {active.panel.checklist.map((item) => (
            <li key={item} className="flex items-start gap-2.5 py-2.5 text-sm leading-relaxed first:pt-0 last:pb-0">
              <Check className="mt-0.5 size-4 shrink-0 text-white/70" />
              {item}
            </li>
          ))}
        </ul>
        <p className="relative mt-4 border-t border-white/15 pt-4 text-xs leading-relaxed text-white/70">
          {active.panel.footer}
        </p>
        <a
          href={active.href}
          className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-brand-orange"
        >
          Read the full section
          <ArrowRight className="size-4" />
        </a>
      </div>
    </div>
  );
}
