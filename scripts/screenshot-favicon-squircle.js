#!/usr/bin/env node

const puppeteer = require('puppeteer');
const path = require('path');

async function screenshot() {
  console.log('🔷 Generating SQUIRCLE favicon for browser...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Create 32x32 squircle for favicon
    await page.setViewport({ width: 32, height: 32 });

    const htmlPath = path.join(__dirname, '../public/squircle-canvas.html');
    const fileUrl = `file://${htmlPath}`;

    console.log(`Loading: ${fileUrl}`);
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 1000));

    const outputPath = path.join(__dirname, '../public/favicon-32x32.png');
    await page.screenshot({
      path: outputPath,
      type: 'png',
      omitBackground: true
    });

    console.log(`✅ Saved 32x32 squircle: ${outputPath}\n`);

    // Also create 16x16
    await page.setViewport({ width: 16, height: 16 });
    const outputPath16 = path.join(__dirname, '../public/favicon-16x16.png');
    await page.screenshot({
      path: outputPath16,
      type: 'png',
      omitBackground: true
    });

    console.log(`✅ Saved 16x16 squircle: ${outputPath16}\n`);

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  } finally {
    await browser.close();
  }
}

screenshot();
