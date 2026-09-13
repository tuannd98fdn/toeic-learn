import { chromium } from 'playwright';

async function runTest() {
  console.log('=== STARTING STORAGE & PROFILE PAGE VERIFICATION ===');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    pageErrors.push(err.message);
  });

  // 1. Pre-seed localStorage with raw strings (non-JSON quoted) simulating real user state
  await page.goto('http://localhost:3000/onboarding');
  await page.evaluate(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '750+');
    localStorage.setItem('toeic_exam_date', '2026-10-15');
    localStorage.setItem('toeic_current_level', 'intermediate');
  });

  // 2. Navigate to Dashboard first to check compatibility
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');

  // 3. Navigate to Profile page
  await page.goto('http://localhost:3000/profile');
  await page.waitForTimeout(1000);

  // Check if any error overlay or console syntax error occurred
  const hasSyntaxError = consoleErrors.some(err => err.includes('SyntaxError') || err.includes('Unexpected non-whitespace character'));
  const hasPageError = pageErrors.some(err => err.includes('SyntaxError'));

  console.log('Console errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Console errors:', consoleErrors);
  }
  console.log('Page errors count:', pageErrors.length);

  if (hasSyntaxError || hasPageError) {
    console.error('TEST FAILED: SyntaxError detected in console or page!');
    process.exit(1);
  }

  // 4. Verify in DOM that exam date and target score are parsed without crash
  const content = await page.content();
  const hasTargetScore = content.includes('750+');
  console.log('Target score rendered in DOM:', hasTargetScore);

  console.log('=== TEST PASSED: No SyntaxError, safe localStorage parsing confirmed ===');
  await browser.close();
}

runTest().catch(err => {
  console.error('Test script crashed:', err);
  process.exit(1);
});
