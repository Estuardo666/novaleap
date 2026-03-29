import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptsDir, "..");
const snapshotPath = resolve(
  repoRoot,
  "src",
  "lib",
  "generated",
  "siteMediaSnapshot.json"
);

async function writeSnapshot(snapshot) {
  await mkdir(dirname(snapshotPath), { recursive: true });
  await writeFile(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log("Skipping site media snapshot refresh because DATABASE_URL is not set.");
    return;
  }

  let prisma;

  try {
    const { PrismaClient } = await import("@prisma/client");
    prisma = new PrismaClient();

    const entries = await prisma.siteMedia.findMany({
      select: {
        key: true,
        url: true,
      },
    });

    if (entries.length === 0) {
      console.log("Skipping site media snapshot refresh because SiteMedia is empty.");
      return;
    }

    const snapshot = Object.fromEntries(
      entries.map((entry) => [entry.key, entry.url])
    );

    await writeSnapshot(snapshot);
    console.log(`Updated site media snapshot with ${entries.length} entries.`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Skipping site media snapshot refresh: ${message}`);
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
}

await main();