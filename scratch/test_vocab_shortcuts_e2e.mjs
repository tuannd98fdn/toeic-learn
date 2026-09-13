import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';
import path from 'path';

const secret = "my-super-secret-key-12345";
const artifactDir = "/Users/bravee06/.gemini/antigravity-ide/brain/0a6304b4-83e2-4d02-afd9-dcdfe6030096";

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
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: 'dark' });

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

  // Spy on window.speechSynthesis.speak
  await page.addInitScript(() => {
    window.__spokenWords = [];
    if (!window.speechSynthesis) {
      window.speechSynthesis = {
        cancel: () => {},
        speak: (utterance) => {
          window.__spokenWords.push(utterance.text);
        },
        getVoices: () => []
      };
    } else {
      const originalSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
      window.speechSynthesis.speak = (utterance) => {
        window.__spokenWords.push(utterance.text);
        try { originalSpeak(utterance); } catch(e) {}
      };
    }
  });

  console.log('1. Navigating to /study...');
  await page.goto('http://localhost:3000/study');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(600);

  // Verify autoPlay toggle exists
  const autoPlayToggle = page.locator('button[aria-label="Tự động phát âm"]');
  const toggleText = await autoPlayToggle.innerText();
  console.log('Auto-play toggle text:', toggleText);
  if (!toggleText.includes('Tự động phát âm: Bật')) {
    throw new Error(`Expected toggle to be ON by default, got: ${toggleText}`);
  }

  // Verify key badge 'A' on front face
  const audioKeyBadge = page.locator('[class*="audioKeyBadge"]');
  const badgeText = await audioKeyBadge.innerText();
  console.log('Audio Key Badge:', badgeText);
  if (badgeText !== 'A') {
    throw new Error(`Expected audio key badge to be "A", got: ${badgeText}`);
  }

  // Verify hint on front face
  const hintText = await page.locator('[class*="hint"]').first().innerText();
  console.log('Front hint text:', hintText);
  if (!hintText.includes('Phím A nghe')) {
    throw new Error(`Expected hint to mention "Phím A nghe", got: ${hintText}`);
  }

  // Take screenshot of front face
  await page.screenshot({ path: path.join(artifactDir, 'vocab_study_shortcuts.png') });
  console.log('Saved screenshot: vocab_study_shortcuts.png');

  // Test toggling autoPlay OFF
  console.log('2. Toggling Auto-play OFF...');
  await autoPlayToggle.click();
  await page.waitForTimeout(200);
  const toggleOffText = await autoPlayToggle.innerText();
  console.log('Toggle after click:', toggleOffText);
  if (!toggleOffText.includes('Tự động phát âm: Tắt')) {
    throw new Error(`Expected toggle to be OFF, got: ${toggleOffText}`);
  }
  const storageVal = await page.evaluate(() => localStorage.getItem('toeic_vocab_autoplay'));
  console.log('localStorage toeic_vocab_autoplay:', storageVal);
  if (storageVal !== 'false') {
    throw new Error(`Expected localStorage to be "false", got: ${storageVal}`);
  }

  // Toggle back ON
  await autoPlayToggle.click();
  await page.waitForTimeout(200);

  // Test keyboard shortcut 'a'
  console.log('3. Testing keyboard shortcut "a"...');
  await page.keyboard.press('a');
  await page.waitForTimeout(300);
  let spoken = await page.evaluate(() => window.__spokenWords);
  console.log('Spoken words after pressing "a":', spoken);
  if (spoken.length === 0) {
    throw new Error('Expected word to be spoken when pressing "a"');
  }

  // Test Space to flip
  console.log('4. Pressing Space to flip card...');
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);

  // Verify back face has backAudioBtn and backHint
  const backAudioBtn = page.locator('button[aria-label="Nghe lại"]');
  const backAudioVisible = await backAudioBtn.isVisible();
  console.log('Back audio button visible:', backAudioVisible);
  if (!backAudioVisible) {
    throw new Error('Expected back audio button to be visible');
  }

  const backHint = page.locator('[class*="backHint"]');
  const backHintText = await backHint.innerText();
  console.log('Back hint text:', backHintText);
  if (!backHintText.includes('Phím A nghe lại')) {
    throw new Error(`Expected back hint to include "Phím A nghe lại", got: ${backHintText}`);
  }

  // Take screenshot of flipped card
  await page.screenshot({ path: path.join(artifactDir, 'vocab_study_flipped.png') });
  console.log('Saved screenshot: vocab_study_flipped.png');

  // Test keyboard shortcut 'r' on back face
  console.log('5. Testing keyboard shortcut "r" on back face...');
  const countBeforeR = spoken.length;
  await page.keyboard.press('r');
  await page.waitForTimeout(300);
  spoken = await page.evaluate(() => window.__spokenWords);
  console.log('Spoken count after pressing "r":', spoken.length);
  if (spoken.length <= countBeforeR) {
    throw new Error('Expected word to be spoken again when pressing "r" on back face');
  }

  // Test rating 3 (OK) to progress to next card
  console.log('6. Pressing "3" to rate OK and progress...');
  await page.keyboard.press('3');
  await page.waitForTimeout(500);

  const progressText = await page.locator('[class*="progressText"]').innerText();
  console.log('Progress after rating:', progressText);
  if (!progressText.includes('2 / 10')) {
    throw new Error(`Expected progress to show "2 / 10", got: ${progressText}`);
  }

  console.log('SUCCESS! All vocabulary shortcut & auto-play tests passed.');
  await browser.close();
}

run().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
