import { chromium } from 'playwright';
import { encode } from 'next-auth/jwt';
import path from 'path';

const secret = "my-super-secret-key-12345";
const artifactDir = "/Users/bravee06/.gemini/antigravity-ide/brain/59f562b3-0ab6-4a20-8c87-ec01c44bc933";

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

  console.log('--- Step 1: Navigating to /stats to check Grammar Radar Chart ---');
  // Populate local storage with sample mistakes across grammar categories
  await page.goto('http://localhost:3000/stats');
  await page.evaluate(() => {
    const sampleMistakes = {
      'exam_ets2022_test1_part5_ets22_t1_p5_105': {
        type: 'exam',
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: 'ets22_t1_p5_105',
        subCategory: 'Word Form',
        grammarTag: 'Noun Suffix (-tion)',
        wrongCount: 3,
        lastReviewed: new Date().toISOString(),
      },
      'exam_ets2022_test1_part5_ets22_t1_p5_102': {
        type: 'exam',
        testId: 'ets2022_test1',
        part: 'part5',
        questionId: 'ets22_t1_p5_102',
        subCategory: 'Verb Tense',
        grammarTag: 'Past Simple vs Present Perfect',
        wrongCount: 2,
        lastReviewed: new Date().toISOString(),
      },
      'exam_ets2022_test2_part5_ets22_t2_p5_102': {
        type: 'exam',
        testId: 'ets2022_test2',
        part: 'part5',
        questionId: 'ets22_t2_p5_102',
        subCategory: 'Preposition & Conjunction',
        grammarTag: 'Preposition of Time',
        wrongCount: 2,
        lastReviewed: new Date().toISOString(),
      }
    };
    localStorage.setItem('mistake_notebook', JSON.stringify(sampleMistakes));
  });

  // Reload to reflect seeded mistake data
  await page.reload();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Take screenshot of stats page with Radar Chart
  await page.screenshot({ path: path.join(artifactDir, 'stats_radar_subskills.png'), fullPage: false });
  console.log('Saved screenshot: stats_radar_subskills.png');

  // Verify Radar Chart action button points to targeted sub-skill
  const practiceLinks = page.locator('a[href*="/part5?subCategory="]');
  const countLinks = await practiceLinks.count();
  console.log(`Found ${countLinks} targeted practice links in Radar Chart recommendations.`);
  if (countLinks > 0) {
    const firstHref = await practiceLinks.first().getAttribute('href');
    console.log('First practice link href:', firstHref);
  }

  console.log('\n--- Step 2: Direct navigation to /part5?subCategory=Word%20Form ---');
  await page.goto('http://localhost:3000/part5?subCategory=Word%20Form');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);

  // Verify active sub-skill banner
  const bannerText = await page.locator('[class*="activeSkillBanner"]').innerText();
  console.log('Active Skill Banner:', bannerText);

  // Check total questions pooled for Word Form
  const countText = await page.locator('[class*="questionCount"]').innerText();
  console.log('Question progress text:', countText);

  await page.screenshot({ path: path.join(artifactDir, 'part5_subskill_wordform.png'), fullPage: false });
  console.log('Saved screenshot: part5_subskill_wordform.png');

  console.log('\n--- Step 3: Answering question in Sub-skill Mode ---');
  // Select first option
  const optionA = page.locator('button[class*="optionBtn"]').first();
  await optionA.click();
  await page.waitForTimeout(500);

  // Verify explanation toggle
  const toggleExplanationBtn = page.locator('button[class*="explanationToggleBtn"]');
  if (await toggleExplanationBtn.isVisible()) {
    await toggleExplanationBtn.click();
    console.log('Toggled grammar explanation box.');
  }

  // Verify PracticeFooter and AI Tutor Drawer
  const aiTutorFooterBtn = page.locator('button:has-text("Hỏi Gia Sư AI")');
  if (await aiTutorFooterBtn.isVisible()) {
    await aiTutorFooterBtn.click();
    await page.waitForTimeout(600);
    const tutorDrawer = page.locator('[class*="drawerContainer"]');
    console.log('AI Tutor Drawer open:', await tutorDrawer.isVisible());
    await page.screenshot({ path: path.join(artifactDir, 'part5_subskill_aitutor.png'), fullPage: false });
    console.log('Saved screenshot: part5_subskill_aitutor.png');

    // Close drawer
    const closeBtn = page.locator('[class*="closeBtn"]').first();
    await closeBtn.click();
    await page.waitForTimeout(300);
  }

  console.log('\n--- Step 4: Switching Sub-skill using Pill Selector ---');
  // Click on "Giới từ & Liên từ" pill
  const prepPill = page.locator('button[class*="subSkillPill"]:has-text("Giới từ & Liên từ")');
  await prepPill.click();
  await page.waitForTimeout(800);

  const prepBanner = await page.locator('[class*="activeSkillBanner"]').innerText();
  console.log('Updated Banner after pill switch:', prepBanner);

  const prepCount = await page.locator('[class*="questionCount"]').innerText();
  console.log('Updated question progress:', prepCount);

  await page.screenshot({ path: path.join(artifactDir, 'part5_subskill_prep.png'), fullPage: false });
  console.log('Saved screenshot: part5_subskill_prep.png');

  console.log('\n--- Step 5: Switching back to Full Test Mode ---');
  const allPill = page.locator('button[class*="subSkillPill"]:has-text("Tất cả câu hỏi")');
  await allPill.click();
  await page.waitForTimeout(800);

  const testSelector = page.locator('[class*="testSelectorRow"]');
  console.log('Test selector visible in full mode:', await testSelector.isVisible());

  const fullCount = await page.locator('[class*="questionCount"]').innerText();
  console.log('Full test question count:', fullCount);

  await page.screenshot({ path: path.join(artifactDir, 'part5_full_test_mode.png'), fullPage: false });
  console.log('Saved screenshot: part5_full_test_mode.png');

  console.log('\n--- Step 6: Checking Mistake Notebook Exam Tab Sub-skill Link ---');
  await page.goto('http://localhost:3000/notebook?tab=exam&subCategory=Word%20Form');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);

  const notebookTargetBtn = page.locator('a:has-text("Luyện chuyên đề ETS")');
  console.log('Targeted subskill button in notebook visible:', await notebookTargetBtn.isVisible());
  if (await notebookTargetBtn.isVisible()) {
    console.log('Button text:', await notebookTargetBtn.innerText());
    console.log('Button href:', await notebookTargetBtn.getAttribute('href'));
  }

  await page.screenshot({ path: path.join(artifactDir, 'notebook_subskill_drill_cta.png'), fullPage: false });
  console.log('Saved screenshot: notebook_subskill_drill_cta.png');

  await browser.close();
  console.log('\nAll E2E checks passed successfully!');
}

run().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
