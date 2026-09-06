import React from 'react';
import styles from './PracticeFooter.module.css';

interface PracticeFooterProps {
  isAnswered: boolean;
  isCorrect: boolean;
  correctMessage?: string;
  incorrectMessage?: string;
  onNext: () => void;
  onAITutor?: () => void;
  nextLabel?: string;
}

export default function PracticeFooter({
  isAnswered,
  isCorrect,
  correctMessage = 'Tuyệt vời! Chính xác.',
  incorrectMessage = 'Chưa chính xác rồi!',
  onNext,
  onAITutor,
  nextLabel = 'Tiếp tục ➔'
}: PracticeFooterProps) {
  
  const visibilityClass = isAnswered ? styles.footerVisible : styles.footerHidden;
  const stateClass = isCorrect ? styles.footerCorrect : styles.footerIncorrect;

  return (
    <div className={`${styles.footer} ${visibilityClass} ${stateClass}`}>
      <div className={styles.contentArea}>
        <div className={styles.title}>
          {isCorrect ? '✓ Chính xác!' : '✗ Sai rồi!'}
        </div>
        <div className={styles.message}>
          {isCorrect ? correctMessage : incorrectMessage}
        </div>
      </div>
      
      <div className={styles.actionArea}>
        {!isCorrect && onAITutor && (
          <button className={styles.aiBtn} onClick={onAITutor} type="button">
            ✨ Hỏi Gia Sư AI
          </button>
        )}
        <button className={styles.nextBtn} onClick={onNext} type="button">
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
