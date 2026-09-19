import { chromium } from 'playwright';

async function main() {
  console.log('=== EVALUATING STATS PAGE UI/UX & FUNCTIONALITY ===');
  const browser = await chromium.launch({ headless: true });

  // 1. Empty state on Desktop
  const contextEmpty = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
  });
  const pageEmpty = await contextEmpty.newPage();
  
  const emptyConsoleErrors = [];
  pageEmpty.on('console', msg => {
    if (msg.type() === 'error') emptyConsoleErrors.push(msg.text());
  });

  await pageEmpty.goto('http://localhost:3000/stats', { waitUntil: 'networkidle' });
  await pageEmpty.waitForTimeout(1000);
  await pageEmpty.screenshot({ path: 'scratch/stats_empty_desktop.png', fullPage: true });
  console.log('Empty desktop screenshot saved to scratch/stats_empty_desktop.png');

  // 2. Populated state on Desktop
  const contextPopulated = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
  });
  const pagePopulated = await contextPopulated.newPage();

  const mockExamHistory = [
    {
      testId: 'test1',
      testName: 'ETS 2022 Test 1',
      date: '10/09/2026',
      rawLC: 65,
      rawRC: 55,
      scaledLC: 330,
      scaledRC: 260,
      totalScore: 590,
      cefrLevel: 'B1',
      weakestPart: { partId: 'part7', partName: 'Part 7: Reading Comprehension', accuracy: 48 },
    },
    {
      testId: 'test2',
      testName: 'ETS 2022 Test 2',
      date: '15/09/2026',
      rawLC: 72,
      rawRC: 68,
      scaledLC: 375,
      scaledRC: 335,
      totalScore: 710,
      cefrLevel: 'B2',
      weakestPart: { partId: 'part5', partName: 'Part 5: Incomplete Sentences', accuracy: 56 },
    },
    {
      testId: 'test3',
      testName: 'ETS 2022 Test 3',
      date: '18/09/2026',
      rawLC: 80,
      rawRC: 75,
      scaledLC: 415,
      scaledRC: 375,
      totalScore: 790,
      cefrLevel: 'B2',
      weakestPart: { partId: 'part6', partName: 'Part 6: Text Completion', accuracy: 62 },
    },
  ];

  const mockMistakes = {
    't1_q101': { id: 't1_q101', type: 'exam', subCategory: 'Word Form', wrongCount: 3, lastWrongDate: '2026-09-18' },
    't1_q102': { id: 't1_q102', type: 'exam', subCategory: 'Verb Tense', wrongCount: 2, lastWrongDate: '2026-09-18' },
    't1_q103': { id: 't1_q103', type: 'exam', subCategory: 'Preposition & Conjunction', wrongCount: 4, lastWrongDate: '2026-09-17' },
    't1_q104': { id: 't1_q104', type: 'exam', subCategory: 'Business Vocabulary', wrongCount: 2, lastWrongDate: '2026-09-16' },
    't1_q105': { id: 't1_q105', type: 'exam', subCategory: 'Relative Clause', wrongCount: 1, lastWrongDate: '2026-09-15' },
    't1_q106': { id: 't1_q106', type: 'exam', subCategory: 'Sentence Structure', wrongCount: 2, lastWrongDate: '2026-09-15' },
  };

  const mockLeitner = {
    'word_1': { id: 'word_1', box: 1, lastReviewed: Date.now() },
    'word_2': { id: 'word_2', box: 2, lastReviewed: Date.now() },
    'word_3': { id: 'word_3', box: 3, lastReviewed: Date.now() },
    'word_4': { id: 'word_4', box: 4, lastReviewed: Date.now() },
    'word_5': { id: 'word_5', box: 5, lastReviewed: Date.now() },
    'word_6': { id: 'word_6', box: 5, lastReviewed: Date.now() },
    'word_7': { id: 'word_7', box: 5, lastReviewed: Date.now() },
  };

  const mockStreak = {
    currentStreak: 5,
    bestStreak: 12,
    lastActiveDate: '2026-09-19',
    freezeCount: 1,
  };

  await pagePopulated.goto('http://localhost:3000/stats', { waitUntil: 'commit' });
  await pagePopulated.evaluate(({ examHistory, mistakes, leitner, streak }) => {
    localStorage.setItem('toeic_exam_history', JSON.stringify(examHistory));
    localStorage.setItem('mistake_notebook', JSON.stringify(mistakes));
    localStorage.setItem('toeic_leitner_v1', JSON.stringify(leitner));
    localStorage.setItem('toeic_streak', JSON.stringify(streak));
  }, { examHistory: mockExamHistory, mistakes: mockMistakes, leitner: mockLeitner, streak: mockStreak });

  await pagePopulated.reload({ waitUntil: 'networkidle' });
  await pagePopulated.waitForTimeout(1000);
  await pagePopulated.screenshot({ path: 'scratch/stats_populated_desktop.png', fullPage: true });
  console.log('Populated desktop screenshot saved to scratch/stats_populated_desktop.png');

  // 3. Populated state on Mobile (iPhone 375x812)
  const contextMobile = await browser.newContext({
    viewport: { width: 375, height: 812 },
    extraHTTPHeaders: { 'x-playwright-test': 'true' },
    isMobile: true,
  });
  const pageMobile = await contextMobile.newPage();
  await pageMobile.goto('http://localhost:3000/stats', { waitUntil: 'commit' });
  await pageMobile.evaluate(({ examHistory, mistakes, leitner, streak }) => {
    localStorage.setItem('toeic_exam_history', JSON.stringify(examHistory));
    localStorage.setItem('mistake_notebook', JSON.stringify(mistakes));
    localStorage.setItem('toeic_leitner_v1', JSON.stringify(leitner));
    localStorage.setItem('toeic_streak', JSON.stringify(streak));
  }, { examHistory: mockExamHistory, mistakes: mockMistakes, leitner: mockLeitner, streak: mockStreak });

  await pageMobile.reload({ waitUntil: 'networkidle' });
  await pageMobile.waitForTimeout(1000);
  await pageMobile.screenshot({ path: 'scratch/stats_populated_mobile.png', fullPage: true });
  console.log('Populated mobile screenshot saved to scratch/stats_populated_mobile.png');

  // Check for DOM emojis
  const bodyText = await pagePopulated.evaluate(() => document.body.innerText);
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const emojis = bodyText.match(emojiRegex);
  console.log('DOM emojis found on stats page:', emojis ? emojis : 'None (PASS)');

  await browser.close();
}

main().catch(console.error);
