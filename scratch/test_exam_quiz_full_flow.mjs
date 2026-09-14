import { chromium } from 'playwright';

async function runTests() {
  console.log('🧪 Starting comprehensive verification of /notebook/exam-quiz?part=all...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => consoleErrors.push(err.toString()));

  // Seed 3 mistakes
  await page.goto('http://localhost:3000');
  await page.evaluate(() => {
    const mockMistakes = {
      'exam_ets2022_test1_part5_62b694aebbc57b27fe10f7e4': {
        type: 'exam',
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '62b694aebbc57b27fe10f7e4',
        wrongCount: 2,
        lastMistakeDate: new Date().toISOString(),
        box: 1,
        nextReviewDate: new Date().toISOString(),
        subCategory: 'Pronoun',
        isMastered: false
      },
      'exam_ets2022_test1_part5_62b694aebbc57b27fe10f7e5': {
        type: 'exam',
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '62b694aebbc57b27fe10f7e5',
        wrongCount: 1,
        lastMistakeDate: new Date().toISOString(),
        box: 1,
        nextReviewDate: new Date().toISOString(),
        subCategory: 'Verb Tense',
        isMastered: false
      },
      'exam_ets2022_test1_part5_62b694aebbc57b27fe10f7e6': {
        type: 'exam',
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '62b694aebbc57b27fe10f7e6',
        wrongCount: 3,
        lastMistakeDate: new Date().toISOString(),
        box: 1,
        nextReviewDate: new Date().toISOString(),
        subCategory: 'Word Form',
        isMastered: false
      }
    };
    localStorage.setItem('mistake_notebook', JSON.stringify(mockMistakes));
  });

  // Step 1: Open /notebook/exam-quiz?part=all
  console.log('Navigating to /notebook/exam-quiz?part=all...');
  await page.goto('http://localhost:3000/notebook/exam-quiz?part=all');
  await page.waitForTimeout(1000);

  // Check header
  const headerText = await page.locator('header').textContent();
  console.log('Header text:', headerText?.replace(/\s+/g, ' ').trim());
  if (!headerText?.includes('Câu 1 / 3')) {
    throw new Error(`Expected 'Câu 1 / 3' in header, got: ${headerText}`);
  }

  const q1Text = await page.locator('h2').textContent();
  console.log('Q1 Question:', q1Text?.trim());

  // Step 2: Answer Question 1
  console.log('Answering Question 1 (Clicking option B)...');
  await page.locator('button[class*="optionBtn"]:has-text("B")').first().click();
  await page.waitForTimeout(600);

  // Verify Question 1 has NOT jumped or changed
  const q1TextAfterAnswer = await page.locator('h2').textContent();
  if (q1TextAfterAnswer !== q1Text) {
    throw new Error(`BUG REPRODUCED: Question changed immediately after answer! Before: "${q1Text}", After: "${q1TextAfterAnswer}"`);
  }
  console.log('✅ Question 1 remained stable on screen after answering.');

  // Verify explanation is visible
  const hasExplanation = await page.locator('div[class*="explanationCard"]').isVisible();
  if (!hasExplanation) {
    throw new Error('Explanation card is not visible after answer.');
  }
  console.log('✅ Explanation card is displayed properly.');

  // Verify PracticeFooter is visible with "Tiếp tục"
  const footerVisible = await page.locator('div[class*="footerVisible"]').isVisible();
  if (!footerVisible) {
    throw new Error('PracticeFooter is not visible.');
  }
  console.log('✅ PracticeFooter is visible with action button.');

  // Step 3: Advance to Question 2 using "Tiếp tục" button
  console.log('Clicking "Tiếp tục" button...');
  await page.locator('div[class*="footerVisible"] button:has-text("Tiếp tục")').click();
  await page.waitForTimeout(600);

  const q2Text = await page.locator('h2').textContent();
  console.log('Q2 Question:', q2Text?.trim());
  if (q2Text === q1Text) {
    throw new Error('Question did not advance after clicking "Tiếp tục"');
  }

  // Verify Question 2 is un-answered initially
  const q2HasExplanation = await page.locator('div[class*="explanationCard"]').isVisible();
  if (q2HasExplanation) {
    throw new Error('Q2 should not show explanation before answering.');
  }
  console.log('✅ Q2 loaded in clean un-answered state.');

  // Step 4: Answer Question 2 and use Keyboard shortcut (Enter / Space) to advance
  console.log('Answering Question 2 via keyboard shortcut "A"...');
  await page.keyboard.press('A');
  await page.waitForTimeout(600);

  const q2TextAfterAnswer = await page.locator('h2').textContent();
  if (q2TextAfterAnswer !== q2Text) {
    throw new Error('Q2 changed unexpectedly on answer!');
  }
  console.log('✅ Question 2 remained stable after keyboard answer.');

  console.log('Pressing Enter to advance to Question 3...');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(600);

  const q3Text = await page.locator('h2').textContent();
  console.log('Q3 Question:', q3Text?.trim());

  // Step 5: Answer Question 3 and finish
  console.log('Answering Question 3...');
  await page.locator('button[class*="optionBtn"]').first().click();
  await page.waitForTimeout(600);

  console.log('Clicking "Xem kết quả" in footer...');
  await page.locator('div[class*="footerVisible"] button:has-text("Xem kết quả")').click();
  await page.waitForTimeout(600);

  // Verify finished screen
  const isFinishedVisible = await page.locator('div[class*="finishedCard"]').isVisible();
  if (!isFinishedVisible) {
    throw new Error('Finished card is not visible.');
  }
  console.log('✅ Results card is displayed properly.');

  // Step 6: Test "Luyện tập lại lượt mới" button
  console.log('Testing "Luyện tập lại lượt mới" button...');
  await page.locator('button:has-text("Luyện tập lại lượt mới")').click();
  await page.waitForTimeout(600);

  const restartedHeaderText = await page.locator('header').textContent();
  if (!restartedHeaderText?.includes('Câu 1 /')) {
    throw new Error(`Expected restart back to Câu 1, got: ${restartedHeaderText}`);
  }
  console.log('✅ Successfully restarted new session.');

  // Step 7: Check NO UI EMOJIS
  console.log('Auditing UI for forbidden emojis...');
  const pageText = await page.evaluate(() => document.body.innerText);
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  const emojiMatch = pageText.match(emojiRegex);
  if (emojiMatch) {
    throw new Error(`Found forbidden emoji in DOM: "${emojiMatch[0]}"`);
  }
  console.log('✅ Zero UI emojis found. STRICT compliance verified.');

  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
    throw new Error(`Encountered ${consoleErrors.length} console errors.`);
  }

  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!');
  await browser.close();
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
