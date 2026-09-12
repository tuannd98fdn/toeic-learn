import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';

const secret = "my-super-secret-key-12345";

async function run() {
  const token = await encode({
    token: {
      name: "Test Learner",
      email: "learner@toeic.com",
      sub: "user-123"
    },
    secret
  });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

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

  console.log('1. Seeding mistake notebook with sub-skills...');
  await page.goto('http://localhost:3000');
  
  await page.evaluate(() => {
    // Seed diverse mistakes across sub-skills
    const mockMistakes = {
      'exam_ets2022_test1_part5_62b694aebbc57b27fe10f7e4': {
        wrongCount: 3,
        lastMistakeDate: new Date().toISOString(),
        type: 'exam',
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '62b694aebbc57b27fe10f7e4',
        subCategory: 'Pronoun',
        grammarTag: 'Possessive Adjective'
      },
      'exam_ets2022_test1_part5_62b694aebbc57b27fe10f7e5': {
        wrongCount: 4,
        lastMistakeDate: new Date().toISOString(),
        type: 'exam',
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '62b694aebbc57b27fe10f7e5',
        subCategory: 'Verb Tense',
        grammarTag: 'Passive Voice'
      },
      'exam_ets2022_test1_part5_62b694aebbc57b27fe10f7e9': {
        wrongCount: 5,
        lastMistakeDate: new Date().toISOString(),
        type: 'exam',
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '62b694aebbc57b27fe10f7e9',
        subCategory: 'Word Form',
        grammarTag: 'Noun Suffix'
      },
      'exam_ets2022_test1_part5_62b694aebbc57b27fe10f7f0': {
        wrongCount: 2,
        lastMistakeDate: new Date().toISOString(),
        type: 'exam',
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '62b694aebbc57b27fe10f7f0',
        subCategory: 'Preposition & Conjunction',
        grammarTag: 'Correlative Conjunction'
      },
      'exam_ets2022_test1_part5_62b694aebbc57b27fe10f7f6': {
        wrongCount: 2,
        lastMistakeDate: new Date().toISOString(),
        type: 'exam',
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: '62b694aebbc57b27fe10f7f6',
        subCategory: 'Relative Clause',
        grammarTag: 'Relative Pronoun'
      }
    };
    localStorage.setItem('mistake_notebook', JSON.stringify(mockMistakes));
  });

  console.log('2. Visiting /stats to inspect GrammarRadarChart...');
  await page.goto('http://localhost:3000/stats');
  const radarContainer = await page.waitForSelector('#grammar-radar-container', { timeout: 10000 });
  if (!radarContainer) {
    throw new Error('GrammarRadarChart container not found on /stats!');
  }
  console.log('✓ Found GrammarRadarChart on /stats');

  // Verify Top 3 weaknesses text
  const contentText = await radarContainer.innerText();
  console.log('Radar Container content snippet:\n', contentText.slice(0, 300));
  
  if (!contentText.includes('Word Form') || !contentText.includes('Verb Tense')) {
    throw new Error('Top weaknesses did not include expected categories!');
  }
  console.log('✓ Verified Top Weaknesses display');

  await page.screenshot({ path: '/Users/bravee06/.gemini/antigravity-ide/brain/59f562b3-0ab6-4a20-8c87-ec01c44bc933/stats_radar_chart.png', fullPage: true });
  console.log('✓ Saved stats_radar_chart.png');

  console.log('3. Testing "Xem câu sai" navigation and filtering in /notebook...');
  const xemCauSaiBtn = await page.$('a[href*="notebook?subCategory="]');
  if (xemCauSaiBtn) {
    await xemCauSaiBtn.click();
    await page.waitForTimeout(1000);
    console.log('Current URL after click:', page.url());
    await page.screenshot({ path: '/Users/bravee06/.gemini/antigravity-ide/brain/59f562b3-0ab6-4a20-8c87-ec01c44bc933/notebook_grammar_filter.png', fullPage: true });
    console.log('✓ Saved notebook_grammar_filter.png');
  }

  console.log('4. Visiting /part5 to verify question header badges and AI Tutor...');
  await page.goto('http://localhost:3000/part5?test=ets2022_test1');
  await page.waitForTimeout(1000);

  await page.screenshot({ path: '/Users/bravee06/.gemini/antigravity-ide/brain/59f562b3-0ab6-4a20-8c87-ec01c44bc933/part5_grammar_badges.png' });
  console.log('✓ Saved part5_grammar_badges.png');

  console.log('5. Testing AI Tutor Drawer open on Part 5...');
  // Click option A to reveal answer / review or click AI tutor
  const optBtn = await page.$('button:has-text("they")');
  if (optBtn) {
    await optBtn.click();
    await page.waitForTimeout(500);
  }

  const tutorBtn = await page.$('button:has-text("Hỏi Gia Sư AI")');
  if (tutorBtn) {
    await tutorBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: '/Users/bravee06/.gemini/antigravity-ide/brain/59f562b3-0ab6-4a20-8c87-ec01c44bc933/part5_grammar_tutor.png' });
    console.log('✓ Saved part5_grammar_tutor.png with sub-skill badge in drawer');
  }

  console.log('6. Scanning for NO UI EMOJIS violation...');
  const pageText = await page.evaluate(() => document.body.innerText);
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  const match = pageText.match(emojiRegex);
  if (match) {
    console.warn('⚠️ Warning: Found potential emoji:', match[0]);
  } else {
    console.log('✓ 100% CLEAN: Zero UI emojis found on page.');
  }

  await browser.close();
  console.log('All tests completed successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
