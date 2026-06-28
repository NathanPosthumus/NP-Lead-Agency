# Google Maps lead scraper

Finds businesses on Google Maps that **do not have a website** and exports them
to an Excel file. A business without a website is an ideal lead for NP-Lead-Agency.

## What it does

1. Searches Google Maps for `"<query> <location>"` (e.g. `dakdekker Amsterdam`).
2. Scrolls the results and reads each business card.
3. Keeps only businesses whose card has **no "Website" button**.
4. Collects name, phone, rating, review count, category/address and the Maps link.
5. Writes everything to a formatted `.xlsx` (column "Heeft website?" = `Nee`).

## Run it (on your own machine)

> ⚠️ Google is **blocked** inside the Claude Code cloud sandbox, so the live
> scrape will not run there. Run it locally, where you have normal internet
> access.

```bash
# one-time setup
npm install
npx playwright install chromium   # downloads the browser Playwright drives

# scrape 50 roofers in Amsterdam without a website
npm run scrape -- --query "dakdekker" --location "Amsterdam" --limit 50

# or call the script directly
node scripts/scrape-maps.mjs -q "loodgieter" -l "Rotterdam" -n 50 -o leads.xlsx
```

### Options

| flag | alias | meaning | default |
| --- | --- | --- | --- |
| `--query` | `-q` | business type to search for | _(required)_ |
| `--location` | `-l` | city / area | _(required)_ |
| `--limit` | `-n` | how many no-website leads to collect | `50` |
| `--output` | `-o` | output `.xlsx` path | `leads-<query>-<location>.xlsx` |
| `--headful` | | show the browser window (debugging) | off |

## Verify it works (no internet needed)

A self-test exercises the card-parsing selectors and the Excel export against a
local HTML fixture — no Google access required:

```bash
npm run scrape:test
```

## Notes & tips

- **Getting fewer than 50?** Many businesses in dense cities do have websites.
  Broaden the area (a province instead of one city) or try a related category,
  then merge the resulting sheets.
- **Empty results / selectors broke?** Google occasionally changes its CSS
  class names. The selectors live in `extractCards()` in `scrape-maps.mjs`;
  run with `--headful` to watch the page and adjust them.
- **Be reasonable.** Scraping Google Maps is against Google's Terms of Service.
  Keep volumes low, add delays, and use the data for legitimate B2B outreach.
- The "no website" signal comes from the absence of the card's Website button.
  A business could still have a site Google doesn't list — treat the list as
  high-probability leads, not absolute truth.
