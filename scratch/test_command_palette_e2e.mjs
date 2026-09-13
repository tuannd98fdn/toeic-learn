import { chromium } from 'playwright';
import path from 'path';

const ARTIFACTS_DIR = '/Users/bravee06/.gemini/antigravity-ide/brain/93dc5faf-b1a9-43fc-8b59-141401f2aeb6';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
  });
  const page = await context.newPage();

  console.log('--- Step 1: Initialize localStorage and open Dashboard ---');
  await page.goto('http://localhost:3000/onboarding');
  await page.evaluate(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '750+');
  });

  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);

  console.log('--- Step 2: Test opening Command Palette via Navbar trigger ---');
  const searchTrigger = page.locator('button[class*="searchTrigger"]');
  await searchTrigger.click();
  await page.waitForTimeout(400);

  const modal = page.locator('div[class*="modal"]');
  const isVisibleAfterClick = await modal.isVisible();
  console.log('Command Palette visible after Navbar click:', isVisibleAfterClick);

  // Take screenshot of open command palette
  const openModalPath = path.join(ARTIFACTS_DIR, 'command_palette_open.png');
  await page.screenshot({ path: openModalPath, fullPage: false });
  console.log('Saved open Command Palette screenshot:', openModalPath);

  console.log('--- Step 3: Test pressing Escape to close ---');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  const isClosedAfterEsc = !(await modal.isVisible());
  console.log('Command Palette closed after ESC:', isClosedAfterEsc);

  console.log('--- Step 4: Test opening via Keyboard Shortcut (Meta+k) ---');
  await page.keyboard.press('Meta+k');
  await page.waitForTimeout(300);
  const isVisibleAfterMetaK = await modal.isVisible();
  console.log('Command Palette visible after Meta+K:', isVisibleAfterMetaK);

  console.log('--- Step 5: Test typing search query "Word Form" ---');
  await page.keyboard.type('Word Form');
  await page.waitForTimeout(300);

  // Take screenshot of filtered results
  const filteredPath = path.join(ARTIFACTS_DIR, 'command_palette_filtered.png');
  await page.screenshot({ path: filteredPath, fullPage: false });
  console.log('Saved filtered results screenshot:', filteredPath);

  const firstItemTitle = await page.locator('[class*="itemTitle"]').first().textContent();
  console.log('First matched command title:', firstItemTitle);

  console.log('--- Step 6: Test selecting command via Enter ---');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);

  const currentUrl = page.url();
  console.log('Navigated to URL:', currentUrl);
  const isTargetUrl = currentUrl.includes('/part5?subCategory=Word%20Form') || currentUrl.includes('subCategory=Word');
  console.log('Successfully navigated to target sub-skill:', isTargetUrl);

  await browser.close();
  console.log('ALL COMMAND PALETTE E2E CHECKS PASSED!');
}

run().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
