# NovaLeap Copilot Instructions

## Project Overview
**NovaLeap** is a Next.js 14 service booking application using **Atomic Design** architecture with Prisma ORM, MySQL database, and a custom brand color system.

## Architectural Patterns

### Atomic Design Hierarchy (Strict Unidirectional Flow)
Components are organized in layers with **no reverse dependencies** - each layer only imports from layers below:

- **Atoms** (`src/components/atoms/`): Fundamental UI elements (Button, Input, Label, Badge)
  - Examples: `Button.tsx` with variants (primary, secondary, outline, ghost), `Input.tsx` with error states
  - Always use `forwardRef` for reusable components
  - Require `size` and `variant` props for flexibility
  
- **Molecules** (`src/components/molecules/`): Combinations of atoms (FormField, SearchBar, Card)
  - Only import from atoms
  - Add semantic meaning and composition logic
  - Example: `FormField.tsx` wraps Input + Label together
  
- **Organisms** (`src/components/organisms/`): Complex sections (Navbar, HeroSection, ServicesList)
  - May import from molecules and atoms
  - Contain business logic and state management
  - Include animations via Framer Motion
  
- **Templates** (`src/components/templates/`): Page-level layouts (RootLayout, PageTemplate)
  - Provide structure for pages
  - Route-specific wrappers
  
- **Pages** (`src/app/`): Next.js App Router pages
  - Import templates and organisms
  - Server components by default

**Barrel Pattern**: Always export components via `index.ts` in each directory for clean imports: `import { Button, Input } from "@/components/atoms"`

### Styling & Design System
- **Tailwind + Brand Colors**: Use custom NOVALEAP palette (Navy #11224e, Violet #977abc, Turquoise #00b7b5)
- **Class Merging**: Use `cn()` utility from `@/lib/utils` to safely merge conditional Tailwind classes (handles conflicts)
  ```tsx
  className={cn("px-2 py-1", isActive && "px-4")} // px-2 merges correctly with px-4
  ```
- **Variant Pattern**: Components use variant/size patterns stored as objects and merged with `cn()`
  ```tsx
  const variants = { primary: "...", secondary: "..." };
  className={cn(baseStyles, variants[variant], className)}
  ```

### Database & Data Flow
- **Prisma ORM** with MySQL: Models include Service, Appointment, User, Setting
- **Singleton Pattern** (`src/lib/prisma.ts`): Prevents multiple Prisma instances in development hot-reload
- **Data Models**:
  - `Service`: name (unique), slug, description, price, duration (minutes), category, icon, image, isActive, appointments relation
  - `Appointment`: serviceId (FK), clientName, clientEmail, clientPhone, status (enum), scheduledAt, notes, canceledAt, cancelReason
  - Use `@index([field])` for frequently queried columns
  
### API Routes Pattern
Use Next.js Route Handlers with typed responses:
```typescript
import { ApiResponse } from "@/types";
export async function GET(request: NextRequest) {
  try {
    const data = await prisma.service.findMany({...});
    return NextResponse.json({ status: "success", data, message: "..." });
  } catch (error) {
    return NextResponse.json({ status: "error", message: ... }, { status: 500 });
  }
}
```
- Always use `ApiResponse<T>` type wrapper
- Implement pagination with `skip` and `take`
- Use `Promise.all()` for parallel queries

### Form Handling & Validation
- **React Hook Form** + **Zod** integration ready (packages installed)
- **FormField molecule** provides atomic label + input composition
- Use `@hookform/resolvers` for Zod schema validation

### State Management & Hooks
- No Redux/Zustand - use React state patterns
- Custom hooks available in `src/hooks/` (check `index.ts` for available utilities)
- Prefer local component state unless data shared across multiple routes

## Development Workflows

### Build & Development Commands
```bash
npm run dev           # Start dev server (localhost:3000)
npm run build         # Production build
npm run lint          # ESLint check
npm run type-check    # TypeScript type check
```

### Database Workflows
```bash
npm run db:push       # Push schema changes without migration (dev only)
npm run db:migrate    # Create and run migration interactively
npm run prisma:generate  # Regenerate Prisma Client after schema changes
npm run db:studio     # Open visual Prisma Studio (localhost:5555)
npm run db:seed       # Run seed file (if exists)
npm run db:reset      # Reset database completely (dev only)
```

**Important**: After modifying `prisma/schema.prisma`, always run `npm run prisma:generate` before using new models in code.

## File Organization & Imports

### Import Paths (via tsconfig path aliases)
- `@/components` → `src/components/`
- `@/lib` → `src/lib/`
- `@/hooks` → `src/hooks/`
- `@/types` → `src/types/`
- `@/utils` → `src/utils/`

### Creating New Components
1. **Atoms** (if truly reusable building block):
   ```tsx
   // src/components/atoms/NewAtom.tsx
   interface NewAtomProps extends React.HTMLAttributes<HTMLElement> {
     variant?: "option1" | "option2";
   }
   const NewAtom = React.forwardRef<HTMLElement, NewAtomProps>((...) => {...});
   export default NewAtom;
   ```
   Then add to `src/components/atoms/index.ts`: `export { default as NewAtom } from "./NewAtom";`

2. **Molecules**: Only import atoms, add composition logic
3. **Organisms**: Import molecules + atoms, include business logic and animations
4. Add JSDoc comments explaining purpose and usage examples

## Key Conventions

### Component Documentation
Every component should include JSDoc with @example:
```tsx
/**
 * Button - Atomic Component
 * Versatile button with multiple variants.
 * @example
 * <Button variant="primary" size="lg">Click Me</Button>
 */
```

### Error Handling
- API routes: Always return `{ status: "error", message: string }` with appropriate HTTP status
- Try-catch in async operations
- Client-side: Implement error boundaries for organisms

### Performance Patterns
- Use `Promise.all()` for parallel Prisma queries
- Leverage Next.js server components (default in App Router)
- Memoize expensive components only if necessary (`React.memo`)
- Pagination in API routes with `skip` / `take`

### TypeScript
- Strict mode enabled in tsconfig.json
- Define component props with interfaces extending React's built-in types
- Use generic types for reusable components: `React.forwardRef<HTMLElement, Props>`
- Prefer enums for status fields (AppointmentStatus, etc.)

## Technologies & Key Libraries

| Layer | Library | Purpose |
|-------|---------|---------|
| Framework | Next.js 14 | React framework with SSR/routing |
| UI Library | React 18 | Component library |
| Styling | Tailwind CSS 3.4 | Utility-first CSS |
| Animations | Framer Motion 12.34 | Declarative motion library |
| Database | Prisma 5.15 | Type-safe ORM |
| Forms | React Hook Form 7.71 | Form state management |
| Validation | Zod 4.3 | Schema validation |
| Icons | Lucide React 0.575 | 1000+ icon set |
| Utilities | clsx, tailwind-merge | Class merging utilities |

## Common Pitfalls to Avoid

1. **Importing from wrong layer**: Never import molecules/organisms into atoms
2. **Forgetting index.ts exports**: Always update barrel files when adding components
3. **Not using cn()**: Don't conditionally concat Tailwind classes directly
4. **Multiple Prisma instances**: Always import from `@/lib/prisma`, not `new PrismaClient()`
5. **Missing database generation**: After schema.prisma changes, run `prisma:generate` immediately
6. **Untyped API responses**: Always wrap responses in `ApiResponse<T>` type
7. **Forgetting forwardRef**: Any component that might need ref forwarding should use `forwardRef`

## Design & Copy Standards

### Typography & Text
- **Font Family**: Google Sans exclusively. No serif, italic, or editorial typography
- **Letter Spacing (Kerning)**: Titles use `tracking-tight` (reduced kerning) for clean, modern appearance
- **Language**: All content and copy in **English only**
- **Pre-title Badge** (eyebrow): Every major section must have a pre-title
  - Container: `inline-flex rounded-full border border-novaleap-aqua/70 bg-novaleap-aqua/5 px-3 py-1 gap-2 mx-auto`
  - Text: `text-xs font-semibold tracking-wide text-novaleap-aqua uppercase`
  - Placement: Centered above the main heading with adequate spacing
  - Example: "WHAT WE OFFER", "OUR APPROACH", "MEET OUR TEAM"

- **Section Headings (Titles)**:
  - Size: `text-4xl sm:text-5xl` (responsive)
  - Weight: `font-bold`
  - Color: `text-novaleap-navy`
  - Letter spacing: `tracking-tight`
  - Line height: `leading-[1.1]`
  - Example: "Five Ways We Support Your Child"
  - Can include inline `<GradientUnderline>` component on key word(s)

- **Section Subtitles (Descriptions)**:
  - Size: `text-lg sm:text-xl`
  - Weight: `font-normal`
  - Color: `text-novaleap-navy/70`
  - Line height: `leading-relaxed`
  - Max width: typically `max-w-2xl` for 2-line descriptions
  - Example: "Each service is carefully designed to meet your child where they are, celebrate their progress, and unlock their full potential."
  
### Component Styles
- **Cartoon Components**: Use soft, playful, rounded aesthetics with organic shapes
- **Motion & Hover**: All interactive elements in Header and molecules must include Framer Motion hover effects
  - Example: `whileHover={{ scale: 1.05 }}` with `whileTap={{ scale: 0.98 }}` for buttons and links
  - Navigation items: Smooth scale on hover, spring physics for entrance animations
- **Button Standard**: All CTA buttons must use the NovaLeap relief pill style
  - Shape: fully rounded pill
  - Border: `1px` with `6px` bottom border for a subtle raised effect
  - Colors: solid `novaleap-aqua` or `novaleap-purple` only for main CTAs
  - Hover: subtle bottom-origin float only (`translateY` + tiny scale), never a large grow effect
  - Content: text-only by default, no icons unless explicitly requested
  - Finish: keep the soft gradient hover overlay used in the hero CTA style

### Copy Examples
- Headings: "Support that helps your child focus on what matters most"
- Subheading: "We combine evidence-based pediatric therapy with playful, child-centered experiences so every milestone feels secure, clear, and supported for your whole family."
- CTAs: "Schedule an Evaluation", "Explore Our Approach", "Contact / Schedule"

### Color Usage
- **Primary Accent**: Violet (#977abc) for CTAs and highlights
- **Secondary Accent**: Turquoise (#00b7b5) for hovers, pre-titles, and supporting elements
- **Navy**: Navy (#11224e) for dark overlays and sophisticated backgrounds

## Important File Locations

- **Brand colors**: [tailwind.config.ts](tailwind.config.ts#L1-L50)
- **Component exports**: [src/components/atoms/index.ts](src/components/atoms/index.ts), similar for molecules/organisms
- **Prisma setup**: [src/lib/prisma.ts](src/lib/prisma.ts)
- **Database schema**: [prisma/schema.prisma](prisma/schema.prisma)
- **Utility functions**: [src/lib/utils.ts](src/lib/utils.ts)
- **Type definitions**: [src/types/index.ts](src/types/index.ts)
- **Example API route**: [src/app/api/services/route.ts](src/app/api/services/route.ts)

## Questions & Further Learning
Refer to documentation files in project root:
- `QUICK_REFERENCE.md` - Fast lookup for commands and patterns
- `ARCHITECTURE.md` - Visual diagrams of component hierarchy
- `SETUP_GUIDE.md` - Detailed development setup instructions


🌟 Brand Profile: NOVALEAP
1. Who is Novaleap?
Novaleap is a cutting-edge Pediatric Physical Therapy center based in the USA. It is not just a clinic; it is a space where clinical excellence meets the joy of childhood. We bridge the gap between "medical treatment" and "meaningful play."

2. Core Mission:
To empower every child to move with confidence, explore their world, and reach their fullest potential through compassionate, playful, innovative, and evidence-based therapy.

3. Target Audience:

Primary: Parents (ages 28–40) living in the United States.

Secondary: Caregivers, doctors, and specialists.

The Goal: They are looking for professional, safe, and emotionally supportive care for their children (primarily ages 0–8).

4. Brand Personality & Tone:

Warm & Reassuring: Speak like a supportive expert, not a cold textbook.

Professional yet Playful: Balance medical credibility with the energy of a child's growth.

Hopeful: Focus on "The Leap"—the progress and mastery every child can achieve.

5. Core Values (The "Pulse" of the project):

Joy & Fun: Therapy is an adventure.

Safety & Trust: Parents must feel their child is in the best hands.

Mastery & Growth: Celebrating every milestone, no matter how small.

Connection: Building deep bonds with families.

6. Visual & Emotional Direction:

Style: Clean, modern, and high-end.

Imagery: Authentic photography of children and therapists, complemented by soft, organic illustrations.

Color Palette (Brand Palette):

Deep Navy (#11224e): Trust and Authority.

Violet (#977abc): Creative Energy and Innovation.

Turquoise (#00b7b5): Growth and Freshness.



📋 Services Portfolio: NOVALEAP
1. Pediatric Physical Therapy
The core service focused on improving gross motor skills, balance, coordination, and strength. We help children navigate their physical world with ease and confidence.

2. Motor Development Therapy
Specialized support for infants and children to reach their physical milestones (crolling, walking, jumping). Ideal for early intervention and overcoming developmental delays.

3. Play-Based Therapy
Our signature approach. We disguise clinical exercises as fun, engaging activities. This ensures children stay motivated and see therapy as a highlight of their day, not a chore.

4. Evaluations & Assessments
Comprehensive, evidence-based physical screenings to understand a child’s unique needs and create a roadmap for their progress.

5. Personalized Therapy Programs
Tailor-made treatment plans that involve the family, ensuring that progress continues at home and fits the child’s specific lifestyle and goals.

NOVALEAP
Website Brief
Pediatric Physical Therapy Center – USA
________________________________________
1. Project Overview
Project: Informational Website
Brand: Novaleap
Industry: Pediatric Physical Therapy
Location: United States
Primary Audience: Parents of children ages 0–8 (services provided up to 18 years)
The Novaleap website should communicate trust, innovation, and emotional connection, positioning the center as a professional, safe, and welcoming choice for families seeking evidence-based pediatric physical therapy.
________________________________________
2. Website Objectives
Primary Objective
•	Inform parents and build trust.
Secondary Objectives
•	Clearly communicate Novaleap’s therapeutic approach.
•	Present services in a simple and approachable way.
•	Encourage contact and future appointment scheduling.
•	Position Novaleap as a modern, innovative, and scalable brand.
________________________________________
3. Target Audience
Primary
•	Parents ages 28–40
•	Living in the United States
•	Seeking safe, professional, and emotionally supportive therapy for their children
Secondary
•	Caregivers
•	Schools and institutions
•	Doctors and specialists
•	Insurance providers (future)
________________________________________
4. Brand Identity
Brand Description
Novaleap is a pediatric physical therapy center with an innovative, playful, and evidence-based approach, focused on each child’s holistic development.
Mission
To empower every child to move with confidence, explore their world, and reach their fullest potential through compassionate, playful, innovative, and evidence-based pediatric therapy.
Vision
To improve children’s quality of life through safe, innovative, and emotionally meaningful therapeutic experiences.
Core Values
•	Joy
•	Fun
•	Skills
•	Mastery
•	Safety
•	Growth and overcoming challenges
•	Integration
•	Trust
•	Connection
These values must be reflected consistently across content, design, and user experience.
________________________________________
5. Brand Tone & Personality
Overall tone
•	Warm and human
•	Professional, not clinical
•	Optimistic and hopeful
•	Clear and reassuring for parents
Communication balance
•	Accessible language for parents
•	Playful elements for children, without infantilizing the brand
________________________________________
6. Services (Core Content)
The website should support the presentation of services such as:
•	Pediatric Physical Therapy
•	Motor Development Therapy
•	Play-Based Therapy
•	Evaluations & Assessments
•	Personalized Therapy Programs
Recommendation:
Dedicated individual pages per service for clarity, SEO, and future scalability.
________________________________________
