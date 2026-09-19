import { chromium } from 'playwright';

async function main() {
  console.log('--- Starting UI/UX Enhancements E2E Test ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
  });

  await context.addInitScript(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '990');
    localStorage.setItem('toeic_exam_date', '2026-10-30');
    localStorage.setItem('mistake_notebook', '{}');
    localStorage.setItem('toeic_streak_count', '5');
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Verify CompactInsightBar text
  const bar = page.locator('div[role="region"]');
  if (await bar.count() > 0) {
    const text = await bar.innerText();
    console.log(`[1] CompactInsightBar inner text:\n${text}`);
  } else {
    console.log('[1] CompactInsightBar region not found!');
  }
  const steadyText = await page.locator('text=Giữ vững phong độ và tiến độ học hôm nay!').count();
  console.log(`[1] CompactInsightBar steady text found: ${steadyText > 0 ? 'PASS' : 'FAIL'}`);
  if (steadyText === 0) throw new Error('CompactInsightBar steady text not updated!');

  // 2. Verify section badge
  const sectionBadge = await page.locator('text=Tự học ngoài giờ').count();
  console.log(`[2] Section badge "Tự học ngoài giờ" found: ${sectionBadge > 0 ? 'PASS' : 'FAIL'}`);
  if (sectionBadge === 0) throw new Error('Section badge not found!');

  // 3. Verify Reading Station and Exam Arena button de-duplication
  const duplicateReadingCta = await page.locator('text=LUYỆN FULL RC (75P)').count();
  console.log(`[3a] Reading station duplicate CTA "LUYỆN FULL RC (75P)" count: ${duplicateReadingCta} (expected: 0)`);
  if (duplicateReadingCta !== 0) throw new Error('Duplicate "LUYỆN FULL RC (75P)" should be removed!');

  const mockCta = await page.locator('text=THI THỬ RC (75P)').count();
  console.log(`[3b] Arena Mock CTA "THI THỬ RC (75P)" found: ${mockCta > 0 ? 'PASS' : 'FAIL'}`);
  if (mockCta !== 1) throw new Error('Arena Mock CTA "THI THỬ RC (75P)" should be exactly 1!');

  // 4. Verify Custom Test Selector Dropdown
  const testSelectorBtn = page.locator('button[aria-label="Chọn bộ đề thi ETS"]');
  await testSelectorBtn.waitFor({ state: 'visible' });
  const btnText = await testSelectorBtn.innerText();
  console.log(`[4a] Test selector button text: "${btnText.replace(/\n/g, ' ')}"`);

  // Screenshot with dropdown closed
  await page.screenshot({ path: 'scratch/dashboard_enhanced_closed.png', fullPage: true });

  // Open dropdown
  await testSelectorBtn.click();
  const dropdownMenu = page.locator('role=listbox');
  await dropdownMenu.waitFor({ state: 'visible' });
  await page.waitForTimeout(300);
  const optionsCount = await page.locator('role=option').count();
  console.log(`[4b] Test options count in custom dropdown: ${optionsCount} (expected 6)`);
  if (optionsCount !== 6) throw new Error(`Expected 6 test options, got ${optionsCount}`);

  // Screenshot with dropdown open
  await page.screenshot({ path: 'scratch/dashboard_enhanced_dropdown_open.png' });

  // Click Test 2 option
  const test2Option = page.locator('role=option >> text=ETS 2022 - Test 2');
  await test2Option.click();
  await page.waitForTimeout(400);

  const updatedBtnText = await testSelectorBtn.innerText();
  console.log(`[4c] After selecting Test 2: "${updatedBtnText.replace(/\n/g, ' ')}"`);
  if (!updatedBtnText.includes('ETS 2022 - Test 2')) {
    throw new Error('Test selector did not update to Test 2!');
  }

  // 5. Verify STRICT NO UI EMOJIS
  const bodyText = await page.innerText('body');
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  const emojiMatch = bodyText.match(emojiRegex);
  if (emojiMatch) {
    console.error(`[5] Emoji violation detected in DOM: ${emojiMatch[0]}`);
    throw new Error(`Forbidden emoji found in DOM: ${emojiMatch[0]}`);
  } else {
    console.log('[5] STRICT NO UI EMOJIS: 100% PASS (0 emoji in DOM)');
  }

  await browser.close();
  console.log('--- ALL TESTS PASSED SUCCESSFULLY ---');
}

main().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
