import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';

const secret = 'my-super-secret-key-12345';

async function runTest() {
  const token = await encode({
    token: {
      id: 'test-user-id',
      email: 'test@example.com',
      name: 'Test User',
      sub: 'test-user-id',
      role: 'USER',
    },
    secret,
  });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
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

  console.log('--- TEST 1: Default Part 6 View & Pacing Indicator ---');
  await page.goto('http://localhost:3000/part6?test=ets2022_test1', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForSelector('text=Part 6: Text Completion', { timeout: 10000 });

  // Check Sub-skill tabs
  const subSkillTabs = await page.$$('button:has-text("Tất cả"), button:has-text("Điền cả câu văn"), button:has-text("Ngữ pháp")');
  console.log('Found Sub-skill tabs count:', subSkillTabs.length);
  if (subSkillTabs.length < 3) throw new Error('Sub-skill tabs not rendered properly');

  // Check Pacing Indicator
  const pacingTarget = await page.textContent('text=Mục tiêu: ≤ 2:00');
  console.log('Pacing target found:', pacingTarget);
  if (!pacingTarget) throw new Error('Pacing target not found');

  // Check Time Attack toggle
  const timeAttackBtn = await page.waitForSelector('button:has-text("Bật Time Attack"), button:has-text("Đếm ngược")');
  await timeAttackBtn.click();
  await page.waitForTimeout(500);
  console.log('Toggled Time Attack successfully');

  console.log('--- TEST 2: Targeted Practice Filtering (Sentence Insertion) ---');
  const sentenceInsertionBtn = await page.waitForSelector('button:has-text("Điền cả câu văn")');
  await sentenceInsertionBtn.click();
  await page.waitForTimeout(1000);

  // Verify URL updated
  const currentUrl = page.url();
  console.log('Current URL after filter:', currentUrl);
  if (!currentUrl.includes('subCategory=Sentence')) throw new Error('URL not updated with subCategory');

  // Verify targeted badge on question
  const targetedBadge = await page.waitForSelector('text=Mục tiêu', { timeout: 5000 }).catch(() => null);
  console.log('Found "Mục tiêu" badge for Sentence Insertion question:', !!targetedBadge);

  console.log('--- TEST 3: Cross-Test Pooling (test=all) ---');
  await page.selectOption('select[aria-label="Chọn bộ đề"]', 'all');
  await page.waitForTimeout(1500);
  const poolSubtitle = await page.textContent('header p');
  console.log('Subtitle after Cross-test pooling:', poolSubtitle);
  if (!poolSubtitle.includes('ETS 2022')) throw new Error('Cross-test pooling subtitle invalid');

  console.log('--- TEST 4: Answering & Submitting with Vietnamese Explanations ---');
  // Answer all 4 blanks by clicking each blank then selecting an option
  for (let b = 1; b <= 4; b++) {
    const blankEl = await page.waitForSelector(`span[data-blank="${b}"]`);
    await blankEl.click();
    await page.waitForTimeout(200);
    const optBtn = await page.waitForSelector('div[class*="optionsList"] button');
    await optBtn.click();
    await page.waitForTimeout(200);
  }

  // Click Submit
  const submitBtn = await page.waitForSelector('button:has-text("Nộp bài & Xem giải thích")', { timeout: 5000 });
  await submitBtn.click();
  await page.waitForTimeout(1000);

  // Check Vietnamese explanations
  const bodyAfterSubmit = await page.textContent('body');
  const hasDich = bodyAfterSubmit.includes('Dịch nghĩa');
  const hasPhanTich = bodyAfterSubmit.includes('Phân tích');
  const hasMeo = bodyAfterSubmit.includes('Mẹo') || bodyAfterSubmit.includes('Bẫy');
  console.log('Pedagogical explanation sections present:', { hasDich, hasPhanTich, hasMeo });
  if (!hasDich || !hasPhanTich || !hasMeo) throw new Error('Vietnamese explanation sections missing');

  console.log('--- TEST 5: Complete Flow to Session Pacing Report ---');
  // Switch to single test ets2022_test1 with 4 passages for faster summary check
  await page.selectOption('select[aria-label="Chọn bộ đề"]', 'ets2022_test1');
  await page.waitForTimeout(1000);

  while (true) {
    // Fill 4 blanks for current passage
    for (let b = 1; b <= 4; b++) {
      const blankEl = await page.$(`span[data-blank="${b}"]`);
      if (blankEl) {
        await blankEl.click();
        await page.waitForTimeout(100);
        const optBtn = await page.$('div[class*="optionsList"] button');
        if (optBtn) await optBtn.click();
        await page.waitForTimeout(100);
      }
    }

    const subBtn = await page.$('button:has-text("Nộp bài & Xem giải thích")');
    if (subBtn) {
      await subBtn.click();
      await page.waitForTimeout(500);
    }

    const nextBtn = await page.waitForSelector('button:has-text("Đoạn văn tiếp theo"), button:has-text("Xem tổng kết")', { timeout: 8000 });
    const btnText = await nextBtn.textContent();
    await nextBtn.click();
    await page.waitForTimeout(800);

    if (btnText?.includes('Xem tổng kết')) {
      console.log('Reached summary screen!');
      break;
    }
  }

  // Verify Session Pacing Report on Results Card
  await page.waitForSelector('text=Báo cáo Phân Bổ Thời Gian', { timeout: 10000 });
  const reportText = await page.textContent('body');
  const hasTable = reportText.includes('Thời gian') && reportText.includes('Tốc độ trung bình');
  const hasAdvice = reportText.includes('Chiến lược phân bổ thời gian:');
  console.log('Session Pacing Report checks:', { hasTable, hasAdvice });
  if (!hasTable || !hasAdvice) throw new Error('Session Pacing Report incomplete');

  // Verify NO EMOJIS in rendered DOM
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  if (emojiRegex.test(reportText)) {
    throw new Error('Emoji detected in rendered DOM!');
  }
  console.log('NO UI EMOJIS: Clean in rendered DOM!');

  await browser.close();
  console.log('================================================================');
  console.log('PLAYWRIGHT E2E TEST PASSED 100% FOR PART 6 TARGETED PACING UPGRADE');
  console.log('================================================================');
}

runTest().catch((err) => {
  console.error('PLAYWRIGHT TEST FAILED:', err);
  process.exit(1);
});
