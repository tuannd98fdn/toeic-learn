import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';

export interface DailyMissionData {
  date: string;
  newWords: number;
  reviewedWords: number;
  quizzes: number;
}

const MISSION_KEY = 'daily_mission';

export const MISSION_GOALS = {
  newWords: 5,
  reviewedWords: 10,
  quizzes: 1
};

export function useDailyMission() {
  const [missionData, setMissionData] = useState<DailyMissionData>({
    date: '',
    newWords: 0,
    reviewedWords: 0,
    quizzes: 0
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const data = storage.get<DailyMissionData>(MISSION_KEY, {
      date: today,
      newWords: 0,
      reviewedWords: 0,
      quizzes: 0
    });

    // Reset if it's a new day
    if (data.date !== today) {
      data.date = today;
      data.newWords = 0;
      data.reviewedWords = 0;
      data.quizzes = 0;
      storage.set(MISSION_KEY, data);
    }

    setMissionData(data);
    setMounted(true);
  }, []);

  const updateMission = useCallback((updater: (prev: DailyMissionData) => DailyMissionData) => {
    setMissionData(prev => {
      const today = new Date().toISOString().split('T')[0];
      
      // If it's a new day when updating, reset first
      let currentData = prev;
      if (prev.date !== today) {
        currentData = {
          date: today,
          newWords: 0,
          reviewedWords: 0,
          quizzes: 0
        };
      }

      const newData = updater(currentData);
      storage.set(MISSION_KEY, newData);
      return newData;
    });
  }, []);

  const recordNewWordLearned = useCallback(() => {
    updateMission(prev => ({
      ...prev,
      newWords: Math.min(prev.newWords + 1, MISSION_GOALS.newWords)
    }));
  }, [updateMission]);

  const recordWordReviewed = useCallback(() => {
    updateMission(prev => ({
      ...prev,
      reviewedWords: Math.min(prev.reviewedWords + 1, MISSION_GOALS.reviewedWords)
    }));
  }, [updateMission]);

  const recordQuizCompleted = useCallback(() => {
    updateMission(prev => ({
      ...prev,
      quizzes: Math.min(prev.quizzes + 1, MISSION_GOALS.quizzes)
    }));
  }, [updateMission]);

  return {
    mounted,
    missionData,
    recordNewWordLearned,
    recordWordReviewed,
    recordQuizCompleted
  };
}
