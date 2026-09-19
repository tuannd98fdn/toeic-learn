import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';
import assert from 'node:assert';

const EMOJI_REGEX = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

function assertNoEmojis(text, contextName) {
  const match = text.match(EMOJI_REGEX);
  if (match) {
    throw new Error(`[VIOLATION] Phát hiện emoji "${match[0]}" trong ${contextName}! Nội dung: ${text.slice(0, 100)}...`);
  }
}

async function runTests() {
  console.log('--- KHỞI ĐỘNG KIỂM THỬ PLAYWRIGHT E2E TỔNG THỂ TỪ VỰNG & ĐÁNH GIÁ 12 CHỦ ĐỀ ---');
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

  try {
    // ==========================================
    // 1. KIỂM THỬ TRANG HỌC TỪ VỰNG /study
    // ==========================================
    console.log('\n[TEST 1] Kiểm tra Trung tâm Từ vựng /study:');
    await page.goto('http://localhost:3000/study', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Kiểm tra không có emoji trên DOM
    let bodyText = await page.innerText('body');
    assertNoEmojis(bodyText, 'Trang /study ban đầu');
    console.log('  ✓ 0 emoji trên giao diện /study');

    // Kiểm tra dropdown chọn chủ đề ETS
    const topicSelect = page.locator('#topic-filter-select');
    await topicSelect.waitFor({ state: 'visible', timeout: 5000 });
    const topicOptionsCount = await topicSelect.locator('option').count();
    console.log(`  ✓ Dropdown chủ đề có ${topicOptionsCount} tùy chọn (12 chủ đề + Tất cả)`);
    assert.strictEqual(topicOptionsCount, 13, 'Dropdown phải gồm 13 options (Tất cả + 12 chủ đề)');

    // Bật Ma trận Đánh giá Năng lực 12 Chủ Đề
    const matrixToggleBtn = page.locator('button:has-text("Đánh Giá Năng Lực 12 Chủ Đề")');
    await matrixToggleBtn.click();
    await page.waitForTimeout(500);

    // Xác nhận Matrix hiển thị
    const matrixTitle = page.locator('h2:has-text("Bản Đồ Năng Lực Từ Vựng 12 Chủ Đề ETS")');
    await matrixTitle.waitFor({ state: 'visible', timeout: 3000 });
    console.log('  ✓ Ma trận Đánh giá Năng lực 12 Chủ Đề mở thành công');

    // Chụp ảnh Ma trận
    await page.screenshot({ path: 'scratch/study_vocab_topic_matrix.png', fullPage: false });
    console.log('  ✓ Đã chụp ảnh nghiệm thu: scratch/study_vocab_topic_matrix.png');

    // Click "Luyện tập" trên thẻ Hợp đồng & Pháp lý trong matrix
    const practiceContractBtn = page.locator('div[class*="topicCard"]:has-text("Hợp đồng & Pháp lý") button:has-text("Luyện tập")');
    await practiceContractBtn.click();
    await page.waitForTimeout(500);

    // Xác nhận dropdown đã tự chuyển sang "Contracts & Legal"
    const selectedTopicVal = await topicSelect.inputValue();
    assert.strictEqual(selectedTopicVal, 'Contracts & Legal', 'Dropdown phải tự đồng bộ sang Contracts & Legal');
    console.log('  ✓ Click từ Matrix tự động kích hoạt lọc và tải từ vựng Contracts & Legal');

    // Học và đánh giá 1 từ Flashcard
    const rateBtn = page.locator('button:has-text("Đã Thuộc")').or(page.locator('button:has-text("Thuộc")')).first();
    if (await rateBtn.isVisible()) {
      await rateBtn.click();
      await page.waitForTimeout(300);
      console.log('  ✓ Đánh giá flashcard thành công');
    }

    // ==========================================
    // 2. KIỂM THỬ TRANG LÀM QUIZ /quiz
    // ==========================================
    console.log('\n[TEST 2] Kiểm tra Trang Làm Quiz /quiz:');
    await page.goto('http://localhost:3000/quiz', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Kiểm tra không có emoji trên Quiz
    bodyText = await page.innerText('body');
    assertNoEmojis(bodyText, 'Trang /quiz ban đầu');

    // Kiểm tra dropdown chọn chủ đề Quiz
    const quizTopicSelect = page.locator('select[aria-label="Chọn chủ đề câu hỏi Quiz"]');
    await quizTopicSelect.waitFor({ state: 'visible', timeout: 5000 });
    console.log('  ✓ Dropdown chọn chủ đề Quiz hiển thị');

    // Đổi sang chủ đề "Tài chính & Kế toán"
    await quizTopicSelect.selectOption({ label: 'Tài chính & Kế toán (Finance & Accounting)' });
    await page.waitForTimeout(500);
    console.log('  ✓ Đã chọn chủ đề Finance & Accounting cho bài Quiz');

    // Hoàn thành 10 câu Quiz bằng cách chọn đáp án
    console.log('  -> Đang trả lời 10 câu hỏi Quiz...');
    for (let i = 0; i < 10; i++) {
      await page.waitForTimeout(400);
      const optionBtn = page.locator('button[class*="optionBtn"]').first();
      await optionBtn.waitFor({ state: 'visible', timeout: 5000 });
      await optionBtn.click();
    }

    // Đợi màn hình Kết quả Quiz hiển thị
    await page.waitForSelector('#quiz-result-hero', { timeout: 8000 });
    console.log('  ✓ Hoàn thành bài Quiz và hiển thị Hero Result');

    // Kiểm tra Thẻ Đánh Giá Năng Lực Chủ Đề sau khi nộp
    const topicAssessment = page.locator('div[class*="topicAssessmentCard"]');
    await topicAssessment.waitFor({ state: 'visible', timeout: 3000 });
    const assessmentTitle = await topicAssessment.locator('h3').innerText();
    console.log(`  ✓ Thẻ Đánh Giá Năng Lực hiển thị: "${assessmentTitle}"`);
    assert.ok(assessmentTitle.includes('Tài chính & Kế toán'), 'Tiêu đề đánh giá phải chứa tên chủ đề đã làm');

    // Kiểm tra nút CTA chuyển sang Flashcard học chủ đề
    const ctaStudyTopic = topicAssessment.locator('a:has-text("Học Flashcards")');
    await ctaStudyTopic.waitFor({ state: 'visible' });
    const ctaHref = await ctaStudyTopic.getAttribute('href');
    console.log(`  ✓ Nút CTA Flashcard liên kết tới: ${ctaHref}`);
    assert.ok(ctaHref.includes('category=Finance'), 'Link CTA phải dẫn tới đúng category');

    // Kiểm tra 0 emoji trên màn hình kết quả Quiz
    bodyText = await page.innerText('body');
    assertNoEmojis(bodyText, 'Màn hình kết quả Quiz');
    console.log('  ✓ 0 emoji trên màn hình kết quả Quiz');

    // Chụp ảnh kết quả Quiz
    await page.screenshot({ path: 'scratch/quiz_topic_assessment_result.png', fullPage: false });
    console.log('  ✓ Đã chụp ảnh nghiệm thu: scratch/quiz_topic_assessment_result.png');

    // ==========================================
    // 3. KIỂM THỬ TRANG THƯ VIỆN TỪ VỰNG /vocabulary
    // ==========================================
    console.log('\n[TEST 3] Kiểm tra Thư viện Từ vựng /vocabulary:');
    await page.goto('http://localhost:3000/vocabulary', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Mở bộ lọc nâng cao
    const filterToggleBtn = page.locator('button:has-text("Bộ lọc")');
    await filterToggleBtn.click();
    await page.waitForTimeout(400);

    // Kiểm tra các chip chủ đề ETS tiếng Việt
    const topicChip = page.locator('button:has-text("Hợp đồng & Pháp lý")');
    await topicChip.waitFor({ state: 'visible', timeout: 3000 });
    console.log('  ✓ Chip lọc chủ đề ETS tiếng Việt hiển thị chuẩn');

    // Click chọn chip Hợp đồng & Pháp lý
    await topicChip.click();
    await page.waitForTimeout(400);

    // Click vào từ vựng đầu tiên để xem nội dung mở rộng
    const firstWordCard = page.locator('div[class*="cardBody"]').first();
    await firstWordCard.click();
    await page.waitForTimeout(300);

    // Kiểm tra badge chủ đề song ngữ trong thẻ từ
    const categoryBadge = page.locator('div[class*="categoryBadge"]').first();
    await categoryBadge.waitFor({ state: 'visible' });
    const badgeText = await categoryBadge.innerText();
    console.log(`  ✓ Badge chủ đề trên thẻ từ vựng: "${badgeText}"`);
    assert.ok(badgeText.includes('Hợp đồng & Pháp lý'), 'Badge phải hiển thị tên tiếng Việt của chủ đề');

    // Kiểm tra 0 emoji trên thư viện từ
    bodyText = await page.innerText('body');
    assertNoEmojis(bodyText, 'Trang /vocabulary');
    console.log('  ✓ 0 emoji trên thư viện từ /vocabulary');

    await page.screenshot({ path: 'scratch/vocabulary_topic_filter.png', fullPage: false });
    console.log('  ✓ Đã chụp ảnh nghiệm thu: scratch/vocabulary_topic_filter.png');

    // ==========================================
    // 4. KIỂM THỬ TRANG THỐNG KÊ /stats
    // ==========================================
    console.log('\n[TEST 4] Kiểm tra Trang Thống kê & Năng lực /stats:');
    await page.goto('http://localhost:3000/stats', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Kiểm tra Ma trận Năng lực 12 Chủ Đề được nhúng trên trang Stats
    const statsMatrixTitle = page.locator('h2:has-text("Bản Đồ Năng Lực Từ Vựng 12 Chủ Đề ETS")');
    await statsMatrixTitle.waitFor({ state: 'visible', timeout: 5000 });
    console.log('  ✓ Ma trận Năng lực 12 Chủ Đề nhúng thành công trên /stats');

    // Cuộn tới ma trận và chụp ảnh
    await statsMatrixTitle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    bodyText = await page.innerText('body');
    assertNoEmojis(bodyText, 'Trang /stats');
    console.log('  ✓ 0 emoji trên toàn trang /stats');

    await page.screenshot({ path: 'scratch/stats_vocab_topic_matrix.png', fullPage: false });
    console.log('  ✓ Đã chụp ảnh nghiệm thu: scratch/stats_vocab_topic_matrix.png');

    // ==========================================
    // 5. MOBILE RESPONSIVE TEST
    // ==========================================
    console.log('\n[TEST 5] Kiểm thử Mobile Responsive (375x667):');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/study', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    const mobileTopicSelect = page.locator('#topic-filter-select');
    await mobileTopicSelect.waitFor({ state: 'visible' });
    console.log('  ✓ Dropdown chủ đề hiển thị mượt mà trên mobile');

    console.log('\n======================================================');
    console.log('🎉 TOÀN BỘ KIỂM THỬ PLAYWRIGHT E2E ĐÃ PASS XUẤT SẮC 100%! 🎉');
    console.log('======================================================');
  } finally {
    await browser.close();
  }
}

runTests().catch(err => {
  console.error('\n[LỖI KIỂM THỬ]:', err);
  process.exit(1);
});
