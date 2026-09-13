import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';

const secret = "my-super-secret-key-12345";

(async () => {
  console.log('=== RUNNING E2E TEST FOR ETS 2022 TEST 2 AUDIO PLAYBACK ===\n');

  const token = await encode({
    token: { name: "Test Learner", email: "learner@toeic.com", sub: "user-123" },
    secret
  });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await context.addCookies([
    { name: "next-auth.session-token", value: token, domain: "localhost", path: "/", httpOnly: true, sameSite: "Lax" }
  ]);

  const page = await context.newPage();

  // Set onboarding done in localStorage before any navigation
  await page.addInitScript(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '750+');
  });

  let failed = false;

  const checkAudioOnPage = async (url, expectedAudioSubstr, label) => {
    console.log(`Checking ${label}: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for audio element to be attached to DOM
    await page.waitForSelector('audio', { state: 'attached', timeout: 10000 });

    const audioLocator = page.locator('audio');
    const count = await audioLocator.count();
    if (count === 0) {
      console.error(`❌ ${label}: No <audio> element found!`);
      failed = true;
      return;
    }

    const src = await audioLocator.first().getAttribute('src');
    console.log(`  -> Audio src found: ${src}`);

    if (!src || !src.includes(expectedAudioSubstr)) {
      console.error(`❌ ${label}: Audio src does NOT match expected substring "${expectedAudioSubstr}"! Got: "${src}"`);
      failed = true;
      return;
    }

    // Check if audio file can be fetched via standard fetch in browser
    const fetchStatus = await page.evaluate(async (audioSrc) => {
      try {
        const res = await fetch(audioSrc);
        return { ok: res.ok, status: res.status, contentLength: res.headers.get('content-length') };
      } catch (e) {
        return { ok: false, error: e.message };
      }
    }, src);

    if (!fetchStatus.ok) {
      console.error(`❌ ${label}: Audio file returned non-ok HTTP status!`, fetchStatus);
      failed = true;
    } else {
      console.log(`  ✅ ${label}: Audio element found, src="${src}", HTTP ${fetchStatus.status}, Size=${fetchStatus.contentLength} bytes!`);
    }
  };

  try {
    // 1. Part 1 Test 2
    await checkAudioOnPage('http://localhost:3000/part1?test=ets2022_test2', '/audio/ets2022/test2/p1_01.mp3', 'Part 1 Test 2');

    // 2. Part 2 Test 2
    await checkAudioOnPage('http://localhost:3000/part2?test=ets2022_test2', '/audio/ets2022/test2/p2_07.mp3', 'Part 2 Test 2');

    // 3. Part 3 Test 2
    await checkAudioOnPage('http://localhost:3000/part3?test=ets2022_test2', '/audio/ets2022/test2/p3_s01.mp3', 'Part 3 Test 2');

    // 4. Part 4 Test 2
    await checkAudioOnPage('http://localhost:3000/part4?test=ets2022_test2', '/audio/ets2022/test2/p4_s01.mp3', 'Part 4 Test 2');

    // 5. Exam Mode Test 2
    await checkAudioOnPage('http://localhost:3000/exam?test=ets2022_test2', '/audio/ets2022/test2/p1_01.mp3', 'Exam Mode Test 2');

  } catch (err) {
    console.error('❌ E2E exception:', err);
    failed = true;
  } finally {
    await browser.close();
  }

  if (failed) {
    console.error('\n❌ E2E TEST FAILED.');
    process.exit(1);
  } else {
    console.log('\n🎉 E2E TEST 100% PASSED: All ETS 2022 Test 2 audio playback verified with live NextAuth session!');
    process.exit(0);
  }
})();
