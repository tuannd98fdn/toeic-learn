import { chromium } from 'playwright';

const EMOJI_REGEX = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{23FA}-\u{23FF}]/u;

async function runTest() {
  console.log('=== STARTING MASTERCLASS 30-MIN E2E PLAYWRIGHT TEST ===');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    colorScheme: 'dark',
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  const page = await context.newPage();

  // Set up localStorage before initial navigation
  await page.addInitScript(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '850+');
    localStorage.setItem('toeic_exam_date', '2026-10-30');
  });

  try {
    // 1. Visit Dashboard
    console.log('Step 1: Navigating to Dashboard http://localhost:3000');
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    console.log('Current URL after load:', page.url());

    // Check Masterclass banner on Dashboard
    console.log('Step 2: Verifying Masterclass banner on Dashboard');
    await page.screenshot({ path: 'scratch/debug_dashboard.png' });
    const banner = await page.waitForSelector('section[class*="masterclassBanner"]', { timeout: 8000 });
    if (!banner) throw new Error('Masterclass banner not found on Dashboard');

    await page.screenshot({ path: 'scratch/masterclass_dashboard_banner.png' });
    console.log('[PASS] Masterclass banner displayed on Dashboard. Screenshot saved.');

    // 2. Click CTA to Masterclass
    console.log('Step 3: Clicking CTA to navigate to /masterclass');
    const ctaBtn = await page.waitForSelector('a[href="/masterclass"]');
    await ctaBtn.click();
    await page.waitForURL('**/masterclass');
    await page.waitForLoadState('networkidle');

    // 3. Verify Stage 1: Connected Speech
    console.log('Step 4: Verifying Stage 1: ConnectedSpeechPlayer');
    await page.waitForSelector('text=Giọng British');
    await page.waitForSelector('text=The quarterly report is certainly not written yet.');
    await page.screenshot({ path: 'scratch/masterclass_stage1.png' });
    console.log('[PASS] Stage 1 rendered properly.');

    // Select drill answer
    console.log('Step 5: Answering Stage 1 drill question');
    const optionB = await page.locator('button:has-text("B) Bị chặn hơi ngắn tại cổ họng")');
    await optionB.click();
    await page.waitForTimeout(500);

    // 4. Navigate to Stage 2: Business Reading
    console.log('Step 6: Navigating to Stage 2: Business Reading');
    const nextToStage2 = await page.waitForSelector('button:has-text("Sang Trạm 2: Đọc Hiểu Thương Mại")');
    await nextToStage2.click();
    await page.waitForTimeout(600);

    await page.waitForSelector('text=Báo Cáo Tình Huống: Nghẽn Chuỗi Cung Ứng Bán Dẫn');
    await page.screenshot({ path: 'scratch/masterclass_stage2_reading.png' });
    console.log('[PASS] Stage 2 reading passage rendered.');

    // Switch to Paraphrase Matrix Tab
    console.log('Step 7: Testing 4-tier Paraphrase Matrix tab');
    const matrixTab = await page.waitForSelector('button:has-text("Ma Trận Paraphrase 4 Tầng ETS")');
    await matrixTab.click();
    await page.waitForTimeout(400);
    await page.waitForSelector('text=Tầng 1: Thay thế bằng từ đồng nghĩa');
    await page.waitForSelector('text=Tầng 4: Diễn đạt phủ định của trái nghĩa');
    await page.screenshot({ path: 'scratch/masterclass_stage2_matrix.png' });
    console.log('[PASS] Paraphrase Matrix rendered with all 4 tiers.');

    // 5. Navigate to Stage 3: High Score Challenge
    console.log('Step 8: Navigating to Stage 3: 850+ Challenge');
    const nextToStage3 = await page.waitForSelector('button:has-text("Sang Trạm 3: Đấu Trường 850+")');
    await nextToStage3.click();
    await page.waitForTimeout(600);

    await page.waitForSelector('text=Mục tiêu 850+');
    
    // Toggle Clue Hint
    const clueBtn = await page.waitForSelector('button:has-text("Gợi ý manh mối tư duy")');
    await clueBtn.click();
    await page.waitForSelector('text=Manh mối suy luận:');

    // Answer question 1 (B: Should)
    const optB = await page.locator('button:has-text("Should")');
    await optB.click();
    await page.waitForTimeout(500);

    // Verify Syntax visualizer
    await page.waitForSelector('text=Phân Tích Cú Pháp Câu (Syntax Visualizer):');
    await page.screenshot({ path: 'scratch/masterclass_stage3_challenge.png' });
    console.log('[PASS] Stage 3 HighScoreChallengeCard and Syntax Visualizer verified.');

    // 6. Navigate to Stage 4: Retention
    console.log('Step 9: Navigating to Stage 4: Retention');
    const stage4Tab = await page.waitForSelector('button:has-text("Trạm 4: Khắc Sâu & Nhận XP")');
    await stage4Tab.click();
    await page.waitForTimeout(500);

    await page.waitForSelector('text=Khắc Sâu 5 Cụm Từ Vựng Tinh Hoa Hôm Nay');
    await page.waitForSelector('text=demurrage fees');
    await page.waitForSelector('text=contingency protocol');

    // Click Complete & Claim XP
    console.log('Step 10: Claiming Reward & Completing Session');
    const claimBtn = await page.waitForSelector('button:has-text("HOÀN TẤT 30 PHÚT & NHẬN +100 XP")');
    await claimBtn.click();
    await page.waitForTimeout(800);

    await page.waitForSelector('text=Xuất Sắc! Hoàn Tất 30 Phút Bứt Phá Điểm Cao');
    await page.waitForSelector('text=+100 XP');
    await page.waitForSelector('text=+5 Từ Vựng');
    await page.screenshot({ path: 'scratch/masterclass_stage4_celebration.png' });
    console.log('[PASS] Celebration screen verified with rewards.');

    // 7. Verify localStorage updates
    console.log('Step 11: Verifying storage persistence');
    const storageData = await page.evaluate(() => {
      return {
        leitner: localStorage.getItem('leitner_progress'),
        completedDays: localStorage.getItem('toeic_masterclass_completed_days')
      };
    });

    if (!storageData.completedDays || !storageData.completedDays.includes('1')) {
      throw new Error('Day 1 not recorded in toeic_masterclass_completed_days');
    }
    console.log('[PASS] LocalStorage persistence verified successfully.');

    // 8. Emoji Audit on Live DOM
    console.log('Step 12: Scanning rendered DOM for forbidden UI emojis');
    const bodyText = await page.evaluate(() => document.body.innerText);
    if (EMOJI_REGEX.test(bodyText)) {
      const match = bodyText.match(EMOJI_REGEX);
      throw new Error(`Forbidden UI emoji found on rendered DOM: ${match ? match[0] : 'unknown'}`);
    }
    console.log('[PASS] 0 UI emojis found in rendered DOM.');

    console.log('\n=========================================');
    console.log('ALL TESTS PASSED WITH 100% SUCCESS!');
    console.log('=========================================');
  } catch (err) {
    console.error('[TEST ERROR]', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTest();
