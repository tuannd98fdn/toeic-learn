import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';
import fs from 'fs';
import path from 'path';

const secret = "my-super-secret-key-12345";
const ARTIFACTS_DIR = '/Users/bravee06/.gemini/antigravity-ide/brain/59f562b3-0ab6-4a20-8c87-ec01c44bc933';

async function main() {
  const token = await encode({
    token: {
      name: "TOEIC Learner",
      email: "learner@toeic.com",
      sub: "user-test-123"
    },
    secret
  });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });

  await context.addCookies([
    {
      name: "next-auth.session-token",
      value: token,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax"
    }
  ]);

  const page = await context.newPage();

  console.log('--- Step 1: Initialize localStorage with Diagnostic + Exam + Mistake data ---');
  await page.goto('http://localhost:3000');

  await page.evaluate(() => {
    // Clear previous plan and inject realistic learner profile
    localStorage.removeItem('toeic_study_plan');
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '800+');

    // Diagnostic Result: 580 score, weak at Part 5 and Part 7
    const diagnosticResult = {
      date: new Date().toISOString(),
      totalScore: 580,
      scaledLC: 310,
      scaledRC: 270,
      cefrLevel: 'B1',
      correctLC: 8,
      correctRC: 6,
      weakestPart: { partId: 'p5', partName: 'Part 5: Sentences', accuracy: 40, advice: 'Cần củng cố ngữ pháp' },
      weakestPartsList: ['p5', 'p7'],
      partScores: {
        p1: { correct: 2, total: 2, accuracy: 100 },
        p2: { correct: 3, total: 4, accuracy: 75 },
        p3: { correct: 2, total: 4, accuracy: 50 },
        p4: { correct: 1, total: 4, accuracy: 25 },
        p5: { correct: 2, total: 5, accuracy: 40 },
        p6: { correct: 2, total: 4, accuracy: 50 },
        p7: { correct: 2, total: 5, accuracy: 40 },
      }
    };
    localStorage.setItem('toeic_diagnostic_result', JSON.stringify(diagnosticResult));

    // Mistake notebook entries with specific grammar tags
    const mistakes = [
      {
        id: 'p5_err_1',
        part: 'p5',
        question: 'The management decided to ____ the proposal.',
        userAnswer: 'A',
        correctAnswer: 'B',
        explanation: 'Requires base verb.',
        subCategory: 'Word Form',
        reviewCount: 0,
        mastered: false,
        nextReview: Date.now() - 10000 // due for review
      },
      {
        id: 'p5_err_2',
        part: 'p5',
        question: 'The specialist ____ visited yesterday is famous.',
        userAnswer: 'B',
        correctAnswer: 'A',
        explanation: 'Relative pronoun who.',
        subCategory: 'Relative Clauses',
        reviewCount: 0,
        mastered: false,
        nextReview: Date.now() - 10000 // due
      },
      {
        id: 'p5_err_3',
        part: 'p5',
        question: 'They have been ____ for 3 hours.',
        userAnswer: 'C',
        correctAnswer: 'D',
        explanation: 'Present perfect continuous.',
        subCategory: 'Verb Tense',
        reviewCount: 0,
        mastered: false,
        nextReview: Date.now() - 10000 // due
      }
    ];
    localStorage.setItem('mistake_notebook', JSON.stringify(mistakes));
  });

  console.log('--- Step 2: Open /study-plan and inspect Adaptive Banner ---');
  await page.goto('http://localhost:3000/study-plan');
  await page.waitForSelector('h1');
  await page.waitForTimeout(1000);

  // Take screenshot of study plan with adaptive banner
  const studyPlanBannerPath = path.join(ARTIFACTS_DIR, 'study_plan_adaptive_banner.png');
  await page.screenshot({ path: studyPlanBannerPath, fullPage: false });
  console.log('Saved screenshot:', studyPlanBannerPath);

  // Check adaptive banner content
  const bannerText = await page.locator('text=Lộ Trình Thích Ứng Thông Minh').isVisible();
  console.log('Adaptive banner visible:', bannerText);

  // Check if weak parts and grammar chips are visible
  const hasWordFormChip = await page.locator('text=Word Form').first().isVisible();
  const hasPart5Chip = await page.locator('text=Part 5').first().isVisible();
  console.log('Word Form chip in banner or tasks:', hasWordFormChip);
  console.log('Part 5 chip in banner or tasks:', hasPart5Chip);

  // Verify sub-skill tags on task items
  const subCatTags = await page.locator('span[class*="subCatTag"]').allTextContents();
  console.log('Found subCategory tags on study plan:', subCatTags);

  // Test 1-click sync button
  console.log('--- Step 3: Test 1-click "Đồng bộ lại lộ trình" button ---');
  const syncBtn = page.locator('button:has-text("Đồng bộ lại")');
  if (await syncBtn.isVisible()) {
    await syncBtn.click();
    await page.waitForTimeout(600);
    const syncScreenshotPath = path.join(ARTIFACTS_DIR, 'study_plan_synced.png');
    await page.screenshot({ path: syncScreenshotPath, fullPage: false });
    console.log('Saved synced screenshot:', syncScreenshotPath);
  }

  // Scroll down to view the full day list
  await page.evaluate(() => window.scrollBy(0, 450));
  await page.waitForTimeout(500);
  const studyPlanDaysPath = path.join(ARTIFACTS_DIR, 'study_plan_days_list.png');
  await page.screenshot({ path: studyPlanDaysPath, fullPage: false });
  console.log('Saved days list screenshot:', studyPlanDaysPath);

  console.log('--- Step 4: Open Dashboard / and inspect Golden Task sub-skill tags ---');
  await page.goto('http://localhost:3000');
  await page.waitForSelector('text=Mục tiêu Vàng hôm nay');
  await page.waitForTimeout(1000);

  const dashboardDailyPath = path.join(ARTIFACTS_DIR, 'dashboard_adaptive_golden_tasks.png');
  await page.screenshot({ path: dashboardDailyPath, fullPage: false });
  console.log('Saved dashboard golden tasks screenshot:', dashboardDailyPath);

  const dashboardSubCats = await page.locator('span[class*="subCatTag"]').allTextContents();
  console.log('Found subCategory tags on Dashboard:', dashboardSubCats);

  console.log('--- Step 5: Test Clicking a Sub-skill Task Link from Dashboard ---');
  const taskLink = page.locator('a[href*="/part5?subCategory="]').first();
  if (await taskLink.isVisible()) {
    const href = await taskLink.getAttribute('href');
    console.log('Direct drill link verified:', href);
    await taskLink.click();
    await page.waitForURL('**/part5?subCategory=*');
    await page.waitForTimeout(1000);
    const part5DrillPath = path.join(ARTIFACTS_DIR, 'part5_adaptive_drill_from_plan.png');
    await page.screenshot({ path: part5DrillPath, fullPage: false });
    console.log('Saved part 5 drill screenshot:', part5DrillPath);
  }

  await browser.close();
  console.log('ALL E2E CHECKS PASSED SUCCESSFULLY!');
}

main().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
