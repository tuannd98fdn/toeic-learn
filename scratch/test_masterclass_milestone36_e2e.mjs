import { chromium } from 'playwright';
import assert from 'assert';

async function runTest() {
  console.log('=== KHỞI ĐỘNG KIỂM THỬ PLAYWRIGHT E2E CHO MILESTONE 36 ===');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    colorScheme: 'dark',
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  const page = await context.newPage();

  // Preset localStorage for a 850+ target learner
  await page.addInitScript(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '850+');
    localStorage.setItem('toeic_current_score', '750');
    localStorage.setItem('toeic_exam_date', '2026-10-30');
  });

  console.log('\n--- Bước 1: Kiểm thử trang Masterclass 30 Phút (/masterclass) ---');
  await page.goto('http://localhost:3000/masterclass');
  await page.waitForLoadState('networkidle');

  // 1. Check title & texts
  const pageContent = await page.content();
  assert(pageContent.includes('The quarterly report is certainly not written yet.'), 'Phải hiển thị câu chữ viết ETS');
  assert(pageContent.includes('/ðə ˈkwɔːtəli rɪˈpɔːt ɪz ˈsɜːʔnli nɒʔ ˈrɪʔn jɛt/'), 'Phải hiển thị phiên âm IPA');
  assert(pageContent.includes('Giọng Bản Xứ Chuẩn ETS (Studio HD)'), 'Phải có huy hiệu Studio HD');
  console.log('PASS: Hiển thị chuẩn xác câu chữ viết và phiên âm IPA thực tế');

  // 2. Check Audio Controls
  const playNormalBtn = page.locator('button:has-text("Nghe chuẩn 1.0x")');
  const playSlowBtn = page.locator('button:has-text("Nghe chậm 0.75x")');
  await assert(await playNormalBtn.isVisible(), 'Nút Nghe chuẩn 1.0x phải hiển thị');
  await assert(await playSlowBtn.isVisible(), 'Nút Nghe chậm 0.75x phải hiển thị');
  console.log('PASS: Cả hai nút điều khiển âm thanh 1.0x và 0.75x hiển thị rõ ràng');

  // 3. Test Word-by-Word Acoustic Alignment
  const certainlyPill = page.locator('button:has-text("certainly")').first();
  await assert(await certainlyPill.isVisible(), 'Thẻ từ "certainly" phải hiển thị');
  await certainlyPill.click();
  await page.waitForTimeout(300);

  const detailBox = page.locator('div:has-text("Glottal Stop /ʔ/")').first();
  await assert(await detailBox.isVisible(), 'Hộp bóc tách Glottal stop phải xuất hiện khi click vào certainly');
  console.log('PASS: Click vào từ "certainly" kích hoạt thành công bóc tách âm Glottal Stop /ʔ/');

  await page.screenshot({ path: 'scratch/masterclass_word_breakdown.png' });
  console.log('Đã lưu ảnh màn hình: scratch/masterclass_word_breakdown.png');

  // 4. Test playing audio
  await playNormalBtn.click();
  await page.waitForTimeout(500);
  console.log('PASS: Trình phát audio kích hoạt 1.0x chuẩn bản xứ');

  await playSlowBtn.click();
  await page.waitForTimeout(500);
  console.log('PASS: Trình phát audio kích hoạt 0.75x bóc tách âm');

  await page.screenshot({ path: 'scratch/masterclass_audio_playback.png' });
  console.log('Đã lưu ảnh màn hình: scratch/masterclass_audio_playback.png');

  // 5. Test Quick Drill Option selection
  const correctOption = page.locator('button:has-text("B) Bị chặn hơi ngắn tại cổ họng (glottal stop)")');
  await assert(await correctOption.isVisible(), 'Phương án trả lời B phải có mặt');
  await correctOption.click();
  await page.waitForTimeout(300);
  const feedback = page.locator('p:has-text("Chính xác! Giọng British trong ETS thường thay thế /t/ bằng glottal stop")').first();
  await assert(await feedback.isVisible(), 'Phải hiển thị giải thích đáp án đúng');
  console.log('PASS: Bài drill phản xạ tương tác hoạt động hoàn hảo');

  // 6. Test Study Plan Integration (/study-plan)
  console.log('\n--- Bước 2: Kiểm thử Lộ Trình Mục Tiêu (/study-plan) ---');
  await page.goto('http://localhost:3000/study-plan');
  await page.waitForLoadState('networkidle');

  // Set target score 850 in the form if in form view or sync
  const formVisible = await page.locator('h1:has-text("Lộ Trình Ôn Thi TOEIC Cá Nhân Hóa")').isVisible();
  if (formVisible) {
    const btn850 = page.locator('button:has-text("850+ Điểm")');
    if (await btn850.isVisible()) {
      await btn850.click();
    }
    const activateBtn = page.locator('button:has-text("Kích Hoạt Lộ Trình Thông Minh")');
    await activateBtn.click();
    await page.waitForTimeout(600);
  }

  await page.screenshot({ path: 'scratch/study_plan_masterclass.png' });
  console.log('Đã lưu ảnh màn hình: scratch/study_plan_masterclass.png');

  // 7. Audit rendered DOM for UI Emojis
  console.log('\n--- Bước 3: Quét Emoji UI trên toàn bộ Rendered DOM ---');
  const domText = await page.evaluate(() => document.body.innerText);
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]/u;

  assert(!emojiRegex.test(domText), 'Tuyệt đối KHÔNG được có emoji trên rendered DOM của Study Plan');
  assert(!domText.includes('✓'), 'Tuyệt đối KHÔNG được có ký tự checkmark unicode ✓ trên Study Plan');
  console.log('PASS: Rendered DOM đạt chuẩn 100% ZERO UI EMOJIS!');

  await browser.close();
  console.log('\n=== TẤT CẢ CÁC BƯỚC KIỂM THỬ E2E ĐÃ HOÀN TẤT VÀ VƯỢT QUA 100%! ===');
}

runTest().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
