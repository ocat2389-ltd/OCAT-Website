# OCAT Robotics Website Startup Plan

## Product Direction

OCAT Robotics should launch as a focused animatronics company site: cinematic, technical, and calm. The near-term site should prove three things quickly:

- OCAT builds real robotic characters for real environments.
- The team can document field work with credible engineering detail.
- The brand can expand into a richer immersive robotic world once more footage, project pages, and product visuals are ready.

The current homepage stays intentionally minimal: a single centered statement over a restrained robotic-world atmosphere. The first content priority is the blog, because the PANGUAN Ocean Park post already demonstrates the company's seriousness and gives the design system real material to shape around.

## Reference System

Use Wonderful's current public site as the layout reference: image-led hero surfaces, restrained navigation, quiet metadata, large editorial type, narrow article reading columns, 8px media radii, and blog pages built around one featured story followed by a compact archive.

Use the existing Project Melo reference notes as the measured implementation baseline:

- Desktop shared container up to `1440px`.
- Desktop gutters around `40-60px`, mobile gutters around `20-24px`.
- Blog feature as wide media plus narrower text column.
- Article header centered, feature image wide, article body around `600px`.
- No heavy shadows; separation comes from space, hairlines, contrast, and media.

OCAT brand substitution:

- Typeface: Inter.
- Primary palette: warm white, black ink, controlled robotic blue, and small luminous yellow-green accents.
- Assets: OCAT logo, onboarding frames, PANGUAN field-test images.

## Minimum Stack

- Next.js App Router with TypeScript.
- Markdown files in `content/blog` for the first publishing workflow.
- Static assets in `public`.
- Server Components for blog loading.
- A small client component only for the onboarding animation.
- Vercel deployment from the project root.

This avoids an early CMS decision. Once there are enough posts or multiple authors, the blog can move to MDX, Sanity, Notion, or a headless CMS without changing the public routes.

## Minimum Workflow

1. Put raw source material in `raw/` and keep it unchanged.
2. Extract approved public assets into `public/`.
3. Format each blog post as Markdown in `content/blog`.
4. Run `npm install`.
5. Run `npm run dev` locally.
6. Review `/`, `/blog`, and `/blog/panguan-ocean-park` at desktop and mobile sizes.
7. Run `npm run build`.
8. Push the project to GitHub.
9. Import the repository into Vercel and use the default Next.js build settings.

## First Milestone

The first milestone is this working site shell:

- Homepage with OCAT navigation, onboarding animation, and a centered company statement.
- Blog index following the Wonderful-style feature/archive structure.
- Formatted PANGUAN article rendered from Markdown.
- Public image assets extracted from the raw Obsidian source.

## Next Milestones

- Replace the CSS robotic atmosphere with approved immersive 3D or video assets.
- Add a project page for PANGUAN with product specs, safety model, and test history.
- Add a reusable case-study template for future animatronic systems.
- Add a media kit page with logo downloads, company description, and press images.
- Add analytics, OG images, sitemap, and privacy/legal pages before a public launch.
