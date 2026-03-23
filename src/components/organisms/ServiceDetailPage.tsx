"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Activity, ArrowRight, ChevronDown, Footprints, Play, Quote, ShieldPlus, Sparkles, X } from "lucide-react";
import { getButtonClasses } from "@/components/atoms";
import {
  NOVALEAP_VIEWPORT,
  getNovaleapRevealVariants,
  getNovaleapStaggerContainerVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
} from "@/lib/novaleapMotion";
import { getServiceBySlug, type ServiceCatalogItem } from "@/lib/servicesCatalog";
import { cn } from "@/lib/utils";

interface ServiceDetailPageProps {
  slug: string;
}

const accentBadgeClasses: Record<ServiceCatalogItem["accentColor"], string> = {
  navy: "border-white/25 bg-white/12 text-white",
  purple: "border-white/25 bg-white/12 text-white",
  aqua: "border-white/30 bg-white/14 text-white",
};

const accentSurfaceClasses: Record<ServiceCatalogItem["accentColor"], string> = {
  navy: "from-novaleap-navy via-[#1d356d] to-novaleap-purple",
  purple: "from-novaleap-purple via-[#8773b4] to-novaleap-aqua",
  aqua: "from-novaleap-aqua via-[#41c7c4] to-novaleap-purple",
};

const accentGlowClasses: Record<ServiceCatalogItem["accentColor"], string> = {
  navy: "from-novaleap-navy/18 via-novaleap-purple/10 to-transparent",
  purple: "from-novaleap-purple/18 via-novaleap-aqua/12 to-transparent",
  aqua: "from-novaleap-aqua/22 via-novaleap-purple/10 to-transparent",
};

const signCardIcons = [Sparkles, Footprints, Activity, ShieldPlus];

const signCardHoverPresets = [
  {
    hoverRotate: -1.1,
    hoverBackground: "rgba(242, 252, 251, 0.98)",
    hoverBorder: "rgba(0, 183, 181, 0.24)",
    hoverShadow: "0 34px 80px -48px rgba(0, 183, 181, 0.42)",
    hoverIconColor: "rgba(0, 122, 123, 1)",
    hoverTitleColor: "rgba(0, 122, 123, 1)",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(0,183,181,0.2),transparent_62%)]",
  },
  {
    hoverRotate: 1.1,
    hoverBackground: "rgba(248, 244, 253, 0.98)",
    hoverBorder: "rgba(151, 122, 188, 0.24)",
    hoverShadow: "0 34px 80px -48px rgba(151, 122, 188, 0.42)",
    hoverIconColor: "rgba(109, 78, 152, 1)",
    hoverTitleColor: "rgba(109, 78, 152, 1)",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(151,122,188,0.2),transparent_62%)]",
  },
  {
    hoverRotate: -0.9,
    hoverBackground: "rgba(255, 249, 239, 0.98)",
    hoverBorder: "rgba(255, 194, 102, 0.26)",
    hoverShadow: "0 34px 80px -48px rgba(255, 194, 102, 0.42)",
    hoverIconColor: "rgba(184, 118, 24, 1)",
    hoverTitleColor: "rgba(184, 118, 24, 1)",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(255,194,102,0.24),transparent_62%)]",
  },
  {
    hoverRotate: 1,
    hoverBackground: "rgba(242, 252, 251, 0.98)",
    hoverBorder: "rgba(0, 183, 181, 0.24)",
    hoverShadow: "0 34px 80px -48px rgba(0, 183, 181, 0.42)",
    hoverIconColor: "rgba(0, 122, 123, 1)",
    hoverTitleColor: "rgba(0, 122, 123, 1)",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(0,183,181,0.2),transparent_62%)]",
  },
] as const;

const challengeSubtitleBySign: Record<string, string> = {
  "Torticollis": "Neck alignment",
  "Plagiocephaly (flat head syndrome)": "Head shape support",
  "Developmental delays": "Milestone progress",
  "Ehlers-Danlos Syndrome": "Joint stability",
  "Hypotonia (low muscle tone)": "Strength building",
  "Toe walking": "Gait pattern",
  "Intoeing and out toeing": "Foot alignment",
  "Balance, coordination, and motor planning challenges": "Motor control",
  "Neurological or genetic conditions": "Neuro support",
  "Challenges affecting musculoskeletal system": "MSK function",
  "Prematurity": "Early support",
  "Juvenile rheumatoid arthritis": "Joint comfort",
  "Orthopedic injuries": "Recovery support",
  "Scoliosis": "Postural support",
  "Deconditioning": "Endurance rebuild",
};

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug }) => {
  const prefersReducedMotion = useReducedMotion();
  const [openFaqIndex, setOpenFaqIndex] = React.useState(0);
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const service = React.useMemo(() => getServiceBySlug(slug), [slug]);

  if (!service) {
    return null;
  }

  const Icon = service.icon;

  React.useEffect(() => {
    if (!isVideoOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isVideoOpen]);

  return (
    <>
      <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden px-4 pb-16 pt-36 sm:px-6 sm:pb-20 lg:px-8">
        <Image
          src={service.image}
          alt={service.hero.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {!prefersReducedMotion && service.hero.heroVideoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={service.image}
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          >
            <source src={service.hero.heroVideoSrc} type="video/mp4" />
          </video>
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,34,78,0.28)_0%,rgba(17,34,78,0.52)_38%,rgba(17,34,78,0.78)_100%)]" />
        <div className={cn("absolute inset-0 bg-gradient-to-br", accentGlowClasses[service.accentColor])} />

        <motion.div
          initial="hidden"
          animate="show"
          variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.08, 0.14)}
          className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-center"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center text-white">
            <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 14)}>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/92">
                  {service.hero.pretitle}
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.14, 0.14)}
              className="mt-6 text-balance text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-[4.6rem]"
            >
              {service.titleLines.map((line) => (
                <motion.span
                  key={line}
                  variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                  className="block text-balance"
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              variants={getNovaleapRevealVariants(prefersReducedMotion, 18, 0.16)}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl"
            >
              {service.hero.description}
            </motion.p>

            <motion.div
              variants={getNovaleapRevealVariants(prefersReducedMotion, 18, 0.22)}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
            >
              <Link
                href={service.hero.primaryButtonHref}
                className={getButtonClasses({
                  variant: "outline",
                  size: "md",
                  className: "w-full justify-center sm:w-auto",
                })}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  <span>{service.hero.primaryButtonLabel}</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={2.1} />
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className={getButtonClasses({
                  variant: "ghost",
                  size: "md",
                  className:
                    "border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/18 w-full sm:w-auto justify-center",
                })}
              >
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/22">
                    <Play className="h-3 w-3 fill-current" />
                  </span>
                  See Therapy In Action
                </span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="relative px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          <div className="relative w-full self-start lg:w-[42%]">
            <div className="max-w-xl h-fit lg:sticky lg:top-28">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={NOVALEAP_VIEWPORT}
                variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.08, 0.12)}
              >
                <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 16)}>
                  <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/28 bg-white/82 px-3 py-1 shadow-[0_16px_30px_-26px_rgba(17,34,78,0.2)]">
                    <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                      {service.whySection.pretitle}
                    </p>
                  </div>
                </motion.div>

                <motion.h2
                  variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.08, 0.12)}
                  className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl"
                >
                  <motion.span
                    variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                    className="block text-balance"
                  >
                    {service.whySection.title}
                  </motion.span>
                </motion.h2>

                <motion.p
                  variants={getNovaleapRevealVariants(prefersReducedMotion, 18, 0.12)}
                  className="mt-6 text-left text-lg leading-relaxed text-novaleap-navy/80"
                >
                  {service.whySection.description}
                </motion.p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.16 }}
            variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.16, 0.12)}
            className="grid w-full gap-3 sm:grid-cols-2 lg:w-[58%]"
          >
            {service.whySection.signs.map((sign, index) => {
              const SignIcon = signCardIcons[index] ?? service.icon;
              const hoverPreset = signCardHoverPresets[index % signCardHoverPresets.length];

              return (
                <motion.article
                  key={sign}
                  variants={getNovaleapRevealVariants(prefersReducedMotion, 18)}
                  className="h-full"
                >
                  <motion.div
                    initial="rest"
                    animate="rest"
                    whileHover={prefersReducedMotion ? undefined : "hover"}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
                    transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.92 }}
                    variants={{
                      rest: {
                        y: 0,
                        rotate: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderColor: "rgba(255, 255, 255, 0.8)",
                        boxShadow: "0 28px 70px -50px rgba(17, 34, 78, 0.35)",
                      },
                      hover: {
                        y: -10,
                        rotate: hoverPreset.hoverRotate,
                        backgroundColor: hoverPreset.hoverBackground,
                        borderColor: hoverPreset.hoverBorder,
                        boxShadow: hoverPreset.hoverShadow,
                      },
                    }}
                    className="group relative h-full overflow-hidden rounded-[1.9rem] border"
                  >
                    <motion.div
                      aria-hidden="true"
                      variants={{
                        rest: { opacity: 0, scale: 0.82, x: -30, y: -18 },
                        hover: { opacity: 1, scale: 1.1, x: 0, y: 0 },
                      }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                      className={cn("absolute inset-0", hoverPreset.glowClass)}
                    />

                    {service.whySection.signImages?.[index] ? (
                      <div className="relative h-32 overflow-hidden sm:h-36">
                        <motion.div
                          variants={{
                            rest: { scale: 1 },
                            hover: { scale: 1.045 },
                          }}
                          transition={{ type: "spring", stiffness: 220, damping: 24 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={service.whySection.signImages[index]}
                            alt=""
                            fill
                            sizes="(max-width: 639px) 100vw, 45vw"
                            className="object-cover object-center"
                            aria-hidden="true"
                          />
                        </motion.div>
                      </div>
                    ) : null}

                    <div className="relative z-10 p-4 text-left sm:p-4">
                      <div className="flex items-start gap-2.5">
                        <motion.div
                          variants={{
                            rest: { scale: 1, rotate: 0, color: "rgba(17, 34, 78, 1)" },
                            hover: { scale: 1.06, rotate: 6, color: hoverPreset.hoverIconColor },
                          }}
                          transition={{ type: "spring", stiffness: 280, damping: 18 }}
                          className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-novaleap-aqua/24 bg-white/78 text-novaleap-navy"
                        >
                          <SignIcon className="h-[12px] w-[12px]" strokeWidth={2.1} />
                        </motion.div>

                        <motion.p
                          variants={{
                            rest: { x: 0, color: "rgba(17, 34, 78, 1)" },
                            hover: { x: 3, color: hoverPreset.hoverTitleColor },
                          }}
                          transition={{ type: "spring", stiffness: 250, damping: 20 }}
                          className="text-left text-base font-semibold leading-tight tracking-tight text-novaleap-navy sm:text-[1.06rem]"
                        >
                          {sign}
                        </motion.p>
                      </div>

                      <motion.p
                        variants={{
                          rest: { x: 0 },
                          hover: { x: 2 },
                        }}
                        transition={{ type: "spring", stiffness: 220, damping: 24 }}
                        className="mt-1.5 text-left text-sm leading-snug text-novaleap-purple"
                      >
                        {challengeSubtitleBySign[sign] ?? "Targeted support"}
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={NOVALEAP_VIEWPORT}
            variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.08, 0.12)}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 14)}>
              <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/28 bg-white/82 px-3 py-1 shadow-[0_16px_30px_-26px_rgba(17,34,78,0.2)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                  {service.featureMedia.pretitle}
                </p>
              </div>
            </motion.div>
            <motion.h2
              variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.08, 0.14)}
              className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl"
            >
              <motion.span
                variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                className="block text-balance"
              >
                {service.featureMedia.title}
              </motion.span>
            </motion.h2>
            <motion.p
              variants={getNovaleapRevealVariants(prefersReducedMotion, 18, 0.12)}
              className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-novaleap-navy/78"
            >
              {service.featureMedia.description}
            </motion.p>
          </motion.div>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 110, damping: 20 }}
            onClick={() => setIsVideoOpen(true)}
            className="group relative mt-12 block w-full overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 p-3 text-left shadow-[0_34px_90px_-52px_rgba(17,34,78,0.4)] backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.6rem]">
              <Image
                src={service.featureMedia.posterImage}
                alt={service.featureMedia.posterAlt}
                fill
                sizes="(max-width: 1280px) 100vw, 1100px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,34,78,0.12)_0%,rgba(17,34,78,0.54)_100%)]" />
              <motion.div
                aria-hidden="true"
                animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                }
                className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/88 text-novaleap-navy shadow-[0_22px_44px_-16px_rgba(17,34,78,0.42)]"
              >
                <Play className="ml-1 h-8 w-8 fill-current" aria-hidden="true" />
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/14 px-4 py-1.5 backdrop-blur-md">
                  <Icon className="h-4 w-4 text-white" strokeWidth={2.2} />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/92">
                    {service.title}
                  </span>
                </div>
                <p className="mt-4 max-w-2xl text-lg font-semibold leading-snug tracking-tight text-white sm:text-2xl">
                  Tap to open the full-screen therapy feature.
                </p>
              </div>
            </div>
          </motion.button>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={NOVALEAP_VIEWPORT}
            variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.08, 0.12)}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 14)}>
              <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/28 bg-white/82 px-3 py-1 shadow-[0_16px_30px_-26px_rgba(17,34,78,0.2)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                  {service.pillarsPretitle}
                </p>
              </div>
            </motion.div>
            <motion.h2
              variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.08, 0.14)}
              className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl"
            >
              <motion.span
                variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                className="block text-balance"
              >
                Our approach to {service.title.toLowerCase()}
              </motion.span>
            </motion.h2>
          </motion.div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {service.pillars.map((pillar, index) => {
              const PillarIcon = pillar.icon;

              return (
                <motion.article
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ type: "spring", stiffness: 110, damping: 20, delay: index * 0.08 }}
                  className="h-full"
                >
                  <motion.div
                    initial="rest"
                    animate="rest"
                    whileHover={prefersReducedMotion ? undefined : "hover"}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
                    transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.92 }}
                    variants={{
                      rest: {
                        y: 0,
                        rotate: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderColor: "rgba(255, 255, 255, 0.8)",
                        boxShadow: "0 28px 70px -50px rgba(17, 34, 78, 0.35)",
                      },
                      hover: {
                        y: -10,
                        rotate: index % 2 === 0 ? -1.2 : 1.2,
                        backgroundColor: "rgba(242, 252, 251, 0.98)",
                        borderColor: "rgba(0, 183, 181, 0.22)",
                        boxShadow: "0 34px 80px -48px rgba(0, 183, 181, 0.42)",
                      },
                    }}
                    className="relative h-full overflow-hidden rounded-[2rem] border p-7"
                  >
                    <motion.div
                      aria-hidden="true"
                      variants={{
                        rest: { opacity: 0, scale: 0.82, x: -30, y: -18 },
                        hover: { opacity: 1, scale: 1.1, x: 0, y: 0 },
                      }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                      className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,183,181,0.26),transparent_64%)]"
                    />
                    <motion.div
                      variants={{
                        rest: { scale: 1, rotate: 0, color: "rgba(17, 34, 78, 1)" },
                        hover: { scale: 1.08, rotate: 6, color: "rgba(0, 122, 123, 1)" },
                      }}
                      transition={{ type: "spring", stiffness: 280, damping: 18 }}
                      className="relative z-10 flex h-14 w-14 items-center justify-center rounded-[1.35rem] bg-[linear-gradient(135deg,rgba(0,183,181,0.16),rgba(151,122,188,0.18))]"
                    >
                      <PillarIcon className="h-6 w-6" strokeWidth={1.9} />
                    </motion.div>
                    <motion.h3
                      variants={{
                        rest: { x: 0, color: "rgba(17, 34, 78, 1)" },
                        hover: { x: 3, color: "rgba(0, 122, 123, 1)" },
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="relative z-10 mt-6 text-2xl font-bold leading-[1.1] tracking-tight text-novaleap-navy"
                    >
                      {pillar.title}
                    </motion.h3>
                    <p className="relative z-10 mt-4 text-left text-base leading-relaxed text-novaleap-navy/75">
                      {pillar.description}
                    </p>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ type: "spring", stiffness: 110, damping: 20 }}
            className={cn(
              "relative overflow-hidden rounded-[2.4rem] border border-white/80 px-6 py-12 shadow-[0_34px_90px_-52px_rgba(17,34,78,0.38)] backdrop-blur-sm sm:px-10 sm:py-14",
              "bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(247,251,255,0.82))]"
            )}
          >
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-80", accentGlowClasses[service.accentColor])} />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/26 bg-white/75 px-3 py-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                  {service.testimonialPretitle}
                </p>
              </div>
              <Quote className="mt-6 h-14 w-14 text-novaleap-purple/28" aria-hidden="true" />
              <blockquote className="mt-4 text-balance text-2xl font-semibold leading-[1.32] tracking-tight text-novaleap-navy sm:text-[2rem]">
                “{service.testimonial.quote}”
              </blockquote>
              <footer className="mt-6 text-base font-medium text-novaleap-navy/72">
                {service.testimonial.author}, {service.testimonial.role}
              </footer>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={NOVALEAP_VIEWPORT}
            variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.08, 0.12)}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 16)}>
              <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/28 bg-white/86 px-3 py-1 shadow-[0_16px_30px_-26px_rgba(17,34,78,0.2)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                  {service.faqPretitle}
                </p>
              </div>
            </motion.div>
            <motion.h2
              variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.08, 0.14)}
              className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl"
            >
              <motion.span
                variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                className="block text-balance"
              >
                Frequently asked questions
              </motion.span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.16 }}
            variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.16, 0.12)}
            className="mx-auto mt-12 max-w-3xl space-y-4"
          >
            {service.faqs.map((item, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <motion.div
                  key={item.question}
                  variants={getNovaleapRevealVariants(prefersReducedMotion, 14)}
                  className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/85 shadow-[0_24px_60px_-42px_rgba(17,34,78,0.28)] backdrop-blur-sm"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${service.id}-faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                    onClick={() => setOpenFaqIndex((current) => (current === index ? -1 : index))}
                  >
                    <span className="text-lg font-semibold leading-snug tracking-tight text-novaleap-navy sm:text-xl">
                      {item.question}
                    </span>
                    <motion.span
                      animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 240, damping: 20 }
                      }
                      className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-novaleap-aqua/10 text-novaleap-aqua"
                    >
                      <ChevronDown className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="content"
                        id={`${service.id}-faq-panel-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : {
                                height: { duration: 0.28, ease: "easeOut" },
                                opacity: { duration: 0.22, ease: "easeOut" },
                              }
                        }
                        className="overflow-hidden"
                      >
                        <div className="border-t border-novaleap-navy/8 px-5 pb-5 pt-4 sm:px-6">
                          <p className="text-left text-base leading-relaxed text-novaleap-navy/76 sm:text-lg">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 pb-24 pt-6 sm:px-6 sm:pb-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ type: "spring", stiffness: 110, damping: 20 }}
          className={cn(
            "mx-auto max-w-7xl overflow-hidden rounded-[2.6rem] border border-white/22 px-6 py-12 shadow-[0_32px_90px_-44px_rgba(17,34,78,0.45)] sm:px-10 sm:py-16",
            "bg-gradient-to-br text-white",
            accentSurfaceClasses[service.accentColor]
          )}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/28 bg-white/10 px-3 py-1 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/92">
                  {service.bottomCtaPretitle}
                </p>
              </div>
              <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
                {service.bottomCta.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/88">
                {service.bottomCta.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={service.bottomCta.buttonHref}
                className={getButtonClasses({
                  variant: "primary",
                  size: "md",
                  className: "w-full justify-center sm:w-auto",
                })}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  <span>{service.bottomCta.buttonLabel}</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={2.1} />
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {isVideoOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-novaleap-navy/82 px-4 py-8 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`${service.title} video feature`}
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96, y: 16 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98, y: 12 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(160deg,rgba(12,24,56,0.98),rgba(17,34,78,0.92))] p-3 shadow-[0_48px_120px_-36px_rgba(0,0,0,0.65)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="absolute right-5 top-5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-novaleap-navy"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-[16/9] overflow-hidden rounded-[1.4rem]">
                {service.featureMedia.videoSrc ? (
                  <video
                    controls
                    autoPlay={!prefersReducedMotion}
                    playsInline
                    poster={service.featureMedia.posterImage}
                    className="h-full w-full object-cover"
                  >
                    <source src={service.featureMedia.videoSrc} type="video/mp4" />
                  </video>
                ) : (
                  <>
                    <Image
                      src={service.featureMedia.posterImage}
                      alt={service.featureMedia.posterAlt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,34,78,0.12),rgba(17,34,78,0.62))]" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <div className={cn(
                        "inline-flex items-center gap-3 rounded-full border px-4 py-1.5 backdrop-blur-md",
                        accentBadgeClasses[service.accentColor]
                      )}>
                        <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                        <span className="text-xs font-semibold uppercase tracking-[0.22em]">
                          Video-ready layout
                        </span>
                      </div>
                      <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                        Replace this poster with your licensed therapy footage.
                      </h3>
                      <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/84 sm:text-lg">
                        The cinematic modal, custom play entry point, and responsive video shell are wired. Add a real MP4 source to this service record when the final media is ready.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default ServiceDetailPage;