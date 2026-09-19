import { chromium } from 'playwright';
import fs from 'fs';

async function runTest() {
  console.log('🚀 Starting E2E Verification for Login Back & Guest Escape Hatch...');
  const browser = await chromium.launch({ headless: true });

  try {
    // ----------------------------------------------------
    // TEST 1: Direct visit to /login without credentials
    // ----------------------------------------------------
    console.log('\n--- Test 1: Direct Visit to /login & Back Button Behavior ---');
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    
    // Navigate directly to /login
    await page1.goto('http://localhost:3000/login', { waitUntil: 'networkidle' });

    // Verify elements exist
    const backBtn = await page1.$('#login-back-btn');
    const homeLink = await page1.$('#login-home-link');
    const googleBtn = await page1.$('#login-google-btn');
    const guestBtn = await page1.$('#login-guest-btn');

    if (!backBtn || !homeLink || !googleBtn || !guestBtn) {
      throw new Error(`Missing elements on /login: backBtn=${!!backBtn}, homeLink=${!!homeLink}, googleBtn=${!!googleBtn}, guestBtn=${!!guestBtn}`);
    }
    console.log('✅ All navigation and auth buttons found on /login');

    // Click Back Button when on /login without callbackUrl
    await backBtn.click();
    await page1.waitForURL('**/landing');
    const currentUrlAfterBack = page1.url();
    console.log(`URL after clicking Back button: ${currentUrlAfterBack}`);
    if (!currentUrlAfterBack.includes('/landing')) {
      throw new Error(`Expected redirection to /landing on back click, got: ${currentUrlAfterBack}`);
    }
    console.log('✅ Back button safely navigates away from /login to /landing');
    await context1.close();

    // ----------------------------------------------------
    // TEST 2: Protected route redirect -> Guest Escape Hatch
    // ----------------------------------------------------
    console.log('\n--- Test 2: Protected Route Redirect & Guest Escape Hatch ---');
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();

    // Visit protected route /part5 directly
    await page2.goto('http://localhost:3000/part5', { waitUntil: 'networkidle' });
    console.log(`URL after accessing /part5 unauthenticated: ${page2.url()}`);
    if (!page2.url().includes('/login?callbackUrl=%2Fpart5')) {
      throw new Error(`Expected redirect to /login?callbackUrl=%2Fpart5, got: ${page2.url()}`);
    }
    console.log('✅ Middleware correctly redirected unauthenticated access to /login?callbackUrl=%2Fpart5');

    // Click "Tiếp tục với tư cách Khách" (Guest button)
    const guestBtn2 = await page2.waitForSelector('#login-guest-btn');
    await guestBtn2.click();
    await page2.waitForURL('**/part5');

    console.log(`URL after clicking Guest button: ${page2.url()}`);
    if (!page2.url().includes('/part5')) {
      throw new Error(`Expected navigation to callbackUrl /part5, got: ${page2.url()}`);
    }

    // Verify cookie was set
    const cookies = await context2.cookies();
    const guestCookie = cookies.find(c => c.name === 'toeic_guest_mode');
    if (!guestCookie || guestCookie.value !== '1') {
      throw new Error(`Cookie toeic_guest_mode not set properly: ${JSON.stringify(guestCookie)}`);
    }
    console.log('✅ Cookie toeic_guest_mode=1 successfully set');

    // Reload /part5 to ensure middleware keeps user inside
    await page2.reload({ waitUntil: 'networkidle' });
    if (!page2.url().includes('/part5')) {
      throw new Error(`Middleware bounced user back to login after reload: ${page2.url()}`);
    }
    console.log('✅ Guest mode persists across page reloads without bounce-back!');

    // ----------------------------------------------------
    // TEST 3: Access root / as Guest
    // ----------------------------------------------------
    console.log('\n--- Test 3: Root Route / Access in Guest Mode ---');
    await page2.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    console.log(`URL on / in Guest mode: ${page2.url()}`);
    if (page2.url().includes('/landing') || page2.url().includes('/login')) {
      throw new Error(`Guest mode user redirected unexpectedly away from dashboard: ${page2.url()}`);
    }
    console.log('✅ Guest mode user smoothly lands on main Dashboard /');
    await context2.close();

    // ----------------------------------------------------
    // TEST 4: Mobile Viewport & Screenshot Capture
    // ----------------------------------------------------
    console.log('\n--- Test 4: Mobile Viewport & Visual Quality ---');
    const context3 = await browser.newContext({
      viewport: { width: 375, height: 667 }, // iPhone SE
      isMobile: true
    });
    const page3 = await context3.newPage();
    await page3.goto('http://localhost:3000/login', { waitUntil: 'networkidle' });

    // Verify no horizontal overflow
    const scrollWidth = await page3.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page3.evaluate(() => document.documentElement.clientWidth);
    if (scrollWidth > clientWidth) {
      throw new Error(`Horizontal overflow detected on mobile: scrollWidth=${scrollWidth} > clientWidth=${clientWidth}`);
    }
    console.log(`✅ Mobile layout verified: width=${clientWidth}px, no horizontal scrolling`);

    // Capture mobile screenshot
    await page3.screenshot({ path: 'scratch/login_mobile_verified.png' });
    console.log('📸 Saved mobile screenshot to scratch/login_mobile_verified.png');

    // Capture desktop screenshot
    const context4 = await browser.newContext({
      viewport: { width: 1280, height: 800 }
    });
    const page4 = await context4.newPage();
    await page4.goto('http://localhost:3000/login', { waitUntil: 'networkidle' });
    await page4.screenshot({ path: 'scratch/login_desktop_verified.png' });
    console.log('📸 Saved desktop screenshot to scratch/login_desktop_verified.png');

    // ----------------------------------------------------
    // TEST 5: Strict NO UI EMOJIS Verification
    // ----------------------------------------------------
    console.log('\n--- Test 5: Strict NO UI EMOJIS DOM Scan ---');
    const pageContent = await page4.evaluate(() => document.body.innerText);
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    const emojiMatch = pageContent.match(emojiRegex);
    if (emojiMatch) {
      throw new Error(`Forbidden emoji detected in login DOM: ${emojiMatch[0]}`);
    }
    console.log('✅ Strict NO UI EMOJIS verified: 0 emoji detected in DOM');

    console.log('\n🎉 ALL 5 E2E TESTS PASSED 100%!');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTest();
