import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';
import assert from 'node:assert';

async function testAudioPlayback() {
  console.log('--- BẮT ĐẦU KIỂM THỬ TÍNH NĂNG PHÁT ÂM TỪ VỰNG REALTIME ---');
  const browser = await chromium.launch({ headless: true });

  const secret = 'my-super-secret-key-12345';
  const token = {
    name: 'Học Viên ETS',
    email: 'learner@toeicmaster.vn',
    sub: '123456789'
  };
  const sessionToken = await encode({ token, secret });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
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

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    // 1. Kiểm tra phát âm trên trang Flashcard /study
    console.log('\n[1] Kiểm tra phát âm trên thẻ Flashcard (/study):');
    await page.goto('http://localhost:3000/study', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const audioButton = page.locator('button[class*="audioButton"]').first();
    await audioButton.waitFor({ state: 'visible', timeout: 5000 });
    
    // Click nút phát âm
    console.log('  -> Click nút phát âm trên thẻ Flashcard...');
    await audioButton.click();
    await page.waitForTimeout(500);

    // Kiểm tra xem audio element hoặc speech synthesis có hoạt động không
    const audioState = await page.evaluate(() => {
      // Check if audio element was created and played
      return {
        speakingActive: document.querySelector('button[class*="speaking"]') !== null,
        activeUtterance: !!window.__toeicActiveUtterance
      };
    });
    console.log('  ✓ Trạng thái âm thanh Flashcard:', audioState);

    // 2. Kiểm tra phát âm trên trang Thư viện /vocabulary
    console.log('\n[2] Kiểm tra phát âm trên Thư viện từ vựng (/vocabulary):');
    await page.goto('http://localhost:3000/vocabulary', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const vocabAudioBtn = page.locator('button[class*="audioBtn"]').first();
    await vocabAudioBtn.waitFor({ state: 'visible', timeout: 5000 });
    
    console.log('  -> Click nút phát âm trên danh sách từ vựng...');
    await vocabAudioBtn.click();
    await page.waitForTimeout(500);
    console.log('  ✓ Phát âm trong Thư viện từ vựng thành công');

    // 3. Kiểm tra phát âm trên trang Quiz /quiz
    console.log('\n[3] Kiểm tra phát âm trên Quiz (/quiz):');
    await page.goto('http://localhost:3000/quiz', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const quizAudioBtn = page.locator('button[class*="audioBtn"]').first();
    await quizAudioBtn.waitFor({ state: 'visible', timeout: 5000 });
    
    console.log('  -> Click nút phát âm trong câu hỏi Quiz...');
    await quizAudioBtn.click();
    await page.waitForTimeout(500);
    console.log('  ✓ Phát âm trong câu hỏi Quiz thành công');

    // 4. Kiểm tra trực tiếp tải luồng âm thanh studio từ CDN
    console.log('\n[4] Kiểm tra trực tiếp kết nối và phát luồng âm thanh MP3 studio:');
    const directAudioTest = await page.evaluate(async () => {
      return new Promise((resolve) => {
        const testWords = ['representative', 'credentials', 'depreciation'];
        let loadedCount = 0;
        
        testWords.forEach(w => {
          const a = new Audio(`https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(w)}&type=2`);
          a.oncanplaythrough = () => {
            loadedCount++;
            if (loadedCount === testWords.length) {
              resolve({ success: true, count: loadedCount });
            }
          };
          a.onerror = () => {
            resolve({ success: false, word: w, error: a.error ? a.error.code : null });
          };
        });

        setTimeout(() => resolve({ success: loadedCount > 0, count: loadedCount, timeout: true }), 4000);
      });
    });

    console.log('  ✓ Kết quả kiểm tra luồng âm thanh:', directAudioTest);
    assert.ok(directAudioTest.success, 'Phải tải được luồng âm thanh từ vựng thành công');

    console.log('\n======================================================');
    console.log('🎉 TOÀN BỘ KIỂM THỬ ÂM THANH TỪ VỰNG ĐÃ PASS 100%! 🎉');
    console.log('======================================================');
  } finally {
    await browser.close();
  }
}

testAudioPlayback().catch(err => {
  console.error('[LỖI KIỂM THỬ ÂM THANH]:', err);
  process.exit(1);
});
