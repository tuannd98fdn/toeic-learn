'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Confetti from '@/components/Confetti';
import { ClockIcon } from '@/components/icons/AppIcons';
import { useSearchParams } from 'next/navigation';
import { Part7PassageSet, Part7DataSchema } from '@/schema/toeic';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { useLeaveWarning } from '@/hooks/useLeaveWarning';
import { storage } from '@/utils/storage';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import PracticeFooter from '@/components/PracticeFooter';
import styles from './page.module.css';

export default function Part7Page() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang tải dữ liệu bài thi...</div>}>
      <Part7Trainer />
    </Suspense>
  );
}

function Part7Trainer() {
  const searchParams = useSearchParams();
  const testId = searchParams.get('test') || 'ets2022_test1';

  const [passageSets, setPassageSets] = useState<Part7PassageSet[]>([]);
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const passageSet = passageSets[currentPassageIndex] || null;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentSetScore, setCurrentSetScore] = useState(0);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);

  // Time Attack State
  const [isTimeAttackEnabled, setIsTimeAttackEnabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Highlight State
  const [isHighlightMode, setIsHighlightMode] = useState(false);

  const { addMistake } = useMistakeNotebook();
  useLeaveWarning(Object.keys(answers).length > 0 && !isSubmitted);

  const handleTextHighlight = () => {
    if (!isHighlightMode) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    try {
      const range = selection.getRangeAt(0);
      const markNode = document.createElement('mark');
      markNode.style.backgroundColor = 'var(--warning-light, #fff8e1)';
      markNode.style.padding = '0 2px';
      markNode.style.borderRadius = '2px';
      
      range.surroundContents(markNode);
      selection.removeAllRanges();
    } catch (e) {
      console.warn('Không thể highlight qua nhiều thẻ block khác nhau', e);
      selection.removeAllRanges();
    }
  };

  // Load preference
  useEffect(() => {
    const savedPref = localStorage.getItem('toeic_time_attack');
    if (savedPref === 'true') setIsTimeAttackEnabled(true);
  }, []);

  const toggleTimeAttack = () => {
    const newVal = !isTimeAttackEnabled;
    setIsTimeAttackEnabled(newVal);
    localStorage.setItem('toeic_time_attack', newVal.toString());
  };

  // Reset or initialize timer
  useEffect(() => {
    if (isTimeAttackEnabled && !isSubmitted && passageSet) {
      setTimeLeft(passageSet.questions.length * 55);
    } else {
      setTimeLeft(null);
    }
  }, [currentPassageIndex, isTimeAttackEnabled, isSubmitted, passageSet]);

  // Countdown timer
  useEffect(() => {
    if (!isTimeAttackEnabled || isSubmitted || timeLeft === null || timeLeft <= 0) return;
    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft, isTimeAttackEnabled, isSubmitted]);

  useEffect(() => {
    const fetchPassage = async () => {
      try {
        setLoading(true);
        const match = testId.match(/ets(\d+)_test(\d+)/);
        if (!match) throw new Error("Invalid test ID");
        
        const path = `/data/ets${match[1]}/test${match[2]}/part7.json`;
        const res = await fetch(path);
        
        if (!res.ok) throw new Error("Failed to fetch test data");
        
        const data = await res.json();
        const validated = Part7DataSchema.parse(data);
        
        if (validated.length > 0) {
          setPassageSets(validated as Part7PassageSet[]);
        } else {
          setError("No passages found");
        }
      } catch (err: any) {
        console.error("Error loading Part 7 data:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPassage();
  }, [testId]);
   const currentQuestion = passageSet?.questions[activeQuestionIndex];
  const allAnswered = passageSet ? Object.keys(answers).length === passageSet.questions.length : false;

  const handleSelectAnswer = (questionId: string, optionKey: string) => {
    if (isSubmitted || !passageSet) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionKey }));
    
    // Auto move to next question if not on the last one
    if (activeQuestionIndex < passageSet.questions.length - 1) {
      // Delay slightly for better UX so user sees their selection
      setTimeout(() => {
        setActiveQuestionIndex(prev => prev + 1);
      }, 300);
    }
  };

  // Keyboard Shortcuts for 10/10 UX
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      
      if (!passageSet || isSubmitted) return;

      const key = e.key.toUpperCase();
      const currentQ = passageSet.questions[activeQuestionIndex];

      if (['A', 'B', 'C', 'D'].includes(key)) {
        if (currentQ.options[key as keyof typeof currentQ.options]) {
          handleSelectAnswer(currentQ.id, key);
        }
      } else if (e.key === 'ArrowLeft') {
        setActiveQuestionIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveQuestionIndex(prev => Math.min(passageSet.questions.length - 1, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (loading) {
    return (
      <div className={styles.pageContainer} style={{ paddingTop: '20px' }}>
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonCard} style={{ height: '600px' }}>
            <div className={`${styles.skeletonPulse} ${styles.skeletonTitle}`} />
            <div className={`${styles.skeletonPulse} ${styles.skeletonLine}`} style={{ marginTop: '20px' }} />
            <div className={`${styles.skeletonPulse} ${styles.skeletonLine}`} />
            <div className={`${styles.skeletonPulse} ${styles.skeletonLineShort}`} />
            <div className={`${styles.skeletonPulse} ${styles.skeletonLine}`} style={{ marginTop: '10px' }} />
            <div className={`${styles.skeletonPulse} ${styles.skeletonLine}`} />
            <div className={`${styles.skeletonPulse} ${styles.skeletonLineShort}`} />
          </div>
          <div className={styles.skeletonCard} style={{ height: '400px' }}>
            <div className={`${styles.skeletonPulse} ${styles.skeletonTitle}`} />
            <div className={`${styles.skeletonPulse} ${styles.skeletonLine}`} style={{ height: 50, borderRadius: 16, marginTop: '20px' }} />
            <div className={`${styles.skeletonPulse} ${styles.skeletonLine}`} style={{ height: 50, borderRadius: 16 }} />
            <div className={`${styles.skeletonPulse} ${styles.skeletonLine}`} style={{ height: 50, borderRadius: 16 }} />
            <div className={`${styles.skeletonPulse} ${styles.skeletonLine}`} style={{ height: 50, borderRadius: 16 }} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.loading} style={{color: 'var(--danger)'}}>Lỗi: {error}</div>;
  }

  if (!passageSet) {
    return <div className={styles.loading}>Loading Passage...</div>;
  }

  const handleSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    let score = 0;
    passageSet.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      } else {
        addMistake(`exam_${testId}_part7_${q.id}`, {
          type: 'exam',
          testId: testId,
          part: 'part7',
          questionId: q.id
        });
      }
    });

    setCurrentSetScore(score);
    if (score === passageSet.questions.length) {
      setShowConfetti(true);
    }
  };

  // Auto-submit when time is up
  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNextPassage = () => {
    if (currentPassageIndex < passageSets.length - 1) {
      setTotalScore(prev => prev + currentSetScore);
      setTotalQuestions(prev => prev + passageSet.questions.length);
      setCurrentPassageIndex(prev => prev + 1);
      setAnswers({});
      setIsSubmitted(false);
      setShowConfetti(false);
      setActiveQuestionIndex(0);
    } else {
      // Show results
      const finalTotal = totalScore + currentSetScore;
      const finalQuestions = totalQuestions + passageSet.questions.length;
      setTotalScore(finalTotal);
      setTotalQuestions(finalQuestions);
      setIsFinished(true);
      storage.set(`progress_${testId}_part7`, true);
      if ((finalTotal / finalQuestions) >= 0.7) {
        setShowConfetti(true);
      }
    }
  };

  const renderContent = (content: string, type: string) => {
    if (type === 'Text Message') {
      try {
        const messages = JSON.parse(content) as {sender: string, time: string, text: string}[];
        return (
          <div className={styles.chatContainer}>
            {messages.map((msg, idx) => {
              // Simple heuristic to make different senders appear on different sides
              const isFirstSender = msg.sender === messages[0].sender;
              return (
                <div key={idx} className={`${styles.chatMessage} ${isFirstSender ? styles.chatLeft : styles.chatRight}`}>
                  <div className={styles.chatHeader}>
                    <span className={styles.chatSender}>{msg.sender}</span>
                    <span className={styles.chatTime}>{msg.time}</span>
                  </div>
                  <div className={styles.chatBubble}>{msg.text}</div>
                </div>
              );
            })}
          </div>
        );
      } catch (e) {
        return <div className={styles.passageText}>{content}</div>;
      }
    }

    // Default text rendering, support HTML from raw data
    return (
      <div 
        className={styles.passageText} 
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    );
  };

  if (isFinished) {
    const percentage = Math.round((totalScore / totalQuestions) * 100);
    return (
      <div className={styles.pageContainer}>
        <Confetti show={showConfetti} />
        <div className={styles.resultsCard} style={{ margin: '40px auto', maxWidth: 600, padding: 40, textAlign: 'center', backgroundColor: 'var(--glass-bg)', borderRadius: 24, border: '1px solid var(--border)', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '4rem', display: 'block', marginBottom: 16 }}>{percentage >= 70 ? '🎉' : '📚'}</span>
          <h1 style={{ fontSize: '1.8rem', marginBottom: 16, color: 'var(--foreground)' }}>Hoàn thành Part 7 Reading Comprehension!</h1>
          <div style={{ backgroundColor: 'var(--surface-hover)', padding: '16px 24px', borderRadius: 12, display: 'inline-block', marginBottom: 24 }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Kết quả: {totalScore} / {totalQuestions} ({percentage}%)</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.6 }}>
            {percentage >= 80
              ? 'Khả năng đọc hiểu và tìm kiếm thông tin của bạn rất tốt! Hãy tiếp tục rèn luyện tốc độ đọc.'
              : 'Part 7 yêu cầu kỹ năng skimming và scanning. Bạn nên đọc lướt câu hỏi trước rồi mới tìm đáp án trong bài!'}
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button onClick={() => window.location.reload()} className="btn-secondary">Làm lại đề này 🔄</button>
            <Link href="/" className="btn-primary">Về Dashboard 🏠</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Confetti show={showConfetti} />
      
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link href="/" className={styles.backBtn} style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            ← Về Dashboard
          </Link>
          <div>
            <h1 className={styles.title} style={{ margin: 0, fontSize: '1.25rem' }}>Part 7: Reading Comprehension</h1>
            <p className={styles.subtitle} style={{ margin: 0, fontSize: '0.875rem' }}>{passageSet.source || 'ETS Test'} - {passageSet.type} Passage ({currentPassageIndex + 1}/{passageSets.length})</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={() => setIsHighlightMode(!isHighlightMode)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              border: `1px solid ${isHighlightMode ? 'var(--primary-color, #2196F3)' : 'var(--border-color, #eee)'}`,
              backgroundColor: isHighlightMode ? 'var(--primary-light, #e3f2fd)' : 'transparent',
              cursor: 'pointer',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {isHighlightMode ? 'Tắt Highlight' : 'Bật Highlight'}
          </button>
          <div className={styles.timeAttackToggle} onClick={toggleTimeAttack}>
            <span style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}><ClockIcon size={16} /> Ép thời gian</span>
            <div className={`${styles.toggleSwitch} ${isTimeAttackEnabled ? styles.toggleSwitchOn : ''}`} />
          </div>
        </div>
      </header>

      <div className={styles.splitView}>
        {/* Left Side: Passages */}
        <section className={styles.leftPanel} onMouseUp={handleTextHighlight}>
          {passageSet.passages.map((passage, idx) => (
            <div key={passage.id} className={`${styles.passageCard} card-minimal`}>
              <div className={styles.passageHeader}>
                <span className={styles.passageTypeBadge}>{passage.type}</span>
                {passage.title && <h2 className={styles.passageTitle}>{passage.title}</h2>}
                <div className={styles.passageMeta}>
                  {passage.sender && <div>{passage.sender}</div>}
                  {passage.recipient && <div>{passage.recipient}</div>}
                  {passage.date && <div>{passage.date}</div>}
                </div>
              </div>
              <div className={styles.passageContent}>
                {renderContent(passage.content, passage.type)}
              </div>
            </div>
          ))}
        </section>

        {/* Right Side: Questions & Review */}
        <section className={styles.rightPanel}>
          {isTimeAttackEnabled && timeLeft !== null && !isSubmitted && (
            <div className={`${styles.timerContainer} ${timeLeft < 30 ? styles.timerDanger : timeLeft < 60 ? styles.timerWarning : ''}`}>
              <ClockIcon size={18} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'text-bottom' }} /> {Math.floor(timeLeft / 60).toString().padStart(2, '0')} : {(timeLeft % 60).toString().padStart(2, '0')}
            </div>
          )}

          {!isSubmitted ? (
            <div className={`${styles.questionCard} card-minimal`}>
              <div className={styles.qHeader}>
                <span className={styles.qIndicator}>
                  Question {activeQuestionIndex + 1} of {passageSet.questions.length}
                </span>
              </div>
              
              <h3 className={styles.qText}>{currentQuestion.number}. {currentQuestion.text}</h3>
              
              <div className={styles.optionsList}>
                {(Object.entries(currentQuestion.options) as [string, string][]).map(([key, val]) => {
                  const isSelected = answers[currentQuestion.id] === key;
                  return (
                    <button
                      key={key}
                      className={`${styles.optionBtn} ${isSelected ? styles.selectedOption : ''}`}
                      onClick={() => handleSelectAnswer(currentQuestion.id, key)}
                    >
                      <span className={styles.optionLetter}>{key}</span>
                      <span className={styles.optionText}>{val}</span>
                      <span className={styles.optionShortcut}>Nhấn {key}</span>
                    </button>
                  );
                })}
              </div>
              <p className={styles.shortcutHint}>⌨️ Mẹo: Sử dụng phím A, B, C, D để chọn đáp án và ⬅️ ➡️ để chuyển câu.</p>

              {/* Navigation below question */}
              <div className={styles.qNavigation}>
                <button 
                  className={styles.navBtn}
                  disabled={activeQuestionIndex === 0}
                  onClick={() => setActiveQuestionIndex(prev => prev - 1)}
                >
                  &larr; Prev
                </button>
                <button 
                  className={styles.navBtn}
                  disabled={activeQuestionIndex === passageSet.questions.length - 1}
                  onClick={() => setActiveQuestionIndex(prev => prev + 1)}
                >
                  Next &rarr;
                </button>
              </div>

              {allAnswered && (
                <button className={`${styles.submitBtn} animate-slide-up`} onClick={handleSubmit}>
                  Nộp bài & Xem giải thích
                </button>
              )}
            </div>
          ) : (
            <div className={styles.reviewSection}>
              <h2 className={styles.reviewTitle}>Giải thích chi tiết</h2>
              <div className={styles.explanationsList}>
                {passageSet.questions.map((q, index) => {
                  const isCorrect = answers[q.id] === q.correctAnswer;
                  return (
                    <div key={q.id} className={`${styles.explanationCard} card-minimal`}>
                      <div className={styles.exHeader}>
                        <span className={styles.exNumber}>Q{q.number}</span>
                        <span className={isCorrect ? styles.badgeCorrect : styles.badgeWrong}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <h3 className={styles.exQText}>{q.text}</h3>
                      <div className={styles.exContent}>
                        <p><strong>Bạn chọn:</strong> {answers[q.id] || 'Không làm'}</p>
                        <p><strong>Đáp án đúng:</strong> {q.correctAnswer} - {q.options[q.correctAnswer as keyof typeof q.options]}</p>
                        <div 
                          className={styles.exBox} 
                          dangerouslySetInnerHTML={{ __html: q.explanation }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>

      <PracticeFooter
        isAnswered={isSubmitted}
        isCorrect={currentSetScore === passageSet.questions.length}
        correctMessage={`Tuyệt vời! Bạn trả lời đúng ${passageSet.questions.length}/${passageSet.questions.length} câu hỏi.`}
        incorrectMessage={`Bạn trả lời đúng ${currentSetScore}/${passageSet.questions.length} câu hỏi.`}
        onNext={handleNextPassage}
        onAITutor={() => setTutorContext({
          partTitle: 'Part 7: Reading Comprehension',
          number: passageSet.questions[0].number,
          text: `Read the passages and answer the questions.`,
          options: { A: 'See full passage and explanations' },
          correctAnswer: 'A',
          explanation: passageSet.questions.map(q => `Q${q.number}: ${q.explanation}`).join('<br/><br/>'),
        })}
        nextLabel={currentPassageIndex + 1 === passageSets.length ? 'Xem tổng kết' : 'Đoạn văn tiếp theo ➔'}
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
