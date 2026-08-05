# WaiverTemplate.com

A free liability waiver generator for small businesses. Generate professional, state-specific liability waivers in minutes. Free to preview, $9.99 to download as a PDF.

## Tech Stack

- [Astro 7](https://astro.build) — static site generator with server-side rendering for the PDF API route
- [Tailwind CSS v4](https://tailwindcss.com) — via `@tailwindcss/vite` plugin
- [PDFKit](https://pdfkit.org) — server-side PDF generation
- No React/Vue — Astro components + vanilla TypeScript for interactivity
- Dodo Payments — checkout integration (Phase 2)

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Nav.astro           # Sticky navigation bar
│   ├── Hero.astro          # Hero section with headline
│   ├── TypePicker.astro    # Activity type pill buttons
│   ├── WaiverForm.astro    # 3-step waiver generator form
│   ├── FormProgress.astro  # Step progress indicator
│   ├── SocialProof.astro   # Stats section
│   ├── HowItWorks.astro    # 4-step how-it-works section
│   ├── WaiverTypes.astro   # Waiver type grid cards
│   └── Footer.astro        # Footer
├── data/
│   └── waiver-types.ts     # Data for all 8 waiver types + SEO content
├── layouts/
│   └── Base.astro          # Base HTML layout with meta tags
├── pages/
│   ├── index.astro         # Homepage
│   ├── [waiver].astro      # Dynamic SEO landing pages (8 pages)
│   ├── api/
│   │   └── generate-pdf.ts # PDF generation API endpoint (PDFKit)
│   ├── privacy.astro       # Privacy policy
│   └── terms.astro         # Terms of service
└── styles/
    └── global.css          # Global CSS with design tokens
```

## SEO Landing Pages

The `[waiver].astro` dynamic route generates 8 static pages at build time:

| URL | Title |
|-----|-------|
| `/gym-waiver/` | Gym & Fitness Waiver |
| `/tattoo-waiver/` | Tattoo Studio Waiver |
| `/yoga-waiver/` | Yoga Studio Waiver |
| `/volunteer-waiver/` | Volunteer Waiver |
| `/rock-climbing-waiver/` | Rock Climbing Waiver |
| `/dog-grooming-waiver/` | Dog Grooming Waiver |
| `/horse-riding-waiver/` | Horse Riding Waiver |
| `/personal-trainer-waiver/` | Personal Trainer Waiver |

## PDF Generation

The PDF endpoint at `/api/generate-pdf` accepts form data as query parameters (GET) or JSON body (POST) and returns a PDF using PDFKit.

**Required parameters:**
- `businessName` — business or organization name
- `state` — US state
- `ownerName` — owner or manager name
- `businessAddress` — full business address
- `activityType` — type of activity (e.g. Gym/Fitness)

**Optional parameters:**
- `activityDescription` — description of activities
- `specificRisks` — specific risks to disclose
- `minAge` — minimum participant age
- `emergencyContact` — whether to include emergency contact fields (`true`/`false`)

The PDF endpoint requires a Node.js runtime. For Vercel deployment, the API route runs as a serverless function automatically.

## Deployment

### Vercel (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

Or connect the GitHub repository in the Vercel dashboard for automatic deployments on push.

The PDF API endpoint runs as a Vercel Serverless Function automatically — no extra configuration needed.

### Cloudflare Pages

```bash
# Build command
npm run build

# Output directory
dist/
```

Note: The PDF endpoint uses Node.js APIs (PDFKit) and requires the Cloudflare Node.js compatibility flag enabled. Add to `wrangler.toml`:

```toml
compatibility_flags = ["nodejs_compat"]
```

## Environment Variables

Phase 1 requires no environment variables.

**Phase 2 (Dodo Payments):**
```
DODO_PAYMENTS_API_KEY=your_live_key_here
DODO_PAYMENTS_WEBHOOK_SECRET=your_webhook_secret_here
```

## Design System

The site follows the design token system defined in `src/styles/global.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--emerald` | `#059669` | Primary CTAs, active states |
| `--emerald-faint` | `#ECFDF5` | Badge and hover backgrounds |
| `--dark` | `#111827` | Headings and body text |
| `--muted` | `#6B7280` | Secondary text |
| `--border` | `#E5E7EB` | All borders |
| `--bg` | `#F9FAFB` | Alternate section backgrounds |

Font: Inter (300–900 weights via Google Fonts)

## Phase 2 Roadmap

- [ ] Dodo Payments checkout integration (replace placeholder button)
- [ ] Webhook handler to deliver PDF after payment
- [ ] Email delivery of downloaded waiver
- [ ] More waiver types (swimming, adventure, camps)
- [ ] Waiver template library with examples
- [ ] Account system for storing and managing waivers
