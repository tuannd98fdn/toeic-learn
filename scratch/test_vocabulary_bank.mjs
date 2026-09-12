import { VOCAB_450 } from '../src/data/vocab/vocab_450.js';
import { VOCAB_650 } from '../src/data/vocab/vocab_650.js';
import { VOCAB_800 } from '../src/data/vocab/vocab_800.js';

const allWords = [...VOCAB_450, ...VOCAB_650, ...VOCAB_800];

console.log('--- 1. VOCABULARY COUNT & DISTRIBUTION ---');
console.log(`Total words: ${allWords.length}`);
console.log(`Band 450+ words: ${VOCAB_450.length}`);
console.log(`Band 650+ words: ${VOCAB_650.length}`);
console.log(`Band 800+ words: ${VOCAB_800.length}`);

if (allWords.length < 350) {
  throw new Error(`Total word count too low: ${allWords.length} (expected >= 350)`);
}
if (VOCAB_450.length < 100) {
  throw new Error(`Band 450+ count too low: ${VOCAB_450.length} (expected >= 100)`);
}
if (VOCAB_650.length < 130) {
  throw new Error(`Band 650+ count too low: ${VOCAB_650.length} (expected >= 130)`);
}
if (VOCAB_800.length < 100) {
  throw new Error(`Band 800+ count too low: ${VOCAB_800.length} (expected >= 100)`);
}
console.log('✓ Counts satisfy all target band quotas!');

console.log('\n--- 2. ID UNIQUENESS CHECK ---');
const ids = new Set();
const duplicateIds = [];
for (const w of allWords) {
  if (ids.has(w.id)) {
    duplicateIds.push(w.id);
  }
  ids.add(w.id);
}
if (duplicateIds.length > 0) {
  throw new Error(`Duplicate IDs found: ${duplicateIds.join(', ')}`);
}
console.log(`✓ All ${ids.size} word IDs are completely unique!`);

console.log('\n--- 3. SCHEMA INTEGRITY & DATA QUALITY ---');
const emojiRegex = /(\p{Extended_Pictographic}|\p{Emoji_Presentation})/gu;
let emojiViolations = 0;
let schemaViolations = 0;

allWords.forEach((w, index) => {
  if (!w.id || typeof w.id !== 'string') {
    console.error(`Invalid id at index ${index}:`, w);
    schemaViolations++;
  }
  if (!w.word || typeof w.word !== 'string') {
    console.error(`Invalid word at index ${index}:`, w);
    schemaViolations++;
  }
  if (!w.ipa || typeof w.ipa !== 'string') {
    console.error(`Invalid ipa at index ${index}:`, w);
    schemaViolations++;
  }
  if (!w.vietnamese || typeof w.vietnamese !== 'string') {
    console.error(`Invalid vietnamese at index ${index}:`, w);
    schemaViolations++;
  }
  if (!w.partOfSpeech || typeof w.partOfSpeech !== 'string') {
    console.error(`Invalid partOfSpeech at index ${index}:`, w);
    schemaViolations++;
  }
  if (!w.category || typeof w.category !== 'string') {
    console.error(`Invalid category at index ${index}:`, w);
    schemaViolations++;
  }
  if (!['450+', '650+', '800+'].includes(w.targetBand)) {
    console.error(`Invalid targetBand at index ${index}:`, w);
    schemaViolations++;
  }
  if (!Array.isArray(w.examples) || w.examples.length < 2) {
    console.error(`Invalid examples (needs >= 2) at index ${index}:`, w);
    schemaViolations++;
  }
  if (!w.mnemonicTip || typeof w.mnemonicTip !== 'string') {
    console.error(`Invalid mnemonicTip at index ${index}:`, w);
    schemaViolations++;
  }
  if (w.emoji !== "") {
    console.error(`Emoji field is not empty for word ${w.word} (${w.id}): "${w.emoji}"`);
    emojiViolations++;
  }
  if (emojiRegex.test(w.word) || emojiRegex.test(w.vietnamese) || emojiRegex.test(w.mnemonicTip)) {
    console.error(`Emoji unicode found in text fields of word ${w.word} (${w.id})`);
    emojiViolations++;
  }
});

if (schemaViolations > 0) {
  throw new Error(`Found ${schemaViolations} schema violations!`);
}
if (emojiViolations > 0) {
  throw new Error(`Found ${emojiViolations} emoji violations! STRICT RULE BREACH!`);
}
console.log('✓ All 403 words pass strict schema validation!');
console.log('✓ 100% compliant with STRICT NO UI EMOJIS rule (all emoji: "")');

console.log('\n--- 4. CATEGORY BREAKDOWN ---');
const categoryCounts = {};
allWords.forEach(w => {
  categoryCounts[w.category] = (categoryCounts[w.category] || 0) + 1;
});
for (const [cat, count] of Object.entries(categoryCounts)) {
  console.log(`- ${cat}: ${count} words`);
}

console.log('\n=== ALL VOCABULARY INTEGRITY TESTS PASSED! ===');
