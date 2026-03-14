# NovaLeap Backend + /admin Implementation Plan

Date: 2026-03-10

## Goal

Turn the feasibility audit into an execution-ready technical plan for building the backend inside the same repository, with a protected `/admin` area and client-editable content for most texts, images, and videos.

## Delivery Strategy

The implementation should be done in controlled phases.

Core principles:

- keep public frontend and admin in the same Next.js app
- protect admin before exposing any editing features
- move content from hardcoded files into structured persistence gradually
- use external object storage for images and videos
- keep editors structured instead of building a free-form page builder in phase one

## Target Architecture

### Application layout

Recommended route structure:

- `src/app/(public)/*` for public pages if route grouping is introduced later
- `src/app/admin/*` for the protected admin area
- `src/app/api/admin/*` for admin-only route handlers where needed
- `src/app/api/*` for public or internal API endpoints that are not admin dashboards

### Recommended internal modules

- `src/lib/auth/*` for auth configuration and role checks
- `src/lib/cms/*` for content queries and mutations
- `src/lib/storage/*` for upload and asset helpers
- `src/lib/validators/*` for Zod schemas used by admin forms and APIs
- `src/types/admin.ts` or `src/types/cms.ts` for admin-facing types

### Recommended admin sections

- `/admin`
- `/admin/login`
- `/admin/services`
- `/admin/services/[id]`
- `/admin/pages`
- `/admin/testimonials`
- `/admin/media`
- `/admin/settings`
- `/admin/submissions`

## Implementation Phases

## Phase 0: Foundations and Decisions

Purpose:

Lock the infrastructure choices before schema and admin work starts.

### Decisions to finalize

1. Auth provider
2. Media storage provider
3. Production environment variables
4. Roles and access rules
5. Initial editable scope

### Recommended decisions

- Auth: Clerk for speed, or Auth.js/Better Auth for tighter stack control
- Media storage: Cloudinary, Vercel Blob, or S3-compatible storage
- Roles: `ADMIN` and `STAFF`
- Initial editable scope:
  - services
  - global settings
  - contact submissions
  - selected homepage sections

### Deliverables

- approved stack choices
- approved editable scope list
- approved admin permissions list

### Exit criteria

- no unresolved decision remains around auth or storage

## Phase 1: Security, Schema, and Admin Shell

Purpose:

Create the minimum safe foundation for a real admin panel.

### Workstream 1: Authentication and route protection

Tasks:

1. Install and configure the chosen auth provider.
2. Implement login flow for admin users.
3. Protect `/admin` and admin mutations on the server.
4. Add role checks for `ADMIN` and `STAFF`.
5. Add a reusable guard helper for server actions and route handlers.

Suggested code targets:

- `middleware.ts`
- `src/lib/auth/*`
- `src/app/admin/login/page.tsx`
- `src/app/admin/layout.tsx`

Acceptance criteria:

- unauthenticated users cannot access `/admin`
- non-admin roles cannot perform admin mutations
- sessions are validated server-side

### Workstream 2: Database schema expansion

Tasks:

1. Add `ContactSubmission` model.
2. Add `Asset` model.
3. Expand `Service` or introduce related service-content tables.
4. Add `ServiceFaq` and `ServicePillar` tables.
5. Add `Testimonial` table.
6. Add `SiteSetting` or evolve `Setting` into a safer global-settings pattern.

Recommended schema direction:

- keep `Service` as the base entity
- move nested repeating content into relation tables instead of large JSON blobs where practical
- allow optional JSON only for clearly bounded section data

Acceptance criteria:

- Prisma schema supports the service pages now stored in `src/lib/servicesCatalog.ts`
- Prisma client generates successfully
- new schema supports future page editing without redesigning the database again

### Workstream 3: Admin shell and navigation

Tasks:

1. Create admin layout.
2. Create admin sidebar/top navigation.
3. Add dashboard landing page.
4. Add shared admin form components.
5. Add consistent loading, error, and empty states.

Suggested code targets:

- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx`
- `src/components/organisms/admin/*`
- `src/components/molecules/admin/*`

Acceptance criteria:

- admin routes share one consistent protected layout
- navigation works across all admin sections
- admin UI is usable on desktop and tablet

## Phase 2: Services CRUD and Contact Operations

Purpose:

Deliver the first real business value: editable services and persisted leads.

### Workstream 1: Service management

Tasks:

1. Replace static service management dependency on `src/lib/servicesCatalog.ts` with DB-backed reads.
2. Build service list page in admin.
3. Build create/edit forms for service records.
4. Add management for FAQs, pillars, testimonial content, CTA copy, and SEO fields.
5. Add publish toggle and ordering fields.
6. Revalidate affected pages after mutations.

Suggested code targets:

- `src/app/admin/services/page.tsx`
- `src/app/admin/services/[id]/page.tsx`
- `src/app/api/admin/services/*`
- `src/lib/cms/services.ts`
- `src/lib/validators/service.ts`

Acceptance criteria:

- admin can create, edit, deactivate, and reorder services
- public service listing and detail pages read from the database
- editing a service no longer requires a code deploy

### Workstream 2: Contact submission persistence

Tasks:

1. Save contact form submissions to the database.
2. Add submission status fields if needed.
3. Create admin list page for submissions.
4. Add filtering by date and status.
5. Optionally add email notification hooks.

Suggested code targets:

- `src/app/contact/actions.ts`
- `src/app/admin/submissions/page.tsx`
- `src/lib/cms/submissions.ts`

Acceptance criteria:

- every valid submission is persisted
- admin can review submissions from `/admin/submissions`
- no lead is lost because of console-only logging

## Phase 3: Media Management

Purpose:

Allow the client to manage images and videos safely.

### Workstream 1: Upload pipeline

Tasks:

1. Integrate chosen storage provider.
2. Build upload endpoint or provider-based signed upload flow.
3. Save asset metadata into the database.
4. Add asset browser in admin.
5. Support alt text and asset labeling.

### Workstream 2: Media selection in forms

Tasks:

1. Allow service forms to pick or upload hero images.
2. Allow service forms to assign poster images and optional video assets.
3. Allow page sections to reuse existing assets.

Acceptance criteria:

- admin can upload and reuse assets
- images and videos are not stored in MySQL
- content forms can reference asset IDs safely

## Phase 4: Editable Homepage and Marketing Sections

Purpose:

Move the most valuable static marketing content into a controlled CMS structure.

### Priority content targets

1. hero section
2. mission intro section
3. why-us section
4. how-to-start section
5. stories/testimonials section
6. footer settings and CTA areas

### Recommended modeling approach

Use structured section schemas instead of a visual free-form builder.

Example:

- `Page`: `home`
- `PageSection`: `hero`
- `PageSection`: `mission_intro`
- `PageSection`: `why_us`
- `PageSection`: `how_to_start`

Each section should expose only the fields needed by the existing UI.

That keeps:

- design consistency
- predictable layouts
- easier validation
- faster implementation

Acceptance criteria:

- selected homepage sections are editable without code changes
- public pages keep the current visual quality and layout integrity
- content editors cannot accidentally break the page structure

## Phase 5: Editorial Workflow and Governance

Purpose:

Make content changes safer once admin usage grows.

### Tasks

1. Add draft and published states for pages and services.
2. Add preview support.
3. Add audit logs for sensitive changes.
4. Add optional soft delete for content entries.
5. Add clearer role boundaries between `ADMIN` and `STAFF`.

Acceptance criteria:

- content can be reviewed before going live
- sensitive edits are traceable
- accidental content loss risk is reduced

## Technical Backlog by Area

## Data layer

Tasks:

- refactor content reads into repository-style helpers
- stop coupling page rendering to static arrays in TypeScript
- centralize CMS queries in `src/lib/cms/*`

## Validation layer

Tasks:

- create Zod schemas for all admin forms
- validate media references and URLs
- validate slugs, SEO fields, and publication states

## Cache and revalidation

Tasks:

- add `revalidatePath` after admin mutations
- define revalidation rules for homepage, services, and page-specific content
- avoid stale content after publish actions

## Admin UX

Tasks:

- use structured, section-specific forms
- provide inline validation states
- provide image previews and video metadata previews
- provide unsaved-changes feedback for editors

## Suggested Schema Evolution Order

1. `ContactSubmission`
2. `Asset`
3. `Testimonial`
4. `Service` expansion
5. `ServiceFaq`
6. `ServicePillar`
7. `Page`
8. `PageSection`

This order delivers operational value quickly while reducing migration risk.

## Suggested File Migration Order

### First to migrate off hardcoded content

1. `src/lib/servicesCatalog.ts`
2. `src/app/contact/actions.ts`
3. `src/components/organisms/StoriesOfGrowthSection.tsx`
4. `src/components/organisms/Hero.tsx`
5. `src/components/organisms/HowToStartSection.tsx`

### Later migrations

1. `src/components/organisms/MissionIntroSection.tsx`
2. `src/components/organisms/WhyUsSection.tsx`
3. `src/components/organisms/Footer.tsx`
4. other informational page sections

## Out of Scope for Initial Delivery

Do not include these in the first implementation milestone:

- full visual drag-and-drop page builder
- multilingual CMS architecture unless it is already committed as a requirement
- complex revision history UI
- public self-service appointment booking engine
- granular workflow approvals beyond basic draft/publish

## Recommended Sprint Order

### Sprint 1

- finalize auth and storage decisions
- implement auth
- protect `/admin`
- build admin layout
- expand schema for submissions, assets, and services

### Sprint 2

- build services CRUD
- save contact submissions
- create submissions admin list
- add revalidation hooks

### Sprint 3

- integrate media uploads
- connect service forms to asset library
- move first homepage sections into DB-backed content

### Sprint 4

- finish homepage content editor
- add testimonial management
- add settings management
- add draft/publish where needed

## Definition of Done

The initial backend + `/admin` milestone is complete when:

- admin access is protected and role-based
- services are fully editable from admin
- contact submissions are persisted and visible in admin
- images and videos can be managed through a media workflow
- the public services pages no longer depend on hardcoded service content
- at least the highest-value homepage sections are editable without redeploying

## Immediate Next Step

If implementation starts now, the first concrete technical task should be:

1. define the Prisma schema changes for admin content and submissions
2. choose the auth provider
3. scaffold the protected `/admin` layout

That sequence creates the minimum viable foundation without building UI on top of unstable data assumptions.