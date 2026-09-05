'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StreakCounter from '@/components/StreakCounter';
import ProgressRing from '@/components/ProgressRing';
import LeitnerBox from '@/components/LeitnerBox';
import DailyMission from '@/components/DailyMission';
import { useLeitner } from '@/hooks/useLeitner';
import { useStreak } from '@/hooks/useStreak';
import { VOCABULARY_DATA } from '@/data/vocabulary';
import styles from './page.module.css';

export default function Home() {
  const { mounted: leitnerMounted, getDueWords, getStats } = useLeitner();
  const { mounted: streakMounted, streakData, recordStudy } = useStreak();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Record app open as a study day to maintain streak if they just open to check
    recordStudy();
    
    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Chào buổi sáng');
    else if (hour < 18) setGreeting('Chào buổi chiều');
    else setGreeting('Chào buổi tối');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!leitnerMounted || !streakMounted) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const dueWords = getDueWords();
  const stats = getStats();
  const totalWords = VOCABULARY_DATA.length;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.greeting}>{greeting}! 👋</h1>
          <p className={styles.subtitle}>Sẵn sàng để master từ vựng TOEIC chưa?</p>
        </div>
        <StreakCounter currentStreak={streakData.currentStreak} bestStreak={streakData.bestStreak} />
      </header>

      <section className={styles.overviewSection}>
        <div className={`${styles.progressCard} card-minimal`}>
          <ProgressRing 
            value={stats.mastered} 
            max={totalWords} 
            size={140}
            label="Mastered"
          />
          <div className={styles.progressStats}>
            <div className={styles.statRow}>
              <span className={styles.statDot} style={{ background: 'var(--success)' }}></span>
              <span>Đã thuộc: {stats.mastered}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statDot} style={{ background: 'var(--warning)' }}></span>
              <span>Đang học: {stats.learning}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statDot} style={{ background: 'var(--text-tertiary)' }}></span>
              <span>Chưa học: {stats.unstudied}</span>
            </div>
          </div>
        </div>

        <DailyMission />
      </section>

      <section className={styles.quickActions}>
        <h2 className={styles.sectionTitle}>Truy cập nhanh</h2>
        <div className={styles.actionGrid}>
          <Link href="/study" className={`${styles.gridCard} card-minimal`}>
            <span className={styles.cardIcon}>🃏</span>
            <h3>Flashcards</h3>
            <p>Ôn tập bằng Spaced Repetition</p>
          </Link>
          <Link href="/quiz" className={`${styles.gridCard} card-minimal`}>
            <span className={styles.cardIcon}>🎯</span>
            <h3>Làm Quiz</h3>
            <p>Kiểm tra trí nhớ nhanh</p>
          </Link>
          <Link href="/vocabulary" className={`${styles.gridCard} card-minimal`}>
            <span className={styles.cardIcon}>📚</span>
            <h3>Từ vựng</h3>
            <p>Khám phá tất cả từ vựng</p>
          </Link>
        </div>
      </section>

      <section className={styles.leitnerSection}>
        <LeitnerBox stats={stats.boxes} totalWords={totalWords} />
      </section>
    </div>
  );
}
