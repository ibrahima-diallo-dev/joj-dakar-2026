import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Loader2,
} from "lucide-react";
import { vrScenes } from "@/data/vrScenes";
import { useLang } from "@/i18n/LangProvider";
import { StreetViewEmbed } from "@/components/vr/StreetViewEmbed";

type Scene = (typeof vrScenes)[number];

function getDescription(scene: Scene, lang: string): string {
  const key = `description_${lang}` as keyof Scene;
  return (scene[key] as string) ?? scene.description_fr;
}

/* ── preload helper ── */
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

export function VRTour() {
  const { t, lang } = useLang();
  const [activeIdx, setActiveIdx] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<"image" | "streetview">("image");
  const containerRef = useRef<HTMLDivElement>(null);

  const active = vrScenes[activeIdx];

  const prev = () => {
    setIsLoading(true);
    setActiveIdx((i) => (i - 1 + vrScenes.length) % vrScenes.length);
  };
  const next = () => {
    setIsLoading(true);
    setActiveIdx((i) => (i + 1) % vrScenes.length);
  };

  /* Reset to image mode when scene changes */
  useEffect(() => {
    setMode("image");
  }, [activeIdx]);

  /* Preload adjacent scenes when active changes */
  useEffect(() => {
    setIsLoading(true);
    const prevIdx = (activeIdx - 1 + vrScenes.length) % vrScenes.length;
    const nextIdx = (activeIdx + 1) % vrScenes.length;

    // Preload current first (priority), then neighbours
    preloadImage(active.img)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));

    // Preload neighbours in background
    preloadImage(vrScenes[prevIdx].img).catch(() => {});
    preloadImage(vrScenes[nextIdx].img).catch(() => {});
  }, [activeIdx]);

  /* Preload all thumbnails on mount */
  useEffect(() => {
    vrScenes.forEach((scene) => {
      const img = new Image();
      img.src = scene.img;
    });
  }, []);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen, activeIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      ref={containerRef}
      id="vr"
      className="min-h-screen bg-joj-dark py-24 px-6 md:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12 text-center md:text-start">
          <div className="inline-block bg-joj-orange text-white text-[10px] px-3 py-1.5 tracking-[2px] uppercase font-display mb-4">
            {t("vr_tag")}
          </div>
          <h2 className="font-display text-[clamp(28px,3vw,42px)] uppercase leading-none mb-4">
            <span className="text-white">{t("vr_title")}</span>
          </h2>
          <p className="text-[15px] text-joj-muted font-sans max-w-2xl mx-auto md:mx-0">
            {t("vr_desc")}
          </p>
        </div>

        {/* Stage */}
        <div className="relative w-full h-[420px] sm:h-[500px] md:h-[600px] bg-joj-dark2 border border-joj-border rounded-xl overflow-hidden group shadow-2xl shadow-black/40">
          {/* Loading overlay */}
          <AnimatePresence>
            {isLoading && mode === "image" && (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 bg-joj-dark2 flex flex-col items-center justify-center gap-4"
              >
                <Loader2 className="w-10 h-10 text-joj-orange animate-spin" />
                <span className="text-joj-muted text-sm font-sans tracking-wide">
                  {t("loading")}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {mode === "image" || !active.hasStreetView ? (
              /* IMAGE / FALLBACK MODE */
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: isLoading ? 0 : 1, scale: zoom ? 1.18 : 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{
                  opacity: { duration: 0.5 },
                  scale: { duration: zoom ? 0.6 : 8, ease: "easeOut" },
                }}
                className="absolute inset-0"
                onClick={() => setZoom((v) => !v)}
                style={{ cursor: zoom ? "zoom-out" : "zoom-in" }}
              >
                <img
                  src={active.img}
                  alt={active.title}
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                />
              </motion.div>
            ) : (
              /* STREET VIEW MODE */
              <motion.div
                key={`sv-${activeIdx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <StreetViewEmbed
                  streetViewUrl={active.streetViewUrl}
                  previewImage={active.img}
                  title={active.title}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom info gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Title block */}
          <motion.div
            key={`info-${activeIdx}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="absolute inset-x-0 bottom-0 px-6 md:px-8 pb-6 md:pb-8 text-white"
          >
            <div className="flex items-center gap-2 text-joj-orange text-[11px] uppercase tracking-[3px] font-display mb-2">
              <MapPin className="w-3.5 h-3.5" />
              {active.location}
            </div>
            <h3 className="font-display text-2xl md:text-4xl uppercase leading-tight mb-2">
              {active.title}
            </h3>
            <p className="text-white/80 text-sm md:text-base max-w-xl">
              {getDescription(active, lang)}
            </p>
          </motion.div>

          {/* Counter */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-white text-xs font-display tracking-wider">
            {String(activeIdx + 1).padStart(2, "0")} /{" "}
            {String(vrScenes.length).padStart(2, "0")}
          </div>

          {/* Fullscreen button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFullscreen(true);
            }}
            className="absolute top-4 right-4 bg-black/60 hover:bg-joj-orange text-white p-3 rounded-full backdrop-blur-md border border-white/10 transition-colors z-10"
            title={t("vr_fullscreen")}
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Street View toggle button */}
          {active.hasStreetView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMode((m) => (m === "image" ? "streetview" : "image"));
              }}
              className={`absolute top-14 right-4 text-white px-3 py-2 rounded-full backdrop-blur-md border text-xs font-display tracking-wider transition-colors z-10 ${
                mode === "streetview"
                  ? "bg-joj-orange border-joj-orange"
                  : "bg-black/60 border-white/10 hover:bg-joj-orange"
              }`}
            >
              {mode === "streetview" ? "📸 Photo" : "🌐 Street View"}
            </button>
          )}

          {/* Prev / Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-joj-orange text-white p-2.5 rounded-full backdrop-blur-md border border-white/10 transition opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-joj-orange text-white p-2.5 rounded-full backdrop-blur-md border border-white/10 transition opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail rail */}
        <div className="mt-5 grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {vrScenes.map((scene, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsLoading(true);
                setActiveIdx(idx);
              }}
              className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all group ${
                idx === activeIdx
                  ? "border-joj-orange shadow-lg shadow-joj-orange/20 scale-[1.02]"
                  : "border-transparent opacity-70 hover:opacity-100 hover:border-white/30"
              }`}
            >
              <img
                src={scene.img}
                alt={scene.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-2">
                <span className="text-white text-[9px] md:text-[10px] font-display tracking-wider uppercase leading-tight truncate">
                  {scene.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Fullscreen lightbox */}
        <AnimatePresence>
          {fullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black flex items-center justify-center"
            >
              {/* Loader for fullscreen */}
              {isLoading && (
                <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-10 h-10 text-joj-orange animate-spin" />
                  <span className="text-joj-muted text-sm font-sans tracking-wide">
                    {t("loading")}
                  </span>
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.img
                  key={`fs-${activeIdx}`}
                  src={active.img}
                  alt={active.title}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-full max-h-full object-contain"
                  onLoad={() => setIsLoading(false)}
                />
              </AnimatePresence>

              <button
                onClick={() => setFullscreen(false)}
                aria-label="Close"
                className="absolute top-5 right-5 bg-white/10 hover:bg-joj-orange text-white p-3 rounded-full backdrop-blur-md transition z-30"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-joj-orange text-white p-3 rounded-full backdrop-blur-md transition z-30"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-joj-orange text-white p-3 rounded-full backdrop-blur-md transition z-30"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-6 left-0 right-0 text-center text-white pointer-events-none">
                <div className="font-display text-2xl uppercase tracking-wide">
                  {active.title}
                </div>
                <div className="text-white/60 text-sm">{active.location}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
