import React from 'react';
import styles from './StreakCounter.module.css';

interface StreakCounterProps {
  currentStreak: number;
  bestStreak: number;
}

export default function StreakCounter({ currentStreak, bestStreak }: StreakCounterProps) {
  const isActive = currentStreak > 0;

  return (
    <div className={`${styles.container} card-minimal`}>
      <div className={`${styles.iconContainer} ${isActive ? styles.active : ''}`}>
        <span className={styles.icon}>🔥</span>
      </div>
      
      <div className={styles.info}>
        <div className={styles.streakInfo}>
          <span className={styles.number}>{currentStreak}</span>
          <span className={styles.label}>day streak</span>
        </div>
        
        {bestStreak > 0 && (
          <div className={styles.bestStreak}>
            Best: {bestStreak} days
          </div>
        )}
      </div>
    </div>
  );
}
