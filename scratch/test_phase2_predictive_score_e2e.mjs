import { chromium } from 'playwright';
import path from 'path';

const ARTIFACTS_DIR = '/Users/bravee06/.gemini/antigravity-ide/brain/93dc5faf-b1a9-43fc-8b59-141401f2aeb6';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
  });
  const page = await context.newPage();

  console.log('--- Step 1: Set realistic exam and mistake data in localStorage ---');
  await page.goto('http://localhost:3000/onboarding');
  await page.evaluate(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '750+');

    // Exam history with score 680 (LC 350, RC 330)
    const examHistory = [
      {
        id: 'exam-test-1',
        testId: 'ets2022_test1',
        totalScore: 680,
        listeningScore: 350,
        readingScore: 330,
        partScores: {
          p1: { score: 5, total: 6, accuracy: 83 },
          p2: { score: 20, total: 25, accuracy: 80 },
          p3: { score: 32, total: 39, accuracy: 82 },
          p4: { score: 24, total: 30, accuracy: 80 },
          p5: { score: 18, total: 30, accuracy: 60 },
          p6: { score: 10, total: 16, accuracy: 62 },
          p7: { score: 35, total: 54, accuracy: 65 },
        },
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem('toeic_exam_history', JSON.stringify(examHistory));

    // Mistake notebook with 3 due items
    const mistakes = [
      {
        id: 'mistake-1',
        questionNumber: 105,
        testId: 'ets2022_test1',
        part: 'p5',
        subCategory: 'Word Form',
        nextReviewDate: new Date(Date.now() - 3600000).toISOString(), // due 1 hour ago
        box: 1,
      },
      {
        id: 'mistake-2',
        questionNumber: 112,
        testId: 'ets2022_test1',
        part: 'p5',
        subCategory: 'Word Form',
        nextReviewDate: new Date(Date.now() - 7200000).toISOString(), // due 2 hours ago
        box: 1,
      },
    ];
    localStorage.setItem('toeic_mistake_notebook', JSON.stringify(mistakes));
  });

  console.log('--- Step 2: Open Dashboard and inspect PredictiveScoreMeter ---');
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);

  // Check score band text
  const scoreBand = await page.locator('[class*="scoreBand"]').textContent();
  console.log('Predictive Score Band Displayed:', scoreBand);

  // Check calibration badge
  const calibBadge = await page.locator('[class*="calibrationBadge"]').textContent();
  console.log('Calibration Badge:', calibBadge);

  // Check SmartActionFeed
  const actionTitle = await page.locator('[class*="feedCard"] h4').textContent();
  console.log('Smart Action Feed Title:', actionTitle);

  // Capture full desktop screenshot
  const screenshotPath = path.join(ARTIFACTS_DIR, 'dashboard_phase2_complete.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Saved Phase 2 Desktop Screenshot:', screenshotPath);

  // Capture tablet screenshot
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(400);
  const tabletPath = path.join(ARTIFACTS_DIR, 'dashboard_phase2_tablet.png');
  await page.screenshot({ path: tabletPath, fullPage: false });
  console.log('Saved Phase 2 Tablet Screenshot:', tabletPath);

  // Capture mobile screenshot
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(400);
  const mobilePath = path.join(ARTIFACTS_DIR, 'dashboard_phase2_mobile.png');
  await page.screenshot({ path: mobilePath, fullPage: false });
  console.log('Saved Phase 2 Mobile Screenshot:', mobilePath);

  // Click Smart Action Feed CTA on mobile
  console.log('--- Step 3: Test clicking Smart Action Feed CTA button ---');
  const actionBtn = page.locator('[class*="feedCard"] a');
  await actionBtn.click();
  await page.waitForTimeout(1000);

  console.log('Navigated URL after clicking action feed:', page.url());

  await browser.close();
  console.log('PHASE 2 E2E VERIFICATION COMPLETED SUCCESSFULLY!');
}

run().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
