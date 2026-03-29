/**
 * Server-side helpers to fetch site media from the database.
 * Used by page components to get the current media URLs.
 * Falls back to defaults if DB is unreachable.
 */
import { prisma } from "@/lib/prisma";
import { getDefaultMediaUrl, siteMediaDefaults } from "@/lib/siteMediaDefaults";

export type SiteMediaMap = Record<string, string>;

import { unstable_cache } from "next/cache";

/**
 * Fetches all site media entries and returns a key→url map.
 * Falls back to default values if DB is unreachable.
 * Cached to prevent database connection exhaustion.
 */
export const getSiteMediaMap = unstable_cache(
  async (): Promise<SiteMediaMap> => {
    try {
      const entries = await prisma.siteMedia.findMany();

      if (entries.length === 0) {
        // Return defaults as the map (don't perform transactions during static build)
        return Object.fromEntries(
          siteMediaDefaults.map((m) => [m.key, m.url])
        );
      }

      return Object.fromEntries(entries.map((e) => [e.key, e.url]));
    } catch {
      return Object.fromEntries(
        siteMediaDefaults.map((m) => [m.key, m.url])
      );
    }
  },
  ["site-media-map"],
  { tags: ["site-media"], revalidate: 3600 }
);

/**
 * Get a single media URL by key, with fallback.
 */
export async function getSiteMediaUrl(key: string): Promise<string> {
  try {
    const entry = await prisma.siteMedia.findUnique({ where: { key } });
    return entry?.url ?? getDefaultMediaUrl(key);
  } catch {
    return getDefaultMediaUrl(key);
  }
}
