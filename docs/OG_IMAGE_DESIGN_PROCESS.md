# OG Image Design Process

Complete documentation for creating professional OG images in the Sternes.dev style.

---

## 🎨 Final Design Overview

**What We Created:**
- 1200×630px OG image (social media preview)
- Geometric triangle background (Canva-generated)
- Site-matching typography overlay (HTML/CSS)
- Modern, sophisticated, professional aesthetic

**Key Success Factors:**
- Used actual site typography (Fraunces 200 weight + DM Sans)
- Geometric shapes for modern feel
- Light font weight for elegance
- Italic accents for sophistication
- Perfect brand consistency

---

## 📐 Step-by-Step Process

### **Phase 1: Create Geometric Background in Canva**

#### **1. Setup Canvas**
- Go to https://www.canva.com/
- Create custom size: **1200 × 630 pixels**
- This is the exact OG image dimension

#### **2. Background**
- Fill with soft cream/beige color
- Suggested: `#F5F3ED` or `#EDE8E0`
- Use solid color or very subtle gradient (cream to white)

#### **3. Add Geometric Triangles**

**In Canva:**
- Left sidebar → **"Elements"**
- Search: **"triangle"**
- Select solid triangle shape

**Triangle Placement Strategy:**
- Position in **bottom-right corner**
- Create **5-6 triangles** of varying sizes
- Overlap them to create depth
- Vary opacity: 80-100%

**Triangle Sizes (from largest to smallest):**
1. **Largest**: ~450px base, bottom-right corner, touching edges
2. **Large**: ~380px base, offset up and left
3. **Medium**: ~280px base, overlapping
4. **Small**: ~180px base, upper right area
5. **Tiny accents**: 80-120px, fill gaps, very light opacity

**Color Palette (Green Gradient):**
- **Darkest**: `#2D4A3E` (forest green)
- **Dark**: `#3D5A4E`
- **Medium**: `#5C9D7F` (sage green)
- **Light**: `#7FB685` (mint green)
- **Lightest**: `#A4D4AE` (pale mint)

**Pro Tips:**
- Larger triangles = darker greens
- Smaller triangles = lighter greens
- Creates natural depth perception
- Use 85-95% opacity on middle triangles for layering effect
- Keep triangles in bottom-right 40% of canvas
- Leave left 60% completely clear for text

#### **4. Add Texture (Optional)**

**For Premium Feel:**
- Elements → Search **"grain texture"** or **"noise"**
- Drag over entire canvas
- Set blend mode to **"Multiply"** or **"Overlay"**
- Opacity: **5-8%** (very subtle)
- Gives paper-like quality

#### **5. Export Background**

- Click **"Share"** → **"Download"**
- File type: **PNG**
- Quality: **Highest**
- Save as: `canva-background.png`

**Important:** This is just the background layer. We'll add typography separately for better control.

---

### **Phase 2: Add Typography (HTML Overlay Method)**

#### **Why HTML Instead of Canva Text?**

**Advantages:**
- ✅ Exact font matching (Fraunces, DM Sans from your site)
- ✅ Precise typography control (weight, spacing, line height)
- ✅ Perfect pixel positioning
- ✅ Easy to iterate and adjust
- ✅ Professional quality rendering

**Process:**
1. Create HTML file with your Canva background as background image
2. Overlay text with exact site typography
3. Screenshot at 1200×630 to generate final PNG

#### **HTML Template Structure**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,200;1,200&family=DM+Sans:wght@300;400&display=swap" rel="stylesheet">
  <style>
    body {
      width: 1200px;
      height: 630px;
      background-image: url('canva-background.png');
      background-size: cover;
    }
    /* Typography styles here */
  </style>
</head>
<body>
  <div class="content">
    <!-- Text content here -->
  </div>
</body>
</html>
```

#### **Typography Specifications**

**1. Eyebrow Label** (Optional, adds professionalism)
```css
.eyebrow {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 40px;
}
```
Text: "WEBSITE DESIGN" or service category

**2. Brand Name**
```css
.brand {
  font-family: 'Fraunces', serif;
  font-weight: 200;              /* Ultra-light = elegant */
  font-size: 42px;
  color: #111;
  letter-spacing: -0.01em;       /* Tight = modern */
  text-transform: uppercase;
  margin-bottom: 70px;
}
```
Text: "STERNES.DEV"

**3. Main Headline**
```css
.headline {
  font-family: 'Fraunces', serif;
  font-weight: 200;              /* Same light weight */
  font-size: 56px;
  color: #111;
  line-height: 1.15;             /* Tight line height */
  letter-spacing: -0.01em;
  margin-bottom: 50px;
  max-width: 580px;
}
```

**4. Italic Accent (Second Line)**
```css
.headline-accent {
  font-style: italic;            /* Adds sophistication */
  color: #555;                   /* Lighter gray */
}
```

**Example Headline HTML:**
```html
<h2 class="headline">
  Modern websites<br>
  <span class="headline-accent">that make your business look its best</span>
</h2>
```

**5. Body Text** (Optional)
```css
.body-text {
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
  font-size: 20px;
  color: #444;
  line-height: 1.6;
  max-width: 550px;
}
```

#### **Layout & Spacing**

**Padding:**
```css
.content {
  padding: 100px 80px;  /* Top/bottom: 100px, Left/right: 80px */
}
```

**Vertical Rhythm:**
- Eyebrow to Brand: 40px gap
- Brand to Headline: 70px gap
- Headline to Body: 50px gap

**Text Alignment:**
- All text: **Left-aligned**
- Consistent left margin: 80px
- Creates strong vertical line
- Balances geometric shapes on right

---

### **Phase 3: Export Final Image**

#### **Method 1: Browser Screenshot (Recommended)**

**Using Chrome DevTools:**
1. Open HTML file in Chrome
2. Press `F12` (open DevTools)
3. Press `Cmd+Shift+M` (toggle device toolbar)
4. Set viewport: **1200 × 630**
5. Right-click page → **"Capture screenshot"**
6. Save as: `og-image.png`

**Using Puppeteer Script:**
```bash
node scripts/screenshot-final.js
```
Automatically generates PNG at exact dimensions.

#### **Method 2: Canva Direct (Alternative)**

If you want to do everything in Canva:
1. Use Canva background you created
2. Add text manually in Canva
3. Use fonts: **Playfair Display** (closest to Fraunces) + **Inter** (closest to DM Sans)
4. Match sizes and spacing as closely as possible
5. Export as PNG

**Drawbacks:**
- Less precise typography control
- May not match site fonts exactly
- Harder to iterate

---

## 🎨 Design Principles & Rules

### **Typography Philosophy**

**1. Ultra-Light Weight = Modern Elegance**
- Use Fraunces weight 200 (not 400, not 700)
- Creates sophisticated, contemporary feel
- Matches geometric shapes better than bold
- Light serif = refined, not traditional

**2. Italic for Accent**
- Second line of headline in italic
- Different color (gray vs. black)
- Adds visual interest without clutter
- Mirrors your site's exact style

**3. Tight Letter Spacing**
- `-0.01em` on headlines
- Modern, intentional feel
- Not loose/generic

**4. Consistent Font Pairing**
- **Serif (Fraunces)**: Headlines, brand, important text
- **Sans (DM Sans)**: Labels, body, supporting text
- Never mix serif families

### **Color Philosophy**

**1. Text Colors (Grayscale Palette)**
- Primary text: `#111` (near black)
- Accent text: `#555` (medium gray)
- Labels: `#999` (light gray)
- Subtle, sophisticated hierarchy

**2. Geometric Colors (Green Palette)**
- Dark to light progression
- Darker = closer/larger
- Lighter = farther/smaller
- Natural depth perception

**3. Background**
- Warm cream/beige (not pure white)
- `#F5F3ED` or similar
- Feels premium, not stark

### **Layout Philosophy**

**1. Asymmetric Balance**
- Text: Left 60%
- Shapes: Right 40%
- Creates visual tension (good!)
- Modern, not centered/symmetrical

**2. Breathing Room**
- Generous padding (100px top, 80px sides)
- Negative space between text and shapes
- Don't crowd the composition

**3. Visual Weight**
- Heavy: Geometric shapes (colorful, complex)
- Light: Typography (minimal, elegant)
- Balance through contrast

---

## 📝 Content Writing Guidelines

### **Headline Formula**

**Pattern:**
```
[Action/Descriptor]
[Benefit/Outcome in italic]
```

**Examples:**
- "Modern websites" + "_that make your business look its best_"
- "Website design" + "_that actually works for you_"
- "Beautiful solutions" + "_for complex business problems_"

**Rules:**
- First line: 2-3 words, strong, direct
- Second line: Benefit-focused, in italic
- Keep total under 50 characters
- Break at natural pause point

### **Eyebrow Labels**

**Purpose:** Context/category without cluttering

**Examples:**
- "WEBSITE DESIGN"
- "WEB DEVELOPMENT"
- "AI INTEGRATION"
- "FULL-STACK ENGINEERING"

**Rules:**
- Uppercase
- Wide letter spacing (0.25em)
- Very small (10px)
- Short (1-3 words)

---

## 🎯 Quality Checklist

Before finalizing your OG image:

### **Technical:**
- [ ] Exact dimensions: 1200×630 pixels
- [ ] File format: PNG
- [ ] File size: Under 1MB (ideally 150-300KB)
- [ ] Color mode: RGB (not CMYK)
- [ ] All fonts loaded and rendering correctly

### **Design:**
- [ ] Text is clearly readable at small sizes
- [ ] Good contrast between text and background
- [ ] Geometric shapes don't overlap text
- [ ] Composition feels balanced (not lopsided)
- [ ] Matches your site's brand/aesthetic
- [ ] Professional, not amateur or cluttered

### **Typography:**
- [ ] Using site fonts (Fraunces + DM Sans)
- [ ] Correct font weights (200 for Fraunces)
- [ ] Tight letter spacing (-0.01em on headlines)
- [ ] Italic accent on second line
- [ ] Proper hierarchy (eyebrow → brand → headline)
- [ ] No widows/orphans (awkward line breaks)

### **Content:**
- [ ] Headline is clear and benefit-focused
- [ ] Grammar and spelling are correct
- [ ] Message resonates with target audience
- [ ] Brand name is visible and legible
- [ ] Copy is concise (not too wordy)

---

## 🔄 Iteration Process

### **How to Make Variations:**

**1. Different Headlines:**
- Keep same background and typography
- Just change text content
- Export new version

**2. Different Color Palettes:**
- Swap green triangles for blue, purple, orange, etc.
- Keep same structure
- Match your seasonal campaigns or offers

**3. Different Geometric Patterns:**
- Try circles instead of triangles
- Squares/rectangles for tech feel
- Organic blobs for creative feel
- Keep same layout principle (right side accent)

**4. Seasonal/Campaign Versions:**
- Add small seasonal element (snowflake, leaf)
- Adjust colors for holidays
- Keep core layout consistent

---

## 🛠️ Tools & Resources

### **Design Tools:**
- **Canva** (free): Geometric background creation
- **Chrome DevTools**: Screenshot at exact dimensions
- **Puppeteer** (code): Automated screenshot generation

### **Fonts:**
- **Fraunces**: https://fonts.google.com/specimen/Fraunces
  - Use weight: 200, 400
  - Italic variants
- **DM Sans**: https://fonts.google.com/specimen/DM+Sans
  - Use weight: 300, 400

### **Testing Tools:**
- **Open Graph Debugger**: https://www.opengraph.xyz/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

### **Color Palette:**
```
Dark Forest Green:   #2D4A3E
Medium Forest:       #3D5A4E
Sage Green:          #5C9D7F
Mint Green:          #7FB685
Pale Mint:           #A4D4AE
Cream Background:    #F5F3ED
Dark Text:           #111
Medium Gray Text:    #555
Light Gray Label:    #999
```

---

## 📦 File Organization

**Recommended structure:**
```
/public/images/
  og-image.png              # Final production OG image
  canva-background.png      # Geometric background only
  og-image-final.png        # Backup/working version

/public/
  og-final-site-typography.html   # HTML template with typography

/docs/
  OG_IMAGE_DESIGN_PROCESS.md      # This document
  REQUIRED_ASSETS.md              # Asset specifications
```

---

## 💡 Pro Tips

### **Typography:**
1. **Never use all-caps for body text** - hard to read
2. **Keep headlines under 50 characters** - optimal for social previews
3. **Use italic sparingly** - just for accent/emphasis
4. **Test at thumbnail size** - should be readable at 300px wide

### **Design:**
1. **Limit color palette** - 3-5 colors max
2. **More negative space = more premium** - don't fill every pixel
3. **Asymmetry = modern** - symmetry = traditional
4. **Texture is subtle** - 5-10% opacity, not obvious

### **Process:**
1. **Create background first** - get shapes right before typography
2. **Add text separately** - easier to iterate
3. **Screenshot > manual export** - guarantees exact dimensions
4. **Save template** - reuse for future OG images

### **Testing:**
1. **View at small size** - most people see OG images at 400-600px wide
2. **Test on mobile** - check how it looks in mobile share previews
3. **Share privately first** - test before public launch
4. **Check multiple platforms** - Twitter, LinkedIn, Facebook render differently

---

## 🚀 Quick Reference

**TL;DR - The Formula:**

1. **Canva**: Create geometric triangle background (1200×630, cream + green gradient)
2. **HTML**: Overlay ultra-light Fraunces typography with italic accents
3. **Screenshot**: Capture at exact 1200×630 dimensions
4. **Deploy**: Save as `/public/images/og-image.png`

**Success Criteria:**
- ✅ Matches your site's typography exactly (Fraunces 200 + DM Sans)
- ✅ Modern geometric aesthetic (triangles, not traditional)
- ✅ Light, elegant feel (not heavy/bold)
- ✅ Professional and sophisticated (not amateur)
- ✅ Perfect brand consistency

---

**Last Updated:** March 30, 2026
**Version:** 1.0
**Design:** Sternes.dev OG Image System
