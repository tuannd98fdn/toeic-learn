import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  page.on('response', async (res) => {
    const url = res.url();
    if (url.includes('.json') || url.includes('/api/')) {
      console.log('API response:', url, res.status());
      try {
        const json = await res.json();
        if (Array.isArray(json)) {
          console.log('-> Array with length:', json.length);
        } else if (json && json.data) {
          console.log('-> Object.data length:', Array.isArray(json.data) ? json.data.length : typeof json.data);
        }
      } catch (e) {}
    }
  });

  console.log('Navigating to https://study4.com/tests/6853/practice/?selected_parts=5...');
  try {
    await page.goto('https://study4.com/tests/6853/practice/?selected_parts=5', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('Page loaded, title:', await page.title());
    console.log('Current URL:', page.url());
    await page.waitForTimeout(5000);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
})();
