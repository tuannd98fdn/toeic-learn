'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { VocabularyWord, getReadingCollocations } from '@/data/vocabulary';
import { AwardIcon, ClockIcon, ArrowRightIcon, RotateCcwIcon, CheckCircleIcon, AlertCircleIcon, LinkIcon, CardsIcon } from '@/components/icons/AppIcons';
import styles from '@/app/study/page.module.css';

interface DrillQuestion {
  word: VocabularyWord;
  sentence: string;
  targetKey: string;
  options: string[];
  correctIndex: number;
}

interface CollocationDrillProps {
  onWordReviewed?: () => void;
  onSwitchMode?: (mode: 'flashcard' | 'match') => void;
}

const TIME_LIMIT_SECONDS = 10;

function initDrillQuestions(allCollocations: VocabularyWord[]): DrillQuestion[] {
  if (!allCollocations || allCollocations.length === 0) return [];

  const shuffledWords = [...allCollocations]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  return shuffledWords.map(word => {
    const wordsInPhrase = word.word.trim().split(/\s+/);
    const targetKey = wordsInPhrase[wordsInPhrase.length - 1].replace(/[.,]/g, '');

    let sentence = '';
    const example = word.examples[0] || word.word;
    
    const regex = new RegExp(`\\b${targetKey}\\b`, 'i');
    if (regex.test(example)) {
      sentence = example.replace(regex, '_____');
    } else {
      sentence = word.word.replace(regex, '_____');
    }

    const pool = allCollocations
      .filter(w => w.id !== word.id)
      .map(w => {
        const parts = w.word.trim().split(/\s+/);
        return parts[parts.length - 1].replace(/[.,]/g, '');
      })
      .filter(k => k.toLowerCase() !== targetKey.toLowerCase());

    const uniquePool = Array.from(new Set(pool));
    const shuffledDistractors = uniquePool
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allOptions = [targetKey, ...shuffledDistractors].sort(() => Math.random() - 0.5);
    const correctIndex = allOptions.findIndex(opt => opt.toLowerCase() === targetKey.toLowerCase());

    return {
      word,
      sentence,
      targetKey,
      options: allOptions,
      correctIndex,
    };
  });
}

export default function CollocationDrill({
  onWordReviewed,
  onSwitchMode,
}: CollocationDrillProps) {
  const allCollocations = useMemo(() => getReadingCollocations(), []);
  const [questions, setQuestions] = useState<DrillQuestion[]>(() => initDrillQuestions(allCollocations));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SECONDS);
  const [isFinished, setIsFinished] = useState(false);

  const generateQuestions = useCallback(() => {
    setQuestions(initDrillQuestions(allCollocations));
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setTimeLeft(TIME_LIMIT_SECONDS);
    setIsFinished(false);
  }, [allCollocations]);

  const currentQ = questions[currentIndex];

  // Answer handler
  const handleSelectOption = useCallback((index: number) => {
    if (isAnswered || !currentQ) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    onWordReviewed?.();
  }, [isAnswered, currentQ, onWordReviewed]);

  // Timer countdown
  useEffect(() => {
    if (isAnswered || isFinished || !currentQ) return;

    if (timeLeft <= 0) {
      // Time is up -> treat as wrong
      handleSelectOption(-1);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered, isFinished, currentQ, handleSelectOption]);

  // Next question
  const handleNextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(TIME_LIMIT_SECONDS);
    } else {
      setIsFinished(true);
    }
  }, [currentIndex, questions.length]);

  // Keyboard shortcut listener (1, 2, 3, 4 for options, Space/Enter for next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key) && !isAnswered) {
        const optionIdx = parseInt(e.key, 10) - 1;
        if (optionIdx >= 0 && optionIdx < 4) {
          handleSelectOption(optionIdx);
        }
      } else if ((e.key === ' ' || e.key === 'Enter') && isAnswered) {
        e.preventDefault();
        handleNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, handleSelectOption, handleNextQuestion]);

  if (isFinished) {
    const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    return (
      <div className={styles.interactiveContainer}>
        <div className={styles.emptyCard} style={{ margin: '20px auto' }}>
          <div className={styles.iconWrapper}>
            <AwardIcon size={44} className={styles.glowIcon} />
          </div>
          <h2>Kết Quả Luyện Phản Xạ Collocation!</h2>
          <p>
            Bạn đã trả lời đúng <strong>{score}/{questions.length}</strong> câu ({percentage}%).
            {percentage >= 80 ? ' Tốc độ phản xạ cụm từ công sở rất tốt!' : ' Hãy tiếp tục rèn luyện để tạo phản xạ tức thì khi làm Part 5 & 6.'}
          </p>
          <div className={styles.actions}>
            <button onClick={generateQuestions} className="btn-primary" style={{ cursor: 'pointer', width: '100%', justifyContent: 'center' }}>
              <RotateCcwIcon size={18} style={{ marginRight: '8px' }} />
              Luyện tiếp 10 câu mới
            </button>
            {onSwitchMode && (
              <button onClick={() => onSwitchMode('match')} className="btn-secondary" style={{ cursor: 'pointer', width: '100%', justifyContent: 'center' }}>
                <LinkIcon size={18} style={{ marginRight: '8px' }} />
                Ghép Cặp Paraphrase Part 7
              </button>
            )}
            {onSwitchMode && (
              <button onClick={() => onSwitchMode('flashcard')} className="btn-secondary" style={{ cursor: 'pointer', width: '100%', justifyContent: 'center', border: 'none', background: 'transparent' }}>
                <CardsIcon size={18} style={{ marginRight: '8px' }} />
                Trở về Thẻ ghi nhớ SRS
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  const timerPercentage = (timeLeft / TIME_LIMIT_SECONDS) * 100;
  const isTimeWarning = timeLeft <= 5 && timeLeft > 2;
  const isTimeDanger = timeLeft <= 2;

  return (
    <div className={styles.interactiveContainer}>
      <div className={styles.interactiveHeader}>
        <div className={styles.interactiveBadge}>
          Reading Speed Drill
        </div>
        <h2 className={styles.interactiveTitle}>Phản Xạ Cụm Từ Collocation Part 5 & 6</h2>
        <p className={styles.interactiveDesc}>
          Chọn từ khóa thích hợp nhất để hoàn chỉnh cụm từ cố định trong 10 giây.
        </p>
      </div>

      <div className={styles.drillCard}>
        {/* Top Timer Bar */}
        <div className={styles.timerBarBg}>
          <div
            className={`${styles.timerBarFill} ${isTimeDanger ? styles.timerBarDanger : isTimeWarning ? styles.timerBarWarning : ''}`}
            style={{ width: `${timerPercentage}%` }}
          />
        </div>

        <div className={styles.drillQuestionHeader}>
          <span className={styles.drillTypeBadge}>
            Câu {currentIndex + 1} / {questions.length}
          </span>
          <span className={styles.drillTimer}>
            <ClockIcon size={14} />
            {timeLeft}s
          </span>
        </div>

        <div className={styles.drillSentence}>
          &ldquo;{currentQ.sentence}&rdquo;
        </div>
        <div className={styles.drillVietnamese}>
          Ý nghĩa gợi ý: {currentQ.word.vietnamese}
        </div>

        {/* Options Grid */}
        <div className={styles.drillOptionsGrid}>
          {currentQ.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let optionClass = styles.drillOptionBtn;
            if (isAnswered) {
              if (isCorrect) {
                optionClass += ` ${styles.optionCorrect}`;
              } else if (isSelected) {
                optionClass += ` ${styles.optionWrong}`;
              }
            }

            return (
              <button
                key={`opt-${idx}-${option}`}
                data-testid={`drill-option-${idx}`}
                type="button"
                className={optionClass}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
              >
                <span className={styles.optionLetter}>{letter}</span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Pedagogical Explanation */}
        {isAnswered && (
          <div className={styles.explanationBox} data-testid="collocation-explanation">
            <div className={styles.explanationHeader}>
              {selectedOption === currentQ.correctIndex ? (
                <>
                  <CheckCircleIcon size={16} />
                  <span>Chính xác!</span>
                </>
              ) : (
                <>
                  <AlertCircleIcon size={16} />
                  <span>{selectedOption === -1 ? 'Hết thời gian!' : 'Chưa chính xác!'}</span>
                </>
              )}
            </div>
            <div className={styles.explanationCollocation}>
              Cụm từ cố định: {currentQ.word.word} ({currentQ.word.vietnamese})
            </div>
            {currentQ.word.mnemonicTip && (
              <div className={styles.explanationText}>
                {currentQ.word.mnemonicTip}
              </div>
            )}
            <button
              type="button"
              className={styles.drillNextBtn}
              onClick={handleNextQuestion}
            >
              <span>{currentIndex < questions.length - 1 ? 'Câu tiếp theo (Phím Space)' : 'Xem kết quả'}</span>
              <ArrowRightIcon size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
