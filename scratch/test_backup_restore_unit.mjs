import assert from 'node:assert';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] !== undefined ? this.store[key] : null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
  key(i) {
    return Object.keys(this.store)[i] || null;
  }
  get length() {
    return Object.keys(this.store).length;
  }
}

globalThis.localStorage = new LocalStorageMock();
globalThis.window = {
  localStorage: globalThis.localStorage,
  dispatchEvent: () => true,
};
globalThis.CustomEvent = class CustomEvent {
  constructor(name, opts) {
    this.name = name;
    this.opts = opts;
  }
};

const {
  createBackupPayload,
  validateBackupFile,
  restoreBackupData,
  CURRENT_BACKUP_VERSION,
} = await import('../src/utils/dataBackup.ts');

console.log('=== TEST 1: createBackupPayload with full dataset ===');
localStorage.setItem('toeic_target_score', '850+');
localStorage.setItem('toeic_exam_date', '2026-11-20');
localStorage.setItem('toeic_onboarding_done', 'true');
localStorage.setItem(
  'vocabulary_streak',
  JSON.stringify({ currentStreak: 7, bestStreak: 14, freezeCount: 2, lastStudyDate: '2026-09-19' })
);
localStorage.setItem(
  'mistake_notebook',
  JSON.stringify({
    q101: { wrongCount: 3, lastMistakeDate: '2026-09-18', box: 1, rootCause: 'Từ vựng' },
    q102: { wrongCount: 1, lastMistakeDate: '2026-09-19', box: 2, rootCause: 'Ngữ pháp' },
  })
);
localStorage.setItem(
  'leitner_progress',
  JSON.stringify({
    word_1: { box: 5, lastReview: '2026-09-10', nextReview: '2026-10-10' },
    word_2: { box: 3, lastReview: '2026-09-15', nextReview: '2026-09-22' },
  })
);
localStorage.setItem(
  'toeic_exam_history',
  JSON.stringify([
    { testId: 'ets2022_test1', totalScore: 750, date: '2026-09-15' },
    { testId: 'ets2022_test2', totalScore: 820, date: '2026-09-18' },
  ])
);
localStorage.setItem('toeic_tips_bookmarks', JSON.stringify(['tip_1', 'tip_5']));
localStorage.setItem('toeic_tips_mastered', JSON.stringify(['tip_1']));
localStorage.setItem('progress_t1_part5', 'true');

const backup = createBackupPayload();
assert.strictEqual(backup.app, 'toeic-learn');
assert.strictEqual(backup.version, CURRENT_BACKUP_VERSION);
assert.strictEqual(backup.metadata.totalMistakes, 2);
assert.strictEqual(backup.metadata.totalVocabMastered, 1);
assert.strictEqual(backup.metadata.totalExamsTaken, 2);
assert.strictEqual(backup.metadata.currentStreak, 7);
assert.strictEqual(backup.metadata.targetScore, '850+');
assert.strictEqual(backup.metadata.examDate, '2026-11-20');
assert.strictEqual(backup.data.progress['progress_t1_part5'], true);
console.log('Passed: createBackupPayload generated 100% complete payload.');

console.log('\n=== TEST 2: validateBackupFile with v2.0 schema ===');
const jsonString = JSON.stringify(backup, null, 2);
const validation = validateBackupFile(jsonString);
assert.strictEqual(validation.isValid, true);
assert.strictEqual(validation.metadata.totalMistakes, 2);
assert.strictEqual(validation.metadata.totalExamsTaken, 2);
console.log('Passed: v2.0 schema validated successfully.');

console.log('\n=== TEST 3: validateBackupFile with v1.0 legacy schema ===');
const legacyJson = JSON.stringify({
  version: '1.0',
  exportDate: '2026-09-01T00:00:00.000Z',
  targetScore: '650+',
  examDate: '2026-10-01',
  streak: { currentStreak: 3, bestStreak: 5 },
  mistakes: { q1: { wrongCount: 1, lastMistakeDate: '2026-08-30' } },
  examHistory: [{ testId: 'mini1', totalScore: 600 }],
  adaptivePlan: null,
});
const legacyValidation = validateBackupFile(legacyJson);
assert.strictEqual(legacyValidation.isValid, true);
assert.strictEqual(legacyValidation.metadata.totalMistakes, 1);
assert.strictEqual(legacyValidation.metadata.targetScore, '650+');
assert.strictEqual(legacyValidation.metadata.currentStreak, 3);
console.log('Passed: v1.0 legacy schema backwards compatibility verified.');

console.log('\n=== TEST 4: validateBackupFile with invalid / corrupted data ===');
const invalid1 = validateBackupFile('{ broken json');
assert.strictEqual(invalid1.isValid, false);
const invalid2 = validateBackupFile('{"someRandom": 123}');
assert.strictEqual(invalid2.isValid, false);
console.log('Passed: Corrupted / non-TOEIC JSON safely rejected.');

console.log('\n=== TEST 5: restoreBackupData (mode: clean replace) ===');
localStorage.clear();
localStorage.setItem('toeic_target_score', '450+'); // Existing dummy value
restoreBackupData(backup, 'replace');

assert.strictEqual(localStorage.getItem('toeic_target_score'), '850+');
assert.strictEqual(localStorage.getItem('toeic_exam_date'), '2026-11-20');
const restoredMistakes = JSON.parse(localStorage.getItem('mistake_notebook'));
assert.strictEqual(Object.keys(restoredMistakes).length, 2);
assert.strictEqual(restoredMistakes.q101.wrongCount, 3);
const restoredStreak = JSON.parse(localStorage.getItem('vocabulary_streak'));
assert.strictEqual(restoredStreak.currentStreak, 7);
console.log('Passed: Clean replace restored all keys accurately.');

console.log('\n=== TEST 6: restoreBackupData (mode: smart merge) ===');
// Machine B has some new mistakes, higher streak on machine A, etc.
localStorage.setItem(
  'mistake_notebook',
  JSON.stringify({
    q101: { wrongCount: 1, lastMistakeDate: '2026-09-10', box: 1 }, // lower wrongCount
    q103: { wrongCount: 2, lastMistakeDate: '2026-09-19', box: 1, rootCause: 'Mắc bẫy' }, // new on Machine B
  })
);
localStorage.setItem(
  'vocabulary_streak',
  JSON.stringify({ currentStreak: 3, bestStreak: 10, freezeCount: 1 })
);

restoreBackupData(backup, 'merge');

const mergedMistakes = JSON.parse(localStorage.getItem('mistake_notebook'));
assert.strictEqual(Object.keys(mergedMistakes).length, 3, 'Should have q101, q102, and q103');
assert.strictEqual(mergedMistakes.q101.wrongCount, 3, 'Should take max wrongCount (3)');
assert.strictEqual(mergedMistakes.q103.wrongCount, 2, 'Should preserve q103 created on machine B');
assert.strictEqual(mergedMistakes.q103.rootCause, 'Mắc bẫy');

const mergedStreak = JSON.parse(localStorage.getItem('vocabulary_streak'));
assert.strictEqual(mergedStreak.currentStreak, 7, 'Should take max currentStreak (7)');
assert.strictEqual(mergedStreak.bestStreak, 14, 'Should take max bestStreak (14)');
assert.strictEqual(mergedStreak.freezeCount, 2, 'Should take max freezeCount (2)');
console.log('Passed: Smart merge successfully resolved conflicts without data loss.');

console.log('\n ALL DATA BACKUP UNIT TESTS PASSED (100%)! \n');
