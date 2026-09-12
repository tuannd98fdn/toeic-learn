import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';
import path from 'path';

const secret = "my-super-secret-key-12345";
const artifactDir = "/Users/bravee06/.gemini/antigravity-ide/brain/18c994e6-6d56-44e0-bd71-9339ae12483f";

async function run() {
  const token = await encode({
    token: {
      name: "Test Learner",
      email: "learner@toeic.com",
      sub: "user-123"
    },
    secret
  });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

  await context.addCookies([
    {
      name: "next-auth.session-token",
      value: token,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax"
    }
  ]);

  const page = await context.newPage();

  // Automatically accept all window.confirm dialogs
  page.on('dialog', async (dialog) => {
    console.log(`Auto-accepting dialog: "${dialog.message()}"`);
    await dialog.accept();
  });

  console.log('=== Step 1: Testing Mini-test Knowledge Gap Breakdown ===');
  await page.goto('http://localhost:3000/mini-test');
  await page.waitForTimeout(2000);

  // Answer first 2 questions
  const firstOption = await page.$('button[class*="optionBtn"]');
  if (firstOption) {
    await firstOption.click();
    await page.waitForTimeout(300);
  }

  // Submit test
  console.log('Clicking Nộp bài on Mini-test...');
  const submitBtn = await page.$('button:has-text("Nộp bài")');
  if (!submitBtn) {
    throw new Error('Submit button on Mini-test not found!');
  }
  await submitBtn.click();
  await page.waitForTimeout(2000);

  // Check if Results Screen contains Knowledge Gap Breakdown
  const resultsText = await page.innerText('body');
  const hasBreakdownTitle = resultsText.includes('Báo cáo Bóc tách Lỗ hổng Kiến thức');
  const hasSectionComparison = resultsText.includes('Part 2: Phản xạ Hỏi - Đáp') && resultsText.includes('Part 5: Ngữ pháp & Từ vựng');
  const hasPriorityCard = resultsText.includes('Chủ điểm Cần Ưu Tiên Khắc Phục Gấp') || resultsText.includes('Tuyệt vời!');
  const hasSubSkillTable = resultsText.includes('Bóc tách Toàn bộ Chủ điểm Ngữ pháp');

  console.log('Mini-test Results Check:');
  console.log(' - Has Breakdown Title:', hasBreakdownTitle);
  console.log(' - Has Part 2 vs Part 5 Comparison:', hasSectionComparison);
  console.log(' - Has Priority Remediation Card:', hasPriorityCard);
  console.log(' - Has Detailed Sub-skill Table:', hasSubSkillTable);

  if (!hasBreakdownTitle || !hasSectionComparison || !hasPriorityCard) {
    throw new Error('Mini-test Knowledge Gap Breakdown is missing elements!');
  }

  // Check NO EMOJI rule
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u2300-\u23FF\u2600-\u26FF\u2700-\u27BF]/u;
  const hasEmoji = emojiRegex.test(resultsText);
  console.log(' - NO UI Emojis check in Mini-test:', !hasEmoji ? 'PASSED (0 emojis)' : 'FAILED (emojis found!)');

  await page.screenshot({ path: path.join(artifactDir, 'minitest_gap_breakdown.png'), fullPage: true });
  console.log('Saved screenshot: minitest_gap_breakdown.png');

  // Verify drill CTA link
  const drillLink = await page.$('a[href*="/part5?subCategory="]');
  if (drillLink) {
    const drillHref = await drillLink.getAttribute('href');
    console.log('Found Drill CTA Link:', drillHref);
    console.log('Clicking drill CTA link to verify navigation...');
    await drillLink.click();
    await page.waitForTimeout(2000);
    const currentUrl = page.url();
    console.log('Navigated to:', currentUrl);
    if (!currentUrl.includes('/part5?subCategory=')) {
      throw new Error(`Expected navigation to /part5?subCategory=..., got ${currentUrl}`);
    }
  }

  console.log('\n=== Step 2: Testing Full Exam Knowledge Gap Breakdown ===');
  await page.goto('http://localhost:3000/exam');
  await page.waitForTimeout(2500);

  // Submit full exam
  console.log('Clicking Nộp bài on Full Exam...');
  const examSubmitBtn = await page.$('button:has-text("Nộp bài")');
  if (!examSubmitBtn) {
    throw new Error('Submit button on Full Exam not found!');
  }
  await examSubmitBtn.click();
  await page.waitForTimeout(3000);

  const examResultsText = await page.innerText('body');
  const hasExamBreakdownTitle = examResultsText.includes('Báo cáo Bóc tách Lỗ hổng Kiến thức');
  const hasExamPriorityCard = examResultsText.includes('Chủ điểm Cần Ưu Tiên Khắc Phục Gấp');
  const hasExamSubSkillTable = examResultsText.includes('Bóc tách Toàn bộ Chủ điểm Ngữ pháp');
  const hasNotebookAction = examResultsText.includes('Sổ tay câu hỏi sai');

  console.log('Exam Results Check:');
  console.log(' - Has Exam Breakdown Title:', hasExamBreakdownTitle);
  console.log(' - Has Exam Priority Card:', hasExamPriorityCard);
  console.log(' - Has Exam Sub-skill Table:', hasExamSubSkillTable);
  console.log(' - Has Sổ tay câu hỏi sai Link:', hasNotebookAction);

  const hasExamEmoji = emojiRegex.test(examResultsText);
  console.log(' - NO UI Emojis check in Exam:', !hasExamEmoji ? 'PASSED (0 emojis)' : 'FAILED (emojis found!)');

  if (!hasExamBreakdownTitle || !hasExamPriorityCard || !hasExamSubSkillTable) {
    throw new Error('Full Exam Knowledge Gap Breakdown is missing elements!');
  }

  await page.screenshot({ path: path.join(artifactDir, 'exam_gap_breakdown.png'), fullPage: true });
  console.log('Saved screenshot: exam_gap_breakdown.png');

  console.log('\nAll Knowledge Gap Breakdown E2E tests PASSED successfully!');
  await browser.close();
}

run().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
