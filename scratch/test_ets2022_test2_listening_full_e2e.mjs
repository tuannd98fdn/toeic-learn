import { chromium } from 'playwright';
import assert from 'assert';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const FORBIDDEN_EMOJIS = ['🎯', '🤖', '🚀', '💡', '🎧', '📝', '➔', '🧹', '👁️', '💪', '🎉', '⏳', '⭐', '🔥', '📚', '✨', '⚡'];

function checkNoEmojis(text, contextName) {
  for (const emoji of FORBIDDEN_EMOJIS) {
    if (text.includes(emoji)) {
      throw new Error(`[STRICT VIOLATION] Found emoji "${emoji}" in ${contextName}: ${text.slice(0, 100)}`);
    }
  }
}

async function runTest() {
  console.log('--- Starting ETS 2022 Test 2 Listening (Part 2 - Part 4) E2E Test ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    extraHTTPHeaders: {
      'x-playwright-test': 'true',
      'x-e2e-bypass-auth': 'true'
    },
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();

  try {
    // 1. Exam Simulation LC check
    console.log('[1/4] Navigating to /exam?test=ets2022_test2...');
    await page.goto(`${BASE_URL}/exam?test=ets2022_test2`, { waitUntil: 'networkidle', timeout: 20000 });

    // Wait for exam content to load
    await page.waitForSelector('main', { timeout: 10000 });

    const bodyText = await page.textContent('body');
    checkNoEmojis(bodyText, 'Exam Page Body');
    console.log('PASS: 0 UI emojis on /exam?test=ets2022_test2');

    // 2. Test Part 2 Practice Page
    console.log('[2/4] Testing /part2?test=ets2022_test2...');
    await page.goto(`${BASE_URL}/part2?test=ets2022_test2`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForSelector('audio', { state: 'attached', timeout: 10000 });

    const p2AudioSrc = await page.getAttribute('audio', 'src');
    console.log('Part 2 Q7 Audio Src:', p2AudioSrc);
    assert(p2AudioSrc && p2AudioSrc.includes('ets2022-assets/p2_07.mp3'), 'Part 2 audio must point to CDN p2_07.mp3');

    // Answer Q7
    const optButtons = await page.$$('button:has-text("(A)")');
    assert(optButtons.length > 0, 'Must render option (A) button');
    await optButtons[0].click();
    await page.waitForTimeout(500);

    const p2BodyText = await page.textContent('body');
    checkNoEmojis(p2BodyText, 'Part 2 Practice DOM');
    await page.screenshot({ path: 'scratch/part2_test2_verified.png' });
    console.log('PASS: Part 2 loaded CDN audio and rendered 0 emojis.');

    // 3. Test Part 3 Practice Page (including Graphics)
    console.log('[3/4] Testing /part3?test=ets2022_test2...');
    await page.goto(`${BASE_URL}/part3?test=ets2022_test2`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForSelector('audio', { state: 'attached', timeout: 10000 });

    const p3AudioSrc = await page.getAttribute('audio', 'src');
    console.log('Part 3 Set 1 Audio Src:', p3AudioSrc);
    assert(p3AudioSrc && p3AudioSrc.includes('ets2022-assets/p3_s01.mp3'), 'Part 3 audio must point to CDN p3_s01.mp3');

    const p3BodyText = await page.textContent('body');
    checkNoEmojis(p3BodyText, 'Part 3 Practice DOM');
    await page.screenshot({ path: 'scratch/part3_test2_verified.png' });
    console.log('PASS: Part 3 loaded CDN audio and rendered 0 emojis.');

    // 4. Test Part 4 Practice Page (including Graphics)
    console.log('[4/4] Testing /part4?test=ets2022_test2...');
    await page.goto(`${BASE_URL}/part4?test=ets2022_test2`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForSelector('audio', { state: 'attached', timeout: 10000 });

    const p4AudioSrc = await page.getAttribute('audio', 'src');
    console.log('Part 4 Set 1 Audio Src:', p4AudioSrc);
    assert(p4AudioSrc && p4AudioSrc.includes('ets2022-assets/p4_s01.mp3'), 'Part 4 audio must point to CDN p4_s01.mp3');

    const p4BodyText = await page.textContent('body');
    checkNoEmojis(p4BodyText, 'Part 4 Practice DOM');
    await page.screenshot({ path: 'scratch/part4_test2_verified.png' });
    console.log('PASS: Part 4 loaded CDN audio and rendered 0 emojis.');

    console.log('--- ALL E2E TESTS PASSED 100% WITH 0 REGRESSIONS ---');
  } catch (err) {
    console.error('Test FAILED:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTest();
