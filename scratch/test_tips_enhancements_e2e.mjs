import { chromium } from 'playwright';

async function runTests() {
  console.log('--- STARTING E2E TEST: /tips Enhancements & Mastery Tracking ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    extraHTTPHeaders: {
      'x-playwright-test': 'true'
    }
  });

  const page = await context.newPage();

  // Test 1: Desktop View - Initial Load
  console.log('[Test 1] Navigating to /tips on Desktop...');
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/tips', { waitUntil: 'networkidle' });

  const title = await page.locator('h1').innerText();
  console.log(`Page title: "${title}"`);
  if (!title.includes('Kho Chiến Thuật & Bẫy Đề Thi TOEIC')) {
    throw new Error('Title does not match expected text');
  }

  // Verify Mastery Progress Card exists
  const masteryText = await page.locator('section[aria-label="Tiến độ làm chủ chiến thuật"]').innerText();
  console.log(`Mastery card text preview: ${masteryText.split('\n')[0]}`);

  // Test 2: Toggle Bookmark
  console.log('[Test 2] Testing Bookmark toggle...');
  const firstBookmarkBtn = page.locator('button[title="Lưu mẹo để ôn lại"]').first();
  await firstBookmarkBtn.click();
  await page.waitForTimeout(200);

  // Check if bookmark count in preset updated
  const bookmarkedPresetBtn = page.locator('button:has-text("Đã lưu")');
  const bookmarkedCountText = await bookmarkedPresetBtn.locator('span[class*="presetCount"]').innerText();
  console.log(`Bookmarked count: ${bookmarkedCountText}`);
  if (parseInt(bookmarkedCountText, 10) < 1) {
    throw new Error('Bookmarked count did not update');
  }

  // Filter by Bookmarked
  await bookmarkedPresetBtn.click();
  await page.waitForTimeout(300);
  const bookmarkedCardsCount = await page.locator('article').count();
  console.log(`Cards visible under 'Đã lưu': ${bookmarkedCardsCount}`);
  if (bookmarkedCardsCount !== 1) {
    throw new Error(`Expected 1 bookmarked card, got ${bookmarkedCardsCount}`);
  }

  // Return to All
  await page.locator('button:has-text("Tất cả")').first().click();
  await page.waitForTimeout(300);

  // Test 3: Toggle Mastered (Nắm vững)
  console.log('[Test 3] Testing Mastered toggle...');
  const firstMasteredBtn = page.locator('button:has-text("Chưa thuộc")').first();
  await firstMasteredBtn.click();
  await page.waitForTimeout(300);

  // Verify button changed to "Đã thuộc"
  const masteredBtnText = await page.locator('button:has-text("Đã thuộc")').first().innerText();
  console.log(`Mastered button text: "${masteredBtnText}"`);

  // Verify card has mastered class
  const hasMasteredClass = await page.evaluate(() => {
    const firstArticle = document.querySelector('article');
    return firstArticle ? firstArticle.className.includes('mastered') : false;
  });
  console.log(`Card has .mastered class: ${hasMasteredClass}`);
  if (!hasMasteredClass) {
    throw new Error('Card should have .mastered class');
  }

  // Test 4: Copy Formula to Clipboard
  console.log('[Test 4] Testing Copy Formula...');
  const copyBtn = page.locator('button[title="Sao chép công thức"]').first();
  await copyBtn.click();
  await page.waitForTimeout(200);
  const copyBtnText = await copyBtn.innerText();
  console.log(`Copy button feedback: "${copyBtnText}"`);
  if (!copyBtnText.includes('Đã chép')) {
    throw new Error('Copy feedback should say "Đã chép"');
  }

  // Test 5: Switch View Mode to Cheat Sheet Mode
  console.log('[Test 5] Switching to Cheat Sheet Mode...');
  const cheatSheetModeBtn = page.locator('button:has-text("Sổ tay Tóm tắt")');
  await cheatSheetModeBtn.click();
  await page.waitForTimeout(300);

  // In cheat sheet mode, full content is hidden and example toggle appears
  const firstToggle = page.locator('button[class*="toggleExamplesBtn"]').first();
  const toggleCount = await page.locator('button[class*="toggleExamplesBtn"]').count();
  console.log(`Collapsible example toggles available: ${toggleCount}`);
  if (toggleCount > 0) {
    await firstToggle.click();
    await page.waitForTimeout(200);
    const expandedText = await firstToggle.innerText();
    console.log(`After click, button says: "${expandedText}"`);
    if (!expandedText.includes('Thu gọn ví dụ')) {
      throw new Error('Example toggle should say "Thu gọn ví dụ"');
    }
  }

  // Take Desktop Screenshot in Cheat Sheet Mode
  await page.screenshot({ path: 'scratch/tips_enhanced_desktop_cheatsheet.png' });

  // Switch back to Detailed Mode
  await page.locator('button:has-text("Chế độ Chi tiết")').click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'scratch/tips_enhanced_desktop_detailed.png' });

  // Test 6: Presets (Bẫy đề thi ETS)
  console.log('[Test 6] Testing Quick Preset: Bẫy đề thi ETS...');
  await page.locator('button:has-text("Bẫy đề thi ETS")').click();
  await page.waitForTimeout(300);
  const trapCardsCount = await page.locator('article').count();
  console.log(`Trap cards count: ${trapCardsCount}`);
  if (trapCardsCount === 0) {
    throw new Error('Expected trap cards, got 0');
  }

  // Test 7: Reset Filters
  await page.locator('button:has-text("Đặt lại bộ lọc")').click();
  await page.waitForTimeout(300);
  const totalCards = await page.locator('article').count();
  console.log(`Total cards after reset: ${totalCards}`);
  if (totalCards !== 30) {
    throw new Error(`Expected 30 cards, got ${totalCards}`);
  }

  // Test 8: Mobile Layout (375x812)
  console.log('[Test 8] Testing Mobile Layout (375x812)...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'networkidle' });

  // Check header alignment on mobile
  const homeBtnVisible = await page.locator('a[title="Về Trang chủ"]').isVisible();
  console.log(`Home button visible on mobile: ${homeBtnVisible}`);

  // Check Part pills scroll container
  const partScrollExists = await page.evaluate(() => {
    const el = document.querySelector('div[class*="partScrollContainer"]');
    if (!el) return false;
    const style = window.getComputedStyle(el);
    return style.overflowX === 'auto' && style.whiteSpace === 'nowrap';
  });
  console.log(`Part scroll container has overflow-x auto & white-space nowrap: ${partScrollExists}`);
  if (!partScrollExists) {
    throw new Error('Part scroll container missing horizontal scroll properties');
  }

  // Check bottom padding on mobile
  const paddingBottomVal = await page.evaluate(() => {
    const el = document.querySelector('div[class*="container"]');
    return el ? window.getComputedStyle(el).paddingBottom : '0';
  });
  console.log(`Mobile container padding-bottom: ${paddingBottomVal}`);
  const pbPx = parseInt(paddingBottomVal, 10);
  if (pbPx < 80) {
    throw new Error(`Container padding-bottom (${paddingBottomVal}) is less than safe-area 80px`);
  }

  await page.screenshot({ path: 'scratch/tips_enhanced_mobile_light.png' });

  // Test 9: Dark Mode Screenshot on Mobile
  console.log('[Test 9] Testing Dark Mode on Mobile...');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'scratch/tips_enhanced_mobile_dark.png' });

  // Test 10: Strict NO UI EMOJIS Check
  console.log('[Test 10] Checking for UI Emojis on rendered DOM...');
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
  const bodyText = await page.locator('body').innerText();
  const foundEmoji = emojiRegex.test(bodyText);
  console.log(`Rendered DOM contains emoji: ${foundEmoji}`);
  if (foundEmoji) {
    const matches = bodyText.match(new RegExp(emojiRegex, 'gu'));
    throw new Error(`STRICT RULE VIOLATION: Emojis found in DOM: ${JSON.stringify(matches)}`);
  }

  await browser.close();
  console.log('--- ALL TESTS PASSED SUCCESSFULLY! ---');
}

runTests().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
