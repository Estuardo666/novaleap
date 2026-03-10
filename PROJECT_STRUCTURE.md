/**
 * NOVALEAP Next.js Application Structure
 * 
 * This file documents the complete project structure using Atomic Design principles.
 * For more information about Atomic Design, visit: https://bradfrost.com/blog/post/atomic-web-design/
 */

const projectStructure = `
novaleap-app/
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (routes)/                 # Grouped route directories (optional)
│   │   ├── api/
│   │   │   ├── services/
│   │   │   │   └── route.ts          # GET/POST /api/services
│   │   │   ├── appointments/
│   │   │   │   └── route.ts          # Appointment endpoints
│   │   │   └── auth/
│   │   │       └── route.ts          # Authentication endpoints
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   ├── favicon.ico
│   │   └── [...slug]/page.tsx        # Catch-all routes
│   │
│   ├── components/                   # Atomic Design Structure
│   │   ├── atoms/                    # Base UI elements
│   │   │   ├── Button.tsx            # Base button component
│   │   │   ├── Input.tsx             # Base input component
│   │   │   ├── Label.tsx             # Label component
│   │   │   ├── Badge.tsx             # Badge component
│   │   │   └── index.ts              # Barrel export
│   │   │
│   │   ├── molecules/                # Simple component combinations
│   │   │   ├── FormField.tsx         # Label + Input combination
│   │   │   ├── SearchBar.tsx         # Search functionality
│   │   │   ├── Card.tsx              # Card wrapper component
│   │   │   ├── Dropdown.tsx          # Dropdown menu
│   │   │   └── index.ts              # Barrel export
│   │   │
│   │   ├── organisms/                # Complex component sections
│   │   │   ├── Navbar.tsx            # Navigation bar with menu
│   │   │   ├── Hero.tsx              # Hero/Banner section
│   │   │   ├── ServicesList.tsx      # Services listing section
│   │   │   ├── AppointmentForm.tsx   # Complex form
│   │   │   ├── Footer.tsx            # Footer section
│   │   │   └── index.ts              # Barrel export
│   │   │
│   │   └── templates/                # Page layout templates
│   │       ├── RootLayout.tsx        # Main layout template
│   │       ├── PageTemplate.tsx      # Standard page template
│   │       └── index.ts              # Barrel export
│   │
│   ├── lib/                          # Utility libraries
│   │   ├── utils.ts                  # clsx + tailwind-merge utility (cn function)
│   │   └── prisma.ts                 # Prisma client singleton
│   │
│   ├── hooks/                        # Custom React hooks
│   │   └── index.ts                  # useAsync, useFetch, useLocalStorage
│   │
│   ├── utils/                        # Utility functions
│   │   └── api.ts                    # API request helpers
│   │
│   ├── types/                        # TypeScript type definitions
│   │   └── index.ts                  # All type definitions
│   │
│   ├── context/                      # React Context (optional)
│   │   └── ThemeContext.tsx          # Theme provider
│   │
│   └── styles/                       # Global styles (if needed)
│       └── globals.css               # Tailwind directives
│
├── prisma/
│   ├── schema.prisma                 # Prisma schema (MariaDB)
│   └── migrations/                   # Database migrations (auto-generated)
│
├── public/                           # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── .env.example                      # Environment variables template
├── .env.local                        # Local environment variables (gitignored)
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts                # Tailwind CSS with brand colors
├── postcss.config.js
├── next.config.js
└── README.md

═════════════════════════════════════════════════════════════════════════════

ATOMIC DESIGN HIERARCHY:

1. ATOMS (Base Components)
   - Smallest, most reusable units
   - No dependencies on other components
   - Examples: Button, Input, Label, Badge, Icon

2. MOLECULES (Component Combinations)
   - Combination of atoms
   - Still reusable but more specific
   - Examples: FormField, SearchBar, Card, Dropdown

3. ORGANISMS (Section Components)
   - Complex components combining atoms and molecules
   - Represent distinct sections of the UI
   - Examples: Navbar, Hero, ServicesList, AppointmentForm

4. TEMPLATES (Page Layouts)
   - Page-level layouts
   - Primarily structural with slots for content
   - Examples: RootLayout, PageTemplate, AdminLayout

5. PAGES
   - Actual page content
   - Located in app/ directory
   - Combine templates with specific content

═════════════════════════════════════════════════════════════════════════════

IMPORT PATTERNS:

// Atomic components
import { Button, Input } from "@/components/atoms";

// Molecular components
import { FormField, SearchBar } from "@/components/molecules";

// Organismic components
import { Navbar, HeroSection } from "@/components/organisms";

// Template components
import { RootLayout, PageTemplate } from "@/components/templates";

// Utilities and types
import { cn } from "@/lib/utils";
import { apiGet, apiPost } from "@/utils/api";
import { useFetch, useAsync } from "@/hooks";
import type { Service, Appointment } from "@/types";

═════════════════════════════════════════════════════════════════════════════

BRAND COLOR USAGE:

Primary:      bg-teal-500      Text: text-teal-500
Secondary:    bg-sage-500      Text: text-sage-500
Accent:       bg-mint-500      Text: text-mint-500
Warm:         bg-sand-500      Text: text-sand-500
Alert:        bg-coral-500     Text: text-coral-500

═════════════════════════════════════════════════════════════════════════════

COMPONENT DEVELOPMENT WORKFLOW:

1. Start with an ATOM (e.g., Button)
2. Combine atoms into MOLECULES (e.g., FormField)
3. Create ORGANISMS by combining atoms and molecules (e.g., AppointmentForm)
4. Use ORGANISMS and MOLECULES in TEMPLATES (e.g., RootLayout)
5. Create PAGE components using TEMPLATES and ORGANISMS

═════════════════════════════════════════════════════════════════════════════
`;

export default projectStructure;
