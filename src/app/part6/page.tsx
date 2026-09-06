'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Confetti from '@/components/Confetti';
import { useSearchParams } from 'next/navigation';
import { NormalizedPart6Passage, Part6DataSchema } from '@/schema/toeic';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
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
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentSetScore, setCurrentSetScore] = useState(0);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);

  const { addMistake } = useMistakeNotebook();

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

  if (loading) {
    return <div className={styles.loading}>Đang tải dữ liệu bài thi...</div>;
  }

  if (error) {
    return <div className={styles.loading} style={{color: 'var(--danger)'}}>Lỗi: {error}</div>;
  }

  if (!passage) {
    return <div className={styles.loading}>Loading Passage...</div>;
  }

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
    passage.questions.forEach((q) => {
      if (answers[q.blankNumber] === q.correctAnswer) {
        score++;
      } else {
        addMistake(`exam_${testId}_part6_${q.id}`, {
          type: 'exam',
          testId: testId,
          part: 'part6',
          questionId: q.id
        });
      }
    });
    
    setCurrentSetScore(score);
    if (score === passage.questions.length) {
      setShowConfetti(true);
    }
  };

  const handleNextPassage = () => {
    if (currentPassageIndex < passages.length - 1) {
      setCurrentPassageIndex(prev => prev + 1);
      setAnswers({});
      setIsSubmitted(false);
      setShowConfetti(false);
      setActiveBlank(1);
    } else {
      // Completed all passages
      window.location.href = '/';
    }
  };

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

  return (
    <div className={styles.pageContainer}>
      <Confetti show={showConfetti} />
      
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Part 6: Text Completion</h1>
          <p className={styles.subtitle}>{passage.source} - {passage.type} ({currentPassageIndex + 1}/{passages.length})</p>
        </div>
        <Link href="/" className={styles.backBtn}>Thoát</Link>
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
                <span className={styles.qType}>Q{currentQuestion.number}</span>
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
                        <span className={styles.exNumber}>Blank [{q.blankNumber}] - Q{q.number}</span>
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
        })}
        nextLabel={currentPassageIndex + 1 === passages.length ? 'Xem tổng kết 🎉' : 'Đoạn văn tiếp theo ➔'}
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
