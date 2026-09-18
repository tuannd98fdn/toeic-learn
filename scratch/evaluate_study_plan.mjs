import { chromium } from 'playwright';

async function evaluate() {
  console.log('=== EVALUATING STUDY PLAN PAGE ===');
  const browser = await chromium.launch({ headless: true });

  // 1. Evaluate Form View (No plan in localStorage)
  console.log('\n--- 1. Evaluating Form View (Empty / Create Plan) ---');
  const contextForm = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
  });

  const pageForm = await contextForm.newPage();
  const consoleErrors = [];
  pageForm.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await pageForm.goto('http://localhost:3000/study-plan', { waitUntil: 'networkidle' });
  await pageForm.waitForTimeout(1000);

  await pageForm.screenshot({ path: 'scratch/study_plan_form_light.png', fullPage: true });
  console.log('Screenshot saved: scratch/study_plan_form_light.png');

  // Test form interactions
  const titleText = await pageForm.locator('h1').innerText();
  console.log(`Form title: "${titleText}"`);

  const pills = await pageForm.locator('button').allInnerTexts();
  console.log(`Pill buttons count: ${pills.length}`);

  // Test Dark Mode on Form
  await pageForm.emulateMedia({ colorScheme: 'dark' });
  await pageForm.waitForTimeout(300);
  await pageForm.screenshot({ path: 'scratch/study_plan_form_dark.png', fullPage: true });
  console.log('Screenshot saved: scratch/study_plan_form_dark.png');

  // 2. Evaluate with Diagnostic params
  console.log('\n--- 2. Evaluating Diagnostic Inflow ---');
  await pageForm.goto('http://localhost:3000/study-plan?fromDiagnostic=true&score=520&weak=p5,p6,p7', { waitUntil: 'networkidle' });
  await pageForm.waitForTimeout(1000);
  await pageForm.screenshot({ path: 'scratch/study_plan_from_diagnostic.png', fullPage: true });
  console.log('Screenshot saved: scratch/study_plan_from_diagnostic.png');

  // 3. Evaluate Active Plan View
  console.log('\n--- 3. Evaluating Active Plan Dashboard View ---');
  const contextActive = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
  });

  const pageActive = await contextActive.newPage();
  pageActive.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  // Pre-set a sample study plan and mock data in localStorage
  await contextActive.addInitScript(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '750');
    localStorage.setItem('toeic_exam_date', '2026-10-30');
    // Also add some mistakes in mistake_notebook
    localStorage.setItem('mistake_notebook', JSON.stringify({
      "m1": { id: "m1", type: "exam", subCategory: "Word Form", wrongCount: 3, nextReviewDate: "2026-09-01T00:00:00Z" },
      "m2": { id: "m2", type: "exam", subCategory: "Verb Tense", wrongCount: 2, nextReviewDate: "2026-09-01T00:00:00Z" }
    }));
  });

  await pageActive.goto('http://localhost:3000/study-plan', { waitUntil: 'networkidle' });
  await pageActive.waitForTimeout(1000);

  // Click Generate button if form is shown to create a plan
  const generateBtn = pageActive.locator('button:has-text("Kích Hoạt Lộ Trình Thông Minh")');
  if (await generateBtn.count() > 0) {
    console.log('Generating active plan via button click...');
    await generateBtn.click();
    await pageActive.waitForTimeout(1500);
  }

  await pageActive.screenshot({ path: 'scratch/study_plan_active_light.png', fullPage: true });
  console.log('Screenshot saved: scratch/study_plan_active_light.png');

  // Test Dark Mode on Active Plan
  await pageActive.emulateMedia({ colorScheme: 'dark' });
  await pageActive.waitForTimeout(300);
  await pageActive.screenshot({ path: 'scratch/study_plan_active_dark.png', fullPage: true });
  console.log('Screenshot saved: scratch/study_plan_active_dark.png');

  // Test Mobile Viewport
  await pageActive.setViewportSize({ width: 375, height: 812 });
  await pageActive.waitForTimeout(300);
  await pageActive.screenshot({ path: 'scratch/study_plan_active_mobile.png', fullPage: true });
  console.log('Screenshot saved: scratch/study_plan_active_mobile.png');

  // Check emoji presence in DOM
  const emojiRegex = /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/u;
  const domText = await pageActive.locator('body').innerText();
  const emojisFound = domText.match(emojiRegex);
  console.log('Emojis in DOM:', emojisFound ? emojisFound : 'None (Strict 0 Emoji PASS)');

  // Test Phase Tabs switching
  await pageActive.setViewportSize({ width: 1280, height: 900 });
  const phase1Btn = pageActive.locator('button:has-text("GĐ 1")');
  if (await phase1Btn.count() > 0) {
    await phase1Btn.click();
    await pageActive.waitForTimeout(300);
    const dayCardsCount = await pageActive.locator('div[class*="dayCard"]').count();
    console.log(`Phase 1 tab day cards count: ${dayCardsCount}`);
  }

  // Check console errors
  console.log('\nConsole Errors:', consoleErrors.length > 0 ? consoleErrors : 'None');

  await browser.close();
  console.log('=== EVALUATION COMPLETE ===');
}

evaluate().catch(err => {
  console.error('Error during evaluation:', err);
  process.exit(1);
});
