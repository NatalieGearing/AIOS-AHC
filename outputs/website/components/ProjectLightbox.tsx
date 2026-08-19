"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
}

export interface LightboxProject {
  title: string;
  category: string;
  location: string;
  description?: string;
  images: LightboxImage[];
}

export default function ProjectLightbox({
  project,
  activeIndex,
  onClose,
  onNavigate,
}: {
  project: LightboxProject;
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const total = project.images.length;
  const active = project.images[activeIndex];

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((activeIndex + 1) % total);
      if (e.key === "ArrowLeft") onNavigate((activeIndex - 1 + total) % total);
    }
    window.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, total, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} gallery`}
    >
      <div
        className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-brand-cream md:h-[640px] md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-md bg-brand-navy/90 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy"
        >
          Close
          <X className="size-4" aria-hidden="true" />
        </button>

        <div className="relative h-72 shrink-0 bg-brand-navy md:h-full md:flex-1">
          <Image
            src={active.src}
            alt={active.alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 65vw, 100vw"
          />

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => onNavigate((activeIndex - 1 + total) % total)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-navy transition-colors hover:bg-white"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate((activeIndex + 1) % total)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-navy transition-colors hover:bg-white"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">
                {activeIndex + 1} / {total}
              </div>
            </>
          )}
        </div>

        <div className="flex w-full flex-col justify-center p-8 md:w-[360px] md:shrink-0">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">
            {project.category}
          </p>
          <h3 className="mt-3 font-serif text-3xl font-bold leading-tight text-brand-navy">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-brand-gray">{project.location}</p>
          {project.description ? (
            <p className="mt-6 text-sm leading-relaxed text-brand-gray">
              {project.description}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
