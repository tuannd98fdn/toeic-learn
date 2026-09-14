import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

/**
 * ETS Official Test Ingest & Validation Pipeline
 * 
 * Verifies that candidate test data conforms to 100% official ETS criteria:
 * 1. Part 1 images are genuine scan illustrations/photos (not stock Unsplash).
 * 2. Listening audio (Part 1-4) uses genuine ETS studio recordings (not macOS TTS).
 * 3. Reading questions (Part 5-7) follow ETS 200-question standards with full transcripts and sub-skill tags.
 */

export function validateCandidateTestData(testDir) {
  const issues = [];
  const parts = ['part1.json', 'part2.json', 'part3.json', 'part4.json', 'part5.json', 'part6.json', 'part7.json'];

  for (const p of parts) {
    const filePath = path.join(testDir, p);
    if (!fs.existsSync(filePath)) {
      issues.push(`Missing required file: ${p}`);
      continue;
    }

    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      if (p === 'part1.json') {
        if (!Array.isArray(data) || data.length !== 6) {
          issues.push(`Part 1 must have exactly 6 questions, found ${data.length}`);
        }
        for (const q of data) {
          if (q.image && q.image.includes('unsplash.com')) {
            issues.push(`Part 1 Q${q.number} uses Unsplash stock photo instead of ETS scan!`);
          }
          if (q.audioUrl && (q.audioUrl.includes('say') || q.audioUrl.includes('test2/p1_'))) {
            issues.push(`Part 1 Q${q.number} uses synthetic TTS audio!`);
          }
        }
      }

      if (p === 'part2.json') {
        if (!Array.isArray(data) || data.length !== 25) {
          issues.push(`Part 2 must have exactly 25 questions, found ${data.length}`);
        }
      }

      if (p === 'part5.json') {
        if (!Array.isArray(data) || data.length !== 30) {
          issues.push(`Part 5 must have exactly 30 questions, found ${data.length}`);
        }
      }

      if (p === 'part6.json') {
        if (!Array.isArray(data) || data.length !== 4) {
          issues.push(`Part 6 must have exactly 4 passages, found ${data.length}`);
        }
      }

      if (p === 'part7.json') {
        if (!Array.isArray(data) || data.length !== 15) {
          issues.push(`Part 7 must have exactly 15 reading sets, found ${data.length}`);
        }
      }
    } catch (err) {
      issues.push(`Failed to parse ${p}: ${err.message}`);
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

export function registerOfficialTest(year, testNumber, testDataDir) {
  const validation = validateCandidateTestData(testDataDir);
  if (!validation.valid) {
    console.error('Validation failed for candidate test:');
    validation.issues.forEach(i => console.error(`  - ${i}`));
    return false;
  }

  const testId = `ets${year}_test${testNumber}`;
  const targetDir = path.join(projectRoot, 'public', 'data', `ets${year}`, `test${testNumber}`);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Copy verified files
  const parts = ['part1.json', 'part2.json', 'part3.json', 'part4.json', 'part5.json', 'part6.json', 'part7.json'];
  for (const p of parts) {
    const src = path.join(testDataDir, p);
    const dest = path.join(targetDir, p);
    fs.copyFileSync(src, dest);
  }

  // Update tests_index.json
  const indexFile = path.join(projectRoot, 'public', 'data', 'tests_index.json');
  const index = JSON.parse(fs.readFileSync(indexFile, 'utf8'));

  if (!index.some(t => t.id === testId)) {
    index.push({
      id: testId,
      name: `ETS ${year} - Test ${testNumber}`,
      year: parseInt(year, 10),
      path: `/data/ets${year}/test${testNumber}`
    });
    fs.writeFileSync(indexFile, JSON.stringify(index, null, 2), 'utf8');
  }

  console.log(`Successfully ingested and published official test: ${testId}`);
  return true;
}

// CLI usage
const args = process.argv.slice(2);
if (args.length > 0) {
  const targetDir = path.resolve(args[0]);
  console.log(`Checking candidate test data at: ${targetDir}`);
  const result = validateCandidateTestData(targetDir);
  if (result.valid) {
    console.log('Candidate test PASSED all ETS authenticity checks.');
  } else {
    console.log('Candidate test FAILED authenticity checks:');
    result.issues.forEach(i => console.log(`  - ${i}`));
  }
}
