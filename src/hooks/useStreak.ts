import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';

export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastStudyDate: string;
}

const STREAK_KEY = 'vocabulary_streak';

export function useStreak() {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    bestStreak: 0,
    lastStudyDate: ''
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const data = storage.get<StreakData>(STREAK_KEY, {
      currentStreak: 0,
      bestStreak: 0,
      lastStudyDate: ''
    });

    // Check if streak is broken on load
    if (data.lastStudyDate) {
      const lastStudy = new Date(data.lastStudyDate);
      lastStudy.setHours(0, 0, 0, 0);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const diffTime = today.getTime() - lastStudy.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); 
      
      // If more than 1 day has passed, break the streak
      if (diffDays > 1) {
        data.currentStreak = 0;
        storage.set(STREAK_KEY, data);
      }
    }

    setStreakData(data);
    setMounted(true);
  }, []);

  const recordStudy = useCallback(() => {
    setStreakData(prev => {
      let newStreak = prev.currentStreak;
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
        } else if (diffDays > 1) {
          // Streak broken
          newStreak = 1;
        }
      }

      const bestStreak = Math.max(prev.bestStreak, newStreak);
      
      const newData = {
        currentStreak: newStreak,
        bestStreak,
        lastStudyDate: new Date().toISOString()
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
