'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  StatsIcon,
  LayersIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from '@/components/icons/AppIcons';
import { getPredictiveScore, PredictiveScoreData } from '@/utils/scorePredictor';
import { evaluateLearnerKnowledge, KnowledgeEvaluationResult } from '@/utils/knowledgeEvaluator';
import styles from './PredictiveScoreMeter.module.css';

export default function PredictiveScoreMeter() {
  const [data, setData] = useState<PredictiveScoreData | null>(null);
  const [knowledge, setKnowledge] = useState<KnowledgeEvaluationResult | null>(null);

  useEffect(() => {
    setData(getPredictiveScore());
    setKnowledge(evaluateLearnerKnowledge());
  }, []);

  if (!data || !knowledge) return null;

  const examPercentOf990 = Math.min(100, Math.round((data.predictedMid / 990) * 100));
  const ceilingPercentOf990 = Math.min(100, Math.round((knowledge.knowledgeCeilingScore / 990) * 100));
  const isOnTrack = data.distanceToTarget <= 0;

  return (
    <div className={`${styles.card} card-glow`}>
      {/* Header */}
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <div className={styles.iconWrap}>
            <StatsIcon size={18} />
          </div>
          <h3 className={styles.title}>Đo lường năng lực & Dự đoán điểm thi</h3>
        </div>
        <div className={styles.headerBadges}>
          <span
            className={`${styles.calibrationBadge} ${
              data.hasCalibratedData ? styles.badgeCalibrated : styles.badgeUncalibrated
            }`}
          >
            {data.sourceLabel}
          </span>
        </div>
      </div>

      {/* Dual Gauges: Exam Execution vs Knowledge Ceiling */}
      <div className={styles.dualGaugeGrid}>
        {/* Left Gauge: Actual Exam Score */}
        <div className={styles.gaugeBlock}>
          <div className={styles.blockHeader}>
            <span className={styles.blockLabel}>ĐIỂM THI THỰC CHIẾN</span>
            <span className={`${styles.targetDistance} ${isOnTrack ? styles.onTrack : ''}`}>
              {isOnTrack
                ? `Đạt mục tiêu (+${Math.abs(data.distanceToTarget)}đ)`
                : `Cách mục tiêu ${data.distanceToTarget}đ`}
            </span>
          </div>

          <div className={styles.scoreRow}>
            <div className={styles.scoreGroup}>
              <span className={`${styles.scoreBand} text-gradient`}>
                {data.predictedMin} – {data.predictedMax}
              </span>
              <span className={styles.maxScore}>/ 990</span>
            </div>
          </div>

          <div className={styles.gaugeContainer}>
            <div className={styles.gaugeTrack}>
              <div className={styles.gaugeFillExam} style={{ width: `${examPercentOf990}%` }} />
            </div>
            <div className={styles.gaugeMarkers}>
              <span>Khởi điểm 10</span>
              <span>Dự đoán: {data.predictedMid}</span>
              <span>990</span>
            </div>
          </div>
        </div>

        {/* Right Gauge: Knowledge Ceiling */}
        <div className={styles.gaugeBlock}>
          <div className={styles.blockHeader}>
            <span className={styles.blockLabel}>TRẦN TRI THỨC TÍCH LŨY</span>
            <span className={styles.coverageBadge}>
              Phủ {knowledge.targetCoveragePercent}% mục tiêu
            </span>
          </div>

          <div className={styles.scoreRow}>
            <div className={styles.scoreGroup}>
              <span className={`${styles.scoreBandCeiling}`}>
                {knowledge.knowledgeCeilingScore}
              </span>
              <span className={styles.maxScore}>/ 990 trần</span>
            </div>
          </div>

          <div className={styles.gaugeContainer}>
            <div className={styles.gaugeTrack}>
              <div className={styles.gaugeFillCeiling} style={{ width: `${ceilingPercentOf990}%` }} />
            </div>
            <div className={styles.gaugeMarkers}>
              <span>Nền tảng</span>
              <span>Trần tối đa: {knowledge.knowledgeCeilingScore}</span>
              <span>990</span>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Diagnosis Insight Box */}
      <div className={`${styles.insightBox} ${styles[`insight_${knowledge.gapType}`]}`}>
        <div className={styles.insightHeader}>
          <div className={styles.insightTag}>
            <LayersIcon size={14} />
            <span>{knowledge.diagnosisTitle.toUpperCase()}</span>
          </div>
          {knowledge.gapType === 'EXECUTION_DEFICIT' && (
            <span className={styles.gapChipAlert}>Hụt {knowledge.executionGap} điểm thực chiến</span>
          )}
          {knowledge.gapType === 'BALANCED_GROWTH' && (
            <span className={styles.gapChipGood}>Đang tăng trưởng đồng pha</span>
          )}
          {knowledge.gapType === 'KNOWLEDGE_DEFICIT' && (
            <span className={styles.gapChipWarning}>Cần nâng trần kiến thức</span>
          )}
        </div>
        <p className={styles.insightText}>{knowledge.diagnosisAdvice}</p>

        {/* 4 Pillars Mini-Dashboard */}
        <div className={styles.pillarsGrid}>
          <div className={styles.pillarItem}>
            <span className={styles.pillarName}>Từ vựng (SRS)</span>
            <span className={styles.pillarVal}>
              <strong>{knowledge.pillars.vocabulary.masteredCount}</strong> từ Hộp 4-5 ({knowledge.pillars.vocabulary.score}%)
            </span>
          </div>
          <div className={styles.pillarItem}>
            <span className={styles.pillarName}>Ngữ pháp 7 chuyên đề</span>
            <span className={styles.pillarVal}>
              <strong>{knowledge.pillars.grammar.score}%</strong> độ làm chủ
            </span>
          </div>
          <div className={styles.pillarItem}>
            <span className={styles.pillarName}>Nghe hiểu (LC)</span>
            <span className={styles.pillarVal}>
              <strong>{data.listeningScore}</strong>/495
            </span>
          </div>
          <div className={styles.pillarItem}>
            <span className={styles.pillarName}>Đọc hiểu (RC)</span>
            <span className={styles.pillarVal}>
              <strong>{data.readingScore}</strong>/495
            </span>
          </div>
        </div>
      </div>

      {/* Footer Breakdown & Action */}
      <div className={styles.breakdownRow}>
        <div className={styles.subSkillGroup}>
          <div className={styles.subSkill}>
            <span className={styles.dotPrimary} />
            <span>Nghe (LC): <strong>{data.listeningScore}</strong></span>
          </div>
          <div className={styles.subSkill}>
            <span className={styles.dotSecondary} />
            <span>Đọc (RC): <strong>{data.readingScore}</strong></span>
          </div>
        </div>

        <div className={styles.actionsGroup}>
          <Link href={knowledge.primaryRecommendation.actionLink} className={styles.recommendAction}>
            <span>{knowledge.primaryRecommendation.actionLabel}</span>
            <ArrowRightIcon size={14} />
          </Link>
          <Link href="/stats" className={styles.calibAction}>
            <span>Xem biểu đồ radar</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
