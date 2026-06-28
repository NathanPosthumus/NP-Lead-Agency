#!/usr/bin/env node
/**
 * Self-test for scrape-maps.mjs.
 *
 * Verifies, WITHOUT touching google.com:
 *   1. The card-extraction selectors correctly pick out businesses and detect
 *      which ones have a website (using a local HTML fixture).
 *   2. The Excel export produces a valid, readable .xlsx with the right rows.
 *
 * Run: node scripts/scrape-maps.test.mjs
 */
import { chromium } from 'playwright';
import ExcelJS from 'exceljs';
import { writeExcel } from './scrape-maps.mjs';
import { existsSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import assert from 'node:assert';

const __dirname = dirname(fileURLToPath(import.meta.url));

function resolveChromium() {
  const c = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
  return existsSync(c) ? c : undefined;
}

// Mirror of extractCards() in scrape-maps.mjs (kept inline so the test exercises
// the exact selector logic in a real browser DOM).
function extractCards() {
  const cards = Array.from(document.querySelectorAll('div[role="feed"] > div > div[jsaction]'));
  return cards
    .map((card) => {
      const link = card.querySelector('a.hfpxzc');
      if (!link) return null;
      const name = link.getAttribute('aria-label') || card.querySelector('.qBF1Pd')?.textContent?.trim() || '';
      if (!name) return null;
      const hasWebsite = !!card.querySelector('a[data-value="Website"]');
      const infoText = Array.from(card.querySelectorAll('.W4Efsd'))
        .map((el) => el.textContent.replace(/\s+/g, ' ').trim())
        .filter(Boolean)
        .join(' · ');
      const rating = card.querySelector('.MW4etd')?.textContent?.trim() || '';
      const reviews = card.querySelector('.UY7F9')?.textContent?.replace(/[()]/g, '').trim() || '';
      const phone = card.querySelector('.UsdlK')?.textContent?.trim() || '';
      return { name, hasWebsite, rating, reviews, info: infoText, phone, mapsUrl: link.href };
    })
    .filter(Boolean);
}

let failures = 0;
const check = (label, fn) => {
  try {
    fn();
    console.log(`  ✓ ${label}`);
  } catch (e) {
    failures += 1;
    console.error(`  ✗ ${label}\n      ${e.message}`);
  }
};

async function run() {
  console.log('Test 1: card extraction from fixture');
  const browser = await chromium.launch({ headless: true, executablePath: resolveChromium() });
  const page = await browser.newPage();
  await page.goto('file://' + join(__dirname, 'fixtures', 'maps-sample.html'));
  const cards = await page.evaluate(extractCards);
  await browser.close();

  check('extracts all 3 businesses', () => assert.equal(cards.length, 3));
  check('detects the one WITH a website', () => assert.equal(cards.filter((c) => c.hasWebsite).length, 1));
  check('detects the two WITHOUT a website', () => assert.equal(cards.filter((c) => !c.hasWebsite).length, 2));

  const noWebsite = cards.filter((c) => !c.hasWebsite);
  check('captures name of a no-website lead', () =>
    assert.ok(noWebsite.some((c) => c.name === 'Daktechniek Janssen')));
  check('captures phone of a no-website lead', () =>
    assert.ok(noWebsite.some((c) => c.phone === '06 12 34 56 78')));
  check('excludes the business that has a website', () =>
    assert.ok(!noWebsite.some((c) => c.name === 'Dakdekkersbedrijf De Vakman')));

  console.log('\nTest 2: Excel export');
  const out = join(__dirname, 'fixtures', '_test-output.xlsx');
  await writeExcel(noWebsite, { query: 'dakdekker', location: 'Amsterdam', output: out });
  check('writes the .xlsx file', () => assert.ok(existsSync(out)));

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(out);
  const sheet = wb.getWorksheet('Leads zonder website');
  check('sheet exists', () => assert.ok(sheet));
  check('header + 2 data rows', () => assert.equal(sheet.rowCount, 3));
  check('first lead name landed in column B', () =>
    assert.equal(sheet.getRow(2).getCell(2).value, 'Daktechniek Janssen'));
  check('website column reads "Nee"', () =>
    assert.equal(sheet.getRow(2).getCell(7).value, 'Nee'));
  rmSync(out, { force: true });

  console.log(`\n${failures === 0 ? 'ALL TESTS PASSED' : failures + ' TEST(S) FAILED'}`);
  process.exit(failures === 0 ? 0 : 1);
}

run().catch((e) => {
  console.error('Test harness error:', e);
  process.exit(1);
});
