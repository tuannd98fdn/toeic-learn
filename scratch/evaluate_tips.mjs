import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    extraHTTPHeaders: {
      'x-playwright-test': 'true'
    }
  });

  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000/tips on Desktop...');
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/tips', { waitUntil: 'networkidle' });

  // Take desktop screenshot
  await page.screenshot({ path: 'scratch/tips_desktop_initial.png', fullPage: false });

  // Check title, count of tips
  const title = await page.locator('h1').innerText();
  const tipCardsCount = await page.locator('article').count();
  console.log(`Title: ${title}, Tip cards rendered: ${tipCardsCount}`);

  // Test search
  const searchInput = page.locator('input[type="text"]');
  await searchInput.fill('being');
  await page.waitForTimeout(300);
  const searchCount = await page.locator('article').count();
  console.log(`Search 'being' returned: ${searchCount} cards`);
  await page.screenshot({ path: 'scratch/tips_desktop_search.png' });

  // Reset search
  await page.locator('button:has-text("Đặt lại bộ lọc")').click();
  await page.waitForTimeout(300);

  // Test Part filter
  await page.locator('button:has-text("Part 5: Điền câu")').click();
  await page.waitForTimeout(300);
  const part5Count = await page.locator('article').count();
  console.log(`Part 5 filter returned: ${part5Count} cards`);
  await page.screenshot({ path: 'scratch/tips_desktop_part5.png' });

  // Test Mobile view
  console.log('Testing Mobile View (375x812)...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.screenshot({ path: 'scratch/tips_mobile_initial.png', fullPage: false });

  // Check for emojis in DOM
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
  const bodyText = await page.locator('body').innerText();
  const hasEmoji = emojiRegex.test(bodyText);
  console.log(`DOM contains emoji: ${hasEmoji}`);

  // Check bottom padding / overlap
  const containerPaddingBottom = await page.evaluate(() => {
    const el = document.querySelector('div[class*="container"]');
    return el ? window.getComputedStyle(el).paddingBottom : 'none';
  });
  console.log(`Container padding bottom: ${containerPaddingBottom}`);

  await browser.close();
  console.log('Evaluation complete!');
}

main().catch(console.error);
