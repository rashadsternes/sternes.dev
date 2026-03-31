# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and service website for Rashad Sternes built with Next.js 16 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Features AI-powered client fit assessment using Anthropic's Claude API.

## Development Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Production
npm run build        # Build for production
npm start           # Run production server

# Code quality
npm run lint        # Run Next.js linter
```

## Architecture

### Component Dual-Version Pattern

The site uses a dual-version architecture where most components exist in two versions:
- **Base components** (e.g., `Hero.tsx`, `Services.tsx`) - Original versions
- **Redesign components** (e.g., `HeroRedesign.tsx`, `ServicesRedesign.tsx`) - Active versions

**Current state:**
- Main page (`/`) uses all "Redesign" components + `CalendlySection`
- `/redesign` route uses all "Redesign" components + `ContactFormRedesign` (instead of CalendlySection)
- Base components are preserved for potential rollback or comparison

When editing the active site, work with the "Redesign" components. The base components are legacy.

### Routes & Pages

- `/` - Main homepage (uses Redesign components)
- `/redesign` - Alternative version (ContactFormRedesign instead of CalendlySection)
- `/ai` - Public AI context page for LLM-to-LLM evaluation (indexed by search engines)

### API Routes

**Fit Assessment System** - Two endpoints for evaluating client fit:

1. **`/api/assess-fit` (POST)** - Single-shot assessment
   - Takes `problem` (string, 20-2000 chars) and `honeypot` (anti-bot field)
   - Returns immediate fit assessment using Claude
   - Rate limit: 5 requests/hour per IP
   - Max output: 1024 tokens

2. **`/api/assess-fit/conversation` (POST)** - Conversational assessment
   - Takes `messages` (array), `conversationId` (string), and `honeypot`
   - Maintains conversation state for up to 5 turns
   - Rate limit: 3 new conversations/hour per IP (applied only on first message)
   - Max output: 800 tokens per turn
   - Keeps last 10 messages in context

Both endpoints share protection layers:
- **Rate limiting**: IP-based via `lib/rate-limit.ts` (in-memory store)
- **Cost tracking**: $10/day circuit breaker to prevent API abuse
- **Input validation**: Length checks, honeypot detection
- **Anthropic API**: Claude Sonnet 4.5 model

### Rate Limiting & Protection (`lib/rate-limit.ts`)

Custom in-memory implementation (suitable for single-instance deployments):

- **`rateLimit(request, config)`** - IP-based rate limiting
  - Returns `{success, limit, remaining, reset}`
  - Stores counters in memory (resets on serverless cold starts)
  - Auto-cleans expired entries every hour

- **`trackCost(estimatedCost)`** - Daily cost circuit breaker
  - Tracks total daily API cost
  - Returns `false` when $10 limit exceeded
  - Resets at midnight UTC

**Note**: In-memory store is appropriate for Vercel hobby tier but would need Redis/KV for multi-instance production.

### Typography System

Three custom fonts loaded via `next/font/google` in `app/layout.tsx`:

- **Fraunces** (200, 300, 400) - Display font (`--font-display`)
- **DM Sans** (300, 400) - Body font (`--font-body`)
- **DM Mono** (400) - Monospace font (`--font-mono`)

Fonts are loaded with `display: swap` for performance.

Additionally, Geist fonts are available in `app/fonts/`:
- `GeistVF.woff` - Geist variable font
- `GeistMonoVF.woff` - Geist Mono variable font

### Environment Variables

Required for production:
```
ANTHROPIC_API_KEY_PUBLIC_PROD=sk-ant-...
NEXT_PUBLIC_SITE_URL=https://sternes.vercel.app
```

**ANTHROPIC_API_KEY_PUBLIC_PROD:**
- Used for public-facing fit assessment features (not for sensitive operations)

**NEXT_PUBLIC_SITE_URL:**
- **Current:** `https://sternes.vercel.app` (production domain)
- **Future:** Update to `https://sternes.dev` when custom domain is configured
- Used by: OG images, robots.txt, sitemap.xml, metadata
- Allows easy domain switching without code changes

**⚠️ IMPORTANT - When switching to custom domain:**
1. Configure DNS and add sternes.dev to Vercel project
2. Update `NEXT_PUBLIC_SITE_URL` in Vercel Dashboard → Settings → Environment Variables
3. Change value from `https://sternes.vercel.app` to `https://sternes.dev`
4. Redeploy (all URLs will automatically update)
5. Update `.env.local` to match for local development

**After domain switch - Google Search Console:**
1. Add new property for `https://sternes.dev` in Search Console
2. Verify ownership (DNS or HTML file method)
3. Submit sitemap: `https://sternes.dev/sitemap.xml`
4. Request indexing for key pages (homepage, /ai)
5. Keep sternes.vercel.app property active (will redirect, maintains history)

## Import Path Alias

Use `@/` to reference the project root:
```typescript
import { rateLimit } from '@/lib/rate-limit'
import Hero from '@/components/HeroRedesign'
```

## TypeScript Configuration

- **Strict mode enabled** - All code must satisfy strict type checking
- **Target**: ES2017
- **Module resolution**: bundler (Next.js optimized)

## Styling

- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library (used throughout components)
- No custom Tailwind configuration beyond defaults

## Code Patterns

### Client Components
Most interactive components use `'use client'` directive for hooks and interactivity.

### API Response Format
API routes return consistent JSON structure:
- Success: `{ assessment: string }` or `{ message: string }`
- Error: `{ error: string }` with optional `retryAfter` for 429 responses

### Error Handling
All API routes include:
1. Input validation
2. Rate limiting
3. Cost tracking
4. Try/catch with generic error responses (no leak of internal details)

## Common Tasks

### Adding a New Component
1. Create component in `components/` directory
2. Use TypeScript with proper types
3. Import into relevant page in `app/`
4. Follow existing naming convention (add "Redesign" suffix if replacing legacy component)

### Modifying Active Site
Work with components imported in `app/page.tsx`:
- NavRedesign, HeroRedesign, ServicesRedesign, etc.
- These are the live, user-facing components

### Testing API Endpoints Locally
```bash
# Start dev server
npm run dev

# Test fit assessment
curl -X POST http://localhost:3000/api/assess-fit \
  -H "Content-Type: application/json" \
  -d '{"problem":"Test problem description here","honeypot":""}'
```

### Monitoring Rate Limits
Rate limit state is in-memory and resets on:
- Server restart
- Serverless function cold start
- Manual code deployment

Check headers in API responses for rate limit info:
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

## Deployment

- **Platform**: Vercel (automatic deployments)
- **Framework**: Next.js 16 with App Router
- **Environment**: Serverless functions for API routes

## AI Integration Details

The fit assessment features use Claude Sonnet 4.5 to evaluate whether potential clients are a good fit based on comprehensive context about Rashad's work style, expertise, and ideal client profile.

**System context** (defined in both API routes):
- Rashad's expertise areas (TypeScript/Next.js, e-commerce, Sanity CMS)
- Work style (documentation-first, directive, multi-file changes)
- Ideal client profile (complex projects, values quality over speed)
- What he's overkill for (simple sites, basic cosmetic changes)

When modifying assessment behavior, update the `RASHAD_CONTEXT` constant in the relevant API route.

## Future SEO Opportunities

Planned content and features to improve search visibility and organic traffic:

### 1. Case Studies
- Showcase real client projects with before/after examples
- Target long-tail searches like "website redesign case study" or "[industry] website examples"
- Build trust and demonstrate concrete results
- Location: Create `app/case-studies/` or `app/work/` route

### 2. Schema Markup (LocalBusiness)
- Implement structured data for Google Maps and local search results
- Add to `app/layout.tsx` or create `app/schema.tsx`
- Include: business name, address, phone, hours, service area (Dallas/TX), reviews
- Tools: [Google's Schema Markup Validator](https://validator.schema.org/)
- Reference: [LocalBusiness schema docs](https://schema.org/LocalBusiness)

### 3. Blog Posts
- Target outcome-based searches that prospects actually use
- Example topics:
  - "5 Ways Your Website Can Get You More Customers"
  - "How Much Should a Custom Website Cost? (2026 Guide)"
  - "AI Automation for Small Business: Where to Start"
  - "Website Features That Actually Convert Visitors to Customers"
- Location: Create `app/blog/` route with MDX or Sanity CMS integration
- Frequency: 1-2 posts per month for consistent SEO momentum

### 4. FAQ Section
- Target question-based searches ("How much does...", "What is...", "Do I need...")
- Can be added to homepage or as dedicated `/faq` page
- Implement FAQ schema markup for Google's featured snippets

### 5. Service Area Pages
- Create location-specific landing pages for nearby cities (if expanding service area)
- Examples: "Website Design Plano TX", "Fort Worth Web Designer"
- Only add if genuinely servicing these areas
