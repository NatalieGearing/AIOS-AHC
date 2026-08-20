"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import ProjectLightbox, { type LightboxImage } from "./ProjectLightbox";

const CATEGORIES = [
  "Rooming Accommodation",
  "Dual Occupancy",
  "Prefabricated Homes",
];

interface Project {
  id: string;
  title: string;
  category: string;
  image?: string;
  gallery?: LightboxImage[];
}

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Project 01",
    category: "Rooming Accommodation",
    image: "/images/33-cardiff/front.webp",
    gallery: [
      { src: "/images/33-cardiff/front.webp", alt: "33 Cardiff — front exterior" },
      { src: "/images/33-cardiff/kitchen.webp", alt: "33 Cardiff — kitchen" },
      { src: "/images/33-cardiff/kitchen-2.webp", alt: "33 Cardiff — kitchen, alternate view" },
      { src: "/images/33-cardiff/living.webp", alt: "33 Cardiff — living area" },
      { src: "/images/33-cardiff/bedroom.webp", alt: "33 Cardiff — bedroom" },
      { src: "/images/33-cardiff/bathroom.webp", alt: "33 Cardiff — bathroom" },
      { src: "/images/33-cardiff/utility.webp", alt: "33 Cardiff — utility area" },
    ],
  },
  { id: "02", title: "Project 02", category: "Rooming Accommodation" },
  { id: "03", title: "Project 03", category: "Rooming Accommodation" },
  { id: "04", title: "Project 04", category: "Dual Occupancy" },
  { id: "05", title: "Project 05", category: "Prefabricated Homes" },
];

export default function ProjectsFilter() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const visible = activeFilter
    ? PROJECTS.filter((p) => p.category === activeFilter)
    : PROJECTS;

  const openProject = PROJECTS.find((p) => p.id === openProjectId);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-gray-light pb-6">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter(null)}
            aria-pressed={activeFilter === null}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              activeFilter === null
                ? "border-brand-navy bg-brand-navy text-white"
                : "border-brand-gray-light bg-white text-brand-navy hover:border-brand-navy/40"
            }`}
          >
            All Projects
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              aria-pressed={activeFilter === category}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                activeFilter === category
                  ? "border-brand-navy bg-brand-navy text-white"
                  : "border-brand-gray-light bg-white text-brand-navy hover:border-brand-navy/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <span className="text-sm font-medium text-brand-gray">
          {visible.length} project{visible.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {visible.map((project, index) => {
          const hasGallery = Boolean(project.gallery?.length);
          const isLastOdd = visible.length % 2 === 1 && index === visible.length - 1;

          const tile = (
            <>
              {project.image ? (
                <>
                  <Image
                    src={project.image}
                    alt={`${project.title} — exterior`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/55 to-brand-orange/10" />
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-brand-gray/50">
                  <ImageIcon className="size-10" aria-hidden="true" />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    Image coming soon
                  </span>
                </div>
              )}

              <span className="absolute left-4 top-4 flex size-9 items-center justify-center rounded border border-white/50 bg-black/25 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
                {project.id}
              </span>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/40 to-transparent p-5 pt-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-orange">
                  {project.category}
                </p>
                <h3 className="mt-1 font-serif text-xl font-bold leading-snug text-white">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-white/80">South East Queensland</p>
              </div>
            </>
          );

          const tileClassName = `group relative aspect-[4/3] overflow-hidden rounded-xl bg-brand-cream transition-all duration-300 hover:-translate-y-1 ${
            isLastOdd ? "sm:col-span-2" : ""
          }`;

          return hasGallery ? (
            <button
              key={project.id}
              type="button"
              className={`${tileClassName} text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2`}
              aria-label={`View ${project.title}`}
              onClick={() => {
                setOpenProjectId(project.id);
                setActiveImageIndex(0);
              }}
            >
              {tile}
            </button>
          ) : (
            <div key={project.id} className={tileClassName}>
              {tile}
            </div>
          );
        })}
      </div>

      {openProject && openProject.gallery ? (
        <ProjectLightbox
          project={{
            title: openProject.title,
            category: openProject.category,
            location: "South East Queensland",
            description:
              "A completed Affordable House Corp rooming accommodation project.",
            images: openProject.gallery,
          }}
          activeIndex={activeImageIndex}
          onClose={() => setOpenProjectId(null)}
          onNavigate={setActiveImageIndex}
        />
      ) : null}
    </div>
  );
}
