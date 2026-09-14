export type MasterclassAccent = 'British' | 'American' | 'Australian' | 'Canadian';

export interface ConnectedSpeechLesson {
  id: string;
  title: string;
  accent: MasterclassAccent;
  phoneticPhenomenon: string;
  writtenSentence: string;
  spokenTranscription: string;
  explanation: string;
  audioSimulatedText: string;
  drillQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface VocabHighlight {
  id: string;
  word: string;
  ipa: string;
  vietnamese: string;
  collocationTip: string;
  exampleInContext: string;
}

export interface ParaphraseMatrixItem {
  tier: 1 | 2 | 3 | 4;
  tierLabel: string;
  passageText: string;
  etsOptionText: string;
  trapDistractor?: string;
  pedagogicalNote: string;
}

export interface BusinessScenario {
  id: string;
  title: string;
  industry: string;
  readTimeMinutes: number;
  executiveSummary: string;
  content: string;
  vocabHighlights: VocabHighlight[];
  paraphraseMatrix: ParaphraseMatrixItem[];
}

export interface HighScoreChallenge {
  id: string;
  part: 'Part 5' | 'Part 6' | 'Part 7';
  targetBand: '800+' | '850+' | '900+';
  question: string;
  options: string[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  trapType: string;
  clueHint: string;
  syntaxBreakdown?: {
    subject: string;
    predicate: string;
    objectOrComplement: string;
    targetModifier: string;
  };
  pedagogicalExplanation: string;
}

export interface MasterclassRetentionVocab {
  word: string;
  ipa: string;
  meaning: string;
  collocation: string;
}

export interface MasterclassDayPack {
  dayNumber: number;
  theme: string;
  description: string;
  targetScore: string;
  speechLesson: ConnectedSpeechLesson;
  businessScenario: BusinessScenario;
  challengeQuestions: HighScoreChallenge[];
  retentionVocab: MasterclassRetentionVocab[];
}
