'use client';

import { useState, useEffect } from 'react';
import { VocabularyWord } from '../data/vocabulary';
import styles from './QuizCard.module.css';

interface QuizCardProps {
  word: VocabularyWord;
  options: string[]; // Vietnamese meanings
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuizCard({ word, options, onAnswer }: QuizCardProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset state when new word arrives
  useEffect(() => {
    setSelectedIdx(null);
    setIsAnimating(false);
  }, [word.id]);

  const handleSelect = (idx: number, option: string) => {
    if (selectedIdx !== null) return; // Prevent multiple clicks

    setSelectedIdx(idx);
    const isCorrect = option === word.vietnamese;
    
    if (!isCorrect) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500); // stop shake
    }

    // Delay before moving to next question to show feedback
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500);
  };

  return (
    <div className={`${styles.container} ${isAnimating ? styles.shake : ''}`}>
      <div className={`${styles.card} card-minimal`}>
        <span className={styles.badge}>Choose the correct meaning</span>
        <h2 className={styles.word}>{word.word}</h2>
        <p className={styles.ipa}>{word.ipa}</p>

        <div className={styles.optionsGrid}>
          {options.map((opt, idx) => {
            let btnStateClass = '';
            if (selectedIdx !== null) {
              if (opt === word.vietnamese) {
                btnStateClass = styles.correct;
              } else if (idx === selectedIdx) {
                btnStateClass = styles.wrong;
              } else {
                btnStateClass = styles.disabled;
              }
            }

            return (
              <button
                key={idx}
                className={`${styles.optionBtn} ${btnStateClass}`}
                onClick={() => handleSelect(idx, opt)}
                disabled={selectedIdx !== null}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
