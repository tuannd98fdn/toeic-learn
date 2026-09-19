import { chromium } from 'playwright';

async function main() {
  console.log('=== STARTING STUDY PLAN ENHANCEMENTS E2E TEST ===');
  const browser = await chromium.launch({ headless: true });

  // -------------------------------------------------------------
  // Test 1: Empty state / Creation form with Weakest Parts & Validation
  // -------------------------------------------------------------
  console.log('\n--- 1. Testing Creation Form, Weakest Parts & Validation ---');
  const contextForm = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
  });

  const pageForm = await contextForm.newPage();
  const consoleErrors = [];
  pageForm.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await pageForm.goto('http://localhost:3000/study-plan', { waitUntil: 'networkidle' });
  await pageForm.waitForTimeout(1000);

  // Check form title
  const formTitle = await pageForm.locator('h1').innerText();
  console.log(`[1a] Form title: "${formTitle}"`);

  // Test Weakest Parts Pills
  const partPills = pageForm.locator('button[class*="partPillBtn"]');
  const partPillsCount = await partPills.count();
  console.log(`[1b] Weakest parts options count: ${partPillsCount} (Expected 7)`);
  if (partPillsCount !== 7) throw new Error(`Expected 7 part pills, got ${partPillsCount}`);

  // Test Target Score validation warning
  // Default: current = 450. Set current = 750, select target = 650
  const numberInput = pageForm.locator('input[type="number"]');
  await numberInput.fill('750');
  const target650 = pageForm.locator('button:has-text("650+ Điểm")');
  await target650.click();
  await pageForm.waitForTimeout(300);

  const warnCount = await pageForm.locator('text=Điểm mục tiêu (650) hiện chưa cao hơn điểm xuất phát (750)').count();
  console.log(`[1c] Target score validation warning displayed: ${warnCount > 0 ? 'PASS' : 'FAIL'}`);
  if (warnCount === 0) throw new Error('Validation warning was not displayed when target <= current score');

  // Now set realistic target: 850+
  const target850 = pageForm.locator('button:has-text("850+ Điểm")');
  await target850.click();
  await pageForm.waitForTimeout(300);
  const warnCountAfter = await pageForm.locator('text=Điểm mục tiêu (850) hiện chưa cao hơn điểm xuất phát (750)').count();
  console.log(`[1d] Warning cleared after selecting higher target: ${warnCountAfter === 0 ? 'PASS' : 'FAIL'}`);

  // Take screenshot of enhanced form
  await pageForm.screenshot({ path: 'scratch/enhanced_form_desktop.png', fullPage: true });
  console.log('Saved: scratch/enhanced_form_desktop.png');

  // Generate the plan
  const generateBtn = pageForm.locator('button:has-text("Kích Hoạt Lộ Trình Thông Minh")');
  await generateBtn.click();
  await pageForm.waitForTimeout(1500);

  // -------------------------------------------------------------
  // Test 2: Active Plan Dashboard View
  // -------------------------------------------------------------
  console.log('\n--- 2. Testing Active Plan Dashboard View ---');
  const planTitle = await pageForm.locator('h1').innerText();
  console.log(`[2a] Active plan title: "${planTitle}"`);

  // Verify Weekly Clusters exist
  const weekClusters = pageForm.locator('div[class*="weekCluster"]');
  const weekCount = await weekClusters.count();
  console.log(`[2b] Weekly clusters count: ${weekCount} (Expected ~5 weeks for 30 days)`);
  if (weekCount === 0) throw new Error('No weekly clusters found!');

  // Verify Tuần 1 text
  const week1Header = pageForm.locator('text=Tuần 1 (Ngày 1 - 7)');
  console.log(`[2c] Week 1 header found: ${await week1Header.count() > 0 ? 'PASS' : 'FAIL'}`);

  // Test Week Collapse / Expand
  const week1Toggle = pageForm.locator('div[class*="weekHeader"]').first();
  await week1Toggle.click(); // Collapse
  await pageForm.waitForTimeout(300);
  console.log('[2d] Collapsed Week 1');
  await week1Toggle.click(); // Re-expand
  await pageForm.waitForTimeout(300);
  console.log('[2e] Re-expanded Week 1');

  // Test Day Inspection: Click "Xem chi tiết" on Day 2
  const day2DetailBtn = pageForm.locator('button:has-text("Xem chi tiết")').first();
  if (await day2DetailBtn.count() > 0) {
    await day2DetailBtn.click();
    await pageForm.waitForTimeout(300);
    const inspectingNotice = pageForm.locator('text=Đang xem lại • Bấm để về Hôm nay');
    console.log(`[2f] Inspecting non-today day badge displayed: ${await inspectingNotice.count() > 0 ? 'PASS' : 'FAIL'}`);
    // Return to today
    await inspectingNotice.click();
    await pageForm.waitForTimeout(300);
  }

  // Test Non-destructive Edit Plan
  console.log('\n--- 3. Testing Non-destructive Edit Plan ---');
  const editBtn = pageForm.locator('button:has-text("Chỉnh sửa")');
  await editBtn.click();
  await pageForm.waitForTimeout(500);

  const editTitle = await pageForm.locator('h1').innerText();
  console.log(`[3a] Edit mode title: "${editTitle}"`);
  if (!editTitle.includes('Chỉnh Sửa')) throw new Error('Did not enter edit mode');

  // Change daily minutes to 45 Phút
  const min45Btn = pageForm.locator('button:has-text("45 Phút")');
  await min45Btn.click();

  // Save changes
  const saveBtn = pageForm.locator('button:has-text("Lưu Thay Đổi & Cập Nhật Lộ Trình")');
  await saveBtn.click();
  await pageForm.waitForTimeout(1000);

  const updatedSubtitle = await pageForm.locator('p[class*="planSubtitle"]').innerText();
  console.log(`[3b] Updated plan subtitle: "${updatedSubtitle}"`);
  if (!updatedSubtitle.includes('45p/ngày')) throw new Error('Daily minutes were not updated in active plan!');

  // Test Today Task Completion & Celebration
  console.log('\n--- 4. Testing Task Completion & Celebration ---');
  const todayCheckboxes = pageForm.locator('section[class*="todayCard"] button[class*="checkboxBtn"]');
  const taskCountToday = await todayCheckboxes.count();
  console.log(`[4a] Tasks today count: ${taskCountToday}`);

  // Check all tasks today
  for (let i = 0; i < taskCountToday; i++) {
    await todayCheckboxes.nth(i).click();
    await pageForm.waitForTimeout(300);
  }

  // Verify Celebration Card displays
  const celebrationCard = pageForm.locator('div[class*="celebrationCard"]');
  const celebCount = await celebrationCard.count();
  console.log(`[4b] Celebration card displayed: ${celebCount > 0 ? 'PASS' : 'FAIL'}`);
  if (celebCount === 0) throw new Error('Celebration card was not displayed on 100% daily completion!');

  const xpBadge = pageForm.locator('text=+50 XP');
  console.log(`[4c] +50 XP reward badge displayed: ${await xpBadge.count() > 0 ? 'PASS' : 'FAIL'}`);

  // -------------------------------------------------------------
  // Test 5: Mobile Viewport & Responsiveness
  // -------------------------------------------------------------
  console.log('\n--- 5. Testing Mobile Viewport (375x812) ---');
  await pageForm.setViewportSize({ width: 375, height: 812 });
  await pageForm.waitForTimeout(500);

  await pageForm.screenshot({ path: 'scratch/enhanced_plan_mobile.png', fullPage: true });
  console.log('Saved: scratch/enhanced_plan_mobile.png');

  // Verify task items in todayCard are properly stacked
  const mobileTask = pageForm.locator('div[class*="taskItem"]').first();
  const box = await mobileTask.boundingBox();
  console.log(`[5a] Mobile task width: ${box?.width}px, height: ${box?.height}px`);
  if (box && box.height < 60) throw new Error('Mobile task is suspiciously squished');

  // -------------------------------------------------------------
  // Test 6: Dark Mode View
  // -------------------------------------------------------------
  console.log('\n--- 6. Testing Dark Mode View ---');
  await pageForm.setViewportSize({ width: 1280, height: 900 });
  await pageForm.emulateMedia({ colorScheme: 'dark' });
  await pageForm.waitForTimeout(500);

  await pageForm.screenshot({ path: 'scratch/enhanced_plan_dark.png', fullPage: true });
  console.log('Saved: scratch/enhanced_plan_dark.png');

  // Light Mode Screenshot
  await pageForm.emulateMedia({ colorScheme: 'light' });
  await pageForm.waitForTimeout(300);
  await pageForm.screenshot({ path: 'scratch/enhanced_plan_light.png', fullPage: true });
  console.log('Saved: scratch/enhanced_plan_light.png');

  // -------------------------------------------------------------
  // Test 7: Strict 0 UI Emojis Check
  // -------------------------------------------------------------
  console.log('\n--- 7. Checking Strict NO UI EMOJIS ---');
  const emojiRegex = /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/u;
  const bodyText = await pageForm.locator('body').innerText();
  const foundEmoji = bodyText.match(emojiRegex);
  console.log(`[7] Emojis in DOM: ${foundEmoji ? 'FOUND (' + foundEmoji[0] + ') FAIL' : 'NONE (PASS)'}`);
  if (foundEmoji) throw new Error(`Found disallowed emoji in DOM: ${foundEmoji[0]}`);

  // Check console errors
  console.log('\nConsole Errors:', consoleErrors.length > 0 ? consoleErrors : 'None (PASS)');
  if (consoleErrors.length > 0) throw new Error(`Console errors encountered: ${consoleErrors.join(', ')}`);

  await browser.close();
  console.log('\n=== ALL TESTS PASSED SUCCESSFULLY! ===');
}

main().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
