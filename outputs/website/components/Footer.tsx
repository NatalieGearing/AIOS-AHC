import Image from "next/image";
import Link from "next/link";
import { SERVICES, CONTACT } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-brand-navy text-white/75">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-4">
        <div>
          <Link href="/">
            <Image
              src="/images/logo-ahc-white.png"
              alt="Affordable House Corp"
              width={624}
              height={367}
              className="mx-auto block h-auto w-[56.25%]"
            />
          </Link>
          <p className="mt-3 text-sm">
            30 years building turnkey investment properties. Australia&apos;s
            market leader in rooming accommodation.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Services
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={service.flagship ? `/house-designs/${service.slug}` : "/house-designs"}
                  className="hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/contact" className="hover:text-white">
                Enquire about a project
              </Link>
            </li>
            <li>
              <Link href="/calculator" className="hover:text-white">
                Try the Build Calculator
              </Link>
            </li>
            <li>
              <Link href="/investor-resources/feasibility-calculator" className="hover:text-white">
                Try the Feasibility Calculator
              </Link>
            </li>
            <li>
              <Link href="/house-and-land" className="hover:text-white">
                House &amp; Land
              </Link>
            </li>
            <li>
              <Link href="/investor-resources/faqs" className="hover:text-white">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Get in touch
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={CONTACT.phoneHref} className="hover:text-white">
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                {CONTACT.email}
              </a>
            </li>
          </ul>
          <p className="mt-3 text-sm">
            {CONTACT.addressLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/50">
        &copy; {year} Affordable House Corp. All rights reserved.
      </div>
    </footer>
  );
}
