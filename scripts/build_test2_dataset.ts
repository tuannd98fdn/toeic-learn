import * as fs from 'fs';
import * as path from 'path';

import { part1Data } from './test2_data/part1';
import { part2Data } from './test2_data/part2';
import { part3Data } from './test2_data/part3';
import { part4Data } from './test2_data/part4';
import { part5Data } from './test2_data/part5';
import { part6Data } from './test2_data/part6';
import { part7Data } from './test2_data/part7';

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'public', 'data', 'ets2022', 'test2');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('🚀 Đang ghi các file đề thi ETS 2022 Test 2...');

// Part 1: 6 questions
fs.writeFileSync(path.join(outDir, 'part1.json'), JSON.stringify(part1Data, null, 2), 'utf-8');
console.log(`✓ Part 1: ${part1Data.length} câu`);

// Part 2: 25 questions
fs.writeFileSync(path.join(outDir, 'part2.json'), JSON.stringify(part2Data, null, 2), 'utf-8');
console.log(`✓ Part 2: ${part2Data.length} câu`);

// Part 3: 39 questions (13 sets)
const p3Questions = part3Data.reduce((acc, s) => acc + s.questions.length, 0);
fs.writeFileSync(path.join(outDir, 'part3.json'), JSON.stringify(part3Data, null, 2), 'utf-8');
console.log(`✓ Part 3: ${part3Data.length} đoạn (${p3Questions} câu)`);

// Part 4: 30 questions (10 sets)
const p4Questions = part4Data.reduce((acc, s) => acc + s.questions.length, 0);
fs.writeFileSync(path.join(outDir, 'part4.json'), JSON.stringify(part4Data, null, 2), 'utf-8');
console.log(`✓ Part 4: ${part4Data.length} bài nói (${p4Questions} câu)`);

// Part 5: 30 questions
fs.writeFileSync(path.join(outDir, 'part5.json'), JSON.stringify(part5Data, null, 2), 'utf-8');
console.log(`✓ Part 5: ${part5Data.length} câu`);

// Part 6: 16 questions (4 passages)
const p6Questions = part6Data.reduce((acc, p) => acc + p.questions.length, 0);
fs.writeFileSync(path.join(outDir, 'part6.json'), JSON.stringify(part6Data, null, 2), 'utf-8');
console.log(`✓ Part 6: ${part6Data.length} đoạn (${p6Questions} câu)`);

// Part 7: 54 questions (15 passage sets)
const p7Questions = part7Data.reduce((acc, p) => acc + p.questions.length, 0);
fs.writeFileSync(path.join(outDir, 'part7.json'), JSON.stringify(part7Data, null, 2), 'utf-8');
console.log(`✓ Part 7: ${part7Data.length} bộ bài đọc (${p7Questions} câu)`);

const totalTest2Questions = part1Data.length + part2Data.length + p3Questions + p4Questions + part5Data.length + p6Questions + p7Questions;
console.log(`\n=> TỔNG CỘNG TEST 2: ${totalTest2Questions} CÂU HỎI.`);

// Cập nhật tests_index.json
const indexFilePath = path.join(rootDir, 'public', 'data', 'tests_index.json');
let testsIndex: any[] = [];
if (fs.existsSync(indexFilePath)) {
  testsIndex = JSON.parse(fs.readFileSync(indexFilePath, 'utf-8'));
}

const test2Id = 'ets2022_test2';
const existingIdx = testsIndex.findIndex(t => t.id === test2Id);
const test2Entry = {
  id: test2Id,
  name: "ETS 2022 - Test 2",
  year: 2022,
  path: "/data/ets2022/test2"
};

if (existingIdx >= 0) {
  testsIndex[existingIdx] = test2Entry;
} else {
  testsIndex.push(test2Entry);
}

fs.writeFileSync(indexFilePath, JSON.stringify(testsIndex, null, 2), 'utf-8');
console.log(`✓ Đã đăng ký đề thi vào tests_index.json. Tổng số đề: ${testsIndex.length}`);
