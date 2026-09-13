import assert from 'node:assert';

// Mock window.localStorage for SSR and browser testing
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
}

globalThis.window = {
  localStorage: new LocalStorageMock()
};

// Dynamically import compiled or load storage code
const { storage } = await import('../src/utils/storage.ts');

console.log('--- Testing storage.get with raw string dates (the reported issue) ---');
window.localStorage.setItem('toeic_exam_date', '2026-10-15');
const examDate = storage.get('toeic_exam_date', null);
assert.strictEqual(examDate, '2026-10-15', 'Should return raw date string without crashing');
console.log('Passed: toeic_exam_date raw string ->', examDate);

console.log('--- Testing storage.get with target score (e.g. 750+) ---');
window.localStorage.setItem('toeic_target_score', '750+');
const targetScore = storage.get('toeic_target_score', '750+');
assert.strictEqual(targetScore, '750+', 'Should return raw target score without crashing');
console.log('Passed: toeic_target_score raw string ->', targetScore);

console.log('--- Testing storage.get with complex JSON object ---');
const userProfile = { name: 'Alex', score: 850, skills: ['listening', 'reading'] };
storage.set('user_profile', userProfile);
const retrievedProfile = storage.get('user_profile', null);
assert.deepStrictEqual(retrievedProfile, userProfile, 'Should correctly serialize and parse JSON object');
console.log('Passed: JSON object storage');

console.log('--- Testing storage.get with corrupted JSON object returning defaultValue ---');
window.localStorage.setItem('corrupted_obj', '{"name": "broken');
const fallbackObj = storage.get('corrupted_obj', { fallback: true });
assert.deepStrictEqual(fallbackObj, { fallback: true }, 'Should return defaultValue for corrupted JSON object');
console.log('Passed: Corrupted JSON object fallback');

console.log('--- Testing storage.get with corrupted JSON array returning defaultValue ---');
window.localStorage.setItem('corrupted_arr', '[1, 2, 3');
const fallbackArr = storage.get('corrupted_arr', []);
assert.deepStrictEqual(fallbackArr, [], 'Should return defaultValue for corrupted JSON array');
console.log('Passed: Corrupted JSON array fallback');

console.log('--- Testing storage.get with missing key returning defaultValue ---');
const missing = storage.get('non_existent_key', 'default_val');
assert.strictEqual(missing, 'default_val', 'Should return defaultValue for missing key');
console.log('Passed: Missing key handling');

console.log('--- Testing storage.get with boolean raw string ---');
window.localStorage.setItem('is_done', 'true');
const isDone = storage.get('is_done', false);
assert.strictEqual(isDone, true, 'Should return boolean true');
console.log('Passed: Boolean raw string handling');

console.log('--- Testing storage.get with number raw string ---');
window.localStorage.setItem('user_xp', '250');
const xp = storage.get('user_xp', 0);
assert.strictEqual(xp, 250, 'Should return number 250');
console.log('Passed: Number raw string handling');

console.log('\n ALL STORAGE UNIT TESTS PASSED SUCCESSFULLY! \n');
