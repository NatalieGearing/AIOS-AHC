"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/house-designs", label: "House Designs" },
  { href: "/house-and-land", label: "House & Land" },
  {
    label: "Build With Us",
    children: [
      { href: "/process", label: "Our Process" },
      { href: "/calculator", label: "Build Calculator" },
      { href: "/colour-selection", label: "Colour Selection" },
    ],
  },
  {
    label: "Investor Resources",
    children: [
      { href: "/investor-resources/investment-guides", label: "Investment Guides" },
      { href: "/investor-resources/finance-partners", label: "Our Finance Partners" },
      { href: "/investor-resources/market-insights", label: "Current Market Insights" },
      { href: "/investor-resources/investment-calculator", label: "Feasibility Calculator" },
      { href: "/borrowing-calculator", label: "Borrowing Calculator" },
    ],
  },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-gray-light bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-ahc.png"
            alt="Affordable House Corp"
            width={1394}
            height={213}
            priority
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <nav className="hidden gap-8 md:flex">
          {NAV_ITEMS.map((item) =>
            "children" in item ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDesktopDropdown(item.label)}
                onMouseLeave={() => setDesktopDropdown((v) => (v === item.label ? null : v))}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-brand-gray transition-colors hover:text-brand-orange"
                  aria-expanded={desktopDropdown === item.label}
                  onClick={() =>
                    setDesktopDropdown((v) => (v === item.label ? null : item.label))
                  }
                >
                  {item.label}
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className={`h-3.5 w-3.5 transition-transform ${desktopDropdown === item.label ? "rotate-180" : ""}`}
                    fill="currentColor"
                  >
                    <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.293l3.71-4.06a.75.75 0 1 1 1.08 1.04l-4.24 4.65a.75.75 0 0 1-1.08 0l-4.24-4.65a.75.75 0 0 1 .02-1.06Z" />
                  </svg>
                </button>

                {desktopDropdown === item.label && (
                  <div className="absolute left-0 top-full pt-3">
                    <div className="w-56 rounded-xl border border-brand-gray-light bg-white p-2 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-md px-3 py-2 text-sm font-medium text-brand-gray hover:bg-brand-gray-light hover:text-brand-orange"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-brand-gray transition-colors hover:text-brand-orange"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-0.5 w-6 bg-brand-navy" />
          <span className="h-0.5 w-6 bg-brand-navy" />
          <span className="h-0.5 w-6 bg-brand-navy" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-brand-gray-light bg-white px-6 py-4 md:hidden">
          {NAV_ITEMS.map((item) =>
            "children" in item ? (
              <div key={item.label}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-brand-gray hover:bg-brand-gray-light"
                  aria-expanded={mobileDropdown === item.label}
                  onClick={() =>
                    setMobileDropdown((v) => (v === item.label ? null : item.label))
                  }
                >
                  {item.label}
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className={`h-3.5 w-3.5 transition-transform ${mobileDropdown === item.label ? "rotate-180" : ""}`}
                    fill="currentColor"
                  >
                    <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.293l3.71-4.06a.75.75 0 1 1 1.08 1.04l-4.24 4.65a.75.75 0 0 1-1.08 0l-4.24-4.65a.75.75 0 0 1 .02-1.06Z" />
                  </svg>
                </button>
                {mobileDropdown === item.label && (
                  <div className="ml-3 flex flex-col gap-1 border-l border-brand-gray-light pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="rounded-md px-2 py-2 text-sm font-medium text-brand-gray hover:bg-brand-gray-light"
                        onClick={() => {
                          setOpen(false);
                          setMobileDropdown(null);
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-2 text-sm font-medium text-brand-gray hover:bg-brand-gray-light"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}
