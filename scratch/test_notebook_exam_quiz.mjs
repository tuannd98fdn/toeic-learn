import { chromium } from "playwright";
import { encode } from "next-auth/jwt";

const secret = "my-super-secret-key-12345";

(async () => {
  try {
    const token = await encode({
      token: {
        name: "Test Learner",
        email: "learner@toeic.com",
        sub: "user-123"
      },
      secret
    });

    const browser = await chromium.launch();
    const context = await browser.newContext();

    // Set auth cookie
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

    // Add mock exam mistakes into localStorage
    await page.goto("http://localhost:3000/");
    await page.evaluate(() => {
      localStorage.setItem("toeic_onboarding_done", "true");
      localStorage.setItem("toeic_target_score", "750+");
      
      const mockMistakes = {
        "exam_ets2022_test1_part1_62b694aebbc57b27fe10f7ae": {
          wrongCount: 2,
          lastMistakeDate: new Date().toISOString(),
          type: "exam",
          testId: "ets2022_test1",
          part: "part1",
          questionId: "62b694aebbc57b27fe10f7ae",
          box: 1,
          nextReviewDate: new Date(Date.now() - 100000).toISOString()
        },
        "exam_ets2022_test1_part5_62b694aebbc57b27fe10f7e4": {
          wrongCount: 3,
          lastMistakeDate: new Date().toISOString(),
          type: "exam",
          testId: "ets2022_test1",
          part: "part5",
          questionId: "62b694aebbc57b27fe10f7e4",
          box: 1,
          nextReviewDate: new Date(Date.now() - 100000).toISOString()
        },
        "exam_ets2022_test1_part5_62b694aebbc57b27fe10f7e5": {
          wrongCount: 1,
          lastMistakeDate: new Date().toISOString(),
          type: "exam",
          testId: "ets2022_test1",
          part: "part5",
          questionId: "62b694aebbc57b27fe10f7e5",
          box: 1,
          nextReviewDate: new Date(Date.now() + 86400000).toISOString()
        }
      };
      localStorage.setItem("mistake_notebook", JSON.stringify(mockMistakes));
    });

    // 1. Visit /notebook
    console.log("Navigating to /notebook...");
    await page.goto("http://localhost:3000/notebook");
    await page.waitForLoadState("networkidle");

    // Click on tab 'Đề thi'
    const examTabBtn = page.locator("button", { hasText: "Đề thi" });
    await examTabBtn.click();
    await page.waitForTimeout(1000);

    await page.screenshot({ path: "scratch/notebook_exam_tab.png", fullPage: true });
    console.log("Saved scratch/notebook_exam_tab.png");

    // 2. Click on 'Bắt đầu luyện tập câu sai'
    console.log("Clicking start exam mistake re-test...");
    const startPracticeBtn = page.locator("a", { hasText: "Bắt đầu luyện tập câu sai" });
    await startPracticeBtn.click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    await page.screenshot({ path: "scratch/exam_quiz_page.png" });
    console.log("Saved scratch/exam_quiz_page.png");

    // 3. Answer a question (e.g. click option A)
    const optionA = page.locator("button:has-text('A')").first();
    if (await optionA.count() > 0) {
      console.log("Selecting option A...");
      await optionA.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: "scratch/exam_quiz_answered.png" });
      console.log("Saved scratch/exam_quiz_answered.png");
    }

    console.log("Verification script executed successfully!");
    await browser.close();
  } catch (err) {
    console.error("Test failed:", err);
    process.exit(1);
  }
})();
