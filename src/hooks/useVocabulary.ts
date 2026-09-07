import { useState, useEffect, useMemo, useCallback } from 'react';
import { storage } from '../utils/storage';
import { VOCABULARY_DATA, VocabularyWord } from '../data/vocabulary';

const USER_VOCAB_STORAGE_KEY = 'user_vocabulary';

export function useVocabulary() {
  const [userWords, setUserWords] = useState<VocabularyWord[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = storage.get<VocabularyWord[]>(USER_VOCAB_STORAGE_KEY, []);
    setUserWords(saved);
    setMounted(true);
  }, []);

  const allWords = useMemo(() => {
    const systemWords = VOCABULARY_DATA.map(w => ({ ...w, source: w.source || 'system' as const }));
    const uWords = userWords.map(w => ({ ...w, source: 'user' as const }));
    return [...systemWords, ...uWords];
  }, [userWords]);

  const addWord = useCallback((newWord: Omit<VocabularyWord, 'id' | 'source'>) => {
    setUserWords(prev => {
      const wordId = `u_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      const wordToAdd: VocabularyWord = {
        ...newWord,
        id: wordId,
        source: 'user',
      };
      const updated = [...prev, wordToAdd];
      storage.set(USER_VOCAB_STORAGE_KEY, updated);
      return updated;
    });
  }, []);

  const removeWord = useCallback((id: string) => {
    setUserWords(prev => {
      const updated = prev.filter(w => w.id !== id);
      storage.set(USER_VOCAB_STORAGE_KEY, updated);
      return updated;
    });
  }, []);

  const getWordsByCategory = useCallback((category: string) => {
    if (category === "All") return allWords;
    return allWords.filter(w => w.category === category);
  }, [allWords]);

  const getRandomWords = useCallback((n: number, excludeIds: string[] = []) => {
    const available = allWords.filter(w => !excludeIds.includes(w.id));
    const shuffled = [...available].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }, [allWords]);

  return {
    mounted,
    allWords,
    userWords,
    addWord,
    removeWord,
    getWordsByCategory,
    getRandomWords
  };
}
