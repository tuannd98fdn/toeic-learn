import React from 'react';
import styles from './PracticeFooter.module.css';
import { SparklesIcon } from '@/components/icons/AppIcons';

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

  // Keyboard shortcut for AI Tutor
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      
      // H key for "Hỏi Gia Sư AI"
      if ((e.key === 'h' || e.key === 'H') && !isCorrect && onAITutor && isAnswered) {
        onAITutor();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCorrect, onAITutor, isAnswered]);

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
          <button className="btn-ai" onClick={onAITutor} type="button">
            <SparklesIcon size={16} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline' }} /> Hỏi Gia Sư AI <span style={{ opacity: 0.7, fontSize: '0.85em', marginLeft: '2px' }}>(H)</span>
          </button>
        )}
        <button className={isCorrect ? 'btn-success' : 'btn-danger'} onClick={onNext} type="button" style={{ textTransform: 'uppercase', minWidth: '140px' }}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
