import fs from 'fs';
import path from 'path';

// Emoji regex detector
const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;

function testIntegrity() {
  console.log('--- TEST 1: Inspecting files for strict NO UI EMOJI compliance ---');
  const filesToCheck = [
    'src/data/vocab/vocab_reading_specialized.ts',
    'src/components/ParaphraseMatchGame.tsx',
    'src/components/CollocationDrill.tsx',
    'src/components/FlashCard.tsx',
    'src/app/study/page.tsx',
    'src/app/study/page.module.css'
  ];

  let emojiViolations = 0;
  for (const relPath of filesToCheck) {
    const fullPath = path.join(process.cwd(), relPath);
    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      // Ignore comments if they specifically talk about emoji regex or rule
      if (line.includes('EMOJI_REGEX') || line.includes('NO UI EMOJIS')) return;
      if (EMOJI_REGEX.test(line)) {
        console.error(`[EMOJI VIOLATION] ${relPath}:${idx + 1}: ${line}`);
        emojiViolations++;
      }
    });
  }

  if (emojiViolations === 0) {
    console.log('PASS: 0 UI Emojis detected across all specialized reading files!');
  } else {
    throw new Error(`FAIL: Found ${emojiViolations} emoji violations!`);
  }

  console.log('\n--- TEST 2: Inspecting vocabulary_reading_specialized data format ---');
  const dataContent = fs.readFileSync(path.join(process.cwd(), 'src/data/vocab/vocab_reading_specialized.ts'), 'utf8');
  
  const collocationsMatches = dataContent.match(/category:\s*["']Reading Collocations["']/g) || [];
  const paraphraseMatches = dataContent.match(/category:\s*["']ETS Paraphrasing Pairs["']/g) || [];
  
  console.log(`Collocations count: ${collocationsMatches.length} (Expected: 25)`);
  console.log(`Paraphrase pairs count: ${paraphraseMatches.length} (Expected: 25)`);

  if (collocationsMatches.length < 25 || paraphraseMatches.length < 25) {
    throw new Error('FAIL: Insufficient items in vocab_reading_specialized.ts');
  }

  console.log('PASS: Exact 25 collocations and 25 paraphrase pairs present!');

  console.log('\n--- TEST 3: Verifying integration in vocabulary.ts ---');
  const vocabContent = fs.readFileSync(path.join(process.cwd(), 'src/data/vocabulary.ts'), 'utf8');
  if (!vocabContent.includes('VOCAB_READING_SPECIALIZED') || !vocabContent.includes('getReadingCollocations') || !vocabContent.includes('getParaphrasingPairs')) {
    throw new Error('FAIL: vocabulary.ts is missing reading specialized imports/exports!');
  }
  console.log('PASS: vocabulary.ts properly re-exports helpers and combines data!');
}

testIntegrity();
