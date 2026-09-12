// Unit test for studyPlanEngine adaptive rebalancing
import {
  generateAdaptivePlan,
  rebalanceStudyPlan,
  syncAdaptivePlan,
  getStudyPlan,
  saveStudyPlan,
} from '../src/utils/studyPlanEngine.ts';

// Mock storage in global
const mockStorage = new Map();
global.localStorage = {
  getItem: (key) => mockStorage.get(key) || null,
  setItem: (key, val) => mockStorage.set(key, String(val)),
  removeItem: (key) => mockStorage.delete(key),
};

console.log('--- Test 1: Generate initial study plan ---');
const initialPlan = generateAdaptivePlan({
  currentScore: 450,
  targetScore: 650,
  daysTotal: 10,
  dailyMinutes: 30,
  weakestParts: ['p5', 'p2', 'p7'],
  topGrammarWeaknesses: ['Preposition & Conjunction', 'Verb Tense']
});

console.log(`Plan created with ${initialPlan.days.length} days.`);
console.log(`Day 1 task 2:`, initialPlan.days[0].tasks[1].title, '->', initialPlan.days[0].tasks[1].link);

// Simulate user completing Day 1 & Day 2
initialPlan.days[0].completed = true;
initialPlan.days[0].tasks.forEach(t => t.completed = true);
initialPlan.days[1].completed = true;
initialPlan.days[1].tasks.forEach(t => t.completed = true);
saveStudyPlan(initialPlan);

console.log('\n--- Test 2: Simulate new diagnostic/exam & mistake data ---');
// Gaps indicate user just failed heavily in Word Form (8 mistakes) and Relative Clause (4 mistakes)
// and user scored 550 in a new test, with p7 and p5 as weakest parts
const simulatedGaps = {
  latestScore: 550,
  scoreSource: 'diagnostic',
  weakestParts: ['p7', 'p5', 'p3'],
  topGrammarWeaknesses: ['Word Form', 'Relative Clause'],
  dueMistakeCount: 5,
  totalMistakes: 12,
  lastEvaluatedAt: new Date().toISOString()
};

console.log('\n--- Test 3: Rebalance Study Plan ---');
const rebalanced = rebalanceStudyPlan(initialPlan, simulatedGaps);

// Assertions
console.log('1. Checking completed days preservation:');
console.log('Day 1 completed:', rebalanced.days[0].completed, '(must be true)');
console.log('Day 2 completed:', rebalanced.days[1].completed, '(must be true)');
if (!rebalanced.days[0].completed || !rebalanced.days[1].completed) {
  throw new Error('FAILED: Completed days were overwritten!');
}

console.log('\n2. Checking plan metadata updates:');
console.log('Current score updated to:', rebalanced.currentScore, '(must be 550)');
console.log('Weakest parts updated to:', rebalanced.weakestParts.join(', '));
console.log('Top grammar weaknesses:', rebalanced.topGrammarWeaknesses.join(', '));
if (rebalanced.currentScore !== 550) throw new Error('FAILED: Score not updated');

console.log('\n3. Checking future uncompleted days adaptation:');
const day3 = rebalanced.days[2];
console.log('Day 3 (uncompleted) task 2:', day3.tasks[1].title, '->', day3.tasks[1].link);
console.log('Day 3 task 3 (review):', day3.tasks[2].title, '->', day3.tasks[2].link);

const day4 = rebalanced.days[3];
console.log('Day 4 (uncompleted) task 2:', day4.tasks[1].title, '->', day4.tasks[1].link);

// Check that Word Form is targeted in Part 5 practice
const hasWordFormPractice = rebalanced.days.slice(2).some(d => 
  d.tasks.some(t => t.link && t.link.includes('Word%20Form'))
);
console.log('Contains targeted Word Form practice:', hasWordFormPractice);
if (!hasWordFormPractice) {
  throw new Error('FAILED: Expected targeted Word Form practice in rebalanced plan');
}

// Check review task contains due count
const hasDueReviewTask = rebalanced.days.slice(2).some(d =>
  d.tasks.some(t => t.title.includes('5 câu hỏi đến hạn'))
);
console.log('Contains due mistakes review task:', hasDueReviewTask);
if (!hasDueReviewTask) {
  throw new Error('FAILED: Expected due mistake count in review task');
}

console.log('\nALL ADAPTIVE SYNC UNIT TESTS PASSED!');
