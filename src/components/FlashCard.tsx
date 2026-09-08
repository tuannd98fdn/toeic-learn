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
    e.stopPropagation();
    speak(word.word);
  };

  return (
    <div className={styles.container}>
      {/* 3D Flip Card */}
      <div className={styles.perspective}>
        <div 
          className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
          onClick={() => setIsFlipped(true)}
        >
          {/* Front side */}
          <div className={`${styles.face} ${styles.front}`}>
            <div className={styles.frontGlow} />
            <div className={styles.badgeRow}>
              <span className={styles.categoryBadge}>{word.category}</span>
              {word.targetBand && <span className={styles.bandBadge}>{word.targetBand}</span>}
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
              <VolumeIcon size={22} />
            </button>
            {!isFlipped && <div className={styles.hint}>Tap hoặc nhấn Space để lật</div>}
          </div>

          {/* Back side */}
          <div className={`${styles.face} ${styles.back}`}>
            <div className={styles.backGlow} />
            <div className={styles.meaningContainer}>
              <span className={styles.partOfSpeech}>{word.partOfSpeech}</span>
              <h2 className={styles.meaning}>{word.vietnamese}</h2>
            </div>

            {word.examples.length > 0 && (
              <div className={styles.examples}>
                {word.examples.map((ex, idx) => (
                  <p key={idx} className={styles.example}>&quot;{ex}&quot;</p>
                ))}
              </div>
            )}

            {(word.mnemonicTip || word.emoji) && (
              <div className={styles.mnemonic}>
                <span className={styles.emoji}>{word.emoji}</span>
                <p>{word.mnemonicTip}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rating Buttons */}
      <div className={`${styles.controls} ${isFlipped ? styles.visible : ''}`}>
        <button className={`${styles.rateBtn} ${styles.btnAgain}`} onClick={() => onRate(1)}>
          <span className={styles.btnIcon}><FrownIcon size={20} /></span>
          <span className={styles.btnLabel}>Quên</span>
          <span className={styles.btnKey}>1</span>
        </button>
        <button className={`${styles.rateBtn} ${styles.btnHard}`} onClick={() => onRate(2)}>
          <span className={styles.btnIcon}><BrainIcon size={20} /></span>
          <span className={styles.btnLabel}>Khó</span>
          <span className={styles.btnKey}>2</span>
        </button>
        <button className={`${styles.rateBtn} ${styles.btnGood}`} onClick={() => onRate(3)}>
          <span className={styles.btnIcon}><ThumbsUpIcon size={20} /></span>
          <span className={styles.btnLabel}>OK</span>
          <span className={styles.btnKey}>3</span>
        </button>
        <button className={`${styles.rateBtn} ${styles.btnEasy}`} onClick={() => onRate(4)}>
          <span className={styles.btnIcon}><ZapIcon size={20} /></span>
          <span className={styles.btnLabel}>Dễ</span>
          <span className={styles.btnKey}>4</span>
        </button>
      </div>
    </div>
  );
}
