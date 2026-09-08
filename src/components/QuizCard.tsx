'use client';

import { useState, useEffect, useCallback } from 'react';
import { VocabularyWord } from '../data/vocabulary';
import { VolumeIcon, SparklesIcon } from './icons/AppIcons';
import { useAudio } from '@/hooks/useAudio';
import { soundEffects } from '@/utils/soundEffects';
import styles from './QuizCard.module.css';

interface QuizCardProps {
  word: VocabularyWord;
  options: string[]; // Vietnamese meanings
  onAnswer: (isCorrect: boolean, selectedOption?: string) => void;
  autoPlayAudio?: boolean;
}

const OPTION_KEYS = ['A', 'B', 'C', 'D'];

export default function QuizCard({ word, options, onAnswer, autoPlayAudio = true }: QuizCardProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { speak, speaking } = useAudio();

  // Reset state when new word arrives
  useEffect(() => {
    setSelectedIdx(null);
    setIsAnimating(false);
    if (autoPlayAudio && word?.word) {
      const timer = setTimeout(() => {
        speak(word.word);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [word?.id, autoPlayAudio, speak, word?.word]);

  const handleSelect = useCallback((idx: number, option: string) => {
    if (selectedIdx !== null) return; // Prevent multiple clicks

    setSelectedIdx(idx);
    const isCorrect = option === word.vietnamese;

    if (isCorrect) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playWrong();
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500); // stop shake
    }

    // Delay before moving to next question to show feedback
    setTimeout(() => {
      onAnswer(isCorrect, option);
    }, 1200);
  }, [selectedIdx, word.vietnamese, onAnswer]);

  // Keyboard shortcut listener (1-4 and A-D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx !== null) return;

      const key = e.key.toUpperCase();
      let targetIdx = -1;

      if (['1', '2', '3', '4'].includes(key)) {
        targetIdx = parseInt(key, 10) - 1;
      } else if (['A', 'B', 'C', 'D'].includes(key)) {
        targetIdx = OPTION_KEYS.indexOf(key);
      }

      if (targetIdx >= 0 && targetIdx < options.length) {
        handleSelect(targetIdx, options[targetIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options, selectedIdx, handleSelect]);

  return (
    <div className={`${styles.container} ${isAnimating ? styles.shake : ''}`}>
      <div className={`${styles.card} card-glass`}>
        <div className={styles.tagRow}>
          <span className={styles.badge}>
            <SparklesIcon size={14} />
            Chọn nghĩa chính xác
          </span>
          {word.partOfSpeech && (
            <span className={styles.categoryTag}>
              {word.partOfSpeech}
            </span>
          )}
          {word.targetBand && (
            <span className={styles.bandTag}>
              Target {word.targetBand}
            </span>
          )}
        </div>

        <div className={styles.wordContainer}>
          <h2 className={styles.word}>{word.word}</h2>
          <button
            className={`${styles.audioBtn} ${speaking ? styles.speaking : ''}`}
            onClick={() => speak(word.word)}
            title="Phát âm từ này (Web Audio)"
            aria-label="Phát âm"
          >
            <VolumeIcon size={20} />
          </button>
        </div>

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
                <span className={styles.optionKey}>{OPTION_KEYS[idx]}</span>
                <span className={styles.optionText}>{opt}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.shortcutHint}>
          Mẹo: Dùng phím <span className={styles.keyChip}>A</span> <span className={styles.keyChip}>B</span> <span className={styles.keyChip}>C</span> <span className={styles.keyChip}>D</span> hoặc số <span className={styles.keyChip}>1-4</span> để trả lời nhanh
        </div>
      </div>
    </div>
  );
}
