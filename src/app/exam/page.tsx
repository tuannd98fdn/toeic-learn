'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Confetti from '@/components/Confetti';
import {
  StatsIcon,
  SearchIcon,
  HomeIcon,
  ClockIcon,
  FlagIcon,
  MapPinIcon,
  BotIcon,
  AwardIcon,
  TrendingUpIcon,
  LightbulbIcon,
  MaximizeIcon,
  MinimizeIcon,
  AlertCircleIcon,
  CloseIcon,
  ZapIcon,
  NotebookIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  RotateCcwIcon,
  WifiOffIcon,
} from '@/components/icons/AppIcons';
import ListeningAudioPlayer from '@/components/ListeningAudioPlayer';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { storage } from '@/utils/storage';
import { syncAdaptivePlan, completeActiveTaskByType } from '@/utils/studyPlanEngine';
import KnowledgeGapBreakdown from '@/components/KnowledgeGapBreakdown';
import {
  calculateScaledScore,
  getCefrLevel,
  getRcCefrLevel,
  RC_TABLE,
  diagnoseWeakness,
  ExamScoreSummary,
  PartScore,
} from '@/utils/toeicScoreCalculator';
import styles from './page.module.css';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';

export interface ExamDraft {
  testId: string;
  section: 'all' | 'rc' | 'rc_sprint';
  userAnswers: Record<number, string>;
  flaggedQuestions: number[];
  currentIndex: number;
  timeLeft: number;
  lastSaved: number;
  part5Seconds: number;
  part6Seconds: number;
  part7Seconds: number;
  totalQuestions: number;
}


interface UnifiedQuestion {
  id: string;
  number: number;
  part: 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7';
  partTitle: string;
  text: string;
  image?: string;
  audioUrl?: string;
  passageText?: string;
  context?: string;
  options: Record<string, string>;
  correctAnswer: string;
  explanation?: string;
  transcript?: string;
  subCategory?: string;
  grammarTag?: string;
}

interface PartPacingStat {
  part: string;
  partName: string;
  secondsSpent: number;
  avgSecondsPerQ: number;
  targetSecondsPerQ: number;
  status: 'optimal' | 'moderate' | 'critical';
  statusText: string;
}

interface ComprehensivePacingAnalytics {
  totalSeconds: number;
  maxRecommendedSeconds: number;
  part5: PartPacingStat;
  part6: PartPacingStat;
  part7: PartPacingStat;
  overallStatus: 'optimal' | 'moderate' | 'critical';
  overallStatusText: string;
  advice: string;
}

export default function ExamPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang khởi tạo phòng thi TOEIC...</div>}>
      <ExamSimulation />
    </Suspense>
  );
}

function ExamSimulation() {
  const searchParams = useSearchParams();
  const rawTestId = searchParams.get('test') || 'ets2022_test1';
  // Chỉ chấp nhận đề thi chuẩn đã xác thực (ets2022_test1 .. ets2022_test6)
  const testId = ['ets2022_test1', 'ets2022_test2', 'ets2022_test3', 'ets2022_test4', 'ets2022_test5', 'ets2022_test6'].includes(rawTestId)
    ? rawTestId
    : 'ets2022_test1';
  const sectionParam = searchParams.get('section');
  const currentSection: 'all' | 'rc' | 'rc_sprint' =
    sectionParam === 'rc' || sectionParam === 'rc_sprint' ? sectionParam : 'all';

  const totalExamTime =
    currentSection === 'rc' ? 75 * 60 : currentSection === 'rc_sprint' ? 30 * 60 : 120 * 60;

  const [questions, setQuestions] = useState<UnifiedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Exam Progress
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  // Timer
  const [timeLeft, setTimeLeft] = useState(totalExamTime);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Navigation Filter
  const [navTab, setNavTab] = useState<'all' | 'lc' | 'rc' | 'p5' | 'p6' | 'p7'>('all');

  // Exam Result
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultSummary, setResultSummary] = useState<ExamScoreSummary | null>(null);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [showOnlyWrong, setShowOnlyWrong] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);

  // Auto-Save & Offline states
  const [autoSavedAt, setAutoSavedAt] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [recoveryNotice, setRecoveryNotice] = useState<{
    answeredCount: number;
    totalCount: number;
    timeLeft: number;
    restoredAt: number;
  } | null>(null);
  const [expiredDraftData, setExpiredDraftData] = useState<ExamDraft | null>(null);

  const draftKey = `toeic_exam_draft_${testId}_${currentSection}`;
  const questionsCacheKey = `toeic_exam_questions_cache_${testId}_${currentSection}`;
  const activeSessionKey = 'toeic_exam_active_session';

  // Pacing Trackers
  const part5SecondsRef = useRef<number>(0);
  const part6SecondsRef = useRef<number>(0);
  const part7SecondsRef = useRef<number>(0);

  // Synchronized refs for fresh access in intervals & listeners
  const userAnswersRef = useRef(userAnswers);
  const flaggedQuestionsRef = useRef(flaggedQuestions);
  const timeLeftRef = useRef(timeLeft);
  const currentIndexRef = useRef(currentIndex);
  const isSubmittedRef = useRef(isSubmitted);
  const isReviewModeRef = useRef(isReviewMode);

  useEffect(() => { userAnswersRef.current = userAnswers; }, [userAnswers]);
  useEffect(() => { flaggedQuestionsRef.current = flaggedQuestions; }, [flaggedQuestions]);
  useEffect(() => { timeLeftRef.current = timeLeft; }, [timeLeft]);
  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);
  useEffect(() => { isSubmittedRef.current = isSubmitted; }, [isSubmitted]);
  useEffect(() => { isReviewModeRef.current = isReviewMode; }, [isReviewMode]);

  const saveDraft = (
    customAnswers = userAnswersRef.current,
    customFlags = flaggedQuestionsRef.current,
    customIndex = currentIndexRef.current,
    customTime = timeLeftRef.current,
  ) => {
    if (isSubmittedRef.current || isReviewModeRef.current || questions.length === 0) return;
    const answeredCount = Object.keys(customAnswers).length;
    const flaggedCount = customFlags.size;

    // Do not save blank drafts before user starts
    if (answeredCount === 0 && flaggedCount === 0 && customTime >= totalExamTime) {
      return;
    }

    const draft: ExamDraft = {
      testId,
      section: currentSection,
      userAnswers: customAnswers,
      flaggedQuestions: Array.from(customFlags),
      currentIndex: customIndex,
      timeLeft: customTime,
      lastSaved: Date.now(),
      part5Seconds: part5SecondsRef.current,
      part6Seconds: part6SecondsRef.current,
      part7Seconds: part7SecondsRef.current,
      totalQuestions: questions.length,
    };

    storage.set(draftKey, draft);
    storage.set(activeSessionKey, {
      testId,
      section: currentSection,
      lastSaved: Date.now(),
      answeredCount,
      totalQuestions: questions.length,
    });
    setAutoSavedAt(Date.now());
  };

  const handleResetExam = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài làm hiện tại để bắt đầu lại từ đầu? Mọi câu trả lời đã lưu tạm sẽ bị xóa.')) {
      storage.remove(draftKey);
      storage.remove(activeSessionKey);
      setUserAnswers({});
      setFlaggedQuestions(new Set());
      setCurrentIndex(0);
      setTimeLeft(totalExamTime);
      part5SecondsRef.current = 0;
      part6SecondsRef.current = 0;
      part7SecondsRef.current = 0;
      setRecoveryNotice(null);
      setExpiredDraftData(null);
      setAutoSavedAt(null);
    }
  };

  const navigateToQuestion = (newIndex: number) => {
    const targetIndex = Math.max(0, Math.min(questions.length - 1, newIndex));
    setCurrentIndex(targetIndex);
    saveDraft(userAnswersRef.current, flaggedQuestionsRef.current, targetIndex, timeLeftRef.current);
  };

  const [part7ExamPacing, setPart7ExamPacing] = useState<{
    secondsSpent: number;
    avgSecondsPerQ: number;
    status: 'optimal' | 'moderate' | 'critical';
    statusText: string;
    advice: string;
  } | null>(null);

  const [comprehensivePacing, setComprehensivePacing] =
    useState<ComprehensivePacingAnalytics | null>(null);

  // Focus Mode
  const [isFocusMode, setIsFocusMode] = useState(false);


  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        document.body.classList.remove('focus-mode');
        setIsFocusMode(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.body.classList.remove('focus-mode');
    };
  }, []);

  const toggleFocusMode = () => {
    if (!isFocusMode) {
      document.body.classList.add('focus-mode');
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
          console.warn('Error attempting to enable fullscreen:', err);
        });
      }
      setIsFocusMode(true);
    } else {
      document.body.classList.remove('focus-mode');
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
          console.warn('Error attempting to exit fullscreen:', err);
        });
      }
      setIsFocusMode(false);
    }
  };

  const { addMistake } = useMistakeNotebook();

  // Load and unify questions based on selected section
  useEffect(() => {
    const loadAllParts = async () => {
      try {
        setLoading(true);
        const match = testId.match(/ets(\d+)_test(\d+)/);
        if (!match) throw new Error('Mã đề không hợp lệ');

        const pathBase = `/data/ets${match[1]}/test${match[2]}`;
        const unified: UnifiedQuestion[] = [];

        if (currentSection === 'all') {
          const responses = await Promise.all([
            fetch(`${pathBase}/part1.json`),
            fetch(`${pathBase}/part2.json`),
            fetch(`${pathBase}/part3.json`),
            fetch(`${pathBase}/part4.json`),
            fetch(`${pathBase}/part5.json`),
            fetch(`${pathBase}/part6.json`),
            fetch(`${pathBase}/part7.json`),
          ]);

          if (responses.some((r) => !r.ok)) {
            throw new Error('Không thể tải đầy đủ dữ liệu đề thi');
          }

          const [p1, p2, p3, p4, p5, p6, p7] = await Promise.all(
            responses.map((r) => r.json())
          );

          // Part 1 (1-6)
          p1.forEach((q: any) => {
            unified.push({
              id: q.id,
              number: q.number,
              part: 'p1',
              partTitle: 'Part 1: Photographs',
              text: 'Look at the photograph and choose the statement that best describes what you see.',
              image: q.image,
              audioUrl: q.audioUrl,
              options: q.options,
              correctAnswer: q.correctAnswer,
              transcript: q.transcript,
              explanation: q.explanation,
            });
          });

          // Part 2 (7-31)
          p2.forEach((q: any) => {
            unified.push({
              id: q.id,
              number: q.number,
              part: 'p2',
              partTitle: 'Part 2: Question-Response',
              text: 'Listen to the question or statement and choose the best response.',
              audioUrl: q.audioUrl,
              options: q.options,
              correctAnswer: q.correctAnswer,
              transcript: q.transcript,
              explanation: q.explanation,
            });
          });

          // Part 3 (32-70)
          p3.forEach((set: any) => {
            set.questions?.forEach((q: any) => {
              unified.push({
                id: q.id,
                number: q.number,
                part: 'p3',
                partTitle: 'Part 3: Short Conversations',
                text: q.text,
                image: set.image,
                audioUrl: set.audioUrl,
                context: set.context,
                options: q.options,
                correctAnswer: q.correctAnswer,
                transcript: set.transcript,
                explanation: q.explanation,
              });
            });
          });

          // Part 4 (71-100)
          p4.forEach((set: any) => {
            set.questions?.forEach((q: any) => {
              unified.push({
                id: q.id,
                number: q.number,
                part: 'p4',
                partTitle: 'Part 4: Short Talks',
                text: q.text,
                image: set.image,
                audioUrl: set.audioUrl,
                context: set.context,
                options: q.options,
                correctAnswer: q.correctAnswer,
                transcript: set.transcript,
                explanation: q.explanation,
              });
            });
          });

          // Part 5 (101-130)
          p5.forEach((q: any) => {
            unified.push({
              id: q.id,
              number: q.number,
              part: 'p5',
              partTitle: 'Part 5: Incomplete Sentences',
              text: q.text,
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
              subCategory: q.subCategory || q.type,
              grammarTag: q.grammarTag,
            });
          });

          // Part 6 (131-146)
          p6.forEach((passage: any) => {
            passage.questions?.forEach((q: any) => {
              unified.push({
                id: q.id,
                number: q.number,
                part: 'p6',
                partTitle: 'Part 6: Text Completion',
                text: q.text,
                passageText: passage.content,
                options: q.options,
                correctAnswer: q.correctAnswer,
                explanation: q.explanation,
                subCategory: q.subCategory || q.type,
                grammarTag: q.grammarTag,
              });
            });
          });

          // Part 7 (147-200)
          p7.forEach((set: any) => {
            const combinedPassages = (set.passages || [])
              .map((p: any) => p.content)
              .join('\n\n--- Passage Divider ---\n\n');

            set.questions?.forEach((q: any) => {
              unified.push({
                id: q.id,
                number: q.number,
                part: 'p7',
                partTitle: `Part 7: Reading Comprehension (${set.type || 'Passage'})`,
                text: q.text,
                passageText: combinedPassages,
                options: q.options,
                correctAnswer: q.correctAnswer,
                explanation: q.explanation,
                subCategory: q.questionType || q.subCategory || 'Detail',
                grammarTag: q.questionType || 'Detail',
              });
            });
          });
        } else {
          // Reading Sections (RC 100 questions or RC Sprint 40 questions)
          const responses = await Promise.all([
            fetch(`${pathBase}/part5.json`),
            fetch(`${pathBase}/part6.json`),
            fetch(`${pathBase}/part7.json`),
          ]);

          if (responses.some((r) => !r.ok)) {
            throw new Error('Không thể tải dữ liệu phần Đọc');
          }

          const [p5Raw, p6Raw, p7Raw] = await Promise.all(
            responses.map((r) => r.json())
          );

          const p5Data = currentSection === 'rc_sprint' ? p5Raw.slice(0, 15) : p5Raw;
          const p6Data = currentSection === 'rc_sprint' ? p6Raw.slice(0, 2) : p6Raw;
          let p7Data = p7Raw;
          if (currentSection === 'rc_sprint') {
            let p7Count = 0;
            p7Data = [];
            for (const set of p7Raw) {
              p7Data.push(set);
              p7Count += (set.questions || []).length;
              if (p7Count >= 17) break;
            }
          }

          p5Data.forEach((q: any) => {
            unified.push({
              id: q.id,
              number: q.number,
              part: 'p5',
              partTitle: 'Part 5: Incomplete Sentences',
              text: q.text,
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
              subCategory: q.subCategory || q.type,
              grammarTag: q.grammarTag,
            });
          });

          p6Data.forEach((passage: any) => {
            passage.questions?.forEach((q: any) => {
              unified.push({
                id: q.id,
                number: q.number,
                part: 'p6',
                partTitle: 'Part 6: Text Completion',
                text: q.text,
                passageText: passage.content,
                options: q.options,
                correctAnswer: q.correctAnswer,
                explanation: q.explanation,
                subCategory: q.subCategory || q.type,
                grammarTag: q.grammarTag,
              });
            });
          });

          p7Data.forEach((set: any) => {
            const combinedPassages = (set.passages || [])
              .map((p: any) => p.content)
              .join('\n\n--- Passage Divider ---\n\n');

            set.questions?.forEach((q: any) => {
              unified.push({
                id: q.id,
                number: q.number,
                part: 'p7',
                partTitle: `Part 7: Reading Comprehension (${set.type || 'Passage'})`,
                text: q.text,
                passageText: combinedPassages,
                options: q.options,
                correctAnswer: q.correctAnswer,
                explanation: q.explanation,
                subCategory: q.questionType || q.subCategory || 'Detail',
                grammarTag: q.questionType || 'Detail',
              });
            });
          });
        }

        unified.sort((a, b) => a.number - b.number);
        setQuestions(unified);
        // Cache to storage for offline reload resilience
        storage.set(questionsCacheKey, unified);
        setIsOfflineMode(false);
        setError(null);
      } catch (err: any) {
        console.warn('Network fetch error or offline, attempting to load from cache:', err);
        const cachedQuestions = storage.get<UnifiedQuestion[] | null>(questionsCacheKey, null);
        if (cachedQuestions && cachedQuestions.length > 0) {
          setQuestions(cachedQuestions);
          setIsOfflineMode(true);
          setError(null);
        } else {
          console.error('Error loading exam data:', err);
          setError(err.message || 'Không thể nạp bài thi');
        }
      } finally {
        setLoading(false);
      }
    };

    loadAllParts();
  }, [testId, currentSection, totalExamTime, questionsCacheKey]);

  // Draft Recovery on Component Mount / Questions Loaded
  const hasCheckedDraftRef = useRef(false);

  useEffect(() => {
    hasCheckedDraftRef.current = false;
  }, [testId, currentSection]);

  useEffect(() => {
    if (questions.length === 0 || loading || hasCheckedDraftRef.current || isSubmitted) return;
    hasCheckedDraftRef.current = true;

    const draft = storage.get<ExamDraft | null>(draftKey, null);
    if (!draft || draft.testId !== testId || draft.section !== currentSection) {
      return;
    }

    const answeredCount = Object.keys(draft.userAnswers || {}).length;
    const flaggedCount = (draft.flaggedQuestions || []).length;
    if (answeredCount === 0 && flaggedCount === 0) {
      return;
    }

    // Calculate elapsed seconds since last save
    const elapsedSecs = Math.max(0, Math.floor((Date.now() - draft.lastSaved) / 1000));
    const adjustedTime = Math.max(0, draft.timeLeft - elapsedSecs);

    if (adjustedTime > 0) {
      // Normal restoration: answers, flags, question index, pacing, remaining time
      setUserAnswers(draft.userAnswers || {});
      setFlaggedQuestions(new Set(draft.flaggedQuestions || []));
      if (typeof draft.currentIndex === 'number' && draft.currentIndex >= 0 && draft.currentIndex < questions.length) {
        setCurrentIndex(draft.currentIndex);
      }
      setTimeLeft(adjustedTime);
      part5SecondsRef.current = draft.part5Seconds || 0;
      part6SecondsRef.current = draft.part6Seconds || 0;
      part7SecondsRef.current = draft.part7Seconds || 0;
      setAutoSavedAt(draft.lastSaved);

      setRecoveryNotice({
        answeredCount,
        totalCount: questions.length,
        timeLeft: adjustedTime,
        restoredAt: Date.now(),
      });
    } else {
      // Draft has expired (120 minutes passed while user was away)
      setExpiredDraftData(draft);
    }
  }, [questions, loading, isSubmitted, draftKey, testId, currentSection]);

  // Timer interval with Pacing tracking & Auto-save every 5 seconds
  useEffect(() => {
    if (loading || isSubmitted || isPaused) return;

    timerRef.current = setInterval(() => {
      const curPart = questions[currentIndexRef.current]?.part;
      if (curPart === 'p5') {
        part5SecondsRef.current += 1;
      } else if (curPart === 'p6') {
        part6SecondsRef.current += 1;
      } else if (curPart === 'p7') {
        part7SecondsRef.current += 1;
      }

      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleSubmitExam();
          return 0;
        }
        const nextTime = prev - 1;
        // Auto-save timer and pacing progress every 5 seconds
        if (nextTime % 5 === 0) {
          saveDraft(userAnswersRef.current, flaggedQuestionsRef.current, currentIndexRef.current, nextTime);
        }
        return nextTime;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loading, isSubmitted, isPaused, questions]); // eslint-disable-line react-hooks/exhaustive-deps

  // Monitor online / offline network connectivity
  useEffect(() => {
    setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Flush draft on visibilitychange (tab switch) & prompt on beforeunload (accidental reload/close)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !isSubmittedRef.current && !isReviewModeRef.current) {
        saveDraft();
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSubmittedRef.current && !isReviewModeRef.current && Object.keys(userAnswersRef.current).length > 0) {
        saveDraft();
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [draftKey]);

  const formatTimer = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const handleSelectOption = (letter: string) => {
    if (isSubmitted && !isReviewMode) return;
    const currentQ = questions[currentIndex];
    const newAnswers = {
      ...userAnswers,
      [currentQ.number]: letter,
    };
    setUserAnswers(newAnswers);
    saveDraft(newAnswers, flaggedQuestions, currentIndex, timeLeftRef.current);
  };

  const toggleFlag = (num: number) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      saveDraft(userAnswersRef.current, next, currentIndexRef.current, timeLeftRef.current);
      return next;
    });
  };

  const handleSwitchSection = (newSec: 'all' | 'rc' | 'rc_sprint') => {
    if (newSec === currentSection) return;
    if (Object.keys(userAnswers).length > 0) {
      if (!window.confirm('Chuyển chế độ thi sẽ chuyển sang bài làm của chế độ mới. Bài làm hiện tại của bạn vẫn được lưu tạm. Bạn có muốn chuyển?')) {
        return;
      }
      saveDraft();
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('section', newSec);
    window.location.href = `/exam?${params.toString()}`;
  };


  const handleSubmitExam = () => {
    if (isSubmitted) return;

    if (timerRef.current) clearInterval(timerRef.current);

    // Compute raw scores and per-part accuracy
    let rawLC = 0;
    let rawRC = 0;

    const partCounts: Record<string, { total: number; correct: number }> = {
      p1: { total: 0, correct: 0 },
      p2: { total: 0, correct: 0 },
      p3: { total: 0, correct: 0 },
      p4: { total: 0, correct: 0 },
      p5: { total: 0, correct: 0 },
      p6: { total: 0, correct: 0 },
      p7: { total: 0, correct: 0 },
    };

    questions.forEach((q) => {
      const isCorrect = userAnswers[q.number] === q.correctAnswer;
      const isLC = q.part === 'p1' || q.part === 'p2' || q.part === 'p3' || q.part === 'p4';

      if (isLC) {
        if (isCorrect) rawLC++;
      } else {
        if (isCorrect) rawRC++;
      }

      if (partCounts[q.part]) {
        partCounts[q.part].total++;
        if (isCorrect) partCounts[q.part].correct++;
      }

      // Add wrong questions to Mistake Notebook
      if (!isCorrect) {
        addMistake(`exam_${testId}_${q.part}_${q.id}`, {
          type: 'exam',
          testId: testId,
          part: q.part,
          questionId: q.id,
          subCategory: q.subCategory,
          grammarTag: q.grammarTag,
        });
      }
    });

    let scaledLC = 0;
    let scaledRC = 0;
    let totalScore = 0;
    let cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' = 'A1';

    if (currentSection === 'all') {
      const scoreObj = calculateScaledScore(rawLC, rawRC);
      scaledLC = scoreObj.scaledLC;
      scaledRC = scoreObj.scaledRC;
      totalScore = scoreObj.totalScore;
      cefrLevel = getCefrLevel(totalScore);
    } else if (currentSection === 'rc') {
      scaledLC = 0;
      scaledRC = RC_TABLE[Math.max(0, Math.min(100, Math.round(rawRC)))] ?? 5;
      totalScore = scaledRC;
      cefrLevel = getRcCefrLevel(scaledRC);
    } else {
      // rc_sprint
      scaledLC = 0;
      const equivalent100 = Math.max(0, Math.min(100, Math.round((rawRC / Math.max(1, questions.length)) * 100)));
      scaledRC = RC_TABLE[equivalent100] ?? 5;
      totalScore = scaledRC;
      cefrLevel = getRcCefrLevel(scaledRC);
    }

    const partScores: Record<string, PartScore> = {};
    Object.keys(partCounts).forEach((p) => {
      if (partCounts[p].total > 0) {
        const total = partCounts[p].total;
        const correct = partCounts[p].correct;
        partScores[p] = {
          total,
          correct,
          accuracy: Math.round((correct / total) * 100),
        };
      }
    });

    const weakestPart = diagnoseWeakness(partScores);

    const match = testId.match(/ets(\d+)_test(\d+)/);
    const testNum = match ? match[2] : '1';
    let sectionTitle = 'Full Test 200 câu';
    if (currentSection === 'rc') sectionTitle = 'Thi thử Đọc RC (75P)';
    if (currentSection === 'rc_sprint') sectionTitle = 'RC Sprint (30P)';

    const summary: ExamScoreSummary = {
      testId,
      testName: `ETS 2022 - Test ${testNum} (${sectionTitle})`,
      date: new Date().toLocaleDateString('vi-VN'),
      durationSeconds: totalExamTime - timeLeft,
      section: currentSection,
      totalQuestions: questions.length,
      rawLC,
      rawRC,
      scaledLC,
      scaledRC,
      totalScore,
      cefrLevel,
      partScores,
      weakestPart,
    };

    // Save to localStorage history
    const prevHistory = storage.get<ExamScoreSummary[]>('toeic_exam_history', []);
    storage.set('toeic_exam_history', [summary, ...prevHistory]);

    // Clear auto-saved draft for this completed test
    storage.remove(draftKey);
    storage.remove(activeSessionKey);
    setRecoveryNotice(null);
    setExpiredDraftData(null);

    // Synchronize and rebalance study plan based on full exam performance
    syncAdaptivePlan();
    completeActiveTaskByType('exam');

    // Calculate Comprehensive Reading Pacing Analytics (Part 5, Part 6, Part 7)
    const p5Seconds = part5SecondsRef.current;
    const p6Seconds = part6SecondsRef.current;
    const part7Seconds = part7SecondsRef.current;

    const p5Count = questions.filter((q) => q.part === 'p5').length || 1;
    const p6Count = questions.filter((q) => q.part === 'p6').length || 1;
    const p7Count = questions.filter((q) => q.part === 'p7').length || 1;

    const avgP5Sec = Math.round(p5Seconds / p5Count);
    const avgP6Sec = Math.round(p6Seconds / p6Count);
    const avgP7Sec = Math.round(part7Seconds / p7Count);

    // P5 evaluation: target <= 25s / question
    let p5Status: 'optimal' | 'moderate' | 'critical' = 'optimal';
    let p5Text = 'Tốc độ vàng (≤ 25s)';
    if (avgP5Sec > 35) {
      p5Status = 'critical';
      p5Text = 'Quá chậm (> 35s)';
    } else if (avgP5Sec > 25) {
      p5Status = 'moderate';
      p5Text = 'Cần đẩy nhanh (26-35s)';
    }

    // P6 evaluation: target <= 35s / question
    let p6Status: 'optimal' | 'moderate' | 'critical' = 'optimal';
    let p6Text = 'Tốc độ tốt (≤ 35s)';
    if (avgP6Sec > 45) {
      p6Status = 'critical';
      p6Text = 'Quá chậm (> 45s)';
    } else if (avgP6Sec > 35) {
      p6Status = 'moderate';
      p6Text = 'Cần đẩy nhanh (36-45s)';
    }

    // P7 evaluation: target <= 60s / question
    let p7Status: 'optimal' | 'moderate' | 'critical' = 'optimal';
    let p7Text = 'Tốc độ tối ưu (≤ 60s)';
    if (part7Seconds > 65 * 60 || avgP7Sec > 72) {
      p7Status = 'critical';
      p7Text = 'Nguy cơ cháy giờ cao (> 72s)';
    } else if (part7Seconds > 54 * 60 || avgP7Sec > 60) {
      p7Status = 'moderate';
      p7Text = 'Hơi lẹm thời gian (61-72s)';
    }

    let overallAdvice = '';
    if (p5Status === 'critical' && p7Status === 'critical') {
      overallAdvice =
        'Bạn bị chậm ngay từ Part 5 khiến Part 7 bị thiếu thời gian nghiêm trọng. Hãy tập phản xạ nhận diện từ loại và cấu trúc câu trong 15s để dành thời gian cho bài đọc.';
    } else if (p5Status === 'critical') {
      overallAdvice =
        'Bạn mất quá nhiều thời gian ở Part 5. Cần áp dụng kỹ thuật loại trừ nhanh để không làm hao hụt quỹ thời gian của Part 7.';
    } else if (p7Status === 'critical') {
      overallAdvice =
        'Tốc độ đọc Part 7 đang là điểm nghẽn lớn nhất. Hãy luyện đọc quét Skimming & Scanning các đoạn đơn trước khi giải quyết đoạn đôi và đoạn ba.';
    } else {
      overallAdvice =
        'Khả năng phân bổ thời gian xuất sắc! Bạn kiểm soát nhịp độ các phần rất đồng đều, bảo đảm đủ thời gian đọc kỹ các đoạn văn dài.';
    }

    setComprehensivePacing({
      totalSeconds: p5Seconds + p6Seconds + part7Seconds,
      maxRecommendedSeconds:
        currentSection === 'rc' ? 75 * 60 : currentSection === 'rc_sprint' ? 30 * 60 : 75 * 60,
      part5: {
        part: 'p5',
        partName: 'Part 5: Sentences',
        secondsSpent: p5Seconds,
        avgSecondsPerQ: avgP5Sec,
        targetSecondsPerQ: 25,
        status: p5Status,
        statusText: p5Text,
      },
      part6: {
        part: 'p6',
        partName: 'Part 6: Completion',
        secondsSpent: p6Seconds,
        avgSecondsPerQ: avgP6Sec,
        targetSecondsPerQ: 35,
        status: p6Status,
        statusText: p6Text,
      },
      part7: {
        part: 'p7',
        partName: 'Part 7: Reading',
        secondsSpent: part7Seconds,
        avgSecondsPerQ: avgP7Sec,
        targetSecondsPerQ: 60,
        status: p7Status,
        statusText: p7Text,
      },
      overallStatus:
        p7Status === 'critical' || p5Status === 'critical'
          ? 'critical'
          : p7Status === 'moderate' || p5Status === 'moderate'
          ? 'moderate'
          : 'optimal',
      overallStatusText:
        p7Status === 'critical' || p5Status === 'critical'
          ? 'Cần cải thiện nhịp độ'
          : p7Status === 'moderate' || p5Status === 'moderate'
          ? 'Nhịp độ khá tốt'
          : 'Nhịp độ hoàn hảo',
      advice: overallAdvice,
    });

    setPart7ExamPacing({
      secondsSpent: part7Seconds,
      avgSecondsPerQ: avgP7Sec,
      status: p7Status,
      statusText: p7Text,
      advice: overallAdvice,
    });

    setResultSummary(summary);
    setIsSubmitted(true);
    if (
      (currentSection === 'all' && totalScore >= 600) ||
      (currentSection !== 'all' && scaledRC >= 300)
    ) {
      setShowConfetti(true);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <span>
          {currentSection === 'rc'
            ? 'Đang chuẩn bị đề thi Đọc RC 100 câu (75 phút)...'
            : currentSection === 'rc_sprint'
            ? 'Đang chuẩn bị đề thi RC Sprint 40 câu (30 phút)...'
            : 'Đang chuẩn bị đề thi 200 câu...'}
        </span>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
          {currentSection !== 'all'
            ? 'Nạp dữ liệu Part 5, 6, 7 chuẩn ETS với giải thích chi tiết'
            : 'Nạp hình ảnh, audio và dữ liệu chuẩn ETS'}
        </span>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className={styles.errorState}>
        <p><AlertCircleIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />{error || 'Không thể tải đề thi.'}</p>
        <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
      </div>
    );
  }

  // Filtered navigator questions
  const filteredQuestions = questions.filter((q) => {
    if (showOnlyWrong && isReviewMode && userAnswers[q.number] === q.correctAnswer) {
      return false;
    }
    if (navTab === 'lc') return q.number <= 100;
    if (navTab === 'rc') return q.number > 100;
    if (navTab === 'p5') return q.part === 'p5';
    if (navTab === 'p6') return q.part === 'p6';
    if (navTab === 'p7') return q.part === 'p7';
    return true;
  });

  const currentQ = questions[currentIndex];
  const isCurrentFlagged = flaggedQuestions.has(currentQ.number);
  const currentAnswer = userAnswers[currentQ.number];

  // ------------------- RESULTS SCREEN -------------------
  if (isSubmitted && !isReviewMode && resultSummary) {
    return (
      <div className={styles.container}>
        <Confetti show={showConfetti} />

        <div className={styles.resultsContainer}>
          <div className={styles.scoreBannerCard}>
            <span className={styles.accuracyIcon}>
            {(currentSection !== 'all' ? resultSummary.scaledRC >= 350 : resultSummary.totalScore >= 700) ? (
              <AwardIcon size={32} style={{ color: '#ff9800' }} />
            ) : (
              <TrendingUpIcon size={32} style={{ color: '#4caf50' }} />
            )}
          </span>
            <div className={styles.scoreBannerTitle}>
              {currentSection === 'rc'
                ? 'Báo cáo Kết quả Thi thử TOEIC Reading (75 Phút)'
                : currentSection === 'rc_sprint'
                ? 'Báo cáo Kết quả TOEIC RC Sprint (30 Phút)'
                : 'Báo cáo Kết quả Thi thử TOEIC'}
            </div>

            {currentSection !== 'all' ? (
              <>
                <div className={styles.rcHeroScoreBox}>
                  <span className={styles.totalScoreBadge}>{resultSummary.scaledRC}</span>
                  <span className={styles.totalScoreMax}>/ 495 RC</span>
                </div>
                <div className={styles.cefrBadge}>
                  Trình độ Reading ước tính: CEFR {getRcCefrLevel(resultSummary.scaledRC)}
                </div>
                <div className={styles.rcPillsSummary}>
                  <div className={styles.rcPillItem}>
                    <span>Số câu đúng:</span>
                    <strong>{resultSummary.rawRC} / {resultSummary.totalQuestions || 100}</strong>
                  </div>
                  <div className={styles.rcPillItem}>
                    <span>Độ chính xác:</span>
                    <strong>
                      {Math.round((resultSummary.rawRC / (resultSummary.totalQuestions || 100)) * 100)}%
                    </strong>
                  </div>
                  <div className={styles.rcPillItem}>
                    <span>Tốc độ TB:</span>
                    <strong>
                      {Math.round(resultSummary.durationSeconds / (resultSummary.totalQuestions || 100))}s / câu
                    </strong>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span className={styles.totalScoreBadge}>{resultSummary.totalScore}</span>
                  <span className={styles.totalScoreMax}>/ 990</span>
                </div>
                <div className={styles.cefrBadge}>Trình độ ước tính: CEFR {resultSummary.cefrLevel}</div>

                <div className={styles.sectionScoresRow}>
                  <div className={styles.sectionScoreBox}>
                    <span className={styles.sectionScoreVal}>{resultSummary.scaledLC}</span>
                    <span className={styles.sectionScoreLabel}>Listening ({resultSummary.rawLC}/100)</span>
                  </div>
                  <div className={styles.sectionScoreBox}>
                    <span className={styles.sectionScoreVal}>{resultSummary.scaledRC}</span>
                    <span className={styles.sectionScoreLabel}>Reading ({resultSummary.rawRC}/100)</span>
                  </div>
                </div>
              </>
            )}

            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
              Thời gian làm bài: {Math.floor(resultSummary.durationSeconds / 60)} phút{' '}
              {resultSummary.durationSeconds % 60} giây (Giới hạn: {Math.floor(totalExamTime / 60)} phút)
            </div>
          </div>

          {/* Diagnostic Card */}
          <div className={styles.diagnosisCard}>
            <div className={styles.diagnosisTitle}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <AlertCircleIcon size={16} />
                Chẩn đoán Điểm yếu Cần cải thiện
              </span>
            </div>
            <div className={styles.diagnosisText}>
              Phần bạn cần cải thiện nhiều nhất là <strong>{resultSummary.weakestPart.partName}</strong>{' '}
              với tỷ lệ chính xác chỉ <strong>{resultSummary.weakestPart.accuracy}%</strong>.
              <div className={styles.adviceBox}>
                <LightbulbIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px', color: '#ff9800' }} /> <em>Lời khuyên:</em> {resultSummary.weakestPart.advice}
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className={styles.breakdownCard}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Tỷ lệ chính xác từng Part</h3>
            <table className={styles.breakdownTable}>
              <thead>
                <tr>
                  <th>Phần thi</th>
                  <th>Số câu đúng</th>
                  <th>Tỷ lệ</th>
                  <th style={{ width: '35%' }}>Biểu đồ</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(resultSummary.partScores).map(([partKey, stat]) => {
                  const partLabels: Record<string, string> = {
                    p1: 'Part 1: Photographs',
                    p2: 'Part 2: Question-Response',
                    p3: 'Part 3: Conversations',
                    p4: 'Part 4: Short Talks',
                    p5: 'Part 5: Sentences',
                    p6: 'Part 6: Text Completion',
                    p7: 'Part 7: Reading',
                  };
                  return (
                    <tr key={partKey}>
                      <td><strong>{partLabels[partKey] || partKey}</strong></td>
                      <td>{stat.correct} / {stat.total}</td>
                      <td><strong>{stat.accuracy}%</strong></td>
                      <td>
                        <div className={styles.miniProgressBar}>
                          <div
                            className={styles.miniProgressFill}
                            style={{
                              width: `${stat.accuracy}%`,
                              background:
                                stat.accuracy >= 75
                                  ? 'var(--success)'
                                  : stat.accuracy >= 50
                                  ? 'var(--warning)'
                                  : 'var(--danger)',
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Comprehensive 3-Part Reading Pacing Analysis Card */}
          {comprehensivePacing ? (
            <div className={styles.pacingAnalysisCard}>
              <div className={styles.pacingAnalysisTitle}>
                <ClockIcon size={20} />
                <span>Phân tích Nhịp độ 3 Phần Reading (Part 5 - Part 6 - Part 7)</span>
              </div>
              <div className={styles.pacingGridThree} style={{ marginTop: '0.85rem' }}>
                {[comprehensivePacing.part5, comprehensivePacing.part6, comprehensivePacing.part7].map((pStat) => (
                  <div key={pStat.part} className={styles.pacingStatItem}>
                    <span className={styles.pacingStatLabel}>{pStat.partName}</span>
                    <span className={styles.pacingStatValue}>
                      {Math.floor(pStat.secondsSpent / 60)}p {pStat.secondsSpent % 60}s
                    </span>
                    <span className={styles.pacingStatSub}>
                      Tốc độ TB: <strong>{pStat.avgSecondsPerQ}s</strong> / câu
                    </span>
                    <span className={styles.pacingStatSub}>
                      Mục tiêu ETS: ≤ {pStat.targetSecondsPerQ}s / câu
                    </span>
                    <div
                      style={{
                        marginTop: '0.4rem',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color:
                          pStat.status === 'optimal'
                            ? 'var(--success)'
                            : pStat.status === 'moderate'
                            ? 'var(--warning)'
                            : 'var(--danger)',
                      }}
                    >
                      {pStat.statusText}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.pacingAdviceBox} style={{ marginTop: '1rem' }}>
                <ZapIcon size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                <span>{comprehensivePacing.advice}</span>
              </div>
            </div>
          ) : part7ExamPacing ? (
            <div className={styles.pacingAnalysisCard}>
              <div className={styles.pacingAnalysisTitle}>
                <ClockIcon size={20} />
                <span>Phân tích Nhịp độ & Thời gian Part 7</span>
              </div>
              <div className={styles.pacingStatRow}>
                <div className={styles.pacingStatItem}>
                  <span className={styles.pacingStatLabel}>Thời gian làm Part 7</span>
                  <span className={styles.pacingStatValue}>
                    {Math.floor(part7ExamPacing.secondsSpent / 60)}p {part7ExamPacing.secondsSpent % 60}s
                  </span>
                  <span className={styles.pacingStatSub}>Chuẩn ETS: ≤ 54 phút</span>
                </div>
                <div className={styles.pacingStatItem}>
                  <span className={styles.pacingStatLabel}>Tốc độ trung bình</span>
                  <span className={styles.pacingStatValue}>
                    {part7ExamPacing.avgSecondsPerQ}s / câu
                  </span>
                  <span className={styles.pacingStatSub}>Mục tiêu: ≤ 60s / câu</span>
                </div>
                <div className={styles.pacingStatItem}>
                  <span className={styles.pacingStatLabel}>Đánh giá nguy cơ</span>
                  <span
                    className={styles.pacingStatValue}
                    style={{
                      fontSize: '1rem',
                      color:
                        part7ExamPacing.status === 'optimal'
                          ? 'var(--success)'
                          : part7ExamPacing.status === 'moderate'
                          ? 'var(--warning)'
                          : 'var(--danger)',
                    }}
                  >
                    {part7ExamPacing.statusText}
                  </span>
                  <span className={styles.pacingStatSub}>
                    {part7ExamPacing.status === 'optimal' ? 'Thời gian tối ưu' : 'Cần điều chỉnh'}
                  </span>
                </div>
              </div>
              <div className={styles.pacingAdviceBox}>
                <ZapIcon size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                <span>{part7ExamPacing.advice}</span>
              </div>
            </div>
          ) : null}

          {/* Knowledge Gap Breakdown */}
          <KnowledgeGapBreakdown
            testType="exam"
            testId={testId}
            questions={questions.map((q) => ({
              id: q.id,
              number: q.number,
              part: q.part,
              subCategory: q.subCategory,
              grammarTag: q.grammarTag,
              userAnswer: userAnswers[q.number],
              correctAnswer: q.correctAnswer,
              isCorrect: userAnswers[q.number] === q.correctAnswer,
            }))}
          />

          <div className={styles.resultsActions}>
            <Link href="/study-plan" className={styles.primaryActionBtn || styles.secondaryBtn} style={{ background: 'var(--primary)', color: '#fff', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <ZapIcon size={16} /> Lộ trình đã tối ưu thích ứng
            </Link>
            <button className={styles.secondaryBtn} onClick={() => setIsReviewMode(true)}>
              <SearchIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Xem lại toàn bộ bài thi & Lời giải
            </button>
            <Link href="/notebook" className={styles.secondaryBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <NotebookIcon size={16} /> Sổ tay câu hỏi sai
            </Link>
            <Link href="/stats" className={styles.secondaryBtn}>
              <StatsIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Xem tiến độ trên Stats
            </Link>
            <Link href="/" className={styles.secondaryBtn}>
              <HomeIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Về Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ------------------- EXAM SIMULATION INTERFACE -------------------
  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <header className={styles.topBar}>
        <div className={styles.barLeft}>
          <Link href="/" className={styles.quitLink} onClick={(e) => {
            if (!isSubmitted && !window.confirm('Bạn có chắc chắn muốn rời phòng thi?')) {
              e.preventDefault();
            }
          }}>
            <CloseIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            Thoát
          </Link>
          <div className={styles.testTitle}>
            {testId === 'ets2022_test6' ? 'ETS 2022 - Test 6' : testId === 'ets2022_test5' ? 'ETS 2022 - Test 5' : testId === 'ets2022_test4' ? 'ETS 2022 - Test 4' : testId === 'ets2022_test3' ? 'ETS 2022 - Test 3' : testId === 'ets2022_test2' ? 'ETS 2022 - Test 2' : 'ETS 2022 - Test 1'}{' '}
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
              ({currentSection === 'rc'
                ? 'Đọc RC 75P'
                : currentSection === 'rc_sprint'
                ? 'RC Sprint 30P'
                : 'Full Test 120P'})
            </span>{' '}
            {isReviewMode && <span style={{ color: 'var(--primary)' }}>(Review Mode)</span>}
          </div>
        </div>

        {!isReviewMode ? (
          <div className={styles.timerGroup}>
            <ClockIcon size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
            <span
              className={`${styles.timerText} ${
                timeLeft < 300
                  ? styles.timerDanger
                  : timeLeft < 900
                  ? styles.timerWarning
                  : ''
              }`}
            >
              {formatTimer(timeLeft)}
            </span>
            <button
              type="button"
              className={styles.pauseBtn}
              onClick={() => setIsPaused((p) => !p)}
              title={isPaused ? 'Tiếp tục' : 'Tạm dừng'}
            >
              {isPaused ? 'Tiếp tục' : 'Tạm dừng'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              type="button"
              className={styles.secondaryBtn}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
              onClick={() => setShowOnlyWrong((p) => !p)}
            >
              {showOnlyWrong ? 'Hiện tất cả câu' : 'Chỉ xem câu sai'}
            </button>
            <button
              type="button"
              className={styles.primaryBtn}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
              onClick={() => setIsReviewMode(false)}
            >
              Bảng điểm <StatsIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
          </button>
          </div>
        )}

        <div className={styles.barRight}>
          <button 
            type="button" 
            className={styles.secondaryBtn} 
            style={{ padding: '0.35rem 0.6rem', marginRight: '0.5rem' }}
            onClick={toggleFocusMode}
            title={isFocusMode ? 'Thoát Focus Mode' : 'Bật Focus Mode'}
          >
            {isFocusMode ? <MinimizeIcon size={16} /> : <MaximizeIcon size={16} />}
          </button>

          {/* Auto-save Status Indicator */}
          {!isSubmitted && (
            <div
              className={styles.autoSaveBadge}
              title={autoSavedAt ? `Đã tự động lưu bài làm lúc ${new Date(autoSavedAt).toLocaleTimeString('vi-VN')}` : 'Tự động lưu bài làm thời gian thực'}
            >
              <ShieldCheckIcon size={14} style={{ color: 'var(--success)' }} />
              <span className={styles.autoSaveText}>Đã lưu tự động</span>
            </div>
          )}

          {/* Offline Status Badge */}
          {!isOnline && (
            <div className={styles.offlineBadge} title="Mất kết nối mạng Internet. Bài làm vẫn được lưu an toàn 100% trên thiết bị">
              <WifiOffIcon size={14} />
              <span>Ngoại tuyến</span>
            </div>
          )}

          <span className={styles.progressBadge}>
            Đã làm: <strong>{Object.keys(userAnswers).length}</strong> / {questions.length}
          </span>
          {!isSubmitted && (
            <button
              type="button"
              className={styles.submitExamBtn}
              onClick={() => {
                const count = Object.keys(userAnswers).length;
                if (
                  window.confirm(
                    `Bạn đã hoàn thành ${count}/${questions.length} câu. Bạn có chắc chắn muốn nộp bài thi ngay?`
                  )
                ) {
                  handleSubmitExam();
                }
              }}
            >
              Nộp bài <FlagIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
            </button>
          )}
        </div>
      </header>

      {/* Mode Selector Bar (shown during test or review) */}
      {!isSubmitted && (
        <div className={styles.sectionSelectorBar}>
          <div className={styles.sectionSelectorGroup}>
            <span className={styles.sectionSelectorLabel}>Chế độ thi:</span>
            <div className={styles.sectionPills}>
              <button
                type="button"
                className={`${styles.sectionPill} ${currentSection === 'all' ? styles.sectionPillActive : ''}`}
                onClick={() => handleSwitchSection('all')}
              >
                Full Test (120P / 200 câu)
              </button>
              <button
                type="button"
                className={`${styles.sectionPill} ${currentSection === 'rc' ? styles.sectionPillActive : ''}`}
                onClick={() => handleSwitchSection('rc')}
              >
                Chuyên sâu Reading (75P / 100 câu)
              </button>
              <button
                type="button"
                className={`${styles.sectionPill} ${currentSection === 'rc_sprint' ? styles.sectionPillActive : ''}`}
                onClick={() => handleSwitchSection('rc_sprint')}
              >
                RC Sprint (30P / 40 câu)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recovery Notification Banner */}
      {recoveryNotice && !isSubmitted && (
        <div className={styles.recoveryBanner}>
          <div className={styles.recoveryInfo}>
            <CheckCircleIcon size={18} style={{ color: 'var(--success)', flexShrink: 0 }} />
            <span>
              Đã tự động khôi phục bài làm dở dang: đã làm <strong>{recoveryNotice.answeredCount}/{recoveryNotice.totalCount}</strong> câu • Còn <strong>{formatTimer(recoveryNotice.timeLeft)}</strong>
            </span>
          </div>
          <div className={styles.recoveryActions}>
            <button
              type="button"
              className={styles.recoveryDismissBtn}
              onClick={() => setRecoveryNotice(null)}
            >
              Tiếp tục làm bài
            </button>
            <button
              type="button"
              className={styles.recoveryResetBtn}
              onClick={handleResetExam}
            >
              <RotateCcwIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              Làm lại từ đầu
            </button>
          </div>
        </div>
      )}

      {/* Offline Notice Bar (if loaded from cache) */}
      {isOfflineMode && !isSubmitted && (
        <div className={styles.offlineNoticeBar}>
          <WifiOffIcon size={16} style={{ flexShrink: 0 }} />
          <span>Bạn đang làm bài ở chế độ ngoại tuyến (dữ liệu đề thi nạp từ bộ nhớ đệm). Toàn bộ câu trả lời được bảo vệ an toàn 100%.</span>
        </div>
      )}

      {/* Main Exam Layout */}
      <main className={styles.examLayout}>

        {/* Question Area */}
        <section className={styles.questionArea}>
          <div className={styles.questionMeta}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className={styles.partBadge}>{currentQ.partTitle}</span>
              <strong style={{ fontSize: '1.1rem' }}>Câu #{currentQ.number}</strong>
            </div>

            <button
              type="button"
              className={`${styles.flagBtn} ${isCurrentFlagged ? styles.flagged : ''}`}
              onClick={() => toggleFlag(currentQ.number)}
            >
              <FlagIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px', fill: isCurrentFlagged ? 'currentColor' : 'none' }} /> {isCurrentFlagged ? 'Đã gắn cờ' : 'Đánh dấu xem lại'}
            </button>
          </div>

          {/* Context Banner */}
          {currentQ.context && (
            <div style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <MapPinIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> {currentQ.context}
            </div>
          )}

          {/* Audio Player for Listening */}
          {currentQ.audioUrl && (
            <ListeningAudioPlayer
              src={currentQ.audioUrl}
              title={`Audio Phần Nghe (Câu ${currentQ.number})`}
              autoPlay={false}
            />
          )}

          {/* Image for Part 1 or Graphics */}
          {currentQ.image && (
            <div className={styles.imageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentQ.image}
                alt={`TOEIC Exam Question ${currentQ.number}`}
                className={styles.questionImage}
              />
            </div>
          )}

          {/* Passage Text for Part 6/7 */}
          {currentQ.passageText && (
            <div
              className={styles.passageBox}
              dangerouslySetInnerHTML={{ __html: currentQ.passageText }}
            />
          )}

          {/* Question Text */}
          <div className={styles.questionTitle}>{currentQ.text}</div>

          {/* Options */}
          <div className={styles.optionsList}>
            {Object.keys(currentQ.options).map((letter) => {
              let stateClass = '';
              if (isReviewMode) {
                if (letter === currentQ.correctAnswer) stateClass = styles.correct;
                else if (letter === currentAnswer) stateClass = styles.incorrect;
              } else if (currentAnswer === letter) {
                stateClass = styles.selected;
              }

              return (
                <button
                  key={letter}
                  type="button"
                  className={`${styles.optionItem} ${stateClass}`}
                  onClick={() => handleSelectOption(letter)}
                >
                  <span className={styles.optionLetter}>{letter}</span>
                  <span>{currentQ.options[letter]}</span>
                </button>
              );
            })}
          </div>

          {/* Review Mode Explanations & Transcripts */}
          {isReviewMode && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--primary)' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>
                Đáp án đúng: ({currentQ.correctAnswer})
              </div>
              {currentQ.transcript && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Transcript:</strong>
                  <div dangerouslySetInnerHTML={{ __html: currentQ.transcript }} />
                </div>
              )}
              {currentQ.explanation && currentQ.explanation !== currentQ.transcript && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <strong>Giải thích:</strong>
                  <div dangerouslySetInnerHTML={{ __html: currentQ.explanation }} />
                </div>
              )}

              <button
                type="button"
                onClick={() => setTutorContext({
                  partTitle: currentQ.partTitle,
                  number: currentQ.number,
                  text: currentQ.text,
                  options: currentQ.options,
                  correctAnswer: currentQ.correctAnswer,
                  userAnswer: userAnswers[currentQ.number],
                  transcript: currentQ.transcript,
                  passageText: currentQ.passageText,
                  explanation: currentQ.explanation,
                  audioUrl: currentQ.audioUrl,
                  subCategory: currentQ.subCategory,
                  grammarTag: currentQ.grammarTag,
                })}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '0.45rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: '0.85rem',
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
                }}
              >
                <BotIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Hỏi Gia Sư AI 990 về câu này
              </button>
            </div>
          )}

          {/* Nav Bottom */}
          <div className={styles.navActionRow}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => navigateToQuestion(currentIndex - 1)}
              disabled={currentIndex === 0}
            >
              ← Câu trước
            </button>

            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {currentIndex + 1} / {questions.length}
            </span>

            <button
              type="button"
              className={`${styles.navBtn} ${styles.navBtnPrimary}`}
              onClick={() => navigateToQuestion(currentIndex + 1)}
              disabled={currentIndex === questions.length - 1}
            >
              Câu sau →
            </button>
          </div>
        </section>

        {/* Navigator Palette */}
        <aside className={styles.navigatorCard}>
          <div className={styles.navTabs}>
            {currentSection === 'all' ? (
              <>
                <button
                  type="button"
                  className={`${styles.navTabBtn} ${navTab === 'all' ? styles.activeTab : ''}`}
                  onClick={() => setNavTab('all')}
                >
                  Tất cả ({questions.length})
                </button>
                <button
                  type="button"
                  className={`${styles.navTabBtn} ${navTab === 'lc' ? styles.activeTab : ''}`}
                  onClick={() => setNavTab('lc')}
                >
                  Nghe (1-100)
                </button>
                <button
                  type="button"
                  className={`${styles.navTabBtn} ${navTab === 'rc' ? styles.activeTab : ''}`}
                  onClick={() => setNavTab('rc')}
                >
                  Đọc (101-200)
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={`${styles.navTabBtn} ${navTab === 'all' ? styles.activeTab : ''}`}
                  onClick={() => setNavTab('all')}
                >
                  Tất cả ({questions.length})
                </button>
                <button
                  type="button"
                  className={`${styles.navTabBtn} ${navTab === 'p5' ? styles.activeTab : ''}`}
                  onClick={() => setNavTab('p5')}
                >
                  Part 5 ({questions.filter((q) => q.part === 'p5').length})
                </button>
                <button
                  type="button"
                  className={`${styles.navTabBtn} ${navTab === 'p6' ? styles.activeTab : ''}`}
                  onClick={() => setNavTab('p6')}
                >
                  Part 6 ({questions.filter((q) => q.part === 'p6').length})
                </button>
                <button
                  type="button"
                  className={`${styles.navTabBtn} ${navTab === 'p7' ? styles.activeTab : ''}`}
                  onClick={() => setNavTab('p7')}
                >
                  Part 7 ({questions.filter((q) => q.part === 'p7').length})
                </button>
              </>
            )}
          </div>

          <div className={styles.legendRow}>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: 'var(--primary)' }}></span>
              <span>Đã làm</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: 'var(--border)' }}></span>
              <span>Chưa làm</span>
            </div>
            <div className={styles.legendItem}>
              <FlagIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              <span>Cờ</span>
            </div>
          </div>

          <div className={styles.questionsGrid}>
            {filteredQuestions.map((q) => {
              const isAnswered = !!userAnswers[q.number];
              const isFlagged = flaggedQuestions.has(q.number);
              const isCurrent = questions[currentIndex]?.number === q.number;

              let classes = styles.paletteBtn;
              if (isAnswered) classes += ` ${styles.answered}`;
              if (isCurrent) classes += ` ${styles.current}`;
              if (isFlagged) classes += ` ${styles.flagged}`;

              return (
                <button
                  key={q.number}
                  type="button"
                  className={classes}
                  onClick={() => {
                    const foundIndex = questions.findIndex((item) => item.number === q.number);
                    if (foundIndex !== -1) navigateToQuestion(foundIndex);
                  }}
                >
                  {q.number}
                </button>
              );
            })}
          </div>
        </aside>
      </main>

      {tutorContext && (
        <AITutorDrawer
          isOpen={!!tutorContext}
          onClose={() => setTutorContext(null)}
          questionContext={tutorContext}
        />
      )}

      {/* Expired Draft Recovery Modal */}
      {expiredDraftData && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <AlertCircleIcon size={24} style={{ color: 'var(--warning)', flexShrink: 0 }} />
              <h3>Khôi Phục Bài Thi Dở Dang</h3>
            </div>
            <p className={styles.modalText}>
              Hệ thống phát hiện bài thi trước đó của bạn ({Object.keys(expiredDraftData.userAnswers || {}).length}/{expiredDraftData.totalQuestions} câu đã làm), nhưng thời gian thi 120 phút đã kết thúc trong lúc bạn rời phòng thi.
            </p>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.recoveryDismissBtn}
                style={{ padding: '0.65rem 1rem', borderRadius: '8px', fontWeight: 600 }}
                onClick={() => {
                  setUserAnswers(expiredDraftData.userAnswers || {});
                  setFlaggedQuestions(new Set(expiredDraftData.flaggedQuestions || []));
                  setCurrentIndex(expiredDraftData.currentIndex || 0);
                  setTimeLeft(30 * 60); // Gia hạn 30 phút
                  part5SecondsRef.current = expiredDraftData.part5Seconds || 0;
                  part6SecondsRef.current = expiredDraftData.part6Seconds || 0;
                  part7SecondsRef.current = expiredDraftData.part7Seconds || 0;
                  setExpiredDraftData(null);
                }}
              >
                Gia hạn thêm 30 phút & Tiếp tục
              </button>
              <button
                type="button"
                className={styles.secondaryBtn}
                style={{ padding: '0.6rem 1rem', borderRadius: '8px' }}
                onClick={() => {
                  setUserAnswers(expiredDraftData.userAnswers || {});
                  setFlaggedQuestions(new Set(expiredDraftData.flaggedQuestions || []));
                  setExpiredDraftData(null);
                  setTimeout(() => handleSubmitExam(), 50);
                }}
              >
                Nộp bài tính điểm ngay
              </button>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={handleResetExam}
              >
                <RotateCcwIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                Làm lại từ đầu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
