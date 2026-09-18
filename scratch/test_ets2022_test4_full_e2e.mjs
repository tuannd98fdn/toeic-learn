import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

async function run() {
  console.log('--- 1. Validating JSON Data Integrity for Test 4 ---');
  const baseDir = 'public/data/ets2022/test4';
  const parts = ['part1.json', 'part2.json', 'part3.json', 'part4.json', 'part5.json', 'part6.json', 'part7.json'];
  
  let totalQuestions = 0;
  for (const p of parts) {
    const filePath = path.join(baseDir, p);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing ${p}`);
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    if (EMOJI_REGEX.test(raw)) {
      throw new Error(`Strict Rule Violation: Found emoji inside ${p}!`);
    }
    const data = JSON.parse(raw);
    if (p === 'part1.json') totalQuestions += data.length;
    else if (p === 'part2.json') totalQuestions += data.length;
    else if (p === 'part3.json') data.forEach(s => totalQuestions += s.questions.length);
    else if (p === 'part4.json') data.forEach(s => totalQuestions += s.questions.length);
    else if (p === 'part5.json') totalQuestions += data.length;
    else if (p === 'part6.json') data.forEach(s => totalQuestions += s.questions.length);
    else if (p === 'part7.json') data.forEach(s => totalQuestions += s.questions.length);
  }

  console.log(`Verified 7 parts. Total Questions: ${totalQuestions} (Target: 200).`);
  if (totalQuestions !== 200) {
    throw new Error(`Expected 200 questions, got ${totalQuestions}`);
  }

  console.log('--- 2. Starting Browser Playwright E2E Tests for Test 4 ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  // Test 1: Part 1 Trainer
  console.log('Testing Part 1 Trainer (?test=ets2022_test4)...');
  await page.goto('http://localhost:3000/part1?test=ets2022_test4', { waitUntil: 'networkidle' });
  await page.waitForSelector('img[alt*="TOEIC Part 1"]');
  const p1ImgSrc = await page.getAttribute('img[alt*="TOEIC Part 1"]', 'src');
  console.log('Part 1 image src:', p1ImgSrc);
  if (!p1ImgSrc || !p1ImgSrc.includes('t4_p1_01.jpg')) {
    throw new Error(`Unexpected Part 1 image: ${p1ImgSrc}`);
  }
  await page.screenshot({ path: 'scratch/part1_test4_verified.png' });

  // Test 2: Part 2 Trainer
  console.log('Testing Part 2 Trainer (?test=ets2022_test4)...');
  await page.goto('http://localhost:3000/part2?test=ets2022_test4', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Part 2: Question');
  await page.screenshot({ path: 'scratch/part2_test4_verified.png' });

  // Test 3: Part 3 Trainer
  console.log('Testing Part 3 Trainer (?test=ets2022_test4)...');
  await page.goto('http://localhost:3000/part3?test=ets2022_test4', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Part 3: Short Conversations');
  await page.screenshot({ path: 'scratch/part3_test4_verified.png' });

  // Test 4: Part 4 Trainer
  console.log('Testing Part 4 Trainer (?test=ets2022_test4)...');
  await page.goto('http://localhost:3000/part4?test=ets2022_test4', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Part 4: Short Talks');
  await page.screenshot({ path: 'scratch/part4_test4_verified.png' });

  // Test 5: Part 5 Trainer
  console.log('Testing Part 5 Trainer (?test=ets2022_test4)...');
  await page.goto('http://localhost:3000/part5?test=ets2022_test4', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Mr. Akagi was unable to buy tickets');
  const p5Content = await page.content();
  if (!p5Content.includes('Mr. Akagi was unable to buy tickets')) {
    throw new Error('Part 5 does not show authentic Test 4 question 101!');
  }
  await page.screenshot({ path: 'scratch/part5_test4_verified.png' });

  // Test 6: Part 6 Trainer
  console.log('Testing Part 6 Trainer (?test=ets2022_test4)...');
  await page.goto('http://localhost:3000/part6?test=ets2022_test4', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Gold Star Bank');
  await page.screenshot({ path: 'scratch/part6_test4_verified.png' });

  // Test 7: Part 7 Trainer
  console.log('Testing Part 7 Trainer (?test=ets2022_test4)...');
  await page.goto('http://localhost:3000/part7?test=ets2022_test4', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=STAR FITNESS CLUB');
  await page.screenshot({ path: 'scratch/part7_test4_verified.png' });

  // Test 8: Full Exam Simulation
  console.log('Testing Exam Simulation (?test=ets2022_test4)...');
  await page.goto('http://localhost:3000/exam?test=ets2022_test4', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=ETS 2022 - Test 4');
  console.log('Exam page successfully loaded ETS 2022 - Test 4 header!');
  await page.screenshot({ path: 'scratch/exam_ets2022_test4_verified.png' });

  // Test 9: RC Section Exam
  console.log('Testing RC Section Exam (?test=ets2022_test4&section=rc)...');
  await page.goto('http://localhost:3000/exam?test=ets2022_test4&section=rc', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=ETS 2022 - Test 4');
  await page.waitForSelector('text=Đọc RC 75P');
  await page.screenshot({ path: 'scratch/exam_ets2022_test4_rc_verified.png' });

  // Test 10: Verify 0 UI Emojis on Exam page
  const bodyText = await page.innerText('body');
  if (EMOJI_REGEX.test(bodyText)) {
    throw new Error('Strict Rule Violation: Found emoji in Exam UI body text!');
  }

  await browser.close();
  console.log('ALL E2E CHECKS PASSED WITH 0 ERRORS AND 0 UI EMOJIS!');
}

run().catch(err => {
  console.error('Test FAILED:', err);
  process.exit(1);
});
