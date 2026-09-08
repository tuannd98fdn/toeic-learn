'use client';

import { useState, useEffect } from 'react';
import { VocabularyWord } from '../data/vocabulary';
import { useAudio } from '../hooks/useAudio';
import { VolumeIcon, FrownIcon, BrainIcon, ThumbsUpIcon, ZapIcon } from './icons/AppIcons';
import styles from './FlashCard.module.css';

interface FlashCardProps {
  word: VocabularyWord;
  onRate: (rating: 1 | 2 | 3 | 4) => void;
}

export default function FlashCard({ word, onRate }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { speak } = useAudio();

  // Reset flip state when word changes
  useEffect(() => {
    setIsFlipped(false);
  }, [word.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (isFlipped) {
        if (e.key === '1') onRate(1);
        if (e.key === '2') onRate(2);
        if (e.key === '3') onRate(3);
        if (e.key === '4') onRate(4);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, onRate]);

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent flipping card
    speak(word.word);
  };

  return (
    <div className={styles.container}>
      <div 
        className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
        onClick={() => setIsFlipped(true)}
      >
        {/* Front side */}
        <div className={`${styles.face} ${styles.front} card-minimal`}>
          <div className={styles.badgeContainer}>
            <div className={styles.categoryBadge}>{word.category}</div>
            {word.targetBand && (
              <div className={styles.bandBadge}>
                {word.targetBand}
              </div>
            )}
          </div>
          <div className={styles.wordContainer}>
            <h1 className={styles.word}>{word.word}</h1>
            <p className={styles.ipa}>{word.ipa}</p>
          </div>
          <button 
            className={styles.audioButton} 
            onClick={handlePlayAudio}
            aria-label="Play pronunciation"
          >
            <VolumeIcon size={24} className={styles.audioIcon} />
          </button>
          {!isFlipped && <div className={styles.hint}>Tap or press Space to flip</div>}
        </div>

        {/* Back side */}
        <div className={`${styles.face} ${styles.back} card-minimal`}>
          <div className={styles.meaningContainer}>
            <span className={styles.partOfSpeech}>{word.partOfSpeech}</span>
            <h2 className={styles.meaning}>{word.vietnamese}</h2>
          </div>

          <div className={styles.examples}>
            {word.examples.map((ex, idx) => (
              <p key={idx} className={styles.example}>&quot;{ex}&quot;</p>
            ))}
          </div>

          <div className={styles.mnemonic}>
            <span className={styles.emoji}>{word.emoji}</span>
            <p>{word.mnemonicTip}</p>
          </div>
        </div>
      </div>

      {/* Rating Buttons */}
      <div className={`${styles.controls} ${isFlipped ? styles.visible : ''}`}>
        <button className={`${styles.rateBtn} ${styles.btnAgain}`} onClick={() => onRate(1)}>
          <span className={styles.btnIcon}><FrownIcon size={20} /></span>
          <span className={styles.btnLabel}>Quên rồi (1)</span>
        </button>
        <button className={`${styles.rateBtn} ${styles.btnHard}`} onClick={() => onRate(2)}>
          <span className={styles.btnIcon}><BrainIcon size={20} /></span>
          <span className={styles.btnLabel}>Khó (2)</span>
        </button>
        <button className={`${styles.rateBtn} ${styles.btnGood}`} onClick={() => onRate(3)}>
          <span className={styles.btnIcon}><ThumbsUpIcon size={20} /></span>
          <span className={styles.btnLabel}>OK (3)</span>
        </button>
        <button className={`${styles.rateBtn} ${styles.btnEasy}`} onClick={() => onRate(4)}>
          <span className={styles.btnIcon}><ZapIcon size={20} /></span>
          <span className={styles.btnLabel}>Dễ (4)</span>
        </button>
      </div>
    </div>
  );
}
