import fs from 'fs';
import path from 'path';
import { part5Data } from '../scripts/test2_data/part5';
import { part6Data } from '../scripts/test2_data/part6';

const test2Part5Meta: Record<number, { subCategory: string; grammarTag: string }> = {
  101: { subCategory: "Pronoun", grammarTag: "Possessive Pronoun" },
  102: { subCategory: "Preposition & Conjunction", grammarTag: "Preposition of Place" },
  103: { subCategory: "Word Form", grammarTag: "Adverb Formation (-ly)" },
  104: { subCategory: "Preposition & Conjunction", grammarTag: "Preposition + Gerund" },
  105: { subCategory: "Word Form", grammarTag: "Noun Suffix (-tion)" },
  106: { subCategory: "Word Form", grammarTag: "Adjective Modifier" },
  107: { subCategory: "Verb Tense", grammarTag: "Future Simple Passive" },
  108: { subCategory: "Business Vocabulary", grammarTag: "Adjective Vocabulary" },
  109: { subCategory: "Preposition & Conjunction", grammarTag: "Conjunction of Reason (Because)" },
  110: { subCategory: "Relative Clause", grammarTag: "Relative Pronoun (who)" },
  111: { subCategory: "Word Form", grammarTag: "Noun Suffix (-ance)" },
  112: { subCategory: "Word Form", grammarTag: "Adverb modifying Adjective" },
  113: { subCategory: "Business Vocabulary", grammarTag: "Verb Vocabulary (Collocation)" },
  114: { subCategory: "Preposition & Conjunction", grammarTag: "Correlative Conjunction (Neither...nor)" },
  115: { subCategory: "Word Form", grammarTag: "Participial Adjective (-ing/-ed)" },
  116: { subCategory: "Business Vocabulary", grammarTag: "Adverb Vocabulary" },
  117: { subCategory: "Preposition & Conjunction", grammarTag: "Concession Conjunction (Although)" },
  118: { subCategory: "Word Form", grammarTag: "Reflexive Pronoun" },
  119: { subCategory: "Word Form", grammarTag: "Adverb modifying Verb" },
  120: { subCategory: "Business Vocabulary", grammarTag: "Business Collocation" },
  121: { subCategory: "Word Form", grammarTag: "Noun Suffix" },
  122: { subCategory: "Sentence Structure", grammarTag: "Comparative Degree" },
  123: { subCategory: "Word Form", grammarTag: "Adverb Placement" },
  124: { subCategory: "Verb Tense", grammarTag: "To-Infinitive of Purpose" },
  125: { subCategory: "Preposition & Conjunction", grammarTag: "Compound Preposition" },
  126: { subCategory: "Verb Tense", grammarTag: "Gerund as Object" },
  127: { subCategory: "Sentence Structure", grammarTag: "Subjunctive Mood (Mandative)" },
  128: { subCategory: "Business Vocabulary", grammarTag: "Noun Vocabulary" },
  129: { subCategory: "Sentence Structure", grammarTag: "Negative Inversion (Seldom)" },
  130: { subCategory: "Business Vocabulary", grammarTag: "Phrasal Verb" }
};

const test2Part6Meta: Record<number, { subCategory: string; grammarTag: string }> = {
  131: { subCategory: "Verb Tense", grammarTag: "Modal Verb + Bare Infinitive" },
  132: { subCategory: "Contextual Completion", grammarTag: "Sentence Insertion" },
  133: { subCategory: "Word Form", grammarTag: "Adverb modifying Adjective" },
  134: { subCategory: "Business Vocabulary", grammarTag: "Idiomatic Phrase" },
  135: { subCategory: "Verb Tense", grammarTag: "Modal Passive Voice" },
  136: { subCategory: "Contextual Completion", grammarTag: "Sentence Insertion" },
  137: { subCategory: "Preposition & Conjunction", grammarTag: "Prepositional Idiom" },
  138: { subCategory: "Word Form", grammarTag: "Noun Suffix (-tion)" },
  139: { subCategory: "Word Form", grammarTag: "Participial Adjective (-ing)" },
  140: { subCategory: "Contextual Completion", grammarTag: "Sentence Insertion" },
  141: { subCategory: "Verb Tense", grammarTag: "Reduced Relative Clause" },
  142: { subCategory: "Word Form", grammarTag: "Adjective Modifier" },
  143: { subCategory: "Relative Clause", grammarTag: "Non-defining Relative Pronoun" },
  144: { subCategory: "Contextual Completion", grammarTag: "Sentence Insertion" },
  145: { subCategory: "Verb Tense", grammarTag: "To-Infinitive Form" },
  146: { subCategory: "Preposition & Conjunction", grammarTag: "Preposition of Association" }
};

for (const q of part5Data as any[]) {
  if (test2Part5Meta[q.number]) {
    q.subCategory = test2Part5Meta[q.number].subCategory;
    q.grammarTag = test2Part5Meta[q.number].grammarTag;
  }
}

for (const passage of part6Data as any[]) {
  for (const q of passage.questions) {
    if (test2Part6Meta[q.number]) {
      q.subCategory = test2Part6Meta[q.number].subCategory;
      q.grammarTag = test2Part6Meta[q.number].grammarTag;
    }
  }
}

const p5Out = `export const part5Data = ${JSON.stringify(part5Data, null, 2)};\n`;
fs.writeFileSync(path.resolve(process.cwd(), 'scripts/test2_data/part5.ts'), p5Out, 'utf8');

const p6Out = `export const part6Data = ${JSON.stringify(part6Data, null, 2)};\n`;
fs.writeFileSync(path.resolve(process.cwd(), 'scripts/test2_data/part6.ts'), p6Out, 'utf8');

console.log('Successfully updated scripts/test2_data/part5.ts and part6.ts');
