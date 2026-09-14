import fs from 'fs';
import path from 'path';
import assert from 'assert';

const ROOT = process.cwd();

console.log('=== TEST 1: Kiểm tra tệp âm thanh Studio HD trong public/audio/masterclass ===');
const audioDir = path.join(ROOT, 'public', 'audio', 'masterclass');
assert(fs.existsSync(audioDir), 'Thư mục public/audio/masterclass phải tồn tại');

const expectedAudioFiles = [
  'csl_1_british_glottal_1x.mp3',
  'csl_1_british_glottal_075x.mp3',
  'csl_2_american_flapped_t_1x.mp3',
  'csl_2_american_flapped_t_075x.mp3',
  'csl_3_australian_vowel_shift_1x.mp3',
  'csl_3_australian_vowel_shift_075x.mp3',
  'csl_4_weak_forms_elision_1x.mp3',
  'csl_4_weak_forms_elision_075x.mp3'
];

expectedAudioFiles.forEach((file) => {
  const filePath = path.join(audioDir, file);
  assert(fs.existsSync(filePath), `Tệp ${file} phải tồn tại`);
  const stats = fs.statSync(filePath);
  assert(stats.size > 10000, `Tệp ${file} phải có dung lượng hợp lệ (> 10KB), thực tế: ${stats.size} bytes`);
  console.log(`PASS: ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
});

console.log('\n=== TEST 2: Kiểm tra dữ liệu bài học Connected Speech Lab ===');
const labPath = path.join(ROOT, 'src', 'data', 'masterclass', 'connectedSpeechLab.ts');
const labContent = fs.readFileSync(labPath, 'utf8');

assert(labContent.includes('csl_1_british_glottal'), 'Phải có csl_1_british_glottal');
assert(labContent.includes('The quarterly report is certainly not written yet.'), 'Phải có câu mẫu quarterly report');
assert(labContent.includes('/ðə ˈkwɔːtəli rɪˈpɔːt ɪz ˈsɜːʔnli nɒʔ ˈrɪʔn jɛt/'), 'Phải có phiên âm IPA chính xác');
assert(labContent.includes('audioNormalUrl: \'/audio/masterclass/csl_1_british_glottal_1x.mp3\''), 'Phải có audioNormalUrl cho lesson 1');
assert(labContent.includes('audioSlowUrl: \'/audio/masterclass/csl_1_british_glottal_075x.mp3\''), 'Phải có audioSlowUrl cho lesson 1');
assert(labContent.includes('wordAlignments:'), 'Phải có wordAlignments');
assert(labContent.includes('Glottal Stop /ʔ/'), 'Phải có chú thích hiện tượng Glottal Stop');
console.log('PASS: Dữ liệu bài học và bóc tách âm học đạt 100% tiêu chí');

console.log('\n=== TEST 3: Kiểm tra tích hợp Lộ trình mục tiêu (Study Plan Engine) ===');
const enginePath = path.join(ROOT, 'src', 'utils', 'studyPlanEngine.ts');
const engineContent = fs.readFileSync(enginePath, 'utf8');

assert(engineContent.includes('\'masterclass\''), 'PlanTask type phải chứa \'masterclass\'');
assert(engineContent.includes('markMasterclassCompletedInPlan'), 'Phải có hàm markMasterclassCompletedInPlan');
assert(engineContent.includes('targetScore >= 800'), 'Phải có nhánh xử lý cho targetScore >= 800');
console.log('PASS: studyPlanEngine đã tích hợp Masterclass đầy đủ');

console.log('\n=== TEST 4: Quét toàn diện Emoji UI vi phạm (NO UI EMOJIS STRICT) ===');
const filesToAudit = [
  'src/schema/masterclass.ts',
  'src/data/masterclass/connectedSpeechLab.ts',
  'src/components/masterclass/ConnectedSpeechPlayer.tsx',
  'src/components/masterclass/ConnectedSpeechPlayer.module.css',
  'src/components/masterclass/DailyMasterclassHub.tsx',
  'src/utils/studyPlanEngine.ts',
  'src/app/study-plan/page.tsx'
];

const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]/u;

filesToAudit.forEach((relPath) => {
  const fullPath = path.join(ROOT, relPath);
  const content = fs.readFileSync(fullPath, 'utf8');
  // Check for forbidden symbols like ✓, 🎯, 🚀 etc.
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // allow comments or glottal stop /ʔ/ (glottal stop is a valid linguistic IPA character \u0294, not an emoji)
    if (emojiRegex.test(line)) {
      throw new Error(`Phát hiện emoji vi phạm tại ${relPath}:${idx + 1}: ${line.trim()}`);
    }
    if (line.includes('✓')) {
      throw new Error(`Phát hiện ký tự checkmark unicode ✓ tại ${relPath}:${idx + 1}: ${line.trim()}`);
    }
  });
  console.log(`PASS 0 Emoji: ${relPath}`);
});

console.log('\n=== TẤT CẢ CÁC BÀI KIỂM THỬ TOÀN VẸN ĐÃ VƯỢT QUA 100%! ===');
