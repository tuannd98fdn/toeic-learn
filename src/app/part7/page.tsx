'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Confetti from '@/components/Confetti';
import { Part7PassageSet, getRandomPart7Passage } from '@/data/part7';
import styles from './page.module.css';

export default function Part7Trainer() {
  const [passageSet, setPassageSet] = useState<Part7PassageSet | null>(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Client-side initialization
    setPassageSet(getRandomPart7Passage());
  }, []);

  if (!passageSet) {
    return <div className={styles.loading}>Loading Passage...</div>;
  }

  const currentQuestion = passageSet.questions[activeQuestionIndex];
  const allAnswered = Object.keys(answers).length === passageSet.questions.length;

  const handleSelectAnswer = (questionId: string, optionKey: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionKey }));
    
    // Auto move to next question if not on the last one
    if (activeQuestionIndex < passageSet.questions.length - 1) {
      // Delay slightly for better UX so user sees their selection
      setTimeout(() => {
        setActiveQuestionIndex(prev => prev + 1);
      }, 300);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Check if score is perfect
    let score = 0;
    passageSet.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
    // Threshold for confetti: getting all questions correct
    if (score === passageSet.questions.length) {
      setShowConfetti(true);
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

    // Default text rendering, replace newlines with paragraphs
    const paragraphs = content.split('\n\n');
    return (
      <div className={styles.passageText}>
        {paragraphs.map((p, idx) => (
          <p key={idx} style={{ marginBottom: '15px' }}>{p}</p>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.pageContainer}>
      <Confetti show={showConfetti} />
      
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Part 7: Reading Comprehension</h1>
          <p className={styles.subtitle}>{passageSet.source} - {passageSet.type} Passage</p>
        </div>
        <Link href="/" className={styles.backBtn}>Thoát</Link>
      </header>

      <div className={styles.splitView}>
        {/* Left Side: Passages */}
        <section className={styles.leftPanel}>
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
          {!isSubmitted ? (
            <div className={`${styles.questionCard} card-minimal`}>
              <div className={styles.qHeader}>
                <span className={styles.qIndicator}>
                  Question {activeQuestionIndex + 1} of {passageSet.questions.length}
                </span>
                <span className={styles.qTypeBadge}>{currentQuestion.type}</span>
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
                    </button>
                  );
                })}
              </div>

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
                Làm bài đọc khác 🔄
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
