'use client';

import { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Confetti from '@/components/Confetti';
import {
  ClockIcon,
  AwardIcon,
  BookIcon,
  RotateCcwIcon,
  HomeIcon,
  TargetIcon,
  ZapIcon,
  LayersIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  LightbulbIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@/components/icons/AppIcons';
import { Part7PassageSet, Part7Question, Part7DataSchema } from '@/schema/toeic';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { useLeaveWarning } from '@/hooks/useLeaveWarning';
import { storage } from '@/utils/storage';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import PracticeFooter from '@/components/PracticeFooter';
import styles from './page.module.css';

export const QUESTION_TYPES = [
  { key: 'all', label: 'Tất cả dạng' },
  { key: 'Main Idea', label: 'Ý chính & Mục đích' },
  { key: 'Detail', label: 'Chi tiết' },
  { key: 'Inference', label: 'Suy luận (Inference)' },
  { key: 'NOT / TRUE', label: 'NOT / TRUE' },
  { key: 'Vocabulary', label: 'Từ vựng ngữ cảnh' },
  { key: 'Sentence Placement', label: 'Điền câu' },
];

export const PASSAGE_TYPES = [
  { key: 'all', label: 'Tất cả đoạn' },
  { key: 'Single Passage', label: 'Đoạn đơn (Single)' },
  { key: 'Double Passage', label: 'Đoạn đôi (Double)' },
  { key: 'Triple Passage', label: 'Đoạn ba (Triple)' },
];

export const TESTS_LIST = [
  { key: 'ets2022_test1', label: 'ETS 2022 Test 1' },
  { key: 'ets2022_test2', label: 'ETS 2022 Test 2' },
  { key: 'all', label: 'Liên đề (Test 1 + Test 2)' },
];

export default function Part7Page() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang tải dữ liệu bài thi...</div>}>
      <Part7Trainer />
    </Suspense>
  );
}

function Part7Trainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTest = searchParams?.get('test') || 'ets2022_test1';
  const initialQType = searchParams?.get('questionType') || 'all';
  const initialPassageType = searchParams?.get('passageType') || 'all';

  const [testId, setTestId] = useState<string>(initialTest);
  const [selectedQType, setSelectedQType] = useState<string>(initialQType);
  const [selectedPassageType, setSelectedPassageType] = useState<string>(initialPassageType);

  const [allPassageSets, setAllPassageSets] = useState<Part7PassageSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentSetScore, setCurrentSetScore] = useState(0);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);

  // Pacing Tracking State
  const passageStartTimeRef = useRef<number>(Date.now());
  const [paceInfo, setPaceInfo] = useState<{ elapsedSeconds: number; secondsPerQ: number } | null>(null);
  const [sessionPacingHistory, setSessionPacingHistory] = useState<{
    passageType: string;
    elapsedSeconds: number;
    questionsCount: number;
    secondsPerQ: number;
  }[]>([]);
  const [sessionAnsweredQuestions, setSessionAnsweredQuestions] = useState<
    { question: Part7Question; isCorrect: boolean }[]
  >([]);

  // Time Attack State
  const [isTimeAttackEnabled, setIsTimeAttackEnabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Highlight State
  const [isHighlightMode, setIsHighlightMode] = useState(false);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const { addMistake } = useMistakeNotebook();
  useLeaveWarning(Object.keys(answers).length > 0 && !isSubmitted);

  // Helper: ETS Target Pace per Passage
  const getTargetPaceSeconds = (passageType: string, questionsCount: number) => {
    const lower = (passageType || '').toLowerCase();
    if (lower.includes('single')) return questionsCount * 50; // <50s/Q
    if (lower.includes('double')) return questionsCount * 60; // <60s/Q
    if (lower.includes('triple')) return questionsCount * 75; // <75s/Q
    return questionsCount * 60;
  };

  // Sync searchParams changes from URL
  useEffect(() => {
    const t = searchParams?.get('test');
    const q = searchParams?.get('questionType');
    const p = searchParams?.get('passageType');
    if (t && t !== testId) setTestId(t);
    if (q && q !== selectedQType) setSelectedQType(q);
    if (p && p !== selectedPassageType) setSelectedPassageType(p);
  }, [searchParams]);

  // Load preferences
  useEffect(() => {
    const savedPref = localStorage.getItem('toeic_time_attack');
    if (savedPref === 'true') setIsTimeAttackEnabled(true);
  }, []);

  const toggleTimeAttack = () => {
    const newVal = !isTimeAttackEnabled;
    setIsTimeAttackEnabled(newVal);
    localStorage.setItem('toeic_time_attack', newVal.toString());
  };

  // Fetch passages from JSON
  useEffect(() => {
    const fetchPassages = async () => {
      try {
        setLoading(true);
        setError(null);

        let loadedSets: Part7PassageSet[] = [];

        if (testId === 'all') {
          // Cross-test pooling: Load both Test 1 and Test 2
          const [res1, res2] = await Promise.all([
            fetch('/data/ets2022/test1/part7.json'),
            fetch('/data/ets2022/test2/part7.json'),
          ]);

          if (!res1.ok || !res2.ok) throw new Error('Không thể tải dữ liệu đề thi');
          const [d1, d2] = await Promise.all([res1.json(), res2.json()]);
          const v1 = Part7DataSchema.parse(d1);
          const v2 = Part7DataSchema.parse(d2);
          loadedSets = [...v1, ...v2];
        } else {
          const match = testId.match(/ets(\d+)_test(\d+)/);
          if (!match) throw new Error('Mã đề thi không hợp lệ');

          const path = `/data/ets${match[1]}/test${match[2]}/part7.json`;
          const res = await fetch(path);
          if (!res.ok) throw new Error('Không thể tải dữ liệu đề thi');

          const data = await res.json();
          const validated = Part7DataSchema.parse(data);
          loadedSets = validated as Part7PassageSet[];
        }

        setAllPassageSets(loadedSets);
        setCurrentPassageIndex(0);
        setActiveQuestionIndex(0);
        setAnswers({});
        setIsSubmitted(false);
        setIsFinished(false);
        setTotalScore(0);
        setTotalQuestions(0);
        setSessionAnsweredQuestions([]);
        setSessionPacingHistory([]);
        setPaceInfo(null);
        passageStartTimeRef.current = Date.now();
      } catch (err: any) {
        console.error('Error loading Part 7 data:', err);
        setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchPassages();
  }, [testId]);

  // Filter passages based on selected filters
  const filteredPassageSets = useMemo(() => {
    return allPassageSets.filter((set) => {
      // 1. Passage type filter
      if (selectedPassageType !== 'all') {
        const matchesPassageType = set.type.toLowerCase().includes(selectedPassageType.toLowerCase());
        if (!matchesPassageType) return false;
      }

      // 2. Question type filter
      if (selectedQType !== 'all') {
        const hasMatchingQuestion = set.questions.some(
          (q) => (q.questionType || q.subCategory) === selectedQType
        );
        if (!hasMatchingQuestion) return false;
      }

      return true;
    });
  }, [allPassageSets, selectedPassageType, selectedQType]);

  const passageSet = filteredPassageSets[currentPassageIndex] || null;
  const currentQuestion = passageSet?.questions[activeQuestionIndex];
  const allAnswered = passageSet ? Object.keys(answers).length === passageSet.questions.length : false;

  // Reset timer on passage change
  useEffect(() => {
    if (isTimeAttackEnabled && !isSubmitted && passageSet) {
      setTimeLeft(passageSet.questions.length * 55);
    } else {
      setTimeLeft(null);
    }
    if (!isSubmitted) {
      passageStartTimeRef.current = Date.now();
      setPaceInfo(null);
    }
  }, [currentPassageIndex, isTimeAttackEnabled, isSubmitted, passageSet]);

  // Countdown timer
  useEffect(() => {
    if (!isTimeAttackEnabled || isSubmitted || timeLeft === null || timeLeft <= 0) return;
    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft, isTimeAttackEnabled, isSubmitted]);

  // Auto-submit when time is up
  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted && passageSet) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted, passageSet]);

  const updateUrlParams = (newTest: string, newQType: string, newPType: string) => {
    const params = new URLSearchParams();
    if (newTest !== 'ets2022_test1') params.set('test', newTest);
    if (newQType !== 'all') params.set('questionType', newQType);
    if (newPType !== 'all') params.set('passageType', newPType);
    const queryString = params.toString();
    router.replace(`/part7${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  const handleSelectAnswer = (questionId: string, optionKey: string) => {
    if (isSubmitted || !passageSet) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));

    if (activeQuestionIndex < passageSet.questions.length - 1) {
      setTimeout(() => {
        setActiveQuestionIndex((prev) => prev + 1);
      }, 250);
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (!passageSet || isSubmitted) return;

      const key = e.key.toUpperCase();
      const currentQ = passageSet.questions[activeQuestionIndex];
      if (!currentQ) return;

      if (['A', 'B', 'C', 'D'].includes(key)) {
        if (currentQ.options[key as keyof typeof currentQ.options]) {
          handleSelectAnswer(currentQ.id, key);
        }
      } else if (e.key === 'ArrowLeft') {
        setActiveQuestionIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveQuestionIndex((prev) => Math.min(passageSet.questions.length - 1, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleTextHighlight = () => {
    if (!isHighlightMode) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    try {
      const range = selection.getRangeAt(0);
      const markNode = document.createElement('mark');
      markNode.style.backgroundColor = 'var(--warning-light, #fff8e1)';
      markNode.style.padding = '0 2px';
      markNode.style.borderRadius = '2px';
      range.surroundContents(markNode);
      selection.removeAllRanges();
    } catch (e) {
      console.warn('Không thể highlight qua nhiều thẻ block khác nhau', e);
      selection.removeAllRanges();
    }
  };

  const handleSubmit = () => {
    if (isSubmitted || !passageSet) return;
    setIsSubmitted(true);

    const elapsed = Math.max(1, Math.round((Date.now() - passageStartTimeRef.current) / 1000));
    const secondsPerQ = Math.round(elapsed / (passageSet.questions.length || 1));
    setPaceInfo({ elapsedSeconds: elapsed, secondsPerQ });
    setSessionPacingHistory((prev) => [
      ...prev,
      {
        passageType: passageSet.type,
        elapsedSeconds: elapsed,
        questionsCount: passageSet.questions.length,
        secondsPerQ,
      },
    ]);

    let score = 0;
    const answeredInThisSet: { question: Part7Question; isCorrect: boolean }[] = [];

    passageSet.questions.forEach((q) => {
      const isCorrect = answers[q.id] === q.correctAnswer;
      if (isCorrect) {
        score++;
      } else {
        addMistake(`exam_${testId}_part7_${q.id}`, {
          type: 'exam',
          testId: testId === 'all' ? 'ets2022_cross' : testId,
          part: 'part7',
          questionId: q.id,
          subCategory: q.questionType || q.subCategory || 'Detail',
          grammarTag: q.questionType || 'Detail',
        });
      }
      answeredInThisSet.push({ question: q, isCorrect });
    });

    setCurrentSetScore(score);
    setSessionAnsweredQuestions((prev) => [...prev, ...answeredInThisSet]);

    if (score === passageSet.questions.length) {
      setShowConfetti(true);
    }
  };

  const handleNextPassage = () => {
    if (!passageSet) return;

    if (currentPassageIndex < filteredPassageSets.length - 1) {
      setTotalScore((prev) => prev + currentSetScore);
      setTotalQuestions((prev) => prev + passageSet.questions.length);
      setCurrentPassageIndex((prev) => prev + 1);
      setAnswers({});
      setIsSubmitted(false);
      setShowConfetti(false);
      setActiveQuestionIndex(0);
      setPaceInfo(null);
      passageStartTimeRef.current = Date.now();
    } else {
      // Show results
      const finalTotal = totalScore + currentSetScore;
      const finalQuestions = totalQuestions + passageSet.questions.length;
      setTotalScore(finalTotal);
      setTotalQuestions(finalQuestions);
      setIsFinished(true);
      if (testId !== 'all') {
        storage.set(`progress_${testId}_part7`, true);
      }
      if (finalTotal / finalQuestions >= 0.7) {
        setShowConfetti(true);
      }
    }
  };

  const renderContent = (content: string, type: string) => {
    if (type === 'Text Message') {
      try {
        const messages = JSON.parse(content) as { sender: string; time: string; text: string }[];
        return (
          <div className={styles.chatContainer}>
            {messages.map((msg, idx) => {
              const isFirstSender = msg.sender === messages[0].sender;
              return (
                <div key={idx} className={`${styles.chatMessage} ${isFirstSender ? styles.chatLeft : styles.chatRight}`}>
                  <div className={styles.chatHeader}>
                    <span className={styles.chatSender}>{msg.sender}</span>
                    <span className={styles.chatTime}>{msg.time}</span>
                  </div>
                  <div className={styles.chatBubble}>{msg.text}</div>
                </div>
              );
            })}
          </div>
        );
      } catch (e) {
        return <div className={styles.passageText}>{content}</div>;
      }
    }

    return (
      <div className={styles.passageText} dangerouslySetInnerHTML={{ __html: content }} />
    );
  };

  // Result Breakdown calculation
  const questionTypeStats = useMemo(() => {
    const stats: Record<string, { total: number; correct: number }> = {};
    sessionAnsweredQuestions.forEach((item) => {
      const type = item.question.questionType || item.question.subCategory || 'Detail';
      if (!stats[type]) {
        stats[type] = { total: 0, correct: 0 };
      }
      stats[type].total++;
      if (item.isCorrect) stats[type].correct++;
    });
    return Object.entries(stats).map(([type, counts]) => ({
      type,
      total: counts.total,
      correct: counts.correct,
      accuracy: Math.round((counts.correct / counts.total) * 100),
    }));
  }, [sessionAnsweredQuestions]);

  // Session Pacing Report calculation
  const sessionPacingReport = useMemo(() => {
    if (sessionPacingHistory.length === 0) return null;
    const totalSeconds = sessionPacingHistory.reduce((acc, h) => acc + h.elapsedSeconds, 0);
    const totalQ = sessionPacingHistory.reduce((acc, h) => acc + h.questionsCount, 0);
    const avgSecondsPerQ = totalQ > 0 ? Math.round(totalSeconds / totalQ) : 0;

    const structures = [
      { key: 'single', label: 'Đoạn đơn (Single)', targetSec: 50 },
      { key: 'double', label: 'Đoạn đôi (Double)', targetSec: 60 },
      { key: 'triple', label: 'Đoạn ba (Triple)', targetSec: 75 },
    ];

    const structureStats = structures
      .map((st) => {
        const items = sessionPacingHistory.filter((h) => h.passageType.toLowerCase().includes(st.key));
        const sec = items.reduce((acc, h) => acc + h.elapsedSeconds, 0);
        const qCount = items.reduce((acc, h) => acc + h.questionsCount, 0);
        const pace = qCount > 0 ? Math.round(sec / qCount) : null;
        return {
          label: st.label,
          targetSec: st.targetSec,
          actualSec: pace,
          questionsCount: qCount,
        };
      })
      .filter((st) => st.questionsCount > 0);

    let status: 'optimal' | 'moderate' | 'critical' = 'optimal';
    let statusText = 'Tốc độ vàng ETS';
    let advice =
      'Nhịp độ của bạn rất tốt! Với tốc độ này, bạn sẽ làm kịp 54 câu Part 7 trong đúng 54 phút và còn dư thời gian soát lại bài.';

    if (avgSecondsPerQ > 80) {
      status = 'critical';
      statusText = 'Nguy cơ cháy giờ cao';
      advice =
        'Tốc độ trung bình > 80s/câu! Trong bài thi thật, bạn có nguy cơ phải đánh lụi 10-15 câu cuối. Hãy áp dụng chiến thuật đọc lướt câu hỏi trước, định vị từ khóa trong bài và tránh đọc dịch từng từ.';
    } else if (avgSecondsPerQ > 60) {
      status = 'moderate';
      statusText = 'Cần tăng tốc nhẹ';
      advice =
        'Tốc độ trung bình từ 60-80s/câu chớm lẹm vào thời gian của Part 5 và 6. Hãy cố gắng rút ngắn thời gian làm bài ở các đoạn đơn xuống dưới 50s/câu để dành thời gian cho đoạn ba.';
    }

    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    const durationDisplay =
      totalMinutes > 0 ? `${totalMinutes} phút ${remainingSeconds} giây` : `${remainingSeconds} giây`;

    return {
      totalSeconds,
      durationDisplay,
      avgSecondsPerQ,
      status,
      statusText,
      advice,
      structureStats,
    };
  }, [sessionPacingHistory]);

  if (loading) {
    return (
      <div className={styles.pageContainer} style={{ paddingTop: '20px' }}>
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonCard} style={{ height: '600px' }}>
            <div className={`${styles.skeletonPulse} ${styles.skeletonTitle}`} />
            <div className={`${styles.skeletonPulse} ${styles.skeletonLine}`} style={{ marginTop: '20px' }} />
            <div className={`${styles.skeletonPulse} ${styles.skeletonLine}`} />
            <div className={`${styles.skeletonPulse} ${styles.skeletonLineShort}`} />
          </div>
          <div className={styles.skeletonCard} style={{ height: '400px' }}>
            <div className={`${styles.skeletonPulse} ${styles.skeletonTitle}`} />
            <div className={`${styles.skeletonPulse} ${styles.skeletonLine}`} style={{ height: 50, borderRadius: 16, marginTop: '20px' }} />
            <div className={`${styles.skeletonPulse} ${styles.skeletonLine}`} style={{ height: 50, borderRadius: 16 }} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.loading} style={{ color: 'var(--danger)' }}>Lỗi: {error}</div>;
  }

  if (isFinished) {
    const percentage = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
    return (
      <div className={styles.pageContainer}>
        <Confetti show={showConfetti} />
        <div
          className={styles.resultsCard}
          style={{
            margin: '30px auto',
            maxWidth: 720,
            padding: 36,
            textAlign: 'center',
            backgroundColor: 'var(--card)',
            borderRadius: 24,
            border: '1px solid var(--border)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            {percentage >= 70 ? (
              <AwardIcon size={56} style={{ color: 'var(--primary)' }} />
            ) : (
              <BookIcon size={56} style={{ color: 'var(--muted-foreground)' }} />
            )}
          </div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: 12, color: 'var(--foreground)' }}>
            Hoàn thành Luyện Đọc hiểu Part 7!
          </h1>
          <div
            style={{
              backgroundColor: 'var(--surface)',
              padding: '14px 24px',
              borderRadius: 12,
              display: 'inline-block',
              marginBottom: 20,
              border: '1px solid var(--border)',
            }}
          >
            <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              Kết quả: {totalScore} / {totalQuestions} ({percentage}%)
            </span>
          </div>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: 24, lineHeight: 1.6 }}>
            {percentage >= 80
              ? 'Khả năng đọc hiểu và định vị thông tin của bạn rất tốt! Hãy tiếp tục rèn luyện tốc độ để chinh phục 450+ Reading.'
              : 'Part 7 yêu cầu kỹ năng Skimming và Scanning nhạy bén. Bạn nên xác định từ khóa câu hỏi trước rồi quét thông tin trong bài đọc.'}
          </p>

          {/* Full Session Pacing Analytics Card */}
          {sessionPacingReport && (
            <div className={styles.sessionPacingCard}>
              <div className={styles.sessionPacingHeader}>
                <h3 className={styles.sessionPacingTitle}>
                  <ClockIcon size={18} /> Phân tích Nhịp độ Đọc hiểu Toàn phiên
                </h3>
                <span className={styles.totalDurationBadge}>
                  Tổng thời gian: {sessionPacingReport.durationDisplay}
                </span>
              </div>

              <div
                className={`${styles.pacingOverviewBanner} ${
                  sessionPacingReport.status === 'optimal'
                    ? styles.pacingStatusOptimal
                    : sessionPacingReport.status === 'moderate'
                    ? styles.pacingStatusModerate
                    : styles.pacingStatusCritical
                }`}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
                    Tốc độ trung bình phiên
                  </span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>
                    {sessionPacingReport.avgSecondsPerQ}s / câu
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                    }}
                  >
                    {sessionPacingReport.status === 'optimal' ? (
                      <CheckCircleIcon size={16} />
                    ) : (
                      <AlertCircleIcon size={16} />
                    )}
                    {sessionPacingReport.statusText}
                  </span>
                  <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Mục tiêu ETS: ≤ 60s / câu</div>
                </div>
              </div>

              {sessionPacingReport.structureStats.length > 0 && (
                <div className={styles.pacingStructureGrid}>
                  {sessionPacingReport.structureStats.map((st) => {
                    const isOptimal = st.actualSec !== null && st.actualSec <= st.targetSec;
                    return (
                      <div key={st.label} className={styles.pacingStructureCard}>
                        <div className={styles.pacingStructureHeader}>
                          <span>{st.label}</span>
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>
                            {st.questionsCount} câu
                          </span>
                        </div>
                        <div
                          className={styles.pacingStructureVal}
                          style={{
                            color: isOptimal ? 'var(--success)' : 'var(--warning)',
                          }}
                        >
                          {st.actualSec}s / câu
                        </div>
                        <div className={styles.pacingStructureTarget}>
                          Mục tiêu ETS: &lt; {st.targetSec}s
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className={styles.pacingAdviceBox}>
                <ZapIcon size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                <span>{sessionPacingReport.advice}</span>
              </div>
            </div>
          )}

          {/* Question Type Breakdown */}
          {questionTypeStats.length > 0 && (
            <div className={styles.resultsBreakdown}>
              <h3 className={styles.resultsBreakdownTitle}>
                <TargetIcon size={18} /> Bóc tách theo dạng câu hỏi Part 7
              </h3>
              <div className={styles.breakdownGrid}>
                {questionTypeStats.map((item) => (
                  <div key={item.type} className={styles.breakdownCard}>
                    <div className={styles.breakdownCardHeader}>
                      <span className={styles.breakdownTypeName}>{item.type}</span>
                      <span
                        className={styles.breakdownScore}
                        style={{
                          color:
                            item.accuracy >= 75
                              ? 'var(--success)'
                              : item.accuracy >= 50
                              ? 'var(--warning)'
                              : 'var(--danger)',
                        }}
                      >
                        {item.correct}/{item.total} ({item.accuracy}%)
                      </span>
                    </div>
                    <div className={styles.breakdownBarBg}>
                      <div
                        className={styles.breakdownBarFill}
                        style={{
                          width: `${item.accuracy}%`,
                          backgroundColor:
                            item.accuracy >= 75
                              ? 'var(--success)'
                              : item.accuracy >= 50
                              ? 'var(--warning)'
                              : 'var(--danger)',
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      className={styles.breakdownActionBtn}
                      onClick={() => {
                        setSelectedQType(item.type);
                        updateUrlParams(testId, item.type, selectedPassageType);
                        setIsFinished(false);
                        setCurrentPassageIndex(0);
                        setAnswers({});
                        setIsSubmitted(false);
                        setTotalScore(0);
                        setTotalQuestions(0);
                        setSessionAnsweredQuestions([]);
                        setSessionPacingHistory([]);
                        passageStartTimeRef.current = Date.now();
                      }}
                    >
                      <span>Luyện riêng dạng này</span>
                      <ArrowRightIcon size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setIsFinished(false);
                setCurrentPassageIndex(0);
                setActiveQuestionIndex(0);
                setAnswers({});
                setIsSubmitted(false);
                setTotalScore(0);
                setTotalQuestions(0);
                setSessionAnsweredQuestions([]);
                setSessionPacingHistory([]);
                passageStartTimeRef.current = Date.now();
              }}
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <RotateCcwIcon size={16} /> Luyện lại bài này
            </button>
            <Link
              href="/notebook?tab=exam"
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <BookIcon size={16} /> Xem Sổ tay lỗi sai
            </Link>
            <Link href="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <HomeIcon size={16} /> Về Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Confetti show={showConfetti} />

      {/* Header */}
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            href="/"
            className={styles.backBtn}
            style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          >
            ← Dashboard
          </Link>
          <div>
            <h1 className={styles.title} style={{ margin: 0, fontSize: '1.25rem' }}>
              Part 7: Reading Comprehension
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <p className={styles.subtitle} style={{ margin: 0, fontSize: '0.875rem' }}>
                {passageSet ? `${passageSet.source || 'ETS Test'} - ${passageSet.type} (${currentPassageIndex + 1}/${filteredPassageSets.length})` : 'Đang tải'}
              </p>
              {passageSet && (
                <span className={styles.targetPaceBadge}>
                  <ClockIcon size={12} />
                  Mục tiêu ETS: &lt; {Math.round(getTargetPaceSeconds(passageSet.type, passageSet.questions.length) / 60)} phút ({passageSet.questions.length} câu)
                </span>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsHighlightMode(!isHighlightMode)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              border: `1px solid ${isHighlightMode ? 'var(--primary)' : 'var(--border)'}`,
              backgroundColor: isHighlightMode ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
              color: isHighlightMode ? 'var(--primary)' : 'var(--foreground)',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {isHighlightMode ? 'Tắt Highlight' : 'Bật Highlight'}
          </button>
          <div className={styles.timeAttackToggle} onClick={toggleTimeAttack}>
            <span style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ClockIcon size={15} /> Ép thời gian
            </span>
            <div className={`${styles.toggleSwitch} ${isTimeAttackEnabled ? styles.toggleSwitchOn : ''}`} />
          </div>
        </div>
      </header>

      {/* Targeted Reading Filters */}
      {!isFilterExpanded ? (
        <div className={styles.filterBarSlim}>
          <div className={styles.activeTargetBanner} style={{ flex: 1, margin: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TargetIcon size={16} />
              <span>
                Chế độ luyện: <strong>{QUESTION_TYPES.find((q) => q.key === selectedQType)?.label}</strong> | Đoạn:{' '}
                <strong>{PASSAGE_TYPES.find((p) => p.key === selectedPassageType)?.label}</strong> | Bộ đề:{' '}
                <strong>{TESTS_LIST.find((t) => t.key === testId)?.label}</strong>
              </span>
            </div>
            <span className={styles.pillBadge} style={{ fontSize: '0.8rem' }}>
              Tìm thấy {filteredPassageSets.length} bài đọc
            </span>
          </div>
          <button
            type="button"
            className={styles.filterToggleBtn}
            onClick={() => setIsFilterExpanded(true)}
            title="Mở rộng bộ lọc dạng câu hỏi và cấu trúc đoạn"
          >
            <span>Đổi bộ lọc</span>
            <ChevronDownIcon size={15} />
          </button>
        </div>
      ) : (
        <div className={styles.filterContainer}>
          {/* Row 1: Question Type Pills */}
          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>Dạng câu hỏi:</span>
            <div className={styles.pillsWrap}>
              {QUESTION_TYPES.map((type) => {
                const isActive = selectedQType === type.key;
                return (
                  <button
                    key={type.key}
                    className={`${styles.filterPill} ${isActive ? styles.filterPillActive : ''}`}
                    onClick={() => {
                      setSelectedQType(type.key);
                      setCurrentPassageIndex(0);
                      setActiveQuestionIndex(0);
                      setAnswers({});
                      setIsSubmitted(false);
                      updateUrlParams(testId, type.key, selectedPassageType);
                    }}
                  >
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2: Passage Structure Pills & Test Selector */}
          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>Cấu trúc đoạn:</span>
            <div className={styles.pillsWrap}>
              {PASSAGE_TYPES.map((pt) => {
                const isActive = selectedPassageType === pt.key;
                return (
                  <button
                    key={pt.key}
                    className={`${styles.filterPill} ${isActive ? styles.filterPillActive : ''}`}
                    onClick={() => {
                      setSelectedPassageType(pt.key);
                      setCurrentPassageIndex(0);
                      setActiveQuestionIndex(0);
                      setAnswers({});
                      setIsSubmitted(false);
                      updateUrlParams(testId, selectedQType, pt.key);
                    }}
                  >
                    <span>{pt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Test Selector */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={styles.filterLabel} style={{ minWidth: 'auto' }}>Bộ đề:</span>
              <select
                value={testId}
                onChange={(e) => {
                  const newTest = e.target.value;
                  setTestId(newTest);
                  updateUrlParams(newTest, selectedQType, selectedPassageType);
                }}
                style={{
                  padding: '4px 8px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--foreground)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}
              >
                {TESTS_LIST.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Banner with Collapse Button */}
          <div className={styles.activeTargetBanner}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TargetIcon size={16} />
              <span>
                Chế độ luyện: <strong>{QUESTION_TYPES.find((q) => q.key === selectedQType)?.label}</strong> | Đoạn:{' '}
                <strong>{PASSAGE_TYPES.find((p) => p.key === selectedPassageType)?.label}</strong>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className={styles.pillBadge} style={{ fontSize: '0.8rem' }}>
                Tìm thấy {filteredPassageSets.length} bài đọc phù hợp
              </span>
              <button
                type="button"
                className={styles.filterToggleBtn}
                style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                onClick={() => setIsFilterExpanded(false)}
              >
                <span>Thu gọn</span>
                <ChevronUpIcon size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {!passageSet ? (
        <div
          className={styles.passageCard}
          style={{ padding: 40, textAlign: 'center', borderRadius: 16 }}
        >
          <AlertCircleIcon size={36} style={{ color: 'var(--warning)', margin: '0 auto 12px' }} />
          <h3>Không tìm thấy bài đọc phù hợp bộ lọc</h3>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: 16 }}>
            Thử chuyển sang bộ lọc &quot;Tất cả dạng&quot; hoặc &quot;Tất cả đoạn&quot; để làm bài.
          </p>
          <button
            className="btn-primary"
            onClick={() => {
              setSelectedQType('all');
              setSelectedPassageType('all');
              updateUrlParams(testId, 'all', 'all');
            }}
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className={styles.splitView}>
          {/* Left Side: Passages */}
          <section className={styles.leftPanel} onMouseUp={handleTextHighlight}>
            {passageSet.passages.map((passage) => (
              <div key={passage.id} className={styles.passageCard}>
                <div className={styles.passageHeader}>
                  <span className={styles.passageTypeBadge}>{passage.type}</span>
                  {passage.title && <h2 className={styles.passageTitle}>{passage.title}</h2>}
                  <div className={styles.passageMeta}>
                    {passage.sender && <div>{passage.sender}</div>}
                    {passage.recipient && <div>{passage.recipient}</div>}
                    {passage.date && <div>{passage.date}</div>}
                  </div>
                </div>
                <div className={styles.passageContent}>{renderContent(passage.content, passage.type)}</div>
              </div>
            ))}
          </section>

          {/* Right Side: Questions & Review */}
          <section className={styles.rightPanel}>
            {isTimeAttackEnabled && timeLeft !== null && !isSubmitted && (
              <div
                className={`${styles.timerContainer} ${
                  timeLeft < 30 ? styles.timerDanger : timeLeft < 60 ? styles.timerWarning : ''
                }`}
              >
                <ClockIcon size={18} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'text-bottom' }} />{' '}
                {Math.floor(timeLeft / 60)
                  .toString()
                  .padStart(2, '0')}{' '}
                : {(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            )}

            {!isSubmitted && currentQuestion ? (
              <div className={styles.questionCard}>
                <div className={styles.qHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={styles.qIndicator}>
                      Câu hỏi {activeQuestionIndex + 1} / {passageSet.questions.length}
                    </span>
                    {currentQuestion.questionType && (
                      <span className={styles.questionTypeBadge}>
                        <TargetIcon size={12} /> {currentQuestion.questionType}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className={styles.qText}>
                  {currentQuestion.number}. {currentQuestion.text}
                </h3>

                <div className={styles.optionsList}>
                  {(Object.entries(currentQuestion.options) as [string, string][]).map(([key, val]) => {
                    const isSelected = answers[currentQuestion.id] === key;
                    return (
                      <button
                        key={key}
                        className={`${styles.optionBtn} ${isSelected ? styles.selectedOption : ''}`}
                        onClick={() => handleSelectAnswer(currentQuestion.id, key)}
                      >
                        <span className={styles.optionLetter}>{key}</span>
                        <span className={styles.optionText}>{val}</span>
                        <span className={styles.optionShortcut}>Nhấn {key}</span>
                      </button>
                    );
                  })}
                </div>
                <p className={styles.shortcutHint}>
                  Phím tắt: Sử dụng phím A, B, C, D để chọn đáp án và phím mũi tên để chuyển câu.
                </p>

                {/* Navigation below question */}
                <div className={styles.qNavigation}>
                  <button
                    className={styles.navBtn}
                    disabled={activeQuestionIndex === 0}
                    onClick={() => setActiveQuestionIndex((prev) => prev - 1)}
                  >
                    &larr; Câu trước
                  </button>
                  <button
                    className={styles.navBtn}
                    disabled={activeQuestionIndex === passageSet.questions.length - 1}
                    onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
                  >
                    Câu tiếp theo &rarr;
                  </button>
                </div>

                {allAnswered && (
                  <button className={`${styles.submitBtn} animate-slide-up`} onClick={handleSubmit}>
                    Nộp bài & Xem giải thích
                  </button>
                )}
              </div>
            ) : (
              <div className={styles.reviewSection}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h2 className={styles.reviewTitle} style={{ margin: 0 }}>
                    Giải thích chi tiết
                  </h2>
                  {paceInfo && (
                    <span
                      className={`${styles.pacingBadge} ${
                        paceInfo.secondsPerQ <= 60
                          ? styles.pacingOptimal
                          : paceInfo.secondsPerQ <= 90
                          ? styles.pacingModerate
                          : styles.pacingSlow
                      }`}
                    >
                      <ClockIcon size={14} />
                      <span>
                        Tốc độ: {paceInfo.secondsPerQ}s/câu (
                        {paceInfo.secondsPerQ <= 60
                          ? 'Chuẩn ETS'
                          : paceInfo.secondsPerQ <= 90
                          ? 'Vừa phải'
                          : 'Cảnh báo chậm'}
                        )
                      </span>
                    </span>
                  )}
                </div>

                <div className={styles.explanationsList}>
                  {passageSet.questions.map((q) => {
                    const isCorrect = answers[q.id] === q.correctAnswer;
                    return (
                      <div key={q.id} className={styles.explanationCard}>
                        <div className={styles.exHeader}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className={styles.exNumber}>Q{q.number}</span>
                            {q.questionType && (
                              <span className={styles.questionTypeBadge}>
                                <TargetIcon size={12} /> {q.questionType}
                              </span>
                            )}
                          </div>
                          <span className={isCorrect ? styles.badgeCorrect : styles.badgeWrong}>
                            {isCorrect ? 'Đúng' : 'Chưa đúng'}
                          </span>
                        </div>
                        <h3 className={styles.exQText}>{q.text}</h3>
                        <div className={styles.exContent}>
                          <p>
                            <strong>Bạn chọn:</strong> {answers[q.id] || 'Chưa làm'}
                          </p>
                          <p>
                            <strong>Đáp án đúng:</strong> {q.correctAnswer} -{' '}
                            {q.options[q.correctAnswer as keyof typeof q.options]}
                          </p>

                          {/* Strategy Tip Box */}
                          {q.strategyHint && (
                            <div className={styles.strategyHintBox}>
                              <div className={styles.strategyHintHeader}>
                                <LightbulbIcon size={14} /> Mẹo giải nhanh ETS
                              </div>
                              <p className={styles.strategyHintText}>{q.strategyHint}</p>
                            </div>
                          )}

                          <div className={styles.exBox} dangerouslySetInnerHTML={{ __html: q.explanation }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {passageSet && (
        <PracticeFooter
          isAnswered={isSubmitted}
          isCorrect={currentSetScore === passageSet.questions.length}
          correctMessage={`Tuyệt vời! Bạn trả lời đúng ${passageSet.questions.length}/${passageSet.questions.length} câu hỏi.`}
          incorrectMessage={`Bạn trả lời đúng ${currentSetScore}/${passageSet.questions.length} câu hỏi.`}
          onNext={handleNextPassage}
          onAITutor={() =>
            setTutorContext({
              partTitle: 'Part 7: Reading Comprehension',
              number: passageSet.questions[0].number,
              text: `Đọc đoạn văn và trả lời câu hỏi: ${passageSet.questions.map((q) => `Q${q.number}: ${q.text}`).join(' | ')}`,
              options: { A: 'Xem giải thích chi tiết và phân tích bẫy' },
              correctAnswer: 'A',
              explanation: passageSet.questions.map((q) => `Q${q.number}: ${q.explanation}`).join('<br/><br/>'),
            })
          }
          nextLabel={currentPassageIndex + 1 === filteredPassageSets.length ? 'Xem tổng kết' : 'Đoạn văn tiếp theo'}
        />
      )}

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
