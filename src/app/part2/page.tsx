'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Part2Question, Part2DataSchema } from '@/schema/toeic';
import ListeningAudioPlayer from '@/components/ListeningAudioPlayer';
import Confetti from '@/components/Confetti';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
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

  const { addMistake } = useMistakeNotebook();

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

  if (loading) {
    return <div className={styles.loading}>Đang nạp đề Part 2 Question-Response... ⚡</div>;
  }

  if (error || questions.length === 0) {
    return (
      <div className={styles.errorState}>
        <p>⚠️ {error || 'Không tìm thấy câu hỏi Part 2 nào.'}</p>
        <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  const handleSelectOption = (letter: string) => {
    if (isAnswered) return;
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
    } else {
      setIsFinished(true);
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

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className={styles.container}>
        <Confetti show={showConfetti} />
        <div className={styles.resultsCard}>
          <span className={styles.resultsIcon}>{percentage >= 70 ? '🎯' : '💪'}</span>
          <h1 className={styles.resultsTitle}>Hoàn thành Part 2 Question-Response!</h1>
          <div className={styles.scoreBanner}>
            Kết quả: {score} / {questions.length} ({percentage}%)
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '480px' }}>
            {percentage >= 80
              ? 'Phản xạ bắt Wh-question và câu hỏi Yes/No gián tiếp của bạn rất xuất sắc!'
              : 'Hãy chú ý bẫy lặp từ (same-word trap) và câu trả lời gián tiếp (indirect answers)!'}
          </p>

          <div className={styles.resultsActions}>
            <button onClick={handleRestart} className={styles.nextBtn}>Làm lại đề này 🔄</button>
            <Link href="/" className={styles.secondaryBtn}>Về Dashboard 🏠</Link>
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
          <div className={styles.promptTitle}>🎧 Lắng nghe câu hỏi và 3 câu trả lời</div>
          <div className={styles.promptHint}>Chọn câu đáp lại hợp lý nhất trong ngữ cảnh giao tiếp công việc</div>
        </div>

        <ListeningAudioPlayer
          src={currentQ.audioUrl}
          title={`Audio Câu ${currentQ.number}`}
          autoPlay={true}
        />

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

        {isAnswered && (
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              type="button"
              className={styles.secondaryBtn}
              style={{ alignSelf: 'flex-start', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
              onClick={() => setShowTranscript((prev) => !prev)}
            >
              {showTranscript ? 'Ẩn Transcript 👁️' : 'Xem Transcript & Lời giải 💡'}
            </button>

            {showTranscript && currentQ.transcript && (
              <div className={styles.transcriptCard}>
                <div className={styles.transcriptHeader}>
                  <span>📝 Lời thoại câu hỏi & 3 đáp án</span>
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
        nextLabel={currentIndex + 1 === questions.length ? 'Xem kết quả 🎉' : 'Câu tiếp theo ➔'}
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
