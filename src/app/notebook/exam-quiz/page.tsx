'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { fetchMistakeQuestions, LoadedQuestion } from '@/utils/questionFetcher';
import { isDueForReview } from '@/utils/spacedRepetition';
import ListeningAudioPlayer from '@/components/ListeningAudioPlayer';
import PracticeFooter from '@/components/PracticeFooter';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import Confetti from '@/components/Confetti';
import { soundEffects } from '@/utils/soundEffects';
import {
  RotateCcwIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
} from '@/components/icons/AppIcons';
import styles from './page.module.css';

export default function ExamMistakeQuizPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang khởi tạo bài luyện tập...</div>}>
      <ExamMistakeQuizContent />
    </Suspense>
  );
}

const PART_NAMES: Record<string, string> = {
  p1: 'Part 1: Photographs',
  part1: 'Part 1: Photographs',
  p2: 'Part 2: Question-Response',
  part2: 'Part 2: Question-Response',
  p3: 'Part 3: Conversations',
  part3: 'Part 3: Conversations',
  p4: 'Part 4: Short Talks',
  part4: 'Part 4: Short Talks',
  p5: 'Part 5: Sentences',
  part5: 'Part 5: Sentences',
  p6: 'Part 6: Text Completion',
  part6: 'Part 6: Text Completion',
  p7: 'Part 7: Reading Comprehension',
  part7: 'Part 7: Reading Comprehension',
};

function ExamMistakeQuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterPart = searchParams.get('part') || 'all';
  const filterType = searchParams.get('filter') || 'all'; // 'due' or 'all'
  const targetId = searchParams.get('id');

  const { mounted, mistakes, updateMistakeProgress, getMistakes } = useMistakeNotebook();

  const [questions, setQuestions] = useState<LoadedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [clearedCount, setClearedCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);

  // Load and filter mistake questions
  useEffect(() => {
    if (!mounted) return;

    const loadQuestions = async () => {
      setLoading(true);
      try {
        const allIds = getMistakes();
        let targetMistakeIds = allIds.filter((id) => mistakes[id]?.type === 'exam');

        // Filter by specific question id if requested
        if (targetId) {
          targetMistakeIds = targetMistakeIds.filter((id) => id === targetId);
        } else {
          // Filter by part if specified
          if (filterPart !== 'all') {
            const filterNum = filterPart.replace(/^p(art)?/, '');
            targetMistakeIds = targetMistakeIds.filter((id) => {
              const m = mistakes[id];
              const pNum = (m?.part || '').replace(/^p(art)?/, '');
              return pNum === filterNum;
            });
          }

          // Filter by due date if specified
          if (filterType === 'due') {
            targetMistakeIds = targetMistakeIds.filter((id) => {
              const m = mistakes[id];
              return m?.nextReviewDate && isDueForReview(m.nextReviewDate);
            });
          }
        }

        if (targetMistakeIds.length === 0) {
          setQuestions([]);
          setLoading(false);
          return;
        }

        // Limit to 20 questions per session for manageable cognitive load
        const sessionIds = targetMistakeIds.sort(() => 0.5 - Math.random()).slice(0, 20);
        const loaded = await fetchMistakeQuestions(sessionIds, mistakes);

        setQuestions(loaded);
      } catch (err) {
        console.error('Failed to load mistake questions:', err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [mounted, filterPart, filterType, targetId, getMistakes, mistakes]);

  const currentQ = questions[currentIndex];
  const isAnswered = showAnswer;
  const isCorrect = selectedAnswer === currentQ?.qData?.correctAnswer;

  const handleSelectAnswer = useCallback(
    (key: string) => {
      if (showAnswer || !currentQ) return;

      setSelectedAnswer(key);
      setShowAnswer(true);

      const correct = key === currentQ.qData.correctAnswer;
      if (correct) {
        setScore((prev) => prev + 1);
        setClearedCount((prev) => prev + 1);
      }

      // Update Spaced Repetition progress in notebook
      updateMistakeProgress(currentQ.mistakeId, correct);
    },
    [showAnswer, currentQ, updateMistakeProgress]
  );

  const handleNext = useCallback(() => {
    setTutorContext(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setIsFinished(true);
      if (score / questions.length >= 0.7) {
        setShowConfetti(true);
        soundEffects.playVictory();
      }
    }
  }, [currentIndex, questions.length, score]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (isFinished || questions.length === 0 || tutorContext) return;

      const key = e.key.toUpperCase();
      if (!showAnswer) {
        if (['A', 'B', 'C', 'D'].includes(key)) {
          handleSelectAnswer(key);
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAnswer, isFinished, questions.length, tutorContext, handleSelectAnswer, handleNext]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="spinner" />
        <p>Đang tải câu hỏi cần khắc phục...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className={styles.container}>
        <div className={`${styles.finishedCard} card-minimal animate-slide-up`}>
          <CheckCircleIcon size={56} style={{ color: 'var(--success)' }} />
          <h2>Không có câu hỏi nào cần ôn!</h2>
          <p className={styles.finishedMessage}>
            {filterType === 'due'
              ? 'Tất cả câu hỏi trong mục này đều chưa tới hạn ôn tập.'
              : 'Bạn không có lỗi sai nào trong phần đã chọn. Rất tuyệt vời!'}
          </p>
          <div className={styles.finishedActions}>
            <Link href="/notebook" className="btn-primary">
              Về Sổ tay lỗi sai
            </Link>
            <Link href="/" className="btn-secondary">
              Về Trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Finished Results Screen
  if (isFinished) {
    const percent = Math.round((score / questions.length) * 100);

    return (
      <div className={styles.container}>
        <Confetti show={showConfetti} />
        <div className={`${styles.finishedCard} card-minimal animate-slide-up`}>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreNumber}>{score}/{questions.length}</span>
            <span className={styles.scoreLabel}>ĐÚNG</span>
          </div>

          <h2 style={{ margin: 0 }}>
            {percent >= 80 ? 'Xuất sắc! Điểm yếu đã được khắc phục!' : percent >= 50 ? 'Khá tốt! Tiến bộ rõ rệt!' : 'Đừng nản chí! Luyện thêm lần nữa nhé!'}
          </h2>

          <p className={styles.finishedMessage}>
            Bạn đã chuộc lỗi thành công <strong>{clearedCount}</strong> câu hỏi. Các câu trả lời đúng đã được thăng hạng trong hệ thống Spaced Repetition.
          </p>

          <div className={styles.resultStatsRow}>
            <div className={styles.statPill}>
              <span className={styles.statPillVal} style={{ color: 'var(--success)' }}>{score}</span>
              <span className={styles.statPillLabel}>Câu đúng</span>
            </div>
            <div className={styles.statPill}>
              <span className={styles.statPillVal} style={{ color: 'var(--danger)' }}>{questions.length - score}</span>
              <span className={styles.statPillLabel}>Cần ôn lại</span>
            </div>
            <div className={styles.statPill}>
              <span className={styles.statPillVal} style={{ color: 'var(--primary)' }}>{percent}%</span>
              <span className={styles.statPillLabel}>Độ chính xác</span>
            </div>
          </div>

          <div className={styles.finishedActions}>
            <button
              onClick={() => {
                setIsFinished(false);
                setCurrentIndex(0);
                setScore(0);
                setClearedCount(0);
                setShowAnswer(false);
                setSelectedAnswer(null);
              }}
              className="btn-primary"
            >
              <RotateCcwIcon size={16} style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline' }} />
              Luyện tập lại lượt mới
            </button>
            <Link href="/notebook" className="btn-secondary">
              Về Sổ tay lỗi sai
            </Link>
            <Link href="/" className="btn-secondary">
              Về Trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const qData = currentQ.qData;
  const partTitle = PART_NAMES[currentQ.part] || currentQ.part;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const openAITutor = () => {
    setTutorContext({
      partTitle,
      number: qData.number,
      text: qData.text,
      options: qData.options,
      correctAnswer: qData.correctAnswer,
      userAnswer: selectedAnswer || '',
      transcript: qData.transcript,
      passageText: qData.passageText,
      explanation: qData.explanation,
      audioUrl: qData.audioUrl,
    });
  };

  return (
    <div className={styles.container}>
      {/* Header bar with progress */}
      <header className={styles.header}>
        <div className={styles.topRow}>
          <Link href="/notebook" className={styles.backBtn}>
            ← Sổ tay lỗi sai
          </Link>
          <div className={styles.badgeRow}>
            <span className={styles.partBadge}>{partTitle}</span>
            <span className={styles.wrongBadge}>Đã sai {currentQ.wrongCount} lần</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Câu {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <div className={styles.progressBarBg}>
          <div className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
        </div>
      </header>

      {/* Question Card */}
      <div className={`${styles.questionCard} animate-fade-in`}>
        {/* Reading Passage (Part 6, 7) */}
        {qData.passageText && (
          <div
            className={styles.passageBox}
            dangerouslySetInnerHTML={{ __html: qData.passageText }}
          />
        )}

        {/* Listening Audio (Part 1, 2, 3, 4) */}
        {qData.audioUrl && (
          <div className={styles.audioWrapper}>
            <ListeningAudioPlayer
              src={qData.audioUrl}
              autoPlay={false}
              transcript={isAnswered ? qData.transcript : undefined}
            />
          </div>
        )}

        {/* Question Image (Part 1, 3, 4, 7) */}
        {qData.image && (
          <div className={styles.imageWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qData.image} alt={`Question ${qData.number}`} className={styles.questionImage} />
          </div>
        )}

        {/* Question Text */}
        {qData.text && (
          <h2 className={styles.questionText}>
            {qData.number}. {qData.text}
          </h2>
        )}

        {/* Options list */}
        <div className={styles.optionsGrid}>
          {qData.options &&
            Object.entries(qData.options).map(([key, text]) => {
              let optionClass = styles.optionBtn;
              if (isAnswered) {
                if (key === qData.correctAnswer) {
                  optionClass = `${styles.optionBtn} ${styles.optionCorrect}`;
                } else if (key === selectedAnswer) {
                  optionClass = `${styles.optionBtn} ${styles.optionWrong}`;
                }
              }

              return (
                <button
                  key={key}
                  className={optionClass}
                  onClick={() => handleSelectAnswer(key)}
                  disabled={isAnswered}
                  type="button"
                >
                  <span className={styles.optionLetter}>{key}</span>
                  <span className={styles.optionText}>{text as string}</span>
                </button>
              );
            })}
        </div>

        {/* Inline Explanation if answered */}
        {isAnswered && qData.explanation && (
          <div className={`${styles.explanationCard} animate-slide-up`}>
            <div className={styles.explanationTitle}>
              <SparklesIcon size={16} /> Giải thích chi tiết:
            </div>
            <div
              style={{ margin: 0 }}
              dangerouslySetInnerHTML={{ __html: qData.explanation }}
            />
          </div>
        )}
      </div>

      {/* Floating Bottom Practice Footer */}
      <PracticeFooter
        isAnswered={isAnswered}
        isCorrect={isCorrect}
        correctMessage="Chính xác! Bạn đã hiểu và khắc phục được câu này (+1 Box)."
        incorrectMessage={`Chưa đúng rồi! Đáp án chính xác là ${qData.correctAnswer}.`}
        onNext={handleNext}
        onAITutor={openAITutor}
        nextLabel={currentIndex < questions.length - 1 ? 'Tiếp tục' : 'Xem kết quả'}
      />

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
