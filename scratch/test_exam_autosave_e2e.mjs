import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';

const secret = "my-super-secret-key-12345";

async function runTest() {
  console.log('--- BẮT ĐẦU KIỂM THỬ E2E: AUTO-SAVE & PHỤC HỒI PHÒNG THI /EXAM ---');
  
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

  // Listen to dialogs (confirm prompts) and accept them
  page.on('dialog', async (dialog) => {
    console.log(`[Browser Dialog] "${dialog.message()}" -> Chấp nhận (Accept)`);
    await dialog.accept();
  });

  try {
    // -------------------------------------------------------------
    // TEST 1: Auto-Save khi chọn đáp án, cắm cờ và chuyển câu
    // -------------------------------------------------------------
    console.log('\n[Test 1] Kiểm tra Auto-save realtime khi làm bài thi...');
    await page.goto('http://localhost:3000/exam?test=ets2022_test1&section=rc_sprint', { waitUntil: 'networkidle' });
    await page.waitForSelector('main');

    // Kiểm tra huy hiệu Đã lưu tự động trên Top Bar
    const autoSaveBadge = await page.locator('[class*="autoSaveBadge"]');
    if (await autoSaveBadge.count() > 0) {
      console.log('✓ Phát hiện Auto-save Badge trên Top Bar: "Đã lưu tự động"');
    } else {
      throw new Error('Không tìm thấy Auto-save Badge trên Top Bar');
    }

    // Chọn đáp án B cho câu 101 (lựa chọn thứ 2)
    const options101 = await page.locator('[class*="optionItem"]');
    await options101.nth(1).click();
    console.log('✓ Đã chọn đáp án B cho Câu 101');

    // Chuyển sang Câu 102
    await page.locator('button:has-text("Câu sau →")').click();
    await page.waitForTimeout(300);

    // Chọn đáp án C cho câu 102 (lựa chọn thứ 3)
    const options102 = await page.locator('[class*="optionItem"]');
    await options102.nth(2).click();
    console.log('✓ Đã chọn đáp án C cho Câu 102');

    // Cắm cờ câu 102
    await page.locator('[class*="flagBtn"]').click();
    console.log('✓ Đã cắm cờ cho Câu 102');

    // Chuyển sang Câu 103
    await page.locator('button:has-text("Câu sau →")').click();
    await page.waitForTimeout(300);

    // Kiểm tra dữ liệu trong LocalStorage
    const draftJson = await page.evaluate(() => localStorage.getItem('toeic_exam_draft_ets2022_test1_rc_sprint'));
    if (!draftJson) throw new Error('Chưa có draft trong localStorage');
    const draft = JSON.parse(draftJson);

    console.log('Draft lưu trữ:', {
      testId: draft.testId,
      section: draft.section,
      userAnswers: draft.userAnswers,
      flaggedQuestions: draft.flaggedQuestions,
      currentIndex: draft.currentIndex,
      timeLeft: draft.timeLeft,
    });

    if (draft.userAnswers[101] !== 'B' || draft.userAnswers[102] !== 'C') {
      throw new Error(`Sai đáp án lưu tạm: ${JSON.stringify(draft.userAnswers)}`);
    }
    if (!draft.flaggedQuestions.includes(102)) {
      throw new Error(`Không lưu cờ câu 102: ${JSON.stringify(draft.flaggedQuestions)}`);
    }
    if (draft.currentIndex !== 2) {
      throw new Error(`Sai vị trí câu đang làm: ${draft.currentIndex} (kỳ vọng 2 cho câu 103)`);
    }
    console.log('✓ Test 1 ĐẠT: Auto-save realtime hoạt động chính xác 100%!');

    // -------------------------------------------------------------
    // TEST 2: Phục hồi khi Reload trang (F5 / Cmd+R)
    // -------------------------------------------------------------
    console.log('\n[Test 2] Kiểm tra Phục hồi toàn vẹn bài làm khi reload trang...');
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForSelector('main');

    // Kiểm tra Recovery Banner
    const recoveryBanner = await page.locator('[class*="recoveryBanner"]');
    await recoveryBanner.waitFor({ state: 'visible', timeout: 5000 });
    const recoveryText = await recoveryBanner.innerText();
    console.log(`✓ Recovery Banner hiển thị: "${recoveryText.replace(/\n/g, ' ')}"`);

    if (!recoveryText.includes('2/41 câu')) {
      throw new Error(`Recovery Banner không hiển thị đúng số câu đã làm: "${recoveryText}"`);
    }

    // Kiểm tra vị trí câu hiện tại đã phục hồi đúng câu 103
    const qTitle = await page.locator('strong:has-text("Câu #")').innerText();
    console.log(`✓ Vị trí câu đang làm phục hồi: ${qTitle}`);
    if (!qTitle.includes('103')) {
      throw new Error(`Kỳ vọng đang ở Câu #103 nhưng lại là "${qTitle}"`);
    }

    // Quay lại câu 102 kiểm tra đáp án C và cờ
    await page.locator('button:has-text("← Câu trước")').click();
    await page.waitForTimeout(200);

    const isFlagged = await page.locator('[class*="flagBtn"][class*="flagged"]').count();
    if (isFlagged === 0) throw new Error('Cờ câu 102 không được phục hồi');
    console.log('✓ Cờ câu 102 được phục hồi thành công');

    const selectedOptions102 = await page.locator('[class*="optionItem"][class*="selected"]').innerText();
    console.log(`✓ Đáp án câu 102 được phục hồi: ${selectedOptions102.slice(0, 30)}...`);
    if (!selectedOptions102.startsWith('C')) {
      throw new Error('Đáp án câu 102 không phải là C');
    }

    // Tắt banner khôi phục bằng nút "Tiếp tục làm bài"
    await page.locator('button:has-text("Tiếp tục làm bài")').click();
    await page.waitForTimeout(200);
    if (await page.locator('[class*="recoveryBanner"]').count() !== 0) {
      throw new Error('Recovery banner chưa tắt sau khi bấm Tiếp tục làm bài');
    }
    console.log('✓ Test 2 ĐẠT: Reload trang khôi phục 100% bài làm và vị trí!');

    // -------------------------------------------------------------
    // TEST 3: Khả năng chống chịu Mất Mạng (Offline Resilience)
    // -------------------------------------------------------------
    console.log('\n[Test 3] Giả lập Mất Kết Nối Mạng (Offline) & Tiếp tục làm bài...');
    await context.setOffline(true);
    await page.waitForTimeout(300);

    // Kiểm tra huy hiệu Ngoại tuyến xuất hiện
    const offlineBadge = await page.locator('[class*="offlineBadge"]');
    if (await offlineBadge.count() > 0) {
      console.log('✓ Top Bar đã hiển thị badge "Ngoại tuyến" khi mất mạng');
    }

    // Vẫn trả lời tiếp được khi offline: chọn đáp án cho câu 102 đổi sang D
    const options102New = await page.locator('[class*="optionItem"]');
    await options102New.nth(3).click();
    console.log('✓ Đổi đáp án câu 102 sang D khi đang Offline');

    // Chuyển sang câu 103 và chọn đáp án A
    await page.locator('button:has-text("Câu sau →")').click();
    await page.waitForTimeout(200);
    const options103 = await page.locator('[class*="optionItem"]');
    await options103.nth(0).click();
    console.log('✓ Chọn đáp án A cho câu 103 khi đang Offline');

    // Kiểm tra draft trong localStorage đã cập nhật 3 câu trả lời
    const offlineDraft = await page.evaluate(() => JSON.parse(localStorage.getItem('toeic_exam_draft_ets2022_test1_rc_sprint')));
    console.log('Draft khi offline:', offlineDraft.userAnswers);
    if (offlineDraft.userAnswers[102] !== 'D' || offlineDraft.userAnswers[103] !== 'A') {
      throw new Error('Dữ liệu offline không được lưu vào LocalStorage');
    }

    // Khôi phục online tạm để cho phép Next.js nạp document HTML, nhưng ngắt toàn bộ data fetching
    await context.setOffline(false);
    console.log('>>> Thử thách: Reload trang khi toàn bộ đường truyền dữ liệu đề thi (/data/**) bị đứt kết nối...');
    await page.route('**/data/**', route => route.abort('failed'));

    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForSelector('main', { timeout: 10000 });

    // Đề thi phải nạp thành công từ Offline Questions Cache!
    const offlineNotice = await page.locator('[class*="offlineNoticeBar"]');
    if (await offlineNotice.count() > 0) {
      console.log('✓ Thông báo nạp từ bộ nhớ đệm offline hiển thị xuất sắc!');
    } else {
      throw new Error('Không hiển thị offlineNoticeBar khi dữ liệu mạng bị ngắt');
    }

    // Kiểm tra các câu trả lời vẫn nguyên vẹn
    const restoredOfflineDraft = await page.evaluate(() => JSON.parse(localStorage.getItem('toeic_exam_draft_ets2022_test1_rc_sprint')));
    if (restoredOfflineDraft.userAnswers[101] !== 'B' || restoredOfflineDraft.userAnswers[102] !== 'D' || restoredOfflineDraft.userAnswers[103] !== 'A') {
      throw new Error('Mất dữ liệu khi reload offline');
    }
    console.log('✓ Cả 3 câu trả lời vẫn nguyên vẹn sau khi reload lúc mất mạng!');

    // Gỡ bỏ chặn route mạng
    await page.unroute('**/data/**');
    console.log('✓ Test 3 ĐẠT: Chống chịu mất mạng 100%!');


    // -------------------------------------------------------------
    // TEST 4: Nộp bài & Dọn dẹp Draft (Clean Up)
    // -------------------------------------------------------------
    console.log('\n[Test 4] Kiểm tra Nộp bài thi và dọn dẹp sạch sẽ Draft...');
    await page.locator('button:has-text("Nộp bài")').click();
    await page.waitForSelector('[class*="resultsContainer"]', { timeout: 8000 });
    console.log('✓ Đã nộp bài thành công và chuyển vào màn hình Kết quả!');

    // Kiểm tra draft trong localStorage đã bị xóa
    const draftAfterSubmit = await page.evaluate(() => localStorage.getItem('toeic_exam_draft_ets2022_test1_rc_sprint'));
    if (draftAfterSubmit !== null) {
      throw new Error(`Draft chưa được xóa sau khi nộp bài: ${draftAfterSubmit}`);
    }
    console.log('✓ Test 4 ĐẠT: Draft đã được tự động dọn dẹp sạch sẽ sau khi nộp bài!');

    // -------------------------------------------------------------
    // TEST 5: Kiểm tra "Làm lại từ đầu" (Reset Draft)
    // -------------------------------------------------------------
    console.log('\n[Test 5] Kiểm tra chức năng "Làm lại từ đầu"...');
    await page.goto('http://localhost:3000/exam?test=ets2022_test1&section=rc_sprint', { waitUntil: 'networkidle' });
    await page.waitForSelector('main');

    // Trả lời 1 câu để sinh draft
    const opts = await page.locator('[class*="optionItem"]');
    await opts.nth(0).click();
    await page.waitForTimeout(300);

    // Reload để hiện banner có nút "Làm lại từ đầu"
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForSelector('[class*="recoveryBanner"]');

    // Bấm nút "Làm lại từ đầu"
    await page.locator('button:has-text("Làm lại từ đầu")').click();
    await page.waitForTimeout(400);

    const draftAfterReset = await page.evaluate(() => localStorage.getItem('toeic_exam_draft_ets2022_test1_rc_sprint'));
    if (draftAfterReset !== null) {
      throw new Error('Draft chưa bị xóa sau khi bấm Làm lại từ đầu');
    }
    const answeredBadge = await page.locator('[class*="progressBadge"]').innerText();
    console.log(`✓ Trạng thái sau reset: ${answeredBadge}`);
    if (!answeredBadge.includes('0 / 41')) {
      throw new Error(`Tiến độ chưa reset về 0: ${answeredBadge}`);
    }
    console.log('✓ Test 5 ĐẠT: Nút "Làm lại từ đầu" xóa sạch draft và reset bài thi!');

    // -------------------------------------------------------------
    // TEST 6: Kiểm tra TUYỆT ĐỐI KHÔNG CÓ EMOJI UI
    // -------------------------------------------------------------
    console.log('\n[Test 6] Kiểm tra tuân thủ NO UI EMOJIS (STRICT)...');
    const pageText = await page.evaluate(() => document.body.innerText);
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    const emojiMatch = pageText.match(emojiRegex);
    if (emojiMatch) {
      throw new Error(`Phát hiện emoji vi phạm quy định trong DOM: ${emojiMatch[0]}`);
    }
    console.log('✓ Test 6 ĐẠT: 0 emoji icon trong toàn bộ rendered DOM!');

    // Chụp ảnh lưu bằng chứng
    await page.screenshot({ path: 'scratch/exam_autosave_verified.png' });
    console.log('\nẢnh nghiệm thu đã lưu tại: scratch/exam_autosave_verified.png');

    console.log('\n🎉 TOÀN BỘ 6/6 BÀI TEST E2E ĐÃ VƯỢT QUA 100%! BÀI THI 120 PHÚT ĐƯỢC BẢO VỆ TUYỆT ĐỐI!');
  } finally {
    await browser.close();
  }
}

runTest().catch((err) => {
  console.error('\n❌ TEST THẤT BẠI:', err);
  process.exit(1);
});
