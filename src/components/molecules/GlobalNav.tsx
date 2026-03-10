"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/atoms";
import { cn } from "@/lib/utils";

interface GlobalNavProps {
  className?: string;
}

const navItems = [
  { label: "Home", href: "/", isActive: true },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Approach", href: "/our-approach" },
  { label: "Parents", href: "/parents" },
];

/**
 * GlobalNav - Sticky navigation bar
 *
 * Global sticky header that appears on all pages.
 */
const GlobalNav: React.FC<GlobalNavProps> = ({ className }) => {
  return (
    <motion.header
      initial={{ y: -5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.5 }}
      className={cn(
        "sticky top-0 z-50 mx-auto w-full bg-white/80 backdrop-blur-md border-b border-novaleap-aqua/10",
        className
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/"
          aria-label="Novaleap Home"
          className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2 rounded-md font-[family-name:var(--font-google-sans)]"
        >
          <svg
            viewBox="0 0 160 42"
            role="img"
            aria-label="Novaleap"
            className="h-7 w-auto"
          >
            <defs>
              <linearGradient id="navLogo" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#977abc" />
                <stop offset="100%" stopColor="#00b7b5" />
              </linearGradient>
            </defs>
            <g>
              <circle cx="20" cy="21" r="14" fill="url(#navLogo)" opacity="0.12" />
              <path d="M15 26C20 25 25 19 25 14C20 15 14 20 15 26Z" fill="#00b7b5" />
              <path d="M19 27C24 26 29 20 29 15C24 16 18 21 19 27Z" fill="#977abc" />
            </g>
            <text
              x="42"
              y="27"
              fontSize="18"
              fontWeight="700"
              fill="#11224e"
              fontFamily="var(--font-google-sans), sans-serif"
            >
              Novaleap
            </text>
          </svg>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex font-[family-name:var(--font-google-sans)]">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <motion.li
                key={item.label}
                whileHover={{ color: "#00b7b5" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Link
                  href={item.href}
                  aria-current={item.isActive ? "page" : undefined}
                  className="text-sm font-medium text-novaleap-navy/80 transition-colors hover:text-novaleap-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2 rounded-md px-2 py-1"
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div>
          <Button
            variant="primary"
            size="md"
            className="text-sm"
          >
            Schedule
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default GlobalNav;
