'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { MistakeData } from '@/hooks/useMistakeNotebook';
import { fetchMistakeQuestions } from '@/utils/questionFetcher';
import { storage } from '@/utils/storage';
import { TargetIcon, ZapIcon, ArrowRightIcon } from '@/components/icons/AppIcons';
import styles from './GrammarRadarChart.module.css';

export interface SubSkillMeta {
  key: string;
  nameVi: string;
  description: string;
  advice: string;
}

export const GRAMMAR_SUB_SKILLS: SubSkillMeta[] = [
  {
    key: 'Word Form',
    nameVi: 'Từ loại',
    description: 'Xác định Noun, Adj, Adv, Verb dựa trên vị trí và hậu tố',
    advice: 'Luyện kỹ thuật nhận diện đuôi từ (-tion, -ment, -ful, -ive, -ly) và công thức cụm danh từ (a/the + Adj + N).',
  },
  {
    key: 'Verb Tense',
    nameVi: 'Thì & Thể động từ',
    description: 'Thì hoàn thành, quá khứ đơn, câu bị động và dạng To-V / V-ing',
    advice: 'Xác định dấu hiệu thời gian (since, already, yesterday) và kiểm tra xem chủ ngữ tự làm hay bị tác động (bị động).',
  },
  {
    key: 'Preposition & Conjunction',
    nameVi: 'Giới từ & Liên từ',
    description: 'Phân biệt Although vs Despite, Because vs Due to, giới từ đi kèm',
    advice: 'Quy tắc vàng: Liên từ nối Mệnh đề (S + V), Giới từ đi với Cụm danh từ / V-ing.',
  },
  {
    key: 'Pronoun',
    nameVi: 'Đại từ & Sở hữu',
    description: 'Đại từ nhân xưng, tính từ sở hữu, đại từ phản thân',
    advice: 'Trước danh từ luôn là Tính từ sở hữu (their / her). Sau giới từ hoặc ngoại động từ là Đại từ tân ngữ hoặc phản thân.',
  },
  {
    key: 'Relative Clause',
    nameVi: 'Mệnh đề quan hệ',
    description: 'who, which, that, whose, mệnh đề quan hệ rút gọn',
    advice: 'Xem từ đứng trước là Người hay Vật; xem phía sau khuyết Chủ ngữ hay Tân ngữ để chọn đại từ quan hệ chuẩn xác.',
  },
  {
    key: 'Business Vocabulary',
    nameVi: 'Từ vựng thương mại',
    description: 'Collocations và cụm từ cố định trong môi trường công sở ETS',
    advice: 'Học từ vựng theo cụm (Collocation) như "reach an agreement", "deliver a speech", "comply with regulations".',
  },
  {
    key: 'Sentence Structure',
    nameVi: 'Cấu trúc câu',
    description: 'Đảo ngữ, thể giả định, cấu trúc song hành, câu so sánh',
    advice: 'Tìm động từ chính của câu trước để tránh nhầm lẫn giữa mệnh đề phụ và mệnh đề chính.',
  },
  {
    key: 'Contextual Completion',
    nameVi: 'Điền câu ngữ cảnh',
    description: 'Chọn câu logic nối mạch văn bản Part 6',
    advice: 'Đọc câu liền trước và liền sau chỗ trống, chú ý các từ nối (However, Therefore, In addition) và đại từ chỉ định.',
  },
];

interface GrammarRadarChartProps {
  mistakes?: MistakeData;
}

export default function GrammarRadarChart({ mistakes: propMistakes }: GrammarRadarChartProps) {
  const [mistakes, setMistakes] = useState<MistakeData>(propMistakes || {});
  const [resolvedMistakes, setResolvedMistakes] = useState<Record<string, { subCategory: string; count: number }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activeMistakes = propMistakes;
    if (!activeMistakes || Object.keys(activeMistakes).length === 0) {
      activeMistakes = storage.get<MistakeData>('mistake_notebook', {});
    }
    setMistakes(activeMistakes);

    // Resolve question subCategories
    const resolveTags = async () => {
      const examMistakeIds = Object.keys(activeMistakes).filter(
        id => activeMistakes[id].type === 'exam'
      );

      if (examMistakeIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const questions = await fetchMistakeQuestions(examMistakeIds, activeMistakes);
        const map: Record<string, { subCategory: string; count: number }> = {};

        questions.forEach(q => {
          const cat = q.subCategory || q.qData?.subCategory || q.qData?.type || 'Other';
          map[q.mistakeId] = {
            subCategory: cat,
            count: q.wrongCount || 1,
          };
        });

        setResolvedMistakes(map);
      } catch (err) {
        console.error('Error resolving grammar sub-categories:', err);
      } finally {
        setLoading(false);
      }
    };

    resolveTags();
  }, [propMistakes]);

  // Aggregate mistakes by Sub-Skill
  const statsBySkill = useMemo(() => {
    const counts: Record<string, number> = {};
    GRAMMAR_SUB_SKILLS.forEach(skill => {
      counts[skill.key] = 0;
    });

    Object.entries(mistakes).forEach(([id, m]) => {
      if (m.type !== 'exam') return;
      
      let subCat = m.subCategory;
      let count = m.wrongCount || 1;

      // If missing in mistake record, use resolved from questions
      if (!subCat && resolvedMistakes[id]) {
        subCat = resolvedMistakes[id].subCategory;
        count = resolvedMistakes[id].count;
      }

      if (!subCat) return;

      // Match to one of the 8 canonical keys
      const matched = GRAMMAR_SUB_SKILLS.find(
        s => s.key.toLowerCase() === subCat!.toLowerCase() ||
             subCat!.toLowerCase().includes(s.key.toLowerCase())
      );

      if (matched) {
        counts[matched.key] = (counts[matched.key] || 0) + count;
      } else if (subCat.includes('Preposition') || subCat.includes('Conjunction')) {
        counts['Preposition & Conjunction'] = (counts['Preposition & Conjunction'] || 0) + count;
      } else if (subCat.includes('Vocabulary') || subCat.includes('Collocation')) {
        counts['Business Vocabulary'] = (counts['Business Vocabulary'] || 0) + count;
      } else if (subCat.includes('Tense') || subCat.includes('Verb') || subCat.includes('Infinitive') || subCat.includes('Gerund')) {
        counts['Verb Tense'] = (counts['Verb Tense'] || 0) + count;
      } else if (subCat.includes('Structure') || subCat.includes('Comparison') || subCat.includes('Inversion') || subCat.includes('Subjunctive')) {
        counts['Sentence Structure'] = (counts['Sentence Structure'] || 0) + count;
      } else {
        counts['Word Form'] = (counts['Word Form'] || 0) + count;
      }
    });

    return counts;
  }, [mistakes, resolvedMistakes]);

  const totalGrammarMistakes = useMemo(() => {
    return Object.values(statsBySkill).reduce((acc, curr) => acc + curr, 0);
  }, [statsBySkill]);

  // Data for Recharts Radar
  const chartData = useMemo(() => {
    return GRAMMAR_SUB_SKILLS.map(skill => ({
      subject: skill.nameVi,
      key: skill.key,
      mistakes: statsBySkill[skill.key] || 0,
      fullMark: Math.max(...Object.values(statsBySkill), 5),
    }));
  }, [statsBySkill]);

  const maxMistakes = useMemo(() => {
    return Math.max(...Object.values(statsBySkill), 0);
  }, [statsBySkill]);

  // Top 3 Weaknesses
  const topWeaknesses = useMemo(() => {
    return GRAMMAR_SUB_SKILLS
      .map(skill => ({
        ...skill,
        mistakeCount: statsBySkill[skill.key] || 0,
      }))
      .filter(item => item.mistakeCount > 0)
      .sort((a, b) => b.mistakeCount - a.mistakeCount)
      .slice(0, 3);
  }, [statsBySkill]);

  return (
    <div className={styles.container} id="grammar-radar-container">
      <div className={styles.header}>
        <h2 className={styles.title}>Bản Đồ Năng Lực & Lỗ Hổng Ngữ Pháp (Part 5 & 6)</h2>
        <p className={styles.subtitle}>
          Bóc tách chi tiết 8 chủ điểm ngữ pháp cốt lõi dựa trên các câu làm sai trong Sổ tay & Đề thi ETS
        </p>
      </div>

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Đang phân tích dữ liệu lỗ hổng kiến thức...
        </div>
      ) : totalGrammarMistakes === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyTitle}>Chưa phát hiện lỗ hổng ngữ pháp nào</div>
          <p className={styles.emptyDesc}>
            Dữ liệu câu hỏi sai hiện đang trống. Hãy làm các bài luyện tập Part 5, Part 6 hoặc làm bài thi thử để hệ thống nhận diện chính xác chủ điểm ngữ pháp bạn cần cải thiện.
          </p>
          <div className={styles.emptyActions}>
            <Link href="/part5" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span>Luyện Part 5 (30s / câu)</span>
              <ArrowRightIcon size={15} />
            </Link>
            <Link href="/part6" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span>Luyện Part 6 (Điền đoạn văn)</span>
              <ArrowRightIcon size={15} />
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.contentGrid}>
          {/* Left: Radar Chart */}
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                <PolarGrid stroke="var(--border)" strokeOpacity={0.6} />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: 'var(--foreground)', fontSize: 11, fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, Math.max(maxMistakes, 4)]}
                  stroke="var(--text-secondary)"
                  strokeOpacity={0.4}
                  tick={{ fontSize: 10, fill: 'var(--text-secondary)' }}
                />
                <Radar
                  name="Số câu sai"
                  dataKey="mistakes"
                  stroke="var(--primary)"
                  fill="var(--primary)"
                  fillOpacity={0.4}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                    borderRadius: '8px',
                    color: 'var(--foreground)',
                    boxShadow: 'var(--shadow-md)',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`${value} câu sai`, 'Tần suất']}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Right: Top 3 Weaknesses & Actionable Advice */}
          <div className={styles.insightsSection}>
            <h3 className={styles.insightsTitle}>
              <TargetIcon size={18} style={{ color: 'var(--danger)' }} />
              <span>Chủ điểm cần ưu tiên củng cố ({topWeaknesses.length} lỗ hổng)</span>
            </h3>

            {topWeaknesses.map((item, index) => {
              const rankClass =
                index === 0
                  ? styles.rankBadge1
                  : index === 1
                  ? styles.rankBadge2
                  : styles.rankBadge3;

              return (
                <div key={item.key} className={styles.weaknessCard}>
                  <div className={styles.weaknessHeader}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span className={`${styles.rankBadge} ${rankClass}`}>
                        Ưu tiên #{index + 1}
                      </span>
                      <span className={styles.categoryName}>{item.nameVi}</span>
                      <span className={styles.categorySub}>({item.key})</span>
                    </div>
                    <span className={styles.mistakeBadge}>
                      Sai {item.mistakeCount} lần
                    </span>
                  </div>

                  <p className={styles.adviceText}>
                    <strong>Chiến thuật 15s: </strong>{item.advice}
                  </p>

                  <div className={styles.actionRow}>
                    <Link
                      href={`/notebook?subCategory=${encodeURIComponent(item.key)}`}
                      className={styles.actionBtn}
                      title="Xem các câu hỏi thuộc chủ điểm này trong Sổ tay"
                    >
                      <span>Xem câu sai</span>
                      <ArrowRightIcon size={13} />
                    </Link>
                    <Link
                      href={`/part5?subCategory=${encodeURIComponent(item.key)}`}
                      className={styles.actionBtn}
                      title={`Luyện tập chuyên đề ${item.nameVi} (${item.key})`}
                    >
                      <ZapIcon size={13} />
                      <span>Luyện tập</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
