#!/usr/bin/env node

const puppeteer = require('puppeteer');
const path = require('path');

async function screenshot() {
  console.log('🔷 Generating squircle favicon...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 180, height: 180 });

    const htmlPath = path.join(__dirname, '../public/squircle-canvas.html');
    const fileUrl = `file://${htmlPath}`;

    console.log(`Loading: ${fileUrl}`);
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 1000));

    const outputPath = path.join(__dirname, '../public/apple-touch-icon.png');
    await page.screenshot({
      path: outputPath,
      type: 'png',
      omitBackground: true  // This creates transparency
    });

    console.log(`✅ Saved: ${outputPath}\n`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  } finally {
    await browser.close();
  }
}

screenshot();
