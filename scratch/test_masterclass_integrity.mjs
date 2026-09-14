import fs from 'fs';
import path from 'path';

// Regex to detect emoji in strings
const EMOJI_REGEX = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{23FA}-\u{23FF}]/u;

console.log('=== RUNNING MASTERCLASS INTEGRITY & NO-EMOJI AUDIT ===');

const filesToScan = [
  'src/schema/masterclass.ts',
  'src/data/masterclass/connectedSpeechLab.ts',
  'src/data/masterclass/businessScenarios.ts',
  'src/data/masterclass/advancedGrammarInversions.ts',
  'src/data/masterclass/masterclassPacks.ts',
  'src/components/masterclass/ConnectedSpeechPlayer.tsx',
  'src/components/masterclass/ConnectedSpeechPlayer.module.css',
  'src/components/masterclass/ParaphraseDecoderCard.tsx',
  'src/components/masterclass/ParaphraseDecoderCard.module.css',
  'src/components/masterclass/HighScoreChallengeCard.tsx',
  'src/components/masterclass/HighScoreChallengeCard.module.css',
  'src/components/masterclass/DailyMasterclassHub.tsx',
  'src/components/masterclass/DailyMasterclassHub.module.css',
  'src/app/masterclass/page.tsx',
  'src/app/masterclass/page.module.css'
];

let hasError = false;

for (const relPath of filesToScan) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`[FAIL] File not found: ${relPath}`);
    hasError = true;
    continue;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  if (EMOJI_REGEX.test(content)) {
    const match = content.match(EMOJI_REGEX);
    console.error(`[FAIL] Forbidden UI emoji found in ${relPath}: ${match ? match[0] : 'unknown'}`);
    hasError = true;
  } else {
    console.log(`[PASS] 0 emojis found in ${relPath}`);
  }
}

if (hasError) {
  console.error('\nFAILED: Emoji audit encountered violations.');
  process.exit(1);
} else {
  console.log('\nSUCCESS: 100% of Masterclass files passed No UI Emoji Audit!');
}
