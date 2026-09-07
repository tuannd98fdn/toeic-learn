import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { calculateNextReviewDate, isDueForReview, MAX_BOX, MIN_BOX } from '../utils/spacedRepetition';
import { VocabularyWord } from '../data/vocabulary';
import { useVocabulary } from './useVocabulary';

export interface LeitnerRecord {
  box: number;
  lastReview: string;
  nextReview: string;
}

export type LeitnerState = Record<string, LeitnerRecord>;

const STORAGE_KEY = 'leitner_progress';

export function useLeitner() {
  const { allWords } = useVocabulary();
  const [progress, setProgress] = useState<LeitnerState>({});
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = storage.get<LeitnerState>(STORAGE_KEY, {});
    // Initialize unstudied words if they don't exist in progress
    const initialProgress = { ...saved };
    let hasChanges = false;
    
    allWords.forEach(word => {
      if (!initialProgress[word.id]) {
        initialProgress[word.id] = {
          box: 0, // 0 means unstudied
          lastReview: '',
          nextReview: new Date().toISOString() // Ready to study immediately
        };
        hasChanges = true;
      }
    });

    setProgress(initialProgress);
    if (hasChanges) {
      storage.set(STORAGE_KEY, initialProgress);
    }
    setMounted(true);
  }, [allWords]);

  /**
   * Rates a word and updates its Leitner box and review dates.
   * Rating mapping:
   * 1 = Again (Failed) -> Back to Box 1
   * 2 = Hard (Barely knew) -> Stay in current box
   * 3 = Good (Knew it) -> Move to next box
   * 4 = Easy (Mastered) -> Move up 2 boxes
   */
  const rateWord = (wordId: string, rating: 1 | 2 | 3 | 4) => {
    setProgress(prev => {
      const current = prev[wordId] || { box: 0, lastReview: '', nextReview: '' };
      
      let newBox = current.box;
      
      if (rating === 1) {
        newBox = MIN_BOX;
      } else if (rating === 2) {
        newBox = Math.max(current.box, MIN_BOX);
      } else if (rating === 3) {
        newBox = current.box === 0 ? MIN_BOX : Math.min(current.box + 1, MAX_BOX);
      } else if (rating === 4) {
        newBox = current.box === 0 ? MIN_BOX + 1 : Math.min(current.box + 2, MAX_BOX);
      }

      const nextReviewDate = calculateNextReviewDate(newBox);
      
      const updatedRecord: LeitnerRecord = {
        box: newBox,
        lastReview: new Date().toISOString(),
        nextReview: nextReviewDate
      };

      const newState = {
        ...prev,
        [wordId]: updatedRecord
      };
      
      storage.set(STORAGE_KEY, newState);
      return newState;
    });
  };

  const getDueWords = (): VocabularyWord[] => {
    if (!mounted) return [];
    
    return allWords.filter(word => {
      const record = progress[word.id];
      if (!record || record.box === 0) return true; // Unstudied words are due
      return isDueForReview(record.nextReview);
    });
  };

  const getStats = () => {
    if (!mounted) return { mastered: 0, learning: 0, unstudied: 0, boxes: { 1:0, 2:0, 3:0, 4:0, 5:0 } };

    const boxes = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let mastered = 0;
    let learning = 0;
    let unstudied = 0;

    allWords.forEach(word => {
      const record = progress[word.id];
      if (!record || record.box === 0) {
        unstudied++;
      } else {
        boxes[record.box as keyof typeof boxes]++;
        if (record.box === MAX_BOX) {
          mastered++;
        } else {
          learning++;
        }
      }
    });

    return { mastered, learning, unstudied, boxes };
  };

  return {
    mounted,
    progress,
    rateWord,
    getDueWords,
    getStats
  };
}
