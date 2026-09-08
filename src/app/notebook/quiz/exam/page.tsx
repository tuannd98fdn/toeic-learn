'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Confetti from '@/components/Confetti';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { fetchMistakeQuestions, LoadedQuestion } from '@/utils/questionFetcher';
import { isDueForReview } from '@/utils/spacedRepetition';
import ListeningAudioPlayer from '@/components/ListeningAudioPlayer';
import styles from '@/app/quiz/page.module.css';

export default function ExamNotebookQuizPage() {
  const { mounted, getMistakes, mistakes, updateMistakeProgress } = useMistakeNotebook();
  const [questions, setQuestions] = useState<LoadedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (!mounted) return;
    
    const loadQuiz = async () => {
      setLoading(true);
      const allMistakeIds = getMistakes();
      
      // Filter for exam mistakes that are due
      const dueExamIds = allMistakeIds.filter(id => {
        const m = mistakes[id];
        return m && m.type === 'exam' && m.nextReviewDate && isDueForReview(m.nextReviewDate);
      });

      if (dueExamIds.length === 0) {
        setIsFinished(true);
        setLoading(false);
        return;
      }

      // Limit quiz to max 15 mistakes at a time, randomly shuffled
      const quizIds = dueExamIds.sort(() => 0.5 - Math.random()).slice(0, 15);
      
      const loaded = await fetchMistakeQuestions(quizIds, mistakes);
      setQuestions(loaded);
      setLoading(false);
    };

    loadQuiz();
  }, [mounted, getMistakes, mistakes]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    const currentQ = questions[currentIndex];
    const isCorrect = answer === currentQ.qData.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Update spaced repetition state
    updateMistakeProgress(currentQ.mistakeId, isCorrect);
  };

  const handleNext = () => {
    const isCorrect = selectedAnswer === questions[currentIndex].qData.correctAnswer;
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
      const percentage = ((score + (isCorrect ? 1 : 0)) / questions.length) * 100;
      if (percentage >= 70) {
        setShowConfetti(true);
      }
    }
  };

  if (!mounted || loading) {
    return <div className={styles.loading}>Đang chuẩn bị đề thi...</div>;
  }

  if (isFinished || questions.length === 0) {
    if (questions.length === 0) {
      return (
        <div className={styles.finishedWrapper}>
          <div className={`${styles.heroCard} animate-slide-up`}>
            <div className={`${styles.heroAura} ${styles.auraEmerald}`}></div>
            <div className={styles.heroContent}>
              <div className={`${styles.achievementBadge} ${styles.badgeEmerald}`}>
                All Caught Up
              </div>
              <h2 className={styles.heroTitle}>Tuyệt vời!</h2>
              <p className={styles.feedbackText}>Bạn không có câu hỏi đề thi nào tới hạn ôn tập hôm nay.</p>
              <div className={styles.heroActions}>
                <Link href="/notebook" className={styles.ctaBtnPrimary}>Quay lại sổ tay</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.finishedWrapper}>
        <Confetti show={showConfetti} />
        <div className={`${styles.heroCard} animate-slide-up`}>
          <div className={`${styles.heroAura} ${showConfetti ? styles.auraGold : styles.auraBlue}`}></div>
          <div className={styles.heroContent}>
            <div className={`${styles.achievementBadge} ${showConfetti ? styles.badgeGold : styles.badgeBlue}`}>
              {showConfetti ? 'Perfect Score' : 'Completed'}
            </div>
            <h2 className={styles.heroTitle}>Hoàn thành chuộc lỗi!</h2>
            <div className={styles.gaugeContainer}>
              <svg className={styles.gaugeSvg} viewBox="0 0 100 100">
                <circle className={styles.gaugeBg} cx="50" cy="50" r="45" fill="none" strokeWidth="8" />
                <circle 
                  className={styles.gaugeFill} 
                  cx="50" cy="50" r="45" fill="none" strokeWidth="8" 
                  stroke="var(--primary)"
                  strokeDasharray={`${(score / questions.length) * 283} 283`}
                  strokeLinecap="round"
                />
              </svg>
              <div className={styles.gaugeInner}>
                <span className={styles.gaugeScore}>{score}</span>
                <span className={styles.gaugeTotal}>/ {questions.length}</span>
              </div>
            </div>
            <p className={styles.feedbackText}>
              Bạn đã xuất sắc ôn lại <strong>{questions.length}</strong> câu hỏi khó. Hãy tiếp tục duy trì thói quen này nhé!
            </p>
            <div className={styles.heroActions}>
              <Link href="/notebook" className={styles.ctaBtnPrimary}>Về Sổ tay</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex) / questions.length) * 100;
  const qData = currentQ.qData;

  return (
    <div className={styles.container} style={{ overflowY: 'auto', paddingBottom: '2rem' }}>
      <header className={styles.header}>
        <div className={styles.progressInfo}>
          <span>Câu {currentIndex + 1} / {questions.length}</span>
          <span>Score: {score}</span>
        </div>
        <div className={styles.progressBarBg}>
          <div 
            className={styles.progressBarFill} 
            style={{ 
              width: `${progressPercent}%`,
              backgroundColor: 'var(--primary)'
            }}
          />
        </div>
      </header>
      
      <main className={styles.main} style={{ alignItems: 'flex-start' }}>
        <div className="card-minimal" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Part {currentQ.part.replace('p', '')}</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>Câu {qData.number}</span>
          </div>

          {qData.audioUrl && (
            <div style={{ marginBottom: '1.5rem' }}>
              <ListeningAudioPlayer src={qData.audioUrl} />
            </div>
          )}

          {qData.image && (
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <img src={qData.image} alt="Question" style={{ maxWidth: '100%', borderRadius: '8px' }} />
            </div>
          )}

          {qData.passageText && (
            <div style={{ 
              marginBottom: '1.5rem', 
              padding: '1rem', 
              background: 'var(--bg-secondary)', 
              borderRadius: '8px',
              whiteSpace: 'pre-wrap',
              fontSize: '0.95rem',
              lineHeight: 1.6
            }}>
              {qData.passageText}
            </div>
          )}

          {qData.text && (
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: 1.5 }}>
              {qData.number}. {qData.text}
            </h3>
          )}

          {qData.options && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Object.entries(qData.options).map(([key, value]) => {
                let btnClass = styles.optionBtn;

                if (selectedAnswer !== null) {
                  if (key === qData.correctAnswer) {
                    btnClass = `${styles.optionBtn} ${styles.correct}`;
                  } else if (key === selectedAnswer) {
                    btnClass = `${styles.optionBtn} ${styles.incorrect}`;
                  }
                }

                return (
                  <button
                    key={key}
                    className={btnClass}
                    onClick={() => handleAnswer(key)}
                    disabled={selectedAnswer !== null}
                  >
                    <strong>{key}.</strong> {value as string}
                  </button>
                );
              })}
            </div>
          )}
          
          {selectedAnswer !== null && (
            <>
              {qData.explanation && (
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '0.9rem' }}>
                  <strong>Giải thích:</strong>
                  <p style={{ marginTop: '0.5rem', color: 'var(--muted-foreground)' }}>{qData.explanation}</p>
                </div>
              )}
              
              <div className={styles.nextBtnContainer}>
                <button 
                  className={styles.primaryBtn}
                  onClick={handleNext}
                >
                  {currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
