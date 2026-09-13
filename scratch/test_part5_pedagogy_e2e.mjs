import { chromium } from 'playwright';

async function testPart5Pedagogy() {
  console.log('=== STARTING E2E PLAYWRIGHT TEST: PART 5 PEDAGOGY & BEGINNER FRIENDLY ===');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: {
      'x-playwright-test': 'true'
    }
  });
  const page = await context.newPage();

  try {
    // 1. Visit Part 5 with subCategory=Word Form
    console.log('1. Navigating to /part5?subCategory=Word%20Form...');
    await page.goto('http://localhost:3000/part5?subCategory=Word%20Form', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // 2. Verify Mode Switcher
    console.log('2. Checking Mode Switcher...');
    const studyModeBtn = page.locator('button:has-text("Học kỹ (Không áp lực giờ)")');
    const speedModeBtn = page.locator('button:has-text("Tốc độ (20s)")');
    await studyModeBtn.waitFor({ state: 'visible', timeout: 5000 });
    await speedModeBtn.waitFor({ state: 'visible', timeout: 5000 });

    const isStudyActive = await studyModeBtn.evaluate(el => el.className.includes('modeBtnActive'));
    console.log('Study mode active by default:', isStudyActive);
    if (!isStudyActive) throw new Error('Study mode should be active by default!');

    // 3. Verify Grammar Cheatsheet Card
    console.log('3. Checking Grammar Cheatsheet Card...');
    const cheatsheetCard = page.locator('span:has-text("Chuyên Đề: Từ Loại (Word Form)")');
    await cheatsheetCard.waitFor({ state: 'visible', timeout: 5000 });

    const toggleCheatsheetBtn = page.locator('button:has-text("Xem tóm tắt lý thuyết")');
    await toggleCheatsheetBtn.click();
    await page.waitForTimeout(500);

    // Check expanded content
    const formulaBox = page.locator('strong:has-text("Công thức cốt lõi:")');
    await formulaBox.waitFor({ state: 'visible', timeout: 3000 });
    console.log('Grammar Cheatsheet expanded successfully with formula box.');

    // Collapse cheatsheet
    const collapseCheatsheetBtn = page.locator('button:has-text("Thu gọn lý thuyết")');
    await collapseCheatsheetBtn.click();
    await page.waitForTimeout(500);

    // 4. Verify Clue Hint Feature
    console.log('4. Testing Clue Hint (Gợi ý manh mối)...');
    const clueHintBtn = page.locator('button:has-text("Gợi ý manh mối tư duy")');
    await clueHintBtn.waitFor({ state: 'visible', timeout: 5000 });
    await clueHintBtn.click();
    await page.waitForTimeout(500);

    const clueBox = page.locator('span:has-text("Manh Mối Tư Duy (Clue Hint)")');
    await clueBox.waitFor({ state: 'visible', timeout: 3000 });
    console.log('Clue Hint box opened with guidance text.');

    // 5. Answer Question & Verify Syntax Visualizer
    console.log('5. Answering question and testing Syntax Visualizer...');
    // Click option B (or first available option)
    const optionBtns = page.locator('button[class*="optionBtn"]');
    await optionBtns.first().click();
    await page.waitForTimeout(500);

    // Click to view explanation
    const explanationBtn = page.locator('button:has-text("Xem giải thích ngữ pháp chi tiết")');
    await explanationBtn.click();
    await page.waitForTimeout(500);

    // Verify Syntax Visualizer
    const syntaxBox = page.locator('[class*="syntaxVisualizerTitle"]');
    await syntaxBox.waitFor({ state: 'visible', timeout: 5000 });

    const subjectTag = page.locator('span:has-text("Chủ ngữ (Subject)")');
    const verbTag = page.locator('span:has-text("Động từ chính (Verb)")');
    await subjectTag.waitFor({ state: 'visible', timeout: 3000 });
    await verbTag.waitFor({ state: 'visible', timeout: 3000 });
    console.log('Syntax Visualizer rendered successfully with Subject and Verb tags.');

    // Verify 3-part explanation presence
    const explanationContent = await page.locator('div[class*="explanationBoxContent"]').innerText();
    const hasDichNghia = explanationContent.includes('Dịch nghĩa');
    const hasPhanTich = explanationContent.includes('Phân tích');
    const hasMeo = explanationContent.includes('Mẹo');
    console.log(`Explanation 3-part check: Dịch nghĩa (${hasDichNghia}), Phân tích (${hasPhanTich}), Mẹo (${hasMeo})`);
    if (!hasDichNghia || !hasPhanTich || !hasMeo) {
      throw new Error('Explanation missing 3-part pedagogical structure!');
    }

    // 6. Switch to Speed Mode
    console.log('6. Switching to Speed Mode (20s)...');
    await speedModeBtn.click();
    await page.waitForTimeout(500);
    const isSpeedActive = await speedModeBtn.evaluate(el => el.className.includes('modeBtnActive'));
    if (!isSpeedActive) throw new Error('Speed mode should now be active!');
    console.log('Speed Mode activated successfully.');

    // 7. Test on Mobile Viewport (390px)
    console.log('7. Testing on Mobile Viewport (390px iPhone)...');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(500);
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    console.log('Mobile scrollWidth:', bodyWidth, '(target <= 390)');
    if (bodyWidth > 400) throw new Error(`Mobile layout overflowed! scrollWidth=${bodyWidth}`);

    console.log('\nALL E2E PLAYWRIGHT TESTS PASSED SUCCESSFULLY! 10/10 PEDAGOGY VERIFIED!');
  } catch (err) {
    console.error('Test failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testPart5Pedagogy();
