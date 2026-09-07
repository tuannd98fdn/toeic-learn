import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to localhost:3000, which will redirect to /login
  await page.goto("http://localhost:3000/");
  
  // Wait for the redirect and the login page to fully render
  await page.waitForLoadState("networkidle");
  
  await page.screenshot({ path: "login_page_fixed.png" });
  
  await browser.close();
})();
