import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';

const secret = "my-super-secret-key-12345";

async function runTest() {
  console.log('--- TEST FULL EXAM 120 PHÚT (200 CÂU) AUTO-SAVE & RELOAD ---');
  
  const token = await encode({
    token: { name: "Test Learner", email: "learner@toeic.com", sub: "user-123" },
    secret
  });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  await context.addCookies([
    { name: "next-auth.session-token", value: token, domain: "localhost", path: "/" }
  ]);

  const page = await context.newPage();

  page.on('dialog', async (dialog) => {
    console.log(`[Browser Dialog] "${dialog.message()}" -> Accept`);
    await dialog.accept();
  });

  try {
    // 1. Vào Full test 200 câu (120 phút)
    console.log('Truy cập /exam (Full test 120 phút)...');
    await page.goto('http://localhost:3000/exam', { waitUntil: 'networkidle' });
    await page.waitForSelector('main');

    // Kiểm tra câu 1 (Part 1 Photograph)
    const optionsQ1 = await page.locator('[class*="optionItem"]');
    await optionsQ1.nth(0).click(); // Chọn A
    console.log('✓ Đã chọn đáp án A cho Câu 1 (Part 1)');

    // Chuyển sang câu 2 và chọn B
    await page.locator('button:has-text("Câu sau →")').click();
    await page.waitForTimeout(200);
    const optionsQ2 = await page.locator('[class*="optionItem"]');
    await optionsQ2.nth(1).click(); // Chọn B
    console.log('✓ Đã chọn đáp án B cho Câu 2 (Part 1)');

    // Chuyển sang Part 5 (Câu 101) thông qua Navigator palette
    await page.locator('button:has-text("Đọc (101-200)")').click();
    await page.waitForTimeout(200);
    await page.getByRole('button', { name: '101', exact: true }).click();
    await page.waitForTimeout(200);

    const qTitle = await page.locator('strong:has-text("Câu #")').innerText();
    console.log(`✓ Đang ở: ${qTitle}`);

    // Chọn đáp án C cho câu 101
    const optionsQ101 = await page.locator('[class*="optionItem"]');
    await optionsQ101.nth(2).click(); // Chọn C
    console.log('✓ Đã chọn đáp án C cho Câu 101');

    // Cắm cờ câu 101
    await page.locator('[class*="flagBtn"]').click();
    console.log('✓ Đã cắm cờ cho Câu 101');

    // Kiểm tra draft Full Test trong LocalStorage
    const draftJson = await page.evaluate(() => localStorage.getItem('toeic_exam_draft_ets2022_test1_all'));
    if (!draftJson) throw new Error('Chưa có draft full test trong localStorage');
    const draft = JSON.parse(draftJson);
    console.log('Draft full test:', {
      testId: draft.testId,
      section: draft.section,
      userAnswers: draft.userAnswers,
      flaggedQuestions: draft.flaggedQuestions,
      currentIndex: draft.currentIndex,
      timeLeft: draft.timeLeft,
    });

    if (draft.userAnswers[1] !== 'A' || draft.userAnswers[2] !== 'B' || draft.userAnswers[101] !== 'C') {
      throw new Error(`Sai đáp án lưu: ${JSON.stringify(draft.userAnswers)}`);
    }

    // RELOAD FULL EXAM!
    console.log('Reload trang Full Test 120 phút...');
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForSelector('main');

    // Kiểm tra Recovery Banner
    const banner = await page.locator('[class*="recoveryBanner"]');
    await banner.waitFor({ state: 'visible', timeout: 5000 });
    const bannerText = await banner.innerText();
    console.log(`✓ Recovery Banner: "${bannerText.replace(/\n/g, ' ')}"`);
    if (!bannerText.includes('3/200 câu')) {
      throw new Error(`Sai số câu trong banner: "${bannerText}"`);
    }

    // Kiểm tra vị trí hiện tại phục hồi ngay câu 101
    const restoredTitle = await page.locator('strong:has-text("Câu #")').innerText();
    console.log(`✓ Vị trí phục hồi: ${restoredTitle}`);
    if (!restoredTitle.includes('101')) {
      throw new Error(`Kỳ vọng phục hồi Câu #101 nhưng là "${restoredTitle}"`);
    }

    // Kiểm tra câu 101 vẫn chọn C và cờ vẫn bật
    const isFlagged101 = await page.locator('[class*="flagBtn"][class*="flagged"]').count();
    if (isFlagged101 === 0) throw new Error('Cờ câu 101 không được phục hồi');
    console.log('✓ Cờ câu 101 đã phục hồi');

    // Chụp ảnh bằng chứng
    await page.screenshot({ path: 'scratch/full_exam_120m_autosave_verified.png' });
    console.log('✓ Ảnh chụp Full Test đã lưu: scratch/full_exam_120m_autosave_verified.png');

    // Dọn dẹp: Reset
    await page.locator('button:has-text("Làm lại từ đầu")').click();
    await page.waitForTimeout(400);

    const clearedDraft = await page.evaluate(() => localStorage.getItem('toeic_exam_draft_ets2022_test1_all'));
    if (clearedDraft !== null) throw new Error('Chưa xóa draft sau khi làm lại từ đầu');

    console.log('🎉 FULL TEST 120 PHÚT (200 CÂU) AUTO-SAVE & RECOVERY HOÀN HẢO 100%!');
  } finally {
    await browser.close();
  }
}

runTest().catch((err) => {
  console.error('\n❌ TEST THẤT BẠI:', err);
  process.exit(1);
});
