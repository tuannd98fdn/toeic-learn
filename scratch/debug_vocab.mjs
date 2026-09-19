import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';

const secret = "my-super-secret-key-12345";

async function check() {
  const token = await encode({
    token: { name: "Test Learner", email: "learner@toeic.com", sub: "user-123" },
    secret
  });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  await context.addCookies([
    { name: "next-auth.session-token", value: token, domain: "localhost", path: "/" }
  ]);

  const page = await context.newPage();
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.error('BROWSER PAGEERROR:', err));

  console.log('Navigating to /vocabulary...');
  const res = await page.goto('http://localhost:3000/vocabulary');
  console.log('Status:', res.status());

  await page.waitForTimeout(3000);
  const html = await page.content();
  console.log('Page Title:', await page.title());
  console.log('HTML snippet:', html.slice(0, 500));
  await page.screenshot({ path: 'scratch/vocab_debug.png' });
  console.log('Screenshot saved to scratch/vocab_debug.png');

  await browser.close();
}

check().catch(console.error);
