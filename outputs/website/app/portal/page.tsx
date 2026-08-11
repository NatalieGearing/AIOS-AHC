import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Customer Portal",
  description: "Sign in to the Affordable House Corp customer portal.",
});

export default function PortalPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-20">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
          Customer Portal
        </span>
        <h1 className="mt-3 font-serif text-3xl font-bold text-brand-navy">
          Sign in
        </h1>
        <p className="mt-3 text-sm text-brand-gray">
          The customer portal is coming soon. Once live, you&apos;ll be able
          to track your build, view documents and message your project team
          here.
        </p>
      </div>

      <form className="mt-8 flex flex-col gap-4 rounded-2xl border border-brand-gray-light bg-brand-cream p-8">
        <fieldset disabled className="flex flex-col gap-4 opacity-60">
          <div>
            <label htmlFor="portal-email" className="block text-sm font-medium text-brand-navy">
              Email address
            </label>
            <input
              id="portal-email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-md border border-brand-gray-light bg-white px-3 py-2 text-brand-navy focus:border-brand-orange focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="portal-password" className="block text-sm font-medium text-brand-navy">
              Password
            </label>
            <input
              id="portal-password"
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-md border border-brand-gray-light bg-white px-3 py-2 text-brand-navy focus:border-brand-orange focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-md bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-navy-light"
          >
            Sign in
          </button>
        </fieldset>
      </form>

      <div className="mt-6 flex flex-col items-center gap-2 text-center text-sm">
        <p className="text-brand-gray">
          Need access, or have a question about your project in the meantime?
        </p>
        <Link href="/contact" className="font-semibold text-brand-orange hover:underline">
          Speak to our team
        </Link>
        <a href={CONTACT.phoneHref} className="text-brand-gray hover:text-brand-orange">
          {CONTACT.phone}
        </a>
      </div>
    </div>
  );
}
