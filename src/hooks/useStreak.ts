import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';

export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastStudyDate: string;
  freezeCount: number;
  isFrozenToday?: boolean;
}

const STREAK_KEY = 'vocabulary_streak';

export function useStreak() {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    bestStreak: 0,
    lastStudyDate: '',
    freezeCount: 1,
    isFrozenToday: false
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raw = storage.get<Partial<StreakData>>(STREAK_KEY, {});
    const data: StreakData = {
      currentStreak: raw.currentStreak || 0,
      bestStreak: raw.bestStreak || 0,
      lastStudyDate: raw.lastStudyDate || '',
      freezeCount: typeof raw.freezeCount === 'number' ? raw.freezeCount : 1,
      isFrozenToday: raw.isFrozenToday || false
    };

    // Check if streak is broken or protected on load
    if (data.lastStudyDate) {
      const lastStudy = new Date(data.lastStudyDate);
      lastStudy.setHours(0, 0, 0, 0);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const diffTime = today.getTime() - lastStudy.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); 
      
      // If missed exactly 1 day (diffDays === 2) and has a freeze available, protect the streak!
      if (diffDays === 2 && data.freezeCount > 0 && data.currentStreak > 0) {
        data.freezeCount -= 1;
        data.isFrozenToday = true;
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        data.lastStudyDate = yesterday.toISOString();
        storage.set(STREAK_KEY, data);
      } else if (diffDays > 1) {
        data.currentStreak = 0;
        data.isFrozenToday = false;
        storage.set(STREAK_KEY, data);
      }
    }

    setStreakData(data);
    setMounted(true);
  }, []);

  const recordStudy = useCallback(() => {
    setStreakData(prev => {
      let newStreak = prev.currentStreak;
      let newFreezeCount = typeof prev.freezeCount === 'number' ? prev.freezeCount : 1;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (!prev.lastStudyDate) {
        // First time studying
        newStreak = 1;
      } else {
        const lastStudy = new Date(prev.lastStudyDate);
        lastStudy.setHours(0, 0, 0, 0);
        
        const diffTime = today.getTime() - lastStudy.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
          // Already studied today
          return prev;
        } else if (diffDays === 1) {
          // Continuous streak
          newStreak += 1;
          // Reward an extra streak freeze when hitting milestones like 7 days (max 2)
          if (newStreak % 7 === 0 && newFreezeCount < 2) {
            newFreezeCount += 1;
          }
        } else if (diffDays > 1) {
          // Streak broken
          newStreak = 1;
        }
      }

      const bestStreak = Math.max(prev.bestStreak, newStreak);
      
      const newData: StreakData = {
        currentStreak: newStreak,
        bestStreak,
        lastStudyDate: new Date().toISOString(),
        freezeCount: newFreezeCount,
        isFrozenToday: prev.isFrozenToday ?? false
      };
      
      storage.set(STREAK_KEY, newData);
      return newData;
    });
  }, []);

  return {
    mounted,
    streakData,
    recordStudy
  };
}
