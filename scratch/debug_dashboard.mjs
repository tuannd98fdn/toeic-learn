import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
  });
  const page = await context.newPage();

  page.on('console', (msg) => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', (err) => console.error('PAGE ERROR:', err));

  await page.goto('http://localhost:3000/onboarding');
  await page.evaluate(() => {
    localStorage.setItem('toeic_onboarding_done', 'true');
    localStorage.setItem('toeic_target_score', '750+');
  });

  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(3000);

  const html = await page.content();
  console.log('Page Title:', await page.title());
  console.log('Current URL:', page.url());
  const hasH3 = await page.locator('h3').allTextContents();
  console.log('Found h3 tags:', hasH3);

  await browser.close();
}

run().catch(console.error);
