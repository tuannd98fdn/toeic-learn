'use client';

import { useState, useEffect, useRef, useMemo, Suspense, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Confetti from '@/components/Confetti';
import {
  ClockIcon,
  FlagIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  RotateCcwIcon,
  CheckCircleIcon,
  TargetIcon,
  AlertCircleIcon,
  BotIcon,
  FilterIcon,
  ZapIcon,
  AwardIcon,
  TrophyIcon,
  ThumbsUpIcon,
  HeadphonesIcon,
  ReadingIcon,
  NotebookIcon,
  HomeIcon,
  SearchIcon,
  SparklesIcon,
  StatsIcon,
} from '@/components/icons/AppIcons';
import ListeningAudioPlayer from '@/components/ListeningAudioPlayer';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { storage } from '@/utils/storage';
import { syncAdaptivePlan } from '@/utils/studyPlanEngine';
import { calculateScaledScore, getCefrLevel } from '@/utils/toeicScoreCalculator';
import KnowledgeGapBreakdown from '@/components/KnowledgeGapBreakdown';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import styles from './page.module.css';

export interface UnifiedQuestion {
  id: string;
  number: number; // 1 to 25
  originalNumber: number; // ETS question number
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
  questionType?: string;
  testId: string;
}

export interface MiniTestResult {
  date: string;
  testId: string;
  testName: string;
  totalScore: number;
  scaledLC: number;
  scaledRC: number;
  cefrLevel: string;
  correctLC: number;
  correctRC: number;
  totalQuestions: number;
  totalCorrect: number;
  durationSeconds: number;
  partScores: Record<string, { total: number; correct: number; accuracy: number }>;
}

const TOTAL_TIME = 20 * 60; // 20 minutes in seconds

const AVAILABLE_TESTS = [
  { id: 'ets2022_test1', name: 'ETS 2022 - Test 1', year: 2022, desc: 'Đề thi chuẩn ETS mới nhất, độ khó cân bằng' },
  { id: 'ets2022_test2', name: 'ETS 2022 - Test 2', year: 2022, desc: 'Tập trung bẫy đồng âm Part 2 & suy luận Part 7' },
  { id: 'ets2022_test3', name: 'ETS 2022 - Test 3', year: 2022, desc: 'Tăng cường từ vựng thương mại & hội thoại công sở' },
  { id: 'ets2022_test4', name: 'ETS 2022 - Test 4', year: 2022, desc: 'Nhiều bẫy liên từ Part 5 & đoạn văn đa văn bản Part 7' },
  { id: 'ets2022_test5', name: 'ETS 2022 - Test 5', year: 2022, desc: 'Thử thách nhịp độ đọc hiểu nhanh và bài nói ngắn' },
  { id: 'ets2022_test6', name: 'ETS 2022 - Test 6', year: 2022, desc: 'Bộ đề thi thật hoàn chỉnh với âm thanh phòng thu YBM' },
  { id: 'cross_random', name: 'Đề Trộn Ngẫu Nhiên Liên Đề', year: 2022, desc: 'Trích xuất ngẫu nhiên 7 parts từ cả 6 bộ đề ETS 2022' },
];

export default function MiniTestPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang khởi tạo phòng thi Mini Test...</div>}>
      <MiniTestMain />
    </Suspense>
  );
}

function MiniTestMain() {
  const searchParams = useSearchParams();
  const rawTestParam = searchParams.get('test');
  const autoStartParam = searchParams.get('autostart') === 'true';

  // Mode: 'setup' | 'testing' | 'result'
  const [testStage, setTestStage] = useState<'setup' | 'testing' | 'result'>('setup');
  const [selectedTestId, setSelectedTestId] = useState<string>(rawTestParam || 'ets2022_test1');
  const [activeTestName, setActiveTestName] = useState<string>('ETS 2022 - Test 1');

  // Exam Questions & State
  const [questions, setQuestions] = useState<UnifiedQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Progress
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  // Timer
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Result & Review
  const [result, setResult] = useState<MiniTestResult | null>(null);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'lc' | 'rc' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7'>('all');
  const [showConfetti, setShowConfetti] = useState(false);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);

  // Filter tab in simulation
  const [navTab, setNavTab] = useState<'all' | 'lc' | 'rc' | 'flagged'>('all');

  const { addMistake } = useMistakeNotebook();

  // Load previous result if available
  const [previousResult, setPreviousResult] = useState<MiniTestResult | null>(null);

  useEffect(() => {
    const saved = storage.get<MiniTestResult | null>('toeic_minitest_result', null);
    if (saved) {
      setPreviousResult(saved);
    }
  }, []);

  // Helper shuffle
  const shuffle = useCallback(<T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  }, []);

  // Load Standardized 25 Questions (7 Parts)
  const loadMiniTestQuestions = useCallback(async (testId: string) => {
    setLoading(true);
    setError(null);

    try {
      const isRandom = testId === 'cross_random';
      const getRandomTestFolder = () => `/data/ets2022/test${Math.floor(Math.random() * 6) + 1}`;

      const getTestFolder = (targetId: string) => {
        const match = targetId.match(/ets(\d+)_test(\d+)/);
        return match ? `/data/ets${match[1]}/test${match[2]}` : `/data/ets2022/test1`;
      };

      const folderP1 = isRandom ? getRandomTestFolder() : getTestFolder(testId);
      const folderP2 = isRandom ? getRandomTestFolder() : getTestFolder(testId);
      const folderP3 = isRandom ? getRandomTestFolder() : getTestFolder(testId);
      const folderP4 = isRandom ? getRandomTestFolder() : getTestFolder(testId);
      const folderP5 = isRandom ? getRandomTestFolder() : getTestFolder(testId);
      const folderP6 = isRandom ? getRandomTestFolder() : getTestFolder(testId);
      const folderP7 = isRandom ? getRandomTestFolder() : getTestFolder(testId);

      const [res1, res2, res3, res4, res5, res6, res7] = await Promise.all([
        fetch(`${folderP1}/part1.json`),
        fetch(`${folderP2}/part2.json`),
        fetch(`${folderP3}/part3.json`),
        fetch(`${folderP4}/part4.json`),
        fetch(`${folderP5}/part5.json`),
        fetch(`${folderP6}/part6.json`),
        fetch(`${folderP7}/part7.json`),
      ]);

      if (!res1.ok || !res2.ok || !res3.ok || !res4.ok || !res5.ok || !res6.ok || !res7.ok) {
        throw new Error('Không thể tải dữ liệu câu hỏi từ kho đề thi.');
      }

      const [p1, p2, p3, p4, p5, p6, p7] = await Promise.all([
        res1.json(),
        res2.json(),
        res3.json(),
        res4.json(),
        res5.json(),
        res6.json(),
        res7.json(),
      ]);

      const curatedQuestions: UnifiedQuestion[] = [];
      let questionIndex = 1;

      // 1. Part 1: 2 questions
      const selectedP1 = shuffle(p1).slice(0, 2);
      selectedP1.forEach((q: any) => {
        curatedQuestions.push({
          id: q.id,
          number: questionIndex++,
          originalNumber: q.number,
          part: 'p1',
          partTitle: 'Part 1: Photographs (Mô tả tranh)',
          text: q.text || 'Look at the photograph and choose the statement that best describes what you see.',
          image: q.image,
          audioUrl: q.audioUrl,
          options: q.options,
          correctAnswer: q.correctAnswer,
          transcript: q.transcript,
          explanation: q.explanation,
          subCategory: q.subCategory || 'Photographs',
          testId: isRandom ? 'cross_random' : testId,
        });
      });

      // 2. Part 2: 4 questions
      const selectedP2 = shuffle(p2).slice(0, 4);
      selectedP2.forEach((q: any) => {
        curatedQuestions.push({
          id: q.id,
          number: questionIndex++,
          originalNumber: q.number,
          part: 'p2',
          partTitle: 'Part 2: Question-Response (Hỏi - Đáp)',
          text: q.text || 'Listen to the question or statement and choose the best response.',
          audioUrl: q.audioUrl,
          options: q.options,
          correctAnswer: q.correctAnswer,
          transcript: q.transcript,
          explanation: q.explanation,
          subCategory: q.subCategory || 'Question-Response',
          testId: isRandom ? 'cross_random' : testId,
        });
      });

      // 3. Part 3: 1 conversation set (3 questions)
      const p3Sets = p3.filter((s: any) => s.questions && s.questions.length === 3);
      const chosenP3Set = p3Sets.length > 0 ? shuffle(p3Sets)[0] : p3[0];
      if (chosenP3Set && chosenP3Set.questions) {
        chosenP3Set.questions.forEach((q: any) => {
          curatedQuestions.push({
            id: q.id,
            number: questionIndex++,
            originalNumber: q.number,
            part: 'p3',
            partTitle: 'Part 3: Short Conversations (Hội thoại ngắn)',
            text: q.text,
            image: chosenP3Set.image,
            audioUrl: chosenP3Set.audioUrl,
            context: 'Questions refer to the following conversation.',
            options: q.options,
            correctAnswer: q.correctAnswer,
            transcript: chosenP3Set.transcript,
            explanation: q.explanation,
            questionType: q.questionType || q.subCategory,
            subCategory: q.subCategory || 'Conversations',
            testId: isRandom ? 'cross_random' : testId,
          });
        });
      }

      // 4. Part 4: 1 short talk set (3 questions)
      const p4Sets = p4.filter((s: any) => s.questions && s.questions.length === 3);
      const chosenP4Set = p4Sets.length > 0 ? shuffle(p4Sets)[0] : p4[0];
      if (chosenP4Set && chosenP4Set.questions) {
        chosenP4Set.questions.forEach((q: any) => {
          curatedQuestions.push({
            id: q.id,
            number: questionIndex++,
            originalNumber: q.number,
            part: 'p4',
            partTitle: 'Part 4: Short Talks (Bài nói chuyện ngắn)',
            text: q.text,
            image: chosenP4Set.image,
            audioUrl: chosenP4Set.audioUrl,
            context: 'Questions refer to the following talk.',
            options: q.options,
            correctAnswer: q.correctAnswer,
            transcript: chosenP4Set.transcript,
            explanation: q.explanation,
            questionType: q.questionType || q.subCategory,
            subCategory: q.subCategory || 'Short Talks',
            testId: isRandom ? 'cross_random' : testId,
          });
        });
      }

      // 5. Part 5: 5 questions
      const selectedP5 = shuffle(p5).slice(0, 5);
      selectedP5.forEach((q: any) => {
        curatedQuestions.push({
          id: q.id,
          number: questionIndex++,
          originalNumber: q.number,
          part: 'p5',
          partTitle: 'Part 5: Incomplete Sentences (Điền câu)',
          text: q.text,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          subCategory: q.subCategory || q.type,
          grammarTag: q.grammarTag,
          testId: isRandom ? 'cross_random' : testId,
        });
      });

      // 6. Part 6: 1 passage set (4 questions)
      const p6Sets = p6.filter((s: any) => s.questions && s.questions.length === 4);
      const chosenP6Set = p6Sets.length > 0 ? shuffle(p6Sets)[0] : p6[0];
      if (chosenP6Set && chosenP6Set.questions) {
        chosenP6Set.questions.forEach((q: any) => {
          curatedQuestions.push({
            id: q.id,
            number: questionIndex++,
            originalNumber: q.number,
            part: 'p6',
            partTitle: 'Part 6: Text Completion (Điền đoạn văn)',
            text: q.text || `Question ${q.number}`,
            passageText: chosenP6Set.content,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            subCategory: q.subCategory || 'Contextual Completion',
            grammarTag: q.grammarTag,
            testId: isRandom ? 'cross_random' : testId,
          });
        });
      }

      // 7. Part 7: 1 passage set (4 questions or 3-4 questions)
      const p7SetsWith4 = p7.filter((s: any) => s.questions && s.questions.length === 4);
      const chosenP7Set = p7SetsWith4.length > 0 ? shuffle(p7SetsWith4)[0] : p7[0];

      if (chosenP7Set && chosenP7Set.questions) {
        const combinedPassage = (chosenP7Set.passages || [])
          .map((p: any) => p.content)
          .join('\n\n--- Đoạn Văn Tiếp Theo ---\n\n') || chosenP7Set.content || '';

        const targetP7Qs = chosenP7Set.questions.slice(0, 4);
        targetP7Qs.forEach((q: any) => {
          curatedQuestions.push({
            id: q.id,
            number: questionIndex++,
            originalNumber: q.number,
            part: 'p7',
            partTitle: 'Part 7: Reading Comprehension (Đọc hiểu)',
            text: q.text,
            passageText: combinedPassage,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            questionType: q.questionType || q.subCategory,
            subCategory: q.questionType || q.subCategory || 'Reading Comprehension',
            testId: isRandom ? 'cross_random' : testId,
          });
        });
      }

      setQuestions(curatedQuestions);
      const testObj = AVAILABLE_TESTS.find((t) => t.id === testId);
      setActiveTestName(testObj ? testObj.name : 'ETS 2022 - Test 1');

      // Reset test state
      setCurrentIndex(0);
      setUserAnswers({});
      setFlaggedQuestions(new Set());
      setTimeLeft(TOTAL_TIME);
      setIsReviewMode(false);
      setTestStage('testing');
    } catch (err: any) {
      console.error('Error loading 7-part mini test:', err);
      setError(err.message || 'Không thể tạo bài Mini Test. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, [shuffle]);

  // Handle auto-start if param provided
  useEffect(() => {
    if (autoStartParam && rawTestParam) {
      loadMiniTestQuestions(rawTestParam);
    }
  }, [autoStartParam, rawTestParam, loadMiniTestQuestions]);

  // Timer countdown
  useEffect(() => {
    if (testStage !== 'testing' || isPaused || loading) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testStage, isPaused, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard navigation shortcuts: A/B/C/D, ArrowLeft/ArrowRight, F
  useEffect(() => {
    if (testStage !== 'testing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      const key = e.key.toUpperCase();
      const currentQ = questions[currentIndex];
      if (!currentQ) return;

      if (['A', 'B', 'C', 'D'].includes(key)) {
        if (currentQ.options[key]) {
          setUserAnswers((prev) => ({ ...prev, [currentQ.number]: key }));
        }
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
      } else if (key === 'F') {
        toggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [testStage, currentIndex, questions]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSelectOption = (letter: string) => {
    if (testStage === 'result' && !isReviewMode) return;
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.number]: letter,
    }));
  };

  const toggleFlag = () => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    const num = currentQ.number;
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  // Submit and compute estimated TOEIC score
  const handleSubmitExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    let correctLC = 0;
    let correctRC = 0;
    const partStats: Record<string, { total: number; correct: number; accuracy: number }> = {
      p1: { total: 0, correct: 0, accuracy: 0 },
      p2: { total: 0, correct: 0, accuracy: 0 },
      p3: { total: 0, correct: 0, accuracy: 0 },
      p4: { total: 0, correct: 0, accuracy: 0 },
      p5: { total: 0, correct: 0, accuracy: 0 },
      p6: { total: 0, correct: 0, accuracy: 0 },
      p7: { total: 0, correct: 0, accuracy: 0 },
    };

    questions.forEach((q) => {
      const userAns = userAnswers[q.number];
      const isCorrect = userAns && userAns.toUpperCase() === q.correctAnswer.toUpperCase();

      if (partStats[q.part]) {
        partStats[q.part].total++;
        if (isCorrect) partStats[q.part].correct++;
      }

      if (['p1', 'p2', 'p3', 'p4'].includes(q.part)) {
        if (isCorrect) correctLC++;
      } else {
        if (isCorrect) correctRC++;
      }

      // Record mistake in notebook
      if (!isCorrect) {
        const fullPartName =
          q.part === 'p1' ? 'part1' :
          q.part === 'p2' ? 'part2' :
          q.part === 'p3' ? 'part3' :
          q.part === 'p4' ? 'part4' :
          q.part === 'p5' ? 'part5' :
          q.part === 'p6' ? 'part6' : 'part7';

        addMistake(`minitest_${q.testId}_${q.part}_${q.id}`, {
          type: 'exam',
          testId: q.testId,
          part: fullPartName,
          questionId: q.id,
          subCategory: q.subCategory,
          grammarTag: q.grammarTag,
        });
      }
    });

    // Compute accuracy for each part
    Object.keys(partStats).forEach((pKey) => {
      const p = partStats[pKey];
      p.accuracy = p.total > 0 ? Math.round((p.correct / p.total) * 100) : 0;
    });

    const totalLC = questions.filter((q) => ['p1', 'p2', 'p3', 'p4'].includes(q.part)).length || 12;
    const totalRC = questions.filter((q) => ['p5', 'p6', 'p7'].includes(q.part)).length || 13;

    // Scale to 0-100 raw questions
    const rawLC = Math.round((correctLC / totalLC) * 100);
    const rawRC = Math.round((correctRC / totalRC) * 100);

    const { scaledLC, scaledRC, totalScore } = calculateScaledScore(rawLC, rawRC);
    const cefrLevel = getCefrLevel(totalScore);

    const durationSeconds = TOTAL_TIME - timeLeft;
    const totalCorrect = correctLC + correctRC;

    const newResult: MiniTestResult = {
      date: new Date().toISOString(),
      testId: selectedTestId,
      testName: activeTestName,
      totalScore,
      scaledLC,
      scaledRC,
      cefrLevel,
      correctLC,
      correctRC,
      totalQuestions: questions.length,
      totalCorrect,
      durationSeconds,
      partScores: partStats,
    };

    setResult(newResult);
    setPreviousResult(newResult);
    storage.set('toeic_minitest_result', newResult);
    storage.set('toeic_minitest_answers', userAnswers);

    // Track study streak
    const today = new Date().toISOString().split('T')[0];
    const studiedDays = storage.get<string[]>('toeic_study_days', []);
    if (!studiedDays.includes(today)) {
      storage.set('toeic_study_days', [...studiedDays, today]);
    }

    // Synchronize adaptive study plan
    syncAdaptivePlan();

    if (totalCorrect >= questions.length * 0.7) {
      setShowConfetti(true);
    }

    setTestStage('result');
  };

  // -------------------------------------------------------------
  // VIEW 1: PRE-TEST SETUP SCREEN (Chọn Đề & Tổng Quan 7 Parts)
  // -------------------------------------------------------------
  if (testStage === 'setup') {
    return (
      <div className={styles.container}>
        <div className={styles.setupCard}>
          <div className={styles.setupHeader}>
            <div className={styles.setupBadge}>
              <SparklesIcon size={16} />
              <span>MINI TEST CHUẨN HÓA 7 PARTS</span>
            </div>
            <h1 className={styles.setupTitle}>Đánh Giá Năng Lực TOEIC Toàn Diện 20 Phút</h1>
            <p className={styles.setupSubtitle}>
              Mô phỏng chuẩn hóa đầy đủ 7 phần thi (LC &amp; RC), rèn luyện tốc độ làm bài thực chiến và dự đoán điểm TOEIC 10 - 990 chính xác theo chuẩn ETS.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className={styles.setupMetricsRow}>
            <div className={styles.metricItem}>
              <span className={styles.metricVal}>25</span>
              <span className={styles.metricLabel}>Câu hỏi Chuẩn ETS</span>
            </div>
            <div className={styles.metricDivider} />
            <div className={styles.metricItem}>
              <span className={styles.metricVal}>7/7</span>
              <span className={styles.metricLabel}>Đủ Parts (LC &amp; RC)</span>
            </div>
            <div className={styles.metricDivider} />
            <div className={styles.metricItem}>
              <span className={styles.metricVal}>20:00</span>
              <span className={styles.metricLabel}>Thời Gian Đếm Ngược</span>
            </div>
            <div className={styles.metricDivider} />
            <div className={styles.metricItem}>
              <span className={styles.metricVal}>10 - 990</span>
              <span className={styles.metricLabel}>Dự Đoán Điểm Số</span>
            </div>
          </div>

          {/* Previous Result Summary Banner if exists */}
          {previousResult && (
            <div className={styles.previousResultBanner}>
              <div className={styles.prevResultLeft}>
                <TrophyIcon size={24} style={{ color: '#f59e0b' }} />
                <div>
                  <div className={styles.prevResultTitle}>
                    Kết Quả Mini Test Gần Nhất: <strong>{previousResult.totalScore} / 990</strong> ({previousResult.cefrLevel})
                  </div>
                  <div className={styles.prevResultMeta}>
                    Đề: {previousResult.testName} • LC: {previousResult.scaledLC} | RC: {previousResult.scaledRC} ({previousResult.totalCorrect}/{previousResult.totalQuestions} đúng)
                  </div>
                </div>
              </div>
              <button
                type="button"
                className={styles.prevReviewBtn}
                onClick={() => {
                  setResult(previousResult);
                  setTestStage('result');
                }}
              >
                <SearchIcon size={14} />
                <span>Xem lại kết quả</span>
              </button>
            </div>
          )}

          {/* 7 Parts Structure Overview */}
          <div className={styles.partsOverviewSection}>
            <div className={styles.sectionHeading}>
              <TargetIcon size={18} style={{ color: 'var(--primary)' }} />
              <span>Cơ Cấu Bộ Đề 25 Câu Chuẩn Tỷ Lệ ETS</span>
            </div>
            <div className={styles.partsPillsGrid}>
              <div className={styles.partPill}>
                <span className={styles.partPillName}>Part 1: Tranh</span>
                <span className={styles.partPillCount}>2 câu</span>
              </div>
              <div className={styles.partPill}>
                <span className={styles.partPillName}>Part 2: Hỏi - Đáp</span>
                <span className={styles.partPillCount}>4 câu</span>
              </div>
              <div className={styles.partPill}>
                <span className={styles.partPillName}>Part 3: Hội thoại</span>
                <span className={styles.partPillCount}>3 câu (1 set)</span>
              </div>
              <div className={styles.partPill}>
                <span className={styles.partPillName}>Part 4: Bài nói</span>
                <span className={styles.partPillCount}>3 câu (1 set)</span>
              </div>
              <div className={styles.partPill}>
                <span className={styles.partPillName}>Part 5: Điền câu</span>
                <span className={styles.partPillCount}>5 câu</span>
              </div>
              <div className={styles.partPill}>
                <span className={styles.partPillName}>Part 6: Đoạn văn</span>
                <span className={styles.partPillCount}>4 câu (1 bài)</span>
              </div>
              <div className={styles.partPill}>
                <span className={styles.partPillName}>Part 7: Đọc hiểu</span>
                <span className={styles.partPillCount}>4 câu (1 bài)</span>
              </div>
            </div>
          </div>

          {/* Test Selector Grid */}
          <div className={styles.testSelectorSection}>
            <div className={styles.sectionHeading}>
              <FilterIcon size={18} style={{ color: 'var(--primary)' }} />
              <span>Chọn Đề Thi Thực Chiến</span>
            </div>
            <div className={styles.testCardGrid}>
              {AVAILABLE_TESTS.map((t) => {
                const isSelected = selectedTestId === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={`${styles.testSelectCard} ${isSelected ? styles.testSelectCardActive : ''}`}
                    onClick={() => {
                      setSelectedTestId(t.id);
                      setActiveTestName(t.name);
                    }}
                  >
                    <div className={styles.testCardTop}>
                      <span className={styles.testYearBadge}>{t.id === 'cross_random' ? 'Liên Đề' : t.year}</span>
                      {isSelected && <span className={styles.selectedBadge}><CheckCircleIcon size={14} /> Đang chọn</span>}
                    </div>
                    <div className={styles.testCardTitle}>{t.name}</div>
                    <div className={styles.testCardDesc}>{t.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className={styles.errorAlert}>
              <AlertCircleIcon size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* Action Row */}
          <div className={styles.setupActionRow}>
            <Link href="/" className={styles.secondaryBtn}>
              <HomeIcon size={16} />
              <span>Về Dashboard</span>
            </Link>
            <button
              type="button"
              className={styles.startExamBtn}
              onClick={() => loadMiniTestQuestions(selectedTestId)}
              disabled={loading}
            >
              <ZapIcon size={18} />
              <span>{loading ? 'Đang chuẩn bị 25 câu hỏi...' : `Bắt Đầu Mini Test (${activeTestName})`}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: RESULTS SCREEN (Bảng Điểm Ước Lượng & Phân Tích 9.5)
  // -------------------------------------------------------------
  if (testStage === 'result' && result && !isReviewMode) {
    const accuracy = Math.round((result.totalCorrect / result.totalQuestions) * 100);
    const scoreRangeMin = Math.max(10, Math.floor((result.totalScore - 30) / 10) * 10);
    const scoreRangeMax = Math.min(990, Math.ceil((result.totalScore + 30) / 10) * 10);

    const partNames: Record<string, string> = {
      p1: 'Part 1: Photographs (Hình ảnh)',
      p2: 'Part 2: Question-Response (Hỏi - Đáp)',
      p3: 'Part 3: Short Conversations (Hội thoại ngắn)',
      p4: 'Part 4: Short Talks (Bài nói ngắn)',
      p5: 'Part 5: Incomplete Sentences (Điền câu)',
      p6: 'Part 6: Text Completion (Điền đoạn văn)',
      p7: 'Part 7: Reading Comprehension (Đọc hiểu)',
    };

    return (
      <div className={styles.container}>
        <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

        <div className={styles.resultsContainer}>
          {/* Main Estimated Score Certificate Card */}
          <div className={styles.scoreBannerCard}>
            <div className={styles.scoreTopIconWrapper}>
              {accuracy >= 80 ? (
                <TrophyIcon size={36} style={{ color: '#f59e0b' }} />
              ) : accuracy >= 60 ? (
                <AwardIcon size={36} style={{ color: '#2563eb' }} />
              ) : (
                <TargetIcon size={36} style={{ color: '#10b981' }} />
              )}
            </div>

            <div className={styles.scoreBannerTitle}>Kết Quả Đánh Giá Năng Lực Mini Test</div>
            <div className={styles.scoreBannerSubtitle}>
              Bộ đề: <strong>{result.testName}</strong> • Thời gian làm bài: {Math.floor(result.durationSeconds / 60)} phút {result.durationSeconds % 60} giây
            </div>

            <div className={styles.scorePrimaryDisplay}>
              <div className={styles.scorePrimaryVal}>{result.totalScore}</div>
              <div className={styles.scorePrimaryMax}>/ 990</div>
            </div>

            <div className={styles.scoreRangeText}>
              Dải điểm ước lượng ETS: <strong>{scoreRangeMin} – {scoreRangeMax}</strong> điểm (Độ chính xác: {accuracy}%)
            </div>

            <div className={styles.cefrBadgePill}>
              <span>Trình độ tương đương:</span>
              <strong style={{ color: 'var(--primary)' }}>CEFR {result.cefrLevel}</strong>
            </div>

            {/* Scaled LC vs RC Breakdown */}
            <div className={styles.sectionScoresRow}>
              <div className={styles.sectionScoreBox}>
                <div className={styles.sectionScoreHead}>
                  <HeadphonesIcon size={18} style={{ color: '#2563eb' }} />
                  <span>LISTENING COMPREHENSION</span>
                </div>
                <div className={styles.sectionScoreVal}>{result.scaledLC}</div>
                <div className={styles.sectionScoreMeta}>
                  {result.correctLC}/12 câu đúng ({Math.round((result.correctLC / 12) * 100)}%)
                </div>
              </div>

              <div className={styles.sectionScoreBox}>
                <div className={styles.sectionScoreHead}>
                  <ReadingIcon size={18} style={{ color: '#059669' }} />
                  <span>READING COMPREHENSION</span>
                </div>
                <div className={styles.sectionScoreVal}>{result.scaledRC}</div>
                <div className={styles.sectionScoreMeta}>
                  {result.correctRC}/13 câu đúng ({Math.round((result.correctRC / 13) * 100)}%)
                </div>
              </div>
            </div>
          </div>

          {/* 7-Part Accuracy Breakdown Matrix */}
          <div className={styles.partMasteryCard}>
            <div className={styles.partMasteryHeader}>
              <div className={styles.partMasteryTitle}>
                <StatsIcon size={18} style={{ color: 'var(--primary)' }} />
                <span>Bản Đồ Năng Lực 7 Phần Thi TOEIC</span>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Đánh giá theo tỷ lệ chính xác từng Part
              </span>
            </div>

            <div className={styles.partMasteryList}>
              {Object.entries(result.partScores).map(([pKey, pScore]) => {
                const partTitle = partNames[pKey] || pKey;
                const status =
                  pScore.accuracy >= 75 ? 'good' :
                  pScore.accuracy >= 50 ? 'warning' : 'critical';

                const statusLabel =
                  status === 'good' ? 'Thành thạo' :
                  status === 'warning' ? 'Cần củng cố' : 'Lỗ hổng lớn';

                const targetLink = `/${pKey.replace('p', 'part')}`;

                return (
                  <div key={pKey} className={styles.partMasteryRow}>
                    <div className={styles.partMasteryMeta}>
                      <span className={styles.partMasteryName}>{partTitle}</span>
                      <span className={`${styles.partStatusBadge} ${styles[status]}`}>
                        {statusLabel}
                      </span>
                    </div>

                    <div className={styles.partProgressTrack}>
                      <div
                        className={`${styles.partProgressFill} ${styles[status]}`}
                        style={{ width: `${pScore.accuracy}%` }}
                      />
                    </div>

                    <div className={styles.partMasteryRight}>
                      <span className={styles.partMasteryRatio}>
                        {pScore.correct}/{pScore.total} câu ({pScore.accuracy}%)
                      </span>
                      <Link href={targetLink} className={styles.partDrillLink}>
                        Luyện Part {pKey.replace('p', '')} <ArrowRightIcon size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Knowledge Gap Breakdown */}
          <KnowledgeGapBreakdown
            testType="mini-test"
            testId={result.testId}
            questions={questions.map((q) => ({
              id: q.id,
              number: q.number,
              part: q.part,
              subCategory: q.subCategory,
              grammarTag: q.grammarTag,
              userAnswer: userAnswers[q.number],
              correctAnswer: q.correctAnswer,
              isCorrect: userAnswers[q.number]?.toUpperCase() === q.correctAnswer.toUpperCase(),
            }))}
          />

          {/* Actions Row */}
          <div className={styles.resultsActions}>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => setIsReviewMode(true)}
            >
              <SearchIcon size={16} />
              <span>Xem Lại 25 Câu &amp; Lời Giải</span>
            </button>
            <Link
              href="/study-plan"
              className={styles.secondaryBtn}
            >
              <ZapIcon size={16} />
              <span>Lộ Trình Thích Ứng Đã Tối Ưu</span>
            </Link>
            <Link
              href="/notebook"
              className={styles.secondaryBtn}
            >
              <NotebookIcon size={16} />
              <span>Sổ Tay Câu Hỏi Sai</span>
            </Link>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => {
                setTestStage('setup');
                setIsReviewMode(false);
              }}
            >
              <RotateCcwIcon size={16} />
              <span>Làm Bài Mini Test Khác</span>
            </button>
            <Link href="/" className={styles.secondaryBtn}>
              <HomeIcon size={16} />
              <span>Về Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 3: ACTIVE TEST SIMULATION OR REVIEW MODE
  // -------------------------------------------------------------
  if (loading || questions.length === 0) {
    return (
      <div className={styles.loading}>
        <ClockIcon size={28} />
        <span>Đang khởi tạo 25 câu hỏi chuẩn ETS từ 7 Parts...</span>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isCurrentFlagged = flaggedQuestions.has(currentQ.number);
  const currentAnswer = userAnswers[currentQ.number];
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className={styles.container}>
      {/* Sticky Top Bar */}
      <header className={styles.topBar}>
        <div className={styles.barLeft}>
          <button
            type="button"
            className={styles.quitBtn}
            onClick={() => {
              if (isReviewMode) {
                setIsReviewMode(false);
              } else if (window.confirm('Bạn có muốn thoát Mini Test? Tiến độ bài làm chưa nộp sẽ bị hủy.')) {
                setTestStage('setup');
              }
            }}
          >
            {isReviewMode ? 'Bảng điểm' : 'Thoát'}
          </button>
          <div className={styles.testTitleGroup}>
            <span className={styles.testTitle}>
              Mini Test 7 Parts {isReviewMode ? '(Chế Độ Xem Lại)' : `• ${activeTestName}`}
            </span>
            <span className={styles.partHeaderBadge}>{currentQ.partTitle}</span>
          </div>
        </div>

        {!isReviewMode ? (
          <div className={styles.timerGroup}>
            <ClockIcon size={16} />
            <span className={`${styles.timerText} ${timeLeft < 180 ? styles.timerDanger : ''}`}>
              {formatTimer(timeLeft)}
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              type="button"
              className={styles.primaryBtn}
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem' }}
              onClick={() => setIsReviewMode(false)}
            >
              <StatsIcon size={14} />
              <span>Xem Bảng Điểm</span>
            </button>
          </div>
        )}

        <div className={styles.barRight}>
          <span className={styles.progressBadge}>
            Đã làm: <strong>{answeredCount}</strong> / {questions.length}
          </span>
          {!isReviewMode && (
            <button
              type="button"
              className={styles.submitExamBtn}
              onClick={() => {
                const unanswered = questions.length - answeredCount;
                const msg = unanswered > 0
                  ? `Bạn còn ${unanswered} câu chưa làm. Bạn có chắc chắn muốn nộp bài?`
                  : 'Nộp bài và tính điểm TOEIC ước lượng ngay bây giờ?';
                if (window.confirm(msg)) handleSubmitExam();
              }}
            >
              <FlagIcon size={14} />
              <span>Nộp Bài</span>
            </button>
          )}
        </div>
      </header>

      {/* Review Mode Filter Bar */}
      {isReviewMode && (
        <div className={styles.reviewFilterBar}>
          <span className={styles.filterTitle}>
            <FilterIcon size={14} />
            <span>Lọc câu hỏi:</span>
          </span>
          <button
            type="button"
            onClick={() => setReviewFilter('all')}
            className={`${styles.filterPill} ${reviewFilter === 'all' ? styles.filterPillActive : ''}`}
          >
            Tất cả ({questions.length})
          </button>
          <button
            type="button"
            onClick={() => setReviewFilter('wrong')}
            className={`${styles.filterPill} ${reviewFilter === 'wrong' ? styles.filterPillActive : ''}`}
            style={{ color: reviewFilter === 'wrong' ? undefined : '#ef4444' }}
          >
            Chỉ câu sai ({questions.filter((q) => userAnswers[q.number]?.toUpperCase() !== q.correctAnswer.toUpperCase()).length})
          </button>
          <button
            type="button"
            onClick={() => setReviewFilter('lc')}
            className={`${styles.filterPill} ${reviewFilter === 'lc' ? styles.filterPillActive : ''}`}
          >
            Listening (12)
          </button>
          <button
            type="button"
            onClick={() => setReviewFilter('rc')}
            className={`${styles.filterPill} ${reviewFilter === 'rc' ? styles.filterPillActive : ''}`}
          >
            Reading (13)
          </button>
          {(['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setReviewFilter(p)}
              className={`${styles.filterPill} ${reviewFilter === p ? styles.filterPillActive : ''}`}
            >
              Part {p.replace('p', '')}
            </button>
          ))}
        </div>
      )}

      {/* Main Exam Layout */}
      <main className={styles.examLayout}>
        <section className={styles.questionArea}>
          <div className={styles.questionMeta}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
              <span className={styles.partBadge}>{currentQ.partTitle}</span>
              <strong style={{ fontSize: '1.05rem' }}>Câu #{currentQ.number}</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                (ETS #{currentQ.originalNumber})
              </span>
            </div>

            <button
              type="button"
              className={`${styles.flagBtn} ${isCurrentFlagged ? styles.flagged : ''}`}
              onClick={toggleFlag}
            >
              <FlagIcon size={14} style={{ fill: isCurrentFlagged ? 'currentColor' : 'none' }} />
              <span>{isCurrentFlagged ? 'Đã gắn cờ' : 'Gắn cờ'}</span>
            </button>
          </div>

          {/* Context / Instructions if present */}
          {currentQ.context && (
            <div className={styles.questionContextBox}>
              <span style={{ fontWeight: 600 }}>{currentQ.context}</span>
            </div>
          )}

          {/* Audio Player for Listening Parts */}
          {currentQ.audioUrl && (
            <div style={{ margin: '0.25rem 0' }}>
              <ListeningAudioPlayer
                key={currentQ.audioUrl}
                src={currentQ.audioUrl}
                title={`Bài nghe ${currentQ.partTitle}`}
                autoPlay={!isReviewMode}
              />
            </div>
          )}

          {/* Image Illustration for Part 1 or Graphics */}
          {currentQ.image && (
            <div className={styles.imageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentQ.image}
                alt="Hình ảnh bài thi TOEIC"
                className={styles.questionImage}
              />
            </div>
          )}

          {/* Reading Passage for Part 6 & Part 7 */}
          {currentQ.passageText && (
            <div className={styles.passageBox}>
              <div
                className={styles.passageContent}
                dangerouslySetInnerHTML={{ __html: currentQ.passageText }}
              />
            </div>
          )}

          {/* Question Title */}
          <div className={styles.questionTitle}>{currentQ.text}</div>

          {/* Options List */}
          <div className={styles.optionsList}>
            {Object.keys(currentQ.options).map((letter) => {
              let stateClass = '';
              if (isReviewMode) {
                if (letter.toUpperCase() === currentQ.correctAnswer.toUpperCase()) {
                  stateClass = styles.correct;
                } else if (letter.toUpperCase() === currentAnswer?.toUpperCase()) {
                  stateClass = styles.incorrect;
                }
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
                  <span className={styles.optionText}>{currentQ.options[letter]}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Review & AI Tutor block in Review Mode */}
          {isReviewMode && (
            <div className={styles.explanationBox}>
              <div className={styles.explanationHeader}>
                <CheckCircleIcon size={18} style={{ color: 'var(--success)' }} />
                <span>Đáp án đúng: ({currentQ.correctAnswer})</span>
              </div>

              {currentQ.transcript && (
                <div className={styles.transcriptBlock}>
                  <strong>Transcript hội thoại / bài nói:</strong>
                  <div dangerouslySetInnerHTML={{ __html: currentQ.transcript }} />
                </div>
              )}

              {currentQ.explanation && (
                <div className={styles.explanationText}>
                  <strong>Phân tích chi tiết &amp; Mẹo giải ETS:</strong>
                  <div dangerouslySetInnerHTML={{ __html: currentQ.explanation }} />
                </div>
              )}

              <button
                type="button"
                className={styles.askAiBtn}
                onClick={() =>
                  setTutorContext({
                    partTitle: currentQ.partTitle,
                    number: currentQ.number,
                    text: currentQ.text,
                    options: currentQ.options,
                    correctAnswer: currentQ.correctAnswer,
                    userAnswer: currentAnswer,
                    transcript: currentQ.transcript,
                    passageText: currentQ.passageText,
                    explanation: currentQ.explanation,
                    audioUrl: currentQ.audioUrl,
                  })
                }
              >
                <BotIcon size={16} />
                <span>Hỏi Gia Sư AI 990 về câu này</span>
              </button>
            </div>
          )}

          {/* Bottom Action Row */}
          <div className={styles.navActionRow}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
              disabled={currentIndex === 0}
            >
              <ArrowLeftIcon size={14} />
              <span>Câu trước</span>
            </button>

            <span className={styles.navCountIndicator}>
              {currentIndex + 1} / {questions.length}
            </span>

            {currentIndex === questions.length - 1 && !isReviewMode ? (
              <button
                type="button"
                className={`${styles.navBtn} ${styles.navBtnPrimary}`}
                onClick={handleSubmitExam}
              >
                <FlagIcon size={14} />
                <span>Hoàn thành &amp; Nộp bài</span>
              </button>
            ) : (
              <button
                type="button"
                className={`${styles.navBtn} ${styles.navBtnPrimary}`}
                onClick={() => setCurrentIndex((idx) => Math.min(questions.length - 1, idx + 1))}
                disabled={currentIndex === questions.length - 1}
              >
                <span>Câu sau</span>
                <ArrowRightIcon size={14} />
              </button>
            )}
          </div>
        </section>

        {/* Right Navigator Card */}
        <aside className={styles.navigatorCard}>
          <div className={styles.navTabs}>
            <button
              type="button"
              className={`${styles.navTabBtn} ${navTab === 'all' ? styles.activeTab : ''}`}
              onClick={() => setNavTab('all')}
            >
              Tất cả (25)
            </button>
            <button
              type="button"
              className={`${styles.navTabBtn} ${navTab === 'lc' ? styles.activeTab : ''}`}
              onClick={() => setNavTab('lc')}
            >
              LC (12)
            </button>
            <button
              type="button"
              className={`${styles.navTabBtn} ${navTab === 'rc' ? styles.activeTab : ''}`}
              onClick={() => setNavTab('rc')}
            >
              RC (13)
            </button>
            <button
              type="button"
              className={`${styles.navTabBtn} ${navTab === 'flagged' ? styles.activeTab : ''}`}
              onClick={() => setNavTab('flagged')}
            >
              Cờ ({flaggedQuestions.size})
            </button>
          </div>

          <div className={styles.legendRow}>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.answered}`} />
              <span>Đã làm</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.flagged}`} />
              <span>Gắn cờ</span>
            </div>
            {isReviewMode && (
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.correct}`} />
                <span>Đúng</span>
              </div>
            )}
          </div>

          <div className={styles.questionsGrid}>
            {questions.map((q, idx) => {
              // Filtering check
              if (navTab === 'lc' && !['p1', 'p2', 'p3', 'p4'].includes(q.part)) return null;
              if (navTab === 'rc' && !['p5', 'p6', 'p7'].includes(q.part)) return null;
              if (navTab === 'flagged' && !flaggedQuestions.has(q.number)) return null;

              const isAns = !!userAnswers[q.number];
              const isFlag = flaggedQuestions.has(q.number);
              const isActive = idx === currentIndex;
              let stateClass = '';

              if (isReviewMode) {
                const isCorrect = userAnswers[q.number]?.toUpperCase() === q.correctAnswer.toUpperCase();
                stateClass = isCorrect ? styles.gridCorrect : styles.gridWrong;
              } else if (isAns) {
                stateClass = styles.gridAnswered;
              }

              return (
                <button
                  key={q.number}
                  type="button"
                  className={`${styles.gridBtn} ${stateClass} ${isActive ? styles.gridActive : ''} ${isFlag ? styles.gridFlagged : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  {q.number}
                </button>
              );
            })}
          </div>
        </aside>
      </main>

      {/* AI Tutor Drawer */}
      {tutorContext && (
        <AITutorDrawer
          isOpen={!!tutorContext}
          onClose={() => setTutorContext(null)}
          questionContext={tutorContext}
        />
      )}
    </div>
  );
}
