"use client";

import React from "react";
import { AnimatePresence, PanInfo, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star, X } from "lucide-react";
import {
  getNovaleapRevealVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    focus: "Early Intervention Story",
    quoteParagraphs: [
      "Krishna provided exceptional care to my child, who was born prematurely and faced complex medical challenges. His deep knowledge, compassion, and remarkable skill were evident in every session.",
      "Krishna consistently went above and beyond, guiding us through each stage of Early Intervention with clarity and dedication. He played an essential role in helping us understand and navigate my child's therapeutic needs during a very overwhelming time.",
      "Our family is profoundly grateful for his support, expertise, and unwavering commitment.",
    ],
    author: "Maribel C.",
    detail: "Bronx, NY",
  },
  {
    focus: "Comprehensive Evaluation",
    quoteParagraphs: [
      "Mr. Finkenberg, PT, came to us highly recommended and provided an insightful evaluation of my daughter, clearly identifying both her strengths and areas of need.",
      "His expertise and guidance set us on the right path to make the most of her therapeutic journey in the months that followed.",
      "Mr. Finkenberg is exceptionally experienced and caring, and I wholeheartedly recommend him to any parent of a child with physical challenges. I have sought his opinion on several occasions since, and each time his thoughtful guidance has reinforced exactly why he is so highly recommended.",
    ],
    author: "Julia D.",
    detail: "Westchester County, NY",
  },
  {
    focus: "Parent Support",
    quoteParagraphs: [
      "My daughter's physical therapist was incredibly dedicated and professional, and we felt supported throughout the evaluation process.",
      "I was really impressed by how much insight he had and how patient he was with all my questions and worries.",
      "Krishna made everything feel easier to handle, and we're so grateful for the service he provided.",
    ],
    author: "Lauren T.",
    detail: "Manhattan, NY",
  },
  {
    focus: "Playful Progress",
    quoteParagraphs: [
      "As a parent, it's hard to fully put into words just how grateful we are for the incredible care our child has received while working with Jennifer. From the very first session, it was clear that this wasn't just a profession, it's a true calling.",
      "Jennifer's expertise as a pediatric physical therapist is exceptional. She has a remarkable ability to understand not only the physical challenges our child faces, but also how to tailor each session in a way that brings out his confidence and strength.",
      "What truly sets Jen apart is her kindness and playfulness. She met our son exactly where he was, turning what could be difficult work into something joyful and engaging.",
      "Jen has not only helped our child grow stronger physically, but she has also lifted our entire family with her positivity, patience, and unwavering support. We are endlessly grateful.",
    ],
    author: "Jackie A.",
    detail: "Yonkers, NY",
  },
  {
    focus: "Milestone Leap",
    quoteParagraphs: [
      "When we first brought our 10-month-old baby to Jen, he was not crawling yet.",
      "Within just one month of working with her, our little one took his first steps.",
      "Each session with Jen was filled with warmth, care, and joy, and since then our son has continued to flourish.",
    ],
    author: "Kelly and Chris L.",
    detail: "Parent Family",
  },
] as const;

const DESKTOP_CARDS_PER_VIEW = 3;
const SWIPE_THRESHOLD = 70;
const CAROUSEL_EASE: [number, number, number, number] = [0.22, 0.65, 0.2, 1];
const TRACK_GAP_PX = 20;
const TESTIMONIAL_PREVIEW_CHAR_LIMIT = 300;

type Testimonial = (typeof testimonials)[number];

const getPreviewContent = (paragraphs: readonly string[]) => {
  const fullText = paragraphs.join(" ");

  if (fullText.length <= TESTIMONIAL_PREVIEW_CHAR_LIMIT) {
    return {
      paragraphs: [...paragraphs],
      isTruncated: false,
    };
  }

  let remaining = TESTIMONIAL_PREVIEW_CHAR_LIMIT;
  const previewParagraphs: string[] = [];

  for (const paragraph of paragraphs) {
    if (remaining <= 0) {
      break;
    }

    if (paragraph.length <= remaining) {
      previewParagraphs.push(paragraph);
      remaining -= paragraph.length + 1;
      continue;
    }

    const slicedText = paragraph.slice(0, remaining);
    const lastSpaceIndex = slicedText.lastIndexOf(" ");
    const safeSlice = slicedText.slice(0, lastSpaceIndex > 0 ? lastSpaceIndex : remaining).trim();

    previewParagraphs.push(`${safeSlice}...`);
    remaining = 0;
  }

  return {
    paragraphs: previewParagraphs,
    isTruncated: true,
  };
};

interface StoryCardProps {
  story: Testimonial;
  focus: string;
  quoteParagraphs: readonly string[];
  author: string;
  detail: string;
  prefersReducedMotion: boolean;
  onOpenStory: (story: Testimonial) => void;
  className?: string;
}

const StoryCard: React.FC<StoryCardProps> = ({
  story,
  focus,
  quoteParagraphs,
  author,
  detail,
  prefersReducedMotion,
  onOpenStory,
  className,
}) => {
  const previewContent = React.useMemo(() => getPreviewContent(quoteParagraphs), [quoteParagraphs]);

  return (
    <motion.article
      variants={getNovaleapRevealVariants(prefersReducedMotion, 28)}
      whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.82 }}
      className={cn(
        "relative h-full min-h-[24rem] overflow-hidden rounded-[1.7rem] border border-white/75 bg-white px-6 py-6 shadow-[0_24px_60px_-44px_rgba(17,34,78,0.42)] sm:min-h-[25rem] sm:px-7 sm:py-7 lg:min-h-[26rem]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-16 select-none text-[4.4rem] font-bold leading-none text-novaleap-aqua/10 sm:left-5 sm:text-[4.8rem]"
      >
        "
      </div>

      <div className="relative z-10 flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex rounded-full border border-novaleap-aqua/30 bg-novaleap-aqua/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-novaleap-aqua">
            {focus}
          </span>

          <div className="flex items-center gap-1 text-amber-300" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={`${author}-star-${index}`} className="h-4 w-4 fill-current drop-shadow-sm" strokeWidth={1.8} />
            ))}
          </div>
        </div>

        <div className="relative mt-6 flex flex-col">
          <div className="space-y-4">
            {previewContent.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[0.86rem] leading-[1.48] text-novaleap-navy/82 sm:text-[0.9rem]">
                {paragraph}
              </p>
            ))}
          </div>

          {previewContent.isTruncated ? (
            <button
              type="button"
              onClick={() => onOpenStory(story)}
              className="group mt-4 inline-flex self-start text-[0.82rem] font-semibold text-novaleap-aqua/90 transition hover:text-novaleap-purple"
            >
              <span className="inline-flex items-center gap-2">
                Read story
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.2} />
              </span>
            </button>
          ) : null}
        </div>

        <div className="mt-8 border-t border-novaleap-navy/8 pt-5">
          <p className="text-[0.98rem] font-semibold tracking-tight text-novaleap-navy">{author}</p>
          <p className="mt-1 text-[0.82rem] leading-relaxed text-novaleap-navy/64">{detail}</p>
        </div>
      </div>
    </motion.article>
  );
};

interface StoryModalProps {
  story: Testimonial | null;
  prefersReducedMotion: boolean;
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ story, prefersReducedMotion, onClose }) => {
  React.useEffect(() => {
    if (!story) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, story]);

  return (
    <AnimatePresence>
      {story ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="testimonial-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-novaleap-navy/55 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, scale: prefersReducedMotion ? 1 : 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 10, scale: prefersReducedMotion ? 1 : 0.985 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 180, damping: 24, mass: 0.9 }
            }
            className="relative w-full max-w-[42rem] overflow-hidden rounded-[2rem] border border-novaleap-purple/20 bg-white shadow-[0_40px_90px_-34px_rgba(17,34,78,0.55)]"
          >
            <div className="max-h-[86vh] overflow-y-auto px-5 pb-6 pt-5 sm:px-8 sm:pb-9 sm:pt-7">
              <div className="mx-auto max-w-[31rem]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                  <p className="inline-flex rounded-full border border-novaleap-aqua/55 bg-novaleap-aqua/8 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                    {story.focus}
                  </p>
                  <h3 id="testimonial-modal-title" className="mt-3 text-3xl font-bold tracking-tight text-novaleap-navy sm:text-[2rem]">
                    {story.author}
                  </h3>
                  <p className="mt-2 text-sm text-novaleap-navy/64">{story.detail}</p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-novaleap-navy/15 text-novaleap-navy/72 transition hover:border-novaleap-purple/35 hover:text-novaleap-purple"
                    aria-label="Close testimonial"
                  >
                    <X className="h-4.5 w-4.5" strokeWidth={2.2} />
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-1 text-amber-300" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`${story.author}-modal-star-${index}`} className="h-4 w-4 fill-current" strokeWidth={1.8} />
                  ))}
                </div>

                <div className="mt-6 space-y-5">
                  {story.quoteParagraphs.map((paragraph) => (
                    <p key={`${story.author}-${paragraph}`} className="text-[0.98rem] leading-[1.82] text-novaleap-navy/84 sm:text-[1.02rem]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

/**
 * StoriesOfGrowthSection - Organismic Component
 *
 * Trust-building testimonial section for the homepage, combining a premium
 * aqua panel, draggable mobile cards, and a three-column desktop layout.
 *
 * @example
 * <StoriesOfGrowthSection />
 */
const StoriesOfGrowthSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [cardsPerView, setCardsPerView] = React.useState(1);
  const [internalIndex, setInternalIndex] = React.useState(0);
  const [slideDirection, setSlideDirection] = React.useState<1 | -1>(1);
  const [isInstantTransition, setIsInstantTransition] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<Testimonial | null>(null);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateCardsPerView = () => {
      setCardsPerView(mediaQuery.matches ? DESKTOP_CARDS_PER_VIEW : 1);
    };

    updateCardsPerView();
    mediaQuery.addEventListener("change", updateCardsPerView);

    return () => {
      mediaQuery.removeEventListener("change", updateCardsPerView);
    };
  }, []);

  const totalCards = testimonials.length;
  const cloneCount = Math.min(cardsPerView, totalCards);
  const totalPositions = totalCards;
  const extendedTestimonials = React.useMemo(
    () => [
      ...testimonials.slice(-cloneCount),
      ...testimonials,
      ...testimonials.slice(0, cloneCount),
    ],
    [cloneCount]
  );
  const activeIndex = ((internalIndex - cloneCount) % totalCards + totalCards) % totalCards;

  const goToPrevious = React.useCallback(() => {
    setSlideDirection(-1);
    setInternalIndex((currentIndex) => currentIndex - 1);
  }, [totalCards]);

  const goToNext = React.useCallback(() => {
    setSlideDirection(1);
    setInternalIndex((currentIndex) => currentIndex + 1);
  }, []);

  const goToPosition = React.useCallback(
    (positionIndex: number) => {
      setSlideDirection(positionIndex >= activeIndex ? 1 : -1);
      setInternalIndex(cloneCount + positionIndex);
    },
    [activeIndex, cloneCount]
  );

  const handleCarouselDragEnd = React.useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (Math.abs(info.offset.x) < SWIPE_THRESHOLD) {
        return;
      }

      if (info.offset.x < 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    },
    [goToNext, goToPrevious]
  );

  React.useEffect(() => {
    setIsInstantTransition(true);
    setInternalIndex(cloneCount);
  }, [cloneCount]);

  React.useEffect(() => {
    if (!isInstantTransition) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setIsInstantTransition(false);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [isInstantTransition]);

  const handleSlideAnimationComplete = React.useCallback(() => {
    if (internalIndex < cloneCount) {
      setIsInstantTransition(true);
      setInternalIndex(internalIndex + totalCards);
      return;
    }

    if (internalIndex >= cloneCount + totalCards) {
      setIsInstantTransition(true);
      setInternalIndex(internalIndex - totalCards);
    }
  }, [cloneCount, internalIndex, totalCards]);

  const slideWidth = React.useMemo(() => {
    if (cardsPerView === 1) {
      return "100%";
    }

    return `calc((100% - ${(cardsPerView - 1) * TRACK_GAP_PX}px) / ${cardsPerView})`;
  }, [cardsPerView]);

  const slideOffset = React.useMemo(
    () => `calc(-${internalIndex} * ((100% + ${TRACK_GAP_PX}px) / ${cardsPerView}))`,
    [cardsPerView, internalIndex]
  );

  const reviewSchema = React.useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": testimonials.map((testimonial) => ({
        "@type": "Review",
        itemReviewed: {
          "@type": "LocalBusiness",
          name: "NovaLeap Pediatric Physical Therapy",
        },
        author: {
          "@type": "Person",
          name: testimonial.author,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        name: `Parent testimonial from ${testimonial.author}`,
        reviewBody: testimonial.quoteParagraphs.join(" "),
        publisher: {
          "@type": "Organization",
          name: "NovaLeap Pediatric Physical Therapy",
        },
      })),
    }),
    []
  );

  return (
    <section
      aria-labelledby="family-stories-heading"
      className="relative px-4 py-20 font-[family-name:var(--font-google-sans)] sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-[90rem]">
        <div className="relative overflow-hidden rounded-[2.35rem] border border-novaleap-aqua/18 bg-[linear-gradient(180deg,rgba(0,183,181,0.18)_0%,rgba(239,252,252,0.95)_28%,rgba(255,255,255,0.98)_100%)] px-5 py-14 shadow-[0_40px_110px_-70px_rgba(0,183,181,0.45)] sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div
            aria-hidden="true"
            className="absolute -left-14 top-10 h-36 w-36 rounded-full bg-novaleap-aqua/18 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 h-48 w-48 translate-x-1/4 -translate-y-1/4 rounded-full bg-novaleap-purple/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 translate-y-1/3 rounded-full bg-white/70 blur-3xl"
          />

          <div className="relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                className="mx-auto inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/35 bg-white/70 px-3 py-1 backdrop-blur-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                  Family Stories
                </p>
              </motion.div>

              <motion.h2
                id="family-stories-heading"
                initial="hidden"
                whileInView="show"
                viewport={NOVALEAP_VIEWPORT}
                variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.08, 0.14)}
                className="mt-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-novaleap-navy sm:text-5xl"
              >
                <motion.span
                  variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                  className="block text-balance"
                >
                  Hear from Our NovaLeap
                </motion.span>
                <motion.span
                  variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                  className="block text-balance"
                >
                  Families
                </motion.span>
              </motion.h2>

              <motion.p
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={getNovaleapRevealVariants(prefersReducedMotion, 22, 0.08)}
                className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-novaleap-navy/75 sm:text-xl"
              >
                Real parent experiences from our NovaLeap community.
              </motion.p>
            </div>

            <div className="mx-auto mt-12 max-w-[86rem]">
              <div className="overflow-hidden">
                <motion.div
                  animate={{ x: slideOffset }}
                  transition={
                    isInstantTransition || prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.82, ease: CAROUSEL_EASE }
                  }
                  drag={prefersReducedMotion ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.08}
                  dragMomentum={false}
                  onDragEnd={handleCarouselDragEnd}
                  onAnimationComplete={handleSlideAnimationComplete}
                  whileDrag={prefersReducedMotion ? undefined : { cursor: "grabbing" }}
                  className="flex cursor-grab"
                  style={{ gap: `${TRACK_GAP_PX}px` }}
                >
                  {extendedTestimonials.map((story, slideIndex) => (
                    <div
                      key={`${story.author}-${story.focus}-${slideIndex}`}
                      className="h-full shrink-0"
                      style={{ width: slideWidth }}
                    >
                      <StoryCard
                        story={story}
                        focus={story.focus}
                        quoteParagraphs={story.quoteParagraphs}
                        author={story.author}
                        detail={story.detail}
                        prefersReducedMotion={Boolean(prefersReducedMotion)}
                        onOpenStory={setSelectedStory}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>

              {totalCards > cardsPerView ? (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    className="rounded-full border border-novaleap-navy/16 bg-white px-4 py-2 text-sm font-semibold text-novaleap-navy transition hover:border-novaleap-aqua/45 hover:text-novaleap-aqua"
                    aria-label="Show previous testimonials"
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-2" aria-label="Testimonial positions">
                    {Array.from({ length: totalPositions }).map((_, positionIndex) => (
                      <button
                        key={`testimonials-position-${positionIndex}`}
                        type="button"
                        onClick={() => goToPosition(positionIndex)}
                        className={cn(
                          "h-2.5 w-2.5 rounded-full transition",
                          positionIndex === activeIndex
                            ? "bg-novaleap-aqua"
                            : "bg-novaleap-navy/20 hover:bg-novaleap-navy/40"
                        )}
                        aria-label={`Go to testimonial position ${positionIndex + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={goToNext}
                    className="rounded-full border border-novaleap-navy/16 bg-white px-4 py-2 text-sm font-semibold text-novaleap-navy transition hover:border-novaleap-aqua/45 hover:text-novaleap-aqua"
                    aria-label="Show next testimonials"
                  >
                    Next
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <StoryModal
        story={selectedStory}
        prefersReducedMotion={Boolean(prefersReducedMotion)}
        onClose={() => setSelectedStory(null)}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
    </section>
  );
};

export default StoriesOfGrowthSection;