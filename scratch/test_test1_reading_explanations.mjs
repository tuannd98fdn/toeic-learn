import fs from 'fs';
import path from 'path';

const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

function testPart5() {
  const filePath = path.resolve('public/data/ets2022/test1/part5.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  
  if (EMOJI_REGEX.test(raw)) {
    throw new Error('Emoji detected in part5.json!');
  }
  
  if (data.length !== 30) {
    throw new Error(`Expected 30 questions in Part 5, got ${data.length}`);
  }
  
  data.forEach((q) => {
    if (!q.explanation || q.explanation.trim().length < 50) {
      throw new Error(`Part 5 Q${q.number} has empty or too short explanation`);
    }
    const hasSection = q.explanation.includes('Dịch nghĩa') && 
                       (q.explanation.includes('Phân tích') || q.explanation.includes('bằng chứng') || q.explanation.includes('Bằng chứng')) &&
                       (q.explanation.includes('Mẹo') || q.explanation.includes('Bẫy'));
    if (!hasSection) {
      throw new Error(`Part 5 Q${q.number} lacks required pedagogical sections`);
    }
  });
  
  console.log('Part 5 Integrity Test: 30/30 questions PASSED (0 emojis, complete pedagogical explanations).');
}

function testPart6() {
  const filePath = path.resolve('public/data/ets2022/test1/part6.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  
  if (EMOJI_REGEX.test(raw)) {
    throw new Error('Emoji detected in part6.json!');
  }
  
  let qCount = 0;
  data.forEach((passage, idx) => {
    passage.questions.forEach((q) => {
      qCount++;
      if (!q.explanation || q.explanation.trim().length < 50) {
        throw new Error(`Part 6 Q${q.number} in passage ${idx + 1} has empty or too short explanation`);
      }
      const hasSection = q.explanation.includes('Dịch nghĩa') && 
                         (q.explanation.includes('Phân tích') || q.explanation.includes('bằng chứng') || q.explanation.includes('Bằng chứng')) &&
                         (q.explanation.includes('Mẹo') || q.explanation.includes('Bẫy'));
      if (!hasSection) {
        throw new Error(`Part 6 Q${q.number} lacks required pedagogical sections`);
      }
    });
  });
  
  if (qCount !== 16) {
    throw new Error(`Expected 16 questions in Part 6, got ${qCount}`);
  }
  
  console.log('Part 6 Integrity Test: 16/16 questions PASSED (0 emojis, complete pedagogical explanations).');
}

function testPart7() {
  const filePath = path.resolve('public/data/ets2022/test1/part7.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  
  if (EMOJI_REGEX.test(raw)) {
    throw new Error('Emoji detected in part7.json!');
  }
  
  let qCount = 0;
  data.forEach((set, idx) => {
    set.questions.forEach((q) => {
      qCount++;
      if (!q.explanation || q.explanation.trim().length < 50) {
        throw new Error(`Part 7 Q${q.number} in set ${idx + 1} has empty or too short explanation`);
      }
      const hasSection = q.explanation.includes('Dịch nghĩa') && 
                         (q.explanation.includes('Phân tích') || q.explanation.includes('bằng chứng') || q.explanation.includes('Bằng chứng')) &&
                         (q.explanation.includes('Mẹo') || q.explanation.includes('Bẫy'));
      if (!hasSection) {
        throw new Error(`Part 7 Q${q.number} lacks required pedagogical sections`);
      }
    });
  });
  
  if (qCount !== 54) {
    throw new Error(`Expected 54 questions in Part 7, got ${qCount}`);
  }
  
  console.log('Part 7 Integrity Test: 54/54 questions PASSED (0 emojis, complete pedagogical explanations).');
}

try {
  testPart5();
  testPart6();
  testPart7();
  console.log('================================================================');
  console.log('ALL 100 READING TEST 1 EXPLANATIONS PASSED 100% OF QUALITY CHECKS');
  console.log('================================================================');
} catch (err) {
  console.error('TEST FAILED:', err.message);
  process.exit(1);
}
