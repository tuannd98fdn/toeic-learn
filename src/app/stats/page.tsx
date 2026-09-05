'use client';

import { useLeitner } from '@/hooks/useLeitner';
import { useStreak } from '@/hooks/useStreak';
import { VOCABULARY_DATA } from '@/data/vocabulary';
import LeitnerBox from '@/components/LeitnerBox';
import StreakCounter from '@/components/StreakCounter';
import styles from './page.module.css';

export default function StatsPage() {
  const { mounted: leitnerMounted, getStats } = useLeitner();
  const { mounted: streakMounted, streakData } = useStreak();

  if (!leitnerMounted || !streakMounted) return <div className={styles.loading}>Loading...</div>;

  const stats = getStats();
  const totalWords = VOCABULARY_DATA.length;
  const masterRate = Math.round((stats.mastered / totalWords) * 100) || 0;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Thống kê học tập</h1>
      </header>

      <section className={styles.grid}>
        {/* Streak Stats */}
        <div className={`${styles.card} card-minimal`}>
          <h2 className={styles.cardTitle}>Chuỗi học tập</h2>
          <div className={styles.streakWrap}>
            <StreakCounter 
              currentStreak={streakData.currentStreak} 
              bestStreak={streakData.bestStreak} 
            />
          </div>
        </div>

        {/* Overall Progress */}
        <div className={`${styles.card} card-minimal`}>
          <h2 className={styles.cardTitle}>Tiến độ tổng quát</h2>
          <div className={styles.progressStats}>
            <div className={styles.statItem}>
              <div className={styles.statValue} style={{ color: 'var(--success)' }}>
                {stats.mastered}
              </div>
              <div className={styles.statLabel}>Đã thuộc (Box 5)</div>
            </div>
            
            <div className={styles.statItem}>
              <div className={styles.statValue} style={{ color: 'var(--warning)' }}>
                {stats.learning}
              </div>
              <div className={styles.statLabel}>Đang học (Box 1-4)</div>
            </div>
            
            <div className={styles.statItem}>
              <div className={styles.statValue} style={{ color: 'var(--text-tertiary)' }}>
                {stats.unstudied}
              </div>
              <div className={styles.statLabel}>Chưa học</div>
            </div>
          </div>
          
          <div className={styles.masteryBar}>
            <div className={styles.masteryBarBg}>
              <div 
                className={styles.masteryBarFill} 
                style={{ width: `${masterRate}%` }} 
              />
            </div>
            <div className={styles.masteryText}>
              Tỷ lệ thông thạo: {masterRate}%
            </div>
          </div>
        </div>
      </section>

      {/* Leitner Distribution */}
      <section className={styles.fullWidthSection}>
        <LeitnerBox stats={stats.boxes} totalWords={totalWords} />
        <p className={styles.leitnerDesc}>
          <strong>Hệ thống Leitner (Spaced Repetition)</strong> giúp bạn nhớ lâu hơn bằng cách ôn tập các từ ở Box thấp (màu đỏ/cam) thường xuyên hơn, và giãn cách thời gian ôn tập cho các từ ở Box cao (màu xanh).
        </p>
      </section>
    </div>
  );
}
