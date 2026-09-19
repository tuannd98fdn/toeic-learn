'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useLeitner } from '@/hooks/useLeitner';
import { useStreak } from '@/hooks/useStreak';
import { useVocabulary } from '@/hooks/useVocabulary';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import LeitnerBox from '@/components/LeitnerBox';
import ShareButton from '@/components/ShareButton';
import GrammarRadarChart from '@/components/GrammarRadarChart';
import VocabTopicMasteryMatrix from '@/components/VocabTopicMasteryMatrix';
import { storage } from '@/utils/storage';
import { ExamScoreSummary } from '@/utils/toeicScoreCalculator';
import { getPredictiveScore, PredictiveScoreData } from '@/utils/scorePredictor';
import { evaluateLearnerKnowledge, KnowledgeEvaluationResult } from '@/utils/knowledgeEvaluator';
import { calculateBottleneckStats, BottleneckStats } from '@/utils/bottleneckCalculator';
import {
  TargetIcon,
  ZapIcon,
  CardsIcon,
  ExamIcon,
  ShieldIcon,
  HeadphonesIcon,
  BookOpenIcon,
  ArrowRightIcon,
  CheckIcon,
} from '@/components/icons/AppIcons';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styles from './page.module.css';

interface ToeicPartMeta {
  id: string;
  name: string;
  fullName: string;
  enName: string;
  section: 'LC' | 'RC';
}

const TOEIC_PARTS_INFO: ToeicPartMeta[] = [
  { id: 'part1', name: 'Part 1', fullName: 'Mô tả hình ảnh', enName: 'Photographs', section: 'LC' },
  { id: 'part2', name: 'Part 2', fullName: 'Hỏi - Đáp', enName: 'Question-Response', section: 'LC' },
  { id: 'part3', name: 'Part 3', fullName: 'Hội thoại ngắn', enName: 'Conversations', section: 'LC' },
  { id: 'part4', name: 'Part 4', fullName: 'Bài nói chuyện ngắn', enName: 'Short Talks', section: 'LC' },
  { id: 'part5', name: 'Part 5', fullName: 'Hoàn thành câu', enName: 'Incomplete Sentences', section: 'RC' },
  { id: 'part6', name: 'Part 6', fullName: 'Điền đoạn văn', enName: 'Text Completion', section: 'RC' },
  { id: 'part7', name: 'Part 7', fullName: 'Đọc hiểu văn bản', enName: 'Reading Comprehension', section: 'RC' },
];

export default function StatsPage() {
  const { mounted: vocabMounted, allWords } = useVocabulary();
  const { mounted: leitnerMounted, getStats } = useLeitner();
  const { mounted: streakMounted, streakData } = useStreak();
  const { mistakes } = useMistakeNotebook();

  const [examHistory, setExamHistory] = useState<ExamScoreSummary[]>([]);
  const [predictive, setPredictive] = useState<PredictiveScoreData | null>(null);
  const [knowledge, setKnowledge] = useState<KnowledgeEvaluationResult | null>(null);
  const [bottleneck, setBottleneck] = useState<BottleneckStats | null>(null);

  useEffect(() => {
    const history = storage.get<ExamScoreSummary[]>('toeic_exam_history', []);
    setExamHistory(history);
    setPredictive(getPredictiveScore());
    setKnowledge(evaluateLearnerKnowledge());
  }, []);

  useEffect(() => {
    if (mistakes) {
      setBottleneck(calculateBottleneckStats(mistakes));
    }
  }, [mistakes]);

  // Total words & master rate
  const stats = getStats();
  const totalWords = allWords.length || 453;
  const masterRate = Math.round((stats.mastered / totalWords) * 100) || 0;

  // Maximum score recorded
  const maxScore = useMemo(() => {
    if (examHistory.length === 0) return 0;
    return Math.max(...examHistory.map(h => h.totalScore || 0));
  }, [examHistory]);

  // Latest exam summary
  const latestExam = useMemo(() => {
    return examHistory.length > 0 ? examHistory[0] : null;
  }, [examHistory]);

  // Parse date helper (dd/mm/yyyy or ISO)
  const parseDate = (dStr: string): number => {
    if (!dStr) return 0;
    const parts = dStr.split('/');
    if (parts.length === 3) {
      return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])).getTime();
    }
    const t = new Date(dStr).getTime();
    return isNaN(t) ? 0 : t;
  };

  // LineChart data: Chronological (oldest to newest)
  const chartData = useMemo(() => {
    return [...examHistory].sort((a, b) => parseDate(a.date) - parseDate(b.date));
  }, [examHistory]);

  // Table data: Reverse chronological (newest first)
  const tableHistory = useMemo(() => {
    return [...examHistory].sort((a, b) => parseDate(b.date) - parseDate(a.date));
  }, [examHistory]);

  // 7 Parts Accuracy Breakdown
  const partsBreakdown = useMemo(() => {
    return TOEIC_PARTS_INFO.map(part => {
      let totalQuestions = 0;
      let totalCorrect = 0;

      examHistory.forEach(exam => {
        if (exam.partScores && exam.partScores[part.id]) {
          totalCorrect += exam.partScores[part.id].correct || 0;
          totalQuestions += exam.partScores[part.id].total || 0;
        }
      });

      const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : null;
      let status: 'good' | 'warning' | 'alert' | 'empty' = 'empty';
      let statusLabel = 'Chưa thi';

      if (accuracy !== null) {
        if (accuracy >= 75) {
          status = 'good';
          statusLabel = 'Thành thạo';
        } else if (accuracy >= 55) {
          status = 'warning';
          statusLabel = 'Cần củng cố';
        } else {
          status = 'alert';
          statusLabel = 'Lỗ hổng lớn';
        }
      }

      return {
        ...part,
        totalQuestions,
        totalCorrect,
        accuracy,
        status,
        statusLabel,
      };
    });
  }, [examHistory]);

  const lcParts = useMemo(() => partsBreakdown.filter(p => p.section === 'LC'), [partsBreakdown]);
  const rcParts = useMemo(() => partsBreakdown.filter(p => p.section === 'RC'), [partsBreakdown]);

  // Day of week dots
  const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const currentDayIndex = (new Date().getDay() + 6) % 7; // Monday = 0

  if (!vocabMounted || !leitnerMounted || !streakMounted) {
    return <div className={styles.loading}>Đang tải dữ liệu phân tích học tập...</div>;
  }

  return (
    <div className={styles.container} id="stats-container">
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInfo}>
          <h1>Báo Cáo & Thống Kê Học Tập</h1>
          <p>Đo lường năng lực thực chiến, chẩn đoán lỗ hổng kiến thức và theo dõi tiến độ tăng điểm</p>
        </div>

        <ShareButton
          statsData={{
            predictedScore: predictive ? `${predictive.predictedMin} - ${predictive.predictedMax}` : '710 - 790',
            cefrLevel: latestExam?.cefrLevel || 'B2',
            currentStreak: streakData.currentStreak,
            masteredWords: stats.mastered,
            totalExams: examHistory.length,
          }}
        />
      </header>

      {/* 4 Golden Metrics Overview */}
      <section className={styles.metricsGrid}>
        {/* Metric 1: Predicted Score */}
        <div className={styles.metricCard}>
          <div className={styles.metricTopRow}>
            <span className={styles.metricLabel}>Điểm Dự Đoán</span>
            <div className={`${styles.metricIconWrap} ${styles.iconPrimary}`}>
              <TargetIcon size={18} />
            </div>
          </div>
          <div className={styles.metricValue}>
            {predictive ? `${predictive.predictedMin} - ${predictive.predictedMax}` : 'Chưa thi'}
          </div>
          <div className={styles.metricSub}>
            <span>{predictive?.hasCalibratedData ? 'Hiệu chuẩn qua bài thi ETS' : 'Làm đề để hiệu chuẩn'}</span>
          </div>
        </div>

        {/* Metric 2: Remediation Mastery Rate */}
        <div className={styles.metricCard}>
          <div className={styles.metricTopRow}>
            <span className={styles.metricLabel}>Khắc Phục Lỗi Sai</span>
            <div className={`${styles.metricIconWrap} ${styles.iconSuccess}`}>
              <CheckIcon size={18} />
            </div>
          </div>
          <div className={styles.metricValue}>
            {bottleneck ? `${bottleneck.remediationRate}%` : '100%'}
          </div>
          <div className={styles.metricSub}>
            <span>{bottleneck ? `${bottleneck.masteredCount} / ${bottleneck.total} câu đã thuộc` : 'Hồ sơ lỗi sai sạch'}</span>
          </div>
        </div>

        {/* Metric 3: Vocabulary Mastery */}
        <div className={styles.metricCard}>
          <div className={styles.metricTopRow}>
            <span className={styles.metricLabel}>Từ Vựng Nắm Vững</span>
            <div className={`${styles.metricIconWrap} ${styles.iconWarning}`}>
              <CardsIcon size={18} />
            </div>
          </div>
          <div className={styles.metricValue}>
            {stats.mastered} <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>/ {totalWords}</span>
          </div>
          <div className={styles.metricSub}>
            <span>Tỷ lệ thuộc sâu: {masterRate}% (Hộp 5)</span>
          </div>
        </div>

        {/* Metric 4: ETS Exams Completed */}
        <div className={styles.metricCard}>
          <div className={styles.metricTopRow}>
            <span className={styles.metricLabel}>Đề Thi ETS Đã Làm</span>
            <div className={`${styles.metricIconWrap} ${styles.iconSecondary}`}>
              <ExamIcon size={18} />
            </div>
          </div>
          <div className={styles.metricValue}>
            {examHistory.length} <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>đề</span>
          </div>
          <div className={styles.metricSub}>
            <span>{maxScore > 0 ? `Điểm cao nhất: ${maxScore}/990` : 'Chưa có bài thi'}</span>
          </div>
        </div>
      </section>

      {/* Strategic Diagnosis Banner (Knowledge Ceiling) */}
      {knowledge && (
        <section className={styles.diagnosisBanner}>
          <div className={styles.diagnosisHeader}>
            <div className={styles.diagnosisTitleWrap}>
              <h2 className={styles.diagnosisTitle}>Chẩn Đoán Trần Tri Thức & Chiến Lược Bứt Phá</h2>
            </div>
            <span
              className={`${styles.gapChip} ${
                knowledge.gapType === 'EXECUTION_DEFICIT'
                  ? styles.chipWarning
                  : knowledge.gapType === 'KNOWLEDGE_DEFICIT'
                  ? styles.chipAlert
                  : styles.chipGood
              }`}
            >
              {knowledge.gapType === 'EXECUTION_DEFICIT'
                ? 'Nghẽn Tốc Độ & Phản Xạ'
                : knowledge.gapType === 'KNOWLEDGE_DEFICIT'
                ? 'Chạm Trần Tri Thức'
                : 'Phát Triển Đồng Pha'}
            </span>
          </div>

          <div className={styles.diagnosisBody}>
            <div className={styles.scoresComparison}>
              <div className={styles.scoreBlock}>
                <span className={styles.scoreBlockLabel}>Điểm Thi Thực Chiến</span>
                <span className={styles.scoreBlockNum} style={{ color: 'var(--primary)' }}>
                  {knowledge.examScore}
                </span>
              </div>
              <div className={styles.scoreDivider} />
              <div className={styles.scoreBlock}>
                <span className={styles.scoreBlockLabel}>Trần Tri Thức Tích Lũy</span>
                <span className={styles.scoreBlockNum} style={{ color: 'var(--success)' }}>
                  {knowledge.knowledgeCeilingScore}
                </span>
              </div>
            </div>

            <div className={styles.diagnosisAdvice}>
              <p className={styles.diagnosisText}>
                <strong>{knowledge.diagnosisTitle}:</strong> {knowledge.diagnosisAdvice}
              </p>
              <Link href={knowledge.primaryRecommendation.actionLink} className={styles.diagnosisActionBtn}>
                <span>{knowledge.primaryRecommendation.actionLabel}</span>
                <ArrowRightIcon size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Streak & Vocab Progress Section */}
      <section className={styles.streakAndVocabGrid}>
        {/* Streak Stats */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <ZapIcon size={20} style={{ color: 'var(--warning-hover)' }} />
            <span>Chuỗi Rèn Luyện & Phong Độ</span>
          </h2>

          <div className={styles.streakContent}>
            <div className={styles.streakHero}>
              <div className={styles.streakMain}>
                <span className={styles.streakNumber}>{streakData.currentStreak}</span>
                <span className={styles.streakUnit}>ngày liên tiếp</span>
              </div>

              <div className={styles.streakShield}>
                <ShieldIcon size={16} />
                <span>{streakData.freezeCount} Khiên bảo vệ</span>
              </div>
            </div>

            <div className={styles.activityHeatmapRow}>
              <span className={styles.activityLabel}>Hoạt động tuần này</span>
              <div className={styles.dayDotsContainer}>
                {dayNames.map((name, idx) => {
                  const isToday = idx === currentDayIndex;
                  const isActive = isToday && streakData.currentStreak > 0;
                  return (
                    <div key={name} className={styles.dayDotItem}>
                      <div className={`${styles.dayDot} ${isActive ? styles.dayDotActive : ''}`}>
                        {isActive ? <CheckIcon size={13} /> : ''}
                      </div>
                      <span className={styles.dayDotName} style={{ color: isToday ? 'var(--primary)' : undefined, fontWeight: isToday ? 800 : undefined }}>
                        {name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className={styles.streakMotivator}>
              {streakData.currentStreak >= 7
                ? 'Tuyệt vời! Bạn đang duy trì phong độ đỉnh cao. Tiếp tục học đều đặn mỗi ngày.'
                : 'Mẹo: Dành 15 phút ôn từ vựng hoặc luyện 1 đề ngắn mỗi ngày để giữ vững chuỗi học tập.'}
            </p>
          </div>
        </div>

        {/* Overall Vocab Progress Card */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <CardsIcon size={20} style={{ color: 'var(--primary)' }} />
            <span>Tiến Độ Làm Chủ Từ Vựng</span>
          </h2>

          <div style={{ display: 'flex', justifyContent: 'space-around', margin: '16px 0 24px 0' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--success)', lineHeight: 1 }}>
                {stats.mastered}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '6px' }}>
                Đã thuộc (Hộp 5)
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--warning-hover)', lineHeight: 1 }}>
                {stats.learning}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '6px' }}>
                Đang học (Hộp 1-4)
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-secondary)', lineHeight: 1 }}>
                {stats.unstudied}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '6px' }}>
                Chưa học
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <div style={{ width: '100%', height: '10px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden', marginBottom: '8px' }}>
              <div
                style={{
                  width: `${masterRate}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--primary) 0%, var(--success) 100%)',
                  borderRadius: '999px',
                  transition: 'width 0.8s ease',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              <span>Độ phủ toàn bộ kho từ vựng</span>
              <span>{masterRate}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOEIC 7-Part Mastery Grid */}
      <section className={styles.sevenPartsSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Bản Đồ Năng Lực 7 Phần Thi TOEIC (Part 1 - 7)</h2>
            <p className={styles.sectionSubtitle}>
              Bóc tách tỷ lệ làm đúng và tiến độ thành thạo thực tế qua các đề thi ETS đã hoàn thành
            </p>
          </div>

          <Link href="/exam" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
            <span>Làm bài thi thử mới</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        <div className={styles.partsColumnsGrid}>
          {/* Column 1: Listening Comprehension (Part 1 - 4) */}
          <div className={styles.partGroupCard}>
            <div className={styles.partGroupHeader}>
              <HeadphonesIcon size={18} style={{ color: 'var(--primary)' }} />
              <span>Phần Nghe Hiểu (Listening • Part 1 - 4)</span>
            </div>

            <div className={styles.partsList}>
              {lcParts.map(part => {
                const fillWidth = part.accuracy !== null ? part.accuracy : 0;
                const statusColor =
                  part.status === 'good'
                    ? 'var(--success)'
                    : part.status === 'warning'
                    ? 'var(--warning-hover)'
                    : part.status === 'alert'
                    ? 'var(--danger)'
                    : 'var(--border)';

                return (
                  <div key={part.id} className={styles.partRow}>
                    <div className={styles.partRowTop}>
                      <div className={styles.partNameWrap}>
                        <span className={styles.partIdBadge}>{part.name}</span>
                        <span className={styles.partTitle}>{part.fullName}</span>
                      </div>

                      <div className={styles.partMeta}>
                        <span className={styles.accuracyNumber}>
                          {part.accuracy !== null ? `${part.accuracy}%` : '--'}
                        </span>
                        <span
                          className={`${styles.statusPill} ${
                            part.status === 'good'
                              ? styles.statusGood
                              : part.status === 'warning'
                              ? styles.statusWarning
                              : part.status === 'alert'
                              ? styles.statusAlert
                              : styles.statusEmpty
                          }`}
                        >
                          {part.statusLabel}
                        </span>
                      </div>
                    </div>

                    <div className={styles.partProgressBg}>
                      <div
                        className={styles.partProgressFill}
                        style={{ width: `${fillWidth}%`, background: statusColor }}
                      />
                    </div>

                    <div className={styles.partActionRow}>
                      <span>{part.totalQuestions > 0 ? `Đúng ${part.totalCorrect} / ${part.totalQuestions} câu` : 'Chưa có bài thi'}</span>
                      <Link href={`/${part.id}`} className={styles.partActionBtn}>
                        <span>Luyện {part.name}</span>
                        <ArrowRightIcon size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Reading Comprehension (Part 5 - 7) */}
          <div className={styles.partGroupCard}>
            <div className={styles.partGroupHeader}>
              <BookOpenIcon size={18} style={{ color: 'var(--secondary)' }} />
              <span>Phần Đọc Hiểu (Reading • Part 5 - 7)</span>
            </div>

            <div className={styles.partsList}>
              {rcParts.map(part => {
                const fillWidth = part.accuracy !== null ? part.accuracy : 0;
                const statusColor =
                  part.status === 'good'
                    ? 'var(--success)'
                    : part.status === 'warning'
                    ? 'var(--warning-hover)'
                    : part.status === 'alert'
                    ? 'var(--danger)'
                    : 'var(--border)';

                return (
                  <div key={part.id} className={styles.partRow}>
                    <div className={styles.partRowTop}>
                      <div className={styles.partNameWrap}>
                        <span className={styles.partIdBadge}>{part.name}</span>
                        <span className={styles.partTitle}>{part.fullName}</span>
                      </div>

                      <div className={styles.partMeta}>
                        <span className={styles.accuracyNumber}>
                          {part.accuracy !== null ? `${part.accuracy}%` : '--'}
                        </span>
                        <span
                          className={`${styles.statusPill} ${
                            part.status === 'good'
                              ? styles.statusGood
                              : part.status === 'warning'
                              ? styles.statusWarning
                              : part.status === 'alert'
                              ? styles.statusAlert
                              : styles.statusEmpty
                          }`}
                        >
                          {part.statusLabel}
                        </span>
                      </div>
                    </div>

                    <div className={styles.partProgressBg}>
                      <div
                        className={styles.partProgressFill}
                        style={{ width: `${fillWidth}%`, background: statusColor }}
                      />
                    </div>

                    <div className={styles.partActionRow}>
                      <span>{part.totalQuestions > 0 ? `Đúng ${part.totalCorrect} / ${part.totalQuestions} câu` : 'Chưa có bài thi'}</span>
                      <Link href={`/${part.id}`} className={styles.partActionBtn}>
                        <span>Luyện {part.name}</span>
                        <ArrowRightIcon size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Leitner Distribution */}
      <section className={styles.fullWidthSection}>
        <LeitnerBox stats={stats.boxes} totalWords={totalWords} />
      </section>

      {/* 12 TOEIC Topic Vocabulary Mastery Assessment */}
      <section className={styles.fullWidthSection}>
        <VocabTopicMasteryMatrix />
      </section>

      {/* Grammar & Sub-skill Gap Analysis */}
      <section className={styles.fullWidthSection}>
        <GrammarRadarChart />
      </section>

      {/* Full Test Exam History */}
      <section className={styles.examHistorySection}>
        <div className={styles.examHistoryHeader}>
          <div className={styles.examHistoryHeaderInfo}>
            <h2>Tiến Trình Điểm Số & Lịch Sử Thi Thử</h2>
            <p>Biểu đồ theo dõi xu hướng tăng điểm từ quá khứ tới hiện tại</p>
          </div>

          <Link href="/exam" className="btn-primary" aria-label="Vào thi đề mới">
            Vào thi đề mới
          </Link>
        </div>

        {chartData.length > 0 && (
          <div className={`${styles.card} ${styles.chartContainer}`}>
            <h3 className={styles.chartTitle}>Xu Hướng Điểm Số Qua Từng Đề Thi</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} tickMargin={10} stroke="var(--border)" />
                <YAxis domain={[0, 990]} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} stroke="var(--border)" width={40} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-md)',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--foreground)',
                  }}
                  labelStyle={{ fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '4px' }}
                />
                <Legend wrapperStyle={{ paddingTop: '12px' }} />
                <Line type="monotone" dataKey="totalScore" name="Tổng điểm" stroke="var(--primary)" strokeWidth={3} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="scaledLC" name="Listening (LC)" stroke="var(--success)" strokeWidth={2} />
                <Line type="monotone" dataKey="scaledRC" name="Reading (RC)" stroke="var(--warning)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className={styles.historyTableCard}>
          {tableHistory.length === 0 ? (
            <div className={styles.emptyHistory}>
              <ExamIcon size={40} style={{ color: 'var(--primary)' }} />
              <p>Bạn chưa có dữ liệu làm bài thi thử nào.</p>
              <Link href="/exam" className="btn-accent">
                Làm bài thi thử đầu tiên ngay
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
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {tableHistory.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.date}</td>
                      <td><strong>{item.testName}</strong></td>
                      <td>{item.scaledLC}/495 ({item.rawLC}/100)</td>
                      <td>{item.scaledRC}/495 ({item.rawRC}/100)</td>
                      <td><span className={styles.scoreBadge}>{item.totalScore}</span> / 990</td>
                      <td><span className={styles.cefrPill}>CEFR {item.cefrLevel}</span></td>
                      <td style={{ color: 'var(--warning-hover)', fontWeight: 600 }}>{item.weakestPart?.partName || 'Chưa rõ'}</td>
                      <td>
                        <Link
                          href={item.weakestPart?.part ? `/${item.weakestPart.part}` : '/exam'}
                          className={styles.tableActionBtn}
                          title="Luyện tập khắc phục phần yếu nhất"
                        >
                          <span>Khắc phục</span>
                          <ArrowRightIcon size={12} />
                        </Link>
                      </td>
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
