'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Confetti from '@/components/Confetti';
import { Part6Passage, getRandomPart6Passage } from '@/data/part6';
import styles from './page.module.css';

export default function Part6Trainer() {
  const [passage, setPassage] = useState<Part6Passage | null>(null);
  const [activeBlank, setActiveBlank] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Client-side initialization
    setPassage(getRandomPart6Passage());
  }, []);

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
    // Check if score is perfect (4/4)
    let score = 0;
    passage.questions.forEach(q => {
      if (answers[q.blankNumber] === q.correctAnswer) score++;
    });
    if (score >= 3) {
      setShowConfetti(true);
    }
  };

  const renderPassage = () => {
    let content = passage.content;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    // We know placeholders are [1], [2], [3], [4]
    for (let i = 1; i <= 4; i++) {
      const placeholder = `[${i}]`;
      const placeholderIndex = content.indexOf(placeholder, lastIndex);
      
      if (placeholderIndex !== -1) {
        // Add text before placeholder
        elements.push(<span key={`text-${i}`}>{content.substring(lastIndex, placeholderIndex)}</span>);
        
        // Add the interactive blank
        const hasAnswer = !!answers[i];
        const isCurrentActive = activeBlank === i;
        
        let blankContent: React.ReactNode = String(i);
        let blankClass = styles.blank;
        
        if (hasAnswer) {
          const selectedKey = answers[i] as 'A'|'B'|'C'|'D';
          const q = passage.questions.find(q => q.blankNumber === i);
          blankContent = q ? q.options[selectedKey] : selectedKey;
          blankClass = `${styles.blank} ${styles.hasAnswer}`;
        }
        
        if (isCurrentActive && !isSubmitted) {
          blankClass = `${blankClass} ${styles.activeBlank}`;
        }

        // After submit, color code correct/wrong
        if (isSubmitted) {
          const q = passage.questions.find(q => q.blankNumber === i);
          if (q) {
            if (answers[i] === q.correctAnswer) {
              blankClass = `${styles.blank} ${styles.correctBlank}`;
            } else {
              blankClass = `${styles.blank} ${styles.wrongBlank}`;
              // Show correct answer if they got it wrong
              blankContent = <span className={styles.correctionText}>
                <del>{blankContent}</del> &rarr; {q.options[q.correctAnswer]}
              </span>;
            }
          }
        }

        elements.push(
          <button 
            key={`blank-${i}`} 
            className={blankClass}
            onClick={() => { if (!isSubmitted) setActiveBlank(i); }}
          >
            {blankContent}
          </button>
        );
        
        lastIndex = placeholderIndex + placeholder.length;
      }
    }
    
    // Add remaining text
    elements.push(<span key="text-end">{content.substring(lastIndex)}</span>);
    
    return <div className={styles.passageText}>{elements}</div>;
  };

  const currentQuestion = passage.questions.find(q => q.blankNumber === activeBlank) || passage.questions[0];
  const allAnswered = Object.keys(answers).length === 4;

  return (
    <div className={styles.pageContainer}>
      <Confetti show={showConfetti} />
      
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Part 6: Text Completion</h1>
          <p className={styles.subtitle}>{passage.source} - {passage.type}</p>
        </div>
        <Link href="/" className={styles.backBtn}>Thoát</Link>
      </header>

      <div className={styles.splitView}>
        {/* Left Side: Passage */}
        <section className={`${styles.passageSection} card-minimal`}>
          {passage.title && <h2 className={styles.passageTitle}>{passage.title}</h2>}
          {renderPassage()}
        </section>

        {/* Right Side: Questions & Review */}
        <section className={styles.questionSection}>
          {!isSubmitted ? (
            <div className={`${styles.questionCard} card-minimal`}>
              <div className={styles.qHeader}>
                <span className={styles.blankIndicator}>Question {activeBlank} of 4</span>
                <span className={styles.qType}>{currentQuestion.type}</span>
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
                        <span className={styles.exNumber}>Blank [{q.blankNumber}]</span>
                        <span className={isCorrect ? styles.badgeCorrect : styles.badgeWrong}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <div className={styles.exContent}>
                        <p><strong>Bạn chọn:</strong> {answers[q.blankNumber] || 'Không làm'}</p>
                        <p><strong>Đáp án đúng:</strong> {q.correctAnswer} - {q.options[q.correctAnswer]}</p>
                        <div className={styles.exBox}>
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className={styles.submitBtn} onClick={() => window.location.reload()}>
                Làm đoạn văn khác 🔄
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
