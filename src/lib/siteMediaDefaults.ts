/**
 * Default site media values — used as fallback and to seed the database.
 * Each entry maps a unique key (page.slot) to its default URL.
 */
export interface SiteMediaDefault {
  key: string;
  url: string;
  type: "image" | "video";
  label: string;
  page: string;
}

export const siteMediaDefaults: SiteMediaDefault[] = [
  // ─── Home ──────────────────────────────────────────────
  {
    key: "home.hero-video",
    url: "/media/Novaleap-video-hero.mp4",
    type: "video",
    label: "Video Principal del Hero",
    page: "home",
  },
  {
    key: "home.hero-poster",
    url: "/media/Novaleap-video-hero.jpg",
    type: "image",
    label: "Hero - Imagen de Fondo (Poster del Video)",
    page: "home",
  },
  {
    key: "home.why-us-slide-1",
    url: "/Novaleap BG.jpg",
    type: "image",
    label: "Why Us Slide 1 — Play-Based Therapy",
    page: "home",
  },
  {
    key: "home.why-us-slide-2",
    url: "/Novaleap BG.jpg",
    type: "image",
    label: "Why Us Slide 2 — Personalized Programs",
    page: "home",
  },
  {
    key: "home.why-us-slide-3",
    url: "/Novaleap BG.jpg",
    type: "image",
    label: "Why Us Slide 3 — Family Partnership",
    page: "home",
  },

  // ─── Who We Are ────────────────────────────────────────
  {
    key: "who-we-are.hero-image",
    url: "/media/who-we-are-hero.jpg",
    type: "image",
    label: "Hero de Página",
    page: "who-we-are",
  },
  {
    key: "who-we-are.about-image",
    url: "/media/novaleap%20about%20us.jpg",
    type: "image",
    label: "Imagen About Us",
    page: "who-we-are",
  },
  {
    key: "who-we-are.play-image",
    url: "/media/novaleap-pic-3.jpg",
    type: "image",
    label: "Play With Purpose - Imagen Principal",
    page: "who-we-are",
  },
  {
    key: "who-we-are.play-image-2",
    url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
    type: "image",
    label: "Play With Purpose - Imagen Secundaria",
    page: "who-we-are",
  },
  {
    key: "who-we-are.team-jen",
    url: "/media/Jenzpher%20Finkenberg.jpg",
    type: "image",
    label: "Foto Jenzpher Finkenberg",
    page: "who-we-are",
  },
  {
    key: "who-we-are.team-krishna",
    url: "/media/Krishna%20Finkenberg.jpg",
    type: "image",
    label: "Foto Krishna Finkenberg",
    page: "who-we-are",
  },
  {
    key: "who-we-are.cta-image",
    url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=80",
    type: "image",
    label: "Imagen CTA (Call to Action)",
    page: "who-we-are",
  },

  // ─── Our Approach ──────────────────────────────────────
  {
    key: "our-approach.hero-image",
    url: "/Novaleap BG.jpg",
    type: "image",
    label: "Hero de Página",
    page: "our-approach",
  },
  {
    key: "our-approach.play-image",
    url: "/figma-assets/51d6a3ba460fbaca2c51a506c8f355094d34a27c.png",
    type: "image",
    label: "Play With Purpose - Imagen",
    page: "our-approach",
  },
  {
    key: "our-approach.partners-image",
    url: "/Novaleap BG.jpg",
    type: "image",
    label: "Partners In Progress - Imagen de Fondo",
    page: "our-approach",
  },

  // ─── Parents ───────────────────────────────────────────
  {
    key: "parents.expect-image",
    url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1400&q=80",
    type: "image",
    label: "What To Expect - Imagen",
    page: "parents",
  },

  // ─── Services: Evaluation ──────────────────────────────
  {
    key: "services.evaluations-and-assessments.hero-image",
    url: "https://images.pexels.com/photos/7089636/pexels-photo-7089636.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "image",
    label: "Fondo Principal de Evaluación (Hero)",
    page: "services",
  },
  {
    key: "services.evaluations-and-assessments.card-image",
    url: "https://images.pexels.com/photos/7089636/pexels-photo-7089636.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "image",
    label: "Card de Servicio (Evaluación)",
    page: "services",
  },
  {
    key: "services.evaluations-and-assessments.feature-image",
    url: "https://images.pexels.com/photos/7088524/pexels-photo-7088524.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "image",
    label: "Feature Media Poster (Evaluación)",
    page: "services",
  },
  {
    key: "services.evaluations-and-assessments.feature-video",
    url: "",
    type: "video",
    label: "Video de Evaluación (Modal)",
    page: "services",
  },

  // ─── Services: Treatment ───────────────────────────────
  {
    key: "services.treatment.hero-image",
    url: "https://images.pexels.com/photos/8613314/pexels-photo-8613314.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "image",
    label: "Fondo Principal de Tratamiento (Hero)",
    page: "services",
  },
  {
    key: "services.treatment.card-image",
    url: "https://images.pexels.com/photos/8613314/pexels-photo-8613314.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "image",
    label: "Card de Servicio (Treatment)",
    page: "services",
  },
  {
    key: "services.treatment.feature-image",
    url: "https://images.pexels.com/photos/8943180/pexels-photo-8943180.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "image",
    label: "Feature Media Poster (Treatment)",
    page: "services",
  },
  {
    key: "services.treatment.feature-video",
    url: "",
    type: "video",
    label: "Video de Treatment (Modal)",
    page: "services",
  },

  // ─── Global ────────────────────────────────────────────
  {
    key: "global.logo-light",
    url: "/Logotipo para fondo claro.png",
    type: "image",
    label: "Logotipo (Fondo Claro)",
    page: "global",
  },
  {
    key: "global.logo-dark",
    url: "/Logotipo para fondo oscuro.png",
    type: "image",
    label: "Logotipo (Fondo Oscuro)",
    page: "global",
  },
  {
    key: "global.bg-texture",
    url: "/Novaleap BG.jpg",
    type: "image",
    label: "Textura de Fondo General",
    page: "global",
  },
];

/**
 * Get the default URL for a specific media slot key.
 */
export function getDefaultMediaUrl(key: string): string {
  const entry = siteMediaDefaults.find((m) => m.key === key);
  return entry?.url ?? "";
}
