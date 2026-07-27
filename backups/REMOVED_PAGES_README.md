# Removed pages backup (Phase 1 — 1Cato rebrand)

Removed on rebrand: **/rewards** and **/story (Our Story)** and the Our Story admin CMS.

## Where the content/code lives now
- Source snapshots copied here: `story-customer-page/`, `rewards-customer-page/`, `admin-story-cms/`.
- Full history also in git (pre-removal commit).

## Database note
- "Our Story" was DB-driven via the **Partner** table (owner/partner profiles) + editable
  images via **SiteImage** keys `story_hero`, `story_origin`, `story_closing`.
- The **Partner** Prisma model was LEFT in `schema.prisma` (now an orphan/unused table) to
  avoid a destructive `prisma db push` against the live DB from CI. Drop it later with a
  reviewed migration if desired. Any existing Partner rows are untouched (not deleted).
- The `story_*` SiteImage seed defaults were removed from `src/lib/getSiteImages.ts`.

## Redirects
- `/rewards` and `/story` now 301-redirect to `/` (see `next.config.ts`) to preserve SEO
  from any already-indexed Southern Jerks URLs.
