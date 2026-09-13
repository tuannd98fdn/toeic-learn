import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const AUDIO_DIR = path.join(ROOT_DIR, 'public', 'audio', 'ets2022', 'test2');
const DATA_DIR = path.join(ROOT_DIR, 'public', 'data', 'ets2022', 'test2');

console.log('=== VERIFYING ETS 2022 TEST 2 AUDIO INTEGRITY ===\n');

let errors = 0;
const audioUrlSet = new Set();
let totalQuestions = 0;

['part1', 'part2', 'part3', 'part4'].forEach(part => {
  const jsonPath = path.join(DATA_DIR, `${part}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ Missing data file: ${jsonPath}`);
    errors++;
    return;
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  if (part === 'part1' || part === 'part2') {
    data.forEach(q => {
      totalQuestions++;
      if (!q.audioUrl) {
        console.error(`❌ Q${q.number} in ${part} has NO audioUrl`);
        errors++;
        return;
      }
      if (!q.audioUrl.startsWith('/audio/ets2022/test2/')) {
        console.error(`❌ Q${q.number} audioUrl does not start with /audio/ets2022/test2/: ${q.audioUrl}`);
        errors++;
      }
      if (audioUrlSet.has(q.audioUrl)) {
        console.error(`❌ Duplicate audioUrl detected for Q${q.number}: ${q.audioUrl}`);
        errors++;
      }
      audioUrlSet.add(q.audioUrl);

      const filePath = path.join(ROOT_DIR, 'public', q.audioUrl.slice(1));
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Audio file does not exist on disk: ${filePath}`);
        errors++;
      } else {
        const stats = fs.statSync(filePath);
        if (stats.size < 10000) {
          console.error(`❌ Audio file too small (${stats.size} bytes): ${filePath}`);
          errors++;
        }
      }
    });
  } else {
    data.forEach((group, gIdx) => {
      totalQuestions += (group.questions || []).length;
      if (!group.audioUrl) {
        console.error(`❌ Group ${gIdx + 1} in ${part} has NO audioUrl`);
        errors++;
        return;
      }
      if (!group.audioUrl.startsWith('/audio/ets2022/test2/')) {
        console.error(`❌ Group ${gIdx + 1} audioUrl does not start with /audio/ets2022/test2/: ${group.audioUrl}`);
        errors++;
      }
      if (audioUrlSet.has(group.audioUrl)) {
        console.error(`❌ Duplicate audioUrl detected for Group ${gIdx + 1}: ${group.audioUrl}`);
        errors++;
      }
      audioUrlSet.add(group.audioUrl);

      const filePath = path.join(ROOT_DIR, 'public', group.audioUrl.slice(1));
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Audio file does not exist on disk: ${filePath}`);
        errors++;
      } else {
        const stats = fs.statSync(filePath);
        if (stats.size < 10000) {
          console.error(`❌ Audio file too small (${stats.size} bytes): ${filePath}`);
          errors++;
        }
      }
    });
  }
});

// Check overlap with Test 1
const t1AudioUrls = new Set();
['part1', 'part2', 'part3', 'part4'].forEach(part => {
  const jsonPath = path.join(ROOT_DIR, 'public', 'data', 'ets2022', 'test1', `${part}.json`);
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  if (part === 'part1' || part === 'part2') {
    data.forEach(q => t1AudioUrls.add(q.audioUrl));
  } else {
    data.forEach(g => t1AudioUrls.add(g.audioUrl));
  }
});

let overlapCount = 0;
audioUrlSet.forEach(url => {
  if (t1AudioUrls.has(url)) {
    console.error(`❌ Audio overlap between Test 1 and Test 2: ${url}`);
    overlapCount++;
    errors++;
  }
});

console.log(`\n=== RESULTS ===`);
console.log(`Total Listening questions checked: ${totalQuestions}`);
console.log(`Total unique Test 2 audio files: ${audioUrlSet.size}`);
console.log(`Total Test 1 audio files: ${t1AudioUrls.size}`);
console.log(`Overlapping audio URLs: ${overlapCount}`);
console.log(`Total Errors: ${errors}`);

if (errors === 0) {
  console.log('\n✅ 100% PASS: All Test 2 Listening audio files are valid, distinct, and correctly mapped!');
  process.exit(0);
} else {
  console.error(`\n❌ FAILED with ${errors} errors.`);
  process.exit(1);
}
