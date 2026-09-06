'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Confetti from '@/components/Confetti';
import { useSearchParams } from 'next/navigation';
import { Part7PassageSet, Part7DataSchema } from '@/schema/toeic';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
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

  if (loading) {
    return <div className={styles.loading}>Đang tải dữ liệu bài thi...</div>;
  }

  if (error) {
    return <div className={styles.loading} style={{color: 'var(--danger)'}}>Lỗi: {error}</div>;
  }

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

  const handleNextPassage = () => {
    if (currentPassageIndex < passageSets.length - 1) {
      setCurrentPassageIndex(prev => prev + 1);
      setAnswers({});
      setIsSubmitted(false);
      setShowConfetti(false);
      setActiveQuestionIndex(0);
    } else {
      // Completed all passages
      window.location.href = '/';
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

  return (
    <div className={styles.pageContainer}>
      <Confetti show={showConfetti} />
      
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Part 7: Reading Comprehension</h1>
          <p className={styles.subtitle}>{passageSet.source || 'ETS Test'} - {passageSet.type} Passage ({currentPassageIndex + 1}/{passageSets.length})</p>
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
        nextLabel={currentPassageIndex + 1 === passageSets.length ? 'Xem tổng kết 🎉' : 'Đoạn văn tiếp theo ➔'}
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
