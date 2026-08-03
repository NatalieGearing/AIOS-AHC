import Image from "next/image";
import type { ColourSelection } from "@/lib/colours";

function SelectionCard({ item }: { item: ColourSelection }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-brand-gray-light bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray-light">
        <Image
          src={item.image}
          alt={`${item.name} colour palette`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-serif text-xl font-bold text-brand-navy">{item.name}</h3>
          <div className="flex gap-1">
            {item.palette.map((color) => (
              <span
                key={color}
                className="h-5 w-5 rounded-full border border-black/10"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
        <p className="mt-2 text-xs font-bold uppercase tracking-widest text-brand-orange">
          {item.tagline}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-gray">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function ColourSelectionGrid({ items }: { items: ColourSelection[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <SelectionCard key={item.name} item={item} />
      ))}
    </div>
  );
}
