import { chromium } from 'playwright';

async function verifyPart1() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });

  await page.goto('http://localhost:3000/part1');
  await page.waitForTimeout(1000);
  
  // Press key A
  console.log('Pressing Key A...');
  await page.keyboard.press('a');
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'scratch/p1_answered.png' });
  console.log('Screenshot saved to scratch/p1_answered.png');

  await browser.close();
}

verifyPart1().catch(console.error);
