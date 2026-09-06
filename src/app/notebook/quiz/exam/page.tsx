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

    setTimeout(() => {
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
    }, 1500);
  };

  if (!mounted || loading) {
    return <div className={styles.loading}>Đang chuẩn bị đề thi...</div>;
  }

  if (isFinished) {
    if (questions.length === 0) {
      return (
        <div className={styles.finishedContainer}>
          <div className={`${styles.finishedCard} card-minimal animate-slide-up`}>
            <h2>Tuyệt vời! 🎉</h2>
            <p className={styles.feedback}>Bạn không có câu hỏi đề thi nào tới hạn ôn tập hôm nay.</p>
            <div className={styles.actions}>
              <Link href="/notebook" className={styles.primaryBtn}>Quay lại sổ tay</Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.finishedContainer}>
        <Confetti show={showConfetti} />
        <div className={`${styles.finishedCard} card-minimal animate-slide-up`}>
          <h2>Hoàn thành chuộc lỗi!</h2>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreText}>{score}/{questions.length}</span>
          </div>
          <p className={styles.feedback}>
            Bạn đã xuất sắc ôn lại <strong>{questions.length}</strong> câu hỏi khó. Hãy tiếp tục duy trì thói quen này nhé!
          </p>
          <div className={styles.actions}>
            <Link href="/notebook" className={styles.primaryBtn}>Về Sổ tay</Link>
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
                let btnStyle: React.CSSProperties = {
                  padding: '1rem',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  background: 'var(--card)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '1rem',
                  color: 'var(--foreground)'
                };

                if (selectedAnswer !== null) {
                  if (key === qData.correctAnswer) {
                    btnStyle.background = 'var(--success)';
                    btnStyle.color = 'white';
                    btnStyle.border = '1px solid var(--success)';
                  } else if (key === selectedAnswer) {
                    btnStyle.background = 'var(--danger)';
                    btnStyle.color = 'white';
                    btnStyle.border = '1px solid var(--danger)';
                  }
                  btnStyle.cursor = 'default';
                }

                return (
                  <button
                    key={key}
                    style={btnStyle}
                    onClick={() => handleAnswer(key)}
                    disabled={selectedAnswer !== null}
                  >
                    <strong>{key}.</strong> {value as string}
                  </button>
                );
              })}
            </div>
          )}
          
          {selectedAnswer !== null && qData.explanation && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '0.9rem' }}>
              <strong>Giải thích:</strong>
              <p style={{ marginTop: '0.5rem', color: 'var(--muted-foreground)' }}>{qData.explanation}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
