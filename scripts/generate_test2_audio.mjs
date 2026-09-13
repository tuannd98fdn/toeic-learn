import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT_DIR = process.cwd();
const AUDIO_DIR = path.join(ROOT_DIR, 'public', 'audio', 'ets2022', 'test2');
const TEMP_DIR = path.join('/tmp', 'toeic_audio_gen');

if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

function sanitizeText(str) {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/’/g, "'")
    .replace(/‘/g, "'")
    .replace(/“/g, '"')
    .replace(/”/g, '"')
    .replace(/"/g, '\\"')
    .replace(/\$/g, '\\$')
    .replace(/`/g, '\\`');
}

function runSay(voice, text, outAiff) {
  const clean = sanitizeText(text);
  const cmd = `say -v "${voice}" -o "${outAiff}" "${clean}"`;
  execSync(cmd, { stdio: 'pipe' });
}

function convertToMp3(inAiff, outMp3, bitrate = '64k') {
  const cmd = `ffmpeg -y -i "${inAiff}" -acodec libmp3lame -b:a ${bitrate} "${outMp3}"`;
  execSync(cmd, { stdio: 'pipe' });
}

function concatToMp3(aiffFiles, outMp3, bitrate = '64k') {
  const listFile = path.join(TEMP_DIR, `concat_${Date.now()}_${Math.random().toString(36).substring(7)}.txt`);
  const content = aiffFiles.map(f => `file '${f}'`).join('\n');
  fs.writeFileSync(listFile, content, 'utf8');
  const cmd = `ffmpeg -y -f concat -safe 0 -i "${listFile}" -acodec libmp3lame -b:a ${bitrate} "${outMp3}"`;
  execSync(cmd, { stdio: 'pipe' });
  if (fs.existsSync(listFile)) fs.unlinkSync(listFile);
}

// --------------------------------------------------------------------------
// 1. PART 1 (6 questions)
// --------------------------------------------------------------------------
console.log('--- Generating Part 1 Audio (6 questions) ---');
const p1Path = path.join(ROOT_DIR, 'public', 'data', 'ets2022', 'test2', 'part1.json');
const p1Data = JSON.parse(fs.readFileSync(p1Path, 'utf8'));

const p1Voices = ['Samantha', 'Daniel', 'Karen', 'Alex', 'Samantha', 'Daniel'];

p1Data.forEach((q, idx) => {
  const voice = p1Voices[idx % p1Voices.length];
  const cleanTrans = q.transcript
    .replace(/<p>/gi, '')
    .replace(/<\/p>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?[bi]>/gi, '')
    .replace(/Transcript:\s*/gi, '');
  const lines = cleanTrans.split('\n').map(l => l.trim()).filter(Boolean);

  const text = `Number ${q.number}. Look at the photograph marked number ${q.number} in your test book. [[slnc 600]] ${lines[0]} [[slnc 400]] ${lines[1]} [[slnc 400]] ${lines[2]} [[slnc 400]] ${lines[3]}`;
  const aiff = path.join(TEMP_DIR, `p1_${q.number}.aiff`);
  const mp3Name = `p1_0${q.number}.mp3`;
  const mp3Path = path.join(AUDIO_DIR, mp3Name);

  runSay(voice, text, aiff);
  convertToMp3(aiff, mp3Path);
  q.audioUrl = `/audio/ets2022/test2/${mp3Name}`;
  console.log(`✓ Part 1 Q${q.number} -> ${mp3Name} (${fs.statSync(mp3Path).size} bytes)`);
});
fs.writeFileSync(p1Path, JSON.stringify(p1Data, null, 2), 'utf8');

// --------------------------------------------------------------------------
// 2. PART 2 (25 questions: Q7 to Q31)
// --------------------------------------------------------------------------
console.log('\n--- Generating Part 2 Audio (25 questions) ---');
const p2Path = path.join(ROOT_DIR, 'public', 'data', 'ets2022', 'test2', 'part2.json');
const p2Data = JSON.parse(fs.readFileSync(p2Path, 'utf8'));

const p2Voices = ['Samantha', 'Daniel', 'Alex', 'Karen'];

p2Data.forEach((q, idx) => {
  const voice = p2Voices[idx % p2Voices.length];
  const clean = q.transcript
    .replace(/<p>/gi, '')
    .replace(/<\/p>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?[bi]>/gi, '');
  const lines = clean.split('\n').map(l => l.trim()).filter(Boolean);

  const qLine = lines[0];
  const optA = lines[1];
  const optB = lines[2];
  const optC = lines[3];

  const text = `Number ${q.number}. ${qLine} [[slnc 600]] ${optA} [[slnc 400]] ${optB} [[slnc 400]] ${optC}`;
  const aiff = path.join(TEMP_DIR, `p2_${q.number}.aiff`);
  const numStr = q.number < 10 ? `0${q.number}` : `${q.number}`;
  const mp3Name = `p2_${numStr}.mp3`;
  const mp3Path = path.join(AUDIO_DIR, mp3Name);

  runSay(voice, text, aiff);
  convertToMp3(aiff, mp3Path);
  q.audioUrl = `/audio/ets2022/test2/${mp3Name}`;
  console.log(`✓ Part 2 Q${q.number} -> ${mp3Name} (${fs.statSync(mp3Path).size} bytes)`);
});
fs.writeFileSync(p2Path, JSON.stringify(p2Data, null, 2), 'utf8');

// --------------------------------------------------------------------------
// 3. PART 3 (13 conversation sets)
// --------------------------------------------------------------------------
console.log('\n--- Generating Part 3 Multi-voice Audio (13 sets) ---');
const p3Path = path.join(ROOT_DIR, 'public', 'data', 'ets2022', 'test2', 'part3.json');
const p3Data = JSON.parse(fs.readFileSync(p3Path, 'utf8'));

p3Data.forEach((set, idx) => {
  const setNumStr = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;
  const mp3Name = `p3_s${setNumStr}.mp3`;
  const mp3Path = path.join(AUDIO_DIR, mp3Name);

  const clean = set.transcript
    .replace(/<p>/gi, '')
    .replace(/<\/p>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?[bi]>/gi, '');
  const lines = clean.split('\n').map(l => l.trim()).filter(Boolean);

  const aiffFiles = [];

  // Narrator intro
  const narratorAiff = path.join(TEMP_DIR, `p3_s${setNumStr}_intro.aiff`);
  runSay('Daniel', `${set.context} [[slnc 400]]`, narratorAiff);
  aiffFiles.push(narratorAiff);

  // Female and male voices alternating
  const femaleVoice = idx % 2 === 0 ? 'Samantha' : 'Karen';
  const maleVoice = idx % 2 === 0 ? 'Alex' : 'Daniel';

  lines.forEach((line, lineIdx) => {
    let speakerVoice = femaleVoice;
    let spokenLine = line;

    if (line.startsWith('W:') || line.startsWith('Woman:')) {
      speakerVoice = femaleVoice;
      spokenLine = line.replace(/^(W|Woman):\s*/i, '');
    } else if (line.startsWith('M:') || line.startsWith('Man:')) {
      speakerVoice = maleVoice;
      spokenLine = line.replace(/^(M|Man):\s*/i, '');
    }

    const lineAiff = path.join(TEMP_DIR, `p3_s${setNumStr}_line${lineIdx}.aiff`);
    runSay(speakerVoice, `${spokenLine} [[slnc 300]]`, lineAiff);
    aiffFiles.push(lineAiff);
  });

  concatToMp3(aiffFiles, mp3Path, '80k');
  set.audioUrl = `/audio/ets2022/test2/${mp3Name}`;
  console.log(`✓ Part 3 Set ${idx + 1} (Q${set.questions[0].number}-${set.questions[2].number}) -> ${mp3Name} (${fs.statSync(mp3Path).size} bytes)`);
});
fs.writeFileSync(p3Path, JSON.stringify(p3Data, null, 2), 'utf8');

// --------------------------------------------------------------------------
// 4. PART 4 (10 short talk sets)
// --------------------------------------------------------------------------
console.log('\n--- Generating Part 4 Talk Audio (10 sets) ---');
const p4Path = path.join(ROOT_DIR, 'public', 'data', 'ets2022', 'test2', 'part4.json');
const p4Data = JSON.parse(fs.readFileSync(p4Path, 'utf8'));

const p4SpeakerVoices = [
  'Samantha', // Set 1: Sarah dental clinic
  'Daniel',   // Set 2: Airport announcement
  'Alex',     // Set 3: Advertisement
  'Samantha', // Set 4: Speech
  'Daniel',   // Set 5: Tour guide
  'Alex',     // Set 6: Traffic report
  'Karen',    // Set 7: In-store announcement
  'Daniel',   // Set 8: Introduction
  'Samantha', // Set 9: Bar chart talk
  'Alex',     // Set 10: Retreat schedule talk
];

p4Data.forEach((set, idx) => {
  const setNumStr = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;
  const mp3Name = `p4_s${setNumStr}.mp3`;
  const mp3Path = path.join(AUDIO_DIR, mp3Name);

  const clean = set.transcript
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const aiffFiles = [];

  // Narrator intro
  const narratorAiff = path.join(TEMP_DIR, `p4_s${setNumStr}_intro.aiff`);
  runSay('Daniel', `${set.context} [[slnc 600]]`, narratorAiff);
  aiffFiles.push(narratorAiff);

  // Talk body
  const speakerVoice = p4SpeakerVoices[idx % p4SpeakerVoices.length];
  const talkAiff = path.join(TEMP_DIR, `p4_s${setNumStr}_body.aiff`);
  runSay(speakerVoice, clean, talkAiff);
  aiffFiles.push(talkAiff);

  concatToMp3(aiffFiles, mp3Path, '80k');
  set.audioUrl = `/audio/ets2022/test2/${mp3Name}`;
  console.log(`✓ Part 4 Set ${idx + 1} (Q${set.questions[0].number}-${set.questions[2].number}) -> ${mp3Name} (${fs.statSync(mp3Path).size} bytes)`);
});
fs.writeFileSync(p4Path, JSON.stringify(p4Data, null, 2), 'utf8');

// Also synchronize scripts/test2_data files
console.log('\n--- Synchronizing scripts/test2_data files ---');
const t2P1Ts = `export const part1Data = ${JSON.stringify(p1Data, null, 2)};\n`;
fs.writeFileSync(path.join(ROOT_DIR, 'scripts', 'test2_data', 'part1.ts'), t2P1Ts, 'utf8');

const t2P2Ts = `export const part2Data = ${JSON.stringify(p2Data, null, 2)};\n`;
fs.writeFileSync(path.join(ROOT_DIR, 'scripts', 'test2_data', 'part2.ts'), t2P2Ts, 'utf8');

const t2P3Ts = `export const part3Data = ${JSON.stringify(p3Data, null, 2)};\n`;
fs.writeFileSync(path.join(ROOT_DIR, 'scripts', 'test2_data', 'part3.ts'), t2P3Ts, 'utf8');

const t2P4Ts = `export const part4Data = ${JSON.stringify(p4Data, null, 2)};\n`;
fs.writeFileSync(path.join(ROOT_DIR, 'scripts', 'test2_data', 'part4.ts'), t2P4Ts, 'utf8');

console.log('🎉 Successfully generated all 54 local audio files and updated datasets!');
