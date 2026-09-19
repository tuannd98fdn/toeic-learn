import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';
import fs from 'fs';
import path from 'path';

const ARTIFACTS_DIR = '/Users/bravee06/.gemini/antigravity-ide/brain/8de4e532-e12e-4fc7-978a-96a543f74aa6';

async function runBackupRestoreE2ETest() {
  console.log('=== STARTING BACKUP & RESTORE JSON E2E TEST ===');

  const browser = await chromium.launch({ headless: true });

  const secret = 'my-super-secret-key-12345';
  const token = {
    name: 'Nguyễn Đình Tuấn',
    email: 'tuannd98@gmail.com',
    picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tuannd98',
    sub: '123456789'
  };
  const sessionToken = await encode({ token, secret });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light',
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax'
    },
    {
      name: 'toeic_guest_mode',
      value: '1',
      domain: 'localhost',
      path: '/'
    }
  ]);

  const page = await context.newPage();

  // 1. Seed initial test data
  console.log('\n--- Step 1: Seeding Initial Local Data ---');
  await page.goto('http://localhost:3000/onboarding');
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '750+');
    localStorage.setItem('toeic_exam_date', '2026-11-15');
    localStorage.setItem('vocabulary_streak', JSON.stringify({ currentStreak: 5, bestStreak: 10, freezeCount: 1, lastStudyDate: '2026-09-18' }));
    localStorage.setItem('mistake_notebook', JSON.stringify({
      q101: { wrongCount: 2, lastMistakeDate: '2026-09-15', box: 1, rootCause: 'Từ vựng' },
      q102: { wrongCount: 1, lastMistakeDate: '2026-09-16', box: 2, rootCause: 'Ngữ pháp' },
      q103: { wrongCount: 3, lastMistakeDate: '2026-09-17', box: 1, rootCause: 'Mắc bẫy' },
    }));
    localStorage.setItem('leitner_progress', JSON.stringify({
      v4: { box: 5, lastReview: '2026-09-10', nextReview: '2026-10-10' },
      v5: { box: 5, lastReview: '2026-09-11', nextReview: '2026-10-11' },
      v6: { box: 3, lastReview: '2026-09-15', nextReview: '2026-09-22' },
    }));
    localStorage.setItem('toeic_exam_history', JSON.stringify([
      { testId: 'ets2022_test1', totalScore: 780, date: '2026-09-10' }
    ]));
  });

  // 2. Navigate to Profile
  console.log('\n--- Step 2: Navigating to /profile & Verifying UI Elements ---');
  await page.goto('http://localhost:3000/profile');
  await page.waitForTimeout(1000);

  // Verify Backup Card header and description
  const backupCardTitle = await page.locator('h2:has-text("Sao lưu & Chuyển đổi thiết bị")').textContent();
  console.log('Found Backup Card Title:', backupCardTitle);

  const chipsText = await page.locator('div[class*="localStatsChips"]').textContent();
  console.log('Found Local Stats Chips:', chipsText);
  if (!chipsText.includes('Lỗi sai:3') || !chipsText.includes('Từ Hộp 5:2') || !chipsText.includes('Chuỗi:5 ngày') || !chipsText.includes('Bài thi:1')) {
    throw new Error(`Local stats chips mismatch! Got: ${chipsText}`);
  }

  // Screenshot initial Profile page
  const desktopInitialScreenshot = path.join(ARTIFACTS_DIR, 'profile_backup_desktop_light.png');
  await page.screenshot({ path: desktopInitialScreenshot, fullPage: true });
  console.log('Saved Desktop Light Screenshot:', desktopInitialScreenshot);

  // 3. Test Export JSON
  console.log('\n--- Step 3: Testing Export Data Download ---');
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('button:has-text("Xuất file sao lưu")')
  ]);

  const downloadPath = path.join('/tmp', download.suggestedFilename());
  await download.saveAs(downloadPath);
  console.log('Downloaded file:', download.suggestedFilename(), 'at', downloadPath);

  // Verify downloaded JSON content
  const fileContent = fs.readFileSync(downloadPath, 'utf-8');
  const parsedBackup = JSON.parse(fileContent);
  console.log('Parsed backup version:', parsedBackup.version);
  console.log('Parsed backup metadata:', parsedBackup.metadata);

  if (parsedBackup.app !== 'toeic-learn') {
    throw new Error(`Expected app to be "toeic-learn", got: ${parsedBackup.app}`);
  }
  console.log('Mistake keys in backup:', Object.keys(parsedBackup.data.mistakes));
  if (parsedBackup.metadata.totalMistakes < 3) {
    throw new Error(`Expected at least 3 mistakes in backup, got: ${parsedBackup.metadata.totalMistakes}`);
  }
  if (parsedBackup.metadata.totalVocabMastered !== 2) {
    throw new Error(`Expected 2 mastered words in backup, got: ${parsedBackup.metadata.totalVocabMastered}`);
  }
  if (parsedBackup.metadata.currentStreak !== 5) {
    throw new Error(`Expected streak 5 in backup, got: ${parsedBackup.metadata.currentStreak}`);
  }

  // Verify toast feedback
  const feedbackText = await page.locator('div[class*="exportFeedback"]').textContent();
  console.log('Export feedback banner:', feedbackText);
  if (!feedbackText.includes('Đã tải xuống tệp sao lưu JSON thành công')) {
    throw new Error('Export feedback banner not found!');
  }

  // 4. Test Import & Preview Modal with a new migration file
  console.log('\n--- Step 4: Testing Import JSON & Preview Modal ---');
  const migrationData = {
    app: 'toeic-learn',
    version: '2.0',
    exportDate: '2026-09-19T10:00:00.000Z',
    metadata: {
      exportDate: '2026-09-19T10:00:00.000Z',
      version: '2.0',
      totalMistakes: 5,
      totalVocabMastered: 8,
      totalExamsTaken: 3,
      currentStreak: 12,
      targetScore: '850+',
      examDate: '2026-12-25',
      hasStudyPlan: true
    },
    data: {
      mistakes: {
        q101: { wrongCount: 5, lastMistakeDate: '2026-09-18', box: 1, rootCause: 'Từ vựng' },
        q104: { wrongCount: 2, lastMistakeDate: '2026-09-18', box: 1, rootCause: 'Bất cẩn' },
        q105: { wrongCount: 1, lastMistakeDate: '2026-09-19', box: 2, rootCause: 'Nghe không rõ' }
      },
      leitnerProgress: {
        w1: { box: 5, lastReview: '2026-09-18', nextReview: '2026-10-18' },
        w4: { box: 5, lastReview: '2026-09-19', nextReview: '2026-10-19' }
      },
      userVocabulary: [],
      streak: { currentStreak: 12, bestStreak: 20, freezeCount: 2, lastStudyDate: '2026-09-19' },
      studyStreakLegacy: null,
      studyDays: ['2026-09-18', '2026-09-19'],
      masterclassCompletedDays: [1, 2],
      studyPlan: null,
      examHistory: [
        { testId: 'ets2022_test1', totalScore: 780, date: '2026-09-10' },
        { testId: 'ets2022_test2', totalScore: 840, date: '2026-09-18' }
      ],
      diagnosticResult: null,
      diagnosticAnswers: null,
      tipsBookmarks: ['tip_2'],
      tipsMastered: ['tip_2'],
      aiHistory: {},
      profile: {
        targetScore: '850+',
        examDate: '2026-12-25',
        onboardingDone: true
      },
      preferences: {
        vocabAutoplay: true,
        soundEffects: true,
        dailyMinutes: 45
      },
      progress: {
        progress_t1_part5: true
      },
      customKeys: {}
    }
  };

  const testUploadPath = '/tmp/test_toeic_migration.json';
  fs.writeFileSync(testUploadPath, JSON.stringify(migrationData, null, 2), 'utf-8');

  // Trigger file input upload
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.click('button:has-text("Khôi phục từ JSON")');
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(testUploadPath);
  await page.waitForTimeout(600);

  // Verify Preview Modal opened
  const modalTitle = await page.locator('h3:has-text("Khôi Phục Dữ Liệu Học Tập")').textContent();
  console.log('Preview Modal Title:', modalTitle);

  // Check stats rendered in preview modal
  const modalStreakVal = await page.locator('div[class*="statCard"]:has-text("Ngày chuỗi") span[class*="statCardVal"]').textContent();
  console.log('Modal Streak Value:', modalStreakVal);
  if (modalStreakVal !== '12') {
    throw new Error(`Expected modal streak 12, got: ${modalStreakVal}`);
  }

  const modalMistakesVal = await page.locator('div[class*="statCard"]:has-text("Câu hỏi sai") span[class*="statCardVal"]').textContent();
  console.log('Modal Mistakes Value:', modalMistakesVal);

  const modalTargetVal = await page.locator('span[class*="targetVal"]').first().textContent();
  console.log('Modal Target Score:', modalTargetVal);
  if (!modalTargetVal.includes('850+')) {
    throw new Error(`Expected modal target 850+, got: ${modalTargetVal}`);
  }

  // Screenshot modal preview
  const modalScreenshot = path.join(ARTIFACTS_DIR, 'backup_restore_modal_preview.png');
  await page.screenshot({ path: modalScreenshot });
  console.log('Saved Modal Preview Screenshot:', modalScreenshot);

  // 5. Test Confirm Restore (Smart Merge)
  console.log('\n--- Step 5: Confirming Restore (Smart Merge) ---');
  await page.click('button:has-text("Xác nhận khôi phục")');
  await page.waitForTimeout(600);

  // Verify success banner appears in modal
  const successTitle = await page.locator('h4:has-text("Khôi Phục Thành Công")').textContent();
  console.log('Success title:', successTitle);

  // Wait for auto reload
  await page.waitForTimeout(1800);

  // Verify merged data in localStorage
  const afterRestoreData = await page.evaluate(() => {
    return {
      streak: JSON.parse(localStorage.getItem('vocabulary_streak') || '{}'),
      mistakes: JSON.parse(localStorage.getItem('mistake_notebook') || '{}'),
      exams: JSON.parse(localStorage.getItem('toeic_exam_history') || '[]'),
    };
  });

  console.log('Restored streak:', afterRestoreData.streak);
  console.log('Restored mistakes keys count:', Object.keys(afterRestoreData.mistakes).length);
  console.log('Restored exam history count:', afterRestoreData.exams.length);

  // Streak should be 12 (max of 5 and 12)
  if (afterRestoreData.streak.currentStreak !== 12) {
    throw new Error(`Expected merged streak 12, got: ${afterRestoreData.streak.currentStreak}`);
  }

  // Mistakes should be merged: q101, q102, q103 from before + q104, q105 from migration = 5 questions
  if (Object.keys(afterRestoreData.mistakes).length < 5) {
    throw new Error(`Expected at least 5 merged mistakes, got: ${Object.keys(afterRestoreData.mistakes).length}`);
  }
  // q101 should have max wrongCount 5
  if (afterRestoreData.mistakes.q101?.wrongCount !== 5) {
    throw new Error(`Expected q101 wrongCount 5, got: ${afterRestoreData.mistakes.q101?.wrongCount}`);
  }

  // 6. Test Dark Mode
  console.log('\n--- Step 6: Testing Desktop Dark Mode ---');
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
      path: '/'
    }
  ]);
  const darkPage = await darkContext.newPage();
  await darkPage.goto('http://localhost:3000/profile');
  await darkPage.waitForTimeout(1000);

  const darkScreenshot = path.join(ARTIFACTS_DIR, 'profile_backup_desktop_dark.png');
  await darkPage.screenshot({ path: darkScreenshot, fullPage: true });
  console.log('Saved Desktop Dark Screenshot:', darkScreenshot);

  // 7. Test Mobile Viewport (390x844)
  console.log('\n--- Step 7: Testing Mobile Viewport (390px) ---');
  await darkPage.setViewportSize({ width: 390, height: 844 });
  await darkPage.waitForTimeout(500);

  const mobileScreenshot = path.join(ARTIFACTS_DIR, 'profile_backup_mobile.png');
  await darkPage.screenshot({ path: mobileScreenshot, fullPage: true });
  console.log('Saved Mobile Screenshot:', mobileScreenshot);

  // 8. Strict NO UI EMOJI Check
  console.log('\n--- Step 8: Strict NO UI EMOJI Verification ---');
  const pageText = await page.innerText('body');
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
  const match = pageText.match(emojiRegex);
  if (match) {
    throw new Error(`CRITICAL RULE VIOLATION: UI Emoji detected on profile page! Found: "${match[0]}"`);
  }
  console.log('NO UI EMOJI verification: 100% PASSED (0 emojis detected in DOM).');

  // 9. Test Unauthenticated Guest Mode (Local Learner)
  console.log('\n--- Step 9: Testing Guest Mode Export & Clean Replace ---');
  const guestContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  await guestContext.addCookies([
    {
      name: 'toeic_guest_mode',
      value: '1',
      domain: 'localhost',
      path: '/'
    }
  ]);
  const guestPage = await guestContext.newPage();
  guestPage.on('console', msg => console.log('[Guest browser console]:', msg.text()));
  await guestPage.goto('http://localhost:3000/onboarding');
  await guestPage.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '650+');
    localStorage.setItem('vocabulary_streak', JSON.stringify({ currentStreak: 3, bestStreak: 4, freezeCount: 1 }));
    localStorage.setItem('mistake_notebook', JSON.stringify({
      q1: { wrongCount: 1, lastMistakeDate: '2026-09-19', box: 1 }
    }));
  });

  await guestPage.goto('http://localhost:3000/profile');
  await guestPage.waitForTimeout(1000);

  const guestHeader = await guestPage.locator('h1').textContent();
  console.log('Guest Header:', guestHeader);
  if (!guestHeader.includes('Người học Cục bộ')) {
    throw new Error('Expected local learner guest header!');
  }

  // Verify guest can export
  const [guestDownload] = await Promise.all([
    guestPage.waitForEvent('download'),
    guestPage.click('button:has-text("Xuất file sao lưu")')
  ]);
  const guestFilePath = path.join('/tmp', guestDownload.suggestedFilename());
  await guestDownload.saveAs(guestFilePath);
  const guestParsed = JSON.parse(fs.readFileSync(guestFilePath, 'utf-8'));
  console.log('Guest exported targetScore:', guestParsed.metadata.targetScore);
  if (guestParsed.metadata.targetScore !== '650+') {
    throw new Error(`Expected guest target 650+, got: ${guestParsed.metadata.targetScore}`);
  }

  // Verify guest can import with clean replace
  const guestUploadData = {
    app: 'toeic-learn',
    version: '2.0',
    exportDate: '2026-09-19T12:00:00.000Z',
    metadata: {
      exportDate: '2026-09-19T12:00:00.000Z',
      version: '2.0',
      totalMistakes: 10,
      totalVocabMastered: 15,
      totalExamsTaken: 4,
      currentStreak: 21,
      targetScore: '990',
      examDate: '2026-12-30',
      hasStudyPlan: false
    },
    data: {
      mistakes: {
        q999: { wrongCount: 1, lastMistakeDate: '2026-09-19', box: 1 }
      },
      leitnerProgress: {},
      userVocabulary: [],
      streak: { currentStreak: 21, bestStreak: 21, freezeCount: 2 },
      studyStreakLegacy: null,
      studyDays: [],
      masterclassCompletedDays: [],
      studyPlan: null,
      examHistory: [],
      diagnosticResult: null,
      diagnosticAnswers: null,
      tipsBookmarks: [],
      tipsMastered: [],
      aiHistory: {},
      profile: {
        targetScore: '990',
        examDate: '2026-12-30',
        onboardingDone: true
      },
      preferences: {
        vocabAutoplay: false,
        soundEffects: true,
        dailyMinutes: 60
      },
      progress: {},
      customKeys: {}
    }
  };
  const guestTestUpload = '/tmp/guest_test_clean_replace.json';
  fs.writeFileSync(guestTestUpload, JSON.stringify(guestUploadData, null, 2), 'utf-8');

  const guestFileChooserPromise = guestPage.waitForEvent('filechooser');
  await guestPage.click('button:has-text("Khôi phục từ JSON")');
  const guestChooser = await guestFileChooserPromise;
  await guestChooser.setFiles(guestTestUpload);
  await guestPage.waitForTimeout(600);

  // Select Clean Replace mode
  await guestPage.waitForSelector('#mode-replace');
  await guestPage.click('#mode-replace');
  await guestPage.waitForTimeout(300);
  await guestPage.click('button:has-text("Xác nhận khôi phục")');
  await guestPage.waitForTimeout(1800);

  const guestAfterData = await guestPage.evaluate(() => {
    return {
      target: localStorage.getItem('toeic_target_score'),
      streak: JSON.parse(localStorage.getItem('vocabulary_streak') || '{}'),
      mistakes: JSON.parse(localStorage.getItem('mistake_notebook') || '{}')
    };
  });

  console.log('Guest after clean replace target:', guestAfterData.target);
  console.log('Guest after clean replace streak:', guestAfterData.streak.currentStreak);
  if (guestAfterData.target !== '990' || guestAfterData.streak.currentStreak !== 21) {
    throw new Error('Clean replace on guest mode did not replace target or streak!');
  }
  if (!guestAfterData.mistakes.q999) {
    throw new Error('Clean replace did not restore q999!');
  }

  const guestScreenshot = path.join(ARTIFACTS_DIR, 'profile_backup_guest.png');
  await guestPage.screenshot({ path: guestScreenshot, fullPage: true });
  console.log('Saved Guest Mode Screenshot:', guestScreenshot);

  await browser.close();
  console.log('\n=== ALL BACKUP & RESTORE E2E TESTS (AUTH + GUEST) PASSED 100%! ===');
}

runBackupRestoreE2ETest().catch((err) => {
  console.error('\nE2E TEST FAILURE:', err);
  process.exit(1);
});
