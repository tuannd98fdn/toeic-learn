import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons/AppIcons';
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
      <div className={styles.headerRow}>
        <div>
          <h3 className={styles.title}>Phân Phối 5 Hộp Ghi Nhớ (Spaced Repetition)</h3>
          <p className={styles.subtitle}>
            Hệ thống Leitner tự động giãn cách chu kỳ ôn tập: từ mới học ở Hộp 1, từ thuộc sâu thăng cấp lên Hộp 5
          </p>
        </div>
        <Link href="/study" className={styles.studyBtn} title="Vào học và ôn tập từ vựng Flashcard">
          <span>Ôn tập ngay</span>
          <ArrowRightIcon size={14} />
        </Link>
      </div>
      
      <div className={styles.boxesContainer}>
        {[1, 2, 3, 4, 5].map((boxNum) => {
          const count = stats[boxNum as keyof typeof stats] || 0;
          // Minimum height 10% for visibility, max 100%
          const heightPercent = count === 0 ? 0 : Math.max((count / maxCount) * 100, 10);
          
          return (
            <div key={boxNum} className={styles.boxWrapper}>
              <div className={styles.count}>{count} từ</div>
              <div className={styles.barContainer}>
                <div 
                  className={`${styles.bar} ${styles[`box${boxNum}`]}`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <div className={styles.label}>Hộp {boxNum}</div>
            </div>
          );
        })}
      </div>
      
      <div className={styles.legend}>
        <span className={styles.legendLabel}>Hộp 1 • Mới học (Hàng ngày)</span>
        <div className={styles.gradientLine} />
        <span className={styles.legendLabel}>Hộp 5 • Nắm vững (Đã thuộc sâu)</span>
      </div>
    </div>
  );
}
