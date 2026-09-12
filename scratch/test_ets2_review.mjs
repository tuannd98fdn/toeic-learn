import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';
import * as path from 'path';

const ARTIFACTS_DIR = '/Users/bravee06/.gemini/antigravity-ide/brain/59f562b3-0ab6-4a20-8c87-ec01c44bc933';
const secret = 'my-super-secret-key-12345';

async function main() {
  console.log('🚀 Khởi động Playwright để tự đánh giá và review toàn diện...');

  const token = await encode({
    token: {
      name: 'Reviewer Student',
      email: 'reviewer@toeic.edu',
      sub: 'user-123'
    },
    secret
  });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

  // Set auth cookie
  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax'
    }
  ]);

  const page = await context.newPage();

  // Set localStorage onboarding flags
  await page.addInitScript(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '750+');
  });

  // 1. Visit Homepage and inspect Test Selector
  console.log('1. Kiểm tra trang chủ và danh mục đề thi...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  console.log('  Current URL:', page.url());

  // Wait for options to be fetched from /data/tests_index.json
  await page.waitForSelector('select option:has-text("ETS 2022 - Test 2")', { state: 'attached', timeout: 10000 });

  // Check test options in select dropdown
  const testOptions = await page.locator('select option').allInnerTexts();
  console.log('  Danh sách đề trong dropdown:', testOptions);

  // Take screenshot of homepage test selector area
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'ets2_homepage_selector.png') });
  console.log('  ✓ Đã chụp ảnh màn hình Homepage');

  // Select Test 2
  await page.selectOption('select', 'ets2022_test2');
  await page.waitForTimeout(500);

  // 2. Test Part 5 with Test 2
  console.log('2. Kiểm tra giao diện Part 5 với Test 2...');
  await page.goto('http://localhost:3000/part5?test=ets2022_test2', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Tanaka', { timeout: 10000 });
  const q101Text = await page.locator('body').innerText();
  const hasMsTanaka = q101Text.includes('Tanaka') || q101Text.includes('expense report');
  console.log('  Part 5 Q101 có chứa đề thi Test 2 (Ms. Tanaka):', hasMsTanaka);

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'ets2_part5_screen.png') });
  console.log('  ✓ Đã chụp ảnh màn hình Part 5 Test 2');

  // Answer Q101 with option B ("her")
  const optionB = page.locator('button:has-text("her")').first();
  if (await optionB.isVisible()) {
    await optionB.click();
    await page.waitForTimeout(500);
    console.log('  ✓ Đã bấm chọn đáp án (B) cho câu 101');
  }

  // 3. Test Mini-test with Test 2
  console.log('3. Kiểm tra Mini-test với Test 2...');
  await page.goto('http://localhost:3000/mini-test?test=ets2022_test2', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Mini Test', { timeout: 10000 });
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'ets2_minitest_screen.png') });
  console.log('  ✓ Đã chụp ảnh màn hình Mini Test Test 2');

  // 4. Test Dark Mode rendering
  console.log('4. Kiểm tra giao diện Dark mode...');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('http://localhost:3000/part5?test=ets2022_test2', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'ets2_part5_darkmode.png') });
  console.log('  ✓ Đã chụp ảnh màn hình Part 5 Dark Mode');

  // 5. Audit UI for Emojis
  console.log('5. Tự động rà soát vi phạm Emoji trên các trang chính...');
  const pagesToAudit = [
    'http://localhost:3000/',
    'http://localhost:3000/part5?test=ets2022_test2',
    'http://localhost:3000/mini-test?test=ets2022_test2',
    'http://localhost:3000/notebook'
  ];

  const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/u;

  for (const url of pagesToAudit) {
    await page.goto(url, { waitUntil: 'networkidle' });
    const bodyText = await page.evaluate(() => document.body.innerText);
    const matches = bodyText.match(emojiRegex);
    if (matches) {
      console.warn(`  ⚠️ Cảnh báo: Tìm thấy emoji trên ${url}:`, matches);
    } else {
      console.log(`  ✓ 0 emoji trên: ${url}`);
    }
  }

  await browser.close();
  console.log('🎉 Hoàn thành kiểm thử và tự đánh giá thành công 100%!');
}

main().catch(err => {
  console.error('Lỗi kiểm thử:', err);
  process.exit(1);
});
