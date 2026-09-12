'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Confetti from '@/components/Confetti';
import { 
  ZapIcon,
  ClockIcon,
  RotateCcwIcon,
  SparklesIcon,
  LightbulbIcon,
  ArrowRightIcon,
  TargetIcon,
} from '@/components/icons/AppIcons';
import { Part5Question, Part5DataSchema } from '@/schema/toeic';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { useLeaveWarning } from '@/hooks/useLeaveWarning';
import { storage } from '@/utils/storage';
import { getNextStudyTask } from '@/utils/studyPlanEngine';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import PracticeFooter from '@/components/PracticeFooter';
import styles from './page.module.css';

const TIME_LIMIT = 20; // 20 seconds per question

export const PART5_SUB_SKILLS = [
  { key: 'all', label: 'Tất cả câu hỏi' },
  { key: 'Word Form', label: 'Từ loại' },
  { key: 'Verb Tense', label: 'Thì động từ' },
  { key: 'Preposition & Conjunction', label: 'Giới từ & Liên từ' },
  { key: 'Business Vocabulary', label: 'Từ vựng công sở' },
  { key: 'Pronoun', label: 'Đại từ' },
  { key: 'Relative Clause', label: 'Mệnh đề quan hệ' },
  { key: 'Sentence Structure', label: 'Cấu trúc câu' },
];

export default function Part5Page() {
  return (
    <Suspense fallback={<div className={styles.loading}>Loading Trainer...</div>}>
      <Part5SpeedTrainer />
    </Suspense>
  );
}

function Part5SpeedTrainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const testIdParam = searchParams.get('test') || 'ets2022_test1';
  const subCategoryParam = searchParams.get('subCategory') || 'all';

  const [selectedTest, setSelectedTest] = useState(testIdParam);
  const [selectedSubSkill, setSelectedSubSkill] = useState(subCategoryParam);

  const [questions, setQuestions] = useState<Part5Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
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

  // Sync state with URL params
  useEffect(() => {
    const sub = searchParams.get('subCategory');
    if (sub) {
      setSelectedSubSkill(sub);
    } else {
      setSelectedSubSkill('all');
    }
    const t = searchParams.get('test');
    if (t) {
      setSelectedTest(t);
    }
  }, [searchParams]);

  // Fetch questions (either single test or cross-test subskill pool)
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        if (selectedSubSkill !== 'all') {
          // Cross-test pooling across ETS Test 1 and Test 2
          const testPaths = [
            '/data/ets2022/test1/part5.json',
            '/data/ets2022/test2/part5.json',
          ];
          const responses = await Promise.all(testPaths.map(p => fetch(p)));
          const allData: any[] = [];
          for (const res of responses) {
            if (res.ok) {
              const data = await res.json();
              allData.push(...data);
            }
          }
          const validated = Part5DataSchema.parse(allData);
          const filtered = validated.filter(q => {
            const cat = q.subCategory || q.type || '';
            return cat.toLowerCase() === selectedSubSkill.toLowerCase() ||
                   cat.toLowerCase().includes(selectedSubSkill.toLowerCase());
          });
          setQuestions(filtered);
        } else {
          // Single test sequential mode
          const match = selectedTest.match(/ets(\d+)_test(\d+)/);
          if (!match) throw new Error("Invalid test ID");
          
          const path = `/data/ets${match[1]}/test${match[2]}/part5.json`;
          const res = await fetch(path);
          if (!res.ok) throw new Error("Failed to fetch test data");
          
          const data = await res.json();
          const validated = Part5DataSchema.parse(data);
          setQuestions(validated);
        }

        // Reset session state
        setCurrentIndex(0);
        setScore(0);
        setStreak(0);
        setTimeLeft(TIME_LIMIT);
        setIsFinished(false);
        setShowAnswer(false);
        setShowExplanation(false);
        setSelectedAnswer(null);
        setWrongAnswers([]);
        setShowConfetti(false);
        setTutorContext(null);
      } catch (err: any) {
        console.error("Error loading Part 5 data:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, [selectedTest, selectedSubSkill]);

  const handleSelectSubSkill = (key: string) => {
    setSelectedSubSkill(key);
    if (key === 'all') {
      router.push(`/part5?test=${selectedTest}`);
    } else {
      router.push(`/part5?subCategory=${encodeURIComponent(key)}`);
    }
  };

  const handleSelectTest = (tId: string) => {
    setSelectedTest(tId);
    setSelectedSubSkill('all');
    router.push(`/part5?test=${tId}`);
  };

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
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(TIME_LIMIT);
    setIsFinished(false);
    setShowAnswer(false);
    setShowExplanation(false);
    setSelectedAnswer(null);
    setWrongAnswers([]);
    setShowConfetti(false);
    setTutorContext(null);
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

  const recordMistake = (currentQ: Part5Question) => {
    const qTestId = currentQ.id.includes('t2') ? 'ets2022_test2' : (selectedSubSkill !== 'all' ? (currentQ.id.includes('t1') ? 'ets2022_test1' : selectedTest) : selectedTest);
    addMistake(`exam_${qTestId}_part5_${currentQ.id}`, {
      type: 'exam',
      testId: qTestId,
      part: 'part5',
      questionId: currentQ.id,
      subCategory: currentQ.subCategory || currentQ.type,
      grammarTag: currentQ.grammarTag,
    });
  };

  const handleTimeUp = () => {
    setShowAnswer(true);
    const currentQ = questions[currentIndex];
    if (currentQ) {
      setWrongAnswers(prev => [...prev, currentQ]);
      recordMistake(currentQ);
    }
  };

  const handleAnswer = (answer: string) => {
    if (showAnswer) return;
    if (timerRef.current) clearInterval(timerRef.current);
    
    setSelectedAnswer(answer);
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    
    if (answer === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setShowAnswer(true);
    } else {
      setWrongAnswers(prev => [...prev, currentQ]);
      setStreak(0);
      recordMistake(currentQ);
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
        if (selectedSubSkill === 'all') {
          storage.set(`progress_${selectedTest}_part5`, true);
        }
        return prev;
      }
    });
  };

  // Keyboard Shortcuts
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

  // Confetti on good score
  useEffect(() => {
    if (isFinished && questions.length > 0 && score / questions.length >= 0.7) {
      setShowConfetti(true);
    }
  }, [isFinished, score, questions.length]);

  const activeSubMeta = PART5_SUB_SKILLS.find(s => s.key.toLowerCase() === selectedSubSkill.toLowerCase());

  if (loading) {
    return <div className={styles.loading}>Loading Trainer...</div>;
  }

  if (error) {
    return <div className={styles.loading} style={{color: 'red'}}>Lỗi: {error}</div>;
  }

  if (questions.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.subSkillContainer}>
          <div className={styles.subSkillScroll}>
            {PART5_SUB_SKILLS.map(skill => (
              <button
                key={skill.key}
                type="button"
                className={`${styles.subSkillPill} ${selectedSubSkill === skill.key ? styles.subSkillPillActive : ''}`}
                onClick={() => handleSelectSubSkill(skill.key)}
              >
                {skill.key !== 'all' && <TargetIcon size={12} />}
                {skill.label}
              </button>
            ))}
          </div>
        </div>
        <div className={`${styles.finishedCard} card-minimal`}>
          <h2>Không tìm thấy câu hỏi</h2>
          <p className={styles.feedback}>Không có câu hỏi nào khớp với chủ điểm đã chọn.</p>
          <button onClick={() => handleSelectSubSkill('all')} className={styles.primaryBtn}>
            Làm tất cả câu hỏi
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const percentage = questions.length > 0 ? (score / questions.length) * 100 : 0;
    const isSubSkillMode = selectedSubSkill !== 'all';

    return (
      <div className={styles.container}>
        <Confetti show={showConfetti} />
        <div className={`${styles.finishedCard} card-minimal animate-slide-up`}>
          <h2>{isSubSkillMode ? `Chuyên đề: ${activeSubMeta?.label || selectedSubSkill}` : 'Kết quả Speed Trainer Part 5'}</h2>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreText}>{score}/{questions.length}</span>
          </div>
          <p className={styles.feedback}>
            {percentage >= 80 ? `Tuyệt vời! Bạn nắm rất vững kiến thức ${activeSubMeta?.label || 'Part 5'}.` :
             percentage >= 50 ? `Khá tốt! Nhưng vẫn cần luyện thêm để phản xạ nhạy bén hơn trong 20s.` :
             `Chủ điểm này còn nhiều bẫy. Hãy xem kỹ giải thích và ôn lại trong Sổ tay lỗi sai.`}
          </p>
          <div className={styles.actions}>
            {isSubSkillMode ? (
              <>
                <Link 
                  href="/stats" 
                  className={styles.nextStepBtn}
                >
                  <TargetIcon size={18} />
                  Xem Biểu đồ Radar Lỗ hổng
                </Link>
                <button onClick={handleRestart} className={styles.secondaryBtn}>
                  Luyện lại chuyên đề này <RotateCcwIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
                </button>
                <button onClick={() => handleSelectSubSkill('all')} className={styles.secondaryBtn}>
                  Làm đề đầy đủ 30 câu
                </button>
                <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
              </>
            ) : (
              <>
                <Link 
                  href={nextTask.link === '/part5' ? `/part6?test=${selectedTest}` : nextTask.link} 
                  className={styles.nextStepBtn}
                >
                  HỌC TIẾP: {nextTask.link === '/part5' ? 'Part 6 (Điền đoạn văn)' : nextTask.title}
                  <ArrowRightIcon size={18} />
                </Link>
                <button onClick={handleRestart} className={styles.secondaryBtn}>
                  Luyện tập lại <RotateCcwIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
                </button>
                <Link href="/" className={styles.secondaryBtn}>Về trang chủ</Link>
              </>
            )}
          </div>
        </div>

        {wrongAnswers.length > 0 && (
          <div className={styles.wrongAnswersSection}>
            <h3>Review các câu sai ({wrongAnswers.length})</h3>
            <div className={styles.wrongAnswersList}>
              {wrongAnswers.map(q => (
                <div key={q.id} className={`${styles.wrongCard} card-minimal`}>
                  <div className={styles.wrongHeader}>
                    <span className={styles.categoryBadge}>{q.subCategory || q.type || 'Grammar'}</span>
                    {q.grammarTag && <span className={styles.sourceBadge}>{q.grammarTag}</span>}
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

  const getButtonClass = (key: string) => {
    if (!showAnswer) return styles.optionBtn;
    if (key === currentQ.correctAnswer) return `${styles.optionBtn} ${styles.correct}`;
    if (key === selectedAnswer) return `${styles.optionBtn} ${styles.incorrect}`;
    return `${styles.optionBtn} ${styles.disabled}`;
  };

  return (
    <div className={styles.container}>
      {/* Sub-skill and Test Selector Pill Bar */}
      <div className={styles.subSkillContainer}>
        <div className={styles.subSkillScroll}>
          {PART5_SUB_SKILLS.map(skill => (
            <button
              key={skill.key}
              type="button"
              className={`${styles.subSkillPill} ${selectedSubSkill === skill.key ? styles.subSkillPillActive : ''}`}
              onClick={() => handleSelectSubSkill(skill.key)}
            >
              {skill.key !== 'all' && <TargetIcon size={12} />}
              {skill.label}
            </button>
          ))}
        </div>
      </div>

      {selectedSubSkill !== 'all' ? (
        <div className={styles.activeSkillBanner}>
          <div>
            <span>Đang luyện chuyên sâu: <strong>{activeSubMeta?.label || selectedSubSkill}</strong></span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>
              ({questions.length} câu từ ngân hàng ETS)
            </span>
          </div>
          <button 
            type="button" 
            onClick={() => handleSelectSubSkill('all')}
            className={styles.clearSkillBtn}
          >
            Quay lại cả đề
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
          <div className={styles.testSelectorRow}>
            <span>Đề thi:</span>
            <button
              type="button"
              className={`${styles.testOptionBtn} ${selectedTest === 'ets2022_test1' ? styles.testOptionActive : ''}`}
              onClick={() => handleSelectTest('ets2022_test1')}
            >
              ETS 2022 Test 1
            </button>
            <button
              type="button"
              className={`${styles.testOptionBtn} ${selectedTest === 'ets2022_test2' ? styles.testOptionActive : ''}`}
              onClick={() => handleSelectTest('ets2022_test2')}
            >
              ETS 2022 Test 2
            </button>
          </div>
        </div>
      )}

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
