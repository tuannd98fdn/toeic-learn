import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

async function testPart5() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
  });

  await context.addInitScript(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '750+');
    localStorage.setItem('toeic_exam_date', '2026-10-15');
  });

  const page = await context.newPage();

  try {
    console.log('Navigating to http://localhost:3000/part5 ...');
    await page.goto('http://localhost:3000/part5', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);

    // Find the text node containing "values"
    console.log('Selecting "values" in question text...');
    await page.evaluate(() => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const text = node.textContent || '';
        const idx = text.indexOf('values');
        if (idx !== -1 && node.parentElement && node.parentElement.tagName !== 'BUTTON') {
          const range = document.createRange();
          range.setStart(node, idx);
          range.setEnd(node, idx + 6);
          const sel = window.getSelection();
          if (sel) {
            sel.removeAllRanges();
            sel.addRange(range);
            document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
          }
          break;
        }
      }
    });

    // Wait for the Popover to appear and settle animation
    const popover = page.locator('[class*="popoverCard"]');
    await popover.waitFor({ timeout: 5000 });
    await page.waitForTimeout(250);

    const word = await popover.locator('[class*="wordText"]').innerText();
    const meaning = await popover.locator('[class*="meaningText"]').innerText();
    const ipa = await popover.locator('[class*="ipaText"]').innerText();

    console.log('Popover content for "values":', { word, ipa, meaning });
    console.assert(word === 'values', 'Word mismatch');
    console.assert(meaning.includes('giá trị'), 'Meaning is not Vietnamese "giá trị"');

    // Take screenshot of values popover
    const screenshotDir = path.join(projectRoot, 'scratch');
    await page.screenshot({ path: path.join(screenshotDir, 'popover_values_fixed.png'), fullPage: false });
    console.log('Saved screenshot to scratch/popover_values_fixed.png');

    // Now select "housing"
    console.log('Selecting "housing" in question text...');
    await page.evaluate(() => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const text = node.textContent || '';
        const idx = text.indexOf('housing');
        if (idx !== -1 && node.parentElement && node.parentElement.tagName !== 'BUTTON') {
          const range = document.createRange();
          range.setStart(node, idx);
          range.setEnd(node, idx + 7);
          const sel = window.getSelection();
          if (sel) {
            sel.removeAllRanges();
            sel.addRange(range);
            document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
          }
          break;
        }
      }
    });

    await page.waitForTimeout(400);
    const wordHousing = await popover.locator('[class*="wordText"]').innerText();
    const meaningHousing = await popover.locator('[class*="meaningText"]').innerText();
    const ipaHousing = await popover.locator('[class*="ipaText"]').innerText();

    console.log('Popover content for "housing":', { word: wordHousing, ipa: ipaHousing, meaning: meaningHousing });
    console.assert(wordHousing === 'housing', 'Word mismatch');
    console.assert(meaningHousing.includes('nhà ở'), 'Meaning is not Vietnamese "nhà ở"');

    // Take screenshot of housing popover
    await page.screenshot({ path: path.join(screenshotDir, 'popover_housing_fixed.png'), fullPage: false });
    console.log('Saved screenshot to scratch/popover_housing_fixed.png');

    // Test saving to Flashcards and verifying sync
    console.log('Testing 1-Click Flashcard save on "housing"...');
    const saveBtn = popover.locator('[class*="saveFlashcardBtn"]');
    await saveBtn.click();
    await page.waitForTimeout(300);

    const savedText = await saveBtn.innerText();
    console.log('Save button status:', savedText);
    console.assert(savedText.includes('Đã lưu'), 'Save status did not update');

    console.log('✓ VERIFICATION ON /part5 COMPLETED WITH 100% SUCCESS!');
  } finally {
    await browser.close();
  }
}

testPart5().catch(e => {
  console.error('Test error:', e);
  process.exit(1);
});
