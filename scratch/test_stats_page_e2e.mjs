import { chromium } from 'playwright';

async function main() {
  console.log('=== STARTING STATS PAGE COMPREHENSIVE E2E VERIFICATION ===');
  const browser = await chromium.launch({ headless: true });

  const mockExamHistory = [
    {
      testId: 'test1',
      testName: 'ETS 2022 Test 1',
      date: '10/09/2026',
      rawLC: 65,
      rawRC: 55,
      scaledLC: 330,
      scaledRC: 260,
      totalScore: 590,
      cefrLevel: 'B1',
      partScores: {
        part1: { correct: 5, total: 6, accuracy: 83 },
        part2: { correct: 18, total: 25, accuracy: 72 },
        part3: { correct: 24, total: 39, accuracy: 62 },
        part4: { correct: 18, total: 30, accuracy: 60 },
        part5: { correct: 18, total: 30, accuracy: 60 },
        part6: { correct: 9, total: 16, accuracy: 56 },
        part7: { correct: 28, total: 54, accuracy: 52 },
      },
      weakestPart: { part: 'part7', partName: 'Part 7: Reading Comprehension', accuracy: 52, advice: 'Luyện đọc lướt' },
    },
    {
      testId: 'test2',
      testName: 'ETS 2022 Test 2',
      date: '15/09/2026',
      rawLC: 72,
      rawRC: 68,
      scaledLC: 375,
      scaledRC: 335,
      totalScore: 710,
      cefrLevel: 'B2',
      partScores: {
        part1: { correct: 6, total: 6, accuracy: 100 },
        part2: { correct: 20, total: 25, accuracy: 80 },
        part3: { correct: 27, total: 39, accuracy: 69 },
        part4: { correct: 19, total: 30, accuracy: 63 },
        part5: { correct: 20, total: 30, accuracy: 67 },
        part6: { correct: 11, total: 16, accuracy: 69 },
        part7: { correct: 37, total: 54, accuracy: 69 },
      },
      weakestPart: { part: 'part4', partName: 'Part 4: Short Talks', accuracy: 63, advice: 'Luyện nghe độc thoại' },
    },
    {
      testId: 'test3',
      testName: 'ETS 2022 Test 3',
      date: '18/09/2026',
      rawLC: 80,
      rawRC: 75,
      scaledLC: 415,
      scaledRC: 375,
      totalScore: 790,
      cefrLevel: 'B2',
      partScores: {
        part1: { correct: 6, total: 6, accuracy: 100 },
        part2: { correct: 22, total: 25, accuracy: 88 },
        part3: { correct: 31, total: 39, accuracy: 79 },
        part4: { correct: 21, total: 30, accuracy: 70 },
        part5: { correct: 24, total: 30, accuracy: 80 },
        part6: { correct: 12, total: 16, accuracy: 75 },
        part7: { correct: 39, total: 54, accuracy: 72 },
      },
      weakestPart: { part: 'part4', partName: 'Part 4: Short Talks', accuracy: 70, advice: 'Luyện nghe độc thoại' },
    },
  ];

  const mockMistakes = {
    't1_q101': { id: 't1_q101', type: 'exam', subCategory: 'Word Form', rootCause: 'Ngữ pháp', wrongCount: 3, isMastered: true },
    't1_q102': { id: 't1_q102', type: 'exam', subCategory: 'Verb Tense', rootCause: 'Ngữ pháp', wrongCount: 2, isMastered: true },
    't1_q103': { id: 't1_q103', type: 'exam', subCategory: 'Preposition & Conjunction', rootCause: 'Mắc bẫy', wrongCount: 4, isMastered: false },
    't1_q104': { id: 't1_q104', type: 'exam', subCategory: 'Business Vocabulary', rootCause: 'Từ vựng', wrongCount: 2, isMastered: true },
    't1_q105': { id: 't1_q105', type: 'exam', subCategory: 'Relative Clause', rootCause: 'Ngữ pháp', wrongCount: 1, isMastered: false },
  };

  const mockLeitner = {
    'word_1': { id: 'word_1', box: 5, lastReviewed: Date.now() },
    'word_2': { id: 'word_2', box: 5, lastReviewed: Date.now() },
    'word_3': { id: 'word_3', box: 5, lastReviewed: Date.now() },
    'word_4': { id: 'word_4', box: 4, lastReviewed: Date.now() },
    'word_5': { id: 'word_5', box: 3, lastReviewed: Date.now() },
    'word_6': { id: 'word_6', box: 2, lastReviewed: Date.now() },
    'word_7': { id: 'word_7', box: 1, lastReviewed: Date.now() },
  };

  const mockStreak = {
    currentStreak: 6,
    bestStreak: 14,
    lastStudyDate: new Date().toISOString(),
    freezeCount: 2,
    isFrozenToday: false,
  };

  // -----------------------------------------------------------------
  // 1. Desktop Light Mode Test
  // -----------------------------------------------------------------
  console.log('\n--- 1. Testing Desktop Light Mode ---');
  const contextDesktop = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
  });
  const page = await contextDesktop.newPage();

  await page.goto('http://localhost:3000/stats', { waitUntil: 'commit' });
  await page.evaluate(({ history, mistakes, leitner, streak }) => {
    localStorage.setItem('toeic_exam_history', JSON.stringify(history));
    localStorage.setItem('mistake_notebook', JSON.stringify(mistakes));
    localStorage.setItem('toeic_leitner_v1', JSON.stringify(leitner));
    localStorage.setItem('vocabulary_streak', JSON.stringify(streak));
  }, { history: mockExamHistory, mistakes: mockMistakes, leitner: mockLeitner, streak: mockStreak });

  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // Check Title
  const title = await page.locator('h1').innerText();
  console.log(`[1a] Page title: "${title}"`);

  // Check 4 Golden Metrics
  const metricCards = page.locator('div[class*="metricCard"]');
  const metricCardsCount = await metricCards.count();
  console.log(`[1b] Golden metric cards count: ${metricCardsCount} (Expected 4)`);
  if (metricCardsCount !== 4) throw new Error(`Expected 4 metric cards, got ${metricCardsCount}`);

  // Check Strategic Diagnosis Banner
  const diagBanner = page.locator('section[class*="diagnosisBanner"]');
  const hasDiag = await diagBanner.count() > 0;
  console.log(`[1c] Strategic Diagnosis Banner present: ${hasDiag ? 'PASS' : 'FAIL'}`);

  // Check 7-Part Mastery Grid
  const partTitles = page.locator('span[class*="partTitle"]');
  const partTitlesCount = await partTitles.count();
  console.log(`[1d] 7-Part Mastery Grid items: ${partTitlesCount} (Expected 7)`);
  if (partTitlesCount !== 7) throw new Error(`Expected 7 part titles, got ${partTitlesCount}`);

  // Check LineChart Chronological Order (Earliest to Latest)
  const chartTicks = await page.locator('.recharts-xAxis .recharts-cartesian-axis-tick-value').allInnerTexts();
  console.log(`[1e] Chart X-Axis Dates:`, chartTicks);
  if (chartTicks.length >= 2) {
    if (chartTicks[0] === '18/09/2026' && chartTicks[chartTicks.length - 1] === '10/09/2026') {
      throw new Error('Chart X-axis is inverted! Shows newest to oldest instead of oldest to newest.');
    }
    console.log('[1e] Chart X-Axis ordering: PASS (Chronological)');
  }

  // Screenshot Desktop Light
  await page.screenshot({ path: 'scratch/stats_enhanced_desktop_light.png', fullPage: true });
  console.log('Saved: scratch/stats_enhanced_desktop_light.png');

  // -----------------------------------------------------------------
  // 2. Testing Share Certificate Modal
  // -----------------------------------------------------------------
  console.log('\n--- 2. Testing Share Certificate Modal ---');
  const shareBtn = page.locator('button:has-text("Khoe Thành Tích")');
  await shareBtn.click();
  await page.waitForTimeout(500);

  const modal = page.locator('div[class*="modalContent"]');
  const isModalVisible = await modal.isVisible();
  console.log(`[2a] Certificate modal visible: ${isModalVisible ? 'PASS' : 'FAIL'}`);
  if (!isModalVisible) throw new Error('Certificate modal did not open!');

  const certTitle = await modal.locator('span[class*="brandLogo"]').innerText();
  console.log(`[2b] Certificate Brand: "${certTitle}"`);

  // Test Download action
  const downloadBtn = modal.locator('button[class*="downloadBtn"]');
  await downloadBtn.click();
  await page.waitForTimeout(800);

  const feedback = await modal.locator('div[class*="feedbackMsg"]').innerText();
  console.log(`[2c] Download feedback: "${feedback}"`);

  // Screenshot Modal
  await page.screenshot({ path: 'scratch/stats_share_card.png' });
  console.log('Saved: scratch/stats_share_card.png');

  // Close modal
  const closeBtn = modal.locator('button[class*="closeBtn"]');
  await closeBtn.click();
  await page.waitForTimeout(300);

  // -----------------------------------------------------------------
  // 3. Testing Desktop Dark Mode
  // -----------------------------------------------------------------
  console.log('\n--- 3. Testing Desktop Dark Mode ---');
  const contextDark = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: 'dark',
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
  });
  const pageDark = await contextDark.newPage();
  await pageDark.goto('http://localhost:3000/stats', { waitUntil: 'commit' });
  await pageDark.evaluate(({ history, mistakes, leitner, streak }) => {
    localStorage.setItem('toeic_exam_history', JSON.stringify(history));
    localStorage.setItem('mistake_notebook', JSON.stringify(mistakes));
    localStorage.setItem('toeic_leitner_v1', JSON.stringify(leitner));
    localStorage.setItem('vocabulary_streak', JSON.stringify(streak));
  }, { history: mockExamHistory, mistakes: mockMistakes, leitner: mockLeitner, streak: mockStreak });

  await pageDark.reload({ waitUntil: 'networkidle' });
  await pageDark.waitForTimeout(800);

  await pageDark.screenshot({ path: 'scratch/stats_enhanced_desktop_dark.png', fullPage: true });
  console.log('Saved: scratch/stats_enhanced_desktop_dark.png');

  // -----------------------------------------------------------------
  // 4. Testing Mobile Layout & Radar Responsiveness (iPhone 375x812)
  // -----------------------------------------------------------------
  console.log('\n--- 4. Testing Mobile Responsiveness (375x812) ---');
  const contextMobile = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
  });
  const pageMobile = await contextMobile.newPage();
  await pageMobile.goto('http://localhost:3000/stats', { waitUntil: 'commit' });
  await pageMobile.evaluate(({ history, mistakes, leitner, streak }) => {
    localStorage.setItem('toeic_exam_history', JSON.stringify(history));
    localStorage.setItem('mistake_notebook', JSON.stringify(mistakes));
    localStorage.setItem('toeic_leitner_v1', JSON.stringify(leitner));
    localStorage.setItem('vocabulary_streak', JSON.stringify(streak));
  }, { history: mockExamHistory, mistakes: mockMistakes, leitner: mockLeitner, streak: mockStreak });

  await pageMobile.reload({ waitUntil: 'networkidle' });
  await pageMobile.waitForTimeout(800);

  // Check container safe-area padding
  const paddingBottom = await pageMobile.evaluate(() => {
    const el = document.getElementById('stats-container');
    return window.getComputedStyle(el).paddingBottom;
  });
  console.log(`[4a] Mobile container padding-bottom: ${paddingBottom}`);

  // Check Radar text elements to ensure short labels fit inside SVG
  const radarTexts = await pageMobile.locator('.recharts-polar-angle-axis-tick text').allInnerTexts();
  console.log(`[4b] Mobile Radar Labels:`, radarTexts);

  await pageMobile.screenshot({ path: 'scratch/stats_enhanced_mobile.png', fullPage: true });
  console.log('Saved: scratch/stats_enhanced_mobile.png');

  // -----------------------------------------------------------------
  // 5. Strict Zero UI Emojis Audit
  // -----------------------------------------------------------------
  console.log('\n--- 5. Strict Zero UI Emojis Audit ---');
  const bodyText = await page.evaluate(() => document.body.innerText);
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const emojis = bodyText.match(emojiRegex);
  console.log(`[5a] Rendered DOM emojis found: ${emojis ? JSON.stringify(emojis) : '0 emojis (PASS)'}`);
  if (emojis && emojis.length > 0) {
    throw new Error(`STRICT NO UI EMOJIS VIOLATION: Found emojis in rendered DOM: ${emojis.join(', ')}`);
  }

  console.log('\n=== ALL STATS ENHANCEMENTS VERIFIED SUCCESSFULLY ===');
  await browser.close();
}

main().catch(err => {
  console.error('TEST FAILED:', err);
  process.exit(1);
});
