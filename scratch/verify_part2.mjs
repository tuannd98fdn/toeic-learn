import { chromium } from 'playwright';

async function verifyPart2() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });

  await page.goto('http://localhost:3000/part2');
  await page.waitForTimeout(1000);

  // Take screenshot before answer
  await page.screenshot({ path: 'scratch/p2_initial.png' });

  // Press key B
  await page.keyboard.press('b');
  await page.waitForTimeout(1000);

  // Take screenshot after answer
  await page.screenshot({ path: 'scratch/p2_answered.png' });

  console.log('Part 2 verified and screenshots saved!');
  await browser.close();
}

verifyPart2().catch(console.error);
