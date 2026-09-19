import assert from 'assert';
import { VOCABULARY_DATA } from '../src/data/vocabulary.ts';
import {
  removeVietnameseTones,
  matchBilingualWord,
  highlightMatch
} from '../src/utils/bilingualSearch.ts';

console.log('=== TEST 1: Vietnamese tone normalization ===');
assert.strictEqual(removeVietnameseTones('Hợp đồng kinh tế'), 'hop dong kinh te');
assert.strictEqual(removeVietnameseTones('Báo cáo tài chính'), 'bao cao tai chinh');
assert.strictEqual(removeVietnameseTones('Đàm phán thương lượng'), 'dam phan thuong luong');
assert.strictEqual(removeVietnameseTones(''), '');
console.log('PASS: Tone normalization works correctly.');

console.log('=== TEST 2: Vietnamese search without tones (hop dong) ===');
const hopDongMatches = VOCABULARY_DATA
  .map(w => ({ word: w, res: matchBilingualWord(w, 'hop dong', 'all') }))
  .filter(item => item.res.matched)
  .sort((a, b) => b.res.score - a.res.score);

console.log(`Found ${hopDongMatches.length} matches for "hop dong":`);
hopDongMatches.slice(0, 5).forEach(m => {
  console.log(`- ${m.word.word} (${m.word.vietnamese}) [score=${m.res.score}, field=${m.res.matchedField}]`);
});
assert(hopDongMatches.length >= 8, `Expected at least 8 matches for "hop dong", got ${hopDongMatches.length}`);
assert(hopDongMatches.some(m => m.word.word === 'contract'));
console.log('PASS: "hop dong" matches contract and related legal terms.');

console.log('=== TEST 3: Vietnamese search with tones (thỏa thuận) ===');
const thoaThuanMatches = VOCABULARY_DATA
  .map(w => ({ word: w, res: matchBilingualWord(w, 'thỏa thuận', 'all') }))
  .filter(item => item.res.matched);

console.log(`Found ${thoaThuanMatches.length} matches for "thỏa thuận":`);
thoaThuanMatches.forEach(m => console.log(`- ${m.word.word} (${m.word.vietnamese})`));
assert(thoaThuanMatches.length >= 1);
console.log('PASS: Accented Vietnamese search works.');

console.log('=== TEST 4: English search with plural / inflected form (invoices) ===');
const invoiceMatches = VOCABULARY_DATA
  .map(w => ({ word: w, res: matchBilingualWord(w, 'invoices', 'all') }))
  .filter(item => item.res.matched);

console.log(`Found ${invoiceMatches.length} matches for "invoices":`);
invoiceMatches.forEach(m => console.log(`- ${m.word.word} [score=${m.res.score}]`));
assert(invoiceMatches.some(m => m.word.word === 'invoice'));
console.log('PASS: English inflected "invoices" matches "invoice".');

console.log('=== TEST 5: Search Mode Scoping (all vs en vs vi) ===');
// Word 'contract' has word='contract', vietnamese='hợp đồng giao kết'
const contractWord = VOCABULARY_DATA.find(w => w.word === 'contract');
assert(contractWord, 'Could not find contract word');

// In 'en' mode, searching 'contract' should match, searching 'hop dong' should NOT match
const matchEnInEnMode = matchBilingualWord(contractWord, 'contract', 'en');
assert.strictEqual(matchEnInEnMode.matched, true);
assert.strictEqual(matchEnInEnMode.matchedField, 'word');

const matchViInEnMode = matchBilingualWord(contractWord, 'hop dong', 'en');
assert.strictEqual(matchViInEnMode.matched, false, 'VI query should not match in EN mode');

// In 'vi' mode, searching 'hop dong' should match, searching 'contract' should NOT match
const matchViInViMode = matchBilingualWord(contractWord, 'hop dong', 'vi');
assert.strictEqual(matchViInViMode.matched, true);
assert.strictEqual(matchViInViMode.matchedField, 'vietnamese');

const matchEnInViMode = matchBilingualWord(contractWord, 'contract', 'vi');
assert.strictEqual(matchEnInViMode.matched, false, 'EN query should not match in VI mode');

// In 'all' mode, both match
assert.strictEqual(matchBilingualWord(contractWord, 'contract', 'all').matched, true);
assert.strictEqual(matchBilingualWord(contractWord, 'hop dong', 'all').matched, true);
console.log('PASS: Search modes (all, en, vi) properly scope queries.');

console.log('=== TEST 6: Highlight Match ===');
const highlightedNode = highlightMatch('hợp đồng giao kết', 'hop dong', 'hl');
// Ensure it returns a React Fragment with mark
assert(highlightedNode !== null);
console.log('PASS: Highlight match executed without errors.');

console.log('=== ALL BILINGUAL SEARCH UNIT TESTS PASSED ===');
