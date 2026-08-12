import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "YouTube Channel",
  description:
    "Watch Affordable House Corp on YouTube — site walkthroughs, project updates, and insights for property investors.",
});

const YOUTUBE_URL = "https://www.youtube.com/@affordablehousingcompany2511";

export default function YoutubeChannelPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[500px] overflow-hidden bg-brand-navy text-white">
        <div className="absolute -right-24 -top-24 h-[430px] w-[430px] rounded-full border border-white/10" />
        <div className="relative z-10 mx-auto flex min-h-[500px] max-w-6xl flex-col justify-center px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
            About Us · YouTube Channel
          </p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            See Affordable House Corp{" "}
            <span className="text-brand-orange">in action.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75">
            From site walkthroughs to project updates, our YouTube channel is
            where we share the story behind the builds — a closer look at the
            work that goes into every Affordable House Corp property.
          </p>
          <div className="mt-8">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-orange/90"
            >
              <PlayCircle className="h-5 w-5" aria-hidden="true" />
              Visit Our Channel
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 text-center sm:py-28">
        <div className="mx-auto max-w-2xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
            Subscribe
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
            Never miss an{" "}
            <span className="text-brand-orange">update.</span>
          </h2>
          <p className="mt-4 text-brand-gray">
            Subscribe on YouTube to keep up with new videos as we publish
            them.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-orange/90"
            >
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              Affordable House Corp on YouTube
            </a>
            <Link
              href="/contact"
              className="text-sm font-semibold text-brand-navy hover:text-brand-orange"
            >
              Speak to Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
