import { chromium } from 'playwright';
import assert from 'assert';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();

  console.log('--- Testing Part 3 & 4 Graphic Questions in Exam Mode ---');
  await page.goto('http://localhost:3000/exam?test=ets2022_test2', { waitUntil: 'networkidle' });
  await page.waitForSelector('main');

  // Find question 63 (graphic question in set 11)
  const q63Btn = await page.waitForSelector('button:text-is("63")', { timeout: 10000 });
  await q63Btn.click();
  await page.waitForTimeout(1000);

  // Check if image is rendered and loaded
  const imgElement = await page.$('img[src*="p3_g01.jpg"]');
  assert(imgElement, 'Must render p3_g01.jpg on Q63');
  const naturalWidth = await imgElement.evaluate(el => el.naturalWidth);
  console.log('Q63 Graphic image naturalWidth:', naturalWidth);
  assert(naturalWidth > 0, 'Image must load successfully with naturalWidth > 0');

  await page.screenshot({ path: 'scratch/exam_p3_graphic_verified.png' });
  console.log('PASS: Part 3 graphic question verified on /exam?test=ets2022_test2');

  // Find question 96 (graphic question in set 9 of Part 4)
  const q96Btn = await page.waitForSelector('button:text-is("96")', { timeout: 10000 });
  await q96Btn.click();
  await page.waitForTimeout(1000);

  const img96 = await page.$('img[src*="p4_g01.jpg"]');
  assert(img96, 'Must render p4_g01.jpg on Q96');
  const naturalWidth96 = await img96.evaluate(el => el.naturalWidth);
  console.log('Q96 Graphic image naturalWidth:', naturalWidth96);
  assert(naturalWidth96 > 0, 'Image must load successfully with naturalWidth > 0');

  await page.screenshot({ path: 'scratch/exam_p4_graphic_verified.png' });
  console.log('PASS: Part 4 graphic question verified on /exam?test=ets2022_test2');

  await browser.close();
  console.log('--- ALL GRAPHIC VERIFICATIONS PASSED 100% ---');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
