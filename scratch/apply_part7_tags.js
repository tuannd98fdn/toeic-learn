const fs = require('fs');
const path = require('path');

const STRATEGY_HINTS = {
  'Main Idea': 'Đọc lướt dòng tiêu đề, phần mở đầu hoặc dòng Subject của email/thông báo để xác định mục đích cốt lõi bài viết.',
  'Detail': 'Xác định từ khóa danh từ riêng, số liệu, mốc thời gian trong câu hỏi và dùng kỹ thuật quét (Scanning) để định vị thông tin.',
  'Inference': 'Tìm mối liên hệ gián tiếp hoặc liên kết giữa các văn bản; không chọn phương án suy diễn ngoài thực tế bài đọc.',
  'NOT / TRUE': 'Dùng phương pháp loại trừ: 3 phương án được đề cập trong bài là sai, phương án không xuất hiện là đáp án đúng.',
  'Vocabulary': 'Không dịch nghĩa gốc của từ; hãy thay thế lần lượt 4 đáp án vào ngữ cảnh câu văn để chọn từ hợp lý nhất.',
  'Sentence Placement': 'Quan sát các liên từ nối (however, therefore) và đại từ chỉ định (this, that, such) để xác định vị trí câu văn.',
};

// Explicit mappings for Test 1
const TEST1_MAPPING = {
  147: 'Inference',
  148: 'Detail',
  149: 'Main Idea',
  150: 'Detail',
  151: 'Inference',
  152: 'Detail',
  153: 'Inference',
  154: 'Detail',
  155: 'Detail',
  156: 'Detail',
  157: 'Sentence Placement',
  158: 'Inference',
  159: 'NOT / TRUE',
  160: 'Inference',
  161: 'Main Idea',
  162: 'Detail',
  163: 'Vocabulary',
  164: 'Sentence Placement',
  165: 'Detail',
  166: 'Inference',
  167: 'Detail',
  168: 'Sentence Placement',
  169: 'Main Idea',
  170: 'Detail',
  171: 'Detail',
  172: 'Detail',
  173: 'NOT / TRUE',
  174: 'Sentence Placement',
  175: 'Inference',
  176: 'Main Idea',
  177: 'Detail',
  178: 'NOT / TRUE',
  179: 'Inference',
  180: 'Detail',
  181: 'Inference',
  182: 'Detail',
  183: 'Detail',
  184: 'Detail',
  185: 'Detail',
  186: 'Detail',
  187: 'Vocabulary',
  188: 'Inference',
  189: 'Detail',
  190: 'NOT / TRUE',
  191: 'Main Idea',
  192: 'Inference',
  193: 'Detail',
  194: 'Detail',
  195: 'Detail',
  196: 'Detail',
  197: 'Detail',
  198: 'Vocabulary',
  199: 'Inference',
  200: 'Detail',
};

// Explicit mappings for Test 2
const TEST2_MAPPING = {
  147: 'Main Idea',
  148: 'Detail',
  149: 'Detail',
  150: 'Detail',
  151: 'Detail',
  152: 'Detail',
  153: 'Detail',
  154: 'Detail',
  155: 'Detail',
  156: 'Detail',
  157: 'Detail',
  158: 'Inference',
  159: 'Detail',
  160: 'Detail',
  161: 'Detail',
  162: 'Detail',
  163: 'Detail',
  164: 'Detail',
  165: 'Detail',
  166: 'Detail',
  167: 'Sentence Placement',
  168: 'Detail',
  169: 'Detail',
  170: 'Detail',
  171: 'Sentence Placement',
  172: 'Detail',
  173: 'Detail',
  174: 'Detail',
  175: 'Inference',
  176: 'Main Idea',
  177: 'Detail',
  178: 'Detail',
  179: 'Detail',
  180: 'Inference',
  181: 'Detail',
  182: 'Detail',
  183: 'Detail',
  184: 'Inference',
  185: 'Detail',
  186: 'Detail',
  187: 'Detail',
  188: 'Detail',
  189: 'Detail',
  190: 'Inference',
  191: 'Detail',
  192: 'Detail',
  193: 'Detail',
  194: 'Inference',
  195: 'Detail',
  196: 'Main Idea',
  197: 'Detail',
  198: 'Inference',
  199: 'Detail',
  200: 'Detail',
};

function processTest(testName, mapping) {
  const filePath = path.join(__dirname, '..', 'public', 'data', 'ets2022', testName, 'part7.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const sets = JSON.parse(raw);

  sets.forEach((set, setIdx) => {
    // Correct test1 passage type structure
    if (testName === 'test1') {
      if (setIdx >= 0 && setIdx <= 9) set.type = 'Single Passage';
      else if (setIdx >= 10 && setIdx <= 11) set.type = 'Double Passage';
      else if (setIdx >= 12 && setIdx <= 14) set.type = 'Triple Passage';
    }

    set.questions.forEach(q => {
      const qType = mapping[q.number] || 'Detail';
      q.questionType = qType;
      q.subCategory = qType;
      q.strategyHint = STRATEGY_HINTS[qType] || STRATEGY_HINTS['Detail'];
    });
  });

  fs.writeFileSync(filePath, JSON.stringify(sets, null, 2), 'utf8');
  console.log(`Updated ${testName}: ${sets.length} sets processed.`);
}

processTest('test1', TEST1_MAPPING);
processTest('test2', TEST2_MAPPING);
console.log('All Part 7 questions tagged successfully!');
