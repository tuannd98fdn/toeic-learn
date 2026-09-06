'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Part1Question, Part1DataSchema } from '@/schema/toeic';
import ListeningAudioPlayer from '@/components/ListeningAudioPlayer';
import Confetti from '@/components/Confetti';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
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

  const { addMistake } = useMistakeNotebook();

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

  if (loading) {
    return <div className={styles.loading}>Đang nạp đề Part 1 Photographs... 🎧</div>;
  }

  if (error || questions.length === 0) {
    return (
      <div className={styles.errorState}>
        <p>⚠️ {error || 'Không tìm thấy câu hỏi Part 1 nào.'}</p>
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
      addMistake(`part1_${currentQ.id}`);
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
          <span className={styles.resultsIcon}>{percentage >= 70 ? '🏆' : '💪'}</span>
          <h1 className={styles.resultsTitle}>Hoàn thành Part 1 Photographs!</h1>
          <div className={styles.scoreBanner}>
            Kết quả: {score} / {questions.length} ({percentage}%)
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '480px' }}>
            {percentage >= 80
              ? 'Khả năng quan sát hình ảnh và nắm bắt bẫy thì/động từ của bạn rất tốt!'
              : 'Hãy chú ý các bẫy hành động (V-ing) và vị trí vật thể (prepositions) trong hình!'}
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
        />

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

        {isAnswered && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                className={styles.secondaryBtn}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                onClick={() => setShowTranscript((prev) => !prev)}
              >
                {showTranscript ? 'Ẩn Transcript 👁️' : 'Xem Transcript & Lời giải 💡'}
              </button>
            </div>

            {showTranscript && currentQ.transcript && (
              <div className={styles.transcriptCard}>
                <div className={styles.transcriptHeader}>
                  <span>📝 Transcript & Đáp án</span>
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

            <div className={styles.actionRow}>
              <button type="button" className={styles.nextBtn} onClick={handleNext}>
                {currentIndex + 1 === questions.length ? 'Xem kết quả 🎉' : 'Câu tiếp theo ➔'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
