# NovaLeap Backend + /admin Feasibility Audit

Date: 2026-03-10

## Objective

Evaluate the feasibility of building the backend inside the same repository, coexisting with the current frontend, using a protected `/admin` area so the client can edit most texts, images, and videos.

## Executive Summary

The proposal is viable and recommended inside this same Next.js repository.

The current codebase already has enough structural foundations to support a unified frontend + backend architecture:

- Next.js 14 App Router
- Prisma + MySQL
- route handlers already in place
- a `User` model with roles
- a `Setting` model for global configuration

The main gap is not infrastructure. The main gap is content architecture.

Today, a large part of the commercial and editorial content is hardcoded in TypeScript files and React components. To make the site client-editable, it is necessary to move that content into structured persistence, add authentication/authorization, and implement media management.

## Final Feasibility Verdict

### High feasibility

It is fully feasible to:

- keep frontend and backend in the same repo
- create a protected `/admin` section
- manage services, testimonials, CTA copy, global settings, home sections, and media from the same application
- persist editable content in MySQL through Prisma
- use server actions and route handlers for admin mutations

### Recommended scope

It is strongly recommended to make around 70% to 80% of the marketing content editable in phase one and phase two.

Making 100% of the site editable is also possible, but it increases complexity, editorial risk, and maintenance cost. That should not be the first milestone.

## Current State Audit

### What already exists and supports the plan

#### Database and ORM foundation

File: `prisma/schema.prisma`

Current models already present:

- `Service`
- `Appointment`
- `User`
- `Setting`

This is a strong starting point because there is already:

- role support through `UserRole`
- a service entity that can evolve into editable service records
- a settings table that can be reused for global configuration

#### API pattern already started

File: `src/app/api/services/route.ts`

The project already contains:

- a `GET` endpoint for services
- a `POST` endpoint for service creation
- typed API responses
- Prisma integration inside route handlers

This confirms the repo is already moving in the right backend direction.

#### Prisma singleton already correct

File: `src/lib/prisma.ts`

The Prisma client is implemented with the correct singleton pattern for Next.js development.

#### Server action pattern already present

File: `src/app/contact/actions.ts`

There is already a server action using Zod validation. This is good because the project is already aligned with secure mutation patterns in App Router.

### What is missing and blocks a real admin

#### No authentication implemented

There is currently no real login or session management.

Missing pieces:

- no auth provider installed
- no login flow
- no protected admin area
- no role enforcement on server mutations

#### Middleware is not protecting private routes

File: `middleware.ts`

Current middleware only handles cache-related behavior and public asset routing. It does not protect `/admin` or any internal routes.

#### Content is still largely hardcoded

This is the largest product-level issue.

The current site structure depends heavily on static content written directly into components and helper files. That means content changes still require code changes and redeployment.

#### No media management

There is no current implementation for:

- image uploads
- video uploads
- media library
- asset reuse
- alt text management from admin

#### Contact form does not persist leads

File: `src/app/contact/actions.ts`

The action validates and logs data, but does not save submissions to the database or send them into an operational workflow.

## Main Content Areas That Are Currently Hardcoded

### Highest-priority content source

#### `src/lib/servicesCatalog.ts`

This file is the largest editorial source in the project.

It currently stores structured content for all major services, including:

- titles
- subtitles
- descriptions
- hero content
- section copy
- signs/symptoms lists
- feature media
- pillars
- testimonials
- FAQs
- bottom CTA blocks
- SEO metadata

This file is the number one candidate to move into the database.

### Other static marketing content currently embedded in components

Key files:

- `src/components/organisms/Hero.tsx`
- `src/components/organisms/MissionIntroSection.tsx`
- `src/components/organisms/WhyUsSection.tsx`
- `src/components/organisms/ApproachPillarsSection.tsx`
- `src/components/organisms/ApproachPlayWithPurposeSection.tsx`
- `src/components/organisms/HowToStartSection.tsx`
- `src/components/organisms/StoriesOfGrowthSection.tsx`
- `src/components/organisms/Footer.tsx`

These should progressively move to database-backed content models or a structured page-section system.

## Recommended Backend Architecture

## Strategic Direction

Keep everything in the same Next.js application.

Recommended architecture:

- Public frontend remains in the current route structure
- Private admin panel lives under `/admin`
- Prisma remains the persistence layer
- MySQL remains the primary database
- server actions and route handlers are used for admin mutations and reads
- media is stored outside the database using dedicated object storage

This avoids unnecessary duplication, deployment overhead, and maintenance cost.

### Why not split into a separate backend now

Creating a separate backend service is not necessary for the current stage of the project.

It would add:

- more deployment complexity
- duplicated auth concerns
- more environment management
- more maintenance cost

The current repo size and business scope do not justify a second backend service yet.

## Recommended Editable Data Model

The current schema is not enough if the goal is to make most of the site editable.

Recommended entities for the admin roadmap:

### Core content models

- `AdminUser`
- `Page`
- `PageSection`
- `Service`
- `ServiceFaq`
- `ServicePillar`
- `Testimonial`
- `SiteSetting`
- `Asset`
- `ContactSubmission`

### Suggested responsibility of each model

#### `AdminUser`

- login identity
- role assignment
- admin/staff access control

#### `Page`

- page slug
- page title
- SEO metadata
- publication state

#### `PageSection`

- page relationship
- section key
- section type
- JSON or structured content fields
- ordering
- visibility toggle

This allows editable sections without making the entire site a free-form builder.

#### `Service`

The current `Service` model should be expanded or paired with related tables so it can represent the actual service page structure now stored in code.

It should eventually support:

- listing content
- detail content
- hero content
- SEO fields
- CTA fields
- active/inactive status
- sort order

#### `ServiceFaq`

- question
- answer
- service relation
- order

#### `ServicePillar`

- title
- description
- icon token
- service relation
- order

#### `Testimonial`

- quote
- author
- role/detail
- image
- category or page assignment
- active flag
- order

#### `SiteSetting`

Use this for compact global values only, such as:

- phone
- email
- social URLs
- address
- booking URL
- global CTA labels

It should not become the container for the full CMS.

#### `Asset`

- file URL
- asset type
- alt text
- title
- size
- mime type
- duration for video when applicable
- created by

#### `ContactSubmission`

- parent/guardian name
- email
- phone
- child age
- message/family needs
- consent flags
- created date
- processing status

## Media Strategy Recommendation

Do not store images or videos in MySQL.

Recommended approach:

- use Cloudinary, Vercel Blob, or S3-compatible storage
- store only asset metadata and URLs in the database
- let the admin choose previously uploaded media or upload new files

### Why this matters

This gives better:

- performance
- scalability
- image optimization
- operational simplicity
- deployment stability

## Authentication and Access Control Recommendation

The `/admin` panel should only be built together with real auth and server-side permission checks.

Recommended options:

### Faster implementation

- Clerk

### More control inside the stack

- Auth.js
- Better Auth

### Minimum security requirements

- protect `/admin` in middleware and on the server
- enforce roles in every admin mutation
- validate all payloads with Zod
- avoid exposing sensitive operational data on public routes

## Frontend Impact Assessment

The visual frontend can remain mostly unchanged.

The main refactor is data sourcing.

Instead of reading marketing content from static TypeScript objects and arrays, the frontend should read that content from a structured data layer.

The most impacted files will be:

- `src/lib/servicesCatalog.ts`
- `src/app/services/[slug]/page.tsx`
- `src/components/organisms/ServiceDetailPage.tsx`
- homepage section organisms containing static copy and asset references

The UI design system and component architecture can stay mostly intact.

## Recommended Delivery Phases

### Phase 1: Foundational admin

Scope:

- auth implementation
- protected `/admin`
- admin layout and navigation
- CRUD for services
- global settings editor
- contact submissions persistence and list view
- media upload integration

Expected result:

The client can manage core services and operational content without redeploying.

### Phase 2: Marketing content management

Scope:

- editable home sections
- editable testimonials
- editable CTA blocks
- footer links and contact blocks
- editable SEO metadata by page

Expected result:

Most of the public marketing site becomes client-editable.

### Phase 3: Publishing workflow and governance

Scope:

- draft/published states
- preview mode
- change history or audit log
- reusable media library improvements
- optional role granularity between admin and staff

Expected result:

Safer editorial workflow with lower risk of accidental production mistakes.

## Estimated Complexity

### Low complexity

- keeping backend and frontend in same repo
- creating `/admin` route group
- implementing service CRUD
- adding form submission persistence

### Medium complexity

- turning the services catalog into database-driven content
- creating reusable editable page sections
- handling image uploads and asset reuse

### High complexity

- making every block fully editable without design breakage
- implementing a highly flexible visual CMS
- building versioning, preview, and publishing workflow from day one

## Risks and Constraints

### Product and editorial risks

- too much editing freedom can break brand consistency
- a free-form CMS can make the interface hard for the client to use
- editable content should still respect layout and design constraints

### Technical risks

- migrating static content into DB without a content mapping strategy can create regressions
- media uploads need clear storage ownership and operational rules
- role checks must be enforced on the server, not only in the UI

### Recommended mitigation

- use structured forms instead of fully free-form page builders in phase one
- keep section schemas controlled
- introduce publication states before giving unrestricted access to content changes

## Recommendation

### Strong recommendation

Proceed with the backend inside this same repository.

Recommended implementation stack:

- Next.js App Router
- Prisma + MySQL
- `/admin` inside the same app
- external object storage for media
- structured editable content models
- auth + roles before exposing admin functionality

### Recommended first implementation target

Start with:

1. protected `/admin`
2. service management
3. contact submission persistence
4. global settings
5. media library foundation

Then move into editable homepage and page-section content.

## Conclusion

This project is in a good position to evolve into a single-repo frontend + backend application with an internal `/admin` panel.

The idea is not only feasible. It is the most pragmatic option for the current architecture.

The real work is not creating a backend server from scratch. The real work is:

- formalizing the content model
- securing admin access
- separating static presentation from editable content
- implementing a reliable media workflow

If executed in phases, the result can give the client real editorial autonomy without sacrificing performance, maintainability, or design consistency.