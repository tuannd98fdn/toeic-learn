import { chromium } from 'playwright';

async function testStudyPageWordSave() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });

  await context.addInitScript(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '750+');
    localStorage.setItem('toeic_exam_date', '2026-10-15');
  });

  const page = await context.newPage();
  const consoleErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  try {
    console.log('Navigating to http://localhost:3000/study ...');
    await page.goto('http://localhost:3000/study', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);

    // Trigger word selection inside Flashcard or page
    console.log('Selecting text to trigger In-Context Popover...');
    await page.evaluate(() => {
      const el = document.querySelector('h1, h2, span, p');
      if (el && el.firstChild) {
        const range = document.createRange();
        range.setStart(el.firstChild, 0);
        range.setEnd(el.firstChild, Math.min(6, el.firstChild.textContent?.length || 1));
        const sel = window.getSelection();
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(range);
          document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        }
      }
    });

    const popover = page.locator('[class*="popoverCard"]');
    await popover.waitFor({ timeout: 5000 });
    console.log('✓ Popover appeared on /study page');

    const saveBtn = popover.locator('[class*="saveFlashcardBtn"]');
    await saveBtn.waitFor({ timeout: 5000 });
    console.log('Clicking Save to Flashcards button...');
    await saveBtn.click();
    await page.waitForTimeout(1000);

    console.log('Checking console errors...');
    const reactWarnings = consoleErrors.filter(e => e.includes('Cannot update a component') || e.includes('setstate-in-render'));
    if (reactWarnings.length > 0) {
      console.error('DETECTED CONSOLE ERROR:', reactWarnings);
      return { hasError: true, errors: reactWarnings };
    }

    console.log('✓ No React setState in render warnings found!');
    return { hasError: false, errors: [] };
  } finally {
    await browser.close();
  }
}

testStudyPageWordSave().then(result => {
  if (result.hasError) {
    console.log('TEST REPRODUCED THE ISSUE SUCCESSFULLY!');
    process.exit(1);
  } else {
    console.log('ALL PASSED WITH NO CONSOLE ERRORS!');
  }
}).catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
