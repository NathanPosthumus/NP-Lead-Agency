#!/usr/bin/env node
/**
 * Google Maps lead scraper — finds businesses that do NOT have a website
 * and exports them to an Excel (.xlsx) file.
 *
 * Built for NP-Lead-Agency: a business without a website is a prime lead for a
 * web-design / lead-gen offer.
 *
 * Usage:
 *   node scripts/scrape-maps.mjs --query "dakdekker" --location "Amsterdam" --limit 50
 *   node scripts/scrape-maps.mjs -q "loodgieter" -l "Rotterdam" -n 50 -o leads.xlsx
 *
 * Options:
 *   --query,    -q   Business type to search for      (required)
 *   --location, -l   City / area to search in         (required)
 *   --limit,    -n   How many no-website leads to find (default 50)
 *   --output,   -o   Output .xlsx path                 (default leads-<query>-<location>.xlsx)
 *   --headful        Run with a visible browser window (useful for debugging)
 *
 * NOTE: This must run in an environment with outbound access to google.com.
 * The cloud sandbox used by Claude Code on the web blocks Google, so run it
 * on your own machine: `npm install` then the command above.
 */

import { chromium } from 'playwright';
import ExcelJS from 'exceljs';
import { parseArgs } from 'node:util';
import { existsSync } from 'node:fs';

// ---------------------------------------------------------------------------
// CLI args — parsed only when this file is run directly (see bottom of file),
// so that importing writeExcel() from the test harness does not trigger it.
// ---------------------------------------------------------------------------
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function parseCliArgs() {
  const { values } = parseArgs({
    options: {
      query: { type: 'string', short: 'q' },
      location: { type: 'string', short: 'l' },
      limit: { type: 'string', short: 'n', default: '50' },
      output: { type: 'string', short: 'o' },
      headful: { type: 'boolean', default: false },
    },
  });

  if (!values.query || !values.location) {
    console.error('Error: --query and --location are required.\n');
    console.error('Example: node scripts/scrape-maps.mjs --query "dakdekker" --location "Amsterdam" --limit 50');
    process.exit(1);
  }

  return {
    query: values.query,
    location: values.location,
    limit: Math.max(1, parseInt(values.limit, 10) || 50),
    output: values.output || `leads-${slug(values.query)}-${slug(values.location)}.xlsx`,
    headful: values.headful,
  };
}

// ---------------------------------------------------------------------------
// Locate the pre-installed Chromium (cloud sandbox) or fall back to the one
// Playwright downloaded locally.
// ---------------------------------------------------------------------------
function resolveChromium() {
  const candidates = [
    process.env.PLAYWRIGHT_CHROMIUM_PATH,
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  ].filter(Boolean);
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return undefined; // let Playwright use its own managed browser
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// In-page extraction. Runs inside the browser context. The selectors target
// Google Maps' result-card DOM. Google changes class names occasionally; if
// results come back empty, update the selectors in this function.
// ---------------------------------------------------------------------------
function extractCards() {
  const cards = Array.from(document.querySelectorAll('div[role="feed"] > div > div[jsaction]'));
  return cards
    .map((card) => {
      const link = card.querySelector('a.hfpxzc');
      if (!link) return null;
      const name =
        link.getAttribute('aria-label') ||
        card.querySelector('.qBF1Pd')?.textContent?.trim() ||
        '';
      if (!name) return null;

      // A website link in the card means the business HAS a website.
      const hasWebsite = !!card.querySelector('a[data-value="Website"]');

      // The two info rows under the name hold rating, category, address, phone.
      const infoText = Array.from(card.querySelectorAll('.W4Efsd'))
        .map((el) => el.textContent.replace(/\s+/g, ' ').trim())
        .filter(Boolean)
        .join(' · ');

      const rating = card.querySelector('.MW4etd')?.textContent?.trim() || '';
      const reviews = card.querySelector('.UY7F9')?.textContent?.replace(/[()]/g, '').trim() || '';

      // Phone numbers appear as a span like "06 12 34 56 78" / "020 123 4567".
      const phoneMatch = infoText.match(/(\+?\d[\d\s\-]{7,}\d)/);
      const phone = card.querySelector('.UsdlK')?.textContent?.trim() || (phoneMatch ? phoneMatch[1].trim() : '');

      return {
        name,
        hasWebsite,
        rating,
        reviews,
        info: infoText,
        phone,
        mapsUrl: link.href,
      };
    })
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main({ query, location, limit, output, headful }) {
  console.log(`Searching Google Maps for "${query}" in "${location}" — collecting ${limit} businesses WITHOUT a website.`);

  const browser = await chromium.launch({
    headless: !headful,
    executablePath: resolveChromium(),
  });
  const context = await browser.newContext({
    locale: 'nl-NL',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  const url = `https://www.google.com/maps/search/${encodeURIComponent(`${query} ${location}`)}?hl=nl`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Handle the EU cookie-consent interstitial if it appears.
  try {
    const consent = page.getByRole('button', { name: /accepteren|accept all|alles accepteren|i agree/i });
    await consent.first().click({ timeout: 5000 });
    await page.waitForLoadState('domcontentloaded');
  } catch {
    /* no consent dialog — fine */
  }

  // Wait for the results feed.
  await page.waitForSelector('div[role="feed"]', { timeout: 30000 });

  const found = new Map(); // name -> record (dedupe by name)
  let lastCount = -1;
  let stagnantRounds = 0;

  while (found.size < limit && stagnantRounds < 6) {
    const cards = await page.evaluate(extractCards);
    for (const c of cards) {
      if (!c.hasWebsite && !found.has(c.name)) {
        found.set(c.name, c);
      }
    }
    process.stdout.write(`\rNo-website leads found: ${found.size}/${limit}  (cards scanned: ${cards.length})   `);

    if (found.size >= limit) break;

    // Scroll the results feed to load more.
    await page.evaluate(() => {
      const feed = document.querySelector('div[role="feed"]');
      if (feed) feed.scrollBy(0, feed.scrollHeight);
    });
    await sleep(1800);

    const total = (await page.evaluate(extractCards)).length;
    if (total === lastCount) {
      stagnantRounds += 1;
    } else {
      stagnantRounds = 0;
      lastCount = total;
    }
  }
  process.stdout.write('\n');

  await browser.close();

  const records = Array.from(found.values()).slice(0, limit);
  await writeExcel(records, { query, location, output });

  console.log(`\nDone. ${records.length} businesses without a website written to: ${output}`);
  if (records.length < limit) {
    console.log(
      `(Wanted ${limit} but only ${records.length} no-website businesses turned up for this search. ` +
        `Try a broader area or a different category to find more.)`
    );
  }
}

// ---------------------------------------------------------------------------
// Excel export — shared with the self-test.
// ---------------------------------------------------------------------------
export async function writeExcel(records, { query, location, output }) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'NP-Lead-Agency';
  workbook.created = new Date();
  const sheet = workbook.addWorksheet('Leads zonder website');

  sheet.columns = [
    { header: '#', key: 'idx', width: 5 },
    { header: 'Bedrijfsnaam', key: 'name', width: 38 },
    { header: 'Telefoon', key: 'phone', width: 20 },
    { header: 'Beoordeling', key: 'rating', width: 12 },
    { header: 'Reviews', key: 'reviews', width: 10 },
    { header: 'Categorie / Adres', key: 'info', width: 50 },
    { header: 'Heeft website?', key: 'website', width: 14 },
    { header: 'Google Maps link', key: 'mapsUrl', width: 60 },
  ];

  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F2937' } };
  sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

  records.forEach((r, i) => {
    sheet.addRow({
      idx: i + 1,
      name: r.name,
      phone: r.phone || '',
      rating: r.rating || '',
      reviews: r.reviews || '',
      info: r.info || '',
      website: 'Nee',
      mapsUrl: r.mapsUrl || '',
    });
  });

  sheet.autoFilter = { from: 'A1', to: 'H1' };
  sheet.views = [{ state: 'frozen', ySplit: 1 }];

  await workbook.xlsx.writeFile(output);
  return output;
}

// Only run main() when invoked directly (not when imported by the self-test).
if (import.meta.url === `file://${process.argv[1]}`) {
  main(parseCliArgs()).catch((err) => {
    console.error('\nScrape failed:', err.message);
    process.exit(1);
  });
}
