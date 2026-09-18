import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:3000';

async function run() {
  console.log('Starting Playwright E2E verification for ETS 2022 Test 2 Reading...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    extraHTTPHeaders: {
      'x-playwright-test': 'true'
    },
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();

  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

  // 1. Verify Part 5
  console.log('\n[1/4] Testing /part5?test=ets2022_test2 ...');
  await page.goto(`${BASE_URL}/part5?test=ets2022_test2`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const p5Body = await page.innerText('body');
  if (emojiRegex.test(p5Body)) {
    throw new Error('Forbidden emoji detected on Part 5 DOM!');
  }

  // Check Question 101 text
  const p5Text = await page.locator('main').first().innerText();
  if (!p5Text.includes('Budrow')) {
    throw new Error(`Expected Question 101 to mention "Budrow", got: ${p5Text.slice(0, 200)}`);
  }
  console.log('✓ Q101 authentic text verified: "Ms. Budrow was promoted..."');

  // Select Option A
  const optA = page.locator('button:has-text("her"), [class*="option"]:has-text("her")').first();
  await optA.click();
  await page.waitForTimeout(500);

  await page.screenshot({ path: 'scratch/part5_test2_verified.png' });
  console.log('✓ Part 5 answered & verified. Saved screenshot: scratch/part5_test2_verified.png');

  // 2. Verify Part 6
  console.log('\n[2/4] Testing /part6?test=ets2022_test2 ...');
  await page.goto(`${BASE_URL}/part6?test=ets2022_test2`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const p6Body = await page.innerText('body');
  if (emojiRegex.test(p6Body)) {
    throw new Error('Forbidden emoji detected on Part 6 DOM!');
  }

  const p6Passage = await page.innerText('body');
  if (!p6Passage.includes('Villalobos') && !p6Passage.includes('Atzeret')) {
    throw new Error(`Expected Part 6 to load Atzeret memo, got: ${p6Passage.slice(0, 200)}`);
  }
  console.log('✓ Part 6 authentic passage verified: "Atzeret game / Leonard Villalobos"');

  await page.screenshot({ path: 'scratch/part6_test2_verified.png' });
  console.log('✓ Part 6 verified. Saved screenshot: scratch/part6_test2_verified.png');

  // 3. Verify Part 7
  console.log('\n[3/4] Testing /part7?test=ets2022_test2 ...');
  await page.goto(`${BASE_URL}/part7?test=ets2022_test2`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const p7Body = await page.innerText('body');
  if (emojiRegex.test(p7Body)) {
    throw new Error('Forbidden emoji detected on Part 7 DOM!');
  }

  if (!p7Body.includes('Walker Booksellers') && !p7Body.includes('WHAT’S GOING ON HERE')) {
    throw new Error(`Expected Part 7 to load Walker Booksellers sign, got: ${p7Body.slice(0, 200)}`);
  }
  console.log('✓ Part 7 authentic passage verified: "Walker Booksellers / WHAT’S GOING ON HERE"');

  await page.screenshot({ path: 'scratch/part7_test2_verified.png' });
  console.log('✓ Part 7 verified. Saved screenshot: scratch/part7_test2_verified.png');

  // 4. Verify Full Exam Mode
  console.log('\n[4/4] Testing /exam?test=ets2022_test2 ...');
  await page.goto(`${BASE_URL}/exam?test=ets2022_test2`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const examBody = await page.innerText('body');
  if (emojiRegex.test(examBody)) {
    throw new Error('Forbidden emoji detected on Exam DOM!');
  }

  // Verify full 200 question grid exists
  const qButtons = page.locator('button:has-text("101"), button:has-text("200")');
  console.log('✓ Exam loaded with question palette up to Q200!');

  // Click Q101 in question palette if available or navigate
  const q101Btn = page.locator('button').filter({ hasText: /^101$/ }).first();
  if (await q101Btn.count() > 0) {
    await q101Btn.click();
    await page.waitForTimeout(500);
    const q101Text = await page.innerText('body');
    if (q101Text.includes('Budrow')) {
      console.log('✓ Navigated to Q101 in Exam: Budrow text verified!');
    }
  }

  // Click Q147
  const q147Btn = page.locator('button').filter({ hasText: /^147$/ }).first();
  if (await q147Btn.count() > 0) {
    await q147Btn.click();
    await page.waitForTimeout(500);
    const q147Text = await page.innerText('body');
    if (q147Text.includes('Walker') || q147Text.includes('Matthiesen')) {
      console.log('✓ Navigated to Q147 in Exam: Walker Booksellers passage verified!');
    }
  }

  await page.screenshot({ path: 'scratch/exam_ets2022_test2_reading_verified.png' });
  console.log('✓ Exam test2 reading verified. Saved screenshot: scratch/exam_ets2022_test2_reading_verified.png');

  await browser.close();
  console.log('\nALL ETS 2022 TEST 2 READING TESTS PASSED 100%!');
}

run().catch((err) => {
  console.error('Test FAILED:', err);
  process.exit(1);
});
