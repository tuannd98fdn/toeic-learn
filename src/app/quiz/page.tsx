'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import QuizCard from '@/components/QuizCard';
import Confetti from '@/components/Confetti';
import { getRandomWords, VOCABULARY_DATA, VocabularyWord } from '@/data/vocabulary';
import { useDailyMission } from '@/hooks/useDailyMission';
import styles from './page.module.css';

const QUIZ_LENGTH = 10;

export default function QuizPage() {
  const { recordQuizCompleted } = useDailyMission();
  const [questions, setQuestions] = useState<{word: VocabularyWord, options: string[]}[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Generate quiz questions
    const quizWords = getRandomWords(Math.min(QUIZ_LENGTH, VOCABULARY_DATA.length));
    
    const generatedQuestions = quizWords.map(word => {
      // Get 3 random wrong answers
      const wrongWords = getRandomWords(3, [word.id]);
      const options = [word.vietnamese, ...wrongWords.map(w => w.vietnamese)];
      // Shuffle options
      const shuffledOptions = options.sort(() => 0.5 - Math.random());
      
      return { word, options: shuffledOptions };
    });

    setQuestions(generatedQuestions);
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      recordQuizCompleted();
      const percentage = ((score + (isCorrect ? 1 : 0)) / questions.length) * 100;
      if (percentage >= 70) {
        setShowConfetti(true);
      }
    }
  };

  if (questions.length === 0) {
    return <div className={styles.loading}>Generating quiz...</div>;
  }

  if (isFinished) {
    const percentage = (score / questions.length) * 100;
    
    return (
      <div className={styles.finishedContainer}>
        <Confetti show={showConfetti} />
        <div className={`${styles.finishedCard} card-minimal animate-slide-up`}>
          <h2>Kết quả Quiz</h2>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreText}>{score}/{questions.length}</span>
          </div>
          <p className={styles.feedback}>
            {percentage >= 90 ? 'Xuất sắc! Bạn có trí nhớ tuyệt vời.' :
             percentage >= 70 ? 'Rất tốt! Cố gắng phát huy nhé.' :
             percentage >= 50 ? 'Khá tốt, nhưng bạn cần ôn tập thêm.' :
             'Bạn cần ôn tập flashcard nhiều hơn nhé!'}
          </p>
          <div className={styles.actions}>
            <button 
              className={styles.primaryBtn} 
              onClick={() => window.location.reload()}
            >
              Làm lại 🔄
            </button>
            <Link href="/study" className={styles.secondaryBtn}>Ôn Flashcard</Link>
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
            style={{ width: `${progressPercent}%` }} 
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
