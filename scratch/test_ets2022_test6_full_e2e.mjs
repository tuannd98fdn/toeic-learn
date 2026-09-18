import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

async function run() {
  console.log('--- 1. Validating JSON Data Integrity for Test 6 ---');
  const baseDir = 'public/data/ets2022/test6';
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

  console.log('--- 2. Starting Browser Playwright E2E Tests for Test 6 ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  // Test 1: Part 1 Trainer
  console.log('Testing Part 1 Trainer (?test=ets2022_test6)...');
  await page.goto('http://localhost:3000/part1?test=ets2022_test6', { waitUntil: 'networkidle' });
  await page.waitForSelector('img[alt*="TOEIC Part 1"]');
  const p1ImgSrc = await page.getAttribute('img[alt*="TOEIC Part 1"]', 'src');
  console.log('Part 1 image src:', p1ImgSrc);
  if (!p1ImgSrc || !p1ImgSrc.includes('t6_p1_01.jpg')) {
    throw new Error(`Unexpected Part 1 image: ${p1ImgSrc}`);
  }
  await page.screenshot({ path: 'scratch/part1_test6_verified.png' });

  // Test 2: Part 2 Trainer
  console.log('Testing Part 2 Trainer (?test=ets2022_test6)...');
  await page.goto('http://localhost:3000/part2?test=ets2022_test6', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Part 2: Question');
  await page.screenshot({ path: 'scratch/part2_test6_verified.png' });

  // Test 3: Part 3 Trainer
  console.log('Testing Part 3 Trainer (?test=ets2022_test6)...');
  await page.goto('http://localhost:3000/part3?test=ets2022_test6', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Part 3: Short Conversations');
  await page.screenshot({ path: 'scratch/part3_test6_verified.png' });

  // Test 4: Part 4 Trainer
  console.log('Testing Part 4 Trainer (?test=ets2022_test6)...');
  await page.goto('http://localhost:3000/part4?test=ets2022_test6', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Part 4: Short Talks');
  await page.screenshot({ path: 'scratch/part4_test6_verified.png' });

  // Test 5: Part 5 Trainer
  console.log('Testing Part 5 Trainer (?test=ets2022_test6)...');
  await page.goto('http://localhost:3000/part5?test=ets2022_test6', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Chef Daniels impresses customers');
  const p5Content = await page.content();
  if (!p5Content.includes('Chef Daniels impresses customers')) {
    throw new Error('Part 5 does not show authentic Test 6 question 101!');
  }
  await page.screenshot({ path: 'scratch/part5_test6_verified.png' });

  // Test 6: Part 6 Trainer
  console.log('Testing Part 6 Trainer (?test=ets2022_test6)...');
  await page.goto('http://localhost:3000/part6?test=ets2022_test6', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Archer Cafe');
  await page.screenshot({ path: 'scratch/part6_test6_verified.png' });

  // Test 7: Part 7 Trainer
  console.log('Testing Part 7 Trainer (?test=ets2022_test6)...');
  await page.goto('http://localhost:3000/part7?test=ets2022_test6', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Kendricks Appliances Sale');
  await page.screenshot({ path: 'scratch/part7_test6_verified.png' });

  // Test 8: Full Exam Simulation
  console.log('Testing Exam Simulation (?test=ets2022_test6)...');
  await page.goto('http://localhost:3000/exam?test=ets2022_test6', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=ETS 2022 - Test 6');
  console.log('Exam page successfully loaded ETS 2022 - Test 6 header!');
  await page.screenshot({ path: 'scratch/exam_test6_verified.png' });

  // Test 9: Strict Emoji Check in Rendered DOM
  console.log('Checking DOM text for emojis...');
  const bodyText = await page.innerText('body');
  if (EMOJI_REGEX.test(bodyText)) {
    throw new Error('Found UI Emoji inside rendered Exam DOM!');
  }

  console.log('All E2E Playwright tests passed with flying colors!');
  await browser.close();
}

run().catch((err) => {
  console.error('E2E Test Failed:', err);
  process.exit(1);
});
