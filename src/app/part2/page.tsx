'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Part2Question, Part2DataSchema } from '@/schema/toeic';
import ListeningAudioPlayer from '@/components/ListeningAudioPlayer';
import Confetti from '@/components/Confetti';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { useLeaveWarning } from '@/hooks/useLeaveWarning';
import { storage } from '@/utils/storage';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import { HeadphonesIcon, AlertCircleIcon, AwardIcon, BookIcon, RotateCcwIcon, HomeIcon } from '@/components/icons/AppIcons';
import PracticeFooter from '@/components/PracticeFooter';
import styles from './page.module.css';

export default function Part2Page() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang tải Part 2 Question-Response...</div>}>
      <Part2Trainer />
    </Suspense>
  );
}

function Part2Trainer() {
  const searchParams = useSearchParams();
  const testId = searchParams.get('test') || 'ets2022_test1';

  const [questions, setQuestions] = useState<Part2Question[]>([]);
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

  // Dictation states
  const [isDictationMode, setIsDictationMode] = useState(false);
  const [dictationText, setDictationText] = useState('');
  const [dictationChecked, setDictationChecked] = useState(false);

  const { addMistake } = useMistakeNotebook();
  useLeaveWarning(currentIndex > 0 && !isFinished);

  useEffect(() => {
    const fetchPart2 = async () => {
      try {
        setLoading(true);
        const match = testId.match(/ets(\d+)_test(\d+)/);
        if (!match) throw new Error('Invalid test ID format');

        const res = await fetch(`/data/ets${match[1]}/test${match[2]}/part2.json`);
        if (!res.ok) throw new Error('Không thể tải dữ liệu Part 2');

        const data = await res.json();
        const validated = Part2DataSchema.parse(data);
        setQuestions(validated);
      } catch (err: any) {
        console.error('Error loading Part 2:', err);
        setError(err.message || 'Lỗi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchPart2();
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
      addMistake(`exam_${testId}_part2_${currentQ.id}`, {
        type: 'exam',
        testId: testId,
        part: 'part2',
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
      setDictationText('');
      setDictationChecked(false);
    } else {
      setIsFinished(true);
      storage.set(`progress_${testId}_part2`, true);
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
    setDictationText('');
    setDictationChecked(false);
  };

  // Keyboard Shortcuts for 10/10 UX
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (isFinished || questions.length === 0 || tutorContext) return;

      const key = e.key.toUpperCase();
      if (!isAnswered) {
        if (['A', 'B', 'C'].includes(key)) {
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
        <div className="skeleton" style={{ height: 12, width: '55%', marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 6, width: '100%', marginBottom: 24, borderRadius: 3 }} />
        <div className="skeleton" style={{ height: 64, width: '100%', marginBottom: 16, borderRadius: 12 }} />
        <div className="skeleton" style={{ height: 48, width: '100%', marginBottom: 8, borderRadius: 10 }} />
        <div className="skeleton" style={{ height: 48, width: '100%', marginBottom: 8, borderRadius: 10 }} />
        <div className="skeleton" style={{ height: 48, width: '100%', borderRadius: 10 }} />
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className={styles.errorState}>
        <p><AlertCircleIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />{error || 'Không tìm thấy câu hỏi Part 2 nào.'}</p>
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
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            {percentage >= 70 ? (
              <AwardIcon size={56} style={{ color: 'var(--primary)' }} />
            ) : (
              <BookIcon size={56} style={{ color: 'var(--text-secondary)' }} />
            )}
          </div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: 16, color: 'var(--foreground)' }}>Hoàn thành Part 2 Question-Response!</h1>
          <div style={{ backgroundColor: 'var(--surface-hover)', padding: '16px 24px', borderRadius: 12, display: 'inline-block', marginBottom: 24 }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Kết quả: {score} / {questions.length} ({percentage}%)</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.6 }}>
            {percentage >= 80
              ? 'Phản xạ bắt Wh-question và câu hỏi Yes/No gián tiếp của bạn rất xuất sắc!'
              : 'Hãy chú ý bẫy lặp từ (same-word trap) và câu trả lời gián tiếp (indirect answers)!'}
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button onClick={handleRestart} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <RotateCcwIcon size={16} /> Làm lại đề này
            </button>
            <Link href="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
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
          <span>Part 2: Question - Response (Hỏi - Đáp)</span>
          <span>Câu {currentQ.number} ({currentIndex + 1} / {questions.length})</span>
        </div>

        <div className={styles.progressBarBg}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </header>

      <div className={styles.card}>
        <div className={styles.promptSection}>
          <div>
            <div className={styles.promptTitle}><HeadphonesIcon size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />Lắng nghe câu hỏi và 3 câu trả lời</div>
            <div className={styles.promptHint}>Chọn câu đáp lại hợp lý nhất trong ngữ cảnh giao tiếp công việc</div>
          </div>
          <button
            type="button"
            className={`${styles.secondaryBtn} ${isDictationMode ? styles.active : ''}`}
            onClick={() => setIsDictationMode(!isDictationMode)}
            style={{ fontSize: '0.85rem', padding: '0.5rem', whiteSpace: 'nowrap' }}
          >
            {isDictationMode ? 'Đang bật Dictation' : 'Bật Dictation'}
          </button>
        </div>

        <ListeningAudioPlayer
          src={currentQ.audioUrl}
          title={`Audio Câu ${currentQ.number}`}
          autoPlay={true}
          transcript={isAnswered ? currentQ.transcript : undefined}
        />

        {isDictationMode && !dictationChecked && !isAnswered ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <textarea
              value={dictationText}
              onChange={(e) => setDictationText(e.target.value)}
              placeholder="Gõ những gì bạn nghe được vào đây (nháp)..."
              style={{ width: '100%', minHeight: '100px', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--foreground)', resize: 'vertical', fontSize: '1rem', lineHeight: '1.5', outline: 'none', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
            <button
              type="button"
              className={styles.submitBtn}
              onClick={() => {
                setDictationChecked(true);
                setShowTranscript(true);
              }}
            >
              Kiểm tra Transcript
            </button>
          </div>
        ) : (
          <div className={styles.optionsGrid}>
            {['A', 'B', 'C'].map((letter) => {
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
        )}

        {isAnswered && (
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              type="button"
              className={styles.secondaryBtn}
              style={{ alignSelf: 'flex-start', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
              onClick={() => setShowTranscript((prev) => !prev)}
            >
              {showTranscript ? 'Ẩn Transcript' : 'Xem Transcript & Lời giải'}
            </button>

            {showTranscript && currentQ.transcript && (
              <div className={styles.transcriptCard}>
                <div className={styles.transcriptHeader}>
                  <span>Lời thoại câu hỏi & 3 đáp án</span>
                  <span style={{ color: 'var(--success)', fontWeight: 700 }}>
                    Đáp án đúng: ({currentQ.correctAnswer})
                  </span>
                </div>
                <div
                  className={styles.transcriptBody}
                  dangerouslySetInnerHTML={{ __html: currentQ.transcript }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <PracticeFooter
        isAnswered={isAnswered}
        isCorrect={selectedAnswer === currentQ.correctAnswer}
        correctMessage="Phản xạ nghe cực nhanh!"
        incorrectMessage={`Đáp án đúng là (${currentQ.correctAnswer})`}
        onNext={handleNext}
        onAITutor={() => setTutorContext({
          partTitle: 'Part 2: Question-Response',
          number: currentQ.number,
          text: 'Listen to the question or statement and choose the best response.',
          options: currentQ.options,
          correctAnswer: currentQ.correctAnswer,
          userAnswer: selectedAnswer || undefined,
          transcript: currentQ.transcript,
          audioUrl: currentQ.audioUrl,
        })}
        nextLabel={currentIndex + 1 === questions.length ? 'Xem kết quả' : 'Câu tiếp theo'}
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
