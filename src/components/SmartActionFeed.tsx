'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  NotebookIcon,
  TargetIcon,
  ZapIcon,
  CompassIcon,
  ArrowRightIcon,
} from '@/components/icons/AppIcons';
import { analyzeLearnerGaps, LearnerGaps } from '@/utils/studyPlanEngine';
import styles from './SmartActionFeed.module.css';

export default function SmartActionFeed() {
  const [gaps, setGaps] = useState<LearnerGaps | null>(null);

  useEffect(() => {
    setGaps(analyzeLearnerGaps());
  }, []);

  if (!gaps) return null;

  // 1. Priority 1: Due Mistakes in Notebook
  if (gaps.dueMistakeCount > 0) {
    return (
      <div className={styles.feedCard}>
        <div className={styles.leftGroup}>
          <div className={styles.iconBox} style={{ color: 'var(--warning)', background: 'rgba(var(--warning-rgb), 0.12)' }}>
            <NotebookIcon size={22} />
          </div>
          <div className={styles.textGroup}>
            <div className={styles.tagRow}>
              <span className={styles.tag} style={{ color: 'var(--warning)' }}>ÔN TẬP ĐẾN HẠN</span>
            </div>
            <h4 className={styles.title}>
              Bạn có {gaps.dueMistakeCount} câu hỏi đến hạn ôn trong Sổ tay
            </h4>
            <p className={styles.subtitle}>
              Ôn tập đúng điểm rơi Spaced Repetition để chuyển hóa kiến thức thành trí nhớ dài hạn.
            </p>
          </div>
        </div>
        <Link href="/notebook?filter=due" className={styles.actionBtn} style={{ background: 'var(--warning)', boxShadow: '0 4px 14px rgba(var(--warning-rgb), 0.3)' }}>
          <span>ÔN TẬP NGAY</span>
          <ArrowRightIcon size={16} />
        </Link>
      </div>
    );
  }

  // 2. Priority 2: Urgent Grammar Gap
  if (gaps.topGrammarWeaknesses.length > 0) {
    const topGap = gaps.topGrammarWeaknesses[0];
    return (
      <div className={styles.feedCard}>
        <div className={styles.leftGroup}>
          <div className={styles.iconBox}>
            <TargetIcon size={22} />
          </div>
          <div className={styles.textGroup}>
            <div className={styles.tagRow}>
              <span className={styles.tag}>LỖ HỔNG CẤP BÁCH</span>
            </div>
            <h4 className={styles.title}>
              Chủ điểm cần khắc phục: {topGap}
            </h4>
            <p className={styles.subtitle}>
              Lỗi sai tập trung nhiều nhất ở dạng này. Luyện 10 câu chuyên đề liên đề để bịt lỗ hổng!
            </p>
          </div>
        </div>
        <Link href={`/part5?subCategory=${encodeURIComponent(topGap)}`} className={styles.actionBtn}>
          <span>LUYỆN CHUYÊN ĐỀ</span>
          <ArrowRightIcon size={16} />
        </Link>
      </div>
    );
  }

  // 3. Priority 3: Weakest Part
  if (gaps.weakestParts.length > 0 && gaps.weakestParts[0] !== 'p5') {
    const weakPart = gaps.weakestParts[0];
    return (
      <div className={styles.feedCard}>
        <div className={styles.leftGroup}>
          <div className={styles.iconBox} style={{ color: 'var(--secondary)', background: 'rgba(var(--secondary-rgb), 0.12)' }}>
            <ZapIcon size={22} />
          </div>
          <div className={styles.textGroup}>
            <div className={styles.tagRow}>
              <span className={styles.tag} style={{ color: 'var(--secondary)' }}>KỸ NĂNG CẦN TĂNG TỐC</span>
            </div>
            <h4 className={styles.title}>
              Củng cố phản xạ phần thi {weakPart.toUpperCase()}
            </h4>
            <p className={styles.subtitle}>
              Tỷ lệ chính xác đang cần cải thiện. Hoàn thành 1 trạm luyện tập để nâng điểm.
            </p>
          </div>
        </div>
        <Link href={`/${weakPart}`} className={styles.actionBtn} style={{ background: 'var(--secondary)', boxShadow: '0 4px 14px rgba(var(--secondary-rgb), 0.3)' }}>
          <span>LUYỆN TẬP NGAY</span>
          <ArrowRightIcon size={16} />
        </Link>
      </div>
    );
  }

  // 4. Default: Diagnostic Suggestion
  return (
    <div className={styles.feedCard}>
      <div className={styles.leftGroup}>
        <div className={styles.iconBox}>
          <CompassIcon size={22} />
        </div>
        <div className={styles.textGroup}>
          <div className={styles.tagRow}>
            <span className={styles.tag}>CHẨN ĐOÁN NĂNG LỰC</span>
          </div>
          <h4 className={styles.title}>
            Làm bài Test Nhanh (28 câu) để AI hiệu chuẩn điểm thi
          </h4>
          <p className={styles.subtitle}>
            Chỉ mất 20 phút để xác định chính xác dải điểm và thiết kế lộ trình riêng cho bạn.
          </p>
        </div>
      </div>
      <Link href="/diagnostic" className={styles.actionBtn}>
        <span>TEST 20 PHÚT</span>
        <ArrowRightIcon size={16} />
      </Link>
    </div>
  );
}
