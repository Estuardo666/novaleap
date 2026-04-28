import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Check if entry already exists
    const existing = await prisma.siteMedia.findUnique({
      where: { key: 'home.why-us-video' },
    });

    if (existing) {
      console.log('Entry "home.why-us-video" already exists.');
      return;
    }

    // Create the entry
    const result = await prisma.siteMedia.create({
      data: {
        key: 'home.why-us-video',
        url: '',
        type: 'video',
        label: 'Why Us — Video 9:16 (Our Approach Section)',
        page: 'home',
      },
    });

    console.log('✓ Created "home.why-us-video" entry:', result);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
