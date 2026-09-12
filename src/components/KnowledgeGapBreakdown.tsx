'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import {
  TargetIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ZapIcon,
  LightbulbIcon,
  HeadphonesIcon,
  ReadingIcon,
  ArrowRightIcon,
  BookIcon,
} from '@/components/icons/AppIcons';
import { GRAMMAR_SUB_SKILLS } from '@/components/GrammarRadarChart';
import styles from './KnowledgeGapBreakdown.module.css';

export interface QuestionBreakdownItem {
  id: string | number;
  number: number;
  part: string;
  subCategory?: string;
  grammarTag?: string;
  questionType?: string;
  userAnswer?: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface KnowledgeGapBreakdownProps {
  testType: 'exam' | 'mini-test';
  testId?: string;
  questions: QuestionBreakdownItem[];
  className?: string;
}

export const READING_SUB_SKILLS = [
  {
    key: 'Main Idea',
    nameVi: 'Ý chính & Mục đích bài đọc',
    description: 'Xác định mục đích văn bản, thông báo, thư tín hoặc chủ đề thảo luận.',
    advice: 'Đọc lướt dòng tiêu đề, phần mở đầu hoặc dòng Subject của email/thông báo để nắm mục đích cốt lõi bài viết.',
  },
  {
    key: 'Detail',
    nameVi: 'Thông tin chi tiết (Factual)',
    description: 'Tìm kiếm dữ kiện cụ thể, số liệu, ngày tháng, tên riêng được nêu trong bài.',
    advice: 'Xác định từ khóa danh từ riêng, số liệu trong câu hỏi rồi dùng kỹ thuật quét (Scanning) để định vị thông tin nhanh.',
  },
  {
    key: 'Inference',
    nameVi: 'Suy luận ngụ ý (Inference)',
    description: 'Suy ra thông tin gián tiếp, phán đoán điều có khả năng xảy ra tiếp theo.',
    advice: 'Tìm mối liên hệ gián tiếp hoặc liên kết giữa các văn bản; không chọn phương án suy diễn ngoài thực tế bài đọc.',
  },
  {
    key: 'NOT / TRUE',
    nameVi: 'Thông tin Sai / Đúng (NOT/TRUE)',
    description: 'Phát hiện thông tin KHÔNG được đề cập hoặc thông tin ĐÚNG duy nhất.',
    advice: 'Dùng phương pháp loại trừ: 3 phương án được đề cập trong bài là sai, phương án không xuất hiện là đáp án đúng.',
  },
  {
    key: 'Vocabulary',
    nameVi: 'Từ vựng ngữ cảnh (In-context)',
    description: 'Hiểu nghĩa từ vựng chuyên ngành hoặc từ đa nghĩa trong ngữ cảnh cụ thể.',
    advice: 'Không dịch nghĩa gốc của từ; hãy thay thế lần lượt 4 đáp án vào ngữ cảnh câu văn để chọn từ hợp lý nhất.',
  },
  {
    key: 'Sentence Placement',
    nameVi: 'Điền câu & Ý đồ lời nói',
    description: 'Xác định vị trí thích hợp nhất để chèn một câu văn hoặc giải mã ẩn ý câu nói.',
    advice: 'Quan sát các liên từ nối (however, therefore) và đại từ chỉ định (this, that, such) để xác định vị trí câu văn.',
  },
];

interface SubSkillStat {
  key: string;
  nameVi: string;
  categoryType: 'grammar' | 'reading';
  total: number;
  correct: number;
  wrong: number;
  accuracy: number;
  advice: string;
  severity: 'critical' | 'warning' | 'good';
  drillUrl: string;
}

export default function KnowledgeGapBreakdown({
  testType,
  questions,
  className = '',
}: KnowledgeGapBreakdownProps) {
  // 1. Calculate Grammar & Vocabulary Sub-skills Breakdown (Part 5 & 6)
  const grammarStats = useMemo(() => {
    const statsMap: Record<string, { total: number; correct: number; wrong: number }> = {};

    questions.forEach((q) => {
      const isPart5or6 =
        q.part === 'p5' || q.part === 'part5' || q.part === 'p6' || q.part === 'part6';
      if (!isPart5or6 || !q.subCategory) return;
      const cat = q.subCategory.trim();
      if (!statsMap[cat]) {
        statsMap[cat] = { total: 0, correct: 0, wrong: 0 };
      }
      statsMap[cat].total++;
      if (q.isCorrect) {
        statsMap[cat].correct++;
      } else {
        statsMap[cat].wrong++;
      }
    });

    const list: SubSkillStat[] = Object.entries(statsMap).map(([catKey, counts]) => {
      const meta = GRAMMAR_SUB_SKILLS.find(
        (s) => s.key.toLowerCase() === catKey.toLowerCase()
      ) || {
        key: catKey,
        nameVi: catKey,
        description: '',
        advice: 'Luyện tập chuyên đề Part 5 để nắm chắc quy tắc và bẫy đề thi.',
      };

      const accuracy = counts.total > 0 ? Math.round((counts.correct / counts.total) * 100) : 0;
      let severity: 'critical' | 'warning' | 'good' = 'good';
      if (accuracy < 50 || (counts.total >= 2 && counts.wrong >= 2)) {
        severity = 'critical';
      } else if (accuracy < 75) {
        severity = 'warning';
      }

      return {
        key: meta.key,
        nameVi: meta.nameVi,
        categoryType: 'grammar',
        total: counts.total,
        correct: counts.correct,
        wrong: counts.wrong,
        accuracy,
        advice: meta.advice,
        severity,
        drillUrl: `/part5?subCategory=${encodeURIComponent(meta.key)}`,
      };
    });

    list.sort((a, b) => {
      if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
      return b.wrong - a.wrong;
    });

    return list;
  }, [questions]);

  // 2. Calculate Reading Comprehension Sub-skills Breakdown (Part 7)
  const readingStats = useMemo(() => {
    const statsMap: Record<string, { total: number; correct: number; wrong: number }> = {};

    questions.forEach((q) => {
      const isPart7 = q.part === 'p7' || q.part === 'part7';
      const cat = (q.questionType || q.subCategory || '').trim();
      if (!isPart7 || !cat) return;

      if (!statsMap[cat]) {
        statsMap[cat] = { total: 0, correct: 0, wrong: 0 };
      }
      statsMap[cat].total++;
      if (q.isCorrect) {
        statsMap[cat].correct++;
      } else {
        statsMap[cat].wrong++;
      }
    });

    const list: SubSkillStat[] = Object.entries(statsMap).map(([catKey, counts]) => {
      const meta = READING_SUB_SKILLS.find(
        (s) => s.key.toLowerCase() === catKey.toLowerCase()
      ) || {
        key: catKey,
        nameVi: catKey,
        description: '',
        advice: 'Luyện tập các bài đọc Part 7 để nâng cao kỹ năng định vị thông tin và tư duy logic.',
      };

      const accuracy = counts.total > 0 ? Math.round((counts.correct / counts.total) * 100) : 0;
      let severity: 'critical' | 'warning' | 'good' = 'good';
      if (accuracy < 50 || (counts.total >= 2 && counts.wrong >= 2)) {
        severity = 'critical';
      } else if (accuracy < 75) {
        severity = 'warning';
      }

      return {
        key: meta.key,
        nameVi: meta.nameVi,
        categoryType: 'reading',
        total: counts.total,
        correct: counts.correct,
        wrong: counts.wrong,
        accuracy,
        advice: meta.advice,
        severity,
        drillUrl: `/part7?questionType=${encodeURIComponent(meta.key)}`,
      };
    });

    list.sort((a, b) => {
      if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
      return b.wrong - a.wrong;
    });

    return list;
  }, [questions]);

  // 3. Extract Top Priority Gaps (Combine Grammar + Reading)
  const topGaps = useMemo(() => {
    const combined = [...grammarStats, ...readingStats];
    return combined
      .filter((s) => s.severity === 'critical' || s.severity === 'warning')
      .sort((a, b) => {
        if (a.severity === 'critical' && b.severity !== 'critical') return -1;
        if (b.severity === 'critical' && a.severity !== 'critical') return 1;
        if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
        return b.wrong - a.wrong;
      })
      .slice(0, 3);
  }, [grammarStats, readingStats]);

  // 4. Calculate Section Overview (Specific for Mini-test: Part 2 vs Part 5)
  const sectionStats = useMemo(() => {
    if (testType !== 'mini-test') return null;

    const p2Qs = questions.filter((q) => q.part === 'p2' || q.part === 'part2');
    const p5Qs = questions.filter((q) => q.part === 'p5' || q.part === 'part5');

    const p2Correct = p2Qs.filter((q) => q.isCorrect).length;
    const p5Correct = p5Qs.filter((q) => q.isCorrect).length;

    return {
      p2: {
        total: p2Qs.length,
        correct: p2Correct,
        accuracy: p2Qs.length > 0 ? Math.round((p2Correct / p2Qs.length) * 100) : 0,
      },
      p5: {
        total: p5Qs.length,
        correct: p5Correct,
        accuracy: p5Qs.length > 0 ? Math.round((p5Correct / p5Qs.length) * 100) : 0,
      },
    };
  }, [questions, testType]);

  const getProgressColor = (accuracy: number) => {
    if (accuracy >= 75) return 'var(--success, #10b981)';
    if (accuracy >= 50) return 'var(--warning, #f59e0b)';
    return 'var(--danger, #ef4444)';
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Header */}
      <div className={styles.headerBox}>
        <div className={styles.titleRow}>
          <TargetIcon size={22} style={{ color: 'var(--primary)' }} />
          <span>Báo cáo Bóc tách Lỗ hổng Kiến thức</span>
        </div>
        <p className={styles.subtitle}>
          Phân tích độ chính xác theo từng chủ điểm ngữ pháp & kỹ năng đọc hiểu từ bài làm của bạn.
        </p>
      </div>

      {/* Mini-test Section Comparison */}
      {sectionStats && (
        <div className={styles.sectionOverviewRow}>
          <div className={styles.sectionOverviewCard}>
            <div className={styles.sectionCardHeader}>
              <span className={styles.sectionCardTitle}>
                <HeadphonesIcon size={18} style={{ color: '#2563eb' }} />
                Part 2: Phản xạ Hỏi - Đáp
              </span>
              <span
                className={
                  sectionStats.p2.accuracy >= 75
                    ? styles.badgeGood
                    : sectionStats.p2.accuracy >= 50
                    ? styles.badgeWarning
                    : styles.badgeCritical
                }
              >
                {sectionStats.p2.correct}/{sectionStats.p2.total} đúng ({sectionStats.p2.accuracy}%)
              </span>
            </div>
            <div className={styles.progressContainer}>
              <div className={styles.progressBarTrack}>
                <div
                  className={styles.progressBarFill}
                  style={{
                    width: `${sectionStats.p2.accuracy}%`,
                    backgroundColor: getProgressColor(sectionStats.p2.accuracy),
                  }}
                />
              </div>
            </div>
            <p className={styles.sectionAdviceText}>
              {sectionStats.p2.accuracy >= 75
                ? 'Phản xạ nghe câu hỏi tốt. Tiếp tục duy trì độ tập trung bắt từ hỏi đầu câu.'
                : 'Luyện kỹ năng bắt từ để hỏi (Who, Where, When, Why) và tránh bẫy lặp từ/đồng âm.'}
            </p>
          </div>

          <div className={styles.sectionOverviewCard}>
            <div className={styles.sectionCardHeader}>
              <span className={styles.sectionCardTitle}>
                <ReadingIcon size={18} style={{ color: '#059669' }} />
                Part 5: Ngữ pháp & Từ vựng
              </span>
              <span
                className={
                  sectionStats.p5.accuracy >= 75
                    ? styles.badgeGood
                    : sectionStats.p5.accuracy >= 50
                    ? styles.badgeWarning
                    : styles.badgeCritical
                }
              >
                {sectionStats.p5.correct}/{sectionStats.p5.total} đúng ({sectionStats.p5.accuracy}%)
              </span>
            </div>
            <div className={styles.progressContainer}>
              <div className={styles.progressBarTrack}>
                <div
                  className={styles.progressBarFill}
                  style={{
                    width: `${sectionStats.p5.accuracy}%`,
                    backgroundColor: getProgressColor(sectionStats.p5.accuracy),
                  }}
                />
              </div>
            </div>
            <p className={styles.sectionAdviceText}>
              {sectionStats.p5.accuracy >= 75
                ? 'Nắm chắc ngữ pháp nền tảng. Chú ý tối ưu thời gian dưới 20-30s cho mỗi câu.'
                : 'Xem chi tiết các chủ điểm sai bên dưới và luyện tập chuyên sâu để bịt lỗ hổng.'}
            </p>
          </div>
        </div>
      )}

      {/* Top Priority Gaps Card */}
      <div className={styles.prioritySection}>
        <div className={styles.priorityHeader}>
          <div className={styles.priorityTitle}>
            <AlertCircleIcon size={18} style={{ color: topGaps.length > 0 ? '#ef4444' : '#10b981' }} />
            <span>Chủ điểm Cần Ưu Tiên Khắc Phục Gấp</span>
          </div>
          {topGaps.length > 0 && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Xếp theo mức độ nghiêm trọng & tỷ lệ sai cao nhất
            </span>
          )}
        </div>

        {topGaps.length > 0 ? (
          <div className={styles.priorityGrid}>
            {topGaps.map((gap) => (
              <div key={gap.key} className={styles.priorityCard}>
                <div className={styles.priorityCardTop}>
                  <div className={styles.priorityCardTitleRow}>
                    <div>
                      <div className={styles.priorityCardName}>{gap.nameVi}</div>
                      <div className={styles.priorityCardSub}>
                        {gap.categoryType === 'reading' ? 'Đọc hiểu Part 7' : 'Ngữ pháp Part 5/6'} • {gap.key}
                      </div>
                    </div>
                    <span
                      className={
                        gap.severity === 'critical' ? styles.badgeCritical : styles.badgeWarning
                      }
                    >
                      {gap.severity === 'critical' ? 'Lỗ hổng nghiêm trọng' : 'Cần củng cố'}
                    </span>
                  </div>

                  <div className={styles.statRow}>
                    <span style={{ color: 'var(--text-secondary)' }}>Độ chính xác:</span>
                    <span
                      className={styles.statAccuracy}
                      style={{ color: getProgressColor(gap.accuracy) }}
                    >
                      {gap.accuracy}%
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      (Sai {gap.wrong}/{gap.total} câu)
                    </span>
                  </div>

                  <div className={styles.adviceBox}>
                    <LightbulbIcon
                      size={15}
                      style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }}
                    />
                    <span>{gap.advice}</span>
                  </div>
                </div>

                <Link href={gap.drillUrl} className={styles.drillBtn}>
                  <ZapIcon size={14} />
                  <span>
                    Luyện {gap.categoryType === 'reading' ? 'dạng' : 'chuyên đề'} {gap.nameVi} ngay
                  </span>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.masteredBox}>
            <CheckCircleIcon size={20} />
            <span>
              Tuyệt vời! Bạn không có chủ điểm nào bị xếp vào diện lỗ hổng kiến thức nghiêm trọng trong bài thi này.
            </span>
          </div>
        )}
      </div>

      {/* Part 7 Reading Comprehension Breakdown Table */}
      {readingStats.length > 0 && (
        <div className={styles.breakdownSection} style={{ marginBottom: 28 }}>
          <div className={styles.breakdownTitle}>
            <span>Bóc tách Kỹ năng Đọc hiểu Part 7 ({readingStats.length} dạng câu hỏi)</span>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.breakdownTable}>
              <thead>
                <tr>
                  <th>Dạng câu hỏi</th>
                  <th>Số câu đúng</th>
                  <th style={{ width: '40%' }}>Độ chính xác</th>
                  <th>Đánh giá</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {readingStats.map((item) => (
                  <tr key={item.key}>
                    <td>
                      <div className={styles.subSkillCell}>
                        <span className={styles.subSkillNameVi}>{item.nameVi}</span>
                        <span className={styles.subSkillNameEn}>{item.key}</span>
                      </div>
                    </td>
                    <td>
                      <strong>
                        {item.correct} / {item.total}
                      </strong>
                    </td>
                    <td>
                      <div className={styles.progressContainer}>
                        <div className={styles.progressBarTrack}>
                          <div
                            className={styles.progressBarFill}
                            style={{
                              width: `${item.accuracy}%`,
                              backgroundColor: getProgressColor(item.accuracy),
                            }}
                          />
                        </div>
                        <span
                          className={styles.progressPercent}
                          style={{ color: getProgressColor(item.accuracy) }}
                        >
                          {item.accuracy}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={
                          item.severity === 'critical'
                            ? styles.badgeCritical
                            : item.severity === 'warning'
                            ? styles.badgeWarning
                            : styles.badgeGood
                        }
                      >
                        {item.severity === 'critical'
                          ? 'Lỗ hổng nghiêm trọng'
                          : item.severity === 'warning'
                          ? 'Cần củng cố'
                          : 'Thành thạo'}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={item.drillUrl}
                        className={styles.tableActionBtn}
                        title={`Luyện tập dạng ${item.nameVi}`}
                      >
                        <span>Luyện tập</span>
                        <ArrowRightIcon size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Part 5 & 6 Grammar Sub-skill Breakdown Table */}
      {grammarStats.length > 0 && (
        <div className={styles.breakdownSection}>
          <div className={styles.breakdownTitle}>
            <span>Bóc tách Toàn bộ Chủ điểm Ngữ pháp ({grammarStats.length} chủ điểm)</span>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.breakdownTable}>
              <thead>
                <tr>
                  <th>Chủ điểm</th>
                  <th>Số câu đúng</th>
                  <th style={{ width: '40%' }}>Độ chính xác</th>
                  <th>Đánh giá</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {grammarStats.map((item) => (
                  <tr key={item.key}>
                    <td>
                      <div className={styles.subSkillCell}>
                        <span className={styles.subSkillNameVi}>{item.nameVi}</span>
                        <span className={styles.subSkillNameEn}>{item.key}</span>
                      </div>
                    </td>
                    <td>
                      <strong>
                        {item.correct} / {item.total}
                      </strong>
                    </td>
                    <td>
                      <div className={styles.progressContainer}>
                        <div className={styles.progressBarTrack}>
                          <div
                            className={styles.progressBarFill}
                            style={{
                              width: `${item.accuracy}%`,
                              backgroundColor: getProgressColor(item.accuracy),
                            }}
                          />
                        </div>
                        <span
                          className={styles.progressPercent}
                          style={{ color: getProgressColor(item.accuracy) }}
                        >
                          {item.accuracy}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={
                          item.severity === 'critical'
                            ? styles.badgeCritical
                            : item.severity === 'warning'
                            ? styles.badgeWarning
                            : styles.badgeGood
                        }
                      >
                        {item.severity === 'critical'
                          ? 'Lỗ hổng nghiêm trọng'
                          : item.severity === 'warning'
                          ? 'Cần củng cố'
                          : 'Thành thạo'}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={item.drillUrl}
                        className={styles.tableActionBtn}
                        title={`Luyện tập chuyên đề ${item.nameVi}`}
                      >
                        <span>Luyện tập</span>
                        <ArrowRightIcon size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
