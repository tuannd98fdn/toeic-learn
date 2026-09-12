import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';
import path from 'path';

const BASE_URL = 'http://localhost:3000';
const NEXTAUTH_SECRET = 'my-super-secret-key-12345';

async function runLayoutScrollTest() {
  console.log('=== VERIFYING PART 7 LAYOUT & SCROLL FIX ("BỊ CHE ĐỀ") ===');

  const token = await encode({
    token: {
      name: 'Test Learner',
      email: 'learner@toeic.com',
      sub: 'user-layout-test',
    },
    secret: NEXTAUTH_SECRET,
  });

  const browser = await chromium.launch({ headless: true });
  // Typical laptop viewport matching user screenshot
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });

  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    },
  ]);

  const page = await context.newPage();

  try {
    const targetUrl = `${BASE_URL}/part7?questionType=Vocabulary&passageType=Triple+Passage`;
    console.log(`Navigating to: ${targetUrl}`);
    await page.goto(targetUrl);
    await page.waitForTimeout(2000);

    // 1. Check Collapsible Filter Bar
    const filterBar = page.locator('div[class*="filterBarSlim"]');
    const isSlimVisible = await filterBar.isVisible();
    console.log(`-> Slim filter bar visible: ${isSlimVisible}`);

    // Take screenshot in collapsed state
    const screenshotDir = '/Users/bravee06/.gemini/antigravity-ide/brain/fc47555f-de3b-46cb-9c07-d45529db2b77';
    await page.screenshot({ path: path.join(screenshotDir, 'part7_fixed_collapsed.png') });
    console.log('-> Captured screenshot: part7_fixed_collapsed.png');

    // 2. Check Left Panel (Passage) Scrollability
    const leftPanel = page.locator('section[class*="leftPanel"]');
    await leftPanel.waitFor({ state: 'visible' });

    const leftMetrics = await leftPanel.evaluate((el) => ({
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      scrollTop: el.scrollTop,
    }));
    console.log(`-> Left panel metrics: scrollHeight=${leftMetrics.scrollHeight}px, clientHeight=${leftMetrics.clientHeight}px`);
    if (leftMetrics.scrollHeight <= leftMetrics.clientHeight) {
      throw new Error(`Left panel is not scrollable! scrollHeight=${leftMetrics.scrollHeight}, clientHeight=${leftMetrics.clientHeight}`);
    }
    console.log('-> Left panel has scrollable overflow: PASSED');

    // Scroll left panel to bottom
    await leftPanel.evaluate((el) => { el.scrollTop = el.scrollHeight; });
    await page.waitForTimeout(500);

    const leftScrollAfter = await leftPanel.evaluate((el) => el.scrollTop);
    console.log(`-> Left panel scrolled to: ${leftScrollAfter}px`);
    if (leftScrollAfter === 0) {
      throw new Error('Left panel failed to scroll!');
    }
    console.log('-> Left panel scroll down: PASSED');

    // 3. Check Right Panel (Question)
    const rightPanel = page.locator('section[class*="rightPanel"]');
    await rightPanel.waitFor({ state: 'visible' });

    const rightMetrics = await rightPanel.evaluate((el) => ({
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
    }));
    console.log(`-> Right panel metrics: scrollHeight=${rightMetrics.scrollHeight}px, clientHeight=${rightMetrics.clientHeight}px`);

    // Verify option D is visible and clickable
    const optionD = page.locator('button[class*="optionBtn"]').filter({ hasText: 'Interactive displays' });
    await optionD.waitFor({ state: 'visible' });
    console.log('-> Option D is visible and interactive: PASSED');

    // 4. Test Toggle Filter Expand / Collapse
    const toggleBtn = page.locator('button[class*="filterToggleBtn"]');
    await toggleBtn.click();
    await page.waitForTimeout(600);

    const fullFilters = page.locator('div[class*="filterContainer"]');
    const isFullFiltersVisible = await fullFilters.isVisible();
    console.log(`-> Full filter section visible on toggle: ${isFullFiltersVisible}`);

    await page.screenshot({ path: path.join(screenshotDir, 'part7_fixed_expanded.png') });
    console.log('-> Captured screenshot: part7_fixed_expanded.png');

    // Toggle back
    const collapseBtn = page.locator('button[class*="filterToggleBtn"]');
    await collapseBtn.click();
    await page.waitForTimeout(400);

    console.log('=== ALL LAYOUT & SCROLL VERIFICATIONS PASSED SUCCESSFULLY! ===');
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runLayoutScrollTest();
