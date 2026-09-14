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

async function runTests() {
  console.log('=== STARTING PART 7 FONT ZOOM & EVIDENCE HIGHLIGHTING E2E TEST ===');

  const token = await encode({
    token: {
      name: 'Test Learner',
      email: 'learner@toeic.com',
      sub: 'user-part7-zoom-test',
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
    // 1. Navigate to Part 7
    console.log('1. Navigating to /part7?test=ets2022_test1...');
    await page.goto(`${BASE_URL}/part7?test=ets2022_test1`);
    await page.waitForTimeout(1500);

    // Verify 0 Emojis on page load
    let bodyText = await page.locator('body').innerText();
    assertNoEmojis(bodyText, 'Initial Page Load');
    console.log('-> NO UI Emojis check: PASSED (0 emojis)');

    // 2. Verify Passage Toolbar & Font Zoom Controls
    console.log('2. Verifying Passage Toolbar & Font Zoom controls...');
    const toolbar = page.locator('div[class*="passageToolbar"]').first();
    await toolbar.waitFor({ state: 'visible', timeout: 5000 });

    const zoomOutBtn = toolbar.locator('button[aria-label="Thu nhỏ cỡ chữ"]');
    const zoomInBtn = toolbar.locator('button[aria-label="Phóng to cỡ chữ"]');
    const zoomValueBtn = toolbar.locator('button[class*="zoomValueBtn"]');

    if (!(await zoomOutBtn.isVisible()) || !(await zoomInBtn.isVisible()) || !(await zoomValueBtn.isVisible())) {
      throw new Error('Font zoom buttons not visible in passage toolbar');
    }

    const initialZoomText = await zoomValueBtn.innerText();
    console.log(`-> Initial font zoom: ${initialZoomText}`);

    // 3. Test Font Zoom In & Out
    console.log('3. Testing Font Zoom In (A+)...');
    await zoomInBtn.click();
    await page.waitForTimeout(200);
    let currentZoom = await zoomValueBtn.innerText();
    console.log(`-> After 1 click A+: ${currentZoom}`);
    if (currentZoom !== '115%') {
      throw new Error(`Expected 115% font zoom, got ${currentZoom}`);
    }

    await zoomInBtn.click();
    await page.waitForTimeout(200);
    currentZoom = await zoomValueBtn.innerText();
    console.log(`-> After 2nd click A+: ${currentZoom}`);
    if (currentZoom !== '130%') {
      throw new Error(`Expected 130% font zoom, got ${currentZoom}`);
    }

    // Check localStorage persistence
    const savedZoom = await page.evaluate(() => localStorage.getItem('toeic_part7_font_zoom'));
    console.log(`-> Saved in localStorage: ${savedZoom}`);
    if (savedZoom !== '130') {
      throw new Error(`Expected localStorage toeic_part7_font_zoom to be '130', got ${savedZoom}`);
    }

    // Check CSS custom property on leftPanel
    const fontScaleVal = await page.locator('section[class*="leftPanel"]').evaluate((el) => {
      return el.style.getPropertyValue('--passage-font-scale');
    });
    console.log(`-> CSS custom property --passage-font-scale: ${fontScaleVal}`);
    if (fontScaleVal !== '1.3') {
      throw new Error(`Expected --passage-font-scale to be '1.3', got ${fontScaleVal}`);
    }

    // Reset zoom by clicking the percentage button
    console.log('-> Clicking percentage button to reset to 100%...');
    await zoomValueBtn.click();
    await page.waitForTimeout(200);
    currentZoom = await zoomValueBtn.innerText();
    console.log(`-> After reset: ${currentZoom}`);
    if (currentZoom !== '100%') {
      throw new Error(`Expected reset to 100%, got ${currentZoom}`);
    }

    // Test Zoom Out (A-)
    await zoomOutBtn.click();
    await page.waitForTimeout(200);
    currentZoom = await zoomValueBtn.innerText();
    console.log(`-> After click A-: ${currentZoom}`);
    if (currentZoom !== '85%') {
      throw new Error(`Expected 85%, got ${currentZoom}`);
    }
    const isZoomOutDisabled = await zoomOutBtn.isDisabled();
    if (!isZoomOutDisabled) {
      throw new Error('Expected zoomOut button to be disabled at min zoom (85%)');
    }

    // Reset back to 100%
    await zoomValueBtn.click();
    await page.waitForTimeout(200);

    // 4. Test Answering Questions & Submitting Set
    console.log('4. Answering questions to enter Review mode...');
    // Answer Q147
    await page.keyboard.press('KeyA');
    await page.waitForTimeout(300);

    // Next question (Q148)
    const nextQBtn = page.locator('button[class*="navBtn"]:has-text("Câu tiếp theo")');
    if (await nextQBtn.isEnabled()) {
      await nextQBtn.click();
      await page.waitForTimeout(300);
    }
    // Answer Q148
    await page.keyboard.press('KeyC');
    await page.waitForTimeout(300);

    // Submit button should appear
    const submitBtn = page.locator('button[class*="submitBtn"]');
    await submitBtn.waitFor({ state: 'visible', timeout: 5000 });
    console.log('-> Submitting passage set answers...');
    await submitBtn.click();
    await page.waitForTimeout(1000);

    // 5. Verify Review Mode & Evidence Pinpointing Buttons
    console.log('5. Verifying Review mode and Evidence Pinpointing button...');
    const reviewSection = page.locator('div[class*="reviewSection"]');
    await reviewSection.waitFor({ state: 'visible', timeout: 5000 });

    const locateButtons = page.locator('button[class*="evidenceLocateBtn"]');
    const locateCount = await locateButtons.count();
    console.log(`-> Found ${locateCount} evidence locate buttons in explanation cards.`);
    if (locateCount === 0) {
      throw new Error('No evidence locate buttons found in review mode');
    }

    // Click 1st locate button (for Q147)
    const firstLocateBtn = locateButtons.first();
    const btnInitialText = await firstLocateBtn.innerText();
    console.log(`-> First button initial text: "${btnInitialText}"`);
    if (!btnInitialText.includes('Soi vị trí trong bài')) {
      throw new Error(`Expected button text to include 'Soi vị trí trong bài', got "${btnInitialText}"`);
    }

    console.log('-> Clicking "Soi vị trí trong bài" for Q147...');
    await firstLocateBtn.click();
    await page.waitForTimeout(500);

    const btnActiveText = await firstLocateBtn.innerText();
    console.log(`-> First button active text: "${btnActiveText}"`);
    if (!btnActiveText.includes('Đang soi manh mối')) {
      throw new Error(`Expected active button text to include 'Đang soi manh mối', got "${btnActiveText}"`);
    }

    // Check that <mark id="active-evidence-marker"> exists in DOM
    const marker = page.locator('#active-evidence-marker');
    const isMarkerVisible = await marker.isVisible();
    console.log(`-> Active evidence marker visible in passage: ${isMarkerVisible}`);
    if (!isMarkerVisible) {
      throw new Error('Expected #active-evidence-marker to be visible in the left passage panel');
    }
    const markedText = await marker.innerText();
    console.log(`-> Marked snippet text: "${markedText.slice(0, 50)}..."`);

    // Toggle off by clicking again
    console.log('-> Clicking active button to toggle off highlight...');
    await firstLocateBtn.click();
    await page.waitForTimeout(300);
    const isMarkerStillPresent = (await page.locator('#active-evidence-marker').count()) > 0;
    console.log(`-> Marker present after toggle off: ${isMarkerStillPresent}`);
    if (isMarkerStillPresent) {
      throw new Error('Expected marker to be removed when toggling off evidence');
    }

    // 6. Test Multi-Passage (Double Passage) Navigation & Highlighting
    console.log('6. Testing Multi-Passage (Double Passage) mode with Test 2...');
    await page.goto(`${BASE_URL}/part7?test=ets2022_test2&passageType=Double%20Passage`);
    await page.waitForTimeout(1500);

    // Verify double passage loaded
    const passageCards = page.locator('div[class*="passageCard"]');
    const passageCardCount = await passageCards.count();
    console.log(`-> Number of passages on left panel: ${passageCardCount}`);
    if (passageCardCount < 2) {
      throw new Error(`Expected at least 2 passage cards in Double Passage mode, got ${passageCardCount}`);
    }

    // Answer all 5 questions for double passage
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('KeyB');
      await page.waitForTimeout(200);
      const nextBtn = page.locator('button[class*="navBtn"]:has-text("Câu tiếp theo")');
      if (await nextBtn.isEnabled()) {
        await nextBtn.click();
        await page.waitForTimeout(200);
      }
    }

    // Submit
    const submitBtnDouble = page.locator('button[class*="submitBtn"]');
    if (await submitBtnDouble.isVisible()) {
      await submitBtnDouble.click();
      await page.waitForTimeout(1000);
    }

    // Verify locate button on double passage
    const doubleLocateBtns = page.locator('button[class*="evidenceLocateBtn"]');
    if ((await doubleLocateBtns.count()) > 0) {
      console.log('-> Clicking evidence locate on Double Passage question...');
      await doubleLocateBtns.first().click();
      await page.waitForTimeout(500);

      const doubleMarker = page.locator('#active-evidence-marker');
      if (!(await doubleMarker.isVisible())) {
        throw new Error('Evidence marker not visible in double passage');
      }
      console.log('-> Double passage evidence marker successfully located & highlighted!');
    }

    // 7. Final Strict No UI Emojis Audit
    console.log('7. Final Audit: Scanning entire rendered DOM for UI Emojis...');
    bodyText = await page.locator('body').innerText();
    assertNoEmojis(bodyText, 'Final Review Mode with Evidence Highlight');
    console.log('-> 0 UI Emojis verified across entire Part 7 interface!');

    console.log('=== ALL PART 7 FONT ZOOM & EVIDENCE HIGHLIGHTING E2E TESTS PASSED ===');
  } finally {
    await browser.close();
  }
}

runTests().catch((err) => {
  console.error('Test Failed:', err);
  process.exit(1);
});
