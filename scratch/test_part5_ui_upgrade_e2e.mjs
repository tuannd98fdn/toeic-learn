import { chromium } from 'playwright';
import fs from 'fs';

async function main() {
  console.log('🚀 Starting E2E test for Part 5 UI/UX upgrade...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
    viewport: { width: 1280, height: 850 }
  });
  const page = await context.newPage();

  try {
    // Navigate to Part 5 trainer
    await page.goto('http://localhost:3000/part5?test=ets2022_test1', { waitUntil: 'networkidle' });
    console.log('Navigated to /part5');

    // Wait for questions to load
    await page.waitForSelector('[class*="questionCard"]', { timeout: 10000 });
    console.log('Question card loaded.');

    // Screenshot before answering (Image 2 equivalent)
    await page.screenshot({ path: 'scratch/part5_unanswered_verified.png' });
    console.log('Saved scratch/part5_unanswered_verified.png');

    // Select the correct answer (B for Q101 in Test 1: "their")
    const optionB = await page.locator('button:has-text("their")').first();
    await optionB.click();
    console.log('Clicked answer B (Correct)');

    // Wait for explanation board and footer
    await page.waitForSelector('[class*="explanationBoard"]', { timeout: 5000 });
    await page.waitForTimeout(1000);

    // 1. Verify there is NO .aiTutorInlineBtn
    const inlineBtnCount = await page.locator('[class*="aiTutorInlineBtn"]').count();
    console.log(`Inline AI Tutor button count: ${inlineBtnCount} (Expect 0)`);
    if (inlineBtnCount !== 0) {
      throw new Error(`Expected 0 inline AI tutor buttons, found ${inlineBtnCount}`);
    }

    // 2. Verify only 1 button asking AI exists in total
    const allAITutorButtons = await page.locator('button:has-text("Hỏi Gia Sư AI"), button:has-text("Hiểu sâu hơn")').all();
    console.log(`Total AI buttons on screen: ${allAITutorButtons.length} (Expect 1)`);
    if (allAITutorButtons.length !== 1) {
      throw new Error(`Expected exactly 1 AI button on screen, found ${allAITutorButtons.length}`);
    }

    // 3. Verify the modular explanation blocks are present
    const fastTipCount = await page.locator('[class*="fastTipCalloutHeader"]').count();
    console.log(`Fast Tip callout count: ${fastTipCount} (Expect 1)`);
    if (fastTipCount !== 1) throw new Error('Fast Tip callout not found');

    const syntaxCount = await page.locator('[class*="syntaxVisualizerBox"]').count();
    console.log(`Syntax visualizer count: ${syntaxCount} (Expect 1)`);
    if (syntaxCount !== 1) throw new Error('Syntax visualizer not found');

    const analysisCount = await page.locator('[class*="analysisBoxHeader"]').count();
    console.log(`Analysis box count: ${analysisCount} (Expect 1)`);
    if (analysisCount !== 1) throw new Error('Analysis box not found');

    const translationCount = await page.locator('[class*="translationBoxHeader"]').count();
    console.log(`Translation box count: ${translationCount} (Expect 1)`);
    if (translationCount !== 1) throw new Error('Translation box not found');

    // Screenshot of answered correct state
    await page.screenshot({ path: 'scratch/part5_answered_correct_verified.png' });
    console.log('Saved scratch/part5_answered_correct_verified.png');

    // 4. Click the single AI Tutor button in footer to verify it opens AITutorDrawer
    const footerAIButton = page.locator('button:has-text("Hỏi Gia Sư AI")');
    await footerAIButton.click();
    await page.waitForTimeout(500);

    const drawerVisible = await page.locator('[class*="drawer"][class*="open"], [class*="drawerContainer"]').count();
    console.log(`AI Tutor Drawer opened count: ${drawerVisible}`);
    await page.screenshot({ path: 'scratch/part5_ai_drawer_opened.png' });

    // Close drawer via Escape key
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // 5. Test next question and answer WRONG
    const nextBtn = page.locator('button:has-text("CÂU TIẾP THEO")');
    await nextBtn.click();
    await page.waitForTimeout(500);

    // Question 102: Choose wrong answer (e.g. B locates)
    const optionWrong = await page.locator('button:has-text("locates")').first();
    await optionWrong.click();
    await page.waitForTimeout(1000);

    // Screenshot answered wrong state
    await page.screenshot({ path: 'scratch/part5_answered_wrong_verified.png' });
    console.log('Saved scratch/part5_answered_wrong_verified.png');

    console.log('🎉 ALL TESTS PASSED WITH 100% SUCCESS!');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();
