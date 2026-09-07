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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ShareButton from '@/components/ShareButton';
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
    <div className={styles.container} id="stats-container">
      <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <h1 className={styles.title}>Thống kê học tập</h1>
        <ShareButton elementId="stats-container" />
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
              <div className={styles.statValue} style={{ color: 'var(--text-secondary)' }}>
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
        <div className={styles.examHistoryHeader}>
          <div className={styles.examHistoryHeaderInfo}>
            <h2>Tiến trình Điểm số & Lịch sử Thi thử 📝</h2>
            <p>Theo dõi tiến độ tăng điểm và chẩn đoán điểm yếu qua từng đề thi</p>
          </div>

          <Link href="/exam" className="btn-primary" aria-label="Vào thi đề mới">
            Vào thi đề mới 🚀
          </Link>
        </div>

        {examHistory.length > 0 && (
          <div className={`${styles.card} card-minimal ${styles.chartContainer}`}>
            <h3 className={styles.chartTitle}>Biểu đồ tăng trưởng điểm số</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[...examHistory].reverse()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} stroke="var(--text-secondary)" />
                <YAxis domain={[0, 990]} tick={{ fontSize: 12 }} stroke="var(--text-secondary)" width={40} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid var(--border)', 
                    boxShadow: 'var(--shadow-md)',
                    backgroundColor: 'var(--surface)',
                  }}
                  labelStyle={{ fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '4px' }}
                  itemStyle={{ color: 'var(--text-secondary)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Line type="monotone" dataKey="totalScore" name="Tổng điểm" stroke="var(--primary)" strokeWidth={3} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="scaledLC" name="Nghe (LC)" stroke="var(--success)" strokeWidth={2} />
                <Line type="monotone" dataKey="scaledRC" name="Đọc (RC)" stroke="var(--warning)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className={styles.historyTableCard}>
          {examHistory.length === 0 ? (
            <div className={styles.emptyHistory}>
              <span className={styles.emptyHistoryIcon}>📊</span>
              <p>Bạn chưa có dữ liệu làm bài thi thử nào.</p>
              <Link href="/exam" className="btn-accent">
                Làm bài thi thử đầu tiên ngay 🎯
              </Link>
            </div>
          ) : (
            <div className={styles.historyTableWrapper}>
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
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
