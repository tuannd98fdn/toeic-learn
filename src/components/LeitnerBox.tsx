import React from 'react';
import styles from './LeitnerBox.module.css';

interface LeitnerBoxProps {
  stats: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  totalWords: number;
}

export default function LeitnerBox({ stats, totalWords }: LeitnerBoxProps) {
  // Calculate max count to scale bars proportionally
  const counts = Object.values(stats);
  const maxCount = Math.max(...counts, 1); // Avoid division by zero
  
  return (
    <div className={`${styles.container} card-minimal`}>
      <h3 className={styles.title}>Leitner Progress</h3>
      
      <div className={styles.boxesContainer}>
        {[1, 2, 3, 4, 5].map((boxNum) => {
          const count = stats[boxNum as keyof typeof stats] || 0;
          // Minimum height 10% for visibility, max 100%
          const heightPercent = count === 0 ? 0 : Math.max((count / maxCount) * 100, 10);
          
          return (
            <div key={boxNum} className={styles.boxWrapper}>
              <div className={styles.count}>{count}</div>
              <div className={styles.barContainer}>
                <div 
                  className={`${styles.bar} ${styles[`box${boxNum}`]}`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <div className={styles.label}>L{boxNum}</div>
            </div>
          );
        })}
      </div>
      
      <div className={styles.legend}>
        <span>Learning</span>
        <div className={styles.gradientLine} />
        <span>Mastered</span>
      </div>
    </div>
  );
}
