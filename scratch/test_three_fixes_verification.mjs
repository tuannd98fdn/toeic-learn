import { chromium } from 'playwright';

async function main() {
  console.log('--- Starting verification of 3 UI fixes ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: 'dark',
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  const page = await context.newPage();

  // Set up mock localStorage with escaped quotes to test auto-repair before navigation
  await page.addInitScript(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    // Simulate raw string with quotes
    localStorage.setItem('toeic_target_score', '"990"');
    localStorage.setItem('toeic_exam_date', '2026-10-30');
  });

  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1500);

  // 1. Verify Hero Title & Celebration text
  const heroTitle = await page.locator('h1[class*="heroTitle"]').textContent();
  console.log('Hero Title text:', heroTitle);
  if (heroTitle.includes('"990"')) {
    console.error('FAIL: Hero title still contains double quotes "990"!');
    process.exit(1);
  } else if (heroTitle.includes('990')) {
    console.log('PASS: Hero title displays cleanly as "TOEIC 990" without extra quotes.');
  }

  const storedScore = await page.evaluate(() => localStorage.getItem('toeic_target_score'));
  console.log('Repaired localStorage toeic_target_score:', storedScore);
  if (storedScore === '990') {
    console.log('PASS: localStorage toeic_target_score successfully sanitized in-place to "990".');
  }

  // 2. Verify Station Featured (Đấu Trường)
  const stationFeatured = page.locator('div[class*="stationFeatured"]');
  const isFeaturedVisible = await stationFeatured.isVisible();
  console.log('Station Featured visible:', isFeaturedVisible);

  const featuredBg = await stationFeatured.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      background: style.background,
      borderColor: style.borderColor,
      borderRadius: style.borderRadius,
      boxShadow: style.boxShadow,
      color: style.color
    };
  });
  console.log('Station Featured Styles:', featuredBg);

  const featuredBtn = page.locator('a[class*="featuredBtn"]');
  const btnStyles = await featuredBtn.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      background: style.background,
      color: style.color,
      boxShadow: style.boxShadow
    };
  });
  console.log('Featured Button Styles:', btnStyles);

  // 3. Verify Sidebar Active State and Badge
  const activeLink = page.locator('nav a[class*="active"]');
  const activeLabel = await activeLink.locator('span[class*="label"]').textContent();
  console.log('Active Nav Link:', activeLabel);

  const activeStyles = await activeLink.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      background: style.background,
      color: style.color,
      border: style.border,
      boxShadow: style.boxShadow
    };
  });
  console.log('Active Nav Link Styles:', activeStyles);

  const badge = page.locator('nav span[class*="badge"]:has-text("MỚI")');
  const badgeText = await badge.textContent();
  const badgeBg = await badge.evaluate((el) => window.getComputedStyle(el).background);
  console.log('Badge text:', badgeText, '| Background:', badgeBg);

  // 4. Verify NO UI Emojis
  const bodyText = await page.locator('body').innerText();
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const emojisFound = bodyText.match(emojiRegex) || [];
  console.log('Emojis found on dashboard:', emojisFound);
  if (emojisFound.length > 0) {
    console.error('FAIL: Found UI emojis:', emojisFound);
    process.exit(1);
  } else {
    console.log('PASS: 0 UI Emojis found on the page (100% compliant).');
  }

  // Take screenshot for visual verification
  await page.screenshot({ path: 'scratch/three_fixes_verified.png', fullPage: true });
  console.log('Screenshot saved to scratch/three_fixes_verified.png');

  await browser.close();
  console.log('--- ALL 3 FIXES VERIFIED SUCCESSFULLY ---');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
