/**
 * Server-side helpers to fetch site media from the database.
 * Used by page components to get the current media URLs.
 * Falls back to defaults if DB is unreachable.
 */
import siteMediaSnapshot from "@/lib/generated/siteMediaSnapshot.json";
import { getDefaultMediaUrl, siteMediaDefaults } from "@/lib/siteMediaDefaults";

export type SiteMediaMap = Record<string, string>;

import { unstable_cache } from "next/cache";

const defaultSiteMediaMap = Object.fromEntries(
  siteMediaDefaults.map((media) => [media.key, media.url])
) as SiteMediaMap;

const buildSnapshotSiteMediaMap = siteMediaSnapshot as SiteMediaMap;

const getFallbackSiteMediaMap = (): SiteMediaMap => ({
  ...defaultSiteMediaMap,
  ...buildSnapshotSiteMediaMap,
});

const shouldUseBuildSnapshot =
  process.env.NOVALEAP_USE_MEDIA_SNAPSHOT === "1" || !process.env.DATABASE_URL;

const getPrismaClient = async () => {
  const { prisma } = await import("@/lib/prisma");
  return prisma;
};

/**
 * Fetches all site media entries and returns a key→url map.
 * Falls back to default values if DB is unreachable.
 * Cached to prevent database connection exhaustion.
 */
export const getSiteMediaMap = unstable_cache(
  async (): Promise<SiteMediaMap> => {
    if (shouldUseBuildSnapshot) {
      return getFallbackSiteMediaMap();
    }

    try {
      const prisma = await getPrismaClient();
      const entries = await prisma.siteMedia.findMany();

      if (entries.length === 0) {
        return getFallbackSiteMediaMap();
      }

      return Object.fromEntries(entries.map((e) => [e.key, e.url]));
    } catch {
      return getFallbackSiteMediaMap();
    }
  },
  ["site-media-map"],
  { tags: ["site-media"], revalidate: 3600 }
);

/**
 * Get a single media URL by key, with fallback.
 */
export async function getSiteMediaUrl(key: string): Promise<string> {
  if (shouldUseBuildSnapshot) {
    return getFallbackSiteMediaMap()[key] ?? getDefaultMediaUrl(key);
  }

  try {
    const prisma = await getPrismaClient();
    const entry = await prisma.siteMedia.findUnique({ where: { key } });
    return entry?.url ?? getFallbackSiteMediaMap()[key] ?? getDefaultMediaUrl(key);
  } catch {
    return getFallbackSiteMediaMap()[key] ?? getDefaultMediaUrl(key);
  }
}
