# AI Image Generator Prompts - Ready to Copy/Paste

Use these prompts with your preferred AI image generator. Optimized for all major platforms.

---

## 🎨 VERSION 3A - Split Design with Gradient

### For ChatGPT (DALL-E 3) - Copy this entire prompt:

```
Create a professional website OG image, exactly 1200 pixels wide by 630 pixels tall.

LEFT SECTION (40% of width):
- Dark green gradient background, color code #2D4A3E fading to #234134
- Centered white text reading "STERNES.DEV" in bold serif font, 48px size
- Subtle decorative circles in the background, barely visible, creating texture

RIGHT SECTION (60% of width):
- Clean off-white background, color code #FEFEFE
- Top headline: "Website Design That Works" in dark green #2D4A3E, bold serif font, 64px
- Body text below: "Beautiful websites that attract customers and grow your business" in medium gray #555555, sans-serif font, 30px

Overall style: Modern corporate, professional, clean split-screen layout, high contrast between sections
```

---

### For Midjourney - Copy this prompt:

```
professional website social media banner, 1200x630 pixels, split screen design, left side dark forest green gradient #2D4A3E with centered white serif text "STERNES.DEV" and subtle circle pattern, right side cream white background with dark green serif headline "Website Design That Works" and gray sans-serif body text, modern corporate aesthetic, clean minimal layout, high quality typography --ar 1200:630 --style raw --v 6
```

---

### For Ideogram / Leonardo / Flux - Copy this prompt:

```
Professional OG image 1200x630px. Two-section layout: LEFT (40%) dark green #2D4A3E gradient background, white "STERNES.DEV" text centered, decorative circles. RIGHT (60%) cream #FEFEFE background, dark green heading "Website Design That Works", gray subtext "Beautiful websites that attract customers and grow your business". Modern, professional, corporate web design style. Clean typography.
```

---

## 🎨 VERSION 8B - Modern Geometric Design

### For ChatGPT (DALL-E 3) - Copy this entire prompt:

```
Create a professional website OG image, exactly 1200 pixels wide by 630 pixels tall.

BACKGROUND: Clean off-white color #FEFEFE across entire image

LEFT SIDE TEXT (taking up 60% of space):
- Top: "STERNES.DEV" in dark green #2D4A3E, bold serif font, 42px, extra letter spacing
- Middle: "Modern Website Design" in dark green #2D4A3E, bold serif font, 68px
- Bottom: "Professional websites that make your business look its best" in gray #555555, sans-serif font, 32px

RIGHT SIDE DECORATION (bottom right corner):
- Three overlapping triangular shapes creating abstract geometric pattern
- Largest triangle: dark green #2D4A3E
- Medium triangle: lighter green #4A7C59
- Small triangle: lightest green #7FB685
- Layered and overlapping for modern depth effect

Overall style: Contemporary, sophisticated, minimal, professional tech website aesthetic
```

---

### For Midjourney - Copy this prompt:

```
professional website social media banner, 1200x630 pixels, cream background, left-aligned text layout with "STERNES.DEV" small and "Modern Website Design" large in dark green serif font, gray body text, bottom-right corner has abstract layered triangle shapes in green gradient #2D4A3E to #7FB685, modern minimalist tech aesthetic, sophisticated typography, clean negative space, contemporary corporate design --ar 1200:630 --style raw --v 6
```

---

### For Ideogram / Leonardo / Flux - Copy this prompt:

```
Professional OG image 1200x630px. Cream #FEFEFE background. Left-aligned layout: "STERNES.DEV" small dark green text, "Modern Website Design" large dark green #2D4A3E serif headline, gray #555555 body text about professional websites. Bottom-right corner: abstract geometric layered triangles in green gradient colors #2D4A3E, #4A7C59, #7FB685. Modern minimalist, sophisticated, contemporary web design aesthetic.
```

---

## 🎯 Tips for Best Results

### If AI struggles with text:
1. Generate background/layout without text
2. Use Figma/Canva to overlay text manually
3. Or use the HTML screenshot method instead

### If colors are off:
- Mention "use exact hex colors" in prompt
- Try adding "flat design, no gradients on text"
- Use color picker tool to verify after generation

### If dimensions are wrong:
- Most AI tools will crop to ratio - download largest size
- Resize to exactly 1200×630 in Figma or Photoshop
- Or use ImageMagick: `magick input.png -resize 1200x630! output.png`

### Getting blurry text:
- Request "sharp typography, high resolution"
- Download highest quality available
- Upscale if needed at https://bigjpg.com/ or https://upscale.media/

---

## 🚀 Quick Start

**Easiest path:**
1. Copy Version 3A ChatGPT prompt
2. Paste into ChatGPT
3. Download image
4. Save as `public/images/og-image.png`
5. Done!

**Or use the HTML templates (guaranteed perfect):**
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Cmd+Shift+M)
3. Set dimensions to 1200×630
4. Visit: `http://localhost:3000/og-template-3a.html` (with dev server running)
5. Right-click → Capture screenshot
6. Save as `public/images/og-image.png`

---

## 📦 Automated Screenshot (Requires Puppeteer)

If you want to automate screenshots:

```bash
# Install Puppeteer
npm install -D puppeteer

# Run the script
node scripts/generate-og-images.js

# Both versions will be saved to public/images/
```

Choose your favorite and rename to `og-image.png`!

---

Good luck! Both designs will look great. 🎨
