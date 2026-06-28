#!/usr/bin/env node
/**
 * Google Places API (New) lead generator — finds businesses that do NOT have a
 * website and exports them to Excel. This is the official, Terms-of-Service
 * compliant path (no scraping): it reads each place's `websiteUri` field and
 * keeps only the ones where it is absent.
 *
 * Requires a Google Maps Platform API key with the "Places API (New)" enabled.
 *   https://console.cloud.google.com/  ->  APIs & Services  ->  enable "Places API (New)"
 *
 * Usage:
 *   GOOGLE_MAPS_API_KEY=AIza... node scripts/scrape-places-api.mjs \
 *     --query "dakdekker" --locations "Amsterdam,Haarlem,Zaandam" --limit 50
 *
 * Options:
 *   --query,     -q   business type            (required)
 *   --locations, -l   comma-separated cities/areas to search (required)
 *   --limit,     -n   how many no-website leads to collect (default 50)
 *   --output,    -o   output .xlsx path
 */

import { writeExcel } from './scrape-maps.mjs';
import { parseArgs } from 'node:util';

const { values } = parseArgs({
  options: {
    query: { type: 'string', short: 'q' },
    locations: { type: 'string', short: 'l' },
    limit: { type: 'string', short: 'n', default: '50' },
    output: { type: 'string', short: 'o' },
  },
});

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
if (!API_KEY) {
  console.error('Error: set GOOGLE_MAPS_API_KEY (a Google Maps Platform key with "Places API (New)" enabled).');
  process.exit(1);
}
if (!values.query || !values.locations) {
  console.error('Error: --query and --locations are required.');
  console.error('Example: GOOGLE_MAPS_API_KEY=... node scripts/scrape-places-api.mjs -q "dakdekker" -l "Amsterdam,Haarlem" -n 50');
  process.exit(1);
}

const QUERY = values.query;
const LOCATIONS = values.locations.split(',').map((s) => s.trim()).filter(Boolean);
const LIMIT = Math.max(1, parseInt(values.limit, 10) || 50);
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const OUTPUT = values.output || `leads-${slug(QUERY)}-${slug(LOCATIONS[0])}.xlsx`;

const FIELD_MASK = [
  'places.displayName',
  'places.nationalPhoneNumber',
  'places.internationalPhoneNumber',
  'places.websiteUri',
  'places.formattedAddress',
  'places.rating',
  'places.userRatingCount',
  'places.primaryTypeDisplayName',
  'places.googleMapsUri',
].join(',');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function searchText(textQuery, pageToken) {
  const body = { textQuery, languageCode: 'nl', regionCode: 'NL' };
  if (pageToken) body.pageToken = pageToken;
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': FIELD_MASK + ',nextPageToken',
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Places API ${res.status}: ${json?.error?.message || JSON.stringify(json)}`);
  }
  return json;
}

async function main() {
  console.log(`Querying Places API for "${QUERY}" across: ${LOCATIONS.join(', ')}`);
  console.log(`Collecting up to ${LIMIT} businesses WITHOUT a website.\n`);

  const found = new Map(); // dedupe key -> record
  let scanned = 0;

  outer: for (const loc of LOCATIONS) {
    let pageToken;
    let page = 0;
    do {
      const data = await searchText(`${QUERY} ${loc}`, pageToken);
      const places = data.places || [];
      for (const p of places) {
        scanned += 1;
        const name = p.displayName?.text || '';
        if (!name) continue;
        const hasWebsite = !!p.websiteUri;
        if (hasWebsite) continue;
        const phone = p.nationalPhoneNumber || p.internationalPhoneNumber || '';
        const key = `${name}|${phone}|${p.formattedAddress || ''}`;
        if (found.has(key)) continue;
        found.set(key, {
          name,
          phone,
          rating: p.rating != null ? String(p.rating) : '',
          reviews: p.userRatingCount != null ? String(p.userRatingCount) : '',
          info: [p.primaryTypeDisplayName?.text, p.formattedAddress].filter(Boolean).join(' · '),
          mapsUrl: p.googleMapsUri || '',
        });
      }
      process.stdout.write(`\rNo-website leads: ${found.size}/${LIMIT}  (places scanned: ${scanned})   `);
      if (found.size >= LIMIT) break outer;

      pageToken = data.nextPageToken;
      page += 1;
      if (pageToken) await sleep(2000); // token needs a moment to become valid
    } while (pageToken && page < 3); // API returns at most ~60 results (3 pages) per query
  }
  process.stdout.write('\n');

  const records = Array.from(found.values()).slice(0, LIMIT);
  await writeExcel(records, { query: QUERY, location: LOCATIONS.join(', '), output: OUTPUT });

  console.log(`\nDone. ${records.length} businesses without a website written to: ${OUTPUT}`);
  if (records.length < LIMIT) {
    console.log(
      `(Only ${records.length} no-website businesses found. Add more cities to --locations to reach ${LIMIT}.)`
    );
  }
}

main().catch((err) => {
  console.error('\nFailed:', err.message);
  process.exit(1);
});
