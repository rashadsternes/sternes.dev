# Nano Banana (Gemini Image Generation) Guide

**Nano Banana** = Gemini's native image generation capability (Imagen 3 models)

---

## 🍌 How to Access Nano Banana

### Method 1: Google AI Studio (Easiest, Free Tier Available)

1. **Go to:** https://aistudio.google.com/
2. **Sign in** with your Google account
3. **Click:** "Create new" → "Freeform prompt"
4. **Select model dropdown** → Look for models with "🍌" emoji or "Image" in name:
   - **Nano Banana 2** (Gemini 3.1 Flash Image) - Fastest, good quality
   - **Nano Banana Pro** (Gemini 3 Pro Image) - Highest quality, slower
   - **Nano Banana** (Gemini 2.5 Flash Image) - Balanced
5. **Enable image generation** by clicking "🍌 Create images" in tools menu
6. **Paste prompt** and generate!

**Pricing (as of 2026):**
- No completely free tier for image generation
- Starts at ~$0.02-0.04 per image
- You get initial credits to test

---

### Method 2: Gemini Chat (gemini.google.com)

1. **Go to:** https://gemini.google.com/
2. **Look for "🍌 Create images"** button in the interface
3. **Click it** to enable image generation mode
4. **Paste your prompt** and generate

---

### Method 3: API Integration (For Developers)

**Official Docs:** https://ai.google.dev/gemini-api/docs/image-generation

```javascript
// Example using Gemini API
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-image" });

const result = await model.generateContent({
  contents: [{
    parts: [{
      text: "Your prompt here..."
    }]
  }]
});
```

---

## 🎨 Optimized Prompts for Nano Banana

### For Version 3A - Split Design OG Image

**Copy this entire prompt into Gemini/AI Studio:**

```
Create a professional website OG image, social media banner format, exactly 1200 pixels wide by 630 pixels tall, horizontal landscape orientation.

LAYOUT - Split screen design:

LEFT SECTION (occupies 40% of width, full height):
Background: Rich forest green color, use hex code #2D4A3E, add sophisticated diagonal gradient fading to darker shade #1A3127
Texture: Apply subtle noise grain texture overlay at 10% opacity for premium paper feel
Pattern: Include 12-15 thin circular ring shapes in slightly lighter green #3D5A4E at 15% opacity, varying sizes between 50-150 pixels, randomly scattered for modern geometric effect
Typography: Centered white text "STERNES.DEV" in elegant serif font (Playfair Display or similar), 48px size, bold weight, 3px letter spacing, crisp and sharp

RIGHT SECTION (occupies 60% of width, full height):
Background: Warm off-white cream color #FAF9F6, add very subtle radial gradient with lighter center
Texture: Add barely visible linen or paper texture at 5% opacity
Main headline: "Website Design That Works" in two lines, bold serif font, 64px size, dark forest green #2D4A3E, positioned 180px from top edge, 60px left margin
Add subtle drop shadow to headline: 2px offset, black at 8% opacity, 4px blur
Body text: "Beautiful websites that attract customers and grow your business" in sans-serif font (Inter or DM Sans), 30px size, medium gray #666666, 1.5 line height, positioned 60px below headline, same left margin
Optional accent: Thin horizontal line above headline, 2px thick, sage green #7FB685, 60px wide

OVERALL STYLE:
Premium corporate aesthetic, high-end web design, professional but not boring, clean visual hierarchy, balanced composition, modern and sophisticated, think Stripe or Linear quality design

TECHNICAL REQUIREMENTS:
Exact dimensions 1200x630 pixels, high resolution output, crisp typography with anti-aliasing, export-ready PNG format, all text must be perfectly readable, maintain exact color codes provided
```

---

### For Version 8B - Modern Geometric OG Image

**Copy this entire prompt into Gemini/AI Studio:**

```
Create a professional website OG image, social media banner format, exactly 1200 pixels wide by 630 pixels tall, horizontal landscape orientation.

LAYOUT - Asymmetric design with geometric accent:

FULL BACKGROUND:
Base color: Soft cream off-white #FEFEFE
Add subtle radial gradient: pure white #FFFFFF in center, fading to cream at edges
Texture: Apply fine paper grain texture overlay at 8% opacity for premium feel
Lighting: Soft ambient lighting effect, slightly warmer tone

TEXT CONTENT (positioned left side, occupying 60% of width):
Brand name: "STERNES.DEV" positioned 80px from left edge, 120px from top, serif font, 42px size, dark forest green #2D4A3E, bold weight, 5px letter spacing, uppercase
Add subtle drop shadow: 1px offset, black at 6% opacity, 2px blur

Main headline: "Modern Website Design" positioned 80px from left edge, 220px from top, bold serif font (Playfair Display or similar), 68px size, dark forest green #2D4A3E, 1.1 line height
Add subtle drop shadow: 2px offset, black at 8% opacity, 4px blur

Body text: "Professional websites that make your business look its best" positioned 80px from left, 390px from top, sans-serif font (Inter or DM Sans), 32px size, refined gray #555555, 1.5 line height, maximum width 600px

GEOMETRIC SHAPES (positioned bottom-right corner):
Create three overlapping triangular shapes with sophisticated visual effects:

Large triangle:
- Right-angled triangle, point facing top-left
- Base size approximately 400x400 pixels
- Position: bottom-right corner, touching edges
- Fill: Gradient from rich forest green #2D4A3E at bottom to medium forest green #3D5A4E at top
- Effect: Add soft outer glow, same green at 20% opacity, 15px spread
- Texture: Subtle noise grain inside shape at 5% opacity

Medium triangle:
- Right-angled triangle, point facing top-left
- Base size approximately 280x280 pixels
- Position: Overlapping large triangle, offset 60px up and 80px left
- Fill: Gradient from sage green #4A7C59 at bottom to lighter sage #5FB674 at top
- Opacity: 90%
- Effect: Soft outer glow at 18% opacity, 12px spread
- Texture: Subtle grain at 5% opacity
- Shadow: Add soft drop shadow where it overlaps large triangle, black at 10% opacity, 8px blur

Small triangle:
- Right-angled triangle, point facing down-left
- Base size approximately 160x160 pixels
- Position: Top-right area, 200px from right edge, 280px from bottom
- Fill: Gradient from light mint #7FB685 at bottom to lighter mint #9FCAA0 at top
- Opacity: 80%
- Effect: Soft outer glow at 15% opacity, 10px spread
- Texture: Subtle grain at 5% opacity

FINISHING TOUCHES:
Add subtle vignette effect: darken outer edges by 5%
Professional color grading: boost saturation on green tones by 10%, add 2% warm temperature
Ensure all geometric shapes feel three-dimensional through gradients and glows while maintaining flat design aesthetic

OVERALL STYLE:
Contemporary tech brand, sophisticated and modern, high-end design (Apple, Figma, or Notion quality), clean minimalism with intentional visual interest, professional with creative flair, balanced negative space, breathable composition

TECHNICAL REQUIREMENTS:
Exact dimensions 1200x630 pixels, high resolution output, crisp typography with perfect anti-aliasing, export-ready PNG format, all text perfectly readable, maintain exact color codes and positioning specified
```

---

## 🎯 Simplified Prompts (If Above Are Too Long)

### Version 3A - Simplified:

```
Professional OG image 1200x630px. Split design: Left 40% dark green (#2D4A3E) gradient with white "STERNES.DEV" centered and subtle circle patterns. Right 60% cream (#FAF9F6) with dark green headline "Website Design That Works" and gray body text "Beautiful websites that attract customers and grow your business". Add subtle textures, shadows for depth. Modern corporate premium style, high-end web design aesthetic.
```

### Version 8B - Simplified:

```
Professional OG image 1200x630px. Cream background. Left-aligned: "STERNES.DEV" small, "Modern Website Design" large headline, body text about professional websites, all dark green/gray. Bottom-right: Three layered triangles with green gradients (#2D4A3E, #4A7C59, #7FB685), soft glows, overlapping. Add subtle textures, shadows, vignette. Contemporary tech brand style, sophisticated minimal.
```

---

## 💡 Tips for Nano Banana Success

### Text Accuracy:
- Nano Banana can struggle with exact text
- If text is wrong, regenerate 2-3 times
- Or specify: "CRITICAL: Text must be exactly: [list exact text]"

### Use Reference Mode:
- Upload your reference PNG (`og-image-3a.png` or `og-image-8b.png`)
- Add to prompt: "Using attached image as layout reference, enhance visual quality while keeping exact layout and text"

### Aspect Ratio:
- Specify "1200x630 pixels" multiple times in prompt
- Or use "horizontal landscape social media banner format"
- Some interfaces let you select aspect ratio - choose "16:9" or "1.91:1"

### Quality Settings:
- If available, select highest quality/resolution
- Choose "Nano Banana Pro" for best results (slower but higher quality)
- Use "Nano Banana 2" for faster generation with good quality

### Iteration:
- Generate 3-4 variations
- Pick the best one
- Use "Variations" feature if available to refine

---

## 🚨 Common Issues & Fixes

**Text is wrong or misspelled:**
- Add at start: "EXACT TEXT REQUIRED: [list all text]"
- Or generate without text, add in Figma later

**Wrong dimensions:**
- State multiple times: "exactly 1200 pixels wide by 630 pixels tall"
- After generation, crop/resize in Figma to exact size

**Colors don't match:**
- Include hex codes: #2D4A3E, #FAF9F6, etc.
- Add: "use exact hex color codes provided"

**Too busy/cluttered:**
- Add: "clean, minimal, professional, not busy"
- Reduce effect opacities: "subtle textures at 5-8% opacity"

**Layout is off:**
- Upload reference image
- Add: "maintain exact layout structure from reference"

---

## 📋 Step-by-Step Workflow

1. **Choose your version** (3A or 8B)
2. **Go to AI Studio** or Gemini Chat
3. **Select Nano Banana model** (Pro for quality, 2 for speed)
4. **Paste the prompt** (use detailed or simplified version)
5. **Optional:** Upload reference PNG for layout guidance
6. **Generate** (may take 30-60 seconds)
7. **Regenerate 2-3 times** if needed
8. **Download best version**
9. **Verify dimensions** (should be 1200×630)
10. **Save as** `public/images/og-image.png`

---

## 🔗 Helpful Resources

- **Google AI Studio:** https://aistudio.google.com/
- **Gemini Chat:** https://gemini.google.com/
- **API Docs:** https://ai.google.dev/gemini-api/docs/image-generation
- **Nano Banana Launch:** https://blog.google/innovation-and-ai/products/nano-banana-pro/

---

## 💰 Pricing Reference (2026)

- **Nano Banana 2** (Gemini 3.1 Flash Image): ~$0.02/image
- **Nano Banana Pro** (Gemini 3 Pro Image): ~$0.04/image
- **Nano Banana** (Gemini 2.5 Flash Image): ~$0.03/image

You'll get some initial credits to test. For 2 OG images, cost is negligible ($0.04-0.08 total).

---

Your reference images (`og-image-3a.png` and `og-image-8b.png`) are ready to upload as layout references! 🍌
