import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';
import path from 'path';

const secret = "my-super-secret-key-12345";
const artifactDir = "/Users/bravee06/.gemini/antigravity-ide/brain/5090bfc9-546c-41b8-a33b-337095ff2e24";

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

  // Helper for emoji check
  const checkNoEmojis = async (pageName) => {
    const pageText = await page.innerText('body');
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u2300-\u23FF\u2600-\u26FF\u2700-\u27BF]/u;
    const hasEmoji = emojiRegex.test(pageText);
    console.log(`[${pageName}] NO UI Emojis check:`, !hasEmoji ? 'PASSED (0 emojis)' : 'FAILED (emojis found!)');
    if (hasEmoji) {
      throw new Error(`Found emoji in ${pageName}!`);
    }
  };

  console.log('\n=== TEST 1: Part 1 Photographs (Dictation & Interactive Transcript) ===');
  await page.goto('http://localhost:3000/part1?test=ets2022_test1');
  await page.waitForTimeout(1500);

  await checkNoEmojis('Part 1 Standard');

  // Verify Mode Tabs
  const dictationTabP1 = await page.$('button:has-text("Chép chính tả (Dictation)")');
  const transcriptTabP1 = await page.$('button:has-text("Lời thoại tương tác")');
  const etsTabP1 = await page.$('button:has-text("Làm bài ETS")');

  if (!dictationTabP1 || !transcriptTabP1 || !etsTabP1) {
    throw new Error('Mode switcher tabs missing in Part 1!');
  }

  // Switch to Dictation Mode
  console.log('-> Switching to Dictation mode on Part 1...');
  await dictationTabP1.click();
  await page.waitForTimeout(500);

  // Check Cloze Mode elements
  const clozeInputs = await page.$$('input[class*="clozeInput"]');
  console.log(`Found ${clozeInputs.length} Cloze input blanks`);
  if (clozeInputs.length === 0) {
    throw new Error('No Cloze input blanks found in Dictation Mode!');
  }

  // Click "Gợi ý chữ cái đầu"
  const hintBtn = await page.$('button:has-text("Gợi ý chữ cái đầu")');
  if (hintBtn) {
    await hintBtn.click();
    await page.waitForTimeout(300);
  }

  // Click "Hiện đáp án"
  const revealBtn = await page.$('button:has-text("Hiện đáp án")');
  if (!revealBtn) throw new Error('Reveal button missing!');
  await revealBtn.click();
  await page.waitForTimeout(300);

  // Click "Kiểm tra từ điền"
  const checkClozeBtn = await page.$('button:has-text("Kiểm tra từ điền")');
  await checkClozeBtn.click();
  await page.waitForTimeout(400);

  const passedBadge = await page.$('span[class*="passed"]');
  console.log('Cloze test evaluation:', passedBadge ? 'PASSED' : 'NOT DETECTED');

  // Switch to Full Sentence Dictation
  console.log('-> Switching to Full Sentence Dictation mode...');
  const fullModeBtn = await page.$('button:has-text("Chép cả câu (Full)")');
  await fullModeBtn.click();
  await page.waitForTimeout(300);

  const textarea = await page.$('textarea[class*="fullTextarea"]');
  if (!textarea) throw new Error('Full dictation textarea missing!');

  await textarea.fill("They're greeting each other.");
  const checkFullBtn = await page.$('button:has-text("Kiểm tra chính tả")');
  await checkFullBtn.click();
  await page.waitForTimeout(500);

  const accuracyBadge = await page.$('span[class*="accuracyBadge"]');
  const accText = accuracyBadge ? await accuracyBadge.innerText() : '';
  console.log('Full sentence accuracy evaluation:', accText);

  await page.screenshot({ path: path.join(artifactDir, 'part1_dictation.png') });

  // Switch to Interactive Transcript
  console.log('-> Switching to Interactive Transcript on Part 1...');
  await transcriptTabP1.click();
  await page.waitForTimeout(500);

  const lineItems = await page.$$('div[class*="lineItem"]');
  console.log(`Found ${lineItems.length} lines in Interactive Transcript`);
  if (lineItems.length !== 4) {
    throw new Error(`Expected 4 lines in Part 1 Interactive Transcript, got ${lineItems.length}`);
  }

  const correctTag = await page.$('span[class*="correctTag"]');
  if (!correctTag) throw new Error('Correct answer tag missing in Interactive Transcript!');
  console.log('Correct answer tag:', await correctTag.innerText());

  await page.screenshot({ path: path.join(artifactDir, 'part1_transcript.png') });

  // Switch back to Standard mode and test post-answer interactive review
  console.log('-> Answering in Standard mode and verifying post-answer Interactive Transcript...');
  await etsTabP1.click();
  await page.waitForTimeout(400);

  const optionD = await page.$('button:has-text("Option (D)")');
  if (optionD) {
    await optionD.click();
    await page.waitForTimeout(500);

    const postAnswerTranscript = await page.$('div[class*="linesList"]');
    if (!postAnswerTranscript) throw new Error('Post-answer Interactive Transcript not rendered!');
    console.log('Post-answer Interactive Transcript verified!');
  }

  console.log('\n=== TEST 2: Part 2 Question-Response ===');
  await page.goto('http://localhost:3000/part2?test=ets2022_test1');
  await page.waitForTimeout(1500);
  await checkNoEmojis('Part 2');

  const dictationTabP2 = await page.$('button:has-text("Chép chính tả (Dictation)")');
  await dictationTabP2.click();
  await page.waitForTimeout(500);

  const p2ClozeInputs = await page.$$('input[class*="clozeInput"]');
  console.log(`Part 2 Cloze inputs: ${p2ClozeInputs.length}`);
  if (p2ClozeInputs.length === 0) throw new Error('Part 2 Cloze inputs missing!');

  const transcriptTabP2 = await page.$('button:has-text("Lời thoại tương tác")');
  await transcriptTabP2.click();
  await page.waitForTimeout(500);

  const p2Lines = await page.$$('div[class*="lineItem"]');
  console.log(`Part 2 parsed transcript lines: ${p2Lines.length} (Prompt + Options A, B, C)`);
  if (p2Lines.length < 4) throw new Error(`Expected >= 4 lines in Part 2, got ${p2Lines.length}`);

  await page.screenshot({ path: path.join(artifactDir, 'part2_interactive.png') });

  console.log('\n=== TEST 3: Part 3 Conversations ===');
  await page.goto('http://localhost:3000/part3?test=ets2022_test1');
  await page.waitForTimeout(1500);
  await checkNoEmojis('Part 3');

  const transcriptTabP3 = await page.$('button:has-text("Lời thoại tương tác")');
  await transcriptTabP3.click();
  await page.waitForTimeout(500);

  const p3WomanBadge = await page.$('span:has-text("Woman")');
  const p3ManBadge = await page.$('span:has-text("Man")');
  console.log('Part 3 speaker dialogue badges:', {
    woman: !!p3WomanBadge,
    man: !!p3ManBadge
  });
  if (!p3WomanBadge || !p3ManBadge) {
    throw new Error('Speaker dialogue badges missing in Part 3 Interactive Transcript!');
  }

  const dictationTabP3 = await page.$('button:has-text("Chép chính tả (Dictation)")');
  await dictationTabP3.click();
  await page.waitForTimeout(500);

  const p3SentenceNav = await page.$('div[class*="lineNavigation"]');
  console.log('Part 3 sentence-by-sentence dialogue navigation:', !!p3SentenceNav);
  if (!p3SentenceNav) throw new Error('Part 3 sentence navigation missing!');

  await page.screenshot({ path: path.join(artifactDir, 'part3_dictation.png') });

  console.log('\n=== TEST 4: Part 4 Short Talks ===');
  await page.goto('http://localhost:3000/part4?test=ets2022_test1');
  await page.waitForTimeout(1500);
  await checkNoEmojis('Part 4');

  const transcriptTabP4 = await page.$('button:has-text("Lời thoại tương tác")');
  await transcriptTabP4.click();
  await page.waitForTimeout(500);

  const p4Lines = await page.$$('div[class*="lineItem"]');
  console.log(`Part 4 monologue sentences in Interactive Transcript: ${p4Lines.length}`);
  if (p4Lines.length === 0) throw new Error('Part 4 monologue sentences missing!');

  const dictationTabP4 = await page.$('button:has-text("Chép chính tả (Dictation)")');
  await dictationTabP4.click();
  await page.waitForTimeout(500);

  const p4SentenceNav = await page.$('div[class*="lineNavigation"]');
  console.log('Part 4 monologue sentence navigation:', !!p4SentenceNav);
  if (!p4SentenceNav) throw new Error('Part 4 sentence navigation missing!');

  await page.screenshot({ path: path.join(artifactDir, 'part4_dictation.png') });

  await browser.close();
  console.log('\n=========================================');
  console.log('ALL E2E TESTS PASSED SUCCESSFULLY! (100%)');
  console.log('=========================================');
}

run().catch((err) => {
  console.error('\nTEST FAILED WITH ERROR:', err);
  process.exit(1);
});
