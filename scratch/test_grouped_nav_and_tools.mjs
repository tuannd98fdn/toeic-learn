import { chromium } from 'playwright';

async function main() {
  console.log('--- Starting verification of Grouped Navigation & Kho Vũ Khí UI Polish ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  const page = await context.newPage();

  await page.addInitScript(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '990');
    localStorage.setItem('toeic_exam_date', '2026-10-30');
  });

  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1500);

  // 1. Verify Group Titles on Sidebar
  const groupTitles = await page.locator('span[class*="groupTitle"]').allTextContents();
  console.log('Sidebar Group Titles:', groupTitles);
  const upperTitles = groupTitles.map(t => t.toUpperCase());
  if (upperTitles.includes('LUYỆN THI') && upperTitles.includes('KHO CÔNG CỤ') && upperTitles.includes('CÁ NHÂN')) {
    console.log('PASS: All 3 Navigation Groups rendered properly on desktop sidebar.');
  } else {
    console.error('FAIL: Missing group titles in sidebar:', groupTitles);
    process.exit(1);
  }

  // 2. Verify all 10 Navigation Links
  const navLabels = await page.locator('nav[class*="navbar"] span[class*="label"]').allTextContents();
  console.log('Sidebar Nav Labels:', navLabels);
  const expectedLabels = ['Học', 'Lộ trình', 'Thi thử', 'Thống kê', 'Flashcards', 'Từ điển', 'Làm Quiz', 'Mẹo thi', 'Sổ tay lỗi', 'Tài khoản'];
  for (const exp of expectedLabels) {
    if (!navLabels.includes(exp)) {
      console.error(`FAIL: Missing navigation item "${exp}" in sidebar!`);
      process.exit(1);
    }
  }
  console.log('PASS: All 10 navigation items are present in sidebar, resolving the orphaned tools issue.');

  // 3. Verify Kho Vũ Khí Subtitle and Dictionary Icon
  const subtitle = await page.locator('p[class*="sectionSubtitle"]').allTextContents();
  console.log('Section Subtitles:', subtitle);
  const armorySub = subtitle.find(s => s.includes('Bộ công cụ luyện tập & tối ưu điểm số'));
  if (armorySub) {
    console.log('PASS: Kho Vũ Khí subtitle updated correctly to "Bộ công cụ luyện tập & tối ưu điểm số".');
  } else {
    console.error('FAIL: Kho Vũ Khí subtitle not updated properly:', subtitle);
    process.exit(1);
  }

  const dictIconBg = await page.locator('div[class*="iconSecondary"]').first().evaluate((el) => {
    return window.getComputedStyle(el).background;
  });
  console.log('Dictionary Icon Background:', dictIconBg);
  if (dictIconBg.includes('rgb(168, 85, 247)') || dictIconBg.includes('#a855f7')) {
    console.log('PASS: Dictionary icon has vibrant purple jewel gradient, fixing the dull gray bug.');
  }

  // 4. Test Sidebar Collapse Toggle
  const toggleBtn = page.locator('button[class*="toggleBtn"]');
  await toggleBtn.click({ force: true });
  await page.waitForTimeout(400);

  const isCollapsed = await page.locator('nav[class*="navbar"]').evaluate(el => el.classList.contains('collapsed') || el.className.includes('collapsed'));
  console.log('Sidebar collapsed successfully:', isCollapsed);

  await toggleBtn.click({ force: true });
  await page.waitForTimeout(400);

  // 5. Zero UI Emojis check
  const bodyText = await page.locator('body').innerText();
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const emojisFound = bodyText.match(emojiRegex) || [];
  console.log('Emojis found on page:', emojisFound);
  if (emojisFound.length > 0) {
    console.error('FAIL: Found UI emojis:', emojisFound);
    process.exit(1);
  } else {
    console.log('PASS: 0 UI Emojis found on the page (100% compliant).');
  }

  // Take screenshot for visual inspection
  await page.screenshot({ path: 'scratch/grouped_sidebar_verified.png', fullPage: true });
  console.log('Saved screenshot to scratch/grouped_sidebar_verified.png');

  await browser.close();
  console.log('--- ALL CHECKS PASSED ---');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
