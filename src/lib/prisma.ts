/**
 * Prisma Client Singleton
 * 
 * Prevents multiple instantiations of Prisma Client in development.
 * This is important in Next.js because hot reloading can create multiple instances.
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
