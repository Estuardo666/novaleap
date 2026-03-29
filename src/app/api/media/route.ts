import { NextRequest, NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2Client } from "@/lib/storage/r2client";
import { prisma } from "@/lib/prisma";

const BUCKET_NAME = process.env.R2_BUCKET_NAME || "fmmarketingdigital";

// GET: Listar todos los MediaAssets
export async function GET(req: NextRequest) {
  try {
    const assets = await prisma.mediaAsset.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ assets });
  } catch (error: any) {
    console.error("Error fetching media:", error);
    return NextResponse.json({ error: "Failed to fetch media assets" }, { status: 500 });
  }
}

// DELETE: Borrar un MediaAsset por su Key o ID
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing asset ID" }, { status: 400 });
    }

    const asset = await prisma.mediaAsset.findUnique({
      where: { id },
    });

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // 1. Delete from R2
    const deleteCommand = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: asset.key,
    });
    
    await r2Client.send(deleteCommand);

    // 2. Delete from DB
    await prisma.mediaAsset.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Asset deleted correctly" });
  } catch (error: any) {
    console.error("Error deleting media:", error);
    return NextResponse.json({ error: "Failed to delete media asset" }, { status: 500 });
  }
}
