import { PrismaClient } from '@prisma/client';

// Connection to production database (Hostinger)
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "mysql://u759397840_novaleapuser:NOVAleap20269713@195.35.61.12:3306/u759397840_novaleap",
    },
  },
});

async function main() {
  try {
    console.log('🔗 Connecting to Hostinger production database...');

    // Check if entry already exists
    const existing = await prisma.siteMedia.findUnique({
      where: { key: 'home.why-us-video' },
    });

    if (existing) {
      console.log('✓ Entry "home.why-us-video" already exists in production.');
      console.log('  Key:', existing.key);
      console.log('  URL:', existing.url || '(empty)');
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

    console.log('✅ Successfully created "home.why-us-video" entry in production:');
    console.log('  ID:', result.id);
    console.log('  Key:', result.key);
    console.log('  Type:', result.type);
    console.log('  Page:', result.page);
    console.log('  Created:', result.createdAt);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
