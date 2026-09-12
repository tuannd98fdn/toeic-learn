'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Confetti from '@/components/Confetti';
import { useSearchParams } from 'next/navigation';
import { NormalizedPart6Passage, Part6DataSchema } from '@/schema/toeic';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { useLeaveWarning } from '@/hooks/useLeaveWarning';
import { storage } from '@/utils/storage';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import PracticeFooter from '@/components/PracticeFooter';
import styles from './page.module.css';

export default function Part6Page() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang tải dữ liệu bài thi...</div>}>
      <Part6Trainer />
    </Suspense>
  );
}

function Part6Trainer() {
  const searchParams = useSearchParams();
  const testId = searchParams.get('test') || 'ets2022_test1';

  const [passages, setPassages] = useState<NormalizedPart6Passage[]>([]);
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const passage = passages[currentPassageIndex] || null;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeBlank, setActiveBlank] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentSetScore, setCurrentSetScore] = useState(0);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);

  const { addMistake } = useMistakeNotebook();
  useLeaveWarning(Object.keys(answers).length > 0 && !isSubmitted);

  useEffect(() => {
    const fetchPassage = async () => {
      try {
        setLoading(true);
        const match = testId.match(/ets(\d+)_test(\d+)/);
        if (!match) throw new Error("Invalid test ID");
        
        const path = `/data/ets${match[1]}/test${match[2]}/part6.json`;
        const res = await fetch(path);
        
        if (!res.ok) throw new Error("Failed to fetch test data");
        
        const data = await res.json();
        const validated = Part6DataSchema.parse(data);
        
        if (validated.length > 0) {
          // Re-map questions to include a sequential blankNumber (1 to 4) because original parser uses full question numbers
          const normalizedPassages = validated.map(p => ({
            ...p,
            questions: p.questions.map((q, idx) => ({
              ...q,
              blankNumber: idx + 1
            }))
          }));
          
          setPassages(normalizedPassages as NormalizedPart6Passage[]);
        } else {
          setError("No passages found");
        }
      } catch (err: any) {
        console.error("Error loading Part 6 data:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPassage();
  }, [testId]);

  const handleSelectAnswer = (blankNumber: number, optionKey: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [blankNumber]: optionKey }));
    
    // Auto move to next blank if not on the last one
    if (blankNumber < 4) {
      setActiveBlank(blankNumber + 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let score = 0;
    passage?.questions.forEach((q) => {
      if (answers[q.blankNumber] === q.correctAnswer) {
        score++;
      } else {
        addMistake(`exam_${testId}_part6_${q.id}`, {
          type: 'exam',
          testId: testId,
          part: 'part6',
          questionId: q.id,
          subCategory: q.subCategory || q.type,
          grammarTag: q.grammarTag,
        });
      }
    });
    
    setCurrentSetScore(score);
    setTotalScore(prev => prev + score);
    if (score === (passage?.questions.length || 0)) {
      setShowConfetti(true);
    }
  };

  const handleNextPassage = () => {
    if (currentPassageIndex < passages.length - 1) {
      setTotalQuestions(prev => prev + (passage?.questions.length || 0));
      setCurrentPassageIndex(prev => prev + 1);
      setAnswers({});
      setIsSubmitted(false);
      setShowConfetti(false);
      setActiveBlank(1);
    } else {
      // Show results
      const finalTotal = totalScore;
      const finalQuestions = totalQuestions + (passage?.questions.length || 0);
      setTotalScore(finalTotal);
      setTotalQuestions(finalQuestions);
      setIsFinished(true);
      storage.set(`progress_${testId}_part6`, true);
      if ((finalTotal / finalQuestions) >= 0.7) {
        setShowConfetti(true);
      }
    }
  };

  // Keyboard Shortcuts for 10/10 UX
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (!passage || isSubmitted) return;

      const key = e.key.toUpperCase();
      const currentQ = passage.questions[activeBlank - 1];

      if (['A', 'B', 'C', 'D'].includes(key)) {
        if (currentQ?.options && currentQ.options[key as keyof typeof currentQ.options]) {
          handleSelectAnswer(activeBlank, key);
        }
      } else if (e.key === 'ArrowLeft') {
        setActiveBlank(prev => Math.max(1, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveBlank(prev => Math.min(4, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (loading) {
    return <div className={styles.loading}>Đang tải dữ liệu bài thi...</div>;
  }

  if (error) {
    return <div className={styles.loading} style={{color: 'var(--danger)'}}>Lỗi: {error}</div>;
  }

  if (!passage) {
    return <div className={styles.loading}>Loading Passage...</div>;
  }

  const renderPassage = () => {
    let content = passage.content;
    
    passage.questions.forEach((q) => {
      // Find `(131) ___` or similar
      const regex = new RegExp(`\\(${q.number}\\)\\s*_{3,}`, 'g');
      
      const hasAnswer = !!answers[q.blankNumber];
      const isCurrentActive = activeBlank === q.blankNumber;
      
      let blankContent = String(q.blankNumber);
      let blankClasses = [styles.blank];
      
      if (hasAnswer) {
        const selectedKey = answers[q.blankNumber] as 'A'|'B'|'C'|'D';
        blankContent = q.options[selectedKey];
        blankClasses.push(styles.hasAnswer);
      }
      
      if (isCurrentActive && !isSubmitted) {
        blankClasses.push(styles.activeBlank);
      }
      
      if (isSubmitted) {
        if (answers[q.blankNumber] === q.correctAnswer) {
          blankClasses.push(styles.correctBlank);
        } else {
          blankClasses.push(styles.wrongBlank);
          const correctKey = q.correctAnswer as 'A'|'B'|'C'|'D';
          blankContent = `<span class="${styles.correctionText}"><del>${blankContent}</del> ${q.options[correctKey]}</span>`;
        }
      }
      
      const htmlSpan = `<span class="${blankClasses.join(' ')}" data-blank="${q.blankNumber}">${blankContent}</span>`;
      content = content.replace(regex, htmlSpan);
    });

    return (
      <div 
        className={styles.passageText} 
        dangerouslySetInnerHTML={{ __html: content }} 
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const blankElement = target.closest('[data-blank]');
          if (blankElement) {
            const blankNumber = parseInt(blankElement.getAttribute('data-blank') || '0', 10);
            if (blankNumber) setActiveBlank(blankNumber);
          }
        }}
      />
    );
  };

  const currentQuestion = passage.questions[activeBlank - 1];
  const allAnswered = Object.keys(answers).length === 4;

  if (isFinished) {
    const percentage = Math.round((totalScore / totalQuestions) * 100);
    return (
      <div className={styles.pageContainer}>
        <Confetti show={showConfetti} />
        <div className={styles.resultsCard} style={{ margin: '40px auto', maxWidth: 600, padding: 40, textAlign: 'center', backgroundColor: 'var(--glass-bg)', borderRadius: 24, border: '1px solid var(--border)', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '4rem', display: 'block', marginBottom: 16 }}>{percentage >= 70 ? '🎉' : '📚'}</span>
          <h1 style={{ fontSize: '1.8rem', marginBottom: 16, color: 'var(--foreground)' }}>Hoàn thành Part 6 Text Completion!</h1>
          <div style={{ backgroundColor: 'var(--surface-hover)', padding: '16px 24px', borderRadius: 12, display: 'inline-block', marginBottom: 24 }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Kết quả: {totalScore} / {totalQuestions} ({percentage}%)</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.6 }}>
            {percentage >= 80
              ? 'Kỹ năng điền từ và đọc hiểu ngữ cảnh của bạn rất tốt! Hãy tiếp tục duy trì nhé.'
              : 'Part 6 đòi hỏi hiểu rõ ngữ cảnh của toàn đoạn văn. Đừng chỉ nhìn vào câu chứa chỗ trống, hãy đọc cả câu trước và sau nó!'}
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
            <h1 className={styles.title} style={{ margin: 0, fontSize: '1.25rem' }}>Part 6: Text Completion</h1>
            <p className={styles.subtitle} style={{ margin: 0, fontSize: '0.875rem' }}>{passage.source} - {passage.type} ({currentPassageIndex + 1}/{passages.length})</p>
          </div>
        </div>
      </header>

      <div className={styles.splitView}>
        {/* Left Side: Passage */}
        <section className={`${styles.passageSection} card-minimal`}>
          {passage.title && passage.title !== 'Part 6 Passage' && <h2 className={styles.passageTitle}>{passage.title}</h2>}
          {renderPassage()}
        </section>

        {/* Right Side: Questions & Review */}
        <section className={styles.questionSection}>
          {!isSubmitted ? (
            <div className={`${styles.questionCard} card-minimal`}>
              <div className={styles.qHeader}>
                <span className={styles.blankIndicator}>Question {activeBlank} of 4</span>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <span className={styles.qType}>Q{currentQuestion.number}</span>
                  {currentQuestion.subCategory && (
                    <span className={styles.blankIndicator} style={{ background: 'rgba(99, 102, 241, 0.12)', color: 'var(--primary)', fontWeight: 600 }}>
                      {currentQuestion.subCategory}
                    </span>
                  )}
                </div>
              </div>
              
              <div className={styles.optionsList}>
                {(Object.entries(currentQuestion.options) as [string, string][]).map(([key, val]) => {
                  const isSelected = answers[activeBlank] === key;
                  return (
                    <button
                      key={key}
                      className={`${styles.optionBtn} ${isSelected ? styles.selectedOption : ''}`}
                      onClick={() => handleSelectAnswer(activeBlank, key)}
                    >
                      <span className={styles.optionLetter}>{key}</span>
                      <span className={styles.optionText}>{val}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation below question */}
              <div className={styles.qNavigation}>
                <button 
                  className={styles.navBtn}
                  disabled={activeBlank === 1}
                  onClick={() => setActiveBlank(prev => prev - 1)}
                >
                  &larr; Prev
                </button>
                <button 
                  className={styles.navBtn}
                  disabled={activeBlank === 4}
                  onClick={() => setActiveBlank(prev => prev + 1)}
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
                {passage.questions.map(q => {
                  const isCorrect = answers[q.blankNumber] === q.correctAnswer;
                  return (
                    <div key={q.id} className={`${styles.explanationCard} card-minimal`}>
                      <div className={styles.exHeader}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span className={styles.exNumber}>Blank [{q.blankNumber}] - Q{q.number}</span>
                          {q.subCategory && (
                            <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(99, 102, 241, 0.12)', color: 'var(--primary)', fontWeight: 600 }}>
                              {q.subCategory}
                            </span>
                          )}
                        </div>
                        <span className={isCorrect ? styles.badgeCorrect : styles.badgeWrong}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <div className={styles.exContent}>
                        <p><strong>Bạn chọn:</strong> {answers[q.blankNumber] || 'Không làm'}</p>
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
        isCorrect={currentSetScore === passage.questions.length}
        correctMessage={`Xuất sắc! Bạn điền đúng cả ${passage.questions.length} chỗ trống.`}
        incorrectMessage={`Bạn điền đúng ${currentSetScore}/${passage.questions.length} chỗ trống.`}
        onNext={handleNextPassage}
        onAITutor={() => setTutorContext({
          partTitle: 'Part 6: Text Completion',
          number: passage.questions[0].number,
          text: `Passage Title: ${passage.title || 'Text Completion'}. Questions: ${passage.questions.map(q => q.number).join(', ')}`,
          options: { A: 'See full passage and explanations' },
          correctAnswer: 'A',
          explanation: passage.questions.map(q => `Blank ${q.blankNumber} (Q${q.number}): ${q.explanation}`).join('<br/><br/>'),
          subCategory: Array.from(new Set(passage.questions.map(q => q.subCategory).filter(Boolean))).join(', '),
        })}
        nextLabel={currentPassageIndex + 1 === passages.length ? 'Xem tổng kết' : 'Đoạn văn tiếp theo'}
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
