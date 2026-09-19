import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Import data
import { VOCAB_450 } from '../src/data/vocab/vocab_450.ts';
import { VOCAB_650 } from '../src/data/vocab/vocab_650.ts';
import { VOCAB_800 } from '../src/data/vocab/vocab_800.ts';
import { VOCAB_READING_SPECIALIZED } from '../src/data/vocab/vocab_reading_specialized.ts';
import { TOEIC_TOPICS } from '../src/data/vocabulary.ts';

const TOPIC_NAME_MAP = {};
TOEIC_TOPICS.forEach(t => {
  TOPIC_NAME_MAP[t.id] = t.nameEn;
});

// Word-level category overrides for words that belong in more precise topics
const WORD_TOPIC_OVERRIDES = {
  // Office & Administration
  'appointment': 'office',
  'available': 'office',
  'cafeteria': 'office',
  'confirm': 'office',
  'memo': 'office',
  'message': 'office',
  'notice': 'office',
  'notify': 'office',
  'postpone': 'office',
  'prepare': 'office',
  'remind': 'office',
  'urgent': 'office',
  'register': 'office',
  'identification': 'office',
  'schedule': 'office',
  'equipment': 'office',
  'instruction': 'office',
  'manual': 'office',
  'stationery': 'office',
  'cartridge': 'office',
  'device': 'office',
  'duration': 'office',
  'duplicate': 'office',
  'protocol': 'office',
  'procedure': 'office',
  'guideline': 'office',
  'obsolete': 'office',
  'optimize': 'office',

  // Marketing & Sales
  'advertisement': 'marketing',
  'inexpensive': 'marketing',
  'discount': 'marketing',
  'display': 'marketing',
  'purchase': 'marketing',
  'coupon': 'marketing',
  'vendor': 'marketing',
  'brochure': 'marketing',
  'campaign': 'marketing',
  'demographic': 'marketing',
  'endorse': 'marketing',
  'exclusive': 'marketing',
  'exhibition': 'marketing',
  'illustration': 'marketing',
  'innovative': 'marketing',
  'merchandise': 'marketing',
  'niche': 'marketing',
  'penetrate': 'marketing',
  'promotional': 'marketing',
  'prospective': 'marketing',
  'reputable': 'marketing',

  // Customer Relations
  'complaint': 'customer_service',
  'feedback': 'customer_service',
  'inquiry': 'customer_service',
  'patient': 'customer_service',
  'prompt': 'customer_service',
  'hesitate': 'customer_service',
  'client': 'customer_service',
  'warranty': 'customer_service',

  // Real Estate & Facilities
  'facility': 'real_estate',
  'lobby': 'real_estate',
  'renovation': 'real_estate',
  'entrance': 'real_estate',
  'garage': 'real_estate',
  'estate': 'real_estate',
  'lease': 'real_estate',
  'occupant': 'real_estate',
  'premises': 'real_estate',
  'loft': 'real_estate',
  'encumbrance': 'real_estate',
  'alteration': 'real_estate',

  // Travel & Hospitality
  'downtown': 'travel',
  'cancel': 'travel',
  'direction': 'travel',
  'baggage': 'travel',
  'boarding pass': 'travel',
  'flight': 'travel',
  'luggage': 'travel',
  'passenger': 'travel',
  'passport': 'travel',
  'reservation': 'travel',
  'terminal': 'travel',
  'ticket': 'travel',
  'banquet': 'travel',
  'platform': 'travel',
  'aisle': 'travel',
  'beverage': 'travel',
  'flight attendant': 'travel',
  'laundry': 'travel',
  'shuttle': 'travel',
  'turnstile': 'travel',
  'luncheon': 'travel',

  // Purchasing & Logistics
  'delay': 'logistics',
  'deliver': 'logistics',
  'inventory': 'logistics',
  'order': 'logistics',
  'courier': 'logistics',
  'damage': 'logistics',
  'package': 'logistics',
  'supplier': 'logistics',
  'dispatch': 'logistics',
  'distribution': 'logistics',
  'expedite': 'logistics',
  'fulfill': 'logistics',
  'procure': 'logistics',
  'bottleneck': 'logistics',

  // Manufacturing & Quality
  'maintenance': 'manufacturing',
  'repair': 'manufacturing',
  'operate': 'manufacturing',
  'replace': 'manufacturing',
  'technician': 'manufacturing',
  'assurance': 'manufacturing',
  'capacity': 'manufacturing',
  'defective': 'manufacturing',
  'deteriorate': 'manufacturing',
  'efficiency': 'manufacturing',
  'inspection': 'manufacturing',
  'precaution': 'manufacturing',
  'productivity': 'manufacturing',
  'precision': 'manufacturing',
  'durability': 'manufacturing',
  'overhaul': 'manufacturing',
  'rigorous': 'manufacturing',
  'tolerance': 'manufacturing',
  'calibrate': 'manufacturing',
  'protective': 'manufacturing',
  'adequate': 'manufacturing',

  // Personnel & HR
  'exceptional': 'personnel',
  'interaction': 'personnel',
  'persistent': 'personnel',
  'reluctant': 'personnel',
  'commensurate': 'personnel',
  'diligent': 'personnel',
  'exemplary': 'personnel',
  'indispensable': 'personnel',
  'meticulous': 'personnel',
  'predecessor': 'personnel',
  'prerequisite': 'personnel',
  'redundant': 'personnel',
  'remuneration': 'personnel',

  // Finance & Accounting
  'considerable': 'finance',
  'substantially': 'finance',
  'adversely': 'finance',
  'curtail': 'finance',
  'discrepancy': 'finance',
  'discretionary': 'finance',
  'equity': 'finance',
  'exorbitant': 'finance',
  'extrapolate': 'finance',
  'fiduciary': 'finance',
  'fluctuation': 'finance',
  'insolvent': 'finance',
  'liquidity': 'finance',
  'precarious': 'finance',
  'reconciliation': 'finance',
  'scrutinize': 'finance',
  'solvency': 'finance',
  'speculative': 'finance',
  'syndicate': 'finance',
  'venture capital': 'finance',
  'volatile': 'finance',
  'accrual': 'finance',
  'amortization': 'finance',
  'arbitrage': 'finance',
  'default': 'finance',
  'deflationary': 'finance',
  'fiduciary duty': 'finance',
  'utility': 'finance',

  // Corporate & Management
  'indicate': 'corporate',
  'beneficial': 'corporate',
  'comprehensive': 'corporate',
  'conduct': 'corporate',
  'consequently': 'corporate',
  'crucial': 'corporate',
  'forthcoming': 'corporate',
  'fundamental': 'corporate',
  'interfere': 'corporate',
  'investigation': 'corporate',
  'notable': 'corporate',
  'unfavorable': 'corporate',
  'corporate merger': 'corporate',
  'sacrifice': 'corporate',
  'conglomerate': 'corporate',
  'cumbersome': 'corporate',
  'disparate': 'corporate',
  'expedient': 'corporate',
  'formidable': 'corporate',
  'imperative': 'corporate',
  'impending': 'corporate',
  'inevitable': 'corporate',
  'instigate': 'corporate',
  'judicious': 'corporate',
  'monopoly': 'corporate',
  'paradigm': 'corporate',
  'privatization': 'corporate',
  'reciprocal': 'corporate',
  'restructuring': 'corporate',
  'stakeholder': 'corporate',
  'stringent': 'corporate',
  'subsidiary': 'corporate',
  'succession': 'corporate',
  'tentative': 'corporate',
  'turnaround': 'corporate',
  'unanimous': 'corporate',
  'unprecedented': 'corporate',

  // Contracts & Legal
  'amicably': 'contracts',
  'arbitration': 'contracts',
  'breach': 'contracts',
  'collusion': 'contracts',
  'contingent': 'contracts',
  'disclaimer': 'contracts',
  'equivocal': 'contracts',
  'indemnify': 'contracts',
  'inflexible': 'contracts',
  'injunction': 'contracts',
  'jurisdiction': 'contracts',
  'litigation': 'contracts',
  'negligence': 'contracts',
  'null and void': 'contracts',
  'precedent': 'contracts',
  'redress': 'contracts',
  'statutory': 'contracts',
  'stipulate': 'contracts',
  'unambiguous': 'contracts'
};

// Fallback category map
const OLD_CAT_TO_TOPIC_ID = {
  'Contracts & Legal': 'contracts',
  'Corporate & Management': 'corporate',
  'Personnel & HR': 'personnel',
  'Finance & Accounting': 'finance',
  'Marketing & Sales': 'marketing',
  'Logistics & Shipping': 'logistics',
  'Manufacturing & Quality': 'manufacturing',
  'Travel & Hospitality': 'travel',
  'Real Estate & Location': 'real_estate',
  'Office & Technology': 'office',
  'General Business': 'corporate',
  'Reading Collocations': 'collocations_paraphrase',
  'ETS Paraphrasing Pairs': 'collocations_paraphrase',
};

// Import replacements
import { REPLACEMENTS_450, REPLACEMENTS_650, REPLACEMENTS_800 } from './scratch_replacements.mjs';

function processList(originalList, replacements, defaultBand) {
  return originalList.map(item => {
    // Check if replaced
    let wordObj = replacements[item.id] ? { ...replacements[item.id] } : { ...item };

    // Determine topicId
    const wordKey = wordObj.word.toLowerCase();
    let topicId = wordObj.topicId || WORD_TOPIC_OVERRIDES[wordKey] || OLD_CAT_TO_TOPIC_ID[wordObj.category] || 'corporate';
    
    // Set canonical category
    wordObj.topicId = topicId;
    wordObj.category = TOPIC_NAME_MAP[topicId] || 'Corporate & Management';
    wordObj.targetBand = wordObj.targetBand || defaultBand;

    return wordObj;
  });
}

const cleaned450 = processList(VOCAB_450, REPLACEMENTS_450, '450+');
const cleaned650 = processList(VOCAB_650, REPLACEMENTS_650, '650+');
const cleaned800 = processList(VOCAB_800, REPLACEMENTS_800, '800+');
const cleanedReading = VOCAB_READING_SPECIALIZED.map(item => ({
  ...item,
  topicId: 'collocations_paraphrase',
  category: 'Collocations & Paraphrase'
}));

const allWords = [...cleaned450, ...cleaned650, ...cleaned800, ...cleanedReading];

// Stats & Checks
console.log('Total words:', allWords.length);

const wordCountsByTopic = {};
const seenWords = new Set();
const duplicates = [];

for (const w of allWords) {
  wordCountsByTopic[w.category] = (wordCountsByTopic[w.category] || 0) + 1;
  const lower = w.word.toLowerCase();
  if (seenWords.has(lower)) {
    duplicates.push(w.word);
  }
  seenWords.add(lower);
}

console.log('Topic Distribution:');
for (const [topic, count] of Object.entries(wordCountsByTopic)) {
  console.log(`  ${topic}: ${count}`);
}

if (duplicates.length > 0) {
  console.error('DUPLICATES FOUND:', duplicates);
  process.exit(1);
} else {
  console.log('Zero duplicates! All 453 words are distinct.');
}

// Generate TS files
function writeTsFile(filePath, varName, list) {
  const content = `import { VocabularyWord } from '../vocabulary';\n\nexport const ${varName}: VocabularyWord[] = ${JSON.stringify(list, null, 2)};\n`;
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Wrote ${list.length} words to ${filePath}`);
}

writeTsFile(path.join(rootDir, 'src/data/vocab/vocab_450.ts'), 'VOCAB_450', cleaned450);
writeTsFile(path.join(rootDir, 'src/data/vocab/vocab_650.ts'), 'VOCAB_650', cleaned650);
writeTsFile(path.join(rootDir, 'src/data/vocab/vocab_800.ts'), 'VOCAB_800', cleaned800);
writeTsFile(path.join(rootDir, 'src/data/vocab/vocab_reading_specialized.ts'), 'VOCAB_READING_SPECIALIZED', cleanedReading);

console.log('All vocabulary files updated successfully!');
