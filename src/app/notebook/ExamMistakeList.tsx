'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MistakeData } from '@/hooks/useMistakeNotebook';
import AITutorDrawer, { QuestionContext } from '@/components/AITutorDrawer';
import { fetchMistakeQuestions, LoadedQuestion } from '@/utils/questionFetcher';
import { isDueForReview } from '@/utils/spacedRepetition';
import styles from './page.module.css';

interface ExamMistakeListProps {
  mistakeIds: string[];
  mistakes: MistakeData;
}

export default function ExamMistakeList({ mistakeIds, mistakes }: ExamMistakeListProps) {
  const [loadedQuestions, setLoadedQuestions] = useState<LoadedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [tutorContext, setTutorContext] = useState<QuestionContext | null>(null);

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

  if (loading) {
    return <div>Đang tải dữ liệu câu hỏi sai...</div>;
  }
  
  if (loadedQuestions.length === 0) {
    return (
      <div className={`${styles.emptyState} card-minimal animate-slide-up`}>
        <h2>Không có câu hỏi đề thi nào!</h2>
        <p>Bạn chưa sai câu hỏi nào trong phần thi thử.</p>
        <Link href="/practice" className={styles.primaryBtn}>Vào Practice</Link>
      </div>
    );
  }

  const partLabels: Record<string, string> = {
    p1: 'Part 1: Photographs',
    p2: 'Part 2: Question-Response',
    p3: 'Part 3: Conversations',
    p4: 'Part 4: Short Talks',
    p5: 'Part 5: Sentences',
    p6: 'Part 6: Text Completion',
    p7: 'Part 7: Reading Comprehension',
  };

  return (
    <div className={styles.wordGrid}>
      {loadedQuestions.map(({ mistakeId, wrongCount, testId, part, qData }) => {
        const testName = testId === 'ets2022_test1' ? 'ETS 2022 Test 1' : testId;
        const m = mistakes[mistakeId];
        const due = m?.nextReviewDate ? isDueForReview(m.nextReviewDate) : false;
        
        return (
          <div key={mistakeId} className={`${styles.wordCard} card-minimal`}>
            <div className={styles.wordHeader}>
              <span className={styles.wordTitle}>{testName}</span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {due && (
                  <span style={{ fontSize: '0.7rem', background: 'var(--danger)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                    Tới hạn ôn
                  </span>
                )}
                <span className={styles.wrongCountBadge}>Sai {wrongCount} lần</span>
              </div>
            </div>
            <p className={styles.wordIpa}>{partLabels[part] || part} - Câu {qData.number}</p>
            <p className={styles.wordMeaning}>{qData.text}</p>
            
            <div style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
              <strong>Đáp án: </strong> 
              <span style={{ color: 'var(--success)' }}>{qData.correctAnswer}</span>
            </div>

            <button
              type="button"
              onClick={() => setTutorContext({
                partTitle: partLabels[part] || part,
                number: qData.number,
                text: qData.text,
                options: qData.options,
                correctAnswer: qData.correctAnswer,
                userAnswer: '', // We don't have the last user answer stored
                transcript: qData.transcript,
                passageText: qData.passageText,
                explanation: qData.explanation,
                audioUrl: qData.audioUrl,
              })}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--primary)',
                borderRadius: '16px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: '1rem',
                width: 'fit-content'
              }}
            >
              🤖 Hỏi Gia sư về câu này
            </button>
          </div>
        );
      })}
      
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
