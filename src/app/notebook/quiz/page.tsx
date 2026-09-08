'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import QuizCard from '@/components/QuizCard';
import Confetti from '@/components/Confetti';
import { VocabularyWord } from '@/data/vocabulary';
import { useVocabulary } from '@/hooks/useVocabulary';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import styles from '@/app/quiz/page.module.css';

export default function NotebookQuizPage() {
  const { mounted: vocabMounted, allWords, getRandomWords } = useVocabulary();
  const { mounted: notebookMounted, getMistakes, removeMistake } = useMistakeNotebook();
  const [questions, setQuestions] = useState<{word: VocabularyWord, options: string[]}[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [clearedWords, setClearedWords] = useState(0);

  useEffect(() => {
    if (!vocabMounted || !notebookMounted) return;
    
    const mistakeIds = getMistakes();
    if (mistakeIds.length === 0) {
      setIsFinished(true); // Nothing to do
      return;
    }

    // Limit quiz to max 15 mistakes at a time
    const quizIds = mistakeIds.sort(() => 0.5 - Math.random()).slice(0, 15);
    const quizWords = quizIds
      .map(id => allWords.find(w => w.id === id))
      .filter((w) => w !== undefined) as VocabularyWord[];
    
    const generatedQuestions = quizWords.map(word => {
      // Get 3 random wrong answers
      const wrongWords = getRandomWords(3, [word.id]);
      const options = [word.vietnamese, ...wrongWords.map(w => w.vietnamese)];
      // Shuffle options
      const shuffledOptions = options.sort(() => 0.5 - Math.random());
      
      return { word, options: shuffledOptions };
    });

    setQuestions(generatedQuestions);
  }, [vocabMounted, notebookMounted, allWords, getMistakes, getRandomWords]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
      removeMistake(questions[currentIndex].word.id);
      setClearedWords(prev => prev + 1);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      const percentage = ((score + (isCorrect ? 1 : 0)) / questions.length) * 100;
      if (percentage >= 70) {
        setShowConfetti(true);
      }
    }
  };

  if (!vocabMounted || !notebookMounted || (questions.length === 0 && !isFinished)) {
    return <div className={styles.loading}>Generating quiz...</div>;
  }

  if (isFinished || questions.length === 0) {
    // If they came here with 0 mistakes
    if (questions.length === 0) {
      return (
        <div className={styles.finishedWrapper}>
          <div className={`${styles.heroCard} animate-slide-up`}>
            <div className={`${styles.heroAura} ${styles.auraEmerald}`}></div>
            <div className={styles.heroContent}>
              <div className={`${styles.achievementBadge} ${styles.badgeEmerald}`}>
                All Caught Up
              </div>
              <h2 className={styles.heroTitle}>Không có từ nào!</h2>
              <p className={styles.feedbackText}>Sổ tay lỗi sai của bạn đang trống.</p>
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
              {showConfetti ? 'Mastered' : 'Completed'}
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
              Bạn đã xuất sắc xóa được <strong>{clearedWords}</strong> từ vựng khỏi Sổ tay lỗi sai!
            </p>
            <div className={styles.heroActions}>
              <Link href="/notebook" className={styles.ctaBtnPrimary}>Về Sổ tay</Link>
              <Link href="/" className={styles.ctaBtnSecondary}>Về trang chủ</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex) / questions.length) * 100;

  return (
    <div className={styles.container}>
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
      
      <main className={styles.main}>
        <QuizCard 
          word={currentQ.word} 
          options={currentQ.options}
          onAnswer={handleAnswer}
        />
      </main>
    </div>
  );
}
