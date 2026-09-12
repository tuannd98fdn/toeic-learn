import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';
import { calculateNextReviewDate, MAX_BOX } from '../utils/spacedRepetition';

export interface MistakeRecord {
  wrongCount: number;
  lastMistakeDate: string;
  type?: 'vocabulary' | 'exam';
  testId?: string;
  part?: string;
  questionId?: string;
  subCategory?: string;
  grammarTag?: string;
  box?: number;
  nextReviewDate?: string;
  rootCause?: string;
}

export type MistakeData = Record<string, MistakeRecord>;

const MISTAKE_KEY = 'mistake_notebook';

export function useMistakeNotebook() {
  const [mistakes, setMistakes] = useState<MistakeData>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const data = storage.get<MistakeData>(MISTAKE_KEY, {});
    setMistakes(data);
    setMounted(true);
  }, []);

  const addMistake = useCallback((id: string, metadata?: Partial<MistakeRecord>) => {
    setMistakes(prev => {
      const current = prev[id] || { wrongCount: 0, lastMistakeDate: '', type: 'vocabulary', box: 1, nextReviewDate: calculateNextReviewDate(1) };
      const newData = {
        ...prev,
        [id]: {
          ...current,
          ...metadata,
          wrongCount: current.wrongCount + 1,
          lastMistakeDate: new Date().toISOString(),
          box: 1, // Reset box if they get it wrong again during practice
          nextReviewDate: calculateNextReviewDate(1)
        }
      };
      storage.set(MISTAKE_KEY, newData);
      return newData;
    });
  }, []);

  const removeMistake = useCallback((id: string) => {
    setMistakes(prev => {
      const newData = { ...prev };
      delete newData[id];
      storage.set(MISTAKE_KEY, newData);
      return newData;
    });
  }, []);

  const updateMistakeProgress = useCallback((id: string, isCorrect: boolean) => {
    setMistakes(prev => {
      const current = prev[id];
      if (!current) return prev;

      let newBox = current.box || 1;
      if (isCorrect) {
        newBox = Math.min(newBox + 1, MAX_BOX);
      } else {
        newBox = 1;
      }

      const newData = {
        ...prev,
        [id]: {
          ...current,
          box: newBox,
          nextReviewDate: calculateNextReviewDate(newBox)
        }
      };
      
      // Optional: Auto-remove if mastered (e.g. hits MAX_BOX)
      if (isCorrect && newBox >= MAX_BOX) {
        delete newData[id];
      }
      
      storage.set(MISTAKE_KEY, newData);
      return newData;
    });
  }, []);

  const getMistakes = useCallback((): string[] => {
    if (!mounted) return [];
    return Object.keys(mistakes);
  }, [mounted, mistakes]);

  const updateMistakeRootCause = useCallback((id: string, cause: string) => {
    setMistakes(prev => {
      const current = prev[id];
      if (!current) return prev;

      const newData = {
        ...prev,
        [id]: {
          ...current,
          rootCause: cause
        }
      };
      
      storage.set(MISTAKE_KEY, newData);
      return newData;
    });
  }, []);

  return {
    mounted,
    mistakes,
    addMistake,
    removeMistake,
    updateMistakeProgress,
    updateMistakeRootCause,
    getMistakes
  };
}
