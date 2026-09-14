import { useState, useEffect, useMemo, useCallback } from 'react';
import { storage } from '../utils/storage';
import { VOCABULARY_DATA, VocabularyWord } from '../data/vocabulary';

const USER_VOCAB_STORAGE_KEY = 'user_vocabulary';

export function useVocabulary() {
  const [userWords, setUserWords] = useState<VocabularyWord[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loadWords = () => {
      const saved = storage.get<VocabularyWord[]>(USER_VOCAB_STORAGE_KEY, []);
      setUserWords(saved);
    };

    loadWords();
    setMounted(true);

    const handleStorageUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string }>;
      if (!customEvent.detail || customEvent.detail.key === USER_VOCAB_STORAGE_KEY || customEvent.detail.key === '*') {
        loadWords();
      }
    };

    const handleWindowStorage = (e: StorageEvent) => {
      if (e.key === USER_VOCAB_STORAGE_KEY || !e.key) {
        loadWords();
      }
    };

    window.addEventListener('app-storage-update', handleStorageUpdate);
    window.addEventListener('storage', handleWindowStorage);

    return () => {
      window.removeEventListener('app-storage-update', handleStorageUpdate);
      window.removeEventListener('storage', handleWindowStorage);
    };
  }, []);

  const allWords = useMemo(() => {
    const systemWords = VOCABULARY_DATA.map(w => ({ ...w, source: w.source || 'system' as const, targetBand: w.targetBand || '650+' }));
    const uWords = userWords.map(w => ({ ...w, source: 'user' as const, targetBand: w.targetBand || '650+' }));
    return [...systemWords, ...uWords];
  }, [userWords]);

  const addWord = useCallback((newWord: Omit<VocabularyWord, 'id' | 'source'>) => {
    const wordId = `u_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const wordToAdd: VocabularyWord = {
      ...newWord,
      id: wordId,
      source: 'user',
      targetBand: newWord.targetBand || '650+',
    };

    const current = storage.get<VocabularyWord[]>(USER_VOCAB_STORAGE_KEY, []);
    const updated = [...current.filter(w => w.id !== wordId), wordToAdd];
    storage.set(USER_VOCAB_STORAGE_KEY, updated);
    setUserWords(updated);
  }, []);

  const removeWord = useCallback((id: string) => {
    const current = storage.get<VocabularyWord[]>(USER_VOCAB_STORAGE_KEY, []);
    const updated = current.filter(w => w.id !== id);
    storage.set(USER_VOCAB_STORAGE_KEY, updated);
    setUserWords(updated);
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
