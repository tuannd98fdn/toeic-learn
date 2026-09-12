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
} from '@/components/icons/AppIcons';
import ListeningAudioPlayer from '@/components/ListeningAudioPlayer';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { storage } from '@/utils/storage';
import { syncAdaptivePlan } from '@/utils/studyPlanEngine';
import {
  calculateScaledScore,
  getCefrLevel,
  diagnoseWeakness,
  ExamScoreSummary,
  PartScore,
} from '@/utils/toeicScoreCalculator';
import styles from './page.module.css';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';

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

const TOTAL_TIME = 120 * 60; // 120 minutes = 7200 seconds

export default function ExamPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang khởi tạo phòng thi TOEIC...</div>}>
      <ExamSimulation />
    </Suspense>
  );
}

function ExamSimulation() {
  const searchParams = useSearchParams();
  const testId = searchParams.get('test') || 'ets2022_test1';

  const [questions, setQuestions] = useState<UnifiedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Exam Progress
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  // Timer
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Navigation Filter
  const [navTab, setNavTab] = useState<'all' | 'lc' | 'rc'>('all');

  // Exam Result
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultSummary, setResultSummary] = useState<ExamScoreSummary | null>(null);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [showOnlyWrong, setShowOnlyWrong] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);

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

  // Load and unify all 200 questions
  useEffect(() => {
    const loadAllParts = async () => {
      try {
        setLoading(true);
        const match = testId.match(/ets(\d+)_test(\d+)/);
        if (!match) throw new Error('Mã đề không hợp lệ');

        const pathBase = `/data/ets${match[1]}/test${match[2]}`;
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

        const unified: UnifiedQuestion[] = [];

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
            });
          });
        });

        unified.sort((a, b) => a.number - b.number);
        setQuestions(unified);
      } catch (err: any) {
        console.error('Error loading exam data:', err);
        setError(err.message || 'Không thể nạp bài thi');
      } finally {
        setLoading(false);
      }
    };

    loadAllParts();
  }, [testId]);

  // Timer interval
  useEffect(() => {
    if (loading || isSubmitted || isPaused) return;

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
  }, [loading, isSubmitted, isPaused]); // eslint-disable-line react-hooks/exhaustive-deps

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
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.number]: letter,
    }));
  };

  const toggleFlag = (num: number) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
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
      const isLC = q.number <= 100;

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

    const { scaledLC, scaledRC, totalScore } = calculateScaledScore(rawLC, rawRC);
    const cefrLevel = getCefrLevel(totalScore);

    const partScores: Record<string, PartScore> = {};
    Object.keys(partCounts).forEach((p) => {
      const total = partCounts[p].total || 1;
      const correct = partCounts[p].correct;
      partScores[p] = {
        total,
        correct,
        accuracy: Math.round((correct / total) * 100),
      };
    });

    const weakestPart = diagnoseWeakness(partScores);

    const summary: ExamScoreSummary = {
      testId,
      testName: `ETS 2022 - Test 1`,
      date: new Date().toLocaleDateString('vi-VN'),
      durationSeconds: TOTAL_TIME - timeLeft,
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

    // Synchronize and rebalance study plan based on full exam performance
    syncAdaptivePlan();

    setResultSummary(summary);
    setIsSubmitted(true);
    if (totalScore >= 600) {
      setShowConfetti(true);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <span>Đang chuẩn bị đề thi 200 câu...</span>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
          Nạp hình ảnh, audio và dữ liệu chuẩn ETS
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
    if (navTab === 'lc') return q.number <= 100;
    if (navTab === 'rc') return q.number > 100;
    if (showOnlyWrong && isReviewMode) return userAnswers[q.number] !== q.correctAnswer;
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
            {resultSummary.totalScore >= 700 ? <AwardIcon size={32} style={{ color: '#ff9800' }} /> : <TrendingUpIcon size={32} style={{ color: '#4caf50' }} />}
          </span>
            <div className={styles.scoreBannerTitle}>Báo cáo Kết quả Thi thử TOEIC</div>
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

            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Thời gian làm bài: {Math.floor(resultSummary.durationSeconds / 60)} phút{' '}
              {resultSummary.durationSeconds % 60} giây
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

          <div className={styles.resultsActions}>
            <Link href="/study-plan" className={styles.primaryActionBtn || styles.secondaryBtn} style={{ background: 'var(--primary)', color: '#fff', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <ZapIcon size={16} /> Lộ trình đã tối ưu thích ứng
            </Link>
            <button className={styles.secondaryBtn} onClick={() => setIsReviewMode(true)}>
              <SearchIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Xem lại toàn bộ bài thi & Lời giải
            </button>
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
            ETS 2022 - Test 1 {isReviewMode && <span style={{ color: 'var(--primary)' }}>(Review Mode)</span>}
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
              onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
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
              onClick={() => setCurrentIndex((idx) => Math.min(questions.length - 1, idx + 1))}
              disabled={currentIndex === questions.length - 1}
            >
              Câu sau →
            </button>
          </div>
        </section>

        {/* Navigator Palette */}
        <aside className={styles.navigatorCard}>
          <div className={styles.navTabs}>
            <button
              type="button"
              className={`${styles.navTabBtn} ${navTab === 'all' ? styles.activeTab : ''}`}
              onClick={() => setNavTab('all')}
            >
              Tất cả (200)
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
                    if (foundIndex !== -1) setCurrentIndex(foundIndex);
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
    </div>
  );
}
