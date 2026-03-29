/**
 * DELETE /api/site-media/[key]
 *   → Deletes a specific media slot by key.
 *
 * PUT /api/site-media/[key]
 *   → Updates the URL for a specific media slot.
 *   Body: { url: string }
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params;
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const decodedKey = decodeURIComponent(key);

    const updated = await prisma.siteMedia.update({
      where: { key: decodedKey },
      data: { url },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating site media:", error);
    return NextResponse.json(
      { error: "Error updating site media" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { key: string } }
) {
  try {
    const decodedKey = decodeURIComponent(params.key);

    await prisma.siteMedia.delete({
      where: { key: decodedKey },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting site media:", error);
    return NextResponse.json(
      { error: "Error deleting site media" },
      { status: 500 }
    );
  }
}
