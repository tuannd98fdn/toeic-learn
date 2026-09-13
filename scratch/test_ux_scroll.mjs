import { chromium } from 'playwright';

async function testPages() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ 
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' }
  });
  const page = await context.newPage();

  console.log('--- Checking Part 5 ---');
  await page.goto('http://localhost:3000/part5?test=ets2022_test1');
  await page.waitForSelector('[class*="questionCard"]', { timeout: 10000 });
  
  const scrollHeightBefore = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log('Part 5 initial scrollHeight:', scrollHeightBefore);

  const options = await page.$$('[class*="optionBtn"]');
  console.log('Found options count:', options.length);
  if (options.length > 0) {
    await options[0].click();
    await page.waitForTimeout(600);

    const expBtn = await page.$('button[class*="explanationToggleBtn"]');
    if (expBtn) {
      const expBtnBox = await expBtn.boundingBox();
      console.log('Exp Toggle Button Bounding Box:', expBtnBox);
      console.log('Is Exp Toggle visible in 800px viewport without scrolling?', expBtnBox && expBtnBox.y + expBtnBox.height <= 800);

      await expBtn.click();
      await page.waitForTimeout(600);
      const expContent = await page.$('[class*="explanationBoxContent"]');
      const expBox = await expContent?.boundingBox();
      console.log('Exp Content Bounding Box:', expBox);
      const footer = await page.$('[class*="PracticeFooter_footer"]');
      const footerBox = await footer?.boundingBox();
      console.log('Footer Bounding Box:', footerBox);

      const totalScrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      console.log('Part 5 total scrollHeight after expanding:', totalScrollHeight);
    }
  }

  console.log('\n--- Checking Part 1 ---');
  await page.goto('http://localhost:3000/part1');
  await page.waitForSelector('[class*="card"]', { timeout: 10000 });
  const p1Options = await page.$$('[class*="optionBtn"]');
  if (p1Options.length > 0) {
    await p1Options[0].click();
    await page.waitForTimeout(600);
    const transcript = await page.$('[class*="InteractiveTranscript_container"]');
    const tBox = await transcript?.boundingBox();
    console.log('Part 1 Transcript Bounding Box:', tBox);
    const scrollH = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log('Part 1 total scrollHeight after answering:', scrollH);
  }

  console.log('\n--- Checking Part 2 ---');
  await page.goto('http://localhost:3000/part2');
  await page.waitForSelector('[class*="card"]', { timeout: 10000 });
  const p2Options = await page.$$('[class*="optionBtn"]');
  if (p2Options.length > 0) {
    await p2Options[0].click();
    await page.waitForTimeout(600);
    const transcript = await page.$('[class*="InteractiveTranscript_container"]');
    const tBox = await transcript?.boundingBox();
    console.log('Part 2 Transcript Bounding Box:', tBox);
    const scrollH = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log('Part 2 total scrollHeight after answering:', scrollH);
  }

  console.log('\n--- Checking Part 3 ---');
  await page.goto('http://localhost:3000/part3');
  await page.waitForSelector('[class*="questionItem"]', { timeout: 10000 });
  // Answer all 3 questions in set
  const p3Opts = await page.$$('[class*="optionBtn"]');
  if (p3Opts.length >= 3) {
    await p3Opts[0].click();
    await p3Opts[4].click();
    await p3Opts[8].click();
    const submitSet = await page.$('button[class*="submitBtn"]');
    if (submitSet) await submitSet.click();
    await page.waitForTimeout(600);
    const scrollH = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log('Part 3 total scrollHeight after answering set:', scrollH);
    const explanations = await page.$$('div:has-text("Lời giải chi tiết:")');
    console.log('Part 3 explanations count:', explanations.length);
    if (explanations.length > 0) {
      console.log('Part 3 first explanation box:', await explanations[0].boundingBox());
      console.log('Part 3 last explanation box:', await explanations[explanations.length - 1].boundingBox());
    }
  }

  console.log('\n--- Checking Part 6 ---');
  await page.goto('http://localhost:3000/part6');
  await page.waitForSelector('[class*="splitView"]', { timeout: 10000 });
  for (let i = 1; i <= 4; i++) {
    const opts = await page.$$('[class*="optionBtn"]');
    if (opts.length > 0) await opts[0].click();
    const nextBtn = await page.$('button:has-text("Câu tiếp")');
    if (nextBtn && await nextBtn.isEnabled()) await nextBtn.click();
    await page.waitForTimeout(200);
  }
  const submitBtn = await page.$('button:has-text("Nộp bài & Xem giải thích")');
  if (submitBtn) {
    await submitBtn.click();
    await page.waitForTimeout(600);
    const exCards = await page.$$('[class*="explanationCard"]');
    console.log('Part 6 explanation cards count:', exCards.length);
    if (exCards.length > 0) {
      const firstBox = await exCards[0].boundingBox();
      const lastBox = await exCards[exCards.length - 1].boundingBox();
      console.log('Part 6 first exp card:', firstBox);
      console.log('Part 6 last exp card:', lastBox);
    }
  }

  console.log('\n--- Checking Part 7 ---');
  await page.goto('http://localhost:3000/part7');
  await page.waitForSelector('[class*="splitView"]', { timeout: 10000 });
  let canContinue = true;
  while (canContinue) {
    const opts = await page.$$('[class*="optionBtn"]');
    if (opts.length > 0) await opts[0].click();
    const nextQ = await page.$('button:has-text("Câu tiếp theo")');
    if (nextQ && await nextQ.isEnabled()) {
      await nextQ.click();
      await page.waitForTimeout(200);
    } else {
      canContinue = false;
    }
  }
  const p7Submit = await page.$('button:has-text("Nộp bài & Xem giải thích")');
  if (p7Submit) {
    await p7Submit.click();
    await page.waitForTimeout(600);
    const exCards = await page.$$('[class*="explanationCard"]');
    console.log('Part 7 explanation cards count:', exCards.length);
    if (exCards.length > 0) {
      const firstBox = await exCards[0].boundingBox();
      const lastBox = await exCards[exCards.length - 1].boundingBox();
      console.log('Part 7 first exp card:', firstBox);
      console.log('Part 7 last exp card:', lastBox);
    }
  }

  await browser.close();
}

testPages().catch(console.error);
