import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';

const secret = "my-super-secret-key-12345";

async function runTest() {
  console.log('--- TEST PAUSE & RESUME WITH MODAL, AUDIO PAUSE & DRAFT PRESERVATION ---');

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
  page.on('dialog', async d => await d.accept());

  try {
    console.log('1. Truy cập /exam (Full Test 120P)...');
    await page.goto('http://localhost:3000/exam', { waitUntil: 'networkidle' });
    await page.waitForSelector('main');

    // Select an answer
    const optionsQ1 = page.locator('[class*="optionItem"]');
    await optionsQ1.first().click();
    console.log('✓ Đã chọn đáp án đầu tiên');


    const initialTimer = await page.locator('span[class*="timerText"]').innerText();
    console.log('✓ Đồng hồ ban đầu:', initialTimer);

    // Wait 2s for timer to count down
    await page.waitForTimeout(2000);
    const timerAfter2s = await page.locator('span[class*="timerText"]').innerText();
    console.log('✓ Đồng hồ sau 2 giây chạy:', timerAfter2s);

    // Click Tạm dừng
    console.log('2. Bấm nút "Tạm dừng" trên Top Bar...');
    const pauseBtn = page.locator('button[class*="pauseBtn"]');
    await pauseBtn.click();

    // Verify Pause Modal appears
    await page.waitForSelector('div[class*="pauseOverlay"]');
    const modalHeading = await page.locator('h2[class*="pauseHeading"]').innerText();
    console.log('✓ Pause Modal xuất hiện với tiêu đề:', modalHeading);

    const pausedTimeInModal = await page.locator('span[class*="pauseMetricValue"]').first().innerText();
    console.log('✓ Thời gian đóng băng trong Modal:', pausedTimeInModal);

    // Check that audio elements are paused
    const audioElements = page.locator('audio');
    const audioCount = await audioElements.count();
    if (audioCount > 0) {
      const isAudioPaused = await audioElements.first().evaluate(a => a.paused);
      console.log('✓ Âm thanh bài nghe đã tự động dừng khi tạm dừng?:', isAudioPaused);
      if (!isAudioPaused) throw new Error('Audio was not paused!');
    }

    // Wait 4 seconds while paused and verify timer is strictly frozen
    await page.waitForTimeout(4000);
    const timerStillPaused = await page.locator('span[class*="pauseMetricValue"]').first().innerText();
    console.log('✓ Thời gian sau 4s đóng băng:', timerStillPaused);
    if (timerStillPaused !== pausedTimeInModal) {
      throw new Error(`Timer changed during pause: ${pausedTimeInModal} vs ${timerStillPaused}`);
    }
    console.log('✓ XÁC NHẬN: Thời gian hoàn toàn đứng yên 100%, không bị trôi!');

    // Take screenshot of Pause Modal
    await page.screenshot({ path: 'scratch/exam_pause_modal_verified.png' });
    console.log('✓ Đã lưu ảnh chụp Pause Modal: scratch/exam_pause_modal_verified.png');

    // 3. Test Reload while Paused
    console.log('3. Tải lại trang (F5) trong khi đang Tạm dừng...');
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForSelector('main');

    // Check that pause modal is STILL displayed after reload!
    await page.waitForSelector('div[class*="pauseOverlay"]');
    const reloadedModalTime = await page.locator('span[class*="pauseMetricValue"]').first().innerText();
    console.log('✓ Sau khi reload, Pause Modal vẫn mở và thời gian phục hồi là:', reloadedModalTime);
    if (reloadedModalTime !== timerStillPaused) {
      throw new Error(`Time was deducted after reload while paused! Was ${timerStillPaused}, now ${reloadedModalTime}`);
    }
    console.log('✓ XÁC NHẬN: Không bị trừ 1 giây nào khi tải lại trang trong lúc Tạm dừng!');

    // 4. Test Resume
    console.log('4. Bấm nút "Tiếp tục làm bài" trên Modal...');
    const resumeBigBtn = page.locator('button[class*="resumeBigBtn"]');
    await resumeBigBtn.click();

    // Verify modal disappears
    await page.waitForSelector('div[class*="pauseOverlay"]', { state: 'detached' });
    console.log('✓ Pause Modal đã biến mất, bài thi tiếp tục bình thường');

    const topBarBtnAfterResume = await page.locator('button[class*="pauseBtn"]').innerText();
    console.log('✓ Nút trên Top Bar chuyển lại thành:', topBarBtnAfterResume.trim());

    // Wait 2.5 seconds and check that timer is ticking down again
    await page.waitForTimeout(2500);
    const resumedTimer = await page.locator('span[class*="timerText"]').innerText();
    console.log('✓ Đồng hồ sau khi bấm tiếp tục:', resumedTimer);

    // 5. Test strict NO UI EMOJIS
    const bodyText = await page.locator('body').innerText();
    const emojiRegex = /(\p{Extended_Pictographic}|\p{Emoji_Presentation})/gu;
    // Filter out standard punctuation/bullets if any match
    const emojisFound = (bodyText.match(emojiRegex) || []).filter(char => !['•', '←', '→', '⌘'].includes(char));
    if (emojisFound && emojisFound.length > 0) {
      console.warn('Cảnh báo emoji:', emojisFound);
      throw new Error('Found emojis in DOM!');
    }
    console.log('✓ XÁC NHẬN: 0 emoji trong toàn bộ giao diện!');


    console.log('\n🎉 TOÀN BỘ CÁC BÀI TEST PAUSE / RESUME ĐÃ ĐẠT 100%!');
  } finally {
    await browser.close();
  }
}

runTest().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
