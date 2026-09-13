import assert from 'node:assert';

// Mock browser window and localStorage properly
const storageStore = new Map();
const mockLocalStorage = {
  getItem: (key) => storageStore.get(key) ?? null,
  setItem: (key, val) => storageStore.set(key, String(val)),
  removeItem: (key) => storageStore.delete(key),
  clear: () => storageStore.clear(),
};

global.window = {
  localStorage: mockLocalStorage,
};
global.localStorage = mockLocalStorage;

// Import compiled or transpile test on the fly
const { evaluateLearnerKnowledge } = await import('../src/utils/knowledgeEvaluator.ts');

console.log('Testing Knowledge Evaluator...');

// Test 1: Cold start (uncalibrated)
storageStore.clear();
storageStore.set('toeic_target_score', '750+');
const coldResult = evaluateLearnerKnowledge();

assert.ok(coldResult.knowledgeCeilingScore >= 10 && coldResult.knowledgeCeilingScore <= 990, 'Ceiling score should be within 10-990');
assert.ok(coldResult.targetCoveragePercent > 0 && coldResult.targetCoveragePercent <= 100, 'Coverage should be within 0-100%');
assert.ok(coldResult.pillars.vocabulary, 'Vocabulary pillar must exist');
assert.ok(coldResult.pillars.grammar, 'Grammar pillar must exist');
assert.ok(coldResult.pillars.listening, 'Listening pillar must exist');
assert.ok(coldResult.pillars.reading, 'Reading pillar must exist');
console.log('Test 1 (Cold Start): PASS (Ceiling:', coldResult.knowledgeCeilingScore, 'Exam:', coldResult.examScore, 'Type:', coldResult.gapType, ')');

// Test 2: Execution Deficit (High knowledge in Leitner boxes, low exam score)
storageStore.clear();
storageStore.set('toeic_target_score', '800+');
// Exam score: 500
storageStore.set('toeic_exam_history', JSON.stringify([{
  totalScore: 500,
  listeningScore: 260,
  readingScore: 240,
  date: new Date().toISOString()
}]));
// But user has mastered 300 words in Box 5!
const mockLeitner = {};
for (let i = 1; i <= 300; i++) {
  mockLeitner[`w_${i}`] = { box: 5, lastReview: '', nextReview: '' };
}
storageStore.set('leitner_progress', JSON.stringify(mockLeitner));

const execDeficitResult = evaluateLearnerKnowledge();
console.log('Test 2 (Execution Deficit): Ceiling =', execDeficitResult.knowledgeCeilingScore, 'Exam =', execDeficitResult.examScore, 'Gap =', execDeficitResult.executionGap);
assert.strictEqual(execDeficitResult.gapType, 'EXECUTION_DEFICIT', 'Should detect Execution Deficit when knowledge is far ahead of exam execution');
assert.ok(execDeficitResult.executionGap >= 60, 'Execution gap should be >= 60');
console.log('Test 2 (Execution Deficit): PASS');

// Test 3: Knowledge Deficit (Exam score relatively high, but vocab is 0 in Box 4-5)
storageStore.clear();
storageStore.set('toeic_target_score', '850+');
storageStore.set('toeic_exam_history', JSON.stringify([{
  totalScore: 650,
  listeningScore: 350,
  readingScore: 300,
  date: new Date().toISOString()
}]));
// 0 words in Leitner Box 4-5
storageStore.set('leitner_progress', JSON.stringify({}));

const knowDeficitResult = evaluateLearnerKnowledge();
console.log('Test 3 (Knowledge Deficit): Ceiling =', knowDeficitResult.knowledgeCeilingScore, 'Exam =', knowDeficitResult.examScore, 'GapType =', knowDeficitResult.gapType);
assert.strictEqual(knowDeficitResult.gapType, 'KNOWLEDGE_DEFICIT', 'Should detect Knowledge Deficit when exam score is at/above low knowledge foundation');
console.log('Test 3 (Knowledge Deficit): PASS');

// Test 4: Check Emoji absence in generated texts
const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
assert.ok(!emojiRegex.test(coldResult.diagnosisTitle), 'Diagnosis title must not contain emojis');
assert.ok(!emojiRegex.test(coldResult.diagnosisAdvice), 'Diagnosis advice must not contain emojis');
assert.ok(!emojiRegex.test(coldResult.primaryRecommendation.title), 'Recommendation title must not contain emojis');
console.log('Test 4 (No Emoji Verification): PASS');

console.log('ALL UNIT TESTS PASSED SUCCESSFULLY!');
