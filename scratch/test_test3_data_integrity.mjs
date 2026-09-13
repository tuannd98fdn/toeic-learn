import fs from 'fs';
import path from 'path';

const test3Dir = path.resolve(process.cwd(), 'public/data/ets2022/test3');
console.log('=== KIỂM TRA TOÀN VẸN DỮ LIỆU ĐỀ THI ETS 2022 TEST 3 ===\n');

if (!fs.existsSync(test3Dir)) {
  console.error('❌ Không tìm thấy thư mục:', test3Dir);
  process.exit(1);
}

const files = ['part1.json', 'part2.json', 'part3.json', 'part4.json', 'part5.json', 'part6.json', 'part7.json'];
const expectedCounts = {
  'part1.json': 6,
  'part2.json': 25,
  'part3.json': 39,
  'part4.json': 30,
  'part5.json': 30,
  'part6.json': 16,
  'part7.json': 54
};

let totalQuestions = 0;
let errors = [];

// Regex to detect emojis
const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

files.forEach(file => {
  const filePath = path.join(test3Dir, file);
  if (!fs.existsSync(filePath)) {
    errors.push(`Thiếu file: ${file}`);
    return;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  
  // Emoji check
  if (emojiRegex.test(raw)) {
    errors.push(`Phát hiện emoji trong ${file}! Vi phạm nguyên tắc NO UI EMOJIS (STRICT).`);
  }

  const data = JSON.parse(raw);
  let count = 0;

  if (['part1.json', 'part2.json', 'part5.json'].includes(file)) {
    count = data.length;
    data.forEach((q, idx) => {
      if (!q.correctAnswer) errors.push(`${file} câu ${idx + 1}: thiếu correctAnswer`);
      if (!q.explanation) errors.push(`${file} câu ${idx + 1}: thiếu explanation`);
      if (!q.options) errors.push(`${file} câu ${idx + 1}: thiếu options`);
      if (file === 'part5.json') {
        if (!q.clueHint) errors.push(`Part 5 câu ${q.number}: thiếu clueHint`);
        if (!q.syntaxBreakdown) errors.push(`Part 5 câu ${q.number}: thiếu syntaxBreakdown`);
        if (!q.subCategory) errors.push(`Part 5 câu ${q.number}: thiếu subCategory`);
      }
    });
  } else if (['part3.json', 'part4.json'].includes(file)) {
    data.forEach(set => {
      if (!set.audioUrl) errors.push(`${file}: thiếu audioUrl trong set ${set.id}`);
      if (!set.transcript) errors.push(`${file}: thiếu transcript trong set ${set.id}`);
      set.questions.forEach(q => {
        count++;
        if (!q.correctAnswer) errors.push(`${file} câu ${q.number}: thiếu correctAnswer`);
        if (!q.explanation) errors.push(`${file} câu ${q.number}: thiếu explanation`);
        if (!q.questionType) errors.push(`${file} câu ${q.number}: thiếu questionType`);
      });
    });
  } else if (file === 'part6.json') {
    data.forEach(passage => {
      if (!passage.content) errors.push(`Part 6: thiếu content trong đoạn ${passage.id}`);
      passage.questions.forEach(q => {
        count++;
        if (!q.correctAnswer) errors.push(`Part 6 câu ${q.number}: thiếu correctAnswer`);
        if (!q.explanation) errors.push(`Part 6 câu ${q.number}: thiếu explanation`);
        if (!q.subCategory) errors.push(`Part 6 câu ${q.number}: thiếu subCategory`);
      });
    });
  } else if (file === 'part7.json') {
    let singleCount = 0;
    let multiCount = 0;
    data.forEach(set => {
      if (set.type === 'Single Passage') singleCount++;
      else multiCount++;
      set.questions.forEach(q => {
        count++;
        if (!q.correctAnswer) errors.push(`Part 7 câu ${q.number}: thiếu correctAnswer`);
        if (!q.explanation) errors.push(`Part 7 câu ${q.number}: thiếu explanation`);
        if (!q.questionType) errors.push(`Part 7 câu ${q.number}: thiếu questionType`);
      });
    });
    console.log(`  -> Part 7 phân bổ: ${singleCount} bài đơn, ${multiCount} bài đa đoạn văn.`);
  }

  if (count !== expectedCounts[file]) {
    errors.push(`${file}: Số câu không đúng! Mong đợi ${expectedCounts[file]}, thực tế ${count}`);
  } else {
    console.log(`✓ ${file.padEnd(12)}: Hợp lệ (${count} câu, 0 emoji)`);
  }
  totalQuestions += count;
});

console.log(`\n=> TỔNG SỐ CÂU HỎI TEST 3: ${totalQuestions}/200 câu`);

if (errors.length > 0) {
  console.error('\n❌ PHÁT HIỆN LỖI TOÀN VẸN:');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
} else {
  console.log('✅ KẾT QUẢ: 100% DỮ LIỆU ĐỀ THI ETS TEST 3 TOÀN VẸN VÀ CHUẨN SƯ PHẠM!\n');
}
