import Image from "next/image";
import Link from "next/link";

interface ComingSoonPageProps {
  eyebrow: string;
  title: string;
  image: string;
  description: string;
  note: string;
}

export default function ComingSoonPage({ eyebrow, title, image, description, note }: ComingSoonPageProps) {
  return (
    <div>
      <div className="relative min-h-[600px]">
        <Image src={image} alt={title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/55 to-brand-orange/10" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6 py-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              {eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="text-lg leading-8 text-brand-gray">{description}</p>

        <div className="mt-10 rounded-xl bg-brand-cream p-8">
          <h2 className="text-xl font-bold text-brand-navy">More detail coming soon</h2>
          <p className="mt-3 text-brand-gray">{note}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-orange/90"
            >
              Enquire Now
            </Link>
            <Link
              href="/house-designs"
              className="rounded-md border border-brand-gray-light px-6 py-3 text-sm font-semibold text-brand-navy hover:border-brand-orange"
            >
              View All House Designs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
