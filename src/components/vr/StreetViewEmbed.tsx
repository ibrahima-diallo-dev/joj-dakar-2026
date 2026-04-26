import React from "react";
import { ExternalLink } from "lucide-react";

interface Props {
  streetViewUrl: string;
  previewImage: string;
  title: string;
}

export function StreetViewEmbed({ streetViewUrl, previewImage, title }: Props) {
  return (
    <div className="relative w-full h-full bg-joj-dark2">
      {/* Preview image */}
      <img
        src={previewImage}
        alt={title}
        className="w-full h-full object-cover opacity-60"
      />

      {/* Overlay with CTA */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
        <div className="text-center px-6">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-joj-orange"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </div>
          <h3 className="font-display text-xl uppercase text-white mb-2">
            Street View
          </h3>
          <p className="text-joj-muted text-sm mb-6 max-w-md">
            Explorez ce site en 360° directement dans Google Maps
          </p>
          <a
            href={streetViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-joj-orange hover:bg-joj-orange-hover text-white px-6 py-3 rounded-lg font-sans text-sm transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Ouvrir dans Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
