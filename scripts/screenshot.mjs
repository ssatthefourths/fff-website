import puppeteer from 'puppeteer-core';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SCREENSHOTS_DIR = join(ROOT, 'SCREENSHOTS');

if (!existsSync(SCREENSHOTS_DIR)) mkdirSync(SCREENSHOTS_DIR, { recursive: true });

const DATE = new Date().toISOString().slice(0, 10);
const BASE_URL = process.env.SCREENSHOT_URL || 'http://localhost:5173';
const LABEL = process.argv[2] || 'FULL_PAGE';
const STATE = process.argv[3] || 'BEFORE';

const SECTIONS = [
  { name: 'NAV', selector: '[data-name="NAV SECTION"]' },
  { name: 'HERO', selector: '[data-name="HERO SECTION"]' },
  { name: 'REVIEWS', selector: '[data-name="REVIEWS SECTION"]' },
  { name: 'SHOP_COLLECTIONS', selector: '[data-name="SHOP COLLECTIONS SECTION"]' },
  { name: 'CTA_HONEY_TEDDY', selector: '[data-name="CTA HONEY TEDDY SECTION"]' },
  { name: 'ABOUT', selector: '[data-name="ABOUT SECTION"]' },
  { name: 'FEATURE', selector: '[data-name="FEATURE SECTION"]' },
  { name: 'CTA_FREE_PATTERN', selector: '[data-name="CTA FREE PATTERN"]' },
  { name: 'MAKER_OF_MONTH', selector: '[data-name="MAKER OF THE MONTH SECTION"]' },
  { name: 'FREE_STUFF', selector: '[data-name="FREE STUFF SECTION"]' },
  { name: 'BLOG', selector: '[data-name="BLOG SECTION"]' },
  { name: 'FOOTER', selector: '[data-name="FOOTER SECTION"]' },
];

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // Desktop full-page screenshot
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 5000));

  const fullPath = join(SCREENSHOTS_DIR, `${LABEL}_${STATE}_${DATE}_desktop.png`);
  await page.screenshot({ path: fullPath, fullPage: true });
  console.log(`Saved: ${fullPath}`);

  // Mobile full-page screenshot (Pixel 7 size)
  await page.setViewport({ width: 412, height: 915, deviceScaleFactor: 2 });
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 5000));
  const mobilePath = join(SCREENSHOTS_DIR, `${LABEL}_${STATE}_${DATE}_mobile.png`);
  await page.screenshot({ path: mobilePath, fullPage: true });
  console.log(`Saved: ${mobilePath}`);

  // Per-section screenshots (desktop only)
  await page.setViewport({ width: 1440, height: 900 });
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 5000));

  for (const section of SECTIONS) {
    try {
      const el = await page.$(section.selector);
      if (el) {
        const sectionPath = join(SCREENSHOTS_DIR, `${section.name}_${STATE}_${DATE}.png`);
        await el.screenshot({ path: sectionPath });
        console.log(`Saved: ${sectionPath}`);
      } else {
        console.warn(`Section not found: ${section.name} (${section.selector})`);
      }
    } catch (err) {
      console.warn(`Failed to screenshot ${section.name}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('\nAll screenshots complete.');
}

run().catch(err => { console.error(err); process.exit(1); });
