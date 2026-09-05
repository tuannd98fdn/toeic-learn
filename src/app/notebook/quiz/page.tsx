'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import QuizCard from '@/components/QuizCard';
import Confetti from '@/components/Confetti';
import { getRandomWords, VOCABULARY_DATA, VocabularyWord } from '@/data/vocabulary';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import styles from '@/app/quiz/page.module.css';

export default function NotebookQuizPage() {
  const { mounted, getMistakes, removeMistake } = useMistakeNotebook();
  const [questions, setQuestions] = useState<{word: VocabularyWord, options: string[]}[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [clearedWords, setClearedWords] = useState(0);

  useEffect(() => {
    if (!mounted) return;
    
    const mistakeIds = getMistakes();
    if (mistakeIds.length === 0) {
      setIsFinished(true); // Nothing to do
      return;
    }

    // Limit quiz to max 15 mistakes at a time
    const quizIds = mistakeIds.sort(() => 0.5 - Math.random()).slice(0, 15);
    const quizWords = quizIds
      .map(id => VOCABULARY_DATA.find(w => w.id === id))
      .filter((w): w is VocabularyWord => w !== undefined);
    
    const generatedQuestions = quizWords.map(word => {
      // Get 3 random wrong answers
      const wrongWords = getRandomWords(3, [word.id]);
      const options = [word.vietnamese, ...wrongWords.map(w => w.vietnamese)];
      // Shuffle options
      const shuffledOptions = options.sort(() => 0.5 - Math.random());
      
      return { word, options: shuffledOptions };
    });

    setQuestions(generatedQuestions);
  }, [mounted]); // eslint-disable-line react-hooks/exhaustive-deps

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

  if (!mounted || (questions.length === 0 && !isFinished)) {
    return <div className={styles.loading}>Generating quiz...</div>;
  }

  if (isFinished) {
    // If they came here with 0 mistakes
    if (questions.length === 0) {
      return (
        <div className={styles.finishedContainer}>
          <div className={`${styles.finishedCard} card-minimal animate-slide-up`}>
            <h2>Không có từ nào!</h2>
            <p className={styles.feedback}>Sổ tay lỗi sai của bạn đang trống.</p>
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
            Bạn đã xuất sắc xóa được <strong>{clearedWords}</strong> từ vựng khỏi Sổ tay lỗi sai!
          </p>
          <div className={styles.actions}>
            <Link href="/notebook" className={styles.primaryBtn}>Về Sổ tay</Link>
            <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
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
