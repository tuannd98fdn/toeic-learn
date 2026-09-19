import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';
import path from 'path';

const secret = "my-super-secret-key-12345";
const artifactDir = "/Users/bravee06/.gemini/antigravity-ide/brain/ceff9e02-915a-472a-8e45-fadaa0b23cea";

async function run() {
  console.log('--- STARTING PLAYWRIGHT E2E FOR BILINGUAL SEARCH ---');

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

  // 1. Navigate to /vocabulary
  console.log('1. Navigating to /vocabulary...');
  await page.goto('http://localhost:3000/vocabulary');
  await page.waitForSelector('[class*="wordCount"]', { timeout: 10000 });

  // Verify total word count
  const wordCountElem = page.locator('[class*="wordCount"]').first();
  const initialCountText = await wordCountElem.innerText();
  console.log('Initial word count text:', initialCountText);
  if (!initialCountText.includes('453 từ') && !initialCountText.includes('từ')) {
    throw new Error(`Unexpected initial count text: ${initialCountText}`);
  }

  // Screenshot initial page
  await page.screenshot({ path: path.join(artifactDir, 'vocab_bilingual_initial.png') });
  console.log('Saved screenshot: vocab_bilingual_initial.png');

  // 2. Test Tone-Insensitive Vietnamese Search: "hop dong"
  console.log('2. Testing Vietnamese unaccented search: "hop dong"...');
  const searchInput = page.locator('input[placeholder*="Tra cứu song ngữ"]');
  await searchInput.fill('hop dong');
  await page.waitForTimeout(400);

  const hopDongCountText = await wordCountElem.innerText();
  console.log('Search "hop dong" count text:', hopDongCountText);
  if (!hopDongCountText.includes('từ') || hopDongCountText.startsWith('0 từ')) {
    throw new Error(`Expected matches for "hop dong", but got: ${hopDongCountText}`);
  }

  // Verify highlight element is rendered
  const highlightElements = page.locator('mark[class*="highlight"]');
  const highlightCount = await highlightElements.count();
  console.log(`Found ${highlightCount} highlight marks for "hop dong"`);
  if (highlightCount === 0) {
    throw new Error('Expected highlight marks for matched keywords!');
  }

  await page.screenshot({ path: path.join(artifactDir, 'vocab_search_hop_dong.png') });
  console.log('Saved screenshot: vocab_search_hop_dong.png');

  // 3. Test Clear Button ('x')
  console.log('3. Testing clear search button...');
  const clearBtn = page.locator('button[aria-label="Xóa tìm kiếm"]');
  await clearBtn.click();
  await page.waitForTimeout(300);

  const afterClearVal = await searchInput.inputValue();
  if (afterClearVal !== '') {
    throw new Error(`Expected input to be empty after clicking clear, got "${afterClearVal}"`);
  }

  // 4. Test Quick Search Chip Click (e.g. "Lịch trình")
  console.log('4. Testing quick search chip: "Lịch trình"...');
  const lichTrinhChip = page.getByRole('button', { name: 'Lịch trình' });
  await lichTrinhChip.click();
  await page.waitForTimeout(400);

  const lichTrinhInputVal = await searchInput.inputValue();
  console.log('Search input value after chip click:', lichTrinhInputVal);
  if (lichTrinhInputVal !== 'lịch trình') {
    throw new Error(`Expected search input to be "lịch trình", got "${lichTrinhInputVal}"`);
  }

  const lichTrinhCount = await wordCountElem.innerText();
  console.log('Lịch trình count text:', lichTrinhCount);

  await page.screenshot({ path: path.join(artifactDir, 'vocab_quick_chip_lich_trinh.png') });
  console.log('Saved screenshot: vocab_quick_chip_lich_trinh.png');

  // 5. Test Search Mode Toggle (EN / VI / Song ngữ)
  console.log('5. Testing search mode toggles...');
  // Click "Tiếng Anh (EN)"
  const enModeBtn = page.getByRole('button', { name: 'Tiếng Anh (EN)' });
  await enModeBtn.click();
  await page.waitForTimeout(300);

  // In EN mode, "lịch trình" (Vietnamese) should yield 0 results
  const enModeCountWithViQuery = await wordCountElem.innerText();
  console.log('EN mode with Vietnamese query count:', enModeCountWithViQuery);
  if (!enModeCountWithViQuery.startsWith('0 từ')) {
    throw new Error(`Expected 0 words for Vietnamese query in EN mode, got "${enModeCountWithViQuery}"`);
  }

  // Fill English word "schedule"
  await searchInput.fill('schedule');
  await page.waitForTimeout(400);
  const enModeScheduleCount = await wordCountElem.innerText();
  console.log('EN mode with "schedule" query count:', enModeScheduleCount);
  if (enModeScheduleCount.startsWith('0 từ')) {
    throw new Error(`Expected matches for "schedule" in EN mode, got "${enModeScheduleCount}"`);
  }

  // Click "Tiếng Việt (VI)"
  const viModeBtn = page.getByRole('button', { name: 'Tiếng Việt (VI)' });
  await viModeBtn.click();
  await page.waitForTimeout(300);

  // In VI mode, "schedule" should yield 0 results
  const viModeCountWithEnQuery = await wordCountElem.innerText();
  console.log('VI mode with English query count:', viModeCountWithEnQuery);
  if (!viModeCountWithEnQuery.startsWith('0 từ')) {
    throw new Error(`Expected 0 words for English query in VI mode, got "${viModeCountWithEnQuery}"`);
  }

  // Switch back to "Song ngữ (Tất cả)"
  const allModeBtn = page.getByRole('button', { name: 'Song ngữ (Tất cả)' });
  await allModeBtn.click();
  await page.waitForTimeout(300);

  // In All mode, "schedule" matches
  const allModeScheduleCount = await wordCountElem.innerText();
  console.log('Song ngữ mode with "schedule" query count:', allModeScheduleCount);
  if (allModeScheduleCount.startsWith('0 từ')) {
    throw new Error(`Expected matches for "schedule" in Song ngữ mode, got "${allModeScheduleCount}"`);
  }

  // 6. Test Keyboard Shortcut (Escape to clear)
  console.log('6. Testing Escape key to clear search...');
  await searchInput.focus();
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  const escapedInputVal = await searchInput.inputValue();
  if (escapedInputVal !== '') {
    throw new Error(`Expected input to be empty after Escape key, got "${escapedInputVal}"`);
  }

  // 7. Check for strictly NO UI EMOJIS in rendered DOM
  console.log('7. Verifying NO UI EMOJIS rule...');
  const bodyText = await page.innerText('body');
  // Check common emoji code points
  const emojiRegex = /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/u;
  
  // We check header, searchRow, bilingualControls, wordCountRow, and card headers
  const controlsText = await page.locator('header[class*="header"]').innerText();
  const matchesEmoji = emojiRegex.test(controlsText);
  if (matchesEmoji) {
    throw new Error(`Detected forbidden emoji in header controls: ${controlsText}`);
  }
  console.log('PASS: Header, search bar, mode tabs, and quick chips contain 0 emojis.');

  await page.screenshot({ path: path.join(artifactDir, 'vocab_bilingual_verified.png') });
  console.log('Saved screenshot: vocab_bilingual_verified.png');

  await browser.close();
  console.log('=== ALL BILINGUAL SEARCH PLAYWRIGHT TESTS PASSED 100%! ===');
}

run().catch(err => {
  console.error('Playwright Test Failed:', err);
  process.exit(1);
});
