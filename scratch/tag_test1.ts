import fs from 'fs';
import path from 'path';

const test1Part5Tags: Record<number, { subCategory: string; grammarTag: string }> = {
  101: { subCategory: "Pronoun", grammarTag: "Possessive Adjective" },
  102: { subCategory: "Verb Tense", grammarTag: "Passive Voice" },
  103: { subCategory: "Business Vocabulary", grammarTag: "Collocation" },
  104: { subCategory: "Business Vocabulary", grammarTag: "Adverb Vocabulary" },
  105: { subCategory: "Sentence Structure", grammarTag: "Quantifier" },
  106: { subCategory: "Word Form", grammarTag: "Noun Suffix" },
  107: { subCategory: "Business Vocabulary", grammarTag: "Adjective Vocabulary" },
  108: { subCategory: "Business Vocabulary", grammarTag: "Adjective Vocabulary" },
  109: { subCategory: "Business Vocabulary", grammarTag: "Verb Vocabulary" },
  110: { subCategory: "Business Vocabulary", grammarTag: "Verb Vocabulary" },
  111: { subCategory: "Word Form", grammarTag: "Comparative Adjective" },
  112: { subCategory: "Word Form", grammarTag: "Adverb Modifier" },
  113: { subCategory: "Preposition & Conjunction", grammarTag: "Correlative Conjunction" },
  114: { subCategory: "Word Form", grammarTag: "Comparative Adverb" },
  115: { subCategory: "Preposition & Conjunction", grammarTag: "Preposition" },
  116: { subCategory: "Word Form", grammarTag: "Noun Suffix" },
  117: { subCategory: "Business Vocabulary", grammarTag: "Adverb Vocabulary" },
  118: { subCategory: "Business Vocabulary", grammarTag: "Noun Vocabulary" },
  119: { subCategory: "Relative Clause", grammarTag: "Relative Pronoun" },
  120: { subCategory: "Business Vocabulary", grammarTag: "Adjective Vocabulary" },
  121: { subCategory: "Preposition & Conjunction", grammarTag: "Preposition of Time" },
  122: { subCategory: "Business Vocabulary", grammarTag: "Adjective Vocabulary" },
  123: { subCategory: "Word Form", grammarTag: "Adverb Modifier" },
  124: { subCategory: "Business Vocabulary", grammarTag: "Noun Vocabulary" },
  125: { subCategory: "Preposition & Conjunction", grammarTag: "Preposition of Time" },
  126: { subCategory: "Word Form", grammarTag: "Participial Adjective" },
  127: { subCategory: "Business Vocabulary", grammarTag: "Verb Vocabulary" },
  128: { subCategory: "Business Vocabulary", grammarTag: "Verb Vocabulary" },
  129: { subCategory: "Pronoun", grammarTag: "Indefinite Pronoun / Determiner" },
  130: { subCategory: "Verb Tense", grammarTag: "Passive Voice Past Simple" },
};

const test1Part6Tags: Record<number, { subCategory: string; grammarTag: string }> = {
  131: { subCategory: "Verb Tense", grammarTag: "Present Continuous Verb Form" },
  132: { subCategory: "Business Vocabulary", grammarTag: "Noun Vocabulary" },
  133: { subCategory: "Contextual Completion", grammarTag: "Sentence Insertion" },
  134: { subCategory: "Business Vocabulary", grammarTag: "Adverb Vocabulary" },
  135: { subCategory: "Business Vocabulary", grammarTag: "Noun Vocabulary" },
  136: { subCategory: "Sentence Structure", grammarTag: "Parallel Structure" },
  137: { subCategory: "Pronoun", grammarTag: "Possessive Adjective" },
  138: { subCategory: "Contextual Completion", grammarTag: "Sentence Insertion" },
  139: { subCategory: "Business Vocabulary", grammarTag: "Noun Vocabulary" },
  140: { subCategory: "Preposition & Conjunction", grammarTag: "Conjunctive Adverb" },
  141: { subCategory: "Contextual Completion", grammarTag: "Sentence Insertion" },
  142: { subCategory: "Verb Tense", grammarTag: "Future Simple" },
  143: { subCategory: "Business Vocabulary", grammarTag: "Adverb Vocabulary" },
  144: { subCategory: "Word Form", grammarTag: "Noun after Preposition" },
  145: { subCategory: "Business Vocabulary", grammarTag: "Adjective Vocabulary" },
  146: { subCategory: "Contextual Completion", grammarTag: "Sentence Insertion" },
};

const p5Path = path.resolve(process.cwd(), 'public/data/ets2022/test1/part5.json');
const p5 = JSON.parse(fs.readFileSync(p5Path, 'utf8'));
for (const q of p5) {
  if (test1Part5Tags[q.number]) {
    q.subCategory = test1Part5Tags[q.number].subCategory;
    q.grammarTag = test1Part5Tags[q.number].grammarTag;
  }
}
fs.writeFileSync(p5Path, JSON.stringify(p5, null, 2), 'utf8');
console.log('Updated test1 part5.json with subCategory and grammarTag.');

const p6Path = path.resolve(process.cwd(), 'public/data/ets2022/test1/part6.json');
const p6 = JSON.parse(fs.readFileSync(p6Path, 'utf8'));
for (const passage of p6) {
  for (const q of passage.questions) {
    if (test1Part6Tags[q.number]) {
      q.subCategory = test1Part6Tags[q.number].subCategory;
      q.grammarTag = test1Part6Tags[q.number].grammarTag;
    }
  }
}
fs.writeFileSync(p6Path, JSON.stringify(p6, null, 2), 'utf8');
console.log('Updated test1 part6.json with subCategory and grammarTag.');
