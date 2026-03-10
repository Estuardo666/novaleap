"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { getButtonClasses } from "@/components/atoms";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  benefits: string[];
  icon: React.ReactNode;
  accentColor: "aqua" | "purple";
  index?: number;
  image?: string;
  featured?: boolean;
}

/**
 * ServiceCard - Molecular Component
 *
 * Visually rich service card with hover-reveal benefits using pure Framer Motion
 * variants propagation (no React state for hover — zero re-render lag).
 * Content expands smoothly on hover via layout animation.
 *
 * @example
 * <ServiceCard
 *   title="Play-Based Therapy"
 *   description="Learning through joy"
 *   benefits={["Engagement", "Confidence"]}
 *   accentColor="aqua"
 *   icon={<Icon />}
 *   featured={true}
 * />
 */
const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  (
    {
      title,
      description,
      benefits,
      accentColor,
      icon,
      index = 0,
      image,
      featured = false,
    },
    ref
  ) => {
    const reduceMotion = useReducedMotion();
    const [hasImageError, setHasImageError] = React.useState(false);
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // Don't toggle if user clicked a link/button inside the card
      if ((e.target as HTMLElement).closest("a, button")) return;
      setIsExpanded((prev) => !prev);
    };

    // ─── Accent color maps ──────────────────────────────────────────────────────
    const accentBorder = {
      aqua: "border-novaleap-aqua/30",
      purple: "border-novaleap-purple/30",
    };

    const accentDot = {
      aqua: "bg-novaleap-aqua",
      purple: "bg-novaleap-purple",
    };

    const accentOverlay = {
      aqua: "bg-novaleap-aqua/12",
      purple: "bg-novaleap-purple/12",
    };

    const accentButton = {
      aqua: "primary" as const,
      purple: "secondary" as const,
    };

    // ─── Framer Motion variants — propagated to children, no React state needed ─
    // Premium spring: lower stiffness + higher damping = slower, 60fps-grade settle
    const premiumSpring = { type: "spring" as const, stiffness: 180, damping: 28, mass: 0.7 };

    const cardVariants: Variants = {
      rest: { y: 0, scale: 1, transition: premiumSpring },
      hover: {
        y: reduceMotion ? 0 : -7,
        scale: reduceMotion ? 1 : 1.018,
        transition: premiumSpring,
      },
    };

    const overlayVariants: Variants = {
      rest: { opacity: 0, transition: { duration: 0.4, ease: "easeOut" } },
      hover: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    };

    // Darken image on hover for better text contrast
    const imageDimVariants: Variants = {
      rest: { opacity: 0.7, transition: { duration: 0.45, ease: "easeOut" } },
      hover: { opacity: 0.93, transition: { duration: 0.45, ease: "easeOut" } },
    };

    const imageZoomVariants: Variants = {
      rest: { scale: 1, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
      hover: { scale: reduceMotion ? 1 : 1.07, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
    };

    const iconVariants: Variants = {
      rest: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 280, damping: 26, mass: 0.5 } },
      hover: {
        scale: reduceMotion ? 1 : 1.12,
        rotate: reduceMotion ? 0 : 10,
        transition: { type: "spring", stiffness: 280, damping: 26, mass: 0.5 },
      },
    };

    // Benefits container: height 0 → auto — smooth spring, no jarring
    const benefitsVariants: Variants = {
      rest: featured
        ? { opacity: 1, height: "auto" }
        : { opacity: 0, height: 0, transition: { type: "spring", stiffness: 200, damping: 30, mass: 0.6 } },
      hover: {
        opacity: 1,
        height: "auto",
        transition: { type: "spring", stiffness: 200, damping: 30, mass: 0.6 },
      },
    };

    const benefitItemVariants: Variants = {
      rest: featured ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 },
      hover: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 260, damping: 28, mass: 0.5 },
      },
    };

    return (
      // Outer wrapper: only handles the scroll entry animation
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 18,
          delay: index * 0.08,
        }}
        className="h-full"
      >
        {/* Inner wrapper: handles hover variants — propagated to ALL children */}
        <motion.div
          variants={cardVariants}
          initial="rest"
          whileHover="hover"
          animate={isExpanded ? "hover" : "rest"}
          onClick={handleCardClick}
          layout
          className={cn(
            "relative rounded-3xl border-2 cursor-pointer overflow-hidden h-full",
            featured ? "min-h-[320px] sm:min-h-[360px] lg:min-h-[440px]" : "min-h-[230px] sm:min-h-[250px]",
            "bg-gradient-to-br from-novaleap-navy/80 to-novaleap-navy/60",
            accentBorder[accentColor]
          )}
        >
        {/* ── Background image ── */}
        {/* Note: no inner rounded-3xl — parent card has overflow-hidden + rounded-3xl */}
        {image && !hasImageError ? (
          <div className="absolute inset-0">
            <motion.img
              src={image}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
              onError={() => setHasImageError(true)}
              variants={imageZoomVariants}
            />
            {/* Gradient dim layer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10"
              variants={imageDimVariants}
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-novaleap-navy via-novaleap-navy/90 to-black" />
        )}

        {/* ── Decorative spinning orb ── */}
        <motion.div
          aria-hidden="true"
          className={cn(
            "absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-25 mix-blend-overlay",
            accentDot[accentColor]
          )}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />

        {/* ── Accent color overlay (reveals on hover) ── */}
        <motion.div
          aria-hidden="true"
          className={cn("absolute inset-0 z-10", accentOverlay[accentColor])}
          variants={overlayVariants}
        />

        {/* ── Card content ── */}
        {featured ? (
          // Featured: icon anchored top, text anchored bottom
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            {/* Icon top-left */}
            <motion.div
              className="inline-flex self-start items-center justify-center h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
              variants={iconVariants}
              aria-hidden="true"
            >
              {icon}
            </motion.div>

            {/* Text group at bottom */}
            <div className="flex flex-col">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-2">
                {title}
              </h3>
              <p className="text-sm sm:text-base font-medium text-white/90 mb-4">
                {description}
              </p>

              <motion.ul className="overflow-hidden space-y-1.5" variants={benefitsVariants}>
                {benefits.map((benefit, idx) => (
                  <motion.li
                    key={benefit}
                    variants={benefitItemVariants}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-2 text-xs sm:text-sm text-white/80 leading-snug"
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full flex-shrink-0 mt-1.5", accentDot[accentColor])} aria-hidden="true" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <a
                href="/services"
                className={getButtonClasses({
                  variant: accentButton[accentColor],
                  size: "sm",
                  className: "relative z-30 mt-4 w-fit px-5 py-2.5 text-xs sm:text-sm",
                })}
              >
                <span className="relative z-10 inline-flex items-center justify-center">Learn More</span>
              </a>
            </div>
          </div>
        ) : (
          // Normal cards: icon inline at top, content below, fills full card height
          <div className="relative z-20 flex flex-col h-full p-5 sm:p-6">
            <motion.div
              className="inline-flex self-start items-center justify-center h-10 w-10 mb-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
              variants={iconVariants}
              aria-hidden="true"
            >
              {icon}
            </motion.div>

            <div className="flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight mb-1.5">
                {title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-white/90 mb-3">
                {description}
              </p>

              <motion.ul className="overflow-hidden space-y-1.5" variants={benefitsVariants}>
                {benefits.map((benefit, idx) => (
                  <motion.li
                    key={benefit}
                    variants={benefitItemVariants}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-2 text-xs sm:text-sm text-white/80 leading-snug"
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full flex-shrink-0 mt-1.5", accentDot[accentColor])} aria-hidden="true" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <a
                href="/services"
                className={getButtonClasses({
                  variant: accentButton[accentColor],
                  size: "sm",
                  className: "relative z-30 mt-4 w-fit px-5 py-2.5 text-xs sm:text-sm",
                })}
              >
                <span className="relative z-10 inline-flex items-center justify-center">Learn More</span>
              </a>
            </div>
          </div>
        )}
        {/* ── /Inner hover wrapper ── */}
        </motion.div>
      {/* ── /Outer entry wrapper ── */}
      </motion.div>
    );
  }
);

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
