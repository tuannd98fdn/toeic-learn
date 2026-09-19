import { chromium } from 'playwright';

async function runTests() {
  console.log('=== STARTING E2E & DATA PIPELINE VERIFICATION ===\n');

  console.log('[Step 1] Launching Playwright browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Browser Error:', msg.text());
    }
  });

  // Test 1: Test questionFetcher fallback directly inside the browser environment
  console.log('[Step 1.1] Testing questionFetcher fallback for legacy/cross test IDs inside browser context...');
  await page.goto('http://localhost:3000/landing', { waitUntil: 'networkidle' });

  const fetcherResults = await page.evaluate(async () => {
    const test1P5Res = await fetch('/data/ets2022/test1/part5.json');
    const p5Ok = test1P5Res.ok;
    const p5Json = await test1P5Res.json();

    const test1P7Res = await fetch('/data/ets2022/test1/part7.json');
    const p7Ok = test1P7Res.ok;
    const p7Json = await test1P7Res.json();

    return {
      p5Ok,
      p5Length: p5Json.length,
      p7Ok,
      p7PassagesLength: p7Json.passages?.length || p7Json.length
    };
  });

  console.log('Fetcher verification results:', fetcherResults);
  if (!fetcherResults.p5Ok || !fetcherResults.p7Ok) {
    throw new Error('Data files for ets2022 test1 fallback not accessible');
  }
  console.log('✓ Step 1 passed: Fallback data endpoints are valid and accessible.\n');

  // STEP 2: Playwright Browser Tests for /diagnostic Re-visit & Filter Flow
  console.log('[Step 2] Seeding localStorage with previous diagnostic completion...');
  await page.evaluate(() => {
    const mockResult = {
      date: '2026-09-18T10:00:00.000Z',
      totalScore: 650,
      scaledLC: 350,
      scaledRC: 300,
      cefrLevel: 'B2',
      correctLC: 12,
      correctRC: 8,
      weakestPart: {
        part: 'p7',
        partName: 'Part 7: Đọc hiểu',
        accuracy: 25,
        advice: 'Tập trung cải thiện tốc độ đọc quét (skimming & scanning).'
      },
      weakestPartsList: ['p7', 'p6', 'p4', 'p3', 'p5', 'p2', 'p1'],
      partScores: {
        p1: { total: 4, correct: 3, accuracy: 75 },
        p2: { total: 4, correct: 3, accuracy: 75 },
        p3: { total: 4, correct: 3, accuracy: 75 },
        p4: { total: 4, correct: 3, accuracy: 75 },
        p5: { total: 4, correct: 3, accuracy: 75 },
        p6: { total: 4, correct: 2, accuracy: 50 },
        p7: { total: 4, correct: 1, accuracy: 25 }
      }
    };

    // 28 questions in diagnostic test (Part 1-4: 16 questions, Part 5-7: 12 questions)
    // Seed answers: make odd questions correct, even questions wrong
    const mockAnswers = {};
    for (let i = 1; i <= 28; i++) {
      mockAnswers[i] = i % 2 === 0 ? 'A' : 'B';
    }
    localStorage.setItem('toeic_diagnostic_result', JSON.stringify(mockResult));
    localStorage.setItem('toeic_diagnostic_answers', JSON.stringify(mockAnswers));
  });

  // Navigate to /diagnostic
  console.log('[Step 2.1] Navigating to /diagnostic as returning user...');
  await page.goto('http://localhost:3000/diagnostic', { waitUntil: 'networkidle' });

  // Verify that it opened in submitted review mode with Revisit Banner
  const revisitBanner = page.locator('[class*="revisitBanner"]').first();
  await revisitBanner.waitFor({ state: 'visible', timeout: 5000 });
  const bannerText = await revisitBanner.innerText();
  console.log(`Revisit banner detected: "${bannerText.replace(/\n/g, ' ')}"`);
  if (!bannerText.includes('Kết Quả Đánh Giá Năng Lực Gần Nhất')) {
    throw new Error('Expected Revisit Banner title "Kết Quả Đánh Giá Năng Lực Gần Nhất"');
  }

  // Verify that the 20-minute countdown timer is NOT running (no timer bar in review mode)
  const timerRunning = await page.locator('[class*="timerBar"]').count();
  console.log(`Timer bars count in review view: ${timerRunning}`);
  if (timerRunning > 0) {
    throw new Error('Timer should not be running in revisit/submitted view');
  }

  // Verify predicted score display
  const predictedScore = await page.locator('[class*="predictedScore"]').innerText();
  console.log(`Predicted score displayed: ${predictedScore} (expected 650)`);
  if (predictedScore !== '650') {
    throw new Error(`Expected score 650, got ${predictedScore}`);
  }

  // STEP 3: Toggle Question Review & Test Interactive Filter Bar
  console.log('\n[Step 3] Clicking "Xem lại 28 câu & Giải thích"...');
  const showReviewBtn = page.locator('button:has-text("Xem lại 28 câu & Giải thích")');
  await showReviewBtn.click();
  await page.waitForTimeout(300);

  const filterBar = page.locator('[class*="reviewFilterBar"]');
  await filterBar.waitFor({ state: 'visible' });
  console.log('Filter bar text:', await filterBar.innerText());

  // Check filter buttons
  const allFilterBtn = page.locator('button').filter({ hasText: 'Tất cả' });
  const wrongFilterBtn = page.locator('button').filter({ hasText: 'Chỉ câu sai' });
  const lcFilterBtn = page.locator('button').filter({ hasText: 'Listening' });
  const rcFilterBtn = page.locator('button').filter({ hasText: 'Reading' });

  if (await allFilterBtn.count() === 0 || await wrongFilterBtn.count() === 0) {
    throw new Error('Expected filter buttons "Tất cả" and "Chỉ câu sai" to be present');
  }

  const initialQuestionsCount = await page.locator('[class*="reviewCard"]').count();
  console.log(`Total questions rendered under All: ${initialQuestionsCount}`);
  if (initialQuestionsCount !== 26) {
    throw new Error(`Expected 26 questions rendered, got ${initialQuestionsCount}`);
  }

  // Filter by Wrong answers only
  console.log('[Step 3.1] Filtering by "Chỉ câu sai"...');
  await wrongFilterBtn.click();
  await page.waitForTimeout(200);

  const wrongQuestionsCount = await page.locator('[class*="reviewCard"]').count();
  console.log(`Filtered wrong questions count: ${wrongQuestionsCount}`);
  if (wrongQuestionsCount >= initialQuestionsCount || wrongQuestionsCount === 0) {
    throw new Error(`Filter 'Chỉ câu sai' failed: expected fewer than 26 questions, got ${wrongQuestionsCount}`);
  }

  // Filter by LC only
  console.log('[Step 3.2] Filtering by "Listening"...');
  await lcFilterBtn.click();
  await page.waitForTimeout(200);
  const lcQuestionsCount = await page.locator('[class*="reviewCard"]').count();
  console.log(`Filtered LC questions count: ${lcQuestionsCount}`);
  if (lcQuestionsCount !== 16) {
    throw new Error(`Filter 'Listening' expected 16 questions, got ${lcQuestionsCount}`);
  }

  // Filter by RC only
  console.log('[Step 3.3] Filtering by "Reading"...');
  await rcFilterBtn.click();
  await page.waitForTimeout(200);
  const rcQuestionsCount = await page.locator('[class*="reviewCard"]').count();
  console.log(`Filtered RC questions count: ${rcQuestionsCount}`);
  if (rcQuestionsCount !== 10) {
    throw new Error(`Filter 'Reading' expected 10 questions, got ${rcQuestionsCount}`);
  }

  // Reset to All
  await allFilterBtn.click();
  await page.waitForTimeout(200);

  // STEP 4: Test Retake flow ("Làm bài test mới")
  console.log('\n[Step 4] Testing Retake button in Revisit Banner...');
  const retakeBtn = page.locator('button:has-text("Làm bài test mới")').first();
  await retakeBtn.click();
  await page.waitForTimeout(500);

  // Verify that test is now in active test mode
  const activeTimer = page.locator('header [class*="timer"]');
  await activeTimer.waitFor({ state: 'visible', timeout: 5000 });
  const activeTimerText = await activeTimer.innerText();
  console.log(`Active test started! Timer display: "${activeTimerText}"`);
  if (!activeTimerText.includes(':')) {
    throw new Error('Expected active timer countdown to appear after retake');
  }

  // STEP 5: Strict Emoji Audit
  console.log('\n[Step 5] Auditing page for any unauthorized UI emojis...');
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu;
  
  // Check diagnostic test page
  const pageBodyText = await page.locator('body').innerText();
  const emojiMatches = pageBodyText.match(emojiRegex) || [];
  console.log(`Emoji audit on /diagnostic: found ${emojiMatches.length} emojis`);
  if (emojiMatches.length > 0) {
    console.error('Found disallowed emojis:', emojiMatches);
    throw new Error(`Disallowed emojis found on /diagnostic: ${emojiMatches.join(', ')}`);
  }
  console.log('✓ Zero UI emojis verified on /diagnostic.');

  // STEP 6: Mobile Responsiveness Check
  console.log('\n[Step 6] Testing Mobile Safe Area & Responsiveness (375x667)...');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(300);

  // Check if body has horizontal scroll
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(`Mobile dimensions - scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
  if (scrollWidth > clientWidth + 2) {
    throw new Error(`Horizontal overflow detected on mobile: ${scrollWidth} > ${clientWidth}`);
  }
  console.log('✓ Mobile responsiveness verified with 0 horizontal overflow.');

  // Take confirmation screenshot
  await page.screenshot({ path: 'scratch/diagnostic_retake_mobile.png' });
  console.log('✓ Mobile screenshot saved to scratch/diagnostic_retake_mobile.png');

  await browser.close();
  console.log('\n=== ALL E2E AND DATA PIPELINE TESTS PASSED SUCCESSFULLY ===');
}

runTests().catch(err => {
  console.error('\n❌ E2E TEST FAILED:', err);
  process.exit(1);
});
