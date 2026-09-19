'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import QuizCard from '@/components/QuizCard';
import Confetti from '@/components/Confetti';
import { VocabularyWord } from '@/data/vocabulary';
import { useVocabulary } from '@/hooks/useVocabulary';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { isDueForReview } from '@/utils/spacedRepetition';
import { completeActiveTaskByType } from '@/utils/studyPlanEngine';
import { ArrowLeftIcon } from '@/components/icons/AppIcons';
import styles from '@/app/quiz/page.module.css';

export default function NotebookQuizPage() {
  const { mounted: vocabMounted, allWords, getRandomWords } = useVocabulary();
  const { mounted: notebookMounted, getMistakes, mistakes, removeMistake, updateMistakeProgress } = useMistakeNotebook();
  const [questions, setQuestions] = useState<{word: VocabularyWord, options: string[]}[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [clearedWords, setClearedWords] = useState(0);
  const [sessionKey, setSessionKey] = useState(0);

  useEffect(() => {
    if (!vocabMounted || !notebookMounted) return;
    
    const allMistakeIds = getMistakes();
    // Filter strictly for vocabulary mistakes (exclude exam mistakes like ets2022_test1_part5_101)
    const vocabMistakeIds = allMistakeIds.filter(
      id => !mistakes[id]?.type || mistakes[id]?.type === 'vocabulary'
    );

    if (vocabMistakeIds.length === 0) {
      setIsFinished(true); // Nothing to do
      return;
    }

    // Prioritize words that are due today according to Spaced Repetition
    const dueVocabIds = vocabMistakeIds.filter(
      id => mistakes[id]?.nextReviewDate && isDueForReview(mistakes[id].nextReviewDate)
    );
    const nonDueVocabIds = vocabMistakeIds.filter(
      id => !mistakes[id]?.nextReviewDate || !isDueForReview(mistakes[id].nextReviewDate)
    );

    // Take due words first, then fill up to 15 with other vocab mistakes
    const shuffledDue = [...dueVocabIds].sort(() => 0.5 - Math.random());
    const shuffledNonDue = [...nonDueVocabIds].sort(() => 0.5 - Math.random());
    const quizIds = [...shuffledDue, ...shuffledNonDue].slice(0, 15);

    const quizWords = (quizIds
      .map(id => allWords.find(w => w.id === id))
      .filter(w => w !== undefined)) as VocabularyWord[];
    
    if (quizWords.length === 0) {
      setIsFinished(true);
      return;
    }

    const generatedQuestions = quizWords.map(word => {
      // Get 3 random wrong answers
      const wrongWords = getRandomWords(3, [word.id]);
      const options = [word.vietnamese, ...wrongWords.map(w => w.vietnamese)];
      // Shuffle options
      const shuffledOptions = options.sort(() => 0.5 - Math.random());
      
      return { word, options: shuffledOptions };
    });

    setQuestions(generatedQuestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vocabMounted, notebookMounted, sessionKey]);

  const handleAnswer = (isCorrect: boolean) => {
    const currentWord = questions[currentIndex]?.word;
    if (currentWord) {
      if (isCorrect) {
        setScore(prev => prev + 1);
        updateMistakeProgress(currentWord.id, true);
        const m = mistakes[currentWord.id];
        // If word reached Box 4 or 5, consider it cleared from active mistake review
        if (!m || (m.box && m.box >= 4)) {
          removeMistake(currentWord.id);
          setClearedWords(prev => prev + 1);
        }
      } else {
        updateMistakeProgress(currentWord.id, false);
      }
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      const percentage = ((score + (isCorrect ? 1 : 0)) / questions.length) * 100;
      if (percentage >= 70) {
        setShowConfetti(true);
      }
      // Auto-complete study plan task if applicable
      completeActiveTaskByType('review');
      completeActiveTaskByType('vocab');
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
        <div className={styles.quizTopBar}>
          <Link href="/notebook" className={styles.exitBtn}>
            <ArrowLeftIcon size={16} />
            <span>Thoát</span>
          </Link>
          <div className={styles.liveStats}>
            <span className={styles.questionBadge}>
              Câu {currentIndex + 1} / {questions.length}
            </span>
            <span className={styles.questionBadge}>
              Điểm: {score}
            </span>
          </div>
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
