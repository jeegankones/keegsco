/**
 * Renders scripts/og-template.html to public/og.png at 1200x630 — the size
 * Open Graph, Twitter/X, Slack, and iMessage all render as a large card.
 *
 * Run with `npm run og` after editing the template. The PNG is committed, so
 * the build and deploy stay a plain static build with no render step.
 */
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const WIDTH = 1200;
const HEIGHT = 630;

const here = path.dirname(fileURLToPath(import.meta.url));
const template = path.join(here, 'og-template.html');
const out = path.join(here, '..', 'public', 'og.png');

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  // 2x so the card stays crisp on retina previews; still well under the
  // ~1MB that iMessage and Twitter will happily inline.
  deviceScaleFactor: 2,
});

await page.goto(`file://${template}`);
await page.evaluate(() => document.fonts.ready);

await page.screenshot({ path: out, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
await browser.close();

console.log(`Wrote ${path.relative(process.cwd(), out)} (${WIDTH}x${HEIGHT} @2x)`);
