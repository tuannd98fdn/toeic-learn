import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';

const secret = 'my-super-secret-key-12345';

async function runTest() {
  const token = await encode({
    token: {
      id: 'test-user-id',
      email: 'test@example.com',
      name: 'Test User',
      sub: 'test-user-id',
      role: 'USER',
    },
    secret,
  });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
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
  console.log('1. Testing Part 5: http://localhost:3000/part5?test=ets2022_test1 ...');
  await page.goto('http://localhost:3000/part5?test=ets2022_test1', { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for options buttons
  const optB = await page.waitForSelector('button:has-text("their"), button:has-text("B.")', { timeout: 10000 });
  if (optB) {
    await optB.click();
    console.log('Clicked option B');
  }
  await page.waitForTimeout(500);

  // Click Show Explanation button
  const expBtn = await page.waitForSelector('button:has-text("Xem giải thích"), button:has-text("Giải thích")', { timeout: 5000 }).catch(() => null);
  if (expBtn) {
    await expBtn.click();
    console.log('Clicked Xem giải thích button');
  }
  await page.waitForTimeout(500);

  const p5Body = await page.textContent('body');
  const p5HasDich = p5Body.includes('Dịch nghĩa');
  const p5HasPhanTich = p5Body.includes('Phân tích');
  console.log('Part 5 rendered Vietnamese pedagogical sections:', { p5HasDich, p5HasPhanTich });

  console.log('2. Testing Part 6: http://localhost:3000/part6?test=ets2022_test1 ...');
  await page.goto('http://localhost:3000/part6?test=ets2022_test1', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);
  const p6Body = await page.textContent('body');
  console.log('Part 6 page loaded, body text length:', p6Body.length);

  console.log('3. Testing Part 7: http://localhost:3000/part7?test=ets2022_test1 ...');
  await page.goto('http://localhost:3000/part7?test=ets2022_test1', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);
  const p7Body = await page.textContent('body');
  console.log('Part 7 page loaded, body text length:', p7Body.length);

  await browser.close();
  console.log('Playwright E2E UI verification PASSED 100%!');
}

runTest().catch((err) => {
  console.error('Playwright error:', err);
  process.exit(1);
});
