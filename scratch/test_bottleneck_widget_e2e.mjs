import { chromium } from 'playwright';

async function runTest() {
  console.log('🚀 Starting Bottleneck Remediation Widget E2E Playwright test...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  const page = await context.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err));

  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/u;

  // Initial setup: Navigate to home, set onboarding done
  await page.goto('http://localhost:3000');
  await page.evaluate(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '750+');
  });

  // --- Scenario 1: Active Bottleneck (Mắc bẫy) ---
  console.log('\n--- Scenario 1: Active Bottleneck (Mắc bẫy) ---');
  await page.evaluate(() => {
    const sampleMistakes = {
      'exam_test1_part5_101': {
        wrongCount: 2,
        lastMistakeDate: new Date().toISOString(),
        type: 'exam',
        rootCause: 'Mắc bẫy',
        isMastered: false,
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '101'
      },
      'exam_test1_part5_102': {
        wrongCount: 1,
        lastMistakeDate: new Date().toISOString(),
        type: 'exam',
        rootCause: 'Mắc bẫy',
        isMastered: false,
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '102'
      },
      'exam_test1_part5_103': {
        wrongCount: 1,
        lastMistakeDate: new Date().toISOString(),
        type: 'exam',
        rootCause: 'Ngữ pháp',
        isMastered: false,
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '103'
      },
      'exam_test1_part5_104': {
        wrongCount: 3,
        lastMistakeDate: new Date().toISOString(),
        type: 'exam',
        rootCause: 'Từ vựng',
        isMastered: true,
        masteredAt: new Date().toISOString(),
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '104'
      },
    };
    localStorage.setItem('mistake_notebook', JSON.stringify(sampleMistakes));
  });

  await page.reload();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  console.log('Current page URL:', page.url());
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('Body snippet:', bodyText.slice(0, 300));

  // Verify Widget is present
  const widget = page.locator('section[aria-label="Widget Khắc Phục Điểm Nghẽn"]');
  await widget.waitFor({ state: 'visible', timeout: 5000 });
  console.log('✓ BottleneckRemediationWidget rendered on Dashboard');

  // Verify remediation rate: 1 mastered out of 4 total = 25%
  const rateText = await widget.locator('span[class*="gaugeValue"]').textContent();
  console.log(`✓ Remediation Rate displayed: ${rateText} (Expected: 25%)`);
  if (!rateText.includes('25%')) throw new Error(`Expected 25%, got ${rateText}`);

  // Verify top bottleneck spotlight
  const spotlightTitle = await widget.locator('h4[class*="spotlightTitle"]').textContent();
  console.log(`✓ Spotlight Title: "${spotlightTitle}" (Expected: Mắc bẫy ETS)`);
  if (!spotlightTitle.includes('Mắc bẫy ETS')) throw new Error('Expected Mắc bẫy ETS in spotlight');

  // Verify CTA button link
  const ctaBtn = widget.locator('a[href*="/notebook/exam-quiz?rootCause="]');
  const ctaHref = await ctaBtn.getAttribute('href');
  console.log(`✓ 1-Click CTA link: ${ctaHref}`);
  if (!decodeURIComponent(ctaHref).includes('rootCause=Mắc bẫy')) throw new Error('CTA href mismatch');

  // Check 0 emojis in widget HTML
  const widgetHtml = await widget.innerHTML();
  const emojiMatch = widgetHtml.match(emojiRegex);
  if (emojiMatch) throw new Error(`Found emoji in widget: ${emojiMatch[0]}`);
  console.log('✓ 0 UI emojis in BottleneckRemediationWidget');

  // Capture screenshot of Scenario 1
  await page.screenshot({ path: 'scratch/dashboard_bottleneck_scenario1.png' });
  console.log('✓ Saved scratch/dashboard_bottleneck_scenario1.png');

  // Click CTA and verify navigation
  await Promise.all([
    page.waitForURL(/notebook\/exam-quiz\?rootCause=/),
    ctaBtn.click()
  ]);
  console.log('✓ Successfully navigated to exam-quiz via 1-Click CTA');

  // --- Scenario 2: All Mastered State ---
  console.log('\n--- Scenario 2: All Mastered (100%) ---');
  await page.goto('http://localhost:3000');
  await page.evaluate(() => {
    const allMastered = {
      'exam_test1_part5_101': { wrongCount: 2, type: 'exam', rootCause: 'Mắc bẫy', isMastered: true },
      'exam_test1_part5_102': { wrongCount: 1, type: 'exam', rootCause: 'Ngữ pháp', isMastered: true },
    };
    localStorage.setItem('mistake_notebook', JSON.stringify(allMastered));
  });
  await page.reload();
  await page.waitForLoadState('networkidle');

  const allMasteredTitle = await page.locator('section[aria-label="Widget Khắc Phục Điểm Nghẽn"] h4').textContent();
  console.log(`✓ All Mastered Title: "${allMasteredTitle}"`);
  if (!allMasteredTitle.includes('100% Điểm Nghẽn')) throw new Error('Expected 100% message');
  await page.screenshot({ path: 'scratch/dashboard_bottleneck_all_mastered.png' });
  console.log('✓ Saved scratch/dashboard_bottleneck_all_mastered.png');

  // --- Scenario 3: Empty State (0 mistakes) ---
  console.log('\n--- Scenario 3: Empty State ---');
  await page.evaluate(() => {
    localStorage.setItem('mistake_notebook', JSON.stringify({}));
  });
  await page.reload();
  await page.waitForLoadState('networkidle');

  const emptyTitle = await page.locator('section[aria-label="Widget Khắc Phục Điểm Nghẽn"] h4').textContent();
  console.log(`✓ Empty State Title: "${emptyTitle}"`);
  if (!emptyTitle.includes('Hồ Sơ Sạch')) throw new Error('Expected Clean profile message');
  await page.screenshot({ path: 'scratch/dashboard_bottleneck_empty.png' });
  console.log('✓ Saved scratch/dashboard_bottleneck_empty.png');

  // --- Scenario 4: Mobile Responsiveness (390px) ---
  console.log('\n--- Scenario 4: Mobile Responsiveness (390px) ---');
  await page.evaluate(() => {
    const sampleMistakes = {
      'exam_test1_part5_101': { wrongCount: 2, type: 'exam', rootCause: 'Ngữ pháp', isMastered: false },
      'exam_test1_part5_102': { wrongCount: 1, type: 'exam', rootCause: 'Từ vựng', isMastered: true },
    };
    localStorage.setItem('mistake_notebook', JSON.stringify(sampleMistakes));
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.waitForLoadState('networkidle');

  const isOverflowing = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log(`✓ Mobile horizontal overflow check: ${isOverflowing ? 'FAILED (overflow)' : 'PASSED (no overflow)'}`);
  if (isOverflowing) throw new Error('Mobile layout has horizontal overflow');

  await page.screenshot({ path: 'scratch/dashboard_bottleneck_mobile.png' });
  console.log('✓ Saved scratch/dashboard_bottleneck_mobile.png');

  await browser.close();
  console.log('\n🎉 ALL BOTTLENECK REMEDIATION WIDGET E2E TESTS PASSED 100%!');
}

runTest().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
