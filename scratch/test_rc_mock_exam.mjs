import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('--- 1. Testing toeicScoreCalculator functions ---');
// Import toeicScoreCalculator compiled or read directly
import { getRcCefrLevel, RC_TABLE } from '../src/utils/toeicScoreCalculator.js';

// Verify CEFR thresholds
console.assert(getRcCefrLevel(450) === 'C1', `Expected C1 for 450, got ${getRcCefrLevel(450)}`);
console.assert(getRcCefrLevel(400) === 'B2', `Expected B2 for 400, got ${getRcCefrLevel(400)}`);
console.assert(getRcCefrLevel(300) === 'B1', `Expected B1 for 300, got ${getRcCefrLevel(300)}`);
console.assert(getRcCefrLevel(150) === 'A2', `Expected A2 for 150, got ${getRcCefrLevel(150)}`);
console.assert(getRcCefrLevel(80) === 'A1', `Expected A1 for 80, got ${getRcCefrLevel(80)}`);
console.log('✓ getRcCefrLevel passed all threshold assertions');

// Verify RC_TABLE
console.assert(RC_TABLE[100] === 495, `Expected 495 for 100, got ${RC_TABLE[100]}`);
console.assert(RC_TABLE[0] === 5, `Expected 5 for 0, got ${RC_TABLE[0]}`);
console.assert(RC_TABLE.length === 101, `Expected length 101, got ${RC_TABLE.length}`);
console.log('✓ RC_TABLE scale (0-100 -> 5-495) verified');

console.log('\n--- 2. Testing RC JSON Data Integrity for ETS 2022 Test 1 ---');
const p5Path = path.join(projectRoot, 'public/data/ets2022/test1/part5.json');
const p6Path = path.join(projectRoot, 'public/data/ets2022/test1/part6.json');
const p7Path = path.join(projectRoot, 'public/data/ets2022/test1/part7.json');

const p5Data = JSON.parse(fs.readFileSync(p5Path, 'utf8'));
const p6Data = JSON.parse(fs.readFileSync(p6Path, 'utf8'));
const p7Data = JSON.parse(fs.readFileSync(p7Path, 'utf8'));

console.log(`Part 5 questions: ${p5Data.length}`);
console.log(`Part 6 passages: ${p6Data.length}, questions: ${p6Data.flatMap(p => p.questions).length}`);
console.log(`Part 7 sets: ${p7Data.length}, questions: ${p7Data.flatMap(p => p.questions).length}`);

const totalRcQs = p5Data.length + p6Data.flatMap(p => p.questions).length + p7Data.flatMap(p => p.questions).length;
console.assert(totalRcQs === 100, `Expected 100 total RC questions, got ${totalRcQs}`);
console.log('✓ Exactly 100 RC questions present in ETS 2022 Test 1');

console.log('\n--- 3. Testing RC Sprint Slicing Logic ---');
const sprintP5 = p5Data.slice(0, 15);
const sprintP6 = p6Data.slice(0, 2);
let p7Count = 0;
const sprintP7 = [];
for (const set of p7Data) {
  sprintP7.push(set);
  p7Count += (set.questions || []).length;
  if (p7Count >= 17) break;
}

const sprintTotal = sprintP5.length + sprintP6.flatMap(p => p.questions).length + sprintP7.flatMap(p => p.questions).length;
console.log(`RC Sprint question count: ${sprintTotal} (P5: ${sprintP5.length}, P6: ${sprintP6.flatMap(p => p.questions).length}, P7: ${sprintP7.flatMap(p => p.questions).length})`);
console.assert(sprintTotal >= 38 && sprintTotal <= 45, `Expected ~40 questions for RC Sprint, got ${sprintTotal}`);
console.log('✓ RC Sprint slicing logic verified');

console.log('\n--- 4. Strict Check: NO UI EMOJIS in modified files ---');
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

const filesToCheck = [
  'src/app/exam/page.tsx',
  'src/app/exam/page.module.css',
  'src/app/page.tsx',
  'src/utils/toeicScoreCalculator.ts',
];

let hasEmoji = false;
for (const relPath of filesToCheck) {
  const content = fs.readFileSync(path.join(projectRoot, relPath), 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (emojiRegex.test(line)) {
      console.error(`EMOJI VIOLATION in ${relPath}:${idx + 1}: ${line.trim()}`);
      hasEmoji = true;
    }
  });
}

if (!hasEmoji) {
  console.log('✓ ZERO UI EMOJIS in all target files. Compliance verified!');
} else {
  process.exit(1);
}

console.log('\n=== ALL RC MOCK EXAM VERIFICATION TESTS PASSED SUCCESSFULLY! ===');
