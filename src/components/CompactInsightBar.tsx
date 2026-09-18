'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  StatsIcon,
  TargetIcon,
  ArrowRightIcon,
  ZapIcon,
} from '@/components/icons/AppIcons';
import { getPredictiveScore, PredictiveScoreData } from '@/utils/scorePredictor';
import { storage } from '@/utils/storage';
import { MistakeData } from '@/hooks/useMistakeNotebook';
import { calculateBottleneckStats, BottleneckStats } from '@/utils/bottleneckCalculator';
import styles from './CompactInsightBar.module.css';

export default function CompactInsightBar() {
  const [scoreData, setScoreData] = useState<PredictiveScoreData | null>(null);
  const [mistakes, setMistakes] = useState<MistakeData>({});
  const [mounted, setMounted] = useState(false);

  const loadData = useCallback(() => {
    setScoreData(getPredictiveScore());
    const mData = storage.get<MistakeData>('mistake_notebook', {});
    setMistakes(mData);
  }, []);

  useEffect(() => {
    loadData();
    setMounted(true);

    const handleFocus = () => loadData();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'mistake_notebook' || e.key === 'toeic_exam_history') {
        loadData();
      }
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorage);
    };
  }, [loadData]);

  const bottleneckStats: BottleneckStats = useMemo(() => {
    return calculateBottleneckStats(mistakes);
  }, [mistakes]);

  if (!mounted || !scoreData) return null;

  const isOnTrack = scoreData.distanceToTarget <= 0;
  const topBottleneck = bottleneckStats.topBottleneck;

  return (
    <div className={styles.bar} role="region" aria-label="Thanh đo lường năng lực và điểm nghẽn">
      {/* Left: Score Prediction */}
      <div className={styles.leftGroup}>
        <div className={styles.scoreIconWrap}>
          <StatsIcon size={22} />
        </div>
        <div className={styles.scoreInfo}>
          <div className={styles.scoreTagRow}>
            <span className={styles.scoreLabel}>Dự đoán điểm</span>
            <span className={styles.sourceBadge}>{scoreData.sourceLabel}</span>
          </div>
          <div className={styles.scoreValueRow}>
            <span className={styles.predictedScore}>{scoreData.predictedMid}</span>
            <span className={styles.outOf}>/ 990</span>
            <span className={`${styles.targetDelta} ${isOnTrack ? styles.onTrack : ''}`}>
              {isOnTrack
                ? `Đạt target (+${Math.abs(scoreData.distanceToTarget)})`
                : `Cách target ${scoreData.distanceToTarget}đ`}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Middle: Top Bottleneck or Steady State */}
      <div className={styles.middleGroup}>
        {topBottleneck ? (
          <>
            <span
              className={styles.bottleneckDot}
              style={{
                backgroundColor: topBottleneck.color,
                color: topBottleneck.color,
              }}
            />
            <div className={styles.bottleneckText}>
              <span className={styles.bottleneckTitle}>
                {topBottleneck.label}: {topBottleneck.count} câu cần tháo gỡ
              </span>
              <span className={styles.bottleneckSub}>
                {topBottleneck.shortDesc}
              </span>
            </div>
          </>
        ) : (
          <>
            <span
              className={styles.bottleneckDot}
              style={{ backgroundColor: 'var(--success)', color: 'var(--success)' }}
            />
            <div className={styles.bottleneckText}>
              <span className={styles.bottleneckTitle}>
                Phong độ ổn định
              </span>
              <span className={styles.bottleneckSub}>
                Giữ vững phong độ và tiến độ học hôm nay!
              </span>
            </div>
          </>
        )}
      </div>

      {/* Right: Quick Action Links */}
      <div className={styles.rightGroup}>
        {topBottleneck ? (
          <Link href="/notebook?tab=exam" className={styles.remedyBtn}>
            <ZapIcon size={14} />
            <span>Tháo gỡ ngay</span>
          </Link>
        ) : (
          <Link href="/notebook" className={styles.remedyBtn}>
            <span>Sổ tay lỗi</span>
          </Link>
        )}
        <Link href="/stats" className={styles.radarBtn} title="Xem biểu đồ Radar & Lỗ hổng kiến thức">
          <span>Biểu đồ Radar</span>
          <ArrowRightIcon size={14} />
        </Link>
      </div>
    </div>
  );
}
