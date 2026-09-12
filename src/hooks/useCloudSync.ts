'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { storage } from '@/utils/storage';

export function useCloudSync() {
  const { data: session, status } = useSession();
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const hasHydratedRef = useRef(false);

  const pushToCloud = useCallback(async () => {
    if (status !== 'authenticated' || !session?.user?.email) return;

    try {
      setIsSyncing(true);
      setSyncError(null);

      const localMistakes = {
        ...storage.get('mistake_notebook', {}),
        ...storage.get('toeic_mistake_notebook', {}),
      };
      const localPlan = storage.get('toeic_adaptive_study_plan', null);
      const localStreak = storage.get('toeic_study_streak', null);

      // Collect progress keys
      const localProgress: Record<string, boolean> = {};
      if (typeof window !== 'undefined') {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('progress_')) {
            localProgress[key] = storage.get<boolean>(key, true);
          }
        }
      }

      const targetScore = typeof window !== 'undefined' ? localStorage.getItem('toeic_target_score') : null;
      const examDate = typeof window !== 'undefined' ? localStorage.getItem('toeic_exam_date') : null;

      const payload = {
        mistakes: localMistakes,
        progress: localProgress,
        studyPlan: localPlan,
        streak: localStreak,
        profile: {
          targetScore: targetScore || '750+',
          examDate: examDate || undefined,
        },
      };

      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Sync error: ${res.statusText}`);
      }

      setLastSynced(new Date());
    } catch (err: any) {
      console.warn('Cloud sync push failed:', err.message);
      setSyncError(err.message);
    } finally {
      setIsSyncing(false);
    }
  }, [session?.user?.email, status]);

  // Initial pull & merge on login
  useEffect(() => {
    if (status !== 'authenticated' || !session?.user?.email || hasHydratedRef.current) return;

    const pullAndMerge = async () => {
      try {
        setIsSyncing(true);
        const res = await fetch('/api/sync');
        if (!res.ok) return;

        const serverData = await res.json();
        hasHydratedRef.current = true;

        // 1. Merge mistakes
        const localMistakes = {
          ...storage.get('mistake_notebook', {}),
          ...storage.get('toeic_mistake_notebook', {}),
        };
        const mergedMistakes = { ...serverData.mistakes, ...localMistakes };
        storage.set('mistake_notebook', mergedMistakes);
        storage.set('toeic_mistake_notebook', mergedMistakes);

        // 2. Merge progress
        if (serverData.progress) {
          Object.entries(serverData.progress).forEach(([key, val]) => {
            if (val && !storage.get<boolean>(key, false)) {
              storage.set(key, true);
            }
          });
        }

        // 3. Merge study plan
        const localPlan = storage.get('toeic_adaptive_study_plan', null);
        if (!localPlan && serverData.studyPlan) {
          storage.set('toeic_adaptive_study_plan', serverData.studyPlan);
        }

        // 4. Merge streak
        const localStreak = storage.get<any>('toeic_study_streak', null);
        if (serverData.streak) {
          const mergedStreak = {
            currentStreak: Math.max(localStreak?.currentStreak || 0, serverData.streak.currentStreak || 0),
            bestStreak: Math.max(localStreak?.bestStreak || 0, serverData.streak.bestStreak || 0),
            lastStudyDate: localStreak?.lastStudyDate || serverData.streak.lastStudyDate,
            historyDays: Array.from(new Set([...(localStreak?.historyDays || []), ...(serverData.streak.historyDays || [])])),
          };
          storage.set('toeic_study_streak', mergedStreak);
        }

        // 5. Merge profile
        if (serverData.profile) {
          if (serverData.profile.targetScore && !localStorage.getItem('toeic_target_score')) {
            localStorage.setItem('toeic_target_score', serverData.profile.targetScore);
          }
          if (serverData.profile.examDate && !localStorage.getItem('toeic_exam_date')) {
            localStorage.setItem('toeic_exam_date', serverData.profile.examDate);
          }
        }

        setLastSynced(new Date());

        // Push back merged state to server
        await pushToCloud();
      } catch (err: any) {
        console.warn('Initial cloud sync pull failed:', err.message);
      } finally {
        setIsSyncing(false);
      }
    };

    pullAndMerge();
  }, [session?.user?.email, status, pushToCloud]);

  // Periodic or visibility sync
  useEffect(() => {
    if (status !== 'authenticated') return;

    const handleFocus = () => {
      pushToCloud();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [status, pushToCloud]);

  return {
    isSyncing,
    lastSynced,
    syncError,
    syncNow: pushToCloud,
    isAuthenticated: status === 'authenticated',
  };
}
