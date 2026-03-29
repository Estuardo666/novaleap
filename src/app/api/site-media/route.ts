/**
 * GET /api/site-media
 *   → Returns all site media entries (or filtered by ?page=xxx).
 *
 * POST /api/site-media/seed
 *   → Seeds the database with default values for any missing keys.
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { siteMediaDefaults } from "@/lib/siteMediaDefaults";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    // Count total entries (unfiltered) to check if seeding is needed
    const totalCount = await prisma.siteMedia.count();

    // Only seed if the DB is genuinely empty or missing entries
    if (totalCount < siteMediaDefaults.length) {
      await prisma.$transaction(
        siteMediaDefaults.map((m) =>
          prisma.siteMedia.upsert({
            where: { key: m.key },
            update: {},
            create: m,
          })
        )
      );
    }

    const entries = await prisma.siteMedia.findMany({
      ...(page ? { where: { page } } : {}),
      orderBy: { page: "asc" },
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching site media:", error);
    return NextResponse.json(
      { error: "Error fetching site media" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/site-media
 *   → Syncs all default media entries: inserts missing keys, leaves existing ones untouched.
 */
export async function POST() {
  try {
    await prisma.$transaction(
      siteMediaDefaults.map((m) =>
        prisma.siteMedia.upsert({
          where: { key: m.key },
          update: {}, // don't overwrite existing values
          create: m,
        })
      )
    );

    const entries = await prisma.siteMedia.findMany({
      orderBy: { page: "asc" },
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error syncing site media:", error);
    return NextResponse.json(
      { error: "Error syncing site media" },
      { status: 500 }
    );
  }
}
