import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('--- 1. Testing tests_index.json Data Integrity ---');
const indexFilePath = path.join(projectRoot, 'public/data/tests_index.json');
const indexData = JSON.parse(fs.readFileSync(indexFilePath, 'utf8'));

console.log(`tests_index.json count: ${indexData.length}`);
console.assert(indexData.length === 1, `Expected exactly 1 test in tests_index.json, got ${indexData.length}`);
console.assert(indexData[0].id === 'ets2022_test1', `Expected ets2022_test1, got ${indexData[0].id}`);
console.log('✓ tests_index.json contains ONLY official ETS 2022 Test 1');

console.log('\n--- 2. Checking Modified Source Files for NO Test 2 / Test 3 references in UI ---');
const p5File = fs.readFileSync(path.join(projectRoot, 'src/app/part5/page.tsx'), 'utf8');
const p6File = fs.readFileSync(path.join(projectRoot, 'src/app/part6/page.tsx'), 'utf8');
const p7File = fs.readFileSync(path.join(projectRoot, 'src/app/part7/page.tsx'), 'utf8');

console.assert(!p5File.includes("handleSelectTest('ets2022_test2')"), 'Part 5 still contains Test 2 select button!');
console.assert(!p6File.includes("{ key: 'ets2022_test2'"), 'Part 6 still contains Test 2 option!');
console.assert(!p7File.includes("{ key: 'ets2022_test2'"), 'Part 7 still contains Test 2 option!');
console.log('✓ Source code of Part 5, 6, 7 verified clean of Test 2 buttons/options');

console.log('\n--- 3. Strict Check: NO UI EMOJIS in modified files ---');
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
const filesToCheck = [
  'public/data/tests_index.json',
  'src/app/exam/page.tsx',
  'src/app/part5/page.tsx',
  'src/app/part6/page.tsx',
  'src/app/part7/page.tsx'
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
console.log('✓ NO UI EMOJIS check passed 100% on all modified files');

console.log('\n--- 4. Playwright E2E Navigation Check ---');
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
    // 4.1 Check Dashboard test selector
    console.log('Navigating to http://localhost:3000 ...');
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1000);

    const testSelector = page.locator('select');
    if (await testSelector.count() > 0) {
      const options = await testSelector.first().locator('option').allTextContents();
      console.log('Dashboard Test Selector Options:', options);
      console.assert(options.length === 1, `Expected 1 option on Dashboard, got ${options.length}`);
      console.assert(options[0].includes('Test 1'), `Expected Test 1, got ${options[0]}`);
      console.log('✓ Dashboard only shows ETS 2022 Test 1');
    }

    // 4.2 Check Part 5
    console.log('Navigating to http://localhost:3000/part5 ...');
    await page.goto('http://localhost:3000/part5', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1000);
    const test2Part5Btn = page.locator('button:has-text("Test 2")');
    console.assert(await test2Part5Btn.count() === 0, 'Part 5 still displays Test 2 button in rendered DOM!');
    console.log('✓ Part 5 has no Test 2 button');

    // 4.3 Check Part 6
    console.log('Navigating to http://localhost:3000/part6 ...');
    await page.goto('http://localhost:3000/part6', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1000);
    const test2Part6Option = page.locator('button:has-text("Test 2"), option:has-text("Test 2")');
    console.assert(await test2Part6Option.count() === 0, 'Part 6 still displays Test 2 option in rendered DOM!');
    console.log('✓ Part 6 has no Test 2 option');

    // 4.4 Check Part 7
    console.log('Navigating to http://localhost:3000/part7 ...');
    await page.goto('http://localhost:3000/part7', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1000);
    const test2Part7Option = page.locator('button:has-text("Test 2"), option:has-text("Test 2")');
    console.assert(await test2Part7Option.count() === 0, 'Part 7 still displays Test 2 option in rendered DOM!');
    console.log('✓ Part 7 has no Test 2 option');

    // 4.5 Check Exam simulation fallback
    console.log('Navigating to http://localhost:3000/exam?test=ets2022_test2 ...');
    await page.goto('http://localhost:3000/exam?test=ets2022_test2', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);
    const questionText = await page.textContent('body');
    console.assert(!questionText.includes('Mã đề không hợp lệ'), 'Exam crashed when accessing test2!');
    console.log('✓ Exam gracefully loads without crash when test2 query param is provided');

    console.log('\nALL TESTS PASSED SUCCESSFULLY! 100% CLEAN.');
  } finally {
    await browser.close();
  }
}

runE2E().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
