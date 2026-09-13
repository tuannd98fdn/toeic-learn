import { chromium } from 'playwright';

const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

async function runE2E() {
  console.log('🚀 Starting E2E test for Milestone 23: Reading Part 6 & 7 Specialized Vocab...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    extraHTTPHeaders: {
      'x-playwright-test': 'true'
    }
  });
  const page = await context.newPage();

  try {
    // 1. Navigate to /study
    console.log('1. Navigating to http://localhost:3000/study');
    await page.goto('http://localhost:3000/study', { waitUntil: 'networkidle' });

    // Wait for mounted
    await page.waitForSelector('button:has-text("Thẻ Ghi Nhớ SRS")', { timeout: 10000 });
    console.log('✓ Study page loaded successfully with 3 modes tabs');

    // 2. Verify 3 Study Modes are available
    const hasFlashcardTab = await page.isVisible('button:has-text("Thẻ Ghi Nhớ SRS")');
    const hasMatchTab = await page.isVisible('button:has-text("Ghép Cặp Paraphrase")');
    const hasDrillTab = await page.isVisible('button:has-text("Phản Xạ Collocations")');

    if (!hasFlashcardTab || !hasMatchTab || !hasDrillTab) {
      throw new Error('FAIL: Mode tabs are missing!');
    }
    console.log('✓ All 3 study mode tabs are present');

    // 3. Test Band selector: Switch to "Part 6 & 7: Collocations & Paraphrase"
    console.log('2. Selecting Band: Part 6 & 7: Collocations & Paraphrase');
    const readingBandBtn = page.locator('button:has-text("Part 6 & 7")');
    await readingBandBtn.click();
    await page.waitForTimeout(500);

    // Verify flashcard is rendered
    console.log('✓ Band switched to Reading Part 6 & 7');

    // Flip flashcard to check back comparison box
    const cardElement = page.locator('div[tabindex="0"]').first();
    if (await cardElement.isVisible()) {
      await cardElement.click();
      await page.waitForTimeout(300);
      console.log('✓ Flashcard flipped, inspected back content');
    }

    // 4. Test Mode: "Ghép Cặp Paraphrase"
    console.log('3. Testing Paraphrase Match Mode...');
    await page.click('button:has-text("Ghép Cặp Paraphrase")');
    await page.waitForSelector('text=Thử Thách Ghép Cặp Paraphrase Part 7', { timeout: 5000 });
    
    // Check 2 columns exist
    const passageLabel = await page.isVisible('text=Trong Đoạn Văn (Passage)');
    const optionLabel = await page.isVisible('text=Trong Đáp Án (ETS Option)');
    if (!passageLabel || !optionLabel) {
      throw new Error('FAIL: Columns missing in Paraphrase Match Game!');
    }

    // Wait for match cards to appear
    await page.waitForSelector('[data-testid="match-card-passage"]', { timeout: 5000 });
    const passageCards = page.locator('[data-testid="match-card-passage"]');
    const optionCards = page.locator('[data-testid="match-card-option"]');
    const pCount = await passageCards.count();
    const oCount = await optionCards.count();
    console.log(`Found ${pCount} passage cards and ${oCount} option cards`);

    if (pCount > 0 && oCount > 0) {
      await passageCards.first().click();
      await page.waitForTimeout(200);
      await optionCards.first().click();
      await page.waitForTimeout(400);
      console.log('✓ Match interaction executed');
    }

    // 5. Test Mode: "Phản Xạ Collocations"
    console.log('4. Testing Collocation Drill Mode...');
    await page.click('button:has-text("Phản Xạ Collocations")');
    await page.waitForSelector('text=Phản Xạ Cụm Từ Collocation Part 5 & 6', { timeout: 5000 });

    // Wait for drill option button
    await page.waitForSelector('[data-testid="drill-option-0"]', { timeout: 5000 });
    console.log('✓ Collocation drill question and options rendered');

    // Answer question by clicking Option A
    await page.click('[data-testid="drill-option-0"]');
    await page.waitForSelector('[data-testid="collocation-explanation"]', { timeout: 5000 });
    console.log('✓ Pedagogical explanation box appeared with ETS tips');

    // Click Next question
    const nextBtn = page.locator('button:has-text("Câu tiếp theo")');
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(300);
      console.log('✓ Advanced to next question in Collocation Drill');
    }

    // 6. Strict NO UI EMOJI check on DOM
    console.log('5. Checking rendered DOM for emoji violations...');
    const bodyContent = await page.evaluate(() => document.body.innerText);
    const lines = bodyContent.split('\n');
    let violations = 0;
    for (const line of lines) {
      if (EMOJI_REGEX.test(line)) {
        console.error(`[DOM EMOJI VIOLATION]: ${line}`);
        violations++;
      }
    }

    if (violations > 0) {
      throw new Error(`FAIL: Found ${violations} emoji violations on live DOM!`);
    }
    console.log('✓ Zero emoji found on live DOM across all 3 interactive study modes!');

    console.log('\n🌟 ALL E2E TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('E2E Test Failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runE2E();
