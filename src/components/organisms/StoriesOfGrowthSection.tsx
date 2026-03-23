"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import {
  getNovaleapRevealVariants,
  getNovaleapStaggerContainerVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";
import { cn } from "@/lib/utils";

const featuredStory = {
  focus: "Verified Parent Review",
  image:
    "https://images.pexels.com/photos/8613090/pexels-photo-8613090.jpeg?auto=compress&cs=tinysrgb&w=1400",
  imageAlt: "Parent and child sharing a joyful therapy moment with a pediatric therapist.",
  imagePosition: "center 40%",
  quoteParagraphs: [
    "Ms. Jen was absolutely amazing with both of my children. We first met her when she evaluated our daughter at eight months old, and she immediately stood out as being a strengths-based service provider. During a stressful time, she was the only evaluator who asked about our daughter's strengths, something that reflects her approach as a therapist.",
    "She is kind, patient, and encouraging, while also knowing when to be firm to support progress. Ms. Jen is extremely active during sessions, modeling skills, ensuring positional safety, and giving parents clear updates on progress along with practical strategies to work on at home.",
    "We saw so much growth and improvement in both of our children and attribute so much of that to her dedication and expertise. She is also a great team player, working seamlessly with other providers (in our case an OT, a neurologist, and a physiatrist) to support the whole child.",
    "Most importantly, she makes therapy fun and meaningful, helping children build skills that are challenging for them in an engaging and supportive way. We are incredibly grateful for Ms. Jen and cannot recommend her highly enough!",
  ],
  author: "Michelle",
  detail: "Yonkers, N.Y.",
} as const;

interface StoryCardProps {
  focus: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  quoteParagraphs: readonly string[];
  author: string;
  detail: string;
  prefersReducedMotion: boolean;
  className?: string;
}

const StoryCard: React.FC<StoryCardProps> = ({
  focus,
  image,
  imageAlt,
  imagePosition,
  quoteParagraphs,
  author,
  detail,
  prefersReducedMotion,
  className,
}) => {
  return (
    <motion.article
      variants={getNovaleapRevealVariants(prefersReducedMotion, 28)}
      whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.82 }}
      className={cn(
        "relative h-full overflow-hidden rounded-[1.7rem] border border-white/75 bg-white px-6 py-6 shadow-[0_24px_60px_-44px_rgba(17,34,78,0.42)] sm:px-7 sm:py-7",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-[10.5rem] select-none text-[4.6rem] font-bold leading-none text-novaleap-aqua/10 sm:left-5 sm:top-[11.2rem] sm:text-[5rem]"
      >
        "
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="relative overflow-hidden rounded-[1.35rem] bg-novaleap-aqua/8">
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
            transition={{ type: "spring", stiffness: 210, damping: 24 }}
            className="relative h-40 sm:h-44"
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 767px) 84vw, (max-width: 1023px) 42vw, 28vw"
              className="object-cover"
              style={{ objectPosition: imagePosition }}
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-novaleap-navy/28 via-transparent to-white/10" />

          <div className="absolute left-4 top-4">
            <span className="inline-flex rounded-full border border-white/40 bg-white/82 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-novaleap-aqua shadow-sm backdrop-blur-sm">
              {focus}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-1 text-amber-300" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={`${author}-star-${index}`} className="h-4 w-4 fill-current drop-shadow-sm" strokeWidth={1.8} />
            ))}
          </div>
        </div>

        <div className="relative mt-5 space-y-4">
          {quoteParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-[0.97rem] leading-relaxed text-novaleap-navy/82 sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-6 border-t border-novaleap-navy/8 pt-5">
          <p className="text-[0.98rem] font-semibold tracking-tight text-novaleap-navy">{author}</p>
          <p className="mt-1 text-[0.82rem] leading-relaxed text-novaleap-navy/64">{detail}</p>
        </div>
      </div>
    </motion.article>
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
  const reviewSchema = React.useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Review",
      itemReviewed: {
        "@type": "LocalBusiness",
        name: "NovaLeap Pediatric Physical Therapy",
      },
      author: {
        "@type": "Person",
        name: featuredStory.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      name: "Parent testimonial for Ms. Jen",
      reviewBody: featuredStory.quoteParagraphs.join(" "),
      publisher: {
        "@type": "Organization",
        name: "NovaLeap Pediatric Physical Therapy",
      },
    }),
    []
  );

  return (
    <section
      aria-labelledby="family-stories-heading"
      className="relative px-4 py-20 font-[family-name:var(--font-google-sans)] sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
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
                  Family Story
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
                A real parent experience from our NovaLeap community.
              </motion.p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.1, 0.12)}
              className="mx-auto mt-12 max-w-4xl"
            >
              <StoryCard
                focus={featuredStory.focus}
                image={featuredStory.image}
                imageAlt={featuredStory.imageAlt}
                imagePosition={featuredStory.imagePosition}
                quoteParagraphs={featuredStory.quoteParagraphs}
                author={featuredStory.author}
                detail={featuredStory.detail}
                prefersReducedMotion={Boolean(prefersReducedMotion)}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
    </section>
  );
};

export default StoriesOfGrowthSection;