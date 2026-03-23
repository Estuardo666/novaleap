"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { getButtonClasses } from "@/components/atoms";
import { cn } from "@/lib/utils";

interface ServiceCarouselCardProps {
  pretitle: string;
  title: string;
  titleLines?: string[];
  description: string;
  image: string;
  icon: LucideIcon;
  href: string;
  accentColor: "navy" | "purple" | "aqua";
  sizeVariant?: "default" | "expanded";
}

const ServiceCarouselCard = React.forwardRef<HTMLDivElement, ServiceCarouselCardProps>(
  (
    { pretitle, title, titleLines, description, image, icon: Icon, href, accentColor, sizeVariant = "default" },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const isExpanded = sizeVariant === "expanded";
    const normalizedTitleLines = React.useMemo(() => {
      const lines = (titleLines && titleLines.length > 0 ? titleLines : [title])
        .map((line) => line.trim())
        .filter(Boolean)
        .slice(0, 2);

      return lines.length > 0 ? lines : [title];
    }, [title, titleLines]);

    const surfaceClasses = {
      navy: "bg-novaleap-navy",
      purple: "bg-novaleap-purple",
      aqua: "bg-novaleap-aqua",
    };

    const iconClasses = {
      navy: "border-white/20 bg-white/8 text-white",
      purple: "border-white/20 bg-white/10 text-white",
      aqua: "border-white/25 bg-white/12 text-white",
    };

    const descriptionClasses = {
      navy: "text-white",
      purple: "text-white",
      aqua: "text-white",
    };

    const buttonClasses = {
      navy: getButtonClasses({
        variant: "outline",
        size: isExpanded ? "md" : "sm",
        className:
          isExpanded
            ? "border-novaleap-navy bg-novaleap-navy px-6 py-3 text-sm text-white shadow-none hover:shadow-none before:bg-[linear-gradient(90deg,#11224e_0%,#00b7b5_100%)] sm:text-base"
            : "border-novaleap-navy bg-novaleap-navy px-5 py-2.5 text-sm text-white shadow-none hover:shadow-none before:bg-[linear-gradient(90deg,#11224e_0%,#00b7b5_100%)] sm:px-4 sm:py-2 sm:text-sm",
      }),
      purple: getButtonClasses({
        variant: "secondary",
        size: isExpanded ? "md" : "sm",
        className: isExpanded
          ? "px-6 py-3 text-sm shadow-none hover:shadow-none sm:text-base"
          : "px-5 py-2.5 text-sm shadow-none hover:shadow-none sm:px-4 sm:py-2 sm:text-sm",
      }),
      aqua: getButtonClasses({
        variant: "primary",
        size: isExpanded ? "md" : "sm",
        className: isExpanded
          ? "px-6 py-3 text-sm shadow-none hover:shadow-none sm:text-base"
          : "px-5 py-2.5 text-sm shadow-none hover:shadow-none sm:px-4 sm:py-2 sm:text-sm",
      }),
    };

    const hoverRotations = {
      navy: -1.1,
      purple: 1.2,
      aqua: -0.9,
    };

    const cardVariants: Variants = {
      rest: {
        y: 0,
        rotate: 0,
        filter: "brightness(1) saturate(1)",
        transition: { type: "spring", stiffness: 220, damping: 26, mass: 0.8 },
      },
      hover: {
        y: prefersReducedMotion ? 0 : -10,
        rotate: prefersReducedMotion ? 0 : hoverRotations[accentColor],
        filter: prefersReducedMotion ? "brightness(1) saturate(1)" : "brightness(0.95) saturate(1.01)",
        transition: { type: "spring", stiffness: 240, damping: 22, mass: 0.85 },
      },
    };

    const imageVariants: Variants = {
      rest: { scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
      hover: {
        scale: prefersReducedMotion ? 1 : 1.018,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
      },
    };

    const iconVariants: Variants = {
      rest: { rotate: 0, scale: 1 },
      hover: {
        rotate: prefersReducedMotion ? 0 : 8,
        scale: prefersReducedMotion ? 1 : 1.05,
        transition: { type: "spring", stiffness: 260, damping: 22 },
      },
    };

    const shimmerVariants: Variants = {
      rest: { x: "-120%", opacity: 0 },
      hover: {
        x: "120%",
        opacity: prefersReducedMotion ? 0 : 0.14,
        transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
      },
    };

    return (
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 95, damping: 18 }}
        variants={cardVariants}
        animate="rest"
        whileHover="hover"
        className="h-full"
      >
        <div
          className={cn(
            "group relative flex flex-col overflow-hidden border border-novaleap-navy/12 bg-transparent",
            isExpanded
              ? "h-[38.5rem] rounded-[2.5rem] sm:h-[40.5rem]"
              : "h-[36rem] rounded-[2.2rem] sm:h-[37rem]"
          )}
        >
          <motion.div
            aria-hidden="true"
            variants={shimmerVariants}
            className="pointer-events-none absolute inset-y-0 left-0 z-30 w-24 -skew-x-12 bg-white/20 blur-2xl"
          />

          <div
            className={cn(
              "relative flex flex-col",
              isExpanded
                ? "h-[18.6rem] px-7 pb-6 pt-7 sm:h-[19.2rem] sm:px-8 sm:pb-6 sm:pt-8"
                : "h-[16.9rem] px-6 pb-5 pt-6 sm:h-[17.3rem] sm:px-7 sm:pb-5 sm:pt-7",
              surfaceClasses[accentColor]
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm",
                  isExpanded ? "px-3.5 py-1.5" : "px-3 py-1"
                )}
              >
                <p className={cn(
                  "font-semibold uppercase tracking-wide text-white",
                  isExpanded ? "text-[0.74rem] sm:text-xs" : "text-[0.68rem] sm:text-[0.72rem]"
                )}>
                  {pretitle}
                </p>
              </div>

              <motion.div
                variants={iconVariants}
                className={cn(
                  "inline-flex items-center justify-center rounded-2xl border backdrop-blur-sm",
                  isExpanded ? "h-12 w-12" : "h-11 w-11",
                  iconClasses[accentColor]
                )}
                aria-hidden="true"
              >
                <Icon className={isExpanded ? "h-6 w-6" : "h-5 w-5"} strokeWidth={2.1} />
              </motion.div>
            </div>

            <h3
              className={cn(
                "font-bold leading-[0.92] tracking-tight text-white",
                isExpanded
                  ? "mt-7 min-h-[3.9rem] text-[2.44rem] sm:min-h-[4.3rem] sm:text-[2.68rem]"
                  : "mt-6 min-h-[3.5rem] text-[2.2rem] sm:min-h-[3.8rem] sm:text-[2.36rem]"
              )}
            >
              {normalizedTitleLines.map((line, index) => (
                <span key={`${title}-${index}`} className="block">
                  {line || "\u00A0"}
                </span>
              ))}
            </h3>

            <p
              className={cn(
                isExpanded
                  ? "mt-0.5 max-w-[31ch] text-[0.98rem] font-medium leading-[1.35] sm:text-[1.02rem]"
                  : "mt-0 max-w-[30ch] text-[0.9rem] font-medium leading-[1.28] sm:text-[0.93rem]"
                ,
                descriptionClasses[accentColor]
              )}
            >
              {description}
            </p>
          </div>

          <div
            className={cn(
              "relative z-10 -mt-6 overflow-hidden bg-transparent",
              isExpanded
                ? "h-[calc(100%-18.6rem+1.5rem)] rounded-t-[2.2rem] sm:h-[calc(100%-19.2rem+1.5rem)]"
                : "h-[calc(100%-16.9rem+1.5rem)] rounded-t-[2rem] sm:h-[calc(100%-17.3rem+1.5rem)]"
            )}
          >
            <motion.div variants={imageVariants} className="absolute inset-0">
              <Image
                src={image}
                alt={title}
                fill
                sizes={isExpanded ? "(max-width: 767px) 88vw, (max-width: 1399px) 44vw, 30vw" : "(max-width: 767px) 84vw, (max-width: 1279px) 42vw, 28vw"}
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-novaleap-navy/10 via-transparent to-white/25" />

            <div className={cn("absolute", isExpanded ? "bottom-5 left-5 sm:bottom-6 sm:left-6" : "bottom-4 left-4 sm:bottom-5 sm:left-5")}>
              <Link href={href} className={buttonClasses[accentColor]}>
                <span className="relative z-10 inline-flex items-center justify-center">
                  Learn More
                </span>
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }
);

ServiceCarouselCard.displayName = "ServiceCarouselCard";

export default ServiceCarouselCard;