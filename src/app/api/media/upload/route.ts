import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2Client } from "@/lib/storage/r2client";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();
const BUCKET_NAME = process.env.R2_BUCKET_NAME || "fmmarketingdigital";
const CUSTOM_DOMAIN = process.env.R2_CUSTOM_DOMAIN || ""; // Opcional, si tienes un dominio personalizado apuntando a R2

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name;
    const extension = originalName.split('.').pop();
    const uniqueKey = `${crypto.randomUUID()}.${extension}`;
    const contentType = file.type;

    // Determine type based on MIME
    let mediaType = "unknown";
    if (contentType.startsWith("image/")) mediaType = "image";
    else if (contentType.startsWith("video/")) mediaType = "video";

    // Upload to Cloudflare R2
    const uploadCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: uniqueKey,
      Body: buffer,
      ContentType: contentType,
    });

    await r2Client.send(uploadCommand);

    // URL Pública
    const publicUrlBase = process.env.R2_PUBLIC_URL?.replace(/\/+$/, "") || "";
    let publicUrl = "";
    if (publicUrlBase) {
       publicUrl = `${publicUrlBase}/${uniqueKey}`;
    } else {
       // Si no se configuró R2_PUBLIC_URL, retornamos una URL relativa/falsa pero que es útil para debugging
       publicUrl = `/media/${uniqueKey}`;
    }

    // Save to Prisma
    const newMedia = await prisma.mediaAsset.create({
      data: {
        name: originalName,
        url: publicUrl,
        key: uniqueKey,
        type: mediaType,
        size: file.size,
      },
    });

    return NextResponse.json({ success: true, media: newMedia });
  } catch (error: any) {
    console.error("Error uploading to R2:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 });
  }
}
