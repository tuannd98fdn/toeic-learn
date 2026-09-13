'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Part1Question, Part1DataSchema } from '@/schema/toeic';
import ListeningAudioPlayer from '@/components/ListeningAudioPlayer';
import Confetti from '@/components/Confetti';
import { 
  HeadphonesIcon,
  AwardIcon,
  ThumbsUpIcon,
  RotateCcwIcon,
  HomeIcon,
  EyeIcon,
  LightbulbIcon,
  FileTextIcon,
  BookIcon,
  ArrowRightIcon,
  AlertCircleIcon,
  ExamIcon,
} from '@/components/icons/AppIcons';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { useLeaveWarning } from '@/hooks/useLeaveWarning';
import { storage } from '@/utils/storage';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import PracticeFooter from '@/components/PracticeFooter';
import InteractiveTranscript from '@/components/InteractiveTranscript';
import DictationTrainer from '@/components/DictationTrainer';
import { parseTranscript } from '@/utils/transcriptParser';
import styles from './page.module.css';

export default function Part1Page() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang tải Part 1 Photographs...</div>}>
      <Part1Trainer />
    </Suspense>
  );
}

function Part1Trainer() {
  const searchParams = useSearchParams();
  const testId = searchParams.get('test') || 'ets2022_test1';

  const [questions, setQuestions] = useState<Part1Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);
  const [practiceMode, setPracticeMode] = useState<'standard' | 'dictation' | 'transcript'>('standard');

  const { addMistake } = useMistakeNotebook();
  useLeaveWarning(currentIndex > 0 && !isFinished);

  useEffect(() => {
    const fetchPart1 = async () => {
      try {
        setLoading(true);
        const match = testId.match(/ets(\d+)_test(\d+)/);
        if (!match) throw new Error('Invalid test ID format');

        const res = await fetch(`/data/ets${match[1]}/test${match[2]}/part1.json`);
        if (!res.ok) throw new Error('Không thể tải dữ liệu Part 1');

        const data = await res.json();
        const validated = Part1DataSchema.parse(data);
        setQuestions(validated);
      } catch (err: any) {
        console.error('Error loading Part 1:', err);
        setError(err.message || 'Lỗi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchPart1();
  }, [testId]);

  const currentQ = questions[currentIndex] || null;

  const handleSelectOption = (letter: string) => {
    if (isAnswered || !currentQ) return;
    setSelectedAnswer(letter);
    setIsAnswered(true);

    const isCorrect = letter === currentQ.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      addMistake(`exam_${testId}_part1_${currentQ.id}`, {
        type: 'exam',
        testId: testId,
        part: 'part1',
        questionId: currentQ.id
      });
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowTranscript(false);
    } else {
      setIsFinished(true);
      storage.set(`progress_${testId}_part1`, true);
      if ((score / questions.length) >= 0.7) {
        setShowConfetti(true);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowTranscript(false);
    setScore(0);
    setIsFinished(false);
    setShowConfetti(false);
  };

  // Keyboard Shortcuts for 10/10 UX
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (isFinished || questions.length === 0 || tutorContext) return;

      const key = e.key.toUpperCase();
      if (!isAnswered) {
        if (['A', 'B', 'C', 'D'].includes(key)) {
          if (currentQ?.options && currentQ.options[key as keyof typeof currentQ.options]) {
            handleSelectOption(key);
          }
        }
      } else {
        if (e.key === 'Enter' || e.key === 'ArrowRight') {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (loading) {
    return (
      <div className={styles.container}>
        <div className="skeleton" style={{ height: 20, width: '40%', marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 12, width: '60%', marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 6, width: '100%', marginBottom: 24, borderRadius: 3 }} />
        <div className="skeleton" style={{ height: 260, width: '100%', marginBottom: 16, borderRadius: 12 }} />
        <div className="skeleton" style={{ height: 48, width: '100%', marginBottom: 8, borderRadius: 10 }} />
        <div className="skeleton" style={{ height: 48, width: '100%', marginBottom: 8, borderRadius: 10 }} />
        <div className="skeleton" style={{ height: 48, width: '100%', marginBottom: 8, borderRadius: 10 }} />
        <div className="skeleton" style={{ height: 48, width: '100%', borderRadius: 10 }} />
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className={styles.errorState}>
        <AlertCircleIcon size={36} style={{ color: 'var(--warning, #f59e0b)', marginBottom: 8 }} />
        <p>{error || 'Không tìm thấy câu hỏi Part 1 nào.'}</p>
        <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
      </div>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className={styles.container}>
        <Confetti show={showConfetti} />
        <div className={styles.resultsCard} style={{ margin: '40px auto', maxWidth: 600, padding: 40, textAlign: 'center', backgroundColor: 'var(--glass-bg)', borderRadius: 24, border: '1px solid var(--border)', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            backgroundColor: percentage >= 70 ? 'var(--success-light, rgba(34, 197, 94, 0.15))' : 'var(--primary-light, rgba(59, 130, 246, 0.15))',
            color: percentage >= 70 ? 'var(--success, #22c55e)' : 'var(--primary, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
          }}>
            {percentage >= 70 ? <AwardIcon size={38} /> : <BookIcon size={38} />}
          </div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: 16, color: 'var(--foreground)' }}>Hoàn thành Part 1 Photographs!</h1>
          <div style={{ backgroundColor: 'var(--surface-hover)', padding: '16px 24px', borderRadius: 12, display: 'inline-block', marginBottom: 24 }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Kết quả: {score} / {questions.length} ({percentage}%)</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.6 }}>
            {percentage >= 80 ? 'Tuyệt vời! Bạn có kỹ năng quan sát rất nhạy bén.' :
             percentage >= 50 ? 'Khá tốt! Hãy chú ý kỹ hơn vào các chi tiết nhỏ trong hình nhé.' :
             'Đừng nản chí! Nghe nhiều sẽ giúp bạn quen với các từ vựng mô tả hình ảnh.'}
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/part2?test=${testId}`} className="btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              HỌC TIẾP: Part 2 (Hỏi - Đáp) <ArrowRightIcon size={18} />
            </Link>
            <button onClick={handleRestart} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <RotateCcwIcon size={16} /> Làm lại đề này
            </button>
            <Link href="/" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <HomeIcon size={16} /> Về Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.navRow}>
          <Link href="/" className={styles.backLink}>← Về Dashboard</Link>
          <span className={styles.testBadge}>{testId.toUpperCase()}</span>
        </div>

        <div className={styles.progressInfo}>
          <span>Part 1: Photographs</span>
          <span>Câu {currentIndex + 1} / {questions.length}</span>
        </div>

        <div className={styles.progressBarBg}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </header>

      <div className={styles.card}>
        <div className={styles.modeTabsContainer}>
          <button
            type="button"
            className={`${styles.modeTabBtn} ${practiceMode === 'standard' ? styles.activeModeTab : ''}`}
            onClick={() => setPracticeMode('standard')}
          >
            <ExamIcon size={16} /> Làm bài ETS
          </button>
          <button
            type="button"
            className={`${styles.modeTabBtn} ${practiceMode === 'dictation' ? styles.activeModeTab : ''}`}
            onClick={() => setPracticeMode('dictation')}
          >
            <HeadphonesIcon size={16} /> Chép chính tả (Dictation)
          </button>
          <button
            type="button"
            className={`${styles.modeTabBtn} ${practiceMode === 'transcript' ? styles.activeModeTab : ''}`}
            onClick={() => setPracticeMode('transcript')}
          >
            <FileTextIcon size={16} /> Lời thoại tương tác
          </button>
        </div>

        {currentQ.image && (
          <div className={styles.imageWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentQ.image}
              alt={`TOEIC Part 1 - Question ${currentQ.number}`}
              className={styles.questionImage}
              loading="eager"
            />
          </div>
        )}

        <ListeningAudioPlayer
          src={currentQ.audioUrl}
          title={`Audio Câu ${currentQ.number}`}
          autoPlay={true}
          transcript={isAnswered ? currentQ.transcript : undefined}
        />

        {practiceMode === 'dictation' ? (
          <DictationTrainer
            lines={parseTranscript(currentQ.transcript || '', 'part1', currentQ.correctAnswer)}
            audioUrl={currentQ.audioUrl}
            title={`Chép chính tả Câu ${currentQ.number}`}
            onBackToStandard={() => setPracticeMode('standard')}
          />
        ) : practiceMode === 'transcript' ? (
          <InteractiveTranscript
            transcriptHtml={currentQ.transcript}
            part="part1"
            correctAnswer={currentQ.correctAnswer}
            title={`Lời thoại tương tác Câu ${currentQ.number}`}
            onStartDictation={() => setPracticeMode('dictation')}
          />
        ) : (
          <>
            <div className={styles.optionsGrid}>
              {['A', 'B', 'C', 'D'].map((letter) => {
                let stateClass = '';
                if (isAnswered) {
                  if (letter === currentQ.correctAnswer) stateClass = styles.correct;
                  else if (letter === selectedAnswer) stateClass = styles.incorrect;
                } else if (selectedAnswer === letter) {
                  stateClass = styles.selected;
                }

                return (
                  <button
                    key={letter}
                    type="button"
                    className={`${styles.optionBtn} ${stateClass}`}
                    onClick={() => handleSelectOption(letter)}
                    disabled={isAnswered}
                  >
                    <span className={styles.optionLetter}>{letter}</span>
                    <span>{currentQ.options[letter] || `Option (${letter})`}</span>
                  </button>
                );
              })}
            </div>

            {isAnswered && currentQ.transcript && (
              <div style={{ marginTop: '1rem' }}>
                <InteractiveTranscript
                  transcriptHtml={currentQ.transcript}
                  explanationHtml={currentQ.explanation}
                  part="part1"
                  correctAnswer={currentQ.correctAnswer}
                  title={`Lời thoại & Giải thích Câu ${currentQ.number}`}
                  onStartDictation={() => setPracticeMode('dictation')}
                />
              </div>
            )}
          </>
        )}
      </div>

      <PracticeFooter
        isAnswered={isAnswered}
        isCorrect={selectedAnswer === currentQ.correctAnswer}
        correctMessage="Phản xạ nghe rất tốt!"
        incorrectMessage={`Đáp án đúng là (${currentQ.correctAnswer})`}
        onNext={handleNext}
        onAITutor={() => setTutorContext({
          partTitle: 'Part 1: Photographs',
          number: currentQ.number,
          text: 'Look at the photograph and choose the statement that best describes what you see.',
          options: currentQ.options,
          correctAnswer: currentQ.correctAnswer,
          userAnswer: selectedAnswer || undefined,
          transcript: currentQ.transcript,
          audioUrl: currentQ.audioUrl,
        })}
        nextLabel={currentIndex + 1 === questions.length ? 'Xem kết quả' : 'Câu tiếp theo →'}
      />

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
