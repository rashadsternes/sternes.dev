# OG Image Creation Guide

Two HTML templates have been created for your OG images. You can either screenshot them or use AI image generators.

## 📁 Files Created

1. **Version 3A (Split Design):** `/public/og-template-3a.html`
2. **Version 8B (Modern Geometric):** `/public/og-template-8b.html`

---

## Method 1: Screenshot HTML Templates (Recommended)

### Using Browser Screenshot

**Chrome/Edge (Best Quality):**
```bash
# Start dev server
npm run dev

# Visit in browser:
http://localhost:3000/og-template-3a.html
http://localhost:3000/og-template-8b.html
```

**To capture perfect 1200×630 screenshots:**

1. Open Developer Tools (F12 or Cmd+Option+I)
2. Click "Toggle Device Toolbar" (Cmd+Shift+M)
3. Select "Responsive" and set dimensions: **1200 × 630**
4. Right-click on page → "Capture screenshot" or "Capture full size screenshot"
5. Save as `og-image.png`

**Firefox:**
1. Press Shift+F2 (Command line)
2. Type: `screenshot --fullpage og-image-3a.png`
3. Or use responsive design mode (Cmd+Option+M) and set to 1200×630

### Using CLI Screenshot Tools

**Option A: Playwright (Install first: `npm install -D playwright`)**
```bash
npx playwright screenshot http://localhost:3000/og-template-3a.html og-image-3a.png --viewport-size=1200,630
npx playwright screenshot http://localhost:3000/og-template-8b.html og-image-8b.png --viewport-size=1200,630
```

**Option B: Puppeteer**
```bash
npx puppeteer screenshot http://localhost:3000/og-template-3a.html og-image-3a.png --viewport 1200x630
npx puppeteer screenshot http://localhost:3000/og-template-8b.html og-image-8b.png --viewport 1200x630
```

### Using Online Tools

1. Open file in browser (double-click HTML file)
2. Go to https://www.screely.com/ or https://screenshot.rocks/
3. Upload/capture at exact dimensions
4. Download as PNG

---

## Method 2: AI Image Generation

### For DALL-E 3 (ChatGPT/API)

**Prompt for Version 3A (Split Design):**
```
Create a professional OG image for a website designer, exactly 1200x630 pixels.

LEFT SIDE (40% width):
- Dark green gradient background (#2D4A3E to #234134)
- Text "STERNES.DEV" in white, centered, bold serif font (48px)
- Subtle geometric circle pattern in background

RIGHT SIDE (60% width):
- Off-white/cream background (#FEFEFE)
- Headline "Website Design That Works" in dark green (#2D4A3E), bold serif, 64px
- Subtext "Beautiful websites that attract customers and grow your business" in gray (#555), sans-serif, 30px

Style: Modern, professional, clean split design, high contrast, corporate website aesthetic
```

**Prompt for Version 8B (Modern Geometric):**
```
Create a professional OG image for a website designer, exactly 1200x630 pixels.

LEFT SIDE (60% width):
- Off-white background (#FEFEFE)
- Top: "STERNES.DEV" in dark green (#2D4A3E), bold serif, 42px, spaced letters
- Middle: "Modern Website Design" in dark green (#2D4A3E), bold serif, 68px
- Bottom: "Professional websites that make your business look its best" in gray (#555), sans-serif, 32px

RIGHT SIDE (40% width):
- Abstract geometric shapes (triangles) in bottom-right corner
- Colors: Dark green (#2D4A3E), medium green (#4A7C59), light green (#7FB685)
- Layered, overlapping, modern gradient effect

Style: Contemporary, sophisticated, minimal, professional tech aesthetic
```

### For Midjourney

**Version 3A:**
```
professional website OG image, 1200x630px, split design, left side dark green gradient with white STERNES.DEV text and subtle geometric circles, right side cream white with bold serif headline "Website Design That Works" in dark green and gray body text about beautiful websites, modern corporate aesthetic, clean layout, high contrast --ar 1200:630 --v 6
```

**Version 8B:**
```
professional website OG image, 1200x630px, cream background, left-aligned dark green text "STERNES.DEV" and "Modern Website Design", abstract gradient geometric triangles in bottom right corner using dark to light green tones, modern minimalist tech aesthetic, sophisticated typography, clean negative space --ar 1200:630 --v 6
```

### For Ideogram / Flux / Other AI Tools

**Version 3A - Simplified:**
```
Website designer OG image 1200x630px. Split layout: left 40% dark green (#2D4A3E) with "STERNES.DEV" in white serif font. Right 60% cream background with "Website Design That Works" headline in dark green serif, plus gray body text "Beautiful websites that attract customers and grow your business". Professional, clean, modern corporate style.
```

**Version 8B - Simplified:**
```
Website designer OG image 1200x630px. Cream background. Left side text: "STERNES.DEV" small, "Modern Website Design" large headline, gray subtext about professional websites. Right side: abstract layered triangle shapes in green gradient (#2D4A3E to #7FB685). Modern, minimal, sophisticated tech aesthetic.
```

### For Stable Diffusion / ComfyUI

**Version 3A:**
```
professional social media banner, 1200x630 pixels, two-column split screen design, LEFT: dark forest green gradient background with white sans-serif text "STERNES.DEV" centered, subtle circle pattern overlay, RIGHT: off-white background, bold serif headline "Website Design That Works" in dark green, smaller gray text paragraph below, modern corporate branding, clean minimalist layout, high quality typography, flat design
```

**Version 8B:**
```
professional social media banner, 1200x630 pixels, light cream background, left-aligned layout, dark green text hierarchy "STERNES.DEV" small, "Modern Website Design" large bold serif, gray body text, bottom-right corner: abstract layered triangle shapes with green gradient, contemporary minimalist web design aesthetic, clean typography, negative space, sophisticated
```

---

## Method 3: Figma/Canva (Manual Design)

If AI/screenshots don't work perfectly, use the design specs from our previous conversation:

### Figma
1. Create 1200×630 frame
2. Follow exact specs from design breakdown
3. Export as PNG (1x)

### Canva
1. Custom size: 1200×630
2. Recreate layout using rectangles, text, and shapes
3. Download as PNG

---

## Final Steps

### After Creating Images

1. **Optimize file size:**
```bash
# Using ImageMagick (install via: brew install imagemagick)
magick og-image.png -quality 85 -strip public/images/og-image.png

# Or use online: https://tinypng.com/
```

2. **Place in correct directory:**
```bash
mkdir -p public/images
# Move your chosen version to:
public/images/og-image.png
```

3. **Create apple-touch-icon (can do later):**
   - 180×180px square version
   - Solid background (no transparency)
   - Save as `public/apple-touch-icon.png`

4. **Test the images:**
```bash
# Rebuild and check
npm run build
npm start

# Test OG tags at:
https://www.opengraph.xyz/
https://cards-dev.twitter.com/validator
```

---

## Quick Decision Matrix

| Method | Time | Quality | Ease |
|--------|------|---------|------|
| **Browser Screenshot** | 2 min | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Playwright/Puppeteer** | 5 min | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **AI Generator** | 10 min | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Figma/Canva** | 20 min | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

**Recommendation:** Try browser screenshot first (Chrome DevTools method). If fonts don't load perfectly, use AI generator with the prompts above.

---

## Troubleshooting

**Fonts not loading in HTML:**
- Wait 2-3 seconds after page load
- Or download fonts locally and reference them

**Colors look different:**
- Ensure sRGB color profile
- Check monitor calibration

**Wrong dimensions:**
- Verify viewport is exactly 1200×630
- Check device pixel ratio (should be 1x, not 2x/3x)

**AI generator ignoring text:**
- Try shorter, simpler prompts
- Focus on layout description, then add text in post-processing
- Use Figma to overlay text on AI-generated backgrounds

---

## Next Action

Choose your method and create both versions, then:
1. Pick your favorite (or A/B test both)
2. Optimize and place in `public/images/og-image.png`
3. Deploy to Vercel
4. Test social media previews

Good luck! 🎨
