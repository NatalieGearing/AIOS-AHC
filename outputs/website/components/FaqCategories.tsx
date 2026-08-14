"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown, CircleHelp } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
  answerNode?: ReactNode;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}

const RELATED_RESOURCES = [
  { label: "Compliance Centre", href: "/investor-resources/compliance-centre" },
  {
    label: "Finding a Property Manager",
    href: "/investor-resources/finding-a-property-manager",
  },
  { label: "Investment Guides", href: "/investor-resources/investment-guides" },
  { label: "Downloads Library", href: "/investor-resources/downloads-library" },
];

export default function FaqCategories({
  categories,
}: {
  categories: FaqCategory[];
}) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();

  const totalCount = categories.reduce(
    (sum, category) => sum + category.items.length,
    0
  );

  const visible = categories
    .filter((category) => activeFilter === null || category.title === activeFilter)
    .map((category) => ({
      ...category,
      items: query
        ? category.items.filter(
            (item) =>
              item.question.toLowerCase().includes(query) ||
              item.answer.toLowerCase().includes(query)
          )
        : category.items,
    }))
    .filter((category) => category.items.length > 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr_280px] lg:items-start">
      <aside className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-brand-gray-light bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gray">
            Browse by Topic
          </p>
          <div className="mt-4 border-t border-brand-gray-light">
            <button
              type="button"
              onClick={() => setActiveFilter(null)}
              aria-pressed={activeFilter === null}
              className="flex w-full items-center justify-between gap-3 border-b border-brand-gray-light py-3 text-left"
            >
              <span
                className={
                  activeFilter === null
                    ? "font-bold text-brand-navy"
                    : "font-medium text-brand-gray"
                }
              >
                All questions
              </span>
              <span
                className={`flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                  activeFilter === null
                    ? "bg-brand-orange text-brand-navy"
                    : "bg-brand-gray-light text-brand-gray"
                }`}
              >
                {totalCount}
              </span>
            </button>
            {categories.map((category) => (
              <button
                key={category.title}
                type="button"
                onClick={() => setActiveFilter(category.title)}
                aria-pressed={activeFilter === category.title}
                className="flex w-full items-center justify-between gap-3 border-b border-brand-gray-light py-3 text-left last:border-b-0"
              >
                <span
                  className={
                    activeFilter === category.title
                      ? "font-bold text-brand-navy"
                      : "font-medium text-brand-gray"
                  }
                >
                  {category.title}
                </span>
                <span
                  className={`flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                    activeFilter === category.title
                      ? "bg-brand-orange text-brand-navy"
                      : "bg-brand-gray-light text-brand-gray"
                  }`}
                >
                  {category.items.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-2xl bg-brand-navy">
          <Image
            src="/images/faq-support-card.png"
            alt=""
            fill
            className="object-cover"
          />
          <div className="relative px-6 py-10 text-left text-white">
            <CircleHelp className="size-7 text-brand-orange" aria-hidden="true" />
            <h3 className="mt-4 font-serif text-xl font-bold">Still need help?</h3>
            <p className="mt-3 text-sm text-white/80">
              Our team is here to help you find the answer
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-brand-orange"
            >
              Contact the Team
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </aside>

      <div>
        {query && visible.length === 0 && (
          <p className="rounded-2xl border border-dashed border-brand-gray-light bg-brand-cream/40 px-6 py-16 text-center text-brand-gray">
            No questions matched &ldquo;{searchParams.get("q")}&rdquo;. Try a
            different keyword, or{" "}
            <Link href="/contact" className="font-medium text-brand-orange hover:underline">
              contact our team
            </Link>{" "}
            directly.
          </p>
        )}
        {visible.map((category, index) => (
          <details
            key={category.title}
            className="group mb-4 last:mb-0"
            open={query ? true : index === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 marker:hidden [&::-webkit-details-marker]:hidden">
              <h2 className="font-serif text-2xl font-bold text-brand-navy">
                {category.title}
              </h2>
              <ChevronDown className="size-5 shrink-0 text-brand-gray transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-2 flex flex-col gap-8 pb-8">
              {category.items.map((item) => (
                <div key={item.question}>
                  <h3 className="font-semibold text-brand-navy">
                    {item.question}
                  </h3>
                  <p className="mt-2 leading-7 text-brand-gray">
                    {item.answerNode ?? item.answer}
                  </p>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>

      <aside className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-brand-gray-light bg-white p-5">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gray">
            Related Resources
          </h3>
          <div className="mt-4 border-t border-brand-gray-light">
            {RELATED_RESOURCES.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="flex items-center justify-between gap-3 border-b border-brand-gray-light py-3 text-sm font-medium text-brand-orange hover:underline"
              >
                {resource.label}
                <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
