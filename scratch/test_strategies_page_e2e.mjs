import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';
import path from 'path';

const secret = "my-super-secret-key-12345";
const artifactDir = "/Users/bravee06/.gemini/antigravity-ide/brain/18c994e6-6d56-44e0-bd71-9339ae12483f";

async function run() {
  const token = await encode({
    token: {
      name: "Test Learner",
      email: "learner@toeic.com",
      sub: "user-123"
    },
    secret
  });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

  await context.addCookies([
    {
      name: "next-auth.session-token",
      value: token,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax"
    }
  ]);

  const page = await context.newPage();

  console.log('=== Step 1: Navigating to /tips ===');
  await page.goto('http://localhost:3000/tips');
  await page.waitForTimeout(1500);

  // Check initial count
  const initialCountText = await page.innerText('span[class*="resultCount"]');
  console.log('Initial count text:', initialCountText);
  if (!initialCountText.includes('30 / 30')) {
    throw new Error(`Expected 30 / 30 tips, got: ${initialCountText}`);
  }

  // Check UI Emojis
  const pageText = await page.innerText('body');
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u2300-\u23FF\u2600-\u26FF\u2700-\u27BF]/u;
  const hasEmoji = emojiRegex.test(pageText);
  console.log('NO UI Emojis check:', !hasEmoji ? 'PASSED (0 emojis)' : 'FAILED (emojis found!)');
  if (hasEmoji) {
    throw new Error('Found emoji in /tips page!');
  }

  console.log('=== Step 2: Testing Part Filter (Part 1) ===');
  const part1Pill = await page.$('button:has-text("Part 1: Tranh")');
  if (!part1Pill) throw new Error('Part 1 filter pill not found!');
  await part1Pill.click();
  await page.waitForTimeout(300);

  const part1CountText = await page.innerText('span[class*="resultCount"]');
  console.log('Part 1 count text:', part1CountText);
  if (!part1CountText.includes('4 / 30')) {
    throw new Error(`Expected 4 / 30 for Part 1, got: ${part1CountText}`);
  }

  console.log('=== Step 3: Testing Type Filter (Bẫy đề thi) ===');
  // Reset part filter first
  const allPartPill = await page.$('button:has-text("Tất cả Part")');
  await allPartPill.click();
  await page.waitForTimeout(300);

  const trapPill = await page.$('button:has-text("Bẫy đề thi (Traps)")');
  if (!trapPill) throw new Error('Trap filter pill not found!');
  await trapPill.click();
  await page.waitForTimeout(300);

  const trapCountText = await page.innerText('span[class*="resultCount"]');
  console.log('Trap count text:', trapCountText);
  // Verify trap warning boxes exist
  const trapBoxes = await page.$$('div[class*="trapBox"]');
  console.log('Visible Trap Warning Boxes:', trapBoxes.length);
  if (trapBoxes.length === 0) {
    throw new Error('Expected visible trap warning boxes for traps!');
  }

  console.log('=== Step 4: Testing Search Filter ===');
  // Reset type filter to all first
  const allTypePill = await page.$('button:has-text("Tất cả loại")');
  if (allTypePill) await allTypePill.click();
  await page.waitForTimeout(200);

  const searchInput = await page.$('input[class*="searchInput"]');
  await searchInput.fill('paraphrasing');
  await page.waitForTimeout(300);

  const searchCountText = await page.innerText('span[class*="resultCount"]');
  console.log('Search "paraphrasing" count text:', searchCountText);
  const cardTitles = await page.$$eval('h3[class*="tipTitle"]', els => els.map(e => e.textContent));
  console.log('Matching tip titles:', cardTitles);
  if (cardTitles.length === 0) {
    throw new Error('Expected at least 1 match for "paraphrasing"!');
  }

  console.log('=== Step 5: Testing Reset Filters ===');
  const resetBtn = await page.$('button:has-text("Đặt lại bộ lọc")');
  if (!resetBtn) throw new Error('Reset button not found!');
  await resetBtn.click();
  await page.waitForTimeout(300);

  const resetCountText = await page.innerText('span[class*="resultCount"]');
  console.log('After reset count text:', resetCountText);
  if (!resetCountText.includes('30 / 30')) {
    throw new Error(`Expected 30 / 30 after reset, got: ${resetCountText}`);
  }

  // Take screenshot
  await page.screenshot({ path: path.join(artifactDir, 'strategies_traps_page.png'), fullPage: false });
  console.log('Saved screenshot: strategies_traps_page.png');

  console.log('=== Step 6: Testing 1-Click Practice CTA Navigation ===');
  // Find a Part 5 practice CTA link
  const part5PracticeBtn = await page.$('a[href*="/part5?subCategory="]');
  if (part5PracticeBtn) {
    const practiceHref = await part5PracticeBtn.getAttribute('href');
    console.log('Clicking practice button leading to:', practiceHref);
    await part5PracticeBtn.click();
    await page.waitForTimeout(1500);
    const destinationUrl = page.url();
    console.log('Navigated to:', destinationUrl);
    if (!destinationUrl.includes('/part5?subCategory=')) {
      throw new Error(`Expected navigation to /part5?subCategory=..., got: ${destinationUrl}`);
    }
  }

  console.log('\nAll TOEIC Strategies & Traps E2E tests PASSED successfully!');
  await browser.close();
}

run().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
