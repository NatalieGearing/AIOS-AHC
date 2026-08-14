"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function FaqSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const value = searchParams.get("q") ?? "";

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (next) {
      params.set("q", next);
    } else {
      params.delete("q");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div className="relative mt-6 max-w-md">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-brand-gray"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Search FAQs by topic or keyword..."
        aria-label="Search frequently asked questions"
        className="w-full rounded-full border border-transparent bg-white py-3 pl-11 pr-4 text-sm text-brand-navy placeholder:text-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-orange"
      />
    </div>
  );
}
