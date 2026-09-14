import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  const page = await context.newPage();

  await page.goto('http://localhost:3000');
  await page.evaluate(() => {
    // 5 real Part 5 questions from ets2022_test1
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
      },
      'exam_ets2022_test1_part5_62b694aebbc57b27fe10f7e8': {
        type: 'exam',
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '62b694aebbc57b27fe10f7e8',
        wrongCount: 1,
        lastMistakeDate: new Date().toISOString(),
        box: 1,
        nextReviewDate: new Date().toISOString(),
        subCategory: 'Preposition & Conjunction',
        isMastered: false
      },
      'exam_ets2022_test1_part5_62b694aebbc57b27fe10f7e9': {
        type: 'exam',
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '62b694aebbc57b27fe10f7e9',
        wrongCount: 2,
        lastMistakeDate: new Date().toISOString(),
        box: 1,
        nextReviewDate: new Date().toISOString(),
        subCategory: 'Business Vocabulary',
        isMastered: false
      }
    };
    localStorage.setItem('mistake_notebook', JSON.stringify(mockMistakes));
  });

  console.log('Navigating to /notebook/exam-quiz?part=all...');
  await page.goto('http://localhost:3000/notebook/exam-quiz?part=all');
  await page.waitForTimeout(1000);

  const getSnapshot = async () => {
    return await page.evaluate(() => {
      const h2 = document.querySelector('h2')?.textContent || '';
      const selected = document.querySelector('button[class*="optionWrong"], button[class*="optionCorrect"]')?.textContent || '';
      const hasExplanation = !!document.querySelector('div[class*="explanationCard"]');
      const isLoading = !!document.querySelector('div[class*="loading"]');
      return { h2, selected, hasExplanation, isLoading };
    });
  };

  console.log('Initial state:', await getSnapshot());

  console.log('Clicking option A...');
  await page.locator('button[class*="optionBtn"]').first().click();

  // Poll state every 100ms for 2 seconds to see if questions mutate
  for (let i = 1; i <= 15; i++) {
    await page.waitForTimeout(150);
    const snap = await getSnapshot();
    console.log(`t = ${i * 150}ms:`, snap);
  }

  await browser.close();
}

run().catch(console.error);
