import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  const page = await context.newPage();

  // Populate realistic mistakes if empty or test
  await page.addInitScript(() => {
    // 6 vocab mistakes (4 due)
    // 74 exam mistakes (some due, across different parts)
    const existing = localStorage.getItem('mistake_notebook');
    if (!existing || Object.keys(JSON.parse(existing)).length === 0) {
      const mockMistakes = {
        'v_01': { wrongCount: 3, lastMistakeDate: new Date().toISOString(), type: 'vocabulary', box: 1, nextReviewDate: new Date(Date.now() - 10000).toISOString() },
        'v_02': { wrongCount: 1, lastMistakeDate: new Date().toISOString(), type: 'vocabulary', box: 1, nextReviewDate: new Date(Date.now() - 10000).toISOString() },
        'v_03': { wrongCount: 2, lastMistakeDate: new Date().toISOString(), type: 'vocabulary', box: 2, nextReviewDate: new Date(Date.now() - 10000).toISOString() },
        'v_04': { wrongCount: 1, lastMistakeDate: new Date().toISOString(), type: 'vocabulary', box: 1, nextReviewDate: new Date(Date.now() - 10000).toISOString() },
        'v_05': { wrongCount: 1, lastMistakeDate: new Date().toISOString(), type: 'vocabulary', box: 3, nextReviewDate: new Date(Date.now() + 86400000).toISOString() },
        'v_06': { wrongCount: 1, lastMistakeDate: new Date().toISOString(), type: 'vocabulary', box: 4, nextReviewDate: new Date(Date.now() + 86400000 * 3).toISOString() },
        
        // Some exam mistakes
        'ets2022_test1_part1_1': { wrongCount: 2, lastMistakeDate: new Date().toISOString(), type: 'exam', testId: 'ets2022_test1', part: 'part1', questionId: '1', box: 1, nextReviewDate: new Date(Date.now() - 10000).toISOString(), rootCause: 'Nghe không rõ' },
        'ets2022_test1_part2_7': { wrongCount: 1, lastMistakeDate: new Date().toISOString(), type: 'exam', testId: 'ets2022_test1', part: 'part2', questionId: '7', box: 1, nextReviewDate: new Date(Date.now() - 10000).toISOString(), rootCause: 'Mắc bẫy' },
        'ets2022_test1_part5_101': { wrongCount: 2, lastMistakeDate: new Date().toISOString(), type: 'exam', testId: 'ets2022_test1', part: 'part5', questionId: '101', box: 1, nextReviewDate: new Date(Date.now() - 10000).toISOString(), rootCause: 'Mắc bẫy', subCategory: 'Word Form' },
        'ets2022_test1_part5_102': { wrongCount: 1, lastMistakeDate: new Date().toISOString(), type: 'exam', testId: 'ets2022_test1', part: 'part5', questionId: '102', box: 2, nextReviewDate: new Date(Date.now() - 10000).toISOString(), rootCause: 'Ngữ pháp', subCategory: 'Verb Tense' },
        'ets2022_test1_part5_103': { wrongCount: 1, lastMistakeDate: new Date().toISOString(), type: 'exam', testId: 'ets2022_test1', part: 'part5', questionId: '103', box: 5, isMastered: true, masteredAt: new Date().toISOString(), rootCause: 'Từ vựng' },
        'ets2022_test1_part7_147': { wrongCount: 3, lastMistakeDate: new Date().toISOString(), type: 'exam', testId: 'ets2022_test1', part: 'part7', questionId: '147', box: 1, nextReviewDate: new Date(Date.now() - 10000).toISOString(), rootCause: 'Bất cẩn / Đọc lướt' }
      };
      localStorage.setItem('mistake_notebook', JSON.stringify(mockMistakes));
    }
  });

  console.log('Navigating to http://localhost:3000/notebook with auth bypass header...');
  await page.goto('http://localhost:3000/notebook', { waitUntil: 'networkidle' });

  // 1. Capture Vocab tab (Dark mode default)
  await page.screenshot({ path: 'scratch/notebook_vocab_tab.png' });
  console.log('Saved scratch/notebook_vocab_tab.png');

  // 2. Click Exam tab
  const tabButtons = page.locator('button[class*="tabBtn"]');
  const count = await tabButtons.count();
  console.log('Tab buttons count:', count);
  for (let i = 0; i < count; i++) {
    const text = await tabButtons.nth(i).innerText();
    console.log(`Tab ${i}:`, text);
  }

  // Click tab 1: Exam tab
  await tabButtons.nth(1).click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scratch/notebook_exam_tab.png' });
  console.log('Saved scratch/notebook_exam_tab.png');

  // Click tab 2: History tab
  await tabButtons.nth(2).click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'scratch/notebook_history_tab.png' });
  console.log('Saved scratch/notebook_history_tab.png');

  // 3. Mobile View
  await page.setViewportSize({ width: 375, height: 812 });
  // Vocab tab
  await tabButtons.nth(0).click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'scratch/notebook_mobile_vocab.png' });
  console.log('Saved scratch/notebook_mobile_vocab.png');

  // Exam tab on Mobile
  await tabButtons.nth(1).click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scratch/notebook_mobile_exam.png' });
  console.log('Saved scratch/notebook_mobile_exam.png');

  // 4. Inspect DOM
  const audit = await page.evaluate(() => {
    // 1. Emoji check
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    const bodyText = document.body.innerText;
    const hasEmojis = emojiRegex.test(bodyText);

    // 2. Inline styles count and samples
    const styledElements = Array.from(document.querySelectorAll('[style]')).map(el => ({
      tag: el.tagName,
      className: el.className,
      style: el.getAttribute('style')
    }));

    // 3. Buttons & Links check
    const links = Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.innerText.trim(),
      href: a.getAttribute('href')
    }));

    // 4. Layout dimensions
    const container = document.querySelector('[class*="container"]');
    const containerStyle = container ? window.getComputedStyle(container) : null;

    return {
      hasEmojis,
      inlineStyleCount: styledElements.length,
      styledElementsSamples: styledElements.slice(0, 10),
      links,
      containerMaxWidth: containerStyle?.maxWidth,
      containerPadding: containerStyle?.padding,
      bodyPaddingBottom: window.getComputedStyle(document.body).paddingBottom
    };
  });

  console.log('Audit Results:', JSON.stringify(audit, null, 2));

  await browser.close();
}

main().catch(console.error);
