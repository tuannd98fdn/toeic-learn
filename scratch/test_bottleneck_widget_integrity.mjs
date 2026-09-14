import { calculateBottleneckStats, ROOT_CAUSES } from '../src/utils/bottleneckCalculator.ts';

console.log('Testing calculateBottleneckStats...');

// 1. Empty test
const emptyStats = calculateBottleneckStats({});
console.assert(emptyStats.status === 'EMPTY', `Expected EMPTY, got ${emptyStats.status}`);
console.assert(emptyStats.total === 0, `Expected 0 total, got ${emptyStats.total}`);
console.assert(emptyStats.remediationRate === 100, `Expected 100 remediationRate for empty, got ${emptyStats.remediationRate}`);
console.log('Test 1: Empty passed');

// 2. All Mastered
const allMasteredMistakes = {
  'exam_test1_part5_101': { wrongCount: 1, lastMistakeDate: '2026-09-01', type: 'exam', rootCause: 'Ngữ pháp', isMastered: true },
  'exam_test1_part5_102': { wrongCount: 2, lastMistakeDate: '2026-09-01', type: 'exam', rootCause: 'Mắc bẫy', isMastered: true },
};
const masteredStats = calculateBottleneckStats(allMasteredMistakes);
console.assert(masteredStats.status === 'ALL_MASTERED', `Expected ALL_MASTERED, got ${masteredStats.status}`);
console.assert(masteredStats.total === 2, `Expected total 2, got ${masteredStats.total}`);
console.assert(masteredStats.masteredCount === 2, `Expected masteredCount 2, got ${masteredStats.masteredCount}`);
console.assert(masteredStats.remediationRate === 100, `Expected remediationRate 100, got ${masteredStats.remediationRate}`);
console.log('Test 2: All Mastered passed');

// 3. Mixed with top bottleneck
const mixedMistakes = {
  'exam_test1_part5_101': { wrongCount: 1, lastMistakeDate: '2026-09-01', type: 'exam', rootCause: 'Mắc bẫy', isMastered: false },
  'exam_test1_part5_102': { wrongCount: 2, lastMistakeDate: '2026-09-01', type: 'exam', rootCause: 'Mắc bẫy', isMastered: false },
  'exam_test1_part5_103': { wrongCount: 1, lastMistakeDate: '2026-09-01', type: 'exam', rootCause: 'Ngữ pháp', isMastered: false },
  'exam_test1_part5_104': { wrongCount: 3, lastMistakeDate: '2026-09-01', type: 'exam', rootCause: 'Từ vựng', isMastered: true },
  'exam_test1_part5_105': { wrongCount: 1, lastMistakeDate: '2026-09-01', type: 'exam', isMastered: false }, // unassigned
};
const mixedStats = calculateBottleneckStats(mixedMistakes);
console.assert(mixedStats.status === 'HAS_BOTTLENECK', `Expected HAS_BOTTLENECK, got ${mixedStats.status}`);
console.assert(mixedStats.total === 5, `Expected total 5, got ${mixedStats.total}`);
console.assert(mixedStats.activeCount === 4, `Expected activeCount 4, got ${mixedStats.activeCount}`);
console.assert(mixedStats.masteredCount === 1, `Expected masteredCount 1, got ${masteredStats.masteredCount}`);
console.assert(mixedStats.remediationRate === 20, `Expected remediationRate 20, got ${mixedStats.remediationRate}`);
console.assert(mixedStats.unassignedCount === 1, `Expected unassignedCount 1, got ${mixedStats.unassignedCount}`);
console.assert(mixedStats.topBottleneck?.rootCause === 'Mắc bẫy', `Expected Mắc bẫy, got ${mixedStats.topBottleneck?.rootCause}`);
console.assert(mixedStats.topBottleneck?.count === 2, `Expected count 2, got ${mixedStats.topBottleneck?.count}`);
console.assert(mixedStats.topBottleneck?.percent === 50, `Expected percent 50, got ${mixedStats.topBottleneck?.percent}`);
console.log('Test 3: Mixed passed');

// 4. Needs Tagging
const untaggedMistakes = {
  'exam_test1_part5_101': { wrongCount: 1, lastMistakeDate: '2026-09-01', type: 'exam', isMastered: false },
  'exam_test1_part5_102': { wrongCount: 1, lastMistakeDate: '2026-09-01', type: 'exam', isMastered: false },
};
const untaggedStats = calculateBottleneckStats(untaggedMistakes);
console.assert(untaggedStats.status === 'NEEDS_TAGGING', `Expected NEEDS_TAGGING, got ${untaggedStats.status}`);
console.assert(untaggedStats.unassignedCount === 2, `Expected unassignedCount 2, got ${untaggedStats.unassignedCount}`);
console.log('Test 4: Needs Tagging passed');

console.log('All calculateBottleneckStats unit tests passed!');
