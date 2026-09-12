import { VOCAB_450 } from './vocab/vocab_450';
import { VOCAB_650 } from './vocab/vocab_650';
import { VOCAB_800 } from './vocab/vocab_800';

export type TargetBand = '450+' | '650+' | '800+';

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
}

export const VOCABULARY_DATA: VocabularyWord[] = [
  ...VOCAB_450,
  ...VOCAB_650,
  ...VOCAB_800
];

export const getWordsByCategory = (category: string) => {
  if (category === "All") return VOCABULARY_DATA;
  return VOCABULARY_DATA.filter(w => w.category === category);
};

export const getRandomWords = (n: number, excludeIds: string[] = []) => {
  const available = VOCABULARY_DATA.filter(w => !excludeIds.includes(w.id));
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};
