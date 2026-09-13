'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { StatsIcon, ArrowRightIcon } from '@/components/icons/AppIcons';
import { getPredictiveScore, PredictiveScoreData } from '@/utils/scorePredictor';
import styles from './PredictiveScoreMeter.module.css';

export default function PredictiveScoreMeter() {
  const [data, setData] = useState<PredictiveScoreData | null>(null);

  useEffect(() => {
    setData(getPredictiveScore());
  }, []);

  if (!data) return null;

  const percentOf990 = Math.min(100, Math.round((data.predictedMid / 990) * 100));
  const isOnTrack = data.distanceToTarget <= 0;

  return (
    <div className={`${styles.card} card-glow`}>
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <div className={styles.iconWrap}>
            <StatsIcon size={18} />
          </div>
          <h3 className={styles.title}>Dự đoán điểm thi thật</h3>
        </div>
        <span
          className={`${styles.calibrationBadge} ${
            data.hasCalibratedData ? styles.badgeCalibrated : styles.badgeUncalibrated
          }`}
        >
          {data.sourceLabel}
        </span>
      </div>

      <div className={styles.scoreRow}>
        <div className={styles.scoreGroup}>
          <span className={`${styles.scoreBand} text-gradient`}>
            {data.predictedMin} – {data.predictedMax}
          </span>
          <span className={styles.maxScore}>/ 990</span>
        </div>

        <div className={`${styles.targetDistance} ${isOnTrack ? styles.onTrack : ''}`}>
          {isOnTrack
            ? `Đã đạt mục tiêu (+${Math.abs(data.distanceToTarget)} điểm)`
            : `Cách mục tiêu ${data.distanceToTarget} điểm (Mục tiêu ${data.targetScoreNum}+)`}
        </div>
      </div>

      <div className={styles.gaugeContainer}>
        <div className={styles.gaugeTrack}>
          <div className={styles.gaugeFill} style={{ width: `${percentOf990}%` }} />
        </div>
        <div className={styles.gaugeMarkers}>
          <span>Khởi điểm (10)</span>
          <span>Dự đoán: {data.predictedMid}</span>
          <span>Tối đa (990)</span>
        </div>
      </div>

      <div className={styles.breakdownRow}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div className={styles.subSkill}>
            <span className={styles.dotPrimary} />
            <span>Nghe (LC): <strong>{data.listeningScore}</strong>/495</span>
          </div>
          <div className={styles.subSkill}>
            <span className={styles.dotSecondary} />
            <span>Đọc (RC): <strong>{data.readingScore}</strong>/495</span>
          </div>
        </div>

        {!data.hasCalibratedData ? (
          <Link href="/diagnostic" className={styles.calibAction}>
            <span>Test chẩn đoán 20p</span>
            <ArrowRightIcon size={14} />
          </Link>
        ) : (
          <Link href="/stats" className={styles.calibAction}>
            <span>Xem biểu đồ radar</span>
            <ArrowRightIcon size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}
