import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export interface MistakeRecord {
  wrongCount: number;
  lastMistakeDate: string;
  type?: 'vocabulary' | 'exam';
  testId?: string;
  part?: string;
  questionId?: string;
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

  const addMistake = (id: string, metadata?: Partial<MistakeRecord>) => {
    setMistakes(prev => {
      const current = prev[id] || { wrongCount: 0, lastMistakeDate: '', type: 'vocabulary' };
      const newData = {
        ...prev,
        [id]: {
          ...current,
          ...metadata,
          wrongCount: current.wrongCount + 1,
          lastMistakeDate: new Date().toISOString()
        }
      };
      storage.set(MISTAKE_KEY, newData);
      return newData;
    });
  };

  const removeMistake = (id: string) => {
    setMistakes(prev => {
      const newData = { ...prev };
      delete newData[id];
      storage.set(MISTAKE_KEY, newData);
      return newData;
    });
  };

  const getMistakes = (): string[] => {
    if (!mounted) return [];
    return Object.keys(mistakes);
  };

  return {
    mounted,
    mistakes,
    addMistake,
    removeMistake,
    getMistakes
  };
}
