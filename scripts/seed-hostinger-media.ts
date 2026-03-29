import { PrismaClient } from '@prisma/client'
import { siteMediaDefaults } from '../src/lib/siteMediaDefaults'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding media to Hostinger database...')
  
  const defaults = siteMediaDefaults
  const existing = await prisma.siteMedia.findMany()
  const existingKeys = new Set(existing.map((e) => e.key))

  let added = 0
  for (const def of defaults) {
    if (!existingKeys.has(def.key)) {
      await prisma.siteMedia.create({
        data: {
          key: def.key,
          url: def.url,
          type: def.type,
          label: def.label,
          page: def.page,
        },
      })
      added++
      console.log(`Added: ${def.key} -> ${def.url}`)
    }
  }

  console.log(`Seeding complete. Added ${added} new entries.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
