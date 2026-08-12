import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Philanthropy",
  description:
    "Affordable House Corp's ongoing partnership with the Chambok Future School in Cambodia — funding education, meals, and university support for local students.",
});

const SCHOOL_GALLERY = [
  {
    src: "/images/philanthropy/book-handout.jpg",
    alt: "A teacher handing out books to Chambok Future School students",
  },
  {
    src: "/images/philanthropy/supply-handout.jpg",
    alt: "School supplies being distributed to students at Chambok Future School",
  },
  {
    src: "/images/philanthropy/supply-day-group.jpg",
    alt: "Chambok Future School students gathered for a supply distribution day",
  },
];

const FACEBOOK_EMBEDS = [
  {
    src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fchambokfutureschool%2Fposts%2Fpfbid0wHaeNJhxb9HjQ6vzNicdwLVQshSd4w8jTV93tzKGLkhoTmNoCiNN7FqxhccaetsWl&show_text=true&width=500",
    height: 703,
  },
  {
    src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fchambokfutureschool%2Fposts%2Fpfbid02yZqHUWnsQp9AVfZeKTvXstHvctRyXrKmV1ra2wzHnoDq4NnsFrvM9oFhrJsvxLVPl&show_text=true&width=500",
    height: 665,
  },
  {
    src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fchambokfutureschool%2Fposts%2Fpfbid02Gm98iVvviTqbsgQQ8ckoEtXJRu1bAzEMVZxEnueNzxBjDhvEuPPayD6PSEMidHrJl&show_text=true&width=500",
    height: 703,
  },
  {
    src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fchambokfutureschool%2Fposts%2Fpfbid02VTDYpUquvhoT1DstC2pUjHqMNCamAjBB9scv9p339CMQqggUwB6QYGjCuY2eR4zml&show_text=true&width=500",
    height: 703,
  },
];

const GRADUATE_GALLERY = [
  {
    src: "/images/philanthropy/graduates-group.jpg",
    alt: "A group of Chambok Future School graduates celebrating together",
  },
  {
    src: "/images/philanthropy/graduates-closeup.jpg",
    alt: "A graduate sharing a warm moment with a supporter",
  },
  {
    src: "/images/philanthropy/community-dinner.jpg",
    alt: "The AHC team sharing a meal with the local Cambodian community",
  },
  {
    src: "/images/philanthropy/shopping-support.jpg",
    alt: "Helping a graduate with everyday shopping and support",
  },
];

export default function PhilanthropyPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative flex min-h-[600px] items-center overflow-hidden">
        <Image
          src="/images/philanthropy/classroom-writing.jpg"
          alt="Chambok Future School students writing in their workbooks"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/55 to-brand-orange/10" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12 text-white">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            About Us · Philanthropy
          </span>
          <h1 className="max-w-3xl font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            What we build here.
            <br />
            <span className="text-brand-orange">Helps build futures there.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">
            Affordable House Corp was built on the belief that what we do
            should leave the world a little better than we found it. Every
            home we hand over in Australia helps fund a quiet, ongoing
            partnership on the other side of the world — at the Chambok
            Future School in Cambodia.
          </p>
        </div>
      </div>

      {/* The school */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              The Chambok Future School
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
              A safe place to{" "}
              <span className="text-brand-orange">learn and grow.</span>
            </h2>
          </div>
          <p className="leading-7 text-brand-gray">
            The school offers free additional education to local village
            children in an effort to boost their skill levels in the hopes of
            improving employment and quality of life. It provides meals,
            books and uniforms, and a safe place to learn. For many of these
            kids it&apos;s an opportunity to get ahead in life.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 px-6 sm:grid-cols-3">
          {SCHOOL_GALLERY.map((photo) => (
            <div
              key={photo.src}
              className="relative h-64 overflow-hidden rounded-2xl bg-brand-cream"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Graduate support */}
      <section className="bg-brand-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Beyond the Classroom
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
              Backing them through{" "}
              <span className="text-brand-orange">higher learning.</span>
            </h2>
          </div>
          <p className="leading-7 text-brand-gray">
            We support students who have graduated from the school in their
            efforts to complete university and higher learning
            qualifications by providing housing, meals and course funding —
            and our team visits regularly to help on the ground.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {GRADUATE_GALLERY.map((photo) => (
            <div
              key={photo.src}
              className="relative h-56 overflow-hidden rounded-2xl bg-white"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Community posts */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
            From the Community
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
            Words from{" "}
            <span className="text-brand-orange">Chambok Future School.</span>
          </h2>
        </div>

        <div className="mx-auto mt-14 flex max-w-6xl flex-wrap justify-center gap-8 px-6">
          {FACEBOOK_EMBEDS.map((embed) => (
            <div key={embed.src} className="overflow-x-auto">
              <iframe
                src={embed.src}
                width="500"
                height={embed.height}
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                className="rounded-2xl shadow-lg"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Follow / CTA */}
      <section className="bg-brand-gray-light py-20 text-center sm:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
            Follow the journey
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
            Follow the school on{" "}
            <span className="text-brand-orange">Facebook.</span>
          </h2>
          <p className="mt-4 text-brand-gray">
            See the latest updates, photos and milestones from the Chambok
            Future School community.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.facebook.com/chambokfutureschool/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-orange/90"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Chambok Future School
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
