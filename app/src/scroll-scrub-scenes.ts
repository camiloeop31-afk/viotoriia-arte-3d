/** Brand tokens retained for the optional cinematic scroll experience. */
import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#b88c55",
  background: "#f5f0e7",
  ink: "#24372e",
  muted: "#7c8178",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    body: "Objetos decorativos creados para acompañar tus celebraciones y momentos favoritos.",
    clip: "/assets/world/scene-01.mp4",
    id: "scene-01",
    kicker: "Colección Navidad 2026",
    label: "La colección",
    mobileClip: "/assets/world/scene-01-mobile.mp4",
    mobilePoster: "/assets/world/scene-01-mobile-poster.png",
    poster: "/assets/world/scene-01-poster.png",
    tags: ["Diseños especiales"],
    title: "Pequeños detalles, grandes momentos.",
  },
];
