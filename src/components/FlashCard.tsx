'use client';

import { useState, useEffect } from 'react';
import { VocabularyWord } from '../data/vocabulary';
import { useAudio } from '../hooks/useAudio';
import { VolumeIcon, FrownIcon, BrainIcon, ThumbsUpIcon, ZapIcon } from './icons/AppIcons';
import styles from './FlashCard.module.css';

interface FlashCardProps {
  word: VocabularyWord;
  onRate: (rating: 1 | 2 | 3 | 4) => void;
  autoPlay?: boolean;
}

export default function FlashCard({ word, onRate, autoPlay = true }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { speak, speaking } = useAudio();

  // Reset flip state and trigger auto-play if enabled
  useEffect(() => {
    setIsFlipped(false);
    let timer: NodeJS.Timeout | undefined;
    if (autoPlay) {
      timer = setTimeout(() => {
        speak(word.word);
      }, 150);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [word.id, autoPlay, speak, word.word]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const keyLower = e.key.toLowerCase();

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (keyLower === 'a' || keyLower === 'r') {
        e.preventDefault();
        speak(word.word);
      } else if (isFlipped) {
        if (e.key === '1') onRate(1);
        if (e.key === '2') onRate(2);
        if (e.key === '3') onRate(3);
        if (e.key === '4') onRate(4);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, onRate, speak, word.word]);

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
              className={`${styles.audioButton} ${speaking ? styles.speaking : ''}`} 
              onClick={handlePlayAudio}
              aria-label="Phát âm (Phím A hoặc R)"
              title="Phát âm (Phím A hoặc R)"
            >
              <VolumeIcon size={22} />
              <span className={styles.audioKeyBadge}>A</span>
            </button>
            {!isFlipped && (
              <div className={styles.hint}>
                <span>Tap hoặc <strong>Space</strong> để lật</span>
                <span className={styles.hintDot}>•</span>
                <span>Phím <strong>A</strong> nghe</span>
              </div>
            )}
          </div>

          {/* Back side */}
          <div className={`${styles.face} ${styles.back}`}>
            <div className={styles.backGlow} />
            <div className={styles.backHeader}>
              <span className={styles.partOfSpeech}>{word.partOfSpeech}</span>
              <button 
                className={`${styles.backAudioBtn} ${speaking ? styles.speaking : ''}`}
                onClick={handlePlayAudio}
                title="Nghe lại phát âm (Phím A)"
                aria-label="Nghe lại"
              >
                <VolumeIcon size={16} />
                <span className={styles.backAudioBadge}>A</span>
              </button>
            </div>
            <div className={styles.meaningContainer}>
              <h2 className={styles.meaning}>{word.vietnamese}</h2>
            </div>

            {word.examples.length > 0 && (
              <div className={styles.examples}>
                {word.examples.map((ex, idx) => (
                  <p key={idx} className={styles.example}>&quot;{ex}&quot;</p>
                ))}
              </div>
            )}

            {word.mnemonicTip && (
              <div className={styles.mnemonic}>
                {word.emoji ? <span className={styles.emoji}>{word.emoji}</span> : null}
                <p>{word.mnemonicTip}</p>
              </div>
            )}

            <div className={styles.backHint}>
              <span>Phím <strong>A</strong> nghe lại</span>
              <span className={styles.hintDot}>•</span>
              <span><strong>Space</strong> lật lại</span>
            </div>
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
