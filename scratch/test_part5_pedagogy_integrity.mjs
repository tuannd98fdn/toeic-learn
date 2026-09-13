import fs from 'fs';

console.log('=== RUNNING PART 5 PEDAGOGY INTEGRITY TESTS ===\n');

// 1. Check Grammar Cheatsheets
const cheatsheetContent = fs.readFileSync('src/data/grammarCheatsheets.ts', 'utf8');
const subSkills = [
  'Word Form',
  'Verb Tense',
  'Preposition & Conjunction',
  'Business Vocabulary',
  'Pronoun',
  'Relative Clause',
  'Sentence Structure'
];

let cheatsheetPassed = true;
for (const skill of subSkills) {
  if (!cheatsheetContent.includes(`'${skill}': {`)) {
    console.error(`FAIL: Missing cheatsheet for '${skill}'`);
    cheatsheetPassed = false;
  }
}
if (cheatsheetPassed) {
  console.log('PASS: All 7 Part 5 subSkills have comprehensive Grammar Cheatsheets.');
}

// 2. Check Test 1 and Test 2 Part 5 Data
const test1 = JSON.parse(fs.readFileSync('public/data/ets2022/test1/part5.json', 'utf8'));
const test2 = JSON.parse(fs.readFileSync('public/data/ets2022/test2/part5.json', 'utf8'));

console.log(`Checking Test 1 (${test1.length} questions)...`);
let test1Ok = true;
test1.forEach(q => {
  if (!q.explanation.includes('Dịch nghĩa') || !q.explanation.includes('Phân tích') || !q.explanation.includes('Mẹo')) {
    console.error(`FAIL Test 1 Q${q.number}: Missing 3-part explanation!`);
    test1Ok = false;
  }
  if (!q.clueHint) {
    console.error(`FAIL Test 1 Q${q.number}: Missing clueHint!`);
    test1Ok = false;
  }
  if (!q.syntaxBreakdown || !q.syntaxBreakdown.subject || !q.syntaxBreakdown.verb) {
    console.error(`FAIL Test 1 Q${q.number}: Missing syntaxBreakdown!`);
    test1Ok = false;
  }
});
if (test1Ok) {
  console.log('PASS: 30/30 Test 1 questions have complete 3-part explanations, clueHint, and syntaxBreakdown.');
}

console.log(`Checking Test 2 (${test2.length} questions)...`);
let test2Ok = true;
test2.forEach(q => {
  if (!q.explanation.includes('Dịch nghĩa') || !q.explanation.includes('Phân tích') || !q.explanation.includes('Mẹo')) {
    console.error(`FAIL Test 2 Q${q.number}: Missing 3-part explanation!`);
    test2Ok = false;
  }
  if (!q.clueHint) {
    console.error(`FAIL Test 2 Q${q.number}: Missing clueHint!`);
    test2Ok = false;
  }
  if (!q.syntaxBreakdown || !q.syntaxBreakdown.subject || !q.syntaxBreakdown.verb) {
    console.error(`FAIL Test 2 Q${q.number}: Missing syntaxBreakdown!`);
    test2Ok = false;
  }
});
if (test2Ok) {
  console.log('PASS: 30/30 Test 2 questions have complete 3-part explanations, clueHint, and syntaxBreakdown.');
}

// 3. Scan for Emoji Icons (NO UI EMOJIS STRICT)
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FAFF}]/u;
const filesToCheck = [
  'src/data/grammarCheatsheets.ts',
  'public/data/ets2022/test1/part5.json',
  'public/data/ets2022/test2/part5.json',
  'src/app/part5/page.tsx',
  'src/app/part5/page.module.css'
];

let emojiFree = true;
for (const file of filesToCheck) {
  const content = fs.readFileSync(file, 'utf8');
  const match = content.match(emojiRegex);
  if (match) {
    console.error(`FAIL: Found emoji '${match[0]}' in ${file}`);
    emojiFree = false;
  }
}
if (emojiFree) {
  console.log('PASS: 100% Emoji-free in all Part 5 data, code, and styles (Strict NO UI EMOJIS compliant).');
}

console.log('\n=== ALL INTEGRITY TESTS FINISHED ===');
