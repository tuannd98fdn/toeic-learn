import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';
import { completeActiveTaskByType } from '../utils/studyPlanEngine';

const BOOKMARKS_KEY = 'toeic_tips_bookmarks';
const MASTERED_KEY = 'toeic_tips_mastered';

export function useTipsMastery() {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedBookmarks = storage.get<string[]>(BOOKMARKS_KEY, []);
    const savedMastered = storage.get<string[]>(MASTERED_KEY, []);
    setBookmarkedIds(savedBookmarks);
    setMasteredIds(savedMastered);
    setMounted(true);
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      storage.set(BOOKMARKS_KEY, next);
      return next;
    });
  }, []);

  const toggleMastered = useCallback((id: string) => {
    setMasteredIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      storage.set(MASTERED_KEY, next);
      if (!exists) {
        // Learner marked a tip as mastered - celebrate and auto-complete review tasks if applicable
        completeActiveTaskByType('review');
      }
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarkedIds.includes(id),
    [bookmarkedIds]
  );

  const isMastered = useCallback(
    (id: string) => masteredIds.includes(id),
    [masteredIds]
  );

  return {
    mounted,
    bookmarkedIds,
    masteredIds,
    toggleBookmark,
    toggleMastered,
    isBookmarked,
    isMastered,
  };
}
