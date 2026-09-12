import React from 'react';
import styles from './PracticeFooter.module.css';
import { SparklesIcon, LightbulbIcon, CheckCircleIcon } from '@/components/icons/AppIcons';
import { soundEffects } from '@/utils/soundEffects';

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
  nextLabel = 'Tiếp tục →'
}: PracticeFooterProps) {
  
  const visibilityClass = isAnswered ? styles.footerVisible : styles.footerHidden;
  const stateClass = isCorrect ? styles.footerCorrect : styles.footerIncorrect;

  // Play sound effect when answer is revealed
  const prevAnswered = React.useRef(false);
  React.useEffect(() => {
    if (isAnswered && !prevAnswered.current) {
      if (isCorrect) {
        soundEffects.playCorrect();
      } else {
        soundEffects.playWrong();
      }
    }
    prevAnswered.current = isAnswered;
  }, [isAnswered, isCorrect]);

  // Keyboard shortcut for AI Tutor (H key — works for both correct and incorrect)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      
      if ((e.key === 'h' || e.key === 'H') && onAITutor && isAnswered) {
        onAITutor();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onAITutor, isAnswered]);

  return (
    <div className={`${styles.footer} ${visibilityClass} ${stateClass}`}>
      <div className={styles.contentArea}>
        <div className={styles.title}>
          {isCorrect ? (
            <>
              <CheckCircleIcon size={18} style={{ marginRight: '6px', verticalAlign: 'text-bottom', display: 'inline' }} />
              Chính xác!
            </>
          ) : (
            <>
              <LightbulbIcon size={18} style={{ marginRight: '6px', verticalAlign: 'text-bottom', display: 'inline' }} />
              Chưa chính xác, cùng xem nhé!
            </>
          )}
        </div>
        <div className={styles.message}>
          {isCorrect ? correctMessage : incorrectMessage}
        </div>
      </div>
      
      <div className={styles.actionArea}>
        {onAITutor && (
          <button className={isCorrect ? 'btn-secondary' : 'btn-ai'} onClick={onAITutor} type="button">
            {isCorrect ? (
              <><LightbulbIcon size={16} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline' }} /> Hiểu sâu hơn <span style={{ opacity: 0.7, fontSize: '0.85em', marginLeft: '2px' }}>(H)</span></>
            ) : (
              <><SparklesIcon size={16} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline' }} /> Hỏi Gia Sư AI <span style={{ opacity: 0.7, fontSize: '0.85em', marginLeft: '2px' }}>(H)</span></>
            )}
          </button>
        )}
        <button className={isCorrect ? 'btn-success' : 'btn-primary'} onClick={onNext} type="button" style={{ textTransform: 'uppercase', minWidth: '140px' }}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
