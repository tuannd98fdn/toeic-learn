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
      },
      'exam_ets2022_test1_part5_q103': {
        type: 'exam',
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '103',
        wrongCount: 3,
        lastMistakeDate: new Date().toISOString(),
        box: 1,
        nextReviewDate: new Date().toISOString(),
        subCategory: 'Pronoun',
        isMastered: false
      }
    };
    localStorage.setItem('mistake_notebook', JSON.stringify(mockMistakes));
  });

  console.log('Navigating to /notebook/exam-quiz?part=all...');
  await page.goto('http://localhost:3000/notebook/exam-quiz?part=all');
  await page.waitForLoadState('networkidle');

  const getQInfo = async () => {
    return await page.evaluate(() => {
      const qText = document.querySelector('h2')?.textContent || '';
      const footerVisible = !!document.querySelector('div[class*="footerVisible"]');
      const footerText = document.querySelector('div[class*="footerVisible"]')?.textContent || '';
      const explanation = document.querySelector('div[class*="explanationCard"]')?.textContent || '';
      const progress = document.querySelector('header span:last-child')?.textContent || '';
      const buttons = Array.from(document.querySelectorAll('button[class*="optionBtn"]')).map(b => ({
        text: b.textContent,
        className: b.className,
        disabled: b.disabled
      }));
      return { qText, footerVisible, footerText, explanation, progress, buttons };
    });
  };

  console.log('Step 0 (Initial):', await getQInfo());

  console.log('Clicking option A...');
  await page.locator('button[class*="optionBtn"]').first().click();
  await page.waitForTimeout(500);

  console.log('Step 1 (After Click A):', await getQInfo());

  // Check if PracticeFooter "Tiếp tục" button exists and click it
  const nextBtn = page.locator('div[class*="footerVisible"] button:has-text("Tiếp tục")');
  if (await nextBtn.count() > 0) {
    console.log('Clicking Tiếp tục button in footer...');
    await nextBtn.click();
    await page.waitForTimeout(500);
    console.log('Step 2 (After Next):', await getQInfo());
  } else {
    console.log('No next button found!');
  }

  console.log('Console logs:');
  consoleLogs.forEach(l => console.log(l));

  await browser.close();
}

run().catch(console.error);
