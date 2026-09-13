import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';

const secret = "my-super-secret-key-12345";

async function run() {
  console.log('🚀 Starting Learning Content E2E Test...');
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

  // 1. Check Part 1 Explanation
  console.log('Step 1: Testing Part 1 Vietnamese Explanation...');
  await page.goto('http://localhost:3000/part1?test=ets2022_test1');
  await page.waitForTimeout(1500);

  // Click option D and check explanation
  const optionD = page.locator('button:has-text("(D)")').first();
  await optionD.click();
  await page.waitForTimeout(500);

  // Explanation should contain Vietnamese keywords
  const bodyText = await page.innerText('body');
  const hasP1Explanation = bodyText.includes('ba lô trên vai') || bodyText.includes('miêu tả chính xác');
  console.log('  Part 1 Explanation rendered in Vietnamese:', hasP1Explanation ? 'PASSED' : 'FAILED');
  if (!hasP1Explanation) {
    throw new Error('Part 1 explanation did not render Vietnamese text!');
  }

  // 2. Check Part 2 Explanation
  console.log('Step 2: Testing Part 2 Vietnamese Explanation & Question Tag...');
  await page.goto('http://localhost:3000/part2?test=ets2022_test1');
  await page.waitForTimeout(1500);

  // Select option B and submit/check
  const optionB = page.locator('button:has-text("(B)")').first();
  await optionB.click();
  await page.waitForTimeout(500);

  const p2BodyText = await page.innerText('body');
  const hasP2Explanation = p2BodyText.includes('Toronto') && p2BodyText.includes('Dĩ nhiên rồi');
  console.log('  Part 2 Explanation rendered in Vietnamese:', hasP2Explanation ? 'PASSED' : 'FAILED');
  if (!hasP2Explanation) {
    throw new Error('Part 2 explanation did not render Vietnamese text!');
  }

  // 3. Check Part 3 Explanation
  console.log('Step 3: Testing Part 3 Vietnamese Explanation (previously empty)...');
  await page.goto('http://localhost:3000/part3?test=ets2022_test1');
  await page.waitForTimeout(1500);

  // Switch to or view question review
  // Submit answers to see explanations
  const firstOption = page.locator('input[type="radio"], button').first();
  if (await firstOption.isVisible()) {
    await firstOption.click();
  }

  // Check data via page evaluate directly from fetch
  const p3Data = await page.evaluate(async () => {
    const res = await fetch('/data/ets2022/test1/part3.json');
    return await res.json();
  });
  const q32Explanation = p3Data[0].questions[0].explanation;
  console.log('  Part 3 Q32 Explanation non-empty and Vietnamese:', q32Explanation.includes('ngân sách') ? 'PASSED' : 'FAILED');
  if (!q32Explanation.includes('ngân sách')) {
    throw new Error('Part 3 Q32 explanation is missing or invalid!');
  }

  // 4. Check Part 4 Explanation
  console.log('Step 4: Testing Part 4 Vietnamese Explanation (previously empty)...');
  const p4Data = await page.evaluate(async () => {
    const res = await fetch('/data/ets2022/test1/part4.json');
    return await res.json();
  });
  const q71Explanation = p4Data[0].questions[0].explanation;
  console.log('  Part 4 Q71 Explanation non-empty and Vietnamese:', q71Explanation.includes('chương trình radio') ? 'PASSED' : 'FAILED');
  if (!q71Explanation.includes('chương trình radio')) {
    throw new Error('Part 4 Q71 explanation is missing or invalid!');
  }

  await browser.close();
  console.log('\n🎉 ALL LEARNING CONTENT E2E CHECKS PASSED WITH 100% SUCCESS!');
}

run().catch(err => {
  console.error('❌ E2E TEST FAILED:', err);
  process.exit(1);
});
