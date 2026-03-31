#!/usr/bin/env node

/**
 * Generate OG images from HTML templates using Puppeteer
 *
 * Usage:
 *   node scripts/generate-og-images.js
 *
 * Requires:
 *   npm install -D puppeteer
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const VIEWPORT = { width: 1200, height: 630 };
const OUTPUT_DIR = path.join(__dirname, '../public/images');

async function generateScreenshot(htmlPath, outputPath, name) {
  console.log(`\n🎨 Generating ${name}...`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);

    // Convert to file:// URL
    const fileUrl = `file://${path.resolve(htmlPath)}`;
    console.log(`   Loading: ${fileUrl}`);

    await page.goto(fileUrl, {
      waitUntil: 'networkidle0',
      timeout: 10000
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');
    await new Promise(resolve => setTimeout(resolve, 1000));

    await page.screenshot({
      path: outputPath,
      type: 'png',
      omitBackground: false
    });

    const stats = fs.statSync(outputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`   ✅ Saved: ${outputPath} (${sizeMB}MB)`);

  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('🚀 Generating OG Images from HTML templates\n');
  console.log(`   Viewport: ${VIEWPORT.width}×${VIEWPORT.height}`);
  console.log(`   Output: ${OUTPUT_DIR}`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`   Created directory: ${OUTPUT_DIR}`);
  }

  const templates = [
    {
      name: 'Version 3A (Split Design)',
      html: path.join(__dirname, '../public/og-template-3a.html'),
      output: path.join(OUTPUT_DIR, 'og-image-3a.png')
    },
    {
      name: 'Version 8B (Modern Geometric)',
      html: path.join(__dirname, '../public/og-template-8b.html'),
      output: path.join(OUTPUT_DIR, 'og-image-8b.png')
    }
  ];

  for (const template of templates) {
    if (!fs.existsSync(template.html)) {
      console.error(`\n❌ Template not found: ${template.html}`);
      continue;
    }
    await generateScreenshot(template.html, template.output, template.name);
  }

  console.log('\n✨ Done! Choose your favorite and rename it to og-image.png\n');
}

// Check if Puppeteer is installed
try {
  require.resolve('puppeteer');
  main().catch(console.error);
} catch (e) {
  console.error('\n❌ Puppeteer not installed!');
  console.error('\nInstall it with:');
  console.error('   npm install -D puppeteer\n');
  console.error('Then run:');
  console.error('   node scripts/generate-og-images.js\n');
  process.exit(1);
}
