'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useVocabulary } from '@/hooks/useVocabulary';
import { useLeitner } from '@/hooks/useLeitner';
import { evaluateVocabMastery, TopicMasteryStat } from '@/utils/vocabEvaluator';
import {
  FileTextIcon,
  BriefcaseIcon,
  UsersIcon,
  DollarSignIcon,
  TrendingUpIcon,
  LayersIcon,
  TruckIcon,
  WrenchIcon,
  CompassIcon,
  HomeIcon,
  MessageSquareIcon,
  BookOpenIcon,
  TargetIcon,
  ArrowRightIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  CardsIcon
} from '@/components/icons/AppIcons';
import styles from './VocabTopicMasteryMatrix.module.css';

interface VocabTopicMasteryMatrixProps {
  onSelectTopic?: (topicNameEn: string) => void;
  compact?: boolean;
}

export default function VocabTopicMasteryMatrix({ onSelectTopic, compact = false }: VocabTopicMasteryMatrixProps) {
  const { allWords, mounted: vocabMounted } = useVocabulary();
  const { progress, mounted: leitnerMounted } = useLeitner();

  const evalResult = useMemo(() => {
    return evaluateVocabMastery(allWords, progress);
  }, [allWords, progress]);

  if (!vocabMounted || !leitnerMounted) {
    return (
      <div className={styles.loadingContainer}>
        <div className="skeleton" style={{ height: '180px', borderRadius: 'var(--radius-xl)' }} />
      </div>
    );
  }

  const renderTopicIcon = (iconName: string, size = 18) => {
    switch (iconName) {
      case 'FileTextIcon': return <FileTextIcon size={size} />;
      case 'BriefcaseIcon': return <BriefcaseIcon size={size} />;
      case 'UsersIcon': return <UsersIcon size={size} />;
      case 'DollarSignIcon': return <DollarSignIcon size={size} />;
      case 'TrendingUpIcon': return <TrendingUpIcon size={size} />;
      case 'LayersIcon': return <LayersIcon size={size} />;
      case 'TruckIcon': return <TruckIcon size={size} />;
      case 'WrenchIcon': return <WrenchIcon size={size} />;
      case 'CompassIcon': return <CompassIcon size={size} />;
      case 'HomeIcon': return <HomeIcon size={size} />;
      case 'MessageSquareIcon': return <MessageSquareIcon size={size} />;
      case 'BookOpenIcon': return <BookOpenIcon size={size} />;
      default: return <CardsIcon size={size} />;
    }
  };

  return (
    <div className={`${styles.matrixCard} ${compact ? styles.compactCard : ''}`}>
      {/* Header */}
      <div className={styles.matrixHeader}>
        <div className={styles.headerInfo}>
          <div className={styles.headerBadge}>
            <TargetIcon size={14} />
            <span>ĐÁNH GIÁ THEO CHUẨN ETS</span>
          </div>
          <h2 className={styles.headerTitle}>
            Bản Đồ Năng Lực Từ Vựng 12 Chủ Đề ETS
          </h2>
          <p className={styles.headerSubtitle}>
            Bóc tách mức độ thành thạo và phát hiện lỗ hổng từ vựng theo 12 lĩnh vực trọng tâm bài thi TOEIC
          </p>
        </div>

        {!compact && (
          <Link href="/study" className={styles.headerActionBtn}>
            <span>Học Flashcards</span>
            <ArrowRightIcon size={14} />
          </Link>
        )}
      </div>

      {/* Summary KPI Strip */}
      <div className={styles.kpiStrip}>
        <div className={styles.kpiItem}>
          <span className={styles.kpiLabel}>Ước Lượng Vốn Từ Hoạt Động</span>
          <div className={styles.kpiValWrap}>
            <span className={styles.kpiValue} style={{ color: 'var(--primary)' }}>
              ~{evalResult.estimatedActiveVocab}
            </span>
            <span className={styles.kpiUnit}>từ</span>
          </div>
        </div>

        <div className={styles.kpiDivider} />

        <div className={styles.kpiItem}>
          <span className={styles.kpiLabel}>Độ Phủ & Thành Thạo Tổng Thể</span>
          <div className={styles.kpiValWrap}>
            <span className={styles.kpiValue} style={{ color: evalResult.overallMasteryScore >= 70 ? 'var(--success)' : evalResult.overallMasteryScore >= 35 ? 'var(--warning-hover)' : 'var(--danger)' }}>
              {evalResult.overallMasteryScore}%
            </span>
            <span className={styles.kpiUnit}>({evalResult.totalMastered}/{evalResult.totalWords} từ Hộp 4-5)</span>
          </div>
        </div>

        <div className={styles.kpiDivider} />

        <div className={styles.kpiItem}>
          <span className={styles.kpiLabel}>Đánh Giá Năng Lực Mục Tiêu</span>
          <div className={styles.kpiValWrap}>
            <span className={styles.kpiBandBadge}>
              {evalResult.targetBandRecommendation}
            </span>
          </div>
        </div>
      </div>

      {/* Critical Weakness Alert Banner */}
      {evalResult.weakestTopic && evalResult.weakestTopic.masteryScore < 70 && (
        <div className={styles.weaknessAlert}>
          <div className={styles.alertIconWrap}>
            <AlertCircleIcon size={20} />
          </div>
          <div className={styles.alertContent}>
            <div className={styles.alertTitle}>
              Lỗ hổng từ vựng cần ưu tiên củng cố: <strong>{evalResult.weakestTopic.nameVi}</strong>
            </div>
            <div className={styles.alertDesc}>
              Mới làm chủ {evalResult.weakestTopic.masteredWords}/{evalResult.weakestTopic.totalWords} từ ({evalResult.weakestTopic.masteryScore}%). Còn {evalResult.weakestTopic.unstudiedWords + evalResult.weakestTopic.learningWords} từ chưa vững trong đề thi.
            </div>
          </div>
          {onSelectTopic ? (
            <button
              type="button"
              className={styles.alertActionBtn}
              onClick={() => onSelectTopic(evalResult.weakestTopic!.nameEn)}
            >
              <span>Luyện chủ đề này ngay</span>
              <ArrowRightIcon size={14} />
            </button>
          ) : (
            <Link
              href={`/study?category=${encodeURIComponent(evalResult.weakestTopic.nameEn)}`}
              className={styles.alertActionBtn}
            >
              <span>Luyện chủ đề này ngay</span>
              <ArrowRightIcon size={14} />
            </Link>
          )}
        </div>
      )}

      {/* 12 Topics Grid */}
      <div className={styles.topicsGrid}>
        {evalResult.topics.map(topic => {
          const statusClass = 
            topic.status === 'strong' ? styles.statusStrong :
            topic.status === 'moderate' ? styles.statusModerate : styles.statusWeak;

          const statusLabel = 
            topic.status === 'strong' ? 'Thành thạo' :
            topic.status === 'moderate' ? 'Cần củng cố' : 'Chưa vững';

          const progressColor =
            topic.status === 'strong' ? 'var(--success)' :
            topic.status === 'moderate' ? 'var(--warning-hover)' : 'var(--danger)';

          return (
            <div key={topic.topicId} className={styles.topicCard}>
              <div className={styles.topicCardTop}>
                <div className={styles.topicIconAndTitle}>
                  <div className={styles.topicIconBubble}>
                    {renderTopicIcon(topic.icon, 16)}
                  </div>
                  <div>
                    <div className={styles.topicNameVi}>{topic.nameVi}</div>
                    <div className={styles.topicNameEn}>{topic.nameEn}</div>
                  </div>
                </div>

                <div className={styles.topicScoreBadge}>
                  <span className={styles.topicScoreNum}>{topic.masteryScore}%</span>
                  <span className={`${styles.topicStatusPill} ${statusClass}`}>
                    {statusLabel}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className={styles.progressBarBg}>
                <div 
                  className={styles.progressBarFill}
                  style={{ width: `${topic.masteryScore}%`, background: progressColor }}
                />
              </div>

              {/* Card Footer */}
              <div className={styles.topicCardBottom}>
                <span className={styles.topicWordCount}>
                  <strong>{topic.masteredWords}</strong>/{topic.totalWords} từ đã thuộc
                </span>

                {onSelectTopic ? (
                  <button
                    type="button"
                    className={styles.topicLinkBtn}
                    onClick={() => onSelectTopic(topic.nameEn)}
                  >
                    <span>Luyện tập</span>
                    <ArrowRightIcon size={12} />
                  </button>
                ) : (
                  <Link
                    href={`/study?category=${encodeURIComponent(topic.nameEn)}`}
                    className={styles.topicLinkBtn}
                  >
                    <span>Luyện tập</span>
                    <ArrowRightIcon size={12} />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
