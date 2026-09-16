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
  ArrowLeftIcon,
  CheckCircleIcon,
  SparklesIcon,
  HelpCircleIcon,
  LightbulbIcon,
  ShieldCheckIcon,
} from '@/components/icons/AppIcons';
import { completeActiveTaskByType, AutoCompleteTaskResult } from '@/utils/studyPlanEngine';
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
  const filterRootCause = searchParams.get('rootCause');

  const { mounted, mistakes, updateMistakeProgress, masterMistake, getMistakes } = useMistakeNotebook();

  const [questions, setQuestions] = useState<LoadedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showClueHint, setShowClueHint] = useState(false);
  const [masteredThisSession, setMasteredThisSession] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);
  const [clearedCount, setClearedCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);
  const [sessionKey, setSessionKey] = useState(0);
  const [nextRoutine, setNextRoutine] = useState<AutoCompleteTaskResult | null>(null);

  // Load and filter mistake questions once per practice session
  useEffect(() => {
    if (!mounted) return;

    let isCancelled = false;

    const loadQuestions = async () => {
      setLoading(true);
      try {
        const allIds = getMistakes();
        let targetMistakeIds = allIds.filter((id) => mistakes[id]?.type === 'exam');

        // Filter by specific question id if requested
        if (targetId) {
          targetMistakeIds = targetMistakeIds.filter((id) => id === targetId);
        } else {
          // Filter by root cause if specified
          if (filterRootCause) {
            const matchedRootCause = targetMistakeIds.filter((id) => {
              const m = mistakes[id];
              return m?.rootCause === filterRootCause;
            });
            // Prioritize unmastered questions in this root cause if available
            const unmastered = matchedRootCause.filter((id) => !mistakes[id]?.isMastered);
            targetMistakeIds = unmastered.length > 0 ? unmastered : matchedRootCause;
          }

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
          if (!isCancelled) {
            setQuestions([]);
            setLoading(false);
          }
          return;
        }

        // Limit to 20 questions per session for manageable cognitive load
        const sessionIds = targetMistakeIds.sort(() => 0.5 - Math.random()).slice(0, 20);
        const loaded = await fetchMistakeQuestions(sessionIds, mistakes);

        if (!isCancelled) {
          setQuestions(loaded);
          setCurrentIndex(0);
          setSelectedAnswer(null);
          setShowAnswer(false);
          setShowClueHint(false);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load mistake questions:', err);
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadQuestions();

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, filterPart, filterType, targetId, filterRootCause, sessionKey]);

  const currentQ = questions[currentIndex];
  const isAnswered = showAnswer;
  const isCorrect = selectedAnswer === currentQ?.qData?.correctAnswer;

  const handleSelectAnswer = useCallback(
    (key: string) => {
      if (showAnswer || !currentQ) return;

      setSelectedAnswer(key);
      setShowAnswer(true);

      const correct = key.trim().toUpperCase() === currentQ.qData.correctAnswer?.trim().toUpperCase();
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
    setShowClueHint(false);
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
      const autoRes = completeActiveTaskByType('review');
      setNextRoutine(autoRes);
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

          {nextRoutine?.isDayCompleted && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.12), rgba(59, 130, 246, 0.12))',
              border: '1px solid var(--success)',
              borderRadius: '16px',
              padding: '16px 20px',
              margin: '16px 0',
              textAlign: 'center',
            }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--success)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '4px' }}>
                <CheckCircleIcon size={16} />
                <span>BƯỚC 03 HOÀN THÀNH • MỤC TIÊU HÔM NAY ĐẠT 100% (+50 XP)</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--foreground)' }}>
                Bạn đã xuất sắc hoàn thành trọn vẹn 3 bước của Ngày hôm nay và giữ vững chuỗi Streak!
              </p>
            </div>
          )}

          <div className={styles.finishedActions}>
            {nextRoutine?.isDayCompleted ? (
              <Link href="/" className="btn-primary">
                <CheckCircleIcon size={16} style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline' }} />
                Về Dashboard nhận thưởng
              </Link>
            ) : null}

            <button
              onClick={() => {
                setIsFinished(false);
                setCurrentIndex(0);
                setScore(0);
                setClearedCount(0);
                setShowAnswer(false);
                setSelectedAnswer(null);
                setShowClueHint(false);
                setMasteredThisSession({});
                setSessionKey((prev) => prev + 1);
              }}
              className={nextRoutine?.isDayCompleted ? 'btn-secondary' : 'btn-primary'}
            >
              <RotateCcwIcon size={16} style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline' }} />
              Luyện tập lại lượt mới
            </button>
            <Link href="/notebook" className="btn-secondary">
              Về Sổ tay lỗi sai
            </Link>
            {!nextRoutine?.isDayCompleted && (
              <Link href="/" className="btn-secondary">
                Về Trang chủ
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  const qData = currentQ.qData;
  const partTitle = PART_NAMES[currentQ.part] || currentQ.part;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const isCurrentMastered = currentQ.isMastered || !!masteredThisSession[currentQ.mistakeId];

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
      subCategory: currentQ.subCategory,
      grammarTag: currentQ.grammarTag,
      questionId: currentQ.questionId,
      testId: currentQ.testId,
      rootCause: currentQ.rootCause || filterRootCause || undefined,
    });
  };

  return (
    <div className={styles.container}>
      {/* Header bar with progress */}
      <header className={styles.header}>
        <div className={styles.topRow}>
          <Link href="/notebook" className={styles.backBtn}>
            <ArrowLeftIcon size={16} style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline' }} />
            Sổ tay lỗi sai
          </Link>
          <div className={styles.badgeRow}>
            {filterRootCause && (
              <span className={styles.rootCauseBadge}>Khắc phục: {filterRootCause}</span>
            )}
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
        <h2 className={styles.questionText}>
          {qData.number ? `Câu ${qData.number}` : ''}{qData.number && qData.text ? ': ' : ''}{qData.text || ''}
        </h2>

        {/* Clue Hint Scaffolding */}
        {!showAnswer && (
          <div className={styles.clueHintRow}>
            <button
              type="button"
              className={`${styles.clueHintToggleBtn} ${showClueHint ? styles.clueHintToggleBtnActive : ''}`}
              onClick={() => setShowClueHint((prev) => !prev)}
            >
              <HelpCircleIcon size={14} />
              <span>{showClueHint ? 'Ẩn manh mối' : 'Gợi ý manh mối tư duy'}</span>
            </button>
          </div>
        )}

        {showClueHint && !showAnswer && (
          <div className={`${styles.clueHintBox} animate-fade-in`}>
            <div className={styles.clueHintTitle}>
              <LightbulbIcon size={15} />
              <span>Manh Mối Tư Duy (Clue Hint)</span>
            </div>
            <p style={{ margin: 0 }}>
              {qData.clueHint ||
                `Quan sát ngữ cảnh câu: Câu này thuộc chuyên đề ${currentQ.subCategory || currentQ.grammarTag || 'ngữ pháp'}. Hãy chú ý các thành phần bổ ngữ và dấu hiệu liên từ để loại trừ phương án sai.`}
            </p>
          </div>
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

        {/* In-drill Remediation Graduation */}
        {isAnswered && isCorrect && (
          <div className={`${styles.remediationActionRow} animate-slide-up`}>
            <div className={styles.remediationInfo}>
              <span className={styles.remediationTitle}>
                {currentQ.rootCause ? `Khắc phục: ${currentQ.rootCause}` : 'Khắc phục lỗi sai'}
              </span>
              <span className={styles.remediationDesc}>
                {isCurrentMastered
                  ? 'Câu hỏi này đã được ghi nhận vào danh sách Đã Khắc Phục.'
                  : 'Đã nắm vững bản chất? Đánh dấu tốt nghiệp để tăng điểm thực chiến.'}
              </span>
            </div>
            {isCurrentMastered ? (
              <div className={styles.masterBtnDone}>
                <ShieldCheckIcon size={16} />
                <span>Đã nắm vững</span>
              </div>
            ) : (
              <button
                type="button"
                className={styles.masterBtn}
                onClick={() => {
                  masterMistake(currentQ.mistakeId);
                  setMasteredThisSession((prev) => ({ ...prev, [currentQ.mistakeId]: true }));
                  soundEffects.playCorrect();
                }}
              >
                <ShieldCheckIcon size={16} />
                <span>Đã khắc phục hoàn toàn</span>
              </button>
            )}
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
