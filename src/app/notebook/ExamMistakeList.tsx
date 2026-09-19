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
  TargetIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
} from '@/components/icons/AppIcons';
import styles from './page.module.css';

interface ExamMistakeListProps {
  mistakeIds: string[];
  mistakes: MistakeData;
  updateMistakeRootCause?: (id: string, cause: string) => void;
  masterMistake?: (id: string) => void;
  unmasterMistake?: (id: string) => void;
}

import { ROOT_CAUSES, ROOT_CAUSE_CONFIG } from '@/utils/bottleneckCalculator';

export default function ExamMistakeList({ 
  mistakeIds, 
  mistakes, 
  updateMistakeRootCause,
  masterMistake,
  unmasterMistake,
}: ExamMistakeListProps) {
  const searchParams = useSearchParams();
  const initialSubCat = searchParams?.get('subCategory') || 'all';

  const [loadedQuestions, setLoadedQuestions] = useState<LoadedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);
  const [filterPart, setFilterPart] = useState<string>('all');
  const [filterSubCategory, setFilterSubCategory] = useState<string>(initialSubCat);
  const [filterRootCause, setFilterRootCause] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'active' | 'mastered' | 'all'>('active');

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

  const rootCauseStats = useMemo(() => {
    const counts: Record<string, number> = {
      'Mắc bẫy': 0,
      'Ngữ pháp': 0,
      'Từ vựng': 0,
      'Bất cẩn / Đọc lướt': 0,
      'Nghe không rõ': 0,
    };
    let unassigned = 0;
    let activeTotal = 0;
    let masteredTotal = 0;

    loadedQuestions.forEach(q => {
      const isMastered = Boolean(mistakes[q.mistakeId]?.isMastered);
      if (isMastered) {
        masteredTotal++;
      } else {
        activeTotal++;
        const rc = mistakes[q.mistakeId]?.rootCause;
        if (rc && counts[rc] !== undefined) {
          counts[rc]++;
        } else {
          unassigned++;
        }
      }
    });

    return { counts, unassigned, activeTotal, masteredTotal, total: loadedQuestions.length };
  }, [loadedQuestions, mistakes]);

  const dueQuestions = useMemo(() => {
    return loadedQuestions.filter(q => {
      const isMastered = Boolean(mistakes[q.mistakeId]?.isMastered);
      if (isMastered) return false;
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
      const isMastered = Boolean(mistakes[q.mistakeId]?.isMastered);
      if (statusFilter === 'active' && isMastered) return false;
      if (statusFilter === 'mastered' && !isMastered) return false;

      const matchPart = filterPart === 'all' 
        ? true 
        : q.part.replace(/^p(art)?/, '') === filterPart.replace(/^p(art)?/, '');
      
      const cat = q.subCategory || q.qData?.subCategory || q.qData?.type;
      const matchSub = filterSubCategory === 'all'
        ? true
        : cat && (cat.toLowerCase() === filterSubCategory.toLowerCase() || cat.toLowerCase().includes(filterSubCategory.toLowerCase()));

      const rc = mistakes[q.mistakeId]?.rootCause;
      const matchRC = filterRootCause === 'all'
        ? true
        : filterRootCause === 'unassigned' ? !rc : rc === filterRootCause;

      return matchPart && matchSub && matchRC;
    });
  }, [loadedQuestions, statusFilter, filterPart, filterSubCategory, filterRootCause, mistakes]);

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
      {/* Root-Cause Diagnostic Matrix */}
      <section className={styles.matrixSection}>
        <div className={styles.matrixHeaderGroup}>
          <div>
            <h3 className={styles.matrixTitle}>
              <TargetIcon size={18} /> Ma Trận Chẩn Đoán & Khắc Phục Lỗi Sai Theo Nguyên Nhân
            </h3>
            <p className={styles.matrixSubtitle}>
              Bóc tách {rootCauseStats.activeTotal} câu sai đang cần ôn theo 5 nhóm nguyên nhân gốc để tập trung luyện đúng điểm nghẽn
            </p>
          </div>
          <div className={styles.statusTabs}>
            <button
              type="button"
              className={`${styles.statusTabBtn} ${statusFilter === 'active' ? styles.statusTabBtnActive : ''}`}
              onClick={() => setStatusFilter('active')}
            >
              Cần ôn ({rootCauseStats.activeTotal})
            </button>
            <button
              type="button"
              className={`${styles.statusTabBtn} ${statusFilter === 'mastered' ? styles.statusTabBtnActive : ''}`}
              onClick={() => setStatusFilter('mastered')}
            >
              Đã khắc phục ({rootCauseStats.masteredTotal})
            </button>
            <button
              type="button"
              className={`${styles.statusTabBtn} ${statusFilter === 'all' ? styles.statusTabBtnActive : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              Tất cả ({rootCauseStats.total})
            </button>
          </div>
        </div>

        <div className={styles.matrixGrid}>
          {ROOT_CAUSES.map(rc => {
            const count = rootCauseStats.counts[rc] || 0;
            const cfg = ROOT_CAUSE_CONFIG[rc];
            const pct = rootCauseStats.activeTotal > 0 ? Math.round((count / rootCauseStats.activeTotal) * 100) : 0;

            return (
              <div key={rc} className={styles.matrixCard}>
                <div className={styles.matrixCardTop}>
                  <span className={styles.matrixCardLabel}>{cfg.label}</span>
                  <span className={`${styles.matrixCardCount} ${count > 0 ? styles.matrixCardCountActive : ''}`}>
                    {count} câu ({pct}%)
                  </span>
                </div>
                <div className={styles.matrixProgressBar}>
                  <div 
                    className={styles.matrixProgressFill} 
                    style={{ width: `${pct}%`, background: cfg.color }} 
                  />
                </div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                  {cfg.desc}
                </span>
                {count > 0 ? (
                  <Link
                    href={`/notebook/exam-quiz?rootCause=${encodeURIComponent(rc)}`}
                    className={styles.matrixDrillBtn}
                    style={{ background: cfg.color }}
                  >
                    <ZapIcon size={13} />
                    <span>Luyện khắc phục ({count})</span>
                  </Link>
                ) : (
                  <span className={`${styles.matrixDrillBtn} ${styles.matrixDrillBtnDisabled}`}>
                    Không có lỗi
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Top CTA Banner to start Practice */}
      <section className={styles.actionSection}>
        <div className={`${styles.ctaCard} card-minimal`}>
          <h2>Sẵn sàng khắc phục câu sai?</h2>
          <p>
            Bạn đang có <strong>{rootCauseStats.activeTotal}</strong> câu hỏi cần ôn tập
            {dueQuestions.length > 0 && (
              <> (trong đó <strong>{dueQuestions.length}</strong> câu đã tới hạn ôn hôm nay)</>
            )}
            {rootCauseStats.masteredTotal > 0 && (
              <>, đã khắc phục thành công <strong>{rootCauseStats.masteredTotal}</strong> câu</>
            )}.
          </p>
          <div className={styles.ctaButtonsRow}>
            <Link 
              href={`/notebook/exam-quiz?part=${filterPart}`} 
              className={`${styles.primaryBtn} btn-accent`}
            >
              <span>Bắt đầu luyện tập câu sai {filterPart !== 'all' ? `(${partLabels[filterPart] || filterPart})` : ''}</span>
              <ArrowRightIcon size={16} />
            </Link>
            {dueQuestions.length > 0 && (
              <Link 
                href="/notebook/exam-quiz?filter=due" 
                className={styles.secondaryBtn}
              >
                <ZapIcon size={14} />
                <span>Chỉ ôn câu tới hạn ({dueQuestions.length})</span>
              </Link>
            )}
            {filterSubCategory !== 'all' && (
              <Link 
                href={
                  filterPart.replace(/^p(art)?/, '') === '7' ||
                  ['main idea', 'inference', 'not / true', 'sentence placement'].some(k =>
                    filterSubCategory.toLowerCase().includes(k)
                  )
                    ? `/part7?questionType=${encodeURIComponent(filterSubCategory)}`
                    : `/part5?subCategory=${encodeURIComponent(filterSubCategory)}`
                } 
                className={styles.secondaryBtn}
                title={`Luyện tập chuyên đề ${filterSubCategory}`}
              >
                <ZapIcon size={14} />
                <span>
                  Luyện{' '}
                  {filterPart.replace(/^p(art)?/, '') === '7' ||
                  ['main idea', 'inference', 'not / true', 'sentence placement'].some(k =>
                    filterSubCategory.toLowerCase().includes(k)
                  )
                    ? 'dạng đọc hiểu'
                    : 'chuyên đề ETS'}
                  : {filterSubCategory}
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Lọc Part:</label>
          <select 
            value={filterPart}
            onChange={(e) => setFilterPart(e.target.value)}
            className={styles.filterSelect}
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
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Chủ điểm:</label>
            <select 
              value={filterSubCategory}
              onChange={(e) => setFilterSubCategory(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Tất cả chủ điểm</option>
              {availableSubCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Nguyên nhân:</label>
          <select 
            value={filterRootCause}
            onChange={(e) => setFilterRootCause(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Tất cả nguyên nhân</option>
            {ROOT_CAUSES.map(rc => (
              <option key={rc} value={rc}>{rc}</option>
            ))}
            <option value="unassigned">Chưa gắn nhãn</option>
          </select>
        </div>

        <span className={styles.filterCount}>
          Hiển thị {filteredQuestions.length} câu
        </span>
      </div>

      <div className={styles.wordGrid}>
        {filteredQuestions.map(({ mistakeId, wrongCount, testId, part, qData, subCategory: qSubCat, grammarTag: qGrammarTag }) => {
          const testName = testId === 'ets2022_test1' ? 'ETS 2022 Test 1' : testId;
          const m = mistakes[mistakeId];
          const isMastered = Boolean(m?.isMastered);
          const due = m?.nextReviewDate ? isDueForReview(m.nextReviewDate) : false;
          const subCategory = qSubCat || qData.subCategory || qData.type;
          const grammarTag = qGrammarTag || qData.grammarTag;
          
          return (
            <div 
              key={mistakeId} 
              className={`${styles.examCard} card-minimal ${isMastered ? styles.examCardMastered : ''}`}
            >
              <div className={styles.examCardHeader}>
                <div>
                  <div className={styles.examCardTitle}>
                    {partLabels[part] || part} • Câu {qData.number}
                  </div>
                  <div className={styles.tagsRow}>
                    <span className={styles.testNameTag}>
                      {testName}
                    </span>
                    {subCategory && (
                      <span className={styles.subCategoryBadge}>
                        {subCategory}
                      </span>
                    )}
                    {grammarTag && (
                      <span className={styles.grammarBadge}>
                        {grammarTag}
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.badgesGroup}>
                  {isMastered ? (
                    <span className={styles.masteredBadge}>
                      <ShieldCheckIcon size={13} />
                      Đã khắc phục
                    </span>
                  ) : (
                    <>
                      {due && (
                        <span className={styles.dueBadge}>
                          Tới hạn ôn
                        </span>
                      )}
                      <span className={styles.wrongCountBadge}>Sai {wrongCount} lần</span>
                    </>
                  )}
                </div>
              </div>

              {qData.text ? (
                <p className={styles.wordMeaning}>{qData.text}</p>
              ) : (
                <div className={styles.audioQuestionTag}>
                  <HeadphonesIcon size={15} />
                  <span>Câu hỏi dạng nghe / hình ảnh</span>
                </div>
              )}
              
              <div className={styles.answerRow}>
                <strong>Đáp án: </strong> 
                <span className={styles.answerCorrect}>{qData.correctAnswer}</span>
              </div>

              <div className={styles.rootCauseSection}>
                <div className={styles.rootCauseLabel}>Nguyên nhân sai:</div>
                <div className={styles.rootCausePills}>
                  {ROOT_CAUSES.map(rc => {
                    const isSelected = m?.rootCause === rc;
                    return (
                      <button
                        key={rc}
                        type="button"
                        onClick={() => updateMistakeRootCause?.(mistakeId, rc)}
                        className={`${styles.rootCausePill} ${isSelected ? styles.rootCausePillActive : ''}`}
                      >
                        {rc}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.examCardActions}>
                <Link
                  href={`/notebook/exam-quiz?id=${mistakeId}`}
                  className={styles.actionBtnPrimary}
                >
                  <RotateCcwIcon size={14} />
                  <span>Luyện câu này</span>
                </Link>

                {isMastered ? (
                  <button
                    type="button"
                    onClick={() => unmasterMistake?.(mistakeId)}
                    className={styles.actionBtnSecondary}
                  >
                    <RotateCcwIcon size={14} />
                    <span>Mở lại câu này</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => masterMistake?.(mistakeId)}
                    className={styles.actionBtnMastered}
                  >
                    <ShieldCheckIcon size={14} />
                    <span>Đã nắm vững</span>
                  </button>
                )}

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
                  className={styles.actionBtnTutor}
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
