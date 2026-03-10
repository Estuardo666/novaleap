# 🚀 NOVALEAP - Complete Project Setup Guide

## Project Overview

NOVALEAP is a modern, full-stack web application built with:
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom brand colors
- **MariaDB + Prisma ORM** for database management
- **Atomic Design** architecture for scalable components
- **Framer Motion** for animations
- **React Hook Form** for form handling

---

## 📋 Prerequisites

- **Node.js v20+**
- **npm 10+**
- **MariaDB** (or MySQL 5.7+)

---

## 🔧 Environment Setup

### 1. Database Configuration

Create a `.env.local` file in the project root:

```env
# Database Connection String
DATABASE_URL="mysql://YOUR_USERNAME:YOUR_PASSWORD@localhost:3306/novaleap"

# Next.js Environment
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

**Connection String Format:**
```
mysql://[user]:[password]@[host]:[port]/[database]
```

### 2. Create MariaDB Database

```sql
CREATE DATABASE novaleap CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## 📦 Installed Dependencies

### Core Framework & Styling
- `next@14.2` - React framework with SSR
- `react@18` - UI library
- `typescript@5` - Type safety
- `tailwindcss@3` - Utility-first CSS

### UI & Animations
- `framer-motion@11` - Advanced animations
- `aceternity` - Premium UI patterns
- `lucide-react@latest` - Icon library
- `class-variance-authority` - Component variants
- `clsx` - Conditional CSS classes
- `tailwind-merge` - Merge Tailwind classes

### Forms & Validation
- `react-hook-form@7` - Efficient form management
- `zod@3` - Schema validation
- `@hookform/resolvers` - RHF + Zod integration

### Database & ORM
- `@prisma/client@5.15` - Database client
- `prisma@5.15` - ORM and migrations

---

## 🗂️ Project Structure

```
novaleap-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── services/      # Service endpoints
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   │
│   ├── components/            # Atomic Design
│   │   ├── atoms/             # Base UI elements
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   ├── molecules/         # Component combinations
│   │   │   ├── FormField.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── index.ts
│   │   ├── organisms/         # Complex sections
│   │   │   ├── Navbar.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   └── index.ts
│   │   └── templates/         # Page layouts
│   │       ├── RootLayout.tsx
│   │       └── index.ts
│   │
│   ├── lib/                   # Utilities
│   │   ├── utils.ts           # cn() function
│   │   └── prisma.ts          # Prisma client
│   │
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # API helpers
│   ├── types/                 # TypeScript types
│   └── styles/
│       └── globals.css
│
├── prisma/
│   └── schema.prisma          # Database schema
│
├── .env.example               # Template env variables
├── .env.local                 # Local env (ignored by git)
├── tailwind.config.ts         # Tailwind with brand colors
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 🎨 Brand Color Palette

All colors are configured in `tailwind.config.ts`:

| Color  | Primary   | HEX Code | Variable    | Usage                |
|--------|-----------|----------|-------------|----------------------|
| Teal   | Primary   | #004346  | `teal-500`  | Main CTA, headers    |
| Sage   | Secondary | #749C75  | `sage-500`  | Secondary actions    |
| Mint   | Accent    | #B0D0B0  | `mint-500`  | Highlights, badges   |
| Sand   | Warm      | #F1DABF  | `sand-500`  | Backgrounds          |
| Coral  | Alert     | #93545E  | `coral-500` | Errors, warnings     |

**Usage Examples:**
```jsx
<button className="bg-teal-500 text-white">Primary</button>
<button className="bg-sage-500 text-white">Secondary</button>
<span className="text-coral-500">Error message</span>
```

---

## 🗄️ Database Schema

### Models Created

#### Service
- Core business offering
- Contains pricing, duration, category
- Has many appointments

#### Appointment
- Booking/scheduling entity
- Links to services
- Tracks status throughout lifecycle
- Status options: PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELED, NO_SHOW

#### User
- Authentication support
- Role-based access (CLIENT, STAFF, ADMIN)

#### Setting
- Application configuration key-value store

---

## 🚀 Getting Started

### 1. Install Dependencies
All dependencies are already installed, but to verify:
```bash
npm install
```

### 2. Set Environment Variables
```bash
# Edit .env.local with your database credentials
nano .env.local
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Run Database Migrations
```bash
# Create the first migration
npx prisma migrate dev --name init

# Migrate production database
npx prisma migrate deploy
```

### 5. Seed Database (Optional)
Create `prisma/seed.ts`:
```typescript
import { prisma } from "@/lib/prisma";

async function main() {
  const service = await prisma.service.create({
    data: {
      name: "Consultation",
      slug: "consultation",
      description: "Initial consultation service",
      price: 99.99,
      duration: 60,
      category: "consultation",
      isActive: true,
    },
  });
  console.log("Created service:", service);
}

main()
  .catch(console.error)
  .finally(() => process.exit(0));
```

Run with: `npx prisma db seed`

### 6. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📚 Atomic Design Pattern

### Atoms
Smallest building blocks - no dependencies
```typescript
import { Button, Input } from "@/components/atoms";
```

### Molecules
Collections of atoms - still reusable
```typescript
import { FormField, SearchBar } from "@/components/molecules";
```

### Organisms
Complex components - feature-rich sections
```typescript
import { Navbar, HeroSection } from "@/components/organisms";
```

### Templates
Page layouts - structural containers
```typescript
import { RootLayout, PageTemplate } from "@/components/templates";
```

---

## 🛠️ Common Tasks

### Creating a New Component

1. **Create an Atom** (Button variant):
```typescript
// src/components/atoms/IconButton.tsx
import { Button } from "./Button";

interface IconButtonProps {
  icon: React.ReactNode;
}

export default function IconButton({ icon, ...props }: IconButtonProps) {
  return <Button {...props}>{icon}</Button>;
}
```

2. **Combine into Molecule** (Button group):
```typescript
// src/components/molecules/ButtonGroup.tsx
import { Button } from "@/components/atoms";

export function ButtonGroup({ actions }) {
  return (
    <div className="flex gap-2">
      {actions.map(action => <Button key={action.id}>{action.label}</Button>)}
    </div>
  );
}
```

3. **Use in Organism** (Form section):
```typescript
// src/components/organisms/ContactForm.tsx
import { FormField } from "@/components/molecules";
import { Button } from "@/components/atoms";

export default function ContactForm() {
  return (
    <form>
      <FormField label="Email" placeholder="your@email.com" />
      <Button variant="primary">Submit</Button>
    </form>
  );
}
```

### API Routes

Create new API routes in `src/app/api/`:

```typescript
// src/app/api/appointments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const appointments = await prisma.appointment.findMany();
  return NextResponse.json({ status: "success", data: appointments });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const appointment = await prisma.appointment.create({ data: body });
  return NextResponse.json({ status: "success", data: appointment }, { status: 201 });
}
```

### Using Hooks

Pre-built hooks are in `src/hooks/`:

```typescript
import { useFetch, useAsync } from "@/hooks";
import type { Service } from "@/types";

export default function ServiceList() {
  const { data, isLoading } = useFetch<Service[]>("/api/services");

  if (isLoading) return <div>Loading...</div>;
  return <div>{data?.map(s => <div key={s.id}>{s.name}</div>)}</div>;
}
```

---

## 🔐 Environment Variables Reference

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/novaleap

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Optional: Payment Processing
# STRIPE_SECRET_KEY=sk_...
# STRIPE_PUBLISHABLE_KEY=pk_...

# Optional: Email Service
# SENDGRID_API_KEY=SG....
# EMAIL_FROM=noreply@novaleap.com
```

---

## 📖 Documentation Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

---

## 🐛 Troubleshooting

### Database Connection Error
```
Error: Can't reach database server at `localhost:3306`
```
**Solution:** Ensure MariaDB is running and credentials in `.env.local` are correct.

### Prisma Client Not Generated
```bash
npx prisma generate
```

### Schema Validation Error
```bash
npx prisma validate
```

### Clear Prisma Cache
```bash
rm -rf node_modules/.prisma
npx prisma generate
```

---

## 🎯 Next Steps

1. ✅ Customize the brand colors if needed in `tailwind.config.ts`
2. ✅ Add your API endpoints in `src/app/api/`
3. ✅ Create page components in `src/app/`
4. ✅ Extend the Prisma schema as needed
5. ✅ Deploy to Vercel or your hosting platform

---

## 📝 License

This project is set up as a template for NOVALEAP. Modify and extend as needed.

---

**Happy coding! 🚀**
