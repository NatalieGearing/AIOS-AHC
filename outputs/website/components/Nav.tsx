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
      { href: "/our-process", label: "Our Process" },
      { href: "/calculator", label: "Build Calculator" },
      { href: "/colour-selection", label: "Colour Selection" },
      { href: "/house-designs/land-subdivisions", label: "Land Subdivisions" },
    ],
  },
  {
    label: "Investor Resources",
    children: [
      { href: "/investor-resources/investment-guides", label: "Investment Guides" },
      { href: "/house-designs/rooming-accommodation", label: "What is Rooming Accommodation?" },
      {
        label: "Finance & Investment",
        children: [
          { href: "/investor-resources/feasibility-calculator", label: "Feasibility Calculator" },
          { href: "/borrowing-calculator", label: "Borrowing Calculator" },
        ],
      },
      { href: "/investor-resources/our-partner-network", label: "Our Partner Network" },
      { href: "/investor-resources/market-insights", label: "Current Market Insights" },
      {
        href: "/investor-resources/compliance-centre",
        label: "Compliance Centre",
        children: [
          { href: "/investor-resources/compliance-centre", label: "Compliance Made Clearer" },
          { href: "/investor-resources/finding-a-property-manager", label: "Finding a Property Manager" },
        ],
      },
      { href: "/investor-resources/faqs", label: "FAQ's" },
      { href: "/investor-resources/downloads-library", label: "Downloads Library" },
    ],
  },
  { href: "/projects", label: "Projects" },
  {
    label: "About Us",
    children: [
      { href: "/about", label: "About Us" },
      { href: "/about/our-team", label: "Our Team" },
      { href: "/about/philanthropy", label: "Philanthropy" },
      { href: "/about/youtube-channel", label: "Youtube Channel" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden
    viewBox="0 0 20 20"
    className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
    fill="currentColor"
  >
    <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.293l3.71-4.06a.75.75 0 1 1 1.08 1.04l-4.24 4.65a.75.75 0 0 1-1.08 0l-4.24-4.65a.75.75 0 0 1 .02-1.06Z" />
  </svg>
);

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [desktopSubmenu, setDesktopSubmenu] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-gray-light bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex flex-1 items-center gap-6">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/logo-ahc.png"
            alt="Affordable House Corp"
            width={1394}
            height={213}
            priority
            className="h-[39.6px] w-auto md:h-11"
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-3 whitespace-nowrap xl:flex xl:gap-5">
          {NAV_ITEMS.map((item) =>
            "children" in item ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDesktopDropdown(item.label)}
                onMouseLeave={() => {
                  setDesktopDropdown((v) => (v === item.label ? null : v));
                  setDesktopSubmenu(null);
                }}
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
                  <ChevronIcon open={desktopDropdown === item.label} />
                </button>

                {desktopDropdown === item.label && (
                  <div className="absolute left-0 top-full pt-3">
                    <div className="w-64 rounded-xl border border-brand-gray-light bg-white p-2 shadow-lg">
                      {item.children.map((child) =>
                        "children" in child ? (
                          <div
                            key={child.label}
                            className="relative"
                            onMouseEnter={() => setDesktopSubmenu(child.label)}
                            onMouseLeave={() =>
                              setDesktopSubmenu((v) => (v === child.label ? null : v))
                            }
                          >
                            {"href" in child ? (
                              <Link
                                href={child.href}
                                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-brand-gray hover:bg-brand-gray-light hover:text-brand-orange ${
                                  desktopSubmenu === child.label ? "bg-brand-gray-light text-brand-orange" : ""
                                }`}
                              >
                                {child.label}
                                <svg aria-hidden viewBox="0 0 20 20" className="h-3.5 w-3.5 -rotate-90" fill="currentColor">
                                  <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.293l3.71-4.06a.75.75 0 1 1 1.08 1.04l-4.24 4.65a.75.75 0 0 1-1.08 0l-4.24-4.65a.75.75 0 0 1 .02-1.06Z" />
                                </svg>
                              </Link>
                            ) : (
                              <button
                                type="button"
                                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-brand-gray hover:bg-brand-gray-light hover:text-brand-orange ${
                                  desktopSubmenu === child.label ? "bg-brand-gray-light text-brand-orange" : ""
                                }`}
                              >
                                {child.label}
                                <svg aria-hidden viewBox="0 0 20 20" className="h-3.5 w-3.5 -rotate-90" fill="currentColor">
                                  <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.293l3.71-4.06a.75.75 0 1 1 1.08 1.04l-4.24 4.65a.75.75 0 0 1-1.08 0l-4.24-4.65a.75.75 0 0 1 .02-1.06Z" />
                                </svg>
                              </button>
                            )}
                            {desktopSubmenu === child.label && (
                              <div className="absolute left-full top-0 pl-2">
                                <div className="w-56 rounded-xl border border-brand-gray-light bg-white p-2 shadow-lg">
                                  {child.children.map((grandchild) => (
                                    <Link
                                      key={grandchild.href}
                                      href={grandchild.href}
                                      className="block rounded-md px-3 py-2 text-sm font-medium text-brand-gray hover:bg-brand-gray-light hover:text-brand-orange"
                                    >
                                      {grandchild.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-md px-3 py-2 text-sm font-medium text-brand-gray hover:bg-brand-gray-light hover:text-brand-orange"
                          >
                            {child.label}
                          </Link>
                        )
                      )}
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
          className="flex flex-col gap-1.5 xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-0.5 w-6 bg-brand-navy" />
          <span className="h-0.5 w-6 bg-brand-navy" />
          <span className="h-0.5 w-6 bg-brand-navy" />
        </button>
        </div>

        <Link
          href="/portal"
          className="ml-6 hidden shrink-0 whitespace-nowrap rounded-md border border-brand-navy px-4 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white 2xl:inline-block"
        >
          Customer Portal
        </Link>
        <Link
          href="/contact"
          className="ml-3 hidden shrink-0 whitespace-nowrap rounded-md bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy-light xl:inline-block"
        >
          Speak to an Expert
        </Link>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-brand-gray-light bg-white px-6 py-4 xl:hidden">
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
                  <ChevronIcon open={mobileDropdown === item.label} />
                </button>
                {mobileDropdown === item.label && (
                  <div className="ml-3 flex flex-col gap-1 border-l border-brand-gray-light pl-3">
                    {item.children.map((child) =>
                      "children" in child ? (
                        <div key={child.label}>
                          <div className="flex w-full items-center justify-between rounded-md hover:bg-brand-gray-light">
                            {"href" in child ? (
                              <Link
                                href={child.href}
                                className="flex-1 px-2 py-2 text-sm font-medium text-brand-gray"
                                onClick={() => {
                                  setOpen(false);
                                  setMobileDropdown(null);
                                  setMobileSubmenu(null);
                                }}
                              >
                                {child.label}
                              </Link>
                            ) : (
                              <span className="flex-1 px-2 py-2 text-sm font-medium text-brand-gray">{child.label}</span>
                            )}
                            <button
                              type="button"
                              className="px-2 py-2"
                              aria-label={`Toggle ${child.label} submenu`}
                              aria-expanded={mobileSubmenu === child.label}
                              onClick={() =>
                                setMobileSubmenu((v) => (v === child.label ? null : child.label))
                              }
                            >
                              <ChevronIcon open={mobileSubmenu === child.label} />
                            </button>
                          </div>
                          {mobileSubmenu === child.label && (
                            <div className="ml-3 flex flex-col gap-1 border-l border-brand-gray-light pl-3">
                              {child.children.map((grandchild) => (
                                <Link
                                  key={grandchild.href}
                                  href={grandchild.href}
                                  className="rounded-md px-2 py-2 text-sm font-medium text-brand-gray hover:bg-brand-gray-light"
                                  onClick={() => {
                                    setOpen(false);
                                    setMobileDropdown(null);
                                    setMobileSubmenu(null);
                                  }}
                                >
                                  {grandchild.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
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
                      )
                    )}
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
          <Link
            href="/portal"
            className="mt-2 rounded-md border border-brand-navy px-4 py-2.5 text-center text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white"
            onClick={() => setOpen(false)}
          >
            Customer Portal
          </Link>
          <Link
            href="/contact"
            className="mt-2 rounded-md bg-brand-orange px-4 py-2.5 text-center text-sm font-semibold text-brand-navy hover:bg-brand-orange/90"
            onClick={() => setOpen(false)}
          >
            Speak to an Expert
          </Link>
        </nav>
      )}
    </header>
  );
}
