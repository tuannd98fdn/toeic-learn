import { chromium } from 'playwright';
import path from 'path';

const ARTIFACTS_DIR = '/Users/bravee06/.gemini/antigravity-ide/brain/93dc5faf-b1a9-43fc-8b59-141401f2aeb6';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
  });
  const page = await context.newPage();

  console.log('--- Step 1: Initialize user session and streak with 1 freeze available ---');
  await page.goto('http://localhost:3000/onboarding');
  await page.evaluate(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '800+');
    localStorage.setItem('toeic_exam_date', '2026-10-15');

    // Set streak data with 3-day streak and 1 freeze count
    localStorage.setItem('vocabulary_streak', JSON.stringify({
      currentStreak: 3,
      bestStreak: 7,
      lastStudyDate: new Date().toISOString(),
      freezeCount: 1,
      isFrozenToday: false,
    }));

    // Clear celebration flag and previous study plan
    localStorage.removeItem('toeic_celebration_date');
    localStorage.removeItem('toeic_adaptive_study_plan');
  });

  console.log('--- Step 2: Navigate to Dashboard and verify Streak Freeze Shield badge ---');
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');

  // Verify freeze badge exists and displays 1
  const freezeBadge = await page.waitForSelector('[class*="freezeBadge"]');
  const freezeText = await freezeBadge.innerText();
  console.log(`Freeze badge text: "${freezeText.trim()}"`);
  if (!freezeText.includes('1')) {
    throw new Error(`Expected freeze badge to display 1, got: "${freezeText}"`);
  }

  // Verify ShieldIcon exists in the badge
  const shieldIcon = await freezeBadge.$('svg');
  if (!shieldIcon) {
    throw new Error('Expected ShieldIcon SVG inside freeze badge');
  }
  console.log('Verified: ShieldIcon and freezeCount: 1 are active!');

  console.log('--- Step 3: Verify Quick Number Keys (1, 2, 3) and desktop badges ---');
  const shortcutBadges = await page.$$('[class*="shortcutKeyBadge"]');
  console.log(`Found ${shortcutBadges.length} shortcut key badges on daily tasks`);
  if (shortcutBadges.length < 3) {
    throw new Error(`Expected at least 3 shortcut badges, found ${shortcutBadges.length}`);
  }

  // Check texts of first 3 badges
  const b1 = await shortcutBadges[0].innerText();
  const b2 = await shortcutBadges[1].innerText();
  const b3 = await shortcutBadges[2].innerText();
  console.log(`Badges: [${b1}], [${b2}], [${b3}]`);
  if (b1 !== '1' || b2 !== '2' || b3 !== '3') {
    throw new Error(`Expected [1], [2], [3], got [${b1}], [${b2}], [${b3}]`);
  }

  console.log('--- Step 4: Test Celebration Reward when completing 100% tasks ---');
  // Check buttons and click all uncompleted tasks
  const checkButtons = await page.$$('[class*="checkButton"]');
  console.log(`Found ${checkButtons.length} daily task check buttons`);

  for (let i = 0; i < checkButtons.length; i++) {
    const isCompleted = await checkButtons[i].evaluate((el) => el.innerText.includes('✓'));
    if (!isCompleted) {
      await checkButtons[i].click();
      await page.waitForTimeout(300);
    }
  }

  // Wait for celebration banner to appear
  const celebrationBanner = await page.waitForSelector('[data-testid="celebration-banner"]', { timeout: 5000 });
  const celebrationTitle = await celebrationBanner.$eval('h4', (el) => el.innerText);
  const celebrationBadge = await celebrationBanner.$eval('[class*="celebrationBadge"]', (el) => el.innerText);
  console.log(`Celebration banner title: "${celebrationTitle}"`);
  console.log(`Celebration badge: "${celebrationBadge}"`);

  if (!celebrationTitle.includes('hoàn thành xuất sắc')) {
    throw new Error(`Unexpected celebration title: "${celebrationTitle}"`);
  }
  if (!celebrationBadge.includes('+50 XP')) {
    throw new Error(`Expected +50 XP badge, got: "${celebrationBadge}"`);
  }

  // Verify NO EMOJIS in celebration banner
  const bannerFullText = await celebrationBanner.innerText();
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  if (emojiRegex.test(bannerFullText)) {
    throw new Error(`Emoji detected in celebration banner: "${bannerFullText}"`);
  }
  console.log('Verified: Celebration Banner has 0 emojis, strict SVG typography compliant!');

  // Check that celebration date was saved in localStorage
  const celebrationDate = await page.evaluate(() => localStorage.getItem('toeic_celebration_date'));
  console.log(`Celebration date stored: ${celebrationDate}`);
  if (!celebrationDate) {
    throw new Error('Expected toeic_celebration_date to be recorded in localStorage');
  }

  console.log('--- Step 5: Test Streak Freeze Protection when user missed yesterday ---');
  // Simulate user missing yesterday: lastStudyDate = 2 days ago, freezeCount = 1
  await page.evaluate(() => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    localStorage.setItem('vocabulary_streak', JSON.stringify({
      currentStreak: 5,
      bestStreak: 10,
      lastStudyDate: twoDaysAgo.toISOString(),
      freezeCount: 1,
      isFrozenToday: false,
    }));
  });

  // Reload page to let useStreak run its check
  await page.reload();
  await page.waitForLoadState('networkidle');

  // Verify that currentStreak was protected and continuous at 6 (not reset to 0/1!), freezeCount is 0, isFrozenToday is true
  const savedStreak = await page.evaluate(() => JSON.parse(localStorage.getItem('vocabulary_streak')));
  console.log('Streak after missed day with freeze:', savedStreak);
  if (savedStreak.currentStreak !== 6) {
    throw new Error(`Expected streak to be protected and continuous at 6, but got: ${savedStreak.currentStreak}`);
  }
  if (savedStreak.freezeCount !== 0) {
    throw new Error(`Expected freezeCount to be consumed to 0, but got: ${savedStreak.freezeCount}`);
  }
  if (!savedStreak.isFrozenToday) {
    throw new Error('Expected isFrozenToday to be true');
  }

  // Verify UI shows frozen notice
  const frozenNotice = await page.waitForSelector('[class*="frozenNotice"]');
  const noticeText = await frozenNotice.innerText();
  console.log(`Frozen notice in UI: "${noticeText}"`);
  if (!noticeText.includes('bảo vệ')) {
    throw new Error(`Expected notice text to mention bảo vệ, got: "${noticeText}"`);
  }

  console.log('--- Step 6: Test Quick Key "1" navigation ---');
  // Set up listener for navigation
  const task1Link = await page.$eval('[class*="planItem"] a', (el) => el.getAttribute('href'));
  console.log(`Target link for Task 1: ${task1Link}`);

  // Press key "1"
  await page.keyboard.press('1');
  await page.waitForTimeout(600);
  console.log(`Current page URL after pressing "1": ${page.url()}`);
  if (!page.url().includes(task1Link)) {
    throw new Error(`Expected URL to include ${task1Link}, but got: ${page.url()}`);
  }
  console.log('Verified: Quick key 1 navigates directly to task 1!');

  console.log('--- Step 7: Capture Visual Verification Screenshots ---');
  // Return to Dashboard for final desktop screenshot
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');

  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'dashboard_phase3_desktop.png'),
    fullPage: false,
  });

  // Tablet screenshot
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'dashboard_phase3_tablet.png'),
    fullPage: false,
  });

  // Mobile screenshot
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'dashboard_phase3_mobile.png'),
    fullPage: false,
  });

  console.log('--- ALL PHASE 3 VERIFICATION TESTS PASSED SUCCESSFULLY! ---');
  await browser.close();
}

run().catch((err) => {
  console.error('Phase 3 E2E Test Failed:', err);
  process.exit(1);
});
