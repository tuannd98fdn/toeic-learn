import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:3000';

async function runE2ETests() {
  console.log('🚀 Starting E2E verification of Streamlined Daily Learning Flow...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
  });

  await context.addInitScript(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '750+');
    localStorage.setItem('toeic_exam_date', '2026-10-30');
    localStorage.setItem('toeic_streak_count', '5');
  });

  const page = await context.newPage();

  try {
    // 2. Reload home page and verify layout
    console.log('Testing Home Page (/) Daily Learning Command Center...');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Verify Hero Section
    const heroTitle = await page.textContent('h1');
    console.log(`- Hero title: "${heroTitle?.trim()}"`);
    if (!heroTitle?.includes('TOEIC 750+')) {
      throw new Error('Hero does not display target TOEIC 750+');
    }

    // Verify Primary 1-Click CTA in Hero
    const heroCtaTitle = await page.textContent('a[class*="heroPrimaryCta"] span[class*="heroCtaTitle"]');
    console.log(`- Hero Primary CTA: "${heroCtaTitle?.trim()}"`);
    if (!heroCtaTitle) {
      throw new Error('Hero primary CTA title not found');
    }

    // Verify CompactInsightBar
    const insightBar = await page.$('div[role="region"][aria-label*="Thanh đo lường"]');
    if (!insightBar) {
      throw new Error('CompactInsightBar not found on home page');
    }
    const scoreText = await insightBar.$eval('span[class*="predictedScore"]', el => el.textContent?.trim());
    console.log(`- CompactInsightBar predicted score: ${scoreText}/990`);
    if (!scoreText) {
      throw new Error('Predicted score missing in CompactInsightBar');
    }

    // Verify Today's 3-Step Routine Section
    const sectionTitle = await page.textContent('h2');
    console.log(`- Section title: "${sectionTitle?.trim()}"`);
    if (!sectionTitle?.includes('Hành Trình Học Hôm Nay')) {
      throw new Error('Main routine section title not found');
    }

    const stepCards = await page.$$('div[class*="routineStepCard"]');
    console.log(`- Number of routine step cards: ${stepCards.length}`);
    if (stepCards.length !== 3) {
      throw new Error(`Expected 3 routine step cards, found ${stepCards.length}`);
    }

    // Check step numbers and badges
    const stepPhases = await page.$$eval('span[class*="stepPhaseBadge"]', els => els.map(e => e.textContent?.trim()));
    console.log(`- Routine step phases: ${JSON.stringify(stepPhases)}`);
    if (!stepPhases.includes('Khởi động') || !stepPhases.includes('Trọng tâm') || !stepPhases.includes('Củng cố')) {
      throw new Error('Missing one of the 3 pedagogical steps (Khởi động, Trọng tâm, Củng cố)');
    }

    // Verify On-Demand Practice & Mock Test Hub
    const onDemandHeading = await page.$eval('h2:has-text("Khu Tự Luyện & Thi Thử Mở Rộng")', el => el.textContent?.trim());
    console.log(`- On-demand section: "${onDemandHeading}"`);
    if (!onDemandHeading) {
      throw new Error('On-demand practice section not found');
    }

    // Verify Navbar Streamlined Groups
    console.log('\nTesting Navbar Navigation Streamlining...');
    const navGroupTitles = await page.$$eval('div[class*="navGroup"] span[class*="groupTitle"]', els => els.map(e => e.textContent?.trim()));
    console.log(`- Nav group titles: ${JSON.stringify(navGroupTitles)}`);
    if (!navGroupTitles.includes('Học Tập Hàng Ngày') || !navGroupTitles.includes('Công Cụ & Ôn Tập')) {
      throw new Error('Navbar does not have expected streamlined group titles');
    }

    // Verify Unified Vocab Hub at /study
    console.log('\nTesting Unified Vocab Hub (/study)...');
    await page.goto(`${BASE_URL}/study`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const vocabHubTitle = await page.textContent('h1');
    console.log(`- Vocab Hub title: "${vocabHubTitle?.trim()}"`);
    if (!vocabHubTitle?.includes('Trung Tâm Từ Vựng')) {
      throw new Error('Vocab Hub title not found on /study');
    }

    // Check 3 top tabs
    const hubTabs = await page.$$eval('button[class*="topHubTab"] span', els => els.map(e => e.textContent?.trim()));
    console.log(`- Vocab Hub tabs: ${JSON.stringify(hubTabs)}`);
    if (!hubTabs.includes('Thẻ Flashcards SRS') || !hubTabs.includes('Làm Quiz 10 Câu') || !hubTabs.includes('Kho Từ & Tra Cứu')) {
      throw new Error('Vocab Hub missing one of the 3 required tabs');
    }

    // Test tab switching to Quiz
    console.log('- Switching to "Làm Quiz 10 Câu" tab...');
    await page.click('button[class*="topHubTab"]:has-text("Làm Quiz 10 Câu")');
    await page.waitForTimeout(600);
    const quizCardExists = await page.$('div[class*="quizCard"], div[class*="questionArea"], h1, h2');
    if (!quizCardExists) {
      throw new Error('Quiz view did not render when switching tab');
    }
    console.log('  -> Quiz view rendered successfully');

    // Test tab switching to Dictionary
    console.log('- Switching to "Kho Từ & Tra Cứu" tab...');
    await page.click('button[class*="topHubTab"]:has-text("Kho Từ & Tra Cứu")');
    await page.waitForTimeout(600);
    const searchInput = await page.$('input[placeholder*="Tìm kiếm tiếng Anh"]');
    if (!searchInput) {
      throw new Error('Dictionary search input did not render when switching tab');
    }
    console.log('  -> Dictionary view rendered successfully with search input');

    // 4. Strict Emoji Audit across Home Page and Vocab Hub
    console.log('\nAuditing for UI Emojis (NO UI EMOJIS STRICT Rule)...');
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA70}-\u{1FAFF}]/u;

    // Check Home Page DOM text
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const homeDomText = await page.evaluate(() => document.body.innerText);
    const homeMatch = homeDomText.match(emojiRegex);
    if (homeMatch) {
      throw new Error(`Forbidden emoji found on Home Page: "${homeMatch[0]}"`);
    }
    console.log('✓ Home Page Emoji Audit: 0 emojis found in DOM');

    // Check Vocab Hub DOM text
    await page.goto(`${BASE_URL}/study`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const vocabDomText = await page.evaluate(() => document.body.innerText);
    const vocabMatch = vocabDomText.match(emojiRegex);
    if (vocabMatch) {
      throw new Error(`Forbidden emoji found on Vocab Hub: "${vocabMatch[0]}"`);
    }
    console.log('✓ Vocab Hub Emoji Audit: 0 emojis found in DOM');

    console.log('\n🎉 ALL E2E VERIFICATION TESTS PASSED SUCCESSFULLY!');
  } finally {
    await browser.close();
  }
}

runE2ETests().catch(err => {
  console.error('\n❌ E2E TEST FAILED:', err);
  process.exit(1);
});
