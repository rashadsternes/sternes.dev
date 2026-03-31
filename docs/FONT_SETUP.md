# Font Setup & Rendering Fix

## Problem
Fonts rendering bold/heavy in local development but light/thin in production. The issue was caused by `@import` in globals.css not working reliably in Next.js dev mode.

## Solution
Use **next/font** (Next.js built-in font optimization) instead of `@import`.

## Implementation

### 1. Font Configuration (`app/layout.tsx`)

```typescript
import { Fraunces, DM_Sans, DM_Mono } from 'next/font/google'

const fraunces = Fraunces({
  weight: ['200', '300', '400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})
```

### 2. Apply to HTML Tag

```typescript
<html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${dmMono.variable}`}>
```

### 3. CSS Variables (`app/globals.css`)

**IMPORTANT:** Do NOT use `@import` for fonts. Remove any lines like:
```css
/* ❌ DON'T DO THIS */
@import url('https://fonts.googleapis.com/css2?family=Fraunces...');
```

Instead, just define the CSS variables (fonts are loaded via next/font):
```css
:root {
  --font-display: 'Fraunces', Georgia, serif;
  --font-body:    'DM Sans', Helvetica, Arial, sans-serif;
  --font-mono:    'DM Mono', 'Courier New', monospace;
}
```

## Key Font Settings

### Headers & Prices (Fraunces)
- **Font family:** `var(--font-display)`
- **Weight:** `200` (thin/light for elegant look)
- **Style:** `normal` or `italic` depending on element
- **Letter spacing:** `-0.02em` to `-0.01em` (tighter for display text)

### Hero Headline Size
```css
--text-hero: clamp(2rem, 5.5vw, 4.25rem);
```
- Responsive sizing ensures "Designed for what's next" stays on one line

### Price Display
```css
--text-price: clamp(2.25rem, 4vw, 3.25rem);
```

## Benefits of next/font

1. **Consistent rendering** - Works identically in dev and production
2. **Self-hosted** - Fonts are self-hosted (faster, more reliable)
3. **No external requests** - No dependency on Google Fonts CDN
4. **Built-in optimization** - Automatic font subsetting and optimization
5. **Better performance** - Fonts are bundled with your app

## Troubleshooting

### Fonts still look bold?
1. Verify no `@import` in globals.css
2. Clear browser cache (Cmd+Shift+R)
3. Check DevTools > Network tab - should NOT see requests to fonts.googleapis.com
4. Restart dev server (`npm run dev`)

### Wrong font weight?
- Ensure you're using `fontWeight: 200` for Fraunces display text
- Check that `weight: ['200', '300', '400']` is configured in layout.tsx

### Fonts not loading?
- Check browser console for errors
- Verify the className is applied to `<html>` tag
- Ensure CSS variables match the `variable` names in layout.tsx
