'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Confetti from '@/components/Confetti';
import { useSearchParams } from 'next/navigation';
import { Part5Question, Part5DataSchema } from '@/schema/toeic';
import styles from './page.module.css';

const TIME_LIMIT = 20; // 20 seconds per question

export default function Part5Page() {
  return (
    <Suspense fallback={<div className={styles.loading}>Loading Trainer...</div>}>
      <Part5SpeedTrainer />
    </Suspense>
  );
}

function Part5SpeedTrainer() {
  const searchParams = useSearchParams();
  const testId = searchParams.get('test') || 'ets2022_test1';

  const [questions, setQuestions] = useState<Part5Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isFinished, setIsFinished] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<Part5Question[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Client-side initialization
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        // Extract year and test number from testId (e.g. ets2022_test1)
        const match = testId.match(/ets(\d+)_test(\d+)/);
        if (!match) throw new Error("Invalid test ID");
        
        const path = `/data/ets${match[1]}/test${match[2]}/part5.json`;
        const res = await fetch(path);
        
        if (!res.ok) throw new Error("Failed to fetch test data");
        
        const data = await res.json();
        
        // Zod validation (Tech Lead requirement)
        const validated = Part5DataSchema.parse(data);
        
        // Load all questions sequentially for the full test
        setQuestions(validated);
      } catch (err: any) {
        console.error("Error loading Part 5 data:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, [testId]);

  useEffect(() => {
    if (loading || questions.length === 0 || isFinished || showAnswer) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isFinished, showAnswer, questions, loading]);

  const handleTimeUp = () => {
    setShowAnswer(true);
    setWrongAnswers(prev => [...prev, questions[currentIndex]]);
    showResultAndMoveOn(null, questions[currentIndex].correctAnswer);
  };

  const handleAnswer = (answer: string) => {
    if (showAnswer) return; // Prevent multiple clicks
    if (timerRef.current) clearInterval(timerRef.current);
    
    setSelectedAnswer(answer);
    const currentQ = questions[currentIndex];
    
    if (answer === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    } else {
      setWrongAnswers(prev => [...prev, currentQ]);
    }
    
    showResultAndMoveOn(answer, currentQ.correctAnswer);
  };

  const showResultAndMoveOn = (selected: string | null, correct: string) => {
    setShowAnswer(true);
    
    // Wait 1.5 seconds to show the result, then move to next
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setTimeLeft(TIME_LIMIT);
        setShowAnswer(false);
        setSelectedAnswer(null);
      } else {
        setIsFinished(true);
        // If score is >= 70%, show confetti
        if ((score + (selected === correct ? 1 : 0)) / questions.length >= 0.7) {
          setShowConfetti(true);
        }
      }
    }, 1500);
  };

  if (loading) {
    return <div className={styles.loading}>Loading Trainer...</div>;
  }

  if (error) {
    return <div className={styles.loading} style={{color: 'red'}}>Lỗi: {error}</div>;
  }

  if (questions.length === 0) {
    return <div className={styles.loading}>No questions found.</div>;
  }

  if (isFinished) {
    const percentage = (score / questions.length) * 100;
    
    return (
      <div className={styles.container}>
        <Confetti show={showConfetti} />
        <div className={`${styles.finishedCard} card-minimal animate-slide-up`}>
          <h2>Kết quả Speed Trainer</h2>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreText}>{score}/{questions.length}</span>
          </div>
          <p className={styles.feedback}>
            {percentage >= 80 ? 'Tuyệt vời! Phản xạ ngữ pháp của bạn rất nhạy bén.' :
             percentage >= 50 ? 'Khá tốt! Nhưng vẫn cần luyện tập thêm để phản xạ nhanh hơn.' :
             'Đừng nản chí! Hãy xem lại các lỗi sai bên dưới nhé.'}
          </p>
          <div className={styles.actions}>
            <button 
              className={styles.primaryBtn} 
              onClick={() => window.location.reload()}
            >
              Luyện tập lại 🔄
            </button>
            <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
          </div>
        </div>

        {wrongAnswers.length > 0 && (
          <div className={styles.wrongAnswersSection}>
            <h3>Review các câu sai ({wrongAnswers.length})</h3>
            <div className={styles.wrongAnswersList}>
              {wrongAnswers.map(q => (
                <div key={q.id} className={`${styles.wrongCard} card-minimal`}>
                  <div className={styles.wrongHeader}>
                    <span className={styles.categoryBadge}>{q.type || 'Grammar'}</span>
                    <span className={styles.sourceBadge}>ETS Test</span>
                  </div>
                  <p className={styles.sentence}>
                    {q.text.split('___')[0]}
                    <span className={styles.blankFill}>{q.options[q.correctAnswer]}</span>
                    {q.text.split('___')[1] || ''}
                  </p>
                  <div className={styles.explanationBox}>
                    <strong>Giải thích:</strong> 
                    <div dangerouslySetInnerHTML={{ __html: q.explanation }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex) / questions.length) * 100;
  const timePercent = (timeLeft / TIME_LIMIT) * 100;

  // Determine button styles based on state
  const getButtonClass = (key: string) => {
    if (!showAnswer) return styles.optionBtn;
    if (key === currentQ.correctAnswer) return `${styles.optionBtn} ${styles.correct}`;
    if (key === selectedAnswer) return `${styles.optionBtn} ${styles.incorrect}`;
    return `${styles.optionBtn} ${styles.disabled}`;
  };

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

      <div className={styles.timerContainer}>
        <div className={styles.timerCircle}>
          <span className={`${styles.timerText} ${timeLeft <= 5 ? styles.timerWarning : ''}`}>
            {timeLeft}s
          </span>
        </div>
        <div className={styles.timerBarBg}>
          <div 
            className={`${styles.timerBarFill} ${timeLeft <= 5 ? styles.timerBarWarning : ''}`}
            style={{ width: `${timePercent}%` }}
          />
        </div>
      </div>

      <main className={styles.main}>
        <div className={`${styles.questionCard} card-minimal`}>
          <div className={styles.cardHeader}>
            <span className={styles.categoryBadge}>{currentQ.type || 'Grammar'}</span>
            <span className={styles.sourceBadge}>ETS Test</span>
          </div>
          <p className={styles.sentence}>
            {currentQ.text}
          </p>
          <div className={styles.optionsGrid}>
            {(Object.entries(currentQ.options) as [string, string][]).map(([key, value]) => (
              <button
                key={key}
                className={getButtonClass(key)}
                onClick={() => handleAnswer(key)}
                disabled={showAnswer}
              >
                <span className={styles.optionLetter}>{key}</span>
                <span className={styles.optionText}>{value}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
