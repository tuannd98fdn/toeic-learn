'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MistakeData } from '@/hooks/useMistakeNotebook';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import { fetchMistakeQuestions, LoadedQuestion } from '@/utils/questionFetcher';
import { isDueForReview } from '@/utils/spacedRepetition';
import {
  RotateCcwIcon,
  BotIcon,
  ZapIcon,
  ArrowRightIcon,
  HeadphonesIcon,
} from '@/components/icons/AppIcons';
import styles from './page.module.css';

interface ExamMistakeListProps {
  mistakeIds: string[];
  mistakes: MistakeData;
}

export default function ExamMistakeList({ mistakeIds, mistakes }: ExamMistakeListProps) {
  const searchParams = useSearchParams();
  const initialSubCat = searchParams?.get('subCategory') || 'all';

  const [loadedQuestions, setLoadedQuestions] = useState<LoadedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);
  const [filterPart, setFilterPart] = useState<string>('all');
  const [filterSubCategory, setFilterSubCategory] = useState<string>(initialSubCat);

  useEffect(() => {
    const sub = searchParams?.get('subCategory');
    if (sub) {
      setFilterSubCategory(sub);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const results = await fetchMistakeQuestions(mistakeIds, mistakes);
      results.sort((a, b) => b.wrongCount - a.wrongCount);
      setLoadedQuestions(results);
      setLoading(false);
    };

    if (mistakeIds.length > 0) {
      loadData();
    } else {
      setLoadedQuestions([]);
      setLoading(false);
    }
  }, [mistakeIds, mistakes]);

  const dueQuestions = useMemo(() => {
    return loadedQuestions.filter(q => {
      const nextDate = mistakes[q.mistakeId]?.nextReviewDate;
      return nextDate ? isDueForReview(nextDate) : false;
    });
  }, [loadedQuestions, mistakes]);

  const availableSubCategories = useMemo(() => {
    const set = new Set<string>();
    loadedQuestions.forEach(q => {
      const cat = q.subCategory || q.qData?.subCategory || q.qData?.type;
      if (cat) set.add(cat);
    });
    return Array.from(set);
  }, [loadedQuestions]);

  const filteredQuestions = useMemo(() => {
    return loadedQuestions.filter(q => {
      const matchPart = filterPart === 'all' 
        ? true 
        : q.part.replace(/^p(art)?/, '') === filterPart.replace(/^p(art)?/, '');
      
      const cat = q.subCategory || q.qData?.subCategory || q.qData?.type;
      const matchSub = filterSubCategory === 'all'
        ? true
        : cat && (cat.toLowerCase() === filterSubCategory.toLowerCase() || cat.toLowerCase().includes(filterSubCategory.toLowerCase()));

      return matchPart && matchSub;
    });
  }, [loadedQuestions, filterPart, filterSubCategory]);

  const partLabels: Record<string, string> = {
    p1: 'Part 1: Photographs',
    part1: 'Part 1: Photographs',
    p2: 'Part 2: Question-Response',
    part2: 'Part 2: Question-Response',
    p3: 'Part 3: Conversations',
    part3: 'Part 3: Conversations',
    p4: 'Part 4: Short Talks',
    part4: 'Part 4: Short Talks',
    p5: 'Part 5: Sentences',
    part5: 'Part 5: Sentences',
    p6: 'Part 6: Text Completion',
    part6: 'Part 6: Text Completion',
    p7: 'Part 7: Reading Comprehension',
    part7: 'Part 7: Reading Comprehension',
  };

  if (loading) {
    return <div>Đang tải dữ liệu câu hỏi sai...</div>;
  }
  
  if (loadedQuestions.length === 0) {
    return (
      <div className={`${styles.emptyState} card-minimal animate-slide-up`}>
        <h2>Không có câu hỏi đề thi nào!</h2>
        <p>Bạn chưa sai câu hỏi nào trong phần thi thử.</p>
        <Link href="/exam" className={styles.primaryBtn}>Vào Thi thử</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Top CTA Banner to start Practice */}
      <section className={styles.actionSection} style={{ marginBottom: '1.5rem' }}>
        <div className={`${styles.ctaCard} card-minimal`}>
          <h2>Sẵn sàng khắc phục câu sai?</h2>
          <p>
            Bạn đang có <strong>{loadedQuestions.length}</strong> câu hỏi đề thi cần ôn tập
            {dueQuestions.length > 0 && (
              <> (trong đó <strong>{dueQuestions.length}</strong> câu đã tới hạn ôn hôm nay)</>
            )}.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Link 
              href={`/notebook/exam-quiz?part=${filterPart}`} 
              className={`${styles.primaryBtn} btn-accent`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Bắt đầu luyện tập câu sai {filterPart !== 'all' ? `(${partLabels[filterPart] || filterPart})` : ''}</span>
              <ArrowRightIcon size={16} />
            </Link>
            {dueQuestions.length > 0 && (
              <Link 
                href="/notebook/exam-quiz?filter=due" 
                className={styles.secondaryBtn}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <ZapIcon size={14} />
                <span>Chỉ ôn câu tới hạn ({dueQuestions.length})</span>
              </Link>
            )}
            {filterSubCategory !== 'all' && (
              <Link 
                href={`/part5?subCategory=${encodeURIComponent(filterSubCategory)}`} 
                className={styles.secondaryBtn}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                title={`Luyện tập câu hỏi Part 5 chuyên đề ${filterSubCategory}`}
              >
                <ZapIcon size={14} />
                <span>Luyện chuyên đề ETS: {filterSubCategory}</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.88rem', fontWeight: 600 }}>Lọc Part:</label>
          <select 
            value={filterPart}
            onChange={(e) => setFilterPart(e.target.value)}
            style={{ padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--foreground)', fontSize: '0.85rem' }}
          >
            <option value="all">Tất cả Part ({loadedQuestions.length})</option>
            <option value="part1">Part 1 (Ảnh)</option>
            <option value="part2">Part 2 (Hỏi - Đáp)</option>
            <option value="part3">Part 3 (Hội thoại)</option>
            <option value="part4">Part 4 (Bài nói)</option>
            <option value="part5">Part 5 (Ngữ pháp & Từ vựng)</option>
            <option value="part6">Part 6 (Điền đoạn văn)</option>
            <option value="part7">Part 7 (Đọc hiểu)</option>
          </select>
        </div>

        {availableSubCategories.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: 600 }}>Chủ điểm ngữ pháp:</label>
            <select 
              value={filterSubCategory}
              onChange={(e) => setFilterSubCategory(e.target.value)}
              style={{ padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--foreground)', fontSize: '0.85rem' }}
            >
              <option value="all">Tất cả chủ điểm</option>
              {availableSubCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        )}

        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Hiển thị {filteredQuestions.length} câu
        </span>
      </div>

      <div className={styles.wordGrid}>
        {filteredQuestions.map(({ mistakeId, wrongCount, testId, part, qData, subCategory: qSubCat, grammarTag: qGrammarTag }) => {
          const testName = testId === 'ets2022_test1' ? 'ETS 2022 Test 1' : testId;
          const m = mistakes[mistakeId];
          const due = m?.nextReviewDate ? isDueForReview(m.nextReviewDate) : false;
          const subCategory = qSubCat || qData.subCategory || qData.type;
          const grammarTag = qGrammarTag || qData.grammarTag;
          
          return (
            <div key={mistakeId} className={`${styles.wordCard} card-minimal`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '0.6rem' }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--foreground)' }}>
                    {partLabels[part] || part} • Câu {qData.number}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {testName}
                    </span>
                    {subCategory && (
                      <span style={{ fontSize: '0.72rem', padding: '1px 7px', borderRadius: '4px', background: 'rgba(99, 102, 241, 0.12)', color: 'var(--primary)', fontWeight: 600 }}>
                        {subCategory}
                      </span>
                    )}
                    {grammarTag && (
                      <span style={{ fontSize: '0.72rem', padding: '1px 7px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', fontWeight: 500 }}>
                        {grammarTag}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexShrink: 0 }}>
                  {due && (
                    <span style={{ fontSize: '0.7rem', background: 'var(--danger)', color: 'white', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                      Tới hạn ôn
                    </span>
                  )}
                  <span className={styles.wrongCountBadge}>Sai {wrongCount} lần</span>
                </div>
              </div>

              {qData.text ? (
                <p className={styles.wordMeaning}>{qData.text}</p>
              ) : (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem', background: 'var(--bg-secondary)', padding: '6px 10px', borderRadius: '8px', margin: '0.4rem 0' }}>
                  <HeadphonesIcon size={15} />
                  <span>Câu hỏi dạng nghe / hình ảnh</span>
                </div>
              )}
              
              <div style={{ marginTop: '0.6rem', fontSize: '0.85rem' }}>
                <strong>Đáp án: </strong> 
                <span style={{ color: 'var(--success)', fontWeight: 700 }}>{qData.correctAnswer}</span>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                <Link
                  href={`/notebook/exam-quiz?id=${mistakeId}`}
                  className="btn-primary btn-sm"
                  style={{
                    borderRadius: '8px',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none'
                  }}
                >
                  <RotateCcwIcon size={14} />
                  <span>Luyện câu này</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setTutorContext({
                    partTitle: partLabels[part] || part,
                    number: qData.number,
                    text: qData.text,
                    options: qData.options,
                    correctAnswer: qData.correctAnswer,
                    userAnswer: '',
                    transcript: qData.transcript,
                    passageText: qData.passageText,
                    explanation: qData.explanation,
                    audioUrl: qData.audioUrl,
                    subCategory: subCategory,
                    grammarTag: grammarTag,
                  })}
                  className="btn-secondary btn-sm"
                  style={{
                    borderRadius: '8px',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <BotIcon size={14} />
                  <span>Hỏi Gia sư</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {tutorContext && (
        <AITutorDrawer
          isOpen={!!tutorContext}
          onClose={() => setTutorContext(null)}
          questionContext={tutorContext}
        />
      )}
    </div>
  );
}
