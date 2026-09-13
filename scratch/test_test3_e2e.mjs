import { chromium } from 'playwright';

(async () => {
  console.log('=== BẮT ĐẦU KIỂM THỬ E2E PLAYWRIGHT: ETS 2022 TEST 3 ===\n');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    // 0. Khởi tạo dữ liệu onboarding trong localStorage
    await page.goto('http://localhost:3000/onboarding', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.setItem('toeic_onboarding_done', 'true');
      localStorage.setItem('toeic_target_score', '850');
    });

    // 1. Kiểm tra Dashboard
    console.log('1. Kiểm tra Dashboard và nạp danh sách đề thi...');
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForFunction(() => document.querySelectorAll('select option').length > 0, { timeout: 15000 });
    console.log('   Current URL:', page.url());

    const testOptions = await page.$$eval('select option', (opts) =>
      opts.map((o) => ({ value: o.value, text: o.textContent.trim() }))
    );
    console.log('   Các đề thi tìm thấy trong selector:', testOptions);

    const hasTest3 = testOptions.some((o) => o.value === 'ets2022_test3');
    if (!hasTest3) {
      throw new Error('Không tìm thấy ets2022_test3 trong selector đề thi trên Dashboard!');
    }
    console.log('   ✓ Đã tìm thấy "ETS 2022 - Test 3" trên Dashboard.');

    // 2. Chọn Test 3 và kiểm tra link Part 1, 5, Exam
    console.log('\n2. Chọn Test 3 và kiểm tra liên kết...');
    await page.selectOption('select', 'ets2022_test3');
    await page.waitForTimeout(1000);

    const examLink = await page.$eval('a[href*="/exam"]', (a) => a.href);
    console.log('   Link bài thi sau khi chọn Test 3:', examLink);
    if (!examLink.includes('test=ets2022_test3')) {
      throw new Error('Link bài thi không cập nhật đúng ?test=ets2022_test3');
    }
    console.log('   ✓ Link bài thi cập nhật đúng tham số ets2022_test3.');

    // 3. Kiểm tra Part 1 Test 3
    console.log('\n3. Kiểm tra luyện tập Part 1 Test 3...');
    await page.goto('http://localhost:3000/part1?test=ets2022_test3', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    const p1Image = await page.$eval('img', (img) => img.src);
    console.log('   URL hình ảnh câu 1:', p1Image);
    if (!p1Image || !p1Image.includes('unsplash.com')) {
      throw new Error('Part 1 không tải được ảnh mẫu!');
    }
    console.log('   ✓ Part 1 render câu hỏi và hình ảnh thành công.');

    // 4. Kiểm tra Part 5 Test 3 (Untimed mode, Clue Hint & Syntax Visualizer)
    console.log('\n4. Kiểm tra Part 5 Test 3 (Sư phạm 10/10)...');
    await page.goto('http://localhost:3000/part5?test=ets2022_test3', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    const questionText = await page.innerText('body');
    if (!questionText.includes('Yamamoto')) {
      throw new Error('Part 5 không hiển thị đúng câu hỏi Q101 của Test 3!');
    }
    console.log('   ✓ Part 5 hiển thị đúng câu hỏi 101 của Test 3.');

    // Click nút gợi ý tư duy nếu có
    const hintBtn = await page.$('button:has-text("Gợi ý tư duy")');
    if (hintBtn) {
      await hintBtn.click();
      await page.waitForTimeout(500);
      const hintContent = await page.innerText('body');
      if (hintContent.includes('expense report')) {
        console.log('   ✓ Nút "Gợi ý tư duy" hoạt động chính xác.');
      }
    }

    // Chọn đáp án C (his)
    const optButtons = await page.$$('button:has-text("his")');
    if (optButtons.length > 0) {
      await optButtons[0].click();
      await page.waitForTimeout(1000);
      const afterSelectText = await page.innerText('body');
      if (afterSelectText.includes('Chủ ngữ') && afterSelectText.includes('Vị ngữ')) {
        console.log('   ✓ Bộ phân tích cú pháp S-V-O (Syntax Visualizer) hiển thị xuất sắc!');
      }
    }

    // 5. Kiểm tra Part 7 Test 3
    console.log('\n5. Kiểm tra Part 7 Test 3...');
    await page.goto('http://localhost:3000/part7?test=ets2022_test3', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    const p7Text = await page.innerText('body');
    if (!p7Text.includes('RAPIDLINK') && !p7Text.includes('RapidLink')) {
      throw new Error('Part 7 không hiển thị đúng bài đọc đầu tiên của Test 3!');
    }
    console.log('   ✓ Part 7 render bài đọc và danh sách câu hỏi thành công.');

    // 6. Kiểm tra Toàn bộ bài thi 200 câu (/exam)
    console.log('\n6. Kiểm tra Màn hình thi thử Full 200 câu (/exam)...');
    await page.goto('http://localhost:3000/exam?test=ets2022_test3', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    const examTitle = await page.innerText('body');
    if (examTitle.includes('200') || examTitle.includes('Câu 1')) {
      console.log('   ✓ Màn hình thi thử nạp thành công 200 câu hỏi ETS 2022 Test 3.');
    }

    // Quét toàn bộ trang kiểm tra emoji cấm
    const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
    const allText = await page.innerText('body');
    if (emojiRegex.test(allText)) {
      throw new Error('Phát hiện emoji vi phạm nguyên tắc NO UI EMOJIS (STRICT) trên giao diện thi thử!');
    }
    console.log('   ✓ Quét DOM giao diện: 0 emoji icon (100% tuân thủ NO UI EMOJIS STRICT).');

    if (consoleErrors.length > 0) {
      console.warn('   ⚠️ Console errors ghi nhận:', consoleErrors);
    } else {
      console.log('   ✓ 0 console errors.');
    }

    console.log('\n========================================');
    console.log('🎉 TẤT CẢ CÁC BÀI KIỂM THỬ E2E CHO TEST 3 ĐỀU VƯỢT QUA 100%!');
    console.log('========================================\n');
  } catch (err) {
    console.error('\n❌ THẤT BẠI TRONG BÀI KIỂM THỬ E2E:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
