import { chromium, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

// Get URL from command line or use default
const args = process.argv.slice(2);
const TARGET_URL = args[0] || 'https://study4.com/tests/2029/ets-toeic-2022-test-1/';

async function crawlToeicTest() {
  console.log('🚀 Khởi động trình duyệt...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  let interceptedData: any = null;

  // Intercept network responses
  page.on('response', async (response) => {
    try {
      const url = response.url();
      // Look for API endpoints that might contain test data. 
      // Study4 usually returns JSON data for exams.
      if (
        response.request().resourceType() === 'fetch' ||
        response.request().resourceType() === 'xhr'
      ) {
        if (url.includes('.json') || url.includes('/api/')) {
          const contentType = response.headers()['content-type'];
          if (contentType && contentType.includes('application/json')) {
            const body = await response.json();

            // Simple heuristic to detect if this JSON is the actual exam payload:
            // It should be an array of questions or an object containing a list of cards/questions.
            // Based on universal_parser, we look for an array of items having `type` and `_id`.
            console.log(`[NETWORK] Bắt được file JSON từ: ${url}`);
            if (Array.isArray(body)) {
              console.log(`[NETWORK] Array có độ dài: ${body.length}`);
              if (body.length > 50) {
                 console.log(`✅ Đã bắt được Exam Payload (Array) từ: ${url}`);
                 interceptedData = body;
              }
            } else if (body.data && Array.isArray(body.data)) {
              console.log(`[NETWORK] Object.data có độ dài: ${body.data.length}`);
              if (body.data.length > 50) {
                 console.log(`✅ Đã bắt được Exam Payload (Object.data) từ: ${url}`);
                 interceptedData = body.data;
              }
            }
          }
        }
      }
    } catch (err) {
      // Ignore errors parsing responses (e.g., preflight requests or non-json bodies)
    }
  });

  console.log(`🌐 Đang điều hướng tới: ${TARGET_URL}`);

  try {
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

    console.log('⏳ Đang chờ trang load và gọi API...');
    // Wait up to 15 seconds for the data to be intercepted
    let waitTime = 0;
    while (!interceptedData && waitTime < 15000) {
      await page.waitForTimeout(1000);
      waitTime += 1000;
    }

    if (interceptedData) {
      const outPath = path.join(__dirname, 'raw_toeic.json');
      fs.writeFileSync(outPath, JSON.stringify(interceptedData, null, 2));
      console.log(`🎉 Đã lưu trữ dữ liệu thô vào: ${outPath}`);
    } else {
      console.log('⚠️ Không tìm thấy API payload nào khớp với cấu trúc đề thi.');
    }
  } catch (error) {
    console.error('❌ Lỗi trong quá trình crawl:', error);
  } finally {
    await browser.close();
  }
}

crawlToeicTest();
