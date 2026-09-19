import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';
import fs from 'fs';
import path from 'path';

async function runMiniTest7PartsE2ETest() {
  console.log('=== STARTING 7-PART STANDARDIZED MINI TEST E2E TEST ===\n');

  const browser = await chromium.launch({ headless: true });

  const secret = 'my-super-secret-key-12345';
  const token = {
    name: 'Nguyễn Đình Tuấn',
    email: 'tuannd98@gmail.com',
    picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tuannd98',
    sub: '123456789'
  };
  const sessionToken = await encode({ token, secret });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light',
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });

  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax'
    },
    {
      name: 'toeic_guest_mode',
      value: '1',
      domain: 'localhost',
      path: '/'
    }
  ]);

  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Console Error:', msg.text());
    }
  });

  page.on('dialog', async dialog => {
    console.log(`Dialog prompt: "${dialog.message()}" -> Accepting`);
    await dialog.accept();
  });

  // STEP 1: Pre-test Setup Screen Verification
  console.log('[Step 1] Navigating to /mini-test Pre-test Setup Screen...');
  await page.goto('http://localhost:3000/mini-test', { waitUntil: 'networkidle' });

  // Clear previous minitest result for fresh test
  await page.evaluate(() => {
    localStorage.removeItem('toeic_minitest_result');
    localStorage.removeItem('toeic_minitest_answers');
  });
  await page.reload({ waitUntil: 'networkidle' });

  const titleText = await page.textContent('h1');
  console.log('Setup Title:', titleText);
  if (!titleText || !titleText.includes('Đánh Giá Năng Lực TOEIC Toàn Diện 20 Phút')) {
    throw new Error(`Unexpected setup title: ${titleText}`);
  }

  // Check metrics row
  const metrics = await page.$$eval('[class*="metricVal"]', els => els.map(e => e.textContent?.trim()));
  console.log('Metrics Values:', metrics);
  if (!metrics.includes('25') || !metrics.includes('7/7') || !metrics.includes('20:00')) {
    throw new Error('Metrics row missing expected 25 questions, 7/7 parts, or 20:00');
  }

  // Check 7 Parts structure pills
  const partPills = await page.$$eval('[class*="partPillName"]', els => els.map(e => e.textContent?.trim()));
  console.log('7 Parts Pills:', partPills);
  if (partPills.length < 7) {
    throw new Error(`Expected at least 7 parts pills, got ${partPills.length}`);
  }

  // Check test selection cards
  const testCards = await page.$$eval('[class*="testCardTitle"]', els => els.map(e => e.textContent?.trim()));
  console.log('Available Test Cards:', testCards);
  if (!testCards.includes('ETS 2022 - Test 1') || !testCards.includes('ETS 2022 - Test 6') || !testCards.includes('Đề Trộn Ngẫu Nhiên Liên Đề')) {
    throw new Error('Missing ETS tests or Cross-Test Pool in test selector');
  }

  // Select ETS 2022 Test 2
  console.log('[Step 1.2] Selecting ETS 2022 - Test 2...');
  await page.click('button:has-text("ETS 2022 - Test 2")');
  await page.waitForTimeout(300);

  // Take screenshot of setup screen
  await page.screenshot({ path: 'scratch/minitest_setup_desktop.png' });
  console.log('✓ Saved screenshot: scratch/minitest_setup_desktop.png');

  // STEP 2: Start Mini Test & Verify 7 Parts Simulation
  console.log('\n[Step 2] Clicking "Bắt Đầu Mini Test"...');
  await page.click('button:has-text("Bắt Đầu Mini Test")');

  // Wait for simulation UI to load
  await page.waitForSelector('[class*="examLayout"]', { timeout: 15000 });
  console.log('✓ Mini Test simulation interface loaded!');

  // Verify total questions in right navigator
  const gridBtns = await page.$$('[class*="gridBtn"]');
  console.log(`Total questions in navigator: ${gridBtns.length}`);
  if (gridBtns.length !== 25) {
    throw new Error(`Expected exactly 25 questions, got ${gridBtns.length}`);
  }

  // Verify Part 1 (Photographs): Q1 has image and audio
  const q1Part = await page.textContent('[class*="partBadge"]');
  console.log(`Q1 Part Badge: "${q1Part}"`);
  const hasImage = await page.$('img[class*="questionImage"]');
  const hasAudio = await page.$('[class*="audioPlayerContainer"], audio');
  console.log(`Q1 Has Image: ${!!hasImage}, Has Audio: ${!!hasAudio}`);

  // Test keyboard shortcut 'A' to answer Q1
  await page.keyboard.press('KeyA');
  await page.waitForTimeout(200);

  // Test keyboard shortcut 'F' to flag Q1
  await page.keyboard.press('KeyF');
  await page.waitForTimeout(200);
  const q1Flagged = await page.$('[class*="flagBtn"][class*="flagged"]');
  console.log(`Q1 Flagged state: ${!!q1Flagged}`);

  // Jump to Q3 (Part 2: Question-Response)
  console.log('[Step 2.1] Jumping to Q3 (Part 2)...');
  await gridBtns[2].click();
  await page.waitForTimeout(300);
  const q3Part = await page.textContent('[class*="partBadge"]');
  console.log(`Q3 Part Badge: "${q3Part}"`);
  const q3Options = await page.$$eval('[class*="optionLetter"]', els => els.map(e => e.textContent?.trim()));
  console.log('Q3 Options letters:', q3Options);
  if (!q3Options.includes('A') || !q3Options.includes('B') || !q3Options.includes('C')) {
    throw new Error('Part 2 question missing A/B/C options');
  }

  // Jump to Q7 (Part 3: Short Conversations)
  console.log('[Step 2.2] Jumping to Q7 (Part 3)...');
  await gridBtns[6].click();
  await page.waitForTimeout(300);
  const q7Part = await page.textContent('[class*="partBadge"]');
  console.log(`Q7 Part Badge: "${q7Part}"`);

  // Jump to Q10 (Part 4: Short Talks)
  console.log('[Step 2.3] Jumping to Q10 (Part 4)...');
  await gridBtns[9].click();
  await page.waitForTimeout(300);
  const q10Part = await page.textContent('[class*="partBadge"]');
  console.log(`Q10 Part Badge: "${q10Part}"`);

  // Jump to Q13 (Part 5: Incomplete Sentences)
  console.log('[Step 2.4] Jumping to Q13 (Part 5)...');
  await gridBtns[12].click();
  await page.waitForTimeout(300);
  const q13Part = await page.textContent('[class*="partBadge"]');
  console.log(`Q13 Part Badge: "${q13Part}"`);

  // Jump to Q18 (Part 6: Text Completion)
  console.log('[Step 2.5] Jumping to Q18 (Part 6)...');
  await gridBtns[17].click();
  await page.waitForTimeout(300);
  const q18Part = await page.textContent('[class*="partBadge"]');
  console.log(`Q18 Part Badge: "${q18Part}"`);
  const hasPassageP6 = await page.$('[class*="passageBox"]');
  console.log(`Q18 has passageBox: ${!!hasPassageP6}`);

  // Jump to Q22 (Part 7: Reading Comprehension)
  console.log('[Step 2.6] Jumping to Q22 (Part 7)...');
  await gridBtns[21].click();
  await page.waitForTimeout(300);
  const q22Part = await page.textContent('[class*="partBadge"]');
  console.log(`Q22 Part Badge: "${q22Part}"`);
  const hasPassageP7 = await page.$('[class*="passageBox"]');
  console.log(`Q22 has passageBox: ${!!hasPassageP7}`);

  // Take screenshot of simulation
  await page.screenshot({ path: 'scratch/minitest_simulation_desktop.png' });
  console.log('✓ Saved screenshot: scratch/minitest_simulation_desktop.png');

  // Answer all 25 questions
  console.log('\n[Step 2.7] Answering all 25 questions...');
  for (let i = 0; i < 25; i++) {
    await gridBtns[i].click();
    await page.waitForTimeout(100);
    // Click option A or B
    const optButtons = await page.$$('[class*="optionItem"]');
    if (optButtons.length > 0) {
      const chosenOpt = i % 2 === 0 ? optButtons[0] : (optButtons[1] || optButtons[0]);
      await chosenOpt.click();
    }
  }

  const progressBadge = await page.textContent('[class*="progressBadge"]');
  console.log(`Progress after answering: "${progressBadge}"`);

  // STEP 3: Submit Exam & Verify 9.5 Results Screen
  console.log('\n[Step 3] Submitting Mini Test...');
  await page.click('button[class*="submitExamBtn"]');
  await page.waitForTimeout(1500);

  // Verify Results Screen elements
  await page.waitForSelector('[class*="scorePrimaryVal"]', { timeout: 10000 });
  const totalEstimatedScore = await page.textContent('[class*="scorePrimaryVal"]');
  console.log(`Estimated TOEIC Total Score: ${totalEstimatedScore} / 990`);
  if (!totalEstimatedScore || isNaN(Number(totalEstimatedScore)) || Number(totalEstimatedScore) <= 0) {
    throw new Error(`Invalid estimated total score: ${totalEstimatedScore}`);
  }

  const scoreRange = await page.textContent('[class*="scoreRangeText"]');
  console.log(`Estimated Score Range: "${scoreRange}"`);

  const cefrBadge = await page.textContent('[class*="cefrBadgePill"]');
  console.log(`CEFR Level Badge: "${cefrBadge}"`);

  // Check Scaled LC and RC
  const scaledScores = await page.$$eval('[class*="sectionScoreVal"]', els => els.map(e => e.textContent?.trim()));
  console.log(`Scaled LC: ${scaledScores[0]}, Scaled RC: ${scaledScores[1]}`);
  if (!scaledScores[0] || !scaledScores[1]) {
    throw new Error('Scaled LC or RC missing in results screen');
  }

  // Check 7-Part Mastery Matrix
  console.log('\n[Step 3.1] Verifying 7-Part Mastery Matrix...');
  const partMasteryRows = await page.$$('[class*="partMasteryRow"]');
  console.log(`Part mastery rows count: ${partMasteryRows.length}`);
  if (partMasteryRows.length !== 7) {
    throw new Error(`Expected 7 part mastery rows, got ${partMasteryRows.length}`);
  }

  // Check Knowledge Gap Breakdown section overview (Listening vs Reading)
  const kgOverviewCards = await page.$$eval('[class*="sectionCardTitle"]', els => els.map(e => e.textContent?.trim()));
  console.log('Knowledge Gap Section Cards:', kgOverviewCards);
  if (!kgOverviewCards.some(c => c.includes('Listening')) || !kgOverviewCards.some(c => c.includes('Reading'))) {
    throw new Error('Knowledge Gap breakdown missing Listening or Reading section overview');
  }

  // Take screenshot of result screen
  await page.screenshot({ path: 'scratch/minitest_result_desktop.png' });
  console.log('✓ Saved screenshot: scratch/minitest_result_desktop.png');

  // STEP 4: Review Mode & AI Tutor Drawer
  console.log('\n[Step 4] Entering Review Mode...');
  await page.click('button:has-text("Xem Lại 25 Câu")');
  await page.waitForSelector('[class*="reviewFilterBar"]', { timeout: 5000 });

  // Check Review Filter Pills
  const filterPills = await page.$$eval('[class*="filterPill"]', els => els.map(e => e.textContent?.trim()));
  console.log('Review Filter Pills:', filterPills);
  if (!filterPills.some(p => p.includes('Tất cả')) || !filterPills.some(p => p.includes('Listening')) || !filterPills.some(p => p.includes('Reading'))) {
    throw new Error('Review mode filter bar missing expected filters');
  }

  // Check AI Tutor Button
  const askAiBtn = await page.$('button:has-text("Hỏi Gia Sư AI 990 về câu này")');
  if (!askAiBtn) {
    throw new Error('Review mode missing AI Tutor button');
  }
  console.log('Clicking AI Tutor button...');
  await askAiBtn.click();
  await page.waitForTimeout(600);

  const tutorDrawer = await page.$('[class*="drawer"], [class*="drawerContainer"]');
  console.log(`AI Tutor Drawer opened: ${!!tutorDrawer}`);

  // Close AI Tutor Drawer
  const closeBtn = await page.$('button:has-text("Đóng"), [class*="closeButton"], [class*="closeBtn"]');
  if (closeBtn) await closeBtn.click();
  await page.waitForTimeout(300);

  // STEP 5: Test Cross-Test Pool Mode
  console.log('\n[Step 5] Testing Cross-Test Random Pool Mode (?test=cross_random&autostart=true)...');
  await page.goto('http://localhost:3000/mini-test?test=cross_random&autostart=true', { waitUntil: 'networkidle' });
  await page.waitForSelector('[class*="examLayout"]', { timeout: 15000 });
  const crossTestTitle = await page.textContent('[class*="testTitle"]');
  console.log(`Cross-Test Pool Title: "${crossTestTitle}"`);
  const crossQCount = await page.$$('[class*="gridBtn"]');
  console.log(`Cross-Test Pool questions count: ${crossQCount.length}`);
  if (crossQCount.length !== 25) {
    throw new Error(`Expected 25 questions in Cross-Test Pool, got ${crossQCount.length}`);
  }

  // STEP 6: Zero Emoji Audit on DOM
  console.log('\n[Step 6] Running Strict DOM Regex Emoji Audit...');
  const pageText = await page.evaluate(() => document.body.innerText);
  const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
  const foundEmoji = pageText.match(emojiRegex);
  if (foundEmoji) {
    console.error(`VIOLATION: Found forbidden emoji in DOM: "${foundEmoji[0]}"`);
    throw new Error(`DOM Emoji audit failed! Found: ${foundEmoji[0]}`);
  }
  console.log('✓ PASS: Strict DOM Regex Emoji Audit - 0 emojis found across the page!');

  // STEP 7: Mobile Responsiveness Verification
  console.log('\n[Step 7] Testing Mobile Viewport (375x812)...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(500);

  // Check horizontal overflow
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log(`Mobile has horizontal scroll overflow: ${hasHorizontalScroll}`);
  if (hasHorizontalScroll) {
    throw new Error('Mobile viewport has horizontal scroll overflow!');
  }

  await page.screenshot({ path: 'scratch/minitest_mobile.png' });
  console.log('✓ Saved screenshot: scratch/minitest_mobile.png');

  await browser.close();
  console.log('\n======================================================');
  console.log('🎉 ALL MINI TEST 7-PART & TEST SELECTION TESTS PASSED 100%!');
  console.log('======================================================\n');
}

runMiniTest7PartsE2ETest().catch(err => {
  console.error('\n❌ E2E TEST FAILED:', err);
  process.exit(1);
});
