/**
 * GET /api/admin/migrate-keys
 *
 * One-time migration: renames old service media keys to match the actual
 * route slugs, and inserts any new hero-image slots.
 *
 * Invoke once from production by visiting:
 *   https://novaleappediatricpt.com/api/admin/migrate-keys
 */
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Map of old key → new key to rename
const KEY_RENAMES: Record<string, string> = {
  "services.evaluation.card-image":   "services.evaluations-and-assessments.card-image",
  "services.evaluation.feature-image":"services.evaluations-and-assessments.feature-image",
  "services.evaluation.feature-video":"services.evaluations-and-assessments.feature-video",
};

// New entries to insert if they don't exist yet
const NEW_ENTRIES = [
  {
    key: "services.evaluations-and-assessments.hero-image",
    url: "https://images.pexels.com/photos/7089636/pexels-photo-7089636.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "image" as const,
    label: "Fondo Principal de Evaluación (Hero)",
    page: "services",
  },
  {
    key: "services.treatment.hero-image",
    url: "https://images.pexels.com/photos/8613314/pexels-photo-8613314.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "image" as const,
    label: "Fondo Principal de Tratamiento (Hero)",
    page: "services",
  },
];

// Pexels URLs that mean "never been customised" — treat these as empty
const PEXELS_DEFAULTS = new Set([
  "https://images.pexels.com/photos/7089636/pexels-photo-7089636.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/8613314/pexels-photo-8613314.jpeg?auto=compress&cs=tinysrgb&w=1600",
]);

// Hero slots whose fallback source is the matching card-image
const HERO_TO_CARD: Record<string, string> = {
  "services.evaluations-and-assessments.hero-image": "services.evaluations-and-assessments.card-image",
  "services.treatment.hero-image": "services.treatment.card-image",
};

export async function GET() {
  const log: string[] = [];

  try {
    // 1. Rename old keys
    for (const [oldKey, newKey] of Object.entries(KEY_RENAMES)) {
      const existing = await prisma.siteMedia.findUnique({ where: { key: oldKey } });

      if (!existing) {
        log.push(`SKIP rename: "${oldKey}" not found in DB (already renamed or never existed)`);
        continue;
      }

      const alreadyExists = await prisma.siteMedia.findUnique({ where: { key: newKey } });
      if (alreadyExists) {
        await prisma.siteMedia.delete({ where: { key: oldKey } });
        log.push(`DELETE orphan "${oldKey}" (new key "${newKey}" already exists)`);
        continue;
      }

      await prisma.siteMedia.update({
        where: { key: oldKey },
        data: { key: newKey },
      });
      log.push(`RENAMED "${oldKey}" → "${newKey}"`);
    }

    // 2. Insert new entries that don't exist yet
    for (const entry of NEW_ENTRIES) {
      const existing = await prisma.siteMedia.findUnique({ where: { key: entry.key } });
      if (existing) {
        log.push(`SKIP insert: "${entry.key}" already exists`);
        continue;
      }
      await prisma.siteMedia.create({ data: entry });
      log.push(`CREATED "${entry.key}"`);
    }

    // 3. Sync hero-image from card-image when hero is still a Pexels default
    for (const [heroKey, cardKey] of Object.entries(HERO_TO_CARD)) {
      const hero = await prisma.siteMedia.findUnique({ where: { key: heroKey } });
      const card = await prisma.siteMedia.findUnique({ where: { key: cardKey } });

      if (!hero || !card) {
        log.push(`SKIP sync: "${heroKey}" or "${cardKey}" not found`);
        continue;
      }

      const heroIsDefault = !hero.url || PEXELS_DEFAULTS.has(hero.url);
      const cardIsCustomised = card.url && !PEXELS_DEFAULTS.has(card.url);

      if (heroIsDefault && cardIsCustomised) {
        await prisma.siteMedia.update({
          where: { key: heroKey },
          data: { url: card.url },
        });
        log.push(`SYNCED "${heroKey}" ← "${cardKey}" (${card.url.slice(0, 60)}...)`);
      } else {
        log.push(`SKIP sync: "${heroKey}" already customised or card not uploaded`);
      }
    }

    // 4. Force all static pages to rebuild with the new data
    revalidatePath("/", "layout");
    log.push("REVALIDATED all pages");

    return NextResponse.json({ ok: true, log });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json({ ok: false, error: String(error), log }, { status: 500 });
  }
}
