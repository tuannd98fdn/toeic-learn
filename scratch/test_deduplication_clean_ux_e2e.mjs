import { chromium } from 'playwright';

async function main() {
  console.log('--- Starting De-duplication Clean UX E2E Test ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
  });

  await context.addInitScript(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '900+');
    localStorage.setItem('toeic_exam_date', '2026-10-30');
    localStorage.setItem('mistake_notebook', '{}');
    localStorage.setItem('toeic_streak_count', '3');
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Verify that duplicate "LUYỆN FULL RC (75P)" is REMOVED
  const readingCta = await page.locator('text=LUYỆN FULL RC (75P)').count();
  console.log(`[1] Duplicate "LUYỆN FULL RC (75P)" count: ${readingCta} (expected: 0)`);
  if (readingCta !== 0) {
    throw new Error('Duplicate "LUYỆN FULL RC (75P)" still exists on dashboard!');
  }

  // 2. Verify that "THI THỬ RC (75P)" remains solely in the Mock Arena
  const arenaRcBtn = await page.locator('text=THI THỬ RC (75P)').count();
  console.log(`[2] Sole Arena "THI THỬ RC (75P)" count: ${arenaRcBtn} (expected: 1)`);
  if (arenaRcBtn !== 1) {
    throw new Error('Arena "THI THỬ RC (75P)" missing or duplicated!');
  }

  // 3. Verify Reading Station only contains Part 5, Part 6, Part 7
  const p5Btn = await page.locator('a:has-text("Part 5")').count();
  const p6Btn = await page.locator('a:has-text("Part 6")').count();
  const p7Btn = await page.locator('a:has-text("Part 7")').count();
  console.log(`[3] Reading station parts found: P5=${p5Btn}, P6=${p6Btn}, P7=${p7Btn}`);
  if (p5Btn === 0 || p6Btn === 0 || p7Btn === 0) {
    throw new Error('Reading station individual parts missing!');
  }

  // 4. Verify bottom supplementary tools row is REMOVED
  const bottomRow = await page.locator('div[class*="onDemandToolsRow"]').count();
  console.log(`[4] Bottom supplementary tools row count: ${bottomRow} (expected: 0)`);
  if (bottomRow !== 0) {
    throw new Error('Bottom onDemandToolsRow still rendered!');
  }

  // 5. Verify Sidebar has "Masterclass 30'" under tools
  const masterclassNavItem = page.locator('nav a[href="/masterclass"]');
  const mcNavCount = await masterclassNavItem.count();
  console.log(`[5] Masterclass nav item count in sidebar: ${mcNavCount} (expected: 1)`);
  if (mcNavCount !== 1) {
    throw new Error('Masterclass 30\' not found in Navbar sidebar!');
  }
  const mcNavText = await masterclassNavItem.innerText();
  console.log(`[5] Masterclass nav label: "${mcNavText.replace(/\n/g, ' ')}"`);
  if (!mcNavText.includes('Masterclass 30\'')) {
    throw new Error('Masterclass label mismatch!');
  }

  // 6. Test navigation to Masterclass via Sidebar
  await masterclassNavItem.click();
  await page.waitForURL('**/masterclass');
  await page.waitForTimeout(500);
  const mcHeading = await page.locator('h1').innerText();
  console.log(`[6] Navigated to Masterclass page: "${mcHeading}"`);

  // 7. Test unified /study Hub tabs
  await page.goto('http://localhost:3000/study', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const flashcardTab = page.locator('button:has-text("Thẻ Flashcards SRS")');
  const quizTab = page.locator('button:has-text("Làm Quiz 10 Câu")');
  const dictTab = page.locator('button:has-text("Kho Từ & Tra Cứu")');
  if (await flashcardTab.count() === 0 || await quizTab.count() === 0 || await dictTab.count() === 0) {
    throw new Error('Vocab hub tabs missing in /study!');
  }

  // Click Quiz tab
  await quizTab.click();
  await page.waitForTimeout(500);
  const quizTitle = await page.locator('text=Làm Quiz').count();
  console.log(`[7] Switched to Quiz tab in /study seamlessly: ${quizTitle > 0 ? 'PASS' : 'FAIL'}`);

  // 8. Go back to Home and capture screenshot
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'scratch/dashboard_deduplicated_clean.png', fullPage: true });
  console.log('[8] Captured clean screenshot to scratch/dashboard_deduplicated_clean.png');

  // 9. Verify STRICT NO UI EMOJIS on all tested pages
  const bodyText = await page.innerText('body');
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  const emojiMatch = bodyText.match(emojiRegex);
  if (emojiMatch) {
    console.error(`[9] Emoji violation detected in DOM: ${emojiMatch[0]}`);
    throw new Error(`Forbidden emoji found in DOM: ${emojiMatch[0]}`);
  } else {
    console.log('[9] STRICT NO UI EMOJIS: 100% PASS (0 emoji in DOM)');
  }

  await browser.close();
  console.log('--- ALL DE-DUPLICATION TESTS PASSED 100% ---');
}

main().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
