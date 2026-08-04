"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const PROPERTY_TYPES = [
  "Rooming Accommodation",
  "Pre-fab House",
  "Land Subdivision",
  "Not sure yet",
];

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      propertyType: data.get("propertyType"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending your enquiry. Please try again, or contact us directly."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-emerald-800">
        <p className="font-semibold">Thanks — your enquiry has been sent.</p>
        <p className="mt-1 text-sm">We&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-brand-gray">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-md border border-brand-gray-light px-3 py-2 text-brand-navy focus:border-brand-orange focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-brand-gray">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-brand-gray-light px-3 py-2 text-brand-navy focus:border-brand-orange focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-brand-gray">
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1 w-full rounded-md border border-brand-gray-light px-3 py-2 text-brand-navy focus:border-brand-orange focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="propertyType"
            className="text-sm font-medium text-brand-gray"
          >
            Property type of interest
          </label>
          <select
            id="propertyType"
            name="propertyType"
            className="mt-1 w-full rounded-md border border-brand-gray-light px-3 py-2 text-brand-navy focus:border-brand-orange focus:outline-none"
            defaultValue={PROPERTY_TYPES[0]}
          >
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-brand-gray">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-md border border-brand-gray-light px-3 py-2 text-brand-navy focus:border-brand-orange focus:outline-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-orange/90 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
