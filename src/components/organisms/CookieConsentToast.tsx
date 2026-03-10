"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/atoms";
import { cn } from "@/lib/utils";

const CONSENT_STORAGE_KEY = "novaleap-cookie-consent-v1";
const CONSENT_TTL_DAYS = 180;

type CookiePreferences = {
  analytics: boolean;
  advertising: boolean;
  doNotSellOrShare: boolean;
};

type StoredCookieConsent = {
  version: 1;
  consentedAt: string;
  expiresAt: string;
  necessary: true;
  preferences: CookiePreferences;
};

const DEFAULT_PREFERENCES: CookiePreferences = {
  analytics: false,
  advertising: false,
  doNotSellOrShare: false,
};

const toFutureIsoDate = (daysAhead: number) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + daysAhead);
  return expiresAt.toISOString();
};

const isConsentValid = (consent: StoredCookieConsent | null) => {
  if (!consent) {
    return false;
  }

  const expiration = Date.parse(consent.expiresAt);
  return Number.isFinite(expiration) && expiration > Date.now();
};

const readConsent = (): StoredCookieConsent | null => {
  try {
    const rawValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as StoredCookieConsent;
    if (!parsed.preferences || parsed.version !== 1) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

const writeConsent = (preferences: CookiePreferences) => {
  const payload: StoredCookieConsent = {
    version: 1,
    consentedAt: new Date().toISOString(),
    expiresAt: toFutureIsoDate(CONSENT_TTL_DAYS),
    necessary: true,
    preferences,
  };

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(
    new CustomEvent("novaleap:cookie-consent-updated", {
      detail: payload,
    })
  );
};

/**
 * CookieConsentToast - Organism Component
 *
 * Global cookie consent notice tailored for US privacy expectations.
 * Includes granular preferences and an explicit "Do Not Sell or Share" option.
 *
 * @example
 * <CookieConsentToast />
 */
const CookieConsentToast: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [preferences, setPreferences] = React.useState<CookiePreferences>(DEFAULT_PREFERENCES);

  React.useEffect(() => {
    const savedConsent = readConsent();

    if (savedConsent) {
      setPreferences(savedConsent.preferences);
    }

    if (!isConsentValid(savedConsent)) {
      setIsVisible(true);
    }

    setHasMounted(true);
  }, []);

  const closeToast = (nextPreferences: CookiePreferences) => {
    writeConsent(nextPreferences);
    setPreferences(nextPreferences);
    setIsExpanded(false);
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    closeToast({
      analytics: true,
      advertising: true,
      doNotSellOrShare: false,
    });
  };

  const handleEssentialOnly = () => {
    closeToast({
      analytics: false,
      advertising: false,
      doNotSellOrShare: true,
    });
  };

  const handleSavePreferences = () => {
    const normalizedPreferences = {
      ...preferences,
      advertising: preferences.doNotSellOrShare ? false : preferences.advertising,
    };

    closeToast(normalizedPreferences);
  };

  return (
    <AnimatePresence>
      {hasMounted && isVisible ? (
        <motion.section
          key="cookie-consent-toast"
          initial={{ opacity: 0, y: 14, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.992 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.01 }
              : { type: "spring", stiffness: 190, damping: 24, mass: 0.85 }
          }
          className="fixed bottom-3 left-3 right-3 z-[70] sm:bottom-6 sm:left-6 sm:right-auto sm:w-[440px]"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <div className="w-full overflow-hidden rounded-2xl border border-novaleap-navy/15 bg-white/95 shadow-[0_18px_52px_-32px_rgba(17,34,78,0.55)] backdrop-blur-md">
            <div className="h-1 w-full bg-gradient-to-r from-novaleap-aqua via-novaleap-purple to-novaleap-aqua" />

            <div className="space-y-3 px-4 py-4 sm:px-5 sm:py-5">
              <div className="space-y-1.5">
                <span className="inline-flex rounded-full border border-novaleap-aqua/60 bg-novaleap-aqua/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-novaleap-aqua">
                  Privacy Notice
                </span>
                <h2 className="text-[1rem] font-bold tracking-tight text-novaleap-navy sm:text-[1.05rem]">
                  We use cookies to keep your experience safe and personalized.
                </h2>
                <p className="max-w-[42ch] text-xs leading-relaxed text-novaleap-navy/75 sm:text-[0.8rem]">
                  Essential cookies are always active. Choose analytics, advertising, or opt out of sale/sharing under US privacy expectations.
                </p>
                <p className="text-[11px] leading-relaxed text-novaleap-navy/70">
                  Learn more in our <Link href="/privacy" className="font-semibold text-novaleap-purple underline decoration-novaleap-purple/60 underline-offset-2">Privacy Policy</Link> and submit a request on our <Link href="/do-not-sell" className="font-semibold text-novaleap-aqua underline decoration-novaleap-aqua/70 underline-offset-2">Do Not Sell or Share page</Link>.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsExpanded((previous) => !previous)}
                  className="inline-flex h-8 items-center rounded-full border border-novaleap-navy/20 bg-novaleap-navy/5 px-3 text-xs font-semibold tracking-tight text-novaleap-navy transition-colors duration-200 hover:bg-novaleap-navy/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2"
                  aria-expanded={isExpanded}
                  aria-controls="cookie-preferences-panel"
                >
                  {isExpanded ? "Hide preferences" : "Customize"}
                </button>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-8 border-b-[4px] px-3 py-1.5 text-xs"
                  onClick={handleEssentialOnly}
                >
                  Essential only
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant="primary"
                  className="h-8 border-b-[4px] px-3 py-1.5 text-xs"
                  onClick={handleAcceptAll}
                >
                  Accept all
                </Button>
              </div>

              <AnimatePresence initial={false}>
                {isExpanded ? (
                  <motion.div
                    id="cookie-preferences-panel"
                    key="cookie-preferences-panel"
                    initial={{ opacity: 0, height: 0, y: -6 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -4 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.01 }
                        : { type: "spring", stiffness: 170, damping: 22 }
                    }
                    className="overflow-hidden rounded-xl border border-novaleap-navy/10 bg-gradient-to-br from-white to-novaleap-aqua/5"
                  >
                    <div className="space-y-2 px-3 py-3">
                      <PreferenceToggle
                        label="Analytics Cookies"
                        description="Help us understand site usage to improve content and scheduling flow."
                        checked={preferences.analytics}
                        onChange={(checked) =>
                          setPreferences((previous) => ({
                            ...previous,
                            analytics: checked,
                          }))
                        }
                      />

                      <PreferenceToggle
                        label="Advertising Cookies"
                        description="Support outreach campaigns and limit repeated ads across platforms."
                        checked={preferences.advertising}
                        disabled={preferences.doNotSellOrShare}
                        onChange={(checked) =>
                          setPreferences((previous) => ({
                            ...previous,
                            advertising: checked,
                          }))
                        }
                      />

                      <PreferenceToggle
                        label="Do Not Sell or Share My Personal Information"
                        description="Enable this option to opt out from sale/sharing for cross-context advertising."
                        checked={preferences.doNotSellOrShare}
                        onChange={(checked) =>
                          setPreferences((previous) => ({
                            ...previous,
                            doNotSellOrShare: checked,
                            advertising: checked ? false : previous.advertising,
                          }))
                        }
                      />

                      <div className="pt-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          className="h-8 w-full border-b-[4px] px-3 py-1.5 text-xs sm:w-auto"
                          onClick={handleSavePreferences}
                        >
                          Save preferences
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
};

type PreferenceToggleProps = {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

const PreferenceToggle: React.FC<PreferenceToggleProps> = ({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          onChange(!checked);
        }
      }}
      className={cn(
        "flex w-full items-start justify-between gap-3 rounded-lg border border-novaleap-navy/10 bg-white/90 px-3 py-2.5 text-left transition-colors duration-200",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-novaleap-aqua/5"
      )}
    >
      <span className="space-y-1">
        <span className="block text-[0.9rem] font-semibold tracking-tight text-novaleap-navy">{label}</span>
        <span className="block text-[11px] leading-relaxed text-novaleap-navy/70">{description}</span>
      </span>

      <motion.span
        aria-hidden="true"
        className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-[5px] border"
        initial={false}
        animate={
          checked
            ? { backgroundColor: "#977abc", borderColor: "#977abc", scale: 1 }
            : { backgroundColor: "#ffffff", borderColor: "rgba(17,34,78,0.35)", scale: 1 }
        }
        whileTap={disabled ? undefined : { scale: 0.92 }}
        transition={{ type: "spring", stiffness: 320, damping: 20, mass: 0.55 }}
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-white" fill="none">
          <motion.path
            d="M3 8.5L6.4 12L13 4.8"
            stroke="currentColor"
            strokeWidth="2.15"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ pathLength: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 28, mass: 0.6 }}
          />
        </svg>
      </motion.span>
    </button>
  );
};

export default CookieConsentToast;
