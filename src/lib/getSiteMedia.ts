/**
 * Server-side helpers to fetch site media from the database.
 * Used by page components to get the current media URLs.
 * Falls back to defaults if DB is unreachable.
 */
import { prisma } from "@/lib/prisma";
import { getDefaultMediaUrl, siteMediaDefaults } from "@/lib/siteMediaDefaults";

export type SiteMediaMap = Record<string, string>;

/**
 * Fetches all site media entries and returns a key→url map.
 * Falls back to default values if DB is unreachable.
 */
export async function getSiteMediaMap(): Promise<SiteMediaMap> {
  try {
    const entries = await prisma.siteMedia.findMany();

    // If table is empty, seed it
    if (entries.length === 0) {
      await prisma.$transaction(
        siteMediaDefaults.map((m) =>
          prisma.siteMedia.upsert({
            where: { key: m.key },
            update: {},
            create: m,
          })
        )
      );
      // Return defaults as the map
      return Object.fromEntries(
        siteMediaDefaults.map((m) => [m.key, m.url])
      );
    }

    return Object.fromEntries(entries.map((e) => [e.key, e.url]));
  } catch {
    // Fallback to defaults if DB is down
    return Object.fromEntries(
      siteMediaDefaults.map((m) => [m.key, m.url])
    );
  }
}

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
