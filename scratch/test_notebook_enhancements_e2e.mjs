import { chromium } from 'playwright';

async function main() {
  console.log('--- STARTING NOTEBOOK ENHANCEMENT E2E TESTS ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  const page = await context.newPage();

  // Populate mock data matching user scenario: 6 vocabulary mistakes (4 due) and 74 exam mistakes
  await page.addInitScript(() => {
    // 6 real vocabulary words from vocab_450
    // v4: advertisement, v5: afford, v6: annual, v7: applicant, v8: approve, v9: arrange
    const mockMistakes = {
      'v4': { wrongCount: 3, lastMistakeDate: new Date().toISOString(), type: 'vocabulary', box: 1, nextReviewDate: new Date(Date.now() - 86400000).toISOString() },
      'v5': { wrongCount: 2, lastMistakeDate: new Date().toISOString(), type: 'vocabulary', box: 1, nextReviewDate: new Date(Date.now() - 86400000).toISOString() },
      'v8': { wrongCount: 1, lastMistakeDate: new Date().toISOString(), type: 'vocabulary', box: 2, nextReviewDate: new Date(Date.now() - 86400000).toISOString() },
      'v9': { wrongCount: 1, lastMistakeDate: new Date().toISOString(), type: 'vocabulary', box: 1, nextReviewDate: new Date(Date.now() - 86400000).toISOString() },
      'v13': { wrongCount: 1, lastMistakeDate: new Date().toISOString(), type: 'vocabulary', box: 3, nextReviewDate: new Date(Date.now() + 86400000 * 3).toISOString() },
      'v14': { wrongCount: 1, lastMistakeDate: new Date().toISOString(), type: 'vocabulary', box: 4, nextReviewDate: new Date(Date.now() + 86400000 * 7).toISOString() },
    };

    // Add 74 exam mistakes across Parts
    for (let i = 1; i <= 74; i++) {
      const qNum = 100 + (i % 30);
      const rootCauses = ['Mắc bẫy', 'Ngữ pháp', 'Từ vựng', 'Bất cẩn / Đọc lướt', 'Nghe không rõ'];
      const rc = rootCauses[i % rootCauses.length];
      mockMistakes[`ets2022_test1_part5_${qNum}_${i}`] = {
        wrongCount: 1 + (i % 3),
        lastMistakeDate: new Date().toISOString(),
        type: 'exam',
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: String(qNum),
        box: (i % 4) + 1,
        nextReviewDate: new Date(Date.now() - 86400000).toISOString(),
        rootCause: rc,
        subCategory: i % 2 === 0 ? 'Word Form' : 'Verb Tense'
      };
    }

    localStorage.setItem('mistake_notebook', JSON.stringify(mockMistakes));
  });

  console.log('1. Navigating to /notebook...');
  await page.goto('http://localhost:3000/notebook', { waitUntil: 'networkidle' });

  // Verify header text
  const subtitle = await page.locator('p[class*="subtitle"]').innerText();
  console.log('Subtitle:', subtitle);
  if (!subtitle.includes('6 từ vựng (4 đến hạn)') || !subtitle.includes('74 câu hỏi đề thi')) {
    throw new Error(`Unexpected subtitle: ${subtitle}`);
  }
  console.log('PASS: Subtitle matches 6 vocab (4 due) and 74 exam mistakes.');

  // Verify tabs
  const tabBtns = page.locator('button[class*="tabBtn"]');
  const vocabTabText = await tabBtns.nth(0).innerText();
  const examTabText = await tabBtns.nth(1).innerText();
  console.log('Tabs:', vocabTabText, '|', examTabText);
  if (!vocabTabText.includes('6') || !examTabText.includes('74')) {
    throw new Error('Tab counts do not match!');
  }
  console.log('PASS: Tab counts match 6 and 74.');

  // Verify vocab cards
  const wordCards = page.locator('div[class*="wordCard"]');
  const wordCount = await wordCards.count();
  console.log('Vocab cards rendered:', wordCount);
  if (wordCount !== 6) {
    throw new Error(`Expected 6 word cards, found ${wordCount}`);
  }
  console.log('PASS: Exactly 6 word cards rendered.');

  // Verify search
  const searchInput = page.locator('input[class*="vocabSearchInput"]');
  await searchInput.fill('conference');
  await page.waitForTimeout(300);
  const filteredCount = await page.locator('div[class*="wordCard"]').count();
  console.log('Cards after search "conference":', filteredCount);
  if (filteredCount !== 1) {
    throw new Error(`Expected 1 word card for search "conference", found ${filteredCount}`);
  }
  await searchInput.fill('');
  await page.waitForTimeout(300);
  console.log('PASS: Vocab search works.');

  // Verify "Chỉ xem từ đến hạn (4)"
  const dueFilterBtn = page.locator('button[class*="vocabFilterBtn"]:has-text("Đến hạn (4)")');
  if (await dueFilterBtn.count() > 0) {
    await dueFilterBtn.click();
    await page.waitForTimeout(300);
    const dueCount = await page.locator('div[class*="wordCard"]').count();
    console.log('Due words rendered:', dueCount);
    if (dueCount !== 4) {
      throw new Error(`Expected 4 due words, found ${dueCount}`);
    }
    console.log('PASS: Due filter correctly displays 4 words.');
    // Reset to all
    await page.locator('button[class*="vocabFilterBtn"]:has-text("Tất cả (6)")').click();
    await page.waitForTimeout(300);
  }

  // Verify expandable details
  const expandBtn = page.locator('button[class*="toggleDetailsBtn"]').first();
  if (await expandBtn.count() > 0) {
    await expandBtn.click();
    await page.waitForTimeout(200);
    const hasMnemonic = await page.locator('div[class*="mnemonicBox"]').count();
    console.log('Mnemonic box visible:', hasMnemonic > 0);
    if (hasMnemonic === 0) {
      throw new Error('Mnemonic box did not expand!');
    }
    console.log('PASS: Mnemonic & examples expander works.');
  }

  // Capture Desktop Vocab Screenshot
  await page.screenshot({ path: 'scratch/notebook_enhanced_vocab_desktop.png' });
  console.log('Saved scratch/notebook_enhanced_vocab_desktop.png');

  // 2. Test Quiz navigation & bug fix verification
  console.log('2. Testing /notebook/quiz navigation...');
  const quizLink = page.locator('a:has-text("Bắt đầu test chuộc lỗi")');
  await quizLink.click();
  await page.waitForURL('**/notebook/quiz', { timeout: 10000 });
  await page.waitForTimeout(1000);

  // Check that quiz loaded with questions, NOT "Không có từ nào!"
  const emptyTitle = page.locator('h2:has-text("Không có từ nào")');
  if (await emptyTitle.count() > 0) {
    throw new Error('CRITICAL BUG DETECTED: Quiz showed "Không có từ nào!" despite having 6 vocab mistakes!');
  }
  const progressText = await page.locator('span[class*="questionBadge"]').first().innerText();
  console.log('Quiz Progress Info:', progressText);
  if (!progressText.includes('Câu 1 /')) {
    throw new Error(`Quiz did not start properly: ${progressText}`);
  }
  console.log('PASS: /notebook/quiz bug fixed! Quiz successfully loaded with vocab questions.');

  await page.screenshot({ path: 'scratch/notebook_enhanced_quiz_loaded.png' });
  console.log('Saved scratch/notebook_enhanced_quiz_loaded.png');

  // 3. Return to /notebook and test Exam Tab
  console.log('3. Returning to /notebook and testing Exam Tab (74 mistakes)...');
  await page.goto('http://localhost:3000/notebook?tab=exam', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Verify matrix
  const matrixCards = page.locator('div[class*="matrixCard"]');
  console.log('Matrix cards rendered:', await matrixCards.count());
  if (await matrixCards.count() < 5) {
    throw new Error('Matrix cards missing!');
  }

  // Verify exam question cards
  const examCards = page.locator('div[class*="examCard"]');
  console.log('Exam question cards rendered:', await examCards.count());
  if (await examCards.count() === 0) {
    throw new Error('No exam cards rendered!');
  }
  console.log('PASS: Exam tab loaded with matrix and question cards.');

  await page.screenshot({ path: 'scratch/notebook_enhanced_exam_desktop.png' });
  console.log('Saved scratch/notebook_enhanced_exam_desktop.png');

  // 4. Mobile Viewport Testing (375x812)
  console.log('4. Testing Mobile Viewport (375x812)...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:3000/notebook', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Check tabs wrapping on mobile
  const tab0Box = await tabBtns.nth(0).boundingBox();
  console.log('Mobile Tab 0 height:', tab0Box?.height);
  // Before fix, text wrapped into 3 lines making button > 60px high. Now should be ~44px
  if (tab0Box && tab0Box.height > 60) {
    throw new Error(`Mobile tab text still wrapping! Height is ${tab0Box.height}`);
  }
  console.log('PASS: Mobile tabs do not wrap into multiple lines.');

  await page.screenshot({ path: 'scratch/notebook_enhanced_vocab_mobile.png' });
  console.log('Saved scratch/notebook_enhanced_vocab_mobile.png');

  // Mobile Exam Tab
  await tabBtns.nth(1).click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scratch/notebook_enhanced_exam_mobile.png' });
  console.log('Saved scratch/notebook_enhanced_exam_mobile.png');

  // 5. NO UI EMOJIS CHECK
  console.log('5. Verifying strict NO UI EMOJIS...');
  const emojiAudit = await page.evaluate(() => {
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    const text = document.body.innerText;
    const match = text.match(emojiRegex);
    return {
      hasEmoji: !!match,
      match: match ? match[0] : null
    };
  });
  console.log('Emoji Audit Result:', emojiAudit);
  if (emojiAudit.hasEmoji) {
    throw new Error(`FOUND FORBIDDEN EMOJI: ${emojiAudit.match}`);
  }
  console.log('PASS: Strict NO UI EMOJIS verified (0 emojis found in DOM).');

  console.log('--- ALL NOTEBOOK ENHANCEMENT TESTS PASSED 100% ---');
  await browser.close();
}

main().catch(err => {
  console.error('TEST FAILED:', err);
  process.exit(1);
});
