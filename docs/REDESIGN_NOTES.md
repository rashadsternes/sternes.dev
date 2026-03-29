# Deep-Rooted Strategist Redesign

**Status**: Visual system established with Hero, Nav, Services, and Quote Break components
**Date**: 2026-03-28
**Archetype**: Archetype 2 — The Deep-Rooted Strategist

## Design Philosophy

This redesign embodies the "roots beneath the surface" metaphor through:

### Visual Language
- **Colors**: Antique Parchment (#F5F2E9), Deep Forest Green (#1B3022), Rich Walnut (#3E2723), Sage accents (#8DAA91)
- **Typography**: Fraunces (200 weight) for display headlines, DM Sans for body text, DM Mono for eyebrows
- **Texture**: Subtle wood grain/paper texture overlay at 3.5% opacity using SVG noise filter
- **Imagery**: Macro forest photography — wood grain, moss, deep textures with "Old Master" lighting

### Signature Interactions
1. **Custom Cursor**: Soft green circle that blooms (scales 2x) when hovering over interactive elements
2. **Growth Ring Reveal**: Sections expand from center (scale: 0.92 → 1.0) mimicking tree growth rings
3. **Floating Navigation**: Backdrop blur nav that adapts from dark/transparent to light/parchment on scroll
4. **Layered Depth**: Multiple overlays creating atmospheric depth and premium feel

### Emotional Register
**Premium · Considered · Unhurried**

Every element signals "this person thinks deeply before acting" — appropriate for $2,000–$5,000 service offerings.

---

## Components Created

### 1. CustomCursor (`/components/CustomCursor.tsx`)
- Replaces default cursor with soft green bloom effect
- Scales 2x on hover over interactive elements
- Uses `mix-blend-mode: screen` for organic overlay effect
- Smooth spring animation (stiffness: 500, damping: 28)

### 2. GrowthRingReveal (`/components/GrowthRingReveal.tsx`)
- Reusable animation wrapper for content sections
- Expands from center: `scale: 0.92 → 1.0`
- Duration: 1.2s with custom organic easing `[0.22, 0.61, 0.36, 1]`
- Triggers on scroll into view (20% threshold)

### 3. HeroRedesign (`/components/HeroRedesign.tsx`)
**Key Features**:
- Full-height hero with macro forest background at 40% opacity
- Radial gradient overlay creating "Old Master" lighting effect
- Large serif headline (Fraunces 200): "Built for what lasts"
- Animated decorative root-like line element
- Organic scroll indicator with breathing animation
- Growth ring reveal on main content group

**Typography Scale**:
- Headline: `clamp(3rem, 8vw, 7rem)`
- Body: `clamp(1rem, 2vw, 1.4rem)`
- Eyebrow: `10px` mono uppercase with `0.3em` tracking

### 4. NavRedesign (`/components/NavRedesign.tsx`)
**Key Features**:
- Fixed position, centered horizontally at top
- Floating pill shape with backdrop blur
- Adapts on scroll:
  - **Not scrolled**: Dark transparent with light text
  - **Scrolled**: Light parchment with dark text
- Smooth transitions on all state changes
- Simple nav links: Services, Work, Contact
- Hover states change color to sage/forest green

**Technical Details**:
- `backdrop-filter: blur(20px) saturate(180%)`
- Border radius: `100px` (full pill)
- Min width: 90%, max width: 1400px
- Box shadow adjusts based on scroll state

### 5. ServicesRedesign (`/components/ServicesRedesign.tsx`)
**Key Features**:
- Parchment background (#F5F2E9)
- Asymmetric two-column intro layout (1fr 2fr grid)
- Portrait with growth ring reveal and subtle vignette overlay
- Numbered service cards with circular badges positioned in left margin
- Staggered entrance animations

**Layout Structure**:
```
[Portrait - 3:4 ratio]  [Headline + Description]

        [Service Cards with left-margin number badges]
        01 - Websites & Web Applications
        02 - AI Integration & Transformation
        03 - Strategy & Discovery
```

**Typography**:
- Section headline: `clamp(2rem, 4vw, 3.5rem)` Fraunces 200
- Card titles: `clamp(1.75rem, 3vw, 2.5rem)` Fraunces 200
- Descriptions: `15px` DM Sans 300

### 6. QuoteBreakRedesign (`/components/QuoteBreakRedesign.tsx`)
**Key Features**:
- Walnut background (#3E2723) with forest canopy image at 25% opacity
- Centered quote with decorative lines above/below
- Growth ring reveal on main content
- Lines animate with `scaleX: 0 → 1` with delays

**Quote Styling**:
- `clamp(1.75rem, 3.5vw, 3rem)` Fraunces 200 italic
- Sage green decorative lines (120px width)
- Attribution in uppercase mono at 12px

---

## Global CSS Updates

### New Color Variables (`/app/globals.css`)
```css
--color-parchment:  #F5F2E9;  /* Antique Parchment */
--color-forest:     #1B3022;  /* Deep Forest Green */
--color-walnut:     #3E2723;  /* Rich Walnut */
--color-sage:       #8DAA91;  /* Sage accent */
--color-moss-deep:  #6B8C70;  /* Deep moss for gradients */
```

### Wood Grain Texture
Applied via `body::before` pseudo-element:
- SVG noise filter with fractal noise
- Opacity: 3.5%
- `mix-blend-mode: multiply`
- Fixed position covering full viewport
- Pointer events disabled

### Custom Cursor Implementation
- `body { cursor: none; }` to hide default cursor
- Interactive elements restore `cursor: auto`

---

## Demo Page

**Location**: `/app/redesign/page.tsx`

View at: `http://localhost:3000/redesign`

**Components Included**:
1. CustomCursor
2. NavRedesign
3. HeroRedesign
4. ServicesRedesign
5. QuoteBreakRedesign
6. Footer (existing)

---

## Design System Tokens

### Typography Scale (Archetype 2)
| Element | Font | Weight | Size |
|---------|------|--------|------|
| Hero headline | Fraunces | 200 | 3–7rem (clamp) |
| Section headline | Fraunces | 200 | 2–3.5rem (clamp) |
| Card title | Fraunces | 200 | 1.75–2.5rem (clamp) |
| Body intro | DM Sans | 300 | 1–1.4rem (clamp) |
| Body text | DM Sans | 300 | 15px |
| Eyebrow | DM Mono | 400 | 10px |

### Spacing System
- Section padding: `8rem 2.5rem` (vertical generous)
- Card spacing: `3rem 0` with bottom border
- Grid gaps: `3–5rem` for asymmetric layouts
- Element margins: `1.5–3rem` for breathing room

### Animation Timing
- Growth ring reveal: `1.2s` with organic easing
- Nav state transition: `0.4s` cubic-bezier
- Cursor bloom: Spring animation (500/28/0.5)
- Stagger delays: `0.1–0.2s` increments

---

## Next Steps

### Additional Sections to Redesign
1. **Portfolio** - Grid with growth ring reveals, macro detail overlays
2. **Pricing** - Premium tier cards with subtle grain texture backgrounds
3. **Stats** - Minimal counters with sage accent borders
4. **Process** - Timeline with organic connecting elements (root-like)
5. **Values** - High-key forest photography (from Archetype 1) with warm light
6. **Contact Form** - Refined inputs with parchment background

### Refinements to Consider
- [ ] Add micro-interactions on service card hover (subtle scale/shadow)
- [ ] Implement scroll-triggered parallax on hero background
- [ ] Create loading state with "growing line" animation
- [ ] Add visible faint grid lines in Pricing section (from Archetype 3)
- [ ] Source actual macro forest photography (wood grain, moss, roots)
- [ ] Create "Old Master" portrait photography with directional lighting

### Technical Improvements
- [ ] Optimize custom cursor performance (throttle mousemove?)
- [ ] Add reduced-motion media queries for accessibility
- [ ] Ensure backdrop-filter fallbacks for Firefox
- [ ] Test cursor visibility on different backgrounds
- [ ] Add loading states for images with blur-up placeholders

---

## Brand Archetype Alignment Checklist

✅ **Colors**: Parchment, Forest Green, Walnut implemented
✅ **Typography**: Fraunces (200) + DM Sans + DM Mono
✅ **Animations**: Growth ring reveals expanding from center
✅ **Texture**: Subtle wood grain overlay at low opacity
✅ **Custom Cursor**: Blooming green circle on hover
✅ **Emotional Register**: Premium, considered, unhurried pacing
⚠️ **Photography**: Using placeholder — need macro detail shots
⚠️ **Portrait**: Need "Old Master" directional lighting reshoot

---

## Implementation Notes

### Cursor Behavior
The custom cursor is hidden on mobile (automatically) since `mousemove` events don't fire. This is intentional — the bloom effect is desktop-only.

### Backdrop Blur Browser Support
- Safari/Chrome: Full support
- Firefox: Limited support (fallback to solid background)
- Consider adding `@supports` check if Firefox is a priority audience

### Performance Considerations
- Growth ring animations use `transform` and `opacity` only (GPU-accelerated)
- No layout thrashing — all animations are compositor-only
- SVG noise texture is inline data URI (no extra HTTP request)
- Images should be optimized and served via Next.js Image component

### Accessibility
- Custom cursor doesn't interfere with keyboard navigation
- All interactive elements have proper focus states (need to add)
- Color contrast ratios meet WCAG AA on all text
- Reduced motion preferences should disable growth ring animations (TODO)

---

## File Structure

```
/components
  ├── CustomCursor.tsx           ✅ New
  ├── GrowthRingReveal.tsx       ✅ New
  ├── HeroRedesign.tsx           ✅ New
  ├── NavRedesign.tsx            ✅ New
  ├── ServicesRedesign.tsx       ✅ New
  └── QuoteBreakRedesign.tsx     ✅ New

/app
  ├── globals.css                ✅ Updated (colors + texture + cursor)
  └── redesign/
      └── page.tsx               ✅ New (demo page)
```

---

## Visual Hierarchy Principles

### 1. Premium Authority Through Restraint
- Generous whitespace (8rem section padding)
- Limited color palette with intentional accents
- Typography scale with clear hierarchy
- Minimal decorative elements (subtle lines, not noise)

### 2. Depth Through Layering
- Background images at reduced opacity
- Gradient overlays for atmospheric depth
- Subtle texture at 3.5% opacity
- Backdrop blur on floating elements

### 3. Organic Precision
- Growth ring animations (organic metaphor)
- Asymmetric grids (natural, not rigid)
- Rounded number badges (ring forms)
- Root-like decorative lines (nature reference)

### 4. Unhurried Pacing
- Long animation durations (1.2s+)
- Staggered entrances with delays
- Smooth, organic easing curves
- No jarring or aggressive motion

---

**End of Documentation**
