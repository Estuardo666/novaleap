"use client";

import React from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ServiceCarouselCard } from "@/components/molecules";
import {
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";
import { servicesCatalog } from "@/lib/servicesCatalog";
import { cn } from "@/lib/utils";

const services = servicesCatalog;

interface ServicesSectionProps {
  sizeVariant?: "default" | "expanded";
  showHeader?: boolean;
  serviceImages?: Record<string, string>;
}

/**
 * ServicesSection - Organismic Component
 *
 * Full-page services showcase with animated cards, semantic HTML for SEO,
 * and WCAG 2.1 AA compliant accessibility.
 *
 * @example
 * <ServicesSection />
 */
const ServicesSection: React.FC<ServicesSectionProps> = ({ sizeVariant = "default", showHeader = true, serviceImages }) => {
  const prefersReducedMotion = useReducedMotion();
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [cardsPerView, setCardsPerView] = React.useState(1);
  const [viewportWidth, setViewportWidth] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isExpanded = sizeVariant === "expanded";
  const serviceIndexById = React.useMemo(
    () => new Map(services.map((service, index) => [service.id, index])),
    []
  );

  const subtitleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 200, damping: 25 },
    },
  };

  React.useEffect(() => {
    const node = viewportRef.current;

    if (!node) return;

    const updateMeasurements = () => {
      const nextWidth = node.clientWidth;
      setViewportWidth(nextWidth);

      if (nextWidth >= (isExpanded ? 1280 : 1200)) {
        setCardsPerView(3);
        return;
      }

      if (nextWidth >= (isExpanded ? 860 : 768)) {
        setCardsPerView(2);
        return;
      }

      setCardsPerView(1);
    };

    updateMeasurements();

    const resizeObserver = new ResizeObserver(updateMeasurements);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [isExpanded]);

  const gap = viewportWidth >= 640 ? (isExpanded ? 30 : 24) : isExpanded ? 20 : 16;
  const visibleCards = Math.max(1, Math.min(cardsPerView, services.length));
  const maxIndex = Math.max(0, services.length - visibleCards);
  const safeIndex = Math.min(activeIndex, maxIndex);
  const cardWidth =
    viewportWidth > 0
      ? (viewportWidth - gap * Math.max(0, visibleCards - 1)) / visibleCards
      : 0;
  const totalPages = maxIndex + 1;
  const shouldCenterTrack = totalPages === 1 && services.length > 1;
  const maxCenteredCardWidth = isExpanded ? 560 : 520;
  const effectiveCardWidth = shouldCenterTrack
    ? Math.min(cardWidth, maxCenteredCardWidth)
    : cardWidth;
  const trackOffset = safeIndex * (effectiveCardWidth + gap);
  const maxOffset = maxIndex * (effectiveCardWidth + gap);
  const trackContentWidth =
    services.length * effectiveCardWidth + gap * Math.max(0, services.length - 1);
  const centeredOffset =
    shouldCenterTrack && viewportWidth > trackContentWidth
      ? (viewportWidth - trackContentWidth) / 2
      : 0;

  React.useEffect(() => {
    if (activeIndex > maxIndex) {
      React.startTransition(() => {
        setActiveIndex(maxIndex);
      });
    }
  }, [activeIndex, maxIndex]);

  React.useEffect(() => {
    const syncActiveServiceFromHash = () => {
      const serviceId = window.location.hash.replace("#", "");

      if (!serviceId) {
        return;
      }

      const nextIndex = serviceIndexById.get(serviceId);

      if (nextIndex === undefined) {
        return;
      }

      React.startTransition(() => {
        setActiveIndex(Math.min(nextIndex, maxIndex));
      });
    };

    syncActiveServiceFromHash();
    window.addEventListener("hashchange", syncActiveServiceFromHash);

    return () => window.removeEventListener("hashchange", syncActiveServiceFromHash);
  }, [maxIndex, serviceIndexById]);

  const goToIndex = (index: number) => {
    React.startTransition(() => {
      setActiveIndex(Math.max(0, Math.min(index, maxIndex)));
    });
  };

  const handlePrevious = () => {
    React.startTransition(() => {
      setActiveIndex((current) => (current <= 0 ? maxIndex : current - 1));
    });
  };

  const handleNext = () => {
    React.startTransition(() => {
      setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
    });
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 70) return;

    React.startTransition(() => {
      setActiveIndex((current) => {
        if (info.offset.x < 0) {
          return current >= maxIndex ? 0 : current + 1;
        }

        return current <= 0 ? maxIndex : current - 1;
      });
    });
  };

  return (
    <section
      aria-labelledby="services-heading"
      className={cn(
        "relative overflow-hidden px-4 font-[family-name:var(--font-google-sans)] sm:px-6 lg:px-8",
        isExpanded ? "py-24 sm:pt-4 sm:pb-32" : "py-20 sm:py-28"
      )}
    >

      <div className={cn("relative z-10 mx-auto", isExpanded ? "max-w-[90rem]" : "max-w-7xl")}>
        {/* Header */}
        {showHeader && (
          <div className={cn("space-y-4 text-center", isExpanded ? "mb-20 sm:mb-24" : "mb-16 sm:mb-20")}>
            <motion.div
              variants={subtitleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            className={cn(
              "mx-auto inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/70 bg-novaleap-aqua/5",
              isExpanded ? "px-4 py-1.5" : "px-3 py-1"
            )}
          >
            <p className={cn(
              "font-semibold tracking-wide text-novaleap-aqua uppercase",
              isExpanded ? "text-[0.78rem]" : "text-xs"
            )}>
              What We Offer
            </p>
          </motion.div>

          <motion.h2
            id="services-heading"
            initial="hidden"
            whileInView="show"
            viewport={NOVALEAP_VIEWPORT}
            variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.1, 0.14)}
            className={cn(
              "text-balance font-bold tracking-tight text-novaleap-navy leading-[1.1]",
              isExpanded ? "text-4xl sm:text-5xl lg:text-[3.65rem]" : "text-4xl sm:text-5xl"
            )}
          >
            <motion.span
              variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
              className="block text-balance"
            >
              Nurturing Movement,
            </motion.span>
            <motion.span
              variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
              className="block text-balance"
            >
              Empowering Potential
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            className={cn(
              "mx-auto text-novaleap-navy/80 leading-relaxed",
              isExpanded ? "max-w-3xl text-lg sm:text-[1.32rem]" : "max-w-2xl text-lg sm:text-xl"
            )}
          >
            At NovaLeap, we bring together <strong className="font-semibold text-novaleap-navy">evidence-based clinical expertise with the simple joy of play</strong>. Led by our dedicated therapists, Jen and Krishna, we <strong className="font-semibold text-novaleap-navy">support your child exactly where they are</strong>, turning every challenge into a meaningful step forward for the whole family.
          </motion.p>
          </div>
        )}

        <div className={isExpanded ? "mt-16 sm:mt-20" : "mt-14 sm:mt-16"}>
          <div
            ref={viewportRef}
            className={cn("relative overflow-hidden", isExpanded ? "pt-5" : "pt-4")}
            role="region"
            aria-roledescription="carousel"
            aria-label="NovaLeap services"
          >
            {totalPages > 1 ? (
              <>
                <motion.button
                  type="button"
                  whileHover={prefersReducedMotion ? undefined : { x: -2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                  onClick={handlePrevious}
                  className={cn(
                    "absolute top-1/2 z-30 inline-flex -translate-y-1/2 items-center justify-center rounded-full bg-white text-novaleap-navy shadow-md transition-shadow hover:shadow-lg",
                    isExpanded ? "left-2 h-12 w-12 sm:left-3 sm:h-14 sm:w-14" : "left-1 h-11 w-11 sm:left-2"
                  )}
                  aria-label="Show previous services"
                >
                  <ChevronLeft className={isExpanded ? "h-5 w-5" : "h-4 w-4"} />
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={prefersReducedMotion ? undefined : { x: 2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                  onClick={handleNext}
                  className={cn(
                    "absolute top-1/2 z-30 inline-flex -translate-y-1/2 items-center justify-center rounded-full bg-white text-novaleap-navy shadow-md transition-shadow hover:shadow-lg",
                    isExpanded ? "right-2 h-12 w-12 sm:right-3 sm:h-14 sm:w-14" : "right-1 h-11 w-11 sm:right-2"
                  )}
                  aria-label="Show next services"
                >
                  <ChevronRight className={isExpanded ? "h-5 w-5" : "h-4 w-4"} />
                </motion.button>
              </>
            ) : null}

            <motion.div
              className="flex items-stretch"
              style={{ gap: `${gap}px` }}
              drag={prefersReducedMotion || totalPages <= 1 ? false : "x"}
              dragConstraints={{ left: -Math.max(0, maxOffset), right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleDragEnd}
              animate={{ x: centeredOffset - trackOffset }}
              transition={{ type: "spring", stiffness: 140, damping: 24, mass: 0.85 }}
            >
              {services.map((service) => (
                <div
                  key={service.title}
                  id={service.id}
                  className="min-w-0 shrink-0 scroll-mt-32 sm:scroll-mt-36"
                  style={effectiveCardWidth > 0 ? { width: `${effectiveCardWidth}px` } : { width: "100%" }}
                >
                  <ServiceCarouselCard {...service} image={serviceImages?.[service.id] || service.image} sizeVariant={sizeVariant} />
                </div>
              ))}
            </motion.div>
          </div>

          {totalPages > 1 ? (
            <div className={cn("flex justify-center", isExpanded ? "mt-10" : "mt-8")}>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={`services-dot-${index}`}
                    type="button"
                    onClick={() => goToIndex(index)}
                    className={cn("group inline-flex items-center", isExpanded ? "h-5" : "h-4")}
                    aria-label={`Go to services slide ${index + 1}`}
                    aria-pressed={safeIndex === index}
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        safeIndex === index
                          ? isExpanded
                            ? "h-3 w-12 bg-novaleap-navy"
                            : "h-2.5 w-10 bg-novaleap-navy"
                          : isExpanded
                            ? "h-3 w-3 bg-novaleap-navy/20 group-hover:bg-novaleap-navy/40"
                            : "h-2.5 w-2.5 bg-novaleap-navy/20 group-hover:bg-novaleap-navy/40"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
