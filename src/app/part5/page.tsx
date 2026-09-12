'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Confetti from '@/components/Confetti';
import { 
  ZapIcon,
  ClockIcon,
  RotateCcwIcon,
  SparklesIcon,
  LightbulbIcon,
  ArrowRightIcon,
} from '@/components/icons/AppIcons';
import { useSearchParams } from 'next/navigation';
import { Part5Question, Part5DataSchema } from '@/schema/toeic';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { useLeaveWarning } from '@/hooks/useLeaveWarning';
import { storage } from '@/utils/storage';
import { getNextStudyTask } from '@/utils/studyPlanEngine';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import PracticeFooter from '@/components/PracticeFooter';
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
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0); // Added for gamification
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isFinished, setIsFinished] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<Part5Question[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const nextTask = getNextStudyTask();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { addMistake } = useMistakeNotebook();
  useLeaveWarning(currentIndex > 0 && !isFinished);

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

  const openAITutor = (q: Part5Question) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTutorContext({
      partTitle: 'Part 5: Incomplete Sentences',
      number: q.number,
      text: q.text,
      options: q.options,
      correctAnswer: q.correctAnswer,
      userAnswer: selectedAnswer || undefined,
      explanation: q.explanation,
      subCategory: q.subCategory || q.type,
      grammarTag: q.grammarTag,
    });
  };

  const handleRestart = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (loading || questions.length === 0 || isFinished || showAnswer || tutorContext) return;

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
  }, [currentIndex, isFinished, showAnswer, questions, loading, tutorContext]);

  const handleTimeUp = () => {
    setShowAnswer(true);
    const currentQ = questions[currentIndex];
    setWrongAnswers(prev => [...prev, currentQ]);
    addMistake(`exam_${testId}_part5_${currentQ.id}`, {
      type: 'exam',
      testId: testId,
      part: 'part5',
      questionId: currentQ.id,
      subCategory: currentQ.subCategory || currentQ.type,
      grammarTag: currentQ.grammarTag,
    });
  };

  const handleAnswer = (answer: string) => {
    if (showAnswer) return; // Prevent multiple clicks
    if (timerRef.current) clearInterval(timerRef.current);
    
    setSelectedAnswer(answer);
    const currentQ = questions[currentIndex];
    
    if (answer === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1); // Increment streak
      setShowAnswer(true);
    } else {
      setWrongAnswers(prev => [...prev, currentQ]);
      setStreak(0); // Reset streak
      addMistake(`exam_${testId}_part5_${currentQ.id}`, {
        type: 'exam',
        testId: testId,
        part: 'part5',
        questionId: currentQ.id,
        subCategory: currentQ.subCategory || currentQ.type,
        grammarTag: currentQ.grammarTag,
      });
      setShowAnswer(true);
    }
  };

  const moveToNextQuestion = () => {
    setTutorContext(null);
    setShowExplanation(false);
    setCurrentIndex(prev => {
      if (prev < questions.length - 1) {
        setTimeLeft(TIME_LIMIT);
        setShowAnswer(false);
        setSelectedAnswer(null);
        return prev + 1;
      } else {
        setIsFinished(true);
        storage.set(`progress_${testId}_part5`, true);
        return prev;
      }
    });
  };

  // Keyboard Shortcuts for 10/10 UX
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (isFinished || questions.length === 0 || tutorContext) return;

      const key = e.key.toUpperCase();
      if (!showAnswer) {
        if (['A', 'B', 'C', 'D'].includes(key)) {
          handleAnswer(key);
        }
      } else {
        if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          moveToNextQuestion();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Check Confetti condition when finished
  useEffect(() => {
    if (isFinished && score / questions.length >= 0.7) {
      setShowConfetti(true);
    }
  }, [isFinished, score, questions.length]);

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
            <Link 
              href={nextTask.link === '/part5' ? `/part6?test=${testId}` : nextTask.link} 
              className={styles.nextStepBtn}
            >
              HỌC TIẾP: {nextTask.link === '/part5' ? 'Part 6 (Điền đoạn văn)' : nextTask.title}
              <ArrowRightIcon size={18} />
            </Link>
            <button onClick={handleRestart} className={styles.secondaryBtn}>
              Luyện tập lại <RotateCcwIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
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

                  <button className={styles.aiTutorBtn} onClick={() => setTutorContext({
                      partTitle: 'Part 5: Incomplete Sentences',
                      number: q.number,
                      text: q.text,
                      options: q.options,
                      correctAnswer: q.correctAnswer,
                      explanation: q.explanation,
                      subCategory: q.subCategory || q.type,
                      grammarTag: q.grammarTag,
                    })}>
                    <SparklesIcon size={16} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline' }} /> Hỏi Gia Sư AI bóc tách bẫy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

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

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex) / questions.length) * 100;

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
        <div className={styles.topHeaderRow}>
          <div className={styles.progressSection}>
            <div className={styles.statsRow}>
              <span className={styles.questionCount}>Câu {currentIndex + 1} / {questions.length}</span>
              {streak > 0 && (
                <div className={`${styles.streakBadge} ${styles.streakActive}`}>
                  <span className={styles.streakFire}><ZapIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', color: '#ff9800' }} /></span> {streak} Streak!
                </div>
              )}
            </div>
            <div className={styles.progressBarBg}>
              <div 
                className={styles.progressBarFill} 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>
          
          <div className={styles.timerSection}>
            <span className={`${styles.timerIcon} ${timeLeft <= 5 ? styles.timerWarningIcon : ''}`}><ClockIcon size={20} /></span>
            <span className={`${styles.timerText} ${timeLeft <= 5 ? styles.timerTextWarning : ''}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={`${styles.questionCard} card-minimal`}>
          <div className={styles.cardHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span className={styles.categoryBadge}>{currentQ.subCategory || currentQ.type || 'Grammar'}</span>
              {currentQ.grammarTag && (
                <span className={styles.sourceBadge}>{currentQ.grammarTag}</span>
              )}
            </div>
          </div>
          <p className={styles.sentence}>
            {currentQ.text.split(/_{3,}/)[0]}
            <span className={styles.blankFill}>
              {showAnswer ? currentQ.options[currentQ.correctAnswer as keyof typeof currentQ.options] : '___'}
            </span>
            {currentQ.text.split(/_{3,}/)[1] || ''}
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

          {showAnswer && currentQ.explanation && (
            <div className={styles.explanationContainer}>
              <button 
                type="button" 
                className={styles.explanationToggleBtn}
                onClick={() => setShowExplanation(prev => !prev)}
              >
                <LightbulbIcon size={16} />
                <span>{showExplanation ? 'Thu gọn lời giải' : 'Xem giải thích ngữ pháp chi tiết'}</span>
              </button>
              {showExplanation && (
                <div 
                  className={styles.explanationBoxContent}
                  dangerouslySetInnerHTML={{ __html: currentQ.explanation }}
                />
              )}
            </div>
          )}
        </div>
      </main>

      <PracticeFooter
        isAnswered={showAnswer}
        isCorrect={selectedAnswer === currentQ.correctAnswer}
        correctMessage="Ngữ pháp rất chắc chắn!"
        incorrectMessage={selectedAnswer === null ? "Hết thời gian!" : `Đáp án đúng là (${currentQ.correctAnswer})`}
        onNext={moveToNextQuestion}
        onAITutor={() => openAITutor(currentQ)}
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
