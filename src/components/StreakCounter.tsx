import React from 'react';
import styles from './StreakCounter.module.css';
import { ZapIcon, ShieldIcon } from './icons/AppIcons';

interface StreakCounterProps {
  currentStreak: number;
  bestStreak: number;
  freezeCount?: number;
  isFrozenToday?: boolean;
}

export default function StreakCounter({
  currentStreak,
  bestStreak,
  freezeCount = 1,
  isFrozenToday = false
}: StreakCounterProps) {
  const isActive = currentStreak > 0;

  return (
    <div className={`${styles.container} card-minimal`}>
      <div className={`${styles.iconContainer} ${isActive ? styles.active : ''}`}>
        <ZapIcon size={24} className={styles.icon} />
      </div>
      
      <div className={styles.info}>
        <div className={styles.streakInfo}>
          <span className={styles.number}>{currentStreak}</span>
          <span className={styles.label}>day streak</span>
          <div 
            className={`${styles.freezeBadge} ${isFrozenToday ? styles.freezeActive : ''}`} 
            title={isFrozenToday ? "Chuỗi hôm qua được bảo vệ an toàn!" : `Bảo vệ chuỗi tự động: còn ${freezeCount} khiên`}
          >
            <ShieldIcon size={12} className={styles.shieldIcon} />
            <span className={styles.freezeText}>{freezeCount}</span>
          </div>
        </div>
        
        {isFrozenToday ? (
          <div className={styles.frozenNotice}>Đã kích hoạt khiên bảo vệ chuỗi</div>
        ) : bestStreak > 0 ? (
          <div className={styles.bestStreak}>
            Best: {bestStreak} days
          </div>
        ) : null}
      </div>
    </div>
  );
}

