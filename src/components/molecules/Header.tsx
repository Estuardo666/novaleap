"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button, getButtonClasses } from "@/components/atoms";
import { servicesCatalog } from "@/lib/servicesCatalog";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Services", href: "/services" },
  { label: "Our Approach", href: "/our-approach" },
  { label: "Parents", href: "/parents" },
  { label: "Contact", href: "/contact" },
];

/**
 * Header - Molecular Component
 *
 * Branded top navigation for the homepage hero with staggered motion.
 *
 * @example
 * <Header className="mb-8" />
 */
const Header: React.FC<HeaderProps> = ({ className }) => {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = React.useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = React.useState(false);
  const desktopServicesRef = React.useRef<HTMLLIElement>(null);

  const isCurrentRoute = React.useCallback(
    (href: string) => {
      if (href === "/") {
        return pathname === "/";
      }

      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname]
  );

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
    setIsDesktopServicesOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!desktopServicesRef.current?.contains(event.target as Node)) {
        setIsDesktopServicesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDesktopServicesOpen(false);
        setIsMobileServicesOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const desktopMegaMenuVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -10,
      scale: prefersReducedMotion ? 1 : 0.96,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            type: "spring" as const,
            stiffness: 220,
            damping: 24,
            mass: 0.88,
            delayChildren: 0.05,
            staggerChildren: 0.07,
          },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -8,
      scale: prefersReducedMotion ? 1 : 0.98,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" as const },
    },
  };

  const megaMenuItemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 12,
      scale: prefersReducedMotion ? 1 : 0.94,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(6px)",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            type: "spring" as const,
            stiffness: 230,
            damping: 22,
            mass: 0.85,
          },
    },
  };

  const mobileServicesVariants = {
    hidden: {
      opacity: 0,
      height: 0,
    },
    show: {
      opacity: 1,
      height: "auto",
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            type: "spring" as const,
            stiffness: 200,
            damping: 24,
            mass: 0.9,
            delayChildren: 0.04,
            staggerChildren: 0.05,
          },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" as const },
    },
  };

  const serviceCardHoverVariants = {
    rest: {
      y: 0,
      rotate: 0,
      scale: 1,
      boxShadow: "0 18px 44px -34px rgba(17, 34, 78, 0.22)",
    },
    hover: {
      y: prefersReducedMotion ? 0 : -8,
      rotate: prefersReducedMotion ? 0 : -0.8,
      scale: prefersReducedMotion ? 1 : 1.015,
      boxShadow: "0 28px 64px -34px rgba(0, 183, 181, 0.25)",
      transition: {
        type: "spring" as const,
        stiffness: 240,
        damping: 22,
        mass: 0.88,
      },
    },
  };

  const serviceCardGlowVariants = {
    rest: {
      opacity: 0,
      scale: 0.88,
      x: prefersReducedMotion ? 0 : -22,
      y: prefersReducedMotion ? 0 : -14,
    },
    hover: {
      opacity: prefersReducedMotion ? 0 : 1,
      scale: 1.08,
      x: 0,
      y: 0,
      transition: { type: "spring" as const, stiffness: 220, damping: 24 },
    },
  };

  const serviceCardIconVariants = {
    rest: {
      scale: 1,
      rotate: 0,
    },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.08,
      rotate: prefersReducedMotion ? 0 : 7,
      transition: { type: "spring" as const, stiffness: 280, damping: 18 },
    },
  };

  const serviceCardTitleVariants = {
    rest: { x: 0 },
    hover: {
      x: prefersReducedMotion ? 0 : 4,
      transition: { type: "spring" as const, stiffness: 260, damping: 20 },
    },
  };

  const serviceCardArrowVariants = {
    rest: { x: 0, opacity: 0.65 },
    hover: {
      x: prefersReducedMotion ? 0 : 5,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 260, damping: 20 },
    },
  };

  const viewAllServicesButtonClasses = getButtonClasses({
    variant: "secondary",
    size: "md",
    className: "px-5 py-2.5 text-sm",
  });

  const getServiceBadgeClasses = (accentColor: (typeof servicesCatalog)[number]["accentColor"]) => {
    if (accentColor === "aqua") {
      return "border-novaleap-aqua/25 bg-novaleap-aqua/10 text-novaleap-aqua";
    }

    if (accentColor === "purple") {
      return "border-novaleap-purple/20 bg-novaleap-purple/10 text-novaleap-purple";
    }

    return "border-novaleap-navy/10 bg-novaleap-navy/5 text-novaleap-navy";
  };

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-4 z-50 flex justify-center px-3 sm:px-4 pointer-events-none font-[family-name:var(--font-google-sans)]"
      )}
      aria-hidden={false}
    >
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className={cn(
          "pointer-events-auto relative w-full max-w-[92rem] flex items-center justify-between px-5 py-2.5 sm:px-10 rounded-[2rem] sm:rounded-[2.5rem] transition-all duration-500",
          // High-contrast glass state for readability over hero image
          !isScrolled && "bg-white/82 backdrop-blur-xl border border-white/70 shadow-[0_14px_42px_-28px_rgba(17,34,78,0.45)]",
          // Sticky opaque state with purple branding
          isScrolled && "bg-novaleap-purple border border-novaleap-aqua/70 shadow-[0_18px_44px_-24px_rgba(17,34,78,0.6)]",
          className
        )}
      >
        <Link
          href="/"
          aria-label="Novaleap Home"
          className="relative inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative h-12 w-auto"
          >
            {/* Logo para fondo claro - visible cuando no está scrolled */}
            <Image
              src="/Logotipo para fondo claro.png"
              alt="Novaleap"
              width={210}
              height={48}
              className={cn(
                "h-12 w-auto transition-opacity duration-300",
                isScrolled ? "opacity-0" : "opacity-100"
              )}
              priority
            />
            {/* Logo para fondo oscuro - visible cuando está scrolled */}
            <Image
              src="/Logotipo para fondo oscuro.png"
              alt="Novaleap"
              width={210}
              height={48}
              className={cn(
                "absolute inset-0 h-12 w-auto transition-opacity duration-300",
                isScrolled ? "opacity-100" : "opacity-0"
              )}
              priority
            />
          </motion.div>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.15,
                },
              },
            }}
            className={cn(
              "flex items-center gap-2 rounded-full px-2 py-1.5",
              isScrolled
                ? "bg-white/8"
                : "bg-white/70"
            )}
          >
            {navItems.map((item) => {
              const isActive = isCurrentRoute(item.href);

              if (item.label === "Services") {
                const isServicesActive = isActive || isDesktopServicesOpen;

                return (
                  <motion.li
                    key={item.label}
                    ref={desktopServicesRef}
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ type: "spring", stiffness: 210, damping: 22 }}
                    className="static"
                    onMouseEnter={() => setIsDesktopServicesOpen(true)}
                    onMouseLeave={() => setIsDesktopServicesOpen(false)}
                    onFocusCapture={() => setIsDesktopServicesOpen(true)}
                    onBlur={(event) => {
                      if (!desktopServicesRef.current?.contains(event.relatedTarget as Node | null)) {
                        setIsDesktopServicesOpen(false);
                      }
                    }}
                  >
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsDesktopServicesOpen((previous) => !previous)}
                      aria-expanded={isDesktopServicesOpen}
                      aria-controls="desktop-services-mega-menu"
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2",
                        isScrolled
                          ? "text-white hover:bg-white/18 focus-visible:ring-offset-novaleap-purple"
                          : "text-novaleap-navy hover:bg-novaleap-navy/8 focus-visible:ring-offset-white",
                        isServicesActive &&
                          (isScrolled
                            ? "bg-white text-novaleap-navy shadow-sm"
                            : "bg-novaleap-navy text-white shadow-sm")
                      )}
                    >
                      <span>{item.label}</span>
                      <motion.span
                        animate={{ rotate: isDesktopServicesOpen ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        <ChevronDown className="h-4 w-4" strokeWidth={2.3} />
                      </motion.span>
                    </motion.button>

                    <AnimatePresence>
                      {isDesktopServicesOpen ? (
                        <motion.div
                          id="desktop-services-mega-menu"
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          variants={desktopMegaMenuVariants}
                          className="absolute right-0 top-[calc(100%+0.8rem)] z-50 w-[min(66rem,calc(100vw-4rem))]"
                        >
                          <motion.div
                            variants={desktopMegaMenuVariants}
                            className="overflow-hidden rounded-[2rem] border border-novaleap-navy/8 bg-[linear-gradient(145deg,rgba(255,255,255,0.97),rgba(246,248,255,0.95))] shadow-[0_30px_80px_-38px_rgba(17,34,78,0.55)] backdrop-blur-2xl"
                          >
                            <div className="grid gap-0 lg:grid-cols-[19rem_minmax(0,1fr)]">
                              <motion.div
                                variants={megaMenuItemVariants}
                                className="flex flex-col justify-between gap-6 border-b border-novaleap-navy/6 bg-[radial-gradient(circle_at_top_left,rgba(0,183,181,0.14),transparent_52%),linear-gradient(180deg,rgba(17,34,78,0.03),rgba(151,122,188,0.06))] p-7 text-novaleap-navy lg:border-b-0 lg:border-r lg:border-r-novaleap-navy/6"
                              >
                                <div className="space-y-4">
                                  <span className="inline-flex rounded-full border border-novaleap-aqua/30 bg-novaleap-aqua/10 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-novaleap-aqua">
                                    Services
                                  </span>
                                  <div className="space-y-3">
                                    <h3 className="text-2xl font-bold leading-[1.05] tracking-tight text-novaleap-navy">
                                      Support that grows with your child.
                                    </h3>
                                    <p className="text-sm leading-relaxed text-novaleap-navy/72">
                                      Explore the five core services families use to build strength, confidence, and meaningful progress.
                                    </p>
                                  </div>
                                </div>

                                <motion.div variants={megaMenuItemVariants}>
                                  <Link
                                    href="/services"
                                    className={viewAllServicesButtonClasses}
                                    onClick={() => setIsDesktopServicesOpen(false)}
                                  >
                                    <span className="relative z-10 inline-flex items-center justify-center gap-2">
                                      <span>View all services</span>
                                      <ArrowRight className="h-4 w-4" strokeWidth={2.1} />
                                    </span>
                                  </Link>
                                </motion.div>
                              </motion.div>

                              <motion.div
                                variants={desktopMegaMenuVariants}
                                className="grid gap-3 p-4 sm:p-5 lg:grid-cols-2"
                              >
                                {servicesCatalog.map((service) => {
                                  const Icon = service.icon;

                                  return (
                                    <motion.div key={service.id} variants={megaMenuItemVariants}>
                                      <motion.div
                                        initial="rest"
                                        animate="rest"
                                        whileHover={prefersReducedMotion ? undefined : "hover"}
                                        whileTap={prefersReducedMotion ? undefined : { scale: 0.994 }}
                                        variants={serviceCardHoverVariants}
                                      >
                                        <Link
                                          href={service.href}
                                          className="group relative flex h-full gap-4 overflow-hidden rounded-[1.45rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(248,251,255,0.84))] p-4 text-novaleap-navy transition-colors duration-300 hover:bg-[linear-gradient(135deg,rgba(255,255,255,1),rgba(245,251,251,0.96))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                                          onClick={() => setIsDesktopServicesOpen(false)}
                                        >
                                          <motion.div
                                            aria-hidden="true"
                                            variants={serviceCardGlowVariants}
                                            className={cn(
                                              "pointer-events-none absolute inset-0",
                                              service.accentColor === "aqua" && "bg-[radial-gradient(circle_at_top_left,rgba(0,183,181,0.22),transparent_62%)]",
                                              service.accentColor === "purple" && "bg-[radial-gradient(circle_at_top_left,rgba(151,122,188,0.22),transparent_62%)]",
                                              service.accentColor === "navy" && "bg-[radial-gradient(circle_at_top_left,rgba(17,34,78,0.16),transparent_62%)]"
                                            )}
                                          />

                                          <motion.div
                                            variants={serviceCardIconVariants}
                                            className={cn(
                                              "relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border",
                                              getServiceBadgeClasses(service.accentColor)
                                            )}
                                          >
                                            <Icon className="h-5 w-5" strokeWidth={2.1} />
                                          </motion.div>

                                          <div className="relative z-10 min-w-0 space-y-2">
                                            <div className="flex items-start justify-between gap-3">
                                              <div>
                                                <p className={cn(
                                                  "text-[0.64rem] font-semibold uppercase tracking-[0.2em]",
                                                  "text-novaleap-aqua/85"
                                                )}>
                                                  {service.pretitle}
                                                </p>
                                                <motion.h4
                                                  variants={serviceCardTitleVariants}
                                                  className="mt-1.5 text-base font-bold leading-[1.15] tracking-tight text-novaleap-navy sm:text-[1.05rem]"
                                                >
                                                  {service.title}
                                                </motion.h4>
                                              </div>

                                              <motion.div variants={serviceCardArrowVariants} className="mt-0.5 shrink-0">
                                                <ArrowRight className="h-4 w-4 text-novaleap-navy/45" strokeWidth={2.2} />
                                              </motion.div>
                                            </div>

                                            <p className="text-sm leading-relaxed text-novaleap-navy/68">
                                              {service.menuDescription}
                                            </p>
                                          </div>
                                        </Link>
                                      </motion.div>
                                    </motion.div>
                                  );
                                })}
                              </motion.div>
                            </div>
                          </motion.div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.li>
                );
              }

              return (
                <motion.li
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ type: "spring", stiffness: 210, damping: 22 }}
                  className={item.label === "Home" ? "hidden" : ""}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2",
                        isScrolled
                          ? "text-white hover:bg-white/18 focus-visible:ring-offset-novaleap-purple"
                          : "text-novaleap-navy hover:bg-novaleap-navy/8 focus-visible:ring-offset-white",
                        isActive &&
                          (isScrolled
                            ? "bg-white text-novaleap-navy shadow-sm"
                            : "bg-novaleap-navy text-white shadow-sm")
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>

        <div className="hidden sm:block">
          <Button
            variant={isScrolled ? "primary" : "secondary"}
            size="md"
            className={cn(
              "px-5 text-sm font-semibold",
              isScrolled ? "focus-visible:ring-novaleap-aqua" : "focus-visible:ring-novaleap-purple"
            )}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Contact / Schedule
          </Button>
        </div>

        <motion.button
          type="button"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2",
            isScrolled
              ? "border-white/35 bg-white/12 text-white focus-visible:ring-offset-novaleap-purple"
              : "border-white/50 bg-white/18 text-white focus-visible:ring-offset-transparent"
          )}
          onClick={() => setIsMobileMenuOpen((previous) => !previous)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          <span className="sr-only">Toggle menu</span>
          <div className="relative h-4 w-5">
            <motion.span
              className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current"
              animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            />
            <motion.span
              className="absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current"
              animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            />
          </div>
        </motion.button>

        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 150, damping: 22 }}
              className={cn(
                "absolute left-0 right-0 top-[calc(100%+0.8rem)] overflow-hidden rounded-3xl border p-4 shadow-2xl backdrop-blur-xl lg:hidden",
                isScrolled
                  ? "border-novaleap-aqua/60 bg-novaleap-purple/95"
                  : "border-white/60 bg-white/95"
              )}
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.06,
                    },
                  },
                }}
                className="space-y-1"
              >
                {navItems.map((item) => {
                  const isActive = isCurrentRoute(item.href);

                  if (item.label === "Services") {
                    return (
                      <motion.li
                        key={item.label}
                        variants={{
                          hidden: { opacity: 0, y: -8 },
                          show: { opacity: 1, y: 0 },
                        }}
                        transition={{ type: "spring", stiffness: 210, damping: 20 }}
                      >
                        <div className="space-y-2">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsMobileServicesOpen((previous) => !previous)}
                            aria-expanded={isMobileServicesOpen}
                            aria-controls="mobile-services-submenu"
                            className={cn(
                              "flex w-full items-center justify-between rounded-full px-4 py-3 text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2",
                              isScrolled
                                ? "text-white hover:bg-white/12 focus-visible:ring-offset-novaleap-purple"
                                : "text-novaleap-navy hover:bg-novaleap-navy/8 focus-visible:ring-offset-white",
                              (isActive || isMobileServicesOpen) &&
                                (isScrolled
                                  ? "bg-white text-novaleap-navy"
                                  : "bg-novaleap-navy text-white")
                            )}
                          >
                            <span>{item.label}</span>
                            <motion.span
                              animate={{ rotate: isMobileServicesOpen ? 180 : 0 }}
                              transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            >
                              <ChevronDown className="h-4 w-4" strokeWidth={2.3} />
                            </motion.span>
                          </motion.button>

                          <AnimatePresence initial={false}>
                            {isMobileServicesOpen ? (
                              <motion.div
                                id="mobile-services-submenu"
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                variants={mobileServicesVariants}
                                className="overflow-hidden"
                              >
                                <motion.div
                                  variants={mobileServicesVariants}
                                  className="space-y-2 rounded-[1.75rem] border border-novaleap-navy/8 bg-white/92 px-3 py-3"
                                >
                                  <motion.div variants={megaMenuItemVariants}>
                                    <Link
                                      href="/services"
                                      className={cn(viewAllServicesButtonClasses, "w-full")}
                                      onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsMobileServicesOpen(false);
                                      }}
                                    >
                                      <span className="relative z-10 inline-flex w-full items-center justify-center gap-2">
                                        <span>View all services</span>
                                        <ArrowRight className="h-4 w-4" strokeWidth={2.1} />
                                      </span>
                                    </Link>
                                  </motion.div>

                                  {servicesCatalog.map((service) => {
                                    const Icon = service.icon;

                                    return (
                                      <motion.div key={service.id} variants={megaMenuItemVariants}>
                                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                          <Link
                                            href={service.href}
                                            className="flex items-start gap-3 rounded-2xl px-3 py-3 text-novaleap-navy transition-colors hover:bg-novaleap-navy/4"
                                            onClick={() => {
                                              setIsMobileMenuOpen(false);
                                              setIsMobileServicesOpen(false);
                                            }}
                                          >
                                            <div className={cn(
                                              "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border",
                                              getServiceBadgeClasses(service.accentColor)
                                            )}>
                                              <Icon className="h-4.5 w-4.5" strokeWidth={2.1} />
                                            </div>

                                            <div className="min-w-0">
                                              <h4 className={cn(
                                                "text-sm font-semibold tracking-tight",
                                                "text-novaleap-navy"
                                              )}>
                                                {service.title}
                                              </h4>
                                              <p className="mt-1 text-xs leading-relaxed text-novaleap-navy/65">
                                                {service.menuDescription}
                                              </p>
                                            </div>
                                          </Link>
                                        </motion.div>
                                      </motion.div>
                                    );
                                  })}
                                </motion.div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      </motion.li>
                    );
                  }

                  return (
                    <motion.li
                      key={item.label}
                      variants={{
                        hidden: { opacity: 0, y: -8 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ type: "spring", stiffness: 210, damping: 20 }}
                    >
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "block rounded-full px-4 py-3 text-sm font-semibold tracking-tight transition-colors",
                            isScrolled
                              ? "text-white hover:bg-white/12"
                              : "text-novaleap-navy hover:bg-novaleap-navy/8",
                            isActive &&
                              (isScrolled
                                ? "bg-white text-novaleap-navy"
                                : "bg-novaleap-navy text-white")
                          )}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, type: "spring", stiffness: 180, damping: 20 }}
                className="mt-4"
              >
                <Button variant="primary" size="md" className="w-full text-sm font-semibold">
                  Contact / Schedule
                </Button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>
    </div>
  );
};

export default Header;
