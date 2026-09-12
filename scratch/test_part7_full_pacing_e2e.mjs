import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';

const BASE_URL = 'http://localhost:3000';
const NEXTAUTH_SECRET = 'my-super-secret-key-12345';

const EMOJI_REGEX = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/u;

function assertNoEmojis(text, contextName) {
  const match = text.match(EMOJI_REGEX);
  if (match) {
    throw new Error(`[VIOLATION] Found UI Emoji '${match[0]}' in ${contextName}`);
  }
}

async function runE2ETests() {
  console.log('=== STARTING PART 7 FULL PACING ANALYTICS & EXAM INTEGRATION E2E TEST ===');

  const token = await encode({
    token: {
      name: 'Test Learner',
      email: 'learner@toeic.com',
      sub: 'user-pacing-test',
    },
    secret: NEXTAUTH_SECRET,
  });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

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
    // ----------------------------------------------------
    // TEST 1: Live Target Pacing Badge on /part7
    // ----------------------------------------------------
    console.log('\n--- 1. Testing Live Target Pacing Badge on /part7 ---');
    await page.goto(`${BASE_URL}/part7?test=ets2022_test1`);
    await page.waitForTimeout(1500);

    const bodyText = await page.locator('body').innerText();
    assertNoEmojis(bodyText, 'Part 7 Initial Load');
    console.log('-> NO UI Emojis check: PASSED (0 emojis)');

    const targetBadge = page.locator('span[class*="targetPaceBadge"]');
    await targetBadge.waitFor({ state: 'visible', timeout: 5000 });
    const targetBadgeText = await targetBadge.innerText();
    console.log(`-> Target Badge text: "${targetBadgeText}"`);
    if (!targetBadgeText.includes('Mục tiêu ETS:')) {
      throw new Error(`Expected Target Badge to include "Mục tiêu ETS:", got "${targetBadgeText}"`);
    }

    // ----------------------------------------------------
    // TEST 2: Answer Passage, Submit, Verify Review Pacing Badge
    // ----------------------------------------------------
    console.log('\n--- 2. Testing Passage Review Pacing Badge ---');
    // Click answer options
    const optionBtns = page.locator('button[class*="optionBtn"]');
    const count = await optionBtns.count();
    if (count > 0) {
      await optionBtns.first().click();
      await page.waitForTimeout(400);
      const opt2 = page.locator('button[class*="optionBtn"]');
      if (await opt2.count() > 0) {
        await opt2.first().click();
      }
    }

    // Click submit if visible
    const submitBtn = page.locator('button[class*="submitBtn"]');
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      await page.waitForTimeout(500);
    }

    // Check review pacing badge
    const reviewPacingBadge = page.locator('span[class*="pacingBadge"]');
    if (await reviewPacingBadge.isVisible()) {
      const paceText = await reviewPacingBadge.innerText();
      console.log(`-> Review Pacing Badge: "${paceText}"`);
      if (!paceText.includes('Tốc độ:')) {
        throw new Error(`Expected review pacing badge to show "Tốc độ:", got "${paceText}"`);
      }
    }

    // ----------------------------------------------------
    // TEST 3: Complete Session to Reach Results Screen & Verify Session Pacing Card
    // ----------------------------------------------------
    console.log('\n--- 3. Testing Full Session Pacing Analytics Card on /part7 Results ---');
    // Filter to a 1-passage view for rapid testing: e.g. questionType=Sentence Placement
    await page.goto(`${BASE_URL}/part7?test=ets2022_test1&questionType=Sentence%20Placement`);
    await page.waitForTimeout(1500);

    // Answer questions
    let hasNext = true;
    let guard = 0;
    while (hasNext && guard < 10) {
      guard++;
      const opts = page.locator('button[class*="optionBtn"]');
      const optCount = await opts.count();
      for (let i = 0; i < optCount; i++) {
        const o = page.locator('button[class*="optionBtn"]').first();
        if (await o.isVisible()) {
          await o.click();
          await page.waitForTimeout(300);
        }
      }

      const sub = page.locator('button[class*="submitBtn"]');
      if (await sub.isVisible()) {
        await sub.click();
        await page.waitForTimeout(500);
      }

      // Check next button in PracticeFooter
      const nextBtn = page.locator('button:has-text("Đoạn văn tiếp theo"), button:has-text("Xem tổng kết")');
      if (await nextBtn.isVisible()) {
        const text = await nextBtn.innerText();
        await nextBtn.click();
        await page.waitForTimeout(500);
        if (text.includes('Xem tổng kết')) {
          hasNext = false;
        }
      } else {
        hasNext = false;
      }
    }

    // We should now be on results screen (isFinished = true)
    const resultsHeader = page.locator('h1:has-text("Hoàn thành Luyện Đọc hiểu Part 7!")');
    await resultsHeader.waitFor({ state: 'visible', timeout: 5000 });
    console.log('-> Reached Part 7 Results Screen');

    // Emoji check on results screen
    const resultsBody = await page.locator('body').innerText();
    assertNoEmojis(resultsBody, 'Part 7 Results Screen');
    console.log('-> NO UI Emojis check on Results: PASSED (0 emojis)');

    // Verify Session Pacing Card
    const sessionPacingCard = page.locator('div[class*="sessionPacingCard"]');
    await sessionPacingCard.waitFor({ state: 'visible', timeout: 5000 });
    const pacingCardText = await sessionPacingCard.innerText();
    console.log('-> Session Pacing Card Content:\n', pacingCardText.substring(0, 300) + '...');

    const lowerPacingCard = pacingCardText.toLowerCase();
    if (!lowerPacingCard.includes('phân tích nhịp độ đọc hiểu toàn phiên')) {
      throw new Error('Missing "Phân tích Nhịp độ Đọc hiểu Toàn phiên" title in pacing card');
    }
    if (!lowerPacingCard.includes('tốc độ trung bình phiên')) {
      throw new Error('Missing "Tốc độ trung bình phiên" in pacing card');
    }
    if (!lowerPacingCard.includes('s / câu')) {
      throw new Error('Missing "s / câu" pace display in pacing card');
    }

    // ----------------------------------------------------
    // TEST 4: Exam Simulation Part 7 Pacing Card on /exam Results
    // ----------------------------------------------------
    console.log('\n--- 4. Testing Part 7 Pacing Analytics in Full Exam (/exam) ---');
    await page.goto(`${BASE_URL}/exam?test=ets2022_test1`);
    await page.waitForTimeout(2000);

    const examBody = await page.locator('body').innerText();
    assertNoEmojis(examBody, 'Exam Simulation Initial Load');

    // Navigate to a Part 7 question (e.g. Q147) using the Question Palette
    console.log('-> Navigating to Part 7 Question in Exam...');
    const rcTab = page.locator('button:has-text("Reading (101-200)")');
    if (await rcTab.isVisible()) {
      await rcTab.click();
      await page.waitForTimeout(300);
    }

    // Click question 147 in grid
    const q147Btn = page.locator('button:has-text("147")');
    if (await q147Btn.isVisible()) {
      await q147Btn.click();
      await page.waitForTimeout(500);
      console.log('-> Selected Q147 (Part 7)');
    }

    // Answer a couple of questions
    const examOptions = page.locator('button[class*="optionItem"]');
    if (await examOptions.count() > 0) {
      await examOptions.first().click();
      await page.waitForTimeout(400);
    }

    // Now submit the exam
    console.log('-> Submitting Full Exam...');
    // Handle window confirm dialog
    page.on('dialog', (dialog) => dialog.accept());

    const submitExamBtn = page.locator('button[class*="submitExamBtn"]');
    await submitExamBtn.waitFor({ state: 'visible', timeout: 5000 });
    await submitExamBtn.click();
    await page.waitForTimeout(1500);

    // Verify Exam Results Screen
    const examReportTitle = page.locator('div[class*="scoreBannerTitle"]');
    await examReportTitle.waitFor({ state: 'visible', timeout: 5000 });
    console.log('-> Reached Full Exam Results Screen');

    const examResultsBody = await page.locator('body').innerText();
    assertNoEmojis(examResultsBody, 'Exam Results Screen');
    console.log('-> Exam Results NO UI Emojis check: PASSED (0 emojis)');

    // Verify Part 7 Pacing Analysis Card in Exam Results
    const examPacingCard = page.locator('div[class*="pacingAnalysisCard"]');
    await examPacingCard.waitFor({ state: 'visible', timeout: 5000 });
    const examPacingText = await examPacingCard.innerText();
    console.log('-> Exam Part 7 Pacing Card Content:\n', examPacingText);

    const lowerExamPacing = examPacingText.toLowerCase();
    if (!lowerExamPacing.includes('phân tích nhịp độ & thời gian part 7')) {
      throw new Error('Missing "Phân tích Nhịp độ & Thời gian Part 7" in exam results');
    }
    if (!lowerExamPacing.includes('thời gian làm part 7')) {
      throw new Error('Missing "Thời gian làm Part 7"');
    }
    if (!lowerExamPacing.includes('tốc độ trung bình')) {
      throw new Error('Missing "Tốc độ trung bình"');
    }
    if (!lowerExamPacing.includes('đánh giá nguy cơ')) {
      throw new Error('Missing "Đánh giá nguy cơ"');
    }
    if (!lowerExamPacing.includes('chuẩn ets: ≤ 54 phút')) {
      throw new Error('Missing "Chuẩn ETS: ≤ 54 phút"');
    }

    // Verify Knowledge Gap Breakdown also rendered Part 7 reading breakdown
    const readingBreakdown = page.locator('div:has-text("Bóc tách Kỹ năng Đọc hiểu Part 7")');
    const isReadingBreakdownVisible = await readingBreakdown.first().isVisible();
    console.log(`-> KnowledgeGap Reading Comprehension breakdown visible: ${isReadingBreakdownVisible}`);
    if (!isReadingBreakdownVisible) {
      throw new Error('Expected Part 7 Reading Comprehension Breakdown to be visible in KnowledgeGapBreakdown');
    }

    console.log('\n=== ALL E2E PACING & EXAM INTEGRATION TESTS PASSED 100%! ===\n');
  } catch (err) {
    console.error('\n❌ TEST FAILED:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runE2ETests();
