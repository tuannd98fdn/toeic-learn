import { storage } from './storage';
import { MistakeData } from '../hooks/useMistakeNotebook';
import { LeitnerState } from '../hooks/useLeitner';
import { StreakData } from '../hooks/useStreak';
import { VocabularyWord } from '../data/vocabulary';
import { StudyPlan } from './studyPlanEngine';

export const CURRENT_BACKUP_VERSION = '2.0';

export interface BackupMetadata {
  exportDate: string;
  version: string;
  totalMistakes: number;
  totalVocabMastered: number;
  totalExamsTaken: number;
  currentStreak: number;
  targetScore: string;
  examDate: string | null;
  hasStudyPlan: boolean;
}

export interface BackupDataPayload {
  app: 'toeic-learn';
  version: string;
  exportDate: string;
  metadata: BackupMetadata;
  data: {
    mistakes: MistakeData;
    leitnerProgress: LeitnerState;
    userVocabulary: VocabularyWord[];
    streak: StreakData | null;
    studyStreakLegacy: any | null;
    studyDays: string[];
    masterclassCompletedDays: number[];
    studyPlan: StudyPlan | null;
    examHistory: any[];
    diagnosticResult: any | null;
    diagnosticAnswers: any | null;
    tipsBookmarks: string[];
    tipsMastered: string[];
    aiHistory: Record<string, any>;
    profile: {
      targetScore: string;
      examDate: string | null;
      currentLevel?: string;
      onboardingDone?: boolean;
    };
    preferences: {
      vocabAutoplay: boolean;
      soundEffects: boolean;
      dailyMinutes: number;
      part6TimeAttack?: boolean;
      part7TimeAttack?: boolean;
    };
    progress: Record<string, any>;
    customKeys: Record<string, any>;
  };
}

export type RestoreMode = 'merge' | 'replace';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  metadata?: BackupMetadata;
  payload?: any;
}

/**
 * Collects 100% of user data and learning progress from localStorage
 * and packages it into a structured, type-safe BackupDataPayload.
 */
export function createBackupPayload(): BackupDataPayload {
  if (typeof window === 'undefined') {
    throw new Error('createBackupPayload must be run in the browser environment');
  }

  // 1. Core Learning Data
  const mistakes = {
    ...storage.get<MistakeData>('mistake_notebook', {}),
    ...storage.get<MistakeData>('toeic_mistake_notebook', {}),
  };
  const leitnerProgress = storage.get<LeitnerState>('leitner_progress', {});
  const userVocabulary = storage.get<VocabularyWord[]>('user_vocabulary', []);
  const streak = storage.get<StreakData | null>('vocabulary_streak', null);
  const studyStreakLegacy = storage.get<any>('toeic_study_streak', null);
  const studyDays = storage.get<string[]>('toeic_study_days', []);
  const masterclassCompletedDays = storage.get<number[]>('toeic_masterclass_completed_days', []);
  const studyPlan = storage.get<StudyPlan | null>('toeic_adaptive_study_plan', null);
  const examHistory = storage.get<any[]>('toeic_exam_history', []);
  const diagnosticResult = storage.get<any>('toeic_diagnostic_result', null);
  const diagnosticAnswers = storage.get<any>('toeic_diagnostic_answers', null);
  const tipsBookmarks = storage.get<string[]>('toeic_tips_bookmarks', []);
  const tipsMastered = storage.get<string[]>('toeic_tips_mastered', []);
  const aiHistory = storage.get<Record<string, any>>('ai_study_sessions_history', {});

  // 2. Profile & Settings
  const rawTarget = storage.get<string | number>('toeic_target_score', '750+');
  const targetScore = String(rawTarget || '750+').replace(/^["']|["']$/g, '').trim() || '750+';
  const examDate = storage.get<string | null>('toeic_exam_date', null);
  const currentLevel = storage.get<string | null>('toeic_current_level', null) || undefined;
  const onboardingDone = storage.get<boolean>('toeic_onboarding_done', true);

  const vocabAutoplay = storage.get<boolean>('toeic_vocab_autoplay', false);
  const soundEffects = storage.get<boolean>('toeic_sound_effects', true);
  const dailyMinutes = storage.get<number>('toeic_daily_minutes', 30);
  const part6TimeAttack = storage.get<boolean>('toeic_part6_time_attack', false);
  const part7TimeAttack = storage.get<boolean>('toeic_time_attack', false);

  // 3. Collect progress keys and any remaining toeic_* keys
  const progress: Record<string, any> = {};
  const customKeys: Record<string, any> = {};

  const standardKnownKeys = new Set([
    'mistake_notebook',
    'toeic_mistake_notebook',
    'leitner_progress',
    'user_vocabulary',
    'vocabulary_streak',
    'toeic_study_streak',
    'toeic_study_days',
    'toeic_masterclass_completed_days',
    'toeic_adaptive_study_plan',
    'toeic_exam_history',
    'toeic_diagnostic_result',
    'toeic_diagnostic_answers',
    'toeic_tips_bookmarks',
    'toeic_tips_mastered',
    'ai_study_sessions_history',
    'toeic_target_score',
    'toeic_exam_date',
    'toeic_current_level',
    'toeic_onboarding_done',
    'toeic_vocab_autoplay',
    'toeic_sound_effects',
    'toeic_daily_minutes',
    'toeic_part6_time_attack',
    'toeic_time_attack',
    'nextauth.message',
  ]);

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    if (key.startsWith('progress_')) {
      progress[key] = storage.get(key, true);
    } else if (
      (key.startsWith('toeic_') || key.startsWith('leitner_') || key.includes('mistake')) &&
      !standardKnownKeys.has(key)
    ) {
      customKeys[key] = storage.get(key, null);
    }
  }

  // 4. Calculate metadata
  let masteredWordsCount = 0;
  Object.values(leitnerProgress).forEach((record) => {
    if (record && record.box === 5) {
      masteredWordsCount++;
    }
  });

  const effectiveStreak = Math.max(
    streak?.currentStreak || 0,
    studyStreakLegacy?.currentStreak || 0
  );

  const metadata: BackupMetadata = {
    exportDate: new Date().toISOString(),
    version: CURRENT_BACKUP_VERSION,
    totalMistakes: Object.keys(mistakes).length,
    totalVocabMastered: masteredWordsCount,
    totalExamsTaken: examHistory.length,
    currentStreak: effectiveStreak,
    targetScore,
    examDate,
    hasStudyPlan: !!studyPlan,
  };

  return {
    app: 'toeic-learn',
    version: CURRENT_BACKUP_VERSION,
    exportDate: metadata.exportDate,
    metadata,
    data: {
      mistakes,
      leitnerProgress,
      userVocabulary,
      streak,
      studyStreakLegacy,
      studyDays,
      masterclassCompletedDays,
      studyPlan,
      examHistory,
      diagnosticResult,
      diagnosticAnswers,
      tipsBookmarks,
      tipsMastered,
      aiHistory,
      profile: {
        targetScore,
        examDate,
        currentLevel,
        onboardingDone,
      },
      preferences: {
        vocabAutoplay,
        soundEffects,
        dailyMinutes,
        part6TimeAttack,
        part7TimeAttack,
      },
      progress,
      customKeys,
    },
  };
}

/**
 * Validates any uploaded JSON string and extracts structured metadata.
 * Backward-compatible with v1.0 and v2.0 formats.
 */
export function validateBackupFile(content: string): ValidationResult {
  if (!content || typeof content !== 'string') {
    return { isValid: false, error: 'Tệp rỗng hoặc không phải văn bản.' };
  }

  try {
    const json = JSON.parse(content);
    if (!json || typeof json !== 'object') {
      return { isValid: false, error: 'Định dạng JSON không hợp lệ.' };
    }

    // Check if it's v2.0 schema
    if (json.app === 'toeic-learn' && json.version && json.data) {
      const meta = json.metadata || {
        exportDate: json.exportDate || new Date().toISOString(),
        version: json.version || '2.0',
        totalMistakes: Object.keys(json.data.mistakes || {}).length,
        totalVocabMastered: 0,
        totalExamsTaken: Array.isArray(json.data.examHistory) ? json.data.examHistory.length : 0,
        currentStreak: json.data.streak?.currentStreak || 0,
        targetScore: json.data.profile?.targetScore || '750+',
        examDate: json.data.profile?.examDate || null,
        hasStudyPlan: !!json.data.studyPlan,
      };

      return {
        isValid: true,
        metadata: meta,
        payload: json,
      };
    }

    // Check if it's v1.0 legacy schema
    if (
      json.targetScore !== undefined ||
      json.mistakes !== undefined ||
      json.examHistory !== undefined ||
      json.version === '1.0'
    ) {
      const mistakesCount = json.mistakes && typeof json.mistakes === 'object'
        ? Object.keys(json.mistakes).length
        : 0;
      const examsCount = Array.isArray(json.examHistory) ? json.examHistory.length : 0;
      const streakCount = json.streak?.currentStreak || (typeof json.streak === 'number' ? json.streak : 0);

      const metadata: BackupMetadata = {
        exportDate: json.exportDate || new Date().toISOString(),
        version: json.version || '1.0 (Legacy)',
        totalMistakes: mistakesCount,
        totalVocabMastered: 0,
        totalExamsTaken: examsCount,
        currentStreak: streakCount,
        targetScore: String(json.targetScore || '750+').replace(/^["']|["']$/g, '').trim(),
        examDate: json.examDate || null,
        hasStudyPlan: !!json.adaptivePlan,
      };

      // Normalize v1.0 into normalized structure
      const normalizedPayload: BackupDataPayload = {
        app: 'toeic-learn',
        version: '1.0-normalized',
        exportDate: metadata.exportDate,
        metadata,
        data: {
          mistakes: json.mistakes || {},
          leitnerProgress: json.leitnerProgress || {},
          userVocabulary: json.userVocabulary || [],
          streak: typeof json.streak === 'object' && json.streak !== null ? json.streak : null,
          studyStreakLegacy: json.streak || null,
          studyDays: [],
          masterclassCompletedDays: [],
          studyPlan: json.adaptivePlan || null,
          examHistory: Array.isArray(json.examHistory) ? json.examHistory : [],
          diagnosticResult: null,
          diagnosticAnswers: null,
          tipsBookmarks: [],
          tipsMastered: [],
          aiHistory: {},
          profile: {
            targetScore: metadata.targetScore,
            examDate: metadata.examDate,
          },
          preferences: {
            vocabAutoplay: !!json.vocabAutoplay,
            soundEffects: json.soundEffects !== false,
            dailyMinutes: Number(json.dailyMinutes) || 30,
          },
          progress: json.progress || {},
          customKeys: {},
        },
      };

      return {
        isValid: true,
        metadata,
        payload: normalizedPayload,
      };
    }

    return {
      isValid: false,
      error: 'Tệp không chứa dữ liệu học tập TOEIC phù hợp.',
    };
  } catch (err: any) {
    return {
      isValid: false,
      error: `Lỗi đọc tệp JSON: ${err?.message || 'Không rõ nguyên nhân'}`,
    };
  }
}

/**
 * Restores data into localStorage.
 * Supports:
 * - 'replace': Overwrites target keys completely (ideal for brand new devices).
 * - 'merge': Intelligently merges datasets (ideal when user has studied on multiple devices).
 */
export function restoreBackupData(payload: BackupDataPayload, mode: RestoreMode): void {
  if (typeof window === 'undefined' || !payload?.data) return;

  const { data } = payload;

  if (mode === 'replace') {
    // 1. Clean replace: write all sections directly
    if (data.mistakes) {
      storage.set('mistake_notebook', data.mistakes);
      storage.set('toeic_mistake_notebook', data.mistakes);
    }
    if (data.leitnerProgress) {
      storage.set('leitner_progress', data.leitnerProgress);
    }
    if (data.userVocabulary) {
      storage.set('user_vocabulary', data.userVocabulary);
    }
    if (data.streak) {
      storage.set('vocabulary_streak', data.streak);
    }
    if (data.studyStreakLegacy) {
      storage.set('toeic_study_streak', data.studyStreakLegacy);
    }
    if (data.studyDays) {
      storage.set('toeic_study_days', data.studyDays);
    }
    if (data.masterclassCompletedDays) {
      storage.set('toeic_masterclass_completed_days', data.masterclassCompletedDays);
    }
    if (data.studyPlan) {
      storage.set('toeic_adaptive_study_plan', data.studyPlan);
    }
    if (data.examHistory) {
      storage.set('toeic_exam_history', data.examHistory);
    }
    if (data.diagnosticResult) {
      storage.set('toeic_diagnostic_result', data.diagnosticResult);
    }
    if (data.diagnosticAnswers) {
      storage.set('toeic_diagnostic_answers', data.diagnosticAnswers);
    }
    if (data.tipsBookmarks) {
      storage.set('toeic_tips_bookmarks', data.tipsBookmarks);
    }
    if (data.tipsMastered) {
      storage.set('toeic_tips_mastered', data.tipsMastered);
    }
    if (data.aiHistory) {
      storage.set('ai_study_sessions_history', data.aiHistory);
    }

    // Profile & settings
    if (data.profile?.targetScore) {
      const cleanScore = String(data.profile.targetScore).replace(/^["']|["']$/g, '').trim();
      storage.set('toeic_target_score', cleanScore);
      localStorage.setItem('toeic_target_score', cleanScore);
    }
    if (data.profile?.examDate) {
      storage.set('toeic_exam_date', data.profile.examDate);
      localStorage.setItem('toeic_exam_date', data.profile.examDate);
    }
    if (data.profile?.currentLevel) {
      storage.set('toeic_current_level', data.profile.currentLevel);
      localStorage.setItem('toeic_current_level', data.profile.currentLevel);
    }
    if (data.profile?.onboardingDone !== undefined) {
      storage.set('toeic_onboarding_done', String(data.profile.onboardingDone));
      localStorage.setItem('toeic_onboarding_done', String(data.profile.onboardingDone));
    }

    if (data.preferences) {
      storage.set('toeic_vocab_autoplay', data.preferences.vocabAutoplay);
      storage.set('toeic_sound_effects', data.preferences.soundEffects);
      storage.set('toeic_daily_minutes', data.preferences.dailyMinutes);
      if (data.preferences.part6TimeAttack !== undefined) {
        storage.set('toeic_part6_time_attack', String(data.preferences.part6TimeAttack));
      }
      if (data.preferences.part7TimeAttack !== undefined) {
        storage.set('toeic_time_attack', String(data.preferences.part7TimeAttack));
      }
    }

    if (data.progress) {
      Object.entries(data.progress).forEach(([k, v]) => storage.set(k, v));
    }
    if (data.customKeys) {
      Object.entries(data.customKeys).forEach(([k, v]) => storage.set(k, v));
    }
  } else {
    // 2. Smart Merge
    // 2.1 Mistakes: Union of mistake records, keeping highest wrongCount and most recent date
    const localMistakes = {
      ...storage.get<MistakeData>('mistake_notebook', {}),
      ...storage.get<MistakeData>('toeic_mistake_notebook', {}),
    };
    const importedMistakes = data.mistakes || {};
    const mergedMistakes: MistakeData = { ...localMistakes };

    Object.entries(importedMistakes).forEach(([id, impRecord]) => {
      const locRecord = mergedMistakes[id];
      if (!locRecord) {
        mergedMistakes[id] = impRecord;
      } else {
        mergedMistakes[id] = {
          ...locRecord,
          ...impRecord,
          wrongCount: Math.max(locRecord.wrongCount || 0, impRecord.wrongCount || 0),
          lastMistakeDate:
            new Date(impRecord.lastMistakeDate || 0) > new Date(locRecord.lastMistakeDate || 0)
              ? impRecord.lastMistakeDate
              : locRecord.lastMistakeDate,
          box: Math.max(locRecord.box || 1, impRecord.box || 1),
          isMastered: locRecord.isMastered || impRecord.isMastered,
          rootCause: locRecord.rootCause || impRecord.rootCause,
        };
      }
    });
    storage.set('mistake_notebook', mergedMistakes);
    storage.set('toeic_mistake_notebook', mergedMistakes);

    // 2.2 Leitner Progress: Keep higher box level
    const localLeitner = storage.get<LeitnerState>('leitner_progress', {});
    const importedLeitner = data.leitnerProgress || {};
    const mergedLeitner: LeitnerState = { ...localLeitner };

    Object.entries(importedLeitner).forEach(([wordId, impRecord]) => {
      const locRecord = mergedLeitner[wordId];
      if (!locRecord) {
        mergedLeitner[wordId] = impRecord;
      } else {
        mergedLeitner[wordId] = {
          box: Math.max(locRecord.box || 0, impRecord.box || 0),
          lastReview:
            new Date(impRecord.lastReview || 0) > new Date(locRecord.lastReview || 0)
              ? impRecord.lastReview
              : locRecord.lastReview,
          nextReview: impRecord.nextReview || locRecord.nextReview,
        };
      }
    });
    storage.set('leitner_progress', mergedLeitner);

    // 2.3 User Vocabulary: Union of unique words
    const localVocab = storage.get<VocabularyWord[]>('user_vocabulary', []);
    const importedVocab = data.userVocabulary || [];
    const vocabMap = new Map<string, VocabularyWord>();
    localVocab.forEach((w) => vocabMap.set(w.id || w.word, w));
    importedVocab.forEach((w) => {
      const key = w.id || w.word;
      if (!vocabMap.has(key)) {
        vocabMap.set(key, w);
      }
    });
    storage.set('user_vocabulary', Array.from(vocabMap.values()));

    // 2.4 Streak: Pick max streak values and union study history days
    const localStreak = storage.get<StreakData | null>('vocabulary_streak', null);
    const importedStreak = data.streak;
    if (importedStreak || localStreak) {
      const currentStreak = Math.max(
        localStreak?.currentStreak || 0,
        importedStreak?.currentStreak || 0
      );
      const bestStreak = Math.max(
        localStreak?.bestStreak || 0,
        importedStreak?.bestStreak || 0
      );
      const freezeCount = Math.max(
        localStreak?.freezeCount || 0,
        importedStreak?.freezeCount || 0
      );
      const lastStudyDate =
        new Date(importedStreak?.lastStudyDate || 0) > new Date(localStreak?.lastStudyDate || 0)
          ? importedStreak?.lastStudyDate || ''
          : localStreak?.lastStudyDate || '';

      const mergedStreak: StreakData = {
        currentStreak,
        bestStreak,
        freezeCount,
        lastStudyDate,
        isFrozenToday: localStreak?.isFrozenToday || importedStreak?.isFrozenToday || false,
      };
      storage.set('vocabulary_streak', mergedStreak);
    }

    // 2.5 Study days & Masterclass
    const localStudyDays = storage.get<string[]>('toeic_study_days', []);
    const mergedStudyDays = Array.from(
      new Set([...localStudyDays, ...(data.studyDays || [])])
    );
    storage.set('toeic_study_days', mergedStudyDays);

    const localMasterclass = storage.get<number[]>('toeic_masterclass_completed_days', []);
    const mergedMasterclass = Array.from(
      new Set([...localMasterclass, ...(data.masterclassCompletedDays || [])])
    );
    storage.set('toeic_masterclass_completed_days', mergedMasterclass);

    // 2.6 Tips bookmarks and mastered
    const localBookmarks = storage.get<string[]>('toeic_tips_bookmarks', []);
    const mergedBookmarks = Array.from(
      new Set([...localBookmarks, ...(data.tipsBookmarks || [])])
    );
    storage.set('toeic_tips_bookmarks', mergedBookmarks);

    const localMastered = storage.get<string[]>('toeic_tips_mastered', []);
    const mergedMastered = Array.from(
      new Set([...localMastered, ...(data.tipsMastered || [])])
    );
    storage.set('toeic_tips_mastered', mergedMastered);

    // 2.7 Exam History: Union unique exams by timestamp/testId
    const localExams = storage.get<any[]>('toeic_exam_history', []);
    const importedExams = data.examHistory || [];
    const examMap = new Map<string, any>();
    localExams.forEach((e) => {
      const key = `${e.testId}_${e.date || e.timestamp || JSON.stringify(e)}`;
      examMap.set(key, e);
    });
    importedExams.forEach((e) => {
      const key = `${e.testId}_${e.date || e.timestamp || JSON.stringify(e)}`;
      if (!examMap.has(key)) {
        examMap.set(key, e);
      }
    });
    storage.set('toeic_exam_history', Array.from(examMap.values()));

    // 2.8 Diagnostic Results
    if (!storage.get('toeic_diagnostic_result', null) && data.diagnosticResult) {
      storage.set('toeic_diagnostic_result', data.diagnosticResult);
    }
    if (!storage.get('toeic_diagnostic_answers', null) && data.diagnosticAnswers) {
      storage.set('toeic_diagnostic_answers', data.diagnosticAnswers);
    }

    // 2.9 Study Plan: If local plan exists, merge completed days/tasks; else adopt imported
    const localPlan = storage.get<StudyPlan | null>('toeic_adaptive_study_plan', null);
    if (!localPlan && data.studyPlan) {
      storage.set('toeic_adaptive_study_plan', data.studyPlan);
    } else if (localPlan && data.studyPlan) {
      const mergedPlan: StudyPlan = { ...localPlan };
      if (Array.isArray(mergedPlan.days) && Array.isArray(data.studyPlan.days)) {
        mergedPlan.days = mergedPlan.days.map((locDay, idx) => {
          const impDay = data.studyPlan?.days?.[idx];
          if (!impDay) return locDay;

          const isCompleted = locDay.completed || impDay.completed;
          const mergedTasks = locDay.tasks.map((locTask, tIdx) => {
            const impTask = impDay.tasks?.[tIdx];
            return {
              ...locTask,
              completed: locTask.completed || impTask?.completed || false,
            };
          });

          return {
            ...locDay,
            completed: isCompleted,
            tasks: mergedTasks,
          };
        });
      }
      storage.set('toeic_adaptive_study_plan', mergedPlan);
    }

    // 2.10 AI History
    const localAi = storage.get<Record<string, any>>('ai_study_sessions_history', {});
    storage.set('ai_study_sessions_history', { ...localAi, ...(data.aiHistory || {}) });

    // 2.11 Progress keys
    if (data.progress) {
      Object.entries(data.progress).forEach(([k, v]) => {
        if (v && !storage.get(k, false)) {
          storage.set(k, true);
        }
      });
    }

    // 2.12 Profile fields: Only set if local is empty
    if (data.profile?.targetScore && !localStorage.getItem('toeic_target_score')) {
      const cleanScore = String(data.profile.targetScore).replace(/^["']|["']$/g, '').trim();
      storage.set('toeic_target_score', cleanScore);
      localStorage.setItem('toeic_target_score', cleanScore);
    }
    if (data.profile?.examDate && !localStorage.getItem('toeic_exam_date')) {
      storage.set('toeic_exam_date', data.profile.examDate);
      localStorage.setItem('toeic_exam_date', data.profile.examDate);
    }
  }

  // Trigger app-wide storage sync event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('app-storage-update', { detail: { key: '*', value: null } })
    );
  }
}

/**
 * Triggers a browser file download of the backup payload
 */
export function downloadBackupFile(customPayload?: BackupDataPayload): void {
  if (typeof window === 'undefined') return;

  const payload = customPayload || createBackupPayload();
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `toeic_master_backup_${dateStr}.json`;

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
