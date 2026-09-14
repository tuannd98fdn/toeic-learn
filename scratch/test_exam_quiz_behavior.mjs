import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  const page = await context.newPage();

  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => consoleLogs.push(`[PAGEERROR] ${err.toString()}`));

  // Set mock mistakes in localStorage first
  await page.goto('http://localhost:3000');
  await page.evaluate(() => {
    const mockMistakes = {
      'exam_ets2022_test1_part5_q101': {
        type: 'exam',
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '101',
        wrongCount: 2,
        lastMistakeDate: new Date().toISOString(),
        box: 1,
        nextReviewDate: new Date().toISOString(),
        subCategory: 'Word Form',
        isMastered: false
      },
      'exam_ets2022_test1_part5_q102': {
        type: 'exam',
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '102',
        wrongCount: 1,
        lastMistakeDate: new Date().toISOString(),
        box: 1,
        nextReviewDate: new Date().toISOString(),
        subCategory: 'Verb Tense',
        isMastered: false
      }
    };
    localStorage.setItem('mistake_notebook', JSON.stringify(mockMistakes));
  });

  console.log('Navigating to /notebook/exam-quiz?part=all...');
  await page.goto('http://localhost:3000/notebook/exam-quiz?part=all');
  await page.waitForLoadState('networkidle');

  // Check initial question
  const initialText = await page.locator('h2').first().textContent();
  console.log('Initial question text:', initialText);

  // Click option A
  console.log('Clicking option A...');
  const optionA = page.locator('button:has-text("A")').first();
  await optionA.click();

  // Wait a moment and check question text again
  await page.waitForTimeout(1000);
  const afterAnswerText = await page.locator('h2').first().textContent();
  console.log('Question text after clicking answer:', afterAnswerText);

  console.log('Console logs:');
  consoleLogs.forEach(l => console.log(l));

  await browser.close();
}

run().catch(console.error);
