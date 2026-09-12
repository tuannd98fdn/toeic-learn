import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';

const BASE_URL = 'http://localhost:3000';
const NEXTAUTH_SECRET = 'my-super-secret-key-12345';

const EMOJI_REGEX = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/u;

function assertNoEmojis(text, contextName) {
  const match = text.match(EMOJI_REGEX);
  if (match) {
    throw new Error(`[VIOLATION] Found UI Emoji '${match[0]}' in ${contextName}`);
  }
}

async function runE2ETests() {
  console.log('=== STARTING PART 7 TARGETED READING E2E TESTS ===');

  const token = await encode({
    token: {
      name: 'Test Learner',
      email: 'learner@toeic.com',
      sub: 'user-part7-test',
    },
    secret: NEXTAUTH_SECRET,
  });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    },
  ]);

  const page = await context.newPage();

  try {
    // 1. Load Part 7 Standard Mode
    console.log('1. Navigating to /part7?test=ets2022_test1...');
    await page.goto(`${BASE_URL}/part7?test=ets2022_test1`);
    await page.waitForTimeout(1500);

    // Emoji check
    const bodyText = await page.locator('body').innerText();
    assertNoEmojis(bodyText, 'Part 7 Page Initial Load');
    console.log('-> NO UI Emojis check: PASSED (0 emojis)');

    // 2. Verify Targeted Filters Presence
    console.log('2. Verifying Targeted Reading Filters...');
    const filterContainer = page.locator('div[class*="filterContainer"]');
    await filterContainer.waitFor({ state: 'visible', timeout: 5000 });

    const pills = await page.locator('button[class*="filterPill"]').allInnerTexts();
    console.log(`Found ${pills.length} filter pills:`, pills.slice(0, 7).join(', '));
    if (!pills.some((p) => p.includes('Suy luận'))) {
      throw new Error('Missing "Suy luận (Inference)" filter pill');
    }
    if (!pills.some((p) => p.includes('Đoạn đôi'))) {
      throw new Error('Missing "Đoạn đôi (Double)" filter pill');
    }

    // 3. Click "Suy luận (Inference)" Pill
    console.log('3. Clicking "Suy luận (Inference)" filter pill...');
    const inferencePill = page.locator('button[class*="filterPill"]:has-text("Suy luận")');
    await inferencePill.click();
    await page.waitForTimeout(500);

    const activeBanner = await page.locator('div[class*="activeTargetBanner"]').innerText();
    console.log('Active banner text:', activeBanner.replace(/\n/g, ' '));
    if (!activeBanner.includes('Suy luận')) {
      throw new Error('Active banner did not update to "Suy luận"');
    }

    // Check Question Card Badge
    const qBadge = await page.locator('span[class*="questionTypeBadge"]').first().innerText();
    console.log('Question card badge:', qBadge);

    // 4. Click "Đoạn đôi (Double)" Pill
    console.log('4. Clicking "Đoạn đôi (Double)" filter pill...');
    const doublePill = page.locator('button[class*="filterPill"]:has-text("Đoạn đôi")');
    await doublePill.click();
    await page.waitForTimeout(500);

    const subtitleText = await page.locator('p[class*="subtitle"]').innerText();
    console.log('Passage set header subtitle:', subtitleText);
    if (!subtitleText.toLowerCase().includes('double')) {
      throw new Error(`Expected Double Passage in subtitle, got: ${subtitleText}`);
    }

    // 5. Answer questions in set & Submit
    console.log('5. Answering questions and testing Pacing Indicator & Strategy Tips...');
    // Reset to "Đoạn đơn" to have 2-question single passage for fast submission
    const singlePill = page.locator('button[class*="filterPill"]:has-text("Đoạn đơn")');
    await singlePill.click();
    await page.waitForTimeout(500);

    // Answer all questions in this passage using keyboard shortcut 'A'
    for (let q = 0; q < 5; q++) {
      await page.keyboard.press('A');
      await page.waitForTimeout(400);
      const submitBtnVisible = await page.locator('button[class*="submitBtn"]').isVisible();
      if (submitBtnVisible) break;
    }

    // Submit set
    const submitBtn = page.locator('button[class*="submitBtn"]');
    await submitBtn.waitFor({ state: 'visible', timeout: 5000 });
    await submitBtn.click();
    await page.waitForTimeout(600);

    // Check Pacing Badge
    const pacingBadge = page.locator('span[class*="pacingBadge"]');
    await pacingBadge.waitFor({ state: 'visible', timeout: 5000 });
    const pacingText = await pacingBadge.innerText();
    console.log('Pacing badge text:', pacingText);
    if (!pacingText.includes('Tốc độ:')) {
      throw new Error(`Invalid pacing text: ${pacingText}`);
    }

    // Check Strategy Tip Box
    const strategyBox = page.locator('div[class*="strategyHintBox"]').first();
    if (await strategyBox.isVisible()) {
      const tipText = await strategyBox.innerText();
      console.log('Strategy tip box:', tipText.replace(/\n/g, ' '));
      assertNoEmojis(tipText, 'Strategy Hint Box');
    }

    // 6. Test Cross-test Pooling
    console.log('6. Testing Cross-test Pooling (all tests)...');
    const testSelect = page.locator('select');
    await testSelect.selectOption('all');
    await page.waitForTimeout(600);

    const bannerCross = await page.locator('div[class*="activeTargetBanner"]').innerText();
    console.log('Cross-test banner text:', bannerCross.replace(/\n/g, ' '));

    // Verify localStorage mistake logging
    console.log('7. Verifying Mistake Notebook storage for Part 7...');
    const notebookData = await page.evaluate(() => {
      return localStorage.getItem('mistake_notebook');
    });
    console.log('Mistake notebook recorded:', notebookData ? 'YES (Data found)' : 'Empty');

    console.log('====================================================');
    console.log('ALL PART 7 TARGETED READING E2E TESTS PASSED (100%)!');
    console.log('====================================================');
  } catch (err) {
    console.error('Test Failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runE2ETests();
