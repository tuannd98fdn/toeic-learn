'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  TargetIcon,
  ZapIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  BookOpenIcon,
  ExamIcon,
} from '@/components/icons/AppIcons';
import { storage } from '@/utils/storage';
import { MistakeData } from '@/hooks/useMistakeNotebook';
import {
  calculateBottleneckStats,
  BottleneckStats,
  ROOT_CAUSES,
} from '@/utils/bottleneckCalculator';
import styles from './BottleneckRemediationWidget.module.css';

export default function BottleneckRemediationWidget() {
  const [mistakes, setMistakes] = useState<MistakeData>({});
  const [mounted, setMounted] = useState(false);

  const loadData = useCallback(() => {
    const data = storage.get<MistakeData>('mistake_notebook', {});
    setMistakes(data);
  }, []);

  useEffect(() => {
    loadData();
    setMounted(true);

    const handleFocus = () => loadData();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'mistake_notebook') loadData();
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorage);
    };
  }, [loadData]);

  const stats: BottleneckStats = useMemo(() => {
    return calculateBottleneckStats(mistakes);
  }, [mistakes]);

  if (!mounted) {
    return null;
  }

  // SVG circular gauge calculation
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (stats.remediationRate / 100) * circumference;

  return (
    <section className={styles.widgetContainer} aria-label="Widget Khắc Phục Điểm Nghẽn">
      {/* Header */}
      <div className={styles.widgetHeader}>
        <div className={styles.titleArea}>
          <div className={styles.iconWrap}>
            <TargetIcon size={20} />
          </div>
          <div className={styles.headerText}>
            <h3 className={styles.widgetTitle}>Khắc Phục Điểm Nghẽn Hôm Nay</h3>
            <p className={styles.widgetSubtitle}>
              Tháo gỡ các câu hỏi sai theo nguyên nhân gốc để thu hẹp khoảng cách điểm số
            </p>
          </div>
        </div>
        <Link href="/notebook?tab=exam" className={styles.notebookLink}>
          <span>Ma trận Sổ tay ({stats.activeCount} câu cần ôn)</span>
          <ArrowRightIcon size={14} />
        </Link>
      </div>

      {/* State 1: HAS_BOTTLENECK */}
      {stats.status === 'HAS_BOTTLENECK' && stats.topBottleneck && (
        <div className={styles.contentGrid}>
          {/* Left Column: Mastery Card */}
          <div className={styles.masteryCard}>
            <div className={styles.gaugeSection}>
              <div className={styles.gaugeCircle}>
                <svg className={styles.gaugeSvg} viewBox="0 0 76 76">
                  <circle
                    className={styles.gaugeBg}
                    cx="38"
                    cy="38"
                    r={radius}
                  />
                  <circle
                    className={styles.gaugeFill}
                    cx="38"
                    cy="38"
                    r={radius}
                    stroke={stats.remediationRate >= 70 ? 'var(--success)' : stats.remediationRate >= 40 ? 'var(--warning)' : 'var(--primary)'}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                <span className={styles.gaugeValue}>{stats.remediationRate}%</span>
              </div>
              <div className={styles.gaugeMeta}>
                <span className={styles.gaugeMetaTitle}>Tỷ lệ Đã Khắc Phục</span>
                <span className={styles.gaugeMetaSub}>
                  {stats.masteredCount}/{stats.total} câu tốt nghiệp
                </span>
              </div>
            </div>

            <div className={styles.masteryCounts}>
              <div className={styles.countItem}>
                <span className={styles.countNumber} style={{ color: 'var(--success)' }}>
                  {stats.masteredCount}
                </span>
                <span className={styles.countLabel}>Đã tốt nghiệp</span>
              </div>
              <div className={styles.countItem}>
                <span className={styles.countNumber} style={{ color: stats.topBottleneck.color }}>
                  {stats.activeCount}
                </span>
                <span className={styles.countLabel}>Đang cần khắc phục</span>
              </div>
            </div>

            {/* Segmented Distribution Bar */}
            <div className={styles.distributionBarGroup}>
              <div className={styles.distributionBarLabel}>
                <span>Phân bổ 5 nhóm nguyên nhân</span>
                <span>{stats.activeCount} câu</span>
              </div>
              <div className={styles.distributionBar}>
                {stats.breakdown.map((item) => (
                  <div
                    key={item.rootCause}
                    className={styles.distributionSegment}
                    style={{
                      width: `${item.percent}%`,
                      background: item.color,
                    }}
                    title={`${item.label}: ${item.count} câu (${item.percent}%)`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Top Bottleneck Spotlight */}
          <div className={styles.spotlightCard}>
            <div className={styles.spotlightTop}>
              <div className={styles.spotlightBadgeRow}>
                <span
                  className={styles.spotlightBadge}
                  style={{
                    background: `${stats.topBottleneck.color}1a`,
                    color: stats.topBottleneck.color,
                    border: `1px solid ${stats.topBottleneck.color}40`,
                  }}
                >
                  <AlertCircleIcon size={12} />
                  <span>Điểm Nghẽn Cần Khắc Phục Gấp</span>
                </span>
                <span className={styles.spotlightCountPill}>
                  {stats.topBottleneck.count} câu ({stats.topBottleneck.percent}% lỗi active)
                </span>
              </div>

              <h4 className={styles.spotlightTitle}>
                {stats.topBottleneck.label}
              </h4>
              <p className={styles.spotlightDesc}>
                {stats.topBottleneck.shortDesc}
              </p>
            </div>

            <div className={styles.spotlightActionRow}>
              <Link
                href={stats.topBottleneck.actionLink}
                className={styles.ctaBtn}
                style={{
                  background: stats.topBottleneck.color,
                  boxShadow: `0 4px 14px ${stats.topBottleneck.color}40`,
                }}
              >
                <ZapIcon size={15} />
                <span>LUYỆN KHẮC PHỤC {stats.topBottleneck.rootCause.toUpperCase()} ({stats.topBottleneck.count} CÂU)</span>
                <ArrowRightIcon size={15} />
              </Link>

              {stats.unassignedCount > 0 ? (
                <span className={styles.secondaryNote}>
                  Còn {stats.unassignedCount} câu chưa phân loại •{' '}
                  <Link href="/notebook?tab=exam" className={styles.secondaryNoteLink}>
                    Gán nhãn ngay
                  </Link>
                </span>
              ) : (
                <span className={styles.secondaryNote}>
                  Luyện tập có giàn giáo Clue Hint &amp; Tốt nghiệp ngay khi đúng
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* State 2: ALL_MASTERED */}
      {stats.status === 'ALL_MASTERED' && (
        <div className={styles.stateBanner}>
          <div className={styles.stateContent}>
            <div
              className={styles.stateIconBox}
              style={{ background: 'rgba(var(--success-rgb), 0.12)', color: 'var(--success)' }}
            >
              <ShieldCheckIcon size={24} />
            </div>
            <div className={styles.stateText}>
              <h4 className={styles.stateTitle}>
                Tuyệt Vời! Đã Khắc Phục 100% Điểm Nghẽn ({stats.masteredCount}/{stats.total} Câu)
              </h4>
              <p className={styles.stateDesc}>
                Bạn đã làm chủ toàn bộ các câu hỏi sai ghi nhận trong Sổ tay. Nền tảng kiến thức đã sẵn sàng để bứt phá dải điểm mới.
              </p>
            </div>
          </div>
          <Link
            href="/exam"
            className={styles.stateBtn}
            style={{ background: 'var(--success)', color: '#ffffff' }}
          >
            <ExamIcon size={16} />
            <span>THI THỬ ETS ĐÁNH GIÁ LẠI</span>
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      )}

      {/* State 3: EMPTY */}
      {stats.status === 'EMPTY' && (
        <div className={styles.stateBanner}>
          <div className={styles.stateContent}>
            <div
              className={styles.stateIconBox}
              style={{ background: 'rgba(var(--primary-rgb), 0.12)', color: 'var(--primary)' }}
            >
              <CheckCircleIcon size={24} />
            </div>
            <div className={styles.stateText}>
              <h4 className={styles.stateTitle}>
                Hồ Sơ Sạch: Chưa Ghi Nhận Điểm Nghẽn Nào
              </h4>
              <p className={styles.stateDesc}>
                Bạn chưa mắc lỗi sai nào trong các bài thi thử. Hãy thử sức với bài thi ETS 200 câu hoặc Mini-test để rà soát năng lực thực tế.
              </p>
            </div>
          </div>
          <Link
            href="/exam"
            className={styles.stateBtn}
            style={{ background: 'var(--primary)', color: '#ffffff' }}
          >
            <ExamIcon size={16} />
            <span>VÀO THI THỬ 200 CÂU</span>
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      )}

      {/* State 4: NEEDS_TAGGING */}
      {stats.status === 'NEEDS_TAGGING' && (
        <div className={styles.stateBanner}>
          <div className={styles.stateContent}>
            <div
              className={styles.stateIconBox}
              style={{ background: 'rgba(var(--warning-rgb), 0.12)', color: 'var(--warning)' }}
            >
              <AlertCircleIcon size={24} />
            </div>
            <div className={styles.stateText}>
              <h4 className={styles.stateTitle}>
                Có {stats.unassignedCount} Câu Hỏi Sai Chưa Phân Loại Nguyên Nhân
              </h4>
              <p className={styles.stateDesc}>
                Hãy gắn nhãn 5 nhóm nguyên nhân gốc (Mắc bẫy, Ngữ pháp, Từ vựng...) trong Sổ tay để AI tự động chỉ ra điểm nghẽn lớn nhất.
              </p>
            </div>
          </div>
          <Link
            href="/notebook?tab=exam"
            className={styles.stateBtn}
            style={{ background: 'var(--warning)', color: '#ffffff' }}
          >
            <BookOpenIcon size={16} />
            <span>VÀO GẮN NHÃN NGUYÊN NHÂN</span>
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      )}
    </section>
  );
}
