import { chromium, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const TARGET_URL = 'https://study4.com/tests/2029/ets-toeic-2022-test-1/'; 

async function crawlToeicTest() {
  console.log('🚀 Khởi động trình duyệt...');
  const browser = await chromium.launch({ headless: true }); 
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  console.log(`🌐 Đang điều hướng tới: ${TARGET_URL}`);
  
  try {
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Study4 requires checking out their layout. Let's wait a bit.
    await page.waitForTimeout(5000);
    
    console.log('📸 Đang chụp ảnh màn hình...');
    await page.screenshot({ path: path.join(__dirname, 'test_page.png'), fullPage: true });

    console.log('📝 Đang trích xuất HTML để phân tích cấu trúc...');
    const bodyText = await page.evaluate(() => document.body.innerText);
    const bodyHtml = await page.evaluate(() => document.body.innerHTML);
    
    fs.writeFileSync(path.join(__dirname, 'page_text.txt'), bodyText);
    fs.writeFileSync(path.join(__dirname, 'page_html.txt'), bodyHtml);

    console.log('✅ Đã lưu page_text.txt và page_html.txt để phân tích DOM.');
    
  } catch (error) {
    console.error('❌ Lỗi trong quá trình crawl:', error);
  } finally {
    await browser.close();
  }
}

crawlToeicTest();
