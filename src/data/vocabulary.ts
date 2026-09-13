import { VOCAB_450 } from './vocab/vocab_450';
import { VOCAB_650 } from './vocab/vocab_650';
import { VOCAB_800 } from './vocab/vocab_800';
import { VOCAB_READING_SPECIALIZED } from './vocab/vocab_reading_specialized';

export type TargetBand = '450+' | '650+' | '800+' | 'Reading Part 6 & 7';

export interface ParaphrasePair {
  passageText: string;
  optionText: string;
  explanation?: string;
}

export interface VocabularyWord {
  id: string;
  word: string;
  ipa: string;
  vietnamese: string;
  partOfSpeech: string;
  category: string;
  examples: string[];
  mnemonicTip: string;
  emoji: string;
  targetBand?: TargetBand;
  source?: 'system' | 'user';
  readingType?: 'collocation' | 'paraphrase';
  paraphrasePair?: ParaphrasePair;
}

export const VOCABULARY_DATA: VocabularyWord[] = [
  ...VOCAB_450,
  ...VOCAB_650,
  ...VOCAB_800,
  ...VOCAB_READING_SPECIALIZED
];

export const getWordsByCategory = (category: string) => {
  if (category === "All") return VOCABULARY_DATA;
  return VOCABULARY_DATA.filter(w => w.category === category);
};

export const getReadingCollocations = () => {
  return VOCABULARY_DATA.filter(w => w.readingType === 'collocation');
};

export const getParaphrasingPairs = () => {
  return VOCABULARY_DATA.filter(w => w.readingType === 'paraphrase' && !!w.paraphrasePair);
};

export const getRandomWords = (n: number, excludeIds: string[] = []) => {
  const available = VOCABULARY_DATA.filter(w => !excludeIds.includes(w.id));
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};
