# NOVALEAP - Architecture Diagram

## 🏗️ Atomic Design Level Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                         PAGE LEVEL                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ src/app/page.tsx (Home Page)                            │   │
│  │ src/app/services/page.tsx (Services Page)               │   │
│  │ Uses TEMPLATES & ORGANISMS                              │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                     TEMPLATE LEVEL                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ RootLayout (main site wrapper)                          │   │
│  │ PageTemplate (standard pages)                           │   │
│  │ AdminLayout (admin pages - future)                      │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                    ORGANISM LEVEL                               │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Navbar (navigation + menu)                              │   │
│  │ HeroSection (landing section with animations)           │   │
│  │ ServicesList (service cards grid)                       │   │
│  │ AppointmentForm (complex booking form)                  │   │
│  │ Footer (footer section)                                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           ↕                                     │
│  Combines: Molecules + Atoms + Framer Motion                   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                    MOLECULE LEVEL                               │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ FormField (label + input)                               │   │
│  │ SearchBar (input + button)                              │   │
│  │ Card (wrapper component)                                │   │
│  │ Dropdown (select component)                             │   │
│  │ ButtonGroup (multiple buttons)                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           ↕                                     │
│  Combines: Only Atoms                                          │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                      ATOM LEVEL                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Button (4 variants: primary, secondary, outline, ghost) │   │
│  │ Input (text field with error states)                    │   │
│  │ Label (form labels)                                     │   │
│  │ Badge (status badges)                                   │   │
│  │ Icon (lucide-react icons)                               │   │
│  │ Text (typography elements)                              │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           ↕                                     │
│  Independent Reusable UI Elements - NO DEPENDENCIES             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Directory Structure with Relationships

```
novaleap-app/
│
├── src/
│   │
│   ├── app/                          ← PAGES (use templates)
│   │   ├── page.tsx                  → Uses: RootLayout + HeroSection
│   │   ├── services/page.tsx         → Uses: RootLayout + ServicesList
│   │   ├── appointments/page.tsx     → Uses: PageTemplate + AppointmentForm
│   │   ├── api/
│   │   │   ├── services/route.ts    ← API Endpoints
│   │   │   ├── appointments/route.ts
│   │   │   └── auth/route.ts
│   │   └── layout.tsx                → Root HTML structure
│   │
│   ├── components/                   ← ATOMIC DESIGN
│   │   │
│   │   ├── atoms/                    (Reusable by: molecules, organisms, pages)
│   │   │   ├── Button.tsx            (4 variants)
│   │   │   ├── Input.tsx             (label, error support)
│   │   │   ├── Label.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── index.ts              (barrel export)
│   │   │
│   │   ├── molecules/                (Uses: only atoms)
│   │   │   ├── FormField.tsx         (Input + Label)
│   │   │   ├── SearchBar.tsx         (Input + Button)
│   │   │   ├── Card.tsx              (Wrapper)
│   │   │   ├── Dropdown.tsx
│   │   │   ├── ButtonGroup.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── organisms/                (Uses: atoms + molecules + motion)
│   │   │   ├── Navbar.tsx            (button, menu)
│   │   │   ├── HeroSection.tsx       (motion, button, text)
│   │   │   ├── ServicesList.tsx      (card, grid)
│   │   │   ├── AppointmentForm.tsx   (formfield, button)
│   │   │   ├── Footer.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── templates/                (Uses: organisms, molecules)
│   │       ├── RootLayout.tsx        (navbar + footer wrapper)
│   │       ├── PageTemplate.tsx      (page header + content)
│   │       └── index.ts
│   │
│   ├── lib/                          ← UTILITIES & CONFIG
│   │   ├── utils.ts                  (cn function for tailwind)
│   │   └── prisma.ts                 (database client)
│   │
│   ├── hooks/                        ← CUSTOM HOOKS
│   │   └── index.ts                  (useAsync, useFetch, useLocalStorage)
│   │
│   ├── utils/                        ← HELPERS
│   │   └── api.ts                    (API request wrappers)
│   │
│   ├── types/                        ← TYPE DEFINITIONS
│   │   └── index.ts                  (Service, Appointment, User, ApiResponse)
│   │
│   ├── context/                      ← REACT CONTEXT (future)
│   │   └── ThemeContext.tsx
│   │
│   └── styles/
│       └── globals.css               (tailwind directives)
│
├── prisma/                           ← DATABASE
│   ├── schema.prisma                 (Service, Appointment, User models)
│   └── migrations/                   (auto-generated schema changes)
│
├── public/                           ← STATIC ASSETS
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── Configuration Files
│   ├── .env.example                  (template)
│   ├── .env.local                    (local secrets - ignored)
│   ├── tailwind.config.ts            (brand colors + animations)
│   ├── tsconfig.json
│   ├── next.config.js
│   └── postcss.config.js
│
├── Documentation Files
│   ├── COMPLETE_SETUP_SUMMARY.md    (this summary)
│   ├── SETUP_GUIDE.md                (full setup instructions)
│   ├── PROJECT_STRUCTURE.md          (detailed architecture)
│   ├── COMMANDS.sh                   (useful commands)
│   └── README.md
│
└── package.json                      (all scripts + dependencies)
```

---

## 🎨 Data Flow - Services Example

```
┌─────────────────────────────────────────────────────────────────┐
│                         PAGE REQUEST                            │
│           GET /services  (services/page.tsx)                    │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │  RootLayout (template)     │ ← Navigation + Footer
        │  + PageTemplate            │   (organisms)
        └────────────┬───────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │  ServicesList         │ ← ORGANISM
         │  (organism)           │   Handles grid layout
         └───────┬───────────────┘
                 │
                 ▼ (renders multiple)
        ┌─────────────────────┐
        │ ServiceCard         │ ← MOLECULE
        │ (molecule)          │   Component combination
        └────┬────────────────┘
             │
             ├──────────┬──────────┬────────────┐
             ▼          ▼          ▼            ▼
         ┌────────┐┌──────────┐┌────────┐┌──────────┐
         │ Image  ││  Title   ││ Price  ││ CTA      │
         │ (atom) ││  (atom)  ││(atom)  ││ Button   │
         │        ││          ││        ││ (atom)   │
         └────────┘└──────────┘└────────┘└──────────┘
             │         │           │         │
             └─────────┴───────────┴─────────┘
                       │
                       ▼
         ┌──────────────────────────┐
         │ useAsync Hook            │ ← Fetch API data
         │ fetch('/api/services')   │
         └──────────────────────────┘
                       │
                       ▼
         ┌──────────────────────────┐
         │ Prisma Query             │ ← Database query
         │ prisma.service.findMany()│
         └──────────────────────────┘
                       │
                       ▼
         ┌──────────────────────────┐
         │ MariaDB                  │ ← Database
         │ SELECT * FROM services   │
         └──────────────────────────┘
```

---

## 🔄 Component Composition Pattern

```
SERVICE LIST PAGE
      ↓
[RootLayout Template]
  ├─ [Navbar Organism] ← Button atoms
  ├─ [PageTemplate]
  │   └─ [ServicesList Organism]
  │       ├─ [ServiceCard Molecule]
  │       │   ├─ [Image Atom]
  │       │   ├─ [Title Atom]
  │       │   ├─ [Price Atom]
  │       │   └─ [Button Atom]
  │       ├─ [ServiceCard Molecule]
  │       └─ [ServiceCard Molecule]
  └─ [Footer Organism] ← Text atoms

═════════════════════════════════════════════════════════════════

BUILD PATTERN:
1. Create Button atom      ← "Add favorites button"
2. Create Badge atom       ← "Mark bestseller"
3. Combine into Card mol   ← "Product card with button + badge"
4. Combine into Grid org   ← "Product grid section"
5. Add to Template         ← "Product page layout"
6. Use in Page             ← "products/page.tsx"

═════════════════════════════════════════════════════════════════
```

---

## 🎯 Import Pattern Hierarchy

```
// PAGE LEVEL (src/app/page.tsx)
import { RootLayout } from "@/components/templates";
import { HeroSection, Navbar } from "@/components/organisms";

// ORGANISM LEVEL (src/components/organisms/ServicesList.tsx)
import { FormField, SearchBar } from "@/components/molecules";
import { Button } from "@/components/atoms";

// MOLECULE LEVEL (src/components/molecules/FormField.tsx)
import { Input, Label } from "@/components/atoms";

// ATOM LEVEL (src/components/atoms/Button.tsx)
import { cn } from "@/lib/utils";
```

---

## 📡 API & Database Layer

```
PAGE REQUEST
    ↓
[Next.js API Route] (src/app/api/services/route.ts)
    ├─ Extract params/body
    ├─ Validate (Zod)
    └─ Call Prisma
         ↓
    [Prisma Client] (src/lib/prisma.ts)
         └─ Build queries
              ↓
    [MariaDB Database]
         ├─ SELECT/INSERT/UPDATE/DELETE
         └─ Return results
              ↓
    [Prisma Client]
         └─ Type-safe response
              ↓
    [API Response] (ApiResponse<T> type)
         └─ JSON to client
              ↓
    [React Hook/Component]
         └─ Display data
```

---

## 🎨 Brand Color Usage Guidelines

```
PRIMARY COLORS
├─ Teal (#004346) - Primary buttons, main headings, CTAs
├─ Sage (#749C75) - Secondary buttons, subheadings
└─ Mint (#B0D0B0) - Accents, badges, highlights

NEUTRAL COLORS
├─ Sand (#F1DABF) - Background panels, soft backgrounds
└─ Coral (#93545E) - Errors, alerts, warnings

USAGE EXAMPLE
Button Variants:
├─ primary    → bg-teal-500
├─ secondary  → bg-sage-500
├─ outline    → border-teal-500 text-teal-500
└─ ghost      → text-teal-500 on hover

Text Colors:
├─ normal     → text-gray-900
├─ secondary  → text-gray-600
└─ error      → text-coral-500
```

---

## 🚀 Deployment Architecture

```
GitHub Repository
      ↓
Vercel (Recommended)
  ├─ Build: npm run build
  ├─ Start: npm start
  └─ Environment Variables
      ├─ DATABASE_URL (MariaDB/PlanetScale)
      ├─ NEXT_PUBLIC_APP_URL
      └─ [other keys]
         ↓
    Production Server
      ├─ API Routes (serverless)
      ├─ Static Assets (CDN)
      ├─ Database Connections (Prisma)
      └─ Request Handling (Next.js)
```

---

## 📊 Technology Stack Summary

```
┌──────────────────────────────────────────────────────────┐
│                      FRONTEND                            │
├──────────────────────────────────────────────────────────┤
│ Framework:     Next.js 14 (App Router, SSR, API routes)  │
│ Language:      TypeScript 5                              │
│ Styling:       Tailwind CSS 3 (brand colors configured)  │
│ Animations:    Framer Motion 12                          │
│ UI Components: Aceternity UI (premade components)        │
│ Icons:         Lucide React (1000+ icons)                │
│ State:         React Hooks (Context API ready)           │
│ Forms:         React Hook Form + Zod validation          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                      BACKEND                             │
├──────────────────────────────────────────────────────────┤
│ Framework:     Next.js API Routes                        │
│ Database:      MariaDB 10.5+                             │
│ ORM:           Prisma 5.15.0 (type-safe queries)         │
│ Validation:    Zod (schema validation)                   │
│ API Pattern:   REST (ApiResponse<T> wrapper)             │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                      ARCHITECTURE                        │
├──────────────────────────────────────────────────────────┤
│ Pattern:       Atomic Design (atoms→molecules→organisms) │
│ Structure:     Feature-based component organization      │
│ Types:         Full TypeScript coverage                  │
│ Scalability:   Ready for 50K+ lines of code              │
└──────────────────────────────────────────────────────────┘
```

---

**This comprehensive architecture provides a solid foundation for building scalable, maintainable web applications with modern best practices.** 🚀
