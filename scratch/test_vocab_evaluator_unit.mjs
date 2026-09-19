import assert from 'node:assert';
import { VOCABULARY_DATA, TOEIC_TOPICS, getTopicById, getTopicByName } from '../src/data/vocabulary.ts';
import { evaluateVocabMastery } from '../src/utils/vocabEvaluator.ts';

console.log('--- BẮT ĐẦU KIỂM THỬ ĐƠN VỊ DỮ LIỆU TỪ VỰNG & ENGINE ĐÁNH GIÁ ---');

// 1. Kiểm tra 12 Chủ Đề ETS
assert.strictEqual(TOEIC_TOPICS.length, 12, 'Phải có đúng 12 chủ đề TOEIC ETS cốt lõi');
const topicIds = new Set(TOEIC_TOPICS.map(t => t.id));
assert.strictEqual(topicIds.size, 12, '12 chủ đề phải có id duy nhất');

// 2. Kiểm tra tổng số từ vựng
const allWords = VOCABULARY_DATA;
console.log(`- Tổng số từ vựng trong hệ thống: ${allWords.length}`);
assert.strictEqual(allWords.length, 453, 'Tổng số từ vựng hệ thống phải đạt 453 từ');

// 3. Kiểm tra tính duy nhất (Zero Duplicates)
const wordIds = new Set();
const duplicateIds = [];
const wordTexts = new Set();
const duplicateTexts = [];

for (const w of allWords) {
  if (wordIds.has(w.id)) {
    duplicateIds.push(w.id);
  }
  wordIds.add(w.id);

  const lowerWord = w.word.trim().toLowerCase();
  if (wordTexts.has(lowerWord)) {
    duplicateTexts.push(lowerWord);
  }
  wordTexts.add(lowerWord);
}

assert.strictEqual(duplicateIds.length, 0, `Không được có ID từ vựng trùng lặp: ${duplicateIds.join(', ')}`);
assert.strictEqual(duplicateTexts.length, 0, `Không được có từ tiếng Anh trùng lặp: ${duplicateTexts.join(', ')}`);
console.log('- Xác nhận 100% 453 từ vựng có ID và từ tiếng Anh duy nhất');

// 4. Kiểm tra các từ không phù hợp đã bị thanh lọc hoàn toàn
const PURGED_WORDS = [
  'subpoena', 'affidavit', 'plaintiff', 'cease and desist', 'statute of limitations',
  'adjudicate', 'culpability', 'deleterious', 'preposterous', 'fallacious',
  'superfluous', 'incessant', 'disconcerting', 'haphazard', 'ostensible',
  'peremptory', 'mosaic', 'spectrum', 'minerals', 'refract',
  'adulterate', 'fastidious', 'soap', 'lotion', 'frozen food',
  'shine', 'plenty', 'wheelbarrow', 'cart', 'hallway',
  'appliance', 'restroom', 'farewell', 'like-minded', 'nutritional', 'texture'
];

for (const purged of PURGED_WORDS) {
  const found = allWords.find(w => w.word.toLowerCase() === purged.toLowerCase());
  assert.ok(!found, `Từ không phù hợp "${purged}" vẫn còn xuất hiện trong cơ sở dữ liệu!`);
}
console.log(`- Xác nhận 100% ${PURGED_WORDS.length} từ không phù hợp đã được thanh lọc triệt để`);

// 5. Kiểm tra 100% từ vựng đều có category và topicId hợp lệ thuộc 12 chủ đề ETS
let invalidTopicCount = 0;
for (const w of allWords) {
  assert.ok(w.topicId, `Từ ${w.word} (ID: ${w.id}) bị thiếu topicId`);
  assert.ok(topicIds.has(w.topicId), `Từ ${w.word} có topicId không hợp lệ: ${w.topicId}`);
  
  const topic = getTopicById(w.topicId);
  assert.ok(topic, `Không tìm thấy chủ đề với topicId: ${w.topicId}`);
  assert.strictEqual(w.category, topic.nameEn, `Từ ${w.word} có category "${w.category}" không khớp với topic.nameEn "${topic.nameEn}"`);
}
console.log('- Xác nhận 100% 453 từ vựng được gán chuẩn xác vào 12 chủ đề ETS');

// 6. Kiểm tra thuật toán evaluateVocabMastery
// 6a. Trường hợp người học mới (chưa học từ nào)
const emptyProgress = {};
const initialEval = evaluateVocabMastery(allWords, emptyProgress);
assert.strictEqual(initialEval.totalWords, 453);
assert.strictEqual(initialEval.totalMastered, 0);
assert.strictEqual(initialEval.overallMasteryScore, 0);
assert.strictEqual(initialEval.topics.length, 12);
assert.ok(initialEval.weakestTopic, 'Phải chỉ ra được chủ đề yếu nhất');
console.log(`- Đánh giá ban đầu: Vốn từ hoạt động ~${initialEval.estimatedActiveVocab}, Khuyến nghị Band: ${initialEval.targetBandRecommendation}`);

// 6b. Trường hợp người học đã học thành thạo một số từ (Hộp 4 và Hộp 5)
const mockProgress = {};
// Cho 20 từ thuộc 'contracts' vào Hộp 5
const contractWords = allWords.filter(w => w.topicId === 'contracts');
contractWords.slice(0, 20).forEach(w => {
  mockProgress[w.id] = { box: 5, lastReviewed: Date.now(), nextReview: Date.now() + 86400000 };
});
// Cho 10 từ thuộc 'finance' vào Hộp 4
const financeWords = allWords.filter(w => w.topicId === 'finance');
financeWords.slice(0, 10).forEach(w => {
  mockProgress[w.id] = { box: 4, lastReviewed: Date.now(), nextReview: Date.now() + 86400000 };
});

const progressEval = evaluateVocabMastery(allWords, mockProgress);
assert.strictEqual(progressEval.totalMastered, 30);
assert.ok(progressEval.overallMasteryScore > 0);
const contractStat = progressEval.topics.find(t => t.topicId === 'contracts');
assert.ok(contractStat);
assert.strictEqual(contractStat.masteredWords, 20);
assert.strictEqual(progressEval.strongestTopic?.topicId, 'contracts');
console.log(`- Đánh giá tiến độ: Tổng từ làm chủ: ${progressEval.totalMastered}, Chủ đề mạnh nhất: ${progressEval.strongestTopic?.nameVi} (${progressEval.strongestTopic?.masteryScore}%)`);

console.log('=== TẤT CẢ CÁC BÀI KIỂM THỬ ĐƠN VỊ ĐỀU PASS 100%! ===');
