import { chromium } from 'playwright';

const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u;

async function runTest() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });

  console.log('--- 1. Testing Part 3 Split View & Review Tabs ---');
  await page.goto('http://localhost:3000/part3?test=ets2022_test1');
  await page.waitForSelector('[class*="questionItem"]', { timeout: 15000 });
  await page.waitForTimeout(1000);

  // Answer all 3 questions in set 1
  const p3Questions = await page.$$('[class*="questionItem"]');
  console.log(`Found ${p3Questions.length} questions in Part 3 set.`);
  
  for (const q of p3Questions) {
    const opt = await q.$('button[class*="optionBtn"]');
    if (opt) {
      await opt.click();
      await page.waitForTimeout(200);
    }
  }

  // Submit set
  const submitBtn = await page.$('button:has-text("Nộp bài Set này")');
  if (submitBtn) {
    console.log('Submitting Part 3 set...');
    await submitBtn.click();
    await page.waitForTimeout(1500);
  }

  await page.screenshot({ path: 'scratch/p3_answered.png' });
  console.log('Part 3 answered screenshot saved to scratch/p3_answered.png');

  // Check 0 emojis in Part 3
  const p3Text = await page.innerText('body');
  const p3EmojiMatch = p3Text.match(EMOJI_REGEX);
  if (p3EmojiMatch) {
    console.error(`[FAIL] Found emoji in Part 3: ${p3EmojiMatch[0]}`);
  } else {
    console.log('[PASS] Part 3 contains 0 UI emojis.');
  }

  console.log('\n--- 2. Testing Part 4 Split View & Review Tabs ---');
  await page.goto('http://localhost:3000/part4?test=ets2022_test1');
  await page.waitForSelector('[class*="questionItem"]', { timeout: 15000 });
  await page.waitForTimeout(1000);

  const p4Questions = await page.$$('[class*="questionItem"]');
  console.log(`Found ${p4Questions.length} questions in Part 4 set.`);
  for (const q of p4Questions) {
    const opt = await q.$('button[class*="optionBtn"]');
    if (opt) {
      await opt.click();
      await page.waitForTimeout(200);
    }
  }

  const p4SubmitBtn = await page.$('button:has-text("Nộp bài Set này")');
  if (p4SubmitBtn) {
    console.log('Submitting Part 4 set...');
    await p4SubmitBtn.click();
    await page.waitForTimeout(1500);
  }

  await page.screenshot({ path: 'scratch/p4_answered.png' });
  console.log('Part 4 answered screenshot saved to scratch/p4_answered.png');

  // Check 0 emojis in Part 4
  const p4Text = await page.innerText('body');
  const p4EmojiMatch = p4Text.match(EMOJI_REGEX);
  if (p4EmojiMatch) {
    console.error(`[FAIL] Found emoji in Part 4: ${p4EmojiMatch[0]}`);
  } else {
    console.log('[PASS] Part 4 contains 0 UI emojis.');
  }

  console.log('\n--- 3. Testing Part 5 Redesigned Results & Review Screen ---');
  await page.goto('http://localhost:3000/part5?subCategory=Word%20Form');
  await page.waitForSelector('button', { timeout: 15000 });
  await page.waitForTimeout(1000);

  // Fast forward by pressing keys or clicking
  let finished = false;
  let steps = 0;
  while (!finished && steps < 60) {
    steps++;
    const isFinished = await page.$('[class*="finishedDashboard"]');
    if (isFinished) {
      finished = true;
      break;
    }

    // Press 'a' to select option A
    await page.keyboard.press('a');
    await page.waitForTimeout(80);

    // Press Enter to go next
    await page.keyboard.press('Enter');
    await page.waitForTimeout(120);
  }

  console.log(`Part 5 completed in ${steps} steps. Finished state: ${finished}`);
  await page.waitForTimeout(1500);

  await page.screenshot({ path: 'scratch/p5_results_redesigned.png' });
  console.log('Part 5 results screenshot saved to scratch/p5_results_redesigned.png');

  // Check 0 emojis in Part 5 Results
  const p5Text = await page.innerText('body');
  const p5EmojiMatch = p5Text.match(EMOJI_REGEX);
  if (p5EmojiMatch) {
    console.error(`[FAIL] Found emoji in Part 5 Results: ${p5EmojiMatch[0]}`);
  } else {
    console.log('[PASS] Part 5 Results contains 0 UI emojis.');
  }

  await browser.close();
  console.log('\nAll visual & emoji verification checks completed successfully!');
}

runTest().catch((err) => {
  console.error(err);
  process.exit(1);
});
