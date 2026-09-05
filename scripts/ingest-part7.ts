import * as fs from 'fs';
import * as path from 'path';
import { Part7PassageSet, Part7Question, Part7Passage } from '../src/data/part7';

const dataPath = path.join(__dirname, 'raw_toeic.json');
const outputPath = path.join(__dirname, '../src/data/part7_real.ts');

const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Filter Part 7 types
const part7Raw = rawData.filter((i: any) => i.type === 1636615746924);

const passageSets: Part7PassageSet[] = [];

let currentQuestionNumber = 147;

part7Raw.forEach((item: any, index: number) => {
  const content = item.question.text || '';
  
  // Determine if single, double or triple based on separators or text
  // The raw dataset often combines them in one HTML string.
  let passageType: 'Single' | 'Double' | 'Triple' = 'Single';
  if (content.toLowerCase().includes('double passage') || item.childCards.length === 5) {
      if (index > 9) passageType = 'Double'; // Usually later questions are double/triple
  }
  
  const passages: Part7Passage[] = [{
    id: `passage_${index + 1}_1`,
    type: 'Web Page', // default
    content: content,
  }];

  const questions: Part7Question[] = item.childCards.map((child: any, qIndex: number) => {
    
    // In raw dataset, correctAnswer is in `answer.texts` and wrong choices in `answer.choices`
    // We need to figure out A, B, C, D
    // Often they have (A) (B) (C) (D) in the string
    const correctText = child.answer.texts[0] || '';
    const choices = [correctText, ...(child.answer.choices || [])];
    
    // Sort choices to match A, B, C, D
    choices.sort((a, b) => {
      const matchA = a.match(/^\(([A-D])\)/);
      const matchB = b.match(/^\(([A-D])\)/);
      if (matchA && matchB) return matchA[1].localeCompare(matchB[1]);
      return 0;
    });

    let correctLetter = 'A';
    const options: any = { A: '', B: '', C: '', D: '' };
    
    ['A', 'B', 'C', 'D'].forEach((letter, i) => {
      const choice = choices[i] || '';
      options[letter] = choice.replace(/^\([A-D]\)\s*/, '');
      if (choice === correctText) {
        correctLetter = letter;
      }
    });

    const qNum = currentQuestionNumber++;

    return {
      id: `q${qNum}`,
      number: qNum,
      type: 'Detail', // placeholder
      text: (child.question.text || '').replace(/^\d+\.\s*/, ''), // remove number like '147. '
      options: options as any,
      correctAnswer: correctLetter as any,
      explanation: child.answer.hint || 'Không có giải thích.'
    };
  });

  passageSets.push({
    id: `set_${index + 1}`,
    source: 'ETS 2022 Test 1',
    type: passageType,
    passages,
    questions,
  });
});

const tsCode = `import { Part7PassageSet } from './part7';

export const PART7_REAL_DATA: Part7PassageSet[] = ${JSON.stringify(passageSets, null, 2)};
`;

fs.writeFileSync(outputPath, tsCode);
console.log(`Successfully ingested ${passageSets.length} passage sets with ${currentQuestionNumber - 147} questions.`);
