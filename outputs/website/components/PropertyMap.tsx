"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { SquarePen } from "lucide-react";
import type { Listing } from "@/lib/content";

function markerIcon() {
  return L.divIcon({
    className: "",
    html: `<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 6px 8px rgba(17,28,73,0.4));">
      <path d="M15 0C6.7 0 0 6.7 0 15c0 11.25 15 25 15 25s15-13.75 15-25C30 6.7 23.3 0 15 0z" fill="#111c49" stroke="#ab8742" stroke-width="2"/>
      <circle cx="15" cy="15" r="5.5" fill="#fff"/>
    </svg>`,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -38],
  });
}

export default function PropertyMap({ listings }: { listings: Listing[] }) {
  if (listings.length === 0) {
    return (
      <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-brand-gray-light bg-brand-cream text-sm text-brand-gray">
        No opportunities match those filters.
      </div>
    );
  }

  const centerLat = listings.reduce((sum, l) => sum + l.lat, 0) / listings.length;
  const centerLng = listings.reduce((sum, l) => sum + l.lng, 0) / listings.length;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={10}
      scrollWheelZoom={false}
      className="h-full min-h-[420px] w-full rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listings.map((listing) => (
        <Marker key={listing.slug} position={[listing.lat, listing.lng]} icon={markerIcon()}>
          <Popup className="ahc-popup" minWidth={280} maxWidth={320}>
            <div className="flex items-center justify-between gap-3 bg-brand-navy p-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-orange">
                  {listing.status}
                </p>
                <p className="mt-1 truncate font-serif text-base font-bold text-white">
                  {listing.title}
                </p>
                <p className="mt-1 text-xs text-white/60">
                  {listing.beds} rooms
                  {typeof listing.area === "number" ? ` · Approx. ${listing.area} m²` : ""}
                </p>
              </div>
              <a
                href={`mailto:sales@ahcbrisbane.com.au?subject=${encodeURIComponent(
                  `Enquiry — ${listing.title}`
                )}`}
                className="flex shrink-0 items-center gap-1.5 rounded-md bg-brand-orange px-3.5 py-2.5 text-xs font-bold text-brand-navy hover:bg-brand-orange/90"
              >
                Enquire
                <SquarePen className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
