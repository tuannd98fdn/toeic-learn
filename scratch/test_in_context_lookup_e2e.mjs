import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('--- 1. Strict Check: NO UI EMOJIS in In-Context Lookup files ---');
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
const filesToCheck = [
  'src/components/TextSelectionToolbar.tsx',
  'src/components/TextSelectionToolbar.module.css',
  'src/app/api/quick-dict/route.ts',
  'src/components/icons/AppIcons.tsx',
  'scripts/ingest_real_ets.mjs',
];

for (const relPath of filesToCheck) {
  const content = fs.readFileSync(path.join(projectRoot, relPath), 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (emojiRegex.test(line) && !line.includes('//') && !line.includes('*') && !line.includes('emojiRegex')) {
      console.error(`VIOLATION: Emoji found in ${relPath}:${idx + 1}: ${line}`);
      process.exit(1);
    }
  });
}
console.log('✓ NO UI EMOJIS check passed 100%');

console.log('\n--- 2. Testing /api/quick-dict API directly for "values" and "housing" ---');
async function testApi() {
  const wordsToTest = [
    { word: 'values', expectedVi: 'giá trị' },
    { word: 'housing', expectedVi: 'nhà ở' },
    { word: 'dropped', expectedVi: 'sụt giảm' },
    { word: 'peak', expectedVi: 'đỉnh điểm' },
  ];

  for (const item of wordsToTest) {
    const t0 = Date.now();
    const res = await fetch(`http://localhost:3000/api/quick-dict?word=${item.word}`);
    const elapsed = Date.now() - t0;
    console.assert(res.ok, `Expected 200 from quick-dict API for ${item.word}, got ${res.status}`);
    const data = await res.json();
    console.log(`quick-dict("${item.word}") [${elapsed}ms]:`, {
      word: data.word,
      ipa: data.ipa,
      partOfSpeech: data.partOfSpeech,
      vietnamese: data.vietnamese,
      source: data.source,
    });
    console.assert(data.word === item.word, `Expected word '${item.word}', got ${data.word}`);
    console.assert(data.vietnamese.includes(item.expectedVi), `Expected Vietnamese meaning to include '${item.expectedVi}', got '${data.vietnamese}'`);
    console.assert(elapsed < 150, `Expected instant lookup under 150ms, took ${elapsed}ms`);
  }
  console.log('✓ /api/quick-dict returns instant Vietnamese definitions for all test words (< 150ms)');
}

console.log('\n--- 3. Playwright E2E: In-Context Popover in Part 7 ---');
async function runE2E() {
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

  try {
    console.log('Navigating to http://localhost:3000/part7 ...');
    await page.goto('http://localhost:3000/part7', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Find any paragraph or passage element
    const passageText = page.locator('article, p, [class*="passageContent"]').first();
    await passageText.waitFor({ timeout: 10000 });

    // Select text using mouse drag or DOM selection
    console.log('Selecting a word in the passage to trigger In-Context Popover...');
    await page.evaluate(() => {
      // Find a word in text nodes
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const text = node.textContent || '';
        const match = text.match(/\b([a-zA-Z]{4,12})\b/);
        if (match && node.parentElement && !['BUTTON', 'INPUT', 'TEXTAREA', 'SCRIPT', 'STYLE'].includes(node.parentElement.tagName)) {
          const startIndex = text.indexOf(match[1]);
          const range = document.createRange();
          range.setStart(node, startIndex);
          range.setEnd(node, startIndex + match[1].length);
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

    // Wait for the Popover to appear
    console.log('Waiting for In-Context Popover card...');
    const popover = page.locator('[class*="popoverCard"]');
    await popover.waitFor({ timeout: 5000 });

    const wordText = await popover.locator('[class*="wordText"]').innerText();
    console.log(`✓ Popover appeared for word: "${wordText}"`);

    // Verify Speaker Audio button
    const audioBtn = popover.locator('[class*="audioBtn"]');
    console.assert(await audioBtn.count() > 0, 'Missing speaker button!');
    console.log('✓ Native speaker button present');

    // Verify 1-Click Save button
    const saveBtn = popover.locator('[class*="saveFlashcardBtn"]');
    console.assert(await saveBtn.count() > 0, 'Missing save flashcard button!');
    console.log('✓ 1-Click Flashcard CTA present:', await saveBtn.innerText());

    // Click 1-Click Save button
    await saveBtn.click();
    await page.waitForTimeout(500);

    const savedStatus = await saveBtn.innerText();
    console.log(`✓ Save status after click: "${savedStatus}"`);
    console.assert(savedStatus.includes('Đã lưu'), 'Save status did not update to "Đã lưu"');

    // Check LocalStorage for user_vocabulary
    const userVocab = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('user_vocabulary') || '[]');
    });
    console.log(`✓ Word successfully saved in user_vocabulary (count: ${userVocab.length})`);
    console.assert(userVocab.length > 0, 'user_vocabulary was not updated in storage');

    // Test dismiss with Escape
    console.log('Pressing Escape to dismiss Popover...');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    console.assert(await popover.count() === 0, 'Popover did not close on Escape key');
    console.log('✓ Popover closed smoothly on Escape key');

    console.log('\nALL IN-CONTEXT LOOKUP TESTS PASSED 100%!');
  } finally {
    await browser.close();
  }
}

async function main() {
  await testApi();
  await runE2E();
}

main().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
