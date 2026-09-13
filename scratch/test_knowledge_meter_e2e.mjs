import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
  });
  const page = await context.newPage();

  console.log('--- Step 1: Initialize user data on Dashboard ---');
  await page.goto('http://localhost:3000/onboarding');
  await page.evaluate(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '750+');

    // Exam history: Score 620
    const examHistory = [
      {
        id: 'exam-1',
        totalScore: 620,
        listeningScore: 330,
        readingScore: 290,
        partScores: {
          p1: { accuracy: 80 },
          p2: { accuracy: 75 },
          p3: { accuracy: 70 },
          p4: { accuracy: 65 },
          p5: { accuracy: 55 },
          p6: { accuracy: 60 },
          p7: { accuracy: 58 },
        },
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem('toeic_exam_history', JSON.stringify(examHistory));

    // Mastered 180 words in Box 5
    const mockLeitner = {};
    for (let i = 1; i <= 180; i++) {
      mockLeitner[`w_${i}`] = { box: 5, lastReview: '', nextReview: '' };
    }
    localStorage.setItem('leitner_progress', JSON.stringify(mockLeitner));
  });

  console.log('--- Step 2: Navigate to Dashboard (/) ---');
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');

  // Verify elements in PredictiveScoreMeter
  const headerLocator = page.locator('h3:has-text("Đo lường năng lực")');
  await headerLocator.waitFor({ state: 'visible', timeout: 10000 });
  const headerText = await headerLocator.textContent();
  console.log('Meter Header found:', headerText);

  const blockLabels = await page.locator('span:has-text("ĐIỂM THI THỰC CHIẾN")').count();
  console.log('Exam Execution Block count:', blockLabels);
  if (blockLabels === 0) throw new Error('Exam Execution block not found');

  const ceilingLabels = await page.locator('span:has-text("TRẦN TRI THỨC TÍCH LŨY")').count();
  console.log('Knowledge Ceiling Block count:', ceilingLabels);
  if (ceilingLabels === 0) throw new Error('Knowledge Ceiling block not found');

  // Verify Insight Box
  const insightText = await page.locator('div[class*="insightBox"]').textContent();
  console.log('Insight Box content:', insightText?.slice(0, 100) + '...');

  // Verify 4 Pillars
  const pillarCount = await page.locator('div[class*="pillarItem"]').count();
  console.log('Pillars rendered:', pillarCount);
  if (pillarCount !== 4) throw new Error(`Expected 4 pillars, got ${pillarCount}`);

  // Verify Smart Action Feed presence
  const smartFeedCount = await page.locator('div[class*="feedCard"]').count();
  console.log('Smart Action Feed cards rendered:', smartFeedCount);

  // Verify NO EMOJIS in page DOM
  console.log('--- Step 3: Verify NO UI EMOJIS rule ---');
  const bodyText = await page.locator('body').innerText();
  const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  const match = bodyText.match(emojiRegex);
  if (match) {
    throw new Error(`Emoji detected in UI: ${match[0]}`);
  }
  console.log('Zero Emoji Check: PASSED (0 emojis detected in DOM)');

  // Mobile Viewport Check
  console.log('--- Step 4: Mobile Responsive Check (390px) ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  const cardVisible = await page.locator('h3:has-text("Đo lường năng lực")').isVisible();
  if (!cardVisible) throw new Error('Meter header not visible on mobile');
  console.log('Mobile Check: PASSED');

  console.log('ALL PLAYWRIGHT E2E CHECKS PASSED!');
  await browser.close();
}

run().catch((err) => {
  console.error('Playwright E2E Failed:', err);
  process.exit(1);
});
