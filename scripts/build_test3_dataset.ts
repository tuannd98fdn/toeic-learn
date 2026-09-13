import * as fs from 'fs';
import * as path from 'path';

import { part1Data } from './test3_data/part1';
import { part2Data } from './test3_data/part2';
import { part3Data } from './test3_data/part3';
import { part4Data } from './test3_data/part4';
import { part5Data } from './test3_data/part5';
import { part6Data } from './test3_data/part6';
import { part7Data } from './test3_data/part7';

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'public', 'data', 'ets2022', 'test3');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Building ETS 2022 Test 3 dataset files...');

// Part 1: 6 questions
fs.writeFileSync(path.join(outDir, 'part1.json'), JSON.stringify(part1Data, null, 2), 'utf-8');
console.log(`✓ Part 1: ${part1Data.length} questions`);

// Part 2: 25 questions
fs.writeFileSync(path.join(outDir, 'part2.json'), JSON.stringify(part2Data, null, 2), 'utf-8');
console.log(`✓ Part 2: ${part2Data.length} questions`);

// Part 3: 39 questions (13 sets)
const p3Questions = part3Data.reduce((acc, s) => acc + s.questions.length, 0);
fs.writeFileSync(path.join(outDir, 'part3.json'), JSON.stringify(part3Data, null, 2), 'utf-8');
console.log(`✓ Part 3: ${part3Data.length} sets (${p3Questions} questions)`);

// Part 4: 30 questions (10 sets)
const p4Questions = part4Data.reduce((acc, s) => acc + s.questions.length, 0);
fs.writeFileSync(path.join(outDir, 'part4.json'), JSON.stringify(part4Data, null, 2), 'utf-8');
console.log(`✓ Part 4: ${part4Data.length} sets (${p4Questions} questions)`);

// Part 5: 30 questions
fs.writeFileSync(path.join(outDir, 'part5.json'), JSON.stringify(part5Data, null, 2), 'utf-8');
console.log(`✓ Part 5: ${part5Data.length} questions`);

// Part 6: 16 questions (4 passages)
const p6Questions = part6Data.reduce((acc, p) => acc + p.questions.length, 0);
fs.writeFileSync(path.join(outDir, 'part6.json'), JSON.stringify(part6Data, null, 2), 'utf-8');
console.log(`✓ Part 6: ${part6Data.length} passages (${p6Questions} questions)`);

// Part 7: 54 questions (15 passage sets)
const p7Questions = part7Data.reduce((acc, p) => acc + p.questions.length, 0);
fs.writeFileSync(path.join(outDir, 'part7.json'), JSON.stringify(part7Data, null, 2), 'utf-8');
console.log(`✓ Part 7: ${part7Data.length} passage sets (${p7Questions} questions)`);

const totalTest3Questions = part1Data.length + part2Data.length + p3Questions + p4Questions + part5Data.length + p6Questions + p7Questions;
console.log(`\n=> TOTAL TEST 3 QUESTIONS: ${totalTest3Questions}`);

// Register in tests_index.json
const indexFilePath = path.join(rootDir, 'public', 'data', 'tests_index.json');
let testsIndex: any[] = [];
if (fs.existsSync(indexFilePath)) {
  testsIndex = JSON.parse(fs.readFileSync(indexFilePath, 'utf-8'));
}

const test3Id = 'ets2022_test3';
const existingIdx = testsIndex.findIndex(t => t.id === test3Id);
const test3Entry = {
  id: test3Id,
  name: "ETS 2022 - Test 3",
  year: 2022,
  path: "/data/ets2022/test3"
};

if (existingIdx >= 0) {
  testsIndex[existingIdx] = test3Entry;
} else {
  testsIndex.push(test3Entry);
}

fs.writeFileSync(indexFilePath, JSON.stringify(testsIndex, null, 2), 'utf-8');
console.log(`✓ Registered test into tests_index.json. Total tests registered: ${testsIndex.length}`);
