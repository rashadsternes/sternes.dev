# Required Assets

This document lists placeholder images referenced in the site metadata that need to be created for production deployment.

## Missing Assets

### 1. Open Graph Image

**Purpose:** Social media preview image (Facebook, LinkedIn, Discord, Slack, etc.)

**Path:** `/public/images/og-image.png`

**Specifications:**
- **Dimensions:** 1200px × 630px (1.91:1 aspect ratio)
- **Format:** PNG (supports transparency if needed)
- **File size:** < 1MB recommended for fast loading
- **Safe zone:** Keep important content within center 1200px × 540px (some platforms crop)

**Content Recommendations:**
- Include "Sternes.dev" branding
- Tagline: "Full-Stack Engineering & AI Integration"
- Location: "Dallas, TX" (optional)
- Use brand colors (suggest: #2D4A3E from manifest theme)
- High contrast for readability in small previews
- Professional, clean design

**Testing URLs:**
- [Open Graph Debugger](https://www.opengraph.xyz/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

### 2. Apple Touch Icon

**Purpose:** iOS home screen icon when users save site to their device

**Path:** `/public/apple-touch-icon.png`

**Specifications:**
- **Dimensions:** 180px × 180px (1:1 square)
- **Format:** PNG
- **Background:** Must have solid background (no transparency - iOS adds its own effects)
- **Padding:** Add ~10% internal padding to prevent icon from being cut off by iOS rounded corners
- **File size:** < 200KB

**Content Recommendations:**
- Simple, recognizable icon or logo
- Works well at small sizes
- High contrast
- No text (too small to read at this size)
- Consider a monogram or abstract symbol representing your brand

**Testing:**
- Test on actual iOS device using Safari → Share → Add to Home Screen
- Verify icon looks good with iOS rounded corners and shadow effects

---

## Current Status

Both assets are referenced in the codebase but not yet created:

- `app/layout.tsx` - References both images in metadata
- `public/manifest.json` - References both images for PWA functionality

**Impact of missing assets:**
- Social media previews will show generic/broken image placeholders
- iOS home screen icon will fall back to website screenshot (lower quality)
- Site will still function normally, but branding/legitimacy will be reduced

---

## Creation Workflow

### Using Design Tools

**Recommended tools:**
- **Figma** - Professional design tool (free tier available)
- **Canva** - Easy drag-and-drop (has social media templates)
- **Adobe Photoshop** - Full control (if available)
- **Sketch** - Mac-only design tool

**Quick workflow:**
1. Create artboards with exact dimensions (1200×630 and 180×180)
2. Design using brand colors and fonts
3. Export as PNG with appropriate compression
4. Optimize with tools like [TinyPNG](https://tinypng.com/) or [ImageOptim](https://imageoptim.com/)
5. Place in correct directories

### Using AI Tools

**Alternative approach:**
- Use AI image generators (DALL-E, Midjourney, Stable Diffusion)
- Create simple, professional branding assets
- Refine and optimize in image editing software

---

## Verification Checklist

After creating assets:

- [ ] Files exist at correct paths
  - [ ] `/public/images/og-image.png`
  - [ ] `/public/apple-touch-icon.png`
- [ ] Dimensions are correct
  - [ ] OG image: 1200×630px
  - [ ] Apple icon: 180×180px
- [ ] File sizes are optimized
  - [ ] OG image < 1MB
  - [ ] Apple icon < 200KB
- [ ] Assets tested with validation tools
  - [ ] Open Graph preview works
  - [ ] Twitter card preview works
  - [ ] LinkedIn preview works
- [ ] Apple touch icon tested on iOS device
- [ ] Images look professional and represent brand

---

## Temporary Workarounds

Until assets are created, you can:

1. **Use a solid color placeholder:**
   - Create 1200×630 PNG with brand color (#2D4A3E)
   - Add white text with site name
   - Better than broken image

2. **Use existing favicon:**
   - Not ideal but prevents completely broken previews
   - Will be very small and low quality

3. **Remove image references:**
   - Comment out `images` arrays in `app/layout.tsx`
   - Platforms will fall back to default behavior (screenshots, generic icons)

**Note:** Proper branded assets significantly improve legitimacy and should be prioritized for production.

---

## Questions?

If you need help creating these assets or have questions about specifications, contact a designer or use the tools listed above to get started.
