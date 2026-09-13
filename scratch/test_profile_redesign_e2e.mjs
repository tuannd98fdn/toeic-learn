import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';
import fs from 'fs';
import path from 'path';

const ARTIFACTS_DIR = '/Users/bravee06/.gemini/antigravity-ide/brain/e1e503ca-2ac4-41e2-aa90-1559f411d02d';

async function runE2ETests() {
  console.log('=== STARTING PROFILE REDESIGN E2E VERIFICATION ===');
  const browser = await chromium.launch({ headless: true });

  const secret = 'my-super-secret-key-12345';
  const token = {
    name: 'Nguyễn Đình Tuấn',
    email: 'tuannd98@gmail.com',
    picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tuannd98',
    sub: '123456789'
  };
  const sessionToken = await encode({ token, secret });

  // ----------------------------------------------------
  // TEST 1: Authenticated User (Light Mode & Dark Mode)
  // ----------------------------------------------------
  console.log('\n--- TEST 1: Authenticated User Profile ---');
  const authContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light',
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  await authContext.addCookies([
    {
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax'
    }
  ]);

  const authPage = await authContext.newPage();

  // Seed sample local learner data
  await authPage.goto('http://localhost:3000/onboarding');
  await authPage.evaluate(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '850+');
    localStorage.setItem('toeic_exam_date', '2026-12-15');
    localStorage.setItem('toeic_study_streak', JSON.stringify({ currentStreak: 5, bestStreak: 12, freezeCount: 1 }));
    localStorage.setItem('mistake_notebook', JSON.stringify({
      q1: { wrongCount: 2, lastMistakeDate: '2026-09-10', box: 1 },
      q2: { wrongCount: 1, lastMistakeDate: '2026-09-11', box: 2 },
      q3: { wrongCount: 3, lastMistakeDate: '2026-09-12', box: 1 },
    }));
    localStorage.setItem('toeic_exam_history', JSON.stringify([
      { totalScore: 780, listeningScore: 410, readingScore: 370, testId: 'test1', date: '2026-09-08' }
    ]));
  });

  await authPage.goto('http://localhost:3000/profile');
  await authPage.waitForTimeout(1000);

  // 1.1 Verify user header
  const userName = await authPage.locator('h1').textContent();
  console.log('Rendered User Name:', userName);
  if (!userName.includes('Nguyễn Đình Tuấn')) {
    throw new Error('Expected authenticated user name not found!');
  }

  const statusBadge = await authPage.locator('span[class*="statusTag"]').textContent();
  console.log('Rendered Status Badge:', statusBadge);
  if (!statusBadge.includes('Đã đồng bộ Cloud')) {
    throw new Error('Expected cloud sync status tag not found!');
  }

  // 1.2 Verify Predictive Score
  const scoreText = await authPage.locator('span[class*="predictedScoreNumber"]').textContent();
  console.log('Rendered Predictive Score:', scoreText);
  if (!scoreText || !scoreText.includes('–')) {
    throw new Error('Predicted score format invalid!');
  }

  // 1.3 Test changing target score pill to 990
  const score990Pill = authPage.locator('button[class*="scorePill"]:has-text("990")');
  await score990Pill.click();
  const saveBtn = authPage.locator('button:has-text("Lưu thay đổi")');
  await saveBtn.click();
  await authPage.waitForTimeout(500);

  const saveFeedback = await authPage.locator('span[class*="saveFeedback"]').textContent();
  console.log('Save feedback after pill click:', saveFeedback);
  if (!saveFeedback.includes('Đã lưu mục tiêu')) {
    throw new Error('Save goal feedback not shown!');
  }

  const savedTargetInStorage = await authPage.evaluate(() => localStorage.getItem('toeic_target_score'));
  console.log('Saved target in localStorage:', savedTargetInStorage);
  if (savedTargetInStorage !== '"990"' && savedTargetInStorage !== '990') {
    throw new Error(`Target score not properly saved in localStorage! Got: ${savedTargetInStorage}`);
  }

  // 1.4 Test preferences toggle
  const toggleAutoplay = authPage.locator('button[aria-label="Toggle autoplay"]');
  await toggleAutoplay.click();
  const autoplayVal = await authPage.evaluate(() => localStorage.getItem('toeic_vocab_autoplay'));
  console.log('Saved autoplay preference in localStorage:', autoplayVal);
  if (autoplayVal !== 'true') {
    throw new Error('Autoplay preference not saved properly!');
  }

  // Take Desktop Light Mode Screenshot
  const lightScreenshotPath = path.join(ARTIFACTS_DIR, 'profile_desktop_light.png');
  await authPage.screenshot({ path: lightScreenshotPath, fullPage: true });
  console.log('Saved Light Mode Screenshot:', lightScreenshotPath);

  // ----------------------------------------------------
  // TEST 2: Desktop Dark Mode
  // ----------------------------------------------------
  console.log('\n--- TEST 2: Desktop Dark Mode ---');
  const darkContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  await darkContext.addCookies([
    {
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax'
    }
  ]);
  const darkPage = await darkContext.newPage();
  await darkPage.goto('http://localhost:3000/profile');
  await darkPage.waitForTimeout(1000);

  const darkScreenshotPath = path.join(ARTIFACTS_DIR, 'profile_desktop_dark.png');
  await darkPage.screenshot({ path: darkScreenshotPath, fullPage: true });
  console.log('Saved Dark Mode Screenshot:', darkScreenshotPath);

  // ----------------------------------------------------
  // TEST 3: Mobile Viewport (390px)
  // ----------------------------------------------------
  console.log('\n--- TEST 3: Mobile Viewport (390px) ---');
  await darkPage.setViewportSize({ width: 390, height: 844 });
  await darkPage.waitForTimeout(500);
  const mobileScreenshotPath = path.join(ARTIFACTS_DIR, 'profile_mobile_390.png');
  await darkPage.screenshot({ path: mobileScreenshotPath, fullPage: true });
  console.log('Saved Mobile Screenshot:', mobileScreenshotPath);

  // ----------------------------------------------------
  // TEST 4: Unauthenticated / Guest Mode (Local Learner)
  // ----------------------------------------------------
  console.log('\n--- TEST 4: Unauthenticated Guest Mode (Local Learner) ---');
  const guestContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  const guestPage = await guestContext.newPage();
  await guestPage.goto('http://localhost:3000/profile');
  await guestPage.waitForTimeout(1000);

  console.log('Guest Page URL:', guestPage.url());
  if (guestPage.url().includes('/login')) {
    throw new Error('Guest user was unexpectedly kicked to /login!');
  }

  const guestTitle = await guestPage.locator('h1').textContent();
  console.log('Guest Header Title:', guestTitle);
  if (!guestTitle.includes('Người học Cục bộ')) {
    throw new Error('Expected guest mode title not displayed!');
  }

  const guestPrompt = await guestPage.locator('span[class*="guestPromptTitle"]').textContent();
  console.log('Guest CTA prompt:', guestPrompt);
  if (!guestPrompt.includes('Kích hoạt đồng bộ')) {
    throw new Error('Expected guest CTA banner not displayed!');
  }

  const guestScreenshotPath = path.join(ARTIFACTS_DIR, 'profile_guest_mode.png');
  await guestPage.screenshot({ path: guestScreenshotPath, fullPage: true });
  console.log('Saved Guest Mode Screenshot:', guestScreenshotPath);

  // ----------------------------------------------------
  // TEST 5: Strict NO UI EMOJI Check
  // ----------------------------------------------------
  console.log('\n--- TEST 5: Strict NO UI EMOJI Check ---');
  const pageText = await authPage.innerText('body');
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
  const match = pageText.match(emojiRegex);
  if (match) {
    throw new Error(`CRITICAL RULE VIOLATION: UI Emoji detected on profile page! Emoji: "${match[0]}"`);
  }
  console.log('NO UI EMOJI verification: 100% PASSED (0 emojis detected).');

  await browser.close();
  console.log('\n=== ALL TESTS PASSED SUCCESSFULLY! ===');
}

runE2ETests().catch((err) => {
  console.error('\nE2E TEST FAILURE:', err);
  process.exit(1);
});
