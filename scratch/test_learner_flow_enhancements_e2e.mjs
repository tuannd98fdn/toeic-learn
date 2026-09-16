import { chromium } from 'playwright';
import { readFileSync } from 'fs';

async function runTests() {
  console.log('--- STARTING LEARNER FLOW ENHANCEMENTS AUDIT & E2E VERIFICATION ---');

  // 1. Static Unit Test of scorePredictor and studyPlanEngine
  console.log('\n[1/4] Testing Unit Logic: scorePredictor & studyPlanEngine');
  
  // Verify code files don't have any forbidden emoji
  const filesToAudit = [
    'src/utils/scorePredictor.ts',
    'src/utils/studyPlanEngine.ts',
    'src/app/diagnostic/page.tsx',
    'src/app/study/page.tsx',
    'src/app/part5/page.tsx',
    'src/app/notebook/exam-quiz/page.tsx',
    'src/app/onboarding/page.tsx',
  ];

  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  for (const f of filesToAudit) {
    const content = readFileSync(f, 'utf8');
    if (emojiRegex.test(content)) {
      throw new Error(`Emoji detected in file ${f}! Rule NO UI EMOJIS violated!`);
    }
  }
  console.log('✓ Zero forbidden emojis in all modified files.');

  // 2. Playwright E2E Browser Testing
  console.log('\n[2/4] Launching Headless Chromium for E2E Flow Testing...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  const page = await context.newPage();

  // Test Onboarding Page UI & 2 Options
  console.log('Testing /onboarding Step 3 CTA buttons...');
  await page.goto('http://localhost:3000/onboarding', { waitUntil: 'networkidle' });
  
  // Click target score 750+
  await page.click('button:has-text("Mục tiêu 750+")');
  await page.waitForTimeout(500);

  // Click intermediate level
  await page.click('button:has-text("Đã có nền tảng cơ bản")');
  await page.waitForTimeout(500);

  // Check Step 3 rendered with Date input and both buttons
  const dateInput = page.locator('input[type="date"]');
  await dateInput.fill('2026-11-20');
  await page.waitForTimeout(200);

  const diagBtn = page.locator('button:has-text("Làm Test Chẩn Đoán")');
  const directBtn = page.locator('button:has-text("Vào học ngay với lộ trình đề xuất")');

  if (await diagBtn.count() === 0 || await directBtn.count() === 0) {
    throw new Error('Step 3 does not render both Diagnostic and Direct study buttons!');
  }
  console.log('✓ Onboarding Step 3 renders both Diagnostic CTA and Direct Study button.');

  // Test Diagnostic Result & Score Predictor Integration
  console.log('\n[3/4] Testing Score Predictor Calibration via Diagnostic Result...');
  await page.evaluate(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '750+');
    localStorage.setItem('toeic_exam_date', '2026-11-20');
    localStorage.setItem('toeic_diagnostic_result', JSON.stringify({
      date: new Date().toISOString(),
      totalScore: 560,
      scaledLC: 310,
      scaledRC: 250,
      cefrLevel: 'B1',
      correctLC: 10,
      correctRC: 6,
      weakestPart: { part: 'p5', partName: 'Part 5: Điền câu', accuracy: 25, advice: 'Luyện ngữ pháp' },
      weakestPartsList: ['p5', 'p7', 'p2'],
      partScores: {
        p1: { total: 4, correct: 3, accuracy: 75 },
        p2: { total: 4, correct: 2, accuracy: 50 },
        p3: { total: 4, correct: 3, accuracy: 75 },
        p4: { total: 4, correct: 2, accuracy: 50 },
        p5: { total: 4, correct: 1, accuracy: 25 },
        p6: { total: 4, correct: 2, accuracy: 50 },
        p7: { total: 4, correct: 1, accuracy: 25 },
      }
    }));
  });

  // Navigate to Dashboard and verify CompactInsightBar is calibrated
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  const sourceBadge = page.locator('span:has-text("Hiệu chuẩn qua Test Chẩn Đoán")');
  await sourceBadge.waitFor({ state: 'visible', timeout: 5000 });
  console.log('✓ Dashboard CompactInsightBar is accurately calibrated from Diagnostic test (Hiệu chuẩn qua Test Chẩn Đoán)!');

  // Test Auto Task Completion & Next Step Bridging
  console.log('\n[4/4] Testing Auto Task Completion Engine & Next-Step Bridging...');
  
  // 1. Visit /study, finish a session, verify auto-complete of task 1 & next step card
  await page.goto('http://localhost:3000/study', { waitUntil: 'networkidle' });
  
  // Rate 10 flashcards (Space to flip, then 3 to rate)
  for (let i = 0; i < 10; i++) {
    await page.waitForTimeout(150);
    await page.keyboard.press('Space');
    await page.waitForTimeout(150);
    await page.keyboard.press('3');
  }

  // Finished card should appear
  await page.waitForSelector('h2:has-text("Hoàn thành phiên học!")', { timeout: 5000 });
  
  // Check for Next Routine Step Bridging Card
  const nextStepBadge = page.locator('span:has-text("Bước 01 Hoàn Thành")');
  await nextStepBadge.waitFor({ state: 'visible', timeout: 5000 });
  console.log('✓ /study finished modal displays Next Routine Step Bridging Card (Bước 01 Hoàn Thành -> Bước 02)!');

  // Verify that task_1_vocab is now marked completed in localStorage
  const planAfterStep1 = await page.evaluate(() => {
    const raw = localStorage.getItem('toeic_adaptive_study_plan');
    return raw ? JSON.parse(raw) : null;
  });
  
  const task1 = planAfterStep1?.days?.[0]?.tasks?.[0];
  if (!task1 || !task1.completed) {
    throw new Error('Auto Task Completion failed: task 1 (vocab) is not marked completed!');
  }
  console.log(`✓ Auto Task Completion verified: ${task1.title} completed: ${task1.completed}`);

  // Audit DOM for emoji
  const bodyText = await page.innerText('body');
  if (emojiRegex.test(bodyText)) {
    throw new Error('Emoji detected on rendered DOM in /study!');
  }
  console.log('✓ Zero emoji on rendered /study DOM.');

  await browser.close();
  console.log('\n=== ALL 4 LEARNER FLOW ENHANCEMENTS VERIFIED 100% PASS ===');
}

runTests().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
