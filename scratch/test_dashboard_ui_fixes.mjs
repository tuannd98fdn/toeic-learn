import { chromium } from 'playwright';
import path from 'path';

const ARTIFACTS_DIR = '/Users/bravee06/.gemini/antigravity-ide/brain/93dc5faf-b1a9-43fc-8b59-141401f2aeb6';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  const page = await context.newPage();

  console.log('--- Step 1: Set onboarding and test data in localStorage ---');
  await page.goto('http://localhost:3000/onboarding');
  await page.evaluate(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '750+');
    const todayStr = new Date().toISOString().split('T')[0];
    localStorage.setItem('toeic_exam_date', todayStr);
  });

  console.log('--- Step 2: Open Dashboard on Desktop 1440px ---');
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);

  const desktopPath = path.join(ARTIFACTS_DIR, 'dashboard_desktop_1440.png');
  await page.screenshot({ path: desktopPath, fullPage: true });
  console.log('Saved Desktop Screenshot:', desktopPath);

  const subtitleText = await page.locator('p[class*="heroSubtitle"]').textContent();
  console.log('Countdown Subtitle Text:', subtitleText);

  const toolCardTitles = await page.locator('div[class*="toolsGrid"] h4').allTextContents();
  console.log('Tool Card h4 Titles:', toolCardTitles);

  const gridTemplateColumns = await page.locator('div[class*="toolsGrid"]').evaluate((el) => {
    return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
  });
  console.log('Grid Template Columns Count on Desktop:', gridTemplateColumns);

  console.log('--- Step 3: Test Tablet Viewport (768px) ---');
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(500);
  const tabletPath = path.join(ARTIFACTS_DIR, 'dashboard_tablet_768.png');
  await page.screenshot({ path: tabletPath, fullPage: false });
  console.log('Saved Tablet Screenshot:', tabletPath);

  console.log('--- Step 4: Test Mobile Viewport (390px) ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  const mobilePath = path.join(ARTIFACTS_DIR, 'dashboard_mobile_390.png');
  await page.screenshot({ path: mobilePath, fullPage: false });
  console.log('Saved Mobile Screenshot:', mobilePath);

  await browser.close();
  console.log('TEST COMPLETED SUCCESSFULLY!');
}

run().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
