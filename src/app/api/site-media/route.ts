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

    const entries = await prisma.siteMedia.findMany({
      ...(page ? { where: { page } } : {}),
      orderBy: { page: "asc" },
    });

    // If no entries exist or if new defaults were added, seed them automatically
    if (entries.length < siteMediaDefaults.length) {
      await prisma.$transaction(
        siteMediaDefaults.map((m) =>
          prisma.siteMedia.upsert({
            where: { key: m.key },
            update: {},
            create: m,
          })
        )
      );
      const seeded = await prisma.siteMedia.findMany({
        ...(page ? { where: { page } } : {}),
        orderBy: { page: "asc" },
      });
      return NextResponse.json(seeded);
    }

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
