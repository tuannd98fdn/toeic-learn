import { chromium } from 'playwright';

async function runTests() {
  console.log('--- STARTING E2E TEST: "Luyện ngay bẫy này" CTA & Practice Deep-Linking ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    extraHTTPHeaders: {
      'x-playwright-test': 'true'
    }
  });

  const page = await context.newPage();

  // Test 1: Desktop View - Verify "Luyện ngay bẫy này" buttons
  console.log('[Test 1] Navigating to /tips on Desktop...');
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/tips', { waitUntil: 'networkidle' });

  // Count buttons with text "Luyện ngay bẫy này"
  const trapButtonsCount = await page.locator('a:has-text("Luyện ngay bẫy này")').count();
  console.log(`Total "Luyện ngay bẫy này" buttons found: ${trapButtonsCount}`);
  if (trapButtonsCount === 0) {
    throw new Error('No "Luyện ngay bẫy này" buttons found on /tips');
  }

  // Verify inline trap box buttons
  const inlineTrapBtnsCount = await page.locator('a[class*="trapPracticeBtn"]').count();
  console.log(`Inline trap box buttons (.trapPracticeBtn): ${inlineTrapBtnsCount}`);
  if (inlineTrapBtnsCount !== 10) {
    throw new Error(`Expected 10 inline trap box buttons, got ${inlineTrapBtnsCount}`);
  }

  // Verify card bottom trap CTA buttons
  const cardBottomTrapBtnsCount = await page.locator('a[class*="practiceBtnTrap"]').count();
  console.log(`Card bottom trap CTA buttons (.practiceBtnTrap): ${cardBottomTrapBtnsCount}`);
  if (cardBottomTrapBtnsCount !== 11) {
    throw new Error(`Expected 11 card bottom trap buttons, got ${cardBottomTrapBtnsCount}`);
  }

  // Take desktop screenshot showing "Luyện ngay bẫy này"
  await page.screenshot({ path: 'scratch/tips_trap_buttons_desktop.png' });

  // Test 2: Filter by "Bẫy đề thi ETS" and test direct link
  console.log('[Test 2] Testing Quick Preset "Bẫy đề thi ETS" and deep-linking...');
  await page.locator('button:has-text("Bẫy đề thi ETS")').click();
  await page.waitForTimeout(300);

  const trapArticlesCount = await page.locator('article').count();
  console.log(`Trap cards visible: ${trapArticlesCount}`);
  if (trapArticlesCount !== 11) {
    throw new Error(`Expected 11 trap cards under preset, got ${trapArticlesCount}`);
  }

  // Test 3: Test clicking "Luyện ngay bẫy này" on Part 5 trap (Conjunction vs Preposition)
  console.log('[Test 3] Testing Part 5 Trap: Preposition & Conjunction navigation...');
  const p5TrapCard = page.locator('article:has-text("Bẫy Liên từ (Conjunction) vs Giới từ (Preposition)")');
  const p5TrapLink = await p5TrapCard.locator('a[class*="practiceBtnTrap"]').getAttribute('href');
  console.log(`Part 5 Trap practiceLink href: ${p5TrapLink}`);
  if (!p5TrapLink?.includes('/part5?subCategory=Preposition%20%26%20Conjunction')) {
    throw new Error(`Part 5 trap link does not point to targeted subCategory: ${p5TrapLink}`);
  }

  // Test 4: Test clicking "Luyện ngay bẫy này" on Part 6 trap (Time stamp / Grammar)
  console.log('[Test 4] Testing Part 6 Trap: Date Stamp & Grammar navigation...');
  const p6TrapCard = page.locator('article:has-text("Bẫy mốc thời gian và thì động từ trong thư từ/email")');
  const p6TrapLink = await p6TrapCard.locator('a[class*="practiceBtnTrap"]').getAttribute('href');
  console.log(`Part 6 Trap practiceLink href: ${p6TrapLink}`);
  if (!p6TrapLink?.includes('/part6?subCategory=Grammar')) {
    throw new Error(`Part 6 trap link does not point to targeted subCategory: ${p6TrapLink}`);
  }

  // Test 5: Test clicking "Luyện ngay bẫy này" on Part 7 trap (True info wrong question)
  console.log('[Test 5] Testing Part 7 Trap: NOT / TRUE navigation...');
  const p7TrapCard = page.locator('article:has-text("Bẫy thông tin có thật trong bài nhưng không trả lời câu hỏi")');
  const p7TrapLink = await p7TrapCard.locator('a[class*="practiceBtnTrap"]').getAttribute('href');
  console.log(`Part 7 Trap practiceLink href: ${p7TrapLink}`);
  if (!p7TrapLink?.includes('/part7?questionType=NOT%20%2F%20TRUE')) {
    throw new Error(`Part 7 trap link does not point to targeted questionType: ${p7TrapLink}`);
  }

  // Test 6: Navigate to Part 1 practice from inline trap button
  console.log('[Test 6] Testing Navigation to Part 1 via inline trap button...');
  const firstInlineTrapBtn = page.locator('a[class*="trapPracticeBtn"]').first();
  await firstInlineTrapBtn.click();
  await page.waitForURL('**/part1', { timeout: 5000 });
  console.log(`Successfully navigated to: ${page.url()}`);
  await page.screenshot({ path: 'scratch/tips_navigated_practice.png' });

  // Return to /tips
  await page.goto('http://localhost:3000/tips', { waitUntil: 'networkidle' });

  // Test 7: Mobile Layout (375x812)
  console.log('[Test 7] Testing Mobile Layout (375x812)...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.screenshot({ path: 'scratch/tips_trap_buttons_mobile_light.png' });

  // Test 8: Dark Mode on Mobile
  console.log('[Test 8] Testing Dark Mode on Mobile...');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'scratch/tips_trap_buttons_mobile_dark.png' });

  // Test 9: Strict NO UI EMOJIS Check
  console.log('[Test 9] Checking for UI Emojis on rendered DOM...');
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
  const bodyText = await page.locator('body').innerText();
  const foundEmoji = emojiRegex.test(bodyText);
  console.log(`Rendered DOM contains emoji: ${foundEmoji}`);
  if (foundEmoji) {
    const matches = bodyText.match(new RegExp(emojiRegex, 'gu'));
    throw new Error(`STRICT RULE VIOLATION: Emojis found in DOM: ${JSON.stringify(matches)}`);
  }

  await browser.close();
  console.log('--- ALL TRAP PRACTICE BUTTON TESTS PASSED SUCCESSFULLY! ---');
}

runTests().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
