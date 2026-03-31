#!/usr/bin/env node

const puppeteer = require('puppeteer');
const path = require('path');

async function screenshot() {
  console.log('📸 Generating final OG image...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });

    const htmlPath = path.join(__dirname, '../public/og-final-site-typography.html');
    const fileUrl = `file://${htmlPath}`;

    console.log(`Loading: ${fileUrl}`);
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');
    await new Promise(resolve => setTimeout(resolve, 1500));

    const outputPath = path.join(__dirname, '../public/images/og-image-final.png');
    await page.screenshot({
      path: outputPath,
      type: 'png'
    });

    console.log(`✅ Saved: ${outputPath}\n`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  } finally {
    await browser.close();
  }
}

screenshot();
