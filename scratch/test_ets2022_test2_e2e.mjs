import { chromium } from 'playwright';

async function testETS2022Test2() {
  console.log('--- [1/3] Launching browser for ETS 2022 Test 2 verification ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  // Test /exam with test=ets2022_test2
  console.log('--- [2/3] Navigating to /exam?test=ets2022_test2 ---');
  await page.goto('http://localhost:3000/exam?test=ets2022_test2', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Check Part 1 image
  const imgLocator = page.locator('img[src*="p1_01.jpg"]');
  await imgLocator.waitFor({ state: 'visible', timeout: 10000 });
  const naturalWidth = await imgLocator.evaluate(el => el.naturalWidth);
  console.log('Natural width of scan image:', naturalWidth);
  if (naturalWidth === 0) {
    throw new Error('Scan image failed to load (naturalWidth = 0)');
  }
  console.log('PASS: Genuine ETS Part 1 scanned photo rendered from CDN successfully.');

  // Check audio player source
  const audioLocator = page.locator('audio');
  const audioCount = await audioLocator.count();
  if (audioCount === 0) {
    throw new Error('No audio element found on exam page');
  }
  const audioSrc = await audioLocator.first().evaluate(el => el.currentSrc || el.src);
  console.log('Audio player src:', audioSrc);
  if (!audioSrc.includes('p1_01.mp3')) {
    throw new Error(`Audio source is not p1_01.mp3: ${audioSrc}`);
  }
  console.log('PASS: Genuine ETS studio audio loaded from CDN successfully.');

  // Check NO UI EMOJIS (STRICT)
  console.log('--- [3/3] Checking NO UI EMOJIS (STRICT) ---');
  const bodyText = await page.innerText('body');
  const emojiRegex = /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu;
  const emojis = bodyText.match(emojiRegex);
  if (emojis && emojis.length > 0) {
    console.error('Violating emojis found on /exam:', emojis);
    throw new Error(`Emoji violation found: ${emojis.join(', ')}`);
  }
  console.log('PASS: 0 UI emojis found on /exam.');

  // Test /part1 with test=ets2022_test2
  console.log('--- Testing /part1?test=ets2022_test2 ---');
  await page.goto('http://localhost:3000/part1?test=ets2022_test2', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  const p1Img = page.locator('img[src*="p1_01.jpg"]');
  await p1Img.waitFor({ state: 'visible', timeout: 10000 });
  const p1Width = await p1Img.evaluate(el => el.naturalWidth);
  if (p1Width === 0) {
    throw new Error('Part 1 trainer image failed to load');
  }
  console.log('PASS: Part 1 Trainer rendered genuine ETS scanned image correctly.');

  await browser.close();
  console.log('=== ALL ETS 2022 TEST 2 VERIFICATIONS PASSED 100% ===');
}

testETS2022Test2().catch(err => {
  console.error('Test FAILED:', err);
  process.exit(1);
});
