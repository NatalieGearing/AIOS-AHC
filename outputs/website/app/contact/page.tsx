import EnquiryForm from "@/components/EnquiryForm";
import { buildMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Affordable House Corp about your investment property build — rooming accommodation, pre-fab houses or land subdivisions.",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
        Get in Touch
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-brand-gray">
        Whether you have a general enquiry or are ready to start your next
        investment project, our team is here to help. For a rough estimate
        first, try the{" "}
        <a href="/calculator" className="font-medium text-brand-orange hover:underline">
          Build Calculator
        </a>
        .
      </p>

      <div className="mt-14 grid gap-10 lg:grid-cols-5">
        <div className="rounded-2xl border border-brand-gray-light bg-brand-cream p-8 lg:col-span-2">
          <h2 className="font-serif text-xl font-bold text-brand-navy">Contact Details</h2>

          <div className="mt-6 space-y-6 text-sm">
            <div>
              <p className="font-semibold text-brand-navy">Phone</p>
              <a href={CONTACT.phoneHref} className="text-brand-orange hover:underline">
                {CONTACT.phone}
              </a>
            </div>
            <div>
              <p className="font-semibold text-brand-navy">Email</p>
              <a href={`mailto:${CONTACT.email}`} className="text-brand-orange hover:underline">
                {CONTACT.email}
              </a>
            </div>
            <div>
              <p className="font-semibold text-brand-navy">Office</p>
              <p className="text-brand-gray">
                {CONTACT.addressLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
            <div>
              <p className="font-semibold text-brand-navy">Business Hours</p>
              <ul className="text-brand-gray">
                {CONTACT.hours.map((h) => (
                  <li key={h.label}>
                    {h.label}: {h.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-serif text-xl font-bold text-brand-navy">Send an Enquiry</h2>
          <p className="mt-1 mb-6 text-sm text-brand-gray">
            Fill out the form below and we&apos;ll get back to you within 24 hours.
          </p>
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}
