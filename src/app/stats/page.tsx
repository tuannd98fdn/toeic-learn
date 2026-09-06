'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLeitner } from '@/hooks/useLeitner';
import { useStreak } from '@/hooks/useStreak';
import { VOCABULARY_DATA } from '@/data/vocabulary';
import LeitnerBox from '@/components/LeitnerBox';
import StreakCounter from '@/components/StreakCounter';
import { storage } from '@/utils/storage';
import { ExamScoreSummary } from '@/utils/toeicScoreCalculator';
import styles from './page.module.css';

export default function StatsPage() {
  const { mounted: leitnerMounted, getStats } = useLeitner();
  const { mounted: streakMounted, streakData } = useStreak();
  const [examHistory, setExamHistory] = useState<ExamScoreSummary[]>([]);

  useEffect(() => {
    const history = storage.get<ExamScoreSummary[]>('toeic_exam_history', []);
    setExamHistory(history);
  }, []);

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

      {/* Full Test Exam History */}
      <section className={styles.examHistorySection}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className={styles.cardTitle} style={{ margin: 0, border: 'none', padding: 0 }}>
              Lịch sử Thi thử TOEIC (Full Mock Test) 📝
            </h2>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Theo dõi tiến độ tăng điểm và chẩn đoán điểm yếu qua từng đề thi
            </p>
          </div>

          <Link href="/exam" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            Vào thi đề mới 🚀
          </Link>
        </div>

        <div className={styles.historyTableCard}>
          {examHistory.length === 0 ? (
            <div className={styles.emptyHistory}>
              <p>Bạn chưa thực hiện bài thi thử 200 câu nào.</p>
              <Link href="/exam" className="btn-accent" style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.5rem 1.25rem' }}>
                Làm bài thi thử đầu tiên ngay 🎯
              </Link>
            </div>
          ) : (
            <table className={styles.historyTable}>
              <thead>
                <tr>
                  <th>Ngày thi</th>
                  <th>Mã đề</th>
                  <th>Listening</th>
                  <th>Reading</th>
                  <th>Tổng điểm</th>
                  <th>Xếp loại</th>
                  <th>Cần cải thiện</th>
                </tr>
              </thead>
              <tbody>
                {examHistory.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.date}</td>
                    <td><strong>{item.testName}</strong></td>
                    <td>{item.scaledLC}/495 ({item.rawLC}/100)</td>
                    <td>{item.scaledRC}/495 ({item.rawRC}/100)</td>
                    <td><span className={styles.scoreBadge}>{item.totalScore}</span> / 990</td>
                    <td><span className={styles.cefrPill}>CEFR {item.cefrLevel}</span></td>
                    <td style={{ color: 'var(--warning)', fontWeight: 600 }}>{item.weakestPart?.partName || 'Chưa rõ'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
