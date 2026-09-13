import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';

const secret = "my-super-secret-key-12345";

async function main() {
  console.log('Testing Part 3 & 4 Live UI Explanations...');
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

  // Part 3
  console.log('Visiting Part 3...');
  await page.goto("http://localhost:3000/part3?test=ets2022_test1", { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('button[class*="optionBtn"]', { timeout: 5000 });

  const p3Buttons = await page.$$('button[class*="optionBtn"]');
  console.log(`Found ${p3Buttons.length} option buttons in Part 3`);
  // Click option for question 1 (index 0), question 2 (index 4), question 3 (index 8)
  if (p3Buttons.length >= 12) {
    await p3Buttons[0].click();
    await p3Buttons[4].click();
    await p3Buttons[8].click();
  }
  await page.waitForTimeout(500);

  const submitBtn = page.locator('button:has-text("Nộp bài Set này")');
  console.log('Submitting Part 3 set...');
  await submitBtn.click();
  await page.waitForTimeout(1000);

  const p3Text = await page.innerText('body');
  const p3Pass = p3Text.includes('Lời giải chi tiết:') && p3Text.includes('ngân sách');
  console.log('Part 3 Live Explanation check:', p3Pass ? 'PASSED' : 'FAILED');

  // Part 4
  console.log('Visiting Part 4...');
  await page.goto("http://localhost:3000/part4?test=ets2022_test1", { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('button[class*="optionBtn"]', { timeout: 5000 });

  const p4Buttons = await page.$$('button[class*="optionBtn"]');
  console.log(`Found ${p4Buttons.length} option buttons in Part 4`);
  if (p4Buttons.length >= 12) {
    await p4Buttons[0].click();
    await p4Buttons[4].click();
    await p4Buttons[8].click();
  }
  await page.waitForTimeout(500);

  const p4SubmitBtn = page.locator('button:has-text("Nộp bài Set này")');
  console.log('Submitting Part 4 set...');
  await p4SubmitBtn.click();
  await page.waitForTimeout(1000);

  const p4Text = await page.innerText('body');
  const p4Pass = p4Text.includes('Lời giải chi tiết:') && p4Text.includes('chuyên gia chuyên nghiên cứu');
  console.log('Part 4 Live Explanation check:', p4Pass ? 'PASSED' : 'FAILED');

  await browser.close();

  if (!p3Pass || !p4Pass) {
    process.exit(1);
  }
  console.log('\n🎉 ALL PART 3 & PART 4 LIVE EXPLANATIONS DISPLAYED PERFECTLY IN THE UI!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
