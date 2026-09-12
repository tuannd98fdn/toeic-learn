'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Confetti from '@/components/Confetti';
import {
  ZapIcon,
  ThumbsUpIcon,
  AwardIcon,
  SearchIcon,
  HomeIcon,
  StatsIcon,
  FlagIcon,
  ClockIcon,
} from '@/components/icons/AppIcons';
import ListeningAudioPlayer from '@/components/ListeningAudioPlayer';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { storage } from '@/utils/storage';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import styles from './page.module.css';

interface UnifiedQuestion {
  id: string;
  number: number;
  part: 'p2' | 'p5';
  partTitle: string;
  text: string;
  audioUrl?: string;
  options: Record<string, string>;
  correctAnswer: string;
  explanation?: string;
  transcript?: string;
  subCategory?: string;
  grammarTag?: string;
}

const TOTAL_TIME = 15 * 60; // 15 minutes

export default function MiniTestPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang khởi tạo Mini Test...</div>}>
      <MiniTestSimulation />
    </Suspense>
  );
}

function MiniTestSimulation() {
  const searchParams = useSearchParams();
  const testParam = searchParams.get('test') || 'ets2022_test1';
  const match = testParam.match(/ets(\d+)_test(\d+)/);
  const pathBase = match ? `/data/ets${match[1]}/test${match[2]}` : `/data/ets2022/test1`;

  const [questions, setQuestions] = useState<UnifiedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Progress
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  // Timer
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Result
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [scoreData, setScoreData] = useState({ correct: 0, total: 20 });

  const { addMistake } = useMistakeNotebook();

  // Load and randomize questions
  useEffect(() => {
    const loadMiniTest = async () => {
      try {
        setLoading(true);
        const responses = await Promise.all([
          fetch(`${pathBase}/part2.json`),
          fetch(`${pathBase}/part5.json`),
        ]);

        if (responses.some((r) => !r.ok)) {
          throw new Error('Không thể tải dữ liệu câu hỏi');
        }

        const [p2, p5] = await Promise.all(responses.map((r) => r.json()));

        // Shuffle helper
        const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);

        const selectedP2 = shuffle(p2).slice(0, 10);
        const selectedP5 = shuffle(p5).slice(0, 10);

        const unified: UnifiedQuestion[] = [];

        selectedP2.forEach((q: any, i: number) => {
          unified.push({
            id: q.id,
            number: i + 1,
            part: 'p2',
            partTitle: 'Part 2: Phản xạ Hỏi - Đáp',
            text: 'Listen to the question or statement and choose the best response.',
            audioUrl: q.audioUrl,
            options: q.options,
            correctAnswer: q.correctAnswer,
            transcript: q.transcript,
            explanation: q.explanation,
          });
        });

        selectedP5.forEach((q: any, i: number) => {
          unified.push({
            id: q.id,
            number: i + 11,
            part: 'p5',
            partTitle: 'Part 5: Điền từ vào chỗ trống',
            text: q.text,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            subCategory: q.subCategory || q.type,
            grammarTag: q.grammarTag,
          });
        });

        setQuestions(unified);
        setScoreData(prev => ({ ...prev, total: unified.length }));
      } catch (err: any) {
        console.error('Error loading mini test:', err);
        setError(err.message || 'Không thể tạo Mini Test');
      } finally {
        setLoading(false);
      }
    };

    loadMiniTest();
  }, [pathBase]);

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
  }, [loading, isSubmitted, isPaused]);

  const formatTimer = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  const handleSelectOption = (letter: string) => {
    if (isSubmitted && !isReviewMode) return;
    const currentQ = questions[currentIndex];
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.number]: letter,
    }));
  };

  const toggleFlag = () => {
    const num = questions[currentIndex].number;
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

    let correct = 0;
    questions.forEach((q) => {
      const isCorrect = userAnswers[q.number] === q.correctAnswer;
      if (isCorrect) {
        correct++;
      } else {
        addMistake(`minitest_${q.part}_${q.id}`, {
          type: 'exam',
          testId: testParam,
          part: q.part === 'p2' ? 'part2' : 'part5',
          questionId: q.id,
          subCategory: q.subCategory,
          grammarTag: q.grammarTag,
        });
      }
    });

    setScoreData({ correct, total: questions.length });
    setIsSubmitted(true);
    
    // Streak interaction
    const today = new Date().toISOString().split('T')[0];
    const studiedDays = storage.get<string[]>('toeic_study_days', []);
    if (!studiedDays.includes(today)) {
      storage.set('toeic_study_days', [...studiedDays, today]);
    }

    if (correct >= questions.length * 0.7) {
      setShowConfetti(true);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <span>⏳ Đang tạo đề thi Mini (20 câu)...</span>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className={styles.errorState}>
        <p>⚠️ {error || 'Lỗi dữ liệu'}</p>
        <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isCurrentFlagged = flaggedQuestions.has(currentQ.number);
  const currentAnswer = userAnswers[currentQ.number];

  // ------------------- RESULTS SCREEN -------------------
  if (isSubmitted && !isReviewMode) {
    const accuracy = Math.round((scoreData.correct / scoreData.total) * 100);
    return (
      <div className={styles.container}>
        <Confetti show={showConfetti} />
        <div className={styles.resultsContainer}>
          <div className={styles.scoreBannerCard}>
            <span className={styles.accuracyIcon}>
              {accuracy >= 80 ? <ZapIcon size={32} style={{ color: '#ff9800' }} /> : 
               accuracy >= 50 ? <ThumbsUpIcon size={32} style={{ color: '#4caf50' }} /> : 
               <AwardIcon size={32} style={{ color: '#2196f3' }} />}
            </span>
            <div className={styles.scoreBannerTitle}>Hoàn thành Mini Test!</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span className={styles.totalScoreBadge}>{scoreData.correct}</span>
              <span className={styles.totalScoreMax}>/ {scoreData.total} đúng</span>
            </div>
            
            <div className={styles.cefrBadge} style={{ background: accuracy >= 70 ? 'var(--success)' : 'var(--warning)' }}>
              Độ chính xác: {accuracy}%
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '20px' }}>
              Thời gian làm bài: {Math.floor((TOTAL_TIME - timeLeft) / 60)} phút{' '}
              {(TOTAL_TIME - timeLeft) % 60} giây
            </div>
          </div>

          <div className={styles.resultsActions}>
            <button className={styles.secondaryBtn} onClick={() => setIsReviewMode(true)}>
              <SearchIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Xem lại giải thích
            </button>
            <Link href="/" className={styles.secondaryBtn}>
              <HomeIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Về Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ------------------- SIMULATION INTERFACE -------------------
  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <div className={styles.barLeft}>
          <Link href="/" className={styles.quitLink} onClick={(e) => {
            if (!isSubmitted && !window.confirm('Bạn có muốn thoát Mini Test? Dữ liệu chưa nộp sẽ bị mất.')) {
              e.preventDefault();
            }
          }}>
            Thoát
          </Link>
          <div className={styles.testTitle}>
            Daily 15-Min Mini Test {isReviewMode && <span style={{ color: 'var(--primary)' }}>(Review)</span>}
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
            <button type="button" className={styles.primaryBtn} style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }} onClick={() => setIsReviewMode(false)}>
              Bảng điểm <StatsIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
            </button>
          </div>
        )}

        <div className={styles.barRight}>
          <span className={styles.progressBadge}>
            Đã làm: <strong>{Object.keys(userAnswers).length}</strong> / {questions.length}
          </span>
          {!isSubmitted && (
            <button
              type="button"
              className={styles.submitExamBtn}
              onClick={() => {
                if (window.confirm('Nộp bài ngay lập tức?')) handleSubmitExam();
              }}
            >
              Nộp bài <FlagIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
            </button>
          )}
        </div>
      </header>

      <main className={styles.examLayout}>
        <section className={styles.questionArea}>
          <div className={styles.questionMeta}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className={styles.partBadge}>{currentQ.partTitle}</span>
              <strong style={{ fontSize: '1.1rem' }}>Câu #{currentQ.number}</strong>
            </div>

            <button
              type="button"
              className={`${styles.flagBtn} ${isCurrentFlagged ? styles.flagged : ''}`}
              onClick={toggleFlag}
            >
              <FlagIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px', fill: isCurrentFlagged ? 'currentColor' : 'none' }} /> {isCurrentFlagged ? 'Đã gắn cờ' : 'Đánh dấu'}
            </button>
          </div>

          {currentQ.audioUrl && (
            <ListeningAudioPlayer src={currentQ.audioUrl} title={`Audio Câu ${currentQ.number}`} autoPlay={false} />
          )}

          <div className={styles.questionTitle}>{currentQ.text}</div>

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
            </div>
          )}

          <div className={styles.navActionRow}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
              disabled={currentIndex === 0}
            >
              Trước
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
              Sau
            </button>
          </div>
        </section>

        <aside className={styles.navigatorCard}>
          <div className={styles.navTabs}>
             <span style={{fontWeight: 'bold', padding: '10px 0'}}>Điều hướng</span>
          </div>
          <div className={styles.gridNav}>
            {questions.map((q) => {
              const isAns = !!userAnswers[q.number];
              const isFlag = flaggedQuestions.has(q.number);
              const isActive = q.number === currentQ.number;
              let stateClass = '';

              if (isReviewMode) {
                stateClass = userAnswers[q.number] === q.correctAnswer ? styles.gridCorrect : styles.gridWrong;
              } else if (isAns) {
                stateClass = styles.gridAnswered;
              } else if (isFlag) {
                stateClass = styles.gridFlagged;
              }

              return (
                <button
                  key={q.number}
                  type="button"
                  className={`${styles.gridBtn} ${stateClass} ${isActive ? styles.gridActive : ''}`}
                  onClick={() => setCurrentIndex(q.number - 1)}
                >
                  {q.number}
                </button>
              );
            })}
          </div>
        </aside>
      </main>
    </div>
  );
}
