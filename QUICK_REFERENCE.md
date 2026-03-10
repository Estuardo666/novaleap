# 🎯 NOVALEAP - Quick Reference Guide

## Essential Commands

```bash
# Start Development
npm run dev

# Build for Production
npm run build

# Database Migrations
npm run db:migrate
npm run db:migrate:deploy

# View Database
npm run db:studio

# Type Check
npm run type-check
```

---

## Component Import Examples

```typescript
// Atoms
import { Button, Input } from "@/components/atoms";

// Molecules
import { FormField, SearchBar } from "@/components/molecules";

// Organisms
import { Navbar, HeroSection } from "@/components/organisms";

// Templates
import { RootLayout, PageTemplate } from "@/components/templates";

// Utilities
import { cn } from "@/lib/utils";
import { apiGet, apiPost } from "@/utils/api";
import { useFetch, useAsync } from "@/hooks";

// Types
import type { Service, Appointment, ApiResponse } from "@/types";
```

---

## File Locations Quick Map

| Feature | Location |
|---------|----------|
| UI Components | `src/components/{atoms,molecules,organisms,templates}/` |
| Utilities | `src/lib/utils.ts` |
| API Helpers | `src/utils/api.ts` |
| Custom Hooks | `src/hooks/` |
| Type Definitions | `src/types/` |
| API Routes | `src/app/api/` |
| Pages | `src/app/` |
| Database | `prisma/schema.prisma` |
| Styling Config | `tailwind.config.ts` |
| Environment | `.env.local` |

---

## Common Tasks

### Create New Button Variant
```typescript
// src/components/atoms/Button.tsx
// Add to variants object:
gradient: "bg-gradient-to-r from-teal-500 to-sage-500 text-white hover:opacity-90"
```

### Add New Prisma Model
```prisma
// prisma/schema.prisma
model Review {
  id      String @id @default(cuid())
  rating  Int
  text    String
  service Service @relation(fields: [serviceId], references: [id])
  serviceId String
  @@index([serviceId])
}

// Then run: npm run db:migrate
```

### Create API Endpoint
```typescript
// src/app/api/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const reviews = await prisma.review.findMany();
  return NextResponse.json({ status: "success", data: reviews });
}
```

### Use API in Component
```typescript
'use client';
import { useFetch } from "@/hooks";
import type { Review } from "@/types";

export default function ReviewsList() {
  const { data, isLoading } = useFetch<Review[]>("/api/reviews");
  
  if (isLoading) return <div>Loading...</div>;
  return <div>{data?.map(r => <div key={r.id}>{r.text}</div>)}</div>;
}
```

---

## Color Usage

```typescript
// Primary Actions
<Button className="bg-teal-500">Primary</Button>

// Secondary Actions
<Button className="bg-sage-500">Secondary</Button>

// Highlights/Badges
<span className="bg-mint-500 text-white">New</span>

// Backgrounds
<div className="bg-sand-100">Content</div>

// Errors
<p className="text-coral-500">Error message</p>
```

---

## Project Status Checklist

- [x] Next.js 14 project created
- [x] TypeScript configured
- [x] Tailwind CSS with brand colors
- [x] Atomic Design structure (4 levels)
- [x] Example components created
- [x] Framer Motion setup
- [x] React Hook Form ready
- [x] Zod validation ready
- [x] Prisma ORM configured
- [x] Database schema created (4 models)
- [x] API route examples
- [x] Custom hooks created
- [x] Type definitions setup
- [x] Utilities configured
- [x] npm scripts setup
- [x] Environment files prepared
- [x] Documentation complete

---

## Database Models Quick Reference

### Service
Fields: id, name, slug, description, price, duration, category, icon, image, isActive, createdAt, updatedAt
Relations: appointments

### Appointment
Fields: id, serviceId, clientName, clientEmail, clientPhone, status, scheduledAt, notes, canceledAt, cancelReason, createdAt, updatedAt
Status: PENDING | CONFIRMED | IN_PROGRESS | COMPLETED | CANCELED | NO_SHOW

### User
Fields: id, email, name, password, role, createdAt, updatedAt
Roles: CLIENT | STAFF | ADMIN

### Setting
Fields: id, key, value, createdAt, updatedAt

---

## Brand Colors Reference

| Name | Primary | Hex | Tonal |
|------|---------|-----|-------|
| **Teal** | teal-500 | #004346 | 50-900 |
| **Sage** | sage-500 | #749C75 | 50-900 |
| **Mint** | mint-500 | #B0D0B0 | 50-900 |
| **Sand** | sand-500 | #F1DABF | 50-900 |
| **Coral** | coral-500 | #93545E | 50-900 |

Use tones: `color-50`, `color-100`, `color-500`, `color-900`, etc.

---

## Folder Structure Overview

```
novaleap-app/
├── src/app/              ← Pages & API routes
├── src/components/       ← Reusable components (atomic)
├── src/lib/              ← Utilities & config
├── src/hooks/            ← Custom React hooks
├── src/utils/            ← Helper functions
├── src/types/            ← Type definitions
├── prisma/               ← Database schema
├── public/               ← Static assets
├── tailwind.config.ts    ← Styling config
├── tsconfig.json         ← TypeScript config
├── .env.local            ← Environment (secret)
└── package.json          ← Dependencies
```

---

## Next.js App Router Quick Tips

| Path | URL |
|------|-----|
| `src/app/page.tsx` | `/` |
| `src/app/services/page.tsx` | `/services` |
| `src/app/services/[id]/page.tsx` | `/services/123` |
| `src/app/api/services/route.ts` | `/api/services` |
| `src/app/layout.tsx` | Root layout |

---

## Environment Template

```env
# Database (Update with your credentials)
DATABASE_URL="mysql://root:password@localhost:3306/novaleap"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Optional: Payment/Services
# STRIPE_SECRET_KEY="sk_..."
# SENDGRID_API_KEY="sg_..."
```

---

## Performance Optimization Tips

1. Use `'use client'` only when needed
2. Lazy load components with `dynamic()`
3. Optimize images with `Image` component
4. Cache API responses in hooks
5. Use React.memo for expensive components
6. Minimize bundle size at build

---

## Debugging Tips

```typescript
// Enable Prisma logging
// In src/lib/prisma.ts:
new PrismaClient({
  log: ["query", "error", "warn"],
})

// Check Next.js build
npm run build

// View Prisma Studio
npm run db:studio

// Validate TypeScript
npm run type-check

// Check schema
npx prisma validate
```

---

## Deployment Checklist

- [ ] All environment variables set
- [ ] Database migrations deployed
- [ ] Build passes locally (`npm run build`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] API routes tested
- [ ] API keys secured in environment
- [ ] Database backups configured
- [ ] Error tracking setup (Sentry)
- [ ] Analytics setup (Google Analytics, etc.)
- [ ] Security headers configured

---

## Support Resources

- **Documentation:** `SETUP_GUIDE.md`, `ARCHITECTURE.md`, `PROJECT_STRUCTURE.md`
- **Example Components:** `src/components/{atoms,molecules,organisms}/`
- **Database Schema:** `prisma/schema.prisma`
- **API Example:** `src/app/api/services/route.ts`

---

## Quick Start (3 steps)

```bash
# 1. Install & configure
npm install
# Edit .env.local with your database URL

# 2. Setup database
npm run db:migrate

# 3. Start developing
npm run dev
# Open http://localhost:3000
```

---

## Key Files Breakdown

| File | Purpose | Edit When |
|------|---------|-----------|
| `tailwind.config.ts` | Colors & theme | Changing brand colors |
| `prisma/schema.prisma` | Database structure | Adding new models/fields |
| `src/types/index.ts` | Type definitions | Creating new types |
| `src/lib/utils.ts` | Utility functions | Adding new helpers |
| `.env.local` | Secrets & config | Changing database/API keys |
| `package.json` | Dependencies & scripts | Adding packages/scripts |

---

**Everything is ready. Happy building! 🚀**
